import { useEffect, useRef, useState } from 'react';
import { useInView } from '../hooks/useInView';

// ── Design constants ──────────────────────────────────────────────────────────

const DURATION = 12; // seconds — matches the original prototype

const NATIVE_W = 1920;
const NATIVE_H = 1080;

const AC   = '#E87A2A';
const AC2  = '#F59E0B';
const BG   = '#0B0D14';
const PANEL = '#111520';
const CARD  = '#161B28';
const CARD_BORDER = '#1E2538';
const TEXT  = '#E2E4EA';
const TEXT2 = '#7B8198';
const TEXT3 = '#4A5068';

// ── Animation helper ──────────────────────────────────────────────────────────
// Maps the global progress t (0–1) through a [from, to] window → 0–1, clamped.
// Mirrors the `ip()` call pattern from the original prototype.
function ip(t: number, from: number, to: number): number {
  if (to <= from) return t >= to ? 1 : 0;
  return Math.max(0, Math.min(1, (t - from) / (to - from)));
}

// ── Dashboard sub-components ──────────────────────────────────────────────────

interface SparklineProps {
  data: number[];
  t: number;
  delay: number;
  color?: string;
  w?: number;
  h?: number;
}

function Sparkline({ data, t, delay, color = AC, w = 100, h = 28 }: SparklineProps) {
  const progress = ip(t, delay, delay + 0.2);
  const max = Math.max(...data);
  const pts = data.map((v, i) => ({
    x: (i / (data.length - 1)) * w,
    y: h - (v / max) * h * 0.85 - 2,
  }));
  const vis = Math.min(Math.floor(progress * pts.length), pts.length - 1);
  const d = pts
    .slice(0, vis + 1)
    .map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(' ');
  const areaD =
    vis > 0
      ? d + ` L${pts[vis].x.toFixed(1)},${h} L0,${h} Z`
      : '';
  const gradId = `sg-${color.replace('#', '')}`;

  return (
    <svg width={w} height={h} style={{ display: 'block', overflow: 'visible' }}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={color} stopOpacity={0.3} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      {areaD && <path d={areaD} fill={`url(#${gradId})`} />}
      {d.length > 3 && (
        <path d={d} fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      )}
    </svg>
  );
}

interface ProgressBarProps {
  pct: number;
  color?: string;
  t: number;
  delay: number;
  label?: string;
}

function ProgressBar({ pct, color = AC, t, delay, label }: ProgressBarProps) {
  const a    = ip(t, delay, delay + 0.15);
  const fill = ip(t, delay + 0.05, delay + 0.25);
  return (
    <div style={{ opacity: a }}>
      {label && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontSize: 12, color: TEXT2 }}>{label}</span>
          <span style={{ fontSize: 12, color: TEXT, fontWeight: 500 }}>
            {Math.round(pct * fill)}%
          </span>
        </div>
      )}
      <div style={{ height: 6, borderRadius: 3, background: '#1E2538', overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          borderRadius: 3,
          width: `${pct * fill}%`,
          background: `linear-gradient(90deg, ${color}, ${color}cc)`,
          boxShadow: `0 0 12px ${color}44`,
        }} />
      </div>
    </div>
  );
}

function Badge({ label, color }: { label: string; color: string }) {
  return (
    <span style={{
      display: 'inline-block',
      padding: '2px 8px',
      borderRadius: 4,
      fontSize: 10,
      fontWeight: 600,
      background: `${color}18`,
      color,
      letterSpacing: '0.02em',
      textTransform: 'uppercase',
    }}>
      {label}
    </span>
  );
}

interface StatCardProps {
  label: string;
  value: string;
  change: string;
  sparkData: number[];
  color?: string;
  t: number;
  delay: number;
}

