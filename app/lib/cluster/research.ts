import type { IntelligenceEntry, ResearchItem } from './types';

/**
 * research.ts — the research program and the external intelligence log.
 *
 * A research claim exists here only with baseline, dataset and metric named.
 * Until an experiment has run, state is OPEN and no result is quoted.
 */

export const researchProgram: ResearchItem[] = [
  { topic: 'Vision-language-action models', relevance: 'Scene understanding for mixed-SKU picking and inspection.', baseline: 'Classical detector + hand-written grasp rules', dataset: 'Palletizing fixture set (to be published)', metric: 'Successful picks, latency', state: 'OPEN' },
  { topic: 'World models', relevance: 'Predict pallet state and occlusions before a place.', baseline: 'Deterministic pallet-state tracker in palletizer', dataset: 'Simulation traces', metric: 'Placement error, stability prediction accuracy', state: 'OPEN' },
  { topic: 'Diffusion policies', relevance: 'Grasp and place trajectories.', baseline: 'Sampled motion planner', dataset: 'Simulation traces', metric: 'Cycle time, collision rate', state: 'OPEN' },
  { topic: 'Imitation learning', relevance: 'Operator demonstrations for irregular cases.', baseline: 'Rule-based pattern manager', dataset: 'Recorded demonstrations (none yet)', metric: 'Intervention rate', state: 'OPEN' },
  { topic: 'Reinforcement learning', relevance: 'Sequencing under changing SKU mix.', baseline: 'Heuristic sequencer', dataset: 'Simulated order streams', metric: 'Cycles/hour, changeover time', state: 'OPEN' },
  { topic: 'Model predictive control', relevance: 'Conveyor–arm coordination.', baseline: 'Fixed-rate orchestrator loop', dataset: 'Simulation', metric: 'Robot utilisation', state: 'OPEN' },
  { topic: 'Task and motion planning', relevance: 'Joint choice of placement and trajectory.', baseline: 'Sequential task-then-motion', dataset: 'Fixture set', metric: 'Plan success rate, planning time', state: 'OPEN' },
  { topic: 'Sensor fusion', relevance: 'The perception layer itself.', baseline: 'Single-sensor detection', dataset: 'KITTI-calibrated sequences + own benchmark', metric: 'Precision, recall, localisation error', state: 'OPEN' },
  { topic: 'Uncertainty estimation', relevance: 'Know when not to pick.', baseline: 'Confidence threshold', dataset: 'Benchmark with degraded subsets', metric: 'Failure rate at fixed recall', state: 'OPEN' },
  { topic: 'Sim-to-real', relevance: 'Trust the simulator’s KPIs.', baseline: 'Simulation only', dataset: 'Paired sim/real runs (needs a cell)', metric: 'KPI gap sim vs real', state: 'OPEN' },
  { topic: 'Active learning', relevance: 'Which failed picks to label.', baseline: 'Random sampling', dataset: 'Telemetry', metric: 'Label cost per point of recall', state: 'OPEN' },
  { topic: 'Failure recovery', relevance: 'RECOVER step of the mission.', baseline: 'Stop and call operator', dataset: 'Fault log', metric: 'Interventions avoided', state: 'OPEN' },
  { topic: 'Safe exploration', relevance: 'Learning that cannot leave the constraint set.', baseline: 'No learning in the loop', dataset: 'Simulation', metric: 'Constraint violations (must be zero)', state: 'OPEN' },
];

/** Venues and sources watched. A list of names is not intelligence; the log below is. */
export const watchlist = [
  'IEEE', 'ICRA', 'RSS', 'CoRL', 'IROS',
  'NVIDIA robotics', 'Robot manufacturers', 'Industrial automation vendors', 'ROS ecosystem',
  'Foundation models for robotics', 'Vision-language-action models', 'World models',
  'Imitation learning', 'Reinforcement learning', 'Manipulation', 'Sim-to-real', 'Digital twins',
  'Safety standards (ISO 10218, ISO/TS 15066, IEC 61508)', 'Industrial cybersecurity (IEC 62443)',
];

export const intelligenceQuestions = [
  'What is new?',
  'Is it actually better?',
  'Can we reproduce it?',
  'Does it create commercial advantage?',
  'Do we buy it, build it, partner, or ignore it?',
];

/** Empty until the first weekly cycle writes an entry. An empty log is stated, not hidden. */
export const intelligenceLog: IntelligenceEntry[] = [];

export const customerQuestions = [
  'What task costs you the most labour?',
  'How often does it occur?',
  'What is the current intervention rate?',
  'What does downtime cost?',
  'What is the current automation solution?',
  'What prevents further automation?',
  'What would a successful pilot be worth?',
];

export const customerSegments = [
  'System integrators', 'Manufacturers', 'Warehouses', 'Packaging companies', 'Logistics operators', 'Inspection companies', 'Utilities',
];
