import type { Locale } from './i18n';

/**
 * copy.ts — every string on the public surfaces of this host, in the two
 * languages the header offers (EN, DE). English is the canonical text and
 * is what the server renders; German is adopted client-side after
 * hydration. The type forces both languages to carry the same keys.
 *
 * Vocabulary is deliberately narrow: CIM, CGMES, IEC 61850, IT/OT,
 * traction HV, KRITIS as context, verifiable, deterministic,
 * physics-informed as thesis language. Nothing is for sale here.
 */

export type Copy = {
  nav: { work: string; thesis: string; contact: string; menu: string; card: string };
  home: {
    oneLine: string;
    roleLine: string;
    roleDetail: string;
    artifactsHeading: string;
    artifacts: { title: string; note: string; href: string; external?: boolean; label: string }[];
    workHeading: string;
    workAll: string;
    formHeading: string;
    formIntro: string;
  };
  form: {
    name: string;
    organisation: string;
    constraint: string;
    constraintHint: string;
    email: string;
    send: string;
    sending: string;
    sent: string;
    error: string;
    fallback: string;
  };
  work: {
    title: string;
    intro: string;
    proof: string;
    problem: string;
    approach: string;
    validation: string;
    limits: string;
    openLive: string;
    openRepo: string;
    notesHeading: string;
    notesIntro: string;
    back: string;
  };
  simulator: {
    kicker: string;
    title: string;
    intro: string;
    what: string[];
    open: string;
    readWriteUp: string;
    not: string;
  };
  contact: {
    title: string;
    intro: string;
    direct: string;
  };
  footer: { rights: string; imprint: string; privacy: string };
  consent: { text: string; accept: string; decline: string };
  notFound: { title: string; body: string; cta: string };
};

const en: Copy = {
  nav: { work: 'Work', thesis: 'Thesis', contact: 'Contact', menu: 'Menu', card: 'Card' },
  home: {
    oneLine: 'Physics-constrained control · grid digitalisation',
    roleLine: 'ITk Fachspezialist, DB InfraGO AG.',
    roleDetail: 'Traction HV digitisation. IT/OT. KRITIS-class governance.',
    artifactsHeading: 'Artifacts',
    artifacts: [
      {
        title: 'CIM–ThreMA simulator',
        note: 'Runnable implementation of the M.Sc. thesis: grid topology (CIM/CGMES) linked to a threat ontology (ThreMA), exercised on an IEEE 9-bus testbed.',
        href: '/simulator',
        label: 'Open',
      },
      {
        title: 'Thesis write-up',
        note: 'Method, validation set-up and stated limits of the cross-domain ontology, written to be checked rather than believed.',
        href: '/work/cim-threma',
        label: 'Read',
      },
      {
        title: 'Bahn Project Manager',
        note: 'Public-dataset portfolio application. Typed data model and test suite over an open 1,298-project dataset. No employer systems involved.',
        href: '/work/bahn-project-manager',
        label: 'Inspect',
      },
    ],
    workHeading: 'Selected work',
    workAll: 'All work',
    formHeading: 'Advisory enquiry',
    formIntro:
      'One constraint, stated plainly, is enough to start. Replies come from the address in the footer.',
  },
  form: {
    name: 'Name',
    organisation: 'Organisation',
    constraint: 'Constraint',
    constraintHint: 'The thing that must hold — a standard, a latency, an interface, a safety case.',
    email: 'Email',
    send: 'Send',
    sending: 'Sending…',
    sent: 'Received. I will reply by email.',
    error: 'Could not send. Please write to the address in the footer.',
    fallback: 'The form is not wired on this deployment yet; your mail client will open instead.',
  },
  work: {
    title: 'Work',
    intro:
      'Each entry states what is public — a repository, a deployment, a document — and what is not. Nothing here is a product.',
    proof: 'Public artifact',
    problem: 'Problem',
    approach: 'Approach',
    validation: 'Validation',
    limits: 'Limits',
    openLive: 'Open the deployment',
    openRepo: 'Repository',
    notesHeading: 'Research notes, not products',
    notesIntro:
      'Private codebases that are referenced elsewhere but are not published. They are listed so that no claim is made for them.',
    back: '← Work',
  },
  simulator: {
    kicker: 'M.Sc. thesis · RWTH Aachen · 2025',
    title: 'CIM–ThreMA cross-domain ontology simulator',
    intro:
      'Data modelling in a cross-domain ontology for cyber intelligence in smart grids, using reinforcement learning. The simulator is the thesis made runnable: the mapping catalogue, the IEEE 9-bus testbed and the scenario definitions ship in the deployment.',
    what: [
      'CIM/CGMES topology linked to the ThreMA threat ontology',
      'Five formal semantic mappings between the two models',
      'IEEE 9-bus cyber-physical testbed, four documented scenarios',
      'Q-learning agent as the security decision layer',
      'Cross-domain signal-to-noise metric to score mapping quality',
    ],
    open: 'Open the simulator',
    readWriteUp: 'Read the write-up',
    not: 'The simulator runs on a separate deployment. It is thesis work: a validated research artifact, not an operational tool.',
  },
  contact: {
    title: 'Contact',
    intro: 'For advisory enquiries on safety-critical grid and traction systems. State the constraint; I will say whether I can help.',
    direct: 'Direct email always works:',
  },
  footer: { rights: 'All rights reserved.', imprint: 'Impressum', privacy: 'Datenschutz' },
  consent: {
    text: 'This site uses cookieless Vercel Analytics to count visits. No personal profiles, no ads.',
    accept: 'Allow',
    decline: 'Decline',
  },
  notFound: {
    title: 'Page not found',
    body: 'That URL does not exist. The work list and the contact page do.',
    cta: 'Home',
  },
};

