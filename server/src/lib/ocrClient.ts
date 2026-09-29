import { env } from './env.js';

export type BlurClassification = 'Sharp' | 'Borderline' | 'Blurry';
export type ResolutionClassification = 'Adequate' | 'Too Low';

export interface OcrQualityReport {
  applicable: boolean;
  laplacian_variance: number | null;
  blur_classification: BlurClassification | null;
  width: number | null;
  height: number | null;
  resolution_classification: ResolutionClassification | null;
  blur_threshold_blurry_below: number;
  blur_threshold_sharp_at_or_above: number;
  min_width_px: number;
  min_height_px: number;
}

/** Canonical fields the LLM read off the document; null when not present/confident. */
export interface OcrExtractedFields {
  full_name: string | null;
  date_of_birth: string | null;
  gender: string | null;
  phone_number: string | null;
  aadhaar: string | null;
  pan: string | null;
  village: string | null;
  district: string | null;
  state: string | null;
  address: string | null;
  pincode: string | null;
  ration_card_number: string | null;
  ration_card_category: string | null;
  bank_name: string | null;
  bank_account_number: string | null;
  bank_ifsc: string | null;
  annual_income: number | null;
  occupation: string | null;
}

export interface OcrResult {
  document_type: string;
  ocr_source: 'pdf_text_layer' | 'paddleocr' | 'none';
  ocr_text: string;
  quality: OcrQualityReport;
  extracted_fields: OcrExtractedFields;
  warnings: string[];
}

export const isOcrConfigured = (): boolean => env.ocrServiceUrl !== '';

/** Sends the uploaded file to the Python OCR service. Throws with a readable message on failure. */
export async function processDocument(file: {
  buffer: Buffer;
  originalname: string;
  mimetype: string;
}, documentType: string): Promise<OcrResult> {
  const form = new FormData();
  form.append('file', new Blob([new Uint8Array(file.buffer)], { type: file.mimetype }), file.originalname);
  form.append('document_type', documentType);

  let res: Response;
  try {
    res = await fetch(`${env.ocrServiceUrl}/process`, {
      method: 'POST',
      headers: env.ocrServiceToken ? { Authorization: `Bearer ${env.ocrServiceToken}` } : {},
      body: form,
      signal: AbortSignal.timeout(env.ocrTimeoutMs),
    });
  } catch (e) {
    throw new Error(`OCR service unreachable: ${e instanceof Error ? e.message : String(e)}`);
  }

  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as { detail?: unknown };
    const detail = typeof body.detail === 'string' ? body.detail : `status ${res.status}`;
    throw new Error(`OCR service error: ${detail}`);
  }
  return (await res.json()) as OcrResult;
}
