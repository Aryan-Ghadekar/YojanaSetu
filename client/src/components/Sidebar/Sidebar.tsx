import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import Logo from '../ui/Logo';
import {
  Home,
  Search,
  CheckCircle,
  FolderLock,
  FileText,
  Bot,
  Scale,
  TrendingUp,
  User,
  HelpCircle,
  Globe,
  Settings,
  Mic,
  BarChart3,
  MapPin,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import type { ComponentType } from 'react';

interface NavItem {
  path: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  badge?: string;
  matchPrefixes?: string[];
}

const Sidebar = () => {
  const { t, userRole, language, setLanguage } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const citizenNavItems: NavItem[] = [
    { path: '/home', label: t.home, icon: Home },
    { path: '/schemes', label: t.findSchemes, icon: Search, matchPrefixes: ['/schemes/results', '/schemes'] },
    { path: '/eligibility/borderline', label: t.myEligibility, icon: CheckCircle },
    { path: '/documents', label: t.myDocuments, icon: FolderLock, matchPrefixes: ['/documents'] },
    { path: '/applications', label: t.applications, icon: FileText, matchPrefixes: ['/applications'] },
    { path: '/copilot', label: t.copilot, icon: Bot },
    { path: '/schemes/compare', label: t.compareSchemes, icon: Scale },
    { path: '/benefits', label: t.benefitsUtilization, icon: TrendingUp },
    { path: '/voice', label: 'Voice Assistant', icon: Mic },
    { path: '/profile', label: t.profile, icon: User },
  ];

  const adminNavItems: NavItem[] = [
    { path: '/admin', label: 'Geographic Insights', icon: MapPin },
    { path: '/admin/scheme-utilization', label: 'Scheme Analytics', icon: BarChart3 },
    { path: '/documents/authenticity', label: 'Fraud & Signal Audit', icon: ShieldAlert },
  ];

  const isActive = (item: NavItem) => {
    const prefixes = item.matchPrefixes ?? [item.path];
    return prefixes.some((prefix) => location.pathname.startsWith(prefix));
  };

  return (
    <aside className="w-64 bg-white text-slate-600 flex flex-col shrink-0 border-r border-slate-200 select-none min-h-[calc(100vh-4rem)]">

      {/* Role Banner / Context */}
      <div className="p-3 border-b border-slate-100">
        <div className="flex items-center bg-slate-50 rounded-lg p-2 text-xs border border-slate-200">
          <span className="font-medium text-slate-700">
            {userRole === 'citizen' ? 'Citizen Interface' : 'Government Officer Portal'}
          </span>
        </div>
      </div>

      {/* Main Navigation List */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {userRole === 'citizen' ? (
          <>
            <div className="px-3 pb-2 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              Citizen Discovery
            </div>
            {citizenNavItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item);

              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors group ${
                    active
                      ? 'bg-brand-50 text-brand-700 font-semibold border-l-2 border-brand-600'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border-l-2 border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-brand-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                      item.badge.includes('Action')
                        ? 'bg-rose-100 text-rose-700'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </>
        ) : (
          <>
            <div className="px-3 pb-2 text-[10px] font-semibold text-purple-500 uppercase tracking-wider">
              Administration & Analytics
            </div>
            {adminNavItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item);
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors group ${
                    active
                      ? 'bg-purple-50 text-purple-700 font-semibold border-l-2 border-purple-500'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border-l-2 border-transparent'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-purple-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}

            <div className="pt-4 px-3 pb-2 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              Cross-Inspect Citizen View
            </div>
            <button
              onClick={() => navigate('/home')}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-colors"
            >
              <Home className="w-4 h-4 text-slate-400" />
              <span>Back to Citizen Portal</span>
            </button>
          </>
        )}

        {/* Highlight Card for Copilot Assistance */}
        <div className="pt-4">
          <div className="p-3 bg-gradient-to-br from-brand-50 to-accent-50 rounded-xl border border-brand-100 text-xs">
            <div className="flex items-center gap-1.5 text-brand-700 font-semibold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Need Policy Guidance?</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              YojanaSetu Copilot can verify ambiguous income slabs or find missing certificates.
            </p>
            <button
              onClick={() => navigate('/copilot')}
              className="mt-2 w-full py-1.5 px-2 bg-brand-600 hover:bg-brand-700 text-white rounded font-medium text-[11px] text-center transition-colors"
            >
              Ask Copilot Now
            </button>
          </div>
        </div>
      </nav>

      {/* Bottom Section: Help, Language, Settings */}
      <div className="p-3 border-t border-slate-100 space-y-1">
        <button
          onClick={() => navigate('/voice')}
          className="w-full flex items-center gap-2.5 px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors"
        >
          <HelpCircle className="w-4 h-4 text-slate-400" />
          <span>{t.helpSupport}</span>
        </button>

        <button
          onClick={() => {
            const nextLang = language === 'en' ? 'hi' : language === 'hi' ? 'mr' : 'en';
            setLanguage(nextLang);
          }}
          className="w-full flex items-center justify-between px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <Globe className="w-4 h-4 text-slate-400" />
            <span>{t.language}</span>
          </div>
          <span className="text-[10px] font-mono text-slate-400 uppercase">{language}</span>
        </button>

        <button
          onClick={() => navigate('/profile')}
          className="w-full flex items-center gap-2.5 px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors"
        >
          <Settings className="w-4 h-4 text-slate-400" />
          <span>{t.settings}</span>
        </button>

        <div className="pt-2 flex justify-center">
          <Logo markOnly height={18} className="opacity-60" />
        </div>
        <div className="text-[10px] text-slate-400 font-mono text-center">
          YojanaSetu National Portal · v2026
        </div>
      </div>

    </aside>
  );
};

export default Sidebar;
