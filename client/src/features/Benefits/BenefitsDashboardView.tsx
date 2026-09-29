import { useNavigate } from 'react-router-dom';
import type { Scheme } from '../Schemes/types';
import type { ApplicationRecord } from '../Applications/types';
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
  applications: ApplicationRecord[];
}

const CATEGORY_COLORS = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444', '#06B6D4', '#EC4899', '#84CC16'];

// Scheme benefit amounts are free-text (e.g. "₹51,000 - ₹60,000", "Up to ₹10,00,000").
// This extracts the first rupee figure as a rough numeric estimate for charting.
function parseAmount(benefitAmount: string): number {
  const match = benefitAmount.match(/₹\s*([\d,]+)/);
  if (!match) return 0;
  return Number(match[1].replace(/,/g, '')) || 0;
}

function formatInr(value: number): string {
  return `₹${value.toLocaleString('en-IN')}`;
}

const BenefitsDashboardView = ({ schemes, applications }: BenefitsDashboardViewProps) => {
  const navigate = useNavigate();

  const schemeById = new Map(schemes.map((s) => [s.id, s]));
  const appliedSchemeIds = new Set(applications.map((a) => a.schemeId));

  const disbursed = applications.filter((a) => a.currentStatus === 'Disbursed');
  const pending = applications.filter((a) => a.currentStatus !== 'Disbursed');

  const totalReceived = disbursed.reduce((sum, a) => sum + parseAmount(a.benefitAmount), 0);
  const totalPending = pending.reduce((sum, a) => sum + parseAmount(a.benefitAmount), 0);

  const unappliedSchemes = schemes
    .filter((s) => !appliedSchemeIds.has(s.id) && (s.matchStatus === 'Strong match' || s.matchStatus === 'Potential match'))
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 4);

  const untappedTotal = unappliedSchemes.reduce((sum, s) => sum + parseAmount(s.benefitAmount), 0);

  const categoryTotals = new Map<string, number>();
  for (const app of applications) {
    const category = schemeById.get(app.schemeId)?.category ?? 'Other';
    categoryTotals.set(category, (categoryTotals.get(category) ?? 0) + parseAmount(app.benefitAmount));
  }
  const categoryData = Array.from(categoryTotals.entries())
    .filter(([, amount]) => amount > 0)
    .map(([name, amount], idx) => ({ name, amount, color: CATEGORY_COLORS[idx % CATEGORY_COLORS.length] }));

  const yearTotals = new Map<string, { received: number; sanctioned: number }>();
  for (const app of applications) {
    const yearMatch = app.submittedDate.match(/\d{4}/);
    const year = yearMatch ? yearMatch[0] : 'Unknown';
    const amount = parseAmount(app.benefitAmount);
    const entry = yearTotals.get(year) ?? { received: 0, sanctioned: 0 };
    entry.sanctioned += amount;
    if (app.currentStatus === 'Disbursed') entry.received += amount;
    yearTotals.set(year, entry);
  }
  const yearData = Array.from(yearTotals.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([year, totals]) => ({ year, ...totals }));

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
            {formatInr(totalReceived)}
          </div>
          <span className="text-[11px] text-emerald-700 font-medium block mt-1">
            {disbursed.length} scheme{disbursed.length === 1 ? '' : 's'} disbursed
          </span>
        </div>

        <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
          <span className="text-xs text-slate-500 font-medium block">Pending / Under Scrutiny</span>
          <div className="text-2xl font-semibold font-mono text-amber-900 mt-1">
            {formatInr(totalPending)}
          </div>
          <span className="text-[11px] text-amber-700 font-medium block mt-1">
            {pending.length} active application{pending.length === 1 ? '' : 's'}
          </span>
        </div>

        <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
          <span className="text-xs text-slate-500 font-medium block">Active Benefit Schemes</span>
          <div className="text-2xl font-semibold font-mono text-slate-900 mt-1">
            {applications.length} Scheme{applications.length === 1 ? '' : 's'}
          </div>
          <span className="text-[11px] text-slate-500 block mt-1 truncate" title={applications.map((a) => a.schemeName).join(', ')}>
            {applications.length > 0 ? applications.map((a) => a.schemeName).slice(0, 2).join(' & ') : 'None yet'}
          </span>
        </div>

        <div className="p-5 bg-brand-50/50 border border-brand-200 rounded-xl shadow-xs">
          <span className="text-xs text-brand-800 font-medium block">Untapped Entitlements</span>
          <div className="text-2xl font-semibold font-mono text-brand-950 mt-1">
            {formatInr(untappedTotal)}
          </div>
          <span className="text-[11px] text-brand-700 font-semibold block mt-1 truncate" title={unappliedSchemes.map((s) => s.shortName).join(', ')}>
            {unappliedSchemes.length > 0 ? unappliedSchemes.map((s) => s.shortName).slice(0, 2).join(' + ') : 'None right now'}
          </span>
        </div>

      </div>

      {/* RECHARTS VISUALIZATION GRID */}
      {(categoryData.length > 0 || yearData.length > 0) && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {categoryData.length > 0 && (
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
          )}

          {yearData.length > 0 && (
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
          )}

        </div>
      )}

      {/* POTENTIAL BENEFITS YOU HAVEN'T APPLIED FOR */}
      {unappliedSchemes.length > 0 && (
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
                Based on your citizen profile's strongest scheme matches.
              </p>
            </div>

            <button
              onClick={() => navigate('/schemes')}
              className="text-xs font-semibold text-brand-700 hover:text-brand-900 flex items-center gap-1"
            >
              <span>Explore All {schemes.length} Matched Schemes</span>
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
      )}

    </div>
  );
};

export default BenefitsDashboardView;
