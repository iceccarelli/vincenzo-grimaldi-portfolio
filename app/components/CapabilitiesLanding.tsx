'use client';

import CapabilitySystem from './CapabilitySystem';
import DomainNetwork from './DomainNetwork';
import { useLanguage } from '../lib/i18n';

/**
 * CapabilitiesLanding — the capability register, the physics-informed
 * layer and the domain network, relocated from the homepage to their own
 * crawlable route.
 */
export default function CapabilitiesLanding() {
  const { t } = useLanguage();

  return (
    <main className="content-sheet route-page">
      <CapabilitySystem />

      <section className="section-shell content-section" id="physics-informed">
        <div className="glass-panel cta-panel spotlight-border">
          <div>
            <span className="section-kicker">{t.physics.kicker}</span>
            <h2>{t.physics.title}</h2>
          </div>
          <div className="two-column-layout">
            <div>
              <p className="section-intro">{t.physics.intro}</p>

              <div className="math-block" style={{ display: 'grid', gap: '1rem' }}>
                <div style={{ fontSize: '1.2rem', lineHeight: 1.7, fontWeight: 700 }}>
                  <span style={{ color: 'var(--accent-strong)' }}>Total objective</span> = Data fidelity +{' '}
                  <span style={{ color: 'var(--success)' }}>Physics penalty</span>
                </div>
                <div style={{ color: 'var(--muted-strong)' }}>{t.physics.penaltyNote}</div>
                <div
                  style={{
                    padding: '1rem 1.1rem',
                    border: '1px solid rgba(125, 211, 252, 0.16)',
                    borderRadius: '16px',
                    background: 'rgba(8, 15, 28, 0.72)',
                    fontFamily: 'monospace',
                  }}
                >
                  L<sub>total</sub> = L<sub>data</sub> + &lambda;L<sub>physics</sub>
                  <br />
                  L<sub>physics</sub> = &#8214;&part;u/&part;t + N[u]&#8214;&sup2;
                </div>
              </div>
            </div>
            <div>
              <h3>{t.physics.futureHeading}</h3>
              <p>{t.physics.future}</p>
            </div>
          </div>
        </div>
      </section>

      <DomainNetwork />
    </main>
  );
}
