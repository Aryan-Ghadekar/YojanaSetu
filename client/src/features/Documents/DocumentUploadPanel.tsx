import { useNavigate } from 'react-router-dom';
import type { DocumentCategory } from './types';
import { Upload, ShieldCheck, RefreshCw } from 'lucide-react';

interface DocumentUploadPanelProps {
  uploadCategory: DocumentCategory;
  onCategoryChange: (category: DocumentCategory) => void;
  isUploading: boolean;
  onFileSelected: (file: File) => void;
}

const DocumentUploadPanel = ({ uploadCategory, onCategoryChange, isUploading, onFileSelected }: DocumentUploadPanelProps) => {
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelected(file);
  };

  return (
    <div className="bg-white border-2 border-dashed border-slate-300 hover:border-slate-400 rounded-2xl p-6 sm:p-8 text-center transition-colors">
      <div className="max-w-md mx-auto space-y-3">
        <div className="w-12 h-12 rounded-full bg-brand-50 text-brand-700 flex items-center justify-center mx-auto">
          <Upload className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900">
            {isUploading ? 'Analyzing document via OCR...' : 'Upload Certificates & Identity Documents'}
          </h3>
          <p className="text-xs text-slate-600 mt-1">
            Upload Aadhaar, income certificates, caste certificates, bank documents, educational marksheets, etc.
          </p>
          <p className="text-[11px] text-slate-600 mt-0.5">
            Supported formats: PDF, JPG, PNG (Max 15MB)
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <select
            value={uploadCategory}
            onChange={(e) => onCategoryChange(e.target.value as DocumentCategory)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 text-slate-800"
          >
            <option value="Identity">Category: Identity (Aadhaar / Voter)</option>
            <option value="Income">Category: Income (Tehsildar)</option>
            <option value="Caste / Category">Category: Caste / Category</option>
            <option value="Education">Category: Education / Marksheet</option>
            <option value="Banking">Category: Banking / Passbook</option>
            <option value="Land / Property">Category: Land / 7-12 Extract</option>
          </select>

          <label className="cursor-pointer px-4 py-1.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold rounded-md transition-colors inline-flex items-center gap-1.5 shadow-xs">
            <input
              type="file"
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              disabled={isUploading}
            />
            {isUploading ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Processing OCR...</span>
              </>
            ) : (
              <>
                <Upload className="w-3.5 h-3.5" />
                <span>Choose File to Upload</span>
              </>
            )}
          </label>

          <button
            onClick={() => navigate('/documents/digilocker')}
            className="px-4 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 text-xs font-semibold rounded-md transition-colors inline-flex items-center gap-1.5"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Or Import via DigiLocker</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentUploadPanel;
