export interface HowItWorksStep {
  step: number;
  title: string;
  description: string;
}

export const howItWorksSteps: HowItWorksStep[] = [
  { step: 1, title: 'Tell us about yourself', description: 'Age, income, occupation, and location — takes under two minutes' },
  { step: 2, title: 'We match eligible schemes', description: 'Rule-engine cross-checks 120+ Central & State welfare programs' },
  { step: 3, title: 'Verify with DigiLocker', description: 'Sync documents instantly instead of hunting for paperwork' },
  { step: 4, title: 'Apply & track in one place', description: 'Submit guided applications and follow every status update' },
];
