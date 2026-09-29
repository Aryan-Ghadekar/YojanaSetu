import { GraduationCap, Tractor, HeartPulse, Home, Briefcase, Wallet } from 'lucide-react';
import type { ComponentType } from 'react';

export interface ImpactTickerItem {
  icon: ComponentType<{ size?: number | string; className?: string }>;
  text: string;
  place: string;
}

export const impactTickerItems: ImpactTickerItem[] = [
  { icon: GraduationCap, text: 'Swadhar hostel scholarship matched & approved', place: 'Pune, Maharashtra' },
  { icon: Tractor, text: 'Solar pump subsidy disbursed to farmer', place: 'Nagpur, Maharashtra' },
  { icon: HeartPulse, text: 'Health insurance cover activated for family', place: 'Nashik, Maharashtra' },
  { icon: Home, text: 'Housing subsidy application cleared for verification', place: 'Solapur, Maharashtra' },
  { icon: Briefcase, text: 'Women enterprise credit scheme matched', place: 'Kolhapur, Maharashtra' },
  { icon: Wallet, text: 'Direct benefit transfer credited for fee reimbursement', place: 'Gadchiroli, Maharashtra' },
];
