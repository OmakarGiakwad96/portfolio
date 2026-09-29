import fs from 'node:fs';
import path from 'node:path';
import { Download, FileText } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import Button from '@/components/Button';
import { profile } from '@/data/profile';

/** Server component: checks on the server whether the PDF has been added to /public yet. */
export default function Resume() {
  const hasPdf = fs.existsSync(path.join(process.cwd(), 'public', profile.resumeFile));
  const fileName = profile.resumeUrl.split('/').pop();

  return (
    <section id="resume" aria-labelledby="resume-title" className="relative z-[1] py-24 md:py-32">
      <div className="container-page">
        <div className="grid items-center gap-12 rounded-md border border-line bg-surface/50 p-6 sm:p-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <SectionHeading
              id="resume-title"
              index="07"
              label="Resume"
              title="The one-page version."
              description="Education, experience, skills and projects in a single PDF, ready for recruiters and hiring teams."
              className="mb-8 md:mb-10"
            />
            <Reveal>
              <Button href={profile.resumeUrl} icon={<Download />} download className="px-7 py-4 text-sm" data-cursor="pdf">
                Download Resume
              </Button>
              {!hasPdf && process.env.NODE_ENV !== 'production' && (
                <p className="mt-4 font-mono text-xs text-accent">
                  dev note: add {fileName} to public/resume/ — see public/resume/README.md
                </p>
              )}
            </Reveal>
          </div>

          {/* Paper sheet drawn in CSS */}
          <Reveal delay={0.1} className="hidden justify-center sm:flex">
            <a
              href={profile.resumeUrl}
              download
              aria-label="Download resume (PDF)"
              data-cursor="pdf"
              className="group relative block w-64 rotate-[-4deg] rounded-sm border border-line bg-elevated p-6 transition-transform duration-500 hover:rotate-0 hover:scale-[1.02]"
            >
              <span aria-hidden="true" className="absolute right-0 top-0 h-8 w-8 border-b border-l border-line bg-bg" />
              <FileText className="h-6 w-6 text-accent" aria-hidden="true" />
              <span className="mt-4 block font-display text-lg font-semibold">{profile.name}</span>
              <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.2em] text-muted">{profile.role}</span>
              <span aria-hidden="true" className="mt-6 block space-y-2.5">
                {[100, 85, 92, 60, 100, 78, 88, 50].map((w, i) => (
                  <span key={i} className="block h-1.5 rounded-full bg-line" style={{ width: `${w}%` }} />
                ))}
              </span>
              <span className="mt-6 block font-mono text-[10px] text-muted">{fileName}</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
