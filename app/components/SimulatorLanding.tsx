'use client';

import { useLanguage } from '../lib/i18n';

/**
 * SimulatorLanding — the thesis-simulator section, relocated from the
 * homepage. First-party route now; the deployment itself moves to
 * sim.igrimaldi.engineering in P2 (see execution order).
 */
export default function SimulatorLanding() {
  const { t } = useLanguage();

  return (
    <main className="content-sheet route-page">
      <section className="section-shell content-section" id="thesis-simulator">
        <div className="glass-panel cta-panel spotlight-border">
          <div>
            <span className="section-kicker">{t.thesis.kicker}</span>
            <h1>{t.thesis.title}</h1>
            <p className="section-intro">{t.thesis.intro}</p>
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

          <div className="hero-actions">
            <a className="primary-button" href="https://physics-informed.vercel.app/" target="_blank" rel="noreferrer">
              {t.thesis.cta}
            </a>
            <a className="secondary-button" href="/work/cim-threma">
              Read the case study
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
