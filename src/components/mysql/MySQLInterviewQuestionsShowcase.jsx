import { useState } from 'react';
import { MySQLHero, MySQLWhyGrid, MySQLDiagramFrame, MySQLCallout } from './MySQLShowcaseBlocks';
import {
  MySQLPrimaryReplicaReplicationScenarioDiagram,
  MySQLInnoDBTransactionACIDScenarioDiagram,
  MySQLBTreeIndexSeekScenarioDiagram
} from '../flow/ProfessionalDiagrams';

const TABS = [
  ['replication', 'Replication'],
  ['transactions', 'Transactions'],
  ['indexes', 'Indexes']
];

const WHY = [
  { title: 'Draw the box diagram', text: 'Interviewers expect you to narrate client → server → storage and replication basics.' },
  { title: 'Trade-offs', text: 'Async replica lag, isolation levels, and index cost are fair game for senior roles.' },
  { title: 'Ops awareness', text: 'Backups, binlog position, and failover stories separate “wrote SQL” from “ran systems.”' }
];

export default function MySQLInterviewQuestionsShowcase() {
  const [tab, setTab] = useState('replication');
  return (
    <div className="mysql-showcase">
      <MySQLHero
        eyebrow="MySQL · Interview prep"
        title="High-signal scenarios"
        subtitle="Quick visual review of replication, transactions, and indexing — common whiteboard topics."
      />
      <MySQLWhyGrid items={WHY} />
      <div className="mysql-tabs">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" className={`mysql-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>
      {tab === 'replication' && (
        <div className="mysql-panel">
          <MySQLDiagramFrame label="Primary → replica">
            <MySQLPrimaryReplicaReplicationScenarioDiagram />
          </MySQLDiagramFrame>
          <MySQLCallout variant="remember" title="Talking point">
            Mention GTID, semi-sync replication, or Group Replication only if you have real experience — otherwise stay with async binlog flow.
          </MySQLCallout>
        </div>
      )}
      {tab === 'transactions' && (
        <div className="mysql-panel">
          <MySQLDiagramFrame label="InnoDB transaction path">
            <MySQLInnoDBTransactionACIDScenarioDiagram />
          </MySQLDiagramFrame>
        </div>
      )}
      {tab === 'indexes' && (
        <div className="mysql-panel">
          <MySQLDiagramFrame label="Seek vs scan">
            <MySQLBTreeIndexSeekScenarioDiagram />
          </MySQLDiagramFrame>
        </div>
      )}
    </div>
  );
}