const de: Copy = {
  nav: { work: 'Arbeiten', thesis: 'Thesis', contact: 'Kontakt', menu: 'Menü', card: 'Karte' },
  home: {
    oneLine: 'Physikalisch beschränkte Regelung · Netzdigitalisierung',
    roleLine: 'ITk Fachspezialist, DB InfraGO AG.',
    roleDetail: 'Digitalisierung von Bahnstrom-Hochspannungsanlagen. IT/OT. Governance auf KRITIS-Niveau.',
    artifactsHeading: 'Artefakte',
    artifacts: [
      {
        title: 'CIM–ThreMA-Simulator',
        note: 'Lauffähige Umsetzung der Masterthesis: Netztopologie (CIM/CGMES) verknüpft mit einer Bedrohungsontologie (ThreMA), erprobt an einem IEEE-9-Bus-Testbed.',
        href: '/simulator',
        label: 'Öffnen',
      },
      {
        title: 'Thesis-Ausarbeitung',
        note: 'Methode, Validierungsaufbau und benannte Grenzen der domänenübergreifenden Ontologie — geschrieben, um geprüft zu werden.',
        href: '/work/cim-threma',
        label: 'Lesen',
      },
      {
        title: 'Bahn Project Manager',
        note: 'Portfolio-Anwendung auf öffentlichem Datensatz. Typisiertes Datenmodell und Testsuite über einen offenen Datensatz mit 1.298 Projekten. Keine Arbeitgebersysteme beteiligt.',
        href: '/work/bahn-project-manager',
        label: 'Ansehen',
      },
    ],
    workHeading: 'Ausgewählte Arbeiten',
    workAll: 'Alle Arbeiten',
    formHeading: 'Beratungsanfrage',
    formIntro:
      'Eine klar benannte Randbedingung genügt für den Anfang. Antworten kommen von der Adresse im Fußbereich.',
  },
  form: {
    name: 'Name',
    organisation: 'Organisation',
    constraint: 'Randbedingung',
    constraintHint: 'Was gelten muss — eine Norm, eine Latenz, eine Schnittstelle, ein Sicherheitsnachweis.',
    email: 'E-Mail',
    send: 'Senden',
    sending: 'Wird gesendet…',
    sent: 'Angekommen. Ich antworte per E-Mail.',
    error: 'Senden nicht möglich. Bitte an die Adresse im Fußbereich schreiben.',
    fallback: 'Das Formular ist auf dieser Umgebung noch nicht angebunden; stattdessen öffnet sich Ihr E-Mail-Programm.',
  },
  work: {
    title: 'Arbeiten',
    intro:
      'Jeder Eintrag benennt, was öffentlich ist — Repository, Deployment, Dokument — und was nicht. Nichts hier ist ein Produkt.',
    proof: 'Öffentliches Artefakt',
    problem: 'Problem',
    approach: 'Ansatz',
    validation: 'Validierung',
    limits: 'Grenzen',
    openLive: 'Deployment öffnen',
    openRepo: 'Repository',
    notesHeading: 'Forschungsnotizen, keine Produkte',
    notesIntro:
      'Private Codebasen, auf die andernorts verwiesen wird, die aber nicht veröffentlicht sind. Sie stehen hier, damit für sie nichts behauptet wird.',
    back: '← Arbeiten',
  },
  simulator: {
    kicker: 'Masterthesis · RWTH Aachen · 2025',
    title: 'CIM–ThreMA-Simulator für eine domänenübergreifende Ontologie',
    intro:
      'Datenmodellierung in einer domänenübergreifenden Ontologie für Cyber-Intelligenz in Smart Grids mittels Reinforcement Learning. Der Simulator ist die lauffähige Thesis: Mapping-Katalog, IEEE-9-Bus-Testbed und Szenariodefinitionen sind Teil des Deployments.',
    what: [
      'CIM/CGMES-Topologie verknüpft mit der ThreMA-Bedrohungsontologie',
      'Fünf formale semantische Abbildungen zwischen beiden Modellen',
      'IEEE-9-Bus-Testbed, vier dokumentierte Szenarien',
      'Q-Learning-Agent als Sicherheitsentscheidungsschicht',
      'Domänenübergreifende Signal-Rausch-Metrik zur Bewertung der Abbildungen',
    ],
    open: 'Simulator öffnen',
    readWriteUp: 'Ausarbeitung lesen',
    not: 'Der Simulator läuft auf einem separaten Deployment. Es ist Thesisarbeit: ein validiertes Forschungsartefakt, kein Betriebswerkzeug.',
  },
  contact: {
    title: 'Kontakt',
    intro: 'Für Beratungsanfragen zu sicherheitskritischen Netz- und Bahnstromsystemen. Nennen Sie die Randbedingung; ich sage, ob ich helfen kann.',
    direct: 'Direkte E-Mail funktioniert immer:',
  },
  footer: { rights: 'Alle Rechte vorbehalten.', imprint: 'Impressum', privacy: 'Datenschutz' },
  consent: {
    text: 'Diese Seite nutzt cookieloses Vercel Analytics zur Besucherzählung. Keine Profile, keine Werbung.',
    accept: 'Erlauben',
    decline: 'Ablehnen',
  },
  notFound: {
    title: 'Seite nicht gefunden',
    body: 'Diese URL existiert nicht. Die Arbeitsliste und die Kontaktseite schon.',
    cta: 'Startseite',
  },
};

export const copy: Record<'en' | 'de', Copy> = { en, de };

/** Every locale the provider may still hold collapses to EN or DE here. */
export function pick(locale: Locale): Copy {
  return locale === 'de' ? de : en;
}
