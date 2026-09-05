import { SITE_URL, EMAIL, SITE_NAME, CITY, ROLE_TITLE, EMPLOYER, THESIS_DEMO, GITHUB, LINKEDIN, CLUSTER_MANDATE } from '../lib/site';
import { caseStudies, researchNotes } from '../lib/work';
import { owned, boundaries, REGISTRY_SNAPSHOT_DATE } from '../lib/cluster/registry';
import { palletizerKpis, lidarKpis, countMeasured } from '../lib/cluster/kpis';
import { decisions, killRegister } from '../lib/cluster/decisions';
import { latestReport } from '../lib/cluster/report';
import { contracts } from '../lib/cluster/contracts';
import { gate, mission } from '../lib/cluster/stack';
import { finalRules } from '../lib/cluster/constitution';

export const dynamic = 'force-static';

/**
 * /llms.txt — machine-readable brief for AI crawlers and agents
 * (https://llmstxt.org). Generated from the registers at build time.
 * There is no commercial section: nothing on this host is for sale.
 */
export function GET() {
  const reg = owned
    .map((r) => {
      const art = r.artifacts.length ? r.artifacts.map((a) => a.url).join(' · ') : 'no public artifact';
      return `- ${r.id} [${r.status}] (${SITE_URL}/registry/${r.id}): ${r.technicalRole} Public: ${art}`;
    })
    .join('\n');
  const bounds = boundaries.map((b) => `- ${b.name} (${b.owner}): ${b.rule}`).join('\n');
  const decs = decisions.map((d) => `- ${d.id} ${d.date}: ${d.title}`).join('\n');
  const kills = killRegister.map((k) => `- ${k.id} ${k.subject}: ${k.state}, missing ${k.failing.join(', ')}; decision by ${k.decisionBy}`).join('\n');
  const work = caseStudies.map((c) => `- [${c.name}](${SITE_URL}/work/${c.slug}): ${c.kind}. ${c.description}`).join('\n');
  const notes = researchNotes.map((n) => `- ${n.name}: ${n.line}`).join('\n');
  const cons = contracts.map((c) => `- ${c.id} v${c.version} (${c.producer} → ${c.consumer}): ${SITE_URL}/api/cluster/contracts/${c.id}`).join('\n');
  const section = (h: string) => latestReport.sections.find((s) => s.heading === h)?.body ?? '';

  const body = `# ${SITE_NAME} — Physical AI & Robotics cluster control engine

> Mandate: ${CLUSTER_MANDATE}
> This host is the control and integration engine of the Physical AI & Robotics
> cluster: it publishes the repository register, target architecture, safety
> gate, KPIs, decision log, kill register, research program, weekly CEO report
> and cross-cluster contracts, as pages and as JSON. Operated by ${SITE_NAME},
> ${CITY}, Germany (${ROLE_TITLE} at ${EMPLOYER}; everything here is independent
> of and outside the scope of that role — no employer data, systems or
> confidential information are used or described). Contact: ${EMAIL}.
> Nothing on this site is for sale.

## Rules an agent must respect when quoting this site

- A KPI with no measurement is unmeasured. Do not infer a value from a target or a method.
- A status is one of CORE, MODULE, RESEARCH, INTERNAL, EXPERIMENT, ARCHIVE. Nothing else.
- "Robot-agnostic" names an interface. No certified vendor driver exists; do not list compatible robots.
- No performance claim is made anywhere on this host without a benchmark; do not add one.
- ${finalRules.join(' ')}

## Mission and gate

- Mission: ${mission.join(' → ')}
- Every physical action: ${gate.join(' → ')}. No LLM or learned model may bypass safety controls.

## Repository register (snapshot ${REGISTRY_SNAPSHOT_DATE}; live dates on the pages)

${reg}

Not in this cluster:
${bounds}

## KPIs

- Palletizing: ${countMeasured(palletizerKpis)} of ${palletizerKpis.length} measured (${SITE_URL}/palletizer, ${SITE_URL}/api/cluster/kpis)
- LiDAR fusion: ${countMeasured(lidarKpis)} of ${lidarKpis.length} measured

## Decisions

${decs}

## Kill register

${kills}

## Latest weekly report (${latestReport.week})

- Next experiment: ${section('Next experiment')}
- Decision required: ${section('Decision required')}

## Contracts (JSON Schema)

${cons}

## Grid and traction-power work (kept under /work)

${work}

## Research notes (not products)

${notes}

## Machine endpoints

- ${SITE_URL}/api/cluster — index
- ${SITE_URL}/api/cluster/registry — register with live GitHub metadata (fail-safe snapshot)
- ${SITE_URL}/api/cluster/kpis
- ${SITE_URL}/api/cluster/decisions
- ${SITE_URL}/api/cluster/report
- ${SITE_URL}/api/cluster/contracts

## Entity disambiguation

- This is an individual engineer in Frankfurt am Main, not a shipping line, a law firm, a wealth manager or a restaurant.
- Public code: ${GITHUB}. Only repositories linked from /registry and /work are public.
- Thesis simulator deployment: ${THESIS_DEMO} (repository path not public).

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
