import type { Metadata } from 'next';
import Link from 'next/link';
import DomainNav from '../components/DomainNav';
import Plate from '../components/Plate';
import { caseStudies, researchNotes } from '../lib/work';
import { copy } from '../lib/copy';

export const metadata: Metadata = {
  title: 'Work & Public Artifacts',
  description:
    'Publicly inspectable electrical and rail infrastructure engineering artifacts: the CIM–ThreMA thesis simulator and the Bahn Project Manager open-data model, alongside scoped research notes.',
  alternates: { canonical: '/work' },
};

export const revalidate = 3600;

export default function WorkPage() {
  const c = copy.en.work;
  return (
    <main className="doc doc-wide">
      <DomainNav current="/work" />

      <section className="blk blk-first">
        <h1 className="h1">{c.title}</h1>
        <p className="lead">{c.intro}</p>
        <ol className="entries">
          {caseStudies.map((w, idx) => (
            <li key={w.slug} className="entry">
              <Plate
                src={w.image}
                alt={w.imageAlt}
                code={w.imageCode}
                priority={idx === 0}
              />
              <h2>
                <Link href={'/work/' + w.slug}>{w.name}</Link>
              </h2>
              <p className="entry-kind">{w.kind}</p>
              <p>{w.description}</p>
              <p className="path-line">
                {w.paths.map((p) => (
                  <code key={p} className="path">
                    {p}
                  </code>
                ))}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="blk" aria-labelledby="notes">
        <h2 id="notes" className="blk-h">
          {c.notesHeading}
        </h2>
        <p className="blk-intro">{c.notesIntro}</p>
        <ul className="notes">
          {researchNotes.map((n) => (
            <li key={n.name}>
              <span className="notes-name">{n.name}</span>{' '}
              <code className="path">{n.domain}</code> — {n.line}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
