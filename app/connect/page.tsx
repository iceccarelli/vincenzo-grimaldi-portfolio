import type { Metadata } from 'next';
import CalEmbed from '../components/CalEmbed';
import ContactForm from '../components/ContactForm';
import { FaqJsonLd, type Faq } from '../components/JsonLd';
import { EMAIL, OFFER } from '../lib/site';

export const metadata: Metadata = {
  title: 'Book a Consultation',
  description:
    'Book a 60-minute engineering consultation (€280) or send a message. Grid intelligence, physics-informed AI, OT security, deterministic control.',
  alternates: { canonical: '/connect' },
};

export const revalidate = 3600;

const faqs: Faq[] = [
  {
    q: 'What does a consultation cover?',
    a: 'A focused 60-minute session on your grid, control or cyber-physical systems problem: architecture review, feasibility, risk, or a concrete implementation plan. You receive written notes afterwards.',
  },
  {
    q: 'How is the consultation paid?',
    a: `€${OFFER.consult.price} per 60 minutes, payable by card via Stripe when checkout is enabled, otherwise by invoice.`,
  },
  {
    q: 'What is the advisory retainer?',
    a: `€${Number(OFFER.retainer.price).toLocaleString('en-IE')} per month: recurring architecture and review capacity, asynchronous questions, and a monthly deep-dive session.`,
  },
  {
    q: 'Is this connected to Deutsche Bahn?',
    a: 'No. Advisory work is independent and outside the scope of my role at DB InfraGO AG. No employer data, systems or confidential information are used.',
  },
];

export default function ConnectPage() {
  const calUrl = process.env.NEXT_PUBLIC_CAL_URL || '';

  return (
    <main className="content-sheet route-page">
      <section className="section-shell content-section" id="connect">
        <div className="glass-panel cta-panel spotlight-border">
          <div>
            <span className="section-kicker">Connect</span>
            <h1>Book a consultation</h1>
            <p className="section-intro">
              Pick a slot directly, or send a message with context. Direct email
              always works: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </p>
          </div>

          <CalEmbed calUrl={calUrl} label={`Open the calendar — €${OFFER.consult.price} / 60 min`} />

          <ContactForm />
        </div>

        <div className="glass-panel cta-panel spotlight-border" style={{ marginTop: '2rem' }}>
          <h2>Frequently asked</h2>
          <div className="faq-list">
            {faqs.map((f) => (
              <details key={f.q} className="faq-item">
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <FaqJsonLd faqs={faqs} />
    </main>
  );
}
