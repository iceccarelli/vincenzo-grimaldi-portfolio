import type { Metadata } from 'next';
import Link from 'next/link';
import DomainNav from '../components/DomainNav';
import Plate from '../components/Plate';
import { articles } from '../lib/electrical';
import { SITE_URL } from '../lib/site';

export const metadata: Metadata = {
  title: 'Technical Articles',
  description:
    'Technical articles on 50 Hz synchronous grid inertia, IT/OT convergence in railway traction power, and electrical capacity bottlenecks for AI infrastructure.',
  alternates: { canonical: '/articles' },
  openGraph: {
    title: 'Technical Articles — Electrical Grids, Traction Power & Capacity',
    description:
      'Explainers on grid inertia, IT/OT convergence in critical infrastructure, and power-capacity envelopes.',
    url: SITE_URL + '/articles',
    images: [{ url: SITE_URL + '/images/electrical/05-grid-inertia-frequency-stability.jpg', width: 1168, height: 784 }],
  },
};

export default function ArticlesIndexPage() {
  return (
    <main className="doc doc-wide">
      <DomainNav current="/articles" />

      <section className="blk blk-first">
        <p className="kicker">Domain Explainers & Analyses</p>
        <h1 className="h1">Technical articles</h1>
        <p className="lead">
          Architectural notes examining physical constraints in 50 Hz transmission grids, railway traction IT/OT systems, and high-density compute interconnections.
        </p>

        <ol className="entries">
          {articles.map((a, idx) => (
            <li key={a.slug} className="entry">
              <Plate
                src={a.heroImage}
                alt={a.heroAlt}
                code={a.heroCode}
                priority={idx === 0}
              />
              <h2>
                <Link href={'/articles/' + a.slug}>{a.title}</Link>
              </h2>
              <p className="entry-kind">
                {a.kicker} · {a.readingTime} · <time dateTime={a.date}>{a.date}</time>
              </p>
              <p>{a.summary}</p>
              <p className="tags">
                {a.tags.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </p>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
