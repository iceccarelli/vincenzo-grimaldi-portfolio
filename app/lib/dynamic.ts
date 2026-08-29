/**
 * dynamic.ts — data + strings for the dynamic layer (v9).
 *
 * Three features share this module:
 *   1. Stories   — AWS-style featured carousel of real, openable case studies.
 *   2. Showcase  — the "live on the network" row: only deployments a visitor
 *                  can open right now. Nothing links to a dead surface.
 *   3. Ask       — the floating network concierge. It is an instant, client-side
 *                  guide over this knowledge index — it says so honestly in its
 *                  disclaimer and never pretends to be a server-side LLM.
 *
 * All copy is carried in the four network locales.
 */

import type { Locale } from './i18n';

export type L = Record<Locale, string>;

/* ------------------------------------------------------------------ */
/* Stories                                                             */
/* ------------------------------------------------------------------ */

export type Story = {
  id: string;
  href: string;
  external: boolean;
  /** Card accent — used for the tag chip + hover glow. */
  accent: string;
  tag: L;
  title: L;
  body: L;
  cta: L;
};

export const storiesUi: {
  kicker: L;
  title: L;
  intro: L;
  showcaseKicker: L;
  showcaseTitle: L;
  showcaseIntro: L;
  liveBadge: L;
  prev: L;
  next: L;
} = {
  kicker: {
    en: 'Featured work',
    es: 'Trabajo destacado',
    de: 'Ausgewählte Arbeit',
    zh: '精选工作',
  },
  title: {
    en: 'From manual trades to automated systems — how the network ships',
    es: 'De los oficios manuales a los sistemas automatizados: así entrega la red',
    de: 'Vom manuellen Handwerk zu automatisierten Systemen — so liefert das Netzwerk',
    zh: '从手工行业到自动化系统 — 网络如何交付',
  },
  intro: {
    en: 'Real platforms, real deployments, real code. Every card below opens something you can inspect yourself.',
    es: 'Plataformas reales, despliegues reales, código real. Cada tarjeta abre algo que puedes inspeccionar tú mismo.',
    de: 'Echte Plattformen, echte Deployments, echter Code. Jede Karte öffnet etwas, das Sie selbst prüfen können.',
    zh: '真实的平台、真实的部署、真实的代码。下面每张卡片都能打开可供您亲自查验的内容。',
  },
  showcaseKicker: {
    en: 'Live on the network',
    es: 'En vivo en la red',
    de: 'Live im Netzwerk',
    zh: '网络实时在线',
  },
  showcaseTitle: {
    en: 'Deployments you can open right now',
    es: 'Despliegues que puedes abrir ahora mismo',
    de: 'Deployments, die Sie sofort öffnen können',
    zh: '即刻可访问的部署',
  },
  showcaseIntro: {
    en: 'Every surface here is in production. If it is listed, it loads.',
    es: 'Cada superficie aquí está en producción. Si está en la lista, carga.',
    de: 'Jede Oberfläche hier ist in Produktion. Was gelistet ist, lädt.',
    zh: '这里的每个站点都在生产环境运行。列出即可访问。',
  },
  liveBadge: { en: 'Live', es: 'En vivo', de: 'Live', zh: '在线' },
  prev: { en: 'Previous', es: 'Anterior', de: 'Zurück', zh: '上一个' },
  next: { en: 'Next', es: 'Siguiente', de: 'Weiter', zh: '下一个' },
};

