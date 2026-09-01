'use client';

import StatusBadge from './StatusBadge';
import { useLanguage } from '../lib/i18n';
import { lab, tx, work } from '../lib/copy';
import { linkable } from '../lib/status';
import type { Project } from '../lib/registry';

/**
 * VentureShelf — a flat, ranked list of projects for /ventures and /lab.
 * Every row: badge, name, one line, and only links that resolve. A claimed
 * GitHub path that 404s is printed as struck-through text with a note.
 */
export default function VentureShelf({ items, showLabFields = false }: { items: Project[]; showLabFields?: boolean }) {
  const { locale } = useLanguage();

  return (
    <ol className="shelf">
      {items.map((p) => {
        const repo = linkable(p.repo);
        return (
          <li key={p.name} className="shelf-row glass-panel">
            <div className="shelf-main">
              <div className="shelf-title">
                <StatusBadge status={p.status} locale={locale} />
                <h2>{p.name}</h2>
              </div>
              <p>{p.summary}</p>
              {showLabFields && (p.exists || p.unlock) && (
                <dl className="shelf-lab">
                  {p.exists && (
                    <div>
                      <dt>{tx(lab.exists, locale)}</dt>
                      <dd>{p.exists}</dd>
                    </div>
                  )}
                  {p.unlock && (
                    <div>
                      <dt>{tx(lab.unlock, locale)}</dt>
                      <dd>{p.unlock}</dd>
                    </div>
                  )}
                </dl>
              )}
              <ul className="shelf-stack">
                {p.stack.map((s) => (
                  <li key={s} className="metric-pill">{s}</li>
                ))}
              </ul>
            </div>
            <div className="shelf-links">
              {p.live && (
                <a href={p.live} target="_blank" rel="noopener noreferrer">
                  {tx(work.open, locale)} ↗
                </a>
              )}
              {repo && (
                <a href={repo} target="_blank" rel="noopener noreferrer">
                  {tx(work.source, locale)} ↗
                </a>
              )}
              {p.soldOn && (
                <a href={p.soldOn} target="_blank" rel="noopener noreferrer">
                  engineeringgrimaldi.com ↗
                </a>
              )}
              {p.repoClaimed && !repo && (
                <span className="shelf-dead" title={tx(work.repoNotPublic, locale)}>
                  <s>{p.repoClaimed.replace('https://', '')}</s> — 404
                </span>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
