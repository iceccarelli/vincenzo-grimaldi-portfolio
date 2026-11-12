'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '../lib/i18n';
import { pick } from '../lib/copy';
import {
  CONFLICT_DE,
  CONFLICT_EN,
  EMAIL,
  FOOTER_PORTRAIT,
  GITHUB,
  LINKEDIN,
  SITE_NAME,
} from '../lib/site';

export default function SiteFooter() {
  const { locale } = useLanguage();
  const c = pick(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="ftr">
      <div className="ftr-in">
        <div className="ftr-colophon">
          <Image
            src={FOOTER_PORTRAIT}
            alt="Vincenzo Ceccarelli Grimaldi"
            width={56}
            height={56}
            className="ftr-avatar"
          />
          <div>
            <p className="ftr-author">{SITE_NAME}</p>
            <p className="ftr-sub">{c.footer.colophonRole}</p>
          </div>
        </div>
        <nav className="ftr-links" aria-label="Footer">
          <a href={'mailto:' + EMAIL}>{EMAIL}</a>
          <a href={GITHUB} rel="noopener noreferrer">
            GitHub
          </a>
          <a href={LINKEDIN} rel="noopener noreferrer">
            LinkedIn
          </a>
          <Link href="/registry">{c.nav.registry}</Link>
          <Link href="/card">{c.nav.card}</Link>
          <Link href="/impressum">{c.footer.imprint}</Link>
          <Link href="/datenschutz">{c.footer.privacy}</Link>
          <a href="https://engineeringgrimaldi.com" rel="noopener noreferrer">
            engineeringgrimaldi.com
          </a>
          <a href="https://grimaldi.ca" rel="noopener noreferrer">
            grimaldi.ca
          </a>
        </nav>
        <p className="ftr-note">{locale === 'de' ? CONFLICT_DE : CONFLICT_EN}</p>
        <p className="ftr-rights">
          © {year} {SITE_NAME}. {c.footer.rights}
        </p>
      </div>
    </footer>
  );
}
