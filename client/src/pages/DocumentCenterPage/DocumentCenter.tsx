import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { DocumentCategory, UserDocument } from '../../features/Documents/types';
import { fetchDocuments, uploadDocument, updateDocumentField } from '../../features/Documents/api';
import DocumentUploadPanel from '../../features/Documents/DocumentUploadPanel';
import DocumentList from '../../features/Documents/DocumentList';
import DocumentFieldInspector from '../../features/Documents/DocumentFieldInspector';
import { CheckCircle2, AlertTriangle } from 'lucide-react';

const DocumentCenter = () => {
  const navigate = useNavigate();

  const [documents, setDocuments] = useState<UserDocument[]>([]);
  const [selectedDocId, setSelectedDocId] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadCategory, setUploadCategory] = useState<DocumentCategory>('Income');

  useEffect(() => {
    fetchDocuments().then((docs) => {
      setDocuments(docs);
      setSelectedDocId(docs[1]?.id ?? docs[0]?.id ?? '');
    });
  }, []);

  const selectedDoc = documents.find((d) => d.id === selectedDocId) ?? documents[0];

  const verifiedCount = documents.filter((d) => d.verificationStatus === 'Verified').length;
  const reviewCount = documents.filter((d) => d.verificationStatus === 'Needs Review' || d.verificationStatus === 'Suspicious Signals').length;

  const handleFileSelected = (file: File) => {
    setIsUploading(true);
    uploadDocument({ file, category: uploadCategory }).then((newDoc) => {
      setDocuments((prev) => [newDoc, ...prev]);
      setSelectedDocId(newDoc.id);
      setIsUploading(false);
    });
  };

  const handleSaveField = (fieldIndex: number, newValue: string) => {
    if (!selectedDoc) return;
    updateDocumentField(selectedDoc, fieldIndex, newValue).then((updated) => {
      setDocuments((prev) => prev.map((d) => (d.id === updated.id ? updated : d)));
    });
  };

  return (
    <div className="space-y-8 pb-12 max-w-6xl mx-auto">

      {/* Top Header & Metrics Bar */}
      <div className="space-y-4">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-slate-900">
            Document Center & Verification Engine
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Securely manage, OCR-verify, and audit certificates required for Central and State government welfare schemes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 bg-white border border-slate-200 rounded-xl">
            <span className="text-xs text-slate-600 block">Total Uploaded</span>
            <span className="text-xl sm:text-2xl font-semibold font-mono text-slate-900 mt-1 block">
              {documents.length} documents
            </span>
          </div>

          <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl">
            <span className="text-xs text-emerald-800 font-medium block">Verified & Ready</span>
            <span className="text-xl sm:text-2xl font-semibold font-mono text-emerald-900 mt-1 block flex items-center gap-1.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>{verifiedCount} verified</span>
            </span>
          </div>

          <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-xl">
            <span className="text-xs text-amber-800 font-medium block">Needs Review</span>
            <span className="text-xl sm:text-2xl font-semibold font-mono text-amber-900 mt-1 block flex items-center gap-1.5">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <span>{reviewCount} need review</span>
            </span>
          </div>
        </div>
      </div>

      <DocumentUploadPanel
        uploadCategory={uploadCategory}
        onCategoryChange={setUploadCategory}
        isUploading={isUploading}
        onFileSelected={handleFileSelected}
      />

      {/* TWO-COLUMN WORKBENCH: DOCUMENT LIST + EXTRACTED FIELD INSPECTOR */}
      {selectedDoc ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <DocumentList
            documents={documents}
            selectedDocId={selectedDoc.id}
            onSelect={(doc) => setSelectedDocId(doc.id)}
            onAuditSignals={(doc) => navigate(`/documents/authenticity/${doc.id}`)}
          />
          <DocumentFieldInspector
            doc={selectedDoc}
            onSaveField={handleSaveField}
            onAuditSignals={() => navigate(`/documents/authenticity/${selectedDoc.id}`)}
            onUseInApplication={() => navigate('/applications')}
          />
        </div>
      ) : (
        <div className="p-8 text-center text-sm text-slate-500 bg-white border border-dashed border-slate-200 rounded-2xl">
          No documents uploaded yet. Upload your first certificate above to get started.
        </div>
      )}

    </div>
  );
};

export default DocumentCenter;
