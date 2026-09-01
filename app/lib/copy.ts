import type { Locale } from './i18n';

/**
 * copy.ts — copy for the 2026-09 information architecture.
 *
 * EN and DE are complete for every route. ES and ZH are complete for the
 * hero, the proof chips and /advisory (the commercial story) and fall back
 * to EN elsewhere — the locale switcher stays intact on every page.
 *
 * Voice: short, factual, numbers over adjectives. Nothing in this file may
 * promise a product that has no public artefact (see status.ts).
 */

export type LP = { en: string; de: string; es?: string; zh?: string };

/** Pick the locale string with EN fallback. */
export function tx(l: LP, locale: Locale): string {
  return l[locale] ?? l.en;
}

export const nav = {
  work: { en: 'Work', de: 'Arbeit', es: 'Trabajo', zh: '工作' },
  simulator: { en: 'Simulator', de: 'Simulator', es: 'Simulador', zh: '模拟器' },
  advisory: { en: 'Advisory', de: 'Beratung', es: 'Asesoría', zh: '咨询' },
  network: { en: 'Network', de: 'Netzwerk', es: 'Red', zh: '站点网络' },
  ventures: { en: 'Ventures', de: 'Ventures', es: 'Proyectos', zh: '创业项目' },
  lab: { en: 'Lab', de: 'Labor', es: 'Laboratorio', zh: '实验室' },
  books: { en: 'Books', de: 'Bücher', es: 'Libros', zh: '著作' },
  capabilities: { en: 'Capabilities', de: 'Kompetenzen', es: 'Capacidades', zh: '核心能力' },
  connect: { en: 'Connect', de: 'Kontakt', es: 'Contacto', zh: '联系' },
} satisfies Record<string, LP>;

/* ------------------------------------------------------------------ */
/* Home                                                                */
/* ------------------------------------------------------------------ */