export const stories: Story[] = [
  {
    id: 'palletizer',
    href: 'https://palletizer-app.vercel.app',
    external: true,
    accent: '#38bdf8',
    tag: { en: 'Robotics · Shipped', es: 'Robótica · Entregado', de: 'Robotik · Ausgeliefert', zh: '机器人 · 已交付' },
    title: {
      en: 'Palletizer OS: a deterministic software core for end-of-line robotics',
      es: 'Palletizer OS: un núcleo de software determinista para robótica de fin de línea',
      de: 'Palletizer OS: ein deterministischer Software-Kern für End-of-Line-Robotik',
      zh: 'Palletizer OS：码垛机器人末端产线的确定性软件核心',
    },
    body: {
      en: 'Hardware-agnostic control loops, safety logic and mixed-SKU planning — with the optimizer deployed and usable in production.',
      es: 'Bucles de control agnósticos al hardware, lógica de seguridad y planificación multi-SKU — con el optimizador desplegado y usable en producción.',
      de: 'Hardware-agnostische Regelkreise, Sicherheitslogik und Mixed-SKU-Planung — mit dem Optimierer produktiv im Einsatz.',
      zh: '硬件无关的控制回路、安全逻辑与混合 SKU 规划 — 优化器已上线可用。',
    },
    cta: { en: 'Open the live optimizer', es: 'Abrir el optimizador en vivo', de: 'Live-Optimierer öffnen', zh: '打开在线优化器' },
  },
  {
    id: 'thesis',
    href: 'https://physics-informed.vercel.app/',
    external: true,
    accent: '#34d399',
    tag: { en: 'Physics-Informed', es: 'Informado por la física', de: 'Physikinformiert', zh: '物理信息' },
    title: {
      en: 'The thesis you can run: the CIM–ThreMA cross-domain simulator, live',
      es: 'La tesis que puedes ejecutar: el simulador transdominio CIM–ThreMA, en vivo',
      de: 'Die Thesis zum Ausführen: der domänenübergreifende CIM–ThreMA-Simulator, live',
      zh: '可运行的硕士论文：CIM–ThreMA 跨域仿真器，实时在线',
    },
    body: {
      en: 'PINN solvers, RL security agents and IEEE 9-bus cyber-physical validation from the RWTH Aachen master thesis — as an interactive deployment, not a PDF.',
      es: 'Solvers PINN, agentes de seguridad RL y validación ciberfísica IEEE de 9 barras de la tesis de RWTH Aachen — como despliegue interactivo, no como PDF.',
      de: 'PINN-Solver, RL-Sicherheitsagenten und cyber-physische IEEE-9-Bus-Validierung aus der RWTH-Masterarbeit — als interaktives Deployment, nicht als PDF.',
      zh: 'RWTH 亚琛硕士论文中的 PINN 求解器、强化学习安全代理与 IEEE 9 节点信息物理验证 — 以交互式部署呈现，而非 PDF。',
    },
    cta: { en: 'Run the simulator', es: 'Ejecutar el simulador', de: 'Simulator starten', zh: '运行仿真器' },
  },
  {
    id: 'forge',
    href: 'https://engineeringgrimaldi.com',
    external: true,
    accent: '#3ef58f',
    tag: { en: 'Trades 2.0', es: 'Oficios 2.0', de: 'Handwerk 2.0', zh: '行业 2.0' },
    title: {
      en: 'The Forge Line: migrating the trades from manual craft to automated systems',
      es: 'La Línea Forge: migrando los oficios del trabajo manual a los sistemas automatizados',
      de: 'Die Forge Line: das Handwerk vom manuellen Gewerk zu automatisierten Systemen migrieren',
      zh: 'Forge 产品线：把传统行业从手工作业迁移到自动化系统',
    },
    body: {
      en: 'One automation product per trade — palletizing shipped; flooring, painting and drying in open development — with ForgeOS as the robotic OS behind the line.',
      es: 'Un producto de automatización por oficio — paletizado entregado; pisos, pintura y secado en desarrollo abierto — con ForgeOS como el SO robótico detrás de la línea.',
      de: 'Ein Automatisierungsprodukt pro Gewerk — Palettieren ausgeliefert; Boden, Lackieren und Trocknen in offener Entwicklung — mit ForgeOS als robotischem OS dahinter.',
      zh: '每个行业一款自动化产品 — 码垛已交付；地板、喷涂与干燥公开开发中 — 背后是机器人操作系统 ForgeOS。',
    },
    cta: { en: 'Visit the product site', es: 'Visitar el sitio de producto', de: 'Produktseite besuchen', zh: '访问产品站点' },
  },
  {
    id: 'books',
    href: 'https://grimaldi.ca/#books',
    external: true,
    accent: '#c0563a',
    tag: { en: 'Books · Proof engines', es: 'Libros · Motores de prueba', de: 'Bücher · Beweis-Engines', zh: '著作 · 验证引擎' },
    title: {
      en: 'Eleven proof engines: every load-bearing number in The Renewables Migration runs',
      es: 'Once motores de prueba: cada número estructural de The Renewables Migration se ejecuta',
      de: 'Elf Beweis-Engines: jede tragende Zahl in The Renewables Migration ist ausführbar',
      zh: '十一个验证引擎：《The Renewables Migration》中每个关键数字都可运行',
    },
    body: {
      en: 'One public repository per chapter, so readers can re-run the numbers instead of trusting them. Both manuscripts are honestly in revision.',
      es: 'Un repositorio público por capítulo, para que los lectores re-ejecuten los números en vez de confiar en ellos. Ambos manuscritos están honestamente en revisión.',
      de: 'Ein öffentliches Repository pro Kapitel — Leser können die Zahlen nachrechnen statt ihnen zu vertrauen. Beide Manuskripte sind ehrlich in Überarbeitung.',
      zh: '每章一个公开仓库，读者可以重新运行数字而不是盲信。两部书稿均如实标注“修订中”。',
    },
    cta: { en: 'See the receipts', es: 'Ver los recibos', de: 'Belege ansehen', zh: '查看凭证' },
  },
  {
    id: 'bahn',
    href: 'https://github.com/iceccarelli/bahn-project-manager',
    external: true,
    accent: '#7a52f4',
    tag: { en: 'Enterprise', es: 'Empresa', de: 'Enterprise', zh: '企业级' },
    title: {
      en: 'Bahn Project Manager: 1,298 infrastructure projects, 14 departments, one platform',
      es: 'Bahn Project Manager: 1.298 proyectos de infraestructura, 14 departamentos, una plataforma',
      de: 'Bahn Project Manager: 1.298 Infrastrukturprojekte, 14 Fachbereiche, eine Plattform',
      zh: 'Bahn Project Manager：1298 个基建项目、14 个部门、一个平台',
    },
    body: {
      en: 'An enterprise platform for Deutsche Bahn infrastructure and station development, data-driven from a real project dataset — source public on GitHub.',
      es: 'Una plataforma empresarial para infraestructura y desarrollo de estaciones de Deutsche Bahn, impulsada por un dataset real de proyectos — código público en GitHub.',
      de: 'Eine Enterprise-Plattform für DB-Infrastruktur und Bahnhofsentwicklung, datengetrieben aus einem realen Projektdatensatz — Quellcode öffentlich auf GitHub.',
      zh: '面向德国铁路基建与车站开发的企业级平台，由真实项目数据集驱动 — 源码在 GitHub 公开。',
    },
    cta: { en: 'Read the source', es: 'Leer el código', de: 'Quellcode lesen', zh: '阅读源码' },
  },
  {
    id: 'card',
    href: '/card',
    external: false,
    accent: '#0972d3',
    tag: { en: 'Network', es: 'Red', de: 'Netzwerk', zh: '网络' },
    title: {
      en: 'One card, whole network: the digital business card',
      es: 'Una tarjeta, toda la red: la tarjeta de visita digital',
      de: 'Eine Karte, das ganze Netzwerk: die digitale Visitenkarte',
      zh: '一张名片，整个网络：数字名片',
    },
    body: {
      en: 'vCard download, QR code and the full entity graph — the anchor every search engine and AI agent resolves when asking who builds all of this.',
      es: 'Descarga vCard, código QR y el grafo de entidad completo — el ancla que cada buscador y agente de IA resuelve al preguntar quién construye todo esto.',
      de: 'vCard-Download, QR-Code und der vollständige Entity-Graph — der Anker, den jede Suchmaschine und jeder KI-Agent auflöst.',
      zh: 'vCard 下载、二维码与完整实体图谱 — 搜索引擎和 AI 代理解析“这一切由谁构建”时的锚点。',
    },
    cta: { en: 'Open the card', es: 'Abrir la tarjeta', de: 'Karte öffnen', zh: '打开名片' },
  },
];

