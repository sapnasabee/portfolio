import { AnimatePresence, motion } from 'framer-motion';
import {
  Activity,
  Bell,
  Building2,
  CalendarCheck,
  Check,
  FileText,
  FolderHeart,
  HeartPulse,
  Home,
  ImageIcon,
  Leaf,
  Lightbulb,
  Pill,
  Plus,
  RefreshCw,
  ShieldCheck,
  Stethoscope,
  Syringe,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { useState } from 'react';
import { healthApps, healthAppsShowcase, type HealthApp } from '../data/content';
import { onSpotlightMove, PhoneFrame, Reveal, SectionHeading } from './ui';

type Theme = { icon: LucideIcon; text: string; bg: string; ring: string; glow: string; solid: string };

const themes: Record<HealthApp['id'], Theme> = {
  parent: { icon: Users, text: 'text-teal-300', bg: 'bg-teal-400/10', ring: 'border-teal-300/40', glow: 'bg-teal-400/25', solid: 'bg-teal-500' },
  carestation: { icon: Stethoscope, text: 'text-sky-300', bg: 'bg-sky-400/10', ring: 'border-sky-300/40', glow: 'bg-blue-500/30', solid: 'bg-blue-600' },
  wellness: { icon: Leaf, text: 'text-emerald-300', bg: 'bg-emerald-400/10', ring: 'border-emerald-300/40', glow: 'bg-emerald-400/25', solid: 'bg-emerald-500' },
};

/* ---------- Illustrative concept screens (sample data, not production UI) ---------- */

function LightStatus({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`flex items-center justify-between px-5 pt-3 font-mono text-[9px] ${dark ? 'text-white/85' : 'text-slate-700'}`}>
      <span>9:41</span>
      <span className="flex items-center gap-1">
        <span className={`h-1.5 w-3 rounded-sm ${dark ? 'bg-white/80' : 'bg-slate-700'}`} />
      </span>
    </div>
  );
}

function TabBar({ items, color }: { items: [LucideIcon, string][]; color: string }) {
  return (
    <div className="mt-auto grid grid-cols-4 border-t border-slate-200 bg-white px-1 pb-3 pt-2">
      {items.map(([Icon, label], i) => (
        <div key={label} className={`flex flex-col items-center gap-0.5 text-[7.5px] ${i === 0 ? color : 'text-slate-400'}`}>
          <Icon className="size-3.5" />
          {label}
        </div>
      ))}
    </div>
  );
}

