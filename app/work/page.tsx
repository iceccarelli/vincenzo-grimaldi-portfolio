import type { Metadata } from 'next';
import { caseStudies } from '../lib/work';

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Shipped systems with inspectable proof: CIM–ThreMA ontology simulator, Palletizer OS, Bahn Project Manager, GridOS. Public repositories and live deployments where available.',
  alternates: { canonical: '/work' },
};

export const revalidate = 3600;

export default function WorkPage() {
  return (
    <main className="content-sheet route-page">
      <section className="section-shell content-section">
        <span className="section-kicker">Work</span>
        <h1>Shipped systems, with proof</h1>
        <p className="section-intro" style={{ maxWidth: '680px' }}>
          Every entry states what is public (repository, live deployment) and
          what is private. Claims without an inspectable artifact are marked as
          design statements.
        </p>

        <div className="work-grid">
          {caseStudies.map((c) => (
            <a key={c.slug} className="work-card glass-panel spotlight-border" href={`/work/${c.slug}`}>
              <h2 className="work-card-title">{c.name}</h2>
              <p>{c.description}</p>
              <span className="work-card-stack">
                {c.stack.slice(0, 4).map((s) => (
                  <span key={s} className="metric-pill">{s}</span>
                ))}
              </span>
              <span className="work-card-more">
                Case study →
              </span>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
