import { json, GENERATOR } from '../_json';
import { decisions, killCriteria, killRegister } from '../../../lib/cluster/decisions';

export const dynamic = 'force-static';

/** /api/cluster/decisions — decision log and kill register. */
export function GET() {
  return json({ ...GENERATOR, decisions, kill: { criteria: killCriteria, register: killRegister } });
}
