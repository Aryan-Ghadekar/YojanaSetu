import type { CopilotMessage } from './types';

export const initialCopilotMessages: CopilotMessage[] = [
  {
    id: 'msg-init-1',
    sender: 'copilot',
    text: 'Namaste Rahul! I am your YojanaSetu Application Copilot. I have inspected your verified profile and uploaded documents.',
    timestamp: '14:20',
  },
  {
    id: 'msg-init-2',
    sender: 'copilot',
    text: 'Notice: Your uploaded Income Certificate (MH-REV-2025) has a mild lens reflection near the Tehsildar seal, but the income of ₹2,10,000 is clearly extracted. Would you like me to prefill this into the Swadhar application form?',
    timestamp: '14:21',
    contextStep: 'Documents Verification',
    suggestedAction: {
      type: 'use_value',
      payload: '₹2,10,000',
      label: 'Use ₹2,10,000',
    },
    fieldHighlight: 'Annual Family Income',
    videoGuide: {
      title: 'How to download certified Tehsildar Income Certificate from Aaple Sarkar',
      duration: '3:45',
      channel: 'MahaDBT Official Citizen Help',
    },
  },
];
