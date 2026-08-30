import {
  SITE_URL,
  SITE_NAME,
  LEGAL_NAME,
  EMAIL,
  JOB_TITLE,
  HEADSHOT,
  SAME_AS,
  OFFER,
} from '../lib/site';

/**
 * JsonLd.tsx — server-rendered structured data.
 *
 * One @graph with stable @ids so Person, ProfessionalService and WebSite
 * cross-reference instead of duplicating. FAQPage and SoftwareApplication
 * are emitted only on the pages where the matching content is visible
 * (Google policy: schema must describe on-page content).
 */

const PERSON_ID = `${SITE_URL}/#person`;
const SERVICE_ID = `${SITE_URL}/#service`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const graph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': PERSON_ID,
      name: SITE_NAME,
      alternateName: LEGAL_NAME,
      url: `${SITE_URL}/`,
      email: `mailto:${EMAIL}`,
      image: HEADSHOT,
      jobTitle: JOB_TITLE,
      worksFor: { '@type': 'Organization', name: 'DB InfraGO AG' },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Frankfurt am Main',
        addressCountry: 'DE',
      },
      alumniOf: { '@type': 'Organization', name: 'RWTH Aachen University' },
      sameAs: SAME_AS,
      knowsAbout: [
        'Physics-Informed Neural Networks',
        'Multi-Agent Reinforcement Learning',
        'Smart Grids',
        'Distributed Energy Resources',
        'Embedded Control Systems',
        'OT Cybersecurity',
        'CIM–ThreMA Cross-Domain Ontology',
      ],
    },
    {
      '@type': 'ProfessionalService',
      '@id': SERVICE_ID,
      name: 'Vincenzo Grimaldi — Independent Engineering Advisory',
      url: `${SITE_URL}/payments`,
      founder: { '@id': PERSON_ID },
      areaServed: 'Europe',
      availableLanguage: ['en', 'de', 'es', 'zh'],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Advisory offers',
        itemListElement: [
          {
            '@type': 'Offer',
            name: OFFER.consult.name,
            price: OFFER.consult.price,
            priceCurrency: OFFER.consult.currency,
            url: `${SITE_URL}/connect`,
            itemOffered: {
              '@type': 'Service',
              name: 'Engineering consultation',
              serviceType: 'Cyber-physical systems consulting',
            },
          },
          {
            '@type': 'Offer',
            name: OFFER.retainer.name,
            price: OFFER.retainer.price,
            priceCurrency: OFFER.retainer.currency,
            url: `${SITE_URL}/payments`,
            priceSpecification: {
              '@type': 'UnitPriceSpecification',
              price: OFFER.retainer.price,
              priceCurrency: OFFER.retainer.currency,
              unitText: 'MONTH',
            },
            itemOffered: {
              '@type': 'Service',
              name: 'Advisory retainer',
              serviceType: 'Engineering advisory',
            },
          },
        ],
      },
    },
    {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      url: `${SITE_URL}/`,
      name: 'Vincenzo Grimaldi — Engineering',
      publisher: { '@id': PERSON_ID },
      inLanguage: 'en',
    },
  ],
};

export function GlobalJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}

export type Faq = { q: string; a: string };

export function FaqJsonLd({ faqs }: { faqs: Faq[] }) {
  const node = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }}
    />
  );
}

export function SoftwareAppJsonLd(props: {
  name: string;
  description: string;
  url: string;
  repo?: string;
  live?: string;
}) {
  const node = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: props.name,
    description: props.description,
    url: props.url,
    applicationCategory: 'EngineeringApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
    author: { '@id': PERSON_ID },
    ...(props.repo ? { codeRepository: props.repo } : {}),
    ...(props.live ? { installUrl: props.live } : {}),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }}
    />
  );
}
