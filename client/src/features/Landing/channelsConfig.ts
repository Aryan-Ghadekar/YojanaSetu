import { Globe, Mic, Building2, Phone } from 'lucide-react';
import type { ComponentType } from 'react';

export interface ChannelOption {
  title: string;
  description: string;
  icon: ComponentType<{ size?: number | string; className?: string }>;
  action: string;
}

export const channelOptions: ChannelOption[] = [
  { title: 'Web Portal', description: 'Discover and apply for schemes from any browser', icon: Globe, action: '/schemes' },
  { title: 'Voice Assistant', description: 'Speak in your language, no typing required', icon: Mic, action: '/voice' },
  { title: 'Common Service Centre', description: 'Visit a local CSC kiosk for in-person help', icon: Building2, action: '/schemes' },
  { title: 'Toll-Free Helpline', description: 'Call 1800-267-SETU to speak with an agent', icon: Phone, action: '/voice' },
];
