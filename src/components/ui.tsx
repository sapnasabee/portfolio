import { motion, type HTMLMotionProps } from 'framer-motion';
import type { PointerEvent, ReactNode } from 'react';

/** Brand monogram: "SA" in a rounded tile with an Android-green status light. */
export function BrandMark({ size = 36 }: { size?: number }) {
  return (
    <span
      className="relative inline-grid place-items-center rounded-[11px] border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.01] font-semibold tracking-tight text-fg"
      style={{ width: size, height: size, fontSize: size * 0.36 }}
      aria-hidden="true"
    >
      SA
      <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-droid shadow-[0_0_10px_2px_rgb(61_220_132/0.55)]" />
    </span>
  );
}

export function LinkedInIcon({ className = 'size-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

/** Fades content up as it scrolls into view. Respects reduced motion via <MotionConfig>. */
export function Reveal({ children, delay = 0, y = 24, ...rest }: HTMLMotionProps<'div'> & { delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  index,
  label,
  title,
  accent,
  intro,
  id,
}: {
  index: string;
  label: string;
  title: string;
  accent?: string;
  intro?: string;
  id: string;
}) {
  return (
    <Reveal className="mb-14 max-w-3xl md:mb-20">
      <p className="eyebrow mb-5 flex items-center gap-3">
        <span className="text-droid">{index}</span>
        <span className="h-px w-8 bg-line" />
        {label}
      </p>
      <h2 id={id} className="text-[clamp(2.1rem,4.6vw,3.6rem)] font-medium leading-[1.04] tracking-[-0.035em]">
        {title} {accent && <span className="font-serif text-[1.08em] font-normal italic tracking-normal text-iris">{accent}</span>}
      </h2>
      {intro && <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-muted">{intro}</p>}
    </Reveal>
  );
}

/** Sets --mx/--my CSS vars so `.spotlight` can follow the pointer. */
export function onSpotlightMove(e: PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
}

/** Android-style phone frame (punch-hole camera). Content is passed in as children. */
export function PhoneFrame({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`relative aspect-[9/19] w-[250px] rounded-[42px] border border-white/15 bg-gradient-to-b from-[#1b1e24] to-[#0c0e11] p-[9px] shadow-[0_50px_100px_-30px_rgb(0_0_0/0.9),0_0_0_1px_rgb(255_255_255/0.03)_inset] ${className}`}
    >
      <div className="relative h-full overflow-hidden rounded-[34px] bg-[#0b0d10]">
        <span className="absolute left-1/2 top-3 z-10 size-3 -translate-x-1/2 rounded-full bg-black ring-1 ring-white/10" />
        {children}
      </div>
    </div>
  );
}

export function StatusBar({ right }: { right?: ReactNode }) {
  return (
    <div className="flex items-center justify-between px-5 pt-3 font-mono text-[9.5px] text-white/70">
      <span>9:41</span>
      <span className="flex items-center gap-1.5">{right}</span>
    </div>
  );
}
