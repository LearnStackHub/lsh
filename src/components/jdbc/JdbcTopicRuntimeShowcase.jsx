import { JdbcHero, JdbcWhyGrid, JdbcDiagramFrame } from './JdbcShowcaseBlocks';
import {
  HorizontalPipeline,
  JdbcProjectClasspathScenarioDiagram,
  JdbcDriverLoaderScenarioDiagram,
  JdbcConnectionObtainScenarioDiagram,
  JdbcStatementExecuteScenarioDiagram,
  JdbcPreparedStatementBindScenarioDiagram,
  JdbcResultSetCursorScenarioDiagram,
  JdbcCrudOperationsScenarioDiagram,
  JdbcTransactionBoundaryScenarioDiagram
} from '../flow/ProfessionalDiagrams';

const CONFIG = {
  'jdbc-project-setup': {
    eyebrow: 'JDBC · Project setup',
    title: 'Driver JAR and classpath',
    subtitle: 'How the connector lands where the JVM can load it — Maven, Gradle, or manual -cp.',
    why: [
      { title: 'Dependency', text: 'Declare mysql-connector-j (or your vendor) once; let the build tool resolve versions.' },
      { title: 'Runtime', text: 'The driver must be on the same classpath as code that calls DriverManager.' },
      { title: 'Versions', text: 'Align driver major version with database server when teams standardize support.' }
    ],
    Diagram: JdbcProjectClasspathScenarioDiagram
  },
  'jdbc-drivers': {
    eyebrow: 'JDBC · Drivers',
    title: 'Loading and selecting a driver',
    subtitle: 'ServiceLoader registration, JDBC URLs, and how DriverManager picks an implementation.',
    why: [
      { title: 'SPI', text: 'Modern drivers self-register — understand when Class.forName is still taught.' },
      { title: 'URL scheme', text: 'jdbc:mysql: vs jdbc:postgresql: — wrong URL → wrong driver or parse error.' },
      { title: 'Properties', text: 'SSL, timezone, character encoding — often passed on the URL or Properties object.' }
    ],
    Diagram: JdbcDriverLoaderScenarioDiagram
  },
  'jdbc-connection-steps': {
    eyebrow: 'JDBC · Connections',
    title: 'Opening a connection',
    subtitle: 'From JDBC URL to a live session — pooling comes later but starts here.',
    why: [
      { title: 'Credentials', text: 'User/password or token — never hard-code in source control.' },
      { title: 'Lifecycle', text: 'Connections are expensive — pools reuse them; you still close or return to pool.' },
      { title: 'Errors', text: 'Timeouts and handshake failures surface as SQLException — distinguish network vs auth.' }
    ],
    Diagram: JdbcConnectionObtainScenarioDiagram
  },
  'statement-interface': {
    eyebrow: 'JDBC · Statement',
    title: 'Statement.execute*',
    subtitle: 'Static SQL from strings — fine for admin scripts; risky for user input.',
    why: [
      { title: 'executeQuery', text: 'Returns ResultSet for SELECT.' },
      { title: 'executeUpdate', text: 'Row count for DML; 0 can mean “no rows matched,” not always failure.' },
      { title: 'Injection', text: 'Concatenating input into SQL is unsafe — PreparedStatement next.' }
    ],
    Diagram: JdbcStatementExecuteScenarioDiagram
  },
  'prepared-statement': {
    eyebrow: 'JDBC · PreparedStatement',
    title: 'Bind parameters safely',
    subtitle: 'Placeholders, type-safe setters, and batching — production default for dynamic values.',
    why: [
      { title: 'Security', text: 'Parameters are escaped by the driver — primary defense against SQL injection.' },
      { title: 'Performance', text: 'Server may cache execution plans for the same SQL shape.' },
      { title: 'Batching', text: 'addBatch / executeBatch for bulk inserts reduces round-trips.' }
    ],
    Diagram: JdbcPreparedStatementBindScenarioDiagram
  },
  'resultset-interface': {
    eyebrow: 'JDBC · ResultSet',
    title: 'Cursor and getters',
    subtitle: 'How you walk rows and map columns to Java types.',
    why: [
      { title: 'next()', text: 'Forward-only by default — request scrollable if you need random access.' },
      { title: 'Labels vs index', text: 'Column labels follow DB rules — be explicit in SELECT for stable names.' },
      { title: 'NULLs', text: 'Use wasNull() or nullable wrappers when primitives cannot represent NULL.' }
    ],
    Diagram: JdbcResultSetCursorScenarioDiagram
  },
  'crud-operations': {
    eyebrow: 'JDBC · CRUD',
    title: 'Operations map to SQL',
    subtitle: 'Inserts, selects, updates, deletes — all JDBC does is send SQL and read results.',
    why: [
      { title: 'Generated keys', text: 'RETURN_GENERATED_KEYS for auto-increment IDs after insert.' },
      { title: 'Transactions', text: 'Multiple DMLs in one tx for atomic business operations.' },
      { title: 'Mapping', text: 'Manual DTO mapping — ORMs automate this but JDBC stays the debugging layer.' }
    ],
    Diagram: JdbcCrudOperationsScenarioDiagram
  },
  'transaction-management': {
    eyebrow: 'JDBC · Transactions',
    title: 'commit / rollback',
    subtitle: 'Control autocommit, boundaries, and isolation from JDBC code.',
    why: [
      { title: 'autocommit', text: 'Default true — turn off for multi-statement atomic work.' },
      { title: 'Pools', text: 'Always end tx before returning connection to pool.' },
      { title: 'Isolation', text: 'setTransactionIsolation must match business consistency needs.' }
    ],
    Diagram: JdbcTransactionBoundaryScenarioDiagram
  },
  'jdbc-mcq': {
    kind: 'pipeline',
    eyebrow: 'JDBC · MCQ',
    title: 'Study path for exam prep',
    subtitle: 'Cover layers in order — then drill JDBC API details and edge cases.',
    why: [
      { title: 'Basics', text: 'Driver, Connection, Statement family, ResultSet — know close order.' },
      { title: 'Safety', text: 'PreparedStatement and SQL injection questions are guaranteed.' },
      { title: 'Transactions', text: 'commit, rollback, autocommit — common trick questions.' }
    ],
    pipelineTitle: 'Suggested review order',
    pipelineLabel: 'Topic flow',
    pipelineSteps: [
      { title: 'Architecture', sub: 'API → driver → DB' },
      { title: 'Connection', sub: 'URL, props' },
      { title: 'Statement', sub: 'execute*' },
      { title: 'PreparedStatement', sub: 'bind, batch' },
      { title: 'ResultSet', sub: 'next, getXxx' },
      { title: 'Transactions', sub: 'commit, rollback' }
    ]
  }
};

