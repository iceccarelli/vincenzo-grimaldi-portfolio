import type { Metadata } from 'next';
import { StateChip } from '../components/cluster/StatusBadge';
import {
  researchProgram,
  watchlist,
  intelligenceQuestions,
  intelligenceLog,
  customerQuestions,
  customerSegments,
} from '../lib/cluster/research';

export const metadata: Metadata = {
  title: 'Research program, intelligence and customer validation',
  description:
    'Physical-AI research roadmap with baseline, dataset and metric for every topic (VLA models, world models, diffusion policies, imitation and reinforcement learning, MPC, TAMP, sensor fusion, uncertainty, sim-to-real, active learning, failure recovery, safe exploration); the external intelligence watchlist and log; the seven customer-discovery questions.',
  alternates: { canonical: '/research' },
};

export const revalidate = 3600;

/**
 * /research — three registers on one page: the research program (every
 * claim needs baseline, dataset, metric, experiment, failure analysis,
 * reproducibility), the external intelligence log, and customer evidence.
 */
export default function ResearchPage() {
  return (
    <main className="doc doc-wide">
      <section className="blk blk-first">
        <p className="kicker">Physical AI & Robotics · research and evidence</p>
        <h1 className="h1">Research program</h1>
        <p className="lead">
          A research claim exists here only with baseline, dataset and metric named. Until an experiment has run, the
          state is OPEN and no result is quoted. No performance claim is made without benchmark evidence.
        </p>
        <div className="tbl-wrap" tabIndex={0}>
          <table className="tbl research">
            <thead>
              <tr>
                <th scope="col">Topic</th>
                <th scope="col">Relevance</th>
                <th scope="col">Baseline</th>
                <th scope="col">Dataset</th>
                <th scope="col">Metric</th>
                <th scope="col">State</th>
              </tr>
            </thead>
            <tbody>
              {researchProgram.map((r) => (
                <tr key={r.topic}>
                  <th scope="row">{r.topic}</th>
                  <td>{r.relevance}</td>
                  <td>{r.baseline}</td>
                  <td>{r.dataset}</td>
                  <td>{r.metric}</td>
                  <td>
                    <StateChip text={r.state} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="fine">
          Every reported experiment will carry: baseline, dataset, metric, confidence interval, hardware, latency,
          failure cases, generalisation, ablation, and a reproduction path from a clean clone.
        </p>
      </section>

      <section className="blk" id="intelligence" aria-labelledby="intel">
        <h2 id="intel" className="blk-h">External intelligence</h2>
        <p className="blk-intro">For every important development the log answers five questions, then gives a verdict.</p>
        <ol className="inline-list numbered">
          {intelligenceQuestions.map((q) => (
            <li key={q}>{q}</li>
          ))}
        </ol>
        {intelligenceLog.length === 0 ? (
          <p className="empty">
            Log empty as of the first weekly cycle. An empty log is stated, not hidden; a list of venues is not
            intelligence.
          </p>
        ) : (
          <div className="tbl-wrap" tabIndex={0}>
            <table className="tbl intel">
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Source</th>
                  <th scope="col">New</th>
                  <th scope="col">Better?</th>
                  <th scope="col">Reproducible?</th>
                  <th scope="col">Advantage?</th>
                  <th scope="col">Verdict</th>
                </tr>
              </thead>
              <tbody>
                {intelligenceLog.map((e) => (
                  <tr key={`${e.date}-${e.source}`}>
                    <td>
                      <time dateTime={e.date}>{e.date}</time>
                    </td>
                    <td>{e.source}</td>
                    <td>{e.whatIsNew}</td>
                    <td>{e.actuallyBetter}</td>
                    <td>{e.reproducible}</td>
                    <td>{e.commercialAdvantage}</td>
                    <td>
                      <StateChip text={e.verdict} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <h3 className="sub-h">Watchlist</h3>
        <ul className="inline-list">
          {watchlist.map((w) => (
            <li key={w}>{w}</li>
          ))}
        </ul>
      </section>

      <section className="blk" id="customers" aria-labelledby="cust">
        <h2 id="cust" className="blk-h">Customer validation</h2>
        <p className="blk-intro">
          Conversations recorded: <strong>0</strong>. Validation is money, a signed pilot or a committed design
          partnership — never a compliment. Segments and the seven questions are fixed; answers are logged here as
          they arrive.
        </p>
        <div className="two-col">
          <div>
            <h3 className="sub-h">Segments</h3>
            <ul className="plain">
              {customerSegments.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="sub-h">Questions</h3>
            <ol className="plain">
              {customerQuestions.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </main>
  );
}
