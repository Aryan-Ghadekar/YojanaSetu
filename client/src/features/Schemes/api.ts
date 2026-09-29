import type { Scheme } from './types';
import { apiGet } from '../../lib/apiClient';

export const fetchSchemes = (): Promise<Scheme[]> => apiGet<Scheme[]>('/api/schemes');

export const fetchSchemeById = async (id: string): Promise<Scheme | undefined> => {
  try {
    return await apiGet<Scheme>(`/api/schemes/${id}`);
  } catch {
    return undefined;
  }
};

/** Top eligible schemes for the signed-in user, ranked by match status then match score. */
export const fetchRecommendedSchemes = (limit = 3): Promise<Scheme[]> =>
  apiGet<Scheme[]>(`/api/schemes/recommended?limit=${limit}`);
