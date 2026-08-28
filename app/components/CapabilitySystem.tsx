'use client';

import { useMemo, useState } from 'react';
import { capabilities, projects, type CapabilityDomain } from '../lib/registry';
import { useLanguage } from '../lib/i18n';

/**
 * Two sections that share one piece of state: the selected domain.
 * Selecting a capability domain filters the registry below it, so the
 * claim and the evidence for the claim stay in the same field of view.
 *
 * Filtering always uses the canonical registry domain key; the active
 * dictionary only changes what is DISPLAYED (labels + summaries), so
 * switching language never breaks the filter.
 */
export default function CapabilitySystem() {
  const [selected, setSelected] = useState<CapabilityDomain | null>(null);
  const { t } = useLanguage();

  const visibleProjects = useMemo(
    () => (selected ? projects.filter((project) => project.domain === selected) : projects),
    [selected],
  );

  const toggle = (domain: string) =>
    setSelected((current) => (current === domain ? null : (domain as CapabilityDomain)));

  const domainLabel = (domain: string) => t.domainLabels[domain] ?? domain;

  const filteredTitle = selected
    ? t.registryUi.titleFiltered
        .replace('{count}', String(visibleProjects.length))
        .replace('{domain}', domainLabel(selected))
    : t.registryUi.titleAll;

  return (
    <>
      <section className="section-shell content-section" id="capabilities">
        <div className="glass-panel cta-panel spotlight-border">
          <div>
            <span className="section-kicker">{t.capability.kicker}</span>
            <h2>{t.capability.title}</h2>
            <p>{t.capability.intro}</p>
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
                  <span className="capability-domain-name">{domainLabel(capability.domain)}</span>
                  <span className="capability-filter-hint">
                    {active ? t.capability.filterHintActive : t.capability.filterHint}
                  </span>
                </button>

                <div className="capability-body">
                  <p className="capability-summary">
                    {t.capabilitySummaries[capability.domain] ?? capability.summary}
                  </p>

                  <ul className="capability-signals">
                    {capability.signals.map((signal) => (
                      <li key={signal}>{signal}</li>
                    ))}
                  </ul>
                </div>

                <div className="capability-provenance">
                  <span className="capability-provenance-label">{t.capability.exercisedIn}</span>
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
            <span className="section-kicker">{t.registryUi.kicker}</span>
            <h2>{filteredTitle}</h2>
          </div>
          {selected && (
            <div className="hero-actions">
              <button type="button" className="secondary-button" onClick={() => setSelected(null)}>
                {t.registryUi.clearFilter}
              </button>
            </div>
          )}
        </div>

        <div className="card-grid three-up">
          {visibleProjects.map((project) => (
            <article className="glass-panel glow-card registry-card" key={project.name}>
              <span className={`registry-status registry-status--${project.status}`}>
                {project.status === 'shipped' ? t.registryUi.shipped : t.registryUi.inDevelopment}
              </span>
              <h3>{project.name}</h3>
              <p>{t.projectSummaries[project.name] ?? project.summary}</p>
              <ul className="registry-stack">
                {project.stack.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="registry-links">
                {project.live && (
                  <a href={project.live} target="_blank" rel="noreferrer">
                    {t.registryUi.openLive}
                  </a>
                )}
                {project.repo ? (
                  <a href={project.repo} target="_blank" rel="noreferrer">
                    {t.registryUi.source}
                  </a>
                ) : (
                  <a href="#connect">{t.registryUi.privateAccess}</a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