export const home = {
  h1: {
    en: 'Physics-constrained intelligence for grids and traction power.',
    de: 'Physikalisch beschränkte Intelligenz für Stromnetze und Bahnstrom.',
    es: 'Inteligencia con restricciones físicas para redes eléctricas y tracción ferroviaria.',
    zh: '面向电网与牵引供电的物理约束智能。',
  },
  promise1: {
    en: 'Residuals you can check. Agents you can audit.',
    de: 'Residuen, die Sie prüfen können. Agenten, die Sie auditieren können.',
    es: 'Residuos que puede verificar. Agentes que puede auditar.',
    zh: '可校验的残差。可审计的智能体。',
  },
  promise2: {
    en: 'Patterns from live HV rail assets — sanitized.',
    de: 'Muster aus laufenden HV-Bahnanlagen — bereinigt.',
    es: 'Patrones de activos ferroviarios de AT en operación — anonimizados.',
    zh: '来自在运高压铁路资产的模式——已脱敏。',
  },
  ctaTeardown: {
    en: 'Book a €280 teardown',
    de: '€280-Teardown buchen',
    es: 'Reservar teardown de 280 €',
    zh: '预约 €280 拆解评审',
  },
  ctaExplorer: {
    en: 'Run the IEEE 9-bus explorer',
    de: 'IEEE-9-Bus-Explorer starten',
    es: 'Abrir el explorador IEEE de 9 barras',
    zh: '运行 IEEE 9 节点浏览器',
  },
  chipsKicker: { en: 'Three checks', de: 'Drei Belege', es: 'Tres pruebas', zh: '三项证据' },
  chip1Label: {
    en: 'PINN vs Newton-Raphson',
    de: 'PINN vs. Newton-Raphson',
    es: 'PINN vs Newton-Raphson',
    zh: 'PINN 对比 Newton-Raphson',
  },
  chip1Body: {
    en: 'AC angle RMSE {ac} · DC vs analytical {dc} · IEEE 9-bus · {tests} tests passing',
    de: 'AC-Winkel-RMSE {ac} · DC vs. analytisch {dc} · IEEE 9-Bus · {tests} Tests bestanden',
    es: 'RMSE angular AC {ac} · DC vs analítico {dc} · IEEE 9 barras · {tests} pruebas superadas',
    zh: 'AC 角度 RMSE {ac} · DC 对比解析解 {dc} · IEEE 9 节点 · {tests} 项测试通过',
  },
  chip2Label: { en: 'Day job', de: 'Hauptberuf', es: 'Trabajo principal', zh: '本职工作' },
  chip2Body: {
    en: 'ITk Fachspezialist, DB InfraGO AG — digitisation of railway traction HV grids, IT/OT, KRITIS-aligned governance. Frankfurt, since Aug 2024.',
    de: 'ITk-Fachspezialist, DB InfraGO AG — Digitalisierung von Bahnstrom-Hochspannungsnetzen, IT/OT, KRITIS-orientierte Governance. Frankfurt, seit Aug 2024.',
    es: 'ITk Fachspezialist, DB InfraGO AG — digitalización de redes de tracción ferroviaria de AT, IT/OT, gobernanza alineada con KRITIS. Fráncfort, desde ago 2024.',
    zh: 'ITk 专家，DB InfraGO AG——铁路牵引高压电网数字化、IT/OT、KRITIS 合规治理。法兰克福，2024 年 8 月起。',
  },
  chip3Label: { en: 'First paid step', de: 'Erster bezahlter Schritt', es: 'Primer paso pagado', zh: '第一步付费服务' },
  chip3Body: {
    en: '€280 · 60-min teardown · written recap · go/no-go for a 30-day pilot with a kill date.',
    de: '€280 · 60-Min-Teardown · schriftliche Zusammenfassung · Go/No-Go für einen 30-Tage-Pilot mit Kill-Date.',
    es: '280 € · teardown de 60 min · resumen escrito · go/no-go para un piloto de 30 días con fecha de cierre.',
    zh: '€280 · 60 分钟拆解评审 · 书面纪要 · 30 天试点的 go/no-go 判断（含终止日期）。',
  },
  contextKicker: { en: 'Context', de: 'Kontext', es: 'Contexto', zh: '背景' },
  contextBody: {
    en: 'Operator by day, vendor by night. Advisory work is independent of DB InfraGO AG; no employer data, topologies or systems are used. The explorer validates DC/AC power-flow surrogates; the RWTH Aachen thesis (CIM–ThreMA + RL) is background.',
    de: 'Tagsüber Betreiber, abends Anbieter. Beratung erfolgt unabhängig von der DB InfraGO AG; keine Arbeitgeberdaten, Topologien oder Systeme werden verwendet. Der Explorer validiert DC/AC-Lastfluss-Surrogate; die RWTH-Thesis (CIM–ThreMA + RL) ist Hintergrund.',
  },
  nextKicker: { en: 'Next step', de: 'Nächster Schritt', es: 'Siguiente paso', zh: '下一步' },
  nextTitle: {
    en: 'What do I buy? A teardown. Then, maybe, a pilot.',
    de: 'Was kaufe ich? Einen Teardown. Danach, vielleicht, einen Pilot.',
    es: '¿Qué compro? Un teardown. Después, quizá, un piloto.',
    zh: '我该买什么？一次拆解评审。之后，也许是一个试点。',
  },
  nextBody: {
    en: 'Bring a feeder, a substation LAN diagram or a model somebody wants to trust. You leave with a written residual/architecture critique and a go/no-go.',
    de: 'Bringen Sie einen Abgang, ein Unterwerks-LAN-Diagramm oder ein Modell mit, dem jemand vertrauen soll. Sie gehen mit einer schriftlichen Residuen-/Architekturkritik und einem Go/No-Go.',
  },
  seeAdvisory: { en: 'Scope and prices', de: 'Umfang und Preise', es: 'Alcance y precios', zh: '范围与价格' },
  seeWork: { en: 'Capability register', de: 'Kompetenzregister', es: 'Registro de capacidades', zh: '能力登记' },
} satisfies Record<string, LP>;

/* ------------------------------------------------------------------ */
/* Instrument (hero + /simulator)                                      */
/* ------------------------------------------------------------------ */

export const instrument = {
  title: { en: 'IEEE 9-bus · DC power flow', de: 'IEEE 9-Bus · DC-Lastfluss', es: 'IEEE 9 barras · flujo DC', zh: 'IEEE 9 节点 · 直流潮流' },
  sub: {
    en: 'Solved in your browser. Same data as the explorer.',
    de: 'Im Browser gelöst. Gleiche Daten wie der Explorer.',
    es: 'Resuelto en su navegador. Mismos datos que el explorador.',
    zh: '在您的浏览器中求解。与浏览器工具使用相同数据。',
  },
  load: { en: 'Load', de: 'Last', es: 'Carga', zh: '负荷' },
  trip: { en: 'Trip line', de: 'Leitung auslösen', es: 'Disparar línea', zh: '断开线路' },
  none: { en: 'none (N-0)', de: 'keine (N-0)', es: 'ninguna (N-0)', zh: '无 (N-0)' },
  reset: { en: 'Reset', de: 'Zurücksetzen', es: 'Restablecer', zh: '重置' },
  angles: { en: 'Bus angle θ (deg)', de: 'Knotenwinkel θ (Grad)', es: 'Ángulo de barra θ (grados)', zh: '母线相角 θ（度）' },
  residual: { en: 'max |P − Bθ|', de: 'max |P − Bθ|', es: 'max |P − Bθ|', zh: 'max |P − Bθ|' },
  slack: { en: 'slack import', de: 'Slack-Bezug', es: 'importación slack', zh: '平衡节点注入' },
  maxFlow: { en: 'max |flow|', de: 'max |Fluss|', es: 'max |flujo|', zh: '最大潮流' },
  n1: { en: 'N-1', de: 'N-1', es: 'N-1', zh: 'N-1' },
  secure: { en: 'secure', de: 'sicher', es: 'seguro', zh: '安全' },
  islanded: {
    en: 'islanded — bus {b} isolated, N-1 insecure',
    de: 'Inselbildung — Knoten {b} isoliert, N-1 unsicher',
    es: 'aislado — barra {b} sin conexión, N-1 inseguro',
    zh: '孤岛——母线 {b} 被隔离，N-1 不安全',
  },
  pinnLine: {
    en: 'DC PINN vs this solve: {dc} RMSE · AC PINN vs Newton-Raphson: {ac}',
    de: 'DC-PINN vs. diese Lösung: {dc} RMSE · AC-PINN vs. Newton-Raphson: {ac}',
    es: 'PINN DC vs esta solución: {dc} RMSE · PINN AC vs Newton-Raphson: {ac}',
    zh: 'DC PINN 对比本解：{dc} RMSE · AC PINN 对比 Newton-Raphson：{ac}',
  },
  sourceLive: { en: 'report fetched live', de: 'Report live geladen', es: 'informe cargado en vivo', zh: '报告实时获取' },
  sourceSnapshot: { en: 'report snapshot {d}', de: 'Report-Snapshot {d}', es: 'instantánea del informe {d}', zh: '报告快照 {d}' },
  open: { en: 'Open the explorer', de: 'Explorer öffnen', es: 'Abrir el explorador', zh: '打开浏览器工具' },
} satisfies Record<string, LP>;

