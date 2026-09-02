import type { MetadataRoute } from 'next';
import { SITE_URL } from './lib/site';
import { caseStudies } from './lib/work';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entry = (
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] = 'monthly',
  ) => ({ url: `${SITE_URL}${path}`, lastModified: now, changeFrequency, priority });

  return [
    entry('', 1),
    entry('/work', 0.9),
    ...caseStudies.map((c) => entry(`/work/${c.slug}`, 0.8)),
    entry('/simulator', 0.8),
    entry('/connect', 0.7),
    entry('/card', 0.5, 'yearly'),
    entry('/impressum', 0.3, 'yearly'),
    entry('/datenschutz', 0.3, 'yearly'),
  ];
}
