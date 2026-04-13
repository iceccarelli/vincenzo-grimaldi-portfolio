'use client';

import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { useState, useEffect } from 'react';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://vincenzo-grimaldi-portfolio.vercel.app'),
  title: 'Vincenzo Grimaldi | Cyber-Physical Systems Engineer',
  description:
    'Deterministic control systems at the intersection of embedded logic, AI orchestration, grid intelligence, RTOS, and safety-critical infrastructure.',
  keywords: [
    'Vincenzo Grimaldi',
    'Cyber-Physical Systems',
    'CPS Engineer',
    'Grid Intelligence',
    'DER Coordination',
    'Embedded Systems',
    'AI-native Middleware',
    'Control Loops',
    'RTOS',
    'Signal Integrity',
    'Verification & Validation',
  ],
  authors: [{ name: 'Vincenzo Grimaldi' }],
  creator: 'Vincenzo Grimaldi',
  publisher: 'Vincenzo Grimaldi',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Vincenzo Grimaldi | Cyber-Physical Systems Engineer',
    description:
      'Engineering deterministic, safety-critical systems that connect intelligence, infrastructure, and execution.',
    url: 'https://vincenzo-grimaldi-portfolio.vercel.app/',
    siteName: 'Vincenzo Grimaldi Portfolio',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vincenzo Grimaldi | Cyber-Physical Systems Engineer',
    description:
      'Deterministic control • Grid intelligence • AI orchestration • Embedded systems.',
  },
};

const navigation = [
  { label: 'Systems', href: '#architecture' },
  { label: 'Flagship Work', href: '#flagship-systems' },
  { label: 'Live Intelligence', href: '#live-intelligence' },
  { label: 'Research', href: '#phd' },
  { label: 'Connect', href: '#connect' },
];

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Vincenzo Grimaldi',
  url: 'https://vincenzo-grimaldi-portfolio.vercel.app/',
  sameAs: ['https://github.com/iceccarelli'],
  jobTitle: 'Cyber-Physical Systems Engineer',
  knowsAbout: [
    'Artificial Intelligence',
    'Smart Grids',
    'Distributed Energy Resources',
    'Digital Infrastructure',
    'Robotics',
    'Systems Engineering',
    'Embedded Control Systems',
    'RTOS',
    'Signal Integrity',
    'Control Loops',
  ],
  description:
    'Engineer building deterministic cyber-physical systems that connect intelligence, infrastructure, and execution.',
};

// Custom React Hook – useScrollDirection (throttled with requestAnimationFrame, zero layout thrashing)
function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;

      if (Math.abs(currentScrollY - lastScrollY) > 50) {
        if (currentScrollY > lastScrollY) {
          setScrollDirection('down');
        } else {
          setScrollDirection('up');
        }
        setLastScrollY(currentScrollY);
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDirection);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [lastScrollY]);

  return scrollDirection;
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const scrollDirection = useScrollDirection();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Auto-close mobile menu on deep scroll
  useEffect(() => {
    if (mobileMenuOpen) {
      const handleScroll = () => {
        if (window.scrollY > 300) setMobileMenuOpen(false);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [mobileMenuOpen]);

  const isNavbarHidden = scrollDirection === 'down';

  return (
    <html lang="en">
      <body>
        <div className="site-chrome">
          {/* Background orbs remain exactly as in the new globals.css */}
          <div className="background-orb orb-one" />
          <div className="background-orb orb-two" />
          <div className="background-orb orb-three" />

          {/* Dynamic Header – fully integrated with the new CSS */}
          <header className={`topbar ${isNavbarHidden ? 'hidden' : ''}`}>
            <div className="topbar-inner">
              {/* Brand Lockup */}
              <a className="brand-lockup" href="#top">
                <span className="brand-monogram">VG</span>
                <span className="brand-copy">
                  <strong>Vincenzo Grimaldi</strong>
                  <small>Cyber-Physical Systems • Control Engineering</small>
                </span>
              </a>

              {/* Desktop Navigation */}
              <nav className="topbar-nav" aria-label="Primary navigation">
                {navigation.map((item) => (
                  <a key={item.href} href={item.href}>
                    {item.label}
                  </a>
                ))}
              </nav>

              {/* GitHub + Hamburger */}
              <div className="flex items-center gap-4">
                <a
                  className="topbar-button"
                  href="https://github.com/iceccarelli"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>

                {/* Hamburger – fully styled in the new globals.css */}
                <button
                  className="hamburger"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-label="Toggle mobile menu"
                >
                  <span className="bar" />
                  <span className="bar" />
                  <span className="bar" />
                </button>
              </div>
            </div>

            {/* Mobile Menu – fully styled in the new globals.css */}
            <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="https://github.com/iceccarelli"
                target="_blank"
                rel="noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                style={{ marginTop: '1rem', fontWeight: 600 }}
              >
                GitHub Profile →
              </a>
            </div>
          </header>

          {children}

          {/* Enterprise-grade Footer – perfectly matches the new .footer-content grid in globals.css */}
          <footer className="site-footer">
            <div className="section-shell">
              <div className="footer-content">
                {/* Column 1 – Entity */}
                <div>
                  <div className="brand-lockup" style={{ marginBottom: '1rem' }}>
                    <span className="brand-monogram" style={{ width: '42px', height: '42px', fontSize: '1.25rem' }}>
                      VG
                    </span>
                    <span className="brand-copy">
                      <strong>Vincenzo Grimaldi</strong>
                    </span>
                  </div>
                  <p style={{ color: 'var(--muted-strong)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                    Cyber-Physical Systems Engineer
                    <br />
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
                    {navigation.map((item) => (
                      <a key={item.href} className="footer-link" href={item.href}>
                        {item.label}
                      </a>
                    ))}
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
                      rel="noreferrer"
                    >
                      GitHub — iceccarelli
                    </a>
                    <a className="footer-link" href="#" target="_blank" rel="noreferrer">
                      ORCID (pending)
                    </a>
                    <a className="footer-link" href="#" target="_blank" rel="noreferrer">
                      Google Scholar
                    </a>
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
                    Europe-based • Open to high-impact CPS, grid intelligence,
                    <br />
                    and autonomous systems opportunities.
                  </p>
                  <a
                    href="mailto:vincenzo@grimaldi.engineering"
                    style={{ color: 'var(--accent-strong)', marginTop: '1.5rem', display: 'inline-block' }}
                  >
                    vincenzo@grimaldi.engineering →
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>

        {/* Structured data remains unchanged */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
