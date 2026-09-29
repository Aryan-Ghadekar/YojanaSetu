import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { UserDocument } from './types';
import { ShieldAlert, CheckCircle2, AlertTriangle, HelpCircle, XCircle, ArrowLeft, Upload, Send } from 'lucide-react';

interface DocumentAuthenticityViewProps {
  doc: UserDocument;
  onSubmitReview: (note: string) => void;
}

const DocumentAuthenticityView = ({ doc, onSubmitReview }: DocumentAuthenticityViewProps) => {
  const navigate = useNavigate();
  const [manualSubmitted, setManualSubmitted] = useState(false);
  const [reviewNote, setReviewNote] = useState(
    'The Tehsildar rubber seal has mild camera flash glare on the lower left quadrant. The income figure of ₹2,10,000 matches the Marathi text and the registration barcode.'
  );

  const handleSubmitManualReview = (e: React.FormEvent) => {
    e.preventDefault();
    setManualSubmitted(true);
    onSubmitReview(reviewNote);
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">

      {/* Back button */}
      <button
        onClick={() => navigate('/documents')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Document Center</span>
      </button>

      {/* Main Header Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-900">{doc.name}</span>
            <span className="text-slate-300">·</span>
            <span className="text-slate-500 font-mono text-xs">{doc.fileName}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Source:</span>
            <span className="text-xs font-medium bg-slate-100 px-2 py-0.5 rounded text-slate-700">
              {doc.source}
            </span>
          </div>
        </div>

        {/* Big Status Banner */}
        <div className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
          doc.verificationStatus === 'Verified' ? 'bg-emerald-50 border-emerald-200 text-emerald-900' :
          doc.verificationStatus === 'Needs Review' ? 'bg-amber-50 border-amber-200 text-amber-900' :
          doc.verificationStatus === 'Suspicious Signals' ? 'bg-rose-50 border-rose-200 text-rose-900' :
          'bg-slate-100 border-slate-200 text-slate-800'
        }`}>
          <div className="flex items-start gap-3">
            {doc.verificationStatus === 'Verified' && <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />}
            {doc.verificationStatus === 'Needs Review' && <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />}
            {doc.verificationStatus === 'Suspicious Signals' && <ShieldAlert className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />}
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold opacity-80 block">
                Verification Engine Status
              </span>
              <h2 className="text-base font-semibold">
                Document verification: {doc.verificationStatus}
              </h2>
              <p className="text-xs mt-1 leading-relaxed opacity-90 max-w-xl">
                YojanaSetu runs multi-layer structural heuristics and cross-references government registries. This is a preliminary signal check, not a definitive civil fraud decree.
              </p>
            </div>
          </div>

          <div className="shrink-0">
            <span className="font-mono text-xs px-2.5 py-1 bg-white/80 rounded-md border border-current font-bold">
              Trust Score: {doc.verificationStatus === 'Verified' ? '98/100' : '74/100'}
            </span>
          </div>
        </div>
      </div>

      {/* DETECTED SIGNALS MATRIX */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900">
            Detected Verification Signals & Integrity Heuristics
          </h3>
          <p className="text-xs text-slate-500">
            Independent checks evaluated during OCR ingestion
          </p>
        </div>

        <div className="space-y-3">
          {/* Signal 1: Document Structure */}
          <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-100 flex items-start justify-between gap-3 text-xs">
            <div className="flex items-start gap-2.5">
              {doc.authenticitySignals.structureRecognized ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              )}
              <div>
                <span className="font-semibold text-slate-900 block">
                  Document Layout & Structure Recognition
                </span>
                <span className="text-slate-600 text-[11px] block mt-0.5">
                  Conforms to Maharashtra Revenue Department standard Gazette form template with state emblem header.
                </span>
              </div>
            </div>
            <span className="text-emerald-700 font-medium font-mono text-[11px] shrink-0">Passed</span>
          </div>

          {/* Signal 2: OCR Consistency */}
          <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-100 flex items-start justify-between gap-3 text-xs">
            <div className="flex items-start gap-2.5">
              {doc.authenticitySignals.ocrConsistencyPassed ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              )}
              <div>
                <span className="font-semibold text-slate-900 block">
                  OCR Character & Numeric Consistency
                </span>
                <span className="text-slate-600 text-[11px] block mt-0.5">
                  Cross-validation between numerals (₹2,10,000) and written Marathi text ("दोन लाख दहा हजार रुपये").
                </span>
              </div>
            </div>
            <span className="text-emerald-700 font-medium font-mono text-[11px] shrink-0">Passed (94%)</span>
          </div>

          {/* Signal 3: Image Manipulation Indicators */}
          <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-100 flex items-start justify-between gap-3 text-xs">
            <div className="flex items-start gap-2.5">
              {doc.authenticitySignals.imageManipulationDetected ? (
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              )}
              <div>
                <span className="font-semibold text-slate-900 block">
                  Image Manipulation / Quality Anomaly Detection
                </span>
                <span className="text-slate-600 text-[11px] block mt-0.5">
                  Compression noise or uneven focus detected near the Tehsildar rubber stamp boundary. No clone-stamp or text insertion detected.
                </span>
              </div>
            </div>
            <span className="text-amber-700 font-medium font-mono text-[11px] shrink-0">
              {doc.authenticitySignals.imageManipulationDetected ? 'Flagged (Blur)' : 'Clean'}
            </span>
          </div>

          {/* Signal 4: Issuing Authority Online Verification */}
          <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-100 flex items-start justify-between gap-3 text-xs">
            <div className="flex items-start gap-2.5">
              {doc.authenticitySignals.issuingAuthorityVerified ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <HelpCircle className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
              )}
              <div>
                <span className="font-semibold text-slate-900 block">
                  Issuing Authority Real-Time Verification
                </span>
                <span className="text-slate-600 text-[11px] block mt-0.5">
                  Aaple Sarkar MahaOnline revenue database lookup requires manual re-query or Tehsildar barcode confirmation.
                </span>
              </div>
            </div>
            <span className="text-sky-700 font-medium font-mono text-[11px] shrink-0">Pending Portal</span>
          </div>
        </div>
      </div>

      {/* EVIDENCE & EXPLANATION PANEL */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-4 text-xs">
        <h3 className="font-bold text-slate-900 text-sm">
          Signal Evidence & Officer Scrutiny Log
        </h3>
        <div className="space-y-2">
          {doc.authenticitySignals.details.map((detail, idx) => (
            <div key={idx} className="flex items-start gap-2 text-slate-700">
              <span className="font-mono text-slate-400 font-bold">[{idx + 1}]</span>
              <span className="leading-relaxed">{detail}</span>
            </div>
          ))}
        </div>
      </div>

      {/* MANUAL REVIEW SUBMISSION FORM */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Submit for Human Desk Review or Replace Document
            </h3>
            <p className="text-xs text-slate-500">
              If an algorithm mistakenly flags a valid paper document, submit notes for officer verification.
            </p>
          </div>
        </div>

        {manualSubmitted ? (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-900 text-xs space-y-2">
            <div className="flex items-center gap-2 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Review Request Lodged #REV-2026-9812</span>
            </div>
            <p className="leading-relaxed">
              Your explanation has been attached to this document dossier. The reviewing desk will cross-verify with Pune Haveli Tehsil record book.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmitManualReview} className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Citizen Clarification / Context Note
              </label>
              <textarea
                value={reviewNote}
                onChange={(e) => setReviewNote(e.target.value)}
                rows={3}
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-brand-600 focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <button
                type="button"
                onClick={() => navigate('/documents')}
                className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5"
              >
                <Upload className="w-3.5 h-3.5 text-slate-500" />
                <span>Re-upload Clear Scan</span>
              </button>

              <button
                type="submit"
                className="px-5 py-2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit for Manual Review</span>
              </button>
            </div>
          </form>
        )}
      </div>

    </div>
  );
};

export default DocumentAuthenticityView;
