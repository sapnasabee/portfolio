import { Quote } from 'lucide-react';
import { about } from '../data/content';
import { Reveal, SectionHeading } from './ui';

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative py-28 md:py-36">
      <div className="container-x">
        <SectionHeading id="about-title" index="01" label="About" title="Engineer first." accent="Leader by practice." />

        <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Reveal>
              <p className="text-[clamp(1.3rem,2.2vw,1.65rem)] leading-[1.45] tracking-[-0.015em] text-fg/90">{about.lead}</p>
            </Reveal>

            <ol className="mt-14 space-y-2">
              {about.chapters.map((c, i) => (
                <Reveal key={c.title} delay={i * 0.08}>
                  <li className="group grid gap-2 border-t border-line py-7 sm:grid-cols-[150px_1fr] sm:gap-8">
                    <span className="font-mono text-[12px] text-subtle transition-colors group-hover:text-droid">{c.years}</span>
                    <div>
                      <h3 className="text-[18px] font-medium tracking-tight">{c.title}</h3>
                      <p className="mt-2 leading-relaxed text-muted">{c.text}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>

          <div className="space-y-5 lg:pt-2">
            <Reveal>
              <p className="eyebrow mb-4">How I work</p>
            </Reveal>
            {about.principles.map((p, i) => (
              <Reveal key={p} delay={i * 0.1}>
                <figure className="card relative overflow-hidden p-7">
                  <Quote className="mb-4 size-5 text-droid/70" aria-hidden="true" />
                  <blockquote className="font-serif text-[1.45rem] leading-[1.3] text-fg/90">{p}</blockquote>
                </figure>
              </Reveal>
            ))}
            <Reveal delay={0.3}>
              <div className="pt-4">
                <p className="eyebrow mb-3">Industries</p>
                <div className="flex flex-wrap gap-2">
                  {about.industries.map((i) => (
                    <span key={i} className="chip">
                      {i}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
