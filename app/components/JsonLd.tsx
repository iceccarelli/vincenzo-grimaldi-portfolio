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
  ONE_LINE,
} from '../lib/site';

const PERSON_ID = SITE_URL + '/#person';
const WEBSITE_ID = SITE_URL + '/#website';

const graph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': PERSON_ID,
      name: SITE_NAME,
      alternateName: SHORT_NAME,
      url: SITE_URL + '/',
      email: 'mailto:' + EMAIL,
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
        'High-voltage electrical grids and substations',
        'Railway traction power systems (16.7 Hz / 110 kV / 15 kV)',
        'Electrical machines and stator windings',
        'Grid-scale power electronics and converters',
        'Physics-informed digital twins for power systems',
        'Synchronous grid inertia and 50 Hz frequency stability',
        'Common Information Model (CIM / CGMES) and IEC 61850',
        'IT/OT convergence for critical infrastructure',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      url: SITE_URL + '/',
      name: SITE_NAME + ' — ' + ONE_LINE,
      alternateName: SITE_NAME,
      publisher: { '@id': PERSON_ID },
      inLanguage: 'en',
      about: {
        '@type': 'Thing',
        name: 'Electrical Grids, Traction Power, Electrical Machines and Physics-Informed Digital Twins',
        description:
          'Technical monographs, runnable smart-grid ontology simulation, and open-data infrastructure models.',
      },
    },
    {
      '@type': 'Dataset',
      '@id': SITE_URL + '/#registry',
      name: 'igrimaldi.engineering technical register',
      description:
        'Machine-readable register of public electrical engineering artifacts, technical pillars, articles, and scoped research notes.',
      url: SITE_URL + '/registry',
      creator: { '@id': PERSON_ID },
      license: 'https://creativecommons.org/licenses/by/4.0/',
      distribution: [
        {
          '@type': 'DataDownload',
          encodingFormat: 'application/json',
          contentUrl: SITE_URL + '/api/register',
        },
      ],
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

export function ArticleJsonLd(props: {
  headline: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
}) {
  const node = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: props.headline,
    description: props.description,
    url: props.url,
    image: props.image,
    datePublished: props.datePublished,
    author: { '@id': PERSON_ID },
    publisher: { '@id': PERSON_ID },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }}
    />
  );
}
