import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { UserProfile } from '../Profile/types';
import {
  Search,
  Mic,
  Sparkles,
  Filter,
  UserCheck,
  ChevronRight,
  Cpu,
  Trophy,
  ArrowRight,
} from 'lucide-react';

interface FindSchemesSearchProps {
  userProfile: UserProfile;
}

const FindSchemesSearch = ({ userProfile }: FindSchemesSearchProps) => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [aiPrompt, setAiPrompt] = useState(
    'I am a 21-year-old undergraduate student from Maharashtra with family income of ₹2.1 Lakhs. What education scholarships and hostel allowances am I eligible for?'
  );

  const [useProfileFilters, setUseProfileFilters] = useState(true);
  const [filterState, setFilterState] = useState('Maharashtra');
  const [filterOccupation, setFilterOccupation] = useState('Student');
  const [filterCategory, setFilterCategory] = useState<string>(userProfile.casteCategory);
  const [filterIncome, setFilterIncome] = useState('Under ₹2.5 Lakhs');
  const [filterBenefitType, setFilterBenefitType] = useState('All');
  const [filterArea, setFilterArea] = useState<string>(userProfile.residenceType);

  const handleAiSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (aiPrompt.trim()) {
      navigate(`/schemes/results?q=${encodeURIComponent(aiPrompt)}`);
    }
  };

  const handleStandardSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(searchQuery.trim() ? `/schemes/results?q=${encodeURIComponent(searchQuery)}` : '/schemes/results');
  };

  const applyProfileToggle = (enabled: boolean) => {
    setUseProfileFilters(enabled);
    if (enabled) {
      setFilterState('Maharashtra');
      setFilterOccupation('Student');
      setFilterCategory(userProfile.casteCategory);
      setFilterIncome('Under ₹2.5 Lakhs');
      setFilterArea(userProfile.residenceType);
    } else {
      setFilterState('All');
      setFilterOccupation('All');
      setFilterCategory('All');
      setFilterIncome('All');
      setFilterArea('All');
    }
  };

  return (
    <div className="space-y-8 pb-12 max-w-5xl mx-auto">

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold tracking-tight text-slate-900">
            Find Government Schemes & Welfare Policies
          </h1>
          <p className="text-sm text-slate-600">
            Search over 120 verified Central and Maharashtra Government welfare programs using criteria or conversational intent.
          </p>
        </div>

        <button
          onClick={() => navigate('/schemes/best')}
          className="shrink-0 px-4 py-2.5 text-xs font-semibold text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-200 rounded-lg transition-colors flex items-center gap-2"
        >
          <Trophy className="w-4 h-4" />
          <span>Skip to my single best match</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* AI SCHEME DISCOVERY CARD */}
      <div className="bg-gradient-to-br from-brand-900 via-brand-800 to-brand-950 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-sm relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>AI Natural Language Scheme Discovery</span>
          </div>

          <h2 className="text-lg sm:text-xl font-bold text-white">
            Tell us what you need
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Describe your household situation, studies, business plans, or farming requirements in your own words. Our rule engine will extract criteria and cross-reference gazette norms.
          </p>

          <form onSubmit={handleAiSearch} className="space-y-3 pt-2">
            <div className="relative">
              <textarea
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                rows={3}
                placeholder="Example: I am a 21-year-old student from Maharashtra looking for financial assistance for higher education..."
                className="w-full p-4 pr-12 text-sm bg-slate-800/90 text-white placeholder:text-slate-400 rounded-xl border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 focus:outline-none transition-colors resize-none"
              />
              <button
                type="button"
                onClick={() => navigate('/voice')}
                title="Speak your requirement"
                className="absolute right-3.5 bottom-3.5 p-2 rounded-lg bg-slate-700/80 hover:bg-amber-500 hover:text-slate-950 text-slate-300 transition-colors"
              >
                <Mic className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-slate-400">
                <span>Try prompt: </span>
                <button
                  type="button"
                  onClick={() => setAiPrompt('I am a farmer with 2 acres of land looking for solar pump and crop income assistance.')}
                  className="text-amber-400 hover:underline mr-2"
                >
                  "Farmer solar subsidy"
                </button>
                <button
                  type="button"
                  onClick={() => setAiPrompt('Female graduate wanting to start a small textile workshop in rural Pune.')}
                  className="text-amber-400 hover:underline"
                >
                  "Women enterprise credit"
                </button>
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold text-xs rounded-lg transition-colors flex items-center gap-2 shadow-xs"
              >
                <Cpu className="w-4 h-4" />
                <span>Find Relevant Schemes</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* STANDARD SEARCH & ADVANCED FILTERS */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs space-y-6">

        {/* Search Input Bar */}
        <form onSubmit={handleStandardSearch} className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search schemes by benefit, purpose, or requirement (e.g. Swadhar, PM-Kisan, Fee Reimbursement)..."
            className="w-full pl-11 pr-28 py-3 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600 transition-colors"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold rounded-md transition-colors"
          >
            Search
          </button>
        </form>

        {/* Profile Autofill Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-brand-50/60 border border-brand-100 rounded-lg text-xs">
          <div className="flex items-center gap-2.5">
            <UserCheck className="w-4 h-4 text-brand-700 shrink-0" />
            <div>
              <span className="font-semibold text-slate-900">Use My Profile</span>
              <span className="text-slate-600 block text-[11px]">
                Active profile: {userProfile.fullName} ({userProfile.age} yrs · {userProfile.district}, {userProfile.state} · {userProfile.casteCategory})
              </span>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer shrink-0">
            <input
              type="checkbox"
              checked={useProfileFilters}
              onChange={(e) => applyProfileToggle(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand-600"></div>
            <span className="ml-2 text-xs font-medium text-slate-700">
              {useProfileFilters ? 'Profile Enabled' : 'Custom Filters'}
            </span>
          </label>
        </div>

        {/* Multi-Criteria Filter Grid */}
        <div className="space-y-4 pt-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900">
              <Filter className="w-3.5 h-3.5 text-slate-500" />
              <span>Filter By Eligibility Parameters</span>
            </div>
            <button
              type="button"
              onClick={() => applyProfileToggle(false)}
              className="text-[11px] text-slate-600 hover:text-slate-900"
            >
              Reset Filters
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {/* State */}
            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">State / UT</label>
              <select
                value={filterState}
                onChange={(e) => setFilterState(e.target.value)}
                className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-md text-slate-800 focus:bg-white focus:border-brand-600"
              >
                <option value="All">All India</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Karnataka">Karnataka</option>
              </select>
            </div>

            {/* Age Range */}
            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">Age Bracket</label>
              <select
                defaultValue="18 - 25 years"
                className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-md text-slate-800 focus:bg-white focus:border-brand-600"
              >
                <option>All Ages</option>
                <option>Under 18</option>
                <option>18 - 25 years</option>
                <option>26 - 40 years</option>
                <option>41 - 60 years</option>
                <option>60+ (Senior)</option>
              </select>
            </div>

            {/* Occupation */}
            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">Occupation</label>
              <select
                value={filterOccupation}
                onChange={(e) => setFilterOccupation(e.target.value)}
                className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-md text-slate-800 focus:bg-white focus:border-brand-600"
              >
                <option value="All">All Occupations</option>
                <option value="Student">Student (Collegiate)</option>
                <option value="Farmer">Farmer / Agriculture</option>
                <option value="Artisan">Artisan / Handloom</option>
                <option value="Micro-Business">Micro-Enterprise</option>
                <option value="Unemployed">Job Seeker</option>
              </select>
            </div>

            {/* Income */}
            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">Annual Income</label>
              <select
                value={filterIncome}
                onChange={(e) => setFilterIncome(e.target.value)}
                className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-md text-slate-800 focus:bg-white focus:border-brand-600"
              >
                <option value="All">Any Income</option>
                <option value="Under ₹1 Lakh">Under ₹1 Lakh</option>
                <option value="Under ₹2.5 Lakhs">Under ₹2.5 Lakhs</option>
                <option value="Under ₹5 Lakhs">Under ₹5 Lakhs</option>
                <option value="Under ₹8 Lakhs">Under ₹8 Lakhs (EWS/OBC)</option>
              </select>
            </div>

            {/* Social Category */}
            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">Social Category</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-md text-slate-800 focus:bg-white focus:border-brand-600"
              >
                <option value="All">All Categories</option>
                <option value="OBC">OBC</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
                <option value="EWS">EWS</option>
                <option value="General">General / Open</option>
              </select>
            </div>

            {/* Benefit Type */}
            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">Benefit Type</label>
              <select
                value={filterBenefitType}
                onChange={(e) => setFilterBenefitType(e.target.value)}
                className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-md text-slate-800 focus:bg-white focus:border-brand-600"
              >
                <option value="All">All Types</option>
                <option value="Scholarship">Scholarship & Fees</option>
                <option value="DBT">Direct Cash Transfer</option>
                <option value="Subsidy">Subsidy / Grant</option>
                <option value="Loan">Credit / Loan</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={() => navigate('/schemes/results')}
              className="px-5 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-md transition-colors flex items-center gap-1.5"
            >
              <span>Apply Filters & View Results</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* HOW YOJANASETU FINDS SCHEMES */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
        <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
          <span>How YojanaSetu finds schemes</span>
          <span className="text-[10px] text-slate-600 font-normal">Transparent, deterministic & explainable</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 text-xs">
          <div className="space-y-1.5">
            <div className="w-6 h-6 rounded-full bg-brand-700 text-white font-mono font-bold flex items-center justify-center text-xs">
              1
            </div>
            <div className="font-semibold text-slate-900">Understand your requirements</div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Extracts demographic, state, education, income, and intent tokens.
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="w-6 h-6 rounded-full bg-brand-700 text-white font-mono font-bold flex items-center justify-center text-xs">
              2
            </div>
            <div className="font-semibold text-slate-900">Retrieve relevant schemes</div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Hybrid vector + keyword search over Central and State policy repositories.
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="w-6 h-6 rounded-full bg-brand-700 text-white font-mono font-bold flex items-center justify-center text-xs">
              3
            </div>
            <div className="font-semibold text-slate-900">Verify eligibility rules</div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Executes exact gazette logic against your verified profile and documents.
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="w-6 h-6 rounded-full bg-brand-700 text-white font-mono font-bold flex items-center justify-center text-xs">
              4
            </div>
            <div className="font-semibold text-slate-900">Compare benefits</div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Calculates net estimated rupee value, frequency, and application complexity.
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="w-6 h-6 rounded-full bg-brand-700 text-white font-mono font-bold flex items-center justify-center text-xs">
              5
            </div>
            <div className="font-semibold text-slate-900">Explain why each matches</div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Provides granular criterion-by-criterion justification with rule citations.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default FindSchemesSearch;
