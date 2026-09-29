import type { Scheme } from './types';

export interface SchemeScoreBreakdown {
  schemeId: string;
  eligibilityScore: number; // 0-100, from the eligibility engine's matchScore
  easeScore: number; // 0-100, blends application complexity with document readiness
  benefitValue: number | null; // largest rupee figure found in benefitAmount, or null if unparseable
  isRepayable: boolean; // true for Credit / Loan Support schemes (not "free" money)
  compositeScore: number; // 0-100 weighted "most beneficial" score
}

const COMPLEXITY_EASE: Record<Scheme['complexity'], number> = { Low: 100, Medium: 60, High: 25 };

/** Extracts the largest rupee figure from a benefit string like "₹51,000 - ₹60,000" or "Up to ₹50,000/year". */
function parseMaxRupeeValue(benefitAmount: string): number | null {
  const matches = [...benefitAmount.matchAll(/₹\s?([\d,]+(?:\.\d+)?)/g)].map((m) => Number(m[1].replace(/,/g, '')));
  if (matches.length === 0) return null;
  return Math.max(...matches);
}

/**
 * Scores each scheme in a comparison set on a shared 0-100 "most beneficial" scale.
 * Eligibility fit and ease of obtaining the benefit carry the most weight, since a
 * large-sounding number a citizen doesn't actually qualify for isn't beneficial.
 * Loan/credit amounts are discounted relative to grants and direct transfers because
 * they must be repaid, not kept.
 */
export function scoreSchemesForComparison(schemes: Scheme[]): SchemeScoreBreakdown[] {
  const benefitValues = schemes.map((s) => parseMaxRupeeValue(s.benefitAmount));
  const maxBenefit = Math.max(0, ...benefitValues.filter((v): v is number => v !== null));

  return schemes.map((scheme, i) => {
    const eligibilityScore = scheme.matchScore;

    const docReadiness = scheme.documents.length
      ? (scheme.documents.filter((d) => d.isAvailable).length / scheme.documents.length) * 100
      : 0;
    const easeScore = Math.round(COMPLEXITY_EASE[scheme.complexity] * 0.7 + docReadiness * 0.3);

    const benefitValue = benefitValues[i];
    const isRepayable = scheme.benefitType === 'Credit / Loan Support';
    const normalizedBenefit = maxBenefit > 0 && benefitValue !== null ? (benefitValue / maxBenefit) * 100 : 0;
    const benefitScore = isRepayable ? normalizedBenefit * 0.4 : normalizedBenefit;

    const compositeScore = Math.round(eligibilityScore * 0.45 + easeScore * 0.25 + benefitScore * 0.3);

    return { schemeId: scheme.id, eligibilityScore, easeScore, benefitValue, isRepayable, compositeScore };
  });
}

/** The single most beneficial scheme in the set, or null if there's nothing to rank. */
export function pickMostBeneficial(schemes: Scheme[]): { scheme: Scheme; breakdown: SchemeScoreBreakdown } | null {
  if (schemes.length === 0) return null;
  const scores = scoreSchemesForComparison(schemes);
  const best = scores.reduce((top, current) => (current.compositeScore > top.compositeScore ? current : top));
  const scheme = schemes.find((s) => s.id === best.schemeId)!;
  return { scheme, breakdown: best };
}
