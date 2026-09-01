'use client';

import HeroInstrument from './HeroInstrument';
import ResidualTable from './ResidualTable';
import StatusBadge from './StatusBadge';
import { useLanguage } from '../lib/i18n';
import { simulator, tx } from '../lib/copy';
import { EXPLORER_DEMOS_URL, EXPLORER_URL, type ValidationSource } from '../lib/validation';

/**
 * SimulatorLanding — /simulator.
 *   1. The in-browser DC instrument (same solver as the hero, full size).
 *   2. Deep link to the explorer (no iframe: the deployment sets its own
 *      frame policy and an embed that may silently fail is not an instrument).
 *   3. The residual table — the explorer's report, live-fetched or snapshot.
 *   4. "What this is not" — the thesis/explorer split, the pilot boundary,
 *      the 404 repo path.
 */
export default function SimulatorLanding({ validation }: { validation: ValidationSource }) {
  const { t, locale } = useLanguage();

  return (
    <main className="content-sheet route-page">
      <section className="section-shell content-section" id="instrument">
        <span className="section-kicker">{tx(simulator.kicker, locale)}</span>
        <div style={{ marginBottom: '0.75rem' }}>
          <StatusBadge status="SHIPPED DEMO" locale={locale} note="physics-informed.vercel.app" />
        </div>
        <h1>{tx(simulator.title, locale)}</h1>
        <p className="section-intro" style={{ maxWidth: '760px' }}>{tx(simulator.intro, locale)}</p>

        <div className="simulator-grid">
          <div className="hero-panel hero-panel--instrument">
            <HeroInstrument validation={validation} />
          </div>
          <div className="glass-panel cta-panel spotlight-border">
            <div>
              <span className="section-kicker">physics-informed.vercel.app</span>
              <h2>{t.thesis.cta}</h2>
              <p>
                DC explorer · AC vs Newton-Raphson · N-1 · PINN vs black-box ablation · tests · one-command report.
              </p>
            </div>
            <div className="hero-actions">
              <a className="primary-button" href={EXPLORER_URL} target="_blank" rel="noopener noreferrer">
                {t.thesis.cta} ↗
              </a>
              <a className="secondary-button" href={EXPLORER_DEMOS_URL} target="_blank" rel="noopener noreferrer">
                /demos ↗
              </a>
              <a className="secondary-button" href="/work/cim-threma">
                {tx({ en: 'Case study', de: 'Fallstudie', es: 'Caso de estudio', zh: '案例' }, locale)} →
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell content-section" id="residuals">
        <span className="section-kicker">{tx(simulator.tableKicker, locale)}</span>
        <ResidualTable validation={validation} />
      </section>

      <section className="section-shell content-section" id="not">
        <div className="glass-panel cta-panel spotlight-border">
          <div>
            <span className="section-kicker">{tx(simulator.notKicker, locale)}</span>
            <ol className="not-list">
              <li>{tx(simulator.not1, locale)}</li>
              <li>{tx(simulator.not2, locale)}</li>
              <li>{tx(simulator.not3, locale)}</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="section-shell content-section" id="thesis">
        <div className="glass-panel cta-panel spotlight-border">
          <div>
            <span className="section-kicker">{tx(simulator.thesisKicker, locale)}</span>
            <div style={{ marginBottom: '0.5rem' }}>
              <StatusBadge status="RESEARCH" locale={locale} note={t.thesis.kicker} />
            </div>
            <h2>{t.thesis.title}</h2>
            <p>{t.thesis.intro}</p>
          </div>
          <div className="thesis-tags">
            {[
              'CIM–ThreMA cross-domain ontology',
              '5 formal semantic mappings',
              'IEEE 9-bus cyber testbed',
              '4 documented attack scenarios',
              'Q-learning RL security agent',
              'Cross-domain SNR metric',
            ].map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
