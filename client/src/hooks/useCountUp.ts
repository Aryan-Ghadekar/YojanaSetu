import { useEffect, useState } from 'react';

/** Eased count-up animation from 0 to `target`, starting once `start` becomes true. */
export const useCountUp = (target: number, start: boolean, durationMs = 1200) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;

    let frameId: number;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(1, (now - startTime) / durationMs);
      const eased = 1 - (1 - progress) * (1 - progress);
      setValue(target * eased);
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [start, target, durationMs]);

  return value;
};
