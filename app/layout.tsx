import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Header from './components/Header';
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
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Vincenzo Grimaldi | Physics-Informed Cyber-Physical Systems Engineer',
    description:
      'Embedding governing equations into AI for guaranteed physical consistency. Explore the immersive portfolio and the live Cross-Domain Ontology Simulator (2025 RWTH Aachen Master Thesis).',
    url: 'https://igrimaldi.engineering/',
    siteName: 'Vincenzo Grimaldi Portfolio',
    locale: 'en_GB',
    type: 'website',
    images: [
      {
        url: 'https://igrimaldi.engineering/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
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
  sameAs: ['https://github.com/iceccarelli', 'https://physics-informed.vercel.app/'],
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
        <div className="site-chrome">
          <div className="background-orb orb-one" />
          <div className="background-orb orb-two" />
          <div className="background-orb orb-three" />

          <Header />

          {children}

          <footer className="site-footer">
            <div className="section-shell">
              <div className="footer-content">
                {/* Column 1 – Entity */}
                <div>
                  <div className="brand-lockup" style={{ marginBottom: '1rem' }}>
                    <span className="brand-monogram" style={{ width: '42px', height: '42px', fontSize: '1.25rem' }}>VG</span>
                    <span className="brand-copy"><strong>Vincenzo Grimaldi</strong></span>
                  </div>
                  <p style={{ color: 'var(--muted-strong)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                    Physics-Informed Cyber-Physical Systems Engineer<br />
                    Deterministic control • Grid intelligence • AI orchestration<br />
                    <span style={{ color: '#34d399' }}>Creator of the 2025 RWTH Aachen Cross-Domain Ontology Simulator</span>
                  </p>
                  <p style={{ marginTop: '2rem', fontSize: '0.85rem', color: 'var(--muted)' }}>
                    © 2026 Vincenzo Grimaldi. All Rights Reserved.
                  </p>
                </div>

                {/* Column 2 – Sitemap */}
                <div className="footer-column">
                  <h4>Platform</h4>
                  <div className="footer-links" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <a className="footer-link" href="#architecture">Systems</a>
                    <a className="footer-link" href="#physics-informed">Physics-Informed</a>
                    <a className="footer-link" href="#flagship-systems">Flagship Work</a>
                    <a className="footer-link" href="https://physics-informed.vercel.app/" target="_blank" rel="noopener noreferrer">Live Simulator</a>
                    <a className="footer-link" href="#live-intelligence">Live Intelligence</a>
                    <a className="footer-link" href="#connect">Connect</a>
                  </div>
                </div>

                {/* Column 3 – Trust & Verification */}
                <div className="footer-column">
                  <h4>Proof of Work</h4>
                  <div className="footer-links" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <a 
                      className="footer-link" 
                      href="https://github.com/iceccarelli" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      GitHub — iceccarelli
                    </a>
                    <a className="footer-link" href="https://physics-informed.vercel.app/" target="_blank" rel="noopener noreferrer">Live Thesis Simulator</a>
                    <a className="footer-link" href="#" target="_blank" rel="noreferrer">ORCID (pending)</a>
                    <div className="footer-status">
                      <span className="live-dot" />
                      <span>Verified Engineering Expertise</span>
                    </div>
                  </div>
                </div>

                {/* Column 4 – System Status */}
                <div className="footer-column">
                  <h4>System Status</h4>
                  <div className="footer-status" style={{ marginBottom: '1rem' }}>
                    <span className="live-dot" />
                    <span style={{ color: 'var(--success)', fontWeight: 600 }}>Available for Consultation</span>
                  </div>
                  <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: '1.55' }}>
                    Europe-based • Open to high-impact CPS, grid intelligence,<br />
                    and autonomous systems opportunities.
                  </p>
                  <a 
                    href="mailto:vincenzo@igrimaldi.engineering" 
                    style={{ color: 'var(--accent-strong)', marginTop: '1.5rem', display: 'inline-block' }}
                  >
                    vincenzo@igrimaldi.engineering →
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
