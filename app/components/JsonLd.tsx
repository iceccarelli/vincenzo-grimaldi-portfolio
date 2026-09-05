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
 * One @graph with stable @ids: Person, WebSite and the register as a
 * Dataset with its JSON distributions. There is no ProfessionalService
 * node and no Offer on this host, because nothing is for sale here.
 * SoftwareApplication is emitted only on the page whose content it
 * describes.
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
        'Industrial robotics software',
        'Robot-agnostic palletizing',
        'LiDAR–camera sensor fusion',
        'Task and motion planning',
        'Functional safety architecture for robots',
        'Physics-informed learning',
        'Deterministic control',
        'Common Information Model (CIM / CGMES)',
        'IT/OT convergence',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      url: `${SITE_URL}/`,
      name: `${SITE_NAME} — Physical AI & Robotics cluster control engine`,
      alternateName: SITE_NAME,
      publisher: { '@id': PERSON_ID },
      inLanguage: 'en',
      about: {
        '@type': 'Thing',
        name: 'Physical AI & Robotics cluster',
        description: 'Robot-agnostic palletizing software, LiDAR–camera fusion and autonomous electrical-infrastructure inspection, governed by a deterministic safety gate.',
      },
    },
    {
      '@type': 'Dataset',
      '@id': `${SITE_URL}/#registry`,
      name: 'Physical AI cluster repository register',
      description: 'Machine-readable register of repositories, statuses, KPIs, decisions, kill register, weekly reports and cross-cluster contracts.',
      url: `${SITE_URL}/registry`,
      creator: { '@id': PERSON_ID },
      license: 'https://creativecommons.org/licenses/by/4.0/',
      distribution: [
        { '@type': 'DataDownload', encodingFormat: 'application/json', contentUrl: `${SITE_URL}/api/cluster/registry` },
        { '@type': 'DataDownload', encodingFormat: 'application/json', contentUrl: `${SITE_URL}/api/cluster/kpis` },
        { '@type': 'DataDownload', encodingFormat: 'application/json', contentUrl: `${SITE_URL}/api/cluster/decisions` },
        { '@type': 'DataDownload', encodingFormat: 'application/json', contentUrl: `${SITE_URL}/api/cluster/report` },
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
