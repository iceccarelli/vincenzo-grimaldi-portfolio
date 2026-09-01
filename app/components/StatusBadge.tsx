import type { Locale } from '../lib/i18n';
import { STATUS_LABEL, STATUS_TONE, type Status } from '../lib/status';

/**
 * StatusBadge — one honest chip per artefact. Server-safe (no hooks); pass
 * the locale from the caller. Optional `note` appends a short qualifier such
 * as "v0.2 HEURISTIC" or "sold on engineeringgrimaldi.com".
 */
export default function StatusBadge({
  status,
  locale = 'en',
  note,
}: {
  status: Status;
  locale?: Locale;
  note?: string;
}) {
  return (
    <span className={`status-badge status-badge--${STATUS_TONE[status]}`} data-status={status}>
      <span className="status-badge-dot" aria-hidden />
      {STATUS_LABEL[status][locale]}
      {note ? <span className="status-badge-note"> · {note}</span> : null}
    </span>
  );
}
