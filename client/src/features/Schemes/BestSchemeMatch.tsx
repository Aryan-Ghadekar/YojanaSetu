import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Scheme } from './types';
import { fetchRecommendedSchemes } from './api';
import EligibilityBadge from '../../components/ui/EligibilityBadge';
import { Trophy, ArrowRight, FileText, Sparkles, RefreshCw } from 'lucide-react';

const BestSchemeMatch = () => {
  const navigate = useNavigate();
  const [schemes, setSchemes] = useState<Scheme[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchRecommendedSchemes(3)
      .then((data) => {
        if (!cancelled) setSchemes(data);
      })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Could not load recommendations.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return <div className="max-w-3xl mx-auto py-20 text-center text-sm text-slate-500">Scoring your profile against every scheme...</div>;
  }

  if (error) {
    return (
      <div className="max-w-lg mx-auto py-20 text-center space-y-4">
        <p className="text-sm text-rose-700">{error}</p>
        <button
          onClick={() => navigate('/profile')}
          className="px-5 py-2.5 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-lg"
        >
          Complete Your Profile
        </button>
      </div>
    );
  }

  if (!schemes || schemes.length === 0) {
    return (
      <div className="max-w-lg mx-auto py-20 text-center space-y-4">
        <p className="text-sm text-slate-600">
          No scheme currently matches your profile well enough to recommend. Try broadening your search, or update your
          profile details for a fresh assessment.
        </p>
        <button
          onClick={() => navigate('/schemes')}
          className="px-5 py-2.5 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-lg"
        >
          Browse All Schemes
        </button>
      </div>
    );
  }

  const [best, ...alternates] = schemes;

  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">
      <div className="space-y-1">
        <h1 className="text-xl font-semibold tracking-tight text-slate-900 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-500" />
          Your Best Scheme Match
        </h1>
        <p className="text-sm text-slate-600">
          Ranked by the same deterministic eligibility engine used across YojanaSetu — your single top pick, based on
          your saved profile.
        </p>
      </div>

      {/* Top pick hero card */}
      <div className="relative overflow-hidden rounded-2xl border border-brand-200 bg-gradient-to-br from-brand-50 via-white to-white p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 text-amber-600 text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-4 h-4" />
          <span>Best Match</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="text-xs text-slate-600">
              {best.department} · {best.level}
            </div>
            <h2
              className="text-lg font-bold text-slate-900 hover:text-brand-700 cursor-pointer transition-colors"
              onClick={() => navigate(`/schemes/${best.id}`)}
            >
              {best.name}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">{best.summary}</p>
            <EligibilityBadge status={best.matchStatus} score={best.matchScore} />
          </div>
          <div className="text-right shrink-0 bg-white/70 border border-slate-200 rounded-lg p-3">
            <span className="text-[11px] text-slate-500 block">Estimated Benefit</span>
            <span className="text-base font-bold text-slate-900 font-mono">{best.benefitAmount}</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">
              {best.benefitFrequency} · {best.benefitType}
            </span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-brand-100 text-xs text-slate-700">
          <span className="font-semibold text-slate-900">Why this is your best match: </span>
          {best.keyReason}
        </div>

        <div className="mt-4 flex items-center gap-2 text-xs text-slate-600">
          <FileText className="w-4 h-4 text-slate-400" />
          <span>Documents ready:</span>
          <span className="font-mono font-semibold text-slate-800">
            {best.documents.filter((d) => d.isAvailable).length} / {best.documents.length}
          </span>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            onClick={() => navigate(`/applications/new/${best.id}`)}
            className="px-5 py-2.5 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-lg flex items-center gap-2 transition-colors"
          >
            <span>Start Application</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigate(`/schemes/${best.id}`)}
            className="px-5 py-2.5 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg transition-colors"
          >
            View Full Details
          </button>
        </div>
      </div>

      {/* Runner-ups */}
      {alternates.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-900">Other strong matches</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {alternates.map((scheme) => (
              <div
                key={scheme.id}
                className="bg-white border border-slate-200 rounded-xl p-4 hover:border-slate-300 transition-all shadow-xs"
              >
                <div className="flex items-center justify-between text-xs text-slate-600 mb-2 gap-2">
                  <span className="truncate">{scheme.department}</span>
                  <EligibilityBadge status={scheme.matchStatus} score={scheme.matchScore} compact />
                </div>
                <h4
                  className="text-sm font-semibold text-slate-900 hover:text-brand-700 cursor-pointer transition-colors"
                  onClick={() => navigate(`/schemes/${scheme.id}`)}
                >
                  {scheme.name}
                </h4>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2">{scheme.summary}</p>
                <div className="mt-3 flex items-center justify-between gap-2">
                  <span className="text-sm font-mono font-semibold text-slate-900">{scheme.benefitAmount}</span>
                  <button
                    onClick={() => navigate(`/schemes/${scheme.id}`)}
                    className="text-xs font-semibold text-brand-700 hover:text-brand-900 shrink-0"
                  >
                    View →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-center">
        <button
          onClick={() => navigate('/schemes')}
          className="text-xs font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Browse the full scheme catalog instead</span>
        </button>
      </div>
    </div>
  );
};

export default BestSchemeMatch;
