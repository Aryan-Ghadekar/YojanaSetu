import { useCountUp } from '../../hooks/useCountUp';
import { useInView } from '../../hooks/useInView';

interface AnimatedStatProps {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  valueClassName?: string;
}

const AnimatedStat = ({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  label,
  valueClassName = 'text-slate-900',
}: AnimatedStatProps) => {
  const { ref, isInView } = useInView<HTMLDivElement>();
  const animated = useCountUp(value, isInView);

  return (
    <div ref={ref}>
      <p className={`text-2xl font-bold tabular-nums ${valueClassName}`}>
        {prefix}
        {animated.toLocaleString(undefined, {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })}
        {suffix}
      </p>
      <p className="text-xs text-slate-500">{label}</p>
    </div>
  );
};

export default AnimatedStat;
