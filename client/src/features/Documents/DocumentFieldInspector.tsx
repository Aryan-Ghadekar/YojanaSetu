import { useState } from 'react';
import type { UserDocument, ExtractedField } from './types';
import DataTable from '../../components/Tables/DataTable';
import type { Column } from '../../components/Tables/DataTable';
import {
  CheckCircle2,
  AlertTriangle,
  Edit2,
  Check,
  X,
  ShieldAlert,
} from 'lucide-react';

interface DocumentFieldInspectorProps {
  doc: UserDocument;
  onSaveField: (fieldIndex: number, newValue: string) => void;
  onAuditSignals: () => void;
  onUseInApplication: () => void;
}

const DocumentFieldInspector = ({ doc, onSaveField, onAuditSignals, onUseInApplication }: DocumentFieldInspectorProps) => {
  const [editingFieldIndex, setEditingFieldIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');

  const startEditField = (index: number, currentVal: string) => {
    setEditingFieldIndex(index);
    setEditValue(currentVal);
  };

  const saveEditField = (index: number) => {
    onSaveField(index, editValue);
    setEditingFieldIndex(null);
  };

  const columns: Column<ExtractedField>[] = [
    { key: 'field', header: 'Field Name', className: 'font-medium text-slate-900' },
    {
      key: 'extractedValue',
      header: 'Extracted from Document',
      className: 'font-mono text-slate-700 bg-slate-50/40',
      render: (field) => (
        <>
          {field.extractedValue}
          <span className="block text-[10px] text-slate-600">
            Confidence: {Math.round(field.confidence * 100)}%
          </span>
        </>
      ),
    },
    {
      key: 'userValue',
      header: 'User-Provided / Verified',
      render: (field) => {
        const idx = doc.extractedFields.indexOf(field);
        if (editingFieldIndex === idx) {
          return (
            <div className="flex items-center gap-1.5">
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="p-1 text-xs border border-brand-500 rounded bg-white w-full"
              />
              <button
                onClick={() => saveEditField(idx)}
                className="p-1 bg-emerald-600 text-white rounded hover:bg-emerald-700"
              >
                <Check className="w-3 h-3" />
              </button>
              <button
                onClick={() => setEditingFieldIndex(null)}
                className="p-1 bg-slate-200 text-slate-700 rounded hover:bg-slate-300"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          );
        }
        return <span className="font-medium text-slate-900">{field.userValue}</span>;
      },
    },
    {
      key: 'action',
      header: 'Action',
      className: 'text-right',
      render: (field) => {
        const idx = doc.extractedFields.indexOf(field);
        if (editingFieldIndex === idx) return null;
        return (
          <button
            onClick={() => startEditField(idx, field.userValue)}
            className="p-1 text-slate-400 hover:text-brand-600 transition-colors"
            title="Correct OCR extraction"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
        );
      },
    },
  ];

  return (
    <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs space-y-5">

      {/* Header of selected document */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-slate-900">{doc.name}</h2>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700">
              {doc.category}
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-0.5 font-mono">
            File: {doc.fileName} · Uploaded: {doc.uploadedAt}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onAuditSignals}
            className="px-3 py-1.5 text-xs font-medium text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-md transition-colors flex items-center gap-1.5"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Authenticity Audit</span>
          </button>
        </div>
      </div>

      {/* OCR Status Checklist */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
        <div className="p-2.5 bg-slate-50 rounded-lg">
          <span className="text-[10px] text-slate-600 block">OCR Processing</span>
          <span className="font-semibold text-slate-900 mt-0.5 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Complete</span>
          </span>
        </div>

        <div className="p-2.5 bg-slate-50 rounded-lg">
          <span className="text-[10px] text-slate-600 block">Readability</span>
          <span className={`font-semibold mt-0.5 flex items-center gap-1 ${
            doc.qualityStatus === 'readable' ? 'text-emerald-700' : 'text-amber-700'
          }`}>
            {doc.qualityStatus === 'readable' ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Readable</span>
              </>
            ) : (
              <>
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                <span>Glare / Blurry</span>
              </>
            )}
          </span>
        </div>

        <div className="p-2.5 bg-slate-50 rounded-lg">
          <span className="text-[10px] text-slate-600 block">Fields Extracted</span>
          <span className="font-semibold text-slate-900 mt-0.5 font-mono">
            {doc.extractedFields.length} attributes
          </span>
        </div>

        <div className="p-2.5 bg-slate-50 rounded-lg">
          <span className="text-[10px] text-slate-600 block">Verification Status</span>
          <span className="font-semibold text-slate-900 mt-0.5">
            {doc.verificationStatus}
          </span>
        </div>
      </div>

      {/* Structured Fields Table */}
      <div className="space-y-3">
        <div>
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Extracted Fields & User Reconciliation
          </h3>
          <p className="text-[11px] text-slate-600">
            Clearly distinguishing between data extracted by OCR and your verified profile data. Click edit to correct OCR errors.
          </p>
        </div>

        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <DataTable
            data={doc.extractedFields}
            columns={columns}
            rowKey={(field) => `${doc.id}-${field.field}`}
          />
        </div>
      </div>

      {/* Action CTAs */}
      <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
        <div className="text-[11px] text-slate-600">
          Verified cryptographic hash: <span className="font-mono text-slate-600">sha256:49fa...9102</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onAuditSignals}
            className="px-3 py-1.5 text-xs text-slate-700 hover:text-slate-900 border border-slate-200 rounded-md transition-colors"
          >
            Inspect Authenticity Signals
          </button>
          <button
            onClick={onUseInApplication}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-md transition-colors"
          >
            Use in Application Form
          </button>
        </div>
      </div>

    </div>
  );
};

export default DocumentFieldInspector;
