import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import AnimatedStat from './AnimatedStat';
import HeroVisual from './HeroVisual';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute -left-32 -top-40 h-96 w-96 rounded-full bg-brand-200/50 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-24 top-10 h-[28rem] w-[28rem] rounded-full bg-accent-100/70 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 pb-20 pt-14 lg:grid-cols-2">
        <div>
          <span className="animate-fade-in-up inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-600" />
            Government of India &middot; National Citizen Welfare Platform
          </span>

          <h1
            className="animate-fade-in-up mt-5 text-5xl font-bold leading-[1.1] tracking-tight text-slate-900 lg:text-6xl"
            style={{ animationDelay: '80ms' }}
          >
            Every scheme you're eligible for, <span className="text-brand-600">in one bridge.</span>
          </h1>

          <p className="animate-fade-in-up mt-5 max-w-md text-base text-slate-600" style={{ animationDelay: '160ms' }}>
            YojanaSetu analyzes your profile and documents to discover relevant Central & State schemes, explain eligibility in plain language, and guide you through the application — start to finish.
          </p>

          <div className="animate-fade-in-up mt-8 flex flex-wrap gap-3" style={{ animationDelay: '240ms' }}>
            <Button onClick={() => navigate('/home')} className="px-6 py-3 text-base transition-transform hover:scale-[1.03]">
              Find My Schemes
              <ArrowRight size={18} />
            </Button>
            <Button
              onClick={() => navigate('/applications')}
              variant="secondary"
              className="px-6 py-3 text-base transition-transform hover:scale-[1.03]"
            >
              Track Application
            </Button>
          </div>

          <div className="animate-fade-in-up mt-10 flex divide-x divide-slate-200" style={{ animationDelay: '320ms' }}>
            <div className="pr-6">
              <AnimatedStat value={120} suffix="+" label="Schemes mapped" />
            </div>
            <div className="px-6">
              <AnimatedStat value={14.2} decimals={1} suffix="M+" label="Citizens reached" valueClassName="text-accent-600" />
            </div>
            <div className="pl-6">
              <AnimatedStat value={84.5} decimals={1} suffix="%" label="Avg. approval rate" />
            </div>
          </div>
        </div>

        <div className="animate-fade-in-up relative flex justify-center" style={{ animationDelay: '200ms' }}>
          <div className="pointer-events-none absolute h-72 w-72 rounded-full bg-brand-100/60 blur-3xl" aria-hidden="true" />
          <HeroVisual />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
