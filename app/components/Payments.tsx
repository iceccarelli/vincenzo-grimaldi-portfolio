'use client';

import { CalendarClock, Briefcase, ReceiptText, ShieldCheck, Check, ArrowRight } from 'lucide-react';

const STRIPE = {
  deposit: 'https://buy.stripe.com/REPLACE_CONSULTATION_DEPOSIT',
  retainer: 'https://buy.stripe.com/REPLACE_PROJECT_RETAINER',
  invoice: 'https://buy.stripe.com/REPLACE_PAY_INVOICE',
};

const methods = ['Visa', 'Mastercard', 'Amex', 'Apple Pay', 'Google Pay', 'SEPA', 'Link'];

const tiers = [
  { icon: CalendarClock, title: 'Consultation', price: 'from €250', sub: '60-minute session',
    desc: 'A focused technical deep-dive on grid intelligence, cyber-physical systems, or physics-informed AI.',
    points: ['Live working session', 'Written follow-up summary', 'Booked within 48h'],
    cta: 'Reserve a session', href: STRIPE.deposit, featured: false },
  { icon: Briefcase, title: 'Project Retainer', price: 'from €2,400', sub: 'monthly engagement',
    desc: 'A scoped advisory or engineering block with priority availability and direct access.',
    points: ['Priority response', 'Scoped deliverables', 'Flexible monthly block'],
    cta: 'Start a retainer', href: STRIPE.retainer, featured: true },
  { icon: ReceiptText, title: 'Pay an Invoice', price: 'custom', sub: 'agreed amount',
    desc: 'Settle an existing engagement securely. Enter the amount from your invoice at checkout.',
    points: ['Any agreed amount', 'Instant receipt', 'Card · wallet · SEPA'],
    cta: 'Pay invoice', href: STRIPE.invoice, featured: false },
];

export default function Payments() {
  return (
    <section className="section-shell content-section" id="payments">
      <div style={{ maxWidth: '680px' }}>
        <span className="pay-eyebrow">Engage &amp; Payments</span>
        <h2 style={{ marginTop: '0.6rem' }}>Work together — settle securely in seconds.</h2>
        <p style={{ color: 'var(--muted-strong)', lineHeight: 1.65, marginTop: '0.75rem' }}>
          Consultation deposits, advisory retainers, and invoice payments through encrypted Stripe
          checkout. Cards, mobile wallets, and SEPA accepted — with an instant receipt.
        </p>
      </div>

      <div className="pay-grid">
        {tiers.map((t) => {
          const Icon = t.icon;
          return (
            <div key={t.title} className={`pay-card glass-panel spotlight-border${t.featured ? ' pay-card--featured' : ''}`}>
              {t.featured && <span className="pay-badge">Most popular</span>}
              <span className="pay-icon"><Icon size={22} strokeWidth={1.75} /></span>
              <h3 className="pay-title">{t.title}</h3>
              <div className="pay-price">{t.price}<span>{t.sub}</span></div>
              <p className="pay-desc">{t.desc}</p>
              <ul className="pay-points">
                {t.points.map((p) => (<li key={p}><Check size={15} strokeWidth={2.5} /> {p}</li>))}
              </ul>
              <a className={t.featured ? 'primary-button pay-cta' : 'secondary-button pay-cta'} href={t.href} target="_blank" rel="noopener noreferrer">
                {t.cta} <ArrowRight size={16} />
              </a>
            </div>
          );
        })}
      </div>

      <div className="pay-footer">
        <div className="pay-methods">
          <span className="pay-methods-label">Accepted</span>
          {methods.map((m) => <span key={m} className="pay-chip">{m}</span>)}
        </div>
        <div className="pay-secure">
          <ShieldCheck size={16} /> Secure checkout by Stripe — your card details are never seen by Vincenzo.
        </div>
      </div>
    </section>
  );
}
