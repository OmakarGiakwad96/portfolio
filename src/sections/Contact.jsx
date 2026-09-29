'use client';

import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CircleAlert, CircleCheck, LoaderCircle, Mail, MapPin, Send } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import Button from '@/components/Button';
import { GitHubIcon, LinkedInIcon } from '@/components/BrandIcons';
import { profile } from '@/data/profile';
import { LIMITS, buildMailto, validateContact } from '@/lib/validation';
import { cn } from '@/lib/cn';

const FIELDS = [
  { name: 'name', label: 'Name', type: 'text', autoComplete: 'name', placeholder: 'Your name' },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email', placeholder: 'you@company.com' },
  { name: 'message', label: 'Message', type: 'textarea', placeholder: 'What would you like to talk about?' },
];

/**
 * Contact form.
 * 1. Validates in the browser (accessible inline errors, focus moves to the first problem).
 * 2. POSTs to /api/contact (src/app/api/contact/route.js), which re-validates and sends
 *    the email over SMTP when configured in .env.local.
 * 3. If the server can't send (no SMTP configured / offline), falls back to a mailto: link
 *    built from the form values.
 *
 * Want a hosted service instead? Swap the fetch in `submit` for, e.g.:
 *   Formspree: fetch('https://formspree.io/f/YOUR_FORM_ID', { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) })
 *   EmailJS:   emailjs.send('SERVICE_ID', 'TEMPLATE_ID', values, { publicKey: 'PUBLIC_KEY' })
 */
