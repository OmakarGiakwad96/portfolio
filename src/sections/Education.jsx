import { GraduationCap } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import Card from '@/components/Card';
import { education } from '@/data/education';

export default function Education() {
  return (
    <section id="education" aria-labelledby="education-title" className="relative z-[1] py-24 md:py-32">
      <div className="container-page">
        <SectionHeading id="education-title" index="05" label="Education" title="Two disciplines, one way of thinking." />

        <ol className="grid gap-4 md:grid-cols-2">
          {education.map((e, i) => (
            <Reveal as="li" key={e.id} delay={i * 0.08}>
              <Card className="flex h-full flex-col p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-[0.18em] text-accent">{e.period}</span>
                  <GraduationCap className="h-5 w-5 text-muted transition-colors group-hover:text-accent" aria-hidden="true" />
                </div>
                <h3 className="mt-8 text-balance font-display text-xl font-semibold leading-snug tracking-tight md:text-2xl">
                  {e.program}
                </h3>
                <p className="mt-3 text-muted">{e.institution}</p>
              </Card>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
