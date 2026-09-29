import { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { Scheme } from '../../features/Schemes/types';
import { fetchSchemes } from '../../features/Schemes/api';
import SchemeComparisonTable from '../../features/Schemes/SchemeComparisonTable';

const SchemeComparison = () => {
  const { comparisonSchemeIds, addToComparison, removeFromComparison } = useApp();
  const [schemes, setSchemes] = useState<Scheme[]>([]);

  useEffect(() => {
    fetchSchemes().then(setSchemes);
  }, []);

  return (
    <SchemeComparisonTable
      schemes={schemes}
      comparisonSchemeIds={comparisonSchemeIds}
      addToComparison={addToComparison}
      removeFromComparison={removeFromComparison}
    />
  );
};

export default SchemeComparison;
