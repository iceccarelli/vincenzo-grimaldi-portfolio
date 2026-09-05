import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import StatusBadge from '../../components/cluster/StatusBadge';
import { SoftwareAppJsonLd } from '../../components/JsonLd';
import { getEntry, registry } from '../../lib/cluster/registry';
import { liveMetadata } from '../../lib/cluster/github';
import { SITE_URL } from '../../lib/site';

type Props = { params: { id: string } };

export const revalidate = 3600;

export function generateStaticParams() {
  return registry.map((r) => ({ id: r.id }));
}

export function generateMetadata({ params }: Props): Metadata {
  const e = getEntry(params.id);
  if (!e) return { title: 'Not found' };
  return {
    title: `${e.id} — ${e.status}`,
    description: e.description,
    alternates: { canonical: `/registry/${e.id}` },
  };
}

const grade = (g: string) => <span className={`grade grade-${g}`}>{g}</span>;

/**
 * /registry/[id] — every field of one register entry, in mandate order.
 * Nothing is hidden behind a tab; a CEO reads it top to bottom.
 */
export default async function EntryPage({ params }: Props) {
  const e = getEntry(params.id);
  if (!e) notFound();
  const meta = (await liveMetadata())[e.id];
  const gh = e.artifacts.find((a) => a.kind === 'github');
  const dep = e.artifacts.find((a) => a.kind === 'deployment');

  const rows: { k: string; v: React.ReactNode }[] = [
    { k: 'Repository', v: <code className="path">{e.repository}</code> },
    { k: 'Cluster', v: e.cluster },
    { k: 'Status', v: <StatusBadge status={e.status} /> },
    { k: 'Language', v: e.language.length ? e.language.join(', ') : '—' },
    {
      k: 'Activity',
      v: (
        meta?.pushedAt ? (
          <>
            last commit <time dateTime={meta.pushedAt}>{meta.pushedAt}</time> <span className="muted">({meta.source}, as of {meta.asOf})</span>
            {meta.stars !== null && <span className="muted"> · {meta.stars} stars · {meta.openIssues} open issues</span>}
          </>
        ) : (
          <span className="muted">repository not public — no activity claim</span>
        )
      ),
    },
    { k: 'Architecture', v: e.architecture },
    { k: 'Dependencies', v: e.dependencies.length ? e.dependencies.join(' · ') : '—' },
    { k: 'Maturity', v: e.maturity },
    { k: 'Business hypothesis', v: e.businessHypothesis },
    { k: 'Customer', v: e.customer },
    { k: 'Technical role', v: e.technicalRole },
    { k: 'Duplicate functionality', v: e.duplicateFunctionality },
    { k: 'Strategic value', v: grade(e.strategicValue) },
    { k: 'IP value', v: grade(e.ipValue) },
    { k: 'Revenue potential', v: grade(e.revenuePotential) },
    { k: 'Integration potential', v: grade(e.integrationPotential) },
    { k: 'Security risk', v: grade(e.securityRisk) },
    { k: 'Regulatory implications', v: e.regulatory },
    { k: 'Recommended status', v: <><StatusBadge status={e.status} /> — {e.rationale}</> },
  ];

  return (
    <main className="doc">
      {gh && (
        <SoftwareAppJsonLd
          name={e.id}
          description={e.description}
          url={`${SITE_URL}/registry/${e.id}`}
          repo={gh.url}
          live={dep?.url}
        />
      )}
      <section className="blk blk-first">
        <p className="kicker">
          <a href="/registry">← Register</a>
        </p>
        <h1 className="h1">
          {e.id} <StatusBadge status={e.status} />
        </h1>
        <p className="lead">{e.description}</p>
        {e.artifacts.length > 0 ? (
          <p className="path-line">
            {e.artifacts.map((a) => (
              <a key={a.url} href={a.url} rel="noopener noreferrer" className="path">
                {a.label}
                {a.kind === 'deployment' && !a.verified ? ' (stated, not verified here)' : ''}
              </a>
            ))}
          </p>
        ) : (
          <p className="path-line">
            <code className="path">no public artifact</code>
          </p>
        )}
      </section>

      <section className="blk">
        <dl className="fields">
          {rows.map((r) => (
            <div key={r.k}>
              <dt>{r.k}</dt>
              <dd>{r.v}</dd>
            </div>
          ))}
        </dl>
        <p className="blk-more">
          <a href={`/api/cluster/registry?id=${e.id}`}>JSON</a>
        </p>
      </section>
    </main>
  );
}
