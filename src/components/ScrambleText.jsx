'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ<>/{}[]#_=+01';

/**
 * Decodes text from random glyphs, left to right. Screen readers get the
 * real text immediately; the animated copy is aria-hidden.
 */
export default function ScrambleText({ text, delay = 0, speed = 30, className }) {
  const reduce = useReducedMotion();
  const [output, setOutput] = useState(text);

  useEffect(() => {
    if (reduce) {
      setOutput(text);
      return undefined;
    }
    let raf;
    let start;
    const tick = (t) => {
      start ??= t;
      const revealed = Math.max(0, Math.floor((t - start - delay) / speed));
      setOutput(
        text
          .split('')
          .map((ch, i) => (ch === ' ' || i < revealed ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
          .join(''),
      );
      if (revealed < text.length) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, delay, speed, reduce]);

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{output}</span>
    </span>
  );
}