/* ------------------------------------------------------------------ */
/* /work                                                               */
/* ------------------------------------------------------------------ */

export const work = {
  kicker: { en: 'Capability register', de: 'Kompetenzregister', es: 'Registro de capacidades', zh: '能力登记' },
  title: {
    en: 'Only what a stranger can open.',
    de: 'Nur, was ein Fremder öffnen kann.',
    es: 'Solo lo que un desconocido puede abrir.',
    zh: '只列陌生人能打开的东西。',
  },
  gate: {
    en: 'Gate for this page: (a) a URL that returns 200, (b) an honest status badge, (c) it serves grids, traction, verification, CIM, PINN or IT/OT. Everything else is on /ventures or /lab.',
    de: 'Regel für diese Seite: (a) eine URL, die 200 liefert, (b) ein ehrliches Status-Badge, (c) sie dient Netzen, Bahnstrom, Verifikation, CIM, PINN oder IT/OT. Alles andere steht auf /ventures oder /lab.',
  },
  open: { en: 'Open', de: 'Öffnen', es: 'Abrir', zh: '打开' },
  source: { en: 'Source', de: 'Quellcode', es: 'Código', zh: '源码' },
  caseStudy: { en: 'Case study', de: 'Fallstudie', es: 'Caso de estudio', zh: '案例' },
  repoNotPublic: {
    en: 'GH repo path not public — do not claim cloneable until 200',
    de: 'GH-Repo-Pfad nicht öffentlich — nicht als klonbar ausgeben, bis 200',
  },
  contextKicker: { en: 'Context, not a product', de: 'Kontext, kein Produkt', es: 'Contexto, no producto', zh: '背景，非产品' },
  contextTitle: { en: 'Sanitized operator credential', de: 'Bereinigter Betreiber-Nachweis', es: 'Credencial de operador anonimizada', zh: '已脱敏的运营方资历' },
  contextBody: {
    en: 'ITk Fachspezialist at DB InfraGO AG since Aug 2024 (Frankfurt): digitisation of railway traction HV grids, IT/OT, KRITIS-aligned cybersecurity governance. Before that: industrial engineering intern, HV maintenance, DB Fahrzeuginstandhaltung / DB Netz, Jun 2022 – Sep 2024. Patterns from this work inform the advisory; no topology, data or system of the employer leaves the employer.',
    de: 'ITk-Fachspezialist bei der DB InfraGO AG seit Aug 2024 (Frankfurt): Digitalisierung von Bahnstrom-Hochspannungsnetzen, IT/OT, KRITIS-orientierte Cybersecurity-Governance. Davor: Werkstudent Industrial Engineering, HV-Instandhaltung, DB Fahrzeuginstandhaltung / DB Netz, Jun 2022 – Sep 2024. Muster aus dieser Arbeit fließen in die Beratung ein; keine Topologie, keine Daten und kein System des Arbeitgebers verlassen den Arbeitgeber.',
  },
  pointerKicker: { en: 'Sold elsewhere', de: 'Anderswo verkauft', es: 'Se vende en otro sitio', zh: '在其他站点销售' },
  palletizerLine: {
    en: 'Palletizer optimizer — mixed-SKU pallet planning, sold on the trades domain.',
    de: 'Palettier-Optimierer — Mixed-SKU-Palettenplanung, verkauft auf der Handwerks-Domain.',
  },
  fullMatrix: { en: 'Full competency matrix with provenance', de: 'Vollständige Kompetenzmatrix mit Provenienz', es: 'Matriz completa de competencias', zh: '完整能力矩阵' },
} satisfies Record<string, LP>;

