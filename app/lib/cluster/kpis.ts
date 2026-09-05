import type { Kpi } from './types';

/**
 * kpis.ts — what the cluster measures, and what it has actually measured.
 *
 * `measured: null` is the honest state until a public artifact or a dated
 * customer report produces a number. The pages print "—" for null; they
 * never print a target as if it were a result.
 */

const unmeasured = null;

/** The twelve palletizing KPIs named in the mandate, in mandate order. */
export const palletizerKpis: Kpi[] = [
  {
    id: 'cycles-per-hour',
    name: 'Cycles / hour',
    definition: 'Completed pick-place cycles per hour of scheduled run time.',
    unit: 'cycles/h',
    measured: unmeasured,
    method: 'Simulation harness on a fixed fixture set first; cell telemetry (orchestrator loop) on hardware.',
  },
  {
    id: 'successful-picks',
    name: 'Successful picks',
    definition: 'Picks that place the case within tolerance without re-grip.',
    unit: 'count',
    measured: unmeasured,
    method: 'Orchestrator task log; verified by the post-place check.',
  },
  {
    id: 'failed-picks',
    name: 'Failed picks',
    definition: 'Picks aborted, dropped or placed out of tolerance.',
    unit: 'count',
    measured: unmeasured,
    method: 'Fault detector events joined to task ids.',
  },
  {
    id: 'intervention-rate',
    name: 'Intervention rate',
    definition: 'Human interventions per 1,000 cycles.',
    unit: 'per 1,000 cycles',
    measured: unmeasured,
    method: 'Operator acknowledgements in telemetry; the number that decides the economics.',
  },
  {
    id: 'changeover-time',
    name: 'Changeover time',
    definition: 'Minutes from last case of SKU set A to first case of SKU set B.',
    unit: 'min',
    measured: unmeasured,
    method: 'Pattern manager timestamps.',
  },
  {
    id: 'deployment-time',
    name: 'Deployment time',
    definition: 'Working days from site survey to first production pallet.',
    unit: 'days',
    measured: unmeasured,
    method: 'Pilot log, signed by the customer.',
  },
  {
    id: 'robot-utilization',
    name: 'Robot utilisation',
    definition: 'Share of scheduled time the arm is executing a task.',
    unit: '%',
    measured: unmeasured,
    method: 'Controller state telemetry.',
  },
  {
    id: 'gripper-utilization',
    name: 'Gripper utilisation',
    definition: 'Share of cycles using each end effector; idle tooling is cost.',
    unit: '%',
    measured: unmeasured,
    method: 'Gripper controller events.',
  },
  {
    id: 'sku-complexity',
    name: 'SKU complexity',
    definition: 'Distinct case geometries per order; mixed-SKU share.',
    unit: 'SKUs/order',
    measured: unmeasured,
    method: 'WMS CSV ingestion statistics.',
  },
  {
    id: 'downtime',
    name: 'Downtime',
    definition: 'Unscheduled minutes per shift attributable to the cell.',
    unit: 'min/shift',
    measured: unmeasured,
    method: 'Fault detector; classified by cause.',
  },
  {
    id: 'labor-savings',
    name: 'Labour savings',
    definition: 'Operator hours displaced per shift, at the customer’s loaded rate.',
    unit: 'h/shift',
    measured: unmeasured,
    method: 'Customer baseline before pilot; never a modelled figure presented as a result.',
  },
  {
    id: 'payback-period',
    name: 'Payback period',
    definition: 'Months until cumulative savings equal deployment cost.',
    unit: 'months',
    measured: unmeasured,
    method: 'Derived from the eleven KPIs above and the signed pilot invoice. Absent until then.',
  },
];

/** LiDAR-fusion benchmark metrics named in the mandate. */
export const lidarKpis: Kpi[] = [
  { id: 'precision', name: 'Precision', definition: 'Detected objects that are real, on the benchmark set.', unit: '%', measured: unmeasured, method: 'Benchmark dataset with ground truth; KITTI calibration loader exists in 0.4.0.' },
  { id: 'recall', name: 'Recall', definition: 'Real objects detected, on the benchmark set.', unit: '%', measured: unmeasured, method: 'Same benchmark run.' },
  { id: 'latency', name: 'Latency', definition: 'Wall-clock from sensor frame to fused output, p50 and p99.', unit: 'ms', measured: unmeasured, method: 'Diagnostics CLI on stated hardware; hardware named with the number.' },
  { id: 'failure-rate', name: 'Failure rate', definition: 'Frames with no valid fused output.', unit: '%', measured: unmeasured, method: 'Diagnostics CLI over the benchmark set, including degraded sequences.' },
  { id: 'localization-error', name: 'Localisation error', definition: 'Position error of fused detections against ground truth.', unit: 'cm', measured: unmeasured, method: 'Benchmark with calibrated extrinsics; error under sensor dropout reported separately.' },
  { id: 'generalization', name: 'Generalisation', definition: 'Metric change when the benchmark scene family changes.', unit: 'Δ%', measured: unmeasured, method: 'Held-out scene families; occlusion and degraded-environment subsets.' },
];

export const countMeasured = (k: Kpi[]) => k.filter((x) => x.measured !== null).length;
