import type { Metadata } from 'next';
import SimulatorLanding from '../components/SimulatorLanding';
import { SITE_URL } from '../lib/site';

export const metadata: Metadata = {
  title: 'CIM–ThreMA Smart-Grid Ontology Simulator',
  description:
    'Runnable M.Sc. thesis simulator (RWTH Aachen, 2025) linking CIM/CGMES power-grid topology to the ThreMA threat ontology on an IEEE 9-bus cyber-physical testbed.',
  alternates: { canonical: '/simulator' },
  openGraph: {
    title: 'CIM–ThreMA Smart-Grid Ontology Simulator',
    description:
      'Runnable M.Sc. thesis testbed coupling CGMES substation models and cyber-threat ontologies.',
    url: SITE_URL + '/simulator',
    images: [{ url: SITE_URL + '/images/electrical/08-thesis-simulator-workspace.jpg', width: 1168, height: 784 }],
  },
};

export default function SimulatorPage() {
  return <SimulatorLanding />;
}
