/**
 * validation.ts — the numbers this domain is allowed to quote.
 *
 * Source of truth: the machine-readable report the explorer regenerates with
 *   pip install -e . && python -m physics_informed_grid.validate_ieee9
 * published at VALIDATION_JSON_URL. `getValidation()` fetches it at build /
 * revalidate time and falls back to SNAPSHOT (copied verbatim from that URL on
 * 2026-09-01) if the fetch fails or the shape drifts. The UI always says which
 * one it is showing.
 */

export const EXPLORER_URL = 'https://physics-informed.vercel.app/';
export const EXPLORER_DEMOS_URL = 'https://physics-informed.vercel.app/demos';
export const VALIDATION_JSON_URL =
  'https://physics-informed.vercel.app/validation/IEEE9_validation_report.json';
export const VALIDATION_PDF_URL =
  'https://physics-informed.vercel.app/validation/IEEE9_validation_report.pdf';
export const REPRODUCE_CMD = 'pip install -e . && python -m physics_informed_grid.validate_ieee9';

export type ValidationReport = {
  system: string;
  dc_pinn: { rmse_deg: number; max_err_deg: number; physics_residual: number };
  ground_truth_balance_residual: number;
  ac_pinn: { angle_rmse_deg: number; v_rmse_pu: number; physics_residual: number };
  n1_contingency: { secure: number; total: number };
  baseline_vs_blackbox: {
    blackbox_violation: number;
    pinn_violation: number;
    violation_ratio: number;
    rmse_ratio: number;
  };
  tests_passed: number;
};

export type ValidationSource = {
  report: ValidationReport;
  /** 'live' = fetched from VALIDATION_JSON_URL during this build/revalidate; 'snapshot' = bundled copy. */
  source: 'live' | 'snapshot';
  snapshotDate: string;
};

export const SNAPSHOT_DATE = '2026-09-01';

export const SNAPSHOT: ValidationReport = {
  system: 'IEEE 9-bus',
  dc_pinn: {
    rmse_deg: 0.012439193543774782,
    max_err_deg: 0.018791300688657125,
    physics_residual: 1.0840863978955895e-5,
  },
  ground_truth_balance_residual: 1.1102230246251565e-16,
  ac_pinn: {
    angle_rmse_deg: 0.0034528625254004763,
    v_rmse_pu: 3.432984984776846e-5,
    physics_residual: 9.642018825120106e-5,
  },
  n1_contingency: { secure: 6, total: 9 },
  baseline_vs_blackbox: {
    blackbox_violation: 0.014694434195113779,
    pinn_violation: 5.0799650415547286e-9,
    violation_ratio: 2892625.0623599826,
    rmse_ratio: 203.64212707168858,
  },
  tests_passed: 25,
};

function isNum(v: unknown): v is number {
  return typeof v === 'number' && Number.isFinite(v);
}

function isReport(v: unknown): v is ValidationReport {
  if (!v || typeof v !== 'object') return false;
  const r = v as Record<string, any>;
  return (
    isNum(r.dc_pinn?.rmse_deg) &&
    isNum(r.dc_pinn?.max_err_deg) &&
    isNum(r.dc_pinn?.physics_residual) &&
    isNum(r.ground_truth_balance_residual) &&
    isNum(r.ac_pinn?.angle_rmse_deg) &&
    isNum(r.ac_pinn?.v_rmse_pu) &&
    isNum(r.ac_pinn?.physics_residual) &&
    isNum(r.n1_contingency?.secure) &&
    isNum(r.n1_contingency?.total) &&
    isNum(r.baseline_vs_blackbox?.blackbox_violation) &&
    isNum(r.baseline_vs_blackbox?.pinn_violation) &&
    isNum(r.baseline_vs_blackbox?.violation_ratio) &&
    isNum(r.baseline_vs_blackbox?.rmse_ratio) &&
    isNum(r.tests_passed)
  );
}

/** Server-only. Never throws. */
export async function getValidation(): Promise<ValidationSource> {
  try {
    const res = await fetch(VALIDATION_JSON_URL, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(4000),
    });
    if (res.ok) {
      const json: unknown = await res.json();
      if (isReport(json)) return { report: json, source: 'live', snapshotDate: SNAPSHOT_DATE };
    }
  } catch {
    /* offline build, timeout, or shape drift — fall through to the snapshot */
  }
  return { report: SNAPSHOT, source: 'snapshot', snapshotDate: SNAPSHOT_DATE };
}

/** Compact, deterministic number formatting shared by server and client. */
export function fmtDeg(v: number, digits = 4): string {
  return `${v.toFixed(digits)}°`;
}
export function fmtSci(v: number): string {
  return v.toExponential(2).replace('e-', 'e−').replace('e+', 'e+');
}
export function fmtRatio(v: number): string {
  if (v >= 1e6) return `${(v / 1e6).toFixed(1)}M×`;
  if (v >= 1e3) return `${(v / 1e3).toFixed(0)}k×`;
  return `${v.toFixed(0)}×`;
}
