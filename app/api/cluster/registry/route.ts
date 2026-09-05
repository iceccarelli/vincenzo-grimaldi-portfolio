import { json, GENERATOR } from '../_json';
import { registry, boundaries, REGISTRY_SNAPSHOT_DATE } from '../../../lib/cluster/registry';
import { STATUSES, MISSION, LAYERS } from '../../../lib/cluster/types';
import { liveMetadata } from '../../../lib/cluster/github';
import { SITE_URL } from '../../../lib/site';

export const revalidate = 3600;

/**
 * /api/cluster/registry — the register with live GitHub metadata merged in
 * (fail-safe to the dated snapshot). Static, regenerated hourly. One entry:
 * /api/cluster/registry/<id>.
 */
export async function GET() {
  const meta = await liveMetadata();
  const entries = registry.map((e) => ({ ...e, activity: meta[e.id], url: `${SITE_URL}/registry/${e.id}` }));
  const edges = registry.flatMap((e) => e.dependsOn.map((d) => ({ from: d, to: e.id })));
  return json({
    ...GENERATOR,
    snapshotDate: REGISTRY_SNAPSHOT_DATE,
    allowedStatuses: STATUSES,
    missionStages: MISSION,
    stackLayers: LAYERS,
    counts: Object.fromEntries(STATUSES.map((s) => [s, registry.filter((r) => r.cluster === 'physical-ai' && r.status === s).length])),
    missionCoverage: Object.fromEntries(MISSION.map((s) => [s, registry.filter((r) => r.cluster === 'physical-ai' && r.stages.includes(s)).map((r) => r.id)])),
    dependencyEdges: edges,
    entries,
    boundaries,
  });
}
