import type { UserProfile } from './types';
import { apiGet, apiPut } from '../../lib/apiClient';

export const fetchProfile = (): Promise<UserProfile> => apiGet<UserProfile>('/api/profile');

export const updateProfile = (updates: Partial<UserProfile>): Promise<UserProfile> =>
  apiPut<UserProfile>('/api/profile', updates);
