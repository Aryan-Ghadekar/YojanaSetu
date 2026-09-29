import React from 'react';
import logoImage from '../../assets/logo.png';
import logoCompact from '../../assets/logo-compact.png';
import logoMark from '../../assets/logo-mark.png';

type LogoVariant = 'full' | 'compact' | 'mark';

interface LogoProps {
  height?: number;
  className?: string;
  /** @deprecated use variant="mark" instead */
  markOnly?: boolean;
  /**
   * 'full' = icon + wordmark + tagline (largest lockup)
   * 'compact' = icon + wordmark, no tagline (default — matches header usage)
   * 'mark' = icon only (tight spaces: mobile bar, favicon-adjacent slots)
   */
  variant?: LogoVariant;
}

const sources: Record<LogoVariant, string> = {
  full: logoImage,
  compact: logoCompact,
  mark: logoMark,
};

/** The official YojanaSetu wordmark. */
const Logo = ({ height = 40, className = '', markOnly = false, variant }: LogoProps) => {
  const resolvedVariant: LogoVariant = variant ?? (markOnly ? 'mark' : 'compact');

  return (
    <img
      src={sources[resolvedVariant]}
      alt="YojanaSetu"
      style={{ height }}
      className={`w-auto select-none ${className}`}
      draggable={false}
    />
  );
};

export default Logo;
