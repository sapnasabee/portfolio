import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Check, CircleCheck, MapPin, Radio, WifiOff } from 'lucide-react';
import { useId, useState } from 'react';
import { projects, type Project } from '../data/content';
import { onSpotlightMove, PhoneFrame, Reveal, SectionHeading, StatusBar } from './ui';

const TABS = ['Overview', 'Challenge', 'My role', 'Build', 'Impact'] as const;
type Tab = (typeof TABS)[number];

/* Illustrative concept screens — clearly labelled, never presented as product screenshots. */

function TrackAssetConcept() {
  return (
    <PhoneFrame>
      <StatusBar right={<WifiOff className="size-2.5 text-amber-300" />} />
      <div className="flex h-full flex-col gap-2.5 px-3.5 pb-6 pt-6">
        <div className="flex items-center justify-between">
          <p className="text-[13px] font-medium">Switch inspection</p>
          <span className="rounded-full bg-amber-300/10 px-2 py-0.5 font-mono text-[8.5px] text-amber-200">OFFLINE</span>
        </div>
        <div className="relative h-28 overflow-hidden rounded-2xl border border-white/[0.07] bg-[#10141a]">
          <div
            className="absolute inset-0 opacity-60"
            style={{ backgroundImage: 'repeating-linear-gradient(115deg, transparent 0 18px, rgb(255 255 255 / 0.035) 18px 19px)' }}
          />
          <svg viewBox="0 0 200 110" className="absolute inset-0 h-full w-full">
            <path d="M-10 90 C 50 70, 80 40, 210 30" stroke="rgb(255 255 255 / 0.25)" strokeWidth="5" fill="none" />
            <path d="M-10 90 C 50 70, 80 40, 210 30" stroke="#0b0d10" strokeWidth="1.5" strokeDasharray="3 4" fill="none" />
            <circle cx="104" cy="45" r="6" fill="#3ddc84" />
            <circle cx="104" cy="45" r="13" fill="#3ddc84" fillOpacity="0.2" />
          </svg>
          <span className="absolute bottom-2 left-2 flex items-center gap-1 rounded-md bg-black/50 px-1.5 py-0.5 font-mono text-[8px] text-white/80">
            <MapPin className="size-2.5" /> GPS lock
          </span>
        </div>
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-3 text-[10.5px]">
          {[
            ['Asset tag', 'RFID read', 'text-droid'],
            ['Points & frog', 'OK', 'text-droid'],
            ['Defect', '1 logged', 'text-amber-200'],
          ].map(([k, v, c]) => (
            <div key={k} className="flex justify-between py-1">
              <span className="text-muted">{k}</span>
              <span className={`font-mono ${c}`}>{v}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-3 text-[10px]">
          <Radio className="size-3.5 text-droid" />
          <span className="text-muted">Saved locally · will sync when online</span>
        </div>
        <div className="mt-auto rounded-xl bg-droid py-2.5 text-center text-[11px] font-semibold text-bg">Complete inspection</div>
      </div>
    </PhoneFrame>
  );
}

function HealthBasixConcept() {
  return (
    <PhoneFrame>
      <StatusBar right={<span className="size-1.5 rounded-full bg-iris" />} />
      <div className="flex h-full flex-col gap-2.5 px-3.5 pb-6 pt-6">
        <p className="text-[13px] font-medium">Health assessment</p>
        <div className="flex items-center gap-2.5 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-3">
          <span className="grid size-9 place-items-center rounded-full bg-iris/15 text-[11px] font-semibold text-iris">ST</span>
          <div>
            <p className="text-[11px] font-medium">Student profile</p>
            <p className="text-[9px] text-muted">Annual screening</p>
          </div>
        </div>
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-3">
          <p className="mb-1.5 font-mono text-[8.5px] uppercase tracking-widest text-muted">Screening</p>
          {['Vision', 'Hearing', 'Dental', 'BMI'].map((k, i) => (
            <div key={k} className="flex items-center justify-between py-1 text-[10.5px]">
              <span className="text-fg/80">{k}</span>
              {i < 3 ? <CircleCheck className="size-3.5 text-iris" /> : <span className="size-3.5 rounded-full border border-white/20" />}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {['Nurse notes', 'Counseling'].map((t) => (
            <div key={t} className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-2.5 text-[9.5px] text-muted">
              {t}
            </div>
          ))}
        </div>
        <div className="mt-auto rounded-xl bg-iris py-2.5 text-center text-[11px] font-semibold text-bg">Share report with parent</div>
      </div>
    </PhoneFrame>
  );
}

function TabPanel({ project, tab }: { project: Project; tab: Tab }) {
  const dot = project.accent === 'droid' ? 'bg-droid' : 'bg-iris';
  switch (tab) {
    case 'Overview':
      return (
        <div className="space-y-6">
          <p className="leading-relaxed text-fg/85">{project.overview}</p>
          <div>
            <p className="eyebrow mb-3">Key features</p>
            <ul className="flex flex-wrap gap-1.5">
              {project.features.map((f) => (
                <li key={f} className="chip">
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    case 'Challenge':
      return (
        <div className="space-y-5">
          <p className="leading-relaxed text-fg/85">{project.problem}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {project.challenges.map((c) => (
              <div key={c.title} className="rounded-2xl border border-line bg-white/[0.02] p-4">
                <p className="text-[14px] font-medium">{c.title}</p>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      );
    case 'My role':
      return (
        <div className="space-y-5">
          <p className="leading-relaxed text-fg/85">{project.role}</p>
          <ul className="space-y-2.5">
            {project.responsibilities.map((r) => (
              <li key={r} className="flex gap-3 text-[14.5px] text-muted">
                <Check className={`mt-0.5 size-4 shrink-0 ${project.accent === 'droid' ? 'text-droid' : 'text-iris'}`} />
                {r}
              </li>
            ))}
          </ul>
        </div>
      );
    case 'Build':
      return (
        <div>
          <p className="eyebrow mb-3">{project.id === 'healthbasix' ? 'Technologies & delivery' : 'Technologies'}</p>
          <ul className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <li key={t} className="rounded-xl border border-line bg-white/[0.03] px-3.5 py-2 font-mono text-[12.5px]">
                {t}
              </li>
            ))}
          </ul>
        </div>
      );
    case 'Impact':
      return (
        <ul className="space-y-3">
          {project.impact.map((m) => (
            <li key={m} className="flex gap-3 leading-relaxed text-fg/85">
              <span className={`mt-2.5 size-1.5 shrink-0 rounded-full ${dot}`} />
              {m}
            </li>
          ))}
        </ul>
      );
  }
}

function CaseStudy({ project, index }: { project: Project; index: number }) {
  const [tab, setTab] = useState<Tab>('Overview');
  const uid = useId();
  const flip = index % 2 === 1;
  const accentText = project.accent === 'droid' ? 'text-droid' : 'text-iris';
  const glow = project.accent === 'droid' ? 'bg-droid/20' : 'bg-iris/20';

  return (
    <Reveal>
      <article
        onPointerMove={onSpotlightMove}
        aria-labelledby={`${uid}-title`}
        className="spotlight card overflow-hidden"
      >
        <div className={`grid lg:grid-cols-[0.8fr_1.2fr] ${flip ? 'lg:[&>*:first-child]:order-2' : ''}`}>
          {/* Visual */}
          <div className="relative flex min-h-[460px] flex-col items-center justify-center overflow-hidden border-b border-line bg-[#0b0d10] px-6 py-12 lg:border-b-0 lg:border-r">
            <div aria-hidden="true" className={`absolute left-1/2 top-1/2 size-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full ${glow} blur-[90px]`} />
            <motion.div whileHover={{ rotate: 0, y: -6 }} initial={{ rotate: flip ? 3 : -3 }} transition={{ type: 'spring', stiffness: 120 }} className="relative">
              {project.id === 'trackasset' ? <TrackAssetConcept /> : <HealthBasixConcept />}
            </motion.div>
            <p className="relative mt-6 font-mono text-[10.5px] text-subtle">Illustrative concept — not a product screenshot</p>
          </div>

          {/* Content */}
          <div className="p-7 sm:p-10">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className={`font-mono text-[11.5px] uppercase tracking-[0.14em] ${accentText}`}>{project.category}</p>
              <span className="font-mono text-[11.5px] text-subtle">{project.period}</span>
            </div>
            <h3 id={`${uid}-title`} className="mt-4 text-[clamp(2.2rem,4vw,3.2rem)] font-medium leading-none tracking-[-0.04em]">
              {project.name}
            </h3>
            <p className="mt-4 max-w-xl text-[16.5px] leading-relaxed text-muted">{project.summary}</p>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-[12.5px] text-fg/80">
              <span className={`size-1.5 rounded-full ${project.accent === 'droid' ? 'bg-droid' : 'bg-iris'}`} />
              {project.roleTitle}
            </p>

            <div role="tablist" aria-label={`${project.name} case study`} className="mt-9 flex gap-1 overflow-x-auto overflow-y-hidden border-b border-line [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {TABS.map((t) => (
                <button
                  key={t}
                  role="tab"
                  type="button"
                  id={`${uid}-tab-${t}`}
                  aria-selected={tab === t}
                  aria-controls={`${uid}-panel`}
                  onClick={() => setTab(t)}
                  className={`relative shrink-0 px-3.5 pb-3 pt-1 text-[13.5px] transition-colors ${tab === t ? 'text-fg' : 'text-muted hover:text-fg'}`}
                >
                  {t}
                  {tab === t && (
                    <motion.span
                      layoutId={`${uid}-underline`}
                      className={`absolute inset-x-2 bottom-0 h-[2px] rounded-full ${project.accent === 'droid' ? 'bg-droid' : 'bg-iris'}`}
                    />
                  )}
                </button>
              ))}
            </div>

            <div id={`${uid}-panel`} role="tabpanel" aria-labelledby={`${uid}-tab-${tab}`} className="min-h-[230px] pt-7">
              <AnimatePresence mode="wait">
                <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }}>
                  <TabPanel project={project} tab={tab} />
                </motion.div>
              </AnimatePresence>
            </div>

            {project.link && (
              <a
                href={project.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group mt-6 inline-flex items-center gap-1.5 text-[14px] font-medium ${accentText}`}
              >
                {project.link.label}
                <ArrowUpRight className="size-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="relative py-28 md:py-36">
      <div className="container-x">
        <SectionHeading
          id="projects-title"
          index="03"
          label="Featured work"
          title="Two products."
          accent="One Android developer."
          intro="On both, I was the only Android developer — and on Health Basix I also lead the product and the team. Explore each case study."
        />
        <div className="space-y-8">
          {projects.map((p, i) => (
            <CaseStudy key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
