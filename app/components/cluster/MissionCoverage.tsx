import { MISSION } from '../../lib/cluster/types';
import { owned } from '../../lib/cluster/registry';

/**
 * MissionCoverage — which register entries cover which mission stage with
 * code that exists today. A filled cell is a claim the entry's public
 * artifact can back; an empty stage column is a gap, stated as a number.
 * An HTML table: the picture and the accessible structure are the same thing.
 */
export default function MissionCoverage({ compact = false }: { compact?: boolean }) {
  const rows = compact ? owned.filter((e) => e.stages.length > 0 || e.status === 'CORE') : owned;
  const totals = MISSION.map((s) => owned.filter((e) => e.stages.includes(s)).length);
  const covered = totals.filter((t) => t > 0).length;

  return (
    <figure className="fig">
      <div className="tbl-wrap" tabIndex={0}>
        <table className="tbl cov">
          <caption>
            Mission coverage — {covered} of {MISSION.length} stages have code behind them
          </caption>
          <thead>
            <tr>
              <th scope="col">Entry</th>
              {MISSION.map((s) => (
                <th key={s} scope="col" className="cov-h">
                  {s}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((e) => (
              <tr key={e.id}>
                <th scope="row">
                  <a href={`/registry/${e.id}`}>{e.id}</a>
                </th>
                {MISSION.map((s) => {
                  const on = e.stages.includes(s);
                  return (
                    <td key={s} className={on ? 'cov-on' : 'cov-off'}>
                      <span aria-label={`${s}: ${on ? 'covered' : 'not covered'}`}>{on ? '■' : '·'}</span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th scope="row">entries per stage</th>
              {totals.map((t, i) => (
                <td key={MISSION[i]} className={t ? 'num' : 'num cov-gap'}>
                  {t}
                </td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>
      <figcaption>
        ■ = the entry’s existing public code covers the stage. ACT, RECOVER and LEARN have no code behind them in this
        cluster; that is the honest shape of the work so far.
      </figcaption>
    </figure>
  );
}
