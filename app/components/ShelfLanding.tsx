'use client';

import VentureShelf from './VentureShelf';
import { useLanguage } from '../lib/i18n';
import { lab, tx, ventures } from '../lib/copy';
import { byShelf, projects, type Shelf } from '../lib/registry';

/**
 * ShelfLanding — /ventures and /lab share one layout: kicker, title, intro,
 * ranked shelf. /ventures also lists Bahn Project Manager (it is a client
 * build even though it passes the /work gate) so nothing is hidden.
 */
export default function ShelfLanding({ shelf }: { shelf: Shelf }) {
  const { locale } = useLanguage();
  const copy = shelf === 'lab' ? lab : ventures;

  const items =
    shelf === 'ventures'
      ? [...byShelf('ventures'), ...projects.filter((p) => p.name === 'Bahn Project Manager')]
      : byShelf('lab');

  return (
    <main className="content-sheet route-page">
      <section className="section-shell content-section" id={shelf}>
        <span className="section-kicker">{tx(copy.kicker, locale)}</span>
        <h1>{tx(copy.title, locale)}</h1>
        <p className="section-intro" style={{ maxWidth: '720px' }}>{tx(copy.intro, locale)}</p>
        {shelf === 'lab' && (
          <p className="section-intro" style={{ maxWidth: '720px', marginTop: '0.75rem' }}>{tx(lab.forgeNote, locale)}</p>
        )}

        <VentureShelf items={items} showLabFields={shelf === 'lab'} />
      </section>
    </main>
  );
}
