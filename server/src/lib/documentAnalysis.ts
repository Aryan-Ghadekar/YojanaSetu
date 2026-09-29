import type { OcrExtractedFields, OcrResult } from './ocrClient.js';

/** Row shape stored in documents.extracted_fields (matches the client's ExtractedField). */
export interface ExtractedField {
  field: string;
  extractedValue: string;
  userValue: string;
  confidence: number;
  match: boolean;
}

export interface ProfileForComparison {
  full_name: string | null;
  date_of_birth: string | null;
  gender: string | null;
  state: string | null;
  district: string | null;
  occupation: string | null;
  annual_income: number | null;
}

export type QualityStatus = 'readable' | 'quality_issue' | 'blurry' | 'glare_detected';
export type VerificationStatus = 'Verified' | 'Needs Review' | 'Suspicious Signals' | 'Unable to Verify';

export interface AuthenticitySignals {
  structureRecognized: boolean;
  ocrConsistencyPassed: boolean;
  imageManipulationDetected: boolean;
  issuingAuthorityVerified: boolean;
  digitalSignatureValid: boolean;
  details: string[];
}

export interface DocumentAnalysis {
  ocrStatus: 'complete' | 'failed';
  qualityStatus: QualityStatus;
  verificationStatus: VerificationStatus;
  authenticitySignals: AuthenticitySignals;
  extractedFields: ExtractedField[];
}

const FIELD_LABELS: Record<keyof OcrExtractedFields, string> = {
  full_name: 'Full Name',
  date_of_birth: 'Date of Birth',
  gender: 'Gender',
  phone_number: 'Phone Number',
  aadhaar: 'Aadhaar Number',
  pan: 'PAN',
  village: 'Village',
  district: 'District',
  state: 'State',
  address: 'Address',
  pincode: 'PIN Code',
  ration_card_number: 'Ration Card Number',
  ration_card_category: 'Ration Card Category',
  bank_name: 'Bank Name',
  bank_account_number: 'Bank Account Number',
  bank_ifsc: 'IFSC Code',
  annual_income: 'Annual Income (INR)',
  occupation: 'Occupation',
};

// Fields with a format we can validate, used to temper confidence.
const FORMAT_CHECKS: Partial<Record<keyof OcrExtractedFields, (v: string) => boolean>> = {
  aadhaar: (v) => /^\d{12}$/.test(v.replace(/\D/g, '')),
  pan: (v) => /^[A-Z]{5}\d{4}[A-Z]$/.test(v.trim().toUpperCase()),
  pincode: (v) => /^\d{6}$/.test(v.trim()),
  bank_ifsc: (v) => /^[A-Z]{4}0[A-Z0-9]{6}$/.test(v.trim().toUpperCase()),
  phone_number: (v) => /^\d{10}$/.test(v.replace(/\D/g, '')),
  date_of_birth: (v) => !Number.isNaN(Date.parse(v.slice(0, 10))),
};

// Profile field compared against each OCR field, and how (ported from Team-18's
// risk_scoring_service mismatch rules). Only compared when both sides have a value.
type Comparison = { kind: 'fuzzy'; threshold: number } | { kind: 'exact' } | { kind: 'income' };
const COMPARISONS: Partial<Record<keyof OcrExtractedFields, { profileKey: keyof ProfileForComparison; how: Comparison }>> = {
  full_name: { profileKey: 'full_name', how: { kind: 'fuzzy', threshold: 0.7 } },
  date_of_birth: { profileKey: 'date_of_birth', how: { kind: 'exact' } },
  gender: { profileKey: 'gender', how: { kind: 'exact' } },
  state: { profileKey: 'state', how: { kind: 'fuzzy', threshold: 0.8 } },
  district: { profileKey: 'district', how: { kind: 'fuzzy', threshold: 0.8 } },
  occupation: { profileKey: 'occupation', how: { kind: 'fuzzy', threshold: 0.6 } },
  annual_income: { profileKey: 'annual_income', how: { kind: 'income' } },
};

const norm = (s: string) => s.trim().toLowerCase().replace(/\s+/g, ' ');

function levenshtein(a: string, b: string): number {
  const prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let diag = prev[0];
    prev[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const tmp = prev[j];
      prev[j] = Math.min(prev[j] + 1, prev[j - 1] + 1, diag + (a[i - 1] === b[j - 1] ? 0 : 1));
      diag = tmp;
    }
  }
  return prev[b.length];
}

function similarity(a: string, b: string): number {
  const x = norm(a);
  const y = norm(b);
  const longest = Math.max(x.length, y.length);
  return longest === 0 ? 1 : 1 - levenshtein(x, y) / longest;
}

function normalizeGender(v: string): string {
  const s = norm(v);
  if (s === 'f' || s === 'female') return 'f';
  if (s === 'm' || s === 'male') return 'm';
  return s;
}

