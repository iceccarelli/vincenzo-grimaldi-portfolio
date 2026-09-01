'use client';

import NetworkFooter from './NetworkFooter';
import { useLanguage } from '../lib/i18n';
import { network, tx } from '../lib/copy';

/**
 * NetworkLanding — /network. One line + one verb per address. The overlap
 * rule is printed so the three domains cannot drift back into each other.
 */
export default function NetworkLanding() {
  const { locale } = useLanguage();

  const rows = [
    { host: 'igrimaldi.engineering', href: 'https://igrimaldi.engineering', line: network.l1, verb: network.v1, here: true },
    { host: 'engineeringgrimaldi.com', href: 'https://engineeringgrimaldi.com', line: network.l2, verb: network.v2, here: false },
    { host: 'grimaldi.ca', href: 'https://grimaldi.ca', line: network.l3, verb: network.v3, here: false },
    { host: 'github.com/iceccarelli', href: 'https://github.com/iceccarelli', line: network.l4, verb: network.v4, here: false },
  ];

  return (
    <main className="content-sheet route-page">
      <section className="section-shell content-section" id="network">
        <span className="section-kicker">{tx(network.kicker, locale)}</span>
        <h1>{tx(network.title, locale)}</h1>

        <ol className="network-lines">
          {rows.map((r) => (
            <li key={r.host} className={`network-line${r.here ? ' network-line--here' : ''}`}>
              <a
                href={r.href}
                {...(r.here ? { 'aria-current': 'page' as const } : { target: '_blank', rel: 'noopener noreferrer' })}
              >
                {r.host}
              </a>
              <span className="network-line-text">— {tx(r.line, locale)}</span>
              <span className="network-line-verb">
                {r.here ? tx(network.here, locale) : `${tx(r.verb, locale)} ↗`}
              </span>
            </li>
          ))}
        </ol>

        <p className="section-intro" style={{ maxWidth: '760px', marginTop: '2rem' }}>{tx(network.overlap, locale)}</p>

        <div style={{ marginTop: '2rem' }}>
          <NetworkFooter />
        </div>
      </section>
    </main>
  );
}
