import type { Metadata } from 'next';
import Pipeline from '../components/cluster/Pipeline';
import { clusters, constitution, newProjectGate, finalRules, firstPrinciple } from '../lib/cluster/constitution';

export const metadata: Metadata = {
  title: 'Group Constitution and cluster mandate',
  description:
    'The Group Constitution shared by the three strategic clusters (Energy Intelligence, Physical AI & Robotics, Operations & Commercial Automation): ownership, isolation, contracts, the seven-criterion gate for new projects, the registers every cluster keeps, what is and is not rewarded — and the mandate of the Physical AI cluster.',
  alternates: { canonical: '/constitution' },
};

export const revalidate = 3600;

/**
 * /constitution — the shared rules first, then this cluster's mandate.
 * Text, rendered plainly, so the CEO layer and the other two agents read
 * the same words.
 */
export default function ConstitutionPage() {
  return (
    <main className="doc">
      <section className="blk blk-first">
        <p className="kicker">Group Constitution</p>
        <h1 className="h1">Three clusters. One constitution.</h1>
        <p className="lead">
          Each cluster owns its domain and competes for resources on evidence. The CEO layer sits above all three and
          decides where the next euro and engineer go. {constitution.allocation}
        </p>
        <ol className="clusters">
          {clusters.map((c) => (
            <li key={c.id} className={c.here ? 'here' : undefined}>
              <span className="clusters-name">{c.name}</span>
              <span className="clusters-mandate">“{c.mandate}”</span>
              {c.here && <span className="st st-plain">this host</span>}
            </li>
          ))}
        </ol>
      </section>

      <section className="blk" aria-labelledby="rules">
        <h2 id="rules" className="blk-h">Rules</h2>
        <ol className="plain">
          {constitution.rules.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ol>
        <h3 className="sub-h">Every proposed new project must pass</h3>
        <Pipeline stages={newProjectGate} label="New-project gate" compact />
        <p className="fine">If it fails two or more criteria: archive.</p>
      </section>

      <section className="blk" aria-labelledby="registers">
        <h2 id="registers" className="blk-h">Registers every cluster maintains</h2>
        <ul className="inline-list">
          {constitution.registers.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
        <p className="fine">
          On this host: <a href="/registry">registry</a>, <a href="/architecture">architecture map</a>,{' '}
          <a href="/registry">dependency graph (per entry)</a>, <a href="/decisions">decision log</a>,{' '}
          <a href="/decisions#kill">kill list</a>, <a href="/research">roadmap · research backlog</a>,{' '}
          <a href="/research#customers">customer evidence</a>, <a href="/research#intelligence">competitive intelligence</a>,{' '}
          <a href="/report">weekly KPI report</a>.
        </p>
      </section>

      <section className="blk" aria-labelledby="reward">
        <h2 id="reward" className="blk-h">What is rewarded</h2>
        <div className="two-col">
          <div>
            <h3 className="sub-h">Rewarded</h3>
            <ul className="plain">
              {constitution.rewarded.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="sub-h">Not rewarded</h3>
            <ul className="plain">
              {constitution.notRewarded.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
        </div>
        <h3 className="sub-h">When uncertain, prefer</h3>
        <ul className="inline-list">
          {constitution.whenUncertain.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </section>

      <section className="blk" aria-labelledby="mandate">
        <h2 id="mandate" className="blk-h">Mandate of this cluster</h2>
        <p className="blk-intro">
          Transform the robotics-related repositories into one coherent physical-AI platform. A collection of
          disconnected robotics demos is explicitly forbidden. Mission: PERCEIVE → MODEL → PLAN → ACT → VERIFY → RECOVER
          → LEARN, while producing measurable industrial ROI.
        </p>
        <p>{firstPrinciple.lead}</p>
        <ul className="plain">
          {firstPrinciple.conditions.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
        <h3 className="sub-h">Final rule</h3>
        <p>Do not build a robotics empire. Build one economically superior physical workflow first. Prove it. Then generalise.</p>
        <ul className="inline-list rules">
          {finalRules.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
