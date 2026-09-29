import { Mail } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from './BrandIcons';
import { profile } from '@/data/profile';
import { cn } from '@/lib/cn';

/** Icon-only social links with accessible names. */
export default function SocialLinks({ className }) {
  const items = [
    { label: 'GitHub profile', href: profile.links.github, Icon: GitHubIcon, external: true },
    { label: 'LinkedIn profile', href: profile.links.linkedin, Icon: LinkedInIcon, external: true },
    { label: `Email ${profile.email}`, href: `mailto:${profile.email}`, Icon: Mail },
  ];

  return (
    <ul className={cn('flex items-center gap-2', className)}>
      {items.map(({ label, href, Icon, external }) => (
        <li key={label}>
          <a
            href={href}
            aria-label={external ? `${label} (opens in a new tab)` : label}
            {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
            className="grid h-10 w-10 place-items-center rounded-sm border border-line text-muted transition-colors duration-200 hover:border-accent/60 hover:text-accent"
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}
