import type { Metadata } from 'next';
import KpiTable from '../components/cluster/KpiTable';
import StatusBadge from '../components/cluster/StatusBadge';
import { SoftwareAppJsonLd } from '../components/JsonLd';
import { getEntry } from '../lib/cluster/registry';
import { palletizerKpis, lidarKpis } from '../lib/cluster/kpis';
import { liveMetadata } from '../lib/cluster/github';
import { SITE_URL } from '../lib/site';

export const metadata: Metadata = {
  title: 'Palletizer — first target',
  description:
    'Robot-agnostic palletizing software as the first commercial candidate of the Physical AI cluster: the twelve KPIs (cycles/hour, picks, intervention rate, changeover, deployment time, utilisation, SKU complexity, downtime, labour savings, payback) with measured values or an honest dash, and the LiDAR-fusion benchmark metrics.',
  alternates: { canonical: '/palletizer' },
};

export const revalidate = 3600;

/**
 * /palletizer — the first product target and the shared perception IP,
 * with every KPI the mandate names. What is measured is measured; what
 * is not says so.
 */
export default async function PalletizerPage() {
  const pal = getEntry('palletizer')!;
  const lidar = getEntry('robot-lidar-fusion')!;
  const meta = await liveMetadata();
  const m = meta[pal.id];
  const gh = pal.artifacts.find((a) => a.kind === 'github')!;
  const dep = pal.artifacts.find((a) => a.kind === 'deployment');

  return (
    <main className="doc doc-wide">
      <SoftwareAppJsonLd name="palletizer" description={pal.description} url={`${SITE_URL}/palletizer`} repo={gh.url} live={dep?.url} />
      <section className="blk blk-first">
        <p className="kicker">Physical AI & Robotics · first target</p>
        <h1 className="h1">
          Palletizer <StatusBadge status={pal.status} />
        </h1>
        <p className="lead">
          The target is not a demonstration. The target is: a customer can deploy faster and operate cheaper than with
          the incumbent alternative. Until a pilot with a kill date says so, every number below is a dash.
        </p>
        <p className="path-line">
          {pal.artifacts.map((a) => (
            <a key={a.url} href={a.url} rel="noopener noreferrer" className="path">
              {a.label}
              {a.kind === 'deployment' && !a.verified ? ' (stated, not verified here)' : ''}
            </a>
          ))}
        </p>
        <p className="fine">
          Last commit {m?.pushedAt ? <time dateTime={m.pushedAt}>{m.pushedAt}</time> : '—'} ({m?.source ?? 'snapshot'}). Apache-2.0.
          Python, TypeScript, C++. Detail: <a href="/registry/palletizer">/registry/palletizer</a>.
        </p>
      </section>

      <section className="blk" aria-labelledby="what">
        <h2 id="what" className="blk-h">What exists</h2>
        <ul className="plain">
          <li>Deterministic orchestrator loop with hazard evaluation, fault detection and telemetry publication.</li>
          <li>Mixed-SKU pallet optimizer with a stability number that can be checked; C++ shelf/skyline packer via pybind11 with tested invariants.</li>
          <li>Hardware-agnostic <code className="path">RobotInterface</code> and <code className="path">GripperController</code>; robot-arm profiles; WMS CSV ingestion.</li>
          <li>MCP stdio JSON-RPC server exposing planning as agent tools (plan and simulate — never actuate).</li>
          <li>ROS 2 integration package and browser physics demos (React Three Fiber + Rapier).</li>
          <li>Test suite across orchestrator, planning, optimizer, motion, power, MCP server and native invariants; PyPI package <code className="path">palletizer-full-stack 0.2.0</code>.</li>
        </ul>
        <h3 className="sub-h">What does not exist</h3>
        <ul className="plain">
          <li>A customer, a pilot, a deployed cell, or any measured KPI.</li>
          <li>A certified vendor driver for any robot brand. “Robot-agnostic” is an interface, not a compatibility list.</li>
          <li>A simulation harness that writes the twelve KPIs as a versioned JSON snapshot (the next experiment).</li>
        </ul>
      </section>

      <section className="blk" aria-labelledby="kpis">
        <h2 id="kpis" className="blk-h">The twelve KPIs</h2>
        <KpiTable kpis={palletizerKpis} caption="Palletizing KPIs" />
        <p className="fine">
          Snapshot schema: <a href="/contracts#PalletizingKpiSnapshot">PalletizingKpiSnapshot 0.1.0</a>. JSON: <a href="/api/cluster/kpis">/api/cluster/kpis</a>.
        </p>
      </section>

      <section className="blk" aria-labelledby="lidar">
        <h2 id="lidar" className="blk-h">
          Shared perception IP — robot-lidar-fusion <StatusBadge status={lidar.status} />
        </h2>
        <p className="blk-intro">{lidar.description}</p>
        <p className="path-line">
          {lidar.artifacts.map((a) => (
            <a key={a.url} href={a.url} rel="noopener noreferrer" className="path">
              {a.label}
            </a>
          ))}
          <code className="path">github repository not public</code>
        </p>
        <KpiTable kpis={lidarKpis} caption="LiDAR-fusion benchmark metrics" />
        <p className="fine">
          Evaluation covers localisation, object detection, tracking, uncertainty, sensor calibration, sensor failure,
          degraded environments, occlusion, robustness and latency. Hardware is named with every latency figure.
        </p>
      </section>

      <section className="blk" aria-labelledby="inspection">
        <h2 id="inspection" className="blk-h">
          Autonomous inspection <StatusBadge status="RESEARCH" />
        </h2>
        <p className="blk-intro">
          Electrical-infrastructure inspection is the strategic bridge to the Energy cluster and is not commercialised
          before the chain is demonstrated end to end:
        </p>
        <ol className="pipe pipe-compact pipe-wrap" aria-label="Inspection chain">
          {['DETECTION', 'CLASSIFICATION', 'LOCALISATION', 'INSPECTION PLAN', 'SAFE ROBOT EXECUTION', 'EVIDENCE', 'REPORT'].map((s) => (
            <li key={s}>
              <span className="pipe-stage">{s}</span>
            </li>
          ))}
        </ol>
        <p className="fine">
          Customer outcome: less dangerous human work, lower inspection cost, higher inspection frequency, earlier fault
          detection. Result contract: <a href="/contracts#InspectionResult">InspectionResult 0.1.0</a>. No repository exists yet;
          the register says so.
        </p>
      </section>
    </main>
  );
}
