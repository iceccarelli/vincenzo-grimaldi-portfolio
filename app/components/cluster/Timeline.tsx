import { timeline } from '../../lib/cluster/evidence';
import type { TimelineEvent } from '../../lib/cluster/types';

/**
 * Timeline — dated events on one axis. Marker shape encodes kind (● release,
 * ○ commit, ◆ decision, ◇ due) and the kind word is in every tooltip, so
 * shape is never the only cue. Labels are laid out into lanes so nothing
 * overlaps; the source of each date is in the table below the figure.
 */
const W = 960;
const AXIS_Y = 150;
const PAD_X = 40;
const LANE_H = 24;

const day = (iso: string) => Math.round(new Date(iso + 'T00:00:00Z').getTime() / 86400000);

function shortLabel(e: TimelineEvent) {
  const s = e.label.split(' — ')[0].split(' (')[0].split(': ')[0].split('; ')[0];
  return s.length > 40 ? s.slice(0, 39) + '…' : s;
}

export default function Timeline({ events = timeline }: { events?: TimelineEvent[] }) {
  const sorted = [...events].sort((a, b) => a.date.localeCompare(b.date));
  const d0 = day(sorted[0].date) - 10;
  const d1 = day(sorted[sorted.length - 1].date) + 10;
  const x = (iso: string) => PAD_X + ((day(iso) - d0) / (d1 - d0)) * (W - PAD_X * 2);

  // lane assignment: labels ~ 6.3px per char; labels in the right third are
  // right-anchored so nothing leaves the canvas. Each lane tracks occupied
  // intervals; a label takes the first lane where its interval is free.
  const lanes: number[] = [];
  const anchorEnd: boolean[] = [];
  const laneIntervals: [number, number][][] = [];
  sorted.forEach((e) => {
    const cx = x(e.date);
    const width = shortLabel(e).length * 6.3 + 12;
    const end = cx + width > W - PAD_X;
    const iv: [number, number] = end ? [cx - width, cx] : [cx, cx + width];
    let lane = 0;
    while ((laneIntervals[lane] ?? []).some(([a, b]) => iv[0] < b + 10 && iv[1] > a - 10)) lane++;
    (laneIntervals[lane] ??= []).push(iv);
    lanes.push(lane);
    anchorEnd.push(end);
  });
  const maxLane = Math.max(...lanes);
  const H = AXIS_Y + 60;
  const top = AXIS_Y - 30 - maxLane * LANE_H;

  // month ticks
  const months: { x: number; label: string }[] = [];
  const first = new Date(sorted[0].date + 'T00:00:00Z');
  const cur = new Date(Date.UTC(first.getUTCFullYear(), first.getUTCMonth(), 1));
  const last = new Date(sorted[sorted.length - 1].date + 'T00:00:00Z');
  while (cur <= last) {
    const iso = cur.toISOString().slice(0, 10);
    if (day(iso) >= d0) months.push({ x: x(iso), label: cur.toLocaleString('en-GB', { month: 'short', timeZone: 'UTC' }) });
    cur.setUTCMonth(cur.getUTCMonth() + 1);
  }

  const marker = (e: TimelineEvent, cx: number) => {
    const s = 6;
    switch (e.kind) {
      case 'release':
        return <circle cx={cx} cy={AXIS_Y} r={s} fill="#141414" />;
      case 'commit':
        return <circle cx={cx} cy={AXIS_Y} r={s} fill="#F7F6F2" stroke="#141414" strokeWidth="1.5" />;
      case 'decision':
        return <rect x={cx - s} y={AXIS_Y - s} width={s * 2} height={s * 2} fill="#1E3A5F" transform={`rotate(45 ${cx} ${AXIS_Y})`} />;
      default:
        return <rect x={cx - s} y={AXIS_Y - s} width={s * 2} height={s * 2} fill="#F7F6F2" stroke="#8B1E2D" strokeWidth="1.5" strokeDasharray="3 2" transform={`rotate(45 ${cx} ${AXIS_Y})`} />;
    }
  };

  return (
    <figure className="fig">
      <svg viewBox={`0 ${top - 10} ${W} ${H - top + 10}`} role="img" aria-labelledby="tl-title tl-desc" style={{ width: '100%', height: 'auto' }}>
        <title id="tl-title">Evidence timeline</title>
        <desc id="tl-desc">{sorted.map((e) => `${e.date} ${e.kind}: ${e.label}`).join('. ')}</desc>
        <line x1={PAD_X} y1={AXIS_Y} x2={W - PAD_X} y2={AXIS_Y} stroke="#DDD9CE" strokeWidth="1.5" />
        {months.map((m) => (
          <g key={m.label + m.x}>
            <line x1={m.x} y1={AXIS_Y - 4} x2={m.x} y2={AXIS_Y + 4} stroke="#5A584F" />
            <text x={m.x} y={AXIS_Y + 22} fontSize="10" fontFamily="IBM Plex Mono, monospace" fill="#5A584F" textAnchor="middle">
              {m.label}
            </text>
          </g>
        ))}
        {sorted.map((e, i) => {
          const cx = x(e.date);
          const ly = AXIS_Y - 26 - lanes[i] * LANE_H;
          return (
            <g key={e.date + e.label}>
              <line x1={cx} y1={ly + 4} x2={cx} y2={AXIS_Y - 8} stroke="#DDD9CE" strokeWidth="1" />
              {marker(e, cx)}
              <text x={cx} y={ly} fontSize="10.5" fontFamily="IBM Plex Mono, monospace" fill={e.kind === 'due' ? '#8B1E2D' : '#141414'} textAnchor={anchorEnd[i] ? 'end' : 'start'}>
                {shortLabel(e)}
              </text>
              <title>{`${e.date} · ${e.kind} · ${e.label} (source: ${e.source})`}</title>
            </g>
          );
        })}
        <g fontSize="10" fontFamily="IBM Plex Mono, monospace" fill="#5A584F">
          <circle cx={PAD_X + 6} cy={AXIS_Y + 38} r="5" fill="#141414" />
          <text x={PAD_X + 16} y={AXIS_Y + 42}>release</text>
          <circle cx={PAD_X + 86} cy={AXIS_Y + 38} r="5" fill="#F7F6F2" stroke="#141414" strokeWidth="1.5" />
          <text x={PAD_X + 96} y={AXIS_Y + 42}>commit</text>
          <rect x={PAD_X + 160} y={AXIS_Y + 33} width="10" height="10" fill="#1E3A5F" transform={`rotate(45 ${PAD_X + 165} ${AXIS_Y + 38})`} />
          <text x={PAD_X + 176} y={AXIS_Y + 42}>decision</text>
          <rect x={PAD_X + 250} y={AXIS_Y + 33} width="10" height="10" fill="#F7F6F2" stroke="#8B1E2D" strokeDasharray="3 2" transform={`rotate(45 ${PAD_X + 255} ${AXIS_Y + 38})`} />
          <text x={PAD_X + 266} y={AXIS_Y + 42}>decision due</text>
        </g>
      </svg>
      <details className="fig-data">
        <summary>Dates and sources</summary>
        <div className="tbl-wrap" tabIndex={0}>
          <table className="tbl">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Kind</th>
                <th scope="col">Event</th>
                <th scope="col">Source</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((e) => (
                <tr key={e.date + e.label}>
                  <td>
                    <time dateTime={e.date}>{e.date}</time>
                  </td>
                  <td>{e.kind}</td>
                  <td>{e.label}</td>
                  <td>
                    <code className="path">{e.source}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </figure>
  );
}
