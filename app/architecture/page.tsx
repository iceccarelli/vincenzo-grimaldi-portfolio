import type { Metadata } from 'next';
import Pipeline from '../components/cluster/Pipeline';
import { stack, gate, mission, agentTools, abstractionTests, abstractionCandidates } from '../lib/cluster/stack';

export const metadata: Metadata = {
  title: 'Target architecture',
  description:
    'Modular physical-AI stack: perception, world model, task planner, motion planner, simulator, safety/constraint engine, robot controller, actuation, telemetry, failure analysis, learning. Probabilistic intelligence separated from deterministic safety; every physical action passes PLAN → SIMULATE → VALIDATE → AUTHORIZE → EXECUTE → VERIFY.',
  alternates: { canonical: '/architecture' },
};

export const revalidate = 3600;

const natureLabel: Record<string, string> = {
  probabilistic: 'probabilistic — may propose',
  deterministic: 'deterministic — may refuse',
  physical: 'physical',
  telemetry: 'telemetry',
};

/**
 * /architecture — the eleven-layer stack with, for each layer, its nature
 * and where it lives today (or "not built"). Then the gate, the agent
 * permissions, and the abstraction tests with every candidate scored.
 */
export default function ArchitecturePage() {
  return (
    <main className="doc doc-wide">
      <section className="blk blk-first">
        <p className="kicker">Physical AI & Robotics · architecture</p>
        <h1 className="h1">Target architecture</h1>
        <p className="lead">
          One modular stack, not a collection of demos. Probabilistic layers propose; deterministic layers refuse. The
          column “today” says where each layer exists — or that it does not.
        </p>
        <Pipeline stages={mission} label="Mission" compact />
      </section>

      <section className="blk" aria-labelledby="stack">
        <h2 id="stack" className="blk-h">Stack</h2>
        <div className="tbl-wrap" tabIndex={0}>
          <table className="tbl stack">
            <thead>
              <tr>
                <th scope="col">Layer</th>
                <th scope="col">Nature</th>
                <th scope="col">Role</th>
                <th scope="col">Today</th>
              </tr>
            </thead>
            <tbody>
              {stack.map((l, i) => (
                <tr key={l.name} className={`nat-${l.nature}`}>
                  <th scope="row">
                    <span className="muted">{String(i + 1).padStart(2, '0')}</span> {l.name}
                  </th>
                  <td>{natureLabel[l.nature]}</td>
                  <td>{l.role}</td>
                  <td>{l.today}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="blk" aria-labelledby="gate">
        <h2 id="gate" className="blk-h">Safety gate</h2>
        <p className="blk-intro">
          Every physical action passes all six steps. A model may participate in PLAN; from SIMULATE onwards the steps
          are deterministic and the model has no say. Authorisation is a human or a certified runtime, recorded with
          provenance. No LLM or learned model may bypass safety controls, command an unrestricted actuator, modify a
          safety limit without authorisation, or silently modify production behaviour.
        </p>
        <Pipeline stages={gate} label="Safety gate" deterministicFrom={1} />
        <div className="tbl-wrap" tabIndex={0}>
          <table className="tbl tools">
            <thead>
              <tr>
                <th scope="col">Agent tool</th>
                <th scope="col">Allowed</th>
                <th scope="col">Note</th>
              </tr>
            </thead>
            <tbody>
              {agentTools.map((t) => (
                <tr key={t.name}>
                  <th scope="row">
                    <code className={t.may ? 'path' : 'path path-no'}>{t.name}</code>
                  </th>
                  <td>{t.may ? 'yes' : 'no'}</td>
                  <td>{t.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="fine">
          Every allowed tool carries a schema, authentication, authorisation, deterministic validation, a timeout,
          provenance, logging, failure behaviour and test coverage. A tool missing one of these is not deployed.
        </p>
      </section>

      <section className="blk" aria-labelledby="abstraction">
        <h2 id="abstraction" className="blk-h">Robot-agnostic by evidence</h2>
        <p className="blk-intro">Abstraction has a cost. An abstraction is written only if it passes at least two of four tests:</p>
        <ol className="plain">
          {abstractionTests.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ol>
        <div className="tbl-wrap" tabIndex={0}>
          <table className="tbl abs">
            <thead>
              <tr>
                <th scope="col">Candidate</th>
                <th scope="col">Tests passed</th>
                <th scope="col">Position</th>
              </tr>
            </thead>
            <tbody>
              {abstractionCandidates.map((a) => (
                <tr key={a.thing}>
                  <th scope="row">{a.thing}</th>
                  <td className="num">{a.passes} / 4</td>
                  <td>{a.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
