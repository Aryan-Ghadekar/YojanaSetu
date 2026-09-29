export type MatchStatus = 'Strong match' | 'Potential match' | 'Borderline' | 'Not currently eligible';

export type SchemeCategory =
  | 'Education & Scholarships'
  | 'Agriculture & Farmers'
  | 'Healthcare & Wellness'
  | 'Housing & Shelter'
  | 'Women & Child Development'
  | 'Skill & Employment'
  | 'Social Welfare & Pension'
  | 'Micro & Small Business';

export type Level = 'Central' | 'State (Maharashtra)' | 'State (Uttar Pradesh)' | 'State (Tamil Nadu)';

export interface EligibilityCriterion {
  id: string;
  label: string;
  requirement: string;
  userStatus: 'Meets' | 'Borderline' | 'Does not meet' | 'Requires Document' | 'Unknown';
  explanation: string;
  ruleCode?: string;
}

export interface RequiredDocument {
  id: string;
  name: string;
  isAvailable: boolean;
  status: 'verified' | 'needs_review' | 'missing' | 'unclear';
  extractedValue?: string;
  notes?: string;
}

export interface Scheme {
  id: string;
  name: string;
  shortName: string;
  department: string;
  ministry: string;
  level: Level;
  category: SchemeCategory;
  benefitAmount: string;
  benefitType: 'Direct Benefit Transfer' | 'Scholarship & Fee Waiver' | 'Subsidy & Grant' | 'Credit / Loan Support' | 'Health Insurance';
  benefitFrequency: 'Annual' | 'One-time' | 'Quarterly' | 'Per Semester';
  matchScore: number; // 0-100 internal score for ranking
  matchStatus: MatchStatus;
  keyReason: string;
  targetAudience: string;
  deadline?: string;
  officialPortal: string;
  lastVerifiedDate: string;
  processingTime: string;
  complexity: 'Low' | 'Medium' | 'High';
  eligibilityCriteria: EligibilityCriterion[];
  documents: RequiredDocument[];
  applicationSteps: string[];
  summary: string;
  maxIncomeLimit: number; // in INR
  minAge: number;
  maxAge: number;
  eligibleGenders: ('All' | 'Female' | 'Male' | 'Transgender')[];
  eligibleStates: string[];
}
