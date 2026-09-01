'use client';

import OfferCard from './OfferCard';
import { useLanguage } from '../lib/i18n';
import { advisory, tx } from '../lib/copy';
import type { PaymentLinks } from '../lib/site';

/**
 * AdvisoryLanding — /advisory. AWS pricing, not coach-speak.
 * Product 1 (the door), product 2 (gated behind product 1), the pilot
 * (scoped in the teardown), four scope boundaries, and a demoted pointer to
 * the till on /payments.
 */
export default function AdvisoryLanding({ links }: { links: PaymentLinks }) {
  const { locale } = useLanguage();
  const split = (l: Parameters<typeof tx>[0]) => tx(l, locale).split('|');

  return (
    <main className="content-sheet route-page">
      <section className="section-shell content-section" id="offers">
        <span className="section-kicker">{tx(advisory.kicker, locale)}</span>
        <h1>{tx(advisory.title, locale)}</h1>
        <p className="section-intro" style={{ maxWidth: '720px' }}>{tx(advisory.intro, locale)}</p>

        <div className="offer-grid">
          <OfferCard
            id="consult"
            name={tx(advisory.p1Name, locale)}
            price={tx(advisory.p1Price, locale)}
            unit={tx(advisory.p1Unit, locale)}
            body={tx(advisory.p1Body, locale)}
            points={split(advisory.p1Points)}
            cta={tx(advisory.p1Cta, locale)}
            href={links.consult.href}
            isStripe={links.consult.isStripe}
            featured
          />
          <OfferCard
            id="retainer"
            name={tx(advisory.p2Name, locale)}
            price={tx(advisory.p2Price, locale)}
            unit={tx(advisory.p2Unit, locale)}
            body={tx(advisory.p2Body, locale)}
            points={split(advisory.p2Points)}
            cta={tx(advisory.p2Cta, locale)}
            href={links.retainer.href}
            isStripe={links.retainer.isStripe}
            gated
            gateNote={tx(advisory.p2Gate, locale)}
          />
        </div>
        {!links.consult.isStripe && <p className="offer-note">{tx(advisory.mailNote, locale)}</p>}
      </section>

      <section className="section-shell content-section" id="pilot">
        <div className="glass-panel cta-panel spotlight-border">
          <div>
            <span className="section-kicker">{tx(advisory.pilotKicker, locale)}</span>
            <h2>{tx(advisory.pilotTitle, locale)}</h2>
            <p>{tx(advisory.pilotBody, locale)}</p>
          </div>
          <div className="hero-actions">
            <a className="secondary-button" href="/simulator">/simulator →</a>
          </div>
        </div>
      </section>

      <section className="section-shell content-section" id="boundaries">
        <div className="glass-panel cta-panel spotlight-border">
          <div>
            <span className="section-kicker">{tx(advisory.boundKicker, locale)}</span>
            <h2>{tx(advisory.boundTitle, locale)}</h2>
            <ol className="not-list">
              <li>{tx(advisory.bound1, locale)}</li>
              <li>{tx(advisory.bound2, locale)}</li>
              <li>{tx(advisory.bound3, locale)}</li>
              <li>{tx(advisory.bound4, locale)}</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="section-shell content-section" id="other">
        <span className="section-kicker">{tx(advisory.otherKicker, locale)}</span>
        <p className="pointer-line">
          <span>{tx(advisory.otherBody, locale)}</span>
          <a href="/payments">{tx(advisory.otherCta, locale)} →</a>
        </p>
      </section>
    </main>
  );
}
