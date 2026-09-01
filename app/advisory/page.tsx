import type { Metadata } from 'next';
import AdvisoryLanding from '../components/AdvisoryLanding';
import { FaqJsonLd, type Faq } from '../components/JsonLd';
import { getPaymentLinks } from '../lib/site';

export const metadata: Metadata = {
  title: 'Advisory — €280 teardown, €3,200 monthly, residual pilot',
  description:
    '60-minute teardown for €280: written recap, residual/architecture critique, go/no-go for a 30-day pilot with a kill date. Monthly advisory €3,200 only after a teardown. Scope boundaries stated.',
  alternates: { canonical: '/advisory' },
};

export const revalidate = 3600;

const faqs: Faq[] = [
  {
    q: 'What do I buy first?',
    a: 'A 60-minute teardown for €280. You bring a model, a feeder, a substation LAN diagram or a vendor proposal; you receive a written recap, a residual/architecture critique and a go/no-go for a 30-day pilot with a kill date. Slot within 48 hours.',
  },
  {
    q: 'What is the monthly advisory?',
    a: '€3,200 per month, only after a completed teardown: one scoped artefact per month (a validation report, a review, a pattern), asynchronous review, cancel anytime. It is not access to a network.',
  },
  {
    q: 'What is a PINN / residual pilot?',
    a: 'A validation report on your feeder using the same method as the public IEEE 9-bus explorer: ground truth, surrogate residuals, N-1 sweep, ablation, regenerable MD/JSON/PDF. 30 days, kill date in the contract, priced in the teardown recap.',
  },
  {
    q: 'Is this connected to Deutsche Bahn?',
    a: 'No. Advisory work is independent and outside the scope of my role at DB InfraGO AG. No employer data, topologies, systems or confidential information are used.',
  },
];

export default function AdvisoryPage() {
  return (
    <>
      <AdvisoryLanding links={getPaymentLinks()} />
      <FaqJsonLd faqs={faqs} />
    </>
  );
}
