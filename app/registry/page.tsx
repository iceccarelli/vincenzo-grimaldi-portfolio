import type { Metadata } from 'next';
import RegistryTable from '../components/cluster/RegistryTable';
import StatusBadge from '../components/cluster/StatusBadge';
import { owned, boundaries, registry, REGISTRY_SNAPSHOT_DATE } from '../lib/cluster/registry';
import { STATUSES } from '../lib/cluster/types';
import { liveMetadata } from '../lib/cluster/github';

export const metadata: Metadata = {
  title: 'Repository register',
  description:
    'Machine-readable register of the Physical AI & Robotics cluster: every repository and module with status (CORE, MODULE, RESEARCH, INTERNAL, EXPERIMENT, ARCHIVE), public artifact, maturity, business hypothesis, IP and integration value, risk and rationale.',
  alternates: { canonical: '/registry' },
};

export const revalidate = 3600;

const statusMeaning: Record<(typeof STATUSES)[number], string> = {
  CORE: 'The product target or shared IP the cluster is measured by.',
  MODULE: 'A part of a CORE repository with its own role in the stack.',
  RESEARCH: 'Named work without a public artifact yet; no product claim.',
  INTERNAL: 'Private, or owned by another cluster and consumed by contract.',
  EXPERIMENT: 'Exists; has not passed the kill criteria; has a review date.',
  ARCHIVE: 'Frozen by decision. Kept for record, not developed.',
};

/**
 * /registry — the full register, grouped by status, with the meaning of
 * each status stated once. JSON at /api/cluster/registry.
 */
export default async function RegistryPage() {
  const meta = await liveMetadata();
  return (
    <main className="doc doc-wide">
      <section className="blk blk-first">
        <p className="kicker">Physical AI & Robotics · register</p>
        <h1 className="h1">Repository register</h1>
        <p className="lead">
          {owned.length} entries owned by this cluster, one entry consumed from another, {boundaries.length} boundaries.
          Snapshot {REGISTRY_SNAPSHOT_DATE}; commit dates refresh from GitHub where the repository is public.
          Machine-readable copy: <a href="/api/cluster/registry">/api/cluster/registry</a>.
        </p>
        <dl className="defs">
          {STATUSES.map((s) => (
            <div key={s}>
              <dt>
                <StatusBadge status={s} /> <span className="muted">{owned.filter((r) => r.status === s).length}</span>
              </dt>
              <dd>{statusMeaning[s]}</dd>
            </div>
          ))}
        </dl>
      </section>

      {STATUSES.filter((s) => registry.some((r) => r.status === s)).map((s) => (
        <section key={s} className="blk" aria-labelledby={`st-${s}`}>
          <h2 id={`st-${s}`} className="blk-h">
            {s}
          </h2>
          <RegistryTable entries={registry.filter((r) => r.status === s)} meta={meta} />
        </section>
      ))}

      <section className="blk" aria-labelledby="bounds">
        <h2 id="bounds" className="blk-h">Boundaries</h2>
        <p className="blk-intro">Not in this register. Listed so that nothing is claimed for them here.</p>
        <ul className="notes">
          {boundaries.map((b) => (
            <li key={b.name}>
              <span className="notes-name">{b.name}</span> <span className="muted">{b.owner}</span> — {b.rule}
              {b.artifact && (
                <>
                  {' '}
                  <code className="path">{b.artifact}</code>
                </>
              )}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
