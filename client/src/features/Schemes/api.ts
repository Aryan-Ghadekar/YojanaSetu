import type { Scheme } from './types';
import { mockSchemes } from './mockData';

const MOCK_LATENCY_MS = 300;
const delay = <T,>(value: T, ms = MOCK_LATENCY_MS): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms));

export const fetchSchemes = (): Promise<Scheme[]> => delay(mockSchemes);

export const fetchSchemeById = (id: string): Promise<Scheme | undefined> =>
  delay(mockSchemes.find((scheme) => scheme.id === id));
