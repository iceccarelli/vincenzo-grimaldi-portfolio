import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://vincenzo-grimaldi-portfolio.vercel.app'),
  title: 'Vincenzo Ceccarelli Grimaldi | AI, Energy Systems, and Digital Infrastructure',
  description:
    'A living portfolio for Vincenzo Ceccarelli Grimaldi, focused on AI-native systems, grid intelligence, digital infrastructure, robotics, and research-led engineering.',
  keywords: [
    'Vincenzo Ceccarelli Grimaldi',
    'AI systems engineer',
    'digital infrastructure',
    'energy systems',
    'smart grid',
    'DER',
    'NeuralBridge',
    'GridOS',
    'robotics',
    'portfolio',
  ],
  authors: [{ name: 'Vincenzo Ceccarelli Grimaldi' }],
  creator: 'Vincenzo Ceccarelli Grimaldi',
  publisher: 'Vincenzo Ceccarelli Grimaldi',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Vincenzo Ceccarelli Grimaldi | AI, Energy Systems, and Digital Infrastructure',
    description:
      'Explore live project signals, flagship systems, niche-market intelligence, and a research-led engineering portfolio.',
    url: 'https://vincenzo-grimaldi-portfolio.vercel.app/',
    siteName: 'Vincenzo Ceccarelli Grimaldi Portfolio',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vincenzo Ceccarelli Grimaldi | AI, Energy Systems, and Digital Infrastructure',
    description:
      'A living portfolio connecting intelligent systems, grid thinking, digital infrastructure, and research-driven execution.',
  },
};

const navigation = [
  { label: 'About', href: '#about' },
  { label: 'Architecture', href: '#architecture' },
  { label: 'Systems', href: '#flagship-systems' },
  { label: 'Live Intelligence', href: '#live-intelligence' },
  { label: 'Research', href: '#phd' },
  { label: 'Connect', href: '#connect' },
];

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Vincenzo Ceccarelli Grimaldi',
  url: 'https://vincenzo-grimaldi-portfolio.vercel.app/',
  sameAs: ['https://github.com/iceccarelli'],
  jobTitle: 'AI, Energy Systems, and Digital Infrastructure Engineer',
  knowsAbout: [
    'Artificial Intelligence',
    'Smart Grids',
    'Distributed Energy Resources',
    'Digital Infrastructure',
    'Robotics',
    'Systems Engineering',
  ],
  description:
    'Engineer building AI-native interfaces, digital infrastructure experiences, grid-intelligence systems, and research-led technical platforms.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="site-chrome">
          <div className="background-orb orb-one" />
          <div className="background-orb orb-two" />
          <div className="background-orb orb-three" />

          <header className="topbar">
            <div className="topbar-inner">
              <a className="brand-lockup" href="#top">
                <span className="brand-monogram">VCG</span>
                <span className="brand-copy">
                  <strong>Vincenzo Ceccarelli Grimaldi</strong>
                  <small>AI systems • energy intelligence • digital infrastructure</small>
                </span>
              </a>

              <nav className="topbar-nav" aria-label="Primary navigation">
                {navigation.map((item) => (
                  <a key={item.href} href={item.href}>
                    {item.label}
                  </a>
                ))}
              </nav>

              <div className="topbar-actions">
                <a className="topbar-button" href="https://github.com/iceccarelli" target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </div>
            </div>
          </header>

          {children}

          <footer className="site-footer">
            <div className="section-shell footer-grid">
              <div>
                <span className="section-kicker">Portfolio intent</span>
                <h2 className="compact-heading">A living portfolio for engineering, systems thinking, and long-term technical credibility.</h2>
              </div>
              <div className="footer-links">
                <a className="footer-link" href="https://github.com/iceccarelli" target="_blank" rel="noreferrer">
                  GitHub profile
                </a>
                <a className="footer-link" href="#live-intelligence">
                  Live intelligence hub
                </a>
                <a className="footer-link" href="#phd">
                  Research trajectory
                </a>
                <a className="footer-link" href="mailto:vincenzocgwork@gmail.com">
                  vincenzocgwork@gmail.com
                </a>
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
