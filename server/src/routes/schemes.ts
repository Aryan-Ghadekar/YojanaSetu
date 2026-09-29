import { Router } from 'express';
import { supabaseAdmin } from '../lib/supabaseAdmin.js';
import { optionalAuth, requireAuth } from '../middleware/auth.js';
import { computeEligibility, type ProfileRow, type SchemeRow } from '../lib/eligibility.js';

export const schemesRouter = Router();

interface SchemeDbRow {
  id: string;
  name: string;
  short_name: string;
  department: string;
  ministry: string;
  level: string;
  category: string;
  benefit_amount: string;
  benefit_type: string;
  benefit_frequency: string;
  target_audience: string;
  deadline: string | null;
  official_portal: string;
  last_verified_date: string;
  processing_time: string;
  complexity: string;
  summary: string;
  max_income_limit: number;
  min_age: number;
  max_age: number;
  eligible_genders: string[];
  eligible_states: string[];
  eligibility_criteria: SchemeRow['eligibility_criteria'];
  documents: Array<{ id: string; name: string }>;
  application_steps: string[];
}

function toCamelScheme(row: SchemeDbRow, profile: ProfileRow | null, documentCategories: Set<string>) {
  const eligibility = computeEligibility(row, profile);

  const categoryHints: Record<string, string[]> = {
    Identity: ['aadhaar', 'pan'],
    Income: ['income'],
    Education: ['marksheet', 'admission', 'bona fide', 'fee receipt', 'academic'],
    'Caste / Category': ['caste'],
    Residence: ['domicile', 'residence', 'ration'],
    Banking: ['bank'],
    'Land / Property': ['land', '7/12', 'property'],
  };

  const documents = row.documents.map((doc) => {
    const nameLower = doc.name.toLowerCase();
    const matchedCategory = Object.entries(categoryHints).find(([, hints]) =>
      hints.some((hint) => nameLower.includes(hint)),
    )?.[0];
    const isAvailable = matchedCategory ? documentCategories.has(matchedCategory) : false;
    return {
      ...doc,
      isAvailable,
      status: isAvailable ? 'verified' : 'missing',
    };
  });

  return {
    id: row.id,
    name: row.name,
    shortName: row.short_name,
    department: row.department,
    ministry: row.ministry,
    level: row.level,
    category: row.category,
    benefitAmount: row.benefit_amount,
    benefitType: row.benefit_type,
    benefitFrequency: row.benefit_frequency,
    matchScore: eligibility.matchScore,
    matchStatus: eligibility.matchStatus,
    keyReason: eligibility.keyReason,
    targetAudience: row.target_audience,
    deadline: row.deadline ?? undefined,
    officialPortal: row.official_portal,
    lastVerifiedDate: row.last_verified_date,
    processingTime: row.processing_time,
    complexity: row.complexity,
    eligibilityCriteria: eligibility.eligibilityCriteria,
    documents,
    applicationSteps: row.application_steps,
    summary: row.summary,
    maxIncomeLimit: row.max_income_limit,
    minAge: row.min_age,
    maxAge: row.max_age,
    eligibleGenders: row.eligible_genders,
    eligibleStates: row.eligible_states,
  };
}

async function loadProfileAndDocs(userId: string | undefined) {
  if (!userId) return { profile: null as ProfileRow | null, documentCategories: new Set<string>() };

  const [{ data: profile }, { data: documents }] = await Promise.all([
    supabaseAdmin
      .from('profiles')
      .select('full_name, age, gender, state, annual_income, caste_category, occupation, is_student, land_holding_acres')
      .eq('id', userId)
      .maybeSingle(),
    supabaseAdmin.from('documents').select('category').eq('user_id', userId),
  ]);

  return {
    profile: (profile as ProfileRow | null) ?? null,
    documentCategories: new Set((documents ?? []).map((d: { category: string }) => d.category)),
  };
}

schemesRouter.get('/', optionalAuth, async (req, res) => {
  const { data, error } = await supabaseAdmin.from('schemes').select('*').order('name');
  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  const { profile, documentCategories } = await loadProfileAndDocs(req.user?.id);
  const schemes = (data as SchemeDbRow[]).map((row) => toCamelScheme(row, profile, documentCategories));
  res.json(schemes);
});

const MATCH_STATUS_RANK: Record<string, number> = {
  'Strong match': 3,
  'Potential match': 2,
  Borderline: 1,
  'Not currently eligible': 0,
};

schemesRouter.get('/recommended', requireAuth, async (req, res) => {
  const limit = Math.min(Math.max(parseInt(String(req.query.limit ?? '3'), 10) || 3, 1), 10);

  const { data, error } = await supabaseAdmin.from('schemes').select('*').order('name');
  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  const { profile, documentCategories } = await loadProfileAndDocs(req.user!.id);
  if (!profile) {
    res.status(400).json({ error: 'Complete your citizen profile to get personalized scheme recommendations.' });
    return;
  }

  const ranked = (data as SchemeDbRow[])
    .map((row) => toCamelScheme(row, profile, documentCategories))
    .filter((scheme) => scheme.matchStatus !== 'Not currently eligible')
    .sort((a, b) => {
      const statusDelta = MATCH_STATUS_RANK[b.matchStatus] - MATCH_STATUS_RANK[a.matchStatus];
      if (statusDelta !== 0) return statusDelta;
      return b.matchScore - a.matchScore;
    });

  res.json(ranked.slice(0, limit));
});

schemesRouter.get('/:id', optionalAuth, async (req, res) => {
  const { data, error } = await supabaseAdmin.from('schemes').select('*').eq('id', req.params.id).maybeSingle();
  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }
  if (!data) {
    res.status(404).json({ error: 'Scheme not found' });
    return;
  }

  const { profile, documentCategories } = await loadProfileAndDocs(req.user?.id);
  res.json(toCamelScheme(data as SchemeDbRow, profile, documentCategories));
});
