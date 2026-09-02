'use client';

import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../lib/i18n';
import { pick } from '../lib/copy';
import { SITE_NAME } from '../lib/site';

/**
 * Header — one quiet bar. Name on the left, three sections on the right,
 * a two-letter language toggle. On narrow screens the sections fold into a
 * native <details> element, so the menu works with JavaScript disabled.
 *
 * No mega menu, no search, no call to action. The document is the header.
 */
export default function Header() {
  const { locale } = useLanguage();
  const c = pick(locale);

  const items = [
    { label: c.nav.work, href: '/work' },
    { label: c.nav.thesis, href: '/simulator' },
    { label: c.nav.contact, href: '/connect' },
  ];

  return (
    <header className="hdr" id="top">
      <div className="hdr-in">
        <a className="hdr-name" href="/">
          {SITE_NAME}
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
            <a href="/card">{c.nav.card}</a>
            <LanguageSwitcher />
          </div>
        </details>
      </div>
    </header>
  );
}
