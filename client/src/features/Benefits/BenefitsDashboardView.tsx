import { useNavigate } from 'react-router-dom';
import type { Scheme } from '../Schemes/types';
import { Sparkles, ArrowRight, ChevronRight } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  CartesianGrid,
} from 'recharts';

interface BenefitsDashboardViewProps {
  schemes: Scheme[];
}

const categoryData = [
  { name: 'Education & Hostel', amount: 51000, color: '#3B82F6' },
  { name: 'Agriculture & PM-Kisan', amount: 6000, color: '#10B981' },
  { name: 'Tuition Fee Subsidy', amount: 38000, color: '#8B5CF6' },
  { name: 'Rooftop Solar Subsidy', amount: 78000, color: '#F59E0B' },
];

const yearData = [
  { year: '2024', received: 6000, sanctioned: 6000 },
  { year: '2025', received: 12000, sanctioned: 18000 },
  { year: '2026 (Est.)', received: 18000, sanctioned: 95000 },
];

const BenefitsDashboardView = ({ schemes }: BenefitsDashboardViewProps) => {
  const navigate = useNavigate();

  const unappliedSchemes = schemes.filter((s) => s.id === 'pm-surya-ghar-2026' || s.id === 'pm-mudra-yojana-2026');

  return (
    <div className="space-y-8 pb-12 max-w-6xl mx-auto">

      {/* Top Header */}
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-slate-900">
          Citizen Benefits & Utilization Dashboard
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Aggregated lifetime public assistance, pending DBT disbursements, and untapped welfare entitlements.
        </p>
      </div>

      {/* METRIC HIGHLIGHT CARDS (4 CARDS) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">

        <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
          <span className="text-xs text-slate-500 font-medium block">Total Benefits Received</span>
          <div className="text-2xl font-semibold font-mono text-slate-900 mt-1">
            ₹18,000
          </div>
          <span className="text-[11px] text-emerald-700 font-medium block mt-1">
            Credited via PFMS Direct Transfer
          </span>
        </div>

        <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
          <span className="text-xs text-slate-500 font-medium block">Pending / Under Scrutiny</span>
          <div className="text-2xl font-semibold font-mono text-amber-900 mt-1">
            ₹89,000
          </div>
          <span className="text-[11px] text-amber-700 font-medium block mt-1">
            2 active scholarship dossiers
          </span>
        </div>

        <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
          <span className="text-xs text-slate-500 font-medium block">Active Benefit Schemes</span>
          <div className="text-2xl font-semibold font-mono text-slate-900 mt-1">
            2 Schemes
          </div>
          <span className="text-[11px] text-slate-500 block mt-1">
            PM-Kisan & Swadhar
          </span>
        </div>

        <div className="p-5 bg-brand-50/50 border border-brand-200 rounded-xl shadow-xs">
          <span className="text-xs text-brand-800 font-medium block">Untapped Entitlements</span>
          <div className="text-2xl font-semibold font-mono text-brand-950 mt-1">
            ₹10,78,000
          </div>
          <span className="text-[11px] text-brand-700 font-semibold block mt-1">
            Solar + Mudra Enterprise
          </span>
        </div>

      </div>

      {/* RECHARTS VISUALIZATION GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left: Category Allocation Bar Chart (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Welfare Value by Policy Sector (₹ INR)
              </h2>
              <p className="text-[11px] text-slate-500">
                Direct Assistance and Institutional Reimbursements
              </p>
            </div>
            <span className="text-xs font-mono text-slate-400">2026 Fiscal Year</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="vertical" margin={{ left: 10, right: 30, top: 10, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                <XAxis type="number" tickFormatter={(v) => `₹${v / 1000}k`} tick={{ fontSize: 11 }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={130} />
                <Tooltip
                  formatter={(val: any) => [`₹${val.toLocaleString('en-IN')}`, 'Amount']}
                  contentStyle={{ backgroundColor: '#0F172A', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
                />
                <Bar dataKey="amount" radius={[0, 4, 4, 0]}>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Year on Year Disbursement (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Annual Benefits Progression
              </h2>
              <p className="text-[11px] text-slate-500">
                Received vs Sanctioned Growth
              </p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={yearData} margin={{ left: 0, right: 10, top: 10, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                <YAxis tickFormatter={(v) => `₹${v / 1000}k`} tick={{ fontSize: 11 }} />
                <Tooltip
                  formatter={(val: any) => [`₹${val.toLocaleString('en-IN')}`, '']}
                  contentStyle={{ backgroundColor: '#0F172A', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
                />
                <Bar dataKey="received" name="Received DBT" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="sanctioned" name="Sanctioned Total" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* POTENTIAL BENEFITS YOU HAVEN'T APPLIED FOR */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <h2 className="text-sm font-semibold text-slate-900">
                Potential Benefits You Haven't Applied For
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Based on your household 1.8-acre land and rural residential address in Pune Haveli.
            </p>
          </div>

          <button
            onClick={() => navigate('/schemes')}
            className="text-xs font-semibold text-brand-700 hover:text-brand-900 flex items-center gap-1"
          >
            <span>Explore All 12 Matched Schemes</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {unappliedSchemes.map((scheme) => (
            <div
              key={scheme.id}
              className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-all bg-slate-50/50 flex flex-col justify-between text-xs space-y-3"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-slate-500 uppercase">{scheme.level}</span>
                  <span className="font-bold text-slate-900 font-mono">{scheme.benefitAmount}</span>
                </div>
                <h3 className="font-bold text-sm text-slate-900">{scheme.name}</h3>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  {scheme.keyReason}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-mono">
                  {scheme.documents.filter((d) => d.isAvailable).length} / {scheme.documents.length} Docs Ready
                </span>
                <button
                  onClick={() => navigate(`/schemes/${scheme.id}`)}
                  className="px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-md transition-colors flex items-center gap-1"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default BenefitsDashboardView;
