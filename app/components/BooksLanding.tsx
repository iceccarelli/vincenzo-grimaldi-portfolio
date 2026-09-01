'use client';

import StatusBadge from './StatusBadge';
import { useLanguage } from '../lib/i18n';
import { books, tx } from '../lib/copy';

/** BooksLanding — /books is a pointer, not a shelf. */
export default function BooksLanding() {
  const { locale } = useLanguage();

  return (
    <main className="content-sheet route-page">
      <section className="section-shell content-section" id="books">
        <div className="glass-panel cta-panel spotlight-border">
          <div>
            <span className="section-kicker">{tx(books.kicker, locale)}</span>
            <div style={{ marginBottom: '0.5rem' }}>
              <StatusBadge status="IN REVISION" locale={locale} />
            </div>
            <h1>{tx(books.title, locale)}</h1>
            <p>{tx(books.body, locale)}</p>
          </div>
          <div className="hero-actions">
            <a className="primary-button" href="https://grimaldi.ca/books" target="_blank" rel="noopener noreferrer">
              {tx(books.cta, locale)} ↗
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
