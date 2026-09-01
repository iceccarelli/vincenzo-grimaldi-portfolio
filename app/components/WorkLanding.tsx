'use client';

import StatusBadge from './StatusBadge';
import { useLanguage } from '../lib/i18n';
import { tx, work } from '../lib/copy';
import { registerStudies } from '../lib/work';
import { linkable } from '../lib/status';

/**
 * WorkLanding — the gated capability register. Only entries with
 * `onRegister: true` in lib/work.ts render as cards; the gate is printed
 * on the page so a reader can hold the page to it. Palletizer is a
 * one-line pointer, not a card. The operator credential is context.
 */
export default function WorkLanding() {
  const { locale } = useLanguage();

  return (
    <main className="content-sheet route-page">
      <section className="section-shell content-section" id="register">
        <span className="section-kicker">{tx(work.kicker, locale)}</span>
        <h1>{tx(work.title, locale)}</h1>
        <p className="section-intro" style={{ maxWidth: '720px' }}>{tx(work.gate, locale)}</p>

        <div className="work-grid">
          {registerStudies.map((c) => {
            const repo = linkable(c.repo);
            return (
              <article key={c.slug} className="work-card glass-panel spotlight-border">
                <StatusBadge status={c.status} locale={locale} />
                <h2 className="work-card-title">{c.name}</h2>
                <p>{c.description}</p>
                <span className="work-card-stack">
                  {c.stack.slice(0, 4).map((s) => (
                    <span key={s} className="metric-pill">{s}</span>
                  ))}
                </span>
                <div className="work-card-links">
                  {c.live && (
                    <a className="primary-button" href={c.live} target="_blank" rel="noopener noreferrer">
                      {tx(work.open, locale)} ↗
                    </a>
                  )}
                  {repo && (
                    <a className="secondary-button" href={repo} target="_blank" rel="noopener noreferrer">
                      {tx(work.source, locale)} ↗
                    </a>
                  )}
                  <a className="secondary-button" href={`/work/${c.slug}`}>
                    {tx(work.caseStudy, locale)} →
                  </a>
                </div>
                {c.repoClaimed && !repo && (
                  <p className="work-card-dead">
                    <s>{c.repoClaimed.replace('https://', '')}</s> — {tx(work.repoNotPublic, locale)}
                  </p>
                )}
              </article>
            );
          })}
        </div>
      </section>

      {/* One-line pointer — not a product card */}
      <section className="section-shell content-section" id="pointer">
        <span className="section-kicker">{tx(work.pointerKicker, locale)}</span>
        <p className="pointer-line">
          <StatusBadge status="SHIPPED" locale={locale} note="v0.2 HEURISTIC" />
          <span>{tx(work.palletizerLine, locale)}</span>
          <a href="https://engineeringgrimaldi.com/" target="_blank" rel="noopener noreferrer">engineeringgrimaldi.com ↗</a>
          <a href="https://palletizer-app.vercel.app/" target="_blank" rel="noopener noreferrer">palletizer-app.vercel.app ↗</a>
        </p>
      </section>

      {/* Sanitized credential — context, not a product */}
      <section className="section-shell content-section" id="context">
        <div className="glass-panel cta-panel spotlight-border">
          <div>
            <span className="section-kicker">{tx(work.contextKicker, locale)}</span>
            <h2>{tx(work.contextTitle, locale)}</h2>
            <p>{tx(work.contextBody, locale)}</p>
          </div>
          <div className="hero-actions">
            <a className="secondary-button" href="/capabilities">{tx(work.fullMatrix, locale)} →</a>
            <a className="secondary-button" href="/card">/card →</a>
          </div>
        </div>
      </section>
    </main>
  );
}
