'use client';

import Image from 'next/image';
import ContactForm from '../components/ContactForm';
import DomainNav from '../components/DomainNav';
import { useLanguage } from '../lib/i18n';
import { pick } from '../lib/copy';
import { CITY, EMAIL, FOOTER_PORTRAIT, SITE_NAME } from '../lib/site';

export default function ConnectPage() {
  const { locale } = useLanguage();
  const c = pick(locale);

  return (
    <main className="doc">
      <DomainNav current="/connect" />

      <section className="blk blk-first" id="connect">
        <h1 className="h1">{c.contact.title}</h1>
        <div className="id connect-id">
          <div className="id-portrait">
            <Image
              src={FOOTER_PORTRAIT}
              alt="Vincenzo Ceccarelli Grimaldi"
              width={88}
              height={88}
            />
          </div>
          <div className="id-text">
            <p className="name name-sm">{SITE_NAME}</p>
            <p className="city">{CITY}</p>
            <p className="fine">{c.home.roleLine}</p>
          </div>
        </div>
        <p className="lead">{c.contact.intro}</p>
        <ContactForm />
        <p className="fine underlined-links">
          {c.contact.direct}{' '}
          <a href={'mailto:' + EMAIL}>{EMAIL}</a>
        </p>
      </section>
    </main>
  );
}
