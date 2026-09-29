'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { profile } from '@/data/profile';

/*
 * Abstract "system schematic" for the hero: services wired together with
 * orthogonal traces and data packets travelling along them. The whole sheet
 * tilts in 3D toward the pointer; the terminal floats on a higher Z layer.
 */
const NODES = [
  { id: 'client', x: 70, y: 62, label: 'client/react' },
  { id: 'gateway', x: 210, y: 140, label: 'api.gateway', primary: true },
  { id: 'auth', x: 352, y: 70, label: 'auth/jwt' },
  { id: 'java', x: 88, y: 250, label: 'svc/spring' },
  { id: 'net', x: 330, y: 240, label: 'svc/.net' },
  { id: 'db', x: 180, y: 330, label: 'mysql' },
  { id: 'pay', x: 350, y: 330, label: 'payments' },
];
const EDGES = [
  ['client', 'gateway'],
  ['gateway', 'auth'],
  ['gateway', 'java'],
  ['gateway', 'net'],
  ['java', 'db'],
  ['net', 'db'],
  ['net', 'pay'],
];

const byId = Object.fromEntries(NODES.map((n) => [n.id, n]));
/** Orthogonal (elbow) trace between two nodes, like a PCB / P&ID line. */
const trace = (a, b) => {
  const midY = Math.round((a.y + b.y) / 2);
  return `M${a.x} ${a.y} V${midY} H${b.x} V${b.y}`;
};

export default function HeroSchematic() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [7, -7]), { stiffness: 120, damping: 18 });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-9, 9]), { stiffness: 120, damping: 18 });

  useEffect(() => {
    if (reduce) return undefined;
    const onMove = (e) => {
      const r = ref.current?.getBoundingClientRect();
      if (!r) return;
      const clamp = (v) => Math.max(-0.5, Math.min(0.5, v));
      px.set(clamp((e.clientX - (r.left + r.width / 2)) / window.innerWidth));
      py.set(clamp((e.clientY - (r.top + r.height / 2)) / window.innerHeight));
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [reduce, px, py]);

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[30rem] [perspective:1100px]">
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative rounded-md border border-line bg-surface/80 p-3 sm:p-4"
      >
        <div className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          <span>fig. 01 — system.schematic</span>
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-2 w-2 rounded-full border border-muted/50" />
            <span className="h-2 w-2 rounded-full border border-muted/50" />
            <span className="h-2 w-2 rounded-full bg-accent" />
          </span>
        </div>

        <svg viewBox="0 0 420 380" className="w-full" role="img" aria-label="Abstract diagram of connected services: client, API gateway, auth, Spring and .NET services, MySQL and payments.">
          <defs>
            <pattern id="hero-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M20 0H0V20" fill="none" className="stroke-line" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="420" height="380" fill="url(#hero-grid)" opacity="0.7" />

          {/* ruler ticks along the top edge */}
          {Array.from({ length: 43 }, (_, i) => (
            <line key={i} x1={i * 10} x2={i * 10} y1="0" y2={i % 5 === 0 ? 7 : 3} className="stroke-muted/60" strokeWidth="0.8" />
          ))}

          {/* traces */}
          {EDGES.map(([a, b]) => {
            const d = trace(byId[a], byId[b]);
            return (
              <g key={`${a}-${b}`}>
                <path d={d} fill="none" className="stroke-muted/50" strokeWidth="1.2" />
                {!reduce && (
                  <circle r="2.6" className="fill-accent">
                    <animateMotion dur={`${2.4 + (a.length + b.length) * 0.12}s`} repeatCount="indefinite" path={d} />
                  </circle>
                )}
              </g>
            );
          })}

          {/* rotating reticle around the gateway */}
          <circle cx="210" cy="140" r="30" fill="none" className="spin-slow stroke-accent/60" strokeWidth="1" strokeDasharray="3 6" />

          {/* nodes */}
          {NODES.map((n) => (
            <g key={n.id}>
              <rect
                x={n.x - (n.primary ? 9 : 6)}
                y={n.y - (n.primary ? 9 : 6)}
                width={n.primary ? 18 : 12}
                height={n.primary ? 18 : 12}
                className={n.primary ? 'fill-accent' : 'fill-bg stroke-ink/80'}
                strokeWidth="1.3"
              />
              <text
                x={n.x + (n.x > 300 ? -12 : 12)}
                y={n.y - 12}
                textAnchor={n.x > 300 ? 'end' : 'start'}
                className="fill-ink/80 font-mono"
                fontSize="11"
              >
                {n.label}
              </text>
            </g>
          ))}

          {/* dimension line */}
          <g className="stroke-muted/60" strokeWidth="0.8">
            <line x1="20" x2="400" y1="366" y2="366" />
            <line x1="20" x2="20" y1="360" y2="372" />
            <line x1="400" x2="400" y1="360" y2="372" />
          </g>
        </svg>

        {/* Terminal floats above the sheet in 3D space */}
        <div
          style={{ transform: 'translateZ(60px)' }}
          className="relative -mb-10 ml-auto mt-3 w-[92%] rounded-md border border-line bg-bg p-4 font-mono text-[12px] leading-relaxed shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)] sm:-mr-8 sm:w-[88%]"
        >
          <p className="text-muted">
            <span className="text-accent">$</span> omkar --status
          </p>
          <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-4 gap-y-0.5">
            {profile.status.flatMap(({ key, value }, i) => {
              const anim = {
                initial: { opacity: 0, x: -6 },
                animate: { opacity: 1, x: 0 },
                transition: { delay: 0.9 + i * 0.15, duration: 0.3 },
              };
              return [
                <motion.dt key={`${key}-k`} {...anim} className="text-muted">
                  {key}
                </motion.dt>,
                <motion.dd key={`${key}-v`} {...anim} className="text-ink">
                  {value}
                </motion.dd>,
              ];
            })}
          </dl>
          <p className="mt-2 text-muted">
            <span className="text-accent">$</span>
            <span className="caret" aria-hidden="true" />
          </p>
        </div>
      </motion.div>
    </div>
  );
}
