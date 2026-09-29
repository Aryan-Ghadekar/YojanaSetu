import type { AdminDistrictMetric, UtilizationAnalytics } from './types';
import { apiGet } from '../../lib/apiClient';

export const fetchAdminDistricts = (): Promise<AdminDistrictMetric[]> => apiGet<AdminDistrictMetric[]>('/api/admin/districts');

export const fetchUtilizationAnalytics = (): Promise<UtilizationAnalytics> =>
  apiGet<UtilizationAnalytics>('/api/admin/utilization');
