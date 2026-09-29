export type ApplicationStatus =
  | 'Draft'
  | 'Submitted'
  | 'Documents Verified'
  | 'Department Review'
  | 'Approved'
  | 'Action Required'
  | 'Disbursed';

export interface ApplicationTimelineStep {
  stage: string;
  date: string;
  status: 'completed' | 'current' | 'pending' | 'warning';
  note: string;
}

export interface ApplicationRecord {
  id: string;
  applicationNumber: string;
  schemeId: string;
  schemeName: string;
  department: string;
  benefitAmount: string;
  submittedDate: string;
  lastUpdated: string;
  currentStatus: ApplicationStatus;
  currentStepIndex: number;
  totalSteps: number;
  expectedNextStep: string;
  actionRequiredMessage?: string;
  actionRequiredType?: 'replace_document' | 'clarify_income' | 'sign_undertaking';
  timeline: ApplicationTimelineStep[];
}
