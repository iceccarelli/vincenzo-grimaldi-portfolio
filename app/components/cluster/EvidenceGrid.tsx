import { stack } from '../../lib/cluster/stack';
import { palletizerTests, EVIDENCE_SNAPSHOT } from '../../lib/cluster/evidence';

/**
 * EvidenceGrid — the palletizer test suite mapped onto the stack layers.
 * A layer with modules has test evidence behind it; a layer without says
 * "no test evidence". Module names are the files under tests/.
 */
export default function EvidenceGrid() {
  return (
    <figure className="fig">
      <ol className="evgrid" aria-label="Test modules by stack layer">
        {stack.map((l) => {
          const mods = palletizerTests.filter((t) => t.layer === l.key);
          return (
            <li key={l.key} className={mods.length ? 'evrow' : 'evrow evrow-empty'}>
              <span className="evrow-layer">{l.name}</span>
              <span className="evrow-mods">
                {mods.length ? (
                  mods.map((m) => (
                    <code key={m.name} className="path" title={m.note}>
                      test_{m.name}.py{m.note ? ` · ${m.note}` : ''}
                    </code>
                  ))
                ) : (
                  <span className="muted">no test evidence</span>
                )}
              </span>
              <span className="evrow-n num">{mods.length || '—'}</span>
            </li>
          );
        })}
      </ol>
      <figcaption>
        {EVIDENCE_SNAPSHOT.testModules} test modules and {EVIDENCE_SNAPSHOT.pythonModulesOutsideWeb} Python modules
        outside <code className="path">web/</code> at the {EVIDENCE_SNAPSHOT.date} commit ({EVIDENCE_SNAPSHOT.source}).
        Perception, world model, simulator, actuation, failure analysis and learning have no tests in this repository.
      </figcaption>
    </figure>
  );
}