/* ------------------------------------------------------------------ */
/* /simulator                                                          */
/* ------------------------------------------------------------------ */

export const simulator = {
  kicker: { en: 'Live instrument', de: 'Live-Instrument', es: 'Instrumento en vivo', zh: '实时仪器' },
  title: {
    en: 'IEEE 9-bus: analytical, Newton-Raphson, PINN — and the residual between them.',
    de: 'IEEE 9-Bus: analytisch, Newton-Raphson, PINN — und das Residuum dazwischen.',
  },
  intro: {
    en: 'The explorer at physics-informed.vercel.app validates DC and AC power-flow surrogates against ground truth on the IEEE 9-bus network, runs an N-1 sweep, ablates the physics loss against a black-box model, and regenerates its own report with one command. The table below is that report.',
    de: 'Der Explorer auf physics-informed.vercel.app validiert DC- und AC-Lastfluss-Surrogate gegen Referenzlösungen auf dem IEEE-9-Bus-Netz, führt einen N-1-Sweep aus, ablatiert den Physik-Verlust gegen ein Black-Box-Modell und erzeugt seinen eigenen Report mit einem Befehl. Die Tabelle unten ist dieser Report.',
  },
  tableKicker: { en: 'Residual table', de: 'Residuen-Tabelle', es: 'Tabla de residuos', zh: '残差表' },
  colQuantity: { en: 'Quantity', de: 'Größe', es: 'Magnitud', zh: '量' },
  colValue: { en: 'Value', de: 'Wert', es: 'Valor', zh: '数值' },
  colMeaning: { en: 'What it means', de: 'Bedeutung', es: 'Significado', zh: '含义' },
  rowDcRmse: { en: 'DC PINN vs analytical, angle RMSE', de: 'DC-PINN vs. analytisch, Winkel-RMSE' },
  rowDcRmseMeaning: { en: 'Learned DC surrogate against the exact linear solve', de: 'Gelerntes DC-Surrogat gegen die exakte lineare Lösung' },
  rowDcMax: { en: 'DC PINN, max angle error', de: 'DC-PINN, max. Winkelfehler' },
  rowDcMaxMeaning: { en: 'Worst bus, not the average', de: 'Schlechtester Knoten, nicht der Durchschnitt' },
  rowDcRes: { en: 'DC PINN physics residual', de: 'DC-PINN Physik-Residuum' },
  rowDcResMeaning: { en: '|P − Bθ| the surrogate leaves unbalanced', de: '|P − Bθ|, das das Surrogat unausgeglichen lässt' },
  rowGt: { en: 'Analytical balance residual', de: 'Analytisches Bilanz-Residuum' },
  rowGtMeaning: { en: 'Ground truth: machine precision', de: 'Referenz: Maschinengenauigkeit' },
  rowAcRmse: { en: 'AC PINN vs Newton-Raphson, angle RMSE', de: 'AC-PINN vs. Newton-Raphson, Winkel-RMSE' },
  rowAcRmseMeaning: { en: 'Learned AC surrogate against the iterative solve', de: 'Gelerntes AC-Surrogat gegen die iterative Lösung' },
  rowAcV: { en: 'AC PINN, |V| RMSE', de: 'AC-PINN, |V|-RMSE' },
  rowAcVMeaning: { en: 'Voltage magnitude, p.u.', de: 'Spannungsbetrag, p.u.' },
  rowAcRes: { en: 'AC PINN physics residual', de: 'AC-PINN Physik-Residuum' },
  rowAcResMeaning: { en: 'Power-balance violation of the AC surrogate', de: 'Leistungsbilanz-Verletzung des AC-Surrogats' },
  rowN1: { en: 'N-1 contingency sweep', de: 'N-1-Ausfallsweep' },
  rowN1Meaning: { en: 'Single-line outages that stay solvable and connected', de: 'Einzelausfälle, die lösbar und zusammenhängend bleiben' },
  rowAbl: { en: 'Physics violation, black-box → PINN', de: 'Physik-Verletzung, Black-Box → PINN' },
  rowAblMeaning: { en: 'Ablation: same data, physics loss on vs off', de: 'Ablation: gleiche Daten, Physik-Verlust an vs. aus' },
  rowTests: { en: 'Automated tests', de: 'Automatisierte Tests' },
  rowTestsMeaning: { en: 'Regenerated with one command', de: 'Mit einem Befehl neu erzeugt' },
  reproduce: { en: 'Reproduce', de: 'Reproduzieren', es: 'Reproducir', zh: '复现' },
  jsonLink: { en: 'Machine-readable report (JSON)', de: 'Maschinenlesbarer Report (JSON)' },
  pdfLink: { en: 'Sample report (PDF)', de: 'Beispiel-Report (PDF)' },
  notKicker: { en: 'What this is not', de: 'Was das nicht ist', es: 'Lo que esto no es', zh: '这不是什么' },
  not1: {
    en: 'Not the thesis. The 2025 RWTH Aachen M.Sc. thesis (CIM–ThreMA cross-domain ontology + reinforcement-learning security agent on an IEEE 9-bus cyber testbed) is background. The explorer does not currently validate it.',
    de: 'Nicht die Thesis. Die RWTH-Aachen-M.Sc.-Thesis 2025 (CIM–ThreMA-Ontologie + Reinforcement-Learning-Sicherheitsagent auf einem IEEE-9-Bus-Cyber-Testbed) ist Hintergrund. Der Explorer validiert sie derzeit nicht.',
  },
  not2: {
    en: 'Not a product for your grid. It is a validation method on a public test system. The paid version is the same method on your feeder: a 30-day pilot with a kill date, sold only after a teardown.',
    de: 'Kein Produkt für Ihr Netz. Es ist eine Validierungsmethode auf einem öffentlichen Testsystem. Die bezahlte Version ist dieselbe Methode auf Ihrem Abgang: ein 30-Tage-Pilot mit Kill-Date, nur nach einem Teardown.',
  },
  not3: {
    en: 'Not cloneable yet. The GitHub path github.com/iceccarelli/physics-informed returned 404 on 2026-09-01 and is not linked here. The live deployment is the artefact until the repo returns 200.',
    de: 'Noch nicht klonbar. Der GitHub-Pfad github.com/iceccarelli/physics-informed lieferte am 01.09.2026 einen 404 und wird hier nicht verlinkt. Das Live-Deployment ist das Artefakt, bis das Repo 200 liefert.',
  },
  thesisKicker: { en: 'Background · RESEARCH', de: 'Hintergrund · FORSCHUNG' },
} satisfies Record<string, LP>;

