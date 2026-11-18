import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Check, Copy, Download, LoaderCircle, Mail, Phone, Send } from 'lucide-react';
import { useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react';
import { nav, profile } from '../data/content';
import { BrandMark, LinkedInIcon, Reveal, SectionHeading } from './ui';

type Fields = { name: string; email: string; subject: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

/**
 * Optional: set VITE_FORMSPREE_ENDPOINT (e.g. https://formspree.io/f/xxxxxxx) to deliver
 * messages directly. Without it, the form opens the visitor's email app with the message
 * pre-filled — so it always works, with no backend.
 */
const ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined;

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = 'Please enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = 'Please enter a valid email address.';
  if (f.message.trim().length < 10) e.message = 'Please write at least 10 characters.';
  if (f.message.length > 3000) e.message = 'Please keep your message under 3000 characters.';
  return e;
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: keyof Fields;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[13px] text-fg/80">
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-1.5 text-[12.5px] text-rose-300"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputCls =
  'w-full rounded-xl border border-line bg-white/[0.03] px-4 py-3 text-[15px] text-fg placeholder:text-subtle outline-none transition focus:border-droid/50 focus:bg-white/[0.05] aria-[invalid=true]:border-rose-400/50';

function ContactForm() {
  const [f, setF] = useState<Fields>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'mailto' | 'error'>('idle');

  const set = (k: keyof Fields) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setF((p) => ({ ...p, [k]: e.target.value }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  async function submit(e: FormEvent) {
    e.preventDefault();
    const errs = validate(f);
    setErrors(errs);
    if (Object.keys(errs).length) {
      document.getElementById(Object.keys(errs)[0])?.focus();
      return;
    }
    const subject = f.subject.trim() || `Portfolio enquiry from ${f.name.trim()}`;

    if (ENDPOINT) {
      setStatus('sending');
      try {
        const res = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ name: f.name, email: f.email, subject, message: f.message }),
        });
        if (!res.ok) throw new Error(String(res.status));
        setStatus('sent');
        setF({ name: '', email: '', subject: '', message: '' });
      } catch {
        setStatus('error');
      }
      return;
    }

    const body = `${f.message.trim()}\n\n— ${f.name.trim()} (${f.email.trim()})`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus('mailto');
  }

  return (
    <form noValidate onSubmit={submit} className="card space-y-5 p-6 sm:p-9" aria-label="Contact form">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name" error={errors.name}>
          <input
            id="name"
            name="name"
            autoComplete="name"
            value={f.name}
            onChange={set('name')}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={inputCls}
            placeholder="Your name"
          />
        </Field>
        <Field id="email" label="Email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={f.email}
            onChange={set('email')}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={inputCls}
            placeholder="you@company.com"
          />
        </Field>
      </div>
      <Field id="subject" label="Subject (optional)">
        <input id="subject" name="subject" value={f.subject} onChange={set('subject')} className={inputCls} placeholder="Android role, project, collaboration…" />
      </Field>
      <Field id="message" label="Message" error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={f.message}
          onChange={set('message')}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className={`${inputCls} resize-none`}
          placeholder="Tell me a little about what you’re building."
        />
      </Field>
      <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
        <p role="status" aria-live="polite" className="text-[13px] text-muted">
          {status === 'sent' && <span className="text-droid">Thanks — your message has been sent.</span>}
          {status === 'mailto' && 'Your email app should open with the message ready to send.'}
          {status === 'error' && <span className="text-rose-300">Something went wrong. Please email me directly.</span>}
        </p>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="group inline-flex items-center gap-2 rounded-xl bg-fg px-6 py-3 text-[14.5px] font-medium text-bg transition hover:bg-droid disabled:opacity-60"
        >
          {status === 'sending' ? <LoaderCircle className="size-4 animate-spin" /> : <Send className="size-4 transition group-hover:translate-x-0.5" />}
          Send message
        </button>
      </div>
    </form>
  );
}

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(profile.email);
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        } catch {
          /* clipboard unavailable — the mailto link still works */
        }
      }}
      aria-label={copied ? 'Email copied' : 'Copy email address'}
      className="grid size-9 shrink-0 place-items-center rounded-lg border border-line text-muted transition hover:text-fg"
    >
      {copied ? <Check className="size-4 text-droid" /> : <Copy className="size-4" />}
    </button>
  );
}

export function Contact() {
  const links = [
    { icon: <Mail className="size-4" />, label: 'Email', value: profile.email, href: `mailto:${profile.email}`, extra: <CopyEmail /> },
    { icon: <LinkedInIcon />, label: 'LinkedIn', value: profile.linkedinHandle, href: profile.linkedin, external: true },
    { icon: <Phone className="size-4" />, label: 'Phone', value: profile.phone, href: profile.phoneHref },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden py-28 md:py-36">
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 left-1/2 size-[700px] -translate-x-1/2 rounded-full bg-iris/[0.08] blur-[140px]" />
      <div className="container-x relative">
        <SectionHeading
          id="contact-title"
          index="08"
          label="Contact"
          title="Building something for Android?"
          accent="Let’s talk."
          intro="Open to Android engineering, technical project management and product ownership roles — and to conversations about mobile products."
        />

        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal className="space-y-3">
            {links.map((l) => (
              <div key={l.label} className="card flex items-center gap-3 p-4 pr-4 transition-colors hover:border-white/15">
                <a
                  href={l.href}
                  {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group flex min-w-0 flex-1 items-center gap-4"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-line bg-white/[0.03] text-fg/80 transition group-hover:text-droid">
                    {l.icon}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-[10.5px] uppercase tracking-widest text-subtle">{l.label}</span>
                    <span className="block truncate text-[15px]">{l.value}</span>
                  </span>
                  <ArrowUpRight className="ml-auto size-4 shrink-0 text-subtle transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" />
                </a>
                {l.extra}
              </div>
            ))}
            <a
              href={profile.resumeUrl}
              download={profile.resumeFileName}
              className="group flex items-center justify-between rounded-3xl bg-gradient-to-br from-droid/90 to-emerald-600 p-6 text-bg transition hover:brightness-110"
            >
              <span>
                <span className="block text-[17px] font-semibold">Download resume</span>
                <span className="block text-[13px] opacity-75">PDF · 2 pages</span>
              </span>
              <span className="grid size-11 place-items-center rounded-2xl bg-bg/15">
                <Download className="size-5 transition group-hover:translate-y-0.5" />
              </span>
            </a>
          </Reveal>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line py-12">
      <div className="container-x flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <BrandMark size={32} />
          <div>
            <p className="text-[14px] font-medium">{profile.name}</p>
            <p className="text-[12.5px] text-muted">Android Engineer · Technical Project Manager</p>
          </div>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[13.5px] text-muted">
            {nav.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} className="transition hover:text-fg">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="container-x mt-10 flex flex-col gap-2 text-[12px] text-subtle sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        <p>Phone screens in case studies are illustrative concepts, not product screenshots.</p>
      </div>
    </footer>
  );
}
