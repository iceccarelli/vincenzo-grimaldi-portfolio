import type { Metadata } from 'next';
import Link from 'next/link';
import DomainNav from '../components/DomainNav';
import Plate from '../components/Plate';
import { SITE_URL } from '../lib/site';

export const metadata: Metadata = {
  title: 'Electrical Machines, Windings & Power Electronics',
  description:
    'Technical pillar on rotating electrical machines, precision copper stator windings, industrial electrification, grid-scale power electronics, and deterministic safety assurance.',
  alternates: { canonical: '/machines' },
  openGraph: {
    title: 'Electrical Machines, Windings & Power Electronics',
    description:
      'Stator electromagnetics, thermal winding limits, grid-scale converters, protection hardware, and safety assurance.',
    url: SITE_URL + '/machines',
    images: [{ url: SITE_URL + '/images/cool/03-precision-stator-detail.jpg', width: 1168, height: 784 }],
  },
};

export default function MachinesPage() {
  return (
    <main className="doc doc-wide">
      <DomainNav current="/machines" />

      <section className="blk blk-first">
        <p className="kicker">Pillar 02 · Electromagnetics & Power Conversion</p>
        <h1 className="h1">Electrical machines, windings, and power electronics</h1>
        <p className="lead">
          Every megawatt generated, transformed, or converted into traction torque passes through magnetic cores, insulated copper conductors, and high-speed power semiconductors operating against strict thermal and dielectric ceilings.
        </p>
        <Plate
          src="/images/cool/03-precision-stator-detail.jpg"
          alt="Precision electrical machine stator with copper windings"
          code="MACH 01 · STATOR CORE & SLOT GEOMETRY"
          caption="Precision laminated stator core and formed copper end-windings engineered for low harmonic losses and high slot fill."
          priority
        />
      </section>

      <section className="blk" aria-labelledby="windings">
        <h2 id="windings" className="blk-h">Electromagnetic design & industrial electrification</h2>
        <p>
          Air-gap flux density, slot leakage reactance, skin and proximity effects in hairpin or Roebel bars, and insulation partial-discharge inception under steep dV/dt converter pulses govern machine longevity. High-torque traction drives and industrial motors demand coupled electromagnetic-thermal modelling rather than steady-state nameplate ratings.
        </p>
        <div className="plate-pair">
          <Plate
            src="/images/electrical/03-electrical-machines-windings.jpg"
            alt="Close-up of electrical machine copper windings and stator"
            code="MACH 02 · WINDING INSULATION & THERMAL PATHS"
            caption="Copper conductor transposition, slot liners, and end-winding cooling channels."
            sizes="(max-width: 680px) 100vw, 410px"
            compact
          />
          <Plate
            src="/images/critical/05-electrical-machines-electrification.jpg"
            alt="Advanced electrical machines and power electronics for electrification"
            code="MACH 03 · COUPLED DRIVE ELECTRIFICATION"
            caption="Integrated motor-drive architectures for heavy transport and industrial process electrification."
            sizes="(max-width: 680px) 100vw, 410px"
            compact
          />
        </div>
      </section>

      <section className="blk" aria-labelledby="electronics">
        <h2 id="electronics" className="blk-h">Grid-scale power electronics & protection devices</h2>
        <p>
          Modern grids and rail feeders rely on modular multilevel converters (MMC), STATCOMs, traction inverters, and numerical IEC 61850 protection relays. Semiconductor junction thermal impedance is measured in milliseconds — meaning overcurrent limiting, harmonic damping, and fault ride-through behaviour are dictated by inner control loops interacting with transformer and line impedances.
        </p>
        <div className="plate-pair">
          <Plate
            src="/images/cool/07-grid-scale-power-electronics.jpg"
            alt="Grid-scale power electronics and converters"
            code="MACH 04 · GRID-SCALE CONVERTER VALVES"
            caption="High-power converter stacks interfacing DC energy buffers and AC transmission busbars."
            sizes="(max-width: 680px) 100vw, 410px"
            compact
          />
          <Plate
            src="/images/electrical/07-electrical-devices-power-electronics.jpg"
            alt="Modern electrical devices and power electronics including inverters and protection equipment"
            code="MACH 05 · INVERTERS & PROTECTION IEDS"
            caption="Power conversion stages paired with high-speed switchgear and numerical protection relays."
            sizes="(max-width: 680px) 100vw, 410px"
            compact
          />
        </div>
      </section>

      <section className="blk" aria-labelledby="assurance">
        <h2 id="assurance" className="blk-h">Deterministic assurance for safety-relevant equipment</h2>
        <Plate
          src="/images/critical/08-industrial-autonomous-assurance.jpg"
          alt="Hash-chained industrial autonomous assurance for machine safety"
          code="MACH 06 · DETERMINISTIC SAFETY ENVELOPE"
          caption="Verifiable guardrails and tamper-evident audit trails separating advisory software from physical actuation."
        />
        <p className="underlined-links">
          Whenever supervisory optimization or learned estimators advise physical machines and converters, deterministic hardware interlocks and verifiable audit logs must bound permissible setpoints. See how these models connect to network-level state estimation in{' '}
          <Link href="/digital-twins">Physics-informed digital twins</Link>.
        </p>
      </section>
    </main>
  );
}
