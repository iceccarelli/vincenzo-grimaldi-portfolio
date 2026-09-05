import type { Kpi } from '../../lib/cluster/types';

/**
 * KpiCoverage — the KPI set as a strip of cells. A measured KPI shows its
 * value and unit in ink; an unmeasured one shows a dash on a hatched cell.
 * The count in the heading is the only number that exists today.
 */
export default function KpiCoverage({ kpis, href, title }: { kpis: Kpi[]; href: string; title: string }) {
  const measured = kpis.filter((k) => k.measured).length;
  return (
    <figure className="fig">
      <ul className="kpistrip" aria-label={`${title}: ${measured} of ${kpis.length} measured`}>
        {kpis.map((k) => (
          <li key={k.id} className={k.measured ? 'kpicell kpicell-on' : 'kpicell'}>
            <a href={`${href}#kpi-${k.id}`}>
              <span className="kpicell-name">{k.name}</span>
              <span className="kpicell-val">
                {k.measured ? (
                  <>
                    <strong>{k.measured.value}</strong> <span className="muted">{k.measured.unit}</span>
                  </>
                ) : (
                  <>
                    <span aria-hidden="true">—</span> <span className="muted src">unmeasured</span>
                  </>
                )}
              </span>
              <span className="kpicell-unit">{k.unit}</span>
            </a>
          </li>
        ))}
      </ul>
      <figcaption>
        {title}: <strong>{measured}</strong> of {kpis.length} measured. Hatched = no public artifact or dated report has
        produced the number yet.
      </figcaption>
    </figure>
  );
}
