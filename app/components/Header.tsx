'use client';

import { useState, useEffect } from 'react';
import MegaMenu from './MegaMenu';
import CommandPalette from './CommandPalette';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../lib/i18n';

function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      const current = window.scrollY;
      if (Math.abs(current - lastScrollY) > 50) {
        setScrollDirection(current > lastScrollY ? 'down' : 'up');
        setLastScrollY(current);
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastScrollY]);

  return scrollDirection;
}

export default function Header() {
  const scrollDirection = useScrollDirection();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isNavbarHidden = scrollDirection === 'down';

  useEffect(() => {
    if (mobileMenuOpen && window.scrollY > 300) setMobileMenuOpen(false);
  }, [mobileMenuOpen]);

  const { t } = useLanguage();

  // Navigation aligned with all major sections + flagship simulator + network
  const navigation = [
    { label: t.nav.capabilities, href: '#capabilities' },
    { label: t.nav.simulator, href: '#thesis-simulator' },
    { label: t.nav.network, href: '#network' },
    { label: t.nav.payments, href: '#payments' },
    { label: t.nav.connect, href: '#connect' },
  ];

  return (
    <header className={`topbar ${isNavbarHidden ? 'hidden' : ''}`}>
      <div className="topbar-inner">
        {/* Brand Lockup — Updated subtitle for dual-surface alignment */}
        <a className="brand-lockup" href="#top">
          <span className="brand-monogram">VG</span>
          <span className="brand-copy">
            <strong>Vincenzo Grimaldi</strong>
            <small>Physics-Informed • Deterministic Control</small>
          </span>
        </a>

        {/* Primary Navigation */}
        <nav className="topbar-nav" aria-label="Primary navigation">
          <MegaMenu />
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <CommandPalette />

          {/* GitHub — Now clearly labeled as the Developer Surface */}
          <a
            className="topbar-button"
            href="https://github.com/iceccarelli"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub Profile
          </a>

          {/* Mobile Hamburger */}
          <button
            className={`hamburger ${mobileMenuOpen ? "open" : ""}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
          </button>
        </div>
      </div>

      {/* Mobile Menu — Fully synced with navigation */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        {navigation.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}>
            {item.label}
          </a>
        ))}
        <a
          href="https://github.com/iceccarelli"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setMobileMenuOpen(false)}
          style={{ marginTop: '1rem', fontWeight: 600 }}
        >
          GitHub Profile →
        </a>
        <LanguageSwitcher />
      </div>
    </header>
  );
}
