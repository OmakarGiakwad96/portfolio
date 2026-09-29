import { ArrowUp } from 'lucide-react';
import SocialLinks from './SocialLinks';
import { profile } from '@/data/profile';

/** Footer laid out like the title block of an engineering drawing. */
export default function Footer() {
  const year = new Date().getFullYear();
  const cells = [
    { label: 'Drawn by', value: profile.name },
    { label: 'Title', value: 'Portfolio' },
    { label: 'Location', value: 'Latur, MH, IN' },
    { label: 'Sheet', value: '01 / 01' },
    { label: 'Rev', value: String(year) },
  ];

  return (
    <footer className="relative z-[1] border-t border-line">
      <div className="container-page py-10">
        <dl className="grid grid-cols-2 border-l border-t border-line sm:grid-cols-3 lg:grid-cols-5">
          {cells.map(({ label, value }) => (
            <div key={label} className="border-b border-r border-line px-4 py-3">
              <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">{label}</dt>
              <dd className="mt-1 truncate font-mono text-sm text-ink">{value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-8 flex flex-col-reverse items-start justify-between gap-6 sm:flex-row sm:items-center">
          <p className="font-mono text-xs text-muted">
            © {year} {profile.name}. Built with Next.js, Tailwind CSS &amp; Framer Motion.
          </p>
          <div className="flex items-center gap-4">
            <SocialLinks />
            <a
              href="#home"
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-muted hover:text-accent"
            >
              Top <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
