import {
  SITE_URL,
  SITE_NAME,
  SHORT_NAME,
  EMAIL,
  JOB_TITLE,
  HEADSHOT,
  SAME_AS,
  EMPLOYER,
  CITY,
} from '../lib/site';

/**
 * JsonLd.tsx — server-rendered structured data.
 *
 * One @graph with stable @ids: Person and WebSite. There is no
 * ProfessionalService node and no Offer on this host, because nothing is
 * for sale here. SoftwareApplication is emitted only on the work page
 * whose content it describes.
 */

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const graph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': PERSON_ID,
      name: SITE_NAME,
      alternateName: SHORT_NAME,
      url: `${SITE_URL}/`,
      email: `mailto:${EMAIL}`,
      image: HEADSHOT,
      jobTitle: JOB_TITLE,
      worksFor: { '@type': 'Organization', name: EMPLOYER },
      address: {
        '@type': 'PostalAddress',
        addressLocality: CITY,
        addressCountry: 'DE',
      },
      alumniOf: { '@type': 'Organization', name: 'RWTH Aachen University' },
      sameAs: SAME_AS,
      knowsAbout: [
        'Common Information Model (CIM / CGMES)',
        'IEC 61850',
        'IT/OT convergence',
        'Traction power supply',
        'Physics-informed learning',
        'Deterministic control',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
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
