'use client';

import Image from 'next/image';
import ContactForm from './ContactForm';
import { useLanguage } from '../lib/i18n';
import { pick } from '../lib/copy';
import { CITY, SITE_NAME } from '../lib/site';
import { caseStudies } from '../lib/work';

/**
 * HomeLanding — one screen, read top to bottom.
 *
 *   1. Name             5. Three artifacts (a list, not a carousel)
 *   2. One line         6. Selected work
 *   3. City             7. Advisory enquiry form
 *   4. Role, no internals
 *
 * The server renders English; the client adopts DE after hydration. With
 * JavaScript disabled the page still shows name, role and the three
 * artifacts, because they are plain HTML.
 */
export default function HomeLanding() {
  const { locale } = useLanguage();
  const c = pick(locale);

  return (
    <main className="doc">
      <section className="id" aria-labelledby="name">
        <div className="id-portrait">
          <Image
            src="/vincenzo_grimaldi_headshot.jpg"
            alt=""
            width={96}
            height={96}
            priority
          />
        </div>
        <div className="id-text">
          <h1 id="name" className="name">{SITE_NAME}</h1>
          <p className="one-line">{c.home.oneLine}</p>
          <p className="city">{CITY}</p>
          <p className="role">
            <strong>{c.home.roleLine}</strong> {c.home.roleDetail}
          </p>
        </div>
      </section>

      <section className="blk" aria-labelledby="artifacts">
        <h2 id="artifacts" className="blk-h">{c.home.artifactsHeading}</h2>
        <ol className="artifacts">
          {c.home.artifacts.map((a, i) => (
            <li key={a.href} className="artifact">
              <span className="artifact-n">{String(i + 1).padStart(2, '0')}</span>
              <div className="artifact-body">
                <h3>
                  <a href={a.href}>{a.title}</a>
                </h3>
                <p>{a.note}</p>
              </div>
              <a className="artifact-go" href={a.href} aria-label={`${a.label}: ${a.title}`}>
                {a.label} →
              </a>
            </li>
          ))}
        </ol>
      </section>

      <section className="blk" aria-labelledby="work">
        <h2 id="work" className="blk-h">{c.home.workHeading}</h2>
        <ul className="worklist">
          {caseStudies.map((w) => (
            <li key={w.slug}>
              <a href={`/work/${w.slug}`}>
                <span className="worklist-name">{w.name}</span>
                <span className="worklist-kind">{w.kind}</span>
              </a>
              <code className="path">{w.paths[0]}</code>
            </li>
          ))}
        </ul>
        <p className="blk-more">
          <a href="/work">{c.home.workAll} →</a>
        </p>
      </section>

      <section className="blk" id="connect" aria-labelledby="enquiry">
        <h2 id="enquiry" className="blk-h">{c.home.formHeading}</h2>
        <p className="blk-intro">{c.home.formIntro}</p>
        <ContactForm compact />
      </section>
    </main>
  );
}
