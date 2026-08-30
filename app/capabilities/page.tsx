import type { Metadata } from 'next';
import CapabilitiesLanding from '../components/CapabilitiesLanding';

export const metadata: Metadata = {
  title: 'Capabilities',
  description:
    'Capability register with provenance: grid and power systems, industrial protocols and IT/OT, physics-informed learning, robotics and perception, agentic middleware, systems engineering.',
  alternates: { canonical: '/capabilities' },
};

export const revalidate = 3600;

export default function CapabilitiesPage() {
  return <CapabilitiesLanding />;
}
