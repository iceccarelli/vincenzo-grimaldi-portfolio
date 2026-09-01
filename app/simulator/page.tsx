import type { Metadata } from 'next';
import SimulatorLanding from '../components/SimulatorLanding';
import { getValidation } from '../lib/validation';

export const metadata: Metadata = {
  title: 'IEEE 9-bus simulator — PINN residuals vs analytical and Newton-Raphson',
  description:
    'In-browser IEEE 9-bus DC power flow with N-1, plus the residual table from the live explorer: DC PINN vs analytical (0.0124° RMSE), AC PINN vs Newton-Raphson (0.0035°), physics-loss ablation, 25 tests. What it is, and what it is not.',
  alternates: { canonical: '/simulator' },
};

export const revalidate = 3600;

export default async function SimulatorPage() {
  const validation = await getValidation();
  return <SimulatorLanding validation={validation} />;
}
