import type { Metadata } from 'next';
import SimulatorLanding from '../components/SimulatorLanding';

export const metadata: Metadata = {
  title: 'Thesis simulator',
  description:
    'CIM–ThreMA cross-domain ontology simulator: the 2025 RWTH Aachen M.Sc. thesis made runnable, on an IEEE 9-bus cyber-physical testbed with a Q-learning security layer. Opens on its own deployment.',
  alternates: { canonical: '/simulator' },
};

export const revalidate = 3600;

export default function SimulatorPage() {
  return <SimulatorLanding />;
}
