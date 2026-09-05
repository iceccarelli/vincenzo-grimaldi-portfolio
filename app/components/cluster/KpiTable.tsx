import type { Kpi } from '../../lib/cluster/types';

/**
 * KpiTable — definition, unit, measured value (or "—"), method.
 * A null measurement prints an em dash and the word "unmeasured"; a target
 * is never printed in the measured column.
 */
export default function KpiTable({ kpis, caption }: { kpis: Kpi[]; caption: string }) {
  const measured = kpis.filter((k) => k.measured).length;
  return (
    <div className="tbl-wrap" tabIndex={0}>
      <table className="tbl kpi">
        <caption>
          {caption} — {measured} of {kpis.length} measured
        </caption>
        <thead>
          <tr>
            <th scope="col">KPI</th>
            <th scope="col">Definition</th>
            <th scope="col">Measured</th>
            <th scope="col">Method</th>
          </tr>
        </thead>
        <tbody>
          {kpis.map((k) => (
            <tr key={k.id}>
              <th scope="row">
                {k.name}
                <br />
                <code className="path">{k.unit}</code>
              </th>
              <td>{k.definition}</td>
              <td className="num">
                {k.measured ? (
                  <>
                    <strong>{k.measured.value}</strong> {k.measured.unit}
                    <br />
                    <span className="muted src">
                      {k.measured.source} · <time dateTime={k.measured.date}>{k.measured.date}</time>
                    </span>
                  </>
                ) : (
                  <>
                    <span aria-hidden="true">—</span>
                    <span className="muted src"> unmeasured</span>
                  </>
                )}
              </td>
              <td>{k.method}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
