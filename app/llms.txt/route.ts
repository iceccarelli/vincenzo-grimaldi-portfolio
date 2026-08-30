import { SITE_URL, EMAIL } from '../lib/site';
import { caseStudies } from '../lib/work';

export const dynamic = 'force-static';

/**
 * /llms.txt — machine-readable site brief for AI crawlers and agents
 * (https://llmstxt.org). Served as a route handler so it stays in sync
 * with the work registry at build time.
 */
export function GET() {
  const work = caseStudies
    .map((c) => `- [${c.name}](${SITE_URL}/work/${c.slug}): ${c.description}`)
    .join('\n');

  const body = `# Vincenzo Grimaldi — Engineering

> Independent engineering advisory for safety-critical grids and cyber-physical
> systems: physics-informed AI, deterministic control, OT security.
> Operator: Vincenzo Grimaldi (legal name Vincenzo Ceccarelli Grimaldi),
> Frankfurt am Main, Germany. Contact: ${EMAIL}.
> Advisory work is independent and outside the scope of the operator's
> employment at DB InfraGO AG; no employer data is used.

## Offers

- Engineering consultation, 60 minutes, EUR 280 — book at ${SITE_URL}/connect
- Advisory retainer, EUR 3,200 / month — details at ${SITE_URL}/payments

## Work

${work}

## Pages

- [Capabilities](${SITE_URL}/capabilities): capability register with provenance
- [Thesis simulator](${SITE_URL}/simulator): CIM–ThreMA ontology simulator (RWTH Aachen M.Sc. thesis)
- [Payments](${SITE_URL}/payments): offers and payment options
- [Connect](${SITE_URL}/connect): booking calendar and contact form
- [Business card](${SITE_URL}/card): vCard, QR, verified profiles

## Profiles

- GitHub: https://github.com/iceccarelli
- LinkedIn: https://www.linkedin.com/in/vincenzo-ceccarelli-grimaldi-2912b42a0
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
