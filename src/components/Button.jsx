'use client';

import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { cn } from '@/lib/cn';

const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-sm px-5 py-3 font-mono text-[13px] uppercase tracking-[0.12em] transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60';

const variants = {
  primary: 'bg-accent text-accent-ink hover:bg-ink',
  outline: 'border border-line bg-bg/40 text-ink hover:border-accent hover:text-accent',
  ghost: 'text-muted hover:text-ink',
};

/**
 * Button / link with a subtle magnetic pull toward the pointer.
 * Renders <a> when `href` is given, otherwise <button>.
 * `icon` is a rendered element (e.g. <Download />) so server components can pass it.
 */
export default function Button({
  href,
  variant = 'primary',
  icon,
  magnetic = true,
  className,
  children,
  type = 'button',
  ...props
}) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 18 });
  const sy = useSpring(y, { stiffness: 260, damping: 18 });

  const onPointerMove = (e) => {
    if (reduce || !magnetic || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.22);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.3);
  };
  const onPointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  const external = href?.startsWith('http');
  const shared = {
    style: { x: sx, y: sy },
    onPointerMove,
    onPointerLeave,
    className: cn(base, variants[variant], className),
    ...props,
  };

  const content = (
    <>
      {children}
      {icon && (
        <span aria-hidden="true" className="inline-flex transition-transform duration-200 group-hover:translate-x-0.5 [&>svg]:h-4 [&>svg]:w-4">
          {icon}
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <motion.a href={href} {...(external && { target: '_blank', rel: 'noopener noreferrer' })} {...shared}>
        {content}
      </motion.a>
    );
  }
  return (
    <motion.button type={type} {...shared}>
      {content}
    </motion.button>
  );
}
