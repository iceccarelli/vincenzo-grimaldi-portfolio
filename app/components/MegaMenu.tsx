'use client';

import { useEffect, useRef, useState } from 'react';
import { capabilities, projects } from '../lib/registry';

/**
 * Labelled "Work" trigger that opens a three-column panel: what the work is
 * about (capabilities), what exists as code (repositories), and what can be
 * opened right now (live surfaces). Contents come from the registry, so the
 * menu can never drift from the page.
 */
export default function MegaMenu() {
  const [open, setOpen] = useState(false);
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

  const shipped = projects.filter((project) => project.status === 'shipped');
  const live = projects.filter((project) => project.live);
  const href = (project: (typeof projects)[number]) => project.repo ?? '#registry';

  return (
    <div className="megamenu" ref={containerRef}>
      <button
        type="button"
        className="megamenu-trigger"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((current) => !current)}
      >
        Work
        <span className={`megamenu-caret${open ? ' is-open' : ''}`} aria-hidden="true">
          ▾
        </span>
      </button>

      {open && (
        <div className="megamenu-panel" role="menu">
          <div className="megamenu-column">
            <p className="megamenu-heading">Capabilities</p>
            <ul>
              {capabilities.map((capability) => (
                <li key={capability.domain}>
                  <a href="#capabilities" onClick={() => setOpen(false)}>
                    <span>{capability.domain}</span>
                    <small>{capability.signals.length} signals</small>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="megamenu-column">
            <p className="megamenu-heading">Systems</p>
            <ul>
              {shipped.map((project) => (
                <li key={project.name}>
                  <a href={href(project)} onClick={() => setOpen(false)}>
                    <span>{project.name}</span>
                    <small>{project.stack[0]}</small>
                  </a>
                </li>
              ))}
              <li>
                <a href="#registry" onClick={() => setOpen(false)}>
                  <span>Full work registry</span>
                  <small>{projects.length} entries</small>
                </a>
              </li>
            </ul>
          </div>

          <div className="megamenu-column megamenu-column--feature">
            <p className="megamenu-heading">Open now</p>
            {live.map((project) => (
              <a
                className="megamenu-feature"
                key={project.name}
                href={project.live}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
              >
                <span className="megamenu-feature-tag">Live</span>
                <strong>{project.name}</strong>
                <p>{project.summary}</p>
              </a>
            ))}
            <a className="megamenu-feature" href="#connect" onClick={() => setOpen(false)}>
              <span className="megamenu-feature-tag">Contact</span>
              <strong>Start a conversation</strong>
              <p>Grid intelligence, agentic middleware, or research collaboration.</p>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
