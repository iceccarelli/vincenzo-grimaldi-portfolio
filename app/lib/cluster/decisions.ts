import type { Decision, KillCriterion, KillReview } from './types';

/**
 * decisions.ts — the decision log and the kill register.
 *
 * A decision has a date, a reason and the condition under which it is
 * reversed. Nothing here is a plan; a plan lives in the weekly report.
 */

export const decisions: Decision[] = [
  {
    id: 'D-001',
    date: '2026-09-05',
    title: 'Palletizer is the first commercial candidate',
    decision: 'Robot-agnostic palletizing software is the first product target. No other robot vertical is pursued until it has a customer.',
    reason: 'Repetitive task, expensive labour, structured environment, understood failure cost, customers with budget, and the only repository in the cluster with a public package and a test suite.',
    reversibleWhen: 'Customer discovery produces evidence that a different task scores higher on labour cost × frequency × structure × budget.',
    affects: ['palletizer'],
  },
  {
    id: 'D-002',
    date: '2026-09-05',
    title: 'FloorForge, PaintForge and DryForge remain in Operations',
    decision: 'The three Forge applications are not robotics products of this cluster.',
    reason: 'None has physical robotic execution. Concept renders and simulators do not move a robot.',
    reversibleWhen: 'A Forge application executes a physical task on real hardware under the safety gate.',
    affects: ['boundaries'],
  },
  {
    id: 'D-003',
    date: '2026-09-05',
    title: 'robot-lidar-fusion is shared IP, benchmarked, not sold',
    decision: 'LiDAR–camera fusion is the perception layer for every cell and robot in the cluster. It is measured on benchmark datasets and never marketed on its own.',
    reason: 'Shared across palletizing and inspection; reduces vendor dependence; passes three of the four abstraction tests.',
    reversibleWhen: 'A customer asks to buy perception alone with a budget attached.',
    affects: ['robot-lidar-fusion'],
  },
  {
    id: 'D-004',
    date: '2026-09-05',
    title: 'Autonomous inspection is the bridge to Energy, not a product yet',
    decision: 'Electrical-infrastructure inspection is developed as research until the seven-step chain (detection → report) is demonstrated end to end.',
    reason: 'Premature commercialisation of work near HV assets is the highest-risk move in the cluster.',
    reversibleWhen: 'The chain is demonstrated with evidence and a utility or inspection company names a budget.',
    affects: ['autonomous-inspection'],
  },
  {
    id: 'D-005',
    date: '2026-09-05',
    title: 'Probabilistic intelligence is separated from deterministic safety',
    decision: 'No LLM or learned model may command an actuator, modify a safety limit, or bypass the gate. Every physical action passes PLAN → SIMULATE → VALIDATE → AUTHORIZE → EXECUTE → VERIFY.',
    reason: 'Safety that can be argued with is not safety.',
    reversibleWhen: 'Never.',
    affects: ['stack', 'palletizer-mcp', 'palletizer-ros2'],
  },
  {
    id: 'D-006',
    date: '2026-09-05',
    title: 'Simulation before hardware',
    decision: 'No hardware is bought or borrowed before the simulator emits the twelve palletizing KPIs on a fixture set.',
    reason: 'The cheapest evidence a customer will accept; the mandate forbids hardware-heavy work without a customer hypothesis.',
    reversibleWhen: 'A customer supplies the cell and pays for the pilot.',
    affects: ['palletizer-simulation'],
  },
  {
    id: 'D-007',
    date: '2026-09-05',
    title: 'igrimaldi.engineering is the control engine of this cluster',
    decision: 'This host publishes the registers of the Physical AI cluster: repository registry, architecture, KPIs, decisions, kill register, research program, weekly report and cross-cluster contracts — as pages and as JSON.',
    reason: 'The mandate requires a repository registry, architecture map, decision log, kill list, roadmap, customer evidence, competitive intelligence, research backlog and weekly KPI report. One place, machine-readable, is cheaper than nine documents.',
    reversibleWhen: 'The cluster is frozen under the kill rule.',
    affects: ['this site'],
  },
  {
    id: 'D-008',
    date: '2026-09-05',
    title: 'Abstraction only under the four tests',
    decision: 'An abstraction is written only if it passes at least two of: multiple deployments need it, it reduces integration time, it reduces vendor dependence, it creates a defensible platform capability. Safety authorisation is the one mandatory abstraction.',
    reason: 'Abstraction has a cost; robot-agnostic must be earned by a second driver, not declared.',
    reversibleWhen: 'Never; the threshold may be raised.',
    affects: ['stack'],
  },
];

export const killCriteria: KillCriterion[] = [
  { key: 'customer', label: 'A customer' },
  { key: 'task', label: 'A measurable task' },
  { key: 'ip', label: 'Unique IP' },
  { key: 'benchmark', label: 'A benchmark advantage' },
  { key: 'integration', label: 'An integration advantage' },
  { key: 'roi', label: 'A plausible ROI' },
];

/**
 * Kill register. FROZEN and ARCHIVED require a CEO decision recorded in
 * `decisions`; REVIEW is the engine asking for one.
 */
export const killRegister: KillReview[] = [
  {
    id: 'K-001',
    subject: 'palletizer/construction',
    failing: ['customer', 'task', 'benchmark', 'roi'],
    note: 'Second vertical before the first has a customer; its own changelog calls the figures illustrative. Overlaps Operations.',
    state: 'REVIEW',
    decisionBy: '2026-09-12',
  },
  {
    id: 'K-002',
    subject: 'ai-agent-control (robotics-related parts)',
    failing: ['customer', 'task', 'ip', 'benchmark', 'integration'],
    note: 'Public repository holds a one-line README and archives. No robotics module located.',
    state: 'REVIEW',
    decisionBy: '2026-09-12',
  },
];
