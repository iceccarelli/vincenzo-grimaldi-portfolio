import type { MetadataRoute } from 'next';
import { SITE_URL } from './lib/site';
import { caseStudies } from './lib/work';

/**
 * Ranked the way the site is ranked: hero, register, instrument, offer,
 * then the shelves. Off-register case studies (parked / sold elsewhere)
 * keep their URL but carry a low priority. /books canonicalises to
 * grimaldi.ca and is deliberately not listed.
 */

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entry = (
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] = 'monthly',
  ) => ({ url: `${SITE_URL}${path}`, lastModified: now, changeFrequency, priority });

  return [
    entry('', 1),
    entry('/work', 0.9, 'weekly'),
    entry('/simulator', 0.9, 'weekly'),
    entry('/advisory', 0.9),
    ...caseStudies.map((c) => entry(`/work/${c.slug}`, c.onRegister ? 0.8 : 0.3)),
    entry('/capabilities', 0.6),
    entry('/network', 0.5),
    entry('/ventures', 0.5),
    entry('/lab', 0.4),
    entry('/payments', 0.5),
    entry('/connect', 0.7),
    entry('/card', 0.6, 'yearly'),
    entry('/impressum', 0.3, 'yearly'),
    entry('/datenschutz', 0.3, 'yearly'),
  ];
}
