import type { Metadata } from 'next';
import { EMAIL, LEGAL_NAME, CONFLICT_DE, CONFLICT_EN } from '../lib/site';

export const metadata: Metadata = {
  title: 'Impressum',
  description: 'Anbieterkennzeichnung gemäß § 5 DDG — Vincenzo Ceccarelli Grimaldi.',
  alternates: { canonical: '/impressum' },
  robots: { index: true, follow: true },
};

/**
 * /impressum — § 5 DDG Anbieterkennzeichnung.
 *
 * OPERATOR ACTION REQUIRED before go-live: replace every TODO_OPERATOR
 * value. A commercial site without a complete, ladungsfähige Anschrift
 * (street address — a P.O. box is NOT sufficient) is abmahnfähig.
 */
export default function ImpressumPage() {
  return (
    <main className="doc">
      <section className="blk blk-first legal">
        <h1 className="h1">Impressum</h1>

        <h2>Angaben gemäß § 5 DDG</h2>
        <p>
          {LEGAL_NAME}
          <br />
          {/* TODO_OPERATOR: ladungsfähige Anschrift (Straße + Hausnummer) */}
          TODO_OPERATOR_STRASSE_HAUSNUMMER
          <br />
          {/* TODO_OPERATOR: PLZ + Ort */}
          TODO_OPERATOR_PLZ Frankfurt am Main
          <br />
          Deutschland
        </p>

        <h2>Kontakt</h2>
        <p>
          E-Mail: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <br />
          {/* TODO_OPERATOR: Telefonnummer ist für schnelle elektronische
              Kontaktaufnahme empfohlen (EuGH: nicht zwingend, wenn ein
              zweiter schneller Kanal existiert). */}
        </p>

        <h2>Umsatzsteuer</h2>
        <p>
          {/* TODO_OPERATOR: genau EINE der beiden Zeilen behalten. */}
          Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: TODO_OPERATOR_UST_IDNR
          <br />
          <em>— oder —</em>
          <br />
          Kleinunternehmer gemäß § 19 UStG; es wird keine Umsatzsteuer ausgewiesen.
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
          Die Europäische Kommission stellt eine Plattform zur
          Online-Streitbeilegung (OS) bereit:{' '}
          <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
            https://ec.europa.eu/consumers/odr/
          </a>
          . Ich bin nicht bereit und nicht verpflichtet, an
          Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
          teilzunehmen.
        </p>
      </section>
    </main>
  );
}