function StatCard({ label, value, change, sparkData, color = AC, t, delay }: StatCardProps) {
  const a     = ip(t, delay, delay + 0.12);
  const num   = parseInt(value.replace(/[^0-9]/g, ''), 10) || 0;
  const count = Math.round(num * ip(t, delay + 0.05, delay + 0.2));
  const suffix = value.replace(/[0-9,$]/g, '');
  return (
    <div style={{
      background: CARD,
      border: `1px solid ${CARD_BORDER}`,
      borderRadius: 14,
      padding: '18px 20px',
      flex: 1,
      opacity: a,
      transform: `translateY(${(1 - a) * 16}px)`,
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', right: 12, bottom: 8, opacity: 0.6 }}>
        <Sparkline data={sparkData} t={t} delay={delay + 0.1} color={color} w={80} h={32} />
      </div>
      <div style={{
        fontSize: 11, color: TEXT2, marginBottom: 8,
        fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase',
      }}>
        {label}
      </div>
      <div style={{
        fontFamily: "'Space Grotesk'", fontSize: 28, fontWeight: 700, color: TEXT, lineHeight: 1,
      }}>
        {value.startsWith('$') ? '$' : ''}{count.toLocaleString()}{suffix}
      </div>
      <div style={{
        fontSize: 11, color: '#34D399', marginTop: 6,
        fontWeight: 500, display: 'flex', alignItems: 'center', gap: 4,
      }}>
        <svg width="10" height="10" viewBox="0 0 10 10">
          <path d="M5 1L9 6H1L5 1Z" fill="#34D399" />
        </svg>
        {change}
      </div>
    </div>
  );
}

function AreaChart({ t, delay }: { t: number; delay: number }) {
  const progress = ip(t, delay, delay + 0.35);
  const data     = [28, 45, 32, 58, 42, 68, 55, 78, 62, 88, 75, 94];
  const months   = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const cw = 480, ch = 160, px = 40, py = 10;

  const pts = data.map((v, i) => ({
    x: px + (i / (data.length - 1)) * (cw - px * 2),
    y: ch - py - (v / 100) * (ch - py * 3),
  }));
  const vis = Math.min(Math.floor(progress * pts.length), pts.length - 1);
  const d = pts
    .slice(0, vis + 1)
    .map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(' ');
  const areaD =
    vis > 0
      ? d + ` L${pts[vis].x.toFixed(1)},${ch - py} L${pts[0].x.toFixed(1)},${ch - py} Z`
      : '';

  return (
    <svg width={cw} height={ch + 20} style={{ display: 'block' }}>
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={AC} stopOpacity={0.25} />
          <stop offset="100%" stopColor={AC} stopOpacity={0} />
        </linearGradient>
      </defs>
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1={px} x2={cw - px} y1={py + i * 38} y2={py + i * 38}
          stroke={CARD_BORDER} strokeWidth={1} />
      ))}
      {areaD && <path d={areaD} fill="url(#areaGrad)" />}
      {d.length > 3 && (
        <path d={d} fill="none" stroke={AC} strokeWidth={2.5}
          strokeLinecap="round" strokeLinejoin="round"
          style={{ filter: `drop-shadow(0 0 6px ${AC}66)` }} />
      )}
      {vis > 0 && pts[vis] && (
        <g>
          <circle cx={pts[vis].x} cy={pts[vis].y} r={6} fill={AC}
            opacity={progress > 0.1 ? 0.3 : 0} />
          <circle cx={pts[vis].x} cy={pts[vis].y} r={3.5} fill={AC}
            opacity={progress > 0.1 ? 1 : 0} />
        </g>
      )}
      {months.map((m, i) => (
        <text key={m}
          x={px + (i / 11) * (cw - px * 2)} y={ch + 12}
          fill={TEXT3} fontSize={10} textAnchor="middle" fontFamily="DM Sans"
          opacity={ip(t, delay + i * 0.015, delay + i * 0.015 + 0.08)}>
          {m}
        </text>
      ))}
    </svg>
  );
}

