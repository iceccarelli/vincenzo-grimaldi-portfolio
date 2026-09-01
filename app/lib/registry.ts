/**
 * registry.ts — single source of truth for capabilities and artefacts.
 *
 * Rules for this file (2026-09 IA):
 *
 * 1. Every capability carries a `provenance` entry naming the place it was
 *    actually exercised. A capability with no provenance does not belong here.
 * 2. Every project carries a `status` from status.ts and a `shelf`:
 *      work     → passes the /work gate (200 URL + honest badge + serves
 *                 grids / traction / verification / CIM / PINN / IT-OT)
 *      ventures → real, opened by real users, off-niche or client build
 *      lab      → parked; nothing a stranger can open, or a product that
 *                 belongs to another domain
 * 3. `repo` is set ONLY when a stranger can open it (raw README returned 200
 *    on 2026-09-01). A path that was claimed and 404s goes in `repoClaimed`
 *    and is rendered as text, never as a link (see status.ts GITHUB_404).
 */

import type { Status } from './status';

export type Provenance = {
  label: string;
  href?: string;
  /** The named artefact is parked — the label is rendered with a PARKED hint. */
  parked?: boolean;
};

export type Capability = {
  domain: string;
  summary: string;
  signals: string[];
  provenance: Provenance[];
};

export type Shelf = 'work' | 'ventures' | 'lab';

export type Project = {
  name: string;
  domain: CapabilityDomain;
  summary: string;
  status: Status;
  shelf: Shelf;
  /** Public repository a visitor can open (verified 200). */
  repo?: string;
  /** A GitHub path that was claimed on this domain and 404s. Text only. */
  repoClaimed?: string;
  /** A deployment anyone can open right now. */
  live?: string;
  /** Where it is sold, if not here. */
  soldOn?: string;
  /** Lab only: what actually exists, and what unlocks the shelf change. */
  exists?: string;
  unlock?: string;
  stack: string[];
};

export type CapabilityDomain =
  | 'Grid & Power Systems'
  | 'Industrial Protocols & IT/OT'
  | 'Physics-Informed Learning'
  | 'Robotics & Perception'
  | 'Agentic Middleware'
  | 'Systems Engineering';

const DB_INFRAGO: Provenance = { label: 'DB InfraGO AG (sanitized)' };
const EXPLORER: Provenance = {
  label: 'IEEE 9-bus explorer',
  href: 'https://physics-informed.vercel.app/',
};
const THESIS: Provenance = { label: 'RWTH Aachen M.Sc. thesis (background)' };

export const capabilities: Capability[] = [
  {
    domain: 'Grid & Power Systems',
    summary:
      'Modelling, coordinating and dispatching electrical assets — from traction substations to distributed energy resources.',
    signals: [
      'CIM / CGMES semantic modelling',
      'High-voltage traction asset digitalisation',
      'DC / AC power-flow validation',
      'N-1 contingency sweeps',
      'MILP battery dispatch',
      'IEEE 9-bus cyber-physical testbed',
    ],
    provenance: [DB_INFRAGO, EXPLORER, { label: 'GridOS', parked: true }, { label: 'DERIM', parked: true }],
  },
  {
    domain: 'Industrial Protocols & IT/OT',
    summary:
      'Getting field devices to speak to software without losing determinism, and keeping the boundary between the two defensible.',
    signals: [
      'Modbus TCP/RTU',
      'MQTT',
      'SunSpec',
      'OPC-UA',
      'IT/OT convergence',
      'KRITIS-aligned OT security governance',
    ],
    provenance: [DB_INFRAGO, { label: 'GridOS', parked: true }],
  },
  {
    domain: 'Physics-Informed Learning',
    summary:
      'Embedding governing equations and threat models into learned components so their outputs stay physically admissible — and measuring the residual.',
    signals: [
      'Physics-informed neural networks (PINNs)',
      'Surrogate-vs-ground-truth residual reporting',
      'Reinforcement learning security agents',
      'ThreMA threat-model ontology',
      'Physics-loss ablation',
    ],
    provenance: [EXPLORER, THESIS],
  },
  {
    domain: 'Robotics & Perception',
    summary:
      'Turning raw sensor returns into geometry a controller can act on, with the calibration maths done properly.',
    signals: [
      'LiDAR–camera extrinsic fusion',
      'SE(3) rigid-body transforms',
      'Pinhole intrinsics & z-buffer occlusion',
      'KITTI calibration ingestion',
      'URDF-driven kinematic simulation',
    ],
    provenance: [{ label: 'robot-lidar-fusion', parked: true }],
  },
  {
    domain: 'Agentic Middleware',
    summary:
      'Letting language models reach real actuators and real ledgers without giving up an audit trail or a kill switch.',
    signals: [
      'Model Context Protocol (MCP) stdio servers',
      'JSON-RPC transport design',
      'Deterministic policy engines',
      'HMAC-signed action tokens',
      'Hash-chained audit logs',
    ],
    provenance: [{ label: 'mcp-foundry', parked: true }, { label: 'NeuralBridge', parked: true }],
  },
  {
    domain: 'Systems Engineering',
    summary:
      'The delivery substrate: typed services, native extensions, real-time browser surfaces, and pipelines that publish.',
    signals: [
      'Python · FastAPI',
      'C++ via pybind11',
      'TypeScript · Next.js · React',
      'TimescaleDB / InfluxDB',
      'PyPI trusted publishing (OIDC)',
      'Hardware-in-the-loop test harnesses',
    ],
    provenance: [DB_INFRAGO, { label: 'Bahn Project Manager', href: 'https://github.com/iceccarelli/bahn-project-manager' }],
  },
];

