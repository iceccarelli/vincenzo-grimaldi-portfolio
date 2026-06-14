// Payments & Engagement — Stripe Payment Links (no backend, no secret keys).
// Replace the REPLACE_* URLs with real links from dashboard.stripe.com → Payment Links.

const STRIPE = {
  deposit: 'https://buy.stripe.com/REPLACE_CONSULTATION_DEPOSIT',
  retainer: 'https://buy.stripe.com/REPLACE_PROJECT_RETAINER',
  invoice: 'https://buy.stripe.com/REPLACE_PAY_INVOICE', // set to "customer chooses amount"
};

const PAYPAL_ME = ''; // optional, e.g. 'https://paypal.me/yourhandle'
const WISE_LINK = ''; // optional, e.g. 'https://wise.com/pay/me/yourhandle'

const methods = ['Visa', 'Mastercard', 'Amex', 'Apple Pay', 'Google Pay', 'SEPA Direct Debit', 'Stripe Link'];

const tiers = [
  { title: 'Consultation Deposit', desc: 'Secures a focused 60-min technical session on grid, CPS, or physics-informed AI.', cta: 'Reserve a session', href: STRIPE.deposit },
  { title: 'Project Retainer', desc: 'Engage a scoped advisory or engineering block with priority availability.', cta: 'Start a retainer', href: STRIPE.retainer },
  { title: 'Pay an Invoice', desc: 'Settle an agreed engagement. Enter the amount from your invoice at checkout.', cta: 'Pay invoice', href: STRIPE.invoice },
];

export default function Payments() {
  return (
    <section className="section-shell content-section" id="payments">
      <div style={{ maxWidth: '720px' }}>
        <span style={{ color: 'var(--accent-strong)', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', fontSize: '0.8rem' }}>
          Engage &amp; Payments
        </span>
        <h2 style={{ marginTop: '0.6rem' }}>Work together — settle securely in seconds.</h2>
        <p style={{ color: 'var(--muted-strong)', lineHeight: 1.65, marginTop: '0.75rem' }}>
          Consultation deposits, advisory retainers, and invoice payments — processed through encrypted
          Stripe checkout. Cards, mobile wallets, and SEPA accepted; instant receipt.
        </p>
      </div>

      <div className="three-up" style={{ marginTop: '2rem' }}>
        {tiers.map((t) => (
          <div key={t.title} className="feature-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <strong style={{ fontSize: '1.05rem' }}>{t.title}</strong>
            <p style={{ color: 'var(--muted)', lineHeight: 1.55, flexGrow: 1 }}>{t.desc}</p>
            <a className="primary-button" href={t.href} target="_blank" rel="noopener noreferrer" style={{ marginTop: '0.5rem' }}>
              {t.cta} →
            </a>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '2rem', display: 'flex', flexWrap: 'wrap', gap: '0.6rem', alignItems: 'center' }}>
        <span style={{ color: 'var(--muted)', fontSize: '0.85rem', marginRight: '0.4rem' }}>Accepted:</span>
        {methods.map((m) => (
          <span key={m} style={{ fontSize: '0.78rem', padding: '0.3rem 0.7rem', borderRadius: '999px', border: '1px solid rgba(125,211,252,0.16)', color: 'var(--muted-strong)' }}>
            {m}
          </span>
        ))}
      </div>

      {(PAYPAL_ME || WISE_LINK) && (
        <div style={{ marginTop: '1.25rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {PAYPAL_ME && <a className="secondary-button" href={PAYPAL_ME} target="_blank" rel="noopener noreferrer">PayPal</a>}
          {WISE_LINK && <a className="secondary-button" href={WISE_LINK} target="_blank" rel="noopener noreferrer">Wise (bank transfer)</a>}
        </div>
      )}

      <p style={{ marginTop: '1.5rem', fontSize: '0.8rem', color: 'var(--muted)' }}>
        Secure checkout powered by Stripe. Your card details are never seen by Vincenzo.
      </p>
    </section>
  );
}
