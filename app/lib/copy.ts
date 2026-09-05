import type { Locale } from './i18n';

/**
 * copy.ts — every string on the public surfaces of this host, in the two
 * languages the header offers (EN, DE). English is the canonical text and
 * is what the server renders; German is adopted client-side after
 * hydration. The type forces both languages to carry the same keys.
 *
 * The register contents (repository names, statuses, KPI definitions,
 * decisions, reports) are technical records and stay in English in both
 * views; only the chrome around them is translated. Nothing is for sale
 * here and no number appears without a source.
 */

export type Copy = {
  nav: {
    cluster: string;
    registry: string;
    architecture: string;
    decisions: string;
    report: string;
    work: string;
    thesis: string;
    contact: string;
    menu: string;
    card: string;
  };
  home: {
    kicker: string;
    mandate: string;
    lead: string;
    missionHeading: string;
    boardHeading: string;
    boardAsOf: string;
    board: {
      repositories: string;
      customers: string;
      deployments: string;
      kpisMeasured: string;
      benchmarks: string;
      decisions: string;
      killReview: string;
    };
    registryHeading: string;
    registryIntro: string;
    registryAll: string;
    firstTargetHeading: string;
    firstTargetIntro: string;
    firstTargetAll: string;
    gateHeading: string;
    gateIntro: string;
    gateAll: string;
    decisionsHeading: string;
    decisionsAll: string;
    reportHeading: string;
    nextExperiment: string;
    decisionRequired: string;
    reportAll: string;
    boundaryHeading: string;
    boundaryIntro: string;
    operatorHeading: string;
    roleLine: string;
    roleDetail: string;
    formHeading: string;
    formIntro: string;
    thesisNote: string;
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
  nav: {
    cluster: 'Cluster',
    registry: 'Registry',
    architecture: 'Architecture',
    decisions: 'Decisions',
    report: 'Report',
    work: 'Work',
    thesis: 'Thesis',
    contact: 'Contact',
    menu: 'Menu',
    card: 'Card',
  },
  home: {
    kicker: 'Physical AI & Robotics · cluster control engine',
    mandate: 'Prove whether physical autonomy can create a defensible second moat.',
    lead:
      'One place that states what this cluster owns, what it measures, what it has decided and what it has killed — as pages and as JSON. Robot-agnostic palletizing software first; everything else is judged by whether it makes that cheaper to deploy.',
    missionHeading: 'Mission',
    boardHeading: 'Status board',
    boardAsOf: 'as of',
    board: {
      repositories: 'Register entries',
      customers: 'Customers',
      deployments: 'Deployments',
      kpisMeasured: 'KPIs measured',
      benchmarks: 'Benchmarks published',
      decisions: 'Decisions logged',
      killReview: 'Under kill review',
    },
    registryHeading: 'Repository register',
    registryIntro:
      'Six statuses, no seventh. Every row names a public artifact or says none. Last-commit dates are live from GitHub when reachable, otherwise the dated snapshot.',
    registryAll: 'Full register with all fields',
    firstTargetHeading: 'First target — palletizing',
    firstTargetIntro:
      'Twelve KPIs the mandate names. A dash means unmeasured; a target is never printed as a result. The simulator has to produce these before any hardware is touched.',
    firstTargetAll: 'Palletizer register',
    gateHeading: 'Safety gate',
    gateIntro:
      'Probabilistic intelligence proposes; deterministic safety refuses. No model, learned or language, reaches an actuator except through this gate, and no tool exists that bypasses it.',
    gateAll: 'Target architecture',
    decisionsHeading: 'Latest decisions',
    decisionsAll: 'Decision log',
    reportHeading: 'Weekly CEO report',
    nextExperiment: 'Next experiment',
    decisionRequired: 'Decision required',
    reportAll: 'Full report',
    boundaryHeading: 'Not in this cluster',
    boundaryIntro:
      'Applications that look physical and are not robotics products. They stay where they are until a robot executes a physical task under the gate.',
    operatorHeading: 'Operator',
    roleLine: 'ITk Fachspezialist, DB InfraGO AG.',
    roleDetail: 'Traction HV digitisation. IT/OT. KRITIS-class governance.',
    formHeading: 'Enquiry',
    formIntro:
      'System integrators, packaging companies, warehouses, inspection companies, utilities: one sentence about the task that costs you the most labour is enough to start. Replies come from the address in the footer.',
    thesisNote:
      'Grid and traction-power work — the CIM–ThreMA thesis simulator and the public-dataset application — stays under Work and Thesis.',
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
    body: 'That URL does not exist. The register, the work list and the contact page do.',
    cta: 'Home',
  },
};

const de: Copy = {
  nav: {
    cluster: 'Cluster',
    registry: 'Register',
    architecture: 'Architektur',
    decisions: 'Entscheidungen',
    report: 'Bericht',
    work: 'Arbeiten',
    thesis: 'Thesis',
    contact: 'Kontakt',
    menu: 'Menü',
    card: 'Karte',
  },
  home: {
    kicker: 'Physical AI & Robotik · Steuerungsinstrument des Clusters',
    mandate: 'Nachweisen, ob physische Autonomie einen verteidigungsfähigen zweiten Burggraben schaffen kann.',
    lead:
      'Ein Ort, der festhält, was dieser Cluster besitzt, misst, entschieden und eingestellt hat — als Seiten und als JSON. Roboterunabhängige Palettiersoftware zuerst; alles andere wird daran gemessen, ob es deren Einsatz günstiger macht.',
    missionHeading: 'Mission',
    boardHeading: 'Statustafel',
    boardAsOf: 'Stand',
    board: {
      repositories: 'Registereinträge',
      customers: 'Kunden',
      deployments: 'Inbetriebnahmen',
      kpisMeasured: 'Gemessene KPIs',
      benchmarks: 'Veröffentlichte Benchmarks',
      decisions: 'Protokollierte Entscheidungen',
      killReview: 'In Kill-Prüfung',
    },
    registryHeading: 'Repository-Register',
    registryIntro:
      'Sechs Status, kein siebter. Jede Zeile nennt ein öffentliches Artefakt oder „none“. Commit-Daten kommen live von GitHub, wenn erreichbar, sonst aus dem datierten Snapshot.',
    registryAll: 'Vollständiges Register mit allen Feldern',
    firstTargetHeading: 'Erstes Ziel — Palettieren',
    firstTargetIntro:
      'Zwölf KPIs, die das Mandat nennt. Ein Strich heißt ungemessen; ein Zielwert wird nie als Ergebnis gedruckt. Der Simulator muss diese Zahlen liefern, bevor Hardware angefasst wird.',
    firstTargetAll: 'Palletizer-Register',
    gateHeading: 'Sicherheitsschleuse',
    gateIntro:
      'Probabilistische Intelligenz schlägt vor; deterministische Sicherheit lehnt ab. Kein Modell — gelernt oder sprachlich — erreicht einen Aktor außer durch diese Schleuse, und es existiert kein Werkzeug, das sie umgeht.',
    gateAll: 'Zielarchitektur',
    decisionsHeading: 'Letzte Entscheidungen',
    decisionsAll: 'Entscheidungsprotokoll',
    reportHeading: 'Wöchentlicher CEO-Bericht',
    nextExperiment: 'Nächstes Experiment',
    decisionRequired: 'Entscheidung erforderlich',
    reportAll: 'Vollständiger Bericht',
    boundaryHeading: 'Nicht in diesem Cluster',
    boundaryIntro:
      'Anwendungen, die physisch wirken und keine Robotikprodukte sind. Sie bleiben, wo sie sind, bis ein Roboter eine physische Aufgabe unter der Schleuse ausführt.',
    operatorHeading: 'Betreiber',
    roleLine: 'ITk Fachspezialist, DB InfraGO AG.',
    roleDetail: 'Digitalisierung von Bahnstrom-Hochspannungsanlagen. IT/OT. Governance auf KRITIS-Niveau.',
    formHeading: 'Anfrage',
    formIntro:
      'Systemintegratoren, Verpacker, Lagerbetreiber, Inspektionsfirmen, Versorger: ein Satz über die Aufgabe, die Sie am meisten Arbeitszeit kostet, genügt. Antworten kommen von der Adresse im Fußbereich.',
    thesisNote:
      'Netz- und Bahnstromarbeit — der CIM–ThreMA-Thesis-Simulator und die Anwendung auf öffentlichem Datensatz — bleibt unter Arbeiten und Thesis.',
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
    body: 'Diese URL existiert nicht. Das Register, die Arbeitsliste und die Kontaktseite schon.',
    cta: 'Startseite',
  },
};

export const copy: Record<'en' | 'de', Copy> = { en, de };

/** Every locale the provider may still hold collapses to EN or DE here. */
export function pick(locale: Locale): Copy {
  return locale === 'de' ? de : en;
}
