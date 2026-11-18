import { motion } from 'framer-motion';
import { Boxes, Cloud, Code2, Database, KanbanSquare, Layers, Network, Smartphone, Workflow, type LucideIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { alsoFamiliar, skillCategories, techNodes, type NodeId, type SkillCategory } from '../data/content';
import { onSpotlightMove, Reveal, SectionHeading } from './ui';

const icons: Record<SkillCategory['icon'], LucideIcon> = {
  smartphone: Smartphone,
  code: Code2,
  boxes: Boxes,
  network: Network,
  database: Database,
  cloud: Cloud,
  layers: Layers,
  kanban: KanbanSquare,
  workflow: Workflow,
};

const C = 250; // centre of the 500×500 viewBox
const RADII = { 0: 0, 1: 105, 2: 195 } as const;

function useLayout() {
  return useMemo(() => {
    const byRing = { 1: techNodes.filter((n) => n.ring === 1), 2: techNodes.filter((n) => n.ring === 2) };
    const pos = new Map<NodeId, { x: number; y: number; ring: number }>();
    techNodes.forEach((n) => {
      if (n.ring === 0) return pos.set(n.id, { x: C, y: C, ring: 0 });
      const list = byRing[n.ring];
      const i = list.indexOf(n);
      const offset = n.ring === 1 ? -Math.PI / 2 : -Math.PI / 2 + Math.PI / list.length;
      const a = offset + (i / list.length) * Math.PI * 2;
      pos.set(n.id, { x: C + Math.cos(a) * RADII[n.ring], y: C + Math.sin(a) * RADII[n.ring], ring: n.ring });
    });
    return pos;
  }, []);
}

function Constellation({ active }: { active: Set<NodeId> | null }) {
  const pos = useLayout();
  const [hover, setHover] = useState<NodeId | null>(null);
  const lit = (id: NodeId) => (hover ? hover === id || id === 'android' : active ? active.has(id) : true);

  return (
    <svg viewBox="-30 -10 560 520" className="h-auto w-full" role="img" aria-label="Constellation of technologies centred on Android">
      <defs>
        <radialGradient id="core" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#3ddc84" stopOpacity="0.45" />
          <stop offset="1" stopColor="#3ddc84" stopOpacity="0" />
        </radialGradient>
      </defs>
      {[RADII[1], RADII[2]].map((r) => (
        <circle key={r} cx={C} cy={C} r={r} fill="none" stroke="rgb(255 255 255 / 0.06)" strokeDasharray="2 6" />
      ))}
      <circle cx={C} cy={C} r={90} fill="url(#core)" />

      {techNodes
        .filter((n) => n.ring > 0)
        .map((n) => {
          const p = pos.get(n.id)!;
          const on = lit(n.id) && (active || hover);
          return (
            <motion.line
              key={`l-${n.id}`}
              x1={C}
              y1={C}
              x2={p.x}
              y2={p.y}
              stroke={on ? 'rgb(61 220 132 / 0.45)' : 'rgb(255 255 255 / 0.05)'}
              strokeWidth={on ? 1.2 : 1}
              initial={false}
              animate={{ pathLength: 1 }}
              style={{ transition: 'stroke .35s' }}
            />
          );
        })}

      {techNodes.map((n) => {
        const p = pos.get(n.id)!;
        const isCore = n.ring === 0;
        const on = lit(n.id);
        const r = isCore ? 34 : n.ring === 1 ? 7 : 5;
        const labelBelow = p.y >= C;
        return (
          <g
            key={n.id}
            onMouseEnter={() => !isCore && setHover(n.id)}
            onMouseLeave={() => setHover(null)}
            style={{ cursor: isCore ? 'default' : 'pointer', transition: 'opacity .35s', opacity: on ? 1 : 0.25 }}
          >
            {isCore ? (
              <>
                <circle cx={p.x} cy={p.y} r={r} fill="#0e1013" stroke="#3ddc84" strokeWidth="1.5" />
                <text x={p.x} y={p.y + 4} textAnchor="middle" className="fill-fg font-sans text-[12px] font-medium">
                  Android
                </text>
              </>
            ) : (
              <>
                <circle cx={p.x} cy={p.y} r={r + 10} fill="transparent" />
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={r}
                  fill={on && (active || hover) ? '#3ddc84' : n.ring === 1 ? '#8a9bff' : '#2a2e35'}
                  stroke="rgb(255 255 255 / 0.25)"
                  strokeWidth="0.5"
                  style={{ transition: 'fill .35s' }}
                />
                <text
                  x={p.x}
                  y={labelBelow ? p.y + r + 15 : p.y - r - 8}
                  textAnchor="middle"
                  className={`font-mono text-[11px] ${n.ring === 1 ? 'fill-fg' : 'fill-muted'}`}
                >
                  {n.label}
                </text>
              </>
            )}
          </g>
        );
      })}
    </svg>
  );
}

export function Expertise() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = useMemo(() => {
    const cat = skillCategories.find((c) => c.id === activeId);
    return cat ? new Set(cat.nodes) : null;
  }, [activeId]);

  return (
    <section id="expertise" aria-labelledby="expertise-title" className="relative py-28 md:py-36">
      <div className="container-x">
        <SectionHeading
          id="expertise-title"
          index="02"
          label="Technical expertise"
          title="Native Android,"
          accent="end to end."
          intro="Hover a category to see how it connects back to the Android core."
        />

        <div className="grid items-start gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal className="lg:sticky lg:top-28">
            <div className="card relative overflow-hidden p-4 sm:p-8">
              <Constellation active={active} />
              <p className="mt-2 text-center font-mono text-[11px] text-subtle">
                {activeId ? skillCategories.find((c) => c.id === activeId)?.title : 'All technologies'}
              </p>
            </div>
          </Reveal>

          <div className="grid gap-3 sm:grid-cols-2">
            {skillCategories.map((c, i) => {
              const Icon = icons[c.icon];
              const on = activeId === c.id;
              return (
                <Reveal key={c.id} delay={(i % 2) * 0.06} className={c.featured ? 'sm:col-span-2' : ''}>
                  <button
                    type="button"
                    onPointerMove={onSpotlightMove}
                    onMouseEnter={() => setActiveId(c.id)}
                    onMouseLeave={() => setActiveId(null)}
                    onFocus={() => setActiveId(c.id)}
                    onBlur={() => setActiveId(null)}
                    aria-pressed={on}
                    className={`spotlight card h-full w-full p-6 text-left transition-colors duration-300 ${
                      on ? 'border-droid/40' : 'hover:border-white/15'
                    } ${c.featured ? 'bg-gradient-to-br from-droid/[0.08] to-transparent' : ''}`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`grid size-9 place-items-center rounded-xl border transition-colors ${
                          on || c.featured ? 'border-droid/30 bg-droid/10 text-droid' : 'border-line bg-white/[0.03] text-muted'
                        }`}
                      >
                        <Icon className="size-4" />
                      </span>
                      <h3 className="text-[15.5px] font-medium tracking-tight">{c.title}</h3>
                      {c.featured && <span className="ml-auto font-mono text-[10px] uppercase tracking-widest text-droid">Primary</span>}
                    </div>
                    <ul className="mt-5 flex flex-wrap gap-1.5">
                      {c.items.map((item) => (
                        <li key={item} className="chip text-[12px]">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </button>
                </Reveal>
              );
            })}
            <Reveal className="sm:col-span-2">
              <p className="px-1 pt-2 text-[13.5px] text-subtle">
                Also familiar with <span className="text-muted">{alsoFamiliar.join(' · ')}</span> — hands-on depth is in native Android.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
