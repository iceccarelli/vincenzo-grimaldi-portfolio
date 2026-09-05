import StatusBadge from './StatusBadge';
import type { RegistryEntry } from '../../lib/cluster/types';
import type { LiveMeta } from '../../lib/cluster/github';

/**
 * RegistryTable — the register as a table. Each row: repository, status,
 * public artifact (or "none"), last commit with its source, technical role.
 * Wide content scrolls inside .tbl-wrap; the page never scrolls sideways.
 */
export default function RegistryTable({
  entries,
  meta,
  detailHref = true,
  compact = false,
}: {
  entries: RegistryEntry[];
  meta?: Record<string, LiveMeta>;
  detailHref?: boolean;
  /** Home variant: no role column, description clipped to one line. */
  compact?: boolean;
}) {
  return (
    <div className="tbl-wrap" tabIndex={0}>
      <table className={compact ? 'tbl reg reg-compact' : 'tbl reg'}>
        <thead>
          <tr>
            <th scope="col">Repository</th>
            <th scope="col">Status</th>
            <th scope="col">Public artifact</th>
            <th scope="col">Last commit</th>
            {!compact && <th scope="col">Role</th>}
          </tr>
        </thead>
        <tbody>
          {entries.map((e) => {
            const m = meta?.[e.id];
            const last = m?.pushedAt ?? e.lastCommitSnapshot;
            const first = e.artifacts[0];
            return (
              <tr key={e.id}>
                <th scope="row">
                  {detailHref ? <a href={`/registry/${e.id}`}>{e.id}</a> : e.id}
                  <br />
                  <code className="path">{e.repository}</code>
                </th>
                <td>
                  <StatusBadge status={e.status} />
                </td>
                <td>
                  {first ? (
                    <a href={first.url} rel="noopener noreferrer">
                      {first.label}
                    </a>
                  ) : (
                    <span className="muted">none</span>
                  )}
                  {e.artifacts.length > 1 && <span className="muted"> +{e.artifacts.length - 1}</span>}
                </td>
                <td>
                  {last ? (
                    <>
                      <time dateTime={last}>{last}</time>
                      <span className="muted src"> {m?.source === 'live' ? 'live' : 'snapshot'}</span>
                    </>
                  ) : (
                    <span className="muted">not public</span>
                  )}
                </td>
                {!compact && <td>{e.technicalRole}</td>}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
