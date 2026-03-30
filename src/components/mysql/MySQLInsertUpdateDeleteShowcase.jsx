import { MySQLHero, MySQLWhyGrid, MySQLDiagramFrame } from './MySQLShowcaseBlocks';
import { MySQLDmlWritePathScenarioDiagram } from '../flow/ProfessionalDiagrams';

const WHY = [
  { title: 'Write path', text: 'DML touches buffer pool pages first; redo log makes crash recovery possible (WAL).' },
  { title: 'Secondary indexes', text: 'INSERT may update multiple B-Trees — batch inserts reduce round-trips and log volume.' },
  { title: 'Contention', text: 'Hot rows and gap locks can serialize writers — design keys and transaction scope accordingly.' }
];

export default function MySQLInsertUpdateDeleteShowcase() {
  return (
    <div className="mysql-showcase">
      <MySQLHero
        eyebrow="MySQL · DML"
        title="INSERT / UPDATE / DELETE — write path"
        subtitle="What happens under the hood when rows change — useful for bulk loads, migrations, and incident analysis."
      />
      <MySQLWhyGrid items={WHY} />
      <div className="mysql-panel">
        <MySQLDiagramFrame label="Memory → log → disk">
          <MySQLDmlWritePathScenarioDiagram />
        </MySQLDiagramFrame>
      </div>
    </div>
  );
}
