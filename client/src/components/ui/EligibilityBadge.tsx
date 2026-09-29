import type { MatchStatus } from '../../features/Schemes/types';
import { CheckCircle2, AlertTriangle, HelpCircle, XCircle } from 'lucide-react';

interface EligibilityBadgeProps {
  status: MatchStatus;
  score?: number;
  compact?: boolean;
}

const EligibilityBadge = ({ status, score, compact = false }: EligibilityBadgeProps) => {
  switch (status) {
    case 'Strong match':
      return (
        <span className={`inline-flex items-center gap-1.5 font-medium text-emerald-800 ${compact ? 'text-xs' : 'text-sm'}`}>
          <CheckCircle2 className={`${compact ? 'w-3.5 h-3.5' : 'w-4 h-4'} text-emerald-600 shrink-0`} />
          <span>Strong match</span>
          {score && <span className="text-emerald-700/70 font-mono text-xs">({score}%)</span>}
        </span>
      );
    case 'Potential match':
      return (
        <span className={`inline-flex items-center gap-1.5 font-medium text-sky-800 ${compact ? 'text-xs' : 'text-sm'}`}>
          <HelpCircle className={`${compact ? 'w-3.5 h-3.5' : 'w-4 h-4'} text-sky-600 shrink-0`} />
          <span>Potential match</span>
          {score && <span className="text-sky-700/70 font-mono text-xs">({score}%)</span>}
        </span>
      );
    case 'Borderline':
      return (
        <span className={`inline-flex items-center gap-1.5 font-medium text-amber-800 ${compact ? 'text-xs' : 'text-sm'}`}>
          <AlertTriangle className={`${compact ? 'w-3.5 h-3.5' : 'w-4 h-4'} text-amber-600 shrink-0`} />
          <span>Borderline eligibility</span>
          {score && <span className="text-amber-700/70 font-mono text-xs">({score}%)</span>}
        </span>
      );
    case 'Not currently eligible':
    default:
      return (
        <span className={`inline-flex items-center gap-1.5 font-medium text-rose-800 ${compact ? 'text-xs' : 'text-sm'}`}>
          <XCircle className={`${compact ? 'w-3.5 h-3.5' : 'w-4 h-4'} text-rose-600 shrink-0`} />
          <span>Not currently eligible</span>
        </span>
      );
  }
};

export default EligibilityBadge;
