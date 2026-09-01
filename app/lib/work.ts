/**
 * work.ts — case studies behind /work/[slug].
 * Facts only; every claim is either verifiable in a public repo/deployment
 * or scoped as a design statement. No employer data. Every entry carries a
 * status badge; a GitHub path that 404s is text, never a link.
 */

import type { Status } from './status';

export type CaseStudy = {
  slug: string;
  name: string;
  title: string;
  description: string;
  status: Status;
  /** true = passes the /work gate; false = route kept, listed on /lab or /ventures */
  onRegister: boolean;
  problem: string;
  approach: string;
  outcome: string;
  stack: string[];
  repo?: string;
  repoClaimed?: string;
  live?: string;
  soldOn?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: 'cim-threma',
    name: 'IEEE 9-bus explorer',
    title: 'IEEE 9-bus explorer — PINN residuals against analytical and Newton-Raphson ground truth',
    description:
      'Live deployment validating DC and AC power-flow surrogates on the IEEE 9-bus network: DC PINN vs analytical (0.0124° RMSE), AC PINN vs Newton-Raphson (0.0035°), N-1 sweep, physics-loss ablation, 25 tests, one-command report. The 2025 RWTH Aachen thesis (CIM–ThreMA ontology + RL) is background, not what the explorer currently validates.',
    status: 'SHIPPED DEMO',
    onRegister: true,
    problem:
      'Learned surrogates for power flow are fast, but nobody should trust one whose power-balance residual has not been measured against a solver they already trust.',
    approach:
      'Train DC and AC PINNs on IEEE 9-bus; compare bus angles and voltages to the exact linear solve and to Newton-Raphson; sweep all nine single-line outages; ablate the physics loss against an otherwise identical black-box model; regenerate the report (MD/JSON/TXT/PDF) with one command.',
    outcome:
      'Public deployment a stranger can run tonight, with a machine-readable report. The GitHub path github.com/iceccarelli/physics-informed returned 404 on 2026-09-01 and is not linked until it returns 200.',
    stack: ['Python', 'PINNs', 'Newton-Raphson', 'IEEE 9-bus', 'N-1'],
    live: 'https://physics-informed.vercel.app/',
    repoClaimed: 'https://github.com/iceccarelli/physics-informed',
  },
  {
    slug: 'bahn-project-manager',
    name: 'Bahn Project Manager',
    title: 'Bahn Project Manager — infrastructure portfolio app on a public-style dataset',
    description:
      'Public app on a 1,298-project infrastructure-style dataset across 14 technical departments. Not an official DB system of record.',
    status: 'CLIENT BUILD',
    onRegister: true,
    problem:
      'Infrastructure project portfolios live in spreadsheets split by department; cross-departmental dependencies and budget rollups are invisible.',
    approach:
      'Typed data model over a 1,298-project dataset, department-level rollups, dependency views, built test-first with Vitest. Built on public-style data only — no employer systems or internal data involved.',
    outcome: 'Public repository with the full data model and test suite.',
    stack: ['TypeScript', 'React 19', 'Vite', 'Vitest'],
    repo: 'https://github.com/iceccarelli/bahn-project-manager',
  },
  {
    slug: 'palletizer-os',
    name: 'Palletizer OS',
    title: 'Palletizer OS — mixed-SKU pallet planning, v0.2 heuristic',
    description:
      'Mixed-SKU pallet planning with a live optimizer. v0.2, heuristic planner. Hardware cells and pilots are sold on engineeringgrimaldi.com, not here.',
    status: 'SHIPPED',
    onRegister: false,
    problem:
      'Palletizing cells couple planning, safety and motion in vendor-locked PLC stacks; changing SKU mix means re-engineering the cell.',
    approach:
      'A heuristic mixed-SKU packing planner exposed as a web optimizer, with the control and safety layers specified for OT network constraints.',
    outcome:
      'Public repository and a live optimizer deployment. The planner is inspectable and runnable; the cell is sold on the trades domain.',
    stack: ['Python', 'Heuristic optimizer', 'v0.2'],
    repo: 'https://github.com/iceccarelli/palletizer',
    live: 'https://palletizer-app.vercel.app',
    soldOn: 'https://engineeringgrimaldi.com/',
  },
  {
    slug: 'gridos',
    name: 'GridOS',
    title: 'GridOS — DER middleware (parked)',
    description:
      'Distributed-energy-resource middleware: protocol ingest (Modbus, OPC-UA), MILP dispatch, anomaly detection and an MPC forecast loop. Parked: no public clone, no public tests.',
    status: 'PARKED',
    onRegister: false,
    problem:
      'DER fleets speak incompatible protocols and are dispatched by heuristics that ignore network constraints.',
    approach:
      'FastAPI service layer that normalizes Modbus/OPC-UA ingest, a MILP dispatch core, anomaly detection on telemetry, and a model-predictive forecast loop.',
    outcome:
      'Private codebase. The GitHub path github.com/iceccarelli/GridOS returned 404 on 2026-09-01 and is not linked. Not a product until a public clone and tests exist.',
    stack: ['FastAPI', 'Modbus', 'OPC-UA', 'MILP'],
    repoClaimed: 'https://github.com/iceccarelli/GridOS',
  },
];

export const registerStudies = caseStudies.filter((c) => c.onRegister);

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
