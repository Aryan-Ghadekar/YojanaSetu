import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import type { AdminDistrictMetric } from './types';
import { MapPin, AlertTriangle, Megaphone, Send, X } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from 'recharts';

interface DistrictAnalyticsProps {
  districts: AdminDistrictMetric[];
}

const DistrictAnalytics = ({ districts }: DistrictAnalyticsProps) => {
  const { addNotification } = useApp();
  const navigate = useNavigate();

  const [selectedDistrict, setSelectedDistrict] = useState<AdminDistrictMetric>(
    districts.find((d) => d.awarenessGapScore === 'Severe') ?? districts[0],
  );
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [campaignData, setCampaignData] = useState({
    region: 'Gadchiroli',
    scheme: 'Dr. Babasaheb Ambedkar Swadhar Yojana',
    demographic: 'Tribal & Rural SC/ST Collegiate Students',
    language: 'Marathi & Gondi',
    channel: 'IVR Voice Broadcast & Village CSC Centers',
    budgetCrores: '2.5',
  });

  const handleLaunchCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    setShowCampaignModal(false);
    addNotification({
      type: 'success',
      title: 'Civic Awareness Campaign Launched',
      message: `Automated campaign dispatched to 42,000 households in ${campaignData.region} via ${campaignData.channel}.`,
    });
  };

  return (
    <div className="space-y-8 pb-12 max-w-6xl mx-auto">

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-purple-100 text-purple-800 font-mono text-xs font-bold">
              OFFICER LEVEL CONSOLE
            </span>
            <span className="text-slate-400">·</span>
            <span className="text-xs font-mono text-slate-500">Ministry of Social Justice & Agriculture</span>
          </div>
          <h1 className="text-xl font-semibold tracking-tight text-slate-900 mt-1">
            Geographic Welfare Analytics & Utilization Command
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Identify district-level eligibility-to-application conversion gaps, track unused budgetary allocations, and deploy awareness campaigns.
          </p>
        </div>

        <button
          onClick={() => navigate('/admin/scheme-utilization')}
          className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          <span>View Deep Funnel Analytics →</span>
        </button>
      </div>

      {/* DASHBOARD TOP KPI METRICS (6 CARDS) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
          <span className="text-[11px] text-slate-500 block">Total Beneficiaries</span>
          <span className="text-xl font-semibold font-mono text-slate-900 mt-1 block">14.2M</span>
          <span className="text-[10px] text-emerald-700 font-medium">+8.4% YoY</span>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
          <span className="text-[11px] text-slate-500 block">Applications Filed</span>
          <span className="text-xl font-semibold font-mono text-slate-900 mt-1 block">8.4M</span>
          <span className="text-[10px] text-slate-500">MahaDBT + NSP</span>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
          <span className="text-[11px] text-slate-500 block">Approved Dossiers</span>
          <span className="text-xl font-semibold font-mono text-emerald-900 mt-1 block">7.1M</span>
          <span className="text-[10px] text-emerald-700 font-medium">84.5% Approval Rate</span>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
          <span className="text-[11px] text-slate-500 block">Pending Scrutiny</span>
          <span className="text-xl font-semibold font-mono text-amber-900 mt-1 block">1.3M</span>
          <span className="text-[10px] text-amber-700 font-medium">Avg SLA 18 Days</span>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
          <span className="text-[11px] text-slate-500 block">Benefits Disbursed</span>
          <span className="text-xl font-semibold font-mono text-slate-900 mt-1 block">₹4,280 Cr</span>
          <span className="text-[10px] text-slate-500">Direct PFMS Transfer</span>
        </div>

        <div className="p-4 bg-purple-50/70 border border-purple-200 rounded-xl shadow-xs">
          <span className="text-[11px] text-purple-900 font-semibold block">Scheme Utilization</span>
          <span className="text-xl font-semibold font-mono text-purple-950 mt-1 block">74.2%</span>
          <span className="text-[10px] text-purple-700 font-medium">Target: 85% by Q4</span>
        </div>
      </div>

      {/* GEOGRAPHIC HEATMAP & DISTRICT DRILL-DOWN */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* Left: District Choropleth / Comparison Bar Chart (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-purple-700" />
                <span>Maharashtra District Utilization & Awareness Heat</span>
              </h2>
              <p className="text-[11px] text-slate-500">
                Click a district to inspect localized drop-off and unspent welfare funds
              </p>
            </div>
            <span className="text-[11px] font-mono text-slate-500">7 Pilot Districts</span>
          </div>

          {/* Recharts Bar of District Utilization */}
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={districts} margin={{ left: -10, right: 10, top: 10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="district" tick={{ fontSize: 11 }} interval={0} angle={-15} textAnchor="end" />
                <YAxis unit="%" tick={{ fontSize: 11 }} domain={[0, 100]} />
                <Tooltip
                  formatter={(val: any) => [`${val}%`, 'Utilization Rate']}
                  contentStyle={{ backgroundColor: '#0F172A', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
                />
                <Bar dataKey="utilizationRate" radius={[4, 4, 0, 0]}>
                  {districts.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.utilizationRate < 50 ? '#EF4444' : entry.utilizationRate < 70 ? '#F59E0B' : '#10B981'}
                      cursor="pointer"
                      onClick={() => setSelectedDistrict(entry)}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-center gap-4 text-[11px] pt-1 border-t border-slate-100">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>Nominal Utilization (&gt;70%)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span>Moderate Gap (50% - 70%)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span>Severe Awareness Gap (&lt;50%)</span>
            </span>
          </div>
        </div>

        {/* Right: Selected District Scrutiny Dossier (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-500">District Audit</span>
              <h3 className="text-sm font-semibold text-slate-900">{selectedDistrict.district} District</h3>
            </div>
            <span className={`text-xs font-bold px-2 py-0.5 rounded ${
              selectedDistrict.awarenessGapScore === 'Severe' ? 'bg-rose-100 text-rose-800' :
              selectedDistrict.awarenessGapScore === 'Moderate' ? 'bg-amber-100 text-amber-800' :
              'bg-emerald-100 text-emerald-800'
            }`}>
              {selectedDistrict.awarenessGapScore} Gap
            </span>
          </div>

          {/* District Metric Stats */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-lg">
              <span className="text-[11px] text-slate-500 block">Eligible Citizens</span>
              <span className="font-bold text-slate-900 font-mono text-sm block mt-0.5">
                {(selectedDistrict.eligiblePopulation / 100000).toFixed(1)} Lakhs
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg">
              <span className="text-[11px] text-slate-500 block">Actual Applications</span>
              <span className="font-bold text-slate-900 font-mono text-sm block mt-0.5">
                {(selectedDistrict.applicationVolume / 100000).toFixed(1)} Lakhs
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg">
              <span className="text-[11px] text-slate-500 block">Unused Benefit Funds</span>
              <span className="font-bold text-rose-800 font-mono text-sm block mt-0.5">
                ₹{selectedDistrict.unusedFundsCrores} Crores
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg">
              <span className="text-[11px] text-slate-500 block">Top Rejection Bottleneck</span>
              <span className="font-semibold text-slate-800 text-[11px] block mt-0.5 truncate" title={selectedDistrict.topMissingDocument}>
                {selectedDistrict.topMissingDocument}
              </span>
            </div>
          </div>

          {/* Region Action Callout */}
          {selectedDistrict.awarenessGapScore === 'Severe' && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs space-y-1.5 text-rose-900">
              <div className="flex items-center gap-1.5 font-bold">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>Severe Gap Detected in {selectedDistrict.district}</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Over {(selectedDistrict.eligiblePopulation - selectedDistrict.applicationVolume).toLocaleString()} eligible citizens have not applied due to missing {selectedDistrict.topMissingDocument} documents and rural internet constraints.
              </p>
            </div>
          )}

          {/* Launch Campaign CTA */}
          <button
            onClick={() => {
              setCampaignData((prev) => ({ ...prev, region: selectedDistrict.district }));
              setShowCampaignModal(true);
            }}
            className="w-full py-2.5 bg-purple-700 hover:bg-purple-800 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs"
          >
            <Megaphone className="w-4 h-4" />
            <span>Create Targeted Awareness Campaign for {selectedDistrict.district}</span>
          </button>
        </div>

      </div>

      {/* AWARENESS CAMPAIGNS ROSTER */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              Active Targeted Awareness Campaigns
            </h2>
            <p className="text-xs text-slate-500">
              High-impact outreach dispatched to rural gram panchayats, colleges, and mobile devices
            </p>
          </div>
          <button
            onClick={() => setShowCampaignModal(true)}
            className="px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold rounded-md transition-colors"
          >
            + New Campaign
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900">Gadchiroli Tribal Student Drive</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-1.5 py-0.2 rounded">Live</span>
            </div>
            <p className="text-slate-600 text-[11px]">
              Distributing Swadhar non-allotment templates via CSC kiosks and SMS in Gondi & Marathi.
            </p>
            <div className="pt-2 border-t border-slate-200 flex justify-between text-[11px] text-slate-500 font-mono">
              <span>Reach: 38,400</span>
              <span>Conv: 24.2%</span>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900">Nandurbar PM-Kisan eKYC Van</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-1.5 py-0.2 rounded">Live</span>
            </div>
            <p className="text-slate-600 text-[11px]">
              Biometric mobile vans resolving Aadhaar-land linkage at weekly village haats.
            </p>
            <div className="pt-2 border-t border-slate-200 flex justify-between text-[11px] text-slate-500 font-mono">
              <span>Reach: 52,100</span>
              <span>Conv: 38.6%</span>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900">Dharashiv Solar Rooftop Callouts</span>
              <span className="text-[10px] bg-purple-100 text-purple-800 font-semibold px-1.5 py-0.2 rounded">Scheduled</span>
            </div>
            <p className="text-slate-600 text-[11px]">
              Automated IVR calls informing residential meter holders of ₹78,000 direct subsidy.
            </p>
            <div className="pt-2 border-t border-slate-200 flex justify-between text-[11px] text-slate-500 font-mono">
              <span>Budget: ₹1.2 Cr</span>
              <span>Launch: Oct 1</span>
            </div>
          </div>
        </div>
      </div>

      {/* CREATE AWARENESS CAMPAIGN MODAL */}
      {showCampaignModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-purple-900 font-bold text-sm">
                <Megaphone className="w-4 h-4 text-purple-700" />
                <span>Create Targeted Citizen Awareness Campaign</span>
              </div>
              <button
                onClick={() => setShowCampaignModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleLaunchCampaign} className="space-y-3">
              <div>
                <label className="block text-slate-700 font-medium mb-1">Target Geographic District</label>
                <input
                  type="text"
                  value={campaignData.region}
                  onChange={(e) => setCampaignData({ ...campaignData, region: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Welfare Policy / Scheme</label>
                <select
                  value={campaignData.scheme}
                  onChange={(e) => setCampaignData({ ...campaignData, scheme: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                >
                  <option>Dr. Babasaheb Ambedkar Swadhar Yojana</option>
                  <option>Centrally Sponsored Post-Matric Scholarship</option>
                  <option>PM Kisan Samman Nidhi</option>
                  <option>PM Surya Ghar Rooftop Solar</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Target Demographic</label>
                <input
                  type="text"
                  value={campaignData.demographic}
                  onChange={(e) => setCampaignData({ ...campaignData, demographic: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Language</label>
                  <select
                    value={campaignData.language}
                    onChange={(e) => setCampaignData({ ...campaignData, language: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                  >
                    <option>Marathi & Hindi</option>
                    <option>Marathi & Gondi</option>
                    <option>Tamil & English</option>
                    <option>Telugu</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">Outreach Channel</label>
                  <select
                    value={campaignData.channel}
                    onChange={(e) => setCampaignData({ ...campaignData, channel: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                  >
                    <option>IVR Voice Broadcast & Village CSC Centers</option>
                    <option>WhatsApp Official Bot & SMS</option>
                    <option>District Collectorate Mobile Van</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCampaignModal(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 rounded-md hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-purple-700 hover:bg-purple-800 text-white font-semibold rounded-md flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Launch Campaign</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default DistrictAnalytics;
