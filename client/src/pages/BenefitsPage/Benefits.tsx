import { useEffect, useState } from 'react';
import type { Scheme } from '../../features/Schemes/types';
import { fetchSchemes } from '../../features/Schemes/api';
import BenefitsDashboardView from '../../features/Benefits/BenefitsDashboardView';

const Benefits = () => {
  const [schemes, setSchemes] = useState<Scheme[]>([]);

  useEffect(() => {
    fetchSchemes().then(setSchemes);
  }, []);

  return <BenefitsDashboardView schemes={schemes} />;
};

export default Benefits;
