import { THESIS_DEMO } from './site';

export type RegisterStatus = 'PUBLIC_DEPLOYMENT' | 'PUBLIC_REPO' | 'TECHNICAL_ARTICLE' | 'RESEARCH_NOTE';

export type RegisterEntry = {
  id: string;
  name: string;
  pillar: 'Grids & Traction' | 'Machines & Devices' | 'Physics-Informed Twins' | 'Research & Simulator';
  status: RegisterStatus;
  summary: string;
  scope: string;
  limits: string;
  publicUrl?: string;
  internalHref: string;
  updated: string;
};

export const REGISTER_UPDATED = '2026-11-12';

export const registerEntries: RegisterEntry[] = [
  {
    id: 'cim-threma',
    name: 'CIM–ThreMA Cross-Domain Ontology Simulator',
    pillar: 'Research & Simulator',
    status: 'PUBLIC_DEPLOYMENT',
    summary:
      'Runnable M.Sc. thesis simulator coupling CIM/CGMES power-grid topology with the ThreMA threat ontology on an IEEE 9-bus testbed.',
    scope: 'Five formal semantic mappings, four documented cyber-physical scenarios, Q-learning evaluation layer, and SNR fidelity metric.',
    limits: 'Academic validation on a 9-bus testbed; not an operational substation security controller.',
    publicUrl: THESIS_DEMO,
    internalHref: '/work/cim-threma',
    updated: '2025-10-01',
  },
  {
    id: 'bahn-project-manager',
    name: 'Bahn Project Manager (Open Rail Dataset)',
    pillar: 'Grids & Traction',
    status: 'PUBLIC_REPO',
    summary:
      'Typed engineering portfolio model and Vitest verification suite over a public 1,298-project rail infrastructure dataset.',
    scope: 'Departmental roll-ups, cross-discipline dependency graphs, and schema validation using open public data only.',
    limits: 'Open-data modelling study; independent of and unconnected to any rail operator system.',
    publicUrl: 'https://github.com/iceccarelli/bahn-project-manager',
    internalHref: '/work/bahn-project-manager',
    updated: '2026-03-15',
  },
  {
    id: 'grid-digital-twins',
    name: 'Physics-Informed Grid Digital Twins Monograph',
    pillar: 'Physics-Informed Twins',
    status: 'TECHNICAL_ARTICLE',
    summary:
      'Architectural synthesis of AC power-flow conservation laws, CGMES network graphs, and hybrid state estimation.',
    scope: 'Covers observability under sparse phasor telemetry, contingency screening, and physical consistency constraints.',
    limits: 'Methodological domain documentation; references no proprietary utility network models.',
    internalHref: '/digital-twins',
    updated: '2026-11-09',
  },
  {
    id: 'traction-power-modelling',
    name: 'HV Grids, 50 Hz Inertia & Traction Digitisation Notes',
    pillar: 'Grids & Traction',
    status: 'TECHNICAL_ARTICLE',
    summary:
      'Technical analyses on synchronous inertia at 50 Hz, 16.7 Hz railway traction interfaces, and IT/OT zone-conduit governance.',
    scope: 'Swing-equation energy budgets, grid-forming DC-link headroom, and IEC 61850 / CIM semantic continuity.',
    limits: 'General electrical-engineering analysis written strictly from public standards and open literature.',
    internalHref: '/grids',
    updated: '2026-11-09',
  },
  {
    id: 'power-capacity-envelope',
    name: 'AI Time-to-Power & Hall Capacity Envelope Framing',
    pillar: 'Physics-Informed Twins',
    status: 'RESEARCH_NOTE',
    summary:
      'Coupled electrical-thermal envelope modelling for transformer hot-spot limits, feeder selectivity, and interconnection queues.',
    scope: 'Illustrates binding physical constraints governing high-density compute siting and energization timelines.',
    limits: 'Conceptual engineering note; commercial entities are separate at engineeringgrimaldi.com.',
    internalHref: '/articles/ai-is-power-bound',
    updated: '2026-11-09',
  },
  {
    id: 'machine-assurance',
    name: 'Electrical Machines, Converters & Deterministic Assurance',
    pillar: 'Machines & Devices',
    status: 'RESEARCH_NOTE',
    summary:
      'Stator electromagnetics, high-power semiconductor converter limits, and hash-chained assurance concepts for safety-critical equipment.',
    scope: 'Examines thermal-magnetic machine boundaries alongside deterministic verification envelopes for control software.',
    limits: 'Architectural study; makes zero certification claims against IEC 61508 or EN 50128.',
    internalHref: '/machines',
    updated: '2026-11-09',
  },
];

export function getRegisterEntry(id: string): RegisterEntry | undefined {
  return registerEntries.find((e) => e.id === id);
}
