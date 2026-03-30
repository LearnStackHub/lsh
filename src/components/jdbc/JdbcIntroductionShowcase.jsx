import { useState } from 'react';
import { JdbcHero, JdbcWhyGrid, JdbcDiagramFrame, JdbcCallout } from './JdbcShowcaseBlocks';
import {
  HorizontalPipeline,
  JdbcArchitectureLayersScenarioDiagram,
  JdbcDriverLoaderScenarioDiagram,
  JdbcConnectionObtainScenarioDiagram,
  JdbcStatementExecuteScenarioDiagram,
  JdbcPreparedStatementBindScenarioDiagram,
  JdbcResultSetCursorScenarioDiagram,
  JdbcTransactionBoundaryScenarioDiagram
} from '../flow/ProfessionalDiagrams';

const TABS = [
  ['layers', 'Layers & API'],
  ['driver', 'Driver & URL'],
  ['connection', 'Connection'],
  ['statement', 'Statement'],
  ['prepared', 'PreparedStatement'],
  ['resultset', 'ResultSet'],
  ['transactions', 'Transactions'],
  ['path', 'Study path']
];

const WHY = [
  {
    title: 'Portability',
    text: 'java.sql types abstract vendor details — SQL dialects still leak sometimes, but your Java code stays on a stable API.'
  },
  {
    title: 'Exceptions & cleanup',
    text: 'SQLException wraps failures; use try-with-resources so Connection, Statement, and ResultSet always close.'
  },
  {
    title: 'Foundation for frameworks',
    text: 'Spring JdbcTemplate and JPA still sit on these primitives — understanding JDBC makes debugging persistence issues easier.'
  }
];

export default function JdbcIntroductionShowcase() {
  const [tab, setTab] = useState('layers');
  return (
    <div className="jdbc-showcase">
      <JdbcHero
        eyebrow="JDBC · Basics"
        title="Introduction to JDBC"
        subtitle="JDBC is the standard bridge from Java to relational databases: you program against interfaces in java.sql; the vendor driver implements the wire protocol. Walk the runtime path in the tabs below."
      />
      <p className="jdbc-showcase-lead">
        Start with how your app, the driver, and the database line up, then follow a request: load the driver, open a connection, execute SQL, read a{' '}
        <code>ResultSet</code>, and finish with transaction boundaries. Each diagram matches a topic later in this course.
      </p>
      <JdbcWhyGrid items={WHY} />

      <div className="jdbc-tabs">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" className={`jdbc-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'layers' && (
        <div className="jdbc-panel">
          <JdbcDiagramFrame label="Application → JDBC API → driver → database">
            <JdbcArchitectureLayersScenarioDiagram />
          </JdbcDiagramFrame>
          <p className="jdbc-caption">
            Your code calls <code>DriverManager</code>, <code>Connection</code>, <code>Statement</code>, and <code>ResultSet</code> — all interfaces. The MySQL (or other) driver JAR supplies concrete classes and talks to the server.
          </p>
        </div>
      )}

      {tab === 'driver' && (
        <div className="jdbc-panel">
          <JdbcDiagramFrame label="Driver discovery and JDBC URL">
            <JdbcDriverLoaderScenarioDiagram />
          </JdbcDiagramFrame>
          <p className="jdbc-caption">
            Modern drivers register via the service loader; the JDBC URL (e.g. <code>jdbc:mysql://...</code>) tells <code>DriverManager</code> which implementation to use.
          </p>
          <JdbcCallout variant="tip" title="Classpath">
            Keep the connector JAR on the same classpath as code that calls <code>DriverManager</code> — build tools like Maven put it under compile/runtime scope automatically.
          </JdbcCallout>
        </div>
      )}

      {tab === 'connection' && (
        <div className="jdbc-panel">
          <JdbcDiagramFrame label="From URL to a live session">
            <JdbcConnectionObtainScenarioDiagram />
          </JdbcDiagramFrame>
          <p className="jdbc-caption">
            <code>getConnection</code> performs handshake, authentication, and session setup. Pools (later) wrap this step to reuse physical connections.
          </p>
        </div>
      )}

      {tab === 'statement' && (
        <div className="jdbc-panel">
          <JdbcDiagramFrame label="Statement.execute*">
            <JdbcStatementExecuteScenarioDiagram />
          </JdbcDiagramFrame>
          <p className="jdbc-caption">
            <code>executeQuery</code> returns rows; <code>executeUpdate</code> returns affected counts. Avoid concatenating user input — that leads to the next tab.
          </p>
        </div>
      )}

      {tab === 'prepared' && (
        <div className="jdbc-panel">
          <JdbcDiagramFrame label="Bind parameters safely">
            <JdbcPreparedStatementBindScenarioDiagram />
          </JdbcDiagramFrame>
          <p className="jdbc-caption">
            Placeholders and <code>setXxx</code> bind values without embedding them in SQL text — the primary defense against SQL injection and a performance win when the server caches plans.
          </p>
        </div>
      )}

      {tab === 'resultset' && (
        <div className="jdbc-panel">
          <JdbcDiagramFrame label="Cursor and column access">
            <JdbcResultSetCursorScenarioDiagram />
          </JdbcDiagramFrame>
          <p className="jdbc-caption">
            <code>next()</code> advances the cursor; use column labels or indices with the right getters. Mind <code>NULL</code> and <code>wasNull()</code> when mapping to primitives.
          </p>
        </div>
      )}

      {tab === 'transactions' && (
        <div className="jdbc-panel">
          <JdbcDiagramFrame label="commit, rollback, autocommit">
            <JdbcTransactionBoundaryScenarioDiagram />
          </JdbcDiagramFrame>
          <p className="jdbc-caption">
            Turn off autocommit when several statements must succeed or fail together; always end the transaction before returning a pooled connection.
          </p>
        </div>
      )}

      {tab === 'path' && (
        <div className="jdbc-panel">
          <JdbcDiagramFrame label="Suggested order through this course">
            <HorizontalPipeline
              title="Layers → connection → statements → results → transactions"
              fresherHint={false}
              steps={[
                { title: 'Architecture', sub: 'API → driver → DB' },
                { title: 'Driver & URL', sub: 'SPI, jdbc:…' },
                { title: 'Connection', sub: 'session' },
                { title: 'Statement', sub: 'execute*' },
                { title: 'PreparedStatement', sub: 'bind, batch' },
                { title: 'ResultSet', sub: 'next, getXxx' },
                { title: 'Transactions', sub: 'commit, rollback' }
              ]}
            />
          </JdbcDiagramFrame>
          <p className="jdbc-caption">
            Use this pipeline as a checklist when revising for interviews or debugging: each stage has failure modes you can recognize in stack traces and logs.
          </p>
        </div>
      )}
    </div>
  );
}
