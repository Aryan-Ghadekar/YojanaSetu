import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import type { Scheme } from '../../features/Schemes/types';
import { fetchSchemes } from '../../features/Schemes/api';
import SchemeResultsList from '../../features/Schemes/SchemeResultsList';

const SchemeResults = () => {
  const { isInComparison, addToComparison } = useApp();
  const [searchParams] = useSearchParams();
  const [schemes, setSchemes] = useState<Scheme[]>([]);

  useEffect(() => {
    fetchSchemes().then(setSchemes);
  }, []);

  return (
    <SchemeResultsList
      schemes={schemes}
      searchQuery={searchParams.get('q') ?? ''}
      isInComparison={isInComparison}
      addToComparison={addToComparison}
    />
  );
};

export default SchemeResults;
