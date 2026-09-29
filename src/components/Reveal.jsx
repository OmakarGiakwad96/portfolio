'use client';

import { motion } from 'framer-motion';

/**
 * Fade + rise when scrolled into view (framer-motion uses IntersectionObserver
 * under the hood). Reduced-motion users get the content without movement via
 * <MotionConfig reducedMotion="user">.
 */
export default function Reveal({ as = 'div', delay = 0, y = 18, className, children, ...props }) {
  const Comp = motion[as] ?? motion.div;
  return (
    <Comp
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, delay, ease: [0.21, 0.6, 0.35, 1] }}
      className={className}
      {...props}
    >
      {children}
    </Comp>
  );
}
