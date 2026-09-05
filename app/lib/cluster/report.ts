import type { WeeklyReport } from './types';

/**
 * report.ts — the weekly CEO report, twelve sections in mandate order.
 *
 * The latest report is first. A section with nothing to report says so;
 * it is never padded. Outcomes, not activity.
 */

export const REPORT_SECTIONS = [
  'Customer signal',
  'Hardware status',
  'Robot performance',
  'Simulation results',
  'Benchmark results',
  'Research developments',
  'Competitive threats',
  'ROI',
  'Failures',
  'Killed projects',
  'Next experiment',
  'Decision required',
] as const;

export const reports: WeeklyReport[] = [
  {
    week: '2026-W36',
    date: '2026-09-05',
    sections: [
      { heading: 'Customer signal', body: 'None recorded. Zero of the seven discovery questions has been asked to a buyer. Segments and questions are fixed on /research; the first ten conversations are the work of the coming two weeks.' },
      { heading: 'Hardware status', body: 'No hardware owned, leased or borrowed. By decision D-006 none is sought before the simulator emits the twelve KPIs.' },
      { heading: 'Robot performance', body: 'No measurement. No cell has run.' },
      { heading: 'Simulation results', body: 'Browser physics demos and a core simulation package exist in palletizer; neither emits the KPI set as JSON. No result is quoted.' },
      { heading: 'Benchmark results', body: 'None published. robot-lidar-fusion 0.4.0 has a KITTI calibration loader and a diagnostics CLI but no benchmark run on record.' },
      { heading: 'Research developments', body: 'Intelligence log is empty; the watchlist and the five questions are fixed on /research. Thirteen research topics registered, all OPEN, each with baseline, dataset and metric named.' },
      { heading: 'Competitive threats', body: 'Not assessed this week. Incumbent categories to assess first: integrator-built cell software, OEM palletizing packages, mixed-case palletizing planners.' },
      { heading: 'ROI', body: 'Not measurable. No deployment, no baseline, no invoice. Any ROI figure appearing elsewhere for this cluster is a model, not a result.' },
      { heading: 'Failures', body: 'Two register-level failures: (1) the robot-lidar-fusion repository is not public while its PyPI package is, so the package cannot be audited from source; (2) the palletizer README carries unbenchmarked compatibility, deployment-speed and readiness claims that this engine does not repeat and that should be removed at source.' },
      { heading: 'Killed projects', body: 'None killed. Two under review with a decision date of 2026-09-12: palletizer/construction (K-001) and ai-agent-control (K-002).' },
      { heading: 'Next experiment', body: 'Palletizer KPI harness: a headless simulation run over a published fixture set that writes cycles/hour, successful/failed picks, intervention proxies and changeover time to a versioned JSON file. Success = the file exists, is reproducible from a clean clone, and /palletizer reads it.' },
      { heading: 'Decision required', body: 'Three: (a) freeze or keep palletizer/construction; (b) publish the robot-lidar-fusion repository or accept that it stays package-only; (c) approve the discovery target of ten buyer conversations by 2026-09-19.' },
    ],
  },
];

export const latestReport = reports[0];
