'use client';

import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../lib/i18n';
import { extra } from '../lib/uiStrings';
import { caseStudies } from '../lib/work';

/**
 * WorkTeaser — the four case-study cards on the homepage. Each links to a
 * crawlable /work/[slug] route; the full registry lives at /work.
 */
export default function WorkTeaser() {
  const { locale } = useLanguage();
  const x = extra[locale];

  return (
    <section className="section-shell content-section" id="work">
      <div style={{ maxWidth: '680px' }}>
        <span className="section-kicker">{x.navWork}</span>
        <h2 style={{ marginTop: '0.6rem' }}>{x.ctaWork}</h2>
      </div>

      <div className="work-grid">
        {caseStudies.map((c) => (
          <a key={c.slug} className="work-card glass-panel spotlight-border" href={`/work/${c.slug}`}>
            <h3>{c.name}</h3>
            <p>{c.description}</p>
            <span className="work-card-stack">
              {c.stack.slice(0, 4).map((s) => (
                <span key={s} className="metric-pill">{s}</span>
              ))}
            </span>
            <span className="work-card-more">
              {x.ctaWork} <ArrowRight size={15} />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
