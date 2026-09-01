/**
 * ieee9.ts — DC power flow on the IEEE 9-bus (WSCC) test system.
 *
 * This is the instrument behind the hero. It is not a picture of a
 * computation; it is the computation. Same bus/line data as the explorer at
 * https://physics-informed.vercel.app/demos — with the default injections the
 * angles, line flows and the 4.44e-16 p.u. balance residual reproduce that
 * page exactly (checked 2026-09-01).
 *
 * Model: P = B·θ, B_ij = −1/x_ij, B_ii = Σ 1/x_ik, θ_slack = 0, lossless.
 * Residual reported: max_i |P_i − (Bθ)_i| over non-slack buses — i.e. how
 * well the solved angles satisfy nodal power balance. For a direct linear
 * solve this is machine precision; a learned surrogate has to earn it.
 */

export type Line = { from: number; to: number; x: number };

/** 100 MVA base. Buses 1..9, gens at 1 (slack), 2, 3; loads at 5, 7, 9. */
export const IEEE9_LINES: Line[] = [
  { from: 1, to: 4, x: 0.0576 },
  { from: 4, to: 5, x: 0.092 },
  { from: 5, to: 6, x: 0.17 },
  { from: 3, to: 6, x: 0.0586 },
  { from: 6, to: 7, x: 0.1008 },
  { from: 7, to: 8, x: 0.072 },
  { from: 8, to: 2, x: 0.0625 },
  { from: 8, to: 9, x: 0.161 },
  { from: 9, to: 4, x: 0.085 },
];

export const IEEE9_DEFAULT = {
  gen2MW: 163,
  gen3MW: 85,
  load5MW: 125,
  load7MW: 90,
  load9MW: 100,
} as const;

export type Ieee9Input = {
  gen2MW: number;
  gen3MW: number;
  load5MW: number;
  load7MW: number;
  load9MW: number;
  /** Index into IEEE9_LINES of a tripped line, or null for the intact network. */
  outage: number | null;
};

export type Ieee9Result =
  | {
      ok: true;
      /** Bus voltage angles in degrees, index 0 = bus 1 (slack, 0°). */
      thetaDeg: number[];
      /** Line flows in p.u. (from → to), same order as IEEE9_LINES; NaN if tripped. */
      flowPu: number[];
      /** Slack (bus 1) injection in p.u. */
      slackPu: number;
      /** max |P − Bθ| over non-slack buses, p.u. */
      residualPu: number;
      /** Largest |flow| on any in-service line, p.u. */
      maxFlowPu: number;
    }
  | { ok: false; reason: 'islanded'; isolated: number[] };

const N = 9;

function connected(lines: Line[]): number[] {
  const seen = new Set<number>([1]);
  const stack = [1];
  while (stack.length) {
    const b = stack.pop() as number;
    for (const l of lines) {
      const other = l.from === b ? l.to : l.to === b ? l.from : null;
      if (other !== null && !seen.has(other)) {
        seen.add(other);
        stack.push(other);
      }
    }
  }
  const isolated: number[] = [];
  for (let b = 1; b <= N; b += 1) if (!seen.has(b)) isolated.push(b);
  if (isolated.length === 0) return isolated;
  // Report the smaller island — if the slack got cut off, the slack is the island.
  const slackIsland = Array.from(seen).sort((a, b) => a - b);
  return slackIsland.length < isolated.length ? slackIsland : isolated;
}

/** Gaussian elimination with partial pivoting on a dense (n × n) system. */
function solve(A: number[][], b: number[]): number[] {
  const n = b.length;
  const m = A.map((row, i) => [...row, b[i]]);
  for (let c = 0; c < n; c += 1) {
    let p = c;
    for (let r = c + 1; r < n; r += 1) if (Math.abs(m[r][c]) > Math.abs(m[p][c])) p = r;
    [m[c], m[p]] = [m[p], m[c]];
    const pivot = m[c][c];
    for (let r = 0; r < n; r += 1) {
      if (r === c) continue;
      const f = m[r][c] / pivot;
      if (f === 0) continue;
      for (let k = c; k <= n; k += 1) m[r][k] -= f * m[c][k];
    }
  }
  return m.map((row, i) => row[n] / row[i]);
}

export function solveDC(input: Ieee9Input): Ieee9Result {
  const lines = IEEE9_LINES.filter((_, i) => i !== input.outage);
  const isolated = connected(lines);
  if (isolated.length) return { ok: false, reason: 'islanded', isolated };

  const P = new Array<number>(N).fill(0);
  P[1] = input.gen2MW / 100;
  P[2] = input.gen3MW / 100;
  P[4] = -input.load5MW / 100;
  P[6] = -input.load7MW / 100;
  P[8] = -input.load9MW / 100;

  const B: number[][] = Array.from({ length: N }, () => new Array<number>(N).fill(0));
  for (const l of lines) {
    const i = l.from - 1;
    const j = l.to - 1;
    const y = 1 / l.x;
    B[i][i] += y;
    B[j][j] += y;
    B[i][j] -= y;
    B[j][i] -= y;
  }

  // Reduce out the slack bus (index 0).
  const idx = [1, 2, 3, 4, 5, 6, 7, 8];
  const A = idx.map((i) => idx.map((j) => B[i][j]));
  const rhs = idx.map((i) => P[i]);
  const thetaRed = solve(A, rhs);
  const theta = [0, ...thetaRed];

  const Bt = B.map((row) => row.reduce((s, v, j) => s + v * theta[j], 0));
  let residual = 0;
  for (const i of idx) residual = Math.max(residual, Math.abs(Bt[i] - P[i]));

  const flowPu = IEEE9_LINES.map((l, i) =>
    i === input.outage ? Number.NaN : (theta[l.from - 1] - theta[l.to - 1]) / l.x,
  );
  const maxFlowPu = flowPu.reduce((m, f) => (Number.isNaN(f) ? m : Math.max(m, Math.abs(f))), 0);

  return {
    ok: true,
    thetaDeg: theta.map((t) => (t * 180) / Math.PI),
    flowPu,
    slackPu: Bt[0],
    residualPu: residual,
    maxFlowPu,
  };
}

/** N-1 sweep over all nine lines: how many single outages leave a solvable, connected network. */
export function n1Sweep(base: Omit<Ieee9Input, 'outage'>): { secure: number; total: number; islanding: number[] } {
  const islanding: number[] = [];
  for (let i = 0; i < IEEE9_LINES.length; i += 1) {
    const r = solveDC({ ...base, outage: i });
    if (!r.ok) islanding.push(i);
  }
  return { secure: IEEE9_LINES.length - islanding.length, total: IEEE9_LINES.length, islanding };
}

export function fmtExp(v: number): string {
  if (v === 0) return '0';
  return v.toExponential(2).replace('e-', 'e−');
}
