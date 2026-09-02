import type { Metadata } from 'next';
import { caseStudies, researchNotes } from '../lib/work';
import { copy } from '../lib/copy';

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Work with a public artifact behind each entry: the CIM–ThreMA thesis simulator and write-up, and a public-dataset portfolio application. Private codebases are listed as research notes, not products.',
  alternates: { canonical: '/work' },
};

export const revalidate = 3600;

/**
 * /work — a list, server-rendered in English. Each entry names its public
 * artifact in mono under the title. Private work is a note, not a card.
 */
export default function WorkPage() {
  const c = copy.en.work;
  return (
    <main className="doc">
      <section className="blk blk-first">
        <h1 className="h1">{c.title}</h1>
        <p className="lead">{c.intro}</p>

        <ol className="entries">
          {caseStudies.map((w) => (
            <li key={w.slug} className="entry">
              <h2>
                <a href={`/work/${w.slug}`}>{w.name}</a>
              </h2>
              <p className="entry-kind">{w.kind}</p>
              <p>{w.description}</p>
              <p className="path-line">
                {w.paths.map((p) => (
                  <code key={p} className="path">{p}</code>
                ))}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="blk" aria-labelledby="notes">
        <h2 id="notes" className="blk-h">{c.notesHeading}</h2>
        <p className="blk-intro">{c.notesIntro}</p>
        <ul className="notes">
          {researchNotes.map((n) => (
            <li key={n.name}>
              <span className="notes-name">{n.name}</span> — {n.line}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
