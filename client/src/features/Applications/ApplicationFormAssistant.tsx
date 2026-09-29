import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import type { Scheme } from '../Schemes/types';
import {
  CheckCircle2,
  Bot,
  HelpCircle,
  ShieldCheck,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';

interface ApplicationFormAssistantProps {
  scheme: Scheme;
  onSubmit: (formData: Record<string, string | boolean>) => Promise<void>;
}

const steps = [
  { title: 'Profile', desc: 'Demographics' },
  { title: 'Eligibility', desc: 'Rule validation' },
  { title: 'Documents', desc: 'OCR verified' },
  { title: 'Application', desc: 'Form filling' },
  { title: 'Review', desc: 'e-Sign check' },
  { title: 'Submit', desc: 'Govt dispatch' },
];

const ApplicationFormAssistant = ({ scheme, onSubmit }: ApplicationFormAssistantProps) => {
  const { userProfile, addNotification } = useApp();
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState<number>(3); // 0-based: 3 = Application Form
  const [activeFocusedField, setActiveFocusedField] = useState<string>('annualIncome');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fullName: userProfile.fullName,
    aadhaarNo: 'XXXX-XXXX-4921',
    collegeName: 'COEP Technological University, Pune',
    courseName: 'B.Tech in Computer Engineering (Semester 5)',
    casteCertificateNo: 'SDO/PUN/2022/99104',
    annualIncome: '210000',
    incomeCertificateBarcode: 'MH-REV-2025-884129',
    bankAccountNo: '60199482910',
    ifscCode: 'MAHB0000412',
    hostelAllotted: 'No',
    residentialDistanceKm: '42',
    monthlyRentPaid: '4500',
    consentUndertaking: true,
  });

  const getCopilotFieldAdvice = () => {
    switch (activeFocusedField) {
      case 'annualIncome':
        return {
          title: 'Annual Family Income',
          advice: 'This field asks for your total gross annual parental income. Based on your uploaded Tehsildar Income Certificate (doc-income), the extracted value is ₹2,10,000.',
          extractedValue: '₹2,10,000',
          ruleReason: 'The Swadhar Scheme income ceiling is ₹2,50,000. Entering ₹2,10,000 fully complies with Maharashtra Social Justice norms.',
        };
      case 'hostelAllotted':
        return {
          title: 'Hostel Allotment Declaration',
          advice: 'The scheme requires confirmation that you did NOT receive a government hostel seat in Pune. Selecting "No" qualifies you for the ₹51,000 direct accommodation grant.',
          extractedValue: 'No Government Hostel Seat',
          ruleReason: 'Mandatory condition under Section 4(B) of Ambedkar Swadhar Guidelines to avoid dual public benefit.',
        };
      case 'residentialDistanceKm':
        return {
          title: 'Residential Distance from Institute',
          advice: 'Applicant must reside at least 5 km away from their educational campus. We calculated 42 km between Wagholi/Haveli and COEP Shivajinagar.',
          extractedValue: '42 km (Verified via Google Maps)',
          ruleReason: 'Meets the minimum 5 km distance eligibility threshold for housing stipend.',
        };
      case 'bankAccountNo':
        return {
          title: 'NPCI Seeded Bank Account',
          advice: 'Direct Benefit Transfer (DBT) funds are credited strictly via Aadhaar-seeded NPCI mapper. Your Bank of Maharashtra account 60199482910 is active.',
          extractedValue: 'Bank of Maharashtra (NPCI Active)',
          ruleReason: 'Mandated by Public Financial Management System (PFMS) for direct disbursal.',
        };
      default:
        return {
          title: 'Field Verification',
          advice: 'YojanaSetu Copilot has validated this field against your DigiLocker verified identity tokens.',
          extractedValue: 'Auto-verified',
          ruleReason: 'Standard Maharashtra e-Governance verification protocol.',
        };
    }
  };

  const currentFieldInfo = getCopilotFieldAdvice();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onSubmit(formData);
    setIsSubmitting(false);
    navigate('/applications');
  };

  return (
    <div className="space-y-6 pb-12 max-w-6xl mx-auto">

      {/* Top Breadcrumb & Scheme Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200">
        <div>
          <button
            onClick={() => navigate(`/schemes/${scheme.id}`)}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Scheme Details</span>
          </button>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold text-slate-900">
              Guided Application Assistant: {scheme.shortName}
            </h1>
            <span className="text-xs font-mono bg-brand-50 text-brand-800 px-2 py-0.5 rounded border border-brand-200">
              Form Gateway
            </span>
          </div>
        </div>

        <div className="text-xs text-slate-500 font-mono">
          Portal: {scheme.officialPortal}
        </div>
      </div>

      {/* TOP PROGRESS BAR (6 STEPS) */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-xs">
          {steps.map((st, idx) => {
            const isCompleted = idx < activeStep;
            const isCurrent = idx === activeStep;
            return (
              <div
                key={idx}
                onClick={() => {
                  if (idx <= 3) setActiveStep(idx);
                }}
                className={`p-2 rounded-lg border cursor-pointer transition-colors ${
                  isCurrent ? 'bg-amber-500/10 border-amber-500 font-bold text-amber-950' :
                  isCompleted ? 'bg-slate-50 border-slate-200 text-slate-700' :
                  'border-transparent text-slate-400'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  {isCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  ) : (
                    <span className="font-mono text-[10px] text-slate-500 font-bold">0{idx + 1}</span>
                  )}
                  <span className="truncate">{st.title}</span>
                </div>
                <span className="text-[10px] block text-slate-500 mt-0.5 truncate">{st.desc}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* MAIN TWO-COLUMN SPLIT: APPLICATION FORM (8 COLS) + COPILOT SIDEBAR (4 COLS) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* LEFT COLUMN: OFFICIAL GOVERNMENT FORM (8 COLS) */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">
                MahaDBT Official Dossier Form (2026-27)
              </h2>
              <p className="text-xs text-slate-500">
                All pre-filled fields are verified from your uploaded certificates.
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>DigiLocker Linked</span>
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 text-xs">

            {/* Section 1: Candidate Demographics */}
            <div className="space-y-3">
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-500">
                1. Candidate Profile & Domicile
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                    onFocus={() => setActiveFocusedField('fullName')}
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">Aadhaar Vault Number</label>
                  <input
                    type="text"
                    value={formData.aadhaarNo}
                    disabled
                    className="w-full p-2.5 bg-slate-100 border border-slate-200 rounded-lg text-slate-500 font-mono"
                    onFocus={() => setActiveFocusedField('aadhaar')}
                  />
                </div>
              </div>
            </div>

            {/* Section 2: College & Course */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-500">
                2. Educational Institution Affiliation
              </h3>

              <div className="grid grid-cols-1 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Accredited College / Institute</label>
                  <input
                    type="text"
                    value={formData.collegeName}
                    onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                    onFocus={() => setActiveFocusedField('college')}
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">Enrolled Course / Degree</label>
                  <input
                    type="text"
                    value={formData.courseName}
                    onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                    onFocus={() => setActiveFocusedField('course')}
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Income & Tehsildar Extraction (HIGHLIGHTED) */}
            <div className={`p-4 rounded-xl border transition-colors space-y-3 ${
              activeFocusedField === 'annualIncome'
                ? 'bg-amber-50/50 border-amber-300'
                : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-amber-900">
                  3. Annual Family Income (Verified by Tehsildar)
                </h3>
                <span className="text-[10px] text-amber-700 font-semibold bg-amber-100 px-2 py-0.5 rounded">
                  Copilot Focused
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">
                    Annual Gross Parental Income (INR) *
                  </label>
                  <input
                    type="text"
                    value={formData.annualIncome}
                    onChange={(e) => setFormData({ ...formData, annualIncome: e.target.value })}
                    onFocus={() => setActiveFocusedField('annualIncome')}
                    className="w-full p-2.5 bg-white border border-amber-400 rounded-lg text-slate-900 font-mono font-bold text-sm focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">
                    Tehsildar Certificate Barcode / Number
                  </label>
                  <input
                    type="text"
                    value={formData.incomeCertificateBarcode}
                    onChange={(e) => setFormData({ ...formData, incomeCertificateBarcode: e.target.value })}
                    onFocus={() => setActiveFocusedField('annualIncome')}
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Section 4: Residential Distance & Hostel Status */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-500">
                4. Residential Distance & Non-Hostel Verification
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Government Hostel Allotted?</label>
                  <select
                    value={formData.hostelAllotted}
                    onChange={(e) => setFormData({ ...formData, hostelAllotted: e.target.value })}
                    onFocus={() => setActiveFocusedField('hostelAllotted')}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                  >
                    <option value="No">No (Eligible for Swadhar)</option>
                    <option value="Yes">Yes (Ineligible)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">Campus Distance (Km)</label>
                  <input
                    type="number"
                    value={formData.residentialDistanceKm}
                    onChange={(e) => setFormData({ ...formData, residentialDistanceKm: e.target.value })}
                    onFocus={() => setActiveFocusedField('residentialDistanceKm')}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">Monthly Room Rent (₹)</label>
                  <input
                    type="number"
                    value={formData.monthlyRentPaid}
                    onChange={(e) => setFormData({ ...formData, monthlyRentPaid: e.target.value })}
                    onFocus={() => setActiveFocusedField('rent')}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Section 5: Bank Account for DBT */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-500">
                5. DBT Bank Account (NPCI Aadhaar-Mapped)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Bank Account Number</label>
                  <input
                    type="text"
                    value={formData.bankAccountNo}
                    onChange={(e) => setFormData({ ...formData, bankAccountNo: e.target.value })}
                    onFocus={() => setActiveFocusedField('bankAccountNo')}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">IFSC Code (Bank of Maharashtra)</label>
                  <input
                    type="text"
                    value={formData.ifscCode}
                    onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value })}
                    onFocus={() => setActiveFocusedField('bankAccountNo')}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-mono uppercase"
                  />
                </div>
              </div>
            </div>

            {/* Declaration Checkbox */}
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-start gap-2">
              <input
                type="checkbox"
                checked={formData.consentUndertaking}
                onChange={(e) => setFormData({ ...formData, consentUndertaking: e.target.checked })}
                className="rounded text-brand-600 focus:ring-brand-500 mt-0.5"
              />
              <p className="text-[11px] text-slate-600 leading-relaxed">
                I hereby declare that the facts stated above are true to the best of my knowledge and verified by official Maharashtra revenue certificates.
              </p>
            </div>

            {/* Form Footer Action */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => navigate(`/schemes/${scheme.id}`)}
                className="px-4 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium rounded-lg text-xs"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-2 shadow-xs"
              >
                {isSubmitting ? (
                  <span>Transmitting to MahaDBT Portal...</span>
                ) : (
                  <>
                    <span>Submit Completed Application Dossier</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </form>
        </div>

        {/* RIGHT SIDEBAR: YOJANASETU COPILOT FIELD ASSISTANT (4 COLS) */}
        <div className="lg:col-span-4 bg-gradient-to-b from-slate-900 to-slate-850 text-white rounded-xl p-5 shadow-xs space-y-5 border border-slate-800 sticky top-20">

          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-700/80">
            <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">YojanaSetu Field Assistant</h3>
              <span className="text-[11px] text-amber-300">Live Field-by-Field Scrutiny</span>
            </div>
          </div>

          {/* Current Focused Field Box */}
          <div className="p-3.5 bg-slate-800/90 rounded-xl border border-slate-700 space-y-2 text-xs">
            <div className="text-[10px] font-mono uppercase text-amber-400 font-semibold">
              Currently Selected Field
            </div>
            <div className="text-sm font-bold text-white">
              {currentFieldInfo.title}
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              {currentFieldInfo.advice}
            </p>

            <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Extracted value:</span>
              <span className="font-mono font-bold text-amber-300">{currentFieldInfo.extractedValue}</span>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  if (activeFocusedField === 'annualIncome') {
                    setFormData((prev) => ({ ...prev, annualIncome: '210000' }));
                    addNotification({
                      type: 'success',
                      title: 'Extracted Value Applied',
                      message: 'Filled ₹2,10,000 from verified Tehsildar Income Certificate.',
                    });
                  }
                }}
                className="w-full py-1.5 px-2 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded font-semibold text-[11px] text-center transition-colors"
              >
                Use Extracted Value
              </button>
            </div>
          </div>

          {/* Why am I being asked this? */}
          <div className="p-3.5 bg-slate-800/50 rounded-xl border border-slate-700/70 space-y-1.5 text-xs">
            <div className="flex items-center gap-1.5 text-amber-400 font-semibold text-[11px]">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Why am I being asked this?</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              {currentFieldInfo.ruleReason}
            </p>
          </div>

          {/* Quality check reminder */}
          <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-200 text-xs space-y-1">
            <div className="font-semibold flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Document Quality Advisory</span>
            </div>
            <p className="text-[11px] leading-relaxed text-amber-200/90">
              The Tehsildar seal has mild glare. It is accepted for submission, but keep your original physical certificate ready for college nodal check.
            </p>
          </div>

          <div className="text-[11px] text-slate-400 text-center font-mono">
            Encrypted with 256-bit AES · MahaDBT API
          </div>

        </div>

      </div>

    </div>
  );
};

export default ApplicationFormAssistant;
