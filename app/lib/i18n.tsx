'use client';

/**
 * i18n.tsx — four-locale internationalisation layer.
 *
 * Design rules:
 * 1. English is the canonical source of truth. Every other locale mirrors the
 *    exact key structure — TypeScript enforces this via the Dictionary type,
 *    so a missing translation is a compile error, never a runtime blank.
 * 2. Locale is a client concern: persisted in localStorage (`vg-locale`),
 *    seeded from `navigator.language` on first visit, reflected onto
 *    `<html lang>` for accessibility and SEO signals.
 * 3. Technical proper nouns (CIM, ThreMA, RTOS, GridOS, IEEE 9-bus, protocol
 *    names) are deliberately not translated in any locale.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

export type Locale = 'en' | 'es' | 'de' | 'zh';

export const locales: { code: Locale; label: string; native: string }[] = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'es', label: 'Spanish', native: 'Español' },
  { code: 'de', label: 'German', native: 'Deutsch' },
  { code: 'zh', label: 'Mandarin', native: '中文' },
];

export type DomainCard = {
  host: string;
  href: string;
  focus: string;
  description: string;
  cta: string;
};

export type Dictionary = {
  nav: {
    capabilities: string;
    simulator: string;
    network: string;
    payments: string;
    connect: string;
  };
  hero: {
    kicker: string;
    title: string;
    lead: string;
    ctaSimulator: string;
    ctaWork: string;
    role: string;
    pills: string[];
  };
  about: {
    kicker: string;
    title: string;
    body: string;
    currently: string;
    currentRole: string;
    currentOrg: string;
    currentDetail: string;
    previously: string;
    previousRole: string;
    previousOrg: string;
    previousDetail: string;
  };
  physics: {
    kicker: string;
    title: string;
    intro: string;
    penaltyNote: string;
    futureHeading: string;
    future: string;
  };
  thesis: {
    kicker: string;
    title: string;
    intro: string;
    cta: string;
  };
  network: {
    kicker: string;
    title: string;
    intro: string;
    domains: DomainCard[];
  };
  connect: {
    kicker: string;
    title: string;
    body: string;
  };
  feedback: {
    title: string;
    body: string;
    yes: string;
    no: string;
    thanks: string;
  };
  capability: {
    kicker: string;
    title: string;
    intro: string;
    filterHint: string;
    filterHintActive: string;
    exercisedIn: string;
  };
  registryUi: {
    kicker: string;
    titleAll: string;
    /** '{count}' and '{domain}' are replaced at render time. */
    titleFiltered: string;
    clearFilter: string;
    shipped: string;
    inDevelopment: string;
    openLive: string;
    source: string;
    privateAccess: string;
  };
  /** Display names for capability domains. Keys are the canonical registry
   *  domain strings — filtering logic always uses the canonical key. */
  domainLabels: Record<string, string>;
  /** Localised overrides for capability summaries, keyed by domain.
   *  Missing key → registry's canonical English summary. */
  capabilitySummaries: Record<string, string>;
  /** Localised overrides for project summaries, keyed by project name.
   *  Missing key → registry's canonical English summary. */
  projectSummaries: Record<string, string>;
  payments: {
    kicker: string;
    title: string;
    intro: string;
    badge: string;
    accepted: string;
    secure: string;
    tiers: {
      title: string;
      price: string;
      sub: string;
      desc: string;
      points: string[];
      cta: string;
    }[];
  };
  contact: {
    name: string;
    email: string;
    company: string;
    message: string;
    send: string;
    sending: string;
    success: string;
    error: string;
  };
  footer: {
    cta: string;
    platform: string;
    network: string;
    status: string;
    role: string;
    roleSub: string;
    workRegistry: string;
    physicsInformed: string;
    liveSimulator: string;
    available: string;
    europe: string;
    backToTop: string;
    rights: string;
    netSoftware: string;
    netHardware: string;
    netPersonal: string;
  };
  megamenu: {
    trigger: string;
    capabilities: string;
    systems: string;
    openNow: string;
    fullRegistry: string;
    entries: string;
    signals: string;
    live: string;
    contactTag: string;
    contactTitle: string;
    contactBody: string;
  };
  palette: {
    label: string;
    placeholder: string;
    emptyPrefix: string;
    emptySuffix: string;
    groups: Record<string, string>;
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
    availability: string;
  };
};

