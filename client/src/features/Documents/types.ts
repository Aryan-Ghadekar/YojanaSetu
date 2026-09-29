export type DocumentCategory =
  | 'Identity'
  | 'Income'
  | 'Education'
  | 'Caste / Category'
  | 'Residence'
  | 'Banking'
  | 'Land / Property';

export interface ExtractedField {
  field: string;
  extractedValue: string;
  userValue: string;
  confidence: number;
  match: boolean;
}

export interface UserDocument {
  id: string;
  name: string;
  category: DocumentCategory;
  fileName: string;
  fileSize: string;
  uploadedAt: string;
  source: 'Upload' | 'DigiLocker';
  ocrStatus: 'complete' | 'processing' | 'failed';
  qualityStatus: 'readable' | 'quality_issue' | 'blurry' | 'glare_detected';
  verificationStatus: 'Verified' | 'Needs Review' | 'Suspicious Signals' | 'Unable to Verify';
  authenticitySignals: {
    structureRecognized: boolean;
    ocrConsistencyPassed: boolean;
    imageManipulationDetected: boolean;
    issuingAuthorityVerified: boolean;
    digitalSignatureValid: boolean;
    details: string[];
  };
  extractedFields: ExtractedField[];
}
