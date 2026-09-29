import type { CopilotMessage } from './types';

const MOCK_LATENCY_MS = 700;
const delay = <T,>(value: T, ms = MOCK_LATENCY_MS): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms));

const nowLabel = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

export const generateCopilotReply = (userText: string): Promise<CopilotMessage> => {
  const lower = userText.toLowerCase();
  let reply: CopilotMessage;

  if (lower.includes('income') || lower.includes('2,10,000') || lower.includes('limit') || lower.includes('threshold')) {
    reply = {
      id: `msg-bot-${Date.now()}`,
      sender: 'copilot',
      text: 'Regarding your income: Your Tehsildar Certificate shows ₹2,10,000. For the Swadhar Scheme, the ceiling is ₹2,50,000 so you are completely eligible. For the Chhatrapati Shahu Maharaj Scheme, ₹2,00,000 is the 100% full waiver threshold, but you qualify for the 50% tuition waiver tier (up to ₹8,00,000). Would you like to check the borderline guidelines?',
      timestamp: nowLabel(),
      contextStep: 'Income Eligibility',
      suggestedAction: {
        type: 'open_link',
        payload: '/eligibility/borderline',
        label: 'View Borderline Analysis',
      },
    };
  } else if (lower.includes('document') || lower.includes('missing') || lower.includes('hostel')) {
    reply = {
      id: `msg-bot-${Date.now()}`,
      sender: 'copilot',
      text: 'For the Swadhar Scheme, you have 5 out of 6 required documents. The single missing document is the "Hostel Non-Allotment Certificate". You can download the standard Maharashtra Social Justice Annexure-B format, sign it, and upload it directly.',
      timestamp: nowLabel(),
      suggestedAction: {
        type: 'reupload',
        payload: 'hostel_undertaking',
        label: 'Download Annexure-B Template',
      },
      videoGuide: {
        title: 'Swadhar Scheme Non-Allotment Certificate Guide',
        duration: '2:15',
        channel: 'YojanaSetu Video Portal',
      },
    };
  } else if (lower.includes('apply') || lower.includes('start') || lower.includes('how')) {
    reply = {
      id: `msg-bot-${Date.now()}`,
      sender: 'copilot',
      text: 'I can guide you step-by-step through the application assistant right now! All your verified Aadhaar, domicile, and academic records will be automatically autofilled with complete transparency.',
      timestamp: nowLabel(),
      suggestedAction: {
        type: 'fill_field',
        payload: 'application-assistant',
        label: 'Open Application Assistant',
      },
    };
  } else {
    reply = {
      id: `msg-bot-${Date.now()}`,
      sender: 'copilot',
      text: `I understood: "${userText}". Based on your 21-year age, Maharashtra domicile, and OBC status, you qualify for 3 education schemes, 1 farmer subsidy (through your family 1.8-acre land), and rooftop solar. How would you like me to assist you next?`,
      timestamp: nowLabel(),
      suggestedAction: {
        type: 'compare',
        payload: 'find-schemes',
        label: 'Browse Verified Schemes',
      },
    };
  }

  return delay(reply);
};
