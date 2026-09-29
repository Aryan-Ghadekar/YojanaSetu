import React, { ReactNode } from 'react';

export type BadgeTone = 'gray' | 'brand' | 'green' | 'yellow' | 'red' | 'purple';

interface BadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
}

const toneClasses: Record<BadgeTone, string> = {
  gray: 'bg-slate-100 text-slate-700',
  brand: 'bg-brand-50 text-brand-700',
  green: 'bg-accent-100 text-accent-700',
  yellow: 'bg-amber-100 text-amber-800',
  red: 'bg-rose-100 text-rose-700',
  purple: 'bg-purple-100 text-purple-700',
};

const Badge = ({ children, tone = 'gray', className = '' }: BadgeProps) => {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${toneClasses[tone]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
