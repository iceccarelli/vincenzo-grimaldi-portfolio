import type { MetadataRoute } from 'next';
import { SITE_URL } from './lib/site';
import { caseStudies } from './lib/work';
import { articles } from './lib/electrical';
import { registerEntries } from './lib/register';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entry = (
    p: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] = 'monthly'
  ) => ({ url: SITE_URL + p, lastModified: now, changeFrequency, priority });

  return [
    entry('', 1, 'weekly'),
    entry('/grids', 0.9, 'monthly'),
    entry('/machines', 0.9, 'monthly'),
    entry('/digital-twins', 0.9, 'monthly'),
    entry('/articles', 0.9, 'weekly'),
    ...articles.map((a) => entry('/articles/' + a.slug, 0.85, 'monthly')),
    entry('/work', 0.85, 'monthly'),
    ...caseStudies.map((c) => entry('/work/' + c.slug, 0.8, 'monthly')),
    entry('/simulator', 0.85, 'monthly'),
    entry('/registry', 0.8, 'weekly'),
    ...registerEntries.map((r) => entry('/registry/' + r.id, 0.7, 'monthly')),
    entry('/connect', 0.7, 'yearly'),
    entry('/card', 0.5, 'yearly'),
    entry('/impressum', 0.3, 'yearly'),
    entry('/datenschutz', 0.3, 'yearly'),
  ];
}
