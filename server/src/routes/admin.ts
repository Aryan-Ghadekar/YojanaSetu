import { Router } from 'express';
import { supabaseAdmin } from '../lib/supabaseAdmin.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

export const adminRouter = Router();

interface DistrictDbRow {
  district: string;
  state: string;
  eligible_population: number;
  application_volume: number;
  approval_rate: number;
  utilization_rate: number;
  unused_funds_crores: number;
  awareness_gap_score: string;
  top_missing_document: string;
}

function toCamelDistrict(row: DistrictDbRow) {
  return {
    district: row.district,
    state: row.state,
    eligiblePopulation: row.eligible_population,
    applicationVolume: row.application_volume,
    approvalRate: row.approval_rate,
    utilizationRate: row.utilization_rate,
    unusedFundsCrores: row.unused_funds_crores,
    awarenessGapScore: row.awareness_gap_score,
    topMissingDocument: row.top_missing_document,
  };
}

adminRouter.get('/districts', requireAuth, requireAdmin, async (_req, res) => {
  const { data, error } = await supabaseAdmin.from('admin_district_metrics').select('*').order('district');
  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }
  res.json((data as DistrictDbRow[]).map(toCamelDistrict));
});

interface MonthlyTrendRow {
  month: string;
  applications: number;
  approved: number;
}

interface RejectionReasonRow {
  reason: string;
  percentage: number;
  color: string;
}

interface FunnelStageRow {
  stage: string;
  percentage: number;
  volume_label: string;
}

adminRouter.get('/utilization', requireAuth, requireAdmin, async (_req, res) => {
  const [trendRes, reasonsRes, funnelRes] = await Promise.all([
    supabaseAdmin.from('admin_monthly_trends').select('month, applications, approved').order('sort_order'),
    supabaseAdmin.from('admin_rejection_reasons').select('reason, percentage, color').order('sort_order'),
    supabaseAdmin.from('admin_funnel_stages').select('stage, percentage, volume_label').order('sort_order'),
  ]);

  const error = trendRes.error || reasonsRes.error || funnelRes.error;
  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.json({
    monthlyTrend: (trendRes.data as MonthlyTrendRow[]).map((r) => ({ month: r.month, apps: r.applications, approved: r.approved })),
    rejectionReasons: (reasonsRes.data as RejectionReasonRow[]).map((r) => ({ reason: r.reason, count: r.percentage, color: r.color })),
    dropOffFunnel: (funnelRes.data as FunnelStageRow[]).map((r) => ({
      stage: r.stage,
      count: r.percentage,
      label: `${r.percentage}% (${r.volume_label})`,
    })),
  });
});
