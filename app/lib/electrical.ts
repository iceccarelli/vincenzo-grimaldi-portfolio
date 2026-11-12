export type PillarCard = {
  slug: string;
  href: string;
  code: string;
  title: string;
  titleDe: string;
  summary: string;
  summaryDe: string;
  image: string;
  alt: string;
};

export type TechnicalArticle = {
  slug: string;
  date: string;
  readingTime: string;
  kicker: string;
  title: string;
  summary: string;
  heroImage: string;
  heroAlt: string;
  heroCode: string;
  heroCaption: string;
  secondaryImage: string;
  secondaryAlt: string;
  secondaryCode: string;
  secondaryCaption: string;
  tertiaryImage?: string;
  tertiaryAlt?: string;
  tertiaryCode?: string;
  tertiaryCaption?: string;
  sections: { heading: string; paragraphs: string[] }[];
  tags: string[];
};

export const pillarCards: PillarCard[] = [
  {
    slug: 'grids',
    href: '/grids',
    code: 'PILLAR 01 · HV & TRACTION',
    title: 'High-voltage grids & railway traction power',
    titleDe: 'Hochspannungsnetze & Bahnstromversorgung',
    summary:
      'Substations, bulk transmission corridors, 16.7 Hz / 110 kV railway traction supply, interconnection queues, and frequency stability.',
    summaryDe:
      'Umspannwerke, Übertragungskorridore, 16,7-Hz-/110-kV-Bahnstromanlagen, Netzanschlusskapazität und Frequenzstabilität.',
    image: '/images/cool/06-cinematic-traction-power.jpg',
    alt: 'Cinematic railway traction power and high-speed train',
  },
  {
    slug: 'machines',
    href: '/machines',
    code: 'PILLAR 02 · MACHINES & CONVERTERS',
    title: 'Electrical machines & power electronics',
    titleDe: 'Elektrische Maschinen & Leistungselektronik',
    summary:
      'Electromagnetic flux distribution, copper stator windings, grid-forming converters, protection relays, and deterministic assurance.',
    summaryDe:
      'Elektromagnetische Felder, Statorwicklungen, netzbildende Stromrichter, Schutztechnik und deterministische Sicherheitsnachweise.',
    image: '/images/cool/02-electromagnetic-fields-machine.jpg',
    alt: 'Electromagnetic fields around an electrical machine',
  },
  {
    slug: 'digital-twins',
    href: '/digital-twins',
    code: 'PILLAR 03 · PHYSICS-INFORMED TWINS',
    title: 'Physics-informed modelling & grid digital twins',
    titleDe: 'Physikinformierte Modelle & digitale Netzzwillinge',
    summary:
      'Coupling Kirchhoff and AC power-flow equations, CIM/CGMES network semantics, and state estimation with machine learning.',
    summaryDe:
      'Kopplung von Leistungsflussgleichungen, CIM/CGMES-Netzsemantik und Zustandsschätzung mit lernenden Verfahren.',
    image: '/images/cool/04-live-grid-digital-twin.jpg',
    alt: 'Live digital twin of a power grid with data flows',
  },
  {
    slug: 'simulator',
    href: '/simulator',
    code: 'PILLAR 04 · THESIS TESTBED',
    title: 'Research workspace & CIM–ThreMA simulator',
    titleDe: 'Forschungssimulator & CIM–ThreMA-Testbed',
    summary:
      'Runnable RWTH Aachen M.Sc. thesis linking CGMES substation topology with threat modelling across an IEEE 9-bus testbed.',
    summaryDe:
      'Ausführbare RWTH-Masterthesis zur Kopplung von CGMES-Netztopologie und Bedrohungsmodellierung am IEEE-9-Bus-Testnetz.',
    image: '/images/cool/09-advanced-research-simulator.jpg',
    alt: 'Advanced research simulator with power system models',
  },
];

