import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Header from './components/Header';
import ScrollProgress from './components/ScrollProgress';
import FeedbackBanner from './components/FeedbackBanner';
import SiteFooter from './components/SiteFooter';
import { Analytics } from '@vercel/analytics/react';
import { LanguageProvider } from './lib/i18n';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://igrimaldi.engineering'),
  title: 'Vincenzo Grimaldi | Physics-Informed Cyber-Physical Systems Engineer',
  description:
    'Physics-Informed Systems • Deterministic Grid Intelligence • Agentic Digital Twins • NeuralBridge • GridOS • DERIM • Deutsche Bahn Grid Networks Engineer. Public implementation of 2025 RWTH Aachen Master Thesis: Cross-Domain CIM–ThreMA Ontology Simulator (https://physics-informed.vercel.app/). Two surfaces, one mission: Portfolio + GitHub.',
  keywords: [
    'Vincenzo Grimaldi',
    'Physics-Informed Neural Networks',
    'PINNs',
    'Agentic Digital Twins',
    'MARL',
    'GridOS',
    'NeuralBridge',
    'DERIM',
    'Cyber-Physical Systems',
    'CPS Engineer',
    'Grid Intelligence',
    'DER Coordination',
    'Embedded Systems',
    'AI-native Middleware',
    'Deterministic Control',
    'RTOS',
    'OT Cybersecurity',
    'Deutsche Bahn',
    'Signal Integrity',
    'Verification & Validation',
    'Physics-Informed Systems',
    'CIM ThreMA Ontology',
    'IEEE 9-Bus Cyber Testbed',
    'Reinforcement Learning Security Agent',
  ],
  authors: [{ name: 'Vincenzo Grimaldi' }],
  creator: 'Vincenzo Grimaldi',
  publisher: 'Vincenzo Grimaldi',
  alternates: {
    canonical: '/',
    languages: {
      'x-default': '/',
      en: '/',
      es: '/?lang=es',
      de: '/?lang=de',
      'zh-Hans': '/?lang=zh',
    },
  },
  openGraph: {
    title: 'Vincenzo Grimaldi | Physics-Informed Cyber-Physical Systems Engineer',
    description:
      'Embedding governing equations into AI for guaranteed physical consistency. Explore the immersive portfolio and the live Cross-Domain Ontology Simulator (2025 RWTH Aachen Master Thesis).',
    url: 'https://igrimaldi.engineering/',
    siteName: 'Vincenzo Grimaldi Portfolio',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vincenzo Grimaldi | Physics-Informed Cyber-Physical Systems Engineer',
    description: 'Physics-Informed AI • Deterministic Control • Grid Intelligence • Live Thesis Simulator',
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Vincenzo Grimaldi',
  url: 'https://igrimaldi.engineering/',
  sameAs: [
    'https://github.com/iceccarelli',
    'https://physics-informed.vercel.app/',
    'https://engineeringgrimaldi.com/',
    'https://grimaldi.ca/',
  ],
  jobTitle: 'Physics-Informed Cyber-Physical Systems Engineer • Grid Networks Engineer at Deutsche Bahn',
  knowsAbout: [
    'Physics-Informed Neural Networks',
    'Agentic Digital Twins',
    'Multi-Agent Reinforcement Learning',
    'Smart Grids',
    'Distributed Energy Resources',
    'Digital Infrastructure',
    'Robotics',
    'Systems Engineering',
    'Embedded Control Systems',
    'RTOS',
    'OT Cybersecurity',
    'Deterministic Control Loops',
    'Physics-Informed AI',
    'CIM–ThreMA Cross-Domain Ontology',
    'IEEE 9-Bus Cyber-Physical Validation',
  ],
  description:
    'Engineer building verifiable, physics-guaranteed intelligence for safety-critical grids and autonomous systems. Creator of the public Cross-Domain Ontology Simulator (2025 RWTH Aachen Master Thesis). Dual-surface presence: immersive portfolio and developer-first GitHub profile.',
  alumniOf: {
    '@type': 'Organization',
    name: 'RWTH Aachen University',
  },
};


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <div className="site-chrome">
            <ScrollProgress />
            <Header />

            {children}

            <FeedbackBanner />

            <SiteFooter />
          </div>
        </LanguageProvider>

        <Analytics />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
