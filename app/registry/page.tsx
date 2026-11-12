import type { Metadata } from 'next';
import Link from 'next/link';
import DomainNav from '../components/DomainNav';
import { REGISTER_UPDATED, registerEntries } from '../lib/register';

export const metadata: Metadata = {
  title: 'Technical Register',
  description:
    'Lightweight technical register documenting public electrical and rail engineering artifacts, domain monographs, and scoped research notes — available as HTML and JSON.',
  alternates: { canonical: '/registry' },
};

export default function RegistryPage() {
  return (
    <main className="doc doc-wide">
      <DomainNav current="/registry" />

      <section className="blk blk-first">
        <p className="kicker">
          Technical Register · Snapshot <time dateTime={REGISTER_UPDATED}>{REGISTER_UPDATED}</time>
        </p>
        <h1 className="h1">Technical register</h1>
        <p className="lead">
          A transparent index of public deployments, open-source repositories, technical monographs, and unpublished research notes across electrical grids, traction power, machines, and digital twins.
        </p>

        <div className="tbl-wrap">
          <table className="tbl reg">
            <thead>
              <tr>
                <th scope="col">Entry</th>
                <th scope="col">Pillar</th>
                <th scope="col">Class</th>
                <th scope="col">Scope & Verification Boundary</th>
              </tr>
            </thead>
            <tbody>
              {registerEntries.map((r) => (
                <tr key={r.id}>
                  <th scope="row">
                    <Link href={'/registry/' + r.id}>{r.name}</Link>
                  </th>
                  <td data-label="Pillar">{r.pillar}</td>
                  <td data-label="Class">
                    <code className="path">{r.status}</code>
                  </td>
                  <td data-label="Scope">{r.summary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="blk-more underlined-links">
          Machine-readable distribution: <a href="/api/register">/api/register (JSON)</a> ·{' '}
          <a href="/llms.txt">/llms.txt</a>
        </p>
      </section>
    </main>
  );
}
