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
        'Power-flow validation (DC, AC / Newton-Raphson, N-1)',
        'Railway traction HV grids',
        'IT/OT convergence',
        'KRITIS / NIS2 cybersecurity governance',
        'CIM / CGMES',
        'IEEE 9-bus test system',
      ],
    },
    {
      '@type': 'ProfessionalService',
      '@id': SERVICE_ID,
      name: 'igrimaldi.engineering — verifiable intelligence for grids and traction power',
      description:
        'Physics-constrained software and advisory for HV/MV and traction: models you can residual-check, agents you can audit, middleware you can put on a substation LAN.',
      url: `${SITE_URL}/advisory`,
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
            url: `${SITE_URL}/advisory`,
            description:
              '60-minute teardown: written recap, residual/architecture critique, go/no-go for a 30-day pilot with a kill date. Slot within 48 hours.',
            itemOffered: {
              '@type': 'Service',
              name: '60-minute teardown',
              serviceType: 'Grid and traction-power engineering review',
            },
          },
          {
            '@type': 'Offer',
            name: OFFER.retainer.name,
            price: OFFER.retainer.price,
            priceCurrency: OFFER.retainer.currency,
            url: `${SITE_URL}/advisory`,
            description: 'Only after a teardown. One scoped artefact per month. Cancel anytime.',
            priceSpecification: {
              '@type': 'UnitPriceSpecification',
              price: OFFER.retainer.price,
              priceCurrency: OFFER.retainer.currency,
              unitText: 'MONTH',
            },
            itemOffered: {
              '@type': 'Service',
              name: 'Monthly advisory',
              serviceType: 'Grid and traction-power engineering advisory',
            },
          },
        ],
      },
    },
    {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      url: `${SITE_URL}/`,
      name: 'igrimaldi.engineering',
      description: 'Verifiable intelligence for grids and traction power.',
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
