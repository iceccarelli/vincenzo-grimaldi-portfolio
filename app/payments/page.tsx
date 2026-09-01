import type { Metadata } from 'next';
import Payments from '../components/Payments';
import { getPaymentLinks } from '../lib/site';

export const metadata: Metadata = {
  title: 'Payments',
  description:
    'Pay for a €280 teardown, a €3,200 monthly advisory (after a teardown) or an invoice. Scope and boundaries are on /advisory.',
  alternates: { canonical: '/payments' },
};

export const revalidate = 3600;

export default function PaymentsPage() {
  const links = getPaymentLinks();
  return (
    <main className="content-sheet route-page">
      <section className="section-shell" style={{ paddingTop: '2rem' }}>
        <h1 style={{ fontSize: '1.4rem', margin: '0 0 0.75rem' }}>Payments</h1>
        <p className="pointer-line">
          <span>This page is a till, not an offer. Scope, boundaries and what you buy first:</span>
          <a href="/advisory">/advisory →</a>
        </p>
      </section>
      <Payments links={links} />
    </main>
  );
}
