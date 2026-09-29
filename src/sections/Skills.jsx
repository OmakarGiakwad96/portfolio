import { Boxes, Braces, Database, Lightbulb, Monitor, Server } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import Card from '@/components/Card';
import Tag from '@/components/Tag';
import { skillGroups } from '@/data/skills';
import { cn } from '@/lib/cn';

const ICONS = { braces: Braces, server: Server, monitor: Monitor, database: Database, boxes: Boxes, lightbulb: Lightbulb };

// Bento layout: backend is the focus, so it gets the wide slot; concepts span the full row.
const SPANS = { backend: 'md:col-span-2', concepts: 'md:col-span-3' };

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="relative z-[1] py-24 md:py-32">
      <div className="container-page">
        <SectionHeading
          id="skills-title"
          index="02"
          label="Skills"
          title="The toolkit I work with."
          description="Grouped by where they sit in a system — from the language layer to delivery."
        />

        <div className="grid gap-4 md:grid-cols-3">
          {skillGroups.map((group, i) => {
            const Icon = ICONS[group.icon] ?? Braces;
            return (
              <Reveal key={group.id} delay={i * 0.05} className={cn(SPANS[group.id])}>
                <Card className="h-full p-6 hover:bg-elevated/60">
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, '0')}</span>
                    <Icon
                      aria-hidden="true"
                      className="h-5 w-5 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:text-accent"
                    />
                  </div>
                  <h3 className="mt-8 font-display text-xl font-semibold tracking-tight">{group.title}</h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <li key={skill}>
                        <Tag>{skill}</Tag>
                      </li>
                    ))}
                  </ul>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