const TABLE_ROWS = [
  { name: 'Invoice Processing',   status: 'Active',   statusColor: '#34D399', pct: 98, runs: '12.4k', time: '0.8s' },
  { name: 'Lead Qualification Bot', status: 'Active', statusColor: '#34D399', pct: 94, runs: '8.2k',  time: '1.2s' },
  { name: 'Data Sync Pipeline',   status: 'Running',  statusColor: '#60A5FA', pct: 72, runs: '3.1k',  time: '4.5s' },
  { name: 'Report Generator',     status: 'Queued',   statusColor: AC2,       pct: 0,  runs: '—',     time: '—'   },
];

function DataTable({ t, delay }: { t: number; delay: number }) {
  return (
    <div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.5fr 0.7fr 1fr 0.6fr 0.6fr',
        gap: 8, padding: '0 0 8px',
        borderBottom: `1px solid ${CARD_BORDER}`, marginBottom: 8,
      }}>
        {['Automation', 'Status', 'Progress', 'Runs', 'Avg Time'].map((h) => (
          <div key={h} style={{
            fontSize: 10, color: TEXT3, fontWeight: 600,
            letterSpacing: '0.06em', textTransform: 'uppercase',
          }}>
            {h}
          </div>
        ))}
      </div>
      {TABLE_ROWS.map((row, i) => {
        const a = ip(t, delay + i * 0.06, delay + i * 0.06 + 0.1);
        return (
          <div key={i} style={{
            display: 'grid',
            gridTemplateColumns: '1.5fr 0.7fr 1fr 0.6fr 0.6fr',
            gap: 8, padding: '9px 0',
            borderBottom: `1px solid ${CARD_BORDER}15`,
            alignItems: 'center',
            opacity: a, transform: `translateX(${(1 - a) * 10}px)`,
          }}>
            <div style={{ fontSize: 13, color: TEXT, fontWeight: 500 }}>{row.name}</div>
            <div><Badge label={row.status} color={row.statusColor} /></div>
            <div>
              <div style={{ height: 4, borderRadius: 2, background: '#1E2538', overflow: 'hidden' }}>
                <div style={{
                  height: '100%', borderRadius: 2,
                  width: `${row.pct * ip(t, delay + i * 0.06 + 0.08, delay + i * 0.06 + 0.2)}%`,
                  background: `linear-gradient(90deg, ${row.statusColor}, ${row.statusColor}88)`,
                  boxShadow: row.pct > 0 ? `0 0 8px ${row.statusColor}33` : 'none',
                }} />
              </div>
            </div>
            <div style={{ fontSize: 12, color: TEXT2, fontFamily: "'Space Grotesk'", fontWeight: 500 }}>{row.runs}</div>
            <div style={{ fontSize: 12, color: TEXT2, fontFamily: "'Space Grotesk'" }}>{row.time}</div>
          </div>
        );
      })}
    </div>
  );
}

const DONUT_SEGMENTS = [
  { pct: 38, color: AC },
  { pct: 25, color: '#60A5FA' },
  { pct: 22, color: '#34D399' },
  { pct: 15, color: '#A78BFA' },
];
const DONUT_LABELS = ['Chatbots', 'Pipelines', 'Workflows', 'Apps'];

