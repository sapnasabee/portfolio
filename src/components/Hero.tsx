import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Download, HeartPulse, TrainFront, WifiOff } from 'lucide-react';
import { useEffect, useState } from 'react';
import { hero, profile } from '../data/content';
import { PhoneFrame, StatusBar } from './ui';

const ease = [0.22, 1, 0.36, 1] as const;

const codeLines: { t: string; c: string }[][] = [
  [{ t: 'class ', c: 'text-iris' }, { t: 'Sabana', c: 'text-droid' }, { t: ' : AndroidEngineer {', c: 'text-white/80' }],
  [{ t: '  val ', c: 'text-iris' }, { t: 'languages = ', c: 'text-white/80' }, { t: 'listOf("Kotlin", "Java")', c: 'text-amber-200/90' }],
  [{ t: '  val ', c: 'text-iris' }, { t: 'storage = ', c: 'text-white/80' }, { t: 'Room', c: 'text-droid' }, { t: ' + ', c: 'text-white/50' }, { t: 'SQLite', c: 'text-droid' }],
  [{ t: '  val ', c: 'text-iris' }, { t: 'team = ', c: 'text-white/80' }, { t: 'Team', c: 'text-droid' }, { t: '(size = ', c: 'text-white/80' }, { t: '10', c: 'text-amber-200/90' }, { t: ')', c: 'text-white/80' }],
  [{ t: '', c: '' }],
  [{ t: '  fun ', c: 'text-iris' }, { t: 'ship', c: 'text-sky-300' }, { t: '(idea: Requirement) =', c: 'text-white/80' }],
  [{ t: '    idea.', c: 'text-white/80' }, { t: 'build', c: 'text-sky-300' }, { t: '().', c: 'text-white/80' }, { t: 'test', c: 'text-sky-300' }, { t: '().', c: 'text-white/80' }, { t: 'release', c: 'text-sky-300' }, { t: '()', c: 'text-white/80' }],
  [{ t: '}', c: 'text-white/80' }],
];

function CodeCard() {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(reduce ? codeLines.length : 0);
  useEffect(() => {
    if (reduce) return;
    if (shown >= codeLines.length) return;
    const t = setTimeout(() => setShown((s) => s + 1), shown === 0 ? 900 : 260);
    return () => clearTimeout(t);
  }, [shown, reduce]);

  return (
    <div className="w-[330px] rounded-2xl border border-white/10 bg-[#0e1013]/90 p-4 shadow-[0_30px_80px_-30px_rgb(0_0_0/0.9)] backdrop-blur-xl">
      <div className="mb-3 flex items-center gap-1.5">
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="ml-3 font-mono text-[10.5px] text-muted">Sabana.kt</span>
      </div>
      <pre className="font-mono text-[11.5px] leading-[1.75]" aria-hidden="true">
        {codeLines.map((line, i) => (
          <div key={i} className={`transition-opacity duration-300 ${i < shown ? 'opacity-100' : 'opacity-0'}`}>
            <span className="mr-3 inline-block w-3 text-right text-white/20">{i + 1}</span>
            {line.map((tok, j) => (
              <span key={j} className={tok.c}>
                {tok.t}
              </span>
            ))}
            {i === shown - 1 && shown < codeLines.length && <span className="ml-0.5 inline-block h-3 w-[2px] translate-y-0.5 animate-pulse bg-droid" />}
          </div>
        ))}
      </pre>
    </div>
  );
}

