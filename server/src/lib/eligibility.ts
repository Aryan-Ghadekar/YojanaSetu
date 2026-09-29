export interface ProfileRow {
  full_name: string;
  age: number;
  gender: string;
  state: string;
  annual_income: number;
  caste_category: string;
  occupation: string;
  is_student: boolean;
  land_holding_acres: number;
}

export interface SchemeRow {
  id: string;
  max_income_limit: number;
  min_age: number;
  max_age: number;
  eligible_genders: string[];
  eligible_states: string[];
  eligibility_criteria: Array<{
    id: string;
    label: string;
    requirement: string;
    ruleCode?: string;
  }>;
}

export type CriterionStatus = 'Meets' | 'Borderline' | 'Does not meet' | 'Requires Document' | 'Unknown';

export interface ComputedCriterion {
  id: string;
  label: string;
  requirement: string;
  ruleCode?: string;
  userStatus: CriterionStatus;
  explanation: string;
}

export interface EligibilityResult {
  matchScore: number;
  matchStatus: 'Strong match' | 'Potential match' | 'Borderline' | 'Not currently eligible';
  keyReason: string;
  eligibilityCriteria: ComputedCriterion[];
}

const BORDERLINE_INCOME_MARGIN = 0.1; // 10% over the limit still counts as borderline, not a hard fail

function evaluateIncome(profile: ProfileRow, scheme: SchemeRow) {
  const limit = scheme.max_income_limit;
  if (profile.annual_income <= limit) {
    return { pass: true as const, borderline: false };
  }
  if (profile.annual_income <= limit * (1 + BORDERLINE_INCOME_MARGIN)) {
    return { pass: false as const, borderline: true };
  }
  return { pass: false as const, borderline: false };
}

function evaluateAge(profile: ProfileRow, scheme: SchemeRow) {
  return profile.age >= scheme.min_age && profile.age <= scheme.max_age;
}

function evaluateGender(profile: ProfileRow, scheme: SchemeRow) {
  return scheme.eligible_genders.includes('All') || scheme.eligible_genders.includes(profile.gender);
}

function evaluateState(profile: ProfileRow, scheme: SchemeRow) {
  return scheme.eligible_states.includes('All India') || scheme.eligible_states.includes(profile.state);
}

function evaluateCriterion(
  criterion: SchemeRow['eligibility_criteria'][number],
  profile: ProfileRow,
  scheme: SchemeRow,
): ComputedCriterion {
  const text = `${criterion.label} ${criterion.ruleCode ?? ''}`.toLowerCase();

  if (text.includes('income')) {
    const { pass, borderline } = evaluateIncome(profile, scheme);
    const formatted = profile.annual_income.toLocaleString('en-IN');
    if (pass) {
      return { ...criterion, userStatus: 'Meets', explanation: `Your recorded annual income of ₹${formatted} is within the ₹${scheme.max_income_limit.toLocaleString('en-IN')} limit.` };
    }
    if (borderline) {
      return { ...criterion, userStatus: 'Borderline', explanation: `Your recorded annual income of ₹${formatted} is just above the ₹${scheme.max_income_limit.toLocaleString('en-IN')} limit — a relaxation or additional deduction proof may still qualify you.` };
    }
    return { ...criterion, userStatus: 'Does not meet', explanation: `Your recorded annual income of ₹${formatted} exceeds the ₹${scheme.max_income_limit.toLocaleString('en-IN')} limit for this scheme.` };
  }

  if (text.includes('domicile') || text.includes('state') || text.includes('resident')) {
    const pass = evaluateState(profile, scheme);
    return {
      ...criterion,
      userStatus: pass ? 'Meets' : 'Does not meet',
      explanation: pass
        ? `Your registered state (${profile.state}) satisfies this scheme's domicile requirement.`
        : `This scheme is limited to ${scheme.eligible_states.join(', ')}, which does not include your registered state (${profile.state}).`,
    };
  }

  if (text.includes('category') || text.includes('caste') || text.includes('sc/st') || text.includes('obc')) {
    const reserved = profile.caste_category !== 'General';
    return {
      ...criterion,
      userStatus: reserved ? 'Meets' : 'Unknown',
      explanation: reserved
        ? `Your registered social category (${profile.caste_category}) matches this criterion.`
        : `This criterion depends on category documentation we can't automatically confirm for a "${profile.caste_category}" profile — upload the relevant certificate for a definitive check.`,
    };
  }

  if (text.includes('student') || text.includes('academic') || text.includes('enroll')) {
    return {
      ...criterion,
      userStatus: profile.is_student ? 'Meets' : 'Unknown',
      explanation: profile.is_student
        ? 'Your profile indicates active student enrollment.'
        : 'Your profile does not indicate active student enrollment — verify against your latest enrollment document.',
    };
  }

  if (text.includes('land') || text.includes('cultivable') || text.includes('farm')) {
    const hasLand = profile.land_holding_acres > 0;
    return {
      ...criterion,
      userStatus: hasLand ? 'Meets' : 'Does not meet',
      explanation: hasLand
        ? `Your profile lists ${profile.land_holding_acres} acres of landholding.`
        : 'Your profile does not list any agricultural landholding.',
    };
  }

  return {
    ...criterion,
    userStatus: 'Requires Document',
    explanation: 'This criterion needs a supporting document upload before it can be automatically verified.',
  };
}

