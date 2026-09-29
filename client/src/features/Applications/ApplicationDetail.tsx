import { useNavigate } from 'react-router-dom';
import type { ApplicationRecord } from './types';
import { CheckCircle2, Clock, AlertCircle, RefreshCw, Upload, ShieldCheck, ArrowRight, X } from 'lucide-react';

interface ApplicationDetailProps {
  app: ApplicationRecord;
  showResolveModal: boolean;
  setShowResolveModal: (show: boolean) => void;
  isResolving: boolean;
  onConfirmResolve: () => void;
}

const ApplicationDetail = ({ app, showResolveModal, setShowResolveModal, isResolving, onConfirmResolve }: ApplicationDetailProps) => {
  const navigate = useNavigate();

  return (
    <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">

      {/* Header of Selected Application */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-slate-700">
              {app.applicationNumber}
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-slate-500">{app.department}</span>
          </div>
          <h2 className="text-base font-semibold text-slate-900 mt-1">
            {app.schemeName}
          </h2>
        </div>

        <div className="sm:text-right shrink-0">
          <span className="text-xs text-slate-500 block">Sanctioned Amount</span>
          <span className="text-lg font-semibold font-mono text-slate-900 block">
            {app.benefitAmount}
          </span>
        </div>
      </div>

      {/* Action Required Callout Banner if present */}
      {app.currentStatus === 'Action Required' && app.actionRequiredMessage && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl space-y-3">
          <div className="flex items-start gap-2.5 text-rose-900">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold">Action Required: Document Replacement Needed</h3>
              <p className="text-xs mt-1 leading-relaxed">
                {app.actionRequiredMessage}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              onClick={() => setShowResolveModal(true)}
              className="px-4 py-2 bg-rose-700 hover:bg-rose-800 text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Replace Document & Resolve</span>
            </button>
          </div>
        </div>
      )}

      {/* Expected Next Step Box */}
      <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
        <span className="font-bold text-slate-900 block">Expected Next Step:</span>
        <p className="text-slate-600 leading-relaxed">
          {app.expectedNextStep}
        </p>
      </div>

      {/* STATUS TIMELINE */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Verification & Disbursal Progression
        </h3>

        <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
          {app.timeline.map((step, idx) => (
            <div key={idx} className="relative text-xs">
              <div className={`absolute -left-6 top-0.5 w-4 h-4 rounded-full flex items-center justify-center ${
                step.status === 'completed' ? 'bg-emerald-600 text-white' :
                step.status === 'current' ? 'bg-amber-500 text-white ring-4 ring-amber-100' :
                step.status === 'warning' ? 'bg-rose-600 text-white ring-4 ring-rose-100' :
                'bg-slate-200 text-slate-400'
              }`}>
                {step.status === 'completed' && <CheckCircle2 className="w-3 h-3" />}
                {step.status === 'current' && <Clock className="w-2.5 h-2.5" />}
                {step.status === 'warning' && <AlertCircle className="w-2.5 h-2.5" />}
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className={`font-bold text-xs ${
                    step.status === 'warning' ? 'text-rose-700' :
                    step.status === 'current' ? 'text-amber-800' :
                    step.status === 'completed' ? 'text-slate-900' : 'text-slate-400'
                  }`}>
                    {step.stage}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {step.date}
                  </span>
                </div>

                <p className="text-slate-600 text-[11px] leading-relaxed">
                  {step.note}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Audit Verification Stamp */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Government PFMS Ledger Tracking Enabled</span>
        </span>
        <button
          onClick={() => navigate(`/copilot?scheme=${app.schemeId}`)}
          className="text-brand-700 hover:underline font-semibold"
        >
          Ask Copilot about this Application →
        </button>
      </div>

      {/* RESOLVE ACTION MODAL */}
      {showResolveModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>Resolve Document Issue: Income Certificate</span>
              </div>
              <button
                onClick={() => setShowResolveModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-slate-600 leading-relaxed">
              The Department of Higher Education flagged blur on the official Tehsildar rubber seal. Please attach a clear replacement scan (PDF or High-Resolution JPG).
            </p>

            <div className="p-4 bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl text-center space-y-2">
              <Upload className="w-6 h-6 text-slate-500 mx-auto" />
              <div className="font-semibold text-slate-800">
                Selected: income_certificate_certified_haveli.pdf
              </div>
              <span className="text-[11px] text-slate-500 font-mono">
                Size: 1.4 MB · 300 DPI Clear Scan
              </span>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowResolveModal(false)}
                className="px-4 py-2 border border-slate-200 text-slate-700 rounded-md hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={onConfirmResolve}
                disabled={isResolving}
                className="px-5 py-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-md flex items-center gap-2"
              >
                {isResolving ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Verifying Replacement...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Replacement to Dept</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ApplicationDetail;
