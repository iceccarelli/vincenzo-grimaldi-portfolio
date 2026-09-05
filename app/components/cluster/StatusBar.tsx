import { STATUSES } from '../../lib/cluster/types';
import { owned } from '../../lib/cluster/registry';

/**
 * StatusBar — the register's status distribution as one segmented bar.
 * Each segment carries its word and count; the segment styles mirror the
 * badges (ink = CORE, rhine = MODULE, dashed = RESEARCH, fault = EXPERIMENT).
 */
export default function StatusBar() {
  const counts = STATUSES.map((s) => ({ s, n: owned.filter((r) => r.status === s).length })).filter((x) => x.n > 0);
  const total = counts.reduce((a, x) => a + x.n, 0);
  return (
    <figure className="fig fig-tight">
      <ul className="stbar" aria-label={`Status distribution: ${counts.map((c) => `${c.s} ${c.n}`).join(', ')} of ${total} entries`}>
        {counts.map((c) => (
          <li key={c.s} style={{ flexGrow: c.n }}>
            <a href={`/registry#st-${c.s}`} className={`stbar-seg st-${c.s.toLowerCase()}`}>
              <span>{c.s}</span> <strong>{c.n}</strong>
            </a>
          </li>
        ))}
      </ul>
      <figcaption>
        {total} entries owned by this cluster. Widths are counts; every segment links to its section of the register.
      </figcaption>
    </figure>
  );
}
