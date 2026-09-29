import { marqueeWords } from '@/data/skills';

/** Decorative scrolling strip of technologies (content is repeated elsewhere, so it's aria-hidden). */
export default function Marquee() {
  const words = [...marqueeWords, ...marqueeWords];
  return (
    <div aria-hidden="true" className="relative z-[1] overflow-hidden border-y border-line bg-surface/40 py-4">
      <div className="marquee-track flex w-max">
        {words.map((word, i) => (
          <span key={`${word}-${i}`} className="flex items-center whitespace-nowrap pr-8 font-mono text-sm uppercase tracking-[0.18em] text-muted">
            {word}
            <span className="pl-8 text-accent">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