const en: Dictionary = {
  nav: {
    capabilities: 'Capabilities',
    simulator: 'Simulator',
    network: 'Network',
    payments: 'Payments',
    connect: 'Connect',
  },
  hero: {
    kicker: 'Physics-Informed Systems • Deterministic Control • Grid Intelligence',
    title:
      'Designing deterministic, physics-informed intelligence for safety-critical control and grid systems.',
    lead: 'At the intersection of embedded logic, real-time operating systems, AI orchestration, and grid-scale infrastructure. My work translates high-stakes technical complexity into systems that are predictable, legible, and deployable in safety-critical environments.',
    ctaSimulator: 'Launch the thesis simulator',
    ctaWork: 'See what I build',
    role: 'Grid Networks Engineer, DB InfraGO AG',
    pills: ['Embedded Control', 'Grid Intelligence', 'AI Orchestration', 'RTOS & V&V'],
  },
  about: {
    kicker: 'About the work',
    title: 'I integrate AI, software, energy and robotics into systems where every layer is verifiable.',
    body: 'I do not treat them as isolated domains. From RTOS scheduling to AI orchestration, each layer has to be checkable before the one above it is allowed to depend on it.',
    currently: 'Currently',
    currentRole: 'ITk Fachspezialist — Digitisation of high-voltage assets',
    currentOrg: 'DB InfraGO AG · Aug 2024 – present · Frankfurt',
    currentDetail:
      'Digitalisation of railway traction HV grids, IT/OT convergence, and KRITIS-aligned cybersecurity governance for mission-critical rail infrastructure.',
    previously: 'Previously',
    previousRole: 'Industrial Engineering Intern — High-voltage maintenance',
    previousOrg: 'DB Fahrzeuginstandhaltung GmbH & DB Netz AG · Jun 2022 – Sep 2024',
    previousDetail:
      'Lifecycle management of traction power substations, asset condition monitoring, and predictive maintenance.',
  },
  physics: {
    kicker: 'Physics-informed intelligence',
    title: 'Where the laws of physics meet deterministic AI',
    intro:
      'Physics-informed intelligence does not stop at pattern recognition. It constrains learning with the same governing equations that define the physical system.',
    penaltyNote: 'The model is penalised whenever its predictions violate the governing dynamics of the system.',
    futureHeading: 'Where this is heading',
    future:
      'Real-time surrogate models for optimal power flow and inverter control — systems that are not merely intelligent, but operationally trustworthy under physical constraints.',
  },
  thesis: {
    kicker: 'RWTH Aachen M.Sc. thesis · June 2025',
    title:
      'Data modelling in a cross-domain ontology for cyber intelligence in smart grids using reinforcement learning',
    intro:
      'The first systematic integration of the Common Information Model (CIM) with the ThreMA cybersecurity framework: unified semantic representations connecting physical power components with vulnerabilities and protective measures. Validated on an enhanced IEEE 9-bus system.',
    cta: 'Open the simulator',
  },
  network: {
    kicker: 'The Grimaldi Network',
    title: 'Three domains. One engineering practice.',
    intro:
      'Everything I ship lives on one of three properties, each with a single, non-overlapping mandate. This site is the software surface; the other two cover hardware and the person behind both.',
    domains: [
      {
        host: 'igrimaldi.engineering',
        href: 'https://igrimaldi.engineering',
        focus: 'Verifiable intelligence for grids and traction power',
        description: 'You are here. Residuals you can check, agents you can audit, sanitized patterns from live HV rail assets. The full capability register lives here only.',
        cta: 'Verify',
      },
      {
        host: 'engineeringgrimaldi.com',
        href: 'https://engineeringgrimaldi.com',
        focus: 'One trade cell, shipped and measured',
        description: 'Hardware and trade automation — Palletizer, the Forge cells — sold and measured there, not here.',
        cta: 'Buy',
      },
      {
        host: 'grimaldi.ca',
        href: 'https://grimaldi.ca',
        focus: 'Logbook, podcast, reviews, books',
        description: 'Essays, the podcast, reviews, the books and the love of the work — the person behind both engineering domains.',
        cta: 'Read',
      },
    ],
  },
  connect: {
    kicker: 'Connect',
    title: 'If this systems-level thinking resonates, the next step should be immediate.',
    body: 'AI-native middleware, smart-grid operating systems, embedded control platforms, robotics, or research collaboration. The repositories are private; access is granted on request.',
  },
  feedback: {
    title: 'Did you find what you were looking for today?',
    body: 'Your answer directly shapes what gets built and published next.',
    yes: 'Yes',
    no: 'No',
    thanks: 'Thank you — noted.',
  },
  capability: {
    kicker: 'Capability Register',
    title: 'Every competence below names where it was actually exercised.',
    intro: 'Grouped by domain rather than by tool. Select a domain to filter the work registry underneath it.',
    filterHint: 'Filter registry',
    filterHintActive: 'Filtering registry',
    exercisedIn: 'Exercised in',
  },
  registryUi: {
    kicker: 'Work Registry',
    titleAll: 'Public repositories, with their status stated plainly.',
    titleFiltered: '{count} in {domain}',
    clearFilter: 'Clear filter',
    shipped: 'Shipped',
    inDevelopment: 'In development',
    openLive: 'Open live demo',
    source: 'Source',
    privateAccess: 'Private — request access',
  },
  domainLabels: {},
  capabilitySummaries: {},
  projectSummaries: {},
  payments: {
    kicker: 'Engage & Payments',
    title: 'Work together — settle securely in seconds.',
    intro:
      'Consultation deposits, advisory retainers, and invoice payments through encrypted Stripe checkout. Cards, mobile wallets, and SEPA accepted — with an instant receipt.',
    badge: 'Most popular',
    accepted: 'Accepted',
    secure: 'Secure checkout by Stripe — your card details are never seen by Vincenzo.',
    tiers: [
      {
        title: 'Consultation',
        price: '€280',
        sub: 'per 60-min session',
        desc: 'A 60-minute teardown of your model, feeder, substation LAN diagram or vendor proposal.',
        points: ['Written recap', 'Residual / architecture critique', 'Go/no-go for a 30-day pilot', 'Slot within 48 hours'],
        cta: 'Book a session',
      },
      {
        title: 'Advisory Retainer',
        price: '€3,200',
        sub: 'per month',
        desc: 'Only after a teardown. One scoped artefact per month — a validation report, a review, a pattern. Cancel anytime.',
        points: ['Requires a completed teardown', 'Scoped monthly artefact', 'Not “access to a network”'],
        cta: 'Start retainer',
      },
      {
        title: 'Pay Any Amount',
        price: 'You decide',
        sub: 'any currency',
        desc: 'Enter exactly what you owe — from €5 to €5,000 — and pay with the method you prefer.',
        points: ['Type any amount at checkout', 'Card, Apple / Google Pay, SEPA', 'Instant emailed receipt'],
        cta: 'Enter an amount',
      },
    ],
  },
  contact: {
    name: 'Your name',
    email: 'Your email',
    company: 'Company / organisation (optional)',
    message: 'What would you like to build or discuss?',
    send: 'Send message',
    sending: 'Sending…',
    success: "Thanks — your message is in. I'll reply within one business day.",
    error: 'Something went wrong. Email vincenzo@igrimaldi.engineering directly.',
  },
  footer: {
    cta: 'Start a conversation',
    platform: 'Platform',
    network: 'Network',
    status: 'Status',
    role: 'Physics-Informed Cyber-Physical Systems Engineer.',
    roleSub: 'Deterministic control • Grid intelligence • AI orchestration.',
    workRegistry: 'Work registry',
    physicsInformed: 'Physics-informed',
    liveSimulator: 'Live simulator',
    available: 'Available for a €280 teardown',
    europe: 'Frankfurt am Main • Grids, traction power, verification. Slot within 48 hours.',
    backToTop: 'Back to top ↑',
    rights: '© 2026 Vincenzo Grimaldi. All rights reserved.',
    netSoftware: 'Software & AI',
    netHardware: 'Hardware & EE',
    netPersonal: 'Personal blog',
  },
  megamenu: {
    trigger: 'Browse',
    capabilities: 'Capabilities',
    systems: 'Systems',
    openNow: 'Open now',
    fullRegistry: 'Full work registry',
    entries: 'entries',
    signals: 'signals',
    live: 'Live',
    contactTag: 'Contact',
    contactTitle: 'Start a conversation',
    contactBody: 'Grid intelligence, agentic middleware, or research collaboration.',
  },
  palette: {
    label: 'Search',
    placeholder: 'Jump to a section, capability or repository…',
    emptyPrefix: 'Nothing matches',
    emptySuffix: 'Try a domain name, or a repository like GridOS.',
    groups: {
      Sections: 'Sections',
      Capabilities: 'Capabilities',
      Systems: 'Systems',
      Elsewhere: 'Elsewhere',
    },
  },
  card: {
    kicker: 'Digital business card',
    role: 'Physics-Informed Cyber-Physical Systems Engineer',
    tagline: 'Deterministic control · Grid intelligence · AI orchestration — across software, hardware and energy systems.',
    email: 'Email',
    website: 'Website',
    githubLabel: 'Code',
    networkLabel: 'The Grimaldi Network',
    saveContact: 'Save contact (vCard)',
    connect: 'Start a conversation',
    scanToShare: 'Scan to share this card',
    backHome: 'View the full portfolio →',
    availability: 'Available for consultation · Europe-based',
  },
};

