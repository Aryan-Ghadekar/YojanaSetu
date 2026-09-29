import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { DocumentCategory, MissingDocument } from './types';
import { fetchMissingDocuments } from './api';
import EligibilityBadge from '../../components/ui/EligibilityBadge';
import { ScanSearch, ChevronDown, ChevronUp, Upload, PartyPopper, ArrowRight } from 'lucide-react';

interface MissingDocumentDetectorProps {
  onUploadCategory: (category: DocumentCategory) => void;
}

const MissingDocumentDetector = ({ onUploadCategory }: MissingDocumentDetectorProps) => {
  const navigate = useNavigate();
  const [missingDocuments, setMissingDocuments] = useState<MissingDocument[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedName, setExpandedName] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchMissingDocuments()
      .then(({ missingDocuments: docs }) => {
        if (!cancelled) setMissingDocuments(docs);
      })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Could not run the missing document detector.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-5 text-xs text-slate-500 flex items-center gap-2">
        <ScanSearch className="w-4 h-4 animate-pulse text-slate-400" />
        <span>Scanning your eligible schemes for missing documents...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
        <p className="text-xs text-rose-700">{error}</p>
        <button
          onClick={() => navigate('/profile')}
          className="px-3 py-1.5 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-md"
        >
          Complete Your Profile
        </button>
      </div>
    );
  }

  if (!missingDocuments || missingDocuments.length === 0) {
    return (
      <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-5 flex items-center gap-3">
        <PartyPopper className="w-5 h-5 text-emerald-600 shrink-0" />
        <div>
          <span className="text-sm font-semibold text-emerald-900 block">
            No missing documents detected
          </span>
          <span className="text-xs text-emerald-800">
            Every scheme you're currently eligible for has all its required documents on file.
          </span>
        </div>
      </div>
    );
  }

  const totalSchemesBlocked = new Set(missingDocuments.flatMap((d) => d.schemes.map((s) => s.id))).size;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
      <div className="flex items-start gap-2.5">
        <ScanSearch className="w-4 h-4 text-brand-700 shrink-0 mt-0.5" />
        <div>
          <h2 className="text-sm font-semibold text-slate-900">Missing Document Detector</h2>
          <p className="text-xs text-slate-600 mt-0.5">
            {missingDocuments.length} document{missingDocuments.length === 1 ? '' : 's'} missing across{' '}
            {totalSchemesBlocked} scheme{totalSchemesBlocked === 1 ? '' : 's'} you're eligible for — ranked by impact.
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {missingDocuments.map((doc) => {
          const isExpanded = expandedName === doc.name;
          return (
            <div key={doc.name} className="border border-slate-200 rounded-lg overflow-hidden">
              <div className="flex items-center justify-between gap-3 p-3">
                <button
                  onClick={() => setExpandedName(isExpanded ? null : doc.name)}
                  className="flex items-center gap-2 text-left min-w-0 flex-1"
                >
                  {isExpanded ? (
                    <ChevronUp className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  )}
                  <div className="min-w-0">
                    <span className="text-sm font-semibold text-slate-900 block truncate">{doc.name}</span>
                    <span className="text-[11px] text-slate-500">
                      Unlocks {doc.schemeCount} scheme{doc.schemeCount === 1 ? '' : 's'}
                      {doc.category ? ` · ${doc.category}` : ''}
                    </span>
                  </div>
                </button>

                {doc.category && (
                  <button
                    onClick={() => onUploadCategory(doc.category as DocumentCategory)}
                    className="shrink-0 px-3 py-1.5 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-md transition-colors flex items-center gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload</span>
                  </button>
                )}
              </div>

              {isExpanded && (
                <div className="border-t border-slate-100 bg-slate-50/60 divide-y divide-slate-100">
                  {doc.schemes.map((scheme) => (
                    <div
                      key={scheme.id}
                      className="p-3 flex items-center justify-between gap-3 text-xs hover:bg-slate-100/60 transition-colors"
                    >
                      <div className="min-w-0">
                        <span
                          className="font-medium text-slate-800 hover:text-brand-700 cursor-pointer block truncate"
                          onClick={() => navigate(`/schemes/${scheme.id}`)}
                        >
                          {scheme.shortName}
                        </span>
                        <span className="text-[11px] text-slate-500 font-mono">{scheme.benefitAmount}</span>
                      </div>
                      <div className="shrink-0 flex items-center gap-2">
                        <EligibilityBadge status={scheme.matchStatus} compact />
                        <button
                          onClick={() => navigate(`/schemes/${scheme.id}`)}
                          className="text-brand-700 hover:text-brand-900"
                          title="View scheme"
                        >
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MissingDocumentDetector;
