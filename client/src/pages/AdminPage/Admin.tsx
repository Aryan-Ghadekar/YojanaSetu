import { useEffect, useState } from 'react';
import type { AdminDistrictMetric } from '../../features/Admin/types';
import { fetchAdminDistricts } from '../../features/Admin/api';
import DistrictAnalytics from '../../features/Admin/DistrictAnalytics';

const Admin = () => {
  const [districts, setDistricts] = useState<AdminDistrictMetric[]>([]);

  useEffect(() => {
    fetchAdminDistricts().then(setDistricts);
  }, []);

  if (districts.length === 0) return null;

  return <DistrictAnalytics districts={districts} />;
};

export default Admin;
