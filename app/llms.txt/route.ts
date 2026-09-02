import { SITE_URL, EMAIL, SITE_NAME, CITY, ROLE_TITLE, EMPLOYER, THESIS_DEMO, GITHUB, LINKEDIN } from '../lib/site';
import { caseStudies, researchNotes } from '../lib/work';

export const dynamic = 'force-static';

/**
 * /llms.txt — machine-readable site brief for AI crawlers and agents
 * (https://llmstxt.org). Generated from the work list at build time.
 * There is no commercial section: nothing on this host is for sale.
 */
export function GET() {
  const work = caseStudies
    .map((c) => `- [${c.name}](${SITE_URL}/work/${c.slug}): ${c.kind}. ${c.description}`)
    .join('\n');
  const notes = researchNotes.map((n) => `- ${n.name}: ${n.line}`).join('\n');

  const body = `# ${SITE_NAME}

> ${SITE_NAME}, ${CITY}, Germany. Physics-constrained control · grid
> digitalisation. ${ROLE_TITLE} at ${EMPLOYER}: traction HV digitisation,
> IT/OT, KRITIS-class governance. Contact: ${EMAIL}.
> Everything on this site is independent of, and outside the scope of, that
> role. No employer data, systems or confidential information are used or
> described. Nothing on this site is for sale.

## Entity disambiguation

- This is an individual engineer in Frankfurt am Main, not a shipping line,
  a law firm, a wealth manager or a restaurant.
- Public code: ${GITHUB}. Only repositories linked from /work are public.
- Thesis simulator deployment: ${THESIS_DEMO} (repository path not public).

## Work

${work}

## Research notes (not products)

${notes}

## Pages

- [Home](${SITE_URL}/): name, one line, three artifacts, selected work, enquiry form
- [Thesis simulator](${SITE_URL}/simulator): door to the CIM–ThreMA simulator deployment
- [Contact](${SITE_URL}/connect): advisory enquiry — name, organisation, constraint, email
- [Card](${SITE_URL}/card): vCard, QR, verified profiles

## Profiles

- GitHub: ${GITHUB}
- LinkedIn: ${LINKEDIN}
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
