import type { Locale } from './i18n';

export type Copy = {
  nav: {
    domain: string;
    overview: string;
    grids: string;
    machines: string;
    twins: string;
    articles: string;
    work: string;
    thesis: string;
    registry: string;
    contact: string;
    menu: string;
    card: string;
  };
  home: {
    kicker: string;
    mandate: string;
    lead: string;
    pillarsHeading: string;
    pillarsIntro: string;
    bottleneckHeading: string;
    bottleneckIntro: string;
    bottleneckBody: string;
    bottleneckCta: string;
    articlesHeading: string;
    articlesIntro: string;
    articlesAll: string;
    registryHeading: string;
    registryIntro: string;
    registryAll: string;
    visionHeading: string;
    visionBody: string;
    operatorHeading: string;
    roleLine: string;
    roleDetail: string;
    thesisNote: string;
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
  card: {
    kicker: string;
    role: string;
    tagline: string;
    email: string;
    website: string;
    githubLabel: string;
    networkLabel: string;
    saveContact: string;
    connect: string;
    scanToShare: string;
    backHome: string;
  };
  footer: {
    colophonRole: string;
    rights: string;
    imprint: string;
    privacy: string;
  };
  consent: { text: string; accept: string; decline: string };
  notFound: { title: string; body: string; cta: string };
};

const en: Copy = {
  nav: {
    domain: 'Power Systems & Machines',
    overview: 'Overview',
    grids: 'Grids & Traction',
    machines: 'Machines & Devices',
    twins: 'Digital Twins',
    articles: 'Articles',
    work: 'Work',
    thesis: 'Simulator',
    registry: 'Register',
    contact: 'Contact',
    menu: 'Menu',
    card: 'Card',
  },
  home: {
    kicker: 'High-voltage grids · traction power · electrical machines · physics-informed methods',
    mandate: 'Electrical grids, machines, and physics-informed methods.',
    lead:
      'Independent engineering work on high-voltage substations, railway traction power, electromagnetic machines, power electronics, and physics-informed digital twins — documented through runnable models, public repositories, and technical articles.',
    pillarsHeading: 'Technical pillars',
    pillarsIntro:
      'Four interconnected disciplines anchor this site: bulk and traction power networks, electrical machines and converters, physics-constrained digital twins, and runnable cyber-physical grid simulation.',
    bottleneckHeading: 'Why this work matters — power capacity and physical limits',
    bottleneckIntro:
      'Compute expansion, industrial electrification, and rail modernization are gated by electrical infrastructure: transformer lead times, interconnection queues, short-circuit strength, and thermal-electrical hall envelopes.',
    bottleneckBody:
      'Credible capacity intelligence starts from AC power flow, protection coordination, converter stability, and thermal limits rather than purely statistical extrapolation. These physical foundations inform both the open engineering work documented here and the broader company ecosystem.',
    bottleneckCta: 'Read the power-capacity analysis',
    articlesHeading: 'Technical articles',
    articlesIntro:
      'Focused explainers on synchronous inertia at 50 Hz, IT/OT convergence in traction power infrastructure, and the electrical limits governing data-center interconnection.',
    articlesAll: 'All technical articles',
    registryHeading: 'Technical register',
    registryIntro:
      'Every entry distinguishes public runnable artifacts from unpublished research notes. Nothing is claimed without an inspectable model, repository, or explicit scope boundary.',
    registryAll: 'Open full technical register',
    visionHeading: 'Engineering horizon & ecosystem',
    visionBody:
      'This domain documents personal engineering depth, runnable academic models, and domain analyses. Commercial ventures and company hubs live separately at engineeringgrimaldi.com and grimaldi.ca.',
    operatorHeading: 'Engineer & professional context',
    roleLine: 'ITk Fachspezialist, DB InfraGO AG · M.Sc. RWTH Aachen.',
    roleDetail: 'High-voltage railway traction digitisation, IT/OT architecture, and KRITIS-grade infrastructure governance.',
    thesisNote:
      'Runnable smart-grid ontology simulator and public-dataset infrastructure tools are documented under Work and Simulator.',
    formHeading: 'Technical enquiry',
    formIntro:
      'Grid operators, rail infrastructure teams, machine designers, research groups, and capacity planners: state the technical constraint that must hold and I will reply directly.',
  },
  form: {
    name: 'Name',
    organisation: 'Organisation',
    constraint: 'Constraint',
    constraintHint: 'The physical or architectural constraint — voltage level, standard, grid model, interface, or stability boundary.',
    email: 'Email',
    send: 'Send',
    sending: 'Sending…',
    sent: 'Received. I will reply by email.',
    error: 'Could not send. Please write to the address in the footer.',
    fallback: 'The form is not wired on this deployment yet; your mail client will open instead.',
  },
  work: {
    title: 'Work & public artifacts',
    intro:
      'Each entry states what is publicly inspectable — a runnable deployment or open repository — alongside its exact validation boundary and limits. Nothing here is a commercial product.',
    proof: 'Public artifact',
    problem: 'Problem',
    approach: 'Approach',
    validation: 'Validation',
    limits: 'Limits',
    openLive: 'Open the deployment',
    openRepo: 'Repository',
    notesHeading: 'Research notes, not products',
    notesIntro:
      'Unpublished codebases and architectural studies referenced across the ecosystem, listed explicitly so no unverified operational claim is made for them.',
    back: '← Work',
  },
  simulator: {
    kicker: 'M.Sc. thesis · RWTH Aachen · 2025',
    title: 'CIM–ThreMA cross-domain ontology simulator',
    intro:
      'Data modelling in a cross-domain ontology for cyber intelligence in smart grids, using reinforcement learning. The simulator makes the thesis runnable: the CGMES mapping catalogue, the IEEE 9-bus cyber-physical testbed, and the scenario definitions ship in the deployment.',
    what: [
      'CIM/CGMES substation and network topology linked to the ThreMA threat ontology',
      'Five formal semantic mappings preserving topology updates across security views',
      'IEEE 9-bus cyber-physical testbed with four documented contingency scenarios',
      'Q-learning decision layer evaluated over the coupled grid-threat graph',
      'Cross-domain signal-to-noise metric scoring semantic mapping fidelity',
    ],
    open: 'Open the simulator',
    readWriteUp: 'Read the thesis write-up',
    not: 'The simulator runs on a dedicated deployment. It is validated thesis research on a 9-bus testbed, not an operational SCADA tool.',
  },
  contact: {
    title: 'Contact',
    intro:
      'For technical exchange and advisory enquiries on high-voltage grids, railway traction power, electrical machines, and physics-informed modelling. State the governing constraint; I will tell you plainly whether I can help.',
    direct: 'Direct email always works:',
  },
  card: {
    kicker: 'Frankfurt am Main · Electrical Engineering',
    role: 'ITk Fachspezialist · DB InfraGO AG · M.Sc. RWTH Aachen',
    tagline: 'Electrical grids, traction power, machines, and physics-informed digital twins.',
    email: 'Email',
    website: 'Technical site',
    githubLabel: 'GitHub',
    networkLabel: 'Domains',
    saveContact: 'Save vCard',
    connect: 'Write email',
    scanToShare: 'Scan for card',
    backHome: '← igrimaldi.engineering',
  },
  footer: {
    colophonRole: 'Electrical grids, railway traction power, electrical machines & physics-informed modelling · Frankfurt am Main',
    rights: 'All rights reserved.',
    imprint: 'Impressum',
    privacy: 'Datenschutz',
  },
  consent: {
    text: 'This site uses cookieless Vercel Analytics to count visits. No personal profiles, no ads.',
    accept: 'Allow',
    decline: 'Decline',
  },
  notFound: {
    title: 'Page not found',
    body: 'That URL does not exist. The grid, machine, and digital-twin pillars, technical articles, register, and contact page do.',
    cta: 'Home',
  },
};

const de: Copy = {
  nav: {
    domain: 'Energiesysteme & Maschinen',
    overview: 'Übersicht',
    grids: 'Netze & Bahnstrom',
    machines: 'Maschinen & Geräte',
    twins: 'Digitale Zwillinge',
    articles: 'Fachartikel',
    work: 'Arbeiten',
    thesis: 'Simulator',
    registry: 'Register',
    contact: 'Kontakt',
    menu: 'Menü',
    card: 'Karte',
  },
  home: {
    kicker: 'Hochspannungsnetze · Bahnstrom · Elektrische Maschinen · Physikinformierte Methoden',
    mandate: 'Elektrische Netze, Maschinen und physikinformierte Methoden.',
    lead:
      'Unabhängige Ingenieurarbeiten zu Hochspannungs-Umspannwerken, Bahnstromversorgung, elektrischen Maschinen, Leistungselektronik und physikinformierten digitalen Zwillingen — dokumentiert durch ausführbare Modelle, öffentliche Repositories und Fachbeiträge.',
    pillarsHeading: 'Technische Säulen',
    pillarsIntro:
      'Vier eng verzahnte Fachgebiete bilden das Fundament dieser Seite: Übertragungs- und Bahnstromnetze, elektrische Maschinen und Stromrichter, physikbasierte digitale Zwillinge sowie ausführbare Netzsimulation.',
    bottleneckHeading: 'Warum diese Arbeit zählt — Netzkapazität und physikalische Grenzen',
    bottleneckIntro:
      'Rechenzentren, industrielle Elektrifizierung und Bahninfrastruktur werden durch elektrische Engpässe begrenzt: Transformator-Lieferzeiten, Netzanschlusswarteschlangen, Kurzschlussleistung und thermisch-elektrische Hallengrenzen.',
    bottleneckBody:
      'Belastbare Kapazitätsaussagen entstehen aus Lastflussrechnung, Schutzkoordination, Stromrichterstabilität und thermischen Grenzkurven statt aus reiner Statistik. Diese physikalischen Grundlagen tragen sowohl die hier dokumentierten Arbeiten als auch das weitere Unternehmensökosystem.',
    bottleneckCta: 'Analyse zur Leistungskapazität lesen',
    articlesHeading: 'Technische Fachbeiträge',
    articlesIntro:
      'Vertiefende Analysen zu Momentanreserve bei 50 Hz, IT/OT-Konvergenz in der Bahnstromversorgung und den elektrischen Grenzen moderner KI-Rechenzentren.',
    articlesAll: 'Alle Fachbeiträge',
    registryHeading: 'Technisches Register',
    registryIntro:
      'Jeder Eintrag trennt öffentlich prüfbare Artefakte strikt von unveröffentlichten Forschungsnotizen. Keine Aussage ohne einsehbares Modell, Repository oder klar benannte Systemgrenze.',
    registryAll: 'Vollständiges Register öffnen',
    visionHeading: 'Technischer Horizont & Ökosystem',
    visionBody:
      'Diese Domain dokumentiert persönliche Ingenieurtiefe, ausführbare Forschungsmodelle und Fachanalysen. Unternehmerische Aktivitäten sind separat unter engineeringgrimaldi.com und grimaldi.ca gebündelt.',
    operatorHeading: 'Ingenieur & beruflicher Kontext',
    roleLine: 'ITk Fachspezialist, DB InfraGO AG · M.Sc. RWTH Aachen.',
    roleDetail: 'Digitalisierung von Bahnstrom-Hochspannungsanlagen, IT/OT-Architektur und Governance auf KRITIS-Niveau.',
    thesisNote:
      'Der ausführbare CIM–ThreMA-Ontologiesimulator sowie Anwendungen auf öffentlichen Infrastrukturdaten sind unter Arbeiten und Simulator dokumentiert.',
    formHeading: 'Technische Anfrage',
    formIntro:
      'Netzbetreiber, Bahninfrastruktur-Teams, Maschinenentwickler, Forschungsgruppen und Kapazitätsplaner: Nennen Sie die maßgebliche technische Randbedingung — ich antworte direkt.',
  },
  form: {
    name: 'Name',
    organisation: 'Organisation',
    constraint: 'Randbedingung',
    constraintHint: 'Was physikalisch oder architektonisch gelten muss — Spannungsebene, Norm, Netzmodell, Schnittstelle oder Stabilitätsgrenze.',
    email: 'E-Mail',
    send: 'Senden',
    sending: 'Wird gesendet…',
    sent: 'Angekommen. Ich antworte per E-Mail.',
    error: 'Senden nicht möglich. Bitte an die Adresse im Fußbereich schreiben.',
    fallback: 'Das Formular ist auf dieser Umgebung noch nicht angebunden; stattdessen öffnet sich Ihr E-Mail-Programm.',
  },
  work: {
    title: 'Arbeiten & öffentliche Artefakte',
    intro:
      'Jeder Eintrag benennt, was öffentlich einsehbar ist — ein laufendes Deployment oder ein offenes Repository — samt Validierungsrahmen und Grenzen. Nichts hier ist ein kommerzielles Produkt.',
    proof: 'Öffentliches Artefakt',
    problem: 'Problemstellung',
    approach: 'Methodik',
    validation: 'Validierung',
    limits: 'Grenzen',
    openLive: 'Deployment öffnen',
    openRepo: 'Repository',
    notesHeading: 'Forschungsnotizen, keine Produkte',
    notesIntro:
      'Unveröffentlichte Codebasen und Architekturstudien, die hier transparent eingeordnet werden, damit keine unbelegten Betriebsansprüche entstehen.',
    back: '← Arbeiten',
  },
  simulator: {
    kicker: 'Masterthesis · RWTH Aachen · 2025',
    title: 'CIM–ThreMA-Simulator für eine domänenübergreifende Smart-Grid-Ontologie',
    intro:
      'Datenmodellierung in einer domänenübergreifenden Ontologie für Cyber-Intelligenz in Smart Grids mittels Reinforcement Learning. Der Simulator macht die Thesis ausführbar: CGMES-Mapping-Katalog, IEEE-9-Bus-Testbed und Szenariodefinitionen sind direkt enthalten.',
    what: [
      'CIM/CGMES-Netztopologie verknüpft mit der ThreMA-Bedrohungsontologie',
      'Fünf formale semantische Abbildungen zwischen Netzbetriebs- und Sicherheitsmodell',
      'Cyber-physisches IEEE-9-Bus-Testbed mit vier dokumentierten Ausfallszenarien',
      'Q-Learning-Entscheidungsschicht auf dem gekoppelten Netz- und Bedrohungsgraphen',
      'Domänenübergreifende Signal-Rausch-Metrik zur Bewertung der Abbildungsqualität',
    ],
    open: 'Simulator öffnen',
    readWriteUp: 'Thesis-Ausarbeitung lesen',
    not: 'Der Simulator läuft auf einem separaten Deployment. Es handelt sich um ein validiertes Forschungsartefakt auf einem 9-Bus-Testnetz, nicht um ein produktives Leitstellensystem.',
  },
  contact: {
    title: 'Kontakt',
    intro:
      'Für fachlichen Austausch und Anfragen zu Hochspannungsnetzen, Bahnstromsystemen, elektrischen Maschinen und physikinformierter Modellierung. Nennen Sie die technische Randbedingung; ich antworte klar, ob ich unterstützen kann.',
    direct: 'Direkte E-Mail funktioniert jederzeit:',
  },
  card: {
    kicker: 'Frankfurt am Main · Elektrotechnik & Energiesysteme',
    role: 'ITk Fachspezialist · DB InfraGO AG · M.Sc. RWTH Aachen',
    tagline: 'Elektrische Netze, Bahnstrom, elektrische Maschinen und physikinformierte digitale Zwillinge.',
    email: 'E-Mail',
    website: 'Fachseite',
    githubLabel: 'GitHub',
    networkLabel: 'Domains',
    saveContact: 'vCard speichern',
    connect: 'E-Mail senden',
    scanToShare: 'QR-Code für Kontaktkarte',
    backHome: '← igrimaldi.engineering',
  },
  footer: {
    colophonRole: 'Elektrische Netze, Bahnstrom, elektrische Maschinen & physikinformierte Modellierung · Frankfurt am Main',
    rights: 'Alle Rechte vorbehalten.',
    imprint: 'Impressum',
    privacy: 'Datenschutz',
  },
  consent: {
    text: 'Diese Seite nutzt cookieloses Vercel Analytics zur Besucherzählung. Keine Profile, keine Werbung.',
    accept: 'Erlauben',
    decline: 'Ablehnen',
  },
  notFound: {
    title: 'Seite nicht gefunden',
    body: 'Diese URL existiert nicht. Die Fachseiten zu Netzen, Maschinen, digitalen Zwillingen, Fachartikeln, Register und Kontakt stehen bereit.',
    cta: 'Startseite',
  },
};

export const copy: Record<'en' | 'de', Copy> = { en, de };

export function pick(locale: Locale): Copy {
  return locale === 'de' ? de : en;
}
