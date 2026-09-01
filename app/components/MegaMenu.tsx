'use client';

import { useEffect, useRef, useState } from 'react';
import { byShelf } from '../lib/registry';
import { useLanguage } from '../lib/i18n';
import { advisory, home, nav, tx } from '../lib/copy';
import { STATUS_LABEL } from '../lib/status';
import { EXPLORER_URL } from '../lib/validation';

/**
 * Labelled "Work" trigger that opens a three-column panel ranked the way the
 * site is ranked: the gated register, the shelves (ventures / lab / books /
 * capabilities), and the two things a visitor can do right now — run the
 * explorer, book the teardown. Contents come from the registry.
 */
export default function MegaMenu() {
  const [open, setOpen] = useState(false);
  const { t, locale } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('scroll', () => setOpen(false), { passive: true, once: true });
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const register = byShelf('work');

  return (
    <div className="megamenu" ref={containerRef}>
      <button
        type="button"
        className="megamenu-trigger"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((current) => !current)}
      >
        {t.megamenu.trigger}
        <span className={`megamenu-caret${open ? ' is-open' : ''}`} aria-hidden="true">
          ▾
        </span>
      </button>

      {open && (
        <div className="megamenu-panel" role="menu">
          <div className="megamenu-column">
            <p className="megamenu-heading">{tx(nav.work, locale)}</p>
            <ul>
              {register.map((project) => (
                <li key={project.name}>
                  <a href={project.live ?? project.repo ?? '/work'} onClick={() => setOpen(false)} {...(project.live || project.repo ? { target: '_blank', rel: 'noreferrer' } : {})}>
                    <span>{project.name}</span>
                    <small>{STATUS_LABEL[project.status][locale]}</small>
                  </a>
                </li>
              ))}
              <li>
                <a href="/work" onClick={() => setOpen(false)}>
                  <span>{t.megamenu.fullRegistry}</span>
                  <small>{register.length} {t.megamenu.entries}</small>
                </a>
              </li>
            </ul>
          </div>

          <div className="megamenu-column">
            <p className="megamenu-heading">{t.megamenu.systems}</p>
            <ul>
              <li><a href="/simulator" onClick={() => setOpen(false)}><span>{tx(nav.simulator, locale)}</span><small>IEEE 9-bus · residuals</small></a></li>
              <li><a href="/ventures" onClick={() => setOpen(false)}><span>{tx(nav.ventures, locale)}</span><small>{STATUS_LABEL['CLIENT BUILD'][locale]}</small></a></li>
              <li><a href="/lab" onClick={() => setOpen(false)}><span>{tx(nav.lab, locale)}</span><small>{STATUS_LABEL.PARKED[locale]}</small></a></li>
              <li><a href="/books" onClick={() => setOpen(false)}><span>{tx(nav.books, locale)}</span><small>grimaldi.ca</small></a></li>
              <li><a href="/capabilities" onClick={() => setOpen(false)}><span>{tx(nav.capabilities, locale)}</span><small>{t.megamenu.signals}</small></a></li>
              <li><a href="/network" onClick={() => setOpen(false)}><span>{tx(nav.network, locale)}</span><small>4</small></a></li>
            </ul>
          </div>

          <div className="megamenu-column megamenu-column--feature">
            <p className="megamenu-heading">{t.megamenu.openNow}</p>
            <a
              className="megamenu-feature"
              href={EXPLORER_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
            >
              <span className="megamenu-feature-tag">{t.megamenu.live}</span>
              <strong>{tx(home.ctaExplorer, locale)}</strong>
              <p>DC · AC vs Newton-Raphson · N-1 · ablation · 25 tests</p>
            </a>
            <a className="megamenu-feature" href="/advisory" onClick={() => setOpen(false)}>
              <span className="megamenu-feature-tag">€280</span>
              <strong>{tx(advisory.p1Name, locale)}</strong>
              <p>{tx(advisory.p1Body, locale)}</p>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