const es: Dictionary = {
  nav: {
    capabilities: 'Capacidades',
    simulator: 'Simulador',
    network: 'Red',
    payments: 'Pagos',
    connect: 'Contacto',
  },
  hero: {
    kicker: 'Sistemas informados por la física • Control determinista • Inteligencia de red',
    title:
      'Diseño inteligencia determinista, informada por la física, para sistemas de control y redes eléctricas de seguridad crítica.',
    lead: 'En la intersección de la lógica embebida, los sistemas operativos en tiempo real, la orquestación de IA y la infraestructura a escala de red. Mi trabajo traduce la complejidad técnica de alto riesgo en sistemas predecibles, legibles y desplegables en entornos de seguridad crítica.',
    ctaSimulator: 'Abrir el simulador de la tesis',
    ctaWork: 'Ver lo que construyo',
    role: 'Ingeniero de Redes Eléctricas, DB InfraGO AG',
    pills: ['Control embebido', 'Inteligencia de red', 'Orquestación de IA', 'RTOS y V&V'],
  },
  about: {
    kicker: 'Sobre el trabajo',
    title: 'Integro IA, software, energía y robótica en sistemas donde cada capa es verificable.',
    body: 'No los trato como dominios aislados. Desde la planificación del RTOS hasta la orquestación de IA, cada capa debe ser comprobable antes de que la capa superior pueda depender de ella.',
    currently: 'Actualmente',
    currentRole: 'Especialista ITk — Digitalización de activos de alta tensión',
    currentOrg: 'DB InfraGO AG · Ago 2024 – presente · Fráncfort',
    currentDetail:
      'Digitalización de redes de tracción ferroviaria de alta tensión, convergencia IT/OT y gobernanza de ciberseguridad alineada con KRITIS para infraestructura ferroviaria de misión crítica.',
    previously: 'Anteriormente',
    previousRole: 'Becario de Ingeniería Industrial — Mantenimiento de alta tensión',
    previousOrg: 'DB Fahrzeuginstandhaltung GmbH y DB Netz AG · Jun 2022 – Sep 2024',
    previousDetail:
      'Gestión del ciclo de vida de subestaciones de tracción, monitorización del estado de activos y mantenimiento predictivo.',
  },
  physics: {
    kicker: 'Inteligencia informada por la física',
    title: 'Donde las leyes de la física se encuentran con la IA determinista',
    intro:
      'La inteligencia informada por la física no se detiene en el reconocimiento de patrones: restringe el aprendizaje con las mismas ecuaciones que gobiernan el sistema físico.',
    penaltyNote: 'El modelo es penalizado cada vez que sus predicciones violan la dinámica que gobierna el sistema.',
    futureHeading: 'Hacia dónde va esto',
    future:
      'Modelos sustitutos en tiempo real para flujo óptimo de potencia y control de inversores: sistemas que no solo son inteligentes, sino operativamente fiables bajo restricciones físicas.',
  },
  thesis: {
    kicker: 'Tesis de M.Sc., RWTH Aachen · Junio 2025',
    title:
      'Modelado de datos en una ontología interdominio para ciberinteligencia en redes inteligentes mediante aprendizaje por refuerzo',
    intro:
      'La primera integración sistemática del Common Information Model (CIM) con el marco de ciberseguridad ThreMA: representaciones semánticas unificadas que conectan componentes físicos de potencia con vulnerabilidades y medidas de protección. Validado en un sistema IEEE de 9 barras mejorado.',
    cta: 'Abrir el simulador',
  },
  network: {
    kicker: 'La Red Grimaldi',
    title: 'Tres dominios. Una sola práctica de ingeniería.',
    intro:
      'Todo lo que publico vive en una de tres propiedades, cada una con un mandato único y sin solapamientos. Este sitio es la superficie de software; los otros dos cubren el hardware y la persona detrás de ambos.',
    domains: [
      {
        host: 'igrimaldi.engineering',
        href: 'https://igrimaldi.engineering',
        focus: 'Inteligencia verificable para redes y tracción',
        description: 'Está aquí. Residuos verificables, agentes auditables, patrones anonimizados de activos ferroviarios de AT. El registro completo de capacidades vive solo aquí.',
        cta: 'Verificar',
      },
      {
        host: 'engineeringgrimaldi.com',
        href: 'https://engineeringgrimaldi.com',
        focus: 'Una celda de oficio, entregada y medida',
        description: 'Automatización de hardware y oficios — Palletizer, las celdas Forge — se vende y se mide allí, no aquí.',
        cta: 'Comprar',
      },
      {
        host: 'grimaldi.ca',
        href: 'https://grimaldi.ca',
        focus: 'Bitácora, podcast, reseñas, libros',
        description: 'Ensayos, el podcast, reseñas, los libros y el amor por el oficio — la persona detrás de ambos dominios de ingeniería.',
        cta: 'Leer',
      },
    ],
  },
  connect: {
    kicker: 'Contacto',
    title: 'Si este pensamiento a nivel de sistemas resuena contigo, el siguiente paso debería ser inmediato.',
    body: 'Middleware nativo de IA, sistemas operativos para redes inteligentes, plataformas de control embebido, robótica o colaboración en investigación. Los repositorios son privados; el acceso se concede bajo petición.',
  },
  feedback: {
    title: '¿Encontraste hoy lo que buscabas?',
    body: 'Tu respuesta influye directamente en lo próximo que se construye y publica.',
    yes: 'Sí',
    no: 'No',
    thanks: 'Gracias — anotado.',
  },
  capability: {
    kicker: 'Registro de Capacidades',
    title: 'Cada competencia indica dónde se ejerció realmente.',
    intro: 'Agrupadas por dominio, no por herramienta. Selecciona un dominio para filtrar el registro de trabajo debajo.',
    filterHint: 'Filtrar registro',
    filterHintActive: 'Filtrando registro',
    exercisedIn: 'Ejercida en',
  },
  registryUi: {
    kicker: 'Registro de Trabajo',
    titleAll: 'Repositorios públicos, con su estado indicado claramente.',
    titleFiltered: '{count} en {domain}',
    clearFilter: 'Quitar filtro',
    shipped: 'Publicado',
    inDevelopment: 'En desarrollo',
    openLive: 'Abrir demo en vivo',
    source: 'Código fuente',
    privateAccess: 'Privado — solicitar acceso',
  },
  domainLabels: {
    'Grid & Power Systems': 'Redes y Sistemas de Potencia',
    'Industrial Protocols & IT/OT': 'Protocolos Industriales e IT/OT',
    'Physics-Informed Learning': 'Aprendizaje Informado por la Física',
    'Robotics & Perception': 'Robótica y Percepción',
    'Agentic Middleware': 'Middleware Agéntico',
    'Systems Engineering': 'Ingeniería de Sistemas',
  },
  capabilitySummaries: {
    'Grid & Power Systems':
      'Modelar, coordinar y despachar activos eléctricos — desde subestaciones de tracción hasta recursos energéticos distribuidos.',
    'Industrial Protocols & IT/OT':
      'Hacer que los equipos de campo hablen con el software sin perder determinismo, manteniendo defendible la frontera entre ambos.',
    'Physics-Informed Learning':
      'Incorporar las ecuaciones gobernantes y los modelos de amenazas en los componentes aprendidos para que sus salidas sigan siendo físicamente admisibles.',
    'Robotics & Perception':
      'Convertir retornos de sensores en geometría sobre la que un controlador puede actuar, con la matemática de calibración bien hecha.',
    'Agentic Middleware':
      'Permitir que los modelos de lenguaje alcancen actuadores y registros reales sin renunciar a una traza de auditoría ni a un interruptor de emergencia.',
    'Systems Engineering':
      'El sustrato de entrega: servicios tipados, extensiones nativas, interfaces en tiempo real y pipelines que publican.',
  },
  projectSummaries: {
    'physics-informed':
      'Simulador interactivo de la ontología interdominio CIM + ThreMA, solvers PINN, agentes de seguridad RL y validación ciberfísica IEEE de 9 barras.',
    GridOS:
      'Middleware y superficie de control DER: ingesta de protocolos, despacho MILP, detección de anomalías y bucle MPC con pronóstico.',
    DERIM:
      'Middleware de integración de recursos energéticos distribuidos centrado en coordinación verificable y ejecución consciente de la red.',
    'mcp-foundry':
      'Capa de gobernanza para agentes de IA que actúan sobre sistemas financieros: motor de políticas determinista, tokens de acción firmados, registro de auditoría encadenado.',
    'robot-lidar-fusion':
      'Proyección LiDAR-a-cámara con extrínsecos SE(3), intrínsecos pinhole, oclusión por z-buffer y cargador de calibración KITTI.',
    NeuralBridge:
      'Middleware nativo de IA para orquestación humano-modelo en entornos de seguridad crítica informados por la física.',
    'Bahn Project Manager':
      'Plataforma empresarial para proyectos de infraestructura y estaciones de Deutsche Bahn en 14 departamentos técnicos, basada en un dataset de 1.298 proyectos.',
    'ForgeOS': 'El sistema operativo robótico nativo de IA para los oficios de mayor dolor y mayor ROI — la plataforma detrás de la Línea Forge en engineeringgrimaldi.com.',
    'FloorForge AI': 'Automatización nativa de IA para el oficio de los pisos — entrada de la Línea Forge, en desarrollo activo con código público.',
    'PaintForge AI': 'Automatización nativa de IA para el oficio de la pintura — entrada de la Línea Forge, en desarrollo activo con código público.',
    'DryForge AI': 'Automatización nativa de IA para flujos de secado y clima en obra — entrada de la Línea Forge, en desarrollo activo con código público.',
    'GridForge AI': 'Energía detrás del medidor para centros de datos de IA: generación en sitio, microrredes DC y almacenamiento híbrido que evitan las demoras de interconexión.',
    'ForgePower Semi': 'Módulos de potencia SiC y GaN a medida, convertidores de alta densidad y redes inteligentes de entrega de potencia para GPUs de IA y potencia a nivel de rack.',
    'ThermalForge': 'Infraestructura de refrigeración líquida y co-optimización térmica-eléctrica para racks de IA de alta densidad: placas frías directo-al-chip y CDUs avanzadas.',
    'Palletizer OS':
      'Base de software determinista y agnóstica al hardware para paletizado de fin de línea: control, seguridad, planificación multi-SKU y telemetría de flota, con optimizador en vivo.',
  },
  payments: {
    kicker: 'Colaboración y Pagos',
    title: 'Trabajemos juntos — pago seguro en segundos.',
    intro:
      'Depósitos de consultoría, retainers de asesoría y pagos de facturas mediante checkout cifrado de Stripe. Se aceptan tarjetas, monederos móviles y SEPA — con recibo instantáneo.',
    badge: 'Más popular',
    accepted: 'Se acepta',
    secure: 'Pago seguro con Stripe — Vincenzo nunca ve los datos de tu tarjeta.',
    tiers: [
      {
        title: 'Consultoría',
        price: '280 €',
        sub: 'por sesión de 60 min',
        desc: 'Una sesión de trabajo enfocada y de alta densidad sobre inteligencia de red, sistemas ciberfísicos o IA informada por la física.',
        points: ['Resolución de problemas en vivo', 'Resumen escrito para ti', 'Cita en menos de 48 horas'],
        cta: 'Reservar sesión',
      },
      {
        title: 'Retainer de Asesoría',
        price: '3.200 €',
        sub: 'al mes',
        desc: 'Solo tras un teardown. Un artefacto definido al mes — un informe de validación, una revisión, un patrón. Cancela cuando quieras.',
        points: ['Requiere un teardown completado', 'Artefacto mensual definido', 'No es «acceso a una red»'],
        cta: 'Iniciar retainer',
      },
      {
        title: 'Paga Cualquier Importe',
        price: 'Tú decides',
        sub: 'cualquier divisa',
        desc: 'Introduce exactamente lo que debes — de 5 € a 5.000 € — y paga con el método que prefieras.',
        points: ['Importe libre en el checkout', 'Tarjeta, Apple / Google Pay, SEPA', 'Recibo instantáneo por email'],
        cta: 'Introducir importe',
      },
    ],
  },
  contact: {
    name: 'Tu nombre',
    email: 'Tu email',
    company: 'Empresa / organización (opcional)',
    message: '¿Qué te gustaría construir o discutir?',
    send: 'Enviar mensaje',
    sending: 'Enviando…',
    success: 'Gracias — tu mensaje ha llegado. Respondo en un día laborable.',
    error: 'Algo salió mal. Escribe directamente a vincenzo@igrimaldi.engineering.',
  },
  footer: {
    cta: 'Iniciar una conversación',
    platform: 'Plataforma',
    network: 'Red',
    status: 'Estado',
    role: 'Ingeniero de Sistemas Ciberfísicos Informados por la Física.',
    roleSub: 'Control determinista • Inteligencia de red • Orquestación de IA.',
    workRegistry: 'Registro de trabajo',
    physicsInformed: 'Informado por la física',
    liveSimulator: 'Simulador en vivo',
    available: 'Disponible para un teardown de 280 €',
    europe: 'Fráncfort del Meno • Redes, tracción ferroviaria, verificación. Cita en menos de 48 horas.',
    backToTop: 'Volver arriba ↑',
    rights: '© 2026 Vincenzo Grimaldi. Todos los derechos reservados.',
    netSoftware: 'Software e IA',
    netHardware: 'Hardware e Ing. Eléctrica',
    netPersonal: 'Blog personal',
  },
  megamenu: {
    trigger: 'Explorar',
    capabilities: 'Capacidades',
    systems: 'Sistemas',
    openNow: 'Abrir ahora',
    fullRegistry: 'Registro completo',
    entries: 'entradas',
    signals: 'señales',
    live: 'En vivo',
    contactTag: 'Contacto',
    contactTitle: 'Iniciar una conversación',
    contactBody: 'Inteligencia de red, middleware agéntico o colaboración en investigación.',
  },
  palette: {
    label: 'Buscar',
    placeholder: 'Salta a una sección, capacidad o repositorio…',
    emptyPrefix: 'Nada coincide con',
    emptySuffix: 'Prueba un dominio o un repositorio como GridOS.',
    groups: {
      Sections: 'Secciones',
      Capabilities: 'Capacidades',
      Systems: 'Sistemas',
      Elsewhere: 'Otros sitios',
    },
  },
  card: {
    kicker: 'Tarjeta de presentación digital',
    role: 'Ingeniero de Sistemas Ciberfísicos Informados por la Física',
    tagline: 'Control determinista · Inteligencia de red · Orquestación de IA — en software, hardware y sistemas de energía.',
    email: 'Correo',
    website: 'Sitio web',
    githubLabel: 'Código',
    networkLabel: 'La Red Grimaldi',
    saveContact: 'Guardar contacto (vCard)',
    connect: 'Iniciar una conversación',
    scanToShare: 'Escanea para compartir esta tarjeta',
    backHome: 'Ver el portafolio completo →',
    availability: 'Disponible para consultoría · Con base en Europa',
  },
};

