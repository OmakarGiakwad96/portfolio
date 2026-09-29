'use client';

import dynamic from 'next/dynamic';
import { MotionConfig } from 'framer-motion';

// The cursor only matters on desktop pointers, so keep it out of the server bundle.
const CustomCursor = dynamic(() => import('./CustomCursor'), { ssr: false });

/** Client-side wrappers. `reducedMotion="user"` makes every framer-motion animation respect the OS setting. */
export default function Providers({ children }) {
  return (
    <MotionConfig reducedMotion="user">
      {children}
      <CustomCursor />
    </MotionConfig>
  );
}