export const articles: TechnicalArticle[] = [
  {
    slug: 'grid-inertia-50hz',
    date: '2026-11-09',
    readingTime: '7 min read',
    kicker: 'Technical Article · Frequency Stability',
    title: 'Grid inertia and the 50 Hz constraint under high converter penetration',
    summary:
      'Why rotational kinetic energy in synchronous generators governs rate-of-change-of-frequency (RoCoF) during sub-second contingencies, and how grid-forming converter controls must respect physical energy buffers.',
    heroImage: '/images/electrical/05-grid-inertia-frequency-stability.jpg',
    heroAlt: 'Grid inertia and frequency stability visualization with rotating machines and waveforms',
    heroCode: 'ART. 01A · SYNCHRONOUS INERTIA & ROCOF',
    heroCaption: 'Coupled electromechanical swing dynamics and 50 Hz frequency nadir response following a generation contingency.',
    secondaryImage: '/images/critical/06-grid-inertia-renewable-stability.jpg',
    secondaryAlt: 'Grid inertia and frequency stability under high renewable penetration',
    secondaryCode: 'ART. 01B · CONVERTER-DOMINATED STABILITY',
    secondaryCaption: 'System stability margins as inverter-based resources displace synchronous turbogenerators across transmission zones.',
    sections: [
      {
        heading: 'The swing equation is an energy budget, not a software setting',
        paragraphs: [
          'In a 50 Hz interconnected AC network, instantaneous imbalances between mechanical shaft power and electrical load are absorbed first by the kinetic energy stored in spinning synchronous rotors. Before primary droop governors or secondary AGC loops respond across hundreds of milliseconds to seconds, the rate of change of frequency (df/dt) is inversely proportional to aggregate system inertia H.',
          'When converter-interfaced wind, solar, and battery plants replace synchronous thermal units under grid-following phase-locked-loop (PLL) control, steady-state megawatt balance remains intact while rotational inertia drops. Under a sudden tie-line split or generator trip, steeper RoCoF trajectories narrow the window before under-frequency load-shedding relays or protection mis-operations occur.',
        ],
      },
      {
        heading: 'Grid-forming controls and DC-link physical headroom',
        paragraphs: [
          'Virtual synchronous machine (VSM) and droop-based grid-forming converters synthesize an internal voltage phasor with programmable inertia and damping constants. Yet synthetic inertia is only credible when backed by real joules on the DC bus — supercapacitors, deloaded PV headroom, or battery cells sized for high C-rate transient power pulses without hitting semiconductor current limits.',
          'Physics-informed stability assessment models both the fast inner current-limiting saturation of IGBTs/SiC valves and the electromechanical swing modes of remaining synchronous condensers and traction converters. Treating converters as ideal voltage sources hides precisely the fault-ride-through nonlinearities where voltage collapse originates.',
        ],
      },
      {
        heading: 'Implications for regional transmission and rail interfaces',
        paragraphs: [
          'Regional pockets with high inverter share and heavy industrial or railway converter loads require locational inertia and short-circuit ratio (SCR) monitoring rather than system-wide averages. Embedding swing-equation and impedance constraints directly inside network digital twins turns stability boundaries into continuous operational envelopes.',
        ],
      },
    ],
    tags: ['50 Hz Stability', 'Synchronous Inertia', 'RoCoF', 'Grid-Forming Converters', 'Swing Equation'],
  },
  {
    slug: 'it-ot-traction-power',
    date: '2026-11-09',
    readingTime: '8 min read',
    kicker: 'Technical Article · Critical Infrastructure',
    title: 'IT/OT convergence in high-voltage and railway traction power systems',
    summary:
      'Bridging engineering network models (CIM/CGMES, IEC 61850) with operational telemetry and security ontologies without compromising deterministic substation protection.',
    heroImage: '/images/electrical/06-it-ot-convergence-control-room.jpg',
    heroAlt: 'IT/OT convergence control room with SCADA and power system monitoring',
    heroCode: 'ART. 02A · SCADA & TELEMETRY ARCHITECTURE',
    heroCaption: 'Supervisory monitoring across high-voltage substations, feeder bays, and segmented operational technology zones.',
    secondaryImage: '/images/critical/07-it-ot-critical-infrastructure.jpg',
    secondaryAlt: 'IT/OT convergence control room for power systems',
    secondaryCode: 'ART. 02B · KRITIS GOVERNANCE & SEGMENTATION',
    secondaryCaption: 'Strict data-diode and zone-conduit boundaries separating deterministic bay protection from analytical digital twins.',
    sections: [
      {
        heading: 'Why power and railway OT differ from enterprise IT',
        paragraphs: [
          'High-voltage transmission and 16.7 Hz / 110 kV railway traction networks operate under availability and physical safety imperatives where protection relays must clear faults within milliseconds. Equipment lifetimes span decades, whereas IT analytics, cloud telemetry, and security threat landscapes evolve on monthly cycles.',
          'Convergence fails whenever enterprise tooling treats substation IEDs as ordinary endpoints or, conversely, when engineering topology files remain trapped in static offline snapshots disconnected from asset management and cyber-risk analysis.',
        ],
      },
      {
        heading: 'Semantic continuity from CGMES and IEC 61850 to threat models',
        paragraphs: [
          'Standards such as IEC 61970/61968 (CIM/CGMES) for grid topology and IEC 61850 (SCL) for substation automation encode rich electrical connectivity: breaker states, busbar sections, instrument transformers, and protection zones. Linking these formal graph representations to operational threat ontologies ensures that switching operations or bay retrofits automatically propagate into impact assessments.',
          'This exact cross-domain semantic gap motivated the CIM–ThreMA ontology simulator developed at RWTH Aachen: translating topology mutations directly into updated cyber-physical exposure paths without manual spreadsheet reconciliation.',
        ],
      },
      {
        heading: 'Deterministic boundaries in regulated infrastructure',
        paragraphs: [
          'In KRITIS-regulated infrastructure, analytical models and machine-learning estimators belong in read-only supervisory or planning zones fed via unidirectional gateways or strictly policed conduits. Actuation remains governed by deterministic interlocking, IEC 61850 protection schemes, and human switching authority.',
        ],
      },
    ],
    tags: ['IT/OT Convergence', 'Railway Traction Power', 'CIM / CGMES', 'IEC 61850', 'KRITIS Governance'],
  },
  {
    slug: 'ai-is-power-bound',
    date: '2026-11-09',
    readingTime: '8 min read',
    kicker: 'Technical Article · Power Capacity & Infrastructure',
    title: 'AI infrastructure is power-bound: interconnection queues and hall capacity envelopes',
    summary:
      'Why multi-hundred-megawatt compute clusters face binding constraints in high-voltage interconnection, transformer impedance, load-step transients, and hall thermal-electrical envelopes.',
    heroImage: '/images/critical/01-ai-data-center-power-bottleneck.jpg',
    heroAlt: 'AI data center power bottleneck with binding electrical constraints',
    heroCode: 'ART. 03A · COMPUTE-TO-GRID BOTTLENECK',
    heroCaption: 'High-density compute campuses gated by bulk substation transformer capacity, feeder redundancy, and harmonic limits.',
    secondaryImage: '/images/critical/02-interconnection-queue-capacity.jpg',
    secondaryAlt: 'Interconnection queue and power capacity for AI infrastructure',
    secondaryCode: 'ART. 03B · INTERCONNECTION QUEUE DYNAMICS',
    secondaryCaption: 'Transmission congestion and multi-year study backlogs separating requested megawatts from firm energization dates.',
    tertiaryImage: '/images/critical/09-power-capacity-envelope.jpg',
    tertiaryAlt: 'Power capacity envelope showing electrical and thermal limits of data center halls',
    tertiaryCode: 'ART. 03C · HALL THERMAL-ELECTRICAL ENVELOPE',
    tertiaryCaption: 'Feasible operating region bounded simultaneously by switchgear ampacity, UPS ride-through, transformer hot-spot temperature, and cooling rejection.',
    sections: [
      {
        heading: 'Time-to-power as the primary scaling limiter',
        paragraphs: [
          'Accelerator racks can be manufactured and shipped in quarters, whereas new 110 kV to 400 kV substations, large power transformers, and transmission corridor upgrades require multi-year permitting, procurement, and N-1 contingency studies. Interconnection queues across Europe and North America hold hundreds of gigawatts of speculative and firm requests competing for scarce thermal and voltage stability headroom.',
          'Furthermore, synchronous training workloads exhibit steep, synchronized megawatt load ramps and drops across thousands of GPUs within fractions of a second — introducing voltage flicker, UPS battery cycling, and sub-synchronous interaction risks unfamiliar to traditional enterprise data centers.',
        ],
      },
      {
        heading: 'Inside the hall: the coupled electrical and thermal envelope',
        paragraphs: [
          'Even on energized sites, nameplate substation megawatts rarely equal usable compute capacity. Real deliverable power sits inside a multidimensional envelope constrained by medium-voltage ring ampacity, transformer top-oil and winding hot-spot thermal time constants (IEC 60076-7), harmonic current distortion (THD), N+1 breaker selectivity, and ambient wet-bulb cooling rejection.',
          'Static nameplate derating leaves substantial stranded capacity on cool days while risking nuisance trips during summer peaks or synchronized training bursts.',
        ],
      },
      {
        heading: 'Physics-informed capacity intelligence',
        paragraphs: [
          'Replacing static spreadsheet margins with physics-informed digital twins — coupling AC load flow, dynamic transformer thermal models, and feeder contingency envelopes — quantifies firm and flexible megawatt headroom hour by hour. Grounding siting and hall utilization in power-system physics provides an auditable path through the time-to-power bottleneck.',
        ],
      },
    ],
    tags: ['Time to Power', 'Interconnection Queues', 'Power Capacity Envelope', 'High-Voltage Substations', 'Thermal Modelling'],
  },
];

export function getArticle(slug: string): TechnicalArticle | undefined {
  return articles.find((a) => a.slug === slug);
}
