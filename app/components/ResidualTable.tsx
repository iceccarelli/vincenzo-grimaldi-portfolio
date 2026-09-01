'use client';

import { useLanguage } from '../lib/i18n';
import { simulator, tx } from '../lib/copy';
import {
  REPRODUCE_CMD,
  VALIDATION_JSON_URL,
  VALIDATION_PDF_URL,
  fmtDeg,
  fmtRatio,
  fmtSci,
  type ValidationSource,
} from '../lib/validation';

/**
 * ResidualTable — the explorer's validation report as a table. Static
 * fallback for /simulator when nothing else loads: every number is either
 * fetched from the report JSON at build/revalidate time or from the dated
 * bundled snapshot, and the caption says which.
 */
export default function ResidualTable({ validation }: { validation: ValidationSource }) {
  const { locale } = useLanguage();
  const r = validation.report;
  const rows: { q: string; v: string; m: string; signal?: boolean }[] = [
    { q: tx(simulator.rowDcRmse, locale), v: fmtDeg(r.dc_pinn.rmse_deg), m: tx(simulator.rowDcRmseMeaning, locale), signal: true },
    { q: tx(simulator.rowDcMax, locale), v: fmtDeg(r.dc_pinn.max_err_deg), m: tx(simulator.rowDcMaxMeaning, locale) },
    { q: tx(simulator.rowDcRes, locale), v: `${fmtSci(r.dc_pinn.physics_residual)} p.u.`, m: tx(simulator.rowDcResMeaning, locale) },
    { q: tx(simulator.rowGt, locale), v: `${fmtSci(r.ground_truth_balance_residual)} p.u.`, m: tx(simulator.rowGtMeaning, locale) },
    { q: tx(simulator.rowAcRmse, locale), v: fmtDeg(r.ac_pinn.angle_rmse_deg), m: tx(simulator.rowAcRmseMeaning, locale), signal: true },
    { q: tx(simulator.rowAcV, locale), v: `${fmtSci(r.ac_pinn.v_rmse_pu)} p.u.`, m: tx(simulator.rowAcVMeaning, locale) },
    { q: tx(simulator.rowAcRes, locale), v: `${fmtSci(r.ac_pinn.physics_residual)} p.u.`, m: tx(simulator.rowAcResMeaning, locale) },
    { q: tx(simulator.rowN1, locale), v: `${r.n1_contingency.secure} / ${r.n1_contingency.total}`, m: tx(simulator.rowN1Meaning, locale) },
    {
      q: tx(simulator.rowAbl, locale),
      v: `${fmtSci(r.baseline_vs_blackbox.blackbox_violation)} → ${fmtSci(r.baseline_vs_blackbox.pinn_violation)} (${fmtRatio(r.baseline_vs_blackbox.violation_ratio)})`,
      m: tx(simulator.rowAblMeaning, locale),
    },
    { q: tx(simulator.rowTests, locale), v: String(r.tests_passed), m: tx(simulator.rowTestsMeaning, locale) },
  ];

  const sourceLabel =
    validation.source === 'live'
      ? tx({ en: 'fetched live from the explorer report', de: 'live aus dem Explorer-Report geladen' }, locale)
      : tx({ en: `snapshot of the explorer report, ${validation.snapshotDate}`, de: `Snapshot des Explorer-Reports, ${validation.snapshotDate}` }, locale);

  return (
    <div className="residual-table-wrap">
      <table className="residual-table">
        <caption>
          {r.system} · {sourceLabel}
        </caption>
        <thead>
          <tr>
            <th scope="col">{tx(simulator.colQuantity, locale)}</th>
            <th scope="col">{tx(simulator.colValue, locale)}</th>
            <th scope="col">{tx(simulator.colMeaning, locale)}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.q}>
              <th scope="row">{row.q}</th>
              <td className={row.signal ? 'residual-signal' : undefined}>{row.v}</td>
              <td>{row.m}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="residual-actions">
        <code className="residual-cmd">
          <span className="residual-cmd-label">{tx(simulator.reproduce, locale)}</span> {REPRODUCE_CMD}
        </code>
        <div className="residual-links">
          <a href={VALIDATION_JSON_URL} target="_blank" rel="noopener noreferrer">{tx(simulator.jsonLink, locale)} ↗</a>
          <a href={VALIDATION_PDF_URL} target="_blank" rel="noopener noreferrer">{tx(simulator.pdfLink, locale)} ↗</a>
        </div>
      </div>
    </div>
  );
}