export const projects: Project[] = [
  /* ---------------- /work — passes the gate ---------------- */
  {
    name: 'physics-informed',
    domain: 'Physics-Informed Learning',
    summary:
      'IEEE 9-bus explorer: DC PINN vs analytical, AC PINN vs Newton-Raphson, N-1 sweep, physics-loss ablation, 25 tests, one-command report.',
    status: 'SHIPPED DEMO',
    shelf: 'work',
    live: 'https://physics-informed.vercel.app/',
    repoClaimed: 'https://github.com/iceccarelli/physics-informed',
    stack: ['Python', 'PINNs', 'Newton-Raphson', 'IEEE 9-bus'],
  },
  {
    name: 'Bahn Project Manager',
    domain: 'Systems Engineering',
    summary:
      'Public app on a 1,298-project infrastructure-style dataset across 14 departments. Not an official DB system of record.',
    status: 'CLIENT BUILD',
    shelf: 'work',
    repo: 'https://github.com/iceccarelli/bahn-project-manager',
    stack: ['TypeScript', 'React 19', 'Vite', 'Vitest'],
  },

  /* ---------------- /ventures — real, off-niche ---------------- */
  {
    name: 'Palletizer OS',
    domain: 'Robotics & Perception',
    summary:
      'Mixed-SKU pallet planning with a live optimizer. v0.2, heuristic planner. Sold on the trades domain.',
    status: 'SHIPPED',
    shelf: 'ventures',
    repo: 'https://github.com/iceccarelli/palletizer',
    live: 'https://palletizer-app.vercel.app',
    soldOn: 'https://engineeringgrimaldi.com/',
    stack: ['Python', 'Heuristic optimizer', 'v0.2'],
  },
  {
    name: 'Plastilonas Peruanas SAC',
    domain: 'Systems Engineering',
    summary:
      'B2B site for an industrial-textile manufacturer: quotation-led, no invented certifications, facts from a single data layer.',
    status: 'CLIENT BUILD',
    shelf: 'ventures',
    repo: 'https://github.com/iceccarelli/Plastilonas-Peruanas-SAC',
    live: 'https://plastilonas-peruanas-sac.vercel.app/',
    stack: ['Next.js 15', 'TypeScript', 'Off-niche'],
  },
  {
    name: 'ecowoods-app',
    domain: 'Systems Engineering',
    summary:
      'Lead engine and marketplace platform for a Toronto hardwood-flooring shop established in 2000. Client channel candidate — the shop is not this practice.',
    status: 'CLIENT BUILD',
    shelf: 'ventures',
    repo: 'https://github.com/iceccarelli/ecowoods-app',
    live: 'https://ecowoods.ca/',
    stack: ['Next.js 15', 'Turborepo', 'Prisma'],
  },

  /* ---------------- /lab — parked ---------------- */
  {
    name: 'GridOS',
    domain: 'Grid & Power Systems',
    summary: 'DER middleware and control surface: protocol ingest, MILP dispatch, anomaly detection, MPC forecast loop.',
    status: 'PARKED',
    shelf: 'lab',
    repoClaimed: 'https://github.com/iceccarelli/GridOS',
    exists: 'Private tree. No public clone, no public tests.',
    unlock: 'Public repository returns 200 with a test suite a stranger can run.',
    stack: ['FastAPI', 'Modbus', 'OPC-UA', 'MILP'],
  },
  {
    name: 'DERIM',
    domain: 'Grid & Power Systems',
    summary: 'DER integration middleware for verifiable coordination and grid-aware execution.',
    status: 'PARKED',
    shelf: 'lab',
    repoClaimed: 'https://github.com/iceccarelli/derim-middleware',
    exists: 'Design notes. Thesis-adjacent.',
    unlock: 'Public repository returns 200 with a reproducible result.',
    stack: ['Python', 'FastAPI', 'DER'],
  },
  {
    name: 'NeuralBridge',
    domain: 'Agentic Middleware',
    summary: 'Middleware for human-to-model orchestration in physics-informed environments.',
    status: 'PARKED',
    shelf: 'lab',
    repoClaimed: 'https://github.com/iceccarelli/neuralbridge',
    exists: 'Concept and private prototype.',
    unlock: 'Public repository returns 200; a latency number a stranger can reproduce.',
    stack: ['Python', 'Orchestration'],
  },
  {
    name: 'mcp-foundry',
    domain: 'Agentic Middleware',
    summary: 'Governance layer for agents acting on financial systems: deterministic policy engine, signed action tokens, hash-chained audit log.',
    status: 'PARKED',
    shelf: 'lab',
    exists: 'Private tree.',
    unlock: 'Public repository returns 200.',
    stack: ['MCP', 'JSON-RPC', 'HMAC'],
  },
  {
    name: 'robot-lidar-fusion',
    domain: 'Robotics & Perception',
    summary: 'LiDAR-to-camera projection with SE(3) extrinsics, pinhole intrinsics, z-buffer occlusion, KITTI loader.',
    status: 'PARKED',
    shelf: 'lab',
    repoClaimed: 'https://github.com/iceccarelli/robot-lidar-fusion',
    exists: 'Private tree.',
    unlock: 'Public repository returns 200.',
    stack: ['Python', 'SE(3)', 'KITTI'],
  },
  {
    name: 'ForgeOS',
    domain: 'Robotics & Perception',
    summary: 'Robotic operating layer behind the Forge Line on engineeringgrimaldi.com.',
    status: 'PARKED',
    shelf: 'lab',
    soldOn: 'https://engineeringgrimaldi.com/',
    exists: 'Private tree; product story lives on the trades domain.',
    unlock: 'A shipped cell on engineeringgrimaldi.com with a measured number.',
    stack: ['TypeScript', 'Robotics'],
  },
  {
    name: 'FloorForge AI',
    domain: 'Robotics & Perception',
    summary: 'Hardwood-floor refinishing automation — waitlist site and repository; pilot programme forming.',
    status: 'PILOT',
    shelf: 'lab',
    repo: 'https://github.com/iceccarelli/floorforge-ai',
    soldOn: 'https://engineeringgrimaldi.com/',
    exists: 'Public repository (marketing + waitlist).',
    unlock: 'A measured pilot on the trades domain.',
    stack: ['TypeScript', 'Trades'],
  },
  {
    name: 'PaintForge AI',
    domain: 'Robotics & Perception',
    summary: 'Interior-finishing automation — repository with pilot recruitment; figures are engineering targets, not results.',
    status: 'PILOT',
    shelf: 'lab',
    repo: 'https://github.com/iceccarelli/paintforge-ai',
    soldOn: 'https://engineeringgrimaldi.com/',
    exists: 'Public repository (pilot recruitment).',
    unlock: 'A measured pilot on the trades domain.',
    stack: ['TypeScript', 'Trades'],
  },
  {
    name: 'DryForge AI',
    domain: 'Robotics & Perception',
    summary: 'Drywall-finishing automation as a service — pre-launch repository.',
    status: 'PILOT',
    shelf: 'lab',
    repo: 'https://github.com/iceccarelli/dryforge-ai',
    soldOn: 'https://engineeringgrimaldi.com/',
    exists: 'Public repository (pre-launch).',
    unlock: 'A measured pilot on the trades domain.',
    stack: ['TypeScript', 'Trades'],
  },
  {
    name: 'GridForge AI',
    domain: 'Grid & Power Systems',
    summary: 'Behind-the-meter power for data-center campuses: on-site generation, DC microgrids, hybrid storage.',
    status: 'PARKED',
    shelf: 'lab',
    exists: 'Concept.',
    unlock: 'A public model with a residual a stranger can regenerate.',
    stack: ['Microgrids', 'Storage'],
  },
  {
    name: 'ForgePower Semi',
    domain: 'Grid & Power Systems',
    summary: 'SiC / GaN power modules and rack-level power delivery for accelerator racks.',
    status: 'PARKED',
    shelf: 'lab',
    exists: 'Concept.',
    unlock: 'A measured board on engineeringgrimaldi.com.',
    stack: ['SiC/GaN', 'Power electronics'],
  },
  {
    name: 'ThermalForge',
    domain: 'Grid & Power Systems',
    summary: 'Liquid-cooling and thermal–power co-optimisation for high-density racks.',
    status: 'PARKED',
    shelf: 'lab',
    exists: 'Concept.',
    unlock: 'A measured loop on engineeringgrimaldi.com.',
    stack: ['Liquid cooling', 'Thermal'],
  },
];

export const domains: CapabilityDomain[] = capabilities.map(
  (capability) => capability.domain as CapabilityDomain,
);

export const byShelf = (shelf: Shelf) => projects.filter((p) => p.shelf === shelf);
