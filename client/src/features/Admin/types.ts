export interface AdminDistrictMetric {
  district: string;
  state: string;
  eligiblePopulation: number;
  applicationVolume: number;
  approvalRate: number;
  utilizationRate: number; // percentage
  unusedFundsCrores: number;
  awarenessGapScore: 'Low' | 'Moderate' | 'Severe';
  topMissingDocument: string;
}
