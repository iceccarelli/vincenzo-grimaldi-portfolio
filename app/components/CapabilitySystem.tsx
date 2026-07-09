'use client';

import { useMemo, useState } from 'react';
import { capabilities, projects, type CapabilityDomain } from '../lib/registry';

/**
 * Two sections that share one piece of state: the selected domain.
 * Selecting a capability domain filters the registry below it, so the
 * claim and the evidence for the claim stay in the same field of view.
 */
export default function CapabilitySystem() {
  const [selected, setSelected] = useState<CapabilityDomain | null>(null);

  const visibleProjects = useMemo(
    () => (selected ? projects.filter((project) => project.domain === selected) : projects),
    [selected],
  );

  const toggle = (domain: string) =>
    setSelected((current) => (current === domain ? null : (domain as CapabilityDomain)));

  return (
    <>
      <section className="section-shell content-section" id="capabilities">
        <div className="glass-panel cta-panel spotlight-border">
          <div>
            <span className="section-kicker">Capability Register</span>
            <h2>Every competence below names where it was actually exercised.</h2>
            <p>
              Grouped by domain rather than by tool. Select a domain to filter the work
              registry underneath it.
            </p>
          </div>
        </div>

        <div className="capability-matrix">
          {capabilities.map((capability) => {
            const active = selected === capability.domain;
            return (
              <article
                key={capability.domain}
                className={`glass-panel capability-row${active ? ' is-active' : ''}`}
              >
                <button
                  type="button"
                  className="capability-domain"
                  aria-pressed={active}
                  onClick={() => toggle(capability.domain)}
                >
                  <span className="capability-domain-name">{capability.domain}</span>
                  <span className="capability-filter-hint">
                    {active ? 'Filtering registry' : 'Filter registry'}
                  </span>
                </button>

                <p className="capability-summary">{capability.summary}</p>

                <ul className="capability-signals">
                  {capability.signals.map((signal) => (
                    <li key={signal}>{signal}</li>
                  ))}
                </ul>

                <div className="capability-provenance">
                  <span className="capability-provenance-label">Exercised in</span>
                  <div className="capability-provenance-items">
                    {capability.provenance.map((entry) =>
                      entry.href ? (
                        <a key={entry.label} href={entry.href} target="_blank" rel="noreferrer">
                          {entry.label}
                        </a>
                      ) : (
                        <span key={entry.label}>{entry.label}</span>
                      ),
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section-shell content-section" id="registry">
        <div className="glass-panel cta-panel spotlight-border">
          <div>
            <span className="section-kicker">Work Registry</span>
            <h2>
              {selected ? (
                <>
                  {visibleProjects.length} repositor{visibleProjects.length === 1 ? 'y' : 'ies'} under{' '}
                  <span className="gradient-text">{selected}</span>
                </>
              ) : (
                'Public repositories, with their status stated plainly.'
              )}
            </h2>
          </div>
          {selected && (
            <div className="hero-actions">
              <button type="button" className="secondary-button" onClick={() => setSelected(null)}>
                Clear filter
              </button>
            </div>
          )}
        </div>

        <div className="card-grid three-up">
          {visibleProjects.map((project) => (
            <article className="glass-panel glow-card registry-card" key={project.name}>
              <span className={`registry-status registry-status--${project.status}`}>
                {project.status === 'shipped' ? 'Shipped' : 'In development'}
              </span>
              <h3>{project.name}</h3>
              <p>{project.summary}</p>
              <ul className="registry-stack">
                {project.stack.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="registry-links">
                {project.live && (
                  <a href={project.live} target="_blank" rel="noreferrer">
                    Open live demo
                  </a>
                )}
                {project.repo ? (
                  <a href={project.repo} target="_blank" rel="noreferrer">
                    Source
                  </a>
                ) : (
                  <a href="#connect">Private — request access</a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
