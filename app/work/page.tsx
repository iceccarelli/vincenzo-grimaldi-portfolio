import type { Metadata } from 'next';
import WorkLanding from '../components/WorkLanding';

export const metadata: Metadata = {
  title: 'Work — capability register',
  description:
    'Capability register for grids and traction power, gated to artefacts a stranger can open: the IEEE 9-bus explorer (DC/AC PINN residuals vs analytical and Newton-Raphson, SHIPPED DEMO) and Bahn Project Manager (CLIENT BUILD). Palletizer pointer. Sanitized DB InfraGO context.',
  alternates: { canonical: '/work' },
};

export const revalidate = 3600;

export default function WorkPage() {
  return <WorkLanding />;
}
