'use client';

import { useLanguage } from './lib/i18n';
import { pick } from './lib/copy';
import { caseStudies } from './lib/work';

/**
 * not-found.tsx — custom 404. Client component so it renders in the
 * visitor's language; Next.js still serves it with HTTP status 404.
 */
export default function NotFound() {
  const { locale } = useLanguage();
  const c = pick(locale);

  return (
    <main className="doc">
      <section className="blk blk-first">
        <p className="kicker">404</p>
        <h1 className="h1">{c.notFound.title}</h1>
        <p className="lead">{c.notFound.body}</p>
        <p className="actions">
          <a className="btn" href="/">{c.notFound.cta}</a>
          <a className="btn-quiet" href="/registry">/registry</a>
          <a className="btn-quiet" href="/work">/work</a>
          <a className="btn-quiet" href="/connect">/connect</a>
        </p>
        <ul className="worklist">
          {caseStudies.map((w) => (
            <li key={w.slug}>
              <a href={`/work/${w.slug}`}>
                <span className="worklist-name">{w.name}</span>
                <span className="worklist-kind">{w.kind}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
