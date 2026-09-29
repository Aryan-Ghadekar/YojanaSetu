import type { DocumentCategory, UserDocument } from './types';
import { mockUserDocuments } from './mockData';

const MOCK_LATENCY_MS = 300;
const delay = <T,>(value: T, ms = MOCK_LATENCY_MS): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms));

export const fetchDocuments = (): Promise<UserDocument[]> => delay(mockUserDocuments);

interface UploadDocumentInput {
  name: string;
  size: string;
  category: DocumentCategory;
  ownerName: string;
}

export const uploadDocument = (input: UploadDocumentInput): Promise<UserDocument> => {
  const newDoc: UserDocument = {
    id: `doc-${Date.now()}`,
    name: input.name.replace(/\.[^/.]+$/, ''),
    category: input.category,
    fileName: input.name,
    fileSize: input.size,
    uploadedAt: 'Just now',
    source: 'Upload',
    ocrStatus: 'complete',
    qualityStatus: 'readable',
    verificationStatus: 'Verified',
    authenticitySignals: {
      structureRecognized: true,
      ocrConsistencyPassed: true,
      imageManipulationDetected: false,
      issuingAuthorityVerified: true,
      digitalSignatureValid: true,
      details: [
        'Document OCR completed with 97% confidence score',
        'Government header and barcode recognized',
        'Cross-referenced with citizen profile identity record',
      ],
    },
    extractedFields: [
      { field: 'Beneficiary Name', extractedValue: input.ownerName, userValue: input.ownerName, confidence: 0.98, match: true },
      { field: 'Document Category', extractedValue: input.category, userValue: input.category, confidence: 0.95, match: true },
      { field: 'Verification Date', extractedValue: '27 Sep 2026', userValue: '2026-09-27', confidence: 0.99, match: true },
    ],
  };

  return delay(newDoc, 1200);
};

export const updateDocumentField = (
  doc: UserDocument,
  fieldIndex: number,
  newValue: string,
): Promise<UserDocument> => {
  const nextFields = [...doc.extractedFields];
  nextFields[fieldIndex] = { ...nextFields[fieldIndex], userValue: newValue, match: true };
  return delay({ ...doc, extractedFields: nextFields });
};

export const connectDigiLocker = (): Promise<{ digiLockerConnected: true; completenessPercentage: number }> =>
  delay({ digiLockerConnected: true, completenessPercentage: 92 }, 1500);
