import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import type { SupportedLanguage } from '../../context/translations';
import Logo from '../ui/Logo';
import {
  Bell,
  ShieldCheck,
  Globe2,
  Search,
  ChevronDown,
  Check,
  X,
  AlertCircle,
  Mic,
  LogOut,
} from 'lucide-react';

const languages: { code: SupportedLanguage; label: string; native: string }[] = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { code: 'mr', label: 'Marathi', native: 'मराठी' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు' },
  { code: 'bn', label: 'Bengali', native: 'বাংলা' },
  { code: 'gu', label: 'Gujarati', native: 'ગુજરાતી' },
];

const MainHeader = () => {
  const {
    language,
    setLanguage,
    notifications,
    dismissNotification,
    userProfile,
    setIsAuthenticated,
  } = useApp();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/schemes/results?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">

        {/* ZONE 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => navigate('/home')}
            className="flex items-center gap-2.5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded-lg p-1"
          >
            <Logo variant="compact" height={42} className="transition-transform group-hover:scale-105" />
            <span className="hidden sm:block text-[10px] tracking-wide text-slate-600 font-medium border-l border-slate-200 pl-2.5 ml-0.5 leading-tight max-w-[92px]">
              Government Policy &amp; Citizen Assistant
            </span>
          </button>
        </div>

        {/* ZONE 2: Global Search Bar */}
        <div className="hidden md:flex items-center flex-1 max-w-xl mx-4">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search schemes by benefit, education, farmer, disability, state..."
              className="w-full pl-10 pr-24 py-2 text-sm bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-slate-900 placeholder:text-slate-500 rounded-lg border border-slate-200 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 transition-colors"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <button
                type="button"
                onClick={() => navigate('/voice')}
                title="Search using Voice"
                className="p-1 text-slate-600 hover:text-amber-700 hover:bg-amber-50 rounded transition-colors"
              >
                <Mic className="w-4 h-4" />
              </button>
              <button
                type="submit"
                className="px-2 py-0.5 text-xs font-semibold text-white bg-brand-600 rounded hover:bg-brand-700 transition-colors"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        {/* ZONE 3: Actions & Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">

          {/* DigiLocker Status Indicator Button */}
          <button
            onClick={() => navigate('/documents/digilocker')}
            className={`hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium border transition-colors whitespace-nowrap ${
              userProfile.digiLockerConnected
                ? 'bg-accent-50 text-accent-700 border-accent-200 hover:bg-accent-100'
                : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-accent-600" />
            <span>{userProfile.digiLockerConnected ? 'DigiLocker Linked' : 'Connect DigiLocker'}</span>
          </button>

          {/* Multilingual Selector */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-md transition-colors"
              aria-label="Select Language"
            >
              <Globe2 className="w-3.5 h-3.5 text-slate-500" />
              <span className="font-semibold uppercase tracking-wider">{language}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showLangMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  Select Language / भाषा
                </div>
                {languages.map((item) => (
                  <button
                    key={item.code}
                    onClick={() => {
                      setLanguage(item.code);
                      setShowLangMenu(false);
                    }}
                    className="w-full px-3 py-1.5 text-left text-xs flex items-center justify-between hover:bg-slate-50 text-slate-700 transition-colors"
                  >
                    <span className="font-medium text-slate-900">{item.native}</span>
                    <span className="text-slate-400 text-[11px]">{item.label}</span>
                    {language === item.code && <Check className="w-3.5 h-3.5 text-accent-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications Flyout */}
          <div className="relative">
            <button
              onClick={() => setShowNotifMenu(!showNotifMenu)}
              className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4" />
              {notifications.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-flag-saffron rounded-full" />
              )}
            </button>

            {showNotifMenu && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-slate-200 rounded-lg shadow-xl py-2 z-50">
                <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-900">Notifications & Alerts</span>
                  <span className="text-[11px] font-mono text-slate-400">{notifications.length} active</span>
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-xs text-slate-500">
                      No pending alerts. All your application dossiers are up to date.
                    </div>
                  ) : (
                    notifications.map((n) => (
                      <div key={n.id} className="p-3 hover:bg-slate-50 transition-colors text-xs">
                        <div className="flex items-start justify-between gap-2">
                          <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                            {n.type === 'warning' && <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />}
                            {n.type === 'success' && <ShieldCheck className="w-3.5 h-3.5 text-accent-600 shrink-0" />}
                            <span>{n.title}</span>
                          </div>
                          <button
                            onClick={() => dismissNotification(n.id)}
                            className="text-slate-400 hover:text-slate-600 p-0.5"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="text-slate-600 mt-1 leading-relaxed">{n.message}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-[10px] text-slate-400 font-mono">{n.timestamp}</span>
                          {n.actionText && (
                            <button
                              onClick={() => {
                                if (n.actionTarget) navigate(n.actionTarget);
                                setShowNotifMenu(false);
                              }}
                              className="text-[11px] font-semibold text-brand-600 hover:text-brand-800 underline underline-offset-2"
                            >
                              {n.actionText} →
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Thumbnail */}
          <button
            onClick={() => navigate('/profile')}
            className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-md hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
            title="View Citizen Profile"
          >
            <div className="w-7 h-7 rounded-full bg-brand-700 text-white flex items-center justify-center text-xs font-semibold">
              RP
            </div>
            <div className="hidden xl:flex flex-col text-left">
              <span className="text-sm font-semibold text-slate-800 leading-none truncate max-w-[110px]">
                {userProfile.fullName}
              </span>
              <span className="text-[10px] text-slate-600 leading-none mt-1">
                {userProfile.district}, {userProfile.state}
              </span>
            </div>
          </button>

          {/* Sign Out */}
          <button
            onClick={() => {
              setIsAuthenticated(false);
              navigate('/');
            }}
            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
            title="Sign Out"
            aria-label="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
};

export default MainHeader;
