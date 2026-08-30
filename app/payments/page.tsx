import type { Metadata } from 'next';
import Payments from '../components/Payments';
import { getPaymentLinks } from '../lib/site';

export const metadata: Metadata = {
  title: 'Payments & Engagement',
  description:
    'Engagement models: 60-minute engineering consultation (€280) and monthly advisory retainer (€3,200). Payment by Stripe or invoice.',
  alternates: { canonical: '/payments' },
};

export const revalidate = 3600;

export default function PaymentsPage() {
  const links = getPaymentLinks();
  return (
    <main className="content-sheet route-page">
      <Payments links={links} />
    </main>
  );
}
