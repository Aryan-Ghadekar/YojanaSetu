import { useEffect, useState } from 'react';
import { impactTickerItems } from './impactTickerConfig';

const ROTATE_INTERVAL_MS = 3500;

const ImpactTicker = () => {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const intervalId = setInterval(() => {
      setIndex((current) => (current + 1) % impactTickerItems.length);
    }, ROTATE_INTERVAL_MS);
    return () => clearInterval(intervalId);
  }, [isPaused]);

  const item = impactTickerItems[index];
  const Icon = item.icon;

  return (
    <div className="relative z-10 mx-auto -mt-10 max-w-2xl px-6">
      <div
        className="flex items-center gap-3 rounded-full border border-slate-100 bg-white px-5 py-3 shadow-xl ring-1 ring-black/5"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <span className="relative flex h-2.5 w-2.5 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-500 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent-500" />
        </span>
        <span className="shrink-0 text-sm font-semibold text-slate-900">Just matched</span>
        <span className="hidden h-4 w-px bg-slate-200 sm:block" />
        <span key={index} className="animate-fade-in flex min-w-0 items-center gap-2 text-sm text-slate-600">
          <Icon size={15} className="shrink-0 text-accent-600" />
          <span className="truncate">{item.text}</span>
          <span className="hidden shrink-0 text-slate-400 sm:inline">&middot; {item.place}</span>
        </span>
      </div>
    </div>
  );
};

export default ImpactTicker;
