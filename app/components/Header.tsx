'use client';

import { useState } from 'react';
import MegaMenu from './MegaMenu';
import CommandPalette from './CommandPalette';
import LanguageSwitcher from './LanguageSwitcher';
import BrandMark from './BrandMark';
import { useLanguage } from '../lib/i18n';
import { emit } from '../lib/events';
import { nav, tx } from '../lib/copy';

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
  const { t, locale } = useLanguage();

  // Ranked: Work / Simulator / Advisory / Network. Ventures, Lab, Books and
  // Capabilities are one click deeper (mega menu + mobile menu + footer).
  const navigation = [
    { label: tx(nav.work, locale), href: '/work' },
    { label: tx(nav.simulator, locale), href: '/simulator' },
    { label: tx(nav.advisory, locale), href: '/advisory' },
    { label: tx(nav.network, locale), href: '/network' },
  ];
  const secondary = [
    { label: tx(nav.ventures, locale), href: '/ventures' },
    { label: tx(nav.lab, locale), href: '/lab' },
    { label: tx(nav.books, locale), href: '/books' },
    { label: tx(nav.capabilities, locale), href: '/capabilities' },
    { label: t.nav.connect, href: '/connect' },
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
          <a className="utility-link" href="/connect">
            {t.nav.connect}
          </a>
        </div>
      </div>

      {/* Tier 2 — primary nav */}
      <div className="topbar">
        <div className="topbar-inner">
          <a className="brand-lockup" href="/">
            <BrandMark size={38} />
            <span className="brand-copy">
              <strong>Vincenzo Grimaldi</strong>
              <small>Grids · Traction · Verification</small>
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
            <a
              className="topbar-button"
              href="/connect"
              onClick={() => emit('book_click', { source: 'header' })}
            >
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
        {[...navigation, ...secondary].map((item) => (
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
