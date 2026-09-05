import type { EvidenceModule, TimelineEvent } from './types';

/**
 * evidence.ts — what has actually been done, with the source of each fact.
 *
 * Every event names where the date comes from (PyPI release JSON, a
 * CHANGELOG entry, a GitHub commit, or this register). Nothing here is a
 * plan except the two `due` markers, which are dates a decision is owed.
 */

export const timeline: TimelineEvent[] = [
  { date: '2026-03-08', label: 'palletizer 0.1.0 — control stack, 40+ tests', kind: 'release', entry: 'palletizer', source: 'palletizer/CHANGELOG.md' },
  { date: '2026-04-10', label: 'robot-lidar-fusion 0.1.0 on PyPI', kind: 'release', entry: 'robot-lidar-fusion', source: 'pypi.org/project/robot-lidar-fusion' },
  { date: '2026-04-11', label: 'robot-lidar-fusion 0.2.1 on PyPI', kind: 'release', entry: 'robot-lidar-fusion', source: 'pypi.org/project/robot-lidar-fusion' },
  { date: '2026-06-20', label: 'palletizer-full-stack 0.2.0 on PyPI', kind: 'release', entry: 'palletizer', source: 'pypi.org/project/palletizer-full-stack' },
  { date: '2026-06-20', label: 'robot-lidar-fusion 0.4.0 on PyPI — SE(3) projection, KITTI loader, diagnostics CLI', kind: 'release', entry: 'robot-lidar-fusion', source: 'pypi.org/project/robot-lidar-fusion' },
  { date: '2026-07-31', label: 'palletizer last public commit (construction pack, ROS 2 reference, README)', kind: 'commit', entry: 'palletizer', source: 'github.com/iceccarelli/palletizer' },
  { date: '2026-09-05', label: 'Cluster control engine; decisions D-001…D-008; register snapshot', kind: 'decision', source: 'this register' },
  { date: '2026-09-12', label: 'Kill decision due: K-001 construction pack, K-002 ai-agent-control', kind: 'due', source: '/decisions#kill' },
  { date: '2026-09-19', label: 'Discovery target due: ten buyer conversations', kind: 'due', source: '/report#2026-W36' },
];

/**
 * The palletizer test suite as a map onto the stack. Module names are the
 * files under tests/ (test_<name>.py) at the 2026-07-31 commit. A layer with
 * no module has no test evidence — that is the point of the picture.
 */
export const palletizerTests: EvidenceModule[] = [
  { name: 'orchestrator', layer: 'controller', note: 'fixed-rate loop' },
  { name: 'motion_controller', layer: 'motion-planner' },
  { name: 'joint_synchronization', layer: 'controller' },
  { name: 'gripper_controller', layer: 'controller' },
  { name: 'planning', layer: 'task-planner' },
  { name: 'optimizer', layer: 'task-planner', note: 'stability number' },
  { name: 'native_invariants', layer: 'task-planner', note: 'C++ vs Python' },
  { name: 'construction', layer: 'task-planner', note: 'EXPERIMENT' },
  { name: 'hazard_manager', layer: 'safety' },
  { name: 'fault_detection', layer: 'safety' },
  { name: 'power', layer: 'safety', note: 'battery, thermal' },
  { name: 'communication', layer: 'telemetry' },
  { name: 'memory_management', layer: 'controller' },
  { name: 'concurrency', layer: 'controller' },
  { name: 'config', layer: 'controller' },
  { name: 'mcp_server', layer: 'task-planner', note: 'agent tools' },
];

export const EVIDENCE_SNAPSHOT = {
  date: '2026-07-31',
  pythonModulesOutsideWeb: 84,
  testModules: palletizerTests.length,
  source: 'clone of github.com/iceccarelli/palletizer at the last public commit',
};
