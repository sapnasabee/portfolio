import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { ArrowUp, Download, Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { nav, profile } from '../data/content';
import { useActiveSection } from '../hooks/useActiveSection';
import { BrandMark } from './ui';

const ids = nav.map((n) => n.id);

export function Nav() {
  const active = useActiveSection(ids);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div className="h-px origin-left bg-gradient-to-r from-droid to-iris" style={{ scaleX: progress }} />
      <div className={`container-x transition-[padding] duration-300 ${scrolled ? 'pt-3' : 'pt-5'}`}>
        <nav
          aria-label="Primary"
          className={`flex items-center justify-between rounded-2xl px-3 py-2.5 transition-colors duration-300 ${
            scrolled ? 'glass shadow-[0_10px_40px_-15px_rgb(0_0_0/0.8)]' : 'border border-transparent'
          }`}
        >
          <a href="#top" className="flex items-center gap-3 rounded-xl pr-2" aria-label={`${profile.name} — home`}>
            <BrandMark />
            <span className="hidden text-sm font-medium tracking-tight sm:block">{profile.name}</span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {nav.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  aria-current={active === n.id ? 'true' : undefined}
                  className={`relative block rounded-lg px-3.5 py-2 text-[13.5px] transition-colors ${
                    active === n.id ? 'text-fg' : 'text-muted hover:text-fg'
                  }`}
                >
                  {active === n.id && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-lg bg-white/[0.06]"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  {n.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={profile.resumeUrl}
              download={profile.resumeFileName}
              className="hidden items-center gap-2 rounded-xl bg-fg px-4 py-2 text-[13px] font-medium text-bg transition hover:bg-droid sm:inline-flex"
            >
              <Download className="size-3.5" /> Resume
            </a>
            <button
              type="button"
              className="grid size-10 place-items-center rounded-xl border border-line lg:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="glass mt-2 rounded-2xl p-2 lg:hidden"
            >
              {nav.map((n) => (
                <a
                  key={n.id}
                  href={`#${n.id}`}
                  onClick={() => setOpen(false)}
                  className={`block rounded-xl px-4 py-3 text-[15px] ${active === n.id ? 'bg-white/[0.06] text-fg' : 'text-muted'}`}
                >
                  {n.label}
                </a>
              ))}
              <a
                href={profile.resumeUrl}
                download={profile.resumeFileName}
                className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-fg px-4 py-3 text-[14px] font-medium text-bg"
              >
                <Download className="size-4" /> Download resume
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

/** A soft light that trails the pointer. Desktop pointers only; off for reduced motion. */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce || !window.matchMedia('(pointer: fine)').matches) return;
    let raf = 0;
    let x = 0;
    let y = 0;
    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf)
        raf = requestAnimationFrame(() => {
          raf = 0;
          if (ref.current) {
            ref.current.style.transform = `translate3d(${x - 300}px, ${y - 300}px, 0)`;
            ref.current.style.opacity = '1';
          }
        });
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => {
      window.removeEventListener('pointermove', move);
      cancelAnimationFrame(raf);
    };
  }, [reduce]);
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-0 size-[600px] rounded-full opacity-0 transition-opacity duration-700"
      style={{ background: 'radial-gradient(circle, rgb(138 155 255 / 0.07), transparent 60%)' }}
    />
  );
}

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 900);
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href="#top"
          aria-label="Back to top"
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.9 }}
          whileHover={{ y: -3 }}
          className="glass fixed bottom-6 right-6 z-40 grid size-12 place-items-center rounded-2xl text-fg"
        >
          <ArrowUp className="size-4" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
