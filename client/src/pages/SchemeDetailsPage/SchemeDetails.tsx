import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import type { Scheme } from '../../features/Schemes/types';
import { fetchSchemeById, fetchSchemes } from '../../features/Schemes/api';
import SchemeDetailsView from '../../features/Schemes/SchemeDetailsView';

const SchemeDetails = () => {
  const { schemeId } = useParams();
  const { userProfile, isInComparison, addToComparison } = useApp();
  const [scheme, setScheme] = useState<Scheme | null>(null);

  useEffect(() => {
    setScheme(null);
    if (!schemeId) return;
    fetchSchemeById(schemeId).then((found) => {
      if (found) {
        setScheme(found);
      } else {
        fetchSchemes().then((all) => setScheme(all[0] ?? null));
      }
    });
  }, [schemeId]);

  if (!scheme) return null;

  return (
    <SchemeDetailsView
      scheme={scheme}
      userProfile={userProfile}
      isInComparison={isInComparison}
      addToComparison={addToComparison}
    />
  );
};

export default SchemeDetails;
