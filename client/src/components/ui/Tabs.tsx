import React from 'react';

interface TabOption {
  value: string;
  label: string;
}

interface TabsProps {
  options: TabOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const Tabs = ({ options, value, onChange, className = '' }: TabsProps) => {
  return (
    <div className={`inline-flex rounded-lg bg-slate-100 p-1 ${className}`}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`rounded-md px-4 py-1.5 text-sm font-semibold transition-colors ${
            value === option.value
              ? 'bg-white text-brand-700 shadow-sm'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
