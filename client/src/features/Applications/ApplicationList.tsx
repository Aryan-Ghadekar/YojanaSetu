import type { ApplicationRecord } from './types';
import { AlertCircle } from 'lucide-react';

interface ApplicationListProps {
  applications: ApplicationRecord[];
  activeAppId: string;
  onSelect: (app: ApplicationRecord) => void;
  onResolveShortcut: (app: ApplicationRecord) => void;
}

const ApplicationList = ({ applications, activeAppId, onSelect, onResolveShortcut }: ApplicationListProps) => {
  return (
    <div className="lg:col-span-5 space-y-3">
      <div className="text-xs font-semibold text-slate-900 uppercase tracking-wider pb-1">
        Application Dossiers ({applications.length})
      </div>

      <div className="space-y-3">
        {applications.map((app) => {
          const isSelected = activeAppId === app.id;
          const hasAction = app.currentStatus === 'Action Required';

          return (
            <div
              key={app.id}
              onClick={() => onSelect(app)}
              className={`p-4 rounded-xl border text-xs cursor-pointer transition-all ${
                isSelected
                  ? 'bg-brand-50/40 border-brand-600 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-slate-500 font-bold">{app.applicationNumber}</span>
                    {hasAction && (
                      <span className="text-[10px] font-bold bg-rose-100 text-rose-800 px-2 py-0.5 rounded">
                        Action Required
                      </span>
                    )}
                  </div>
                  <div className="font-bold text-slate-900 text-sm">{app.schemeName}</div>
                  <div className="text-[11px] text-slate-500">{app.department}</div>
                </div>

                <div className="text-right shrink-0">
                  <span className={`inline-block font-semibold px-2 py-0.5 rounded text-[11px] ${
                    app.currentStatus === 'Disbursed' ? 'bg-emerald-50 text-emerald-800' :
                    app.currentStatus === 'Action Required' ? 'bg-rose-50 text-rose-800 font-bold' :
                    app.currentStatus === 'Department Review' ? 'bg-amber-50 text-amber-800' :
                    'bg-slate-100 text-slate-700'
                  }`}>
                    {app.currentStatus}
                  </span>
                  <span className="block font-mono text-slate-700 font-bold text-xs mt-1">
                    {app.benefitAmount}
                  </span>
                </div>
              </div>

              {hasAction && app.actionRequiredMessage && (
                <div className="mt-3 p-2 bg-rose-50 border border-rose-200 rounded-lg text-rose-900 text-[11px] space-y-1.5">
                  <div className="flex items-start gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                    <span>{app.actionRequiredMessage}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onResolveShortcut(app);
                    }}
                    className="w-full py-1 bg-rose-700 hover:bg-rose-800 text-white font-semibold rounded text-[11px] transition-colors"
                  >
                    Resolve Issue Now →
                  </button>
                </div>
              )}

              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Submitted: {app.submittedDate}</span>
                <span>Updated: {app.lastUpdated}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ApplicationList;
