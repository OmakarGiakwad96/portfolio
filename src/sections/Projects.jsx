import { ArrowUpRight, Plus, Users } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import Card from '@/components/Card';
import Tag from '@/components/Tag';
import Button from '@/components/Button';
import TiltCard from '@/components/TiltCard';
import ArchitectureDiagram from '@/components/ArchitectureDiagram';
import { GitHubIcon } from '@/components/BrandIcons';
import { featuredProject as p, upcomingProjects } from '@/data/projects';

export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="relative z-[1] py-24 md:py-32">
      <div className="container-page">
        <SectionHeading id="projects-title" index="04" label="Projects" title="Selected work." />

        <Reveal>
          <Card as="article" aria-labelledby="photohub-title" className="overflow-hidden">
            {/* Header */}
            <div className="flex flex-col gap-6 border-b border-line p-6 sm:p-8 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
                  <span className="text-accent">Project 01</span>
                  <Tag accent className="gap-1.5 normal-case tracking-normal">
                    <Users className="h-3 w-3" aria-hidden="true" /> {p.badge}
                  </Tag>
                </p>
                <h3 id="photohub-title" className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl">
                  {p.name}
                </h3>
                <p className="mt-2 text-lg text-muted">{p.subtitle}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button href={p.links.github} variant="outline" icon={<GitHubIcon />} data-cursor="code">
                  GitHub
                </Button>
                <Button href={p.links.demo} icon={<ArrowUpRight />} data-cursor="demo">
                  Live Demo
                </Button>
              </div>
            </div>

            {/* Overview vs. my contribution — kept visibly separate */}
            <div className="grid lg:grid-cols-[1.35fr_1fr]">
              <div className="border-b border-line p-6 sm:p-8 lg:border-b-0 lg:border-r">
                <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Project overview · team</h4>
                <p className="mt-4 text-pretty leading-relaxed text-ink/85">{p.overview}</p>

                <dl className="mt-6 grid gap-3 sm:grid-cols-3">
                  {p.users.map((u) => (
                    <div key={u.name} className="rounded-sm border border-line bg-bg/50 p-3">
                      <dt className="font-mono text-xs text-accent">{u.name}</dt>
                      <dd className="mt-1 text-sm leading-snug text-muted">{u.detail}</dd>
                    </div>
                  ))}
                </dl>

                <h5 className="mt-7 font-mono text-xs uppercase tracking-[0.2em] text-muted">Features</h5>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {p.features.map((f) => (
                    <li key={f}>
                      <Tag>{f}</Tag>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative bg-accent/[0.04] p-6 sm:p-8">
                <span aria-hidden="true" className="absolute inset-y-0 left-0 w-0.5 bg-accent" />
                <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">My contribution</h4>
                <p className="mt-4 text-lg leading-relaxed text-ink">{p.contribution.summary}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{p.contribution.context}</p>

                <h5 className="mt-7 font-mono text-xs uppercase tracking-[0.2em] text-muted">System stack</h5>
                <dl className="mt-3 space-y-2">
                  {p.stack.map(({ group, items }) => (
                    <div key={group} className="grid grid-cols-[6.5rem_1fr] gap-3 text-sm">
                      <dt className="font-mono text-xs leading-6 text-muted">{group}</dt>
                      <dd className="leading-6 text-ink/90">{items.join(' · ')}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            {/* Architecture */}
            <div className="border-t border-line p-4 sm:p-8">
              <ArchitectureDiagram />
            </div>
          </Card>
        </Reveal>

        {/* Coming soon slots — intentionally empty, no invented details */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {upcomingProjects.map((slot, i) => (
            <Reveal key={slot.id} delay={i * 0.08}>
              <TiltCard>
                <div className="group flex h-full min-h-[13rem] flex-col justify-between rounded-md border border-dashed border-line bg-surface/30 p-6 transition-colors duration-300 hover:border-accent/50">
                  <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.2em] text-muted">
                    <span>Project {String(i + 2).padStart(2, '0')}</span>
                    <Plus className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90 group-hover:text-accent" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-semibold tracking-tight text-ink/70">Coming soon</h3>
                    <p className="mt-2 font-mono text-xs text-muted">slot reserved · in progress</p>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
