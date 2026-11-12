import { NextResponse } from 'next/server';
import { SITE_NAME, SITE_URL } from '../../lib/site';
import { REGISTER_UPDATED, registerEntries } from '../../lib/register';
import { articles, pillarCards } from '../../lib/electrical';

export const dynamic = 'force-static';

export function GET() {
  return NextResponse.json(
    {
      schema: 'https://igrimaldi.engineering/api/register',
      operator: SITE_NAME,
      site: SITE_URL,
      updated: REGISTER_UPDATED,
      domain: 'Electrical grids, railway traction power, electrical machines, and physics-informed digital twins',
      pillars: pillarCards.map((p) => ({
        slug: p.slug,
        url: SITE_URL + p.href,
        title: p.title,
        image: SITE_URL + p.image,
      })),
      articles: articles.map((a) => ({
        slug: a.slug,
        url: SITE_URL + '/articles/' + a.slug,
        title: a.title,
        date: a.date,
        heroImage: SITE_URL + a.heroImage,
      })),
      entries: registerEntries,
    },
    {
      headers: {
        'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      },
    }
  );
}
