import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import type { CasteCategory, UserProfile } from './types';
import { ShieldCheck, Edit3, Save, ArrowRight } from 'lucide-react';

const ProfileForm = () => {
  const { userProfile, profileLoading, updateProfile, addNotification } = useApp();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<UserProfile | null>(userProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (userProfile && !isEditing) {
      setFormData(userProfile);
    }
  }, [userProfile, isEditing]);

  if (profileLoading || !formData || !userProfile) {
    return <div className="text-sm text-slate-500 py-12 text-center">Loading your profile...</div>;
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateProfile({
        ...formData,
        annualIncome: Number(formData.annualIncome),
        age: Number(formData.age),
        completenessPercentage: formData.digiLockerConnected ? 92 : 82,
      });
      setIsEditing(false);
      addNotification({
        type: 'success',
        title: 'Profile Updated',
        message: 'Updated attributes recalculated across all government welfare rules.',
      });
    } catch (err) {
      addNotification({
        type: 'error',
        title: 'Update Failed',
        message: err instanceof Error ? err.message : 'Could not save your profile changes.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-slate-900">
            Citizen Profile & Verified Attributes
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Deterministic data points used to automatically assess state and national scheme eligibility.
          </p>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          {isEditing ? (
            <>
              <Save className="w-3.5 h-3.5" />
              <span>Cancel Edit</span>
            </>
          ) : (
            <>
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Attributes</span>
            </>
          )}
        </button>
      </div>

      {/* Profile Overview Card with Completeness */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-brand-700 text-white flex items-center justify-center font-bold text-xl shadow-xs">
            {userProfile.fullName
              .split(/\s+/)
              .filter(Boolean)
              .slice(0, 2)
              .map((part) => part[0]!.toUpperCase())
              .join('') || '?'}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold text-slate-900">{userProfile.fullName || 'Unnamed Citizen'}</h2>
              {userProfile.aadhaarLinked && (
                <span className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold px-2 py-0.5 rounded flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>eKYC Verified</span>
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 font-mono">
              Aadhaar: {userProfile.aadhaarLinked ? 'Linked' : 'Not Linked'} · Domicile: {userProfile.state || 'Not set'}
            </p>
          </div>
        </div>

        <div className="sm:text-right space-y-1 bg-slate-50 p-3 sm:p-0 rounded-xl">
          <span className="text-xs text-slate-500 block font-medium">Profile Completeness</span>
          <div className="text-2xl font-semibold font-mono text-slate-900">
            {userProfile.completenessPercentage}%
          </div>
          <span className="text-[11px] text-slate-500 block">
            {userProfile.digiLockerConnected ? 'DigiLocker Linked & Certified' : 'DigiLocker Not Connected'}
          </span>
        </div>
      </div>

      {/* Main Attributes Form */}
      <form onSubmit={handleSave} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">
            Demographic, Economic & Categorical Parameters
          </h3>
          <span className="text-xs text-slate-500 font-mono">Status: {isEditing ? 'Editing Mode' : 'Read-Only Verified'}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">

          <div>
            <label className="block text-slate-700 font-medium mb-1">Full Legal Name</label>
            <input
              type="text"
              value={formData.fullName}
              disabled={!isEditing}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full p-2.5 bg-slate-50 disabled:bg-slate-100 border border-slate-200 rounded-lg text-slate-900 font-medium"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-1">Age (Years)</label>
            <input
              type="number"
              value={formData.age}
              disabled={!isEditing}
              onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
              className="w-full p-2.5 bg-slate-50 disabled:bg-slate-100 border border-slate-200 rounded-lg text-slate-900 font-mono"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-1">State Domicile</label>
            <input
              type="text"
              value={formData.state}
              disabled={!isEditing}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              className="w-full p-2.5 bg-slate-50 disabled:bg-slate-100 border border-slate-200 rounded-lg text-slate-900"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-1">District & Taluka</label>
            <input
              type="text"
              value={`${formData.district}, ${formData.taluka}`}
              disabled={!isEditing}
              onChange={(e) => {
                const parts = e.target.value.split(',');
                setFormData({ ...formData, district: parts[0]?.trim() || '', taluka: parts[1]?.trim() || '' });
              }}
              className="w-full p-2.5 bg-slate-50 disabled:bg-slate-100 border border-slate-200 rounded-lg text-slate-900"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-1">Annual Family Income (₹ INR)</label>
            <input
              type="number"
              value={formData.annualIncome}
              disabled={!isEditing}
              onChange={(e) => setFormData({ ...formData, annualIncome: Number(e.target.value) })}
              className="w-full p-2.5 bg-slate-50 disabled:bg-slate-100 border border-slate-200 rounded-lg text-slate-900 font-mono font-bold"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-1">Social Category</label>
            <select
              value={formData.casteCategory}
              disabled={!isEditing}
              onChange={(e) => setFormData({ ...formData, casteCategory: e.target.value as CasteCategory })}
              className="w-full p-2.5 bg-slate-50 disabled:bg-slate-100 border border-slate-200 rounded-lg text-slate-900"
            >
              <option value="General">General / Open</option>
              <option value="OBC">OBC (Other Backward Class)</option>
              <option value="SC">SC (Scheduled Caste)</option>
              <option value="ST">ST (Scheduled Tribe)</option>
              <option value="EWS">EWS (Economically Weaker Section)</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-1">Occupation & Activity</label>
            <input
              type="text"
              value={formData.occupation}
              disabled={!isEditing}
              onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
              className="w-full p-2.5 bg-slate-50 disabled:bg-slate-100 border border-slate-200 rounded-lg text-slate-900"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-1">Land Holding (Acres)</label>
            <input
              type="number"
              step="0.1"
              value={formData.landHoldingAcres}
              disabled={!isEditing}
              onChange={(e) => setFormData({ ...formData, landHoldingAcres: Number(e.target.value) })}
              className="w-full p-2.5 bg-slate-50 disabled:bg-slate-100 border border-slate-200 rounded-lg text-slate-900 font-mono"
            />
          </div>

        </div>

        {isEditing && (
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setFormData({ ...userProfile });
                setIsEditing(false);
              }}
              className="px-4 py-2 border border-slate-200 text-slate-700 rounded-md hover:bg-slate-50 text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-5 py-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-md text-xs transition-colors flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaving ? 'Saving...' : 'Save & Recalculate Schemes'}</span>
            </button>
          </div>
        )}
      </form>

      {/* Direct link to Scheme Discovery */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs">
        <span className="text-slate-600">
          Want to discover all schemes matched with this verified profile?
        </span>
        <button
          onClick={() => navigate('/schemes')}
          className="font-semibold text-brand-700 hover:text-brand-900 flex items-center gap-1"
        >
          <span>Find My Schemes Now</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};

export default ProfileForm;