export default function Contact() {
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState({ state: 'idle', message: '' }); // idle | sending | sent | mailto | error
  const formRef = useRef(null);

  const onChange = (e) => {
    const next = { ...values, [e.target.name]: e.target.value };
    setValues(next);
    // Re-validate a field live only after the user has left it once.
    if (touched[e.target.name]) setErrors(validateContact(next).errors);
  };

  const onBlur = (e) => {
    setTouched((t) => ({ ...t, [e.target.name]: true }));
    setErrors(validateContact(values).errors);
  };

  const openMailto = (clean) => {
    window.location.href = buildMailto(profile.email, clean);
    setStatus({
      state: 'mailto',
      message: 'Your email app should open with the message filled in. Just press send there.',
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    const { values: clean, errors: found } = validateContact(values);
    setErrors(found);
    setTouched({ name: true, email: true, message: true });

    const firstInvalid = FIELDS.find((f) => found[f.name]);
    if (firstInvalid) {
      formRef.current?.elements[firstInvalid.name]?.focus();
      setStatus({ state: 'error', message: 'Please fix the highlighted fields.' });
      return;
    }

    setStatus({ state: 'sending', message: 'Sending…' });
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...clean, company: formRef.current?.elements.company?.value ?? '' }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.ok) {
        setValues({ name: '', email: '', message: '' });
        setTouched({});
        setStatus({ state: 'sent', message: 'Thanks! Your message was sent. I’ll get back to you soon.' });
      } else if (data.fallback === 'mailto') {
        openMailto(clean);
      } else if (data.errors) {
        setErrors(data.errors);
        setStatus({ state: 'error', message: 'Please fix the highlighted fields.' });
      } else {
        setStatus({ state: 'error', message: data.message || 'Something went wrong. Please try again.' });
      }
    } catch {
      // Network failure: still let the visitor reach out.
      openMailto(clean);
    }
  };

  const contactLinks = [
    { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, Icon: Mail },
    { label: 'LinkedIn', value: 'LinkedIn profile', href: profile.links.linkedin, Icon: LinkedInIcon, external: true },
    { label: 'GitHub', value: 'GitHub profile', href: profile.links.github, Icon: GitHubIcon, external: true },
  ];

  const StatusIcon = { sent: CircleCheck, mailto: CircleCheck, error: CircleAlert, sending: LoaderCircle }[status.state];

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative z-[1] py-24 md:py-32">
      <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <div>
          <SectionHeading
            id="contact-title"
            index="08"
            label="Contact"
            title="Let’s build something."
            description="Have an opportunity, a question about my work, or just want to connect? Send a message and I’ll reply by email."
          />
          <Reveal as="ul" className="space-y-3">
            {contactLinks.map(({ label, value, href, Icon, external }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
                  className="group flex items-center gap-4 rounded-md border border-line bg-surface/50 px-4 py-3 transition-colors hover:border-accent/50"
                >
                  <Icon className="h-4 w-4 text-muted group-hover:text-accent" aria-hidden="true" />
                  <span className="w-20 font-mono text-xs uppercase tracking-wider text-muted">{label}</span>
                  <span className="truncate text-sm text-ink">
                    {value}
                    {external && <span className="sr-only"> (opens in a new tab)</span>}
                  </span>
                </a>
              </li>
            ))}
            <li className="flex items-center gap-4 px-4 py-3">
              <MapPin className="h-4 w-4 text-muted" aria-hidden="true" />
              <span className="w-20 font-mono text-xs uppercase tracking-wider text-muted">Location</span>
              <span className="text-sm text-ink">{profile.location}</span>
            </li>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <form
            ref={formRef}
            onSubmit={submit}
            noValidate
            aria-describedby="form-status"
            className="rounded-md border border-line bg-surface/60 p-6 sm:p-8"
          >
            <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">form / new-message</p>

            {/* Honeypot: hidden from people, bots tend to fill it in */}
            <div aria-hidden="true" className="hidden">
              <label>
                Company
                <input type="text" name="company" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <div className="space-y-5">
              {FIELDS.map((f, i) => {
                const error = touched[f.name] && errors[f.name];
                const common = {
                  id: `contact-${f.name}`,
                  name: f.name,
                  value: values[f.name],
                  onChange,
                  onBlur,
                  placeholder: f.placeholder,
                  maxLength: LIMITS[f.name],
                  required: true,
                  'aria-required': 'true',
                  'aria-invalid': error ? 'true' : 'false',
                  'aria-describedby': error ? `contact-${f.name}-error` : undefined,
                  className: cn(
                    'w-full rounded-sm border bg-bg/70 px-4 py-3 text-ink placeholder:text-muted/70 transition-colors focus:outline-none focus-visible:outline-none',
                    error ? 'border-red-400 focus:border-red-300' : 'border-line focus:border-accent',
                  ),
                };
                return (
                  <div key={f.name}>
                    <label htmlFor={common.id} className="mb-2 flex items-baseline justify-between font-mono text-xs uppercase tracking-wider text-muted">
                      <span>
                        <span className="text-accent">{String(i + 1).padStart(2, '0')}</span> / {f.label}
                        <span aria-hidden="true"> *</span>
                      </span>
                      {f.type === 'textarea' && (
                        <span className="normal-case tracking-normal" aria-hidden="true">
                          {values.message.length}/{LIMITS.message}
                        </span>
                      )}
                    </label>
                    {f.type === 'textarea' ? (
                      <textarea rows={6} {...common} className={cn(common.className, 'resize-y')} />
                    ) : (
                      <input type={f.type} autoComplete={f.autoComplete} {...common} />
                    )}
                    <AnimatePresence initial={false}>
                      {error && (
                        <motion.p
                          id={`contact-${f.name}-error`}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-2 flex items-center gap-1.5 text-sm text-red-300"
                        >
                          <CircleAlert className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                          {error}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            <div className="mt-7 flex flex-col-reverse items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p
                id="form-status"
                role="status"
                aria-live="polite"
                className={cn(
                  'flex min-h-[1.5rem] items-center gap-2 text-sm',
                  status.state === 'error' ? 'text-red-300' : status.state === 'idle' ? 'text-muted' : 'text-ink',
                )}
              >
                {StatusIcon && (
                  <StatusIcon
                    className={cn('h-4 w-4 shrink-0', status.state === 'sending' && 'animate-spin', status.state !== 'error' && 'text-accent')}
                    aria-hidden="true"
                  />
                )}
                {status.message}
              </p>
              <Button type="submit" icon={<Send />} disabled={status.state === 'sending'} data-cursor="send">
                Send Message
              </Button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
