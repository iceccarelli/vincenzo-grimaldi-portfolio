import type { Metadata } from 'next';
import Link from 'next/link';
import DomainNav from '../components/DomainNav';
import Plate from '../components/Plate';
import { SITE_URL } from '../lib/site';

export const metadata: Metadata = {
  title: 'Physics-Informed Modelling & Grid Digital Twins',
  description:
    'Coupling AC power-flow equations, Kirchhoff conservation laws, CIM/CGMES network graphs, and machine learning for credible power-system digital twins.',
  alternates: { canonical: '/digital-twins' },
  openGraph: {
    title: 'Physics-Informed Modelling & Grid Digital Twins',
    description:
      'Network state estimation, CGMES topology graphs, and physics-constrained learning for electrical infrastructure.',
    url: SITE_URL + '/digital-twins',
    images: [{ url: SITE_URL + '/images/electrical/04-physics-informed-digital-twin-grid.jpg', width: 1168, height: 784 }],
  },
};

export default function DigitalTwinsPage() {
  return (
    <main className="doc doc-wide">
      <DomainNav current="/digital-twins" />

      <section className="blk blk-first">
        <p className="kicker">Pillar 03 · Conservation Laws & Hybrid Estimation</p>
        <h1 className="h1">Physics-informed modelling and power-system digital twins</h1>
        <p className="lead">
          Black-box statistical models extrapolate poorly during grid faults — the exact regime where operators rely on them most. Embedding admittance matrices, Kirchhoff balance laws, and thermal differential equations directly into digital twins keeps estimates physically admissible.
        </p>
        <Plate
          src="/images/cool/05-physics-meets-hardware.jpg"
          alt="Physics equations and waveforms meeting substation hardware"
          code="TWIN 01 · CONSERVATION LAWS & HARDWARE"
          caption="Coupling electromagnetic and differential-algebraic power-system equations with field telemetry."
          priority
        />
      </section>

      <section className="blk" aria-labelledby="topology">
        <h2 id="topology" className="blk-h">Network digital twins & contingency state estimation</h2>
        <p>
          A credible grid digital twin maintains live structural alignment with breaker and disconnector states via CIM/CGMES profiles while solving weighted least-squares or hybrid state estimation across SCADA and synchrophasor measurements. With a physically consistent base case, N-1 thermal and voltage contingencies can be screened continuously.
        </p>
        <div className="plate-pair">
          <Plate
            src="/images/electrical/04-physics-informed-digital-twin-grid.jpg"
            alt="Physics-informed digital twin of a power grid with substations and power flows"
            code="TWIN 02 · COUPLED POWER-FLOW GRAPH"
            caption="Substation node-breaker topology mapped onto real-time active and reactive power-flow corridors."
            sizes="(max-width: 680px) 100vw, 410px"
            compact
          />
          <Plate
            src="/images/critical/03-physics-informed-grid-digital-twin.jpg"
            alt="Physics-informed digital twin of a power grid"
            code="TWIN 03 · CONTINGENCY & CAPACITY TWIN"
            caption="Evaluating feeder headroom, voltage stability margins, and topological reconfigurations."
            sizes="(max-width: 680px) 100vw, 410px"
            compact
          />
        </div>
      </section>

      <section className="blk" aria-labelledby="hybrid">
        <h2 id="hybrid" className="blk-h">Physics-informed learning & long-horizon architecture</h2>
        <p>
          Graph neural networks and physics-informed surrogates accelerate AC optimal power flow screening and dynamic stability margin estimation only when penalized or projected onto hard network equations. Surrogates propose candidates; exact Newton-Raphson power flow and time-domain electromagnetic solvers verify binding constraints.
        </p>
        <div className="plate-pair">
          <Plate
            src="/images/electrical/10-physics-informed-ai-power-systems.jpg"
            alt="Physics-informed AI merging neural networks with electrical circuit and power flow models"
            code="TWIN 04 · HYBRID GRAPH & CIRCUIT MODELS"
            caption="Neural message passing constrained by nodal admittance matrices and branch thermal limits."
            sizes="(max-width: 680px) 100vw, 410px"
            compact
          />
          <Plate
            src="/images/critical/10-future-physics-informed-power-systems.jpg"
            alt="Future of power systems with physics-informed AI and digital twins"
            code="TWIN 05 · SYSTEM-SCALE COORDINATION"
            caption="Physics-grounded intelligence spanning bulk transmission, traction feeders, and high-density loads."
            sizes="(max-width: 680px) 100vw, 410px"
            compact
          />
        </div>
        <p className="underlined-links">
          Inspect the runnable cross-domain smart-grid ontology testbed in the{' '}
          <Link href="/simulator">CIM–ThreMA Simulator</Link> or read the capacity analysis in{' '}
          <Link href="/articles/ai-is-power-bound">AI infrastructure is power-bound</Link>.
        </p>
      </section>
    </main>
  );
}
