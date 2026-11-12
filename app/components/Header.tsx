'use client';

import Link from 'next/link';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../lib/i18n';
import { pick } from '../lib/copy';
import { SITE_NAME } from '../lib/site';

export default function Header() {
  const { locale } = useLanguage();
  const c = pick(locale);

  const items = [
    { label: c.nav.grids, href: '/grids' },
    { label: c.nav.machines, href: '/machines' },
    { label: c.nav.twins, href: '/digital-twins' },
    { label: c.nav.articles, href: '/articles' },
    { label: c.nav.work, href: '/work' },
    { label: c.nav.contact, href: '/connect' },
  ];
  const more = [
    { label: c.nav.thesis, href: '/simulator' },
    { label: c.nav.registry, href: '/registry' },
    { label: c.nav.card, href: '/card' },
  ];

  return (
    <header className="hdr" id="top">
      <div className="hdr-in">
        <Link className="hdr-name" href="/">
          {SITE_NAME}
          <span className="hdr-sub">{c.nav.domain}</span>
        </Link>
        <nav className="hdr-nav" aria-label="Primary">
          {items.map((i) => (
            <Link key={i.href} href={i.href}>
              {i.label}
            </Link>
          ))}
          <LanguageSwitcher />
        </nav>
        <details className="hdr-m">
          <summary>{c.nav.menu}</summary>
          <div className="hdr-m-list">
            {items.map((i) => (
              <Link key={i.href} href={i.href}>
                {i.label}
              </Link>
            ))}
            {more.map((i) => (
              <Link key={i.href} href={i.href}>
                {i.label}
              </Link>
            ))}
            <LanguageSwitcher />
          </div>
        </details>
      </div>
    </header>
  );
}
