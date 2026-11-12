import { THESIS_DEMO } from './site';

export type CaseStudy = {
  slug: string;
  name: string;
  title: string;
  kind: string;
  description: string;
  problem: string;
  approach: string;
  validation: string;
  limits: string;
  stack: string[];
  image: string;
  imageAlt: string;
  imageCode: string;
  repo?: string;
  live?: string;
  paths: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: 'cim-threma',
    name: 'CIM–ThreMA cross-domain ontology',
    title: 'CIM–ThreMA cross-domain ontology — thesis write-up',
    kind: 'M.Sc. thesis, RWTH Aachen, 2025',
    description:
      'A cross-domain ontology linking grid topology (CIM/CGMES) with a threat-modelling ontology (ThreMA), so that security analysis follows network topology changes instead of being re-derived manually. Implemented as a runnable simulator on an IEEE 9-bus cyber-physical testbed.',
    problem:
      'Grid engineering models (CIM/CGMES) and OT threat models (ThreMA) carry no shared semantics. When switching states or bay topologies change, threat analysis lags behind or must be rebuilt by hand. At substation scale, that semantic gap creates blind spots.',
    approach:
      'Five formal semantic mappings between CIM/CGMES profiles and ThreMA classes, exercised on an IEEE 9-bus cyber-physical testbed across four documented contingency scenarios. A Q-learning decision layer evaluates mitigation actions over the joint graph while a cross-domain signal-to-noise metric quantifies semantic preservation.',
    validation:
      'Validation is scoped to the IEEE 9-bus testbed and the four documented thesis scenarios. The mapping catalogue, scenario definitions, and agent parameters ship in the public deployment so results can be inspected and re-run directly.',
    limits:
      'An academic research artifact. The 9-bus testbed is intentionally compact, the scenario set is closed, and the reinforcement-learning layer demonstrates methodological feasibility rather than certified substation control.',
    stack: ['CIM / CGMES', 'ThreMA', 'IEEE 9-bus', 'Q-learning', 'Python'],
    image: '/images/electrical/08-thesis-simulator-workspace.jpg',
    imageAlt: 'Engineering workspace with power system simulator models and research notes',
    imageCode: 'WORK 01 · RWTH THESIS ARTIFACT',
    live: THESIS_DEMO,
    paths: ['physics-informed.vercel.app', 'repo path not public'],
  },
  {
    slug: 'bahn-project-manager',
    name: 'Bahn Project Manager',
    title: 'Bahn Project Manager — public-dataset portfolio application',
    kind: 'Public-dataset rail infrastructure application',
    description:
      'A typed portfolio model over an open 1,298-project rail-infrastructure dataset: technical department roll-ups, cross-project dependency views, and an automated Vitest suite built strictly on public open data.',
    problem:
      'Large rail and traction infrastructure portfolios often fragment across departmental spreadsheets, obscuring cross-discipline dependencies until manual reconciliation.',
    approach:
      'A strictly typed TypeScript data model over the open dataset, deterministic roll-ups per engineering discipline, dependency inspection views, and a Vitest verification suite written ahead of the UI.',
    validation:
      'The source repository is public and the test suite runs cleanly on a fresh clone. It demonstrates data modelling and dependency structuring over open public records.',
    limits:
      'A standalone public-dataset engineering exercise, not an enterprise system. It contains zero employer data, internal workflows, or operational connections.',
    stack: ['TypeScript', 'React', 'Vite', 'Vitest'],
    image: '/images/electrical/02-railway-traction-power.jpg',
    imageAlt: 'Railway traction power system with catenary, substations and HV equipment',
    imageCode: 'WORK 02 · PUBLIC RAIL DATASET MODEL',
    repo: 'https://github.com/iceccarelli/bahn-project-manager',
    paths: ['github.com/iceccarelli/bahn-project-manager'],
  },
];

export type ResearchNote = { name: string; domain: string; line: string };

export const researchNotes: ResearchNote[] = [
  {
    name: 'GridOS',
    domain: 'DER & distribution modelling',
    line: 'Protocol ingest, state estimation, and grid-aware dispatch loop notes. Private research codebase, unpublished.',
  },
  {
    name: 'DERIM',
    domain: 'Grid integration middleware',
    line: 'Telemetry normalization and feeder constraint coordination notes for distributed energy assets. Private, unpublished.',
  },
  {
    name: 'Time to Power / Capacity Envelope',
    domain: 'HV siting & hall capacity',
    line: 'Analytical framing for interconnection queue bottlenecking and coupled thermal-electrical data-center hall envelopes. Documented conceptually; commercial hub at engineeringgrimaldi.com.',
  },
  {
    name: 'NeuralBridge Assurance',
    domain: 'Deterministic safety evidence',
    line: 'Hash-chained audit and deterministic envelope concepts for software interacting with physical electrical and industrial equipment. Private notes, unpublished.',
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
