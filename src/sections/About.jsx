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
