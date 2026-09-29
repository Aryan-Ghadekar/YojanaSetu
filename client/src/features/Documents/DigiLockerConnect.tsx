import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, Lock, RefreshCw, ArrowLeft, ArrowRight } from 'lucide-react';

interface DigiLockerConnectProps {
  digiLockerConnected: boolean;
  isConnecting: boolean;
  onConnect: () => void;
  onConsentMissing: () => void;
  fullName: string;
}

const DigiLockerConnect = ({ digiLockerConnected, isConnecting, onConnect, onConsentMissing, fullName }: DigiLockerConnectProps) => {
  const navigate = useNavigate();

  const [consentChecked, setConsentChecked] = useState(true);
  const [selectedDocsToImport, setSelectedDocsToImport] = useState<string[]>([
    'aadhaar',
    'domicile',
    'caste',
    'marksheet',
  ]);

  const toggleDocSelection = (id: string) => {
    setSelectedDocsToImport((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const handleConnect = () => {
    if (!consentChecked) {
      onConsentMissing();
      return;
    }
    onConnect();
  };

  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">

      {/* Back button */}
      <button
        onClick={() => navigate('/documents')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Document Center</span>
      </button>

      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-slate-900">
          Connect DigiLocker
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Securely retrieve government-issued documents from DigiLocker to reduce manual uploads.
        </p>
      </div>

      {/* LARGE CONNECTION CARD */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-700 flex items-center justify-center font-semibold font-mono text-xl shrink-0">
              DL
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-semibold text-slate-900">National DigiLocker Service</h2>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-semibold">
                  Official MoE & MeitY Integration
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Status:{' '}
                <span className={`font-semibold ${digiLockerConnected ? 'text-emerald-700' : 'text-slate-600'}`}>
                  {digiLockerConnected ? 'Connected & Synced' : 'Not connected'}
                </span>
              </p>
            </div>
          </div>

          <div>
            {!digiLockerConnected ? (
              <button
                onClick={handleConnect}
                disabled={isConnecting}
                className="px-6 py-2.5 bg-brand-700 hover:bg-brand-800 disabled:bg-brand-400 text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-2 shadow-xs"
              >
                {isConnecting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Authorizing Aadhaar OTP...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Connect DigiLocker</span>
                  </>
                )}
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Aadhaar Link Verified</span>
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Clear Consent Messaging */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
          <div className="flex items-start gap-2.5">
            <Lock className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-semibold text-slate-900 block">
                Citizen Consent Terms (Information Technology Act, 2000)
              </span>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                I hereby provide explicit consent to YojanaSetu to retrieve digitally signed certificates issued by UIDAI, Maharashtra State Revenue Department, Secondary & Higher Secondary Education Boards, and Land Records through the National DigiLocker Gateway solely for the purpose of government scheme eligibility verification and application submission.
              </p>
            </div>
          </div>

          <label className="flex items-center gap-2 pt-1 cursor-pointer">
            <input
              type="checkbox"
              checked={consentChecked}
              onChange={(e) => setConsentChecked(e.target.checked)}
              className="rounded text-brand-600 focus:ring-brand-500 w-4 h-4"
            />
            <span className="text-[11px] font-medium text-slate-800">
              I agree to the DigiLocker terms and consent policy
            </span>
          </label>
        </div>

        {/* RECOVERED REPOSITORIES & DOCUMENTS */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Government-Issued Documents in Vault
              </h3>
              <p className="text-xs text-slate-500">
                Select documents to auto-import into your YojanaSetu Document Center
              </p>
            </div>
            <span className="text-xs font-mono text-slate-500">
              {selectedDocsToImport.length} Selected
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Identity Doc */}
            <div
              onClick={() => toggleDocSelection('aadhaar')}
              className={`p-4 rounded-xl border text-xs cursor-pointer transition-all ${
                selectedDocsToImport.includes('aadhaar')
                  ? 'bg-brand-50/40 border-brand-500'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-semibold text-brand-700 block">Identity Document</span>
                  <div className="font-bold text-slate-900">Aadhaar Card (UIDAI)</div>
                  <div className="text-[11px] text-slate-500 font-mono">Issued to: {fullName}</div>
                  <div className="text-[10px] text-emerald-700 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Cryptographically Signed QR Verified</span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={selectedDocsToImport.includes('aadhaar')}
                  onChange={() => {}}
                  className="rounded text-brand-600 focus:ring-brand-500 mt-1"
                />
              </div>
            </div>

            {/* Domicile Certificate */}
            <div
              onClick={() => toggleDocSelection('domicile')}
              className={`p-4 rounded-xl border text-xs cursor-pointer transition-all ${
                selectedDocsToImport.includes('domicile')
                  ? 'bg-brand-50/40 border-brand-500'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-semibold text-emerald-700 block">Government Certificate</span>
                  <div className="font-bold text-slate-900">Maharashtra Domicile Certificate</div>
                  <div className="text-[11px] text-slate-500 font-mono">Sub-Divisional Magistrate, Haveli</div>
                  <div className="text-[10px] text-emerald-700 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Official State Seal Attached</span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={selectedDocsToImport.includes('domicile')}
                  onChange={() => {}}
                  className="rounded text-brand-600 focus:ring-brand-500 mt-1"
                />
              </div>
            </div>

            {/* Caste Certificate */}
            <div
              onClick={() => toggleDocSelection('caste')}
              className={`p-4 rounded-xl border text-xs cursor-pointer transition-all ${
                selectedDocsToImport.includes('caste')
                  ? 'bg-brand-50/40 border-brand-500'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-semibold text-purple-700 block">Category Certificate</span>
                  <div className="font-bold text-slate-900">OBC Caste Certificate</div>
                  <div className="text-[11px] text-slate-500 font-mono">Pune District Collectorate</div>
                  <div className="text-[10px] text-emerald-700 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>e-District Portal Verified</span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={selectedDocsToImport.includes('caste')}
                  onChange={() => {}}
                  className="rounded text-brand-600 focus:ring-brand-500 mt-1"
                />
              </div>
            </div>

            {/* Educational Certificate */}
            <div
              onClick={() => toggleDocSelection('marksheet')}
              className={`p-4 rounded-xl border text-xs cursor-pointer transition-all ${
                selectedDocsToImport.includes('marksheet')
                  ? 'bg-brand-50/40 border-brand-500'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-semibold text-amber-700 block">Education Certificate</span>
                  <div className="font-bold text-slate-900">Higher Secondary Marksheet (HSC)</div>
                  <div className="text-[11px] text-slate-500 font-mono">Maharashtra State Board (MSBSHSE)</div>
                  <div className="text-[10px] text-emerald-700 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>NAD (National Academic Depository) Synced</span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={selectedDocsToImport.includes('marksheet')}
                  onChange={() => {}}
                  className="rounded text-brand-600 focus:ring-brand-500 mt-1"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            DigiLocker documents bypass manual OCR verification queues.
          </div>

          <button
            onClick={() => navigate('/documents')}
            className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-2"
          >
            <span>Proceed to Document Center</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};

export default DigiLockerConnect;