export function computeEligibility(scheme: SchemeRow, profile: ProfileRow | null): EligibilityResult {
  if (!profile) {
    return {
      matchScore: 0,
      matchStatus: 'Not currently eligible',
      keyReason: 'Sign in and complete your citizen profile to see a personalized eligibility assessment.',
      eligibilityCriteria: scheme.eligibility_criteria.map((c) => ({
        ...c,
        userStatus: 'Unknown',
        explanation: 'Sign in to check this criterion against your profile.',
      })),
    };
  }

  const ageOk = evaluateAge(profile, scheme);
  const genderOk = evaluateGender(profile, scheme);
  const stateOk = evaluateState(profile, scheme);
  const income = evaluateIncome(profile, scheme);

  const hardFail = !genderOk || !stateOk || (!income.pass && !income.borderline);

  let score = 0;
  score += ageOk ? 25 : 0;
  score += genderOk ? 20 : 0;
  score += stateOk ? 25 : 0;
  score += income.pass ? 30 : income.borderline ? 15 : 0;

  let matchStatus: EligibilityResult['matchStatus'];
  if (hardFail && !income.borderline) {
    matchStatus = 'Not currently eligible';
  } else if (income.borderline) {
    matchStatus = 'Borderline';
  } else if (score >= 85) {
    matchStatus = 'Strong match';
  } else if (score >= 60) {
    matchStatus = 'Potential match';
  } else {
    matchStatus = 'Not currently eligible';
  }

  const reasons: string[] = [];
  if (!ageOk) reasons.push(`age ${profile.age} is outside the ${scheme.min_age}-${scheme.max_age} range`);
  if (!genderOk) reasons.push(`this scheme isn't open to your registered gender`);
  if (!stateOk) reasons.push(`this scheme is limited to ${scheme.eligible_states.join(', ')}`);
  if (income.borderline) reasons.push(`income is slightly above the ₹${scheme.max_income_limit.toLocaleString('en-IN')} limit`);
  if (!income.pass && !income.borderline) reasons.push(`income exceeds the ₹${scheme.max_income_limit.toLocaleString('en-IN')} limit`);

  const keyReason = reasons.length
    ? `Based on your profile: ${reasons.join('; ')}.`
    : `Your age, income, gender, and state all satisfy this scheme's core eligibility rules.`;

  return {
    matchScore: score,
    matchStatus,
    keyReason,
    eligibilityCriteria: scheme.eligibility_criteria.map((c) => evaluateCriterion(c, profile, scheme)),
  };
}
