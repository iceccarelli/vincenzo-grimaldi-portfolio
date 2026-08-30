'use client';

import { CalendarClock, Briefcase, ReceiptText, ShieldCheck, Check, ArrowRight, Mail } from 'lucide-react';
import { useLanguage } from '../lib/i18n';
import { emit } from '../lib/events';
import type { PaymentLinks } from '../lib/site';

const methods = ['Visa', 'Mastercard', 'Amex', 'Apple Pay', 'Google Pay', 'SEPA', 'Link'];

/**
 * Payments — CTAs are Stripe Payment Links injected from the SERVER
 * (env: STRIPE_PAYMENT_LINK_CONSULT / _RETAINER / _CUSTOM) via the
 * `links` prop. HARD RULE enforced here: the card-scheme / SEPA / wallet
 * chips and the "secure checkout" line render ONLY when at least one CTA
 * is an actual https://buy.stripe.com link. With no links configured the
 * section is an honest email offer, not a fake checkout.
 */
export default function Payments({ links }: { links: PaymentLinks }) {
  const { t } = useLanguage();

  const tierMeta = [
    { icon: CalendarClock, link: links.consult, id: 'consult', featured: false },
    { icon: Briefcase, link: links.retainer, id: 'retainer', featured: true },
    { icon: ReceiptText, link: links.invoice, id: 'invoice', featured: false },
  ];

  const anyStripe = tierMeta.some((m) => m.link.isStripe);

  return (
    <section className="section-shell content-section" id="payments">
      <div style={{ maxWidth: '680px' }}>
        <span className="pay-eyebrow">{t.payments.kicker}</span>
        <h2 style={{ marginTop: '0.6rem' }}>{t.payments.title}</h2>
        <p style={{ color: 'var(--muted-strong)', lineHeight: 1.65, marginTop: '0.75rem' }}>
          {t.payments.intro}
        </p>
      </div>

      <div className="pay-grid">
        {t.payments.tiers.map((tier, index) => {
          const meta = tierMeta[index];
          const Icon = meta.icon;
          return (
            <div
              key={tier.title}
              className={`pay-card glass-panel spotlight-border${meta.featured ? ' pay-card--featured' : ''}`}
            >
              {meta.featured && <span className="pay-badge">{t.payments.badge}</span>}
              <span className="pay-icon"><Icon size={22} strokeWidth={1.75} /></span>
              <h3 className="pay-title">{tier.title}</h3>
              <div className="pay-price">{tier.price}<span>{tier.sub}</span></div>
              <p className="pay-desc">{tier.desc}</p>
              <ul className="pay-points">
                {tier.points.map((point) => (
                  <li key={point}><Check size={15} strokeWidth={2.5} /> {point}</li>
                ))}
              </ul>
              <a
                className={meta.featured ? 'primary-button pay-cta' : 'secondary-button pay-cta'}
                href={meta.link.href}
                {...(meta.link.isStripe ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                onClick={() =>
                  emit('pay_click', { tier: meta.id, channel: meta.link.isStripe ? 'stripe' : 'email' })
                }
              >
                {tier.cta} {meta.link.isStripe ? <ArrowRight size={16} /> : <Mail size={16} />}
              </a>
            </div>
          );
        })}
      </div>

      {anyStripe && (
        <div className="pay-footer">
          <div className="pay-methods">
            <span className="pay-methods-label">{t.payments.accepted}</span>
            {methods.map((m) => <span key={m} className="pay-chip">{m}</span>)}
          </div>
          <div className="pay-secure">
            <ShieldCheck size={16} /> {t.payments.secure}
          </div>
        </div>
      )}
    </section>
  );
}
