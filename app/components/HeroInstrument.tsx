'use client';

import { useMemo, useState } from 'react';
import { useLanguage } from '../lib/i18n';
import { instrument, tx } from '../lib/copy';
import { IEEE9_DEFAULT, IEEE9_LINES, fmtExp, n1Sweep, solveDC } from '../lib/ieee9';
import { EXPLORER_URL, fmtDeg, type ValidationSource } from '../lib/validation';

/**
 * HeroInstrument — the one live instrument on the homepage.
 *
 * It solves the IEEE 9-bus DC power flow in the browser (app/lib/ieee9.ts)
 * and prints the nodal balance residual of that solve. Two controls: scale
 * the load, trip one line. Nothing is animated that is not a number changing.
 * The PINN numbers underneath come from the explorer's validation report
 * (live fetch with a dated snapshot fallback — the label says which).
 *
 * Deterministic on server and client: default state renders identical HTML.
 */
export default function HeroInstrument({
  validation,
  compact = false,
}: {
  validation: ValidationSource;
  compact?: boolean;
}) {
  const { locale } = useLanguage();
  const [loadPct, setLoadPct] = useState(100);
  const [outage, setOutage] = useState<number | null>(null);

  const base = useMemo(
    () => ({
      gen2MW: IEEE9_DEFAULT.gen2MW,
      gen3MW: IEEE9_DEFAULT.gen3MW,
      load5MW: (IEEE9_DEFAULT.load5MW * loadPct) / 100,
      load7MW: (IEEE9_DEFAULT.load7MW * loadPct) / 100,
      load9MW: (IEEE9_DEFAULT.load9MW * loadPct) / 100,
    }),
    [loadPct],
  );

  const result = useMemo(() => solveDC({ ...base, outage }), [base, outage]);
  const sweep = useMemo(() => n1Sweep(base), [base]);

  const r = validation.report;
  const sourceLabel =
    validation.source === 'live'
      ? tx(instrument.sourceLive, locale)
      : tx(instrument.sourceSnapshot, locale).replace('{d}', validation.snapshotDate);

  const maxAbs = result.ok ? Math.max(1, ...result.thetaDeg.map((t) => Math.abs(t))) : 1;

  return (
    <div className={`instrument${compact ? ' instrument--compact' : ''}`} data-instrument="ieee9-dc">
      <div className="instrument-head">
        <div>
          <span className="instrument-title">{tx(instrument.title, locale)}</span>
          <span className="instrument-sub">{tx(instrument.sub, locale)}</span>
        </div>
        <span className="instrument-live">
          <span className="live-dot" /> N-{outage === null ? '0' : '1'}
        </span>
      </div>

      <div className="instrument-controls">
        <label>
          <span>{tx(instrument.load, locale)} {loadPct}%</span>
          <input
            type="range"
            min={50}
            max={150}
            step={5}
            value={loadPct}
            onChange={(e) => setLoadPct(Number(e.target.value))}
            aria-label={tx(instrument.load, locale)}
          />
        </label>
        <label>
          <span>{tx(instrument.trip, locale)}</span>
          <select
            value={outage === null ? '' : String(outage)}
            onChange={(e) => setOutage(e.target.value === '' ? null : Number(e.target.value))}
            aria-label={tx(instrument.trip, locale)}
          >
            <option value="">{tx(instrument.none, locale)}</option>
            {IEEE9_LINES.map((l, i) => (
              <option key={`${l.from}-${l.to}`} value={i}>
                {l.from}–{l.to} · x={l.x}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          className="instrument-reset"
          onClick={() => {
            setLoadPct(100);
            setOutage(null);
          }}
        >
          {tx(instrument.reset, locale)}
        </button>
      </div>

      {result.ok === true ? (
        <>
          <svg
            className="instrument-bars"
            viewBox="0 0 320 126"
            role="img"
            aria-label={`${tx(instrument.angles, locale)}: ${result.thetaDeg.map((t, i) => `bus ${i + 1} ${t.toFixed(2)}°`).join(', ')}`}
          >
            <line x1="160" y1="4" x2="160" y2="122" className="instrument-axis" />
            {result.thetaDeg.map((t, i) => {
              const y = 6 + i * 13;
              const w = (Math.abs(t) / maxAbs) * 118;
              const x = t >= 0 ? 160 : 160 - w;
              return (
                <g key={i}>
                  <text x="4" y={y + 8} className="instrument-label">{i + 1}</text>
                  <rect x={x} y={y} width={Math.max(w, 0.5)} height="9" rx="1.5" className="instrument-bar" />
                  <text
                    x={t >= 0 ? 160 + w + 4 : 160 - w - 4}
                    y={y + 8}
                    textAnchor={t >= 0 ? 'start' : 'end'}
                    className="instrument-value"
                  >
                    {t.toFixed(2)}°
                  </text>
                </g>
              );
            })}
          </svg>

          <dl className="instrument-readout">
            <div>
              <dt>{tx(instrument.residual, locale)}</dt>
              <dd className="instrument-signal">{fmtExp(result.residualPu)} p.u.</dd>
            </div>
            <div>
              <dt>{tx(instrument.slack, locale)}</dt>
              <dd>{result.slackPu.toFixed(3)} p.u.</dd>
            </div>
            <div>
              <dt>{tx(instrument.maxFlow, locale)}</dt>
              <dd>{result.maxFlowPu.toFixed(3)} p.u.</dd>
            </div>
            <div>
              <dt>{tx(instrument.n1, locale)}</dt>
              <dd>
                {sweep.secure}/{sweep.total} {tx(instrument.secure, locale)}
              </dd>
            </div>
          </dl>
        </>
      ) : (
        <p className="instrument-islanded" role="status">
          {tx(instrument.islanded, locale).replace('{b}', (result as { isolated: number[] }).isolated.join(', '))}
        </p>
      )}

      <p className="instrument-pinn">
        {tx(instrument.pinnLine, locale)
          .replace('{dc}', fmtDeg(r.dc_pinn.rmse_deg))
          .replace('{ac}', fmtDeg(r.ac_pinn.angle_rmse_deg))}
        <span className="instrument-source"> — {sourceLabel}</span>
      </p>

      <a className="instrument-open" href={EXPLORER_URL} target="_blank" rel="noopener noreferrer">
        {tx(instrument.open, locale)} ↗
      </a>
    </div>
  );
}
