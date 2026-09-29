import { useNavigate } from 'react-router-dom';
import TricolorBar from '../ui/TricolorBar';
import Logo from '../ui/Logo';

const PublicFooter = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-brand-900 text-xs text-slate-400">
      <TricolorBar />
      <div className="mx-auto max-w-6xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div className="flex items-center gap-2.5 font-medium text-slate-100">
          <Logo markOnly height={18} />
          <span>YojanaSetu</span>
          <span className="text-slate-500">·</span>
          <span className="text-slate-400 font-normal">National Citizen Policy Discovery & Welfare Delivery Platform</span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <span>·</span>
          <a href="#" className="hover:text-white transition-colors">Accessibility</a>
          <span>·</span>
          <button onClick={() => navigate('/voice')} className="text-accent-400 hover:text-accent-300 hover:underline font-semibold">
            1800-267-SETU
          </button>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
