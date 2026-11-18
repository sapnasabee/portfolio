import { animate, motion, useInView } from 'framer-motion';
import { Handshake, PackageCheck, Repeat, Rocket, Target, Users, type LucideIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { achievements, leadership, lifecycle } from '../data/content';
import { onSpotlightMove, Reveal, SectionHeading } from './ui';

const icons: Record<(typeof leadership)[number]['icon'], LucideIcon> = {
  users: Users,
  target: Target,
  handshake: Handshake,
  package: PackageCheck,
  repeat: Repeat,
  rocket: Rocket,
};

export function Leadership() {
  return (
    <section id="leadership" aria-labelledby="leadership-title" className="relative py-28 md:py-36">
      <div className="container-x">
        <SectionHeading
          id="leadership-title"
          index="06"
          label="Leadership & product delivery"
          title="I lead from"
          accent="inside the code."
          intro="Years of shipping Android apps shape how I run teams: clear requirements, honest estimates, and releases that hold up in production."
        />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {leadership.map((l, i) => {
            const Icon = icons[l.icon];
            return (
              <Reveal key={l.title} delay={(i % 3) * 0.07}>
                <div onPointerMove={onSpotlightMove} className="spotlight card group h-full p-7 transition-colors hover:border-white/15">
                  <span className="grid size-11 place-items-center rounded-2xl border border-line bg-white/[0.03] text-fg/80 transition-colors group-hover:border-droid/30 group-hover:text-droid">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-6 text-[17px] font-medium tracking-tight">{l.title}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{l.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-6">
          <div className="card overflow-hidden p-7 sm:p-9">
            <p className="eyebrow mb-7">Lifecycle I own — requirement to release</p>
            <ol className="grid grid-cols-2 gap-y-6 sm:grid-cols-4 lg:grid-cols-8">
              {lifecycle.map((s, i) => (
                <motion.li
                  key={s}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.08, duration: 0.5 }}
                  className="relative pr-3"
                >
                  <div className="mb-3 flex items-center gap-2">
                    <span className="grid size-7 place-items-center rounded-full border border-droid/40 font-mono text-[11px] text-droid">{i + 1}</span>
                    {i < lifecycle.length - 1 && (
                      <motion.span
                        className="hidden h-px flex-1 origin-left bg-gradient-to-r from-droid/60 to-white/10 lg:block"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.08, duration: 0.6 }}
                      />
                    )}
                  </div>
                  <p className="text-[14px] font-medium">{s}</p>
                </motion.li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.6, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setN(Math.round(v)) });
    // Always land on the exact value, even if frames are throttled or the animation is interrupted.
    const done = setTimeout(() => setN(to), 1800);
    return () => {
      c.stop();
      clearTimeout(done);
    };
  }, [inView, to]);
  return (
    <span ref={ref}>
      <span aria-hidden="true">
        {n}
        {suffix}
      </span>
      <span className="sr-only">
        {to}
        {suffix}
      </span>
    </span>
  );
}

export function Achievements() {
  return (
    <section aria-labelledby="achievements-title" className="relative py-28 md:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-1/2 h-[420px] -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgb(61_220_132/0.07),transparent_65%)]" />
      <div className="container-x relative">
        <SectionHeading id="achievements-title" index="07" label="Career achievements" title="The numbers" accent="behind the work." />
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line lg:grid-cols-5">
          {achievements.map((a, i) => (
            <Reveal key={a.label} delay={i * 0.06} className={`bg-bg p-7 sm:p-8 ${i === achievements.length - 1 ? 'col-span-2 lg:col-span-1' : ''}`}>
              <p className="text-[clamp(2.6rem,5vw,3.6rem)] font-medium leading-none tracking-[-0.04em] text-gradient">
                <CountUp to={a.value} suffix={a.suffix} />
              </p>
              <p className="mt-4 text-[14.5px] font-medium">{a.label}</p>
              <p className="mt-1 text-[13px] leading-snug text-muted">{a.note}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
