import type { ApplicationRecord } from './types';
import { apiGet, apiPost } from '../../lib/apiClient';

export const fetchApplications = (): Promise<ApplicationRecord[]> => apiGet<ApplicationRecord[]>('/api/applications');

interface SubmitApplicationInput {
  schemeId: string;
  schemeName: string;
  department: string;
  benefitAmount: string;
  officialPortal: string;
}

export const submitApplication = (scheme: SubmitApplicationInput): Promise<ApplicationRecord> =>
  apiPost<ApplicationRecord>('/api/applications', scheme);

export const resolveApplicationAction = (app: ApplicationRecord): Promise<ApplicationRecord> =>
  apiPost<ApplicationRecord>(`/api/applications/${app.id}/resolve`);

/** Advances the application to its next pipeline stage, simulating a poll against the issuing portal. */
export const checkApplicationStatus = (app: ApplicationRecord): Promise<ApplicationRecord> =>
  apiPost<ApplicationRecord>(`/api/applications/${app.id}/check-status`);
