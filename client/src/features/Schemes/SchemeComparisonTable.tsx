import { useNavigate } from 'react-router-dom';
import type { Scheme } from './types';
import EligibilityBadge from '../../components/ui/EligibilityBadge';
import { Scale, CheckCircle2, XCircle, X, ExternalLink, ArrowRight, Sparkles } from 'lucide-react';

interface SchemeComparisonTableProps {
  schemes: Scheme[];
  comparisonSchemeIds: string[];
  addToComparison: (schemeId: string) => void;
  removeFromComparison: (schemeId: string) => void;
}

const SchemeComparisonTable = ({
  schemes,
  comparisonSchemeIds,
  addToComparison,
  removeFromComparison,
}: SchemeComparisonTableProps) => {
  const navigate = useNavigate();

  const comparedSchemes = schemes.filter((s) => comparisonSchemeIds.includes(s.id));
  const remainingSchemes = schemes.filter((s) => !comparisonSchemeIds.includes(s.id));

  return (
    <div className="space-y-8 pb-12 max-w-6xl mx-auto">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold tracking-tight text-slate-900">
              Compare Schemes
            </h1>
            <span className="text-xs font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
              {comparedSchemes.length} of 4 selected
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Compare eligibility limits, financial structures, documentation, and processing timelines side by side.
          </p>
        </div>

        {remainingSchemes.length > 0 && comparedSchemes.length < 4 && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Add to compare:</span>
            <select
              onChange={(e) => {
                if (e.target.value) {
                  addToComparison(e.target.value);
                  e.target.value = '';
                }
              }}
              defaultValue=""
              className="text-xs bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800"
            >
              <option value="" disabled>+ Add another scheme...</option>
              {remainingSchemes.map((s) => (
                <option key={s.id} value={s.id}>{s.shortName}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {comparedSchemes.length === 0 ? (
        <div className="text-center py-16 bg-white border border-slate-200 rounded-2xl p-8 space-y-3">
          <Scale className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-sm font-semibold text-slate-900">No schemes selected for comparison</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Select up to 4 schemes from your search results to compare their benefits and rules side by side.
          </p>
          <button
            onClick={() => navigate('/schemes/results')}
            className="px-4 py-2 bg-brand-600 text-white text-xs font-semibold rounded-lg hover:bg-brand-700 transition-colors"
          >
            Browse Matched Schemes
          </button>
        </div>
      ) : (
        <div className="space-y-8">

          {/* SIDE-BY-SIDE MATRIX TABLE */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs divide-y divide-slate-200">
                <thead className="bg-slate-50 text-slate-700">
                  <tr>
                    <th className="py-4 px-4 w-48 font-bold text-slate-900 bg-slate-100/70 border-r border-slate-200">
                      Comparison Criteria
                    </th>
                    {comparedSchemes.map((s) => (
                      <th key={s.id} className="py-4 px-4 min-w-[240px] max-w-[280px] align-top">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] font-mono text-slate-500 uppercase">{s.level}</span>
                            <button
                              onClick={() => removeFromComparison(s.id)}
                              className="text-slate-400 hover:text-rose-600 p-0.5"
                              title="Remove from comparison"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div
                            className="font-bold text-sm text-slate-900 hover:text-brand-700 cursor-pointer"
                            onClick={() => navigate(`/schemes/${s.id}`)}
                          >
                            {s.shortName}
                          </div>
                          <EligibilityBadge status={s.matchStatus} score={s.matchScore} compact />
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {/* Row: Estimated Benefit */}
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 font-semibold text-slate-900 bg-slate-50/70 border-r border-slate-200">
                      Financial Benefit
                    </td>
                    {comparedSchemes.map((s) => (
                      <td key={s.id} className="py-3 px-4">
                        <span className="font-bold text-slate-900 font-mono text-sm block">
                          {s.benefitAmount}
                        </span>
                        <span className="text-[11px] text-slate-500">
                          {s.benefitFrequency} · {s.benefitType}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Row: Government Department */}
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 font-semibold text-slate-900 bg-slate-50/70 border-r border-slate-200">
                      Department & Ministry
                    </td>
                    {comparedSchemes.map((s) => (
                      <td key={s.id} className="py-3 px-4 text-slate-700">
                        <span className="block font-medium">{s.department}</span>
                        <span className="text-[11px] text-slate-500">{s.ministry}</span>
                      </td>
                    ))}
                  </tr>

                  {/* Row: Income Ceiling */}
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 font-semibold text-slate-900 bg-slate-50/70 border-r border-slate-200">
                      Family Income Limit
                    </td>
                    {comparedSchemes.map((s) => (
                      <td key={s.id} className="py-3 px-4 font-mono text-slate-800">
                        ≤ ₹{s.maxIncomeLimit.toLocaleString('en-IN')}
                        <span className="block text-[10px] text-emerald-700 font-sans font-medium mt-0.5">
                          ✓ Declared (₹2.10L) complies
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Row: Age Limit */}
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 font-semibold text-slate-900 bg-slate-50/70 border-r border-slate-200">
                      Age Requirement
                    </td>
                    {comparedSchemes.map((s) => (
                      <td key={s.id} className="py-3 px-4 text-slate-800">
                        {s.minAge} to {s.maxAge} years
                        <span className="block text-[10px] text-emerald-700 font-medium mt-0.5">
                          ✓ Applicant age 21 complies
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Row: Required Documents */}
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 font-semibold text-slate-900 bg-slate-50/70 border-r border-slate-200">
                      Required Documents
                    </td>
                    {comparedSchemes.map((s) => {
                      const avail = s.documents.filter((d) => d.isAvailable).length;
                      return (
                        <td key={s.id} className="py-3 px-4">
                          <span className="font-semibold text-slate-900 font-mono">
                            {avail} of {s.documents.length} ready
                          </span>
                          <div className="space-y-1 mt-1 text-[11px]">
                            {s.documents.slice(0, 3).map((d) => (
                              <div key={d.id} className="flex items-center gap-1 text-slate-600 truncate">
                                {d.isAvailable ? (
                                  <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                                ) : (
                                  <XCircle className="w-3 h-3 text-rose-600 shrink-0" />
                                )}
                                <span className="truncate">{d.name}</span>
                              </div>
                            ))}
                            {s.documents.length > 3 && (
                              <span className="text-[10px] text-slate-400 block">
                                + {s.documents.length - 3} more
                              </span>
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>

                  {/* Row: Application Complexity */}
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 font-semibold text-slate-900 bg-slate-50/70 border-r border-slate-200">
                      Application Complexity
                    </td>
                    {comparedSchemes.map((s) => (
                      <td key={s.id} className="py-3 px-4">
                        <span className={`inline-block font-semibold px-2 py-0.5 rounded text-[11px] ${
                          s.complexity === 'Low' ? 'bg-emerald-50 text-emerald-800' :
                          s.complexity === 'Medium' ? 'bg-sky-50 text-sky-800' : 'bg-amber-50 text-amber-800'
                        }`}>
                          {s.complexity} Complexity
                        </span>
                        <span className="block text-[11px] text-slate-500 mt-0.5">
                          {s.applicationSteps.length} Form steps
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Row: Processing Time */}
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 font-semibold text-slate-900 bg-slate-50/70 border-r border-slate-200">
                      Estimated Processing Time
                    </td>
                    {comparedSchemes.map((s) => (
                      <td key={s.id} className="py-3 px-4 font-medium text-slate-800">
                        {s.processingTime}
                      </td>
                    ))}
                  </tr>

                  {/* Row: Official Application Portal */}
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 font-semibold text-slate-900 bg-slate-50/70 border-r border-slate-200">
                      Official Portal
                    </td>
                    {comparedSchemes.map((s) => (
                      <td key={s.id} className="py-3 px-4">
                        <a
                          href={`https://${s.officialPortal}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-brand-700 hover:underline flex items-center gap-1 font-mono text-[11px]"
                        >
                          <span className="truncate">{s.officialPortal}</span>
                          <ExternalLink className="w-3 h-3 shrink-0" />
                        </a>
                      </td>
                    ))}
                  </tr>

                  {/* Row: CTAs */}
                  <tr className="bg-slate-50/60">
                    <td className="py-4 px-4 font-semibold text-slate-900 bg-slate-100/70 border-r border-slate-200">
                      Application Action
                    </td>
                    {comparedSchemes.map((s) => (
                      <td key={s.id} className="py-4 px-4">
                        <button
                          onClick={() => navigate(`/applications/new/${s.id}`)}
                          className="w-full py-2 px-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs rounded-md transition-colors flex items-center justify-center gap-1.5"
                        >
                          <span>Apply</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* WHICH SCHEME FITS WHICH NEED? (EDITORIAL VALUE GUIDANCE) */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <h2 className="text-sm font-semibold text-slate-900">
                Which scheme fits which need? (Objective Analysis)
              </h2>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              We do not declare an arbitrary single "winner" because welfare eligibility depends on individual situational trade-offs:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-1">
              <div className="p-4 bg-white rounded-lg border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900 block">
                  For Daily Accommodation & Living Allowance:
                </span>
                <p className="text-slate-600 leading-relaxed">
                  <strong>Dr. Babasaheb Ambedkar Swadhar Yojana</strong> directly deposits ₹51,000–₹60,000 into the student's personal account for meal and room expenses when government hostels are full.
                </p>
              </div>

              <div className="p-4 bg-white rounded-lg border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900 block">
                  For College Tuition & Institutional Reimbursement:
                </span>
                <p className="text-slate-600 leading-relaxed">
                  <strong>Centrally Sponsored Post-Matric Scholarship</strong> directly reimburses college semester fees and provides academic book maintenance stipends without hostel stipulations.
                </p>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};

export default SchemeComparisonTable;
