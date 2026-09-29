import { useEffect, useState } from 'react';
import type { Scheme } from '../Schemes/types';
import { fetchSchemes } from '../Schemes/api';
import { SchemeCardBackdrop } from './SchemeMatchCard';
import SchemeMatchCard from './SchemeMatchCard';

/**
 * A deck of matched-scheme cards: one upright card in front, the next two
 * peeking out behind it at an angle. Dismissing the front card rotates the deck.
 */
const HeroVisual = () => {
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    fetchSchemes().then(setSchemes);
  }, []);

  const total = schemes.length;
  if (total === 0) return null;

  const front = schemes[activeIndex % total];
  const back1 = schemes[(activeIndex + 1) % total];
  const back2 = schemes[(activeIndex + 2) % total];

  const handleDismiss = () => setActiveIndex((current) => (current + 1) % total);

  return (
    <div className="relative isolate w-full max-w-sm">
      <SchemeCardBackdrop
        scheme={back1}
        className="absolute inset-0 -z-10 translate-x-3 translate-y-4 rotate-[7deg]"
      />
      <SchemeCardBackdrop
        scheme={back2}
        className="absolute inset-0 -z-10 -translate-x-2 -translate-y-4 rotate-[-6deg]"
      />
      <SchemeMatchCard key={front.id} scheme={front} className="w-full" onDismiss={handleDismiss} />
    </div>
  );
};

export default HeroVisual;
