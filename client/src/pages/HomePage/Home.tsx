import { useEffect, useState } from 'react';
import type { Scheme } from '../../features/Schemes/types';
import type { ApplicationRecord } from '../../features/Applications/types';
import { fetchSchemes, fetchRecommendedSchemes } from '../../features/Schemes/api';
import { fetchApplications } from '../../features/Applications/api';
import HomeDashboardView from '../../features/Home/HomeDashboardView';

const Home = () => {
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [recommendedSchemes, setRecommendedSchemes] = useState<Scheme[] | null>(null);
  const [applications, setApplications] = useState<ApplicationRecord[]>([]);

  useEffect(() => {
    fetchSchemes().then(setSchemes);
    fetchApplications().then(setApplications);
    // Falls back to null (handled below) when the profile is incomplete or no scheme is currently eligible.
    fetchRecommendedSchemes(4)
      .then(setRecommendedSchemes)
      .catch(() => setRecommendedSchemes(null));
  }, []);

  const recommended = recommendedSchemes && recommendedSchemes.length > 0 ? recommendedSchemes : schemes.slice(0, 4);

  return <HomeDashboardView recommended={recommended} applications={applications} />;
};

export default Home;