/* ------------------------------------------------------------------ */
/* Showcase — live deployments only                                    */
/* ------------------------------------------------------------------ */

export type Deployment = {
  id: string;
  href: string;
  host: string;
  title: L;
  desc: L;
};

export const deployments: Deployment[] = [
  {
    id: 'palletizer-app',
    href: 'https://palletizer-app.vercel.app',
    host: 'palletizer-app.vercel.app',
    title: { en: 'Palletizer optimizer', es: 'Optimizador de paletizado', de: 'Palettier-Optimierer', zh: '码垛优化器' },
    desc: {
      en: 'Mixed-SKU pallet planning, running in production.',
      es: 'Planificación de palets multi-SKU, en producción.',
      de: 'Mixed-SKU-Palettenplanung, produktiv im Einsatz.',
      zh: '混合 SKU 托盘规划，生产环境运行中。',
    },
  },
  {
    id: 'physics-informed',
    href: 'https://physics-informed.vercel.app/',
    host: 'physics-informed.vercel.app',
    title: { en: 'Thesis simulator', es: 'Simulador de la tesis', de: 'Thesis-Simulator', zh: '论文仿真器' },
    desc: {
      en: 'The RWTH master thesis as an interactive deployment.',
      es: 'La tesis de RWTH como despliegue interactivo.',
      de: 'Die RWTH-Masterarbeit als interaktives Deployment.',
      zh: 'RWTH 硕士论文的交互式部署。',
    },
  },
  {
    id: 'eng',
    href: 'https://engineeringgrimaldi.com',
    host: 'engineeringgrimaldi.com',
    title: { en: 'The Forge Line', es: 'La Línea Forge', de: 'Die Forge Line', zh: 'Forge 产品线' },
    desc: {
      en: 'Trades 2.0 product site with a live grid-frequency scope.',
      es: 'Sitio de producto Oficios 2.0 con osciloscopio de frecuencia en vivo.',
      de: 'Handwerk-2.0-Produktseite mit Live-Netzfrequenz-Scope.',
      zh: '行业 2.0 产品站，含实时电网频率示波器。',
    },
  },
  {
    id: 'ca',
    href: 'https://grimaldi.ca',
    host: 'grimaldi.ca',
    title: { en: 'The personal site', es: 'El sitio personal', de: 'Die persönliche Seite', zh: '个人站点' },
    desc: {
      en: 'The journey, the books with proof engines, the ventures.',
      es: 'El camino, los libros con motores de prueba, las empresas.',
      de: 'Der Weg, die Bücher mit Beweis-Engines, die Ventures.',
      zh: '历程、带验证引擎的著作、创业项目。',
    },
  },
  {
    id: 'plastilonas',
    href: 'https://plastilonas-peruanas-sac.vercel.app',
    host: 'plastilonas-peruanas-sac.vercel.app',
    title: { en: 'Plastilonas Peruanas SAC', es: 'Plastilonas Peruanas SAC', de: 'Plastilonas Peruanas SAC', zh: 'Plastilonas Peruanas SAC' },
    desc: {
      en: 'Production B2B platform for a real Lima business.',
      es: 'Plataforma B2B en producción para un negocio real de Lima.',
      de: 'Produktive B2B-Plattform für ein reales Unternehmen in Lima.',
      zh: '为利马真实企业运行的 B2B 生产平台。',
    },
  },
  {
    id: 'ecowoods',
    href: 'https://ecowoods.ca',
    host: 'ecowoods.ca',
    title: { en: 'Ecowoods', es: 'Ecowoods', de: 'Ecowoods', zh: 'Ecowoods' },
    desc: {
      en: 'Flooring venture platform, live in Canada.',
      es: 'Plataforma del negocio de pisos, en vivo en Canadá.',
      de: 'Plattform des Bodenbelag-Ventures, live in Kanada.',
      zh: '地板创业项目平台，加拿大在线运行。',
    },
  },
  {
    id: 'card',
    href: '/card',
    host: 'igrimaldi.engineering/card',
    title: { en: 'Digital business card', es: 'Tarjeta de visita digital', de: 'Digitale Visitenkarte', zh: '数字名片' },
    desc: {
      en: 'vCard, QR and the entity graph, on this domain.',
      es: 'vCard, QR y el grafo de entidad, en este dominio.',
      de: 'vCard, QR und der Entity-Graph, auf dieser Domain.',
      zh: '本域名下的 vCard、二维码与实体图谱。',
    },
  },
];

