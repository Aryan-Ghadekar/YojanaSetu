import React, { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'danger' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-brand-600 text-white shadow-sm hover:bg-brand-700 hover:shadow-md',
  secondary: 'bg-white text-slate-700 border border-slate-300 hover:border-slate-400 hover:bg-slate-50',
  accent: 'bg-accent-600 text-white shadow-sm hover:bg-accent-700 hover:shadow-md',
  danger: 'bg-rose-600 text-white shadow-sm hover:bg-rose-700 hover:shadow-md',
  ghost: 'bg-transparent text-slate-600 hover:bg-slate-100',
};

const Button = ({ children, variant = 'primary', className = '', ...rest }: ButtonProps) => {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none ${variantClasses[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
