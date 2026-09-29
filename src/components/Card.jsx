import { cn } from '@/lib/cn';

/**
 * Surface with drafting-style corner marks that light up on hover/focus-within.
 */
export default function Card({ as: Comp = 'div', className, children, highlight = false, ...props }) {
  return (
    <Comp
      className={cn(
        'group relative rounded-md border bg-surface/70 transition-colors duration-300',
        highlight ? 'border-accent/50' : 'border-line hover:border-muted/40 focus-within:border-muted/40',
        className,
      )}
      {...props}
    >
      <CornerMarks />
      {children}
    </Comp>
  );
}

export function CornerMarks() {
  const mark =
    'pointer-events-none absolute h-3 w-3 border-accent opacity-0 transition-all duration-300 group-hover:opacity-100 group-focus-within:opacity-100';
  // `contents` keeps the wrapper out of grid/flex layouts; the marks themselves are absolute.
  return (
    <span aria-hidden="true" className="contents">
      <span className={cn(mark, '-left-px -top-px border-l border-t group-hover:-left-1.5 group-hover:-top-1.5')} />
      <span className={cn(mark, '-right-px -top-px border-r border-t group-hover:-right-1.5 group-hover:-top-1.5')} />
      <span className={cn(mark, '-bottom-px -left-px border-b border-l group-hover:-bottom-1.5 group-hover:-left-1.5')} />
      <span className={cn(mark, '-bottom-px -right-px border-b border-r group-hover:-bottom-1.5 group-hover:-right-1.5')} />
    </span>
  );
}
