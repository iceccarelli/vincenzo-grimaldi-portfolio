'use client';

import { useLanguage } from '../lib/i18n';

/**
 * DomainNetwork — the three-property architecture, rendered in the active
 * locale. Each card carries a single non-overlapping mandate:
 *
 *   igrimaldi.engineering   → software, AI agents, infrastructure (this site)
 *   engineeringgrimaldi.com → hardware + electrical engineering
 *   grimaldi.ca             → personal blog, social, life
 */
export default function DomainNetwork() {
  const { t } = useLanguage();

  return (
    <section className="section-shell content-section" id="network">
      <div className="glass-panel cta-panel spotlight-border">
        <div>
          <span className="section-kicker">{t.network.kicker}</span>
          <h2>{t.network.title}</h2>
          <p className="section-intro">{t.network.intro}</p>
        </div>

        <div className="network-grid">
          {t.network.domains.map((domain) => {
            const isCurrent = domain.host === 'igrimaldi.engineering';
            return (
              <a
                key={domain.host}
                className={`network-card ${isCurrent ? 'network-card-current' : ''}`}
                href={domain.href}
                target={isCurrent ? undefined : '_blank'}
                rel={isCurrent ? undefined : 'noreferrer'}
                aria-current={isCurrent ? 'page' : undefined}
              >
                <span className="network-host">{domain.host}</span>
                <span className="network-focus">{domain.focus}</span>
                <p className="network-description">{domain.description}</p>
                <span className="network-cta">{domain.cta} →</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
