import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SoftwareAppJsonLd } from '../../components/JsonLd';
import { caseStudies, getCaseStudy } from '../../lib/work';
import { copy } from '../../lib/copy';
import { SITE_URL } from '../../lib/site';

type Props = { params: { slug: string } };

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const c = getCaseStudy(params.slug);
  if (!c) return {};
  return {
    title: c.title,
    description: c.description,
    alternates: { canonical: `/work/${c.slug}` },
    openGraph: {
      title: c.title,
      description: c.description,
      url: `${SITE_URL}/work/${c.slug}`,
      type: 'article',
    },
  };
}

/**
 * /work/[slug] — a document page: problem, approach, validation, limits.
 * The "Limits" section is mandatory; an entry without stated limits is
 * not defendable and does not ship.
 */
export default function CaseStudyPage({ params }: Props) {
  const w = getCaseStudy(params.slug);
  if (!w) notFound();
  const c = copy.en.work;

  return (
    <main className="doc">
      <article className="blk blk-first">
        <p className="kicker">
          <a href="/work">{c.back}</a>
        </p>
        <h1 className="h1">{w.title}</h1>
        <p className="entry-kind">{w.kind}</p>
        <p className="lead">{w.description}</p>

        <p className="path-line">
          {w.paths.map((p) => (
            <code key={p} className="path">{p}</code>
          ))}
        </p>

        <h2 className="blk-h">{c.problem}</h2>
        <p>{w.problem}</p>
        <h2 className="blk-h">{c.approach}</h2>
        <p>{w.approach}</p>
        <h2 className="blk-h">{c.validation}</h2>
        <p>{w.validation}</p>
        <h2 className="blk-h">{c.limits}</h2>
        <p>{w.limits}</p>

        <p className="tags">
          {w.stack.map((s) => (
            <span key={s} className="tag">{s}</span>
          ))}
        </p>

        <p className="actions">
          {w.live && (
            <a className="btn" href={w.live} rel="noopener noreferrer">
              {c.openLive} ↗
            </a>
          )}
          {w.repo && (
            <a className="btn-quiet" href={w.repo} rel="noopener noreferrer">
              {c.openRepo} ↗
            </a>
          )}
        </p>
      </article>

      <SoftwareAppJsonLd
        name={w.name}
        description={w.description}
        url={`${SITE_URL}/work/${w.slug}`}
        repo={w.repo}
        live={w.live}
      />
    </main>
  );
}