const de: Dictionary = {
  nav: {
    capabilities: 'Kompetenzen',
    simulator: 'Simulator',
    network: 'Netzwerk',
    payments: 'Zahlungen',
    connect: 'Kontakt',
  },
  hero: {
    kicker: 'Physikinformierte Systeme • Deterministische Regelung • Netzintelligenz',
    title:
      'Ich entwerfe deterministische, physikinformierte Intelligenz für sicherheitskritische Regelungs- und Netzsysteme.',
    lead: 'An der Schnittstelle von eingebetteter Logik, Echtzeitbetriebssystemen, KI-Orchestrierung und Infrastruktur im Netzmaßstab. Meine Arbeit übersetzt technische Komplexität mit hohem Risiko in Systeme, die vorhersagbar, nachvollziehbar und in sicherheitskritischen Umgebungen einsetzbar sind.',
    ctaSimulator: 'Thesis-Simulator starten',
    ctaWork: 'Sehen, was ich baue',
    role: 'Ingenieur für Stromnetze, DB InfraGO AG',
    pills: ['Eingebettete Regelung', 'Netzintelligenz', 'KI-Orchestrierung', 'RTOS & V&V'],
  },
  about: {
    kicker: 'Über die Arbeit',
    title: 'Ich integriere KI, Software, Energie und Robotik zu Systemen, in denen jede Schicht verifizierbar ist.',
    body: 'Ich behandle sie nicht als isolierte Domänen. Vom RTOS-Scheduling bis zur KI-Orchestrierung muss jede Schicht prüfbar sein, bevor die darüberliegende von ihr abhängen darf.',
    currently: 'Aktuell',
    currentRole: 'ITk-Fachspezialist — Digitalisierung von Hochspannungsanlagen',
    currentOrg: 'DB InfraGO AG · Aug 2024 – heute · Frankfurt',
    currentDetail:
      'Digitalisierung von Bahnstrom-Hochspannungsnetzen, IT/OT-Konvergenz und KRITIS-konforme Cybersecurity-Governance für unternehmenskritische Bahninfrastruktur.',
    previously: 'Zuvor',
    previousRole: 'Werkstudent Industrial Engineering — Hochspannungsinstandhaltung',
    previousOrg: 'DB Fahrzeuginstandhaltung GmbH & DB Netz AG · Jun 2022 – Sep 2024',
    previousDetail:
      'Lebenszyklusmanagement von Bahnstrom-Unterwerken, Zustandsüberwachung von Anlagen und prädiktive Instandhaltung.',
  },
  physics: {
    kicker: 'Physikinformierte Intelligenz',
    title: 'Wo die Gesetze der Physik auf deterministische KI treffen',
    intro:
      'Physikinformierte Intelligenz endet nicht bei der Mustererkennung. Sie beschränkt das Lernen mit denselben Gleichungen, die das physikalische System bestimmen.',
    penaltyNote: 'Das Modell wird bestraft, sobald seine Vorhersagen die maßgebende Dynamik des Systems verletzen.',
    futureHeading: 'Wohin das führt',
    future:
      'Echtzeit-Surrogatmodelle für optimalen Leistungsfluss und Wechselrichterregelung — Systeme, die nicht nur intelligent, sondern unter physikalischen Randbedingungen betrieblich vertrauenswürdig sind.',
  },
  thesis: {
    kicker: 'M.Sc.-Thesis, RWTH Aachen · Juni 2025',
    title:
      'Datenmodellierung in einer domänenübergreifenden Ontologie für Cyber-Intelligenz in Smart Grids mittels Reinforcement Learning',
    intro:
      'Die erste systematische Integration des Common Information Model (CIM) mit dem ThreMA-Cybersecurity-Framework: einheitliche semantische Repräsentationen, die physische Netzkomponenten mit Schwachstellen und Schutzmaßnahmen verbinden. Validiert an einem erweiterten IEEE-9-Bus-System.',
    cta: 'Simulator öffnen',
  },
  network: {
    kicker: 'Das Grimaldi-Netzwerk',
    title: 'Drei Domains. Eine Ingenieurspraxis.',
    intro:
      'Alles, was ich veröffentliche, lebt auf einer von drei Domains mit jeweils einem einzigen, überschneidungsfreien Auftrag. Diese Seite ist die Software-Oberfläche; die anderen beiden decken Hardware und den Menschen dahinter ab.',
    domains: [
      {
        host: 'igrimaldi.engineering',
        href: 'https://igrimaldi.engineering',
        focus: 'Verifizierbare Intelligenz für Stromnetze und Bahnstrom',
        description: 'Sie sind hier. Prüfbare Residuen, auditierbare Agenten, bereinigte Muster aus laufenden HV-Bahnanlagen. Das vollständige Kompetenzregister lebt nur hier.',
        cta: 'Prüfen',
      },
      {
        host: 'engineeringgrimaldi.com',
        href: 'https://engineeringgrimaldi.com',
        focus: 'Eine Handwerkszelle, ausgeliefert und gemessen',
        description: 'Hardware- und Handwerksautomatisierung — Palletizer, die Forge-Zellen — wird dort verkauft und gemessen, nicht hier.',
        cta: 'Kaufen',
      },
      {
        host: 'grimaldi.ca',
        href: 'https://grimaldi.ca',
        focus: 'Logbuch, Podcast, Rezensionen, Bücher',
        description: 'Essays, der Podcast, Rezensionen, die Bücher und die Liebe zur Arbeit — der Mensch hinter beiden Engineering-Domains.',
        cta: 'Lesen',
      },
    ],
  },
  connect: {
    kicker: 'Kontakt',
    title: 'Wenn dieses Denken auf Systemebene ankommt, sollte der nächste Schritt unmittelbar folgen.',
    body: 'KI-native Middleware, Smart-Grid-Betriebssysteme, eingebettete Regelungsplattformen, Robotik oder Forschungskooperation. Die Repositories sind privat; Zugriff wird auf Anfrage gewährt.',
  },
  feedback: {
    title: 'Haben Sie heute gefunden, wonach Sie gesucht haben?',
    body: 'Ihre Antwort bestimmt direkt mit, was als Nächstes gebaut und veröffentlicht wird.',
    yes: 'Ja',
    no: 'Nein',
    thanks: 'Danke — notiert.',
  },
  capability: {
    kicker: 'Kompetenzregister',
    title: 'Jede Kompetenz benennt, wo sie tatsächlich ausgeübt wurde.',
    intro: 'Gruppiert nach Domäne statt nach Werkzeug. Wählen Sie eine Domäne, um das Arbeitsregister darunter zu filtern.',
    filterHint: 'Register filtern',
    filterHintActive: 'Register gefiltert',
    exercisedIn: 'Ausgeübt bei',
  },
  registryUi: {
    kicker: 'Arbeitsregister',
    titleAll: 'Öffentliche Repositories, mit klar benanntem Status.',
    titleFiltered: '{count} in {domain}',
    clearFilter: 'Filter aufheben',
    shipped: 'Veröffentlicht',
    inDevelopment: 'In Entwicklung',
    openLive: 'Live-Demo öffnen',
    source: 'Quellcode',
    privateAccess: 'Privat — Zugriff anfragen',
  },
  domainLabels: {
    'Grid & Power Systems': 'Netz- & Energiesysteme',
    'Industrial Protocols & IT/OT': 'Industrieprotokolle & IT/OT',
    'Physics-Informed Learning': 'Physikinformiertes Lernen',
    'Robotics & Perception': 'Robotik & Wahrnehmung',
    'Agentic Middleware': 'Agentische Middleware',
    'Systems Engineering': 'Systems Engineering',
  },
  capabilitySummaries: {
    'Grid & Power Systems':
      'Elektrische Anlagen modellieren, koordinieren und disponieren — von Traktionsunterwerken bis zu dezentralen Energieressourcen.',
    'Industrial Protocols & IT/OT':
      'Feldgeräte mit Software sprechen lassen, ohne Determinismus zu verlieren — und die Grenze zwischen beiden verteidigbar halten.',
    'Physics-Informed Learning':
      'Maßgebende Gleichungen und Bedrohungsmodelle in gelernte Komponenten einbetten, damit deren Ausgaben physikalisch zulässig bleiben.',
    'Robotics & Perception':
      'Rohe Sensordaten in Geometrie verwandeln, auf die ein Regler wirken kann — mit sauber gerechneter Kalibriermathematik.',
    'Agentic Middleware':
      'Sprachmodellen Zugriff auf echte Aktoren und echte Konten geben, ohne Audit-Trail und Not-Aus aufzugeben.',
    'Systems Engineering':
      'Das Liefersubstrat: typisierte Services, native Erweiterungen, Echtzeit-Browseroberflächen und Pipelines, die veröffentlichen.',
  },
  projectSummaries: {
    'physics-informed':
      'Interaktiver Simulator für die domänenübergreifende CIM+ThreMA-Ontologie, PINN-Solver, RL-Sicherheitsagenten und IEEE-9-Bus-Validierung.',
    GridOS:
      'DER-Middleware und Leitoberfläche: Protokoll-Ingest, MILP-Dispatch, Anomalieerkennung und ein prognosegetriebener MPC-Regelkreis.',
    DERIM:
      'Integrations-Middleware für dezentrale Energieressourcen mit Fokus auf verifizierbare Koordination und netzbewusste Ausführung.',
    'mcp-foundry':
      'Governance-Schicht für KI-Agenten auf Finanzsystemen: deterministische Policy-Engine, signierte Aktions-Token, hash-verkettetes Auditlog.',
    'robot-lidar-fusion':
      'LiDAR-zu-Kamera-Projektion mit SE(3)-Extrinsik, Pinhole-Intrinsik, Z-Buffer-Verdeckung und KITTI-Kalibrierlader.',
    NeuralBridge:
      'KI-native Middleware für Mensch-Modell-Orchestrierung in sicherheitskritischen, physikinformierten Umgebungen.',
    'Bahn Project Manager':
      'Enterprise-Plattform für DB-Infrastruktur- und Bahnhofsprojekte über 14 Fachbereiche, datengetrieben aus 1.298 Projekten.',
    'ForgeOS': 'Das KI-native Roboter-Betriebssystem für die schmerzhaftesten Gewerke mit dem höchsten ROI — die Plattform hinter der Forge-Linie auf engineeringgrimaldi.com.',
    'FloorForge AI': 'KI-native Automatisierung für das Bodenleger-Gewerk — Forge-Linie, in aktiver Entwicklung mit öffentlichem Code.',
    'PaintForge AI': 'KI-native Automatisierung für das Maler-Gewerk — Forge-Linie, in aktiver Entwicklung mit öffentlichem Code.',
    'DryForge AI': 'KI-native Automatisierung für Trocknungs- und Klima-Abläufe auf der Baustelle — Forge-Linie, in aktiver Entwicklung mit öffentlichem Code.',
    'GridForge AI': 'Behind-the-Meter-Strom für KI-Rechenzentren: Vor-Ort-Erzeugung, DC-Microgrids und Hybridspeicher, die Netzanschluss-Verzögerungen umgehen.',
    'ForgePower Semi': 'Maßgeschneiderte SiC- & GaN-Leistungsmodule, hochdichte Umrichter und intelligente Power-Delivery-Netzwerke für KI-GPUs und Rack-Level-Power.',
    'ThermalForge': 'Flüssigkühl-Infrastruktur und thermisch-elektrische Co-Optimierung für hochdichte KI-Racks: Direct-to-Chip-Kühlplatten und fortgeschrittene CDUs.',
    'Palletizer OS':
      'Hardware-agnostische, deterministische Software-Basis für End-of-Line-Palettierung: Regelung, Sicherheit, Misch-SKU-Planung und Flottentelemetrie, mit Live-Optimierer.',
  },
  payments: {
    kicker: 'Zusammenarbeit & Zahlungen',
    title: 'Zusammenarbeiten — sicher bezahlt in Sekunden.',
    intro:
      'Beratungsanzahlungen, Advisory-Retainer und Rechnungszahlungen über verschlüsselten Stripe-Checkout. Karten, mobile Wallets und SEPA — mit sofortiger Quittung.',
    badge: 'Am beliebtesten',
    accepted: 'Akzeptiert',
    secure: 'Sicherer Checkout über Stripe — Ihre Kartendaten sieht Vincenzo nie.',
    tiers: [
      {
        title: 'Beratung',
        price: '280 €',
        sub: 'pro 60-Min.-Session',
        desc: 'Ein 60-Minuten-Teardown Ihres Modells, Abgangs, Unterwerks-LAN-Diagramms oder Anbieterangebots.',
        points: ['Schriftliche Zusammenfassung', 'Residuen-/Architekturkritik', 'Go/No-Go für einen 30-Tage-Pilot', 'Termin innerhalb von 48 Stunden'],
        cta: 'Session buchen',
      },
      {
        title: 'Advisory-Retainer',
        price: '3.200 €',
        sub: 'pro Monat',
        desc: 'Nur nach einem Teardown. Ein definiertes Artefakt pro Monat — ein Validierungsreport, ein Review, ein Muster. Jederzeit kündbar.',
        points: ['Setzt einen abgeschlossenen Teardown voraus', 'Definiertes Monatsartefakt', 'Kein „Zugang zu einem Netzwerk“'],
        cta: 'Retainer starten',
      },
      {
        title: 'Beliebiger Betrag',
        price: 'Sie entscheiden',
        sub: 'jede Währung',
        desc: 'Geben Sie genau den geschuldeten Betrag ein — von 5 € bis 5.000 € — und zahlen Sie mit Ihrer bevorzugten Methode.',
        points: ['Freier Betrag im Checkout', 'Karte, Apple / Google Pay, SEPA', 'Sofortige Quittung per E-Mail'],
        cta: 'Betrag eingeben',
      },
    ],
  },
  contact: {
    name: 'Ihr Name',
    email: 'Ihre E-Mail',
    company: 'Unternehmen / Organisation (optional)',
    message: 'Was möchten Sie bauen oder besprechen?',
    send: 'Nachricht senden',
    sending: 'Wird gesendet…',
    success: 'Danke — Ihre Nachricht ist da. Antwort innerhalb eines Werktags.',
    error: 'Etwas ist schiefgelaufen. Schreiben Sie direkt an vincenzo@igrimaldi.engineering.',
  },
  footer: {
    cta: 'Gespräch beginnen',
    platform: 'Plattform',
    network: 'Netzwerk',
    status: 'Status',
    role: 'Ingenieur für physikinformierte cyber-physische Systeme.',
    roleSub: 'Deterministische Regelung • Netzintelligenz • KI-Orchestrierung.',
    workRegistry: 'Arbeitsregister',
    physicsInformed: 'Physikinformiert',
    liveSimulator: 'Live-Simulator',
    available: 'Verfügbar für einen €280-Teardown',
    europe: 'Frankfurt am Main • Stromnetze, Bahnstrom, Verifikation. Termin innerhalb von 48 Stunden.',
    backToTop: 'Nach oben ↑',
    rights: '© 2026 Vincenzo Grimaldi. Alle Rechte vorbehalten.',
    netSoftware: 'Software & KI',
    netHardware: 'Hardware & Elektrotechnik',
    netPersonal: 'Persönlicher Blog',
  },
  megamenu: {
    trigger: 'Übersicht',
    capabilities: 'Kompetenzen',
    systems: 'Systeme',
    openNow: 'Jetzt öffnen',
    fullRegistry: 'Vollständiges Register',
    entries: 'Einträge',
    signals: 'Signale',
    live: 'Live',
    contactTag: 'Kontakt',
    contactTitle: 'Gespräch beginnen',
    contactBody: 'Netzintelligenz, agentische Middleware oder Forschungskooperation.',
  },
  palette: {
    label: 'Suche',
    placeholder: 'Zu Abschnitt, Kompetenz oder Repository springen…',
    emptyPrefix: 'Nichts passt zu',
    emptySuffix: 'Versuchen Sie eine Domäne oder ein Repository wie GridOS.',
    groups: {
      Sections: 'Abschnitte',
      Capabilities: 'Kompetenzen',
      Systems: 'Systeme',
      Elsewhere: 'Anderswo',
    },
  },
  card: {
    kicker: 'Digitale Visitenkarte',
    role: 'Ingenieur für physikinformierte cyber-physische Systeme',
    tagline: 'Deterministische Regelung · Netzintelligenz · KI-Orchestrierung — über Software, Hardware und Energiesysteme hinweg.',
    email: 'E-Mail',
    website: 'Website',
    githubLabel: 'Code',
    networkLabel: 'Das Grimaldi-Netzwerk',
    saveContact: 'Kontakt speichern (vCard)',
    connect: 'Gespräch beginnen',
    scanToShare: 'Scannen, um diese Karte zu teilen',
    backHome: 'Zum vollständigen Portfolio →',
    availability: 'Verfügbar für Beratung · In Europa ansässig',
  },
};

