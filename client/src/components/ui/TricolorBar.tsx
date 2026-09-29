import React from 'react';

interface TricolorBarProps {
  className?: string;
}

/** Animated Indian tricolor strip used to frame the app shell, matching the civic identity of the YojanaSetu mark. */
const TricolorBar = ({ className = '' }: TricolorBarProps) => {
  return (
    <div className={`relative h-1.5 w-full overflow-hidden shrink-0 ${className}`} aria-hidden="true">
      <div
        className="animate-tricolor-flow h-full w-full"
        style={{
          backgroundImage:
            'linear-gradient(90deg, var(--color-flag-saffron) 0%, var(--color-flag-saffron) 33.33%, #ffffff 33.33%, #ffffff 66.66%, var(--color-flag-green) 66.66%, var(--color-flag-green) 100%)',
          backgroundSize: '200% 100%',
        }}
      />
      <div className="animate-shimmer-sweep pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-transparent via-white/70 to-transparent" />
    </div>
  );
};

export default TricolorBar;
