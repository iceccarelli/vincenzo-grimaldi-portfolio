import type { Metadata } from 'next';
import { reports, REPORT_SECTIONS } from '../lib/cluster/report';

export const metadata: Metadata = {
  title: 'Weekly CEO report',
  description:
    'The weekly CEO report of the Physical AI cluster in twelve fixed sections: customer signal, hardware status, robot performance, simulation results, benchmark results, research developments, competitive threats, ROI, failures, killed projects, next experiment, decision required.',
  alternates: { canonical: '/report' },
};

export const revalidate = 3600;

/**
 * /report — every weekly report, newest first, twelve sections each in
 * fixed order. A section with nothing to report says so.
 */
export default function ReportPage() {
  return (
    <main className="doc">
      <section className="blk blk-first">
        <p className="kicker">Physical AI & Robotics · weekly report</p>
        <h1 className="h1">Weekly CEO report</h1>
        <p className="lead">
          Twelve sections in fixed order, every week. Outcomes, not activity. JSON:{' '}
          <a href="/api/cluster/report">/api/cluster/report</a>.
        </p>
        <ol className="inline-list numbered">
          {REPORT_SECTIONS.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
      </section>

      {reports.map((r) => (
        <section key={r.week} className="blk" id={r.week} aria-labelledby={`h-${r.week}`}>
          <h2 id={`h-${r.week}`} className="blk-h">
            {r.week} <span className="muted h-note"><time dateTime={r.date}>{r.date}</time></span>
          </h2>
          <ol className="report">
            {r.sections.map((s, i) => (
              <li key={s.heading}>
                <h3>
                  <span className="muted">{String(i + 1).padStart(2, '0')}</span> {s.heading}
                </h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
        </section>
      ))}
    </main>
  );
}
