import Reveal from './Reveal';
import { cn } from '@/lib/cn';

/**
 * Section header styled like a drawing annotation:
 *   02 |——————| ABOUT
 *   Big title
 */
export default function SectionHeading({ index, label, title, description, className, as: Heading = 'h2', id }) {
  return (
    <Reveal className={cn('mb-12 md:mb-16', className)}>
      <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-muted">
        <span className="text-accent">{index}</span>
        <span aria-hidden="true" className="relative h-px w-12 bg-line">
          <span className="absolute -top-1 left-0 h-2 w-px bg-muted/60" />
          <span className="absolute -top-1 right-0 h-2 w-px bg-muted/60" />
        </span>
        <span>{label}</span>
      </p>
      <Heading
        id={id}
        className="mt-5 max-w-3xl text-balance font-display text-3xl font-semibold tracking-tight text-ink md:text-5xl"
      >
        {title}
      </Heading>
      {description && <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted">{description}</p>}
    </Reveal>
  );
}