function compare(field: keyof OcrExtractedFields, extracted: string, entered: string): boolean {
  const rule = COMPARISONS[field]!;
  if (rule.how.kind === 'fuzzy') return similarity(extracted, entered) >= rule.how.threshold;
  if (rule.how.kind === 'income') {
    const a = Number(extracted);
    const b = Number(entered);
    return b > 0 && a > 0 ? Math.abs(a - b) / Math.max(a, b) <= 0.1 : true;
  }
  if (field === 'gender') return normalizeGender(extracted) === normalizeGender(entered);
  if (field === 'date_of_birth') return extracted.slice(0, 10) === entered.slice(0, 10);
  return norm(extracted) === norm(entered);
}

/**
 * Heuristic 0-1 score, NOT a model probability: the LLM returns no per-field
 * confidence, so this reflects how trustworthy the text source was (embedded PDF
 * text > sharp scan > blurry photo) and whether the value fits its expected format.
 */
function fieldConfidence(field: keyof OcrExtractedFields, value: string, ocr: OcrResult): number {
  let base = 0.85;
  if (ocr.ocr_source === 'pdf_text_layer') base = 0.99;
  else if (ocr.quality.blur_classification === 'Blurry') base = 0.5;
  else if (ocr.quality.blur_classification === 'Borderline') base = 0.7;
  const formatOk = FORMAT_CHECKS[field]?.(value) ?? true;
  return Math.round((formatOk ? base : base * 0.5) * 100) / 100;
}

export function qualityStatusFor(ocr: OcrResult): QualityStatus {
  const q = ocr.quality;
  if (q.blur_classification === 'Blurry') return 'blurry';
  if (q.resolution_classification === 'Too Low' || q.blur_classification === 'Borderline') return 'quality_issue';
  return 'readable';
}

export function analyzeDocument(ocr: OcrResult, profile: ProfileForComparison | null): DocumentAnalysis {
  const extractedFields: ExtractedField[] = [];
  const mismatched: string[] = [];
  const badFormat: string[] = [];

  for (const key of Object.keys(FIELD_LABELS) as (keyof OcrExtractedFields)[]) {
    const raw = ocr.extracted_fields[key];
    if (raw === null || raw === undefined || String(raw).trim() === '') continue;
    const extractedValue = String(raw).trim();
    const label = FIELD_LABELS[key];

    const rule = COMPARISONS[key];
    const profileValue = rule && profile ? profile[rule.profileKey] : null;
    const entered = profileValue === null || profileValue === undefined ? '' : String(profileValue).trim();
    const hasEntered = entered !== '' && entered !== '0';
    const match = hasEntered ? compare(key, extractedValue, entered) : true;

    if (hasEntered && !match) mismatched.push(label);
    if (FORMAT_CHECKS[key] && !FORMAT_CHECKS[key]!(extractedValue)) badFormat.push(label);

    extractedFields.push({
      field: label,
      extractedValue,
      userValue: hasEntered ? entered : extractedValue,
      confidence: fieldConfidence(key, extractedValue, ocr),
      match,
    });
  }

  const qualityStatus = qualityStatusFor(ocr);
  const textRead = ocr.ocr_text.trim().length > 0;
  const identityMismatch = mismatched.includes('Full Name') && mismatched.includes('Date of Birth');

  let verificationStatus: VerificationStatus;
  if (!textRead || extractedFields.length === 0) verificationStatus = 'Unable to Verify';
  else if (identityMismatch) verificationStatus = 'Suspicious Signals';
  else if (mismatched.length > 0 || badFormat.length > 0 || qualityStatus !== 'readable') verificationStatus = 'Needs Review';
  else verificationStatus = 'Verified';

  const details: string[] = [];
  details.push(
    ocr.ocr_source === 'pdf_text_layer'
      ? 'Text read directly from the PDF text layer'
      : 'Text read from the image using OCR',
  );
  details.push(`${extractedFields.length} field(s) extracted from the document`);
  if (mismatched.length) details.push(`Differs from profile: ${mismatched.join(', ')}`);
  if (badFormat.length) details.push(`Unexpected format: ${badFormat.join(', ')}`);
  details.push(...ocr.warnings);
  details.push('Issuing authority and digital signature were not checked; image tampering is not assessed');

  return {
    ocrStatus: 'complete',
    qualityStatus,
    verificationStatus,
    authenticitySignals: {
      structureRecognized: extractedFields.length > 0,
      ocrConsistencyPassed: extractedFields.length > 0 && mismatched.length === 0,
      imageManipulationDetected: false,
      issuingAuthorityVerified: false,
      digitalSignatureValid: false,
      details,
    },
    extractedFields,
  };
}

export function failedAnalysis(reason: string): DocumentAnalysis {
  return {
    ocrStatus: 'failed',
    qualityStatus: 'readable',
    verificationStatus: 'Unable to Verify',
    authenticitySignals: {
      structureRecognized: false,
      ocrConsistencyPassed: false,
      imageManipulationDetected: false,
      issuingAuthorityVerified: false,
      digitalSignatureValid: false,
      details: [reason],
    },
    extractedFields: [],
  };
}
