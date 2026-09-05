import { json, GENERATOR } from '../../_json';
import { getEntry, registry } from '../../../../lib/cluster/registry';
import { liveMetadata } from '../../../../lib/cluster/github';

export const revalidate = 3600;

export function generateStaticParams() {
  return registry.map((r) => ({ id: r.id }));
}

/** /api/cluster/registry/[id] — one register entry with live activity. */
export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const e = getEntry(params.id);
  if (!e) return json({ error: 'not found', id: params.id }, 404);
  const meta = (await liveMetadata())[e.id];
  const usedBy = registry.filter((r) => r.dependsOn.includes(e.id)).map((r) => r.id);
  return json({ ...GENERATOR, entry: { ...e, activity: meta, usedBy } });
}
