import { MySQLHero, MySQLWhyGrid, MySQLDiagramFrame } from './MySQLShowcaseBlocks';
import { MySQLBTreeIndexSeekScenarioDiagram } from '../flow/ProfessionalDiagrams';

const WHY = [
  { title: 'B+Tree', text: 'InnoDB indexes are balanced trees — seeks are logarithmic in tree depth, not linear in table size.' },
  { title: 'Clustered PK', text: 'The primary key defines how rows are physically ordered; secondary indexes point to PK values.' },
  { title: 'Trade-offs', text: 'More indexes speed SELECT but slow INSERT/UPDATE and use extra disk — design for real query patterns.' }
];

export default function MySQLIndexesShowcase() {
  return (
    <div className="mysql-showcase">
      <MySQLHero
        eyebrow="MySQL · Indexes"
        title="Indexes — seek vs scan"
        subtitle="Visual contrast between index-guided lookups and full table scans — the core of interview and on-call performance work."
      />
      <MySQLWhyGrid items={WHY} />
      <div className="mysql-panel">
        <MySQLDiagramFrame label="B+Tree seek vs full scan">
          <MySQLBTreeIndexSeekScenarioDiagram />
        </MySQLDiagramFrame>
      </div>
    </div>
  );
}
