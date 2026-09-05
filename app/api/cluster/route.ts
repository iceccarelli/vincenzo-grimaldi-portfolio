import { json, GENERATOR } from './_json';
import { SITE_URL } from '../../lib/site';

export const dynamic = 'force-static';

/** /api/cluster — index of the machine-readable registers. */
export function GET() {
  return json({
    ...GENERATOR,
    registers: {
      registry: `${SITE_URL}/api/cluster/registry`,
      kpis: `${SITE_URL}/api/cluster/kpis`,
      decisions: `${SITE_URL}/api/cluster/decisions`,
      report: `${SITE_URL}/api/cluster/report`,
      contracts: `${SITE_URL}/api/cluster/contracts`,
    },
    pages: ['/', '/registry', '/architecture', '/palletizer', '/decisions', '/report', '/research', '/contracts', '/constitution'].map(
      (p) => `${SITE_URL}${p}`,
    ),
    llms: `${SITE_URL}/llms.txt`,
  });
}
