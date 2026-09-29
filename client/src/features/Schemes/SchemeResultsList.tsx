import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Scheme } from './types';
import EligibilityBadge from '../../components/ui/EligibilityBadge';
import {
  ArrowUpDown,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  HelpCircle,
  FileText,
  ArrowRight,
} from 'lucide-react';

type SortOption = 'relevance' | 'benefit' | 'ease' | 'state' | 'central';

interface SchemeResultsListProps {
  schemes: Scheme[];
  searchQuery: string;
  isInComparison: (schemeId: string) => boolean;
  addToComparison: (schemeId: string) => void;
}

const SchemeResultsList = ({ schemes, searchQuery, isInComparison, addToComparison }: SchemeResultsListProps) => {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [filterMatchStatus, setFilterMatchStatus] = useState<string>('all');

  // Filter & sort
  const filtered = schemes.filter((scheme) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchText =
        scheme.name.toLowerCase().includes(q) ||
        scheme.department.toLowerCase().includes(q) ||
        scheme.summary.toLowerCase().includes(q) ||
        scheme.category.toLowerCase().includes(q) ||
        scheme.keyReason.toLowerCase().includes(q);
      if (!matchText) return false;
    }
    if (filterMatchStatus !== 'all') {
      if (scheme.matchStatus !== filterMatchStatus) return false;
    }
    return true;
  });

  if (sortBy === 'relevance') {
    filtered.sort((a, b) => b.matchScore - a.matchScore);
  } else if (sortBy === 'state') {
    filtered.sort((a, b) => (a.level.includes('State') ? -1 : 1));
  } else if (sortBy === 'central') {
    filtered.sort((a, b) => (a.level === 'Central' ? -1 : 1));
  } else if (sortBy === 'ease') {
    const complexityScore = { Low: 1, Medium: 2, High: 3 };
    filtered.sort((a, b) => complexityScore[a.complexity] - complexityScore[b.complexity]);
  }

  return (
    <div className="space-y-6 pb-12 max-w-5xl mx-auto">

      {/* Header & Match summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold text-slate-900 tracking-tight">
              {filtered.length} schemes found for you
            </h1>
            <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono">
              Evaluated against 120 Rules
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Ranked using hybrid rule-verification and profile compatibility. Not an official legal decision.
          </p>
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-4 h-4 text-slate-400" />
          <span className="text-xs text-slate-600 font-medium">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="text-xs font-medium bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-brand-600"
          >
            <option value="relevance">Most relevant (Verified rules)</option>
            <option value="benefit">Highest financial benefit</option>
            <option value="ease">Easiest eligibility & documentation</option>
            <option value="state">Maharashtra State schemes first</option>
            <option value="central">Central Government schemes first</option>
          </select>
        </div>
      </div>

      {/* Filter Tabs / Segmented Buttons */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-slate-600 font-medium mr-1">Match Level:</span>
        <button
          onClick={() => setFilterMatchStatus('all')}
          className={`px-3 py-1 text-xs rounded-md font-medium transition-colors ${
            filterMatchStatus === 'all'
              ? 'bg-brand-700 text-white'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          All Schemes ({schemes.length})
        </button>
        <button
          onClick={() => setFilterMatchStatus('Strong match')}
          className={`px-3 py-1 text-xs rounded-md font-medium transition-colors ${
            filterMatchStatus === 'Strong match'
              ? 'bg-emerald-800 text-white'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Strong match
        </button>
        <button
          onClick={() => setFilterMatchStatus('Potential match')}
          className={`px-3 py-1 text-xs rounded-md font-medium transition-colors ${
            filterMatchStatus === 'Potential match'
              ? 'bg-sky-800 text-white'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Potential match
        </button>
        <button
          onClick={() => setFilterMatchStatus('Borderline')}
          className={`px-3 py-1 text-xs rounded-md font-medium transition-colors ${
            filterMatchStatus === 'Borderline'
              ? 'bg-amber-800 text-white'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Borderline eligibility
        </button>
      </div>

      {/* SCHEME CARDS LIST */}
      <div className="space-y-4">
        {filtered.map((scheme) => {
          const availableDocs = scheme.documents.filter((d) => d.isAvailable).length;
          const totalDocs = scheme.documents.length;

          return (
            <div
              key={scheme.id}
              className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 hover:border-slate-300 transition-all shadow-xs space-y-4"
            >
              {/* Top Row: Department, Level badge, Match status */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-900">{scheme.department}</span>
                  <span className="text-slate-300">·</span>
                  <span className="text-slate-500 font-mono text-[11px]">{scheme.level}</span>
                </div>
                <EligibilityBadge status={scheme.matchStatus} score={scheme.matchScore} />
              </div>

              {/* Scheme Title & Benefit Highlight */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-1">
                  <h2
                    onClick={() => navigate(`/schemes/${scheme.id}`)}
                    className="text-base font-semibold text-slate-900 hover:text-brand-700 cursor-pointer transition-colors"
                  >
                    {scheme.name}
                  </h2>
                  <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
                    {scheme.summary}
                  </p>
                </div>

                <div className="sm:text-right shrink-0 bg-slate-50 sm:bg-transparent p-2.5 sm:p-0 rounded-lg">
                  <span className="text-[11px] text-slate-500 block">Estimated Benefit</span>
                  <span className="text-sm font-semibold text-slate-900 font-mono">
                    {scheme.benefitAmount}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    {scheme.benefitFrequency} · {scheme.benefitType}
                  </span>
                </div>
              </div>

              {/* Explainable Eligibility Checks Grid */}
              <div className="pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs">
                {scheme.eligibilityCriteria.slice(0, 4).map((crit) => (
                  <div key={crit.id} className="flex items-start gap-1.5 p-2 bg-slate-50 rounded-lg">
                    {crit.userStatus === 'Meets' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : crit.userStatus === 'Borderline' ? (
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    ) : crit.userStatus === 'Requires Document' ? (
                      <HelpCircle className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    )}
                    <div className="leading-tight">
                      <span className="font-semibold text-slate-800 block">{crit.label}</span>
                      <span className="text-[11px] text-slate-500 line-clamp-1">{crit.explanation}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer: Documents available + Action CTAs */}
              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3 text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-slate-400" />
                    <span>Documents:</span>
                    <span className="font-mono font-semibold text-slate-800">
                      {availableDocs} / {totalDocs} ready
                    </span>
                  </div>
                  <span>·</span>
                  <span>Processing: <span className="font-medium text-slate-800">{scheme.processingTime}</span></span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (isInComparison(scheme.id)) {
                        navigate('/schemes/compare');
                      } else {
                        addToComparison(scheme.id);
                      }
                    }}
                    className="px-3 py-1.5 text-xs text-slate-700 hover:text-slate-900 border border-slate-200 hover:bg-slate-50 rounded-md transition-colors"
                  >
                    {isInComparison(scheme.id) ? 'In Compare ✓' : '+ Compare'}
                  </button>

                  <button
                    onClick={() => navigate(`/schemes/${scheme.id}`)}
                    className="px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
                  >
                    View Scheme
                  </button>

                  <button
                    onClick={() => navigate(`/applications/new/${scheme.id}`)}
                    className="px-4 py-1.5 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-md transition-colors flex items-center gap-1.5"
                  >
                    <span>Start Application</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};

export default SchemeResultsList;
