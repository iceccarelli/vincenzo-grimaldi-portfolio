import type { Metadata } from 'next';
import NetworkLanding from '../components/NetworkLanding';

export const metadata: Metadata = {
  title: 'Network — four addresses, one verb each',
  description:
    'igrimaldi.engineering — verifiable intelligence for grids and traction power. engineeringgrimaldi.com — one trade cell, shipped and measured. grimaldi.ca — logbook, podcast, reviews, books. github.com/iceccarelli — clone or it does not exist.',
  alternates: { canonical: '/network' },
};

export const revalidate = 3600;

export default function NetworkPage() {
  return <NetworkLanding />;
}
