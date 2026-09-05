import { json, GENERATOR } from '../_json';
import { palletizerKpis, lidarKpis, countMeasured } from '../../../lib/cluster/kpis';

export const dynamic = 'force-static';

/** /api/cluster/kpis — definitions and measurements; null means unmeasured. */
export function GET() {
  return json({
    ...GENERATOR,
    palletizer: { measured: countMeasured(palletizerKpis), total: palletizerKpis.length, kpis: palletizerKpis },
    lidarFusion: { measured: countMeasured(lidarKpis), total: lidarKpis.length, kpis: lidarKpis },
    rule: 'A KPI is measured only by a public artifact or a dated customer report. Targets are not measurements.',
  });
}
