import { MySQLHero, MySQLWhyGrid, MySQLDiagramFrame, MySQLCallout } from './MySQLShowcaseBlocks';
import { MySQLQueryExecutionPipelineScenarioDiagram } from '../flow/ProfessionalDiagrams';

const WHY = [
  { title: 'DQL = read path', text: 'SELECT is where parsing, optimization, and index use matter most for latency.' },
  { title: 'Plan first', text: 'The optimizer chooses join order and access methods before any row is returned.' },
  { title: 'Measure', text: 'EXPLAIN (and EXPLAIN ANALYZE on 8.0.18+) turns guesses into evidence.' }
];

export default function MySQLDQLShowcase() {
  return (
    <div className="mysql-showcase">
      <MySQLHero
        eyebrow="MySQL · Data Query Language"
        title="DQL — how SELECT runs"
        subtitle="A production-style view of parser → resolver → optimizer → execute — the same chain behind every report and API query."
      />
      <MySQLWhyGrid items={WHY} />
      <div className="mysql-panel">
        <MySQLDiagramFrame label="Server-side pipeline">
          <MySQLQueryExecutionPipelineScenarioDiagram />
        </MySQLDiagramFrame>
        <MySQLCallout variant="tip" title="Operational habit">
          Run <code>EXPLAIN FORMAT=TREE</code> (or <code>EXPLAIN ANALYZE</code>) on staging before promoting heavy queries. Compare
          <code>rows examined</code> vs result size — large gaps usually mean missing or unused indexes.
        </MySQLCallout>
      </div>
    </div>
  );
}
