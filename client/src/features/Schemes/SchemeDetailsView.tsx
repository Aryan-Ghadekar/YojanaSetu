import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Scheme } from './types';
import type { UserProfile } from '../Profile/types';
import EligibilityBadge from '../../components/ui/EligibilityBadge';
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  HelpCircle,
  ExternalLink,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Scale,
  Bot,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface SchemeDetailsViewProps {
  scheme: Scheme;
  userProfile: UserProfile;
  isInComparison: (schemeId: string) => boolean;
  addToComparison: (schemeId: string) => void;
}

const SchemeDetailsView = ({ scheme, userProfile, isInComparison, addToComparison }: SchemeDetailsViewProps) => {
  const navigate = useNavigate();

  const [expandedCriteria, setExpandedCriteria] = useState<Record<string, boolean>>({
    c1: true,
    c2: true,
  });

  const toggleCriterion = (id: string) => {
    setExpandedCriteria((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="space-y-8 pb-12 max-w-5xl mx-auto">

      {/* Back Button & Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/schemes/results')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Matched Results</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/copilot?scheme=${scheme.id}`)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-md transition-colors"
          >
            <Bot className="w-3.5 h-3.5 text-amber-700" />
            <span>Ask Copilot about this Scheme</span>
          </button>
          <button
            onClick={() => {
              if (isInComparison(scheme.id)) {
                navigate('/schemes/compare');
              } else {
                addToComparison(scheme.id);
              }
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-md transition-colors"
          >
            <Scale className="w-3.5 h-3.5 text-slate-500" />
            <span>{isInComparison(scheme.id) ? 'In Comparison' : 'Add to Comparison'}</span>
          </button>
        </div>
      </div>

      {/* HEADER SECTION */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-900">{scheme.department}</span>
            <span className="text-slate-300">·</span>
            <span className="text-slate-600">{scheme.ministry}</span>
          </div>
          <div className="flex items-center gap-3 text-slate-600">
            <span>Official Portal:</span>
            <a
              href={`https://${scheme.officialPortal}`}
              target="_blank"
              rel="noreferrer"
              className="text-brand-700 hover:underline flex items-center gap-1 font-mono text-[11px]"
            >
              <span>{scheme.officialPortal}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span>·</span>
            <span>Verified: <span className="font-mono text-slate-800">{scheme.lastVerifiedDate}</span></span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                {scheme.level}
              </span>
              <EligibilityBadge status={scheme.matchStatus} score={scheme.matchScore} />
            </div>
            <h1 className="text-xl font-semibold tracking-tight text-slate-900">
              {scheme.name}
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
              {scheme.summary}
            </p>
          </div>

          <div className="shrink-0 flex sm:flex-col gap-2">
            <button
              onClick={() => navigate(`/applications/new/${scheme.id}`)}
              className="w-full px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
            >
              <span>Start Application</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* BENEFIT OVERVIEW CARD */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Large Visual Benefit */}
        <div className="md:col-span-2 bg-gradient-to-br from-slate-900 to-slate-850 text-white rounded-xl p-6 border border-slate-800 flex flex-col justify-between">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
              Benefit Breakdown & Financial Value
            </span>
            <div className="text-3xl sm:text-4xl font-semibold font-mono text-white mt-2">
              {scheme.benefitAmount}
            </div>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Disbursed as <strong className="text-white">{scheme.benefitType}</strong> on an <strong className="text-white">{scheme.benefitFrequency}</strong> schedule directly through Aadhaar-enabled NPCI PFMS gateway.
            </p>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-700/80 grid grid-cols-3 gap-2 text-xs">
            <div>
              <span className="text-[11px] text-slate-400 block">Category</span>
              <span className="font-semibold text-white">{scheme.category}</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block">Complexity</span>
              <span className="font-semibold text-white">{scheme.complexity}</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block">Est. Time</span>
              <span className="font-semibold text-white">{scheme.processingTime}</span>
            </div>
          </div>
        </div>

        {/* Target Profile Match Box */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Profile Compatibility
            </h3>
            <div className="text-xs text-slate-600 leading-relaxed">
              {scheme.keyReason}
            </div>
            <div className="space-y-1.5 pt-1 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Age Eligibility:</span>
                <span className="font-medium text-slate-900">{scheme.minAge} - {scheme.maxAge} yrs (User: {userProfile.age})</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Income Ceiling:</span>
                <span className="font-medium text-slate-900 font-mono">≤ ₹{scheme.maxIncomeLimit.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>State Domicile:</span>
                <span className="font-medium text-slate-900">{scheme.eligibleStates.join(', ')}</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500">
            Rule engine ID: <span className="font-mono">{scheme.id}</span>
          </div>
        </div>
      </div>

      {/* WHY THIS SCHEME MATCHES YOU - EXPLAINABLE ELIGIBILITY CHECKS */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              Why this scheme matches you (Explainable Assessment)
            </h2>
            <p className="text-xs text-slate-600">
              Every parameter evaluated with verifiable source evidence.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-600">
            {scheme.eligibilityCriteria.filter((c) => c.userStatus === 'Meets').length} of {scheme.eligibilityCriteria.length} Met
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {scheme.eligibilityCriteria.map((c) => {
            const isExpanded = expandedCriteria[c.id] ?? false;
            return (
              <div key={c.id} className="py-3">
                <div
                  onClick={() => toggleCriterion(c.id)}
                  className="flex items-start justify-between gap-3 cursor-pointer group"
                >
                  <div className="flex items-start gap-2.5">
                    {c.userStatus === 'Meets' && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />}
                    {c.userStatus === 'Borderline' && <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />}
                    {c.userStatus === 'Requires Document' && <HelpCircle className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />}
                    {c.userStatus === 'Does not meet' && <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-900 text-xs sm:text-sm group-hover:text-brand-700">
                          {c.label}
                        </span>
                        {c.ruleCode && (
                          <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded">
                            {c.ruleCode}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5">
                        {c.explanation}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-xs font-medium ${
                      c.userStatus === 'Meets' ? 'text-emerald-700' :
                      c.userStatus === 'Borderline' ? 'text-amber-700' :
                      c.userStatus === 'Requires Document' ? 'text-sky-700' : 'text-rose-700'
                    }`}>
                      {c.userStatus}
                    </span>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </div>
                </div>

                {isExpanded && (
                  <div className="mt-2.5 ml-6.5 p-3 bg-slate-50 rounded-lg text-xs space-y-1.5 border border-slate-100">
                    <div className="text-slate-600">
                      <strong className="text-slate-800">Gazette Requirement: </strong>
                      {c.requirement}
                    </div>
                    <div className="text-slate-600">
                      <strong className="text-slate-800">Verification Engine Log: </strong>
                      {c.explanation}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* REQUIRED DOCUMENTS CHECKLIST */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              Required Documents Checklist
            </h2>
            <p className="text-xs text-slate-600">
              Validated against your Document Center & DigiLocker Vault
            </p>
          </div>
          <button
            onClick={() => navigate('/documents')}
            className="text-xs font-semibold text-brand-700 hover:text-brand-900"
          >
            Manage Documents →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {scheme.documents.map((doc) => (
            <div
              key={doc.id}
              className={`p-3.5 rounded-lg border text-xs flex items-start justify-between gap-3 ${
                doc.status === 'verified' ? 'bg-emerald-50/50 border-emerald-200' :
                doc.status === 'needs_review' ? 'bg-amber-50/50 border-amber-200' :
                doc.status === 'unclear' ? 'bg-sky-50/50 border-sky-200' :
                'bg-rose-50/50 border-rose-200'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-slate-900">
                  {doc.status === 'verified' && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                  {doc.status === 'needs_review' && <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />}
                  {doc.status === 'missing' && <XCircle className="w-4 h-4 text-rose-600 shrink-0" />}
                  <span>{doc.name}</span>
                </div>
                {doc.extractedValue && (
                  <div className="text-[11px] text-slate-600 font-mono">
                    Extracted: {doc.extractedValue}
                  </div>
                )}
                {doc.notes && (
                  <div className="text-[11px] text-amber-800">
                    {doc.notes}
                  </div>
                )}
              </div>

              <div className="shrink-0">
                {doc.status === 'verified' ? (
                  <span className="text-[11px] font-medium text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-200">
                    Ready
                  </span>
                ) : doc.status === 'needs_review' ? (
                  <button
                    onClick={() => navigate('/documents/authenticity')}
                    className="text-[11px] font-semibold text-amber-800 bg-white px-2 py-0.5 rounded border border-amber-200 hover:bg-amber-100"
                  >
                    Review OCR
                  </button>
                ) : (
                  <button
                    onClick={() => navigate('/documents')}
                    className="text-[11px] font-semibold text-rose-800 bg-white px-2 py-0.5 rounded border border-rose-200 hover:bg-rose-100"
                  >
                    Upload Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* APPLICATION PROCESS TIMELINE (6 STEPS) */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">
            Application Process Timeline
          </h2>
          <p className="text-xs text-slate-600">
            Standard workflow for this scheme under the Maharashtra Social Justice & MahaDBT portal
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-6 gap-3 text-xs">
          {scheme.applicationSteps.map((step, idx) => (
            <div key={idx} className="bg-white p-3 rounded-lg border border-slate-200 space-y-1">
              <span className="font-mono text-slate-400 text-[10px] block font-bold">
                Step 0{idx + 1}
              </span>
              <p className="font-semibold text-slate-800 leading-snug">
                {step}
              </p>
            </div>
          ))}
        </div>

        <div className="pt-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>YojanaSetu Copilot will assist you at each step to prevent rejection.</span>
          </div>

          <button
            onClick={() => navigate(`/applications/new/${scheme.id}`)}
            className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5"
          >
            <span>Start Application with Copilot Guidance</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
};

export default SchemeDetailsView;