/* ------------------------------------------------------------------ */
/* /advisory                                                           */
/* ------------------------------------------------------------------ */

export const advisory = {
  kicker: { en: 'Advisory', de: 'Beratung', es: 'Asesoría', zh: '咨询' },
  title: {
    en: 'Two products. One door.',
    de: 'Zwei Produkte. Eine Tür.',
    es: 'Dos productos. Una puerta.',
    zh: '两个产品。一扇门。',
  },
  intro: {
    en: 'The teardown is the door. The retainer is product two and is not sold without a teardown first. A PINN / residual pilot is a validation report on your feeder, scoped in the teardown, with a kill date.',
    de: 'Der Teardown ist die Tür. Der Retainer ist Produkt zwei und wird nicht ohne vorherigen Teardown verkauft. Ein PINN-/Residuen-Pilot ist ein Validierungsreport auf Ihrem Abgang, im Teardown definiert, mit Kill-Date.',
    es: 'El teardown es la puerta. El retainer es el producto dos y no se vende sin un teardown previo. Un piloto PINN / de residuos es un informe de validación sobre su alimentador, definido en el teardown, con fecha de cierre.',
    zh: '拆解评审是入口。顾问月费是第二个产品，不先做拆解评审就不出售。PINN/残差试点是针对您的馈线的验证报告，在拆解评审中确定范围，并设有终止日期。',
  },
  p1Name: { en: '60-min teardown', de: '60-Min-Teardown', es: 'Teardown de 60 min', zh: '60 分钟拆解评审' },
  p1Price: { en: '€280', de: '280 €', es: '280 €', zh: '€280' },
  p1Unit: { en: 'per session', de: 'pro Session', es: 'por sesión', zh: '每次' },
  p1Body: {
    en: 'You bring a model, a feeder, a substation LAN diagram or a vendor proposal. I take it apart.',
    de: 'Sie bringen ein Modell, einen Abgang, ein Unterwerks-LAN-Diagramm oder ein Anbieterangebot. Ich nehme es auseinander.',
    es: 'Usted trae un modelo, un alimentador, un diagrama LAN de subestación o una propuesta de proveedor. Yo lo desmonto.',
    zh: '您带来模型、馈线、变电站 LAN 图或供应商方案。我把它拆开。',
  },
  p1Points: {
    en: 'Written recap|Residual / architecture critique|Go/no-go for a 30-day pilot|Slot within 48 hours',
    de: 'Schriftliche Zusammenfassung|Residuen-/Architekturkritik|Go/No-Go für einen 30-Tage-Pilot|Termin innerhalb von 48 Stunden',
    es: 'Resumen escrito|Crítica de residuos / arquitectura|Go/no-go para un piloto de 30 días|Cita en menos de 48 horas',
    zh: '书面纪要|残差 / 架构评审|30 天试点的 go/no-go|48 小时内安排',
  },
  p1Cta: { en: 'Book the teardown', de: 'Teardown buchen', es: 'Reservar el teardown', zh: '预约拆解评审' },
  p2Name: { en: 'Monthly advisory', de: 'Monatliche Beratung', es: 'Asesoría mensual', zh: '月度顾问' },
  p2Price: { en: '€3,200', de: '3.200 €', es: '3.200 €', zh: '€3,200' },
  p2Unit: { en: 'per month', de: 'pro Monat', es: 'al mes', zh: '每月' },
  p2Body: {
    en: 'Only after a teardown. One scoped artefact per month — a validation report, a review, a pattern. Cancel anytime.',
    de: 'Nur nach einem Teardown. Ein definiertes Artefakt pro Monat — ein Validierungsreport, ein Review, ein Muster. Jederzeit kündbar.',
    es: 'Solo tras un teardown. Un artefacto definido al mes — un informe de validación, una revisión, un patrón. Cancele cuando quiera.',
    zh: '仅在拆解评审之后。每月一个明确范围的交付物——验证报告、评审或模式。可随时取消。',
  },
  p2Points: {
    en: 'Scoped monthly artefact|Asynchronous review|Not “access to a network”|Cancel anytime',
    de: 'Definiertes Monatsartefakt|Asynchrones Review|Kein „Zugang zu einem Netzwerk“|Jederzeit kündbar',
    es: 'Artefacto mensual definido|Revisión asíncrona|No es «acceso a una red»|Cancele cuando quiera',
    zh: '明确范围的月度交付物|异步评审|不是“加入一个网络”|可随时取消',
  },
  p2Cta: { en: 'After a teardown', de: 'Nach einem Teardown', es: 'Tras un teardown', zh: '拆解评审之后' },
  p2Gate: {
    en: 'Requires a completed teardown.',
    de: 'Setzt einen abgeschlossenen Teardown voraus.',
    es: 'Requiere un teardown completado.',
    zh: '需先完成拆解评审。',
  },
  pilotKicker: { en: 'Product three, scoped in the teardown', de: 'Produkt drei, im Teardown definiert', es: 'Producto tres, definido en el teardown', zh: '第三个产品，在拆解评审中确定范围' },
  pilotTitle: { en: 'PINN / residual pilot', de: 'PINN-/Residuen-Pilot', es: 'Piloto PINN / de residuos', zh: 'PINN / 残差试点' },
  pilotBody: {
    en: 'A validation report on your feeder: the same method as the IEEE 9-bus explorer — analytical or Newton-Raphson ground truth, surrogate residuals, N-1 sweep, ablation — run on your topology, delivered as MD/JSON/PDF you can regenerate. 30 days. Kill date in the contract. Priced in the teardown recap.',
    de: 'Ein Validierungsreport auf Ihrem Abgang: dieselbe Methode wie der IEEE-9-Bus-Explorer — analytische oder Newton-Raphson-Referenz, Surrogat-Residuen, N-1-Sweep, Ablation — auf Ihrer Topologie, geliefert als MD/JSON/PDF, das Sie selbst neu erzeugen können. 30 Tage. Kill-Date im Vertrag. Preis in der Teardown-Zusammenfassung.',
    es: 'Un informe de validación sobre su alimentador: el mismo método que el explorador IEEE de 9 barras — referencia analítica o Newton-Raphson, residuos del sustituto, barrido N-1, ablación — ejecutado sobre su topología, entregado como MD/JSON/PDF regenerable. 30 días. Fecha de cierre en el contrato. Precio en el resumen del teardown.',
    zh: '针对您馈线的验证报告：与 IEEE 9 节点浏览器相同的方法——解析或 Newton-Raphson 基准、代理模型残差、N-1 扫描、消融实验——在您的拓扑上运行，以可复现的 MD/JSON/PDF 交付。30 天。合同中写明终止日期。价格在拆解评审纪要中给出。',
  },
  boundKicker: { en: 'Scope boundaries', de: 'Grenzen des Umfangs', es: 'Límites del alcance', zh: '范围边界' },
  boundTitle: { en: 'What I will not do', de: 'Was ich nicht tue', es: 'Lo que no haré', zh: '我不会做的事' },
  bound1: {
    en: 'I will not train an unconstrained LLM against IEC 61850 / SCADA.',
    de: 'Ich trainiere kein unbeschränktes LLM gegen IEC 61850 / SCADA.',
    es: 'No entrenaré un LLM sin restricciones contra IEC 61850 / SCADA.',
    zh: '我不会针对 IEC 61850 / SCADA 训练不受约束的 LLM。',
  },
  bound2: {
    en: 'I will not claim GridOS, NeuralBridge or DERIM as products until a public clone and tests exist.',
    de: 'Ich gebe GridOS, NeuralBridge oder DERIM nicht als Produkte aus, bevor ein öffentlicher Clone und Tests existieren.',
    es: 'No presentaré GridOS, NeuralBridge o DERIM como productos hasta que exista un clon público con pruebas.',
    zh: '在公开可克隆的代码和测试出现之前，我不会把 GridOS、NeuralBridge 或 DERIM 当作产品。',
  },
  bound3: {
    en: 'Employer work stays sanitized. No leaked topologies, data or systems of DB InfraGO AG.',
    de: 'Arbeitgeber-Arbeit bleibt bereinigt. Keine Topologien, Daten oder Systeme der DB InfraGO AG.',
    es: 'El trabajo del empleador se mantiene anonimizado. Sin topologías, datos ni sistemas de DB InfraGO AG.',
    zh: '雇主相关工作保持脱敏。不泄露 DB InfraGO AG 的拓扑、数据或系统。',
  },
  bound4: {
    en: 'Hardware cells and Palletizer pilots are sold on engineeringgrimaldi.com, not here.',
    de: 'Hardware-Zellen und Palletizer-Piloten werden auf engineeringgrimaldi.com verkauft, nicht hier.',
    es: 'Las celdas de hardware y los pilotos de Palletizer se venden en engineeringgrimaldi.com, no aquí.',
    zh: '硬件单元与 Palletizer 试点在 engineeringgrimaldi.com 销售，不在这里。',
  },
  otherKicker: { en: 'Other payments', de: 'Sonstige Zahlungen', es: 'Otros pagos', zh: '其他付款' },
  otherBody: {
    en: 'Invoices and any-amount payments are on /payments. That page is a till, not an offer.',
    de: 'Rechnungen und Zahlungen in beliebiger Höhe finden Sie unter /payments. Diese Seite ist eine Kasse, kein Angebot.',
    es: 'Facturas y pagos de cualquier importe están en /payments. Esa página es una caja, no una oferta.',
    zh: '发票与任意金额付款见 /payments。那是收款台，不是产品。',
  },
  otherCta: { en: 'Pay an invoice', de: 'Rechnung bezahlen', es: 'Pagar una factura', zh: '支付发票' },
  mailNote: {
    en: 'Booking goes to vincenzo@igrimaldi.engineering with the subject prefilled; checkout switches to Stripe automatically once the payment link is configured.',
    de: 'Die Buchung geht an vincenzo@igrimaldi.engineering mit vorausgefülltem Betreff; der Checkout wechselt automatisch zu Stripe, sobald der Zahlungslink konfiguriert ist.',
    es: 'La reserva va a vincenzo@igrimaldi.engineering con el asunto prellenado; el pago cambia a Stripe automáticamente cuando el enlace esté configurado.',
    zh: '预约将发送至 vincenzo@igrimaldi.engineering（主题已预填）；配置好支付链接后将自动切换为 Stripe 结账。',
  },
} satisfies Record<string, LP>;

