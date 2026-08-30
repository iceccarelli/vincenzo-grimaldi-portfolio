'use client';

import { useLanguage } from './lib/i18n';
import { extra } from './lib/uiStrings';
import { caseStudies } from './lib/work';

/**
 * not-found.tsx — custom 404. Client component so it renders in the
 * visitor's locale; Next.js still serves it with HTTP status 404.
 */
export default function NotFound() {
  const { locale } = useLanguage();
  const x = extra[locale];

  return (
    <main className="content-sheet route-page">
      <section className="section-shell content-section">
        <span className="section-kicker">404</span>
        <h1>{x.notFoundTitle}</h1>
        <p className="section-intro" style={{ maxWidth: '560px' }}>{x.notFoundBody}</p>
        <div className="hero-actions">
          <a className="primary-button" href="/">{x.notFoundCta}</a>
          <a className="secondary-button" href="/work">/work</a>
          <a className="secondary-button" href="/connect">/connect</a>
        </div>
        <div className="work-grid" style={{ marginTop: '2rem' }}>
          {caseStudies.slice(0, 2).map((c) => (
            <a key={c.slug} className="work-card glass-panel spotlight-border" href={`/work/${c.slug}`}>
              <h3>{c.name}</h3>
              <p>{c.description}</p>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
