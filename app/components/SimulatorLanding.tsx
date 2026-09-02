'use client';

import { useLanguage } from '../lib/i18n';
import { pick } from '../lib/copy';
import { THESIS_DEMO } from '../lib/site';

/**
 * SimulatorLanding — the door to the thesis simulator. The simulator
 * itself runs on its own deployment; this page says what it is, what it
 * is not, and opens it. Nothing is embedded here.
 */
export default function SimulatorLanding() {
  const { locale } = useLanguage();
  const s = pick(locale).simulator;

  return (
    <main className="doc">
      <article className="blk blk-first">
        <p className="kicker">{s.kicker}</p>
        <h1 className="h1">{s.title}</h1>
        <p className="lead">{s.intro}</p>

        <ul className="plain">
          {s.what.map((w) => (
            <li key={w}>{w}</li>
          ))}
        </ul>

        <p className="actions">
          <a className="btn" href={THESIS_DEMO} rel="noopener noreferrer">
            {s.open} ↗
          </a>
          <a className="btn-quiet" href="/work/cim-threma">
            {s.readWriteUp}
          </a>
        </p>

        <p className="path-line">
          <code className="path">physics-informed.vercel.app</code>
          <code className="path">repo path not public</code>
        </p>

        <p className="fine">{s.not}</p>
      </article>
    </main>
  );
}
