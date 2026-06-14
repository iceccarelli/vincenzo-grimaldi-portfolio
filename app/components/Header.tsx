'use client';

import { useState, useEffect } from 'react';

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

  // Navigation aligned with all major sections + NEW flagship simulator
  const navigation = [
    { label: 'Systems', href: '#architecture' },
    { label: 'Physics-Informed', href: '#physics-informed' },
    { label: 'Flagship Work', href: '#flagship-systems' },
    { label: 'Live Simulator', href: 'https://physics-informed.vercel.app/', external: true }, // NEW
    { label: 'Live Intelligence', href: '#live-intelligence' },
    { label: 'Payments', href: '#payments' },
    { label: 'Connect', href: '#connect' },
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
          {navigation.map((item) => (
            item.external ? (
              <a 
                key={item.href} 
                href={item.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1"
              >
                {item.label}
                <span className="text-[10px] px-1.5 py-px rounded bg-emerald-500/20 text-emerald-400">LIVE</span>
              </a>
            ) : (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            )
          ))}
        </nav>

        <div className="flex items-center gap-4">
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

      {/* Mobile Menu — Fully synced with navigation */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        {navigation.map((item) => (
          item.external ? (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2"
            >
              {item.label}
              <span className="text-[10px] px-1.5 py-px rounded bg-emerald-500/20 text-emerald-400">LIVE</span>
            </a>
          ) : (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          )
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
      </div>
    </header>
  );
}
