import type { ApplicationRecord } from './types';
import { mockApplications } from './mockData';

const MOCK_LATENCY_MS = 300;
const delay = <T,>(value: T, ms = MOCK_LATENCY_MS): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms));

export const fetchApplications = (): Promise<ApplicationRecord[]> => delay(mockApplications);

interface SubmitApplicationInput {
  schemeId: string;
  schemeName: string;
  department: string;
  benefitAmount: string;
  officialPortal: string;
}

export const submitApplication = (scheme: SubmitApplicationInput): Promise<ApplicationRecord> => {
  const applicationNumber = `APP-2026-MH-${Math.floor(10000 + Math.random() * 90000)}`;
  const record: ApplicationRecord = {
    id: `app-${Date.now()}`,
    applicationNumber,
    schemeId: scheme.schemeId,
    schemeName: scheme.schemeName,
    department: scheme.department,
    benefitAmount: scheme.benefitAmount,
    submittedDate: '27 Sep 2026',
    lastUpdated: '27 Sep 2026',
    currentStatus: 'Submitted',
    currentStepIndex: 1,
    totalSteps: 5,
    expectedNextStep: 'Automated AI document authenticity cross-check in progress',
    timeline: [
      { stage: 'Application Submitted', date: '27 Sep 2026', status: 'completed', note: `Dossier submitted via ${scheme.officialPortal} connector` },
      { stage: 'AI Document Verification', date: 'In Progress', status: 'current', note: 'Cross-referencing DigiLocker signed credentials' },
      { stage: 'Institute / Desk Approval', date: 'Scheduled', status: 'pending', note: 'Scrutiny by authorized Nodal Officer' },
      { stage: 'District Sanction', date: 'Pending', status: 'pending', note: 'Treasury payment docket preparation' },
      { stage: 'Direct Benefit Credit', date: 'Pending', status: 'pending', note: 'NPCI bank account transfer' },
    ],
  };

  return delay(record, 1200);
};

export const resolveApplicationAction = (app: ApplicationRecord): Promise<ApplicationRecord> => {
  const resolved: ApplicationRecord = {
    ...app,
    currentStatus: 'Department Review',
    lastUpdated: 'Just now',
    expectedNextStep: 'Resubmitted clear document under scrutiny by District Verification Desk',
    actionRequiredMessage: undefined,
    actionRequiredType: undefined,
    timeline: app.timeline.map((step, idx) =>
      idx === 1
        ? { ...step, status: 'completed', note: 'Clean replacement Tehsildar income certificate uploaded & validated' }
        : idx === 3
        ? { ...step, status: 'current', note: 'Re-evaluation underway' }
        : step,
    ),
  };

  return delay(resolved, 1200);
};