function ParentScreen() {
  const tiles: [LucideIcon, string][] = [
    [FolderHeart, 'Health Records'],
    [Syringe, 'Immunization'],
    [Building2, 'Care Station Visits'],
    [Stethoscope, 'Doctor Consult'],
  ];
  return (
    <div className="flex h-full flex-col bg-[#f3f7fb] text-slate-800">
      <LightStatus />
      <div className="flex items-center justify-between px-4 pb-2 pt-4">
        <span className="text-[13px] font-semibold text-blue-700">HealthBasix</span>
        <Bell className="size-3.5 text-blue-700" />
      </div>
      <div className="flex flex-1 flex-col gap-2 px-3">
        <div className="flex items-center gap-2.5 rounded-xl border border-teal-200 bg-white p-2.5">
          <span className="grid size-9 place-items-center rounded-full bg-teal-100 text-[10px] font-semibold text-teal-700">S</span>
          <div className="text-[9px] leading-tight">
            <p className="text-[11px] font-semibold">Student profile</p>
            <p className="text-slate-500">Age · Class</p>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-teal-600 p-2.5 text-white">
          <HeartPulse className="size-4" />
          <div className="text-[9px] leading-tight">
            <p className="text-[11px] font-semibold">Health Report</p>
            <p className="opacity-80">All parameters normal</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {tiles.map(([Icon, l]) => (
            <div key={l} className="flex flex-col items-center gap-1 rounded-xl bg-white p-2 text-center text-[8.5px] font-medium shadow-sm">
              <Icon className="size-4 text-blue-600" />
              {l}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-2 text-[9px]">
          <ShieldCheck className="size-3.5 text-emerald-600" />
          <span className="font-semibold">Health Wallet</span>
        </div>
      </div>
      <TabBar color="text-blue-700" items={[[Home, 'Home'], [FileText, 'Reports'], [Bell, 'Alerts'], [Users, 'More']]} />
    </div>
  );
}

function CareStationScreen() {
  const visits = [
    ['Student A', 'Completed', 'text-emerald-600'],
    ['Student B', 'In progress', 'text-amber-600'],
    ['Student C', 'Pending', 'text-slate-500'],
  ];
  const actions: [LucideIcon, string, string][] = [
    [Plus, 'New Visit', 'text-blue-600'],
    [Activity, 'Vitals', 'text-emerald-600'],
    [Pill, 'Medication', 'text-violet-600'],
    [CalendarCheck, 'Follow-up', 'text-orange-500'],
  ];
  return (
    <div className="flex h-full flex-col bg-[#f3f7fb] text-slate-800">
      <div className="bg-blue-700 pb-3 text-white">
        <LightStatus dark />
        <div className="flex items-center justify-between px-4 pt-4">
          <span className="flex items-center gap-1.5 text-[12.5px] font-semibold">
            <Building2 className="size-3.5" /> Care Station
          </span>
          <RefreshCw className="size-3" />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2 px-3 pt-2">
        <div className="flex items-center justify-between rounded-lg bg-white px-2.5 py-1.5 text-[8.5px]">
          <span className="flex items-center gap-1 font-semibold">
            <span className="size-1.5 rounded-full bg-emerald-500" /> Online
          </span>
          <span className="text-slate-500">Last sync · just now</span>
        </div>
        <div className="flex items-center justify-between rounded-xl bg-blue-50 p-2.5">
          <div className="text-[9px] leading-tight">
            <p className="text-[11px] font-semibold">School Clinic</p>
            <p className="text-slate-500">Today’s visits</p>
          </div>
          <span className="text-[20px] font-bold text-blue-700">12</span>
        </div>
        <p className="pt-0.5 text-[10.5px] font-semibold">Student Visits</p>
        <div className="divide-y divide-slate-100 rounded-xl bg-white">
          {visits.map(([n, s, c]) => (
            <div key={n} className="flex items-center justify-between px-2.5 py-1.5 text-[9px]">
              <span className="flex items-center gap-1.5">
                <span className="grid size-5 place-items-center rounded-full bg-blue-100 text-[7px] font-semibold text-blue-700">{n.slice(-1)}</span>
                {n}
              </span>
              <span className={`font-medium ${c}`}>{s}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-1">
          {actions.map(([Icon, l, c]) => (
            <div key={l} className="flex flex-col items-center gap-0.5 rounded-lg bg-white py-1.5 text-[7px] font-medium">
              <Icon className={`size-3.5 ${c}`} />
              {l}
            </div>
          ))}
        </div>
      </div>
      <TabBar color="text-blue-700" items={[[Home, 'Home'], [Users, 'Students'], [FileText, 'Reports'], [RefreshCw, 'Sync']]} />
    </div>
  );
}

function WellnessScreen() {
  const moods = ['bg-orange-300', 'bg-amber-300', 'bg-yellow-300', 'bg-lime-300', 'bg-emerald-400'];
  const pts = [30, 22, 34, 44, 26, 38, 48];
  return (
    <div className="flex h-full flex-col bg-[#f3f7fb] text-slate-800">
      <LightStatus />
      <div className="flex items-center justify-between px-4 pb-2 pt-4">
        <span className="text-[13px] font-semibold">Wellness</span>
        <Leaf className="size-3.5 text-emerald-600" />
      </div>
      <div className="flex flex-1 flex-col gap-2 px-3">
        <div className="rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 p-2.5 text-center text-white">
          <p className="text-[11px] font-semibold">Daily Wellbeing Check-in</p>
          <p className="text-[8.5px] opacity-85">How are you feeling today?</p>
          <div className="mt-1.5 flex justify-center gap-1.5">
            {moods.map((m, i) => (
              <span key={m} className={`size-4 rounded-full ${m} ${i === 4 ? 'ring-2 ring-white' : ''}`} />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-xl bg-white p-2.5">
          <div className="relative grid size-12 place-items-center">
            <svg viewBox="0 0 36 36" className="absolute inset-0 -rotate-90">
              <circle cx="18" cy="18" r="15" fill="none" stroke="#e2e8f0" strokeWidth="4" />
              <circle cx="18" cy="18" r="15" fill="none" stroke="#10b981" strokeWidth="4" strokeDasharray="70 94" strokeLinecap="round" />
            </svg>
            <span className="text-[10px] font-bold">75%</span>
          </div>
          <div className="space-y-0.5 text-[8.5px]">
            {['Activity goals', 'Mood tracking', 'Healthy habits'].map((t) => (
              <p key={t} className="flex items-center gap-1">
                <Check className="size-2.5 text-emerald-600" /> {t}
              </p>
            ))}
          </div>
        </div>
        <div className="rounded-xl bg-white p-2.5">
          <p className="mb-1 text-[9.5px] font-semibold">Wellness Trend</p>
          <svg viewBox="0 0 120 50" className="h-10 w-full">
            <polyline points={pts.map((y, i) => `${i * 20},${50 - y}`).join(' ')} fill="none" stroke="#0ea5e9" strokeWidth="2" />
            {pts.map((y, i) => (
              <circle key={i} cx={i * 20} cy={50 - y} r="2.2" fill="#0ea5e9" />
            ))}
          </svg>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-violet-50 p-2 text-[8.5px]">
          <Lightbulb className="size-3.5 text-amber-500" /> Wellness tip of the day
        </div>
      </div>
      <TabBar color="text-blue-700" items={[[Home, 'Home'], [Activity, 'Insights'], [Lightbulb, 'Tips'], [Users, 'Profile']]} />
    </div>
  );
}

const screens: Record<HealthApp['id'], () => React.JSX.Element> = {
  parent: ParentScreen,
  carestation: CareStationScreen,
  wellness: WellnessScreen,
};

/* ---------- Phone: real screenshots when provided, otherwise the labelled concept ---------- */

function AppPhone({ app }: { app: HealthApp }) {
  const [i, setI] = useState(0);
  const real = app.screenshots.length > 0;
  const Screen = screens[app.id];
  return (
    <div className="flex flex-col items-center">
      <PhoneFrame>
        {real ? (
          <img
            src={app.screenshots[i]}
            alt={`${app.name} app screenshot ${i + 1} of ${app.screenshots.length}`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top"
          />
        ) : (
          <div aria-hidden="true" className="h-full">
            <Screen />
          </div>
        )}
      </PhoneFrame>
      {real && app.screenshots.length > 1 && (
        <div className="mt-4 flex gap-1.5" role="group" aria-label={`${app.name} screenshots`}>
          {app.screenshots.map((s, n) => (
            <button
              key={s}
              type="button"
              onClick={() => setI(n)}
              aria-label={`Show screenshot ${n + 1}`}
              aria-current={n === i}
              className={`h-1.5 rounded-full transition-all ${n === i ? 'w-5 bg-fg' : 'w-1.5 bg-white/25'}`}
            />
          ))}
        </div>
      )}
      <span
        className={`mt-4 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] ${
          real ? 'border-emerald-300/30 text-emerald-300' : 'border-line text-subtle'
        }`}
      >
        <ImageIcon className="size-3" />
        {real ? 'App screenshot' : 'Illustrative concept — not a production screenshot'}
      </span>
    </div>
  );
}

function AppCard({ app, selected, onSelect }: { app: HealthApp; selected: boolean; onSelect: () => void }) {
  const t = themes[app.id];
  const Icon = t.icon;
  return (
    <article
      onPointerMove={onSpotlightMove}
      className={`spotlight card relative flex w-full flex-col overflow-hidden transition-colors duration-300 ${selected ? t.ring : 'hover:border-white/15'}`}
      aria-labelledby={`app-${app.id}`}
    >
      <div className="relative flex justify-center overflow-hidden border-b border-line bg-[linear-gradient(180deg,#0b1a33,#0b0d10)] px-4 pb-8 pt-10">
        <div aria-hidden="true" className={`absolute left-1/2 top-1/3 size-64 -translate-x-1/2 rounded-full ${t.glow} blur-[80px]`} />
        <motion.div whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 200, damping: 18 }} className="relative">
          <AppPhone app={app} />
        </motion.div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3">
          <span className={`grid size-10 place-items-center rounded-xl ${t.bg} ${t.text}`}>
            <Icon className="size-5" />
          </span>
          <div>
            <h3 id={`app-${app.id}`} className="text-[17px] font-medium tracking-tight">
              {app.name}
            </h3>
            <p className="text-[13px] text-muted">{app.tagline}</p>
          </div>
        </div>
        <p className="mt-4 text-[14.5px] leading-relaxed text-muted">{app.overview}</p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-6">
          <span className={`font-mono text-[10.5px] uppercase tracking-widest ${t.text}`}>{app.audience}</span>
          <button
            type="button"
            onClick={onSelect}
            aria-pressed={selected}
            aria-controls="health-app-details"
            className={`rounded-xl border px-4 py-2 text-[13px] transition ${
              selected ? `${t.ring} ${t.bg} text-fg` : 'border-line text-fg/80 hover:border-white/25 hover:text-fg'
            }`}
          >
            {selected ? 'Showing details' : 'View details'}
          </button>
        </div>
      </div>
    </article>
  );
}

function Details({ app }: { app: HealthApp }) {
  const t = themes[app.id];
  return (
    <div className="grid gap-8 p-7 sm:p-10 lg:grid-cols-3">
      <div>
        <p className="eyebrow mb-4">Key features</p>
        <ul className="grid gap-2">
          {app.features.map((f) => (
            <li key={f} className="flex items-center gap-2.5 text-[14.5px] text-fg/85">
              <span className={`size-1.5 rounded-full ${t.solid}`} />
              {f}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="eyebrow mb-4">My Android contributions</p>
        <ul className="space-y-2.5">
          {app.contributions.map((c) => (
            <li key={c} className="flex gap-2.5 text-[14.5px] leading-relaxed text-muted">
              <Check className={`mt-0.5 size-4 shrink-0 ${t.text}`} />
              {c}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="eyebrow mb-4">Technology stack</p>
        <ul className="flex flex-wrap gap-2">
          {app.tech.map((x) => (
            <li key={x} className="rounded-xl border border-line bg-white/[0.03] px-3 py-1.5 font-mono text-[12px]">
              {x}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-[13px] leading-relaxed text-subtle">
          Platform: Android · Part of the Health Basix healthcare platform.
        </p>
      </div>
    </div>
  );
}

export function HealthApps() {
  const [selected, setSelected] = useState<HealthApp['id']>('parent');
  const app = healthApps.find((a) => a.id === selected)!;

  return (
    <section id="health-apps" aria-labelledby="health-apps-title" className="relative overflow-hidden py-28 md:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgb(37_99_235/0.14),transparent_70%)]"
      />
      <div className="container-x relative">
        <SectionHeading
          id="health-apps-title"
          index="04"
          label="Healthcare technology"
          title="Healthcare Technology –"
          accent="Mobile Application Portfolio"
          intro="Three Android apps on the Health Basix platform — for parents, school nurses and students. I built each of them as the platform’s only Android developer."
        />

        <Reveal>
          <figure className="relative">
            <div aria-hidden="true" className="absolute -inset-x-10 -top-10 bottom-0 rounded-[48px] bg-blue-500/10 blur-[80px]" />
            <div className="relative overflow-hidden rounded-[28px] border border-white/10 shadow-[0_40px_120px_-40px_rgb(37_99_235/0.5)]">
              <img
                src={healthAppsShowcase.image}
                alt={healthAppsShowcase.alt}
                width={1536}
                height={1024}
                loading="lazy"
                decoding="async"
                className="h-auto w-full"
              />
            </div>
            <figcaption className="mt-4 text-center font-mono text-[11px] text-subtle">
              Connected digital health experiences · concept showcase, not production screenshots
            </figcaption>
          </figure>
        </Reveal>

        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {healthApps.map((a, i) => (
            <Reveal key={a.id} delay={i * 0.08} className="flex">
              <AppCard app={a} selected={selected === a.id} onSelect={() => setSelected(a.id)} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-5">
          <div id="health-app-details" aria-live="polite" className="card overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-7 py-5 sm:px-10">
              <p className="text-[15px] font-medium">
                {app.name} <span className="text-muted">— details</span>
              </p>
              <div className="flex gap-1" role="group" aria-label="Choose app">
                {healthApps.map((a) => (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => setSelected(a.id)}
                    aria-pressed={selected === a.id}
                    className={`rounded-lg px-3 py-1.5 text-[12.5px] transition ${
                      selected === a.id ? 'bg-white/[0.08] text-fg' : 'text-muted hover:text-fg'
                    }`}
                  >
                    {a.name.replace('HBX ', '').replace('HealthBasix ', '')}
                  </button>
                ))}
              </div>
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={app.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }}>
                <Details app={app} />
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
