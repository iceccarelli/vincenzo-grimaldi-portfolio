'use client';

import Link from 'next/link';
import { useLanguage } from '../lib/i18n';
import { pick } from '../lib/copy';

export default function DomainNav({ current }: { current: string }) {
  const { locale } = useLanguage();
  const c = pick(locale);

  const links = [
    { href: '/', label: c.nav.overview },
    { href: '/grids', label: c.nav.grids },
    { href: '/machines', label: c.nav.machines },
    { href: '/digital-twins', label: c.nav.twins },
    { href: '/articles', label: c.nav.articles },
    { href: '/simulator', label: c.nav.thesis },
    { href: '/work', label: c.nav.work },
    { href: '/registry', label: c.nav.registry },
  ];

  return (
    <nav className="subnav" aria-label="Technical pillars">
      <ol>
        {links.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={current === item.href ? 'page' : undefined}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
      <a className="subnav-json" href="/api/register">
        JSON
      </a>
    </nav>
  );
}
