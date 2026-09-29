import type { DocumentCategory, MissingDocument, UserDocument } from './types';
import { apiGet, apiPatch, apiPost, apiUpload } from '../../lib/apiClient';

export const fetchDocuments = (): Promise<UserDocument[]> => apiGet<UserDocument[]>('/api/documents');

/** Documents required by any scheme the user is at least borderline-eligible for, that they haven't uploaded yet. */
export const fetchMissingDocuments = (): Promise<{ missingDocuments: MissingDocument[] }> =>
  apiGet('/api/documents/missing');

interface UploadDocumentInput {
  file: File;
  category: DocumentCategory;
}

export const uploadDocument = ({ file, category }: UploadDocumentInput): Promise<UserDocument> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('category', category);
  return apiUpload<UserDocument>('/api/documents', formData);
};

export const updateDocumentField = (
  doc: UserDocument,
  fieldIndex: number,
  newValue: string,
): Promise<UserDocument> => apiPatch<UserDocument>(`/api/documents/${doc.id}/fields/${fieldIndex}`, { value: newValue });

export const connectDigiLocker = (): Promise<{ digiLockerConnected: true; completenessPercentage: number }> =>
  apiPost('/api/documents/digilocker-connect');
