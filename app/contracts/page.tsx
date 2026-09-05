import type { Metadata } from 'next';
import Pipeline from '../components/cluster/Pipeline';
import { contracts } from '../lib/cluster/contracts';

export const metadata: Metadata = {
  title: 'Cross-cluster contracts',
  description:
    'Versioned event contracts between the Energy Intelligence, Physical AI and Operations clusters as JSON Schema: AssetAnomalyDetected, InspectionWorkOrder, InspectionResult, PalletizingKpiSnapshot. Integration through contracts, never through shared databases.',
  alternates: { canonical: '/contracts' },
};

export const revalidate = 3600;

const chain = ['Energy: anomaly', 'Operations: work order', 'Physical AI: inspection', 'Energy: result'];

/**
 * /contracts — the schemas, rendered in full. Each is also served as JSON
 * at /api/cluster/contracts/[id]. None of the three systems requires the
 * others to function.
 */
export default function ContractsPage() {
  return (
    <main className="doc doc-wide">
      <section className="blk blk-first">
        <p className="kicker">Physical AI & Robotics · contracts</p>
        <h1 className="h1">Cross-cluster contracts</h1>
        <p className="lead">
          Communication between clusters occurs through versioned events with schemas — never through undocumented
          database coupling. Energy logic remains Energy, robotics logic remains Robotics, operations logic remains
          Operations. Index: <a href="/api/cluster/contracts">/api/cluster/contracts</a>.
        </p>
        <Pipeline stages={chain} label="Integration chain" compact />
      </section>

      {contracts.map((c) => (
        <section key={c.id} className="blk" id={c.id} aria-labelledby={`h-${c.id}`}>
          <h2 id={`h-${c.id}`} className="blk-h">
            <code className="path">{c.id}</code> <span className="muted h-note">v{c.version} · {c.producer} → {c.consumer}</span>
          </h2>
          <p className="blk-intro">{c.summary}</p>
          <pre className="schema" tabIndex={0}>
            <code>{JSON.stringify(c.schema, null, 2)}</code>
          </pre>
          <p className="blk-more">
            <a href={`/api/cluster/contracts/${c.id}`}>JSON Schema</a>
          </p>
        </section>
      ))}
    </main>
  );
}
