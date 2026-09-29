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
