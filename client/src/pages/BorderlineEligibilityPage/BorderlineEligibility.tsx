import { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { Scheme } from '../../features/Schemes/types';
import { fetchSchemes } from '../../features/Schemes/api';
import BorderlineEligibilityView from '../../features/Schemes/BorderlineEligibilityView';

const BorderlineEligibility = () => {
  const { userProfile } = useApp();
  const [schemes, setSchemes] = useState<Scheme[] | null>(null);

  useEffect(() => {
    fetchSchemes().then(setSchemes);
  }, []);

  if (!schemes || !userProfile) return null;

  const borderlineScheme = schemes.find((s) => s.matchStatus === 'Borderline');

  if (!borderlineScheme) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center space-y-2">
        <h1 className="text-lg font-semibold text-slate-900">No Borderline Schemes Right Now</h1>
        <p className="text-sm text-slate-600">
          None of your matched schemes are currently on the edge of an eligibility threshold. Check back after updating your profile or exploring more schemes.
        </p>
      </div>
    );
  }

  return <BorderlineEligibilityView scheme={borderlineScheme} annualIncome={userProfile.annualIncome} />;
};

export default BorderlineEligibility;
