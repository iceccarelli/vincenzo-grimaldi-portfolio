import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import DomainNav from '../../components/DomainNav';
import { getRegisterEntry, registerEntries } from '../../lib/register';
import { SITE_URL } from '../../lib/site';

type Props = { params: { id: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return registerEntries.map((e) => ({ id: e.id }));
}

export function generateMetadata({ params }: Props): Metadata {
  const e = getRegisterEntry(params.id);
  if (!e) return {};
  return {
    title: e.name,
    description: e.summary,
    alternates: { canonical: '/registry/' + e.id },
    openGraph: {
      title: e.name,
      description: e.summary,
      url: SITE_URL + '/registry/' + e.id,
    },
  };
}

export default function RegisterEntryPage({ params }: Props) {
  const e = getRegisterEntry(params.id);
  if (!e) notFound();

  return (
    <main className="doc">
      <DomainNav current="/registry" />

      <section className="blk blk-first">
        <p className="kicker">
          <Link href="/registry">← Technical register</Link> · {e.pillar}
        </p>
        <h1 className="h1">{e.name}</h1>
        <p className="path-line">
          <code className="path">{e.status}</code>
          <code className="path">{'updated ' + e.updated}</code>
        </p>
        <p className="lead">{e.summary}</p>

        <dl className="defs">
          <div>
            <dt>Technical scope</dt>
            <dd>{e.scope}</dd>
          </div>
          <div>
            <dt>Stated limits</dt>
            <dd>{e.limits}</dd>
          </div>
          <div>
            <dt>Documentation path</dt>
            <dd className="underlined-links">
              <Link href={e.internalHref}>{e.internalHref}</Link>
            </dd>
          </div>
          {e.publicUrl && (
            <div>
              <dt>Public artifact</dt>
              <dd className="underlined-links">
                <a href={e.publicUrl} rel="noopener noreferrer">
                  {e.publicUrl} ↗
                </a>
              </dd>
            </div>
          )}
        </dl>
      </section>
    </main>
  );
}
