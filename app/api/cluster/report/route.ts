import { json, GENERATOR } from '../_json';
import { reports, REPORT_SECTIONS } from '../../../lib/cluster/report';

export const dynamic = 'force-static';

/** /api/cluster/report — every weekly report, newest first. */
export function GET() {
  return json({ ...GENERATOR, sections: REPORT_SECTIONS, latest: reports[0]?.week ?? null, reports });
}
