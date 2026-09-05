import type { Metadata } from 'next';
import { StateChip } from '../components/cluster/StatusBadge';
import { decisions, killCriteria, killRegister } from '../lib/cluster/decisions';

export const metadata: Metadata = {
  title: 'Decision log and kill register',
  description:
    'Dated decisions of the Physical AI cluster with reason and reversal condition, and the kill register: which projects fail which of the six criteria (customer, measurable task, unique IP, benchmark advantage, integration advantage, plausible ROI) and by when a decision is due.',
  alternates: { canonical: '/decisions' },
};

export const revalidate = 3600;

/**
 * /decisions — the log, newest first, then the kill register.
 * Each decision states when it is reversed. Each kill review names the
 * failing criteria and a date by which the CEO decides.
 */
export default function DecisionsPage() {
  const list = [...decisions].reverse();
  return (
    <main className="doc doc-wide">
      <section className="blk blk-first">
        <p className="kicker">Physical AI & Robotics · decisions</p>
        <h1 className="h1">Decision log</h1>
        <p className="lead">
          {decisions.length} decisions, newest first. Each carries its reason and the condition under which it is
          reversed. JSON: <a href="/api/cluster/decisions">/api/cluster/decisions</a>.
        </p>
      </section>

      <section className="blk">
        <ol className="entries">
          {list.map((d) => (
            <li key={d.id} className="entry" id={d.id}>
              <h2>
                <code className="path">{d.id}</code> {d.title}
              </h2>
              <p className="entry-kind">
                <time dateTime={d.date}>{d.date}</time> · affects {d.affects.join(', ')}
              </p>
              <dl className="fields fields-tight">
                <div>
                  <dt>Decision</dt>
                  <dd>{d.decision}</dd>
                </div>
                <div>
                  <dt>Reason</dt>
                  <dd>{d.reason}</dd>
                </div>
                <div>
                  <dt>Reversed when</dt>
                  <dd>{d.reversibleWhen}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ol>
      </section>

      <section className="blk" id="kill" aria-labelledby="kill-h">
        <h2 id="kill-h" className="blk-h">Kill register</h2>
        <p className="blk-intro">
          A robotics project is frozen when it has none of the following. Sunk cost is irrelevant. No new robot vertical
          without commercial evidence; no hardware-heavy project without a customer hypothesis.
        </p>
        <div className="tbl-wrap" tabIndex={0}>
          <table className="tbl kill">
            <thead>
              <tr>
                <th scope="col">Subject</th>
                {killCriteria.map((k) => (
                  <th key={k.key} scope="col" className="rot">
                    {k.label}
                  </th>
                ))}
                <th scope="col">State</th>
                <th scope="col">Decision by</th>
              </tr>
            </thead>
            <tbody>
              {killRegister.map((k) => (
                <tr key={k.id}>
                  <th scope="row">
                    <code className="path">{k.id}</code> {k.subject}
                    <br />
                    <span className="muted">{k.note}</span>
                  </th>
                  {killCriteria.map((c) => {
                    const fails = k.failing.includes(c.key);
                    return (
                      <td key={c.key} className={fails ? 'crit crit-fail' : 'crit crit-ok'}>
                        <span aria-label={`${c.label}: ${fails ? 'missing' : 'present'}`}>{fails ? '✗' : '✓'}</span>
                      </td>
                    );
                  })}
                  <td>
                    <StateChip text={k.state} />
                  </td>
                  <td>
                    <time dateTime={k.decisionBy}>{k.decisionBy}</time>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="fine">✗ = criterion currently missing. FROZEN or ARCHIVED requires a decision above.</p>
      </section>
    </main>
  );
}
