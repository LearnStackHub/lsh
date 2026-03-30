import { useState } from 'react';
import { MySQLHero, MySQLWhyGrid, MySQLDiagramFrame, MySQLCallout } from './MySQLShowcaseBlocks';
import {
  MySQLClientServerArchitectureScenarioDiagram,
  MySQLQueryExecutionPipelineScenarioDiagram,
  MySQLInnoDBTransactionACIDScenarioDiagram,
  MySQLBTreeIndexSeekScenarioDiagram,
  MySQLNestedLoopJoinScenarioDiagram
} from '../flow/ProfessionalDiagrams';

const TABS = [
  ['architecture', 'Client → server'],
  ['querypath', 'Query pipeline'],
  ['innodb', 'InnoDB & ACID'],
  ['indexes', 'Index seek'],
  ['joins', 'Nested-loop join']
];

const WHY = [
  {
    title: 'Client / server',
    text: 'Your application talks to mysqld over the network (usually port 3306). Sessions, auth, and resource limits live on the server — the client only sends SQL and reads results.'
  },
  {
    title: 'SQL is declarative',
    text: 'You describe what you want; the optimizer chooses plans using statistics and indexes. Understanding the pipeline helps when EXPLAIN output looks confusing.'
  },
  {
    title: 'InnoDB by default',
    text: 'Transactions, row-level locking, and crash recovery are built around InnoDB. MyISAM-era mental models do not apply to most modern apps.'
  }
];

export default function MySQLIntroductionShowcase() {
  const [tab, setTab] = useState('architecture');
  return (
    <div className="mysql-showcase">
      <MySQLHero
        eyebrow="MySQL · Overview"
        title="Introduction to MySQL"
        subtitle="Before writing SQL, picture how your app reaches the server, how a statement becomes an execution plan, and how InnoDB protects data. The tabs tie each diagram to topics you will open next in this course."
      />
      <p className="mysql-showcase-lead">
        MySQL runs as a server process (<code>mysqld</code>). Clients connect with a protocol over TCP; inside the server, parsing, optimization, and storage engines cooperate to run your query. Use the tabs to see the big picture — then dive into installation, DQL, indexes, and transactions in order.
      </p>
      <MySQLWhyGrid items={WHY} />
      <div className="mysql-tabs">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" className={`mysql-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>
      {tab === 'architecture' && (
        <div className="mysql-panel">
          <MySQLDiagramFrame label="App → connector → mysqld">
            <MySQLClientServerArchitectureScenarioDiagram />
          </MySQLDiagramFrame>
          <p className="mysql-caption">
            Separating client and server matters for connection limits, TLS, and failover: your app is not “inside” MySQL; it is a peer that opens sessions and runs statements.
          </p>
        </div>
      )}
      {tab === 'querypath' && (
        <div className="mysql-panel">
          <MySQLDiagramFrame label="Parse → optimize → execute">
            <MySQLQueryExecutionPipelineScenarioDiagram />
          </MySQLDiagramFrame>
          <p className="mysql-caption">
            Text SQL becomes an internal plan. The optimizer picks join order and index usage — this is why identical-looking queries can have different performance after data or statistics change.
          </p>
        </div>
      )}
      {tab === 'innodb' && (
        <div className="mysql-panel">
          <MySQLDiagramFrame label="Transactions and durability (InnoDB)">
            <MySQLInnoDBTransactionACIDScenarioDiagram />
          </MySQLDiagramFrame>
          <p className="mysql-caption">
            ACID behavior (atomicity, consistency, isolation, durability) is what you rely on for banking-style updates. It connects directly to the transactions topic and to how <code>InnoDB</code> logs changes.
          </p>
          <MySQLCallout variant="remember" title="Later in this track">
            After DQL basics, open <strong>Transactions</strong> for isolation levels and <strong>Stored procedures / triggers</strong> when logic must run close to the data.
          </MySQLCallout>
        </div>
      )}
      {tab === 'indexes' && (
        <div className="mysql-panel">
          <MySQLDiagramFrame label="B-Tree index seek (simplified)">
            <MySQLBTreeIndexSeekScenarioDiagram />
          </MySQLDiagramFrame>
          <p className="mysql-caption">
            Indexes avoid full table scans when the optimizer can seek or range-scan the tree. The dedicated <strong>Indexes</strong> topic goes deeper on composite keys and covering indexes.
          </p>
        </div>
      )}
      {tab === 'joins' && (
        <div className="mysql-panel">
          <MySQLDiagramFrame label="How nested-loop joins work">
            <MySQLNestedLoopJoinScenarioDiagram />
          </MySQLDiagramFrame>
          <p className="mysql-caption">
            Joins drive row counts and cost. Recognizing nested-loop vs hash-style plans (via <code>EXPLAIN</code>) is part of writing efficient multi-table queries — covered in the <strong>Joins</strong> chapter.
          </p>
        </div>
      )}
    </div>
  );
}
