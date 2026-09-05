/**
 * Pipeline — an ordered list of stage names rendered as one line with
 * arrows. Semantically an <ol>, so a reader with CSS off gets the order.
 * `deterministicFrom` marks the index from which stages are deterministic
 * (used on the gate to show where a model stops having a say).
 */
export default function Pipeline({
  stages,
  label,
  deterministicFrom,
  compact = false,
}: {
  stages: readonly string[];
  label: string;
  deterministicFrom?: number;
  compact?: boolean;
}) {
  return (
    <ol className={compact ? 'pipe pipe-compact' : 'pipe'} aria-label={label}>
      {stages.map((s, i) => (
        <li
          key={s}
          className={deterministicFrom !== undefined && i >= deterministicFrom ? 'pipe-det' : undefined}
        >
          <span className="pipe-stage">{s}</span>
        </li>
      ))}
    </ol>
  );
}
