'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navItems } from '@/data/navigation';
import { profile } from '@/data/profile';
import { cn } from '@/lib/cn';

const pad = (i) => String(i).padStart(2, '0');

/**
 * Sticky navbar. At the top of the page it's a full-width transparent bar;
 * once scrolled it condenses into a floating panel. Scroll-spy highlights the
 * current section. On mobile, a full-screen menu with focus trap + Esc to close.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  const headerRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll-spy: a section is "active" when it crosses the middle of the viewport.
  useEffect(() => {
    const sections = navItems.map(({ id }) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const close = useCallback((restoreFocus = false) => {
    setOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  // Mobile menu: lock scroll, focus first link, trap Tab, close on Esc / resize.
  useEffect(() => {
    if (!open) return undefined;
    document.body.style.overflow = 'hidden';
    const focusables = () =>
      Array.from(headerRef.current?.querySelectorAll('a[href], button') ?? []).filter(
        (el) => el.offsetParent !== null,
      );
    headerRef.current?.querySelector('#mobile-menu a')?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') close(true);
      if (e.key !== 'Tab') return;
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const onResize = () => window.innerWidth >= 768 && close();
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open, close]);

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50">
      <div className={cn('transition-[padding] duration-300', scrolled && !open ? 'px-3 pt-3' : 'px-0 pt-0')}>
        <nav
          aria-label="Primary"
          className={cn(
            'relative z-10 mx-auto flex items-center justify-between border transition-all duration-300',
            scrolled && !open
              ? 'max-w-5xl rounded-md border-line/90 bg-bg/85 px-4 py-2.5 backdrop-blur-md'
              : 'max-w-container border-transparent px-5 py-5 md:px-8',
          )}
        >
          <a href="#home" onClick={() => close()} className="flex items-center gap-2.5" aria-label={`${profile.name}, back to top`}>
            <span className="grid h-8 w-9 place-items-center rounded-sm border border-accent/60 font-mono text-[11px] font-semibold text-accent">
              {profile.initials}
            </span>
            <span className="hidden font-mono text-sm text-ink sm:inline">
              {profile.handle.split('.')[0]}
              <span className="text-accent">.</span>
              {profile.handle.split('.')[1]}
            </span>
          </a>

          <ul className="hidden items-center md:flex">
            {navItems.map(({ id, label }, i) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={active === id ? 'true' : undefined}
                  className={cn(
                    'relative block px-3 py-2 font-mono text-[12.5px] transition-colors duration-200',
                    active === id ? 'text-ink' : 'text-muted hover:text-ink',
                  )}
                >
                  <span className="mr-1 text-accent/80">{pad(i)}</span>
                  {label}
                  {active === id && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-3 -bottom-px h-px bg-accent"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid h-10 w-10 place-items-center rounded-sm border border-line text-ink md:hidden"
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-bg px-6 pb-10 pt-24 md:hidden"
          >
            <ul className="flex flex-col border-t border-line">
              {navItems.map(({ id, label }, i) => (
                <motion.li
                  key={id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.25 }}
                  className="border-b border-line"
                >
                  <a
                    href={`#${id}`}
                    onClick={() => close()}
                    aria-current={active === id ? 'true' : undefined}
                    className="flex items-baseline gap-4 py-4 font-display text-3xl font-semibold text-ink"
                  >
                    <span className="font-mono text-xs text-accent">{pad(i)}</span>
                    {label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <p className="mt-8 font-mono text-xs text-muted">{profile.location}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