function Donut({ t, delay }: { t: number; delay: number }) {
  const progress = ip(t, delay, delay + 0.3);
  const r = 38, cx = 50, cy = 50, circ = 2 * Math.PI * r;
  let offset = 0;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
      <svg width="100" height="100" style={{ filter: `drop-shadow(0 0 8px ${AC}22)` }}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={CARD_BORDER} strokeWidth={12} />
        {DONUT_SEGMENTS.map((seg, i) => {
          const len = (seg.pct / 100) * circ * progress;
          const rot = offset;
          offset += (seg.pct / 100) * 360 * progress;
          return (
            <circle key={i} cx={cx} cy={cy} r={r} fill="none"
              stroke={seg.color} strokeWidth={12}
              strokeDasharray={`${len} ${circ - len}`}
              strokeLinecap="round"
              transform={`rotate(${rot - 90} ${cx} ${cy})`}
              opacity={ip(t, delay + i * 0.04, delay + i * 0.04 + 0.08)} />
          );
        })}
        <text x={cx} y={cy + 1} textAnchor="middle" dominantBaseline="middle"
          fontFamily="Space Grotesk" fontSize={16} fontWeight={700} fill={TEXT}>
          {Math.round(94 * progress)}%
        </text>
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {DONUT_LABELS.map((label, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            opacity: ip(t, delay + 0.12 + i * 0.04, delay + 0.12 + i * 0.04 + 0.06),
          }}>
            <div style={{ width: 8, height: 8, borderRadius: 2, background: DONUT_SEGMENTS[i].color }} />
            <span style={{ fontSize: 11, color: TEXT2 }}>{label}</span>
            <span style={{ fontSize: 11, color: TEXT, fontWeight: 600, fontFamily: "'Space Grotesk'", marginLeft: 'auto' }}>
              {DONUT_SEGMENTS[i].pct}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface SidebarItemProps {
  label: string;
  icon: string;
  active?: boolean;
  t: number;
  delay: number;
}

function SidebarItem({ label, icon, active = false, t, delay }: SidebarItemProps) {
  const a = ip(t, delay, delay + 0.08);
  return (
    <div style={{
      padding: '9px 14px', borderRadius: 10, marginBottom: 2,
      background: active ? `${AC}14` : 'transparent',
      display: 'flex', alignItems: 'center', gap: 10,
      opacity: a, transform: `translateX(${(1 - a) * -10}px)`,
    }}>
      <span style={{ fontSize: 14, opacity: 0.7 }}>{icon}</span>
      <span style={{
        fontSize: 13, fontWeight: active ? 600 : 400,
        fontFamily: "'Space Grotesk'", color: active ? AC : TEXT2,
      }}>
        {label}
      </span>
      {active && (
        <div style={{
          marginLeft: 'auto', width: 5, height: 5, borderRadius: 3,
          background: AC, boxShadow: `0 0 6px ${AC}`,
        }} />
      )}
    </div>
  );
}

// ── Main dashboard scene ──────────────────────────────────────────────────────

function Dashboard({ t }: { t: number }) {
  const chromeA = ip(t, 0, 0.06);

  return (
    <div style={{
      position: 'absolute', inset: 32, borderRadius: 18,
      background: PANEL, border: `1px solid ${CARD_BORDER}`,
      boxShadow: `0 12px 80px rgba(0,0,0,0.5), 0 0 80px rgba(232,122,42,0.15)`,
      overflow: 'hidden',
      opacity: chromeA,
      transform: `scale(${0.97 + chromeA * 0.03})`,
    }}>
      {/* Browser chrome title bar */}
      <div style={{
        height: 44, background: '#0D1019', borderBottom: `1px solid ${CARD_BORDER}`,
        display: 'flex', alignItems: 'center', padding: '0 16px', gap: 7,
      }}>
        <div style={{ width: 11, height: 11, borderRadius: 6, background: '#FF5F57' }} />
        <div style={{ width: 11, height: 11, borderRadius: 6, background: '#FFBD2E' }} />
        <div style={{ width: 11, height: 11, borderRadius: 6, background: '#28C840' }} />
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <div style={{
            background: '#161B28', borderRadius: 7, padding: '5px 28px',
            fontSize: 11, color: TEXT3, fontFamily: "'DM Sans'", border: `1px solid ${CARD_BORDER}`,
          }}>
            <span style={{ color: '#34D399', marginRight: 4 }}>●</span>
            app.raetec.ai/dashboard
          </div>
        </div>
        <div style={{ width: 36 }} />
      </div>

      {/* Sidebar */}
      <div style={{
        position: 'absolute', left: 0, top: 44, bottom: 0, width: 200,
        background: '#0D1019', borderRight: `1px solid ${CARD_BORDER}`, padding: '20px 12px',
      }}>
        <div style={{
          width: 120, height: 24,
          backgroundImage: "url('/logo-dark.png')",
          backgroundSize: '240% auto', backgroundPosition: 'center', backgroundRepeat: 'no-repeat',
          marginBottom: 28, marginLeft: 8,
          opacity: ip(t, 0.04, 0.1),
        }} />
        <div style={{
          fontSize: 9, color: TEXT3, fontWeight: 600, letterSpacing: '0.1em',
          textTransform: 'uppercase', padding: '0 14px', marginBottom: 8,
          opacity: ip(t, 0.05, 0.1),
        }}>
          Main
        </div>
        {[
          { label: 'Dashboard',   icon: '◈', active: true },
          { label: 'Automations', icon: '◇' },
          { label: 'Chatbots',    icon: '⬡' },
          { label: 'Pipelines',   icon: '△' },
          { label: 'Analytics',   icon: '○' },
        ].map((item, i) => (
          <SidebarItem key={item.label} {...item} t={t} delay={0.06 + i * 0.025} />
        ))}
        <div style={{
          fontSize: 9, color: TEXT3, fontWeight: 600, letterSpacing: '0.1em',
          textTransform: 'uppercase', padding: '0 14px', marginBottom: 8, marginTop: 20,
          opacity: ip(t, 0.15, 0.2),
        }}>
          System
        </div>
        {[
          { label: 'Team',     icon: '◎' },
          { label: 'Settings', icon: '⚙' },
        ].map((item, i) => (
          <SidebarItem key={item.label} {...item} t={t} delay={0.16 + i * 0.025} />
        ))}

        {/* API usage card */}
        <div style={{
          position: 'absolute', bottom: 16, left: 12, right: 12,
          background: CARD, borderRadius: 10, padding: 14,
          border: `1px solid ${CARD_BORDER}`,
          opacity: ip(t, 0.2, 0.28),
        }}>
          <div style={{ fontSize: 10, color: TEXT2, marginBottom: 8, fontWeight: 500 }}>
            API Usage
          </div>
          <ProgressBar pct={73} color={AC} t={t} delay={0.25} />
          <div style={{ fontSize: 9, color: TEXT3, marginTop: 6 }}>73,421 / 100,000 calls</div>
        </div>
      </div>

      {/* Main content area */}
      <div style={{
        position: 'absolute', left: 200, top: 44, right: 0, bottom: 0,
        padding: 24, background: BG, overflow: 'hidden',
      }}>
        {/* Page header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginBottom: 20, opacity: ip(t, 0.06, 0.12),
        }}>
          <div>
            <div style={{ fontFamily: "'Space Grotesk'", fontSize: 20, fontWeight: 700, color: TEXT }}>
              Dashboard
            </div>
            <div style={{ fontSize: 12, color: TEXT3, marginTop: 2 }}>
              Real-time automation overview
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{
              padding: '6px 14px', borderRadius: 8,
              background: CARD, border: `1px solid ${CARD_BORDER}`, fontSize: 12, color: TEXT2,
            }}>
              Last 30 days
            </div>
            <div style={{
              padding: '6px 14px', borderRadius: 8,
              background: AC, fontSize: 12, color: '#fff', fontWeight: 600,
              boxShadow: `0 0 16px ${AC}44`,
            }}>
              Export
            </div>
          </div>
        </div>

        {/* Stat cards */}
        <div style={{ display: 'flex', gap: 14, marginBottom: 18 }}>
          <StatCard label="Tasks Automated" value="2847"  change="12% this week"  t={t} delay={0.10} color={AC}         sparkData={[20,35,28,45,38,52,48,65,55,72,68,85]} />
          <StatCard label="Time Saved"       value="186h"  change="23% this month" t={t} delay={0.14} color="#34D399"    sparkData={[10,18,14,25,20,32,28,40,35,48,42,55]} />
          <StatCard label="Active Pipelines" value="24"    change="3 new"          t={t} delay={0.18} color="#60A5FA"    sparkData={[12,14,13,16,15,18,17,20,19,22,21,24]} />
          <StatCard label="Success Rate"     value="99%"   change="0.4% up"        t={t} delay={0.22} color="#A78BFA"    sparkData={[92,94,93,95,96,95,97,96,98,97,99,99]} />
        </div>

        {/* Chart row */}
        <div style={{ display: 'flex', gap: 14, marginBottom: 18 }}>
          <div style={{
            flex: 2, background: CARD, borderRadius: 14,
            border: `1px solid ${CARD_BORDER}`, padding: 20,
            opacity: ip(t, 0.24, 0.32),
            transform: `translateY(${(1 - ip(t, 0.24, 0.32)) * 12}px)`,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ fontFamily: "'Space Grotesk'", fontSize: 14, fontWeight: 600, color: TEXT }}>
                Automation Performance
              </div>
              <div style={{ display: 'flex', gap: 4 }}>
                {['1W', '1M', '3M', '1Y'].map((p, i) => (
                  <div key={p} style={{
                    padding: '3px 10px', borderRadius: 6, fontSize: 10, fontWeight: 500,
                    background: i === 1 ? `${AC}18` : 'transparent',
                    color: i === 1 ? AC : TEXT3,
                  }}>
                    {p}
                  </div>
                ))}
              </div>
            </div>
            <AreaChart t={t} delay={0.32} />
          </div>
          <div style={{
            flex: 1, background: CARD, borderRadius: 14,
            border: `1px solid ${CARD_BORDER}`, padding: 20,
            opacity: ip(t, 0.28, 0.36),
            transform: `translateY(${(1 - ip(t, 0.28, 0.36)) * 12}px)`,
          }}>
            <div style={{ fontFamily: "'Space Grotesk'", fontSize: 14, fontWeight: 600, color: TEXT, marginBottom: 16 }}>
              Service Split
            </div>
            <Donut t={t} delay={0.36} />
          </div>
        </div>

        {/* Automations table */}
        <div style={{
          background: CARD, borderRadius: 14,
          border: `1px solid ${CARD_BORDER}`, padding: 20,
          opacity: ip(t, 0.45, 0.53),
          transform: `translateY(${(1 - ip(t, 0.45, 0.53)) * 12}px)`,
        }}>
          <div style={{ fontFamily: "'Space Grotesk'", fontSize: 14, fontWeight: 600, color: TEXT, marginBottom: 14 }}>
            Active Automations
          </div>
          <DataTable t={t} delay={0.53} />
        </div>
      </div>
    </div>
  );
}

// ── HeroVideo ─────────────────────────────────────────────────────────────────
// Renders the dashboard animation inside a responsive 16:9 container.
// Starts automatically when scrolled into view, plays once, then holds on the
// final frame. No playback controls.

export function HeroVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inViewRef, isVisible] = useInView(0.1);
  const [scale, setScale]     = useState(1);
  const [t, setT]             = useState(0);       // 0–1 overall progress
  const hasStarted            = useRef(false);
  const startTs               = useRef<number | null>(null);
  const rafId                 = useRef<number>(0);

  // Merge the two refs onto the same element
  const setRefs = (el: HTMLDivElement | null) => {
    (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
    (inViewRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
  };

  // Scale the 1920×1080 canvas to fit the container width
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / NATIVE_W);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Start the animation once the section is visible
  useEffect(() => {
    if (!isVisible || hasStarted.current) return;
    hasStarted.current = true;

    const tick = (timestamp: number) => {
      if (startTs.current === null) startTs.current = timestamp;
      const elapsed  = (timestamp - startTs.current) / 1000;
      const progress = Math.min(elapsed / DURATION, 1);
      setT(progress);
      if (progress < 1) {
        rafId.current = requestAnimationFrame(tick);
      }
    };
    rafId.current = requestAnimationFrame(tick);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  return (
    <div
      ref={setRefs}
      style={{
        width: '100%',
        paddingBottom: '56.25%', // 16:9
        position: 'relative',
        borderRadius: 16,
        overflow: 'hidden',
        background: BG,
      }}
    >
      {/* Canvas scaled to fit */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0,
        width: NATIVE_W,
        height: NATIVE_H,
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        background: BG,
      }}>
        <Dashboard t={t} />
      </div>
    </div>
  );
}
