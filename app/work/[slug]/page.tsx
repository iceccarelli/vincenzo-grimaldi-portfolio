import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SoftwareAppJsonLd } from '../../components/JsonLd';
import { caseStudies, getCaseStudy } from '../../lib/work';
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

export default function CaseStudyPage({ params }: Props) {
  const c = getCaseStudy(params.slug);
  if (!c) notFound();

  return (
    <main className="content-sheet route-page">
      <article className="section-shell content-section case-study">
        <span className="section-kicker">Case study</span>
        <h1>{c.title}</h1>
        <p className="section-intro" style={{ maxWidth: '720px' }}>{c.description}</p>

        <div className="glass-panel cta-panel spotlight-border">
          <h2>Problem</h2>
          <p>{c.problem}</p>
          <h2>Approach</h2>
          <p>{c.approach}</p>
          <h2>Outcome & proof</h2>
          <p>{c.outcome}</p>

          <div className="metric-pills">
            {c.stack.map((s) => (
              <span key={s} className="metric-pill">{s}</span>
            ))}
          </div>

          <div className="hero-actions">
            {c.live && (
              <a className="primary-button" href={c.live} target="_blank" rel="noopener noreferrer">
                Open the live deployment
              </a>
            )}
            {c.repo && (
              <a className="secondary-button" href={c.repo} target="_blank" rel="noopener noreferrer">
                Inspect the source
              </a>
            )}
            <a className="secondary-button" href="/connect">
              Discuss a similar system
            </a>
          </div>
        </div>
      </article>

      <SoftwareAppJsonLd
        name={c.name}
        description={c.description}
        url={`${SITE_URL}/work/${c.slug}`}
        repo={c.repo}
        live={c.live}
      />
    </main>
  );
}
