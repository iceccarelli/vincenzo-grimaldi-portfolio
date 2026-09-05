import { registry } from '../../lib/cluster/registry';
import type { RegistryEntry } from '../../lib/cluster/types';

/**
 * DependencyGraph — the register's `dependsOn` edges as a layered
 * left-to-right graph. Level = longest path from a root. Computed at
 * render time from the register, so the picture cannot drift from the data.
 * Node fill follows the status badge (ink = CORE, rhine outline = MODULE,
 * dashed = RESEARCH, fault outline = EXPERIMENT, muted = INTERNAL) and the
 * status word is printed in every node, so colour is never the only cue.
 */
const NODE_W = 178;
const NODE_H = 40;
const COL_GAP = 90;
const ROW_GAP = 14;
const PAD = 12;

function levelOf(e: RegistryEntry, byId: Map<string, RegistryEntry>, memo: Map<string, number>): number {
  if (memo.has(e.id)) return memo.get(e.id)!;
  const deps = e.dependsOn.map((d) => byId.get(d)).filter(Boolean) as RegistryEntry[];
  const lv = deps.length ? Math.max(...deps.map((d) => levelOf(d, byId, memo))) + 1 : 0;
  memo.set(e.id, lv);
  return lv;
}

export default function DependencyGraph() {
  const nodes = registry;
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const memo = new Map<string, number>();
  const levels = nodes.map((n) => levelOf(n, byId, memo));
  const maxLevel = Math.max(...levels);
  const cols: RegistryEntry[][] = Array.from({ length: maxLevel + 1 }, () => []);
  nodes.forEach((n, i) => cols[levels[i]].push(n));
  // Column 0: most-depended-on first, then status rank. Later columns:
  // ordered by the position of their dependencies in the previous column
  // (fewer crossings), then status rank.
  const statusRank: Record<string, number> = { CORE: 0, MODULE: 1, RESEARCH: 2, INTERNAL: 3, EXPERIMENT: 4, ARCHIVE: 5 };
  const dependants = (id: string) => nodes.filter((n) => n.dependsOn.includes(id)).length;
  cols[0].sort((a, b) => dependants(b.id) - dependants(a.id) || statusRank[a.status] - statusRank[b.status] || a.id.localeCompare(b.id));
  for (let ci = 1; ci < cols.length; ci++) {
    const prev = cols[ci - 1].map((n) => n.id);
    const anchor = (n: RegistryEntry) => {
      const idx = n.dependsOn.map((d) => prev.indexOf(d)).filter((i) => i >= 0);
      return idx.length ? idx.reduce((x, y) => x + y, 0) / idx.length : prev.length;
    };
    cols[ci].sort((a, b) => anchor(a) - anchor(b) || statusRank[a.status] - statusRank[b.status] || a.id.localeCompare(b.id));
  }
  const tallest = Math.max(...cols.map((c) => c.length));
  const W = PAD * 2 + cols.length * NODE_W + (cols.length - 1) * COL_GAP;
  const H = PAD * 2 + tallest * NODE_H + (tallest - 1) * ROW_GAP;
  const pos = new Map<string, { x: number; y: number }>();
  cols.forEach((c, ci) => {
    const colH = c.length * NODE_H + (c.length - 1) * ROW_GAP;
    const y0 = PAD + (H - PAD * 2 - colH) / 2;
    c.forEach((n, ri) => pos.set(n.id, { x: PAD + ci * (NODE_W + COL_GAP), y: y0 + ri * (NODE_H + ROW_GAP) }));
  });

  const style = (s: RegistryEntry['status']) => {
    switch (s) {
      case 'CORE':
        return { fill: '#141414', stroke: '#141414', text: '#F7F6F2', dash: undefined };
      case 'MODULE':
        return { fill: '#FFFCF7', stroke: '#1E3A5F', text: '#141414', dash: undefined };
      case 'RESEARCH':
        return { fill: '#FFFCF7', stroke: '#141414', text: '#141414', dash: '4 3' };
      case 'EXPERIMENT':
        return { fill: '#FFFCF7', stroke: '#8B1E2D', text: '#141414', dash: undefined };
      case 'INTERNAL':
        return { fill: '#F7F6F2', stroke: '#5A584F', text: '#5A584F', dash: undefined };
      default:
        return { fill: '#F7F6F2', stroke: '#DDD9CE', text: '#5A584F', dash: undefined };
    }
  };

  const edges = nodes.flatMap((n) => n.dependsOn.filter((d) => pos.has(d)).map((d) => ({ from: d, to: n.id })));

  return (
    <figure className="fig">
      <svg viewBox={`0 0 ${W} ${H}`} role="group" aria-labelledby="dep-title dep-desc" style={{ width: '100%', height: 'auto', maxWidth: W }}>
        <title id="dep-title">Dependency graph of the register</title>
        <desc id="dep-desc">{edges.map((e) => `${e.to} depends on ${e.from}`).join('. ') || 'No edges.'}</desc>
        <defs>
          <marker id="dep-arrow" viewBox="0 0 8 8" refX="8" refY="4" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0,0 L8,4 L0,8 z" fill="#5A584F" />
          </marker>
        </defs>
        {edges.map((e) => {
          const a = pos.get(e.from)!;
          const b = pos.get(e.to)!;
          const x1 = a.x + NODE_W;
          const y1 = a.y + NODE_H / 2;
          const x2 = b.x;
          const y2 = b.y + NODE_H / 2;
          const cx = (x1 + x2) / 2;
          return (
            <path
              key={`${e.from}->${e.to}`}
              d={`M ${x1} ${y1} C ${cx} ${y1}, ${cx} ${y2}, ${x2 - 1} ${y2}`}
              fill="none"
              stroke="#5A584F"
              strokeWidth="1.25"
              markerEnd="url(#dep-arrow)"
            >
              <title>{`${e.to} → depends on → ${e.from}`}</title>
            </path>
          );
        })}
        {nodes.map((n) => {
          const p = pos.get(n.id)!;
          const s = style(n.status);
          return (
            <a key={n.id} href={`/registry/${n.id}`}>
              <g>
                <rect x={p.x} y={p.y} width={NODE_W} height={NODE_H} fill={s.fill} stroke={s.stroke} strokeWidth="1.25" strokeDasharray={s.dash} />
                <text x={p.x + 10} y={p.y + 17} fontSize="11.5" fontFamily="IBM Plex Mono, monospace" fill={s.text}>
                  {n.id.length > 22 ? n.id.slice(0, 21) + '…' : n.id}
                </text>
                <text x={p.x + 10} y={p.y + 31} fontSize="9" fontFamily="IBM Plex Mono, monospace" fill={s.text} letterSpacing="0.08em" opacity="0.85">
                  {n.status}
                  {n.cluster !== 'physical-ai' ? ` · ${n.cluster.toUpperCase()}` : ''}
                </text>
                <title>{`${n.id} [${n.status}] — ${n.technicalRole}`}</title>
              </g>
            </a>
          );
        })}
      </svg>
      <figcaption>
        Arrows point from a dependency to the entry that needs it. Columns are dependency depth. NeuralBridge is drawn
        because inspection depends on its authorisation interface; it is owned by the Energy cluster and consumed by
        contract only.
      </figcaption>
    </figure>
  );
}
