import type { Metadata } from 'next';
import ShelfLanding from '../components/ShelfLanding';

export const metadata: Metadata = {
  title: 'Ventures — client builds and off-niche work',
  description:
    'Palletizer OS (SHIPPED v0.2 heuristic, sold on engineeringgrimaldi.com), Plastilonas Peruanas SAC (CLIENT BUILD), ecowoods-app (CLIENT BUILD, channel candidate), Bahn Project Manager (CLIENT BUILD). Real, opened by real users, not what this domain sells.',
  alternates: { canonical: '/ventures' },
};

export const revalidate = 3600;

export default function VenturesPage() {
  return <ShelfLanding shelf="ventures" />;
}
