/**
 * registry.ts — single source of truth for capabilities and shipped work.
 *
 * Rule for this file: every capability carries a `provenance` entry naming the
 * place it was actually exercised (an employer, the thesis, or a public repo).
 * A capability with no provenance does not belong here. Nothing in this file
 * is aspirational.
 */

export type Provenance = {
  label: string;
  href?: string;
};

export type Capability = {
  domain: string;
  /** Short line describing what the domain is for, in operator terms. */
  summary: string;
  /** Concrete, checkable competencies. Protocols, methods, artefacts. */
  signals: string[];
  provenance: Provenance[];
};

export type Project = {
  name: string;
  domain: CapabilityDomain;
  summary: string;
  repo: string;
  live?: string;
  /** Published to a package index / has a public deployment. */
  status: 'shipped' | 'in-development';
  stack: string[];
};

export type CapabilityDomain =
  | 'Grid & Power Systems'
  | 'Industrial Protocols & IT/OT'
  | 'Physics-Informed Learning'
  | 'Robotics & Perception'
  | 'Agentic Middleware'
  | 'Systems Engineering';

const DB_INFRAGO: Provenance = { label: 'DB InfraGO AG' };
const THESIS: Provenance = {
  label: 'RWTH Aachen M.Sc. thesis',
  href: 'https://physics-informed.vercel.app/',
};

export const capabilities: Capability[] = [
  {
    domain: 'Grid & Power Systems',
    summary:
      'Modelling, coordinating and dispatching electrical assets — from traction substations to distributed energy resources.',
    signals: [
      'CIM / CGMES semantic modelling',
      'High-voltage traction asset digitalisation',
      'DER fleet coordination',
      'MILP battery dispatch',
      'MPC and forecast-driven control loops',
      'IEEE 9-bus cyber-physical testbed',
    ],
    provenance: [
      DB_INFRAGO,
      THESIS,
      { label: 'GridOS', href: 'https://github.com/iceccarelli/GridOS' },
      { label: 'DERIM', href: 'https://github.com/iceccarelli/derim-middleware' },
    ],
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
    provenance: [
      DB_INFRAGO,
      { label: 'GridOS', href: 'https://github.com/iceccarelli/GridOS' },
    ],
  },
  {
    domain: 'Physics-Informed Learning',
    summary:
      'Embedding governing equations and threat models into learned components so their outputs stay physically admissible.',
    signals: [
      'Physics-informed neural networks (PINNs)',
      'Reinforcement learning security agents',
      'Multi-agent RL coordination',
      'ThreMA threat-model ontology',
      'Time-series anomaly detection',
    ],
    provenance: [
      THESIS,
      {
        label: 'physics-informed',
        href: 'https://github.com/iceccarelli/physics-informed',
      },
    ],
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
    provenance: [
      {
        label: 'robot-lidar-fusion',
        href: 'https://github.com/iceccarelli/robot-lidar-fusion',
      },
    ],
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
    provenance: [
      { label: 'mcp-foundry', href: 'https://github.com/iceccarelli/mcp-foundry' },
      { label: 'NeuralBridge', href: 'https://github.com/iceccarelli/neuralbridge' },
    ],
  },
  {
    domain: 'Systems Engineering',
    summary:
      'The delivery substrate: typed services, native extensions, real-time browsers surfaces, and pipelines that publish.',
    signals: [
      'Python · FastAPI',
      'C++ via pybind11',
      'TypeScript · Next.js · React Three Fiber',
      'TimescaleDB / InfluxDB',
      'PyPI trusted publishing (OIDC)',
      'Hardware-in-the-loop test harnesses',
    ],
    provenance: [
      DB_INFRAGO,
      { label: 'GridOS', href: 'https://github.com/iceccarelli/GridOS' },
      {
        label: 'robot-lidar-fusion',
        href: 'https://github.com/iceccarelli/robot-lidar-fusion',
      },
    ],
  },
];

export const projects: Project[] = [
  {
    name: 'physics-informed',
    domain: 'Physics-Informed Learning',
    summary:
      'Interactive simulator for the cross-domain CIM + ThreMA ontology, PINN solvers, RL security agents and IEEE 9-bus cyber-physical validation.',
    repo: 'https://github.com/iceccarelli/physics-informed',
    live: 'https://physics-informed.vercel.app/',
    status: 'shipped',
    stack: ['Python', 'PINNs', 'RL', 'CIM'],
  },
  {
    name: 'GridOS',
    domain: 'Grid & Power Systems',
    summary:
      'DER middleware and control surface: protocol ingest, MILP dispatch, anomaly detection, and an MPC forecast loop.',
    repo: 'https://github.com/iceccarelli/GridOS',
    status: 'shipped',
    stack: ['FastAPI', 'Modbus', 'OPC-UA', 'MILP'],
  },
  {
    name: 'DERIM',
    domain: 'Grid & Power Systems',
    summary:
      'Distributed energy resource integration middleware focused on verifiable coordination and grid-aware execution.',
    repo: 'https://github.com/iceccarelli/derim-middleware',
    status: 'in-development',
    stack: ['Python', 'FastAPI', 'DER'],
  },
  {
    name: 'mcp-foundry',
    domain: 'Agentic Middleware',
    summary:
      'Governance layer for AI agents acting on financial systems: deterministic policy engine, signed action tokens, hash-chained audit log.',
    repo: 'https://github.com/iceccarelli/mcp-foundry',
    status: 'shipped',
    stack: ['MCP', 'JSON-RPC', 'HMAC'],
  },
  {
    name: 'robot-lidar-fusion',
    domain: 'Robotics & Perception',
    summary:
      'LiDAR-to-camera projection with SE(3) extrinsics, pinhole intrinsics, z-buffer occlusion handling and a KITTI calibration loader.',
    repo: 'https://github.com/iceccarelli/robot-lidar-fusion',
    status: 'shipped',
    stack: ['Python', 'SE(3)', 'KITTI'],
  },
  {
    name: 'NeuralBridge',
    domain: 'Agentic Middleware',
    summary:
      'AI-native middleware for human-to-model orchestration in safety-critical, physics-informed environments.',
    repo: 'https://github.com/iceccarelli/neuralbridge',
    status: 'in-development',
    stack: ['Python', 'Orchestration'],
  },
];

export const domains: CapabilityDomain[] = capabilities.map(
  (capability) => capability.domain as CapabilityDomain,
);
