import type { Metadata } from 'next';
import ShelfLanding from '../components/ShelfLanding';

export const metadata: Metadata = {
  title: 'Lab — parked until a stranger can clone it',
  description:
    'GridOS, NeuralBridge, DERIM, robot-lidar-fusion, mcp-foundry, ForgeOS, GridForge, ForgePower, ThermalForge: PARKED. FloorForge, PaintForge, DryForge: PILOT repositories. Nothing here is for sale; 404 GitHub paths are shown as text, never linked.',
  alternates: { canonical: '/lab' },
  robots: { index: true, follow: true },
};

export const revalidate = 3600;

export default function LabPage() {
  return <ShelfLanding shelf="lab" />;
}
