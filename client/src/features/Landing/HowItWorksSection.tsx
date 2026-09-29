import { howItWorksSteps } from './howItWorksConfig';

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">How YojanaSetu Works</h2>
          <p className="mt-2 text-sm text-slate-500">From first search to benefits in hand — four steps, fully tracked.</p>
        </div>
        <div className="relative mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-slate-200 lg:block" aria-hidden="true" />
          {howItWorksSteps.map((item) => (
            <div key={item.step} className="relative text-center">
              <span className="relative z-10 mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 text-base font-bold text-white shadow-sm">
                {item.step}
              </span>
              <p className="mt-4 text-sm font-semibold text-slate-900">{item.title}</p>
              <p className="mt-1.5 text-xs text-slate-500">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
