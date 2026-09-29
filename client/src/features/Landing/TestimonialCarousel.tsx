import { useEffect, useState } from 'react';
import { Star, User } from 'lucide-react';
import Badge from '../../components/ui/Badge';
import { testimonials } from './testimonialsConfig';

const ROTATE_INTERVAL_MS = 6000;

const TestimonialCarousel = () => {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const intervalId = setInterval(() => {
      setIndex((current) => (current + 1) % testimonials.length);
    }, ROTATE_INTERVAL_MS);
    return () => clearInterval(intervalId);
  }, [isPaused]);

  const testimonial = testimonials[index];

  return (
    <section>
      <div
        className="mx-auto max-w-6xl px-6 pb-14 pt-16"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <p className="text-center text-xs font-semibold uppercase tracking-wide text-slate-400">
          What Citizens Are Saying
        </p>
        <div className="mt-6 grid grid-cols-1 items-center gap-8 lg:grid-cols-[160px_1fr]">
          <div
            key={testimonial.name}
            className="animate-fade-in mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-slate-100 shadow-sm ring-4 ring-white"
          >
            <User className="h-14 w-14 text-slate-400" />
          </div>
          <blockquote key={index} className="animate-fade-in-up text-center lg:text-left">
            <Badge tone="brand" className="mb-3">{testimonial.category}</Badge>
            <p className="text-xl text-slate-800">&ldquo;{testimonial.quote}&rdquo;</p>
            <div className="mt-2 flex justify-center gap-0.5 lg:justify-start" aria-hidden="true">
              {[1, 2, 3, 4, 5].map((value) => (
                <Star key={value} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <footer className="mt-3 text-sm text-slate-500">
              {testimonial.name}, {testimonial.detail}
            </footer>
          </blockquote>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((item, dotIndex) => (
            <button
              key={item.name}
              type="button"
              aria-label={`Show testimonial from ${item.name}`}
              onClick={() => setIndex(dotIndex)}
              className={`h-2 rounded-full transition-all ${
                dotIndex === index ? 'w-6 bg-brand-600' : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
