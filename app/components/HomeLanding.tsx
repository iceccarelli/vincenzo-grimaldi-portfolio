'use client';

import Image from 'next/image';
import Link from 'next/link';
import ContactForm from './ContactForm';
import DomainNav from './DomainNav';
import Plate from './Plate';
import { useLanguage } from '../lib/i18n';
import { pick } from '../lib/copy';
import { CITY, SITE_NAME } from '../lib/site';
import { articles, pillarCards } from '../lib/electrical';
import { registerEntries } from '../lib/register';

export default function HomeLanding() {
  const { locale } = useLanguage();
  const c = pick(locale);

  return (
    <main className="doc doc-wide">
      <DomainNav current="/" />

      <section className="blk blk-first" aria-labelledby="mandate">
        <p className="kicker">{c.home.kicker}</p>
        <h1 id="mandate" className="h1 mandate">
          {c.home.mandate}
        </h1>
        <p className="lead">{c.home.lead}</p>
        <Plate
          src="/images/cool/01-cinematic-high-voltage-substation.jpg"
          alt="Cinematic high-voltage substation at night"
          code="FIG. 01 · HIGH-VOLTAGE INFRASTRUCTURE"
          caption="High-voltage substation busbars, instrument transformers, and transmission interfaces."
          priority
        />
      </section>

      <section className="blk" aria-labelledby="pillars">
        <h2 id="pillars" className="blk-h">
          {c.home.pillarsHeading}
        </h2>
        <p className="blk-intro">{c.home.pillarsIntro}</p>
        <div className="pillar-grid">
          {pillarCards.map((p) => (
            <article key={p.slug} className="pillar-card">
              <Link href={p.href} className="pillar-media">
                <Plate
                  src={p.image}
                  alt={p.alt}
                  code={p.code}
                  sizes="(max-width: 680px) 100vw, 410px"
                  compact
                />
              </Link>
              <h3 className="pillar-title">
                <Link href={p.href}>{locale === 'de' ? p.titleDe : p.title}</Link>
              </h3>
              <p className="pillar-summary">
                {locale === 'de' ? p.summaryDe : p.summary}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="blk" aria-labelledby="bottleneck">
        <h2 id="bottleneck" className="blk-h">
          {c.home.bottleneckHeading}
        </h2>
        <p className="blk-intro">{c.home.bottleneckIntro}</p>
        <div className="plate-pair">
          <Plate
            src="/images/critical/01-ai-data-center-power-bottleneck.jpg"
            alt="AI data center power bottleneck with binding electrical constraints"
            code="FIG. 02 · TIME-TO-POWER CONSTRAINT"
            caption="Bulk substation interconnection and transformer capacity gating high-density compute."
            sizes="(max-width: 680px) 100vw, 410px"
            compact
          />
          <Plate
            src="/images/critical/09-power-capacity-envelope.jpg"
            alt="Power capacity envelope showing electrical and thermal limits of data center halls"
            code="FIG. 03 · CAPACITY ENVELOPE"
            caption="Coupled electrical ampacity, transformer thermal hot-spot, and cooling operating envelope."
            sizes="(max-width: 680px) 100vw, 410px"
            compact
          />
        </div>
        <p>{c.home.bottleneckBody}</p>
        <p className="blk-more underlined-links">
          <Link href="/articles/ai-is-power-bound">{c.home.bottleneckCta} →</Link>
        </p>
      </section>

      <section className="blk" aria-labelledby="articles">
        <h2 id="articles" className="blk-h">
          {c.home.articlesHeading}
        </h2>
        <p className="blk-intro">{c.home.articlesIntro}</p>
        <ol className="dec-list">
          {articles.map((a) => (
            <li key={a.slug}>
              <Link href={'/articles/' + a.slug}>
                <code className="path">{a.readingTime}</code>{' '}
                <span className="dec-title">{a.title}</span>
              </Link>
              <time className="muted" dateTime={a.date}>
                {a.date}
              </time>
            </li>
          ))}
        </ol>
        <p className="blk-more underlined-links">
          <Link href="/articles">{c.home.articlesAll} →</Link>
        </p>
      </section>

      <section className="blk" aria-labelledby="registry">
        <h2 id="registry" className="blk-h">
          {c.home.registryHeading}
        </h2>
        <p className="blk-intro">{c.home.registryIntro}</p>
        <div className="tbl-wrap">
          <table className="tbl reg reg-compact">
            <thead>
              <tr>
                <th scope="col">Artifact / Study</th>
                <th scope="col">Pillar</th>
                <th scope="col">Class</th>
                <th scope="col">Summary</th>
              </tr>
            </thead>
            <tbody>
              {registerEntries.map((r) => (
                <tr key={r.id}>
                  <th scope="row">
                    <Link href={'/registry/' + r.id}>{r.name}</Link>
                  </th>
                  <td data-label="Pillar">{r.pillar}</td>
                  <td data-label="Class">
                    <code className="path">{r.status}</code>
                  </td>
                  <td data-label="Summary">{r.summary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="blk-more underlined-links">
          <Link href="/registry">{c.home.registryAll} →</Link> ·{' '}
          <a href="/api/register">JSON</a>
        </p>
      </section>

      <section className="blk" aria-labelledby="vision">
        <h2 id="vision" className="blk-h">
          {c.home.visionHeading}
        </h2>
        <Plate
          src="/images/cool/10-future-grids-and-machines.jpg"
          alt="Future-looking electrical grids and machines"
          code="FIG. 04 · GRIDS, MACHINES & DIGITAL TWINS"
          caption="Long-horizon convergence of high-voltage infrastructure, advanced electrical machines, and physics-constrained intelligence."
        />
        <p className="underlined-links">
          {c.home.visionBody}{' '}
          <a href="https://engineeringgrimaldi.com" rel="noopener noreferrer">
            engineeringgrimaldi.com ↗
          </a>{' '}
          ·{' '}
          <a href="https://grimaldi.ca" rel="noopener noreferrer">
            grimaldi.ca ↗
          </a>
        </p>
      </section>

      <section className="blk id-blk" aria-labelledby="operator">
        <h2 id="operator" className="blk-h">
          {c.home.operatorHeading}
        </h2>
        <div className="id">
          <div className="id-portrait">
            <Image
              src="/vincenzo_grimaldi_headshot.jpg"
              alt="Vincenzo Ceccarelli Grimaldi"
              width={96}
              height={96}
            />
          </div>
          <div className="id-text">
            <p className="name name-sm">{SITE_NAME}</p>
            <p className="city">{CITY}</p>
            <p className="role">
              <strong>{c.home.roleLine}</strong> {c.home.roleDetail}
            </p>
            <p className="fine underlined-links">
              {c.home.thesisNote} <Link href="/work">/work</Link> ·{' '}
              <Link href="/simulator">/simulator</Link>
            </p>
          </div>
        </div>
      </section>

      <section className="blk" id="connect" aria-labelledby="enquiry">
        <h2 id="enquiry" className="blk-h">
          {c.home.formHeading}
        </h2>
        <p className="blk-intro">{c.home.formIntro}</p>
        <ContactForm compact />
      </section>
    </main>
  );
}
