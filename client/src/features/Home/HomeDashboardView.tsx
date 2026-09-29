import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import type { Scheme } from '../Schemes/types';
import type { ApplicationRecord } from '../Applications/types';
import EligibilityBadge from '../../components/ui/EligibilityBadge';
import {
  Search,
  Upload,
  ShieldCheck,
  FileText,
  ArrowRight,
  AlertCircle,
  Lock,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface HomeDashboardViewProps {
  schemes: Scheme[];
  applications: ApplicationRecord[];
}

const HomeDashboardView = ({ schemes, applications }: HomeDashboardViewProps) => {
  const { t, userProfile, addToComparison, isInComparison } = useApp();
  const navigate = useNavigate();

  const recommended = schemes.slice(0, 4);

  if (!userProfile) return null;

  return (
    <div className="space-y-8 pb-12">

      {/* HERO SECTION */}
      <section className="relative overflow-hidden rounded-2xl bg-white border border-slate-200 p-6 sm:p-10 shadow-sm">
        <div className="pointer-events-none absolute -left-24 -top-32 h-80 w-80 rounded-full bg-brand-200/50 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-20 top-0 h-96 w-96 rounded-full bg-accent-100/70 blur-3xl" aria-hidden="true" />

        <div className="relative max-w-3xl space-y-4">

          <div className="animate-fade-in-up inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI-Assisted Welfare & Policy Discovery Portal</span>
          </div>

          <h1
            className="animate-fade-in-up text-xl sm:text-2xl font-semibold tracking-tight text-slate-900 leading-tight text-balance"
            style={{ animationDelay: '80ms' }}
          >
            {t.heroTitle}
          </h1>

          <p
            className="animate-fade-in-up text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl"
            style={{ animationDelay: '160ms' }}
          >
            {t.heroSub}
          </p>

          <div className="animate-fade-in-up pt-2 flex flex-wrap items-center gap-3" style={{ animationDelay: '240ms' }}>
            <button
              onClick={() => navigate('/schemes')}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-lg shadow-sm hover:shadow-md transition-all hover:scale-[1.02] flex items-center gap-2"
            >
              <span>{t.findMySchemes}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigate('/documents')}
              className="px-5 py-2.5 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-400 rounded-lg transition-all hover:scale-[1.02] flex items-center gap-2"
            >
              <Upload className="w-4 h-4 text-slate-500" />
              <span>{t.uploadDocs}</span>
            </button>
          </div>

          <div className="pt-2 flex items-center gap-2 text-xs text-slate-500">
            <Lock className="w-3.5 h-3.5 text-accent-600 shrink-0" />
            <span>{t.trustNote}</span>
          </div>
        </div>
      </section>

      {/* QUICK ACTIONS ROW */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-slate-900 tracking-tight">{t.quickActions}</h2>
          <span className="text-xs text-slate-600">Common citizen services</span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <button
            onClick={() => navigate('/schemes')}
            className="p-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-left transition-all hover:border-slate-300 group shadow-xs"
          >
            <div className="w-9 h-9 rounded-lg bg-brand-50 text-brand-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Search className="w-5 h-5" />
            </div>
            <div className="font-semibold text-sm text-slate-900">{t.findSchemes}</div>
            <p className="text-xs text-slate-600 mt-1">Browse 120+ Central & State schemes by eligibility</p>
          </button>

          <button
            onClick={() => navigate('/documents')}
            className="p-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-left transition-all hover:border-slate-300 group shadow-xs"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Upload className="w-5 h-5" />
            </div>
            <div className="font-semibold text-sm text-slate-900">{t.uploadDocs}</div>
            <p className="text-xs text-slate-600 mt-1">Run OCR analysis on income, caste & academic records</p>
          </button>

          <button
            onClick={() => navigate('/documents/digilocker')}
            className="p-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-left transition-all hover:border-slate-300 group shadow-xs"
          >
            <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="font-semibold text-sm text-slate-900">{t.connectDigiLocker}</div>
            <p className="text-xs text-slate-600 mt-1">Instant sync with National Digital Locker vault</p>
          </button>

          <button
            onClick={() => navigate('/applications')}
            className="p-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-left transition-all hover:border-slate-300 group shadow-xs"
          >
            <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
            <div className="font-semibold text-sm text-slate-900">{t.trackApplication}</div>
            <p className="text-xs text-slate-600 mt-1">Check live status of 3 active government applications</p>
          </button>
        </div>
      </section>

      {/* ELIGIBILITY SNAPSHOT */}
      <section className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-slate-900">{t.eligibilitySnapshot}</h2>
              <span className="text-xs text-slate-600 font-mono">ID: MH-CIT-88210</span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              Verified attributes used to automatically assess 80+ state and central welfare guidelines
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-xs text-slate-600 font-medium">Profile completeness</div>
              <div className="text-sm font-bold text-slate-900 font-mono">82% Verified</div>
            </div>
            <button
              onClick={() => navigate('/profile')}
              className="px-3 py-1.5 text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 rounded-md transition-colors whitespace-nowrap"
            >
              {t.completeProfile}
            </button>
          </div>
        </div>

        {/* Profile Attributes Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 pt-4 text-xs">
          <div>
            <span className="text-slate-600 block text-[11px]">Age & Gender</span>
            <span className="font-semibold text-slate-900 mt-0.5 block">{userProfile.age} yrs · {userProfile.gender}</span>
          </div>

          <div>
            <span className="text-slate-600 block text-[11px]">State & District</span>
            <span className="font-semibold text-slate-900 mt-0.5 block">{userProfile.district}, {userProfile.state}</span>
          </div>

          <div>
            <span className="text-slate-600 block text-[11px]">Occupation</span>
            <span className="font-semibold text-slate-900 mt-0.5 block truncate" title={userProfile.occupation}>
              {userProfile.occupation}
            </span>
          </div>

          <div>
            <span className="text-slate-600 block text-[11px]">Declared Family Income</span>
            <span className="font-semibold text-slate-900 mt-0.5 block font-mono">₹{userProfile.annualIncome.toLocaleString('en-IN')} / yr</span>
          </div>

          <div>
            <span className="text-slate-600 block text-[11px]">Category / Caste</span>
            <span className="font-semibold text-slate-900 mt-0.5 block">{userProfile.casteCategory}</span>
          </div>

          <div>
            <span className="text-slate-600 block text-[11px]">Family & Land</span>
            <span className="font-semibold text-slate-900 mt-0.5 block font-mono">{userProfile.familyMembers} members · {userProfile.landHoldingAcres} ac</span>
          </div>
        </div>
      </section>

      {/* RECOMMENDED SCHEMES */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">{t.recommendedSchemes}</h2>
            <p className="text-xs text-slate-600">
              Matched against your profile rules · Verified as of September 2026
            </p>
          </div>
          <button
            onClick={() => navigate('/schemes')}
            className="text-xs font-semibold text-brand-700 hover:text-brand-900 flex items-center gap-1"
          >
            <span>View All Schemes (12)</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommended.map((scheme) => (
            <div
              key={scheme.id}
              className="bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-300 transition-all shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-600 pb-2 mb-2 border-b border-slate-100">
                  <span className="truncate max-w-[200px]">{scheme.department}</span>
                  <span className="font-mono text-[11px] text-slate-600">{scheme.level}</span>
                </div>

                <h3
                  className="text-sm font-semibold text-slate-900 hover:text-brand-700 cursor-pointer"
                  onClick={() => navigate(`/schemes/${scheme.id}`)}
                >
                  {scheme.name}
                </h3>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 py-2 px-3 bg-slate-50 rounded-lg">
                  <div>
                    <span className="text-[10px] text-slate-600 uppercase font-semibold block">
                      {t.aiEligibilityMatch}
                    </span>
                    <EligibilityBadge status={scheme.matchStatus} score={scheme.matchScore} compact />
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-600 uppercase font-semibold block">
                      {t.estimatedBenefit}
                    </span>
                    <span className="text-sm font-bold text-slate-900 font-mono">
                      {scheme.benefitAmount}
                    </span>
                  </div>
                </div>

                <div className="mt-3 text-xs text-slate-600 leading-relaxed">
                  <span className="font-medium text-slate-800">Match reason: </span>
                  {scheme.keyReason}
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-slate-600">
                  <span>Required documents</span>
                  <span className="font-medium text-slate-800 font-mono">
                    {scheme.documents.filter((d) => d.isAvailable).length} / {scheme.documents.length} available
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => {
                    if (isInComparison(scheme.id)) {
                      navigate('/schemes/compare');
                    } else {
                      addToComparison(scheme.id);
                    }
                  }}
                  className="px-2.5 py-1.5 text-xs text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50 rounded-md transition-colors"
                >
                  {isInComparison(scheme.id) ? 'In Compare ✓' : '+ Compare'}
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate(`/schemes/${scheme.id}`)}
                    className="px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
                  >
                    {t.viewDetails}
                  </button>
                  <button
                    onClick={() => navigate(`/applications/new/${scheme.id}`)}
                    className="px-3 py-1.5 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-md transition-colors"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RECENT APPLICATIONS */}
      <section className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">{t.recentApplications}</h2>
            <p className="text-xs text-slate-600">Live tracker synced with state and central portals</p>
          </div>
          <button
            onClick={() => navigate('/applications')}
            className="text-xs font-semibold text-brand-700 hover:text-brand-900"
          >
            All Applications (3) →
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {applications.map((app) => (
            <div key={app.id} className="py-3.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-slate-600">{app.applicationNumber}</span>
                  <span className="text-slate-300">·</span>
                  <span className="font-semibold text-slate-900">{app.schemeName}</span>
                </div>
                <div className="text-slate-600 flex items-center gap-2">
                  <span>Submitted: {app.submittedDate}</span>
                  <span>·</span>
                  <span>Updated: {app.lastUpdated}</span>
                  <span>·</span>
                  <span className="font-mono font-medium text-slate-800">{app.benefitAmount}</span>
                </div>
                {app.currentStatus === 'Action Required' && app.actionRequiredMessage && (
                  <div className="mt-1.5 flex items-center gap-1.5 text-rose-700 bg-rose-50 border border-rose-200 p-2 rounded-md">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{app.actionRequiredMessage}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right">
                  <span className={`inline-block font-semibold px-2 py-0.5 rounded text-[11px] ${
                    app.currentStatus === 'Disbursed' ? 'bg-emerald-50 text-emerald-800' :
                    app.currentStatus === 'Action Required' ? 'bg-rose-50 text-rose-800 font-bold' :
                    app.currentStatus === 'Department Review' ? 'bg-amber-50 text-amber-800' :
                    'bg-slate-100 text-slate-700'
                  }`}>
                    {app.currentStatus}
                  </span>
                  <span className="block text-[10px] text-slate-600 font-mono mt-0.5">
                    Step {app.currentStepIndex} of {app.totalSteps}
                  </span>
                </div>

                <button
                  onClick={() => navigate('/applications')}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                >
                  {app.currentStatus === 'Action Required' ? t.resolveIssue : t.viewApplication}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default HomeDashboardView;
