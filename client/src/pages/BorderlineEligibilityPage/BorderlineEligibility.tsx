import { useEffect, useState } from 'react';
import type { Scheme } from '../../features/Schemes/types';
import { fetchSchemes } from '../../features/Schemes/api';
import BorderlineEligibilityView from '../../features/Schemes/BorderlineEligibilityView';

const BorderlineEligibility = () => {
  const [scheme, setScheme] = useState<Scheme | null>(null);

  useEffect(() => {
    fetchSchemes().then((schemes) => {
      setScheme(schemes.find((s) => s.id === 'maha-youth-stipend-borderline') ?? schemes[3] ?? schemes[0] ?? null);
    });
  }, []);

  if (!scheme) return null;

  return <BorderlineEligibilityView scheme={scheme} />;
};

export default BorderlineEligibility;