function HeroPhone() {
  return (
    <PhoneFrame>
      <StatusBar right={<span className="size-1.5 rounded-full bg-droid" />} />
      <div className="flex h-full flex-col gap-3 px-4 pb-6 pt-7">
        <div className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-droid to-emerald-700 text-sm font-semibold text-bg">SA</span>
          <div>
            <p className="text-[13px] font-medium leading-tight">{profile.shortName}</p>
            <p className="text-[10px] text-muted">Android · PM · Product Owner</p>
          </div>
        </div>
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-3">
          <p className="mb-2 font-mono text-[9px] uppercase tracking-widest text-muted">Shipped</p>
          {[
            { icon: TrainFront, name: 'trackAsset', meta: 'Offline-first · USA', c: 'text-droid bg-droid/10' },
            { icon: HeartPulse, name: 'Health Basix', meta: '9 healthcare products', c: 'text-iris bg-iris/10' },
          ].map(({ icon: Icon, name, meta, c }) => (
            <div key={name} className="flex items-center gap-2.5 py-1.5">
              <span className={`grid size-8 place-items-center rounded-xl ${c}`}>
                <Icon className="size-4" />
              </span>
              <div>
                <p className="text-[11.5px] font-medium">{name}</p>
                <p className="text-[9.5px] text-muted">{meta}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-3">
          <div className="flex items-center justify-between text-[10px]">
            <span className="flex items-center gap-1.5 text-muted">
              <WifiOff className="size-3" /> Offline queue
            </span>
            <span className="font-mono text-droid">syncing</span>
          </div>
          <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-droid to-iris"
              initial={{ width: '8%' }}
              animate={{ width: ['8%', '100%'] }}
              transition={{ duration: 3.2, repeat: Infinity, repeatDelay: 1.2, ease: 'easeInOut' }}
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          {[
            ['10+', 'years'],
            ['10', 'team'],
            ['10K+', 'downloads'],
          ].map(([v, l]) => (
            <div key={l} className="rounded-xl bg-white/[0.03] py-2">
              <p className="text-[13px] font-semibold">{v}</p>
              <p className="text-[8.5px] uppercase tracking-wider text-muted">{l}</p>
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}

export function Hero() {
  return (
    <section id="top" aria-label="Introduction" className="relative overflow-hidden pb-24 pt-36 md:pb-32 md:pt-44">
      {/* Background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="grid-fade absolute inset-0" />
        <motion.div
          className="absolute -left-40 top-10 size-[560px] rounded-full bg-droid/[0.13] blur-[120px]"
          animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -right-32 top-40 size-[620px] rounded-full bg-iris/[0.14] blur-[130px]"
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
      </div>

      <div className="container-x relative grid items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="glass mb-8 inline-flex items-center gap-2.5 rounded-full px-3.5 py-1.5 text-[12.5px] text-fg/80"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-droid opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-droid" />
            </span>
            {hero.kicker}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05, ease }}
            className="text-[clamp(2.9rem,7.4vw,6rem)] font-medium leading-[0.95] tracking-[-0.045em]"
          >
            <span className="text-gradient">{profile.name}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
            className="mt-7 max-w-xl text-[clamp(1.35rem,2.4vw,1.85rem)] leading-[1.25] tracking-[-0.02em] text-fg/90"
          >
            {hero.headline[0]} <span className="font-serif text-[1.15em] italic text-droid">{hero.headline[1]}</span> {hero.headline[2]}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease }}
            className="mt-6 max-w-lg text-[16.5px] leading-relaxed text-muted"
          >
            {hero.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <a
              href={profile.resumeUrl}
              download={profile.resumeFileName}
              className="group inline-flex items-center gap-2.5 rounded-2xl bg-fg px-6 py-3.5 text-[14.5px] font-medium text-bg shadow-[0_10px_40px_-10px_rgb(61_220_132/0.5)] transition hover:bg-droid"
            >
              <Download className="size-4 transition group-hover:translate-y-0.5" />
              Download Resume
            </a>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2.5 rounded-2xl border border-line bg-white/[0.02] px-6 py-3.5 text-[14.5px] font-medium transition hover:border-white/25 hover:bg-white/[0.05]"
            >
              Let’s Connect
              <ArrowRight className="size-4 transition group-hover:translate-x-1" />
            </a>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-14 flex flex-wrap gap-x-8 gap-y-3 font-mono text-[11.5px] uppercase tracking-[0.14em] text-subtle"
          >
            <li>Kotlin · Java</li>
            <li>Offline-first</li>
            <li>Agile delivery</li>
            <li>Healthcare tech</li>
          </motion.ul>
        </div>

        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.2, ease }}
          className="relative mx-auto h-[540px] w-full max-w-[460px]"
          aria-hidden="true"
        >
          <motion.div
            className="absolute right-4 top-0 sm:right-10"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="rotate-[4deg]">
              <HeroPhone />
            </div>
          </motion.div>
          <motion.div
            className="absolute bottom-6 left-0 hidden sm:block"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          >
            <CodeCard />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
