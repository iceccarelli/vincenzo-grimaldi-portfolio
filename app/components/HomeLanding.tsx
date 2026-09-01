'use client';

import HeroInstrument from './HeroInstrument';
import { useLanguage } from '../lib/i18n';
import { home, nav, tx } from '../lib/copy';
import { emit } from '../lib/events';
import { EXPLORER_URL, fmtDeg, type ValidationSource } from '../lib/validation';
import type { PaymentLinks } from '../lib/site';

/**
 * HomeLanding — 2026-09 IA.
 *
 *   Above the fold:  H1 + two-line promise + ONE paid CTA + ONE instrument.
 *   Below the fold:  exactly three proof chips, one context line, one
 *                    next-step strip, one ranked map of the other routes.
 *
 * No decorative canvases, no carousels, no second commercial story. The
 * previous seven visualisers were synthetic; the instrument on the right
 * solves a real power flow and prints its residual.
 */
export default function HomeLanding({
  links,
  validation,
}: {
  links: PaymentLinks;
  validation: ValidationSource;
}) {
  const { locale } = useLanguage();
  const r = validation.report;

  return (
    <main>
      {/* HERO */}
      <section className="section-shell hero-section hero-section--instrument" id="top">
        <div className="hero-grid">
          <div className="hero-copy">
            <h1>{tx(home.h1, locale)}</h1>
            <p className="hero-lead">
              {tx(home.promise1, locale)}
              <br />
              {tx(home.promise2, locale)}
            </p>
            <div className="hero-actions">
              <a
                className="primary-button"
                href={links.consult.href}
                {...(links.consult.isStripe ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                onClick={() => emit('book_click', { source: 'hero', channel: links.consult.isStripe ? 'stripe' : 'email' })}
              >
                {tx(home.ctaTeardown, locale)}
              </a>
              <a className="secondary-button" href={EXPLORER_URL} target="_blank" rel="noopener noreferrer">
                {tx(home.ctaExplorer, locale)} ↗
              </a>
            </div>
          </div>

          <aside className="hero-panel hero-panel--instrument" aria-label={tx(home.ctaExplorer, locale)}>
            <HeroInstrument validation={validation} compact />
          </aside>
        </div>
      </section>

      <div className="content-sheet">
        {/* EXACTLY THREE PROOF CHIPS */}
        <section className="section-shell content-section" id="proof">
          <span className="section-kicker">{tx(home.chipsKicker, locale)}</span>
          <ol className="proof-chips">
            <li className="proof-chip glass-panel">
              <span className="proof-chip-label">{tx(home.chip1Label, locale)}</span>
              <p>
                {tx(home.chip1Body, locale)
                  .replace('{ac}', fmtDeg(r.ac_pinn.angle_rmse_deg))
                  .replace('{dc}', fmtDeg(r.dc_pinn.rmse_deg))
                  .replace('{tests}', String(r.tests_passed))}
              </p>
              <a href="/simulator">/simulator →</a>
            </li>
            <li className="proof-chip glass-panel">
              <span className="proof-chip-label">{tx(home.chip2Label, locale)}</span>
              <p>{tx(home.chip2Body, locale)}</p>
              <a href="/work#context">/work →</a>
            </li>
            <li className="proof-chip glass-panel">
              <span className="proof-chip-label">{tx(home.chip3Label, locale)}</span>
              <p>{tx(home.chip3Body, locale)}</p>
              <a href="/advisory">/advisory →</a>
            </li>
          </ol>
        </section>

        {/* CONTEXT — one paragraph */}
        <section className="section-shell content-section" id="about">
          <div className="glass-panel cta-panel spotlight-border">
            <span className="section-kicker">{tx(home.contextKicker, locale)}</span>
            <p>{tx(home.contextBody, locale)}</p>
          </div>
        </section>

        {/* NEXT STEP */}
        <section className="section-shell content-section" id="next">
          <div className="glass-panel cta-panel spotlight-border">
            <div>
              <span className="section-kicker">{tx(home.nextKicker, locale)}</span>
              <h2>{tx(home.nextTitle, locale)}</h2>
              <p>{tx(home.nextBody, locale)}</p>
            </div>
            <div className="hero-actions">
              <a
                className="primary-button"
                href={links.consult.href}
                {...(links.consult.isStripe ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                onClick={() => emit('book_click', { source: 'home_next', channel: links.consult.isStripe ? 'stripe' : 'email' })}
              >
                {tx(home.ctaTeardown, locale)}
              </a>
              <a className="secondary-button" href="/advisory">
                {tx(home.seeAdvisory, locale)}
              </a>
              <a className="secondary-button" href="/work">
                {tx(home.seeWork, locale)}
              </a>
            </div>
          </div>
        </section>

        {/* RANKED MAP — Hero / Work / Ventures / Lab / Archive */}
        <nav className="section-shell content-section site-map" aria-label="Site map">
          <ol>
            <li><a href="/work">{tx(nav.work, locale)}</a><span>SHIPPED DEMO · CLIENT BUILD</span></li>
            <li><a href="/ventures">{tx(nav.ventures, locale)}</a><span>CLIENT BUILD · SHIPPED v0.2</span></li>
            <li><a href="/lab">{tx(nav.lab, locale)}</a><span>PARKED · PILOT</span></li>
            <li><a href="/books">{tx(nav.books, locale)}</a><span>IN REVISION</span></li>
            <li><a href="/card">/card</a><span>vCard · QR</span></li>
          </ol>
        </nav>
      </div>
    </main>
  );
}
