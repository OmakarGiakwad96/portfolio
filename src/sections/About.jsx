import Image from 'next/image';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import Journey from '@/components/Journey';
import { profile } from '@/data/profile';

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative z-[1] py-24 md:py-32">
      <div className="container-page">
        <SectionHeading id="about-title" index="01" label="About" title="From the shop floor to the stack." />

        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div className="space-y-5">
            {profile.about.map((p, i) => (
              <Reveal key={i} delay={i * 0.06} as="p" className="text-pretty text-lg leading-relaxed text-ink/85">
                {p}
              </Reveal>
            ))}
          </div>

          <div className="space-y-6">
            {/* Profile Photo */}
            <Reveal delay={0.05}>
              <div className="relative mx-auto w-fit">
                {/* Decorative dot-grid behind photo */}
                <div
                  className="absolute -right-4 -top-4 h-32 w-32 opacity-20"
                  aria-hidden="true"
                  style={{
                    backgroundImage: 'radial-gradient(rgb(var(--accent)) 1.2px, transparent 1.2px)',
                    backgroundSize: '10px 10px',
                  }}
                />
                {/* Decorative dot-grid bottom-left */}
                <div
                  className="absolute -bottom-4 -left-4 h-24 w-24 opacity-15"
                  aria-hidden="true"
                  style={{
                    backgroundImage: 'radial-gradient(rgb(var(--accent)) 1.2px, transparent 1.2px)',
                    backgroundSize: '10px 10px',
                  }}
                />
                {/* Photo container */}
                <div className="relative overflow-hidden rounded-xl border-2 border-accent/30 shadow-lg shadow-accent/5">
                  <Image
                    src="/profile.png"
                    alt={`Photo of ${profile.name}`}
                    width={360}
                    height={420}
                    className="h-auto w-full max-w-[360px] object-cover"
                    priority
                  />
                  {/* Subtle gradient overlay at bottom */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-bg/60 to-transparent" />
                </div>
                {/* Name tag below photo */}
                <div className="mt-3 text-center font-mono text-xs tracking-wider text-muted">
                  &lt;{profile.handle} /&gt;
                </div>
              </div>
            </Reveal>

            {/* Spec Sheet */}
            <Reveal delay={0.1}>
              <dl className="rounded-md border border-line bg-surface/60">
                <div className="border-b border-line px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  spec.sheet
                </div>
                {profile.specs.map(({ label, value }) => (
                  <div key={label} className="grid grid-cols-[7rem_1fr] gap-4 border-b border-line/70 px-5 py-3.5 last:border-b-0">
                    <dt className="font-mono text-xs uppercase tracking-wider text-muted">{label}</dt>
                    <dd className="text-sm text-ink">{value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>

        <div className="mt-20">
          <Reveal>
            <h3 className="mb-6 flex items-center gap-3 font-display text-2xl font-semibold tracking-tight">
              Developer journey
              <span className="font-mono text-xs font-normal text-muted">— select a step</span>
            </h3>
          </Reveal>
          <Reveal delay={0.05}>
            <Journey />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