const zh: Dictionary = {
  nav: {
    capabilities: '核心能力',
    simulator: '模拟器',
    network: '站点网络',
    payments: '支付',
    connect: '联系',
  },
  hero: {
    kicker: '物理信息系统 • 确定性控制 • 电网智能',
    title: '为安全关键的控制与电网系统设计确定性的、物理信息驱动的智能。',
    lead: '处于嵌入式逻辑、实时操作系统、AI 编排与电网级基础设施的交汇点。我的工作把高风险的技术复杂性转化为可预测、可读且可部署于安全关键环境的系统。',
    ctaSimulator: '启动论文模拟器',
    ctaWork: '看看我的作品',
    role: '电网网络工程师，DB InfraGO AG',
    pills: ['嵌入式控制', '电网智能', 'AI 编排', 'RTOS 与验证确认'],
  },
  about: {
    kicker: '关于这些工作',
    title: '我将 AI、软件、能源与机器人整合为每一层都可验证的系统。',
    body: '我不把它们当作彼此孤立的领域。从 RTOS 调度到 AI 编排，每一层都必须先可校验，上层才被允许依赖它。',
    currently: '现任',
    currentRole: 'ITk 专家 — 高压资产数字化',
    currentOrg: 'DB InfraGO AG · 2024 年 8 月至今 · 法兰克福',
    currentDetail: '铁路牵引高压电网数字化、IT/OT 融合，以及面向关键铁路基础设施、符合 KRITIS 要求的网络安全治理。',
    previously: '此前',
    previousRole: '工业工程实习 — 高压检修',
    previousOrg: 'DB Fahrzeuginstandhaltung GmbH 与 DB Netz AG · 2022 年 6 月 – 2024 年 9 月',
    previousDetail: '牵引变电站全生命周期管理、资产状态监测与预测性维护。',
  },
  physics: {
    kicker: '物理信息智能',
    title: '物理定律与确定性 AI 的交汇之处',
    intro: '物理信息智能不止于模式识别，它用定义物理系统的控制方程来约束学习过程。',
    penaltyNote: '一旦模型的预测违反系统的控制动力学，模型就会受到惩罚。',
    futureHeading: '未来方向',
    future: '面向最优潮流与逆变器控制的实时代理模型 — 不仅智能，而且在物理约束下具备可信的运行表现。',
  },
  thesis: {
    kicker: '亚琛工业大学（RWTH Aachen）硕士论文 · 2025 年 6 月',
    title: '基于强化学习的智能电网网络智能跨域本体数据建模',
    intro:
      '首次将公共信息模型（CIM）与 ThreMA 网络安全框架系统性整合：以统一的语义表示连接物理电力组件、漏洞与防护措施，并在增强的 IEEE 9 节点系统上完成验证。',
    cta: '打开模拟器',
  },
  network: {
    kicker: 'Grimaldi 站点网络',
    title: '三个域名，一套工程实践。',
    intro:
      '我发布的一切都归属于三个站点之一，每个站点承担单一且互不重叠的使命。本站是软件界面；另外两个分别覆盖硬件与两者背后的这个人。',
    domains: [
      {
        host: 'igrimaldi.engineering',
        href: 'https://igrimaldi.engineering',
        focus: '面向电网与牵引供电的可验证智能',
        description: '您在这里。可校验的残差、可审计的智能体、来自在运高压铁路资产的脱敏模式。完整能力登记仅在本站。',
        cta: '验证',
      },
      {
        host: 'engineeringgrimaldi.com',
        href: 'https://engineeringgrimaldi.com',
        focus: '一个已交付并测量的工种单元',
        description: '硬件与工种自动化——Palletizer、Forge 单元——在那里销售和测量，不在这里。',
        cta: '购买',
      },
      {
        host: 'grimaldi.ca',
        href: 'https://grimaldi.ca',
        focus: '日志、播客、评论、著作',
        description: '随笔、播客、评论、著作，以及对工作的热爱——两个工程域名背后的人。',
        cta: '阅读',
      },
    ],
  },
  connect: {
    kicker: '联系',
    title: '如果这种系统级思维引起了你的共鸣，下一步就应当立即发生。',
    body: 'AI 原生中间件、智能电网操作系统、嵌入式控制平台、机器人技术或研究合作。代码仓库为私有，可按需申请访问权限。',
  },
  feedback: {
    title: '今天找到您想要的内容了吗？',
    body: '您的反馈将直接影响接下来构建与发布的内容。',
    yes: '找到了',
    no: '没有',
    thanks: '谢谢 — 已记录。',
  },
  capability: {
    kicker: '能力清单',
    title: '以下每项能力都注明了它实际应用的场景。',
    intro: '按领域而非工具分组。选择一个领域即可筛选下方的工作台账。',
    filterHint: '筛选台账',
    filterHintActive: '正在筛选',
    exercisedIn: '应用于',
  },
  registryUi: {
    kicker: '工作台账',
    titleAll: '公开仓库，状态如实标注。',
    titleFiltered: '{domain}：{count} 个',
    clearFilter: '清除筛选',
    shipped: '已发布',
    inDevelopment: '开发中',
    openLive: '打开在线演示',
    source: '源码',
    privateAccess: '私有 — 申请访问',
  },
  domainLabels: {
    'Grid & Power Systems': '电网与电力系统',
    'Industrial Protocols & IT/OT': '工业协议与 IT/OT',
    'Physics-Informed Learning': '物理信息学习',
    'Robotics & Perception': '机器人与感知',
    'Agentic Middleware': '智能体中间件',
    'Systems Engineering': '系统工程',
  },
  capabilitySummaries: {
    'Grid & Power Systems': '对电力资产进行建模、协调与调度 — 从牵引变电站到分布式能源资源。',
    'Industrial Protocols & IT/OT': '让现场设备与软件对话而不失确定性，并让两者之间的边界始终可防御。',
    'Physics-Informed Learning': '将控制方程与威胁模型嵌入学习组件，使其输出始终保持物理可行。',
    'Robotics & Perception': '把原始传感器回波转化为控制器可以作用的几何信息，并把标定数学做扎实。',
    'Agentic Middleware': '让语言模型触达真实执行器与真实账本，同时不放弃审计链与紧急停止开关。',
    'Systems Engineering': '交付基座：类型化服务、原生扩展、实时浏览器界面，以及能够发布的流水线。',
  },
  projectSummaries: {
    'physics-informed': '跨域 CIM + ThreMA 本体、PINN 求解器、强化学习安全智能体与 IEEE 9 节点网络物理验证的交互式模拟器。',
    GridOS: 'DER 中间件与控制界面：协议接入、MILP 调度、异常检测与预测驱动的 MPC 控制回路。',
    DERIM: '面向可验证协调与电网感知执行的分布式能源资源集成中间件。',
    'mcp-foundry': '面向金融系统 AI 智能体的治理层：确定性策略引擎、签名操作令牌、哈希链审计日志。',
    'robot-lidar-fusion': '基于 SE(3) 外参、针孔内参、z-buffer 遮挡处理与 KITTI 标定加载器的 LiDAR 到相机投影。',
    NeuralBridge: '面向安全关键、物理信息环境的人机模型编排 AI 原生中间件。',
    'Bahn Project Manager': '覆盖德国铁路 14 个技术部门的基础设施与车站项目企业平台，基于 1,298 个项目的数据集。',
    'ForgeOS': '面向痛点最深、回报最高工种的 AI 原生机器人操作系统 — engineeringgrimaldi.com 上 Forge 产品线背后的平台。',
    'FloorForge AI': '面向地板工种的 AI 原生自动化 — Forge 产品线条目，积极开发中，代码公开。',
    'PaintForge AI': '面向喷涂工种的 AI 原生自动化 — Forge 产品线条目，积极开发中，代码公开。',
    'DryForge AI': '面向工地干燥与气候流程的 AI 原生自动化 — Forge 产品线条目，积极开发中，代码公开。',
    'GridForge AI': '为 AI 数据中心提供表后电力：现场发电、直流微电网与混合储能，绕开并网排队延误。',
    'ForgePower Semi': '定制与半定制 SiC/GaN 功率模块、高密度变换器，以及面向 AI GPU 与机架级供电的智能配电网络。',
    'ThermalForge': '面向高密度 AI 机架的液冷基础设施与热-电协同优化：芯片直触冷板与先进 CDU。',
    'Palletizer OS': '硬件无关、确定性的码垛软件基座：控制、安全、混合 SKU 规划与机群遥测，附带在线优化器。',
  },
  payments: {
    kicker: '合作与支付',
    title: '一起工作 — 数秒内安全结算。',
    intro: '咨询定金、顾问月费与账单支付均通过加密的 Stripe 结账完成。支持银行卡、移动钱包与 SEPA — 即时开具收据。',
    badge: '最受欢迎',
    accepted: '支持',
    secure: '由 Stripe 提供安全结账 — Vincenzo 永远不会看到您的卡片信息。',
    tiers: [
      {
        title: '咨询',
        price: '€280',
        sub: '每 60 分钟',
        desc: '一场聚焦、高密度的工作会谈，主题涵盖电网智能、网络物理系统或物理信息 AI。',
        points: ['现场解决问题', '书面纪要归您所有', '48 小时内安排'],
        cta: '预约会谈',
      },
      {
        title: '顾问月费',
        price: '€3,200',
        sub: '每月',
        desc: '仅在拆解评审之后。每月一个明确范围的交付物——验证报告、评审或模式。可随时取消。',
        points: ['需先完成拆解评审', '明确范围的月度交付物', '不是“加入一个网络”'],
        cta: '开始合作',
      },
      {
        title: '任意金额',
        price: '您决定',
        sub: '任意币种',
        desc: '输入确切应付金额 — 从 €5 到 €5,000 — 并用您偏好的方式支付。',
        points: ['结账时自由输入金额', '银行卡、Apple / Google Pay、SEPA', '收据即时发送至邮箱'],
        cta: '输入金额',
      },
    ],
  },
  contact: {
    name: '您的姓名',
    email: '您的邮箱',
    company: '公司 / 机构（选填）',
    message: '您想构建或探讨什么？',
    send: '发送消息',
    sending: '发送中…',
    success: '谢谢 — 消息已送达，一个工作日内回复。',
    error: '出了点问题。请直接发邮件至 vincenzo@igrimaldi.engineering。',
  },
  footer: {
    cta: '开始对话',
    platform: '平台',
    network: '站点网络',
    status: '状态',
    role: '物理信息网络物理系统工程师。',
    roleSub: '确定性控制 • 电网智能 • AI 编排。',
    workRegistry: '工作台账',
    physicsInformed: '物理信息',
    liveSimulator: '在线模拟器',
    available: '可预约 €280 拆解评审',
    europe: '法兰克福 • 电网、牵引供电、验证。48 小时内安排。',
    backToTop: '返回顶部 ↑',
    rights: '© 2026 Vincenzo Grimaldi 版权所有。',
    netSoftware: '软件与 AI',
    netHardware: '硬件与电气工程',
    netPersonal: '个人博客',
  },
  megamenu: {
    trigger: '浏览',
    capabilities: '能力',
    systems: '系统',
    openNow: '立即打开',
    fullRegistry: '完整台账',
    entries: '条',
    signals: '项',
    live: '在线',
    contactTag: '联系',
    contactTitle: '开始对话',
    contactBody: '电网智能、智能体中间件或研究合作。',
  },
  palette: {
    label: '搜索',
    placeholder: '跳转到版块、能力或仓库…',
    emptyPrefix: '没有匹配',
    emptySuffix: '试试某个领域，或 GridOS 这样的仓库名。',
    groups: {
      Sections: '版块',
      Capabilities: '能力',
      Systems: '系统',
      Elsewhere: '其他站点',
    },
  },
  card: {
    kicker: '数字名片',
    role: '物理信息网络物理系统工程师',
    tagline: '确定性控制 · 电网智能 · AI 编排 — 横跨软件、硬件与能源系统。',
    email: '邮箱',
    website: '网站',
    githubLabel: '代码',
    networkLabel: 'Grimaldi 站点网络',
    saveContact: '保存联系人（vCard）',
    connect: '开始对话',
    scanToShare: '扫码分享这张名片',
    backHome: '查看完整作品集 →',
    availability: '可接受咨询 · 常驻欧洲',
  },
};