function normalizeTopicId(topicId) {
  if (topicId === 'jdbc-transactions') return 'transaction-management';
  return topicId;
}

export default function JdbcTopicRuntimeShowcase({ topicId }) {
  const id = normalizeTopicId(topicId);
  const cfg = CONFIG[id];
  if (!cfg) return null;

  if (cfg.kind === 'pipeline') {
    return (
      <div className="jdbc-showcase">
        <JdbcHero eyebrow={cfg.eyebrow} title={cfg.title} subtitle={cfg.subtitle} />
        <JdbcWhyGrid items={cfg.why} />
        <div className="jdbc-panel">
          <JdbcDiagramFrame label={cfg.pipelineLabel}>
            <HorizontalPipeline steps={cfg.pipelineSteps} title={cfg.pipelineTitle} fresherHint={false} />
          </JdbcDiagramFrame>
        </div>
      </div>
    );
  }

  const { Diagram } = cfg;
  return (
    <div className="jdbc-showcase">
      <JdbcHero eyebrow={cfg.eyebrow} title={cfg.title} subtitle={cfg.subtitle} />
      <JdbcWhyGrid items={cfg.why} />
      <div className="jdbc-panel">
        <JdbcDiagramFrame label="Real-time scenario">
          <Diagram />
        </JdbcDiagramFrame>
      </div>
    </div>
  );
}
