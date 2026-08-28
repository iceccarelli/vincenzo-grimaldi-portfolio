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
        focus: 'Software · AI Agents · Infrastructure',
        description:
          'You are here. Software engineering, agentic AI systems, physics-informed learning, grid middleware, and the full development and deployment practice behind them.',
        cta: 'This site',
      },
      {
        host: 'engineeringgrimaldi.com',
        href: 'https://engineeringgrimaldi.com',
        focus: 'Hardware · Electrical Engineering',
        description:
          'The hardware and electrical engineering surface: high-voltage systems, embedded control boards, power electronics, and continuously deployed engineering write-ups of physical builds.',
        cta: 'Visit the hardware lab',
      },
      {
        host: 'grimaldi.ca',
        href: 'https://grimaldi.ca',
        focus: 'Personal · Blog · Life',
        description:
          'The personal all-in-one blog: life, travel, social updates, and the long arc of the work across the years — the human context around the engineering.',
        cta: 'Read the blog',
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
        focus: 'Software · Agentes de IA · Infraestructura',
        description:
          'Estás aquí. Ingeniería de software, sistemas de IA agéntica, aprendizaje informado por la física, middleware de red eléctrica y toda la práctica de desarrollo y despliegue detrás de ellos.',
        cta: 'Este sitio',
      },
      {
        host: 'engineeringgrimaldi.com',
        href: 'https://engineeringgrimaldi.com',
        focus: 'Hardware · Ingeniería Eléctrica',
        description:
          'La superficie de hardware e ingeniería eléctrica: sistemas de alta tensión, placas de control embebido, electrónica de potencia y publicaciones de ingeniería con despliegue continuo sobre construcciones físicas.',
        cta: 'Visitar el laboratorio de hardware',
      },
      {
        host: 'grimaldi.ca',
        href: 'https://grimaldi.ca',
        focus: 'Personal · Blog · Vida',
        description:
          'El blog personal todo-en-uno: vida, viajes, actualizaciones sociales y el arco largo del trabajo a través de los años — el contexto humano alrededor de la ingeniería.',
        cta: 'Leer el blog',
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
        focus: 'Software · KI-Agenten · Infrastruktur',
        description:
          'Sie sind hier. Softwareentwicklung, agentische KI-Systeme, physikinformiertes Lernen, Netz-Middleware und die gesamte Entwicklungs- und Deployment-Praxis dahinter.',
        cta: 'Diese Seite',
      },
      {
        host: 'engineeringgrimaldi.com',
        href: 'https://engineeringgrimaldi.com',
        focus: 'Hardware · Elektrotechnik',
        description:
          'Die Hardware- und Elektrotechnik-Oberfläche: Hochspannungssysteme, eingebettete Steuerplatinen, Leistungselektronik und kontinuierlich veröffentlichte Engineering-Berichte über physische Aufbauten.',
        cta: 'Zum Hardware-Labor',
      },
      {
        host: 'grimaldi.ca',
        href: 'https://grimaldi.ca',
        focus: 'Persönlich · Blog · Leben',
        description:
          'Der persönliche All-in-One-Blog: Leben, Reisen, soziale Updates und der lange Bogen der Arbeit über die Jahre — der menschliche Kontext rund um die Technik.',
        cta: 'Blog lesen',
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
        focus: '软件 · AI 智能体 · 基础设施',
        description:
          '您正在这里。软件工程、智能体 AI 系统、物理信息学习、电网中间件，以及支撑它们的完整开发与部署实践。',
        cta: '本站',
      },
      {
        host: 'engineeringgrimaldi.com',
        href: 'https://engineeringgrimaldi.com',
        focus: '硬件 · 电气工程',
        description: '硬件与电气工程界面：高压系统、嵌入式控制板、电力电子，以及针对实体项目持续部署的工程记录。',
        cta: '访问硬件实验室',
      },
      {
        host: 'grimaldi.ca',
        href: 'https://grimaldi.ca',
        focus: '个人 · 博客 · 生活',
        description: '个人一站式博客：生活、旅行、社交动态，以及多年来工作的长线脉络 — 工程背后的人文语境。',
        cta: '阅读博客',
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
};

export const dictionaries: Record<Locale, Dictionary> = { en, es, de, zh };

const STORAGE_KEY = 'vg-locale';

function detectLocale(): Locale {
  if (typeof window === 'undefined') return 'en';
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
