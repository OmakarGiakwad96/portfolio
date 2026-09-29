import { Award } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import Card from '@/components/Card';
import { achievements } from '@/data/achievements';

export default function Achievements() {
  return (
    <section id="achievements" aria-labelledby="achievements-title" className="relative z-[1] py-24 md:py-32">
      <div className="container-page">
        <SectionHeading id="achievements-title" index="06" label="Achievements" title="Recognition." />

        <ul className="grid gap-4">
          {achievements.map((a) => (
            <Reveal as="li" key={a.id}>
              <Card className="grid items-center gap-6 p-6 sm:grid-cols-[auto_1fr] sm:p-10">
                <span className="grid h-16 w-16 place-items-center rounded-md border border-accent/40 bg-accent/10">
                  <Award className="h-7 w-7 text-accent" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">{a.title}</h3>
                  <p className="mt-1 font-mono text-xs uppercase tracking-[0.18em] text-muted">{a.issuer}</p>
                  <blockquote className="mt-4 border-l-2 border-accent pl-4 text-lg italic text-ink/85">
                    &ldquo;{a.note}&rdquo;
                  </blockquote>
                </div>
              </Card>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
