'use client';

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/cn';

/** Gentle 3D tilt toward the pointer, used for project cards. */
export default function TiltCard({ className, children, max = 5 }) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), { stiffness: 200, damping: 20 });

  const onPointerMove = (e) => {
    if (reduce || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <div className="[perspective:900px]">
      <motion.div
        style={{ rotateX, rotateY }}
        onPointerMove={onPointerMove}
        onPointerLeave={reset}
        className={cn('h-full', className)}
      >
        {children}
      </motion.div>
    </div>
  );
}
