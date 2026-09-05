import type { AgentTool, StackLayer } from './types';

/**
 * stack.ts — the target architecture and the safety gate.
 *
 * Two facts the whole cluster is built on:
 *   1. Probabilistic intelligence is separated from deterministic safety.
 *   2. No LLM or learned model may bypass the safety controls.
 */

export const mission = ['PERCEIVE', 'MODEL', 'PLAN', 'ACT', 'VERIFY', 'RECOVER', 'LEARN'] as const;

export const gate = ['PLAN', 'SIMULATE', 'VALIDATE', 'AUTHORIZE', 'EXECUTE', 'VERIFY'] as const;

export const stack: StackLayer[] = [
  { name: 'Perception', nature: 'probabilistic', role: 'Sensor fusion, detection, tracking, uncertainty.', today: 'robot-lidar-fusion 0.4.0 (projection, calibration, occlusion).' },
  { name: 'World model', nature: 'probabilistic', role: 'Scene state, object poses, pallet state, uncertainty over both.', today: 'Pallet state in palletizer planning; scene model not built.' },
  { name: 'Task planner', nature: 'probabilistic', role: 'Order sequencing, pattern selection, mixed-SKU placement.', today: 'palletizer optimizer, MissionPlanner, PatternManager.' },
  { name: 'Motion planner', nature: 'probabilistic', role: 'Collision-free trajectories for the chosen placement.', today: 'MotionController tests exist; no planner benchmark.' },
  { name: 'Simulator', nature: 'deterministic', role: 'Executes the plan in physics before any actuator moves.', today: 'core/simulation and browser Rapier demos; KPI harness pending.' },
  { name: 'Safety / constraint engine', nature: 'deterministic', role: 'Refuses anything outside limits. Cannot be argued with by a model.', today: 'HazardManager, FaultDetector; authorisation boundary by contract with NeuralBridge.' },
  { name: 'Robot controller', nature: 'deterministic', role: 'Vendor SDK or ROS 2 driver behind the RobotInterface.', today: 'RobotInterface abstraction; ROS 2 bridge examples; no certified vendor driver.' },
  { name: 'Actuation', nature: 'physical', role: 'Arm, gripper, conveyor.', today: 'None owned. Simulation first.' },
  { name: 'Telemetry', nature: 'telemetry', role: 'Every cycle, fault and intervention as a typed event.', today: 'CommunicationInterface publishes telemetry; KPI schema on /palletizer.' },
  { name: 'Failure analysis', nature: 'telemetry', role: 'Classify every failed pick and intervention by cause.', today: 'Not built.' },
  { name: 'Learning', nature: 'probabilistic', role: 'Improve planners from telemetry; never touch safety limits.', today: 'Not built. Research program on /research.' },
];

/** What an agent may and may not do in this cluster. */
export const agentTools: AgentTool[] = [
  { name: 'generate_plan', may: true, note: 'Propose a pallet plan or inspection plan. Output is a candidate, not a command.' },
  { name: 'analyze_scene', may: true, note: 'Read perception output and describe it.' },
  { name: 'propose_action', may: true, note: 'Enter the gate at PLAN. Nothing after VALIDATE is reachable from here.' },
  { name: 'retrieve_procedure', may: true, note: 'Look up a documented procedure.' },
  { name: 'diagnose_failure', may: true, note: 'Explain a failed pick or intervention from telemetry.' },
  { name: 'optimize_schedule', may: true, note: 'Re-order work; the result is validated before it is scheduled.' },
  { name: 'generate_simulation_scenario', may: true, note: 'Create test scenarios for the simulator.' },
  { name: 'command_actuator', may: false, note: 'Never. Actuators are reached only through the gate after AUTHORIZE.' },
  { name: 'modify_safety_limit', may: false, note: 'Never without human authorisation recorded in the decision log.' },
  { name: 'modify_production_behavior', may: false, note: 'Never silently. Every change is an authorised, logged deployment.' },
  { name: 'bypass_gate', may: false, note: 'Does not exist as a tool. Absence is the control.' },
];

/** The four tests an abstraction has to pass before it is written. */
export const abstractionTests = [
  'Multiple deployments need it.',
  'It reduces integration time.',
  'It reduces vendor dependence.',
  'It creates a defensible platform capability.',
];

/** Candidates for abstraction, and where each stands against the tests. */
export const abstractionCandidates: { thing: string; passes: number; note: string }[] = [
  { thing: 'Robot arms', passes: 3, note: 'RobotInterface exists. Vendor dependence reduced only once two drivers exist.' },
  { thing: 'Grippers', passes: 2, note: 'GripperController exists; second gripper type not yet needed.' },
  { thing: 'Cameras', passes: 1, note: 'Single intrinsics model. Do not abstract further yet.' },
  { thing: 'LiDAR', passes: 3, note: 'Shared across palletizing and inspection — robot-lidar-fusion is the abstraction.' },
  { thing: 'Force sensors', passes: 0, note: 'No deployment needs it. Not abstracted.' },
  { thing: 'PLCs', passes: 1, note: 'Only when a customer cell requires an interlock handshake.' },
  { thing: 'Safety systems', passes: 4, note: 'One authorisation boundary, by contract. The only abstraction that is mandatory.' },
  { thing: 'Conveyors', passes: 1, note: 'Not abstracted until a second conveyor type appears.' },
  { thing: 'End effectors', passes: 2, note: 'Folded into the gripper abstraction for now.' },
];
