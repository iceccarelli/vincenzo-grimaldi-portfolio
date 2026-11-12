import {
  SITE_URL,
  EMAIL,
  SITE_NAME,
  CITY,
  ROLE_TITLE,
  EMPLOYER,
  THESIS_DEMO,
  GITHUB,
  LINKEDIN,
  ONE_LINE,
} from '../lib/site';
import { caseStudies, researchNotes } from '../lib/work';
import { articles, pillarCards } from '../lib/electrical';
import { REGISTER_UPDATED, registerEntries } from '../lib/register';

export const dynamic = 'force-static';

export function GET() {
  const pillars = pillarCards
    .map((p) => '- [' + p.title + '](' + SITE_URL + p.href + '): ' + p.summary)
    .join('\n');
  const arts = articles
    .map((a) => '- [' + a.title + '](' + SITE_URL + '/articles/' + a.slug + '): ' + a.summary)
    .join('\n');
  const work = caseStudies
    .map((c) => '- [' + c.name + '](' + SITE_URL + '/work/' + c.slug + '): ' + c.kind + '. ' + c.description)
    .join('\n');
  const notes = researchNotes
    .map((n) => '- ' + n.name + ' (' + n.domain + '): ' + n.line)
    .join('\n');
  const reg = registerEntries
    .map((r) => '- ' + r.id + ' [' + r.status + '] (' + SITE_URL + '/registry/' + r.id + '): ' + r.summary)
    .join('\n');

  const body =
    '# ' +
    SITE_NAME +
    ' — ' +
    ONE_LINE +
    '\n\n' +
    '> Independent electrical engineering site operated by ' +
    SITE_NAME +
    ', ' +
    CITY +
    ', Germany (' +
    ROLE_TITLE +
    ' at ' +
    EMPLOYER +
    '; M.Sc. RWTH Aachen University). Everything on this host is independent of and outside the scope of employer duties — no employer data, systems, or confidential information are used or described. Contact: ' +
    EMAIL +
    '. Nothing on this site is for sale.\n\n' +
    '## Core technical pillars\n' +
    pillars +
    '\n\n' +
    '## Technical articles\n' +
    arts +
    '\n\n' +
    '## Public runnable artifacts & repositories\n' +
    work +
    '\n\n' +
    '## Technical register (snapshot ' +
    REGISTER_UPDATED +
    ')\n' +
    reg +
    '\n\n' +
    '## Research notes & ecosystem boundaries\n' +
    notes +
    '\n- Commercial company hubs live separately at https://engineeringgrimaldi.com and https://grimaldi.ca.\n\n' +
    '## Machine endpoints\n' +
    '- ' +
    SITE_URL +
    '/api/register — JSON register of pillars, articles, and engineering artifacts\n' +
    '- ' +
    SITE_URL +
    '/sitemap.xml — canonical URL index\n\n' +
    '## Entity disambiguation\n' +
    '- Individual electrical and power-systems engineer in Frankfurt am Main, Germany.\n' +
    '- Public GitHub: ' +
    GITHUB +
    '\n' +
    '- Thesis simulator deployment: ' +
    THESIS_DEMO +
    '\n' +
    '- LinkedIn: ' +
    LINKEDIN +
    '\n';

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
