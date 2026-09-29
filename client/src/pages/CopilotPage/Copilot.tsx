import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Scheme } from '../../features/Schemes/types';
import { fetchSchemeById, fetchSchemes } from '../../features/Schemes/api';
import CopilotChat from '../../features/Copilot/CopilotChat';

const Copilot = () => {
  const [searchParams] = useSearchParams();
  const schemeId = searchParams.get('scheme');
  const [scheme, setScheme] = useState<Scheme | null>(null);

  useEffect(() => {
    if (schemeId) {
      fetchSchemeById(schemeId).then((found) => {
        if (found) {
          setScheme(found);
        } else {
          fetchSchemes().then((all) => setScheme(all[0] ?? null));
        }
      });
    } else {
      fetchSchemes().then((all) => setScheme(all[0] ?? null));
    }
  }, [schemeId]);

  if (!scheme) return null;

  return <CopilotChat scheme={scheme} />;
};

export default Copilot;
