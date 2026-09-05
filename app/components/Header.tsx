'use client';

import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../lib/i18n';
import { pick } from '../lib/copy';
import { SITE_NAME } from '../lib/site';

/**
 * Header — one quiet bar. Name on the left, the registers on the right,
 * a two-letter language toggle. On narrow screens everything folds into a
 * native <details> element, so the menu works with JavaScript disabled.
 *
 * No mega menu, no search, no call to action. The register is the header.
 */
export default function Header() {
  const { locale } = useLanguage();
  const c = pick(locale);

  const items = [
    { label: c.nav.registry, href: '/registry' },
    { label: c.nav.architecture, href: '/architecture' },
    { label: c.nav.decisions, href: '/decisions' },
    { label: c.nav.report, href: '/report' },
    { label: c.nav.work, href: '/work' },
    { label: c.nav.contact, href: '/connect' },
  ];
  const more = [
    { label: 'Palletizer', href: '/palletizer' },
    { label: 'Research', href: '/research' },
    { label: 'Contracts', href: '/contracts' },
    { label: 'Constitution', href: '/constitution' },
    { label: c.nav.thesis, href: '/simulator' },
    { label: c.nav.card, href: '/card' },
  ];

  return (
    <header className="hdr" id="top">
      <div className="hdr-in">
        <a className="hdr-name" href="/">
          {SITE_NAME}
          <span className="hdr-sub">{c.nav.cluster} · Physical AI</span>
        </a>

        <nav className="hdr-nav" aria-label="Primary">
          {items.map((i) => (
            <a key={i.href} href={i.href}>
              {i.label}
            </a>
          ))}
          <LanguageSwitcher />
        </nav>

        <details className="hdr-m">
          <summary>{c.nav.menu}</summary>
          <div className="hdr-m-list">
            {items.map((i) => (
              <a key={i.href} href={i.href}>
                {i.label}
              </a>
            ))}
            {more.map((i) => (
              <a key={i.href} href={i.href}>
                {i.label}
              </a>
            ))}
            <LanguageSwitcher />
          </div>
        </details>
      </div>
    </header>
  );
}
