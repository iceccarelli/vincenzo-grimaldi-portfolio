'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '../lib/i18n';
import { pick } from '../lib/copy';
import { EMAIL, GITHUB, LINKEDIN } from '../lib/site';

export default function CardPage() {
  const { locale } = useLanguage();
  const c = pick(locale);

  return (
    <main className="bizcard-stage">
      <article className="bizcard">
        <header className="bizcard-header">
          <div className="bizcard-portrait">
            <Image
              src="/vincenzo_grimaldi_headshot.jpg"
              alt="Vincenzo Ceccarelli Grimaldi"
              width={120}
              height={120}
              priority
            />
          </div>
          <p className="kicker">{c.card.kicker}</p>
          <h1>Vincenzo Ceccarelli Grimaldi</h1>
          <p className="bizcard-role">{c.card.role}</p>
          <p className="bizcard-tagline">{c.card.tagline}</p>
        </header>

        <div className="bizcard-rows">
          <a className="bizcard-row" href={'mailto:' + EMAIL}>
            <span className="bizcard-row-label">{c.card.email}</span>
            <span className="bizcard-row-value">{EMAIL}</span>
          </a>
          <Link className="bizcard-row" href="/">
            <span className="bizcard-row-label">{c.card.website}</span>
            <span className="bizcard-row-value">igrimaldi.engineering</span>
          </Link>
          <a className="bizcard-row" href={GITHUB} target="_blank" rel="noopener noreferrer">
            <span className="bizcard-row-label">{c.card.githubLabel}</span>
            <span className="bizcard-row-value">github.com/iceccarelli</span>
          </a>
          <a className="bizcard-row" href={LINKEDIN} target="_blank" rel="noopener noreferrer">
            <span className="bizcard-row-label">LinkedIn</span>
            <span className="bizcard-row-value">Vincenzo Ceccarelli Grimaldi</span>
          </a>
        </div>

        <div className="bizcard-network">
          <span className="bizcard-row-label">{c.card.networkLabel}</span>
          <div className="bizcard-domains">
            <Link href="/">igrimaldi.engineering</Link>
            <a href="https://engineeringgrimaldi.com" target="_blank" rel="noopener noreferrer">
              engineeringgrimaldi.com
            </a>
            <a href="https://grimaldi.ca" target="_blank" rel="noopener noreferrer">
              grimaldi.ca
            </a>
          </div>
        </div>

        <div className="bizcard-actions">
          <div className="bizcard-buttons">
            <a className="btn" href="/card.vcf" download>
              {c.card.saveContact}
            </a>
            <a className="btn-quiet" href={'mailto:' + EMAIL}>
              {c.card.connect}
            </a>
          </div>
          <figure className="bizcard-qr">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/card/qr" alt="QR code for this business card" width={112} height={112} />
            <figcaption>{c.card.scanToShare}</figcaption>
          </figure>
        </div>

        <footer className="bizcard-foot">
          <Link href="/">{c.card.backHome}</Link>
        </footer>
      </article>
    </main>
  );
}
