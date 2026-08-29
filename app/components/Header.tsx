'use client';

import { useState } from 'react';
import MegaMenu from './MegaMenu';
import CommandPalette from './CommandPalette';
import LanguageSwitcher from './LanguageSwitcher';
import BrandMark from './BrandMark';
import { useLanguage } from '../lib/i18n';

/**
 * Two-tier chrome, one structure on every screen size:
 *
 *   1. Dark utility bar — language switcher + cross-domain links.
 *      Scrolls away; hidden entirely on small screens.
 *   2. White primary nav — brand, sections, search, Connect CTA.
 *      Sticky on every screen size. On mobile the sections move into the
 *      hamburger menu; nothing else changes.
 */
export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  const navigation = [
    { label: t.nav.capabilities, href: '#capabilities' },
    { label: t.nav.simulator, href: '#thesis-simulator' },
    { label: t.nav.network, href: '#network' },
    { label: t.nav.payments, href: '#payments' },
    { label: t.nav.connect, href: '#connect' },
  ];

  return (
    <header className="site-header">
      {/* Tier 1 — utility bar */}
      <div className="utility-bar">
        <div className="utility-inner">
          <LanguageSwitcher />
          <a className="utility-link" href="https://engineeringgrimaldi.com" target="_blank" rel="noopener noreferrer">
            engineeringgrimaldi.com
          </a>
          <a className="utility-link" href="https://grimaldi.ca" target="_blank" rel="noopener noreferrer">
            grimaldi.ca
          </a>
          <a className="utility-link" href="https://github.com/iceccarelli" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a className="utility-link" href="/card">
            {t.card.kicker}
          </a>
          <a className="utility-link" href="#connect">
            {t.nav.connect}
          </a>
        </div>
      </div>

      {/* Tier 2 — primary nav */}
      <div className="topbar">
        <div className="topbar-inner">
          <a className="brand-lockup" href="#top">
            <BrandMark size={38} />
            <span className="brand-copy">
              <strong>Vincenzo Grimaldi</strong>
              <small>Physics-Informed • Deterministic Control</small>
            </span>
          </a>

          <nav className="topbar-nav" aria-label="Primary navigation">
            <MegaMenu />
            {navigation.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <CommandPalette />
            <a className="topbar-button" href="#connect">
              {t.nav.connect}
            </a>

            <button
              className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}
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
      </div>

      {/* Mobile menu — same sections, same order as desktop */}
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
        >
          GitHub →
        </a>
        <a href="https://engineeringgrimaldi.com" target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)}>
          engineeringgrimaldi.com →
        </a>
        <a href="https://grimaldi.ca" target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)}>
          grimaldi.ca →
        </a>
        <LanguageSwitcher />
      </div>
    </header>
  );
}
