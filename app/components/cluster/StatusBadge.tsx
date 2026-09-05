import type { Status } from '../../lib/cluster/types';

/**
 * StatusBadge — one of the six allowed statuses, as text in a bordered
 * mono chip. Colour carries no meaning a screen reader would miss: the
 * word is the badge.
 */
export default function StatusBadge({ status }: { status: Status }) {
  return (
    <span className={`st st-${status.toLowerCase()}`} data-status={status}>
      {status}
    </span>
  );
}

export function StateChip({ text }: { text: string }) {
  return <span className="st st-plain">{text}</span>;
}
