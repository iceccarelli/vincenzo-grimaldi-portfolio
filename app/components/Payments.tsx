'use client';

import { CalendarClock, Briefcase, ReceiptText, ShieldCheck, Check, ArrowRight } from 'lucide-react';
import { useLanguage } from '../lib/i18n';

const RAW_STRIPE = {
  deposit: 'https://buy.stripe.com/REPLACE_CONSULTATION_DEPOSIT',
  retainer: 'https://buy.stripe.com/REPLACE_PROJECT_RETAINER',
  invoice: 'https://buy.stripe.com/REPLACE_PAY_INVOICE',
};

/**
 * Until a real Stripe payment link is pasted above, the CTA falls back to a
 * pre-filled email instead of a dead checkout URL. The moment a link no
 * longer contains REPLACE, the button switches to Stripe automatically.
 */
const fallback = (subject: string) =>
  `mailto:vincenzo@igrimaldi.engineering?subject=${encodeURIComponent(subject)}`;

const STRIPE = {
  deposit: RAW_STRIPE.deposit.includes('REPLACE') ? fallback('Consultation booking') : RAW_STRIPE.deposit,
  retainer: RAW_STRIPE.retainer.includes('REPLACE') ? fallback('Advisory retainer') : RAW_STRIPE.retainer,
  invoice: RAW_STRIPE.invoice.includes('REPLACE') ? fallback('Invoice payment') : RAW_STRIPE.invoice,
};

const methods = ['Visa', 'Mastercard', 'Amex', 'Apple Pay', 'Google Pay', 'SEPA', 'Link'];

/** Static, locale-independent tier facts; copy comes from the dictionary. */
const TIER_META = [
  { icon: CalendarClock, href: STRIPE.deposit, featured: false },
  { icon: Briefcase, href: STRIPE.retainer, featured: true },
  { icon: ReceiptText, href: STRIPE.invoice, featured: false },
];

export default function Payments() {
  const { t } = useLanguage();

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
          const meta = TIER_META[index];
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
                href={meta.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {tier.cta} <ArrowRight size={16} />
              </a>
            </div>
          );
        })}
      </div>

      <div className="pay-footer">
        <div className="pay-methods">
          <span className="pay-methods-label">{t.payments.accepted}</span>
          {methods.map((m) => <span key={m} className="pay-chip">{m}</span>)}
        </div>
        <div className="pay-secure">
          <ShieldCheck size={16} /> {t.payments.secure}
        </div>
      </div>
    </section>
  );
}
