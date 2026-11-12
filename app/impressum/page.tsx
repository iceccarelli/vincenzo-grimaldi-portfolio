import type { Metadata } from 'next';
import { EMAIL, LEGAL_NAME, CONFLICT_DE, CONFLICT_EN } from '../lib/site';

export const metadata: Metadata = {
  title: 'Impressum',
  description: 'Anbieterkennzeichnung gemäß § 5 DDG — Vincenzo Ceccarelli Grimaldi.',
  alternates: { canonical: '/impressum' },
  robots: { index: true, follow: true },
};

export default function ImpressumPage() {
  return (
    <main className="doc">
      <section className="blk blk-first legal">
        <h1 className="h1">Impressum</h1>

        <h2>Angaben gemäß § 5 DDG</h2>
        <p>
          {LEGAL_NAME}
          
          Pfeilstraße 6
          
          52066 Aachen
          <br />
          Deutschland
        </p>

        <h2>Kontakt</h2>
        <p>
          E-Mail: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          
        </p>

        <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
        <p>
          {LEGAL_NAME}, Anschrift wie oben.
        </p>

        <h2>Unabhängigkeit der Beratungstätigkeit</h2>
        <p lang="de">{CONFLICT_DE}</p>
        <p lang="en">
          <em>{CONFLICT_EN}</em>
        </p>

        <h2>Streitbeilegung</h2>
        <p>
          Zur Teilnahme an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle bin ich weder bereit noch verpflichtet (§ 36 VSBG).
        </p>
      </section>
    </main>
  );
}
