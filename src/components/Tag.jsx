import { cn } from '@/lib/cn';

export default function Tag({ children, className, accent = false }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-sm border px-2.5 py-1 font-mono text-xs',
        accent ? 'border-accent/40 bg-accent/10 text-accent' : 'border-line bg-bg/50 text-ink/85',
        className,
      )}
    >
      {children}
    </span>
  );
}
