import type { NextRequest } from 'next/server';
import { json, GENERATOR } from '../_json';
import { registry, boundaries, REGISTRY_SNAPSHOT_DATE } from '../../../lib/cluster/registry';
import { STATUSES } from '../../../lib/cluster/types';
import { liveMetadata } from '../../../lib/cluster/github';

export const revalidate = 3600;

/**
 * /api/cluster/registry — the register with live GitHub metadata merged in
 * (fail-safe to the dated snapshot). `?id=` returns one entry.
 */
export async function GET(req: NextRequest) {
  const meta = await liveMetadata();
  const id = req.nextUrl.searchParams.get('id');
  const entries = registry.map((e) => ({ ...e, activity: meta[e.id] }));
  if (id) {
    const one = entries.find((e) => e.id === id);
    return one ? json({ ...GENERATOR, entry: one }) : json({ error: 'not found', id }, 404);
  }
  return json({
    ...GENERATOR,
    snapshotDate: REGISTRY_SNAPSHOT_DATE,
    allowedStatuses: STATUSES,
    counts: Object.fromEntries(STATUSES.map((s) => [s, registry.filter((r) => r.cluster === 'physical-ai' && r.status === s).length])),
    entries,
    boundaries,
  });
}
