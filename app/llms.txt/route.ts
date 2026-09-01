import { SITE_URL, EMAIL } from '../lib/site';
import { registerStudies } from '../lib/work';
import { byShelf } from '../lib/registry';
import { GITHUB_404 } from '../lib/status';
import { SNAPSHOT, SNAPSHOT_DATE, EXPLORER_URL, VALIDATION_JSON_URL, REPRODUCE_CMD } from '../lib/validation';

export const dynamic = 'force-static';

/**
 * /llms.txt — machine-readable site brief for AI crawlers and agents
 * (https://llmstxt.org). Who, one-liner, what to buy, what is parked,
 * contact, pointers to the other domains. Generated from the registry so it
 * cannot drift from the pages.
 */
export function GET() {
  const work = registerStudies
    .map((c) => `- [${c.name}](${SITE_URL}/work/${c.slug}) — ${c.status}: ${c.description}`)
    .join('\n');
  const parked = byShelf('lab')
    .map((p) => `- ${p.name} — ${p.status}${p.repoClaimed ? ` (claimed path ${p.repoClaimed.replace('https://', '')} returned 404 on ${SNAPSHOT_DATE}; not linked)` : ''}`)
    .join('\n');
  const ventures = byShelf('ventures')
    .map((p) => `- ${p.name} — ${p.status}${p.live ? `: ${p.live}` : ''}${p.soldOn ? ` (sold on ${p.soldOn})` : ''}`)
    .join('\n');
  const dead = GITHUB_404.map((n) => `github.com/iceccarelli/${n}`).join(', ');

  const body = `# igrimaldi.engineering — verifiable intelligence for grids and traction power

> Physics-constrained intelligence for grids and traction power. Residuals you
> can check. Agents you can audit. Patterns from live HV rail assets — sanitized.
> Operator: Vincenzo Ceccarelli Grimaldi (display name Vincenzo Grimaldi),
> Frankfurt am Main, Germany. Contact: ${EMAIL}.
> Day job: ITk Fachspezialist, DB InfraGO AG (Aug 2024–present) — digitisation
> of railway traction HV grids, IT/OT, KRITIS-aligned cybersecurity governance.
> Advisory work is independent of the employer; no employer data, topologies or
> systems are used. RWTH Aachen M.Sc. 2025 (CIM–ThreMA + RL) is background.

## What to buy

- 60-minute teardown, EUR 280 — written recap, residual/architecture critique,
  go/no-go for a 30-day pilot with a kill date. ${SITE_URL}/advisory
- Monthly advisory, EUR 3,200 — ONLY after a teardown. One scoped artefact per
  month. Cancel anytime. Not "access to a network".
- PINN / residual pilot — a validation report on the customer's feeder, scoped
  in the teardown. 30 days, kill date in the contract.
- Not for sale here: GridOS, NeuralBridge, DERIM, hardware cells, Palletizer
  pilots (those are sold on https://engineeringgrimaldi.com/).

## The instrument

- ${EXPLORER_URL} — IEEE 9-bus explorer: DC PINN vs analytical
  (${SNAPSHOT.dc_pinn.rmse_deg.toFixed(4)}° RMSE), AC PINN vs Newton-Raphson
  (${SNAPSHOT.ac_pinn.angle_rmse_deg.toFixed(4)}° RMSE), N-1 sweep
  (${SNAPSHOT.n1_contingency.secure}/${SNAPSHOT.n1_contingency.total} secure),
  physics-loss ablation, ${SNAPSHOT.tests_passed} tests. Report: ${VALIDATION_JSON_URL}
  Reproduce: \`${REPRODUCE_CMD}\`  (numbers above: snapshot ${SNAPSHOT_DATE})
- ${SITE_URL}/simulator — in-browser IEEE 9-bus DC solver + residual table + what it is not.

## Work (gated register: 200 URL + honest badge + serves grids/traction/verification)

${work}

## Ventures (real, off-niche or client builds)

${ventures}

## Parked (nothing to clone; never linked)

${parked}

GitHub paths that 404 as of ${SNAPSHOT_DATE} and must not be cited as products: ${dead}.

## Pages

- [Work](${SITE_URL}/work) · [Simulator](${SITE_URL}/simulator) · [Advisory](${SITE_URL}/advisory)
- [Network](${SITE_URL}/network) · [Ventures](${SITE_URL}/ventures) · [Lab](${SITE_URL}/lab) · [Books](${SITE_URL}/books)
- [Capabilities](${SITE_URL}/capabilities) · [Payments](${SITE_URL}/payments) · [Connect](${SITE_URL}/connect) · [Card](${SITE_URL}/card)

## The network

- igrimaldi.engineering — verifiable intelligence for grids and traction power (this domain)
- engineeringgrimaldi.com — one trade cell, shipped and measured
- grimaldi.ca — logbook, podcast, reviews, books
- github.com/iceccarelli — clone or it does not exist

## Disambiguation

Not the Grimaldi shipping group, not a French consultancy, not a UK garage,
not Grimaldi Industri (Sweden). Own the sentence, not the surname.

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
