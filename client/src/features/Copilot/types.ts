export interface CopilotSuggestedAction {
  type: 'use_value' | 'reupload' | 'fill_field' | 'open_link' | 'compare';
  payload: string;
  label: string;
}

export interface CopilotVideoGuide {
  title: string;
  duration: string;
  channel: string;
}

export interface CopilotMessage {
  id: string;
  sender: 'copilot' | 'user';
  text: string;
  timestamp: string;
  contextStep?: string;
  suggestedAction?: CopilotSuggestedAction;
  fieldHighlight?: string;
  videoGuide?: CopilotVideoGuide;
}
