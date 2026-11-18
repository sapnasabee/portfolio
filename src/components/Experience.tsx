import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { ChevronDown, GraduationCap } from 'lucide-react';
import { useId, useRef, useState } from 'react';
import { education, experience, type Job } from '../data/content';
import { onSpotlightMove, Reveal, SectionHeading } from './ui';

function JobCard({ job, defaultOpen }: { job: Job; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  const accent = job.focus !== 'Android' ? 'text-iris border-iris/30 bg-iris/10' : 'text-droid border-droid/30 bg-droid/10';

  return (
    <div onPointerMove={onSpotlightMove} className="spotlight card p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="text-[19px] font-medium tracking-tight">{job.title}</h3>
          <p className="mt-1 text-[15px] text-fg/70">{job.company}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`rounded-full border px-2.5 py-0.5 font-mono text-[10.5px] uppercase tracking-wider ${accent}`}>{job.focus}</span>
          <span className="whitespace-nowrap rounded-full border border-line px-3 py-1 font-mono text-[11.5px] text-muted">
            {job.start} — {job.end}
          </span>
        </div>
      </div>
      <p className="mt-4 text-muted">{job.summary}</p>

      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className="mt-5 inline-flex items-center gap-1.5 text-[13.5px] text-fg/80 transition hover:text-fg"
      >
        {open ? 'Hide details' : 'Show details'}
        <ChevronDown className={`size-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className={`grid gap-8 pt-6 ${job.achievements ? 'md:grid-cols-2' : ''}`}>
              <div>
                <p className="eyebrow mb-3">Responsibilities</p>
                <ul className="space-y-2">
                  {job.responsibilities.map((r) => (
                    <li key={r} className="flex gap-3 text-[14.5px] leading-relaxed text-muted">
                      <span className="mt-2.5 h-px w-3 shrink-0 bg-white/30" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
              {job.achievements && (
                <div>
                  <p className="eyebrow mb-3">Achievements</p>
                  <ul className="space-y-2">
                    {job.achievements.map((a) => (
                      <li key={a} className="flex gap-3 text-[14.5px] leading-relaxed text-fg/85">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-droid" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <ul className="mt-6 flex flex-wrap gap-1.5">
              {job.tech.map((t) => (
                <li key={t} className="rounded-lg bg-white/[0.04] px-2.5 py-1 font-mono text-[11.5px] text-fg/70">
                  {t}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Experience() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  return (
    <section id="experience" aria-labelledby="experience-title" className="relative py-28 md:py-36">
      <div className="container-x">
        <SectionHeading
          id="experience-title"
          index="05"
          label="Experience"
          title="From Android developer"
          accent="to product owner."
          intro="Ten years, four companies — each step adding ownership: of code, of clients, then of the product."
        />

        <ol ref={ref} className="relative space-y-6 pl-10 sm:pl-14">
          <span aria-hidden="true" className="absolute bottom-2 left-[11px] top-2 w-px bg-line sm:left-[19px]" />
          <motion.span
            aria-hidden="true"
            style={{ scaleY }}
            className="absolute bottom-2 left-[11px] top-2 w-px origin-top bg-gradient-to-b from-droid via-iris to-droid sm:left-[19px]"
          />
          {experience.map((job, i) => (
            <li key={job.company} className="relative">
              <span
                aria-hidden="true"
                className={`absolute -left-10 top-8 grid size-[23px] place-items-center rounded-full border bg-bg sm:-left-14 sm:size-[39px] ${
                  job.current ? 'border-droid/60' : 'border-line'
                }`}
              >
                <span className={`size-2 rounded-full ${job.current ? 'bg-droid shadow-[0_0_12px_3px_rgb(61_220_132/0.5)]' : 'bg-white/30'}`} />
              </span>
              <Reveal delay={i * 0.05}>
                <JobCard job={job} defaultOpen={i === 0} />
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal className="mt-16">
          <p className="eyebrow mb-5 flex items-center gap-2">
            <GraduationCap className="size-4" /> Education
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {education.map((e) => (
              <div key={e.degree} className="card flex items-center justify-between gap-4 p-6">
                <div>
                  <p className="font-medium">{e.degree}</p>
                  <p className="mt-0.5 text-[14px] text-muted">{e.school}</p>
                </div>
                <span className="whitespace-nowrap font-mono text-[11.5px] text-subtle">{e.period}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
