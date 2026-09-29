import { useState } from 'react';
import {
  CheckCircle2,
  X,
  GraduationCap,
  Sprout,
  HeartPulse,
  Home,
  Baby,
  Briefcase,
  HandHeart,
  Store,
  LucideIcon,
} from 'lucide-react';
import type { Scheme, SchemeCategory } from '../Schemes/types';

const CATEGORY_ICON: Record<SchemeCategory, LucideIcon> = {
  'Education & Scholarships': GraduationCap,
  'Agriculture & Farmers': Sprout,
  'Healthcare & Wellness': HeartPulse,
  'Housing & Shelter': Home,
  'Women & Child Development': Baby,
  'Skill & Employment': Briefcase,
  'Social Welfare & Pension': HandHeart,
  'Micro & Small Business': Store,
};

// Shown underneath the photo, so a card never looks broken if a photo fails to load.
const CATEGORY_GRADIENT: Record<SchemeCategory, string> = {
  'Education & Scholarships': 'from-blue-700 via-blue-800 to-brand-950',
  'Agriculture & Farmers': 'from-accent-600 via-accent-800 to-brand-950',
  'Healthcare & Wellness': 'from-rose-600 via-rose-800 to-brand-950',
  'Housing & Shelter': 'from-amber-600 via-amber-800 to-brand-950',
  'Women & Child Development': 'from-fuchsia-600 via-fuchsia-800 to-brand-950',
  'Skill & Employment': 'from-cyan-600 via-cyan-800 to-brand-950',
  'Social Welfare & Pension': 'from-violet-600 via-violet-800 to-brand-950',
  'Micro & Small Business': 'from-orange-600 via-orange-800 to-brand-950',
};

// Category photography (Unsplash CDN), picked from live search results.
const CATEGORY_PHOTO: Record<SchemeCategory, { src: string; alt: string }> = {
  'Education & Scholarships': {
    src: 'https://images.unsplash.com/photo-1567168539593-59673ababaae?w=600&h=750&fit=crop&q=80',
    alt: 'A student reading in a library',
  },
  'Agriculture & Farmers': {
    src: 'https://images.unsplash.com/photo-1528693404014-b13ebe6e723e?w=600&h=750&fit=crop&q=80',
    alt: 'A farmer standing in a rice field',
  },
  'Healthcare & Wellness': {
    src: 'https://images.unsplash.com/photo-1631815590058-860e4f83c1e8?w=600&h=750&fit=crop&q=80',
    alt: "A health worker checking a patient's blood pressure",
  },
  'Housing & Shelter': {
    src: 'https://images.unsplash.com/photo-1544714907-7b704cb5fe0e?w=600&h=750&fit=crop&q=80',
    alt: 'A simple rural home',
  },
  'Women & Child Development': {
    src: 'https://images.unsplash.com/photo-1777103329009-62d4c667d70b?w=600&h=750&fit=crop&q=80',
    alt: 'A mother holding her child',
  },
  'Skill & Employment': {
    src: 'https://images.unsplash.com/photo-1528953030358-b0c7de371f1f?w=600&h=750&fit=crop&q=80',
    alt: 'Hands-on vocational training',
  },
  'Social Welfare & Pension': {
    src: 'https://images.unsplash.com/photo-1774437776063-004e4444c063?w=600&h=750&fit=crop&q=80',
    alt: 'An elderly woman in a sari',
  },
  'Micro & Small Business': {
    src: 'https://images.unsplash.com/photo-1774978240262-c861470bd8f9?w=600&h=750&fit=crop&q=80',
    alt: 'Two people talking outside a small shop',
  },
};

const unsplash = (id: string) => `https://images.unsplash.com/${id}?w=600&h=750&fit=crop&q=80`;

// A photo picked for each specific scheme, so no two cards in the deck repeat.
// Schemes not listed here fall back to their category photo above.
const SCHEME_PHOTO: Record<string, { src: string; alt: string }> = {
  'maha-swadhar-2026': {
    src: unsplash('photo-1571260899304-425eee4c7efc'),
    alt: 'A college student carrying her textbooks',
  },
  'post-matric-scholarship-2026': {
    src: unsplash('photo-1573894998033-c0cef4ed722b'),
    alt: 'Girls studying in a classroom',
  },
  'pm-kisan-samman-2026': {
    src: unsplash('photo-1620901433789-1d2f85a93653'),
    alt: 'A farmer ploughing his field with two oxen',
  },
  'maha-youth-stipend-borderline': {
    src: unsplash('photo-1773212902287-94f6df597e6d'),
    alt: 'Young people in traditional Indian attire holding their certificates',
  },
  'pm-surya-ghar-2026': {
    src: unsplash('photo-1786515284601-f9ac47d0758a'),
    alt: 'Solar panels on a home rooftop',
  },
  'pm-mudra-yojana-2026': {
    src: unsplash('photo-1785216346524-38260d16f87f'),
    alt: 'A shopkeeper standing in his shop',
  },
};

const photoFor = (scheme: Scheme) => SCHEME_PHOTO[scheme.id] ?? CATEGORY_PHOTO[scheme.category];

const gradientFor = (category: SchemeCategory) =>
  CATEGORY_GRADIENT[category] ?? 'from-brand-800 to-brand-950';

/** Plain photo used for the cards peeking out behind the front card in the hero deck. */
export const SchemeCardBackdrop = ({
  scheme,
  className = '',
}: {
  scheme: Scheme;
  className?: string;
}) => {
  const photo = photoFor(scheme);
  return (
    <div
      aria-hidden="true"
      className={`aspect-[4/5] w-full overflow-hidden rounded-xl bg-gradient-to-br shadow-lg ring-1 ring-black/5 ${gradientFor(scheme.category)} ${className}`}
    >
      {photo && (
        <img
          src={photo.src}
          alt=""
          className="h-full w-full object-cover"
          draggable={false}
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      )}
    </div>
  );
};

interface SchemeMatchCardProps {
  scheme: Scheme;
  className?: string;
  onDismiss?: () => void;
}

/** Front card of the hero deck: photo, status pill, dismiss button, two-line caption. */
const SchemeMatchCard = ({ scheme, className = '', onDismiss }: SchemeMatchCardProps) => {
  const [photoFailed, setPhotoFailed] = useState(false);
  const Icon = CATEGORY_ICON[scheme.category] ?? HandHeart;
  const photo = photoFor(scheme);
  const showPhoto = Boolean(photo) && !photoFailed;

  return (
    <div
      className={`group relative overflow-hidden rounded-xl bg-gradient-to-br shadow-2xl ring-1 ring-black/5 ${gradientFor(scheme.category)} ${className}`}
    >
      {showPhoto ? (
        <img
          src={photo.src}
          alt={photo.alt}
          className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105"
          draggable={false}
          onError={() => setPhotoFailed(true)}
        />
      ) : (
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <Icon
            size={260}
            strokeWidth={1.1}
            className="pointer-events-none absolute -bottom-14 -right-14 rotate-[-8deg] text-white/[0.13]"
            aria-hidden="true"
          />
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/0 to-transparent" />

      <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-accent-700 shadow-sm backdrop-blur">
        <CheckCircle2 size={14} />
        Strong match
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Show next matched scheme"
          className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur transition-colors hover:bg-black/50"
        >
          <X size={15} />
        </button>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="text-xs font-medium text-white/70">
          {scheme.level} &middot; {scheme.benefitAmount}
        </p>
        <p className="mt-0.5 text-sm font-semibold text-white">{scheme.shortName}</p>
      </div>
    </div>
  );
};

export default SchemeMatchCard;