/* ------------------------------------------------------------------ */
/* /network                                                            */
/* ------------------------------------------------------------------ */

export const network = {
  kicker: { en: 'Network', de: 'Netzwerk', es: 'Red', zh: '站点网络' },
  title: { en: 'Four addresses. One verb each.', de: 'Vier Adressen. Je ein Verb.', es: 'Cuatro direcciones. Un verbo cada una.', zh: '四个地址。各一个动词。' },
  here: { en: 'You are here', de: 'Sie sind hier', es: 'Está aquí', zh: '您在这里' },
  l1: { en: 'verifiable intelligence for grids and traction power', de: 'verifizierbare Intelligenz für Stromnetze und Bahnstrom' },
  l2: { en: 'one trade cell, shipped and measured', de: 'eine Handwerkszelle, ausgeliefert und gemessen' },
  l3: { en: 'logbook, podcast, reviews, books', de: 'Logbuch, Podcast, Rezensionen, Bücher' },
  l4: { en: 'clone or it does not exist', de: 'klonen oder es existiert nicht' },
  v1: { en: 'Verify', de: 'Prüfen', es: 'Verificar', zh: '验证' },
  v2: { en: 'Buy', de: 'Kaufen', es: 'Comprar', zh: '购买' },
  v3: { en: 'Read', de: 'Lesen', es: 'Leer', zh: '阅读' },
  v4: { en: 'Clone', de: 'Klonen', es: 'Clonar', zh: '克隆' },
  overlap: {
    en: 'Overlap rule: the full capability register lives on this domain only. Forge / hardware product pages live on engineeringgrimaldi.com only. Essays, podcast, reviews and love-of-the-work live on grimaldi.ca only. Cross-links are one line and one verb.',
    de: 'Überschneidungsregel: Das vollständige Kompetenzregister lebt nur auf dieser Domain. Forge-/Hardware-Produktseiten leben nur auf engineeringgrimaldi.com. Essays, Podcast, Rezensionen und Liebe zur Arbeit leben nur auf grimaldi.ca. Querverweise sind eine Zeile und ein Verb.',
  },
} satisfies Record<string, LP>;

