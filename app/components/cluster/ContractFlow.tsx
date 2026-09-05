import { contracts } from '../../lib/cluster/contracts';
import type { Cluster } from '../../lib/cluster/types';

/**
 * ContractFlow — the three clusters as boxes and every versioned contract as
 * a labelled arrow between them. Drawn from contracts.ts, so a new contract
 * appears here without touching the picture.
 */
const W = 760;
const H = 340;
const BOX_W = 200;
const BOX_H = 56;

const pos: Record<Cluster, { x: number; y: number; label: string }> = {
  energy: { x: 40, y: 40, label: 'Energy Intelligence' },
  operations: { x: W - 40 - BOX_W, y: 40, label: 'Operations & Commercial' },
  'physical-ai': { x: (W - BOX_W) / 2, y: H - 40 - BOX_H, label: 'Physical AI & Robotics' },
};

type Pt = { x: number; y: number };

/** Point where the ray p→q leaves the axis-aligned box of cluster `k`. */
function exitPoint(p: Pt, q: Pt, k: Cluster): Pt {
  const r = pos[k];
  const dx = q.x - p.x;
  const dy = q.y - p.y;
  let t = Infinity;
  if (dx !== 0) t = Math.min(t, ((dx > 0 ? r.x + BOX_W : r.x) - p.x) / dx);
  if (dy !== 0) t = Math.min(t, ((dy > 0 ? r.y + BOX_H : r.y) - p.y) / dy);
  return { x: p.x + dx * t, y: p.y + dy * t };
}

function edgeGeometry(from: Cluster, to: Cluster, off: number) {
  const a = pos[from];
  const b = pos[to];
  const ca = { x: a.x + BOX_W / 2, y: a.y + BOX_H / 2 };
  const cb = { x: b.x + BOX_W / 2, y: b.y + BOX_H / 2 };
  const dx = cb.x - ca.x;
  const dy = cb.y - ca.y;
  const len = Math.hypot(dx, dy) || 1;
  // canonical normal: independent of direction so parallel edges of a pair split symmetrically
  const canon = from < to ? 1 : -1;
  const nx = (-dy / len) * canon;
  const ny = (dx / len) * canon;
  const pa = { x: ca.x + nx * off, y: ca.y + ny * off };
  const pb = { x: cb.x + nx * off, y: cb.y + ny * off };
  const s = exitPoint(pa, pb, from);
  const e = exitPoint(pb, pa, to);
  // pull the arrow tip back so the marker sits on the border
  const ux = (e.x - s.x) / (Math.hypot(e.x - s.x, e.y - s.y) || 1);
  const uy = (e.y - s.y) / (Math.hypot(e.x - s.x, e.y - s.y) || 1);
  return { x1: s.x, y1: s.y, x2: e.x - ux * 2, y2: e.y - uy * 2, canon };
}

export default function ContractFlow() {
  // offset parallel/opposite edges between the same pair
  const seen = new Map<string, number>();
  return (
    <figure className="fig">
      <svg viewBox={`0 0 ${W} ${H}`} role="group" aria-labelledby="cf-title cf-desc" style={{ width: '100%', height: 'auto', maxWidth: W }}>
        <title id="cf-title">Cross-cluster contract flow</title>
        <desc id="cf-desc">{contracts.map((c) => `${c.id} v${c.version} from ${c.producer} to ${c.consumer}`).join('. ')}</desc>
        <defs>
          <marker id="cf-arrow" viewBox="0 0 8 8" refX="8" refY="4" markerWidth="8" markerHeight="8" orient="auto">
            <path d="M0,0 L8,4 L0,8 z" fill="#141414" />
          </marker>
        </defs>
        {contracts.map((c) => {
          const key = [c.producer, c.consumer].sort().join('|');
          const n = seen.get(key) ?? 0;
          seen.set(key, n + 1);
          const pairCount = contracts.filter((k) => [k.producer, k.consumer].sort().join('|') === key).length;
          // parallel edges between the same pair are pushed apart along the
          // pair's canonical normal and their labels sit at different points
          // along the line, measured in the canonical direction.
          const off = pairCount > 1 ? (n - (pairCount - 1) / 2) * 48 : 0;
          const { x1, y1, x2, y2, canon } = edgeGeometry(c.producer, c.consumer, off);
          const tCanon = pairCount > 1 ? 0.3 + (n / (pairCount - 1)) * 0.28 : 0.5;
          const t = canon === 1 ? tCanon : 1 - tCanon;
          const mx = x1 + (x2 - x1) * t;
          const my = y1 + (y2 - y1) * t;
          const labelW = `${c.id} v${c.version}`.length * 6.6 + 16;
          return (
            <g key={c.id}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#141414" strokeWidth="1.25" markerEnd="url(#cf-arrow)" />
              <a href={`/contracts#${c.id}`}>
                <rect x={mx - labelW / 2} y={my - 12} width={labelW} height={22} fill="#FFFCF7" stroke="#DDD9CE" />
                <text x={mx} y={my + 3} fontSize="10.5" fontFamily="IBM Plex Mono, monospace" fill="#141414" textAnchor="middle">
                  {c.id} v{c.version}
                </text>
              </a>
              <title>{`${c.id} v${c.version}: ${c.producer} → ${c.consumer}. ${c.summary}`}</title>
            </g>
          );
        })}
        {(Object.keys(pos) as Cluster[]).map((k) => {
          const p = pos[k];
          const here = k === 'physical-ai';
          return (
            <g key={k}>
              <rect x={p.x} y={p.y} width={BOX_W} height={BOX_H} fill={here ? '#141414' : '#FFFCF7'} stroke="#141414" strokeWidth="1.25" />
              <text x={p.x + BOX_W / 2} y={p.y + 24} fontSize="13" fontFamily="IBM Plex Sans, Inter, system-ui, sans-serif" fontWeight={600} fill={here ? '#F7F6F2' : '#141414'} textAnchor="middle">
                {p.label}
              </text>
              <text x={p.x + BOX_W / 2} y={p.y + 42} fontSize="9.5" fontFamily="IBM Plex Mono, monospace" fill={here ? '#DDD9CE' : '#5A584F'} textAnchor="middle" letterSpacing="0.08em">
                {here ? 'THIS HOST' : k.toUpperCase()}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption>
        Every arrow is a versioned JSON-Schema event. There is no shared database and no shared domain logic; none of
        the three systems requires the others to function.
      </figcaption>
    </figure>
  );
}
