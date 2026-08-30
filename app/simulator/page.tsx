import type { Metadata } from 'next';
import SimulatorLanding from '../components/SimulatorLanding';

export const metadata: Metadata = {
  title: 'Thesis Simulator',
  description:
    'The CIM–ThreMA cross-domain ontology simulator: 2025 RWTH Aachen M.Sc. thesis implementation with an IEEE 9-bus cyber testbed and a Q-learning security agent.',
  alternates: { canonical: '/simulator' },
};

export const revalidate = 3600;

export default function SimulatorPage() {
  return <SimulatorLanding />;
}