export const dictionaries: Record<Locale, Dictionary> = { en, es, de, zh };

const STORAGE_KEY = 'vg-locale';

function detectLocale(): Locale {
  if (typeof window === 'undefined') return 'en';
  // /de /es /zh redirect to /?lang=xx (vercel.json) — honour it and persist it.
  try {
    const q = new URLSearchParams(window.location.search).get('lang');
    if (q === 'en' || q === 'es' || q === 'de' || q === 'zh') {
      try {
        window.localStorage.setItem(STORAGE_KEY, q);
      } catch {
        /* private mode */
      }
      return q;
    }
  } catch {
    /* no URL access — fall through */
  }
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'en' || stored === 'es' || stored === 'de' || stored === 'zh') return stored;
  } catch {
    /* storage unavailable — fall through to language sniff */
  }
  const lang = window.navigator.language.toLowerCase();
  if (lang.startsWith('es')) return 'es';
  if (lang.startsWith('de')) return 'de';
  if (lang.startsWith('zh')) return 'zh';
  return 'en';
}

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
};

const LanguageContext = createContext<LanguageContextValue>({
  locale: 'en',
  setLocale: () => undefined,
  t: en,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Render 'en' on the server and on first client paint, then adopt the
  // detected locale after hydration — this keeps SSR and client HTML
  // identical and avoids hydration mismatches by construction.
  const [locale, setLocaleState] = useState<Locale>('en');

  useEffect(() => {
    setLocaleState(detectLocale());
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === 'zh' ? 'zh-Hans' : locale;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* private mode — non-fatal */
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t: dictionaries[locale] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  return useContext(LanguageContext);
}
