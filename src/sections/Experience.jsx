import { Award, MapPin } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import Card from '@/components/Card';
import Tag from '@/components/Tag';
import { experience } from '@/data/experience';

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="relative z-[1] py-24 md:py-32">
      <div className="container-page">
        <SectionHeading
          id="experience-title"
          index="03"
          label="Experience"
          title="Where I learned how systems run."
          description="Before software, I worked in manufacturing. It isn’t a software role, but it’s where I learned to keep a system running, find bottlenecks and improve processes."
        />

        {experience.map((job) => (
          <Reveal key={job.id}>
            <Card as="article" className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[16rem_1fr] lg:gap-12">
              <div className="space-y-3 lg:border-r lg:border-line lg:pr-8">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
                  {job.start} — {job.end}
                </p>
                <p className="text-ink">{job.company}</p>
                <p className="flex items-center gap-1.5 text-sm text-muted">
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> {job.location}
                </p>
                <p className="inline-block rounded-sm border border-line px-2 py-1 font-mono text-[11px] text-muted">{job.type}</p>
              </div>

              <div>
                <h3 className="font-display text-2xl font-semibold tracking-tight">{job.role}</h3>
                <ul className="mt-5 space-y-3">
                  {job.bullets.map((b) => (
                    <li key={b} className="flex gap-3 leading-relaxed text-ink/85">
                      <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-accent" />
                      {b}
                    </li>
                  ))}
                </ul>

                <h4 className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-muted">Transferable strengths</h4>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {job.strengths.map((s) => (
                    <li key={s}>
                      <Tag>{s}</Tag>
                    </li>
                  ))}
                </ul>

                {job.achievement && (
                  <div className="mt-8 flex gap-4 rounded-md border border-accent/30 bg-accent/5 p-4">
                    <Award className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                    <div>
                      <p className="font-semibold text-ink">{job.achievement.title}</p>
                      <p className="mt-1 text-sm text-muted">&ldquo;{job.achievement.note}&rdquo;</p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
