'use client';

import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { journey } from '@/data/journey';
import { cn } from '@/lib/cn';

/**
 * Interactive "developer journey" timeline, built as an accessible tablist:
 * click, hover-focus or use arrow keys / Home / End to move between steps.
 * Horizontal on desktop, vertical on mobile.
 */
export default function Journey() {
  const [active, setActive] = useState(journey.length - 1);
  const tabs = useRef([]);
  const last = journey.length - 1;
  const progress = last === 0 ? 1 : active / last;

  const onKeyDown = (e) => {
    const keys = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    let next = null;
    if (e.key in keys) next = (active + keys[e.key] + journey.length) % journey.length;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = last;
    if (next === null) return;
    e.preventDefault();
    tabs.current[next]?.focus();
  };

  const step = journey[active];

  return (
    <div className="rounded-md border border-line bg-surface/50 p-5 sm:p-8">
      <div className="relative">
        {/* track + progress (desktop, horizontal) */}
        <div aria-hidden="true" className="absolute left-[11px] top-[11px] hidden h-px w-[75%] bg-line md:block">
          <motion.div
            className="h-full origin-left bg-accent"
            animate={{ scaleX: progress }}
            transition={{ type: 'spring', stiffness: 160, damping: 24 }}
          />
        </div>
        {/* track + progress (mobile, vertical) */}
        <div aria-hidden="true" className="absolute bottom-6 left-[11px] top-3 w-px bg-line md:hidden">
          <motion.div
            className="w-full origin-top bg-accent"
            style={{ height: '100%' }}
            animate={{ scaleY: progress }}
            transition={{ type: 'spring', stiffness: 160, damping: 24 }}
          />
        </div>

        <div
          role="tablist"
          aria-label="Developer journey"
          onKeyDown={onKeyDown}
          className="relative flex flex-col gap-6 md:grid md:grid-cols-4 md:gap-0"
        >
          {journey.map((item, i) => {
            const selected = i === active;
            const reached = i <= active;
            return (
              <button
                key={item.id}
                ref={(el) => (tabs.current[i] = el)}
                id={`journey-tab-${item.id}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls="journey-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                onFocus={() => setActive(i)}
                data-cursor="view"
                className="group flex items-start gap-4 pr-4 text-left md:flex-col md:gap-5"
              >
                <span
                  className={cn(
                    'relative grid h-6 w-6 shrink-0 place-items-center rounded-full border transition-colors duration-300',
                    reached ? 'border-accent bg-bg' : 'border-line bg-bg group-hover:border-muted',
                  )}
                >
                  <span
                    className={cn(
                      'h-2 w-2 rounded-full transition-all duration-300',
                      selected ? 'scale-125 bg-accent' : reached ? 'bg-accent/60' : 'bg-line',
                    )}
                  />
                </span>
                <span>
                  <span className={cn('block font-mono text-xs tracking-wider', selected ? 'text-accent' : 'text-muted')}>
                    {item.period}
                  </span>
                  <span
                    className={cn(
                      'mt-1 block font-display text-base font-semibold leading-snug transition-colors md:text-lg',
                      selected ? 'text-ink' : 'text-ink/70 group-hover:text-ink',
                    )}
                  >
                    {item.title}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        id="journey-panel"
        role="tabpanel"
        aria-labelledby={`journey-tab-${step.id}`}
        aria-live="polite"
        className="mt-8 min-h-[7.5rem] border-t border-line pt-6"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="grid gap-3 md:grid-cols-[10rem_1fr] md:gap-8"
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
              Step {String(active + 1).padStart(2, '0')} / {String(journey.length).padStart(2, '0')}
            </p>
            <p className="max-w-2xl text-pretty leading-relaxed text-ink/90">{step.description}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
