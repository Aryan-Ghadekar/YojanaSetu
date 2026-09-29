import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import type { SupportedLanguage } from '../../context/translations';
import {
  Mic,
  PhoneCall,
  Volume2,
  MessageSquare,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react';

type VoiceState = 'idle' | 'listening' | 'processing' | 'speaking';

const VoiceAssistanceView = () => {
  const { language, setLanguage, addNotification } = useApp();
  const navigate = useNavigate();

  const [voiceState, setVoiceState] = useState<VoiceState>('idle');
  const [transcript, setTranscript] = useState<Array<{ sender: 'user' | 'yojanaVoice'; text: string; time: string }>>([
    {
      sender: 'yojanaVoice',
      text: 'Namaste! Welcome to YojanaSetu Multilingual Voice Assistance. Tell us what government assistance or scheme you are looking for.',
      time: '14:24',
    },
  ]);

  const [phoneNumber, setPhoneNumber] = useState('9822019482');
  const [ivrDispatched, setIvrDispatched] = useState(false);

  const startVoiceInteraction = () => {
    if (voiceState === 'listening') {
      setVoiceState('idle');
      return;
    }

    setVoiceState('listening');

    setTimeout(() => {
      setVoiceState('processing');
      const userText = language === 'mr'
        ? 'मी पुण्याचा विद्यार्थी आहे, मला उच्च शिक्षणासाठी महाडीबीटी शिष्यवृत्ती आणि वसतिगृह भत्ता हवा आहे.'
        : language === 'hi'
        ? 'मैं पुणे का छात्र हूँ, मुझे उच्च शिक्षा के लिए स्कॉलरशिप और हॉस्टल सहायता चाहिए।'
        : 'I am a 21-year-old student from Pune looking for college scholarship and hostel assistance.';

      setTranscript((prev) => [
        ...prev,
        { sender: 'user', text: userText, time: '14:25' },
      ]);

      setTimeout(() => {
        setVoiceState('speaking');
        const replyText = language === 'mr'
          ? 'आपल्यासाठी डॉ. बाबासाहेब आंबेडकर स्वाधार योजना आणि पोस्ट-मॅट्रिक स्कॉलरशिप उपलब्ध आहे. यात प्रतिवर्ष ₹५१,००० थेट बँक खात्यात मिळतात.'
          : language === 'hi'
          ? 'आपके लिए डॉ. बाबासाहेब आंबेडकर स्वाधार योजना और पोस्ट-मैट्रिक स्कॉलरशिप उपयुक्त हैं। इसमें ₹51,000 प्रति वर्ष सीधे बैंक खाते में मिलते हैं।'
          : 'Based on your criteria, Dr. Babasaheb Ambedkar Swadhar Yojana and Post-Matric Scholarship match your profile, offering up to ₹51,000 per year.';

        setTranscript((prev) => [
          ...prev,
          { sender: 'yojanaVoice', text: replyText, time: '14:25' },
        ]);

        setTimeout(() => {
          setVoiceState('idle');
        }, 3000);
      }, 1200);
    }, 2500);
  };

  const handleSimulateIvrCall = (e: React.FormEvent) => {
    e.preventDefault();
    setIvrDispatched(true);
    addNotification({
      type: 'success',
      title: 'Toll-Free IVR Call Queued',
      message: `An automated IVR voice agent is dialing +91 ${phoneNumber} in your preferred language (${language.toUpperCase()}).`,
    });
  };

  return (
    <div className="space-y-8 pb-12 max-w-5xl mx-auto">

      {/* Top Header */}
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-slate-900">
          YojanaSetu Multilingual Voice & IVR Service
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Designed for high-accessibility citizen discovery via natural voice and toll-free telephone IVR across 7 Indian regional languages.
        </p>
      </div>

      {/* LANGUAGE SELECTOR STRIP */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <span className="font-semibold text-slate-900">Select Voice Language:</span>
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { code: 'en', label: 'English' },
            { code: 'hi', label: 'हिन्दी (Hindi)' },
            { code: 'mr', label: 'मराठी (Marathi)' },
            { code: 'ta', label: 'தமிழ் (Tamil)' },
            { code: 'te', label: 'తెలుగు (Telugu)' },
            { code: 'bn', label: 'বাংলা (Bengali)' },
            { code: 'gu', label: 'ગુજરાતી (Gujarati)' },
          ].map((item) => (
            <button
              key={item.code}
              onClick={() => setLanguage(item.code as SupportedLanguage)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                language === item.code
                  ? 'bg-brand-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* LARGE VOICE MICROPHONE INTERACTION HERO */}
      <div className="bg-gradient-to-br from-brand-900 via-brand-800 to-brand-950 text-white rounded-2xl p-8 sm:p-12 text-center border border-slate-800 shadow-md space-y-6 relative overflow-hidden">

        <div className="max-w-md mx-auto space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
            Interactive Speech Interface
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-white">
            {voiceState === 'listening' ? 'Listening to your speech...' :
             voiceState === 'processing' ? 'Analyzing speech acoustics & policy rules...' :
             voiceState === 'speaking' ? 'Speaking response in regional audio...' :
             'Tap the microphone and tell us what you need'}
          </h2>
          <p className="text-xs text-slate-300">
            "Tell us what government assistance you are looking for."
          </p>
        </div>

        {/* Animated Mic Button */}
        <div className="py-4 flex justify-center items-center">
          <button
            onClick={startVoiceInteraction}
            className={`w-28 h-28 rounded-full flex items-center justify-center transition-all transform hover:scale-105 active:scale-95 shadow-2xl relative ${
              voiceState === 'listening' ? 'bg-rose-600 ring-8 ring-rose-400/40 animate-pulse' :
              voiceState === 'processing' ? 'bg-amber-500 ring-8 ring-amber-300/40' :
              voiceState === 'speaking' ? 'bg-emerald-600 ring-8 ring-emerald-400/40' :
              'bg-brand-600 hover:bg-brand-500 ring-8 ring-brand-500/20'
            }`}
          >
            {voiceState === 'listening' ? (
              <Mic className="w-12 h-12 text-white" />
            ) : voiceState === 'processing' ? (
              <RefreshCw className="w-12 h-12 text-white animate-spin" />
            ) : voiceState === 'speaking' ? (
              <Volume2 className="w-12 h-12 text-white animate-bounce" />
            ) : (
              <Mic className="w-12 h-12 text-white" />
            )}
          </button>
        </div>

        {/* State label */}
        <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
          Current State: <strong className="text-white">{voiceState.toUpperCase()}</strong>
        </div>

      </div>

      {/* TWO-COLUMN GRID: TRANSCRIPT (6 COLS) + TOLL-FREE IVR TELEPHONE WORKFLOW (6 COLS) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Left: Conversation Transcript */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-slate-500" />
              <h3 className="text-sm font-bold text-slate-900">Speech Conversation Transcript</h3>
            </div>
            <span className="text-[11px] font-mono text-slate-400">{transcript.length} turns</span>
          </div>

          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {transcript.map((item, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl text-xs space-y-1 ${
                  item.sender === 'user'
                    ? 'bg-brand-50 text-brand-950 ml-6 border border-brand-100'
                    : 'bg-slate-50 text-slate-800 mr-6 border border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                  <span>{item.sender === 'user' ? 'Citizen' : 'YojanaSetu Voice Engine'}</span>
                  <span>{item.time}</span>
                </div>
                <p className="leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Extracted Scheme: Swadhar Yojana</span>
            <button
              onClick={() => navigate('/schemes/maha-swadhar-2026')}
              className="text-brand-700 font-semibold hover:underline"
            >
              View Scheme Page →
            </button>
          </div>
        </div>

        {/* Right: Simulated IVR Telephone Flow */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-emerald-600" />
              <h3 className="text-sm font-bold text-slate-900">Toll-Free IVR Telephone Engine</h3>
            </div>
            <span className="text-[11px] font-mono text-slate-500">1800-267-SETU</span>
          </div>

          {/* 5-Step Simulated Flow */}
          <div className="space-y-2 text-xs">
            <div className="font-semibold text-slate-900">Standard 5-Step Voice IVR Architecture:</div>

            <div className="space-y-2">
              {[
                { step: 1, title: 'Select Language', desc: 'DTMF or automated voice recognition (Hindi, Marathi, Tamil, etc.)' },
                { step: 2, title: 'Identify Requirement', desc: 'Acoustic keyword clustering (Education, Farmer, Housing, Pension)' },
                { step: 3, title: 'Verify Basic Information', desc: 'Voice query for age, district, and category' },
                { step: 4, title: 'Find Relevant Schemes', desc: 'Rule engine matches top 2 eligibility programs' },
                { step: 5, title: 'Send Details via SMS / WhatsApp', desc: 'Instant dispatch of official link and application ID' },
              ].map((s) => (
                <div key={s.step} className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-brand-700 text-white font-mono text-[10px] flex items-center justify-center font-bold shrink-0">
                    {s.step}
                  </span>
                  <div>
                    <span className="font-bold text-slate-800 block">{s.title}</span>
                    <span className="text-slate-500 text-[11px] block">{s.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trigger IVR Call Box */}
          <form onSubmit={handleSimulateIvrCall} className="space-y-3 pt-2 border-t border-slate-100">
            <label className="block text-xs font-semibold text-slate-800">
              Request Automated Citizen Callback (Dial via IVR)
            </label>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-slate-500 text-xs">
                  +91
                </span>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full pl-11 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg font-mono focus:bg-white focus:border-brand-600 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call via IVR</span>
              </button>
            </div>

            {ivrDispatched && (
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-[11px] text-emerald-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Call scheduled. Dialing citizen phone in {language.toUpperCase()}...</span>
              </div>
            )}
          </form>

        </div>

      </div>

    </div>
  );
};

export default VoiceAssistanceView;
