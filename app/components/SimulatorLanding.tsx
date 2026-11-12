'use client';

import Link from 'next/link';
import DomainNav from './DomainNav';
import Plate from './Plate';
import { useLanguage } from '../lib/i18n';
import { pick } from '../lib/copy';
import { THESIS_DEMO } from '../lib/site';

export default function SimulatorLanding() {
  const { locale } = useLanguage();
  const s = pick(locale).simulator;

  return (
    <main className="doc doc-wide">
      <DomainNav current="/simulator" />

      <article className="blk blk-first">
        <p className="kicker">{s.kicker}</p>
        <h1 className="h1">{s.title}</h1>
        <p className="lead">{s.intro}</p>

        <Plate
          src="/images/electrical/08-thesis-simulator-workspace.jpg"
          alt="Engineering workspace with power system simulator models and research notes"
          code="SIM 01 · THESIS MODELLING WORKSPACE"
          caption="Coupled CIM/CGMES network topology, ThreMA threat classes, and IEEE 9-bus scenario evaluation."
          priority
        />

        <ul className="plain">
          {s.what.map((w) => (
            <li key={w}>{w}</li>
          ))}
        </ul>

        <Plate
          src="/images/cool/09-advanced-research-simulator.jpg"
          alt="Advanced research simulator with power system models"
          code="SIM 02 · IEEE 9-BUS CYBER-PHYSICAL TESTBED"
          caption="Interactive node-breaker topology and cross-domain signal-to-noise mapping inspection."
        />

        <p className="actions">
          <a className="btn" href={THESIS_DEMO} rel="noopener noreferrer">
            {s.open} ↗
          </a>
          <Link className="btn-quiet" href="/work/cim-threma">
            {s.readWriteUp}
          </Link>
        </p>
        <p className="path-line">
          <code className="path">physics-informed.vercel.app</code>
          <code className="path">IEEE 9-bus · CGMES + ThreMA</code>
        </p>
        <p className="fine">{s.not}</p>
      </article>
    </main>
  );
}
