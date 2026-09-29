import type { UserDocument } from './types';
import { FileText, AlertTriangle } from 'lucide-react';

interface DocumentListProps {
  documents: UserDocument[];
  selectedDocId: string;
  onSelect: (doc: UserDocument) => void;
  onAuditSignals: (doc: UserDocument) => void;
}

const DocumentList = ({ documents, selectedDocId, onSelect, onAuditSignals }: DocumentListProps) => {
  return (
    <div className="lg:col-span-5 space-y-3">
      <div className="flex items-center justify-between pb-1">
        <span className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
          Uploaded Documents ({documents.length})
        </span>
        <span className="text-[11px] text-slate-600">Select to inspect OCR</span>
      </div>

      <div className="space-y-2.5">
        {documents.map((doc) => {
          const isSelected = selectedDocId === doc.id;
          return (
            <div
              key={doc.id}
              onClick={() => onSelect(doc)}
              className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                isSelected
                  ? 'bg-brand-50/50 border-brand-600 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-slate-500" />
                    <span>{doc.name}</span>
                  </div>
                  <div className="text-[11px] text-slate-600 flex items-center gap-2">
                    <span>{doc.category}</span>
                    <span>·</span>
                    <span className="font-mono">{doc.fileSize}</span>
                    <span>·</span>
                    <span className="font-medium text-slate-600">{doc.source}</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className={`inline-block font-semibold px-2 py-0.5 rounded text-[10px] ${
                    doc.verificationStatus === 'Verified' ? 'bg-emerald-50 text-emerald-800' :
                    doc.verificationStatus === 'Needs Review' ? 'bg-amber-50 text-amber-800 font-bold' :
                    'bg-rose-50 text-rose-800'
                  }`}>
                    {doc.verificationStatus}
                  </span>
                  <span className="block text-[10px] text-slate-600 mt-0.5 font-mono">
                    OCR: {doc.ocrStatus}
                  </span>
                </div>
              </div>

              {doc.qualityStatus === 'quality_issue' && (
                <div className="mt-2.5 p-2 bg-amber-50 border border-amber-200 rounded text-[11px] text-amber-900 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Document quality issue: Some text could not be reliably extracted.</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAuditSignals(doc);
                    }}
                    className="text-brand-700 hover:underline font-semibold ml-2 shrink-0"
                  >
                    Audit Signals →
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DocumentList;
