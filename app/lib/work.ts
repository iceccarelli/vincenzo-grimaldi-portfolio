/**
 * work.ts — the entries behind /work and /work/[slug].
 *
 * Rules for this file:
 *   1. Every entry names its public artifact (repository, deployment or
 *      document). If nothing is public, it is a research note, not work.
 *   2. Every number is either produced by a public artifact or absent.
 *   3. No employer data, systems or internals — ever.
 */

import { THESIS_DEMO } from './site';

export type CaseStudy = {
  slug: string;
  name: string;
  title: string;
  /** Short qualifier shown next to the name in lists. */
  kind: string;
  description: string;
  problem: string;
  approach: string;
  validation: string;
  limits: string;
  stack: string[];
  repo?: string;
  live?: string;
  /** Printed in mono under the entry. Only paths a visitor can open. */
  paths: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: 'cim-threma',
    name: 'CIM–ThreMA cross-domain ontology',
    title: 'CIM–ThreMA cross-domain ontology — thesis write-up',
    kind: 'M.Sc. thesis, RWTH Aachen, 2025',
    description:
      'A cross-domain ontology linking grid topology (CIM/CGMES) with a threat-modelling ontology (ThreMA), so that security analysis can follow topology changes instead of being re-derived by hand. Implemented as a runnable simulator on an IEEE 9-bus cyber-physical testbed.',
    problem:
      'Grid engineering models (CIM/CGMES) and OT threat models (ThreMA) carry no shared semantics. When the topology changes, the threat analysis does not follow; it is redone manually or not at all. For a substation-scale system that gap is where errors live.',
    approach:
      'Five formal semantic mappings between the CIM and ThreMA ontologies, with the grid side expressed in CGMES profiles. The mappings are exercised on an IEEE 9-bus cyber-physical testbed with four documented attack scenarios. A Q-learning agent acts as the security decision layer over the joint model; a cross-domain signal-to-noise metric scores how much of each mapping survives the translation.',
    validation:
      'Validation is confined to the IEEE 9-bus testbed and the four scenarios defined in the thesis. The mapping catalogue, the scenario definitions and the agent configuration ship in the public deployment so that the results can be re-run rather than quoted. Figures are stated in the thesis, not on this site.',
    limits:
      'A research artifact. The testbed is small, the scenario set is closed, and the reinforcement-learning layer is a proof of feasibility, not a certified controller. Nothing here has been assessed against a functional-safety or security standard, and no such claim is made.',
    stack: ['CIM / CGMES', 'ThreMA', 'IEEE 9-bus', 'Q-learning', 'Python'],
    live: THESIS_DEMO,
    paths: ['physics-informed.vercel.app', 'repo path not public'],
  },
  {
    slug: 'bahn-project-manager',
    name: 'Bahn Project Manager',
    title: 'Bahn Project Manager — public-dataset portfolio application',
    kind: 'Public-dataset portfolio application',
    description:
      'A portfolio application over an open 1,298-project rail-infrastructure dataset: typed data model, department-level roll-ups, dependency views and a test suite. Built on public data only; no employer systems, data or processes are involved.',
    problem:
      'Infrastructure project portfolios tend to live in spreadsheets split by department. Cross-departmental dependencies and roll-ups are invisible until someone reconciles them by hand.',
    approach:
      'A typed model over the public dataset, roll-ups per technical department, dependency views, and a Vitest suite written before the views. The value is the data model and the tests, both of which are inspectable.',
    validation:
      'The repository is public and the test suite runs on a clone. There is no deployment claim and no operational claim: it is an application built to show how such a portfolio should be modelled.',
    limits:
      'A public-dataset exercise, not an enterprise system. It reflects no internal process of any operator and is not connected to any.',
    stack: ['TypeScript', 'React', 'Vite', 'Vitest'],
    repo: 'https://github.com/iceccarelli/bahn-project-manager',
    paths: ['github.com/iceccarelli/bahn-project-manager'],
  },
];

export type ResearchNote = { name: string; line: string };

/** Private codebases. Listed so that nothing is claimed for them. */
export const researchNotes: ResearchNote[] = [
  { name: 'GridOS', line: 'DER middleware notes: protocol ingest, dispatch, forecast loop. Private, unpublished.' },
  { name: 'DERIM', line: 'DER integration middleware notes, grid-aware coordination. Private, unpublished.' },
  { name: 'NeuralBridge', line: 'Orchestration notes for model-in-the-loop control. Private, unpublished.' },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
