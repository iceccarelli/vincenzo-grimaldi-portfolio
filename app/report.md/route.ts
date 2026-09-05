import { reports } from '../lib/cluster/report';
import { SITE_URL } from '../lib/site';

export const dynamic = 'force-static';

/**
 * /report.md — the latest weekly CEO report as Markdown, for pasting into
 * mail or a document without reformatting. Same twelve sections, same words.
 */
export function GET() {
  const r = reports[0];
  const body = `# Physical AI & Robotics — weekly CEO report ${r.week}

_${r.date} · ${SITE_URL}/report#${r.week} · JSON: ${SITE_URL}/api/cluster/report_

${r.sections.map((s, i) => `## ${i + 1}. ${s.heading}\n\n${s.body}`).join('\n\n')}

---
Registers: ${SITE_URL}/registry · ${SITE_URL}/decisions · ${SITE_URL}/palletizer
`;
  return new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