/* ------------------------------------------------------------------ */
/* Ask — the network concierge                                         */
/* ------------------------------------------------------------------ */

export const askUi: {
  launcher: L;
  title: L;
  badge: L;
  sub: L;
  placeholder: L;
  send: L;
  suggestionsLabel: L;
  disclaimer: L;
  fallback: L;
  close: L;
} = {
  launcher: { en: 'Ask the network', es: 'Pregunta a la red', de: 'Das Netzwerk fragen', zh: '询问网络' },
  title: { en: 'Ask Grimaldi', es: 'Pregunta a Grimaldi', de: 'Grimaldi fragen', zh: '问 Grimaldi' },
  badge: { en: 'Built-in', es: 'Integrado', de: 'Integriert', zh: '内置' },
  sub: {
    en: 'Instant answers about the work, the products, the books and the network.',
    es: 'Respuestas instantáneas sobre el trabajo, los productos, los libros y la red.',
    de: 'Sofortige Antworten zu Arbeit, Produkten, Büchern und dem Netzwerk.',
    zh: '即刻解答有关工作、产品、著作与网络的问题。',
  },
  placeholder: { en: 'Ask a question…', es: 'Haz una pregunta…', de: 'Stellen Sie eine Frage…', zh: '输入问题…' },
  send: { en: 'Send', es: 'Enviar', de: 'Senden', zh: '发送' },
  suggestionsLabel: {
    en: 'Want help getting started?',
    es: '¿Necesitas ayuda para empezar?',
    de: 'Hilfe zum Einstieg?',
    zh: '需要一些入门提示？',
  },
  disclaimer: {
    en: 'Instant guide over this site’s own content — runs in your browser, no data leaves it.',
    es: 'Guía instantánea sobre el contenido de este sitio — corre en tu navegador, ningún dato sale de él.',
    de: 'Sofort-Guide über die Inhalte dieser Seite — läuft im Browser, keine Daten verlassen ihn.',
    zh: '基于本站内容的即时向导 — 在您的浏览器中运行，数据不外传。',
  },
  fallback: {
    en: 'I don’t have that indexed yet. The fastest route is email — or pick one of the topics below.',
    es: 'Aún no tengo eso indexado. La vía más rápida es el correo — o elige uno de los temas de abajo.',
    de: 'Das ist noch nicht indexiert. Am schnellsten geht E-Mail — oder wählen Sie unten ein Thema.',
    zh: '这个内容尚未收录。最快的方式是发邮件 — 或从下方话题中选择。',
  },
  close: { en: 'Close', es: 'Cerrar', de: 'Schließen', zh: '关闭' },
};

