import type { Metadata } from 'next';
import type { ReactNode } from 'react';

/**
 * /card — metadata + structured data for the digital business card.
 *
 * The page itself is a client component (it renders in the visitor's chosen
 * locale), so title, description, canonical, Open Graph and the ProfilePage
 * JSON-LD live here. The Person node is complete — image, jobTitle, sameAs
 * across all domains — so that search engines and AI agents resolve
 * "Vincenzo Grimaldi" to this card in one read.
 */

const URL = 'https://igrimaldi.engineering/card';
const TITLE = 'Vincenzo Ceccarelli Grimaldi — Card';
const DESCRIPTION =
  'Vincenzo Ceccarelli Grimaldi, Frankfurt am Main. Physics-constrained control · grid digitalisation. Email, GitHub, LinkedIn, vCard and QR.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/card' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    type: 'profile',
    images: [{ url: 'https://igrimaldi.engineering/vincenzo_grimaldi_headshot.jpg', width: 2048, height: 2048 }],
  },
  twitter: {
    card: 'summary',
    title: TITLE,
    description: DESCRIPTION,
  },
};

const profileSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': `${URL}#profile`,
  url: URL,
  name: TITLE,
  description: DESCRIPTION,
  mainEntity: {
    '@type': 'Person',
    '@id': 'https://igrimaldi.engineering/#person',
    name: 'Vincenzo Ceccarelli Grimaldi',
    alternateName: 'Vincenzo Grimaldi',
    url: 'https://igrimaldi.engineering/',
    image: 'https://igrimaldi.engineering/vincenzo_grimaldi_headshot.jpg',
    jobTitle: 'Engineer — physics-constrained control and grid digitalisation',
    email: 'mailto:vincenzo@igrimaldi.engineering',
    worksFor: { '@type': 'Organization', name: 'DB InfraGO AG' },
    alumniOf: { '@type': 'Organization', name: 'RWTH Aachen University' },
    sameAs: [
      'https://github.com/iceccarelli',
      'https://www.linkedin.com/in/vincenzo-ceccarelli-grimaldi-2912b42a0',
      'https://x.com/Vince87Grimaldi',
      'https://www.instagram.com/grimaldiengineering/',
      'https://physics-informed.vercel.app/',
      'https://engineeringgrimaldi.com/',
      'https://grimaldi.ca/',
    ],
  },
};

export default function CardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema) }}
      />
      {children}
    </>
  );
}
