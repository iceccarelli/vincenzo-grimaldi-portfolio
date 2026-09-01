'use client';

import { ArrowRight, Mail } from 'lucide-react';
import { emit } from '../lib/events';

/**
 * OfferCard — AWS-pricing style. One name, one price, one unit, one CTA.
 * `href` is a Stripe Payment Link when configured, otherwise a mailto with
 * the subject prefilled (see lib/site.ts getPaymentLinks). `gated` renders
 * the CTA as a plain note instead of a button — product two is not bought
 * from the page.
 */
export default function OfferCard({
  id,
  name,
  price,
  unit,
  body,
  points,
  cta,
  href,
  isStripe,
  gated,
  gateNote,
  featured,
}: {
  id: string;
  name: string;
  price: string;
  unit: string;
  body: string;
  points: string[];
  cta: string;
  href: string;
  isStripe: boolean;
  gated?: boolean;
  gateNote?: string;
  featured?: boolean;
}) {
  return (
    <article className={`offer-card glass-panel spotlight-border${featured ? ' offer-card--featured' : ''}`}>
      <h2 className="offer-name">{name}</h2>
      <div className="offer-price">
        {price}
        <span>{unit}</span>
      </div>
      <p className="offer-body">{body}</p>
      <ul className="offer-points">
        {points.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
      {gated ? (
        <p className="offer-gate">
          <span aria-hidden>⟶</span> {cta}. {gateNote}
        </p>
      ) : (
        <a
          className="primary-button offer-cta"
          href={href}
          {...(isStripe ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          onClick={() => emit('pay_click', { tier: id, channel: isStripe ? 'stripe' : 'email' })}
        >
          {cta} {isStripe ? <ArrowRight size={16} /> : <Mail size={16} />}
        </a>
      )}
    </article>
  );
}
