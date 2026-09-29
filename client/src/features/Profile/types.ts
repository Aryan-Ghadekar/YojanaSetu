export type CasteCategory = 'General' | 'OBC' | 'SC' | 'ST' | 'EWS';

export interface UserProfile {
  fullName: string;
  age: number;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Transgender' | 'Other';
  state: string;
  district: string;
  taluka: string;
  residenceType: 'Rural' | 'Urban';
  occupation: string;
  annualIncome: number;
  casteCategory: CasteCategory;
  educationLevel: string;
  familyMembers: number;
  isStudent: boolean;
  isDifferentlyAbled: boolean;
  landHoldingAcres: number;
  aadhaarLinked: boolean;
  digiLockerConnected: boolean;
  completenessPercentage: number;
}
