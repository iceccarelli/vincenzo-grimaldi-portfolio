import { CONVERGENCE } from '../lib/copy';

/**
 * NetworkFooter — the convergence footer. Exactly four lines, verbatim,
 * identical on every domain of the network. Server-safe; not localised on
 * purpose (the lines are the shared contract).
 */
export default function NetworkFooter() {
  return (
    <ul className="network-footer" aria-label="The Grimaldi network">
      {CONVERGENCE.map((d) => (
        <li key={d.host}>
          <a
            href={d.href}
            {...(d.host === 'igrimaldi.engineering' ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
          >
            {d.host}
          </a>
          <span> — {d.line}</span>
        </li>
      ))}
    </ul>
  );
}
