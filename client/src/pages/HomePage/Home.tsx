import { useEffect, useState } from 'react';
import type { Scheme } from '../../features/Schemes/types';
import type { ApplicationRecord } from '../../features/Applications/types';
import { fetchSchemes } from '../../features/Schemes/api';
import { fetchApplications } from '../../features/Applications/api';
import HomeDashboardView from '../../features/Home/HomeDashboardView';

const Home = () => {
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [applications, setApplications] = useState<ApplicationRecord[]>([]);

  useEffect(() => {
    fetchSchemes().then(setSchemes);
    fetchApplications().then(setApplications);
  }, []);

  return <HomeDashboardView schemes={schemes} applications={applications} />;
};

export default Home;
