{\rtf1\ansi\ansicpg1252\cocoartf2907
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 pkill -f "next" 2>/dev/null || true\
\
cat << 'EOF_APPLY' > scripts/apply-option-a.mjs\
import fs from 'node:fs';\
import path from 'node:path';\
import sharp from 'sharp';\
\
const root = process.cwd();\
const write = (rel, content) => \{\
  const full = path.join(root, rel);\
  fs.mkdirSync(path.dirname(full), \{ recursive: true \});\
  fs.writeFileSync(full, content, 'utf8');\
  console.log('  wrote', rel);\
\};\
\
console.log('1. Normalizing public/images directories & optimizing 32 visual assets with sharp...');\
\
const folderMap = [\
  ['public/images/igrimaldi-cool-niche-assets', 'public/images/cool'],\
  ['public/images/igrimaldi-critical-prospect-assets', 'public/images/critical'],\
  ['public/images/igrimaldi-engineering-electrical-assets', 'public/images/electrical'],\
];\
for (const [oldDir, newDir] of folderMap) \{\
  if (fs.existsSync(oldDir)) \{\
    fs.rmSync(newDir, \{ recursive: true, force: true \});\
    fs.renameSync(oldDir, newDir);\
  \}\
  const readme = path.join(newDir, 'README.md');\
  if (fs.existsSync(readme)) fs.rmSync(readme, \{ force: true \});\
\}\
\
// Convert 5 MB PNG headshot into true 1024x1024 progressive MozJPEG\
const headshotSrc = fs.existsSync('vincenzo_grimaldi_headshot_best_for_profile.jpg')\
  ? 'vincenzo_grimaldi_headshot_best_for_profile.jpg'\
  : 'public/vincenzo_grimaldi_headshot.jpg';\
const headshotBuf = fs.readFileSync(headshotSrc);\
await sharp(headshotBuf)\
  .flatten(\{ background: '#F7F6F2' \})\
  .resize(1024, 1024, \{ fit: 'cover' \})\
  .jpeg(\{ quality: 86, mozjpeg: true \})\
  .toFile('public/vincenzo_grimaldi_headshot.jpg');\
\
// Optimize footer portrait into crisp 640x640 MozJPEG without EXIF bloat\
const footerSrc = fs.existsSync('Vincenzo_Grimaldi_footer_picture_website.jpg')\
  ? 'Vincenzo_Grimaldi_footer_picture_website.jpg'\
  : 'public/Vincenzo_Grimaldi_footer_picture_website.jpg';\
const footerBuf = fs.readFileSync(footerSrc);\
await sharp(footerBuf)\
  .resize(640, 640, \{ fit: 'cover' \})\
  .jpeg(\{ quality: 85, mozjpeg: true \})\
  .toFile('public/Vincenzo_Grimaldi_footer_picture_website.jpg');\
\
// Strip EXIF signature bloat and optimize all 30 landscape plates (preserving 1168x784)\
let plateCount = 0;\
for (const pack of ['cool', 'critical', 'electrical']) \{\
  const dir = path.join(root, 'public/images', pack);\
  for (const file of fs.readdirSync(dir).sort()) \{\
    if (!file.endsWith('.jpg')) continue;\
    const fp = path.join(dir, file);\
    const input = fs.readFileSync(fp);\
    const output = await sharp(input).jpeg(\{ quality: 85, mozjpeg: true \}).toBuffer();\
    fs.writeFileSync(fp, output);\
    plateCount++;\
  \}\
\}\
console.log('  optimized 2 portraits + ' + plateCount + ' engineering plates.');\
\
console.log('2. Retiring abandoned robotics/cluster directories...');\
for (const dead of [\
  'app/palletizer',\
  'app/architecture',\
  'app/constitution',\
  'app/contracts',\
  'app/decisions',\
  'app/report',\
  'app/report.md',\
  'app/research',\
  'app/api/cluster',\
  'app/components/cluster',\
  'app/lib/cluster',\
]) \{\
  fs.rmSync(path.join(root, dead), \{ recursive: true, force: true \});\
\}\
\
console.log('3. Writing reframed Electrical Engineering architecture & components...');\
\
write(\
  'app/lib/site.ts',\
  `/**\
 * site.ts \'97 single source of truth for identity and canonical URLs.\
 * Every schema node, metadata block and link reads from here.\
 *\
 * This host documents independent electrical engineering work across high-voltage\
 * grids, railway traction power, electrical machines, and physics-informed\
 * digital twins. Nothing on this host is a commercial offer.\
 */\
export const SITE_URL = 'https://igrimaldi.engineering';\
export const SITE_NAME = 'Vincenzo Ceccarelli Grimaldi';\
export const LEGAL_NAME = 'Vincenzo Ceccarelli Grimaldi';\
export const SHORT_NAME = 'Vincenzo Grimaldi';\
export const EMAIL = 'vincenzo@igrimaldi.engineering';\
export const CITY = 'Frankfurt am Main';\
\
export const ONE_LINE = 'Electrical grids, machines, and physics-informed methods';\
export const ONE_LINE_DE = 'Elektrische Netze, Maschinen und physikinformierte Methoden';\
\
export const CLUSTER_NAME = 'Electrical Grids, Machines & Physics-Informed Systems';\
export const CLUSTER_MANDATE =\
  'Electrical grids, machines, and physics-informed methods for high-voltage and traction infrastructure.';\
\
export const ROLE_TITLE = 'ITk Fachspezialist';\
export const EMPLOYER = 'DB InfraGO AG';\
export const JOB_TITLE =\
  'Electrical & Power Systems Engineer \'97 high-voltage grids, traction power, machines and physics-informed modelling';\
\
export const HEADSHOT = SITE_URL + '/vincenzo_grimaldi_headshot.jpg';\
export const FOOTER_PORTRAIT = '/Vincenzo_Grimaldi_footer_picture_website.jpg';\
\
export const GITHUB = 'https://github.com/iceccarelli';\
export const LINKEDIN = 'https://www.linkedin.com/in/vincenzo-ceccarelli-grimaldi-2912b42a0';\
export const THESIS_DEMO = 'https://physics-informed.vercel.app/';\
\
export const SAME_AS = [\
  GITHUB,\
  LINKEDIN,\
  THESIS_DEMO,\
  'https://engineeringgrimaldi.com/',\
  'https://grimaldi.ca/',\
];\
\
export const CONFLICT_EN =\
  'Everything on this site is independent of, and outside the scope of, my role at DB InfraGO AG. No employer data, systems or confidential information are used or described.';\
export const CONFLICT_DE =\
  'Alle Inhalte dieser Website sind unabh\'e4ngig von meiner T\'e4tigkeit bei der DB InfraGO AG und liegen au\'dferhalb ihres Umfangs. Es werden keine Daten, Systeme oder vertraulichen Informationen des Arbeitgebers verwendet oder beschrieben.';\
`\
);\
\
write(\
  'app/lib/copy.ts',\
  `import type \{ Locale \} from './i18n';\
\
export type Copy = \{\
  nav: \{\
    domain: string;\
    overview: string;\
    grids: string;\
    machines: string;\
    twins: string;\
    articles: string;\
    work: string;\
    thesis: string;\
    registry: string;\
    contact: string;\
    menu: string;\
    card: string;\
  \};\
  home: \{\
    kicker: string;\
    mandate: string;\
    lead: string;\
    pillarsHeading: string;\
    pillarsIntro: string;\
    bottleneckHeading: string;\
    bottleneckIntro: string;\
    bottleneckBody: string;\
    bottleneckCta: string;\
    articlesHeading: string;\
    articlesIntro: string;\
    articlesAll: string;\
    registryHeading: string;\
    registryIntro: string;\
    registryAll: string;\
    visionHeading: string;\
    visionBody: string;\
    operatorHeading: string;\
    roleLine: string;\
    roleDetail: string;\
    thesisNote: string;\
    formHeading: string;\
    formIntro: string;\
  \};\
  form: \{\
    name: string;\
    organisation: string;\
    constraint: string;\
    constraintHint: string;\
    email: string;\
    send: string;\
    sending: string;\
    sent: string;\
    error: string;\
    fallback: string;\
  \};\
  work: \{\
    title: string;\
    intro: string;\
    proof: string;\
    problem: string;\
    approach: string;\
    validation: string;\
    limits: string;\
    openLive: string;\
    openRepo: string;\
    notesHeading: string;\
    notesIntro: string;\
    back: string;\
  \};\
  simulator: \{\
    kicker: string;\
    title: string;\
    intro: string;\
    what: string[];\
    open: string;\
    readWriteUp: string;\
    not: string;\
  \};\
  contact: \{\
    title: string;\
    intro: string;\
    direct: string;\
  \};\
  card: \{\
    kicker: string;\
    role: string;\
    tagline: string;\
    email: string;\
    website: string;\
    githubLabel: string;\
    networkLabel: string;\
    saveContact: string;\
    connect: string;\
    scanToShare: string;\
    backHome: string;\
  \};\
  footer: \{\
    colophonRole: string;\
    rights: string;\
    imprint: string;\
    privacy: string;\
  \};\
  consent: \{ text: string; accept: string; decline: string \};\
  notFound: \{ title: string; body: string; cta: string \};\
\};\
\
const en: Copy = \{\
  nav: \{\
    domain: 'Power Systems & Machines',\
    overview: 'Overview',\
    grids: 'Grids & Traction',\
    machines: 'Machines & Devices',\
    twins: 'Digital Twins',\
    articles: 'Articles',\
    work: 'Work',\
    thesis: 'Simulator',\
    registry: 'Register',\
    contact: 'Contact',\
    menu: 'Menu',\
    card: 'Card',\
  \},\
  home: \{\
    kicker: 'High-voltage grids \'b7 traction power \'b7 electrical machines \'b7 physics-informed methods',\
    mandate: 'Electrical grids, machines, and physics-informed methods.',\
    lead:\
      'Independent engineering work on high-voltage substations, railway traction power, electromagnetic machines, power electronics, and physics-informed digital twins \'97 documented through runnable models, public repositories, and technical articles.',\
    pillarsHeading: 'Technical pillars',\
    pillarsIntro:\
      'Four interconnected disciplines anchor this site: bulk and traction power networks, electrical machines and converters, physics-constrained digital twins, and runnable cyber-physical grid simulation.',\
    bottleneckHeading: 'Why this work matters \'97 power capacity and physical limits',\
    bottleneckIntro:\
      'Compute expansion, industrial electrification, and rail modernization are gated by electrical infrastructure: transformer lead times, interconnection queues, short-circuit strength, and thermal-electrical hall envelopes.',\
    bottleneckBody:\
      'Credible capacity intelligence starts from AC power flow, protection coordination, converter stability, and thermal limits rather than purely statistical extrapolation. These physical foundations inform both the open engineering work documented here and the broader company ecosystem.',\
    bottleneckCta: 'Read the power-capacity analysis',\
    articlesHeading: 'Technical articles',\
    articlesIntro:\
      'Focused explainers on synchronous inertia at 50 Hz, IT/OT convergence in traction power infrastructure, and the electrical limits governing data-center interconnection.',\
    articlesAll: 'All technical articles',\
    registryHeading: 'Technical register',\
    registryIntro:\
      'Every entry distinguishes public runnable artifacts from unpublished research notes. Nothing is claimed without an inspectable model, repository, or explicit scope boundary.',\
    registryAll: 'Open full technical register',\
    visionHeading: 'Engineering horizon & ecosystem',\
    visionBody:\
      'This domain documents personal engineering depth, runnable academic models, and domain analyses. Commercial ventures and company hubs live separately at engineeringgrimaldi.com and grimaldi.ca.',\
    operatorHeading: 'Engineer & professional context',\
    roleLine: 'ITk Fachspezialist, DB InfraGO AG \'b7 M.Sc. RWTH Aachen.',\
    roleDetail: 'High-voltage railway traction digitisation, IT/OT architecture, and KRITIS-grade infrastructure governance.',\
    thesisNote:\
      'Runnable smart-grid ontology simulator and public-dataset infrastructure tools are documented under Work and Simulator.',\
    formHeading: 'Technical enquiry',\
    formIntro:\
      'Grid operators, rail infrastructure teams, machine designers, research groups, and capacity planners: state the technical constraint that must hold and I will reply directly.',\
  \},\
  form: \{\
    name: 'Name',\
    organisation: 'Organisation',\
    constraint: 'Constraint',\
    constraintHint: 'The physical or architectural constraint \'97 voltage level, standard, grid model, interface, or stability boundary.',\
    email: 'Email',\
    send: 'Send',\
    sending: 'Sending\'85',\
    sent: 'Received. I will reply by email.',\
    error: 'Could not send. Please write to the address in the footer.',\
    fallback: 'The form is not wired on this deployment yet; your mail client will open instead.',\
  \},\
  work: \{\
    title: 'Work & public artifacts',\
    intro:\
      'Each entry states what is publicly inspectable \'97 a runnable deployment or open repository \'97 alongside its exact validation boundary and limits. Nothing here is a commercial product.',\
    proof: 'Public artifact',\
    problem: 'Problem',\
    approach: 'Approach',\
    validation: 'Validation',\
    limits: 'Limits',\
    openLive: 'Open the deployment',\
    openRepo: 'Repository',\
    notesHeading: 'Research notes, not products',\
    notesIntro:\
      'Unpublished codebases and architectural studies referenced across the ecosystem, listed explicitly so no unverified operational claim is made for them.',\
    back: '\uc0\u8592  Work',\
  \},\
  simulator: \{\
    kicker: 'M.Sc. thesis \'b7 RWTH Aachen \'b7 2025',\
    title: 'CIM\'96ThreMA cross-domain ontology simulator',\
    intro:\
      'Data modelling in a cross-domain ontology for cyber intelligence in smart grids, using reinforcement learning. The simulator makes the thesis runnable: the CGMES mapping catalogue, the IEEE 9-bus cyber-physical testbed, and the scenario definitions ship in the deployment.',\
    what: [\
      'CIM/CGMES substation and network topology linked to the ThreMA threat ontology',\
      'Five formal semantic mappings preserving topology updates across security views',\
      'IEEE 9-bus cyber-physical testbed with four documented contingency scenarios',\
      'Q-learning decision layer evaluated over the coupled grid-threat graph',\
      'Cross-domain signal-to-noise metric scoring semantic mapping fidelity',\
    ],\
    open: 'Open the simulator',\
    readWriteUp: 'Read the thesis write-up',\
    not: 'The simulator runs on a dedicated deployment. It is validated thesis research on a 9-bus testbed, not an operational SCADA tool.',\
  \},\
  contact: \{\
    title: 'Contact',\
    intro:\
      'For technical exchange and advisory enquiries on high-voltage grids, railway traction power, electrical machines, and physics-informed modelling. State the governing constraint; I will tell you plainly whether I can help.',\
    direct: 'Direct email always works:',\
  \},\
  card: \{\
    kicker: 'Frankfurt am Main \'b7 Electrical Engineering',\
    role: 'ITk Fachspezialist \'b7 DB InfraGO AG \'b7 M.Sc. RWTH Aachen',\
    tagline: 'Electrical grids, traction power, machines, and physics-informed digital twins.',\
    email: 'Email',\
    website: 'Technical site',\
    githubLabel: 'GitHub',\
    networkLabel: 'Domains',\
    saveContact: 'Save vCard',\
    connect: 'Write email',\
    scanToShare: 'Scan for card',\
    backHome: '\uc0\u8592  igrimaldi.engineering',\
  \},\
  footer: \{\
    colophonRole: 'Electrical grids, railway traction power, electrical machines & physics-informed modelling \'b7 Frankfurt am Main',\
    rights: 'All rights reserved.',\
    imprint: 'Impressum',\
    privacy: 'Datenschutz',\
  \},\
  consent: \{\
    text: 'This site uses cookieless Vercel Analytics to count visits. No personal profiles, no ads.',\
    accept: 'Allow',\
    decline: 'Decline',\
  \},\
  notFound: \{\
    title: 'Page not found',\
    body: 'That URL does not exist. The grid, machine, and digital-twin pillars, technical articles, register, and contact page do.',\
    cta: 'Home',\
  \},\
\};\
\
const de: Copy = \{\
  nav: \{\
    domain: 'Energiesysteme & Maschinen',\
    overview: '\'dcbersicht',\
    grids: 'Netze & Bahnstrom',\
    machines: 'Maschinen & Ger\'e4te',\
    twins: 'Digitale Zwillinge',\
    articles: 'Fachartikel',\
    work: 'Arbeiten',\
    thesis: 'Simulator',\
    registry: 'Register',\
    contact: 'Kontakt',\
    menu: 'Men\'fc',\
    card: 'Karte',\
  \},\
  home: \{\
    kicker: 'Hochspannungsnetze \'b7 Bahnstrom \'b7 Elektrische Maschinen \'b7 Physikinformierte Methoden',\
    mandate: 'Elektrische Netze, Maschinen und physikinformierte Methoden.',\
    lead:\
      'Unabh\'e4ngige Ingenieurarbeiten zu Hochspannungs-Umspannwerken, Bahnstromversorgung, elektrischen Maschinen, Leistungselektronik und physikinformierten digitalen Zwillingen \'97 dokumentiert durch ausf\'fchrbare Modelle, \'f6ffentliche Repositories und Fachbeitr\'e4ge.',\
    pillarsHeading: 'Technische S\'e4ulen',\
    pillarsIntro:\
      'Vier eng verzahnte Fachgebiete bilden das Fundament dieser Seite: \'dcbertragungs- und Bahnstromnetze, elektrische Maschinen und Stromrichter, physikbasierte digitale Zwillinge sowie ausf\'fchrbare Netzsimulation.',\
    bottleneckHeading: 'Warum diese Arbeit z\'e4hlt \'97 Netzkapazit\'e4t und physikalische Grenzen',\
    bottleneckIntro:\
      'Rechenzentren, industrielle Elektrifizierung und Bahninfrastruktur werden durch elektrische Engp\'e4sse begrenzt: Transformator-Lieferzeiten, Netzanschlusswarteschlangen, Kurzschlussleistung und thermisch-elektrische Hallengrenzen.',\
    bottleneckBody:\
      'Belastbare Kapazit\'e4tsaussagen entstehen aus Lastflussrechnung, Schutzkoordination, Stromrichterstabilit\'e4t und thermischen Grenzkurven statt aus reiner Statistik. Diese physikalischen Grundlagen tragen sowohl die hier dokumentierten Arbeiten als auch das weitere Unternehmens\'f6kosystem.',\
    bottleneckCta: 'Analyse zur Leistungskapazit\'e4t lesen',\
    articlesHeading: 'Technische Fachbeitr\'e4ge',\
    articlesIntro:\
      'Vertiefende Analysen zu Momentanreserve bei 50 Hz, IT/OT-Konvergenz in der Bahnstromversorgung und den elektrischen Grenzen moderner KI-Rechenzentren.',\
    articlesAll: 'Alle Fachbeitr\'e4ge',\
    registryHeading: 'Technisches Register',\
    registryIntro:\
      'Jeder Eintrag trennt \'f6ffentlich pr\'fcfbare Artefakte strikt von unver\'f6ffentlichten Forschungsnotizen. Keine Aussage ohne einsehbares Modell, Repository oder klar benannte Systemgrenze.',\
    registryAll: 'Vollst\'e4ndiges Register \'f6ffnen',\
    visionHeading: 'Technischer Horizont & \'d6kosystem',\
    visionBody:\
      'Diese Domain dokumentiert pers\'f6nliche Ingenieurtiefe, ausf\'fchrbare Forschungsmodelle und Fachanalysen. Unternehmerische Aktivit\'e4ten sind separat unter engineeringgrimaldi.com und grimaldi.ca geb\'fcndelt.',\
    operatorHeading: 'Ingenieur & beruflicher Kontext',\
    roleLine: 'ITk Fachspezialist, DB InfraGO AG \'b7 M.Sc. RWTH Aachen.',\
    roleDetail: 'Digitalisierung von Bahnstrom-Hochspannungsanlagen, IT/OT-Architektur und Governance auf KRITIS-Niveau.',\
    thesisNote:\
      'Der ausf\'fchrbare CIM\'96ThreMA-Ontologiesimulator sowie Anwendungen auf \'f6ffentlichen Infrastrukturdaten sind unter Arbeiten und Simulator dokumentiert.',\
    formHeading: 'Technische Anfrage',\
    formIntro:\
      'Netzbetreiber, Bahninfrastruktur-Teams, Maschinenentwickler, Forschungsgruppen und Kapazit\'e4tsplaner: Nennen Sie die ma\'dfgebliche technische Randbedingung \'97 ich antworte direkt.',\
  \},\
  form: \{\
    name: 'Name',\
    organisation: 'Organisation',\
    constraint: 'Randbedingung',\
    constraintHint: 'Was physikalisch oder architektonisch gelten muss \'97 Spannungsebene, Norm, Netzmodell, Schnittstelle oder Stabilit\'e4tsgrenze.',\
    email: 'E-Mail',\
    send: 'Senden',\
    sending: 'Wird gesendet\'85',\
    sent: 'Angekommen. Ich antworte per E-Mail.',\
    error: 'Senden nicht m\'f6glich. Bitte an die Adresse im Fu\'dfbereich schreiben.',\
    fallback: 'Das Formular ist auf dieser Umgebung noch nicht angebunden; stattdessen \'f6ffnet sich Ihr E-Mail-Programm.',\
  \},\
  work: \{\
    title: 'Arbeiten & \'f6ffentliche Artefakte',\
    intro:\
      'Jeder Eintrag benennt, was \'f6ffentlich einsehbar ist \'97 ein laufendes Deployment oder ein offenes Repository \'97 samt Validierungsrahmen und Grenzen. Nichts hier ist ein kommerzielles Produkt.',\
    proof: '\'d6ffentliches Artefakt',\
    problem: 'Problemstellung',\
    approach: 'Methodik',\
    validation: 'Validierung',\
    limits: 'Grenzen',\
    openLive: 'Deployment \'f6ffnen',\
    openRepo: 'Repository',\
    notesHeading: 'Forschungsnotizen, keine Produkte',\
    notesIntro:\
      'Unver\'f6ffentlichte Codebasen und Architekturstudien, die hier transparent eingeordnet werden, damit keine unbelegten Betriebsanspr\'fcche entstehen.',\
    back: '\uc0\u8592  Arbeiten',\
  \},\
  simulator: \{\
    kicker: 'Masterthesis \'b7 RWTH Aachen \'b7 2025',\
    title: 'CIM\'96ThreMA-Simulator f\'fcr eine dom\'e4nen\'fcbergreifende Smart-Grid-Ontologie',\
    intro:\
      'Datenmodellierung in einer dom\'e4nen\'fcbergreifenden Ontologie f\'fcr Cyber-Intelligenz in Smart Grids mittels Reinforcement Learning. Der Simulator macht die Thesis ausf\'fchrbar: CGMES-Mapping-Katalog, IEEE-9-Bus-Testbed und Szenariodefinitionen sind direkt enthalten.',\
    what: [\
      'CIM/CGMES-Netztopologie verkn\'fcpft mit der ThreMA-Bedrohungsontologie',\
      'F\'fcnf formale semantische Abbildungen zwischen Netzbetriebs- und Sicherheitsmodell',\
      'Cyber-physisches IEEE-9-Bus-Testbed mit vier dokumentierten Ausfallszenarien',\
      'Q-Learning-Entscheidungsschicht auf dem gekoppelten Netz- und Bedrohungsgraphen',\
      'Dom\'e4nen\'fcbergreifende Signal-Rausch-Metrik zur Bewertung der Abbildungsqualit\'e4t',\
    ],\
    open: 'Simulator \'f6ffnen',\
    readWriteUp: 'Thesis-Ausarbeitung lesen',\
    not: 'Der Simulator l\'e4uft auf einem separaten Deployment. Es handelt sich um ein validiertes Forschungsartefakt auf einem 9-Bus-Testnetz, nicht um ein produktives Leitstellensystem.',\
  \},\
  contact: \{\
    title: 'Kontakt',\
    intro:\
      'F\'fcr fachlichen Austausch und Anfragen zu Hochspannungsnetzen, Bahnstromsystemen, elektrischen Maschinen und physikinformierter Modellierung. Nennen Sie die technische Randbedingung; ich antworte klar, ob ich unterst\'fctzen kann.',\
    direct: 'Direkte E-Mail funktioniert jederzeit:',\
  \},\
  card: \{\
    kicker: 'Frankfurt am Main \'b7 Elektrotechnik & Energiesysteme',\
    role: 'ITk Fachspezialist \'b7 DB InfraGO AG \'b7 M.Sc. RWTH Aachen',\
    tagline: 'Elektrische Netze, Bahnstrom, elektrische Maschinen und physikinformierte digitale Zwillinge.',\
    email: 'E-Mail',\
    website: 'Fachseite',\
    githubLabel: 'GitHub',\
    networkLabel: 'Domains',\
    saveContact: 'vCard speichern',\
    connect: 'E-Mail senden',\
    scanToShare: 'QR-Code f\'fcr Kontaktkarte',\
    backHome: '\uc0\u8592  igrimaldi.engineering',\
  \},\
  footer: \{\
    colophonRole: 'Elektrische Netze, Bahnstrom, elektrische Maschinen & physikinformierte Modellierung \'b7 Frankfurt am Main',\
    rights: 'Alle Rechte vorbehalten.',\
    imprint: 'Impressum',\
    privacy: 'Datenschutz',\
  \},\
  consent: \{\
    text: 'Diese Seite nutzt cookieloses Vercel Analytics zur Besucherz\'e4hlung. Keine Profile, keine Werbung.',\
    accept: 'Erlauben',\
    decline: 'Ablehnen',\
  \},\
  notFound: \{\
    title: 'Seite nicht gefunden',\
    body: 'Diese URL existiert nicht. Die Fachseiten zu Netzen, Maschinen, digitalen Zwillingen, Fachartikeln, Register und Kontakt stehen bereit.',\
    cta: 'Startseite',\
  \},\
\};\
\
export const copy: Record<'en' | 'de', Copy> = \{ en, de \};\
\
export function pick(locale: Locale): Copy \{\
  return locale === 'de' ? de : en;\
\}\
`\
);\
\
write(\
  'app/lib/electrical.ts',\
  `export type PillarCard = \{\
  slug: string;\
  href: string;\
  code: string;\
  title: string;\
  titleDe: string;\
  summary: string;\
  summaryDe: string;\
  image: string;\
  alt: string;\
\};\
\
export type TechnicalArticle = \{\
  slug: string;\
  date: string;\
  readingTime: string;\
  kicker: string;\
  title: string;\
  summary: string;\
  heroImage: string;\
  heroAlt: string;\
  heroCode: string;\
  heroCaption: string;\
  secondaryImage: string;\
  secondaryAlt: string;\
  secondaryCode: string;\
  secondaryCaption: string;\
  tertiaryImage?: string;\
  tertiaryAlt?: string;\
  tertiaryCode?: string;\
  tertiaryCaption?: string;\
  sections: \{ heading: string; paragraphs: string[] \}[];\
  tags: string[];\
\};\
\
export const pillarCards: PillarCard[] = [\
  \{\
    slug: 'grids',\
    href: '/grids',\
    code: 'PILLAR 01 \'b7 HV & TRACTION',\
    title: 'High-voltage grids & railway traction power',\
    titleDe: 'Hochspannungsnetze & Bahnstromversorgung',\
    summary:\
      'Substations, bulk transmission corridors, 16.7 Hz / 110 kV railway traction supply, interconnection queues, and frequency stability.',\
    summaryDe:\
      'Umspannwerke, \'dcbertragungskorridore, 16,7-Hz-/110-kV-Bahnstromanlagen, Netzanschlusskapazit\'e4t und Frequenzstabilit\'e4t.',\
    image: '/images/cool/06-cinematic-traction-power.jpg',\
    alt: 'Cinematic railway traction power and high-speed train',\
  \},\
  \{\
    slug: 'machines',\
    href: '/machines',\
    code: 'PILLAR 02 \'b7 MACHINES & CONVERTERS',\
    title: 'Electrical machines & power electronics',\
    titleDe: 'Elektrische Maschinen & Leistungselektronik',\
    summary:\
      'Electromagnetic flux distribution, copper stator windings, grid-forming converters, protection relays, and deterministic assurance.',\
    summaryDe:\
      'Elektromagnetische Felder, Statorwicklungen, netzbildende Stromrichter, Schutztechnik und deterministische Sicherheitsnachweise.',\
    image: '/images/cool/02-electromagnetic-fields-machine.jpg',\
    alt: 'Electromagnetic fields around an electrical machine',\
  \},\
  \{\
    slug: 'digital-twins',\
    href: '/digital-twins',\
    code: 'PILLAR 03 \'b7 PHYSICS-INFORMED TWINS',\
    title: 'Physics-informed modelling & grid digital twins',\
    titleDe: 'Physikinformierte Modelle & digitale Netzzwillinge',\
    summary:\
      'Coupling Kirchhoff and AC power-flow equations, CIM/CGMES network semantics, and state estimation with machine learning.',\
    summaryDe:\
      'Kopplung von Leistungsflussgleichungen, CIM/CGMES-Netzsemantik und Zustandssch\'e4tzung mit lernenden Verfahren.',\
    image: '/images/cool/04-live-grid-digital-twin.jpg',\
    alt: 'Live digital twin of a power grid with data flows',\
  \},\
  \{\
    slug: 'simulator',\
    href: '/simulator',\
    code: 'PILLAR 04 \'b7 THESIS TESTBED',\
    title: 'Research workspace & CIM\'96ThreMA simulator',\
    titleDe: 'Forschungssimulator & CIM\'96ThreMA-Testbed',\
    summary:\
      'Runnable RWTH Aachen M.Sc. thesis linking CGMES substation topology with threat modelling across an IEEE 9-bus testbed.',\
    summaryDe:\
      'Ausf\'fchrbare RWTH-Masterthesis zur Kopplung von CGMES-Netztopologie und Bedrohungsmodellierung am IEEE-9-Bus-Testnetz.',\
    image: '/images/cool/09-advanced-research-simulator.jpg',\
    alt: 'Advanced research simulator with power system models',\
  \},\
];\
\
export const articles: TechnicalArticle[] = [\
  \{\
    slug: 'grid-inertia-50hz',\
    date: '2026-11-09',\
    readingTime: '7 min read',\
    kicker: 'Technical Article \'b7 Frequency Stability',\
    title: 'Grid inertia and the 50 Hz constraint under high converter penetration',\
    summary:\
      'Why rotational kinetic energy in synchronous generators governs rate-of-change-of-frequency (RoCoF) during sub-second contingencies, and how grid-forming converter controls must respect physical energy buffers.',\
    heroImage: '/images/electrical/05-grid-inertia-frequency-stability.jpg',\
    heroAlt: 'Grid inertia and frequency stability visualization with rotating machines and waveforms',\
    heroCode: 'ART. 01A \'b7 SYNCHRONOUS INERTIA & ROCOF',\
    heroCaption: 'Coupled electromechanical swing dynamics and 50 Hz frequency nadir response following a generation contingency.',\
    secondaryImage: '/images/critical/06-grid-inertia-renewable-stability.jpg',\
    secondaryAlt: 'Grid inertia and frequency stability under high renewable penetration',\
    secondaryCode: 'ART. 01B \'b7 CONVERTER-DOMINATED STABILITY',\
    secondaryCaption: 'System stability margins as inverter-based resources displace synchronous turbogenerators across transmission zones.',\
    sections: [\
      \{\
        heading: 'The swing equation is an energy budget, not a software setting',\
        paragraphs: [\
          'In a 50 Hz interconnected AC network, instantaneous imbalances between mechanical shaft power and electrical load are absorbed first by the kinetic energy stored in spinning synchronous rotors. Before primary droop governors or secondary AGC loops respond across ratusan milliseconds to seconds, the rate of change of frequency (df/dt) is inversely proportional to aggregate system inertia H.',\
          'When converter-interfaced wind, solar, and battery plants replace synchronous thermal units under grid-following phase-locked-loop (PLL) control, steady-state megawatt balance remains intact while rotational inertia drops. Under a sudden tie-line split or generator trip, steeper RoCoF trajectories narrow the window before under-frequency load-shedding relays or protection mis-operations occur.',\
        ],\
      \},\
      \{\
        heading: 'Grid-forming controls and DC-link physical headroom',\
        paragraphs: [\
          'Virtual synchronous machine (VSM) and droop-based grid-forming converters synthesize an internal voltage phasor with programmable inertia and damping constants. Yet synthetic inertia is only credible when backed by real joules on the DC bus \'97 supercapacitors, deloaded PV headroom, or battery cells sized for high C-rate transient power pulses without hitting semiconductor current limits.',\
          'Physics-informed stability assessment models both the fast inner current-limiting saturation of IGBTs/SiC valves and the electromechanical swing modes of remaining synchronous condensers and traction converters. Treating converters as ideal voltage sources hides precisely the fault-ride-through nonlinearities where voltage collapse originates.',\
        ],\
      \},\
      \{\
        heading: 'Implications for regional transmission and rail interfaces',\
        paragraphs: [\
          'Regional pockets with high inverter share and heavy industrial or railway converter loads require locational inertia and short-circuit ratio (SCR) monitoring rather than system-wide averages. Embedding swing-equation and impedance constraints directly inside network digital twins turns stability boundaries into continuous operational envelopes.',\
        ],\
      \},\
    ],\
    tags: ['50 Hz Stability', 'Synchronous Inertia', 'RoCoF', 'Grid-Forming Converters', 'Swing Equation'],\
  \},\
  \{\
    slug: 'it-ot-traction-power',\
    date: '2026-11-09',\
    readingTime: '8 min read',\
    kicker: 'Technical Article \'b7 Critical Infrastructure',\
    title: 'IT/OT convergence in high-voltage and railway traction power systems',\
    summary:\
      'Bridging engineering network models (CIM/CGMES, IEC 61850) with operational telemetry and security ontologies without compromising deterministic substation protection.',\
    heroImage: '/images/electrical/06-it-ot-convergence-control-room.jpg',\
    heroAlt: 'IT/OT convergence control room with SCADA and power system monitoring',\
    heroCode: 'ART. 02A \'b7 SCADA & TELEMETRY ARCHITECTURE',\
    heroCaption: 'Supervisory monitoring across high-voltage substations, feeder bays, and segmented operational technology zones.',\
    secondaryImage: '/images/critical/07-it-ot-critical-infrastructure.jpg',\
    secondaryAlt: 'IT/OT convergence control room for power systems',\
    secondaryCode: 'ART. 02B \'b7 KRITIS GOVERNANCE & SEGMENTATION',\
    secondaryCaption: 'Strict data-diode and zone-conduit boundaries separating deterministic bay protection from analytical digital twins.',\
    sections: [\
      \{\
        heading: 'Why power and railway OT differ from enterprise IT',\
        paragraphs: [\
          'High-voltage transmission and 16.7 Hz / 110 kV railway traction networks operate under availability and physical safety imperatives where protection relays must clear faults within milliseconds. Equipment lifetimes span decades, whereas IT analytics, cloud telemetry, and security threat landscapes evolve on monthly cycles.',\
          'Convergence fails whenever enterprise tooling treats substation IEDs as ordinary endpoints or, conversely, when engineering topology files remain trapped in static offline snapshots disconnected from asset management and cyber-risk analysis.',\
        ],\
      \},\
      \{\
        heading: 'Semantic continuity from CGMES and IEC 61850 to threat models',\
        paragraphs: [\
          'Standards such as IEC 61970/61968 (CIM/CGMES) for grid topology and IEC 61850 (SCL) for substation automation encode rich electrical connectivity: breaker states, busbar sections, instrument transformers, and protection zones. Linking these formal graph representations to operational threat ontologies ensures that switching operations or bay retrofits automatically propagate into impact assessments.',\
          'This exact cross-domain semantic gap motivated the CIM\'96ThreMA ontology simulator developed at RWTH Aachen: translating topology mutations directly into updated cyber-physical exposure paths without manual spreadsheet reconciliation.',\
        ],\
      \},\
      \{\
        heading: 'Deterministic boundaries in regulated infrastructure',\
        paragraphs: [\
          'In KRITIS-regulated infrastructure, analytical models and machine-learning estimators belong in read-only supervisory or planning zones fed via unidirectional gateways or strictly policed conduits. Actuation remains governed by deterministic interlocking, IEC 61850 protection schemes, and human switching authority.',\
        ],\
      \},\
    ],\
    tags: ['IT/OT Convergence', 'Railway Traction Power', 'CIM / CGMES', 'IEC 61850', 'KRITIS Governance'],\
  \},\
  \{\
    slug: 'ai-is-power-bound',\
    date: '2026-11-09',\
    readingTime: '8 min read',\
    kicker: 'Technical Article \'b7 Power Capacity & Infrastructure',\
    title: 'AI infrastructure is power-bound: interconnection queues and hall capacity envelopes',\
    summary:\
      'Why multi-hundred-megawatt compute clusters face binding constraints in high-voltage interconnection, transformer impedance, load-step transients, and hall thermal-electrical envelopes.',\
    heroImage: '/images/critical/01-ai-data-center-power-bottleneck.jpg',\
    heroAlt: 'AI data center power bottleneck with binding electrical constraints',\
    heroCode: 'ART. 03A \'b7 COMPUTE-TO-GRID BOTTLENECK',\
    heroCaption: 'High-density compute campuses gated by bulk substation transformer capacity, feeder redundancy, and harmonic limits.',\
    secondaryImage: '/images/critical/02-interconnection-queue-capacity.jpg',\
    secondaryAlt: 'Interconnection queue and power capacity for AI infrastructure',\
    secondaryCode: 'ART. 03B \'b7 INTERCONNECTION QUEUE DYNAMICS',\
    secondaryCaption: 'Transmission congestion and multi-year study backlogs separating requested megawatts from firm energization dates.',\
    tertiaryImage: '/images/critical/09-power-capacity-envelope.jpg',\
    tertiaryAlt: 'Power capacity envelope showing electrical and thermal limits of data center halls',\
    tertiaryCode: 'ART. 03C \'b7 HALL THERMAL-ELECTRICAL ENVELOPE',\
    tertiaryCaption: 'Feasible operating region bounded simultaneously by switchgear ampacity, UPS ride-through, transformer hot-spot temperature, and cooling rejection.',\
    sections: [\
      \{\
        heading: 'Time-to-power as the primary scaling limiter',\
        paragraphs: [\
          'Accelerator racks can be manufactured and shipped in quarters, whereas new 110 kV to 400 kV substations, large power transformers, and transmission corridor upgrades require multi-year permitting, procurement, and N-1 contingency studies. Interconnection queues across Europe and North America hold hundreds of gigawatts of speculative and firm requests competing for scarce thermal and voltage stability headroom.',\
          'Furthermore, synchronous training workloads exhibit steep, synchronized megawatt load ramps and drops across thousands of GPUs within fractions of a second \'97 introducing voltage flicker, UPS battery cycling, and sub-synchronous interaction risks unfamiliar to traditional enterprise data centers.',\
        ],\
      \},\
      \{\
        heading: 'Inside the hall: the coupled electrical and thermal envelope',\
        paragraphs: [\
          'Even on energized sites, nameplate substation megawatts rarely equal usable compute capacity. Real deliverable power sits inside a multidimensional envelope constrained by medium-voltage ring ampacity, transformer top-oil and winding hot-spot thermal time constants (IEC 60076-7), harmonic current distortion (THD), N+1 breaker selectivity, and ambient wet-bulb cooling rejection.',\
          'Static nameplate derating leaves substantial stranded capacity on cool days while risking nuisance trips during summer peaks or synchronized training bursts.',\
        ],\
      \},\
      \{\
        heading: 'Physics-informed capacity intelligence',\
        paragraphs: [\
          'Replacing static spreadsheet margins with physics-informed digital twins \'97 coupling AC load flow, dynamic transformer thermal models, and feeder contingency envelopes \'97 quantifies firm and flexible megawatt headroom hour by hour. Grounding siting and hall utilization in power-system physics provides an auditable path through the time-to-power bottleneck.',\
        ],\
      \},\
    ],\
    tags: ['Time to Power', 'Interconnection Queues', 'Power Capacity Envelope', 'High-Voltage Substations', 'Thermal Modelling'],\
  \},\
];\
\
export function getArticle(slug: string): TechnicalArticle | undefined \{\
  return articles.find((a) => a.slug === slug);\
\}\
`\
);\
\
write(\
  'app/lib/work.ts',\
  `import \{ THESIS_DEMO \} from './site';\
\
export type CaseStudy = \{\
  slug: string;\
  name: string;\
  title: string;\
  kind: string;\
  description: string;\
  problem: string;\
  approach: string;\
  validation: string;\
  limits: string;\
  stack: string[];\
  image: string;\
  imageAlt: string;\
  imageCode: string;\
  repo?: string;\
  live?: string;\
  paths: string[];\
\};\
\
export const caseStudies: CaseStudy[] = [\
  \{\
    slug: 'cim-threma',\
    name: 'CIM\'96ThreMA cross-domain ontology',\
    title: 'CIM\'96ThreMA cross-domain ontology \'97 thesis write-up',\
    kind: 'M.Sc. thesis, RWTH Aachen, 2025',\
    description:\
      'A cross-domain ontology linking grid topology (CIM/CGMES) with a threat-modelling ontology (ThreMA), so that security analysis follows network topology changes instead of being re-derived manually. Implemented as a runnable simulator on an IEEE 9-bus cyber-physical testbed.',\
    problem:\
      'Grid engineering models (CIM/CGMES) and OT threat models (ThreMA) carry no shared semantics. When switching states or bay topologies change, threat analysis lags behind or must be rebuilt by hand. At substation scale, that semantic gap creates blind spots.',\
    approach:\
      'Five formal semantic mappings between CIM/CGMES profiles and ThreMA classes, exercised on an IEEE 9-bus cyber-physical testbed across four documented contingency scenarios. A Q-learning decision layer evaluates mitigation actions over the joint graph while a cross-domain signal-to-noise metric quantifies semantic preservation.',\
    validation:\
      'Validation is scoped to the IEEE 9-bus testbed and the four documented thesis scenarios. The mapping catalogue, scenario definitions, and agent parameters ship in the public deployment so results can be inspected and re-run directly.',\
    limits:\
      'An academic research artifact. The 9-bus testbed is intentionally compact, the scenario set is closed, and the reinforcement-learning layer demonstrates methodological feasibility rather than certified substation control.',\
    stack: ['CIM / CGMES', 'ThreMA', 'IEEE 9-bus', 'Q-learning', 'Python'],\
    image: '/images/electrical/08-thesis-simulator-workspace.jpg',\
    imageAlt: 'Engineering workspace with power system simulator models and research notes',\
    imageCode: 'WORK 01 \'b7 RWTH THESIS ARTIFACT',\
    live: THESIS_DEMO,\
    paths: ['physics-informed.vercel.app', 'repo path not public'],\
  \},\
  \{\
    slug: 'bahn-project-manager',\
    name: 'Bahn Project Manager',\
    title: 'Bahn Project Manager \'97 public-dataset portfolio application',\
    kind: 'Public-dataset rail infrastructure application',\
    description:\
      'A typed portfolio model over an open 1,298-project rail-infrastructure dataset: technical department roll-ups, cross-project dependency views, and an automated Vitest suite built strictly on public open data.',\
    problem:\
      'Large rail and traction infrastructure portfolios often fragment across departmental spreadsheets, obscuring cross-discipline dependencies until manual reconciliation.',\
    approach:\
      'A strictly typed TypeScript data model over the open dataset, deterministic roll-ups per engineering discipline, dependency inspection views, and a Vitest verification suite written ahead of the UI.',\
    validation:\
      'The source repository is public and the test suite runs cleanly on a fresh clone. It demonstrates data modelling and dependency structuring over open public records.',\
    limits:\
      'A standalone public-dataset engineering exercise, not an enterprise system. It contains zero employer data, internal workflows, or operational connections.',\
    stack: ['TypeScript', 'React', 'Vite', 'Vitest'],\
    image: '/images/electrical/02-railway-traction-power.jpg',\
    imageAlt: 'Railway traction power system with catenary, substations and HV equipment',\
    imageCode: 'WORK 02 \'b7 PUBLIC RAIL DATASET MODEL',\
    repo: 'https://github.com/iceccarelli/bahn-project-manager',\
    paths: ['github.com/iceccarelli/bahn-project-manager'],\
  \},\
];\
\
export type ResearchNote = \{ name: string; domain: string; line: string \};\
\
export const researchNotes: ResearchNote[] = [\
  \{\
    name: 'GridOS',\
    domain: 'DER & distribution modelling',\
    line: 'Protocol ingest, state estimation, and grid-aware dispatch loop notes. Private research codebase, unpublished.',\
  \},\
  \{\
    name: 'DERIM',\
    domain: 'Grid integration middleware',\
    line: 'Telemetry normalization and feeder constraint coordination notes for distributed energy assets. Private, unpublished.',\
  \},\
  \{\
    name: 'Time to Power / Capacity Envelope',\
    domain: 'HV siting & hall capacity',\
    line: 'Analytical framing for interconnection queue bottlenecking and coupled thermal-electrical data-center hall envelopes. Documented conceptually; commercial hub at engineeringgrimaldi.com.',\
  \},\
  \{\
    name: 'NeuralBridge Assurance',\
    domain: 'Deterministic safety evidence',\
    line: 'Hash-chained audit and deterministic envelope concepts for software interacting with physical electrical and industrial equipment. Private notes, unpublished.',\
  \},\
];\
\
export function getCaseStudy(slug: string): CaseStudy | undefined \{\
  return caseStudies.find((c) => c.slug === slug);\
\}\
`\
);\
\
write(\
  'app/lib/register.ts',\
  `import \{ THESIS_DEMO \} from './site';\
\
export type RegisterStatus = 'PUBLIC_DEPLOYMENT' | 'PUBLIC_REPO' | 'TECHNICAL_ARTICLE' | 'RESEARCH_NOTE';\
\
export type RegisterEntry = \{\
  id: string;\
  name: string;\
  pillar: 'Grids & Traction' | 'Machines & Devices' | 'Physics-Informed Twins' | 'Research & Simulator';\
  status: RegisterStatus;\
  summary: string;\
  scope: string;\
  limits: string;\
  publicUrl?: string;\
  internalHref: string;\
  updated: string;\
\};\
\
export const REGISTER_UPDATED = '2026-11-12';\
\
export const registerEntries: RegisterEntry[] = [\
  \{\
    id: 'cim-threma',\
    name: 'CIM\'96ThreMA Cross-Domain Ontology Simulator',\
    pillar: 'Research & Simulator',\
    status: 'PUBLIC_DEPLOYMENT',\
    summary:\
      'Runnable M.Sc. thesis simulator coupling CIM/CGMES power-grid topology with the ThreMA threat ontology on an IEEE 9-bus testbed.',\
    scope: 'Five formal semantic mappings, four documented cyber-physical scenarios, Q-learning evaluation layer, and SNR fidelity metric.',\
    limits: 'Academic validation on a 9-bus testbed; not an operational substation security controller.',\
    publicUrl: THESIS_DEMO,\
    internalHref: '/work/cim-threma',\
    updated: '2025-10-01',\
  \},\
  \{\
    id: 'bahn-project-manager',\
    name: 'Bahn Project Manager (Open Rail Dataset)',\
    pillar: 'Grids & Traction',\
    status: 'PUBLIC_REPO',\
    summary:\
      'Typed engineering portfolio model and Vitest verification suite over a public 1,298-project rail infrastructure dataset.',\
    scope: 'Departmental roll-ups, cross-discipline dependency graphs, and schema validation using open public data only.',\
    limits: 'Open-data modelling study; independent of and unconnected to any rail operator system.',\
    publicUrl: 'https://github.com/iceccarelli/bahn-project-manager',\
    internalHref: '/work/bahn-project-manager',\
    updated: '2026-03-15',\
  \},\
  \{\
    id: 'grid-digital-twins',\
    name: 'Physics-Informed Grid Digital Twins Monograph',\
    pillar: 'Physics-Informed Twins',\
    status: 'TECHNICAL_ARTICLE',\
    summary:\
      'Architectural synthesis of AC power-flow conservation laws, CGMES network graphs, and hybrid state estimation.',\
    scope: 'Covers observability under sparse phasor telemetry, contingency screening, and physical consistency constraints.',\
    limits: 'Methodological domain documentation; references no proprietary utility network models.',\
    internalHref: '/digital-twins',\
    updated: '2026-11-09',\
  \},\
  \{\
    id: 'traction-power-modelling',\
    name: 'HV Grids, 50 Hz Inertia & Traction Digitisation Notes',\
    pillar: 'Grids & Traction',\
    status: 'TECHNICAL_ARTICLE',\
    summary:\
      'Technical analyses on synchronous inertia at 50 Hz, 16.7 Hz railway traction interfaces, and IT/OT zone-conduit governance.',\
    scope: 'Swing-equation energy budgets, grid-forming DC-link headroom, and IEC 61850 / CIM semantic continuity.',\
    limits: 'General electrical-engineering analysis written strictly from public standards and open literature.',\
    internalHref: '/grids',\
    updated: '2026-11-09',\
  \},\
  \{\
    id: 'power-capacity-envelope',\
    name: 'AI Time-to-Power & Hall Capacity Envelope Framing',\
    pillar: 'Physics-Informed Twins',\
    status: 'RESEARCH_NOTE',\
    summary:\
      'Coupled electrical-thermal envelope modelling for transformer hot-spot limits, feeder selectivity, and interconnection queues.',\
    scope: 'Illustrates binding physical constraints governing high-density compute siting and energization timelines.',\
    limits: 'Conceptual engineering note; commercial entities are separate at engineeringgrimaldi.com.',\
    internalHref: '/articles/ai-is-power-bound',\
    updated: '2026-11-09',\
  \},\
  \{\
    id: 'machine-assurance',\
    name: 'Electrical Machines, Converters & Deterministic Assurance',\
    pillar: 'Machines & Devices',\
    status: 'RESEARCH_NOTE',\
    summary:\
      'Stator electromagnetics, high-power semiconductor converter limits, and hash-chained assurance concepts for safety-critical equipment.',\
    scope: 'Examines thermal-magnetic machine boundaries alongside deterministic verification envelopes for control software.',\
    limits: 'Architectural study; makes zero certification claims against IEC 61508 or EN 50128.',\
    internalHref: '/machines',\
    updated: '2026-11-09',\
  \},\
];\
\
export function getRegisterEntry(id: string): RegisterEntry | undefined \{\
  return registerEntries.find((e) => e.id === id);\
\}\
`\
);\
\
write(\
  'app/components/Plate.tsx',\
  `import Image from 'next/image';\
\
export type PlateProps = \{\
  src: string;\
  alt: string;\
  caption?: string;\
  code?: string;\
  priority?: boolean;\
  sizes?: string;\
  compact?: boolean;\
\};\
\
export default function Plate(\{\
  src,\
  alt,\
  caption,\
  code,\
  priority = false,\
  sizes = '(max-width: 900px) 100vw, 840px',\
  compact = false,\
\}: PlateProps) \{\
  return (\
    <figure className=\{compact ? 'plate plate-compact' : 'plate'\}>\
      <div className="plate-frame">\
        <Image\
          src=\{src\}\
          alt=\{alt\}\
          width=\{1168\}\
          height=\{784\}\
          priority=\{priority\}\
          loading=\{priority ? 'eager' : 'lazy'\}\
          decoding=\{priority ? 'sync' : 'async'\}\
          sizes=\{sizes\}\
          quality=\{82\}\
          className="plate-img"\
        />\
      </div>\
      \{(caption || code) && (\
        <figcaption className="plate-cap">\
          \{code && <span className="plate-code">\{code\}</span>\}\
          \{caption && <span>\{caption\}</span>\}\
        </figcaption>\
      )\}\
    </figure>\
  );\
\}\
`\
);\
\
write(\
  'app/components/DomainNav.tsx',\
  `'use client';\
\
import Link from 'next/link';\
import \{ useLanguage \} from '../lib/i18n';\
import \{ pick \} from '../lib/copy';\
\
export default function DomainNav(\{ current \}: \{ current: string \}) \{\
  const \{ locale \} = useLanguage();\
  const c = pick(locale);\
\
  const links = [\
    \{ href: '/', label: c.nav.overview \},\
    \{ href: '/grids', label: c.nav.grids \},\
    \{ href: '/machines', label: c.nav.machines \},\
    \{ href: '/digital-twins', label: c.nav.twins \},\
    \{ href: '/articles', label: c.nav.articles \},\
    \{ href: '/simulator', label: c.nav.thesis \},\
    \{ href: '/work', label: c.nav.work \},\
    \{ href: '/registry', label: c.nav.registry \},\
  ];\
\
  return (\
    <nav className="subnav" aria-label="Technical pillars">\
      <ol>\
        \{links.map((item) => (\
          <li key=\{item.href\}>\
            <Link\
              href=\{item.href\}\
              aria-current=\{current === item.href ? 'page' : undefined\}\
            >\
              \{item.label\}\
            </Link>\
          </li>\
        ))\}\
      </ol>\
      <a className="subnav-json" href="/api/register">\
        JSON\
      </a>\
    </nav>\
  );\
\}\
`\
);\
\
write(\
  'app/components/Header.tsx',\
  `'use client';\
\
import Link from 'next/link';\
import LanguageSwitcher from './LanguageSwitcher';\
import \{ useLanguage \} from '../lib/i18n';\
import \{ pick \} from '../lib/copy';\
import \{ SITE_NAME \} from '../lib/site';\
\
export default function Header() \{\
  const \{ locale \} = useLanguage();\
  const c = pick(locale);\
\
  const items = [\
    \{ label: c.nav.grids, href: '/grids' \},\
    \{ label: c.nav.machines, href: '/machines' \},\
    \{ label: c.nav.twins, href: '/digital-twins' \},\
    \{ label: c.nav.articles, href: '/articles' \},\
    \{ label: c.nav.work, href: '/work' \},\
    \{ label: c.nav.contact, href: '/connect' \},\
  ];\
  const more = [\
    \{ label: c.nav.thesis, href: '/simulator' \},\
    \{ label: c.nav.registry, href: '/registry' \},\
    \{ label: c.nav.card, href: '/card' \},\
  ];\
\
  return (\
    <header className="hdr" id="top">\
      <div className="hdr-in">\
        <Link className="hdr-name" href="/">\
          \{SITE_NAME\}\
          <span className="hdr-sub">\{c.nav.domain\}</span>\
        </Link>\
        <nav className="hdr-nav" aria-label="Primary">\
          \{items.map((i) => (\
            <Link key=\{i.href\} href=\{i.href\}>\
              \{i.label\}\
            </Link>\
          ))\}\
          <LanguageSwitcher />\
        </nav>\
        <details className="hdr-m">\
          <summary>\{c.nav.menu\}</summary>\
          <div className="hdr-m-list">\
            \{items.map((i) => (\
              <Link key=\{i.href\} href=\{i.href\}>\
                \{i.label\}\
              </Link>\
            ))\}\
            \{more.map((i) => (\
              <Link key=\{i.href\} href=\{i.href\}>\
                \{i.label\}\
              </Link>\
            ))\}\
            <LanguageSwitcher />\
          </div>\
        </details>\
      </div>\
    </header>\
  );\
\}\
`\
);\
\
write(\
  'app/components/SiteFooter.tsx',\
  `'use client';\
\
import Image from 'next/image';\
import Link from 'next/link';\
import \{ useLanguage \} from '../lib/i18n';\
import \{ pick \} from '../lib/copy';\
import \{\
  CONFLICT_DE,\
  CONFLICT_EN,\
  EMAIL,\
  FOOTER_PORTRAIT,\
  GITHUB,\
  LINKEDIN,\
  SITE_NAME,\
\} from '../lib/site';\
\
export default function SiteFooter() \{\
  const \{ locale \} = useLanguage();\
  const c = pick(locale);\
  const year = new Date().getFullYear();\
\
  return (\
    <footer className="ftr">\
      <div className="ftr-in">\
        <div className="ftr-colophon">\
          <Image\
            src=\{FOOTER_PORTRAIT\}\
            alt="Vincenzo Ceccarelli Grimaldi"\
            width=\{56\}\
            height=\{56\}\
            className="ftr-avatar"\
          />\
          <div>\
            <p className="ftr-author">\{SITE_NAME\}</p>\
            <p className="ftr-sub">\{c.footer.colophonRole\}</p>\
          </div>\
        </div>\
        <nav className="ftr-links" aria-label="Footer">\
          <a href=\{'mailto:' + EMAIL\}>\{EMAIL\}</a>\
          <a href=\{GITHUB\} rel="noopener noreferrer">\
            GitHub\
          </a>\
          <a href=\{LINKEDIN\} rel="noopener noreferrer">\
            LinkedIn\
          </a>\
          <Link href="/registry">\{c.nav.registry\}</Link>\
          <Link href="/card">\{c.nav.card\}</Link>\
          <Link href="/impressum">\{c.footer.imprint\}</Link>\
          <Link href="/datenschutz">\{c.footer.privacy\}</Link>\
          <a href="https://engineeringgrimaldi.com" rel="noopener noreferrer">\
            engineeringgrimaldi.com\
          </a>\
          <a href="https://grimaldi.ca" rel="noopener noreferrer">\
            grimaldi.ca\
          </a>\
        </nav>\
        <p className="ftr-note">\{locale === 'de' ? CONFLICT_DE : CONFLICT_EN\}</p>\
        <p className="ftr-rights">\
          \'a9 \{year\} \{SITE_NAME\}. \{c.footer.rights\}\
        </p>\
      </div>\
    </footer>\
  );\
\}\
`\
);\
\
write(\
  'app/components/HomeLanding.tsx',\
  `'use client';\
\
import Image from 'next/image';\
import Link from 'next/link';\
import ContactForm from './ContactForm';\
import DomainNav from './DomainNav';\
import Plate from './Plate';\
import \{ useLanguage \} from '../lib/i18n';\
import \{ pick \} from '../lib/copy';\
import \{ CITY, SITE_NAME \} from '../lib/site';\
import \{ articles, pillarCards \} from '../lib/electrical';\
import \{ registerEntries \} from '../lib/register';\
\
export default function HomeLanding() \{\
  const \{ locale \} = useLanguage();\
  const c = pick(locale);\
\
  return (\
    <main className="doc doc-wide">\
      <DomainNav current="/" />\
\
      <section className="blk blk-first" aria-labelledby="mandate">\
        <p className="kicker">\{c.home.kicker\}</p>\
        <h1 id="mandate" className="h1 mandate">\
          \{c.home.mandate\}\
        </h1>\
        <p className="lead">\{c.home.lead\}</p>\
        <Plate\
          src="/images/cool/01-cinematic-high-voltage-substation.jpg"\
          alt="Cinematic high-voltage substation at night"\
          code="FIG. 01 \'b7 HIGH-VOLTAGE INFRASTRUCTURE"\
          caption="High-voltage substation busbars, instrument transformers, and transmission interfaces."\
          priority\
        />\
      </section>\
\
      <section className="blk" aria-labelledby="pillars">\
        <h2 id="pillars" className="blk-h">\
          \{c.home.pillarsHeading\}\
        </h2>\
        <p className="blk-intro">\{c.home.pillarsIntro\}</p>\
        <div className="pillar-grid">\
          \{pillarCards.map((p) => (\
            <article key=\{p.slug\} className="pillar-card">\
              <Link href=\{p.href\} className="pillar-media">\
                <Plate\
                  src=\{p.image\}\
                  alt=\{p.alt\}\
                  code=\{p.code\}\
                  sizes="(max-width: 680px) 100vw, 410px"\
                  compact\
                />\
              </Link>\
              <h3 className="pillar-title">\
                <Link href=\{p.href\}>\{locale === 'de' ? p.titleDe : p.title\}</Link>\
              </h3>\
              <p className="pillar-summary">\
                \{locale === 'de' ? p.summaryDe : p.summary\}\
              </p>\
            </article>\
          ))\}\
        </div>\
      </section>\
\
      <section className="blk" aria-labelledby="bottleneck">\
        <h2 id="bottleneck" className="blk-h">\
          \{c.home.bottleneckHeading\}\
        </h2>\
        <p className="blk-intro">\{c.home.bottleneckIntro\}</p>\
        <div className="plate-pair">\
          <Plate\
            src="/images/critical/01-ai-data-center-power-bottleneck.jpg"\
            alt="AI data center power bottleneck with binding electrical constraints"\
            code="FIG. 02 \'b7 TIME-TO-POWER CONSTRAINT"\
            caption="Bulk substation interconnection and transformer capacity gating high-density compute."\
            sizes="(max-width: 680px) 100vw, 410px"\
            compact\
          />\
          <Plate\
            src="/images/critical/09-power-capacity-envelope.jpg"\
            alt="Power capacity envelope showing electrical and thermal limits of data center halls"\
            code="FIG. 03 \'b7 CAPACITY ENVELOPE"\
            caption="Coupled electrical ampacity, transformer thermal hot-spot, and cooling operating envelope."\
            sizes="(max-width: 680px) 100vw, 410px"\
            compact\
          />\
        </div>\
        <p>\{c.home.bottleneckBody\}</p>\
        <p className="blk-more underlined-links">\
          <Link href="/articles/ai-is-power-bound">\{c.home.bottleneckCta\} \uc0\u8594 </Link>\
        </p>\
      </section>\
\
      <section className="blk" aria-labelledby="articles">\
        <h2 id="articles" className="blk-h">\
          \{c.home.articlesHeading\}\
        </h2>\
        <p className="blk-intro">\{c.home.articlesIntro\}</p>\
        <ol className="dec-list">\
          \{articles.map((a) => (\
            <li key=\{a.slug\}>\
              <Link href=\{'/articles/' + a.slug\}>\
                <code className="path">\{a.readingTime\}</code>\{' '\}\
                <span className="dec-title">\{a.title\}</span>\
              </Link>\
              <time className="muted" dateTime=\{a.date\}>\
                \{a.date\}\
              </time>\
            </li>\
          ))\}\
        </ol>\
        <p className="blk-more underlined-links">\
          <Link href="/articles">\{c.home.articlesAll\} \uc0\u8594 </Link>\
        </p>\
      </section>\
\
      <section className="blk" aria-labelledby="registry">\
        <h2 id="registry" className="blk-h">\
          \{c.home.registryHeading\}\
        </h2>\
        <p className="blk-intro">\{c.home.registryIntro\}</p>\
        <div className="tbl-wrap">\
          <table className="tbl reg reg-compact">\
            <thead>\
              <tr>\
                <th scope="col">Artifact / Study</th>\
                <th scope="col">Pillar</th>\
                <th scope="col">Class</th>\
                <th scope="col">Summary</th>\
              </tr>\
            </thead>\
            <tbody>\
              \{registerEntries.map((r) => (\
                <tr key=\{r.id\}>\
                  <th scope="row">\
                    <Link href=\{'/registry/' + r.id\}>\{r.name\}</Link>\
                  </th>\
                  <td data-label="Pillar">\{r.pillar\}</td>\
                  <td data-label="Class">\
                    <code className="path">\{r.status\}</code>\
                  </td>\
                  <td data-label="Summary">\{r.summary\}</td>\
                </tr>\
              ))\}\
            </tbody>\
          </table>\
        </div>\
        <p className="blk-more underlined-links">\
          <Link href="/registry">\{c.home.registryAll\} \uc0\u8594 </Link> \'b7\{' '\}\
          <a href="/api/register">JSON</a>\
        </p>\
      </section>\
\
      <section className="blk" aria-labelledby="vision">\
        <h2 id="vision" className="blk-h">\
          \{c.home.visionHeading\}\
        </h2>\
        <Plate\
          src="/images/cool/10-future-grids-and-machines.jpg"\
          alt="Future-looking electrical grids and machines"\
          code="FIG. 04 \'b7 GRIDS, MACHINES & DIGITAL TWINS"\
          caption="Long-horizon convergence of high-voltage infrastructure, advanced electrical machines, and physics-constrained intelligence."\
        />\
        <p className="underlined-links">\
          \{c.home.visionBody\}\{' '\}\
          <a href="https://engineeringgrimaldi.com" rel="noopener noreferrer">\
            engineeringgrimaldi.com \uc0\u8599 \
          </a>\{' '\}\
          \'b7\{' '\}\
          <a href="https://grimaldi.ca" rel="noopener noreferrer">\
            grimaldi.ca \uc0\u8599 \
          </a>\
        </p>\
      </section>\
\
      <section className="blk id-blk" aria-labelledby="operator">\
        <h2 id="operator" className="blk-h">\
          \{c.home.operatorHeading\}\
        </h2>\
        <div className="id">\
          <div className="id-portrait">\
            <Image\
              src="/vincenzo_grimaldi_headshot.jpg"\
              alt="Vincenzo Ceccarelli Grimaldi"\
              width=\{96\}\
              height=\{96\}\
            />\
          </div>\
          <div className="id-text">\
            <p className="name name-sm">\{SITE_NAME\}</p>\
            <p className="city">\{CITY\}</p>\
            <p className="role">\
              <strong>\{c.home.roleLine\}</strong> \{c.home.roleDetail\}\
            </p>\
            <p className="fine underlined-links">\
              \{c.home.thesisNote\} <Link href="/work">/work</Link> \'b7\{' '\}\
              <Link href="/simulator">/simulator</Link>\
            </p>\
          </div>\
        </div>\
      </section>\
\
      <section className="blk" id="connect" aria-labelledby="enquiry">\
        <h2 id="enquiry" className="blk-h">\
          \{c.home.formHeading\}\
        </h2>\
        <p className="blk-intro">\{c.home.formIntro\}</p>\
        <ContactForm compact />\
      </section>\
    </main>\
  );\
\}\
`\
);\
\
write(\
  'app/page.tsx',\
  `import HomeLanding from './components/HomeLanding';\
\
export const revalidate = 3600;\
\
export default function Home() \{\
  return <HomeLanding />;\
\}\
`\
);\
\
write(\
  'app/layout.tsx',\
  `import type \{ Metadata \} from 'next';\
import type \{ ReactNode \} from 'react';\
import Header from './components/Header';\
import SiteFooter from './components/SiteFooter';\
import ConsentGate from './components/ConsentGate';\
import \{ GlobalJsonLd \} from './components/JsonLd';\
import \{ LanguageProvider \} from './lib/i18n';\
import \{ SITE_URL, SITE_NAME, ONE_LINE, CITY \} from './lib/site';\
import './globals.css';\
\
const DEFAULT_TITLE = SITE_NAME + ' \'97 ' + ONE_LINE;\
const DESCRIPTION =\
  SITE_NAME +\
  ' (' +\
  CITY +\
  '): independent electrical engineering work across high-voltage grids, railway traction power, electrical machines, power electronics, and physics-informed digital twins \'97 documented with runnable models, technical articles, and public repositories.';\
\
export const metadata: Metadata = \{\
  metadataBase: new URL(SITE_URL),\
  title: \{\
    default: DEFAULT_TITLE,\
    template: '%s \'97 ' + SITE_NAME,\
  \},\
  description: DESCRIPTION,\
  authors: [\{ name: SITE_NAME \}],\
  creator: SITE_NAME,\
  publisher: SITE_NAME,\
  robots: \{ index: true, follow: true \},\
  alternates: \{ canonical: '/' \},\
  manifest: '/site.webmanifest',\
  icons: \{\
    icon: [\
      \{ url: '/favicon.ico', sizes: '48x48' \},\
      \{ url: '/icon.svg', type: 'image/svg+xml' \},\
    ],\
    apple: '/apple-touch-icon.png',\
  \},\
  openGraph: \{\
    title: DEFAULT_TITLE,\
    description: DESCRIPTION,\
    url: SITE_URL + '/',\
    siteName: SITE_NAME,\
    locale: 'en_GB',\
    type: 'website',\
    images: [\
      \{\
        url: SITE_URL + '/images/electrical/01-high-voltage-substation.jpg',\
        width: 1168,\
        height: 784,\
        alt: 'High-voltage electrical substation with transformers and transmission infrastructure at dusk',\
      \},\
    ],\
  \},\
  twitter: \{\
    card: 'summary_large_image',\
    title: DEFAULT_TITLE,\
    description: DESCRIPTION,\
    images: [SITE_URL + '/images/electrical/01-high-voltage-substation.jpg'],\
  \},\
\};\
\
export default function RootLayout(\{ children \}: \{ children: ReactNode \}) \{\
  return (\
    <html lang="en">\
      <body>\
        <LanguageProvider>\
          <Header />\
          \{children\}\
          <SiteFooter />\
          <ConsentGate />\
        </LanguageProvider>\
        <GlobalJsonLd />\
      </body>\
    </html>\
  );\
\}\
`\
);\
\
write(\
  'app/grids/page.tsx',\
  `import type \{ Metadata \} from 'next';\
import Link from 'next/link';\
import DomainNav from '../components/DomainNav';\
import Plate from '../components/Plate';\
import \{ SITE_URL \} from '../lib/site';\
\
export const metadata: Metadata = \{\
  title: 'High-Voltage Grids & Railway Traction Power',\
  description:\
    'Technical pillar covering high-voltage substations, bulk transmission corridors, 16.7 Hz / 110 kV railway traction power systems, interconnection queues, and 50 Hz synchronous inertia.',\
  alternates: \{ canonical: '/grids' \},\
  openGraph: \{\
    title: 'High-Voltage Grids & Railway Traction Power',\
    description:\
      'Substations, transmission corridors, railway traction power digitisation, interconnection capacity, and frequency stability.',\
    url: SITE_URL + '/grids',\
    images: [\{ url: SITE_URL + '/images/electrical/01-high-voltage-substation.jpg', width: 1168, height: 784 \}],\
  \},\
\};\
\
export default function GridsPage() \{\
  return (\
    <main className="doc doc-wide">\
      <DomainNav current="/grids" />\
\
      <section className="blk blk-first">\
        <p className="kicker">Pillar 01 \'b7 Bulk Transmission & Traction Supply</p>\
        <h1 className="h1">High-voltage grids and railway traction power</h1>\
        <p className="lead">\
          Power delivery infrastructure succeeds or fails at physical interfaces: HV busbars, transformer thermal limits, protection selectivity, traction catenary impedance, and sub-second rotor inertia.\
        </p>\
        <Plate\
          src="/images/electrical/01-high-voltage-substation.jpg"\
          alt="High-voltage electrical substation with transformers and transmission infrastructure at dusk"\
          code="GRIDS 01 \'b7 SUBSTATION TOPOLOGY"\
          caption="Primary air-insulated switching bays, power transformers, and overhead line terminations."\
          priority\
        />\
      </section>\
\
      <section className="blk" aria-labelledby="corridors">\
        <h2 id="corridors" className="blk-h">Transmission corridors & interconnection queues</h2>\
        <p>\
          Bulk transmission corridors carry active and reactive power across regional load centers under N-1 thermal, voltage-drop, and phase-angle stability limits. As electrified industry, renewable generation, and large compute campuses request multi-hundred-megawatt connections, queue backlogs expose binding network bottlenecks years ahead of construction.\
        </p>\
        <div className="plate-pair">\
          <Plate\
            src="/images/electrical/09-high-voltage-transmission-corridor.jpg"\
            alt="High-voltage transmission corridor stretching across landscape"\
            code="GRIDS 02 \'b7 BULK TRANSFER CORRIDOR"\
            caption="Multi-circuit overhead transmission lines governed by thermal sag, surge impedance loading, and N-1 security."\
            sizes="(max-width: 680px) 100vw, 410px"\
            compact\
          />\
          <Plate\
            src="/images/critical/02-interconnection-queue-capacity.jpg"\
            alt="Interconnection queue and power capacity for AI infrastructure"\
            code="GRIDS 03 \'b7 INTERCONNECTION HEADROOM"\
            caption="Locational hosting capacity and contingency study bottlenecks across congested transmission nodes."\
            sizes="(max-width: 680px) 100vw, 410px"\
            compact\
          />\
        </div>\
      </section>\
\
      <section className="blk" aria-labelledby="traction">\
        <h2 id="traction" className="blk-h">Railway traction power & HV digitisation</h2>\
        <p>\
          In DACH railway networks, dedicated 16.7 Hz, 110 kV traction transmission lines and converter stations feed 15 kV overhead catenary sections. Moving train loads create rapidly shifting single-phase impedance profiles, pantograph harmonics, and regenerative braking reversals that demand tight coordination between HV feeder protection and digital asset models.\
        </p>\
        <div className="plate-pair">\
          <Plate\
            src="/images/electrical/02-railway-traction-power.jpg"\
            alt="Railway traction power system with catenary, substations and HV equipment"\
            code="GRIDS 04 \'b7 TRACTION FEEDER & CATENARY"\
            caption="Overhead contact line geometry, traction substation step-down feeders, and sectioning architecture."\
            sizes="(max-width: 680px) 100vw, 410px"\
            compact\
          />\
          <Plate\
            src="/images/critical/04-traction-power-digitization.jpg"\
            alt="Railway traction power digitization with digital twin overlay"\
            code="GRIDS 05 \'b7 TRACTION DIGITALISATION"\
            caption="Structured topology and telemetry overlays supporting condition-aware rail power infrastructure."\
            sizes="(max-width: 680px) 100vw, 410px"\
            compact\
          />\
        </div>\
      </section>\
\
      <section className="blk" aria-labelledby="inertia">\
        <h2 id="inertia" className="blk-h">Frequency dynamics & synchronous inertia</h2>\
        <Plate\
          src="/images/cool/08-grid-frequency-inertia-living.jpg"\
          alt="Grid frequency and inertia as a living system"\
          code="GRIDS 06 \'b7 50 HZ FREQUENCY EQUILIBRIUM"\
          caption="Electromechanical coupling across synchronous machines and converter-interfaced resources."\
        />\
        <p className="underlined-links">\
          Maintaining 50 Hz stability as converter penetration rises requires modelling kinetic energy buffers, RoCoF relay thresholds, and converter current saturation together. Explore the dedicated explainer in\{' '\}\
          <Link href="/articles/grid-inertia-50hz">Grid inertia and the 50 Hz constraint</Link> and\{' '\}\
          <Link href="/articles/it-ot-traction-power">IT/OT convergence in traction power</Link>.\
        </p>\
      </section>\
    </main>\
  );\
\}\
`\
);\
\
write(\
  'app/machines/page.tsx',\
  `import type \{ Metadata \} from 'next';\
import Link from 'next/link';\
import DomainNav from '../components/DomainNav';\
import Plate from '../components/Plate';\
import \{ SITE_URL \} from '../lib/site';\
\
export const metadata: Metadata = \{\
  title: 'Electrical Machines, Windings & Power Electronics',\
  description:\
    'Technical pillar on rotating electrical machines, precision copper stator windings, industrial electrification, grid-scale power electronics, and deterministic safety assurance.',\
  alternates: \{ canonical: '/machines' \},\
  openGraph: \{\
    title: 'Electrical Machines, Windings & Power Electronics',\
    description:\
      'Stator electromagnetics, thermal winding limits, grid-scale converters, protection hardware, and safety assurance.',\
    url: SITE_URL + '/machines',\
    images: [\{ url: SITE_URL + '/images/cool/03-precision-stator-detail.jpg', width: 1168, height: 784 \}],\
  \},\
\};\
\
export default function MachinesPage() \{\
  return (\
    <main className="doc doc-wide">\
      <DomainNav current="/machines" />\
\
      <section className="blk blk-first">\
        <p className="kicker">Pillar 02 \'b7 Electromagnetics & Power Conversion</p>\
        <h1 className="h1">Electrical machines, windings, and power electronics</h1>\
        <p className="lead">\
          Every megawatt generated, transformed, or converted into traction torque passes through magnetic cores, insulated copper conductors, and high-speed power semiconductors operating against strict thermal and dielectric ceilings.\
        </p>\
        <Plate\
          src="/images/cool/03-precision-stator-detail.jpg"\
          alt="Precision electrical machine stator with copper windings"\
          code="MACH 01 \'b7 STATOR CORE & SLOT GEOMETRY"\
          caption="Precision laminated stator core and formed copper end-windings engineered for low harmonic losses and high slot fill."\
          priority\
        />\
      </section>\
\
      <section className="blk" aria-labelledby="windings">\
        <h2 id="windings" className="blk-h">Electromagnetic design & industrial electrification</h2>\
        <p>\
          Air-gap flux density, slot leakage reactance, skin and proximity effects in hairpin or Roebel bars, and insulation partial-discharge inception under steep dV/dt converter pulses govern machine longevity. High-torque traction drives and industrial motors demand coupled electromagnetic-thermal modelling rather than steady-state nameplate ratings.\
        </p>\
        <div className="plate-pair">\
          <Plate\
            src="/images/electrical/03-electrical-machines-windings.jpg"\
            alt="Close-up of electrical machine copper windings and stator"\
            code="MACH 02 \'b7 WINDING INSULATION & THERMAL PATHS"\
            caption="Copper conductor transposition, slot liners, and end-winding cooling channels."\
            sizes="(max-width: 680px) 100vw, 410px"\
            compact\
          />\
          <Plate\
            src="/images/critical/05-electrical-machines-electrification.jpg"\
            alt="Advanced electrical machines and power electronics for electrification"\
            code="MACH 03 \'b7 COUPLED DRIVE ELECTRIFICATION"\
            caption="Integrated motor-drive architectures for heavy transport and industrial process electrification."\
            sizes="(max-width: 680px) 100vw, 410px"\
            compact\
          />\
        </div>\
      </section>\
\
      <section className="blk" aria-labelledby="electronics">\
        <h2 id="electronics" className="blk-h">Grid-scale power electronics & protection devices</h2>\
        <p>\
          Modern grids and rail feeders rely on modular multilevel converters (MMC), STATCOMs, traction inverters, and numerical IEC 61850 protection relays. Semiconductor junction thermal impedance is measured in milliseconds \'97 meaning overcurrent limiting, harmonic damping, and fault ride-through behaviour are dictated by inner control loops interacting with transformer and line impedances.\
        </p>\
        <div className="plate-pair">\
          <Plate\
            src="/images/cool/07-grid-scale-power-electronics.jpg"\
            alt="Grid-scale power electronics and converters"\
            code="MACH 04 \'b7 GRID-SCALE CONVERTER VALVES"\
            caption="High-power converter stacks interfacing DC energy buffers and AC transmission busbars."\
            sizes="(max-width: 680px) 100vw, 410px"\
            compact\
          />\
          <Plate\
            src="/images/electrical/07-electrical-devices-power-electronics.jpg"\
            alt="Modern electrical devices and power electronics including inverters and protection equipment"\
            code="MACH 05 \'b7 INVERTERS & PROTECTION IEDS"\
            caption="Power conversion stages paired with high-speed switchgear and numerical protection relays."\
            sizes="(max-width: 680px) 100vw, 410px"\
            compact\
          />\
        </div>\
      </section>\
\
      <section className="blk" aria-labelledby="assurance">\
        <h2 id="assurance" className="blk-h">Deterministic assurance for safety-relevant equipment</h2>\
        <Plate\
          src="/images/critical/08-industrial-autonomous-assurance.jpg"\
          alt="Hash-chained industrial autonomous assurance for machine safety"\
          code="MACH 06 \'b7 DETERMINISTIC SAFETY ENVELOPE"\
          caption="Verifiable guardrails and tamper-evident audit trails separating advisory software from physical actuation."\
        />\
        <p className="underlined-links">\
          Whenever supervisory optimization or learned estimators advise physical machines and converters, deterministic hardware interlocks and verifiable audit logs must bound permissible setpoints. See how these models connect to network-level state estimation in\{' '\}\
          <Link href="/digital-twins">Physics-informed digital twins</Link>.\
        </p>\
      </section>\
    </main>\
  );\
\}\
`\
);\
\
write(\
  'app/digital-twins/page.tsx',\
  `import type \{ Metadata \} from 'next';\
import Link from 'next/link';\
import DomainNav from '../components/DomainNav';\
import Plate from '../components/Plate';\
import \{ SITE_URL \} from '../lib/site';\
\
export const metadata: Metadata = \{\
  title: 'Physics-Informed Modelling & Grid Digital Twins',\
  description:\
    'Coupling AC power-flow equations, Kirchhoff conservation laws, CIM/CGMES network graphs, and machine learning for credible power-system digital twins.',\
  alternates: \{ canonical: '/digital-twins' \},\
  openGraph: \{\
    title: 'Physics-Informed Modelling & Grid Digital Twins',\
    description:\
      'Network state estimation, CGMES topology graphs, and physics-constrained learning for electrical infrastructure.',\
    url: SITE_URL + '/digital-twins',\
    images: [\{ url: SITE_URL + '/images/electrical/04-physics-informed-digital-twin-grid.jpg', width: 1168, height: 784 \}],\
  \},\
\};\
\
export default function DigitalTwinsPage() \{\
  return (\
    <main className="doc doc-wide">\
      <DomainNav current="/digital-twins" />\
\
      <section className="blk blk-first">\
        <p className="kicker">Pillar 03 \'b7 Conservation Laws & Hybrid Estimation</p>\
        <h1 className="h1">Physics-informed modelling and power-system digital twins</h1>\
        <p className="lead">\
          Black-box statistical models extrapolate poorly during grid faults \'97 the exact regime where operators rely on them most. Embedding admittance matrices, Kirchhoff balance laws, and thermal differential equations directly into digital twins keeps estimates physically admissible.\
        </p>\
        <Plate\
          src="/images/cool/05-physics-meets-hardware.jpg"\
          alt="Physics equations and waveforms meeting substation hardware"\
          code="TWIN 01 \'b7 CONSERVATION LAWS & HARDWARE"\
          caption="Coupling electromagnetic and differential-algebraic power-system equations with field telemetry."\
          priority\
        />\
      </section>\
\
      <section className="blk" aria-labelledby="topology">\
        <h2 id="topology" className="blk-h">Network digital twins & contingency state estimation</h2>\
        <p>\
          A credible grid digital twin maintains live structural alignment with breaker and disconnector states via CIM/CGMES profiles while solving weighted least-squares or hybrid state estimation across SCADA and synchrophasor measurements. With a physically consistent base case, N-1 thermal and voltage contingencies can be screened continuously.\
        </p>\
        <div className="plate-pair">\
          <Plate\
            src="/images/electrical/04-physics-informed-digital-twin-grid.jpg"\
            alt="Physics-informed digital twin of a power grid with substations and power flows"\
            code="TWIN 02 \'b7 COUPLED POWER-FLOW GRAPH"\
            caption="Substation node-breaker topology mapped onto real-time active and reactive power-flow corridors."\
            sizes="(max-width: 680px) 100vw, 410px"\
            compact\
          />\
          <Plate\
            src="/images/critical/03-physics-informed-grid-digital-twin.jpg"\
            alt="Physics-informed digital twin of a power grid"\
            code="TWIN 03 \'b7 CONTINGENCY & CAPACITY TWIN"\
            caption="Evaluating feeder headroom, voltage stability margins, and topological reconfigurations."\
            sizes="(max-width: 680px) 100vw, 410px"\
            compact\
          />\
        </div>\
      </section>\
\
      <section className="blk" aria-labelledby="hybrid">\
        <h2 id="hybrid" className="blk-h">Physics-informed learning & long-horizon architecture</h2>\
        <p>\
          Graph neural networks and physics-informed surrogates accelerate AC optimal power flow screening and dynamic stability margin estimation only when penalized or projected onto hard network equations. Surrogates propose candidates; exact Newton-Raphson power flow and time-domain electromagnetic solvers verify binding constraints.\
        </p>\
        <div className="plate-pair">\
          <Plate\
            src="/images/electrical/10-physics-informed-ai-power-systems.jpg"\
            alt="Physics-informed AI merging neural networks with electrical circuit and power flow models"\
            code="TWIN 04 \'b7 HYBRID GRAPH & CIRCUIT MODELS"\
            caption="Neural message passing constrained by nodal admittance matrices and branch thermal limits."\
            sizes="(max-width: 680px) 100vw, 410px"\
            compact\
          />\
          <Plate\
            src="/images/critical/10-future-physics-informed-power-systems.jpg"\
            alt="Future of power systems with physics-informed AI and digital twins"\
            code="TWIN 05 \'b7 SYSTEM-SCALE COORDINATION"\
            caption="Physics-grounded intelligence spanning bulk transmission, traction feeders, and high-density loads."\
            sizes="(max-width: 680px) 100vw, 410px"\
            compact\
          />\
        </div>\
        <p className="underlined-links">\
          Inspect the runnable cross-domain smart-grid ontology testbed in the\{' '\}\
          <Link href="/simulator">CIM\'96ThreMA Simulator</Link> or read the capacity analysis in\{' '\}\
          <Link href="/articles/ai-is-power-bound">AI infrastructure is power-bound</Link>.\
        </p>\
      </section>\
    </main>\
  );\
\}\
`\
);\
\
write(\
  'app/articles/page.tsx',\
  `import type \{ Metadata \} from 'next';\
import Link from 'next/link';\
import DomainNav from '../components/DomainNav';\
import Plate from '../components/Plate';\
import \{ articles \} from '../lib/electrical';\
import \{ SITE_URL \} from '../lib/site';\
\
export const metadata: Metadata = \{\
  title: 'Technical Articles',\
  description:\
    'Technical articles on 50 Hz synchronous grid inertia, IT/OT convergence in railway traction power, and electrical capacity bottlenecks for AI infrastructure.',\
  alternates: \{ canonical: '/articles' \},\
  openGraph: \{\
    title: 'Technical Articles \'97 Electrical Grids, Traction Power & Capacity',\
    description:\
      'Explainers on grid inertia, IT/OT convergence in critical infrastructure, and power-capacity envelopes.',\
    url: SITE_URL + '/articles',\
    images: [\{ url: SITE_URL + '/images/electrical/05-grid-inertia-frequency-stability.jpg', width: 1168, height: 784 \}],\
  \},\
\};\
\
export default function ArticlesIndexPage() \{\
  return (\
    <main className="doc doc-wide">\
      <DomainNav current="/articles" />\
\
      <section className="blk blk-first">\
        <p className="kicker">Domain Explainers & Analyses</p>\
        <h1 className="h1">Technical articles</h1>\
        <p className="lead">\
          Architectural notes examining physical constraints in 50 Hz transmission grids, railway traction IT/OT systems, and high-density compute interconnections.\
        </p>\
\
        <ol className="entries">\
          \{articles.map((a, idx) => (\
            <li key=\{a.slug\} className="entry">\
              <Plate\
                src=\{a.heroImage\}\
                alt=\{a.heroAlt\}\
                code=\{a.heroCode\}\
                priority=\{idx === 0\}\
              />\
              <h2>\
                <Link href=\{'/articles/' + a.slug\}>\{a.title\}</Link>\
              </h2>\
              <p className="entry-kind">\
                \{a.kicker\} \'b7 \{a.readingTime\} \'b7 <time dateTime=\{a.date\}>\{a.date\}</time>\
              </p>\
              <p>\{a.summary\}</p>\
              <p className="tags">\
                \{a.tags.map((t) => (\
                  <span key=\{t\} className="tag">\
                    \{t\}\
                  </span>\
                ))\}\
              </p>\
            </li>\
          ))\}\
        </ol>\
      </section>\
    </main>\
  );\
\}\
`\
);\
\
write(\
  'app/articles/[slug]/page.tsx',\
  `import type \{ Metadata \} from 'next';\
import Link from 'next/link';\
import \{ notFound \} from 'next/navigation';\
import DomainNav from '../../components/DomainNav';\
import Plate from '../../components/Plate';\
import \{ ArticleJsonLd \} from '../../components/JsonLd';\
import \{ articles, getArticle \} from '../../lib/electrical';\
import \{ SITE_URL \} from '../../lib/site';\
\
type Props = \{ params: \{ slug: string \} \};\
\
export const revalidate = 3600;\
export const dynamicParams = false;\
\
export function generateStaticParams() \{\
  return articles.map((a) => (\{ slug: a.slug \}));\
\}\
\
export function generateMetadata(\{ params \}: Props): Metadata \{\
  const a = getArticle(params.slug);\
  if (!a) return \{\};\
  return \{\
    title: a.title,\
    description: a.summary,\
    alternates: \{ canonical: '/articles/' + a.slug \},\
    openGraph: \{\
      title: a.title,\
      description: a.summary,\
      url: SITE_URL + '/articles/' + a.slug,\
      type: 'article',\
      publishedTime: a.date,\
      images: [\{ url: SITE_URL + a.heroImage, width: 1168, height: 784, alt: a.heroAlt \}],\
    \},\
  \};\
\}\
\
export default function ArticlePage(\{ params \}: Props) \{\
  const a = getArticle(params.slug);\
  if (!a) notFound();\
\
  return (\
    <main className="doc">\
      <DomainNav current="/articles" />\
\
      <article className="blk blk-first">\
        <p className="kicker">\
          <Link href="/articles">\uc0\u8592  Articles</Link> \'b7 \{a.readingTime\} \'b7\{' '\}\
          <time dateTime=\{a.date\}>\{a.date\}</time>\
        </p>\
        <h1 className="h1">\{a.title\}</h1>\
        <p className="lead">\{a.summary\}</p>\
\
        <Plate\
          src=\{a.heroImage\}\
          alt=\{a.heroAlt\}\
          code=\{a.heroCode\}\
          caption=\{a.heroCaption\}\
          priority\
        />\
\
        \{a.sections.map((sec, idx) => (\
          <section key=\{sec.heading\} className="blk">\
            <h2 className="blk-h">\{sec.heading\}</h2>\
            \{sec.paragraphs.map((p) => (\
              <p key=\{p.slice(0, 32)\}>\{p\}</p>\
            ))\}\
            \{idx === 0 && (\
              <Plate\
                src=\{a.secondaryImage\}\
                alt=\{a.secondaryAlt\}\
                code=\{a.secondaryCode\}\
                caption=\{a.secondaryCaption\}\
              />\
            )\}\
            \{idx === 1 && a.tertiaryImage && a.tertiaryAlt && (\
              <Plate\
                src=\{a.tertiaryImage\}\
                alt=\{a.tertiaryAlt\}\
                code=\{a.tertiaryCode\}\
                caption=\{a.tertiaryCaption\}\
              />\
            )\}\
          </section>\
        ))\}\
\
        <p className="tags">\
          \{a.tags.map((t) => (\
            <span key=\{t\} className="tag">\
              \{t\}\
            </span>\
          ))\}\
        </p>\
      </article>\
\
      <ArticleJsonLd\
        headline=\{a.title\}\
        description=\{a.summary\}\
        url=\{SITE_URL + '/articles/' + a.slug\}\
        image=\{SITE_URL + a.heroImage\}\
        datePublished=\{a.date\}\
      />\
    </main>\
  );\
\}\
`\
);\
\
write(\
  'app/components/SimulatorLanding.tsx',\
  `'use client';\
\
import Link from 'next/link';\
import DomainNav from './DomainNav';\
import Plate from './Plate';\
import \{ useLanguage \} from '../lib/i18n';\
import \{ pick \} from '../lib/copy';\
import \{ THESIS_DEMO \} from '../lib/site';\
\
export default function SimulatorLanding() \{\
  const \{ locale \} = useLanguage();\
  const s = pick(locale).simulator;\
\
  return (\
    <main className="doc doc-wide">\
      <DomainNav current="/simulator" />\
\
      <article className="blk blk-first">\
        <p className="kicker">\{s.kicker\}</p>\
        <h1 className="h1">\{s.title\}</h1>\
        <p className="lead">\{s.intro\}</p>\
\
        <Plate\
          src="/images/electrical/08-thesis-simulator-workspace.jpg"\
          alt="Engineering workspace with power system simulator models and research notes"\
          code="SIM 01 \'b7 THESIS MODELLING WORKSPACE"\
          caption="Coupled CIM/CGMES network topology, ThreMA threat classes, and IEEE 9-bus scenario evaluation."\
          priority\
        />\
\
        <ul className="plain">\
          \{s.what.map((w) => (\
            <li key=\{w\}>\{w\}</li>\
          ))\}\
        </ul>\
\
        <Plate\
          src="/images/cool/09-advanced-research-simulator.jpg"\
          alt="Advanced research simulator with power system models"\
          code="SIM 02 \'b7 IEEE 9-BUS CYBER-PHYSICAL TESTBED"\
          caption="Interactive node-breaker topology and cross-domain signal-to-noise mapping inspection."\
        />\
\
        <p className="actions">\
          <a className="btn" href=\{THESIS_DEMO\} rel="noopener noreferrer">\
            \{s.open\} \uc0\u8599 \
          </a>\
          <Link className="btn-quiet" href="/work/cim-threma">\
            \{s.readWriteUp\}\
          </Link>\
        </p>\
        <p className="path-line">\
          <code className="path">physics-informed.vercel.app</code>\
          <code className="path">IEEE 9-bus \'b7 CGMES + ThreMA</code>\
        </p>\
        <p className="fine">\{s.not\}</p>\
      </article>\
    </main>\
  );\
\}\
`\
);\
\
write(\
  'app/simulator/page.tsx',\
  `import type \{ Metadata \} from 'next';\
import SimulatorLanding from '../components/SimulatorLanding';\
import \{ SITE_URL \} from '../lib/site';\
\
export const metadata: Metadata = \{\
  title: 'CIM\'96ThreMA Smart-Grid Ontology Simulator',\
  description:\
    'Runnable M.Sc. thesis simulator (RWTH Aachen, 2025) linking CIM/CGMES power-grid topology to the ThreMA threat ontology on an IEEE 9-bus cyber-physical testbed.',\
  alternates: \{ canonical: '/simulator' \},\
  openGraph: \{\
    title: 'CIM\'96ThreMA Smart-Grid Ontology Simulator',\
    description:\
      'Runnable M.Sc. thesis testbed coupling CGMES substation models and cyber-threat ontologies.',\
    url: SITE_URL + '/simulator',\
    images: [\{ url: SITE_URL + '/images/electrical/08-thesis-simulator-workspace.jpg', width: 1168, height: 784 \}],\
  \},\
\};\
\
export default function SimulatorPage() \{\
  return <SimulatorLanding />;\
\}\
`\
);\
\
write(\
  'app/work/page.tsx',\
  `import type \{ Metadata \} from 'next';\
import Link from 'next/link';\
import DomainNav from '../components/DomainNav';\
import Plate from '../components/Plate';\
import \{ caseStudies, researchNotes \} from '../lib/work';\
import \{ copy \} from '../lib/copy';\
\
export const metadata: Metadata = \{\
  title: 'Work & Public Artifacts',\
  description:\
    'Publicly inspectable electrical and rail infrastructure engineering artifacts: the CIM\'96ThreMA thesis simulator and the Bahn Project Manager open-data model, alongside scoped research notes.',\
  alternates: \{ canonical: '/work' \},\
\};\
\
export const revalidate = 3600;\
\
export default function WorkPage() \{\
  const c = copy.en.work;\
  return (\
    <main className="doc doc-wide">\
      <DomainNav current="/work" />\
\
      <section className="blk blk-first">\
        <h1 className="h1">\{c.title\}</h1>\
        <p className="lead">\{c.intro\}</p>\
        <ol className="entries">\
          \{caseStudies.map((w, idx) => (\
            <li key=\{w.slug\} className="entry">\
              <Plate\
                src=\{w.image\}\
                alt=\{w.imageAlt\}\
                code=\{w.imageCode\}\
                priority=\{idx === 0\}\
              />\
              <h2>\
                <Link href=\{'/work/' + w.slug\}>\{w.name\}</Link>\
              </h2>\
              <p className="entry-kind">\{w.kind\}</p>\
              <p>\{w.description\}</p>\
              <p className="path-line">\
                \{w.paths.map((p) => (\
                  <code key=\{p\} className="path">\
                    \{p\}\
                  </code>\
                ))\}\
              </p>\
            </li>\
          ))\}\
        </ol>\
      </section>\
\
      <section className="blk" aria-labelledby="notes">\
        <h2 id="notes" className="blk-h">\
          \{c.notesHeading\}\
        </h2>\
        <p className="blk-intro">\{c.notesIntro\}</p>\
        <ul className="notes">\
          \{researchNotes.map((n) => (\
            <li key=\{n.name\}>\
              <span className="notes-name">\{n.name\}</span>\{' '\}\
              <code className="path">\{n.domain\}</code> \'97 \{n.line\}\
            </li>\
          ))\}\
        </ul>\
      </section>\
    </main>\
  );\
\}\
`\
);\
\
write(\
  'app/work/[slug]/page.tsx',\
  `import type \{ Metadata \} from 'next';\
import Link from 'next/link';\
import \{ notFound \} from 'next/navigation';\
import DomainNav from '../../components/DomainNav';\
import Plate from '../../components/Plate';\
import \{ SoftwareAppJsonLd \} from '../../components/JsonLd';\
import \{ caseStudies, getCaseStudy \} from '../../lib/work';\
import \{ copy \} from '../../lib/copy';\
import \{ SITE_URL \} from '../../lib/site';\
\
type Props = \{ params: \{ slug: string \} \};\
\
export const revalidate = 3600;\
export const dynamicParams = false;\
\
export function generateStaticParams() \{\
  return caseStudies.map((c) => (\{ slug: c.slug \}));\
\}\
\
export function generateMetadata(\{ params \}: Props): Metadata \{\
  const c = getCaseStudy(params.slug);\
  if (!c) return \{\};\
  return \{\
    title: c.title,\
    description: c.description,\
    alternates: \{ canonical: '/work/' + c.slug \},\
    openGraph: \{\
      title: c.title,\
      description: c.description,\
      url: SITE_URL + '/work/' + c.slug,\
      type: 'article',\
      images: [\{ url: SITE_URL + c.image, width: 1168, height: 784, alt: c.imageAlt \}],\
    \},\
  \};\
\}\
\
export default function CaseStudyPage(\{ params \}: Props) \{\
  const w = getCaseStudy(params.slug);\
  if (!w) notFound();\
  const c = copy.en.work;\
\
  return (\
    <main className="doc">\
      <DomainNav current="/work" />\
\
      <article className="blk blk-first">\
        <p className="kicker">\
          <Link href="/work">\{c.back\}</Link>\
        </p>\
        <h1 className="h1">\{w.title\}</h1>\
        <p className="entry-kind">\{w.kind\}</p>\
        <p className="lead">\{w.description\}</p>\
\
        <Plate\
          src=\{w.image\}\
          alt=\{w.imageAlt\}\
          code=\{w.imageCode\}\
          priority\
        />\
\
        <p className="path-line">\
          \{w.paths.map((p) => (\
            <code key=\{p\} className="path">\
              \{p\}\
            </code>\
          ))\}\
        </p>\
\
        <h2 className="blk-h">\{c.problem\}</h2>\
        <p>\{w.problem\}</p>\
\
        <h2 className="blk-h">\{c.approach\}</h2>\
        <p>\{w.approach\}</p>\
\
        <h2 className="blk-h">\{c.validation\}</h2>\
        <p>\{w.validation\}</p>\
\
        <h2 className="blk-h">\{c.limits\}</h2>\
        <p>\{w.limits\}</p>\
\
        <p className="tags">\
          \{w.stack.map((s) => (\
            <span key=\{s\} className="tag">\
              \{s\}\
            </span>\
          ))\}\
        </p>\
\
        <p className="actions">\
          \{w.live && (\
            <a className="btn" href=\{w.live\} rel="noopener noreferrer">\
              \{c.openLive\} \uc0\u8599 \
            </a>\
          )\}\
          \{w.repo && (\
            <a className="btn-quiet" href=\{w.repo\} rel="noopener noreferrer">\
              \{c.openRepo\} \uc0\u8599 \
            </a>\
          )\}\
        </p>\
      </article>\
\
      <SoftwareAppJsonLd\
        name=\{w.name\}\
        description=\{w.description\}\
        url=\{SITE_URL + '/work/' + w.slug\}\
        repo=\{w.repo\}\
        live=\{w.live\}\
      />\
    </main>\
  );\
\}\
`\
);\
\
write(\
  'app/registry/page.tsx',\
  `import type \{ Metadata \} from 'next';\
import Link from 'next/link';\
import DomainNav from '../components/DomainNav';\
import \{ REGISTER_UPDATED, registerEntries \} from '../lib/register';\
\
export const metadata: Metadata = \{\
  title: 'Technical Register',\
  description:\
    'Lightweight technical register documenting public electrical and rail engineering artifacts, domain monographs, and scoped research notes \'97 available as HTML and JSON.',\
  alternates: \{ canonical: '/registry' \},\
\};\
\
export default function RegistryPage() \{\
  return (\
    <main className="doc doc-wide">\
      <DomainNav current="/registry" />\
\
      <section className="blk blk-first">\
        <p className="kicker">\
          Technical Register \'b7 Snapshot <time dateTime=\{REGISTER_UPDATED\}>\{REGISTER_UPDATED\}</time>\
        </p>\
        <h1 className="h1">Technical register</h1>\
        <p className="lead">\
          A transparent index of public deployments, open-source repositories, technical monographs, and unpublished research notes across electrical grids, traction power, machines, and digital twins.\
        </p>\
\
        <div className="tbl-wrap">\
          <table className="tbl reg">\
            <thead>\
              <tr>\
                <th scope="col">Entry</th>\
                <th scope="col">Pillar</th>\
                <th scope="col">Class</th>\
                <th scope="col">Scope & Verification Boundary</th>\
              </tr>\
            </thead>\
            <tbody>\
              \{registerEntries.map((r) => (\
                <tr key=\{r.id\}>\
                  <th scope="row">\
                    <Link href=\{'/registry/' + r.id\}>\{r.name\}</Link>\
                  </th>\
                  <td data-label="Pillar">\{r.pillar\}</td>\
                  <td data-label="Class">\
                    <code className="path">\{r.status\}</code>\
                  </td>\
                  <td data-label="Scope">\{r.summary\}</td>\
                </tr>\
              ))\}\
            </tbody>\
          </table>\
        </div>\
\
        <p className="blk-more underlined-links">\
          Machine-readable distribution: <a href="/api/register">/api/register (JSON)</a> \'b7\{' '\}\
          <a href="/llms.txt">/llms.txt</a>\
        </p>\
      </section>\
    </main>\
  );\
\}\
`\
);\
\
write(\
  'app/registry/[id]/page.tsx',\
  `import type \{ Metadata \} from 'next';\
import Link from 'next/link';\
import \{ notFound \} from 'next/navigation';\
import DomainNav from '../../components/DomainNav';\
import \{ getRegisterEntry, registerEntries \} from '../../lib/register';\
import \{ SITE_URL \} from '../../lib/site';\
\
type Props = \{ params: \{ id: string \} \};\
\
export const dynamicParams = false;\
\
export function generateStaticParams() \{\
  return registerEntries.map((e) => (\{ id: e.id \}));\
\}\
\
export function generateMetadata(\{ params \}: Props): Metadata \{\
  const e = getRegisterEntry(params.id);\
  if (!e) return \{\};\
  return \{\
    title: e.name,\
    description: e.summary,\
    alternates: \{ canonical: '/registry/' + e.id \},\
    openGraph: \{\
      title: e.name,\
      description: e.summary,\
      url: SITE_URL + '/registry/' + e.id,\
    \},\
  \};\
\}\
\
export default function RegisterEntryPage(\{ params \}: Props) \{\
  const e = getRegisterEntry(params.id);\
  if (!e) notFound();\
\
  return (\
    <main className="doc">\
      <DomainNav current="/registry" />\
\
      <section className="blk blk-first">\
        <p className="kicker">\
          <Link href="/registry">\uc0\u8592  Technical register</Link> \'b7 \{e.pillar\}\
        </p>\
        <h1 className="h1">\{e.name\}</h1>\
        <p className="path-line">\
          <code className="path">\{e.status\}</code>\
          <code className="path">\{'updated ' + e.updated\}</code>\
        </p>\
        <p className="lead">\{e.summary\}</p>\
\
        <dl className="defs">\
          <div>\
            <dt>Technical scope</dt>\
            <dd>\{e.scope\}</dd>\
          </div>\
          <div>\
            <dt>Stated limits</dt>\
            <dd>\{e.limits\}</dd>\
          </div>\
          <div>\
            <dt>Documentation path</dt>\
            <dd className="underlined-links">\
              <Link href=\{e.internalHref\}>\{e.internalHref\}</Link>\
            </dd>\
          </div>\
          \{e.publicUrl && (\
            <div>\
              <dt>Public artifact</dt>\
              <dd className="underlined-links">\
                <a href=\{e.publicUrl\} rel="noopener noreferrer">\
                  \{e.publicUrl\} \uc0\u8599 \
                </a>\
              </dd>\
            </div>\
          )\}\
        </dl>\
      </section>\
    </main>\
  );\
\}\
`\
);\
\
write(\
  'app/api/register/route.ts',\
  `import \{ NextResponse \} from 'next/server';\
import \{ SITE_NAME, SITE_URL \} from '../../lib/site';\
import \{ REGISTER_UPDATED, registerEntries \} from '../../lib/register';\
import \{ articles, pillarCards \} from '../../lib/electrical';\
\
export const dynamic = 'force-static';\
\
export function GET() \{\
  return NextResponse.json(\
    \{\
      schema: 'https://igrimaldi.engineering/api/register',\
      operator: SITE_NAME,\
      site: SITE_URL,\
      updated: REGISTER_UPDATED,\
      domain: 'Electrical grids, railway traction power, electrical machines, and physics-informed digital twins',\
      pillars: pillarCards.map((p) => (\{\
        slug: p.slug,\
        url: SITE_URL + p.href,\
        title: p.title,\
        image: SITE_URL + p.image,\
      \})),\
      articles: articles.map((a) => (\{\
        slug: a.slug,\
        url: SITE_URL + '/articles/' + a.slug,\
        title: a.title,\
        date: a.date,\
        heroImage: SITE_URL + a.heroImage,\
      \})),\
      entries: registerEntries,\
    \},\
    \{\
      headers: \{\
        'Cache-Control': 'public, max-age=3600, s-maxage=86400',\
      \},\
    \}\
  );\
\}\
`\
);\
\
write(\
  'app/connect/page.tsx',\
  `'use client';\
\
import Image from 'next/image';\
import ContactForm from '../components/ContactForm';\
import DomainNav from '../components/DomainNav';\
import \{ useLanguage \} from '../lib/i18n';\
import \{ pick \} from '../lib/copy';\
import \{ CITY, EMAIL, FOOTER_PORTRAIT, SITE_NAME \} from '../lib/site';\
\
export default function ConnectPage() \{\
  const \{ locale \} = useLanguage();\
  const c = pick(locale);\
\
  return (\
    <main className="doc">\
      <DomainNav current="/connect" />\
\
      <section className="blk blk-first" id="connect">\
        <h1 className="h1">\{c.contact.title\}</h1>\
        <div className="id connect-id">\
          <div className="id-portrait">\
            <Image\
              src=\{FOOTER_PORTRAIT\}\
              alt="Vincenzo Ceccarelli Grimaldi"\
              width=\{88\}\
              height=\{88\}\
            />\
          </div>\
          <div className="id-text">\
            <p className="name name-sm">\{SITE_NAME\}</p>\
            <p className="city">\{CITY\}</p>\
            <p className="fine">\{c.home.roleLine\}</p>\
          </div>\
        </div>\
        <p className="lead">\{c.contact.intro\}</p>\
        <ContactForm />\
        <p className="fine underlined-links">\
          \{c.contact.direct\}\{' '\}\
          <a href=\{'mailto:' + EMAIL\}>\{EMAIL\}</a>\
        </p>\
      </section>\
    </main>\
  );\
\}\
`\
);\
\
write(\
  'app/card/page.tsx',\
  `'use client';\
\
import Image from 'next/image';\
import Link from 'next/link';\
import \{ useLanguage \} from '../lib/i18n';\
import \{ pick \} from '../lib/copy';\
import \{ EMAIL, GITHUB, LINKEDIN \} from '../lib/site';\
\
export default function CardPage() \{\
  const \{ locale \} = useLanguage();\
  const c = pick(locale);\
\
  return (\
    <main className="bizcard-stage">\
      <article className="bizcard">\
        <header className="bizcard-header">\
          <div className="bizcard-portrait">\
            <Image\
              src="/vincenzo_grimaldi_headshot.jpg"\
              alt="Vincenzo Ceccarelli Grimaldi"\
              width=\{120\}\
              height=\{120\}\
              priority\
            />\
          </div>\
          <p className="kicker">\{c.card.kicker\}</p>\
          <h1>Vincenzo Ceccarelli Grimaldi</h1>\
          <p className="bizcard-role">\{c.card.role\}</p>\
          <p className="bizcard-tagline">\{c.card.tagline\}</p>\
        </header>\
\
        <div className="bizcard-rows">\
          <a className="bizcard-row" href=\{'mailto:' + EMAIL\}>\
            <span className="bizcard-row-label">\{c.card.email\}</span>\
            <span className="bizcard-row-value">\{EMAIL\}</span>\
          </a>\
          <Link className="bizcard-row" href="/">\
            <span className="bizcard-row-label">\{c.card.website\}</span>\
            <span className="bizcard-row-value">igrimaldi.engineering</span>\
          </Link>\
          <a className="bizcard-row" href=\{GITHUB\} target="_blank" rel="noopener noreferrer">\
            <span className="bizcard-row-label">\{c.card.githubLabel\}</span>\
            <span className="bizcard-row-value">github.com/iceccarelli</span>\
          </a>\
          <a className="bizcard-row" href=\{LINKEDIN\} target="_blank" rel="noopener noreferrer">\
            <span className="bizcard-row-label">LinkedIn</span>\
            <span className="bizcard-row-value">Vincenzo Ceccarelli Grimaldi</span>\
          </a>\
        </div>\
\
        <div className="bizcard-network">\
          <span className="bizcard-row-label">\{c.card.networkLabel\}</span>\
          <div className="bizcard-domains">\
            <Link href="/">igrimaldi.engineering</Link>\
            <a href="https://engineeringgrimaldi.com" target="_blank" rel="noopener noreferrer">\
              engineeringgrimaldi.com\
            </a>\
            <a href="https://grimaldi.ca" target="_blank" rel="noopener noreferrer">\
              grimaldi.ca\
            </a>\
          </div>\
        </div>\
\
        <div className="bizcard-actions">\
          <div className="bizcard-buttons">\
            <a className="btn" href="/card.vcf" download>\
              \{c.card.saveContact\}\
            </a>\
            <a className="btn-quiet" href=\{'mailto:' + EMAIL\}>\
              \{c.card.connect\}\
            </a>\
          </div>\
          <figure className="bizcard-qr">\
            \{/* eslint-disable-next-line @next/next/no-img-element */\}\
            <img src="/card/qr" alt="QR code for this business card" width=\{112\} height=\{112\} />\
            <figcaption>\{c.card.scanToShare\}</figcaption>\
          </figure>\
        </div>\
\
        <footer className="bizcard-foot">\
          <Link href="/">\{c.card.backHome\}</Link>\
        </footer>\
      </article>\
    </main>\
  );\
\}\
`\
);\
\
write(\
  'app/components/JsonLd.tsx',\
  `import \{\
  SITE_URL,\
  SITE_NAME,\
  SHORT_NAME,\
  EMAIL,\
  JOB_TITLE,\
  HEADSHOT,\
  SAME_AS,\
  EMPLOYER,\
  CITY,\
  ONE_LINE,\
\} from '../lib/site';\
\
const PERSON_ID = SITE_URL + '/#person';\
const WEBSITE_ID = SITE_URL + '/#website';\
\
const graph = \{\
  '@context': 'https://schema.org',\
  '@graph': [\
    \{\
      '@type': 'Person',\
      '@id': PERSON_ID,\
      name: SITE_NAME,\
      alternateName: SHORT_NAME,\
      url: SITE_URL + '/',\
      email: 'mailto:' + EMAIL,\
      image: HEADSHOT,\
      jobTitle: JOB_TITLE,\
      worksFor: \{ '@type': 'Organization', name: EMPLOYER \},\
      address: \{\
        '@type': 'PostalAddress',\
        addressLocality: CITY,\
        addressCountry: 'DE',\
      \},\
      alumniOf: \{ '@type': 'Organization', name: 'RWTH Aachen University' \},\
      sameAs: SAME_AS,\
      knowsAbout: [\
        'High-voltage electrical grids and substations',\
        'Railway traction power systems (16.7 Hz / 110 kV / 15 kV)',\
        'Electrical machines and stator windings',\
        'Grid-scale power electronics and converters',\
        'Physics-informed digital twins for power systems',\
        'Synchronous grid inertia and 50 Hz frequency stability',\
        'Common Information Model (CIM / CGMES) and IEC 61850',\
        'IT/OT convergence for critical infrastructure',\
      ],\
    \},\
    \{\
      '@type': 'WebSite',\
      '@id': WEBSITE_ID,\
      url: SITE_URL + '/',\
      name: SITE_NAME + ' \'97 ' + ONE_LINE,\
      alternateName: SITE_NAME,\
      publisher: \{ '@id': PERSON_ID \},\
      inLanguage: 'en',\
      about: \{\
        '@type': 'Thing',\
        name: 'Electrical Grids, Traction Power, Electrical Machines and Physics-Informed Digital Twins',\
        description:\
          'Technical monographs, runnable smart-grid ontology simulation, and open-data infrastructure models.',\
      \},\
    \},\
    \{\
      '@type': 'Dataset',\
      '@id': SITE_URL + '/#registry',\
      name: 'igrimaldi.engineering technical register',\
      description:\
        'Machine-readable register of public electrical engineering artifacts, technical pillars, articles, and scoped research notes.',\
      url: SITE_URL + '/registry',\
      creator: \{ '@id': PERSON_ID \},\
      license: 'https://creativecommons.org/licenses/by/4.0/',\
      distribution: [\
        \{\
          '@type': 'DataDownload',\
          encodingFormat: 'application/json',\
          contentUrl: SITE_URL + '/api/register',\
        \},\
      ],\
    \},\
  ],\
\};\
\
export function GlobalJsonLd() \{\
  return (\
    <script\
      type="application/ld+json"\
      dangerouslySetInnerHTML=\{\{ __html: JSON.stringify(graph) \}\}\
    />\
  );\
\}\
\
export function SoftwareAppJsonLd(props: \{\
  name: string;\
  description: string;\
  url: string;\
  repo?: string;\
  live?: string;\
\}) \{\
  const node = \{\
    '@context': 'https://schema.org',\
    '@type': 'SoftwareApplication',\
    name: props.name,\
    description: props.description,\
    url: props.url,\
    applicationCategory: 'EngineeringApplication',\
    operatingSystem: 'Web',\
    author: \{ '@id': PERSON_ID \},\
    ...(props.repo ? \{ codeRepository: props.repo \} : \{\}),\
    ...(props.live ? \{ installUrl: props.live \} : \{\}),\
  \};\
  return (\
    <script\
      type="application/ld+json"\
      dangerouslySetInnerHTML=\{\{ __html: JSON.stringify(node) \}\}\
    />\
  );\
\}\
\
export function ArticleJsonLd(props: \{\
  headline: string;\
  description: string;\
  url: string;\
  image: string;\
  datePublished: string;\
\}) \{\
  const node = \{\
    '@context': 'https://schema.org',\
    '@type': 'TechArticle',\
    headline: props.headline,\
    description: props.description,\
    url: props.url,\
    image: props.image,\
    datePublished: props.datePublished,\
    author: \{ '@id': PERSON_ID \},\
    publisher: \{ '@id': PERSON_ID \},\
  \};\
  return (\
    <script\
      type="application/ld+json"\
      dangerouslySetInnerHTML=\{\{ __html: JSON.stringify(node) \}\}\
    />\
  );\
\}\
`\
);\
\
write(\
  'app/sitemap.ts',\
  `import type \{ MetadataRoute \} from 'next';\
import \{ SITE_URL \} from './lib/site';\
import \{ caseStudies \} from './lib/work';\
import \{ articles \} from './lib/electrical';\
import \{ registerEntries \} from './lib/register';\
\
export default function sitemap(): MetadataRoute.Sitemap \{\
  const now = new Date();\
  const entry = (\
    p: string,\
    priority: number,\
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] = 'monthly'\
  ) => (\{ url: SITE_URL + p, lastModified: now, changeFrequency, priority \});\
\
  return [\
    entry('', 1, 'weekly'),\
    entry('/grids', 0.9, 'monthly'),\
    entry('/machines', 0.9, 'monthly'),\
    entry('/digital-twins', 0.9, 'monthly'),\
    entry('/articles', 0.9, 'weekly'),\
    ...articles.map((a) => entry('/articles/' + a.slug, 0.85, 'monthly')),\
    entry('/work', 0.85, 'monthly'),\
    ...caseStudies.map((c) => entry('/work/' + c.slug, 0.8, 'monthly')),\
    entry('/simulator', 0.85, 'monthly'),\
    entry('/registry', 0.8, 'weekly'),\
    ...registerEntries.map((r) => entry('/registry/' + r.id, 0.7, 'monthly')),\
    entry('/connect', 0.7, 'yearly'),\
    entry('/card', 0.5, 'yearly'),\
    entry('/impressum', 0.3, 'yearly'),\
    entry('/datenschutz', 0.3, 'yearly'),\
  ];\
\}\
`\
);\
\
write(\
  'app/llms.txt/route.ts',\
  `import \{\
  SITE_URL,\
  EMAIL,\
  SITE_NAME,\
  CITY,\
  ROLE_TITLE,\
  EMPLOYER,\
  THESIS_DEMO,\
  GITHUB,\
  LINKEDIN,\
  ONE_LINE,\
\} from '../lib/site';\
import \{ caseStudies, researchNotes \} from '../lib/work';\
import \{ articles, pillarCards \} from '../lib/electrical';\
import \{ REGISTER_UPDATED, registerEntries \} from '../lib/register';\
\
export const dynamic = 'force-static';\
\
export function GET() \{\
  const pillars = pillarCards\
    .map((p) => '- [' + p.title + '](' + SITE_URL + p.href + '): ' + p.summary)\
    .join('\\\\n');\
  const arts = articles\
    .map((a) => '- [' + a.title + '](' + SITE_URL + '/articles/' + a.slug + '): ' + a.summary)\
    .join('\\\\n');\
  const work = caseStudies\
    .map((c) => '- [' + c.name + '](' + SITE_URL + '/work/' + c.slug + '): ' + c.kind + '. ' + c.description)\
    .join('\\\\n');\
  const notes = researchNotes\
    .map((n) => '- ' + n.name + ' (' + n.domain + '): ' + n.line)\
    .join('\\\\n');\
  const reg = registerEntries\
    .map((r) => '- ' + r.id + ' [' + r.status + '] (' + SITE_URL + '/registry/' + r.id + '): ' + r.summary)\
    .join('\\\\n');\
\
  const body =\
    '# ' +\
    SITE_NAME +\
    ' \'97 ' +\
    ONE_LINE +\
    '\\\\n\\\\n' +\
    '> Independent electrical engineering site operated by ' +\
    SITE_NAME +\
    ', ' +\
    CITY +\
    ', Germany (' +\
    ROLE_TITLE +\
    ' at ' +\
    EMPLOYER +\
    '; M.Sc. RWTH Aachen University). Everything on this host is independent of and outside the scope of employer duties \'97 no employer data, systems, or confidential information are used or described. Contact: ' +\
    EMAIL +\
    '. Nothing on this site is for sale.\\\\n\\\\n' +\
    '## Core technical pillars\\\\n' +\
    pillars +\
    '\\\\n\\\\n' +\
    '## Technical articles\\\\n' +\
    arts +\
    '\\\\n\\\\n' +\
    '## Public runnable artifacts & repositories\\\\n' +\
    work +\
    '\\\\n\\\\n' +\
    '## Technical register (snapshot ' +\
    REGISTER_UPDATED +\
    ')\\\\n' +\
    reg +\
    '\\\\n\\\\n' +\
    '## Research notes & ecosystem boundaries\\\\n' +\
    notes +\
    '\\\\n- Commercial company hubs live separately at https://engineeringgrimaldi.com and https://grimaldi.ca.\\\\n\\\\n' +\
    '## Machine endpoints\\\\n' +\
    '- ' +\
    SITE_URL +\
    '/api/register \'97 JSON register of pillars, articles, and engineering artifacts\\\\n' +\
    '- ' +\
    SITE_URL +\
    '/sitemap.xml \'97 canonical URL index\\\\n\\\\n' +\
    '## Entity disambiguation\\\\n' +\
    '- Individual electrical and power-systems engineer in Frankfurt am Main, Germany.\\\\n' +\
    '- Public GitHub: ' +\
    GITHUB +\
    '\\\\n' +\
    '- Thesis simulator deployment: ' +\
    THESIS_DEMO +\
    '\\\\n' +\
    '- LinkedIn: ' +\
    LINKEDIN +\
    '\\\\n';\
\
  return new Response(body, \{\
    headers: \{\
      'Content-Type': 'text/plain; charset=utf-8',\
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',\
    \},\
  \});\
\}\
`\
);\
\
write(\
  'next.config.mjs',\
  `/** @type \{import('next').NextConfig\} */\
\
// Security headers are authoritative in vercel.json (platform edge).\
// Mirrored here so \\`next start\\` (CI, local verification) serves identical headers.\
const securityHeaders = [\
  \{ key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' \},\
  \{ key: 'X-Content-Type-Options', value: 'nosniff' \},\
  \{ key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' \},\
  \{ key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' \},\
  \{ key: 'X-Frame-Options', value: 'DENY' \},\
  \{ key: 'Access-Control-Allow-Origin', value: 'https://igrimaldi.engineering' \},\
  \{ key: 'Cross-Origin-Opener-Policy', value: 'same-origin' \},\
  \{ key: 'X-DNS-Prefetch-Control', value: 'on' \},\
  \{\
    key: 'Content-Security-Policy',\
    value:\
      "default-src 'self'; script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self' https://vitals.vercel-insights.com; frame-src 'none'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'; upgrade-insecure-requests",\
  \},\
];\
\
const nextConfig = \{\
  reactStrictMode: true,\
  poweredByHeader: false,\
  images: \{\
    formats: ['image/avif', 'image/webp'],\
  \},\
  async headers() \{\
    return [\{ source: '/:path*', headers: securityHeaders \}];\
  \},\
  async redirects() \{\
    return [\
      \{ source: '/payments', destination: '/connect', permanent: true \},\
      \{ source: '/cluster', destination: '/', permanent: true \},\
      \{ source: '/cluster/:path*', destination: '/:path*', permanent: true \},\
      \{ source: '/palletizer', destination: '/machines', permanent: true \},\
      \{ source: '/work/palletizer-os', destination: '/machines', permanent: true \},\
      \{ source: '/registry/palletizer', destination: '/registry', permanent: true \},\
      \{ source: '/registry/robot-lidar-fusion', destination: '/registry', permanent: true \},\
      \{ source: '/registry/autonomous-inspection', destination: '/registry', permanent: true \},\
      \{ source: '/registry/tamp-core', destination: '/registry', permanent: true \},\
      \{ source: '/architecture', destination: '/digital-twins', permanent: true \},\
      \{ source: '/constitution', destination: '/digital-twins', permanent: true \},\
      \{ source: '/contracts', destination: '/digital-twins', permanent: true \},\
      \{ source: '/decisions', destination: '/registry', permanent: true \},\
      \{ source: '/kill-list', destination: '/registry', permanent: true \},\
      \{ source: '/report', destination: '/articles', permanent: true \},\
      \{ source: '/report.md', destination: '/llms.txt', permanent: true \},\
      \{ source: '/research', destination: '/articles', permanent: true \},\
      \{ source: '/roadmap', destination: '/articles', permanent: true \},\
      \{ source: '/capabilities', destination: '/work', permanent: true \},\
      \{ source: '/capabilities/:path*', destination: '/work', permanent: true \},\
      \{ source: '/work/gridos', destination: '/work', permanent: true \},\
      \{ source: '/api/cluster', destination: '/api/register', permanent: true \},\
      \{ source: '/api/cluster/:path*', destination: '/api/register', permanent: true \},\
    ];\
  \},\
\};\
\
export default nextConfig;\
`\
);\
\
write(\
  'lighthouserc.json',\
  `\{\
  "ci": \{\
    "collect": \{\
      "startServerCommand": "npm run start",\
      "startServerReadyPattern": "Ready",\
      "url": [\
        "http://localhost:3000/",\
        "http://localhost:3000/grids",\
        "http://localhost:3000/machines",\
        "http://localhost:3000/digital-twins",\
        "http://localhost:3000/articles",\
        "http://localhost:3000/work",\
        "http://localhost:3000/connect"\
      ],\
      "numberOfRuns": 3,\
      "settings": \{\
        "preset": "desktop"\
      \}\
    \},\
    "assert": \{\
      "assertions": \{\
        "categories:performance": ["error", \{ "minScore": 0.9 \}],\
        "categories:accessibility": ["error", \{ "minScore": 0.95 \}],\
        "categories:seo": ["error", \{ "minScore": 0.95 \}],\
        "largest-contentful-paint": ["error", \{ "maxNumericValue": 2000 \}],\
        "cumulative-layout-shift": ["error", \{ "maxNumericValue": 0.05 \}],\
        "total-blocking-time": ["error", \{ "maxNumericValue": 200 \}]\
      \}\
    \},\
    "upload": \{ "target": "temporary-public-storage" \}\
  \}\
\}\
`\
);\
\
write(\
  '.github/workflows/ci.yml',\
  `name: CI\
\
on:\
  push:\
    branches: [main]\
  pull_request:\
\
concurrency:\
  group: ci-\\$\{\{ github.ref \}\}\
  cancel-in-progress: true\
\
jobs:\
  quality:\
    runs-on: ubuntu-latest\
    steps:\
      - uses: actions/checkout@v4\
      - uses: actions/setup-node@v4\
        with:\
          node-version: 22\
          cache: npm\
      - run: npm ci\
      - name: Typecheck\
        run: npm run typecheck\
      - name: Lint\
        run: npm run lint\
      - name: Build\
        run: npm run build\
      - name: Start production server\
        run: |\
          npm run start > /tmp/server.log 2>&1 &\
          echo $! > /tmp/server.pid\
          for i in $(seq 1 60); do\
            curl -sf -o /dev/null http://localhost:3000/ && exit 0\
            sleep 1\
          done\
          echo "server never became ready:"; cat /tmp/server.log; exit 1\
      - name: Acceptance contract\
        run: npm run verify\
      - name: Accessibility (axe)\
        run: |\
          DRIVER="\\$\{CHROMEWEBDRIVER:-/usr/local/share/chromedriver-linux64\}/chromedriver"\
          if [ ! -x "$DRIVER" ]; then\
            echo "::error::no version-matched chromedriver on this runner (looked in '$DRIVER')"\
            exit 1\
          fi\
          "$DRIVER" --version\
          npx --yes @axe-core/cli@4 --exit --chromedriver-path "$DRIVER" \\\\\
            http://localhost:3000/ \\\\\
            http://localhost:3000/grids \\\\\
            http://localhost:3000/machines \\\\\
            http://localhost:3000/digital-twins \\\\\
            http://localhost:3000/articles \\\\\
            http://localhost:3000/articles/grid-inertia-50hz \\\\\
            http://localhost:3000/articles/it-ot-traction-power \\\\\
            http://localhost:3000/articles/ai-is-power-bound \\\\\
            http://localhost:3000/registry \\\\\
            http://localhost:3000/registry/cim-threma \\\\\
            http://localhost:3000/work \\\\\
            http://localhost:3000/work/cim-threma \\\\\
            http://localhost:3000/work/bahn-project-manager \\\\\
            http://localhost:3000/simulator \\\\\
            http://localhost:3000/connect \\\\\
            http://localhost:3000/card \\\\\
            http://localhost:3000/impressum \\\\\
            http://localhost:3000/datenschutz\
      - name: Stop server\
        if: always()\
        run: kill "$(cat /tmp/server.pid)" 2>/dev/null || true\
\
  lighthouse:\
    runs-on: ubuntu-latest\
    needs: quality\
    steps:\
      - uses: actions/checkout@v4\
      - uses: actions/setup-node@v4\
        with:\
          node-version: 22\
          cache: npm\
      - run: npm ci\
      - run: npm run build\
      - name: Lighthouse CI (gates in lighthouserc.json)\
        run: npx --yes @lhci/cli@0.14.x autorun\
`\
);\
\
write(\
  'README.md',\
  `# igrimaldi.engineering \'97 Vincenzo Ceccarelli Grimaldi\
\
Personal engineering site and technical register for **Vincenzo Ceccarelli Grimaldi** (Frankfurt am Main, Germany \'b7 M.Sc. RWTH Aachen University \'b7 ITk Fachspezialist, DB InfraGO AG).\
\
## Focus Areas\
\
- **High-Voltage Grids & Railway Traction Power** (\\`/grids\\`) \'97 Substations, bulk transmission corridors, 16.7 Hz / 110 kV railway traction supply, interconnection queues, and 50 Hz synchronous inertia.\
- **Electrical Machines & Power Electronics** (\\`/machines\\`) \'97 Stator electromagnetics, copper winding thermal paths, grid-scale converters, IEC 61850 protection hardware, and deterministic safety assurance.\
- **Physics-Informed Digital Twins** (\\`/digital-twins\\`) \'97 Coupling AC power-flow equations, CIM/CGMES network topology, and hybrid state estimation.\
- **Technical Articles** (\\`/articles\\`) \'97 Domain analyses on 50 Hz inertia, IT/OT convergence in traction power, and AI data-center power capacity envelopes.\
- **Runnable Simulator & Public Artifacts** (\\`/simulator\\`, \\`/work\\`, \\`/registry\\`) \'97 RWTH Aachen CIM\'96ThreMA smart-grid ontology simulator and open-data rail portfolio model.\
\
## Visual Asset Architecture\
\
- \\`public/images/cool/\\` \'97 10 cinematic high-voltage, machine electromagnetics, traction, and simulator plates (\\`1168\'d7784\\`).\
- \\`public/images/electrical/\\` \'97 10 domain plates across substations, windings, digital twins, inertia, IT/OT, and simulator workspace (\\`1168\'d7784\\`).\
- \\`public/images/critical/\\` \'97 10 prospect and bottleneck plates covering AI power capacity envelopes, interconnection queues, traction digitisation, and assurance (\\`1168\'d7784\\`).\
- \\`public/vincenzo_grimaldi_headshot.jpg\\` & \\`public/Vincenzo_Grimaldi_footer_picture_website.jpg\\` \'97 Optimized MozJPEG portraits.\
\
## Quality & Verification Gates\
\
\\`\\`\\`bash\
npm run typecheck\
npm run lint\
npm run build\
npm run verify\
\\`\\`\\`\
\
Everything on this site is independent of, and outside the scope of, employment at DB InfraGO AG.\
`\
);\
\
// Sanitize existing auxiliary files (card/layout.tsx, card.vcf/route.ts, lib/i18n.tsx, impressum/page.tsx)\
for (const aux of [\
  'app/card/layout.tsx',\
  'app/card.vcf/route.ts',\
  'app/lib/i18n.tsx',\
  'app/impressum/page.tsx',\
]) \{\
  const fp = path.join(root, aux);\
  if (!fs.existsSync(fp)) continue;\
  let txt = fs.readFileSync(fp, 'utf8');\
  txt = txt\
    .replace(/width:\\s*2048,\\s*height:\\s*2048/g, 'width: 1024, height: 1024')\
    .replace(/Physical AI\\s*&\\s*Robotics[^'"`\\n]*/gi, 'Electrical grids, traction power, machines & physics-informed methods')\
    .replace(/Physical AI\\s*&\\s*Robotik[^'"`\\n]*/gi, 'Elektrische Netze, Bahnstrom, Maschinen & physikinformierte Methoden')\
    .replace(/Physical AI/gi, 'Electrical Engineering')\
    .replace(/robot-agnostic palletizing[^'"`\\n]*/gi, 'high-voltage grids, traction power, and physics-informed digital twins')\
    .replace(/robotics software[^'"`\\n]*/gi, 'high-voltage grids, traction power, and physics-informed modelling')\
    .replace(/palletiz[a-z]*/gi, 'power-systems');\
  fs.writeFileSync(fp, txt, 'utf8');\
  console.log('  sanitized', aux);\
\}\
\
// Append visual system CSS idempotently to app/globals.css\
const cssPath = path.join(root, 'app/globals.css');\
let css = fs.readFileSync(cssPath, 'utf8');\
const marker = '/* === ELECTRICAL VISUAL SYSTEM === */';\
if (css.includes(marker)) \{\
  css = css.slice(0, css.indexOf(marker)).trimEnd() + '\\n';\
\}\
css += `\
$\{marker\}\
.plate \{\
  margin: 1.5rem 0;\
  border: 1px solid var(--line);\
  background: var(--panel);\
\}\
\
.plate-compact \{\
  margin: 0;\
\}\
\
.plate-frame \{\
  position: relative;\
  width: 100%;\
  aspect-ratio: 1168 / 784;\
  overflow: hidden;\
  background: #0e131a;\
\}\
\
.plate-img \{\
  display: block;\
  width: 100%;\
  height: 100%;\
  object-fit: cover;\
\}\
\
.plate-cap \{\
  display: flex;\
  flex-wrap: wrap;\
  align-items: baseline;\
  gap: 0.4rem 0.75rem;\
  padding: 0.65rem 0.85rem;\
  border-top: 1px solid var(--line);\
  font-size: 0.84rem;\
  line-height: 1.45;\
  color: var(--muted);\
\}\
\
.plate-code \{\
  font-family: var(--mono);\
  font-size: 0.72rem;\
  font-weight: 600;\
  letter-spacing: 0.06em;\
  color: var(--rhine);\
  white-space: nowrap;\
\}\
\
.pillar-grid \{\
  display: grid;\
  grid-template-columns: repeat(2, minmax(0, 1fr));\
  gap: 1.75rem 1.5rem;\
  margin-top: 1.25rem;\
\}\
\
.pillar-card \{\
  display: flex;\
  flex-direction: column;\
  gap: 0.6rem;\
\}\
\
.pillar-media \{\
  display: block;\
  text-decoration: none;\
\}\
\
.pillar-media:hover .plate \{\
  border-color: var(--rhine);\
\}\
\
.pillar-title \{\
  font-family: var(--serif);\
  font-size: 1.32rem;\
  font-weight: 500;\
  line-height: 1.22;\
  margin: 0.2rem 0 0;\
\}\
\
.pillar-title a \{\
  text-decoration: underline;\
  text-decoration-color: var(--line);\
  text-underline-offset: 0.18em;\
\}\
\
.pillar-title a:hover \{\
  text-decoration-color: var(--rhine);\
\}\
\
.pillar-summary \{\
  margin: 0;\
  font-size: 0.95rem;\
  color: var(--muted);\
\}\
\
.plate-pair \{\
  display: grid;\
  grid-template-columns: repeat(2, minmax(0, 1fr));\
  gap: 1.25rem;\
  margin: 1.25rem 0 1.5rem;\
\}\
\
.underlined-links a \{\
  text-decoration: underline;\
  text-underline-offset: 0.18em;\
\}\
\
.ftr-colophon \{\
  display: flex;\
  align-items: center;\
  gap: 0.9rem;\
  padding-bottom: 1.1rem;\
  margin-bottom: 1rem;\
  border-bottom: 1px solid var(--line);\
\}\
\
.ftr-avatar \{\
  width: 56px;\
  height: 56px;\
  border-radius: 4px;\
  border: 1px solid var(--line);\
  object-fit: cover;\
  flex-shrink: 0;\
\}\
\
.ftr-author \{\
  margin: 0;\
  font-family: var(--serif);\
  font-size: 1.05rem;\
  font-weight: 500;\
  color: var(--ink);\
\}\
\
.ftr-sub \{\
  margin: 0.1rem 0 0;\
  font-size: 0.85rem;\
  color: var(--muted);\
\}\
\
.connect-id \{\
  margin: 1rem 0 1.5rem;\
\}\
\
@media (max-width: 680px) \{\
  .pillar-grid,\
  .plate-pair \{\
    grid-template-columns: 1fr;\
  \}\
\}\
`;\
fs.writeFileSync(cssPath, css, 'utf8');\
console.log('  appended visual system styles to app/globals.css');\
\
console.log('4. Removing staging folder, zip archives, and duplicate root JPEGs...');\
for (const junk of [\
  '_staging_images',\
  'igrimaldi-cool-niche-assets.zip',\
  'igrimaldi-critical-prospect-assets.zip',\
  'igrimaldi-engineering-electrical-assets.zip',\
  'vincenzo_grimaldi_headshot_best_for_profile.jpg',\
  'Vincenzo_Grimaldi_footer_picture_website.jpg',\
]) \{\
  fs.rmSync(path.join(root, junk), \{ recursive: true, force: true \});\
\}\
EOF_APPLY\
\
cat << 'EOF_VERIFY' > scripts/verify.sh\
#!/usr/bin/env bash\
# Acceptance, visual-asset, kill-list, and honesty contracts for igrimaldi.engineering.\
set -uo pipefail\
BASE="$\{1:-http://localhost:3000\}"\
fail=0\
ok()  \{ printf '  \\033[32mPASS\\033[0m %s\\n' "$1"; \}\
bad() \{ printf '  \\033[31mFAIL\\033[0m %s\\n' "$1"; fail=1; \}\
\
echo "\uc0\u9656  security headers  ($BASE)"\
H=$(curl -sSI "$BASE/" 2>/dev/null)\
for k in strict-transport-security x-content-type-options referrer-policy \\\
         permissions-policy x-frame-options content-security-policy; do\
  grep -qi "^$k:" <<<"$H" && ok "$k" || bad "$k missing"\
done\
if grep -qi 'access-control-allow-origin: \\*' <<<"$H"; then\
  bad "ACAO:* on document"\
else ok "no ACAO:*"; fi\
\
echo "\uc0\u9656  canonical crawl surface"\
PAGES=(\
  / /grids /machines /digital-twins\
  /articles /articles/grid-inertia-50hz /articles/it-ot-traction-power /articles/ai-is-power-bound\
  /work /work/cim-threma /work/bahn-project-manager\
  /simulator /registry /registry/cim-threma /registry/bahn-project-manager\
  /registry/grid-digital-twins /registry/traction-power-modelling\
  /registry/power-capacity-envelope /registry/machine-assurance\
  /connect /card /impressum /datenschutz\
  /llms.txt /robots.txt /sitemap.xml /api/register\
  /favicon.ico /apple-touch-icon.png /site.webmanifest /.well-known/security.txt\
)\
for p in "$\{PAGES[@]\}"; do\
  c=$(curl -sS -o /dev/null -w '%\{http_code\}' "$BASE$p")\
  [ "$c" = 200 ] && ok "200 $p" || bad "$c $p"\
done\
\
echo "\uc0\u9656  retired robotics & legacy routes redirect cleanly"\
for p in /palletizer /architecture /constitution /contracts /decisions /report /research /payments /capabilities /cluster /work/palletizer-os /api/cluster; do\
  c=$(curl -sS -o /dev/null -w '%\{http_code\}' "$BASE$p")\
  [ "$c" = 308 ] || [ "$c" = 301 ] && ok "$c $p (retired \uc0\u8594  redirect)" || bad "$c $p should redirect"\
done\
\
c=$(curl -sS -o /dev/null -w '%\{http_code\}' "$BASE/__definitely_not_a_route__")\
[ "$c" = 404 ] && ok "404 on unknown route" || bad "unknown route returned $c"\
\
echo "\uc0\u9656  index & structured data contract"\
N=$(curl -sS "$BASE/sitemap.xml" | grep -c '<loc>')\
[ "$N" -ge 20 ] && ok "sitemap $N URLs (>=20)" || bad "sitemap only $N URLs"\
HTML=$(curl -sS "$BASE/")\
[ "$(grep -c 'name="keywords"' <<<"$HTML")" -eq 0 ] && ok "no meta keywords" || bad "meta keywords present"\
[ "$(grep -c 'hreflang' <<<"$HTML")"        -eq 0 ] && ok "no hreflang"      || bad "hreflang present"\
[ "$(grep -c '@graph' <<<"$HTML")"          -ge 1 ] && ok "JSON-LD @graph"   || bad "JSON-LD @graph missing"\
grep -q '"@type":"Dataset"' <<<"$HTML" && ok "register published as Dataset" || bad "Dataset node missing"\
grep -q 'Electrical grids, machines, and physics-informed methods' <<<"$HTML" && ok "electrical headline in HTML" || bad "electrical headline missing"\
grep -q 'Vincenzo Ceccarelli Grimaldi' <<<"$HTML" && ok "operator name in HTML" || bad "operator name missing"\
grep -q 'ITk Fachspezialist' <<<"$HTML" && ok "role in HTML" || bad "role missing"\
grep -q 'Frankfurt am Main' <<<"$HTML" && ok "city in HTML" || bad "city missing"\
grep -q 'name="constraint"' <<<"$HTML" && ok "enquiry form present" || bad "enquiry form missing"\
\
echo "\uc0\u9656  32-image asset & placement verification"\
ALL_HTML=""\
for p in / /grids /machines /digital-twins /articles /articles/grid-inertia-50hz /articles/it-ot-traction-power /articles/ai-is-power-bound /simulator /work /work/cim-threma /work/bahn-project-manager /connect /card; do\
  ALL_HTML+="$(curl -sS "$BASE$p")"\
done\
\
ASSETS=(\
  /vincenzo_grimaldi_headshot.jpg\
  /Vincenzo_Grimaldi_footer_picture_website.jpg\
  /images/cool/01-cinematic-high-voltage-substation.jpg\
  /images/cool/02-electromagnetic-fields-machine.jpg\
  /images/cool/03-precision-stator-detail.jpg\
  /images/cool/04-live-grid-digital-twin.jpg\
  /images/cool/05-physics-meets-hardware.jpg\
  /images/cool/06-cinematic-traction-power.jpg\
  /images/cool/07-grid-scale-power-electronics.jpg\
  /images/cool/08-grid-frequency-inertia-living.jpg\
  /images/cool/09-advanced-research-simulator.jpg\
  /images/cool/10-future-grids-and-machines.jpg\
  /images/electrical/01-high-voltage-substation.jpg\
  /images/electrical/02-railway-traction-power.jpg\
  /images/electrical/03-electrical-machines-windings.jpg\
  /images/electrical/04-physics-informed-digital-twin-grid.jpg\
  /images/electrical/05-grid-inertia-frequency-stability.jpg\
  /images/electrical/06-it-ot-convergence-control-room.jpg\
  /images/electrical/07-electrical-devices-power-electronics.jpg\
  /images/electrical/08-thesis-simulator-workspace.jpg\
  /images/electrical/09-high-voltage-transmission-corridor.jpg\
  /images/electrical/10-physics-informed-ai-power-systems.jpg\
  /images/critical/01-ai-data-center-power-bottleneck.jpg\
  /images/critical/02-interconnection-queue-capacity.jpg\
  /images/critical/03-physics-informed-grid-digital-twin.jpg\
  /images/critical/04-traction-power-digitization.jpg\
  /images/critical/05-electrical-machines-electrification.jpg\
  /images/critical/06-grid-inertia-renewable-stability.jpg\
  /images/critical/07-it-ot-critical-infrastructure.jpg\
  /images/critical/08-industrial-autonomous-assurance.jpg\
  /images/critical/09-power-capacity-envelope.jpg\
  /images/critical/10-future-physics-informed-power-systems.jpg\
)\
placed=0\
for a in "$\{ASSETS[@]\}"; do\
  c=$(curl -sS -o /dev/null -w '%\{http_code\}' "$BASE$a")\
  base_file=$(basename "$a")\
  if [ "$c" = 200 ] && grep -q "$base_file" <<<"$ALL_HTML"; then\
    placed=$((placed + 1))\
  else\
    bad "asset missing or unplaced: $a (HTTP $c)"\
  fi\
done\
[ "$placed" -eq 32 ] && ok "all 32/32 optimized JPEGs return 200 and render in page markup" || bad "only $placed/32 assets verified"\
\
echo "\uc0\u9656  kill-list & honesty contracts"\
for p in / /grids /machines /digital-twins /articles /articles/grid-inertia-50hz /articles/it-ot-traction-power /articles/ai-is-power-bound /work /simulator /registry /connect /card /llms.txt; do\
  B=$(curl -sS "$BASE$p")\
  for w in 'palletiz' 'Physical AI' 'Weekly CEO report' 'Three clusters' 'robot-lidar-fusion' \\\
           'any robot arm' 'buy\\b' 'retainer' 'waitlist' 'stripe' 'cal\\.com' 'EUR\\b' '\'80' \\\
           'SIL-4' 'ASIL-D' 'curtailment' 'carousel' 'state[- ]of[- ]the[- ]art' \\\
           'enterprise[- ]ready' 'production[- ]proven' 'trillion'; do\
    grep -qiE "$w" <<<"$B" && bad "banned/kill-list token on $p: $w"\
  done\
done\
ok "zero kill-list or commercial hype tokens across all active pages and /llms.txt"\
\
REG_JSON=$(curl -sS "$BASE/api/register")\
node -e 'const j=JSON.parse(process.argv[1]); if(!j.entries || j.entries.length<6) process.exit(1);' "$REG_JSON" \\\
  && ok "valid JSON /api/register" || bad "invalid JSON /api/register"\
\
if [ "$\{READINESS:-0\}" = 1 ] || [[ "$BASE" == https://* ]]; then\
  echo "\uc0\u9656  legal readiness"\
  for p in /impressum /datenschutz; do\
    if curl -sS "$BASE$p" | grep -q 'TODO_OPERATOR'; then bad "$p still has TODO_OPERATOR placeholders"\
    else ok "$p complete"; fi\
  done\
else\
  echo "\uc0\u9656  legal readiness  (skipped \'97 run against https:// or set READINESS=1)"\
fi\
\
echo\
[ "$fail" -eq 0 ] && echo "\uc0\u10003  ALL CONTRACTS HELD" || echo "\u10007  CONTRACT VIOLATIONS \'97 see FAIL lines above"\
exit "$fail"\
EOF_VERIFY\
chmod +x scripts/verify.sh\
\
node scripts/apply-option-a.mjs\
rm -f scripts/apply-option-a.mjs\
\
echo "=== RUNNING TYPECHECK, LINT & PRODUCTION BUILD ==="\
npm run typecheck && npm run lint && npm run build\
\
echo "=== RUNNING ACCEPTANCE & 32-ASSET PLACEMENT CONTRACT ==="\
npm run start > /tmp/next-verify.log 2>&1 &\
SERVER_PID=$!\
for i in $(seq 1 30); do\
  curl -sf -o /dev/null http://localhost:3000/ && break\
  sleep 1\
done\
npm run verify\
VERIFY_EXIT=$?\
kill "$SERVER_PID" 2>/dev/null || true\
exit "$VERIFY_EXIT"}