import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Filter, ArrowLeft, Download, CheckCircle2 } from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

const monthlyAppTrend = [
  { month: 'Apr 26', apps: 420000, approved: 350000 },
  { month: 'May 26', apps: 510000, approved: 430000 },
  { month: 'Jun 26', apps: 680000, approved: 580000 },
  { month: 'Jul 26', apps: 920000, approved: 780000 },
  { month: 'Aug 26', apps: 1150000, approved: 970000 },
  { month: 'Sep 26', apps: 1340000, approved: 1140000 },
];

const rejectionReasons = [
  { reason: 'Missing / Blurry Income Certificate', count: 42, color: '#EF4444' },
  { reason: 'Aadhaar-NPCI Bank Seeding Failed', count: 26, color: '#F59E0B' },
  { reason: 'Hostel Undertaking Not Signed', count: 18, color: '#8B5CF6' },
  { reason: 'Income Threshold Exceeded (>₹2.5L)', count: 9, color: '#3B82F6' },
  { reason: 'Duplicate Application / CAP Mismatch', count: 5, color: '#64748B' },
];

const dropOffFunnel = [
  { stage: '1. Scheme Viewed', count: 100, label: '100% (2.4M)' },
  { stage: '2. Eligibility Checked', count: 78, label: '78% (1.87M)' },
  { stage: '3. Documents Ingested', count: 58, label: '58% (1.39M)' },
  { stage: '4. Form Completed', count: 44, label: '44% (1.05M)' },
  { stage: '5. Successfully Submitted', count: 39, label: '39% (936k)' },
];

const SchemeUtilizationAnalytics = () => {
  const navigate = useNavigate();

  const [filterScheme, setFilterScheme] = useState('All Schemes');
  const [filterDistrict, setFilterDistrict] = useState('All Maharashtra');

  return (
    <div className="space-y-8 pb-12 max-w-6xl mx-auto">

      {/* Top Header & Back Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <button
            onClick={() => navigate('/admin')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Geographic Command</span>
          </button>
          <h1 className="text-xl font-semibold tracking-tight text-slate-900">
            Scheme Utilization & Funnel Scrutiny
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Empirical telemetry on citizen drop-off, document rejection factors, and institutional bottlenecks.
          </p>
        </div>

        <button
          onClick={() => {}}
          className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Analytics CSV</span>
        </button>
      </div>

      {/* FILTER BAR */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 font-semibold text-slate-900">
          <Filter className="w-4 h-4 text-purple-700" />
          <span>Filter Parameters:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={filterScheme}
            onChange={(e) => setFilterScheme(e.target.value)}
            className="p-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-800"
          >
            <option>All Schemes</option>
            <option>Swadhar Yojana</option>
            <option>Post-Matric Scholarship</option>
            <option>PM Kisan Samman Nidhi</option>
          </select>

          <select
            value={filterDistrict}
            onChange={(e) => setFilterDistrict(e.target.value)}
            className="p-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-800"
          >
            <option>All Maharashtra</option>
            <option>Pune District</option>
            <option>Gadchiroli District</option>
            <option>Nandurbar District</option>
          </select>

          <select className="p-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-800">
            <option>Past 6 Months (FY 26-27)</option>
            <option>Past Quarter</option>
            <option>Lifetime Records</option>
          </select>
        </div>
      </div>

      {/* THREE ANALYTICAL OBSERVATION INSIGHT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-xl space-y-1 text-xs">
          <div className="flex items-center gap-1.5 text-amber-900 font-bold">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Document Incompleteness Trend</span>
          </div>
          <p className="text-amber-950/80 leading-relaxed text-[11px]">
            <strong>42% of incomplete applications</strong> are missing valid Tehsildar income certificates or stalled by slight camera glare.
          </p>
        </div>

        <div className="p-4 bg-rose-50/60 border border-rose-200 rounded-xl space-y-1 text-xs">
          <div className="flex items-center gap-1.5 text-rose-900 font-bold">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>Bank Aadhaar-Seeding Rejections</span>
          </div>
          <p className="text-rose-950/80 leading-relaxed text-[11px]">
            <strong>26% of payment failures</strong> occur because applicant bank accounts are not mapped to the NPCI PFMS server.
          </p>
        </div>

        <div className="p-4 bg-brand-50/60 border border-brand-200 rounded-xl space-y-1 text-xs">
          <div className="flex items-center gap-1.5 text-brand-900 font-bold">
            <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0" />
            <span>DigiLocker Verification Speedup</span>
          </div>
          <p className="text-brand-950/80 leading-relaxed text-[11px]">
            Applications using DigiLocker verified certificates reach final approval <strong>11 days faster</strong> than manual paper scans.
          </p>
        </div>

      </div>

      {/* CHARTS ROW 1: APPLICATIONS OVER TIME (AREA) + REJECTION FACTORS (BAR) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left: Applications Volume vs Approval (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Application Intake vs Final Sanctions (Monthly)
              </h2>
              <p className="text-[11px] text-slate-500">
                Tracking MahaDBT and National Portal pipeline velocity
              </p>
            </div>
            <div className="flex items-center gap-3 text-[11px]">
              <span className="flex items-center gap-1 text-brand-700">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-500" />
                <span>Submitted</span>
              </span>
              <span className="flex items-center gap-1 text-emerald-700">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>Approved</span>
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyAppTrend} margin={{ left: -10, right: 10, top: 10, bottom: 10 }}>
                <defs>
                  <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorApproved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tickFormatter={(v) => `${v / 1000}k`} tick={{ fontSize: 11 }} />
                <Tooltip
                  formatter={(val: any) => [val.toLocaleString('en-IN'), 'Applications']}
                  contentStyle={{ backgroundColor: '#0F172A', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="apps" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#colorApps)" />
                <Area type="monotone" dataKey="approved" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorApproved)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Primary Rejection Reasons (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Primary Scrutiny Rejection Reasons
              </h2>
              <p className="text-[11px] text-slate-500">
                Root causes for officer dossier rollbacks
              </p>
            </div>
            <span className="text-xs font-mono text-slate-400">% Share</span>
          </div>

          <div className="space-y-3 pt-1">
            {rejectionReasons.map((item, idx) => (
              <div key={idx} className="space-y-1 text-xs">
                <div className="flex justify-between text-slate-700">
                  <span className="font-medium truncate max-w-[240px]">{item.reason}</span>
                  <span className="font-mono font-bold text-slate-900">{item.count}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${item.count}%`, backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* DROP-OFF FUNNEL DURING CITIZEN APPLICATION PROCESS */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">
            Citizen Application Conversion Funnel & Drop-Off
          </h2>
          <p className="text-xs text-slate-500">
            Analysis of where applicants drop out between initial scheme discovery and final Aadhaar e-sign submission
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
          {dropOffFunnel.map((step, idx) => (
            <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2 relative">
              <span className="text-[10px] font-mono uppercase text-slate-500 block font-bold">
                Stage 0{idx + 1}
              </span>
              <div className="font-bold text-slate-900 text-sm leading-tight">
                {step.stage}
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between items-center">
                <span className="font-mono font-bold text-slate-900 text-base">{step.count}%</span>
                <span className="text-[11px] text-slate-500">{step.label.split(' ')[1]}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl text-xs text-purple-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold">System Observation:</span>
            <span>The largest drop-off (-20%) occurs at Stage 3 (Document Ingestion). Introducing DigiLocker one-click retrieval reduced this by 34%.</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default SchemeUtilizationAnalytics;
