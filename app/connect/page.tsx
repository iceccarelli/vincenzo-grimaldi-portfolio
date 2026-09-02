import type { Metadata } from 'next';
import ContactForm from '../components/ContactForm';
import { EMAIL } from '../lib/site';
import { copy } from '../lib/copy';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Advisory enquiries on safety-critical grid and traction systems. Name, organisation, constraint, email. No booking widget, no price.',
  alternates: { canonical: '/connect' },
};

export const revalidate = 3600;

type Props = { searchParams?: { sent?: string } };

/**
 * /connect — the contact page. Same four-field form as the homepage.
 * `?sent=` carries the result of a JavaScript-free submission back from
 * /api/contact so the page can say what happened.
 */
export default function ConnectPage({ searchParams }: Props) {
  const c = copy.en;
  const sent = searchParams?.sent;

  return (
    <main className="doc">
      <section className="blk blk-first" id="connect">
        <h1 className="h1">{c.contact.title}</h1>
        <p className="lead">{c.contact.intro}</p>
        <p>
          {c.contact.direct} <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </p>

        {sent === 'ok' && <p className="form-ok" role="status">{c.form.sent}</p>}
        {sent === 'error' && <p className="form-err" role="alert">{c.form.error}</p>}
        {sent === 'unconfigured' && (
          <p className="form-err" role="alert">
            {c.form.error}
          </p>
        )}
        {sent !== 'ok' && <ContactForm />}
      </section>
    </main>
  );
}
