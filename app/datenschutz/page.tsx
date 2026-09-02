import type { Metadata } from 'next';
import { EMAIL, LEGAL_NAME } from '../lib/site';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
  description: 'Datenschutzerklärung gemäß Art. 13/14 DSGVO für igrimaldi.engineering.',
  alternates: { canonical: '/datenschutz' },
  robots: { index: true, follow: true },
};

/**
 * /datenschutz — DSGVO privacy notice. Structure matches what the site
 * ACTUALLY does: Vercel hosting + server logs, opt-in Vercel Analytics,
 * a first-party enquiry form relayed via Resend. No booking widget, no
 * payment provider, no other third party.
 *
 * OPERATOR ACTION REQUIRED: fill TODO_OPERATOR address; have the text
 * reviewed — this is a working skeleton, not legal advice.
 */
export default function DatenschutzPage() {
  return (
    <main className="doc">
      <section className="blk blk-first legal">
        <h1 className="h1">Datenschutzerklärung</h1>

        <h2>1. Verantwortlicher</h2>
        <p>
          {LEGAL_NAME}
          <br />
          TODO_OPERATOR_STRASSE_HAUSNUMMER, TODO_OPERATOR_PLZ Frankfurt am Main, Deutschland
          <br />
          E-Mail: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </p>

        <h2>2. Hosting und Server-Logs</h2>
        <p>
          Diese Website wird bei Vercel Inc., 440 N Barranca Ave #4133, Covina,
          CA 91723, USA gehostet. Beim Aufruf werden technisch notwendige Daten
          (IP-Adresse, Zeitpunkt, angeforderte Ressource, User-Agent) in
          Server-Logs verarbeitet. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO
          (berechtigtes Interesse an sicherem Betrieb). Die Übermittlung in die
          USA erfolgt auf Grundlage der EU-Standardvertragsklauseln und des EU-US
          Data Privacy Framework, dem Vercel angehört.
        </p>

        <h2>3. Webanalyse (Vercel Analytics, nur mit Einwilligung)</h2>
        <p>
          Vercel Web Analytics wird ausschließlich nach Ihrer aktiven
          Einwilligung über den Consent-Banner geladen (Art. 6 Abs. 1 lit. a
          DSGVO, § 25 Abs. 1 TDDDG). Es werden keine Cookies gesetzt und keine
          geräteübergreifenden Profile gebildet. Ihre Entscheidung wird lokal im
          Browser gespeichert und kann durch Löschen der Website-Daten
          zurückgesetzt werden.
        </p>

        <h2>4. Anfrageformular</h2>
        <p>
          Angaben aus dem Anfrageformular (Name, Organisation, Randbedingung, E-Mail)
          werden zur Bearbeitung der Anfrage verarbeitet und über den
          E-Mail-Dienst Resend (Resend, Inc., USA) an den Verantwortlichen
          zugestellt. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO
          (vorvertragliche Maßnahmen). Daten werden gelöscht, sobald sie für
          die Bearbeitung nicht mehr erforderlich sind.
        </p>

        <h2>5. Ihre Rechte</h2>
        <p>
          Sie haben das Recht auf Auskunft (Art. 15), Berichtigung (Art. 16),
          Löschung (Art. 17), Einschränkung (Art. 18), Datenübertragbarkeit
          (Art. 20) und Widerspruch (Art. 21 DSGVO) sowie das Recht, eine
          erteilte Einwilligung jederzeit mit Wirkung für die Zukunft zu
          widerrufen. Beschwerden richten Sie an eine
          Datenschutzaufsichtsbehörde, z.&nbsp;B. den Hessischen Beauftragten
          für Datenschutz und Informationsfreiheit.
        </p>

        <p>
          <em>Stand: TODO_OPERATOR_DATUM</em>
        </p>
      </section>
    </main>
  );
}
