import { MySQLHero, MySQLWhyGrid, MySQLDiagramFrame } from './MySQLShowcaseBlocks';
import { MySQLInnoDBTransactionACIDScenarioDiagram } from '../flow/ProfessionalDiagrams';

const WHY = [
  { title: 'ACID in InnoDB', text: 'Durability flows through redo; rollback and consistent reads use undo + MVCC.' },
  { title: 'Keep it short', text: 'Long transactions hold locks and stall others — batch work outside the DB when possible.' },
  { title: 'Isolation', text: 'REPEATABLE READ is default; understand phantom reads vs your business rules.' }
];

export default function MySQLTransactionsShowcase() {
  return (
    <div className="mysql-showcase">
      <MySQLHero
        eyebrow="MySQL · Transactions"
        title="Transactions — InnoDB lifecycle"
        subtitle="Redo, undo, buffer pool, and commit — how real workloads stay consistent under failure and concurrency."
      />
      <MySQLWhyGrid items={WHY} />
      <div className="mysql-panel">
        <MySQLDiagramFrame label="BEGIN → working set → COMMIT">
          <MySQLInnoDBTransactionACIDScenarioDiagram />
        </MySQLDiagramFrame>
      </div>
    </div>
  );
}
