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

export interface MonthlyTrendPoint {
  month: string;
  apps: number;
  approved: number;
}

export interface RejectionReason {
  reason: string;
  count: number;
  color: string;
}

export interface FunnelStage {
  stage: string;
  count: number;
  label: string;
}

export interface UtilizationAnalytics {
  monthlyTrend: MonthlyTrendPoint[];
  rejectionReasons: RejectionReason[];
  dropOffFunnel: FunnelStage[];
}
