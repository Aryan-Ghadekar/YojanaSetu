import { useNavigate } from 'react-router-dom';
import type { Scheme } from './types';
import { AlertTriangle, Bot, ExternalLink, ArrowRight } from 'lucide-react';

interface BorderlineEligibilityViewProps {
  scheme: Scheme;
  annualIncome: number;
}

const BorderlineEligibilityView = ({ scheme, annualIncome }: BorderlineEligibilityViewProps) => {
  const navigate = useNavigate();
  const overBy = annualIncome - scheme.maxIncomeLimit;
  const formatInr = (value: number) => `₹${Math.abs(value).toLocaleString('en-IN')}`;

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">

      {/* Top Banner */}
      <div className="space-y-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-300 text-amber-900 text-xs font-semibold">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
          <span>Objective Rule Review Required</span>
        </div>
        <h1 className="text-xl font-semibold tracking-tight text-slate-900">
          Eligibility Needs Review
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          You appear to be close to an official income threshold. YojanaSetu does not make authoritative government decisions; this analysis explains the legal nuances.
        </p>
      </div>

      {/* CORE COMPARISON CARD */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <span className="text-[11px] font-mono text-slate-500 uppercase">
              {scheme.level} · {scheme.department}
            </span>
            <h2 className="text-base font-semibold text-slate-900 mt-0.5">
              {scheme.name}
            </h2>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 text-amber-800 font-semibold text-xs rounded-lg">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>Borderline Status</span>
          </div>
        </div>

        {/* Numbers Comparison Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-slate-500 block text-[11px]">Your Declared Family Income</span>
            <span className="text-xl font-semibold font-mono text-slate-900 mt-1 block">
              {formatInr(annualIncome)} / year
            </span>
            <span className="text-[10px] text-slate-500 mt-1 block">
              Source: Your citizen profile
            </span>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-slate-500 block text-[11px]">Scheme Income Threshold</span>
            <span className="text-xl font-semibold font-mono text-slate-900 mt-1 block">
              {formatInr(scheme.maxIncomeLimit)} / year
            </span>
            <span className="text-[10px] text-slate-500 mt-1 block">
              Ceiling declared for this scheme
            </span>
          </div>

          <div className="p-4 bg-brand-50/60 rounded-xl border border-brand-100">
            <span className="text-brand-700 block text-[11px] font-semibold">Gap to Threshold</span>
            <span className="text-xl font-semibold font-mono text-brand-950 mt-1 block">
              {overBy > 0 ? `${formatInr(overBy)} over` : `${formatInr(overBy)} under`}
            </span>
            <span className="text-[10px] text-brand-700 mt-1 block font-medium">
              A relaxation or deduction proof may still qualify you
            </span>
          </div>
        </div>

        {/* Detailed Explanation Prose */}
        <div className="space-y-3 text-xs leading-relaxed text-slate-700">
          <h3 className="font-bold text-slate-900 text-sm">
            Why this eligibility depends on interpretation
          </h3>
          <p>
            Eligibility depends on how the scheme defines <em>annual family income</em> and which documents are accepted under <strong>Maharashtra Government Resolution No. TEM-2018/C.R.305</strong>:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>
              <strong>Standard Bracket:</strong> At {formatInr(annualIncome)}, you {overBy > 0 ? `exceed the ${formatInr(scheme.maxIncomeLimit)} cutoff by ${formatInr(overBy)}` : `are within the ${formatInr(scheme.maxIncomeLimit)} cutoff`}. Under automatic rule processing, this affects which benefit tier applies.
            </li>
            <li>
              <strong>Agricultural Income Computation Exception:</strong> If your family income includes agricultural receipts from any landholding, input expenditure (fertilizer/diesel bills) can be adjusted upon submission of an agricultural deduction affidavit.
            </li>
          </ul>
        </div>

        {/* Source & Information Breakdown Box */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <span className="text-slate-500 block text-[11px]">Governing Rule Citation:</span>
              <span className="font-mono font-medium text-slate-800">GR-HTE-MHA-2018/305/SEC-4</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Official Department Source:</span>
              <span className="font-medium text-slate-800">Higher & Technical Education Department, Mantralaya</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Documents Used in Engine:</span>
              <span className="font-medium text-slate-800">Income Certificate + 7/12 Land Extract</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Missing Clarification:</span>
              <span className="font-medium text-amber-800">Agricultural Expense Self-Declaration Form</span>
            </div>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
          <a
            href="https://mahadbt.maharashtra.gov.in"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 text-xs font-semibold rounded-md transition-colors inline-flex items-center gap-1.5"
          >
            <span>Check Official Criteria on MahaDBT</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(`/copilot?scheme=${scheme.id}`)}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold rounded-md transition-colors inline-flex items-center gap-1.5 shadow-xs"
            >
              <Bot className="w-4 h-4 text-slate-900" />
              <span>Ask YojanaSetu Copilot</span>
            </button>

            <button
              onClick={() => navigate(`/applications/new/${scheme.id}`)}
              className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold rounded-md transition-colors inline-flex items-center gap-1.5"
            >
              <span>Apply Anyway</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

export default BorderlineEligibilityView;
