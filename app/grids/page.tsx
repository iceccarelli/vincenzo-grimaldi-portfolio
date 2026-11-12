import type { Metadata } from 'next';
import Link from 'next/link';
import DomainNav from '../components/DomainNav';
import Plate from '../components/Plate';
import { SITE_URL } from '../lib/site';

export const metadata: Metadata = {
  title: 'High-Voltage Grids & Railway Traction Power',
  description:
    'Technical pillar covering high-voltage substations, bulk transmission corridors, 16.7 Hz / 110 kV railway traction power systems, interconnection queues, and 50 Hz synchronous inertia.',
  alternates: { canonical: '/grids' },
  openGraph: {
    title: 'High-Voltage Grids & Railway Traction Power',
    description:
      'Substations, transmission corridors, railway traction power digitisation, interconnection capacity, and frequency stability.',
    url: SITE_URL + '/grids',
    images: [{ url: SITE_URL + '/images/electrical/01-high-voltage-substation.jpg', width: 1168, height: 784 }],
  },
};

export default function GridsPage() {
  return (
    <main className="doc doc-wide">
      <DomainNav current="/grids" />

      <section className="blk blk-first">
        <p className="kicker">Pillar 01 · Bulk Transmission & Traction Supply</p>
        <h1 className="h1">High-voltage grids and railway traction power</h1>
        <p className="lead">
          Power delivery infrastructure succeeds or fails at physical interfaces: HV busbars, transformer thermal limits, protection selectivity, traction catenary impedance, and sub-second rotor inertia.
        </p>
        <Plate
          src="/images/electrical/01-high-voltage-substation.jpg"
          alt="High-voltage electrical substation with transformers and transmission infrastructure at dusk"
          code="GRIDS 01 · SUBSTATION TOPOLOGY"
          caption="Primary air-insulated switching bays, power transformers, and overhead line terminations."
          priority
        />
      </section>

      <section className="blk" aria-labelledby="corridors">
        <h2 id="corridors" className="blk-h">Transmission corridors & interconnection queues</h2>
        <p>
          Bulk transmission corridors carry active and reactive power across regional load centers under N-1 thermal, voltage-drop, and phase-angle stability limits. As electrified industry, renewable generation, and large compute campuses request multi-hundred-megawatt connections, queue backlogs expose binding network bottlenecks years ahead of construction.
        </p>
        <div className="plate-pair">
          <Plate
            src="/images/electrical/09-high-voltage-transmission-corridor.jpg"
            alt="High-voltage transmission corridor stretching across landscape"
            code="GRIDS 02 · BULK TRANSFER CORRIDOR"
            caption="Multi-circuit overhead transmission lines governed by thermal sag, surge impedance loading, and N-1 security."
            sizes="(max-width: 680px) 100vw, 410px"
            compact
          />
          <Plate
            src="/images/critical/02-interconnection-queue-capacity.jpg"
            alt="Interconnection queue and power capacity for AI infrastructure"
            code="GRIDS 03 · INTERCONNECTION HEADROOM"
            caption="Locational hosting capacity and contingency study bottlenecks across congested transmission nodes."
            sizes="(max-width: 680px) 100vw, 410px"
            compact
          />
        </div>
      </section>

      <section className="blk" aria-labelledby="traction">
        <h2 id="traction" className="blk-h">Railway traction power & HV digitisation</h2>
        <p>
          In DACH railway networks, dedicated 16.7 Hz, 110 kV traction transmission lines and converter stations feed 15 kV overhead catenary sections. Moving train loads create rapidly shifting single-phase impedance profiles, pantograph harmonics, and regenerative braking reversals that demand tight coordination between HV feeder protection and digital asset models.
        </p>
        <div className="plate-pair">
          <Plate
            src="/images/electrical/02-railway-traction-power.jpg"
            alt="Railway traction power system with catenary, substations and HV equipment"
            code="GRIDS 04 · TRACTION FEEDER & CATENARY"
            caption="Overhead contact line geometry, traction substation step-down feeders, and sectioning architecture."
            sizes="(max-width: 680px) 100vw, 410px"
            compact
          />
          <Plate
            src="/images/critical/04-traction-power-digitization.jpg"
            alt="Railway traction power digitization with digital twin overlay"
            code="GRIDS 05 · TRACTION DIGITALISATION"
            caption="Structured topology and telemetry overlays supporting condition-aware rail power infrastructure."
            sizes="(max-width: 680px) 100vw, 410px"
            compact
          />
        </div>
      </section>

      <section className="blk" aria-labelledby="inertia">
        <h2 id="inertia" className="blk-h">Frequency dynamics & synchronous inertia</h2>
        <Plate
          src="/images/cool/08-grid-frequency-inertia-living.jpg"
          alt="Grid frequency and inertia as a living system"
          code="GRIDS 06 · 50 HZ FREQUENCY EQUILIBRIUM"
          caption="Electromechanical coupling across synchronous machines and converter-interfaced resources."
        />
        <p className="underlined-links">
          Maintaining 50 Hz stability as converter penetration rises requires modelling kinetic energy buffers, RoCoF relay thresholds, and converter current saturation together. Explore the dedicated explainer in{' '}
          <Link href="/articles/grid-inertia-50hz">Grid inertia and the 50 Hz constraint</Link> and{' '}
          <Link href="/articles/it-ot-traction-power">IT/OT convergence in traction power</Link>.
        </p>
      </section>
    </main>
  );
}
