'use client';

import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Download } from 'lucide-react';
import Button from '@/components/Button';
import ScrambleText from '@/components/ScrambleText';
import SocialLinks from '@/components/SocialLinks';
import HeroSchematic from '@/components/HeroSchematic';
import { profile } from '@/data/profile';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } };
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 0.6, 0.35, 1] } },
};

export default function Hero() {
  const [first, middle, ...rest] = profile.name.split(' ');

  return (
    <section id="home" aria-labelledby="hero-title" className="relative z-[1] flex min-h-[100svh] items-center pb-24 pt-28 md:pt-32">
      <div className="container-page grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p variants={item} className="font-mono text-xs text-muted sm:text-sm">
            <span className="text-accent">~/latur-maharashtra</span> $ whoami
            <span className="caret" aria-hidden="true" />
          </motion.p>

          <motion.h1
            id="hero-title"
            variants={item}
            className="mt-6 font-display text-[clamp(2.75rem,8vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.03em]"
          >
            <span className="mb-3 block font-sans text-[0.36em] font-normal tracking-normal text-muted">Hi, I&rsquo;m</span>
            <span className="block">
              {first} {middle}
            </span>
            <span className="block">
              {rest.join(' ')}
              <span className="text-accent">.</span>
            </span>
          </motion.h1>

          <motion.p variants={item} className="mt-7 flex items-center gap-3 font-mono text-xs tracking-[0.28em] text-accent sm:text-sm">
            <span aria-hidden="true" className="h-px w-8 bg-accent" />
            <ScrambleText text={profile.role.toUpperCase()} delay={500} />
          </motion.p>

          <motion.p variants={item} className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted">
            {profile.tagline}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap gap-3">
            <Button href="#projects" icon={<ArrowUpRight />} data-cursor="go">
              View Projects
            </Button>
            <Button href={profile.resumeUrl} variant="outline" icon={<Download />} download data-cursor="pdf">
              Download Resume
            </Button>
            <Button href="#contact" variant="ghost" data-cursor="say hi">
              Contact Me <span aria-hidden="true">→</span>
            </Button>
          </motion.div>

          <motion.div variants={item} className="mt-10 flex items-center gap-4">
            <SocialLinks />
            <span className="hidden h-px w-10 bg-line sm:block" aria-hidden="true" />
            <span className="hidden font-mono text-xs text-muted sm:block">{profile.location}</span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.21, 0.6, 0.35, 1] }}
          className="pb-10"
        >
          <HeroSchematic />
        </motion.div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-muted hover:text-accent md:flex"
      >
        Scroll <ArrowDown className="h-3.5 w-3.5 animate-bounce" aria-hidden="true" />
      </a>
    </section>
  );
}
