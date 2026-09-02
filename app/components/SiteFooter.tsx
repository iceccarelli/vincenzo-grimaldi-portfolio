'use client';

import { useLanguage } from '../lib/i18n';
import { pick } from '../lib/copy';
import { CONFLICT_DE, CONFLICT_EN, EMAIL, GITHUB, LINKEDIN, SITE_NAME } from '../lib/site';

/**
 * Footer — one row of plain links, the independence sentence, the year.
 * No columns, no call to action, no status dot.
 */
export default function SiteFooter() {
  const { locale } = useLanguage();
  const c = pick(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="ftr">
      <div className="ftr-in">
        <nav className="ftr-links" aria-label="Footer">
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <a href={GITHUB} rel="noopener noreferrer">GitHub</a>
          <a href={LINKEDIN} rel="noopener noreferrer">LinkedIn</a>
          <a href="/impressum">{c.footer.imprint}</a>
          <a href="/datenschutz">{c.footer.privacy}</a>
          <a href="https://engineeringgrimaldi.com" rel="noopener noreferrer">engineeringgrimaldi.com</a>
          <a href="https://grimaldi.ca" rel="noopener noreferrer">grimaldi.ca</a>
        </nav>
        <p className="ftr-note">{locale === 'de' ? CONFLICT_DE : CONFLICT_EN}</p>
        <p className="ftr-rights">
          © {year} {SITE_NAME}. {c.footer.rights}
        </p>
      </div>
    </footer>
  );
}
