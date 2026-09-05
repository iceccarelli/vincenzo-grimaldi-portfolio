import { json } from '../../_json';
import { contracts, getContract } from '../../../../lib/cluster/contracts';

export const dynamic = 'force-static';

export function generateStaticParams() {
  return contracts.map((c) => ({ id: c.id }));
}

/** /api/cluster/contracts/[id] — one JSON Schema document. */
export function GET(_req: Request, { params }: { params: { id: string } }) {
  const c = getContract(params.id);
  if (!c) return json({ error: 'not found', id: params.id }, 404);
  return new Response(JSON.stringify(c.schema, null, 2), {
    headers: {
      'Content-Type': 'application/schema+json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
