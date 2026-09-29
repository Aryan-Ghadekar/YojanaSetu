import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Scheme } from '../Schemes/types';
import type { CopilotMessage, CopilotSuggestedAction } from './types';
import { initialCopilotMessages } from './mockData';
import { generateCopilotReply } from './api';
import {
  Bot,
  Send,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  Video,
  ChevronRight,
} from 'lucide-react';

interface CopilotChatProps {
  scheme: Scheme;
}

const CopilotChat = ({ scheme }: CopilotChatProps) => {
  const navigate = useNavigate();
  const [copilotMessages, setCopilotMessages] = useState<CopilotMessage[]>(initialCopilotMessages);
  const [inputVal, setInputVal] = useState('');

  const sendMessage = async (text: string) => {
    const userMsg: CopilotMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setCopilotMessages((prev) => [...prev, userMsg]);
    const reply = await generateCopilotReply(text);
    setCopilotMessages((prev) => [...prev, reply]);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    const text = inputVal;
    setInputVal('');
    await sendMessage(text);
  };

  const clearCopilotContext = () => {
    setCopilotMessages([
      {
        id: 'msg-reset',
        sender: 'copilot',
        text: 'Context refreshed. Ask me any question about scheme eligibility, rule codes, document requirements, or your application status.',
        timestamp: 'Just now',
      },
    ]);
  };

  const handleSuggestedAction = (action: CopilotSuggestedAction) => {
    if (action.type === 'use_value' || action.type === 'fill_field') {
      navigate(`/applications/new/${scheme.id}`);
    } else if (action.type === 'open_link') {
      navigate(action.payload);
    } else if (action.type === 'reupload') {
      navigate('/documents');
    } else if (action.type === 'compare') {
      navigate('/schemes');
    }
  };

  return (
    <div className="space-y-6 pb-12 max-w-6xl mx-auto">

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold tracking-tight text-slate-900">
              YojanaSetu Copilot
            </h1>
            <span className="text-xs bg-amber-100 text-amber-900 font-semibold px-2 py-0.5 rounded flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-700" />
              <span>Grounded Citizen Policy Assistant</span>
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Context-aware guidance for government eligibility rules, missing document resolution, and guided form filling.
          </p>
        </div>

        <button
          onClick={clearCopilotContext}
          className="text-xs font-medium text-slate-600 hover:text-slate-900 px-3 py-1.5 border border-slate-200 rounded-md hover:bg-slate-50 transition-colors"
        >
          Reset Session
        </button>
      </div>

      {/* TWO-COLUMN COPILOT WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* LEFT COLUMN: ACTIVE APPLICATION STATUS TRACKER (4 COLS) */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-5">
          <div className="space-y-1">
            <span className="text-[11px] font-mono text-slate-500 uppercase">Active Application Context</span>
            <h3 className="font-bold text-slate-900 text-sm">
              {scheme.name}
            </h3>
            <p className="text-[11px] text-slate-600">
              {scheme.department}
            </p>
          </div>

          {/* Step Progress 2 of 6 */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-slate-900">Application Progress</span>
              <span className="font-mono text-amber-700">Step 3 of 6 (Documents)</span>
            </div>

            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-amber-500 h-full rounded-full transition-all" style={{ width: '50%' }} />
            </div>
          </div>

          {/* Stepper Checklist */}
          <div className="space-y-2.5 text-xs">
            <div className="flex items-center gap-2 text-slate-700 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="line-through text-slate-500">1. Verified Citizen Profile</span>
            </div>

            <div className="flex items-center gap-2 text-slate-700 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="line-through text-slate-500">2. Eligibility Rules Cross-Check</span>
            </div>

            <div className="flex items-center gap-2 font-bold text-amber-900 bg-amber-50/80 p-2 rounded-lg border border-amber-200">
              <ArrowRight className="w-4 h-4 text-amber-600 shrink-0" />
              <span>3. Document Ingestion & Verification</span>
            </div>

            <div className="flex items-center gap-2 text-slate-600">
              <div className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center text-[10px]">4</div>
              <span>4. Application Form Filling</span>
            </div>

            <div className="flex items-center gap-2 text-slate-600">
              <div className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center text-[10px]">5</div>
              <span>5. Aadhaar e-Sign & Review</span>
            </div>

            <div className="flex items-center gap-2 text-slate-600">
              <div className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center text-[10px]">6</div>
              <span>6. Final Submission to Portal</span>
            </div>
          </div>

          {/* Quick Context Highlights */}
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-2 text-xs">
            <div className="font-semibold text-slate-900">Copilot Verification Focus:</div>
            <div className="text-slate-600 text-[11px] leading-relaxed">
              • Income ceiling: ≤ ₹2,50,000 (Compliant: ₹2,10,000)<br />
              • Missing: Hostel Non-Allotment Certificate<br />
              • Quality note: Tehsildar rubber seal mild glare
            </div>
          </div>

          <button
            onClick={() => navigate(`/applications/new/${scheme.id}`)}
            className="w-full py-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs rounded-md transition-colors flex items-center justify-center gap-2"
          >
            <span>Open Form Assistant</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* RIGHT COLUMN: INTERACTIVE COPILOT CHAT FEED (8 COLS) */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl shadow-xs flex flex-col h-[650px]">

          {/* Chat Header */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-800 flex items-center justify-center">
                <Bot className="w-5 h-5 text-amber-700" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">YojanaSetu Copilot Conversation</h3>
                <span className="text-[11px] text-emerald-700 flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Rule Engine Grounded · Verified Policy Norms</span>
                </span>
              </div>
            </div>

            <div className="text-[11px] text-slate-600 font-mono">
              Scheme Ref: #SWD-MH-26
            </div>
          </div>

          {/* Message List */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {copilotMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 text-xs ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'copilot' && (
                  <div className="w-7 h-7 rounded-full bg-brand-700 text-accent-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-xl space-y-2.5 ${msg.sender === 'user' ? 'items-end' : ''}`}>
                  <div className={`p-3.5 rounded-2xl leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-brand-700 text-white rounded-tr-none'
                      : 'bg-slate-50 text-slate-900 border border-slate-200/80 rounded-tl-none'
                  }`}>
                    {msg.text}

                    {msg.fieldHighlight && (
                      <div className="mt-2 p-2 bg-amber-50/80 border border-amber-200 rounded-md text-[11px] text-amber-900 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                        <span>Highlighted Field: <strong>{msg.fieldHighlight}</strong></span>
                      </div>
                    )}

                    {msg.videoGuide && (
                      <div className="mt-3 p-3 bg-white border border-slate-200 rounded-lg flex items-center justify-between gap-3 text-[11px]">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                            <Video className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="font-semibold text-slate-900 block truncate max-w-[280px]">
                              {msg.videoGuide.title}
                            </span>
                            <span className="text-slate-500 font-mono">
                              {msg.videoGuide.duration} · {msg.videoGuide.channel}
                            </span>
                          </div>
                        </div>
                        <a
                          href="https://youtube.com"
                          target="_blank"
                          rel="noreferrer"
                          className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-semibold whitespace-nowrap"
                        >
                          Watch Guide
                        </a>
                      </div>
                    )}
                  </div>

                  {msg.suggestedAction && (
                    <div className="flex items-center gap-2 pt-0.5">
                      <button
                        onClick={() => handleSuggestedAction(msg.suggestedAction!)}
                        className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold rounded-lg text-xs transition-colors flex items-center gap-1.5 shadow-xs"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                        <span>{msg.suggestedAction.label}</span>
                      </button>
                    </div>
                  )}

                  <span className="text-[10px] text-slate-600 font-mono block px-1">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Prompt Suggestions */}
          <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center gap-2 overflow-x-auto text-[11px]">
            <span className="text-slate-600 shrink-0 font-medium">Quick ask:</span>
            <button
              onClick={() => sendMessage('Is my income certificate of ₹2,10,000 valid for the Swadhar scheme?')}
              className="px-2.5 py-1 bg-white border border-slate-200 hover:border-slate-300 rounded text-slate-700 whitespace-nowrap transition-colors"
            >
              "Income limit validity?"
            </button>
            <button
              onClick={() => sendMessage('Where can I download the Hostel Non-Allotment Annexure-B?')}
              className="px-2.5 py-1 bg-white border border-slate-200 hover:border-slate-300 rounded text-slate-700 whitespace-nowrap transition-colors"
            >
              "Hostel certificate format?"
            </button>
            <button
              onClick={() => sendMessage('Guide me through the application form step by step.')}
              className="px-2.5 py-1 bg-white border border-slate-200 hover:border-slate-300 rounded text-slate-700 whitespace-nowrap transition-colors"
            >
              "Start guided form filling"
            </button>
          </div>

          {/* Input Box */}
          <form onSubmit={handleSend} className="p-3 border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask Copilot: eligibility rules, certificate formats, reason for field questions..."
              className="flex-1 py-2 px-3 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-brand-600 focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>

      </div>

    </div>
  );
};

export default CopilotChat;