export type AskLink = { label: L; href: string };

export type AskEntry = {
  id: string;
  /** Lower-cased keyword fragments across the four locales. */
  keywords: string[];
  question: L;
  answer: L;
  links: AskLink[];
};

export const askEntries: AskEntry[] = [
  {
    id: 'who',
    keywords: ['who', 'vincenzo', 'grimaldi', 'about', 'bio', 'quién', 'quien', 'wer', 'über', '谁', '关于', 'cv', 'resume', 'lebenslauf'],
    question: {
      en: 'Who is Vincenzo Grimaldi?',
      es: '¿Quién es Vincenzo Grimaldi?',
      de: 'Wer ist Vincenzo Grimaldi?',
      zh: 'Vincenzo Grimaldi 是谁？',
    },
    answer: {
      en: 'An electrical engineer and software developer: grid networks engineering at DB InfraGO, an RWTH Aachen master thesis you can run in the browser, and the Grimaldi Network — three domains migrating the trades to automated systems.',
      es: 'Ingeniero electricista y desarrollador de software: ingeniería de redes en DB InfraGO, una tesis de RWTH Aachen ejecutable en el navegador, y la Red Grimaldi — tres dominios migrando los oficios a sistemas automatizados.',
      de: 'Elektroingenieur und Softwareentwickler: Netzingenieur bei DB InfraGO, eine im Browser ausführbare RWTH-Masterarbeit und das Grimaldi-Netzwerk — drei Domains, die das Handwerk zu automatisierten Systemen migrieren.',
      zh: '电气工程师兼软件开发者：DB InfraGO 电网工程、可在浏览器中运行的 RWTH 亚琛硕士论文，以及 Grimaldi 网络 — 三个域名，推动行业向自动化系统迁移。',
    },
    links: [
      { label: { en: 'About', es: 'Acerca de', de: 'Über', zh: '关于' }, href: '#about' },
      { label: { en: 'Business card', es: 'Tarjeta de visita', de: 'Visitenkarte', zh: '数字名片' }, href: '/card' },
    ],
  },
  {
    id: 'forge',
    keywords: ['forge', 'trades', 'palletizer', 'floor', 'paint', 'dry', 'robot', 'automation', 'oficio', 'automatización', 'automatizacion', 'handwerk', 'automatisierung', '行业', '自动化', '机器人', 'product'],
    question: {
      en: 'What is the Forge Line?',
      es: '¿Qué es la Línea Forge?',
      de: 'Was ist die Forge Line?',
      zh: '什么是 Forge 产品线？',
    },
    answer: {
      en: 'The Trades 2.0 product line: one automation product per trade. Palletizer OS is shipped with a live optimizer; FloorForge, PaintForge and DryForge AI are in open development; ForgeOS is the robotic OS behind them.',
      es: 'La línea de producto Oficios 2.0: un producto de automatización por oficio. Palletizer OS está entregado con optimizador en vivo; FloorForge, PaintForge y DryForge AI en desarrollo abierto; ForgeOS es el SO robótico detrás.',
      de: 'Die Handwerk-2.0-Produktlinie: ein Automatisierungsprodukt pro Gewerk. Palletizer OS ist ausgeliefert (Live-Optimierer); FloorForge, PaintForge und DryForge AI in offener Entwicklung; ForgeOS ist das robotische OS dahinter.',
      zh: '行业 2.0 产品线：每个行业一款自动化产品。Palletizer OS 已交付并有在线优化器；FloorForge、PaintForge、DryForge AI 公开开发中；背后是机器人操作系统 ForgeOS。',
    },
    links: [
      { label: { en: 'Product site', es: 'Sitio de producto', de: 'Produktseite', zh: '产品站点' }, href: 'https://engineeringgrimaldi.com' },
      { label: { en: 'Live optimizer', es: 'Optimizador en vivo', de: 'Live-Optimierer', zh: '在线优化器' }, href: 'https://palletizer-app.vercel.app' },
    ],
  },
  {
    id: 'books',
    keywords: ['book', 'books', 'renewables', 'orbital', 'manuscript', 'libro', 'buch', 'bücher', '书', '著作', 'proof', 'chapter', 'capítulo', 'kapitel', '章'],
    question: {
      en: 'What about the books?',
      es: '¿Y los libros?',
      de: 'Was ist mit den Büchern?',
      zh: '著作情况如何？',
    },
    answer: {
      en: 'Two manuscripts, both honestly in revision: The Renewables Migration — with eleven public chapter proof-engine repositories so every load-bearing number can be re-run — and The Orbital AI Compute Roadmap.',
      es: 'Dos manuscritos, ambos honestamente en revisión: The Renewables Migration — con once repositorios públicos de motores de prueba por capítulo — y The Orbital AI Compute Roadmap.',
      de: 'Zwei Manuskripte, beide ehrlich in Überarbeitung: The Renewables Migration — mit elf öffentlichen Kapitel-Beweis-Engines — und The Orbital AI Compute Roadmap.',
      zh: '两部书稿，均如实标注修订中：《The Renewables Migration》配有十一个公开的章节验证引擎仓库，以及《The Orbital AI Compute Roadmap》。',
    },
    links: [
      { label: { en: 'Books & receipts', es: 'Libros y recibos', de: 'Bücher & Belege', zh: '著作与凭证' }, href: 'https://grimaldi.ca/#books' },
    ],
  },
  {
    id: 'demos',
    keywords: ['demo', 'live', 'try', 'open', 'run', 'simulator', 'probar', 'vivo', 'ausprobieren', 'live', '演示', '在线', '试用', 'deploy'],
    question: {
      en: 'What can I open live right now?',
      es: '¿Qué puedo abrir en vivo ahora?',
      de: 'Was kann ich sofort live öffnen?',
      zh: '现在能打开哪些在线内容？',
    },
    answer: {
      en: 'The palletizer optimizer, the thesis simulator, both sister domains, the Plastilonas and Ecowoods production platforms, and the digital business card — all in production.',
      es: 'El optimizador de paletizado, el simulador de la tesis, los dos dominios hermanos, las plataformas en producción Plastilonas y Ecowoods, y la tarjeta digital — todo en producción.',
      de: 'Den Palettier-Optimierer, den Thesis-Simulator, beide Schwester-Domains, die Produktivplattformen Plastilonas und Ecowoods sowie die digitale Visitenkarte — alles produktiv.',
      zh: '码垛优化器、论文仿真器、两个姊妹域名、Plastilonas 与 Ecowoods 生产平台，以及数字名片 — 全部在生产环境运行。',
    },
    links: [
      { label: { en: 'Optimizer', es: 'Optimizador', de: 'Optimierer', zh: '优化器' }, href: 'https://palletizer-app.vercel.app' },
      { label: { en: 'Simulator', es: 'Simulador', de: 'Simulator', zh: '仿真器' }, href: 'https://physics-informed.vercel.app/' },
    ],
  },
  {
    id: 'capabilities',
    keywords: ['capabilit', 'skill', 'stack', 'experience', 'grid', 'power', 'pinn', 'mcp', 'lidar', 'capacidad', 'habilidad', 'fähigkeit', 'kompetenz', '能力', '技能', 'protocol', 'modbus', 'opc'],
    question: {
      en: 'What are the engineering capabilities?',
      es: '¿Cuáles son las capacidades de ingeniería?',
      de: 'Welche Engineering-Kompetenzen gibt es?',
      zh: '有哪些工程能力？',
    },
    answer: {
      en: 'Six registered domains, each with named provenance: Grid & Power Systems, Industrial Protocols & IT/OT, Physics-Informed Learning, Robotics & Perception, Agentic Middleware, and Systems Engineering.',
      es: 'Seis dominios registrados, cada uno con procedencia nombrada: Redes y Potencia, Protocolos Industriales e IT/OT, Aprendizaje Informado por la Física, Robótica y Percepción, Middleware Agéntico e Ingeniería de Sistemas.',
      de: 'Sechs registrierte Domänen, jede mit benannter Provenienz: Netz & Leistung, Industrieprotokolle & IT/OT, Physikinformiertes Lernen, Robotik & Wahrnehmung, Agentische Middleware und Systems Engineering.',
      zh: '六个注册能力域，均有可查出处：电网与电力系统、工业协议与 IT/OT、物理信息学习、机器人与感知、代理中间件、系统工程。',
    },
    links: [
      { label: { en: 'Capability register', es: 'Registro de capacidades', de: 'Kompetenzregister', zh: '能力登记' }, href: '#capabilities' },
    ],
  },
  {
    id: 'contact',
    keywords: ['contact', 'hire', 'email', 'work with', 'consult', 'contacto', 'contratar', 'correo', 'kontakt', 'anfrage', 'e-mail', '联系', '合作', '邮箱', 'linkedin'],
    question: {
      en: 'How do I get in touch?',
      es: '¿Cómo me pongo en contacto?',
      de: 'Wie nehme ich Kontakt auf?',
      zh: '如何联系？',
    },
    answer: {
      en: 'Email vincenzo@igrimaldi.engineering, use the contact form below, or take the vCard from the business card — it carries every channel.',
      es: 'Escribe a vincenzo@igrimaldi.engineering, usa el formulario de contacto, o toma la vCard de la tarjeta de visita — lleva todos los canales.',
      de: 'E-Mail an vincenzo@igrimaldi.engineering, das Kontaktformular unten nutzen oder die vCard von der Visitenkarte nehmen — sie enthält alle Kanäle.',
      zh: '发邮件至 vincenzo@igrimaldi.engineering，使用页面下方的联系表单，或从数字名片下载 vCard — 包含全部联系渠道。',
    },
    links: [
      { label: { en: 'Contact', es: 'Contacto', de: 'Kontakt', zh: '联系' }, href: '#connect' },
      { label: { en: 'vCard', es: 'vCard', de: 'vCard', zh: 'vCard' }, href: '/card' },
    ],
  },
  {
    id: 'network',
    keywords: ['network', 'domain', 'site', 'website', 'red', 'dominio', 'sitio', 'netzwerk', 'domain', 'seite', '网络', '域名', '站点', 'engineeringgrimaldi', 'grimaldi.ca'],
    question: {
      en: 'What are the three domains for?',
      es: '¿Para qué son los tres dominios?',
      de: 'Wofür sind die drei Domains?',
      zh: '三个域名各有什么用途？',
    },
    answer: {
      en: 'igrimaldi.engineering is the credibility engine (who builds it), engineeringgrimaldi.com is the product site (the Forge Line, Trades 2.0), grimaldi.ca is the trust layer (the person, the books, the ventures). They cross-link everywhere and share one language system.',
      es: 'igrimaldi.engineering es el motor de credibilidad (quién lo construye), engineeringgrimaldi.com es el sitio de producto (la Línea Forge, Oficios 2.0), grimaldi.ca es la capa de confianza (la persona, los libros, las empresas). Se enlazan entre sí y comparten un sistema de idiomas.',
      de: 'igrimaldi.engineering ist die Glaubwürdigkeits-Engine (wer baut), engineeringgrimaldi.com die Produktseite (Forge Line, Handwerk 2.0), grimaldi.ca die Vertrauensschicht (die Person, die Bücher, die Ventures). Alles ist querverlinkt mit einem gemeinsamen Sprachsystem.',
      zh: 'igrimaldi.engineering 是可信度引擎（谁在构建），engineeringgrimaldi.com 是产品站（Forge 产品线，行业 2.0），grimaldi.ca 是信任层（个人、著作、创业项目）。三站互链，共享同一语言系统。',
    },
    links: [
      { label: { en: 'The network', es: 'La red', de: 'Das Netzwerk', zh: '网络' }, href: '#network' },
    ],
  },
  {
    id: 'language',
    keywords: ['language', 'español', 'espanol', 'spanish', 'german', 'deutsch', 'chinese', '中文', 'sprache', 'idioma', 'translate', '语言', '切换'],
    question: {
      en: 'Can I read this in another language?',
      es: '¿Puedo leer esto en otro idioma?',
      de: 'Gibt es das in anderen Sprachen?',
      zh: '可以切换语言吗？',
    },
    answer: {
      en: 'Yes — English, Español, Deutsch and 中文, switchable from the globe in the top bar. Your choice follows you across all three domains of the network.',
      es: 'Sí — English, Español, Deutsch y 中文, cambiables desde el globo en la barra superior. Tu elección te sigue por los tres dominios de la red.',
      de: 'Ja — English, Español, Deutsch und 中文, umschaltbar über den Globus in der oberen Leiste. Ihre Wahl gilt auf allen drei Domains des Netzwerks.',
      zh: '可以 — English、Español、Deutsch 和中文，通过顶栏的地球图标切换。您的选择在网络的三个域名间保持一致。',
    },
    links: [],
  },
];

/** Ids of the entries offered as starter suggestions (AWS-style chips). */
export const askSuggestions = ['who', 'forge', 'demos', 'contact'];

/** Very small, honest matcher: keyword hits, best score wins. */
export function matchAsk(query: string): AskEntry | null {
  const q = query.toLowerCase();
  let best: AskEntry | null = null;
  let bestScore = 0;
  for (const entry of askEntries) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (q.includes(kw)) score += kw.length > 3 ? 2 : 1;
    }
    if (score > bestScore) {
      best = entry;
      bestScore = score;
    }
  }
  return bestScore > 0 ? best : null;
}
