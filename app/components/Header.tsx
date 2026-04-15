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

  // Updated navigation – perfectly aligned with all new sections
  const navigation = [
    { label: 'Systems', href: '#architecture' },
    { label: 'Physics-Informed', href: '#physics-informed' },
    { label: 'Flagship Work', href: '#flagship-systems' },
    { label: 'Live Intelligence', href: '#live-intelligence' },
    { label: 'Research', href: '#phd' },
    { label: 'Connect', href: '#connect' },
  ];

  return (
    <header className={`topbar ${isNavbarHidden ? 'hidden' : ''}`}>
      <div className="topbar-inner">
        <a className="brand-lockup" href="#top">
          <span className="brand-monogram">VG</span>
          <span className="brand-copy">
            <strong>Vincenzo Grimaldi</strong>
            <small>Cyber-Physical Systems • Control Engineering</small>
          </span>
        </a>

        <nav className="topbar-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            className="topbar-button"
            href="https://github.com/iceccarelli"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>

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

      {/* Mobile Menu – fully synced with new navigation */}
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
  );
}
