import { Router } from 'express';
import { supabaseAdmin } from '../lib/supabaseAdmin.js';
import { requireAuth } from '../middleware/auth.js';

export const applicationsRouter = Router();

interface TimelineStep {
  stage: string;
  date: string;
  status: 'completed' | 'current' | 'pending' | 'warning';
  note: string;
}

interface ApplicationDbRow {
  id: string;
  application_number: string;
  scheme_id: string;
  scheme_name: string;
  department: string;
  benefit_amount: string;
  submitted_date: string;
  last_updated: string;
  current_status: string;
  current_step_index: number;
  total_steps: number;
  expected_next_step: string;
  action_required_message: string | null;
  action_required_type: string | null;
  timeline: TimelineStep[];
}

function toCamelApplication(row: ApplicationDbRow) {
  return {
    id: row.id,
    applicationNumber: row.application_number,
    schemeId: row.scheme_id,
    schemeName: row.scheme_name,
    department: row.department,
    benefitAmount: row.benefit_amount,
    submittedDate: row.submitted_date,
    lastUpdated: row.last_updated,
    currentStatus: row.current_status,
    currentStepIndex: row.current_step_index,
    totalSteps: row.total_steps,
    expectedNextStep: row.expected_next_step,
    actionRequiredMessage: row.action_required_message ?? undefined,
    actionRequiredType: row.action_required_type ?? undefined,
    timeline: row.timeline,
  };
}

function formatToday() {
  return new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

applicationsRouter.get('/', requireAuth, async (req, res) => {
  const { data, error } = await supabaseAdmin
    .from('applications')
    .select('*')
    .eq('user_id', req.user!.id)
    .order('created_at', { ascending: false });

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }
  res.json((data as ApplicationDbRow[]).map(toCamelApplication));
});

applicationsRouter.post('/', requireAuth, async (req, res) => {
  const { schemeId, schemeName, department, benefitAmount, officialPortal } = req.body ?? {};
  if (!schemeId || !schemeName || !department || !benefitAmount) {
    res.status(400).json({ error: 'schemeId, schemeName, department, and benefitAmount are required' });
    return;
  }

  const today = formatToday();
  const applicationNumber = `APP-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;

  const timeline: TimelineStep[] = [
    { stage: 'Application Submitted', date: today, status: 'completed', note: `Dossier submitted via ${officialPortal ?? 'the official portal'} connector` },
    { stage: 'AI Document Verification', date: 'In Progress', status: 'current', note: 'Cross-referencing your uploaded and DigiLocker-linked documents' },
    { stage: 'Institute / Desk Approval', date: 'Scheduled', status: 'pending', note: 'Scrutiny by authorized Nodal Officer' },
    { stage: 'District Sanction', date: 'Pending', status: 'pending', note: 'Treasury payment docket preparation' },
    { stage: 'Direct Benefit Credit', date: 'Pending', status: 'pending', note: 'Bank account transfer' },
  ];

  const { data, error } = await supabaseAdmin
    .from('applications')
    .insert({
      user_id: req.user!.id,
      application_number: applicationNumber,
      scheme_id: schemeId,
      scheme_name: schemeName,
      department,
      benefit_amount: benefitAmount,
      submitted_date: today,
      last_updated: today,
      current_status: 'Submitted',
      current_step_index: 1,
      total_steps: 5,
      expected_next_step: 'Automated AI document authenticity cross-check in progress',
      timeline,
    })
    .select('*')
    .single();

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }
  res.status(201).json(toCamelApplication(data as ApplicationDbRow));
});

applicationsRouter.post('/:id/resolve', requireAuth, async (req, res) => {
  const { data: existing, error: fetchError } = await supabaseAdmin
    .from('applications')
    .select('*')
    .eq('id', req.params.id)
    .eq('user_id', req.user!.id)
    .maybeSingle();

  if (fetchError) {
    res.status(500).json({ error: fetchError.message });
    return;
  }
  if (!existing) {
    res.status(404).json({ error: 'Application not found' });
    return;
  }

  const row = existing as ApplicationDbRow;
  const timeline = row.timeline.map((step, idx) => {
    if (step.status === 'warning') {
      return { ...step, status: 'completed' as const, note: 'Replacement document uploaded & validated' };
    }
    const nextPendingIndex = row.timeline.findIndex((s) => s.status === 'pending');
    if (idx === nextPendingIndex) {
      return { ...step, status: 'current' as const, note: 'Re-evaluation underway' };
    }
    return step;
  });

  const { data, error } = await supabaseAdmin
    .from('applications')
    .update({
      current_status: 'Department Review',
      last_updated: 'Just now',
      expected_next_step: 'Resubmitted document under scrutiny by the verification desk',
      action_required_message: null,
      action_required_type: null,
      timeline,
    })
    .eq('id', row.id)
    .select('*')
    .single();

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }
  res.json(toCamelApplication(data as ApplicationDbRow));
});
