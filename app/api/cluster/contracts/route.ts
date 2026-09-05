import { json, GENERATOR } from '../_json';
import { contracts } from '../../../lib/cluster/contracts';
import { SITE_URL } from '../../../lib/site';

export const dynamic = 'force-static';

/** /api/cluster/contracts — index of versioned event contracts. */
export function GET() {
  return json({
    ...GENERATOR,
    contracts: contracts.map((c) => ({
      id: c.id,
      version: c.version,
      producer: c.producer,
      consumer: c.consumer,
      summary: c.summary,
      schema: `${SITE_URL}/api/cluster/contracts/${c.id}`,
    })),
  });
}