/* ------------------------------------------------------------------ */
/* /ventures                                                           */
/* ------------------------------------------------------------------ */

export const ventures = {
  kicker: { en: 'Ventures', de: 'Ventures', es: 'Proyectos', zh: '创业项目' },
  title: { en: 'Client builds and off-niche work.', de: 'Kundenprojekte und Arbeit außerhalb der Nische.', es: 'Proyectos para clientes y trabajo fuera del nicho.', zh: '客户项目与非核心领域工作。' },
  intro: {
    en: 'Real, opened by real users, and not what this domain sells. Listed so nothing is hidden; ranked below the grid work on purpose.',
    de: 'Echt, von echten Nutzern geöffnet, und nicht das, was diese Domain verkauft. Gelistet, damit nichts verborgen bleibt; bewusst unter der Netzarbeit eingeordnet.',
  },
} satisfies Record<string, LP>;

/* ------------------------------------------------------------------ */
/* /lab                                                                */
/* ------------------------------------------------------------------ */

export const lab = {
  kicker: { en: 'Lab', de: 'Labor', es: 'Laboratorio', zh: '实验室' },
  title: { en: 'Parked until a stranger can clone it.', de: 'Geparkt, bis ein Fremder es klonen kann.', es: 'Aparcado hasta que un desconocido pueda clonarlo.', zh: '搁置，直到陌生人能克隆为止。' },
  intro: {
    en: 'Names that were once presented as products. Each one is listed with what actually exists. A GitHub path that returned 404 on 2026-09-01 is shown as text, never as a link. Nothing here is for sale.',
    de: 'Namen, die einmal als Produkte präsentiert wurden. Jeder Eintrag zeigt, was tatsächlich existiert. Ein GitHub-Pfad, der am 01.09.2026 einen 404 lieferte, wird als Text gezeigt, nie als Link. Nichts hier steht zum Verkauf.',
  },
  exists: { en: 'What exists', de: 'Was existiert', es: 'Lo que existe', zh: '实际存在的' },
  unlock: { en: 'Leaves the lab when', de: 'Verlässt das Labor, wenn', es: 'Sale del laboratorio cuando', zh: '离开实验室的条件' },
  forgeNote: {
    en: 'Forge Line (ForgeOS, FloorForge, PaintForge, DryForge) is hardware-trade automation. As products they belong to engineeringgrimaldi.com; here they are listed only as repositories.',
    de: 'Die Forge Line (ForgeOS, FloorForge, PaintForge, DryForge) ist Automatisierung für Handwerksgewerke. Als Produkte gehören sie zu engineeringgrimaldi.com; hier sind sie nur als Repositories gelistet.',
  },
} satisfies Record<string, LP>;

