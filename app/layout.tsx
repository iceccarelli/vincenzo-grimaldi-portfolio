import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Header from './components/Header';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://vincenzo-grimaldi-portfolio.vercel.app'),
  title: 'Vincenzo Grimaldi | Physics-Informed CPS Engineer',
  description:
    'Physics-Informed Neural Networks • Agentic Digital Twins • Deterministic Grid Intelligence • MARL • RTOS • Deutsche Bahn Grid Networks Engineer',
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
  ],
  authors: [{ name: 'Vincenzo Grimaldi' }],
  creator: 'Vincenzo Grimaldi',
  publisher: 'Vincenzo Grimaldi',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Vincenzo Grimaldi | Physics-Informed CPS Engineer',
    description: 'Embedding governing equations into AI for guaranteed physical consistency in safety-critical grids and autonomous systems.',
    url: 'https://vincenzo-grimaldi-portfolio.vercel.app/',
    siteName: 'Vincenzo Grimaldi Portfolio',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vincenzo Grimaldi | Physics-Informed CPS Engineer',
    description: 'Physics-Informed AI • Agentic Systems • Grid Intelligence • Deterministic Control',
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Vincenzo Grimaldi',
  url: 'https://vincenzo-grimaldi-portfolio.vercel.app/',
  sameAs: ['https://github.com/iceccarelli'],
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
  ],
  description: 'Engineer building verifiable, physics-guaranteed intelligence for safety-critical grids, autonomous systems, and real-time orchestration.',
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
                    Cyber-Physical Systems Engineer<br />
                    Deterministic control • Grid intelligence • AI orchestration
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
                    <a className="footer-link" href="#live-intelligence">Live Intelligence</a>
                    <a className="footer-link" href="#phd">Research</a>
                    <a className="footer-link" href="#connect">Connect</a>
                  </div>
                </div>

                {/* Column 3 – Trust & Verification */}
                <div className="footer-column">
                  <h4>Proof of Work</h4>
                  <div className="footer-links" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <a className="footer-link" href="https://github.com/iceccarelli" target="_blank" rel="noreferrer">GitHub — iceccarelli</a>
                    <a className="footer-link" href="#" target="_blank" rel="noreferrer">ORCID (pending)</a>
                    <a className="footer-link" href="#" target="_blank" rel="noreferrer">Google Scholar</a>
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
                  <a href="mailto:vincenzo@grimaldi.engineering" style={{ color: 'var(--accent-strong)', marginTop: '1.5rem', display: 'inline-block' }}>
                    vincenzo@grimaldi.engineering →
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
