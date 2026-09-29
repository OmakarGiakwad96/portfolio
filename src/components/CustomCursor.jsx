'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * CAD-style cursor: a precise dot, a spring-lagged reticle with crosshair
 * ticks, and a live X/Y coordinate readout. Over links/buttons the reticle
 * opens into a bracketed square (and can show a label via `data-cursor="…"`).
 *
 * Only enabled for fine pointers (mouse/trackpad) and when the user has not
 * asked for reduced motion; touch devices keep the native behaviour.
 */
const INTERACTIVE = 'a, button, [role="tab"], label, summary, [data-cursor]';
const TEXT_FIELDS = 'input, textarea, select';

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState('default'); // 'default' | 'hover' | 'text'
  const [label, setLabel] = useState('');
  const [pressed, setPressed] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 420, damping: 34, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 420, damping: 34, mass: 0.6 });

  // Decide whether the custom cursor should run at all.
  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setEnabled(fine.matches && !reduce.matches);
    update();
    fine.addEventListener('change', update);
    reduce.addEventListener('change', update);
    return () => {
      fine.removeEventListener('change', update);
      reduce.removeEventListener('change', update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;
    const root = document.documentElement;
    root.classList.add('has-custom-cursor');
    let frame = 0;
    let last = { x: 0, y: 0 };

    const onMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      last = { x: e.clientX, y: e.clientY };
      setVisible(true);

      // Batch the CSS-variable + readout updates to one per frame.
      if (!frame) {
        frame = requestAnimationFrame(() => {
          frame = 0;
          root.style.setProperty('--mx', `${last.x}px`);
          root.style.setProperty('--my', `${last.y}px`);
          setCoords({ x: Math.round(last.x), y: Math.round(last.y + window.scrollY) });
        });
      }

      const el = e.target instanceof Element ? e.target : null;
      if (el?.closest(TEXT_FIELDS)) {
        setMode('text');
        setLabel('');
      } else {
        const hit = el?.closest(INTERACTIVE);
        setMode(hit ? 'hover' : 'default');
        setLabel(hit?.getAttribute('data-cursor') ?? '');
      }
    };
    const onLeave = () => setVisible(false);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      root.classList.remove('has-custom-cursor');
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const hovering = mode === 'hover';
  const size = hovering ? (label ? 72 : 46) : 30;
  const pad = (n) => String(Math.max(0, n)).padStart(4, '0');

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100]">
      {/* Precise dot */}
      <motion.div style={{ x, y }} className="absolute left-0 top-0">
        <motion.div
          animate={{ opacity: visible && mode !== 'text' ? 1 : 0, scale: hovering ? 0 : 1 }}
          transition={{ duration: 0.15 }}
          className="-ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-accent"
        />
      </motion.div>

      {/* Lagging reticle */}
      <motion.div style={{ x: ringX, y: ringY }} className="absolute left-0 top-0">
        <div className="-translate-x-1/2 -translate-y-1/2">
          <motion.div
            animate={{
              width: size,
              height: size,
              borderRadius: hovering ? 3 : 999,
              opacity: visible && mode !== 'text' ? 1 : 0,
              scale: pressed ? 0.82 : 1,
              rotate: hovering ? 0 : 45,
            }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            className={`relative grid place-items-center border ${
              hovering ? 'border-accent/80 bg-accent/10' : 'border-ink/40'
            }`}
          >
            {/* crosshair ticks */}
            <span className="absolute -top-2 left-1/2 h-1.5 w-px -translate-x-1/2 bg-accent" />
            <span className="absolute -bottom-2 left-1/2 h-1.5 w-px -translate-x-1/2 bg-accent" />
            <span className="absolute -left-2 top-1/2 h-px w-1.5 -translate-y-1/2 bg-accent" />
            <span className="absolute -right-2 top-1/2 h-px w-1.5 -translate-y-1/2 bg-accent" />
            {label && (
              <span className="font-mono text-[10px] uppercase tracking-widest text-accent">{label}</span>
            )}
          </motion.div>
        </div>

        {/* Coordinate readout */}
        <motion.span
          animate={{ opacity: visible && mode === 'default' ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute left-5 top-4 whitespace-nowrap font-mono text-[10px] tracking-wider text-muted"
        >
          X {pad(coords.x)} · Y {pad(coords.y)}
        </motion.span>
      </motion.div>
    </div>
  );
}
