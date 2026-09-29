import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import MainHeader from './MainHeader';
import Sidebar from '../Sidebar/Sidebar';
import TricolorBar from '../ui/TricolorBar';
import Logo from '../ui/Logo';
import { Bot, Mic, Menu, X } from 'lucide-react';

const MainLayout = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans">

      {/* Civic Identity Strip */}
      <TricolorBar />

      {/* Top Header Contract */}
      <MainHeader />

      {/* Main Shell: Sidebar + Content */}
      <div className="flex-1 flex overflow-hidden">

        {/* Desktop Persistent Sidebar */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        {/* Mobile Sidebar Overlay Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="relative w-72 max-w-[85vw] bg-white z-10 flex flex-col shadow-2xl">
              <div className="p-3 flex items-center justify-between border-b border-slate-100 bg-brand-700">
                <div className="flex items-center gap-2">
                  <Logo markOnly height={22} />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    YojanaSetu Menu
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-white/70 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto" onClick={() => setMobileMenuOpen(false)}>
                <Sidebar />
              </div>
            </div>
          </div>
        )}

        {/* Main Viewport Content Area */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 max-w-[1600px] w-full mx-auto">

          {/* Mobile Bar for Menu Toggle & Quick Page Title */}
          <div className="lg:hidden flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold bg-white border border-slate-200 rounded-lg text-slate-700 shadow-xs"
            >
              <Menu className="w-4 h-4" />
              <span>Menu</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/voice')}
                className="p-1.5 bg-amber-50 text-amber-800 border border-amber-200 rounded-lg text-xs font-semibold flex items-center gap-1"
              >
                <Mic className="w-3.5 h-3.5 text-amber-600" />
                <span>Voice</span>
              </button>
              <button
                onClick={() => navigate('/copilot')}
                className="p-1.5 bg-brand-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1"
              >
                <Bot className="w-3.5 h-3.5 text-accent-300" />
                <span>Copilot</span>
              </button>
            </div>
          </div>

          {/* Active View Container */}
          <div className="animate-in fade-in duration-200">
            <Outlet />
          </div>

        </main>

      </div>

      {/* Trust & Public Governance Footer */}
      <footer className="bg-brand-900 text-slate-300">
        <TricolorBar />
        <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left py-4 px-6 text-xs">
          <div className="flex items-center gap-2.5 font-medium text-slate-100">
            <Logo markOnly height={18} />
            <span>YojanaSetu</span>
            <span className="text-slate-500">·</span>
            <span className="text-slate-400 font-normal">National Citizen Policy Discovery & Welfare Delivery Platform</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>Official Rules Grounded in Central & State Gazettes</span>
            <span>·</span>
            <span>Privacy & IT Act 2000 Compliant</span>
            <span>·</span>
            <button
              onClick={() => navigate('/voice')}
              className="text-accent-400 hover:text-accent-300 hover:underline font-semibold"
            >
              1800-267-SETU
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default MainLayout;