/* ------------------------------------------------------------------ */
/* /books                                                              */
/* ------------------------------------------------------------------ */

export const books = {
  kicker: { en: 'Books', de: 'Bücher', es: 'Libros', zh: '著作' },
  title: { en: 'Books live on grimaldi.ca.', de: 'Bücher leben auf grimaldi.ca.', es: 'Los libros viven en grimaldi.ca.', zh: '著作在 grimaldi.ca。' },
  body: {
    en: 'Two manuscripts, both in revision, and the public chapter proof-engine repositories behind the first one. This domain keeps a pointer only.',
    de: 'Zwei Manuskripte, beide in Überarbeitung, und die öffentlichen Kapitel-Beweis-Engine-Repositories hinter dem ersten. Diese Domain hält nur einen Verweis.',
    es: 'Dos manuscritos, ambos en revisión, y los repositorios públicos de motores de prueba por capítulo del primero. Este dominio solo mantiene un puntero.',
    zh: '两部书稿（均在修订中），以及第一部背后的公开章节验证引擎仓库。本站仅保留指向链接。',
  },
  cta: { en: 'Open grimaldi.ca/books', de: 'grimaldi.ca/books öffnen', es: 'Abrir grimaldi.ca/books', zh: '打开 grimaldi.ca/books' },
} satisfies Record<string, LP>;

/* ------------------------------------------------------------------ */
/* Convergence footer — exact four lines                               */
/* ------------------------------------------------------------------ */

export const CONVERGENCE = [
  { host: 'igrimaldi.engineering', href: 'https://igrimaldi.engineering', line: 'verifiable intelligence for grids and traction power' },
  { host: 'engineeringgrimaldi.com', href: 'https://engineeringgrimaldi.com', line: 'one trade cell, shipped and measured' },
  { host: 'grimaldi.ca', href: 'https://grimaldi.ca', line: 'logbook, podcast, reviews, books' },
  { host: 'github.com/iceccarelli', href: 'https://github.com/iceccarelli', line: 'clone or it does not exist' },
] as const;
