import type { AdminDistrictMetric } from './types';
import { mockAdminDistricts } from './mockData';

const MOCK_LATENCY_MS = 300;
const delay = <T,>(value: T, ms = MOCK_LATENCY_MS): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms));

export const fetchAdminDistricts = (): Promise<AdminDistrictMetric[]> => delay(mockAdminDistricts);
