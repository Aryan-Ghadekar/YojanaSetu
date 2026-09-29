import { useEffect, useMemo, useState } from 'react';
import { Sparkles, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Textarea from '../../components/ui/Textarea';
import type { SchemeCategory } from '../Schemes/types';

const MIN_DESCRIPTION_LENGTH = 8;

const CATEGORY_KEYWORDS: { category: SchemeCategory; keywords: string[] }[] = [
  { category: 'Education & Scholarships', keywords: ['student', 'college', 'scholarship', 'fee', 'hostel', 'study', 'school', 'education', 'degree'] },
  { category: 'Agriculture & Farmers', keywords: ['farmer', 'farming', 'crop', 'land', 'irrigation', 'agriculture', 'solar pump', 'tractor'] },
  { category: 'Healthcare & Wellness', keywords: ['health', 'hospital', 'medical', 'insurance', 'illness', 'treatment', 'disability'] },
  { category: 'Housing & Shelter', keywords: ['house', 'housing', 'home', 'shelter', 'rent', 'construction'] },
  { category: 'Women & Child Development', keywords: ['women', 'girl', 'pregnant', 'child', 'maternity', 'daughter'] },
  { category: 'Skill & Employment', keywords: ['job', 'employment', 'skill', 'training', 'unemployed', 'career'] },
  { category: 'Social Welfare & Pension', keywords: ['senior', 'pension', 'elderly', 'widow', 'disability', 'welfare'] },
  { category: 'Micro & Small Business', keywords: ['business', 'shop', 'enterprise', 'loan', 'credit', 'startup', 'workshop'] },
];

const detectCategory = (text: string): { category: SchemeCategory; matchPercent: number } | null => {
  const lower = text.toLowerCase();
  let best: { category: SchemeCategory; score: number } | null = null;
  for (const entry of CATEGORY_KEYWORDS) {
    const score = entry.keywords.filter((k) => lower.includes(k)).length;
    if (score > 0 && (!best || score > best.score)) {
      best = { category: entry.category, score };
    }
  }
  if (!best) return null;
  return { category: best.category, matchPercent: Math.min(96, 62 + best.score * 12) };
};

const TryItYourself = () => {
  const navigate = useNavigate();
  const [description, setDescription] = useState('');
  const [suggestion, setSuggestion] = useState<{ description: string; category: SchemeCategory; matchPercent: number } | null>(null);

  useEffect(() => {
    if (description.trim().length < MIN_DESCRIPTION_LENGTH) return;
    const timeoutId = setTimeout(() => {
      const result = detectCategory(description);
      if (result) setSuggestion({ description, ...result });
    }, 450);
    return () => clearTimeout(timeoutId);
  }, [description]);

  const hasEnoughText = description.trim().length >= MIN_DESCRIPTION_LENGTH;
  const shownSuggestion = useMemo(
    () => (suggestion?.description === description ? suggestion : null),
    [suggestion, description],
  );
  const isThinking = hasEnoughText && !shownSuggestion;

  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
          <Sparkles size={13} />
          Try It Yourself
        </span>
        <h2 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl">
          See what you might be eligible for
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Describe your situation in your own words — no sign-up required to try it.
        </p>

        <Card className="mt-8 p-6 text-left shadow-md">
          <label className="mb-1 block text-sm font-medium text-slate-700">Tell us about yourself</label>
          <Textarea
            rows={3}
            placeholder="Example: I am a 20-year-old farmer's daughter studying engineering in Maharashtra..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="mt-3 flex min-h-[44px] items-center">
            {isThinking && (
              <p className="flex items-center gap-2 text-sm text-slate-500">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-500" />
                Matching against scheme rules...
              </p>
            )}
            {!isThinking && shownSuggestion && (
              <div className="animate-fade-in-up flex w-full items-center justify-between rounded-md border border-brand-500 bg-brand-50 px-3 py-2">
                <span className="text-sm font-medium text-brand-700">
                  Likely category: {shownSuggestion.category}
                </span>
                <span className="text-xs text-brand-600">{shownSuggestion.matchPercent}% match</span>
              </div>
            )}
            {!hasEnoughText && description.trim().length > 0 && (
              <p className="text-sm text-slate-400">Keep going, a few more words help...</p>
            )}
            {!hasEnoughText && description.trim().length === 0 && (
              <p className="text-sm text-slate-400">Start typing to see a live match...</p>
            )}
          </div>
        </Card>

        <div className="mt-6 rounded-xl border border-brand-100 bg-white p-5 text-left shadow-sm sm:flex sm:items-center sm:justify-between sm:gap-4">
          <div>
            <p className="flex items-center gap-1.5 text-sm font-semibold text-slate-900">
              <Star size={14} className="text-brand-600" />
              Get your full personalized match list
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Create a free profile to see exact eligibility, missing documents, and deadlines.
            </p>
          </div>
          <Button
            onClick={() => navigate('/schemes')}
            className="mt-4 w-full transition-transform hover:scale-[1.03] sm:mt-0 sm:w-auto sm:shrink-0"
          >
            Find My Schemes
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TryItYourself;
