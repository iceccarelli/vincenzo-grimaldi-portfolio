/**
 * work.ts — procurement-grade case studies behind /work/[slug].
 * Facts only; every claim is either verifiable in a public repo/deployment
 * or scoped as a design statement. No employer data.
 */

export type CaseStudy = {
  slug: string;
  name: string;
  title: string;
  description: string;
  problem: string;
  approach: string;
  outcome: string;
  stack: string[];
  repo?: string;
  live?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: 'cim-threma',
    name: 'CIM–ThreMA Ontology Simulator',
    title: 'CIM–ThreMA Cross-Domain Ontology Simulator',
    description:
      'Public implementation of the 2025 RWTH Aachen M.Sc. thesis: a cross-domain ontology linking grid topology (CIM/CGMES) with threat modelling (ThreMA), validated on an IEEE 9-bus cyber testbed.',
    problem:
      'Grid engineering models (CIM) and OT threat models (ThreMA) have no shared semantics, so security analysis cannot follow topology changes automatically.',
    approach:
      'Five formal semantic mappings between the two ontologies; four documented attack scenarios on an IEEE 9-bus cyber-physical testbed; a Q-learning security agent; a cross-domain signal-to-noise metric to score mapping quality.',
    outcome:
      'A browsable simulator anyone can open and run. The full mapping catalogue and scenario definitions ship in the deployment.',
    stack: ['Python', 'PINNs', 'Reinforcement Learning', 'CIM/CGMES', 'ThreMA'],
    live: 'https://physics-informed.vercel.app/',
  },
  {
    slug: 'palletizer-os',
    name: 'Palletizer OS',
    title: 'Palletizer OS — deterministic end-of-line palletizing',
    description:
      'Hardware-agnostic software foundation for end-of-line palletizing: control loops, safety logic, mixed-SKU planning and fleet telemetry, with a live optimizer.',
    problem:
      'Palletizing cells couple planning, safety and motion in vendor-locked PLC stacks; changing SKU mix means re-engineering the cell.',
    approach:
      'Deterministic control core with explicit safety interlocks, a mixed-SKU packing optimizer exposed as a service, and fleet telemetry designed for OT network constraints.',
    outcome:
      'Public repository and a live optimizer deployment. Code, not claims: the planner is inspectable and runnable.',
    stack: ['Python', 'Robotics', 'Optimization'],
    repo: 'https://github.com/iceccarelli/palletizer',
    live: 'https://palletizer-app.vercel.app',
  },
  {
    slug: 'bahn-project-manager',
    name: 'Bahn Project Manager',
    title: 'Bahn Project Manager — rail infrastructure portfolio platform',
    description:
      'Platform for managing rail infrastructure and station-development projects across 14 technical departments, driven by a 1,298-project public dataset.',
    problem:
      'Infrastructure project portfolios live in spreadsheets split by department; cross-departmental dependencies and budget rollups are invisible.',
    approach:
      'Typed data model over a 1,298-project dataset, department-level rollups, dependency views, built test-first with Vitest. Built on public data only — no employer systems or internal data involved.',
    outcome: 'Public repository with the full data model and test suite.',
    stack: ['TypeScript', 'React 19', 'Vite', 'Vitest'],
    repo: 'https://github.com/iceccarelli/bahn-project-manager',
  },
  {
    slug: 'gridos',
    name: 'GridOS',
    title: 'GridOS — DER middleware and control surface',
    description:
      'Distributed-energy-resource middleware: protocol ingest (Modbus, OPC-UA), MILP dispatch, anomaly detection and an MPC forecast loop.',
    problem:
      'DER fleets speak incompatible protocols and are dispatched by heuristics that ignore network constraints.',
    approach:
      'FastAPI service layer that normalizes Modbus/OPC-UA ingest, a MILP dispatch core, anomaly detection on telemetry, and a model-predictive forecast loop.',
    outcome: 'Private codebase; architecture and interface specifications available under NDA.',
    stack: ['FastAPI', 'Modbus', 'OPC-UA', 'MILP'],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
