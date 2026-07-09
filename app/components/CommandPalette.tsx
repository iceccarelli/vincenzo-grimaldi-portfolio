'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { capabilities, projects } from '../lib/registry';

type Command = {
  id: string;
  label: string;
  group: 'Sections' | 'Capabilities' | 'Repositories' | 'Elsewhere';
  hint?: string;
  href: string;
  external?: boolean;
};

const sectionCommands: Command[] = [
  { id: 'top', label: 'Top', group: 'Sections', href: '#top' },
  { id: 'about', label: 'About', group: 'Sections', href: '#about' },
  { id: 'architecture', label: 'Architecture', group: 'Sections', href: '#architecture' },
  { id: 'capabilities', label: 'Capability register', group: 'Sections', href: '#capabilities' },
  { id: 'registry', label: 'Work registry', group: 'Sections', href: '#registry' },
  { id: 'physics-informed', label: 'Physics-informed', group: 'Sections', href: '#physics-informed' },
  { id: 'thesis-simulator', label: 'Thesis simulator', group: 'Sections', href: '#thesis-simulator' },
  { id: 'flagship-systems', label: 'Flagship systems', group: 'Sections', href: '#flagship-systems' },
  { id: 'live-intelligence', label: 'Live intelligence', group: 'Sections', href: '#live-intelligence' },
  { id: 'ecosystem', label: 'Trusted ecosystem', group: 'Sections', href: '#ecosystem' },
  { id: 'connect', label: 'Connect', group: 'Sections', href: '#connect' },
];

const commands: Command[] = [
  ...sectionCommands,
  ...capabilities.map((capability) => ({
    id: `cap-${capability.domain}`,
    label: capability.domain,
    group: 'Capabilities' as const,
    hint: capability.signals.slice(0, 3).join(' · '),
    href: '#capabilities',
  })),
  ...projects.map((project) => ({
    id: `repo-${project.name}`,
    label: project.name,
    group: 'Repositories' as const,
    hint: project.stack.join(' · '),
    href: project.repo,
    external: true,
  })),
  {
    id: 'gh',
    label: 'GitHub profile',
    group: 'Elsewhere',
    href: 'https://github.com/iceccarelli',
    external: true,
  },
  {
    id: 'sim',
    label: 'Live thesis simulator',
    group: 'Elsewhere',
    href: 'https://physics-informed.vercel.app/',
    external: true,
  },
  {
    id: 'mail',
    label: 'Email Vincenzo',
    group: 'Elsewhere',
    hint: 'vincenzo@igrimaldi.engineering',
    href: 'mailto:vincenzo@igrimaldi.engineering',
    external: true,
  },
];

/** Subsequence match: "gos" matches "GridOS". */
function matches(haystack: string, needle: string) {
  if (!needle) return true;
  const target = haystack.toLowerCase();
  const query = needle.toLowerCase();
  let cursor = 0;
  for (const character of query) {
    cursor = target.indexOf(character, cursor);
    if (cursor === -1) return false;
    cursor += 1;
  }
  return true;
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  const results = useMemo(
    () => commands.filter((command) => matches(`${command.label} ${command.hint ?? ''}`, query)),
    [query],
  );

  const close = useCallback(() => {
    setOpen(false);
    setQuery('');
    setActive(0);
  }, []);

  const run = useCallback(
    (command: Command) => {
      close();
      if (command.external) {
        window.open(command.href, command.href.startsWith('mailto:') ? '_self' : '_blank', 'noopener');
        return;
      }
      const target = document.querySelector(command.href);
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', command.href);
    },
    [close],
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((current) => !current);
        return;
      }
      if (!open) return;
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
      }
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setActive((index) => (results.length ? (index + 1) % results.length : 0));
      }
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        setActive((index) => (results.length ? (index - 1 + results.length) % results.length : 0));
      }
      if (event.key === 'Enter' && results[active]) {
        event.preventDefault();
        run(results[active]);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, results, active, close, run]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>('[data-active="true"]')
      ?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  const trigger = (
    <button type="button" className="palette-trigger" onClick={() => setOpen(true)}>
      <span>Search</span>
      <kbd>⌘K</kbd>
    </button>
  );

  if (!open || !mounted) return trigger;

  let lastGroup = '';

  // Rendered at document.body so the fixed overlay is never trapped inside the
  // transformed, hide-on-scroll header.
  const dialog = (
    <div className="palette-backdrop" role="presentation" onMouseDown={close}>
      <div
        className="palette"
        role="dialog"
        aria-modal="true"
        aria-label="Search this site"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <input
          ref={inputRef}
          className="palette-input"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Jump to a section, capability or repository…"
          aria-label="Search"
          autoComplete="off"
          spellCheck={false}
        />

        <div className="palette-results" ref={listRef}>
          {results.length === 0 && (
            <p className="palette-empty">
              Nothing matches “{query}”. Try a domain name, or a repository like <code>GridOS</code>.
            </p>
          )}
          {results.map((command, index) => {
            const showGroup = command.group !== lastGroup;
            lastGroup = command.group;
            return (
              <div key={command.id}>
                {showGroup && <p className="palette-group">{command.group}</p>}
                <button
                  type="button"
                  className="palette-item"
                  data-active={index === active}
                  onMouseEnter={() => setActive(index)}
                  onClick={() => run(command)}
                >
                  <span className="palette-item-label">{command.label}</span>
                  {command.hint && <span className="palette-item-hint">{command.hint}</span>}
                  {command.external && <span className="palette-item-external">↗</span>}
                </button>
              </div>
            );
          })}
        </div>

        <footer className="palette-footer">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> navigate
          </span>
          <span>
            <kbd>↵</kbd> open
          </span>
          <span>
            <kbd>esc</kbd> close
          </span>
        </footer>
      </div>
    </div>
  );

  return (
    <>
      {trigger}
      {createPortal(dialog, document.body)}
    </>
  );
}
