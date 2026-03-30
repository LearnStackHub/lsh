import { MySQLHero, MySQLWhyGrid, MySQLDiagramFrame } from './MySQLShowcaseBlocks';
import {
  HorizontalPipeline,
  MySQLDataTypeDesignScenarioDiagram,
  MySQLCreateDatabaseScenarioDiagram,
  MySQLDDLAlterScenarioDiagram,
  MySQLSelectStatementShapeScenarioDiagram,
  MySQLClauseLogicalOrderScenarioDiagram,
  MySQLForeignKeyValidationScenarioDiagram,
  MySQLAggregatePipelineScenarioDiagram,
  MySQLScalarExpressionRowScenarioDiagram,
  MySQLViewQueryMergeScenarioDiagram,
  MySQLProcedureCallFlowScenarioDiagram,
  MySQLTriggerBeforeAfterScenarioDiagram,
  MySQLCorrelatedSubqueryScenarioDiagram,
  MySQLPrivilegeGrantCheckScenarioDiagram
} from '../flow/ProfessionalDiagrams';

const CONFIG = {
  'mysql-data-types': {
    eyebrow: 'MySQL · Data types',
    title: 'Types drive storage, indexes, and semantics',
    subtitle:
      'Physical storage (fixed vs variable length), charset/collation, and numeric precision determine row size on disk, B-Tree index width, and how comparisons and ORDER BY behave. Choosing wrong types wastes buffer pool and breaks expectations (e.g. FLOAT for currency).',
    why: [
      { title: 'Precision', text: 'DECIMAL(p,s) for money; FLOAT/DOUBLE for approximate science — rounding and display differ.' },
      { title: 'Strings', text: 'utf8mb4 + collation affect length in bytes, index limits, and case-sensitive compares.' },
      { title: 'Temporal', text: 'TIMESTAMP (timezone-aware, narrower range) vs DATETIME (what you store is what you get).' },
      { title: 'BLOB/TEXT', text: 'Off-page storage possible — keep hot columns narrow so more rows fit in memory.' }
    ],
    Diagram: MySQLDataTypeDesignScenarioDiagram
  },
  'mysql-create-database': {
    eyebrow: 'MySQL · CREATE DATABASE',
    title: 'Creating a database (schema)',
    subtitle:
      'A database is a namespace: default charset/collation for new tables, privilege boundaries, and a folder of objects in the data dictionary. One mysqld instance hosts many databases; USE switches the default schema for your session.',
    why: [
      { title: 'Isolation', text: 'Separate schemas per app or tenant; GRANT can target `db`.*.' },
      { title: 'Dictionary', text: 'CREATE is recorded in mysql.* and exposed in information_schema.SCHEMATA.' },
      { title: 'Charset', text: 'DEFAULT CHARACTER SET on CREATE DATABASE flows to new tables unless overridden.' },
      { title: 'Physical', text: 'With innodb_file_per_table, each table’s .ibd lives under the datadir; shared tablespace is separate.' }
    ],
    Diagram: MySQLCreateDatabaseScenarioDiagram
  },
  'mysql-ddl': {
    eyebrow: 'MySQL · DDL',
    title: 'DDL, metadata locks, and online algorithms',
    subtitle:
      'CREATE/ALTER/DROP take metadata locks so the dictionary stays consistent. InnoDB may rebuild the table (COPY), change files in place (INPLACE), or only alter metadata—depends on operation and version. Long-running SELECTs can block DDL; DDL can block new statements.',
    why: [
      { title: 'MDL', text: 'Metadata lock waits show in performance_schema — tune lock_wait_timeout.' },
      { title: 'Algorithms', text: 'ALGORITHM=INPLACE, LOCK=NONE when supported; else full table copy.' },
      { title: 'Replicas', text: 'DDL runs on primary and replays to replicas — watch replication lag.' },
      { title: 'Tools', text: 'pt-online-schema-change / gh-ost for zero-downtime patterns on huge tables.' }
    ],
    Diagram: MySQLDDLAlterScenarioDiagram
  },
  'mysql-select': {
    eyebrow: 'MySQL · SELECT',
    title: 'Structuring SELECT statements',
    subtitle:
      'Written order (SELECT first) differs from logical processing (FROM/WHERE before SELECT projection). The optimizer rewrites joins and pushdown predicates; GROUP BY and DISTINCT create intermediate result sets.',
    why: [
      { title: 'Clauses', text: 'FROM/JOIN build row set; WHERE filters; GROUP BY buckets; HAVING filters groups; SELECT projects; ORDER BY sorts; LIMIT trims.' },
      { title: 'GROUP BY', text: 'Non-aggregated columns in SELECT must appear in GROUP BY (with ONLY_FULL_GROUP_BY).' },
      { title: 'Locking', text: 'FOR UPDATE / LOCK IN SHARE MODE affect InnoDB row locks — use inside transactions.' },
      { title: 'DISTINCT', text: 'Dedup after row combination — can sort or hash; expensive on wide rows.' }
    ],
    Diagram: MySQLSelectStatementShapeScenarioDiagram
  },
  'mysql-clauses': {
    eyebrow: 'MySQL · Clauses',
    title: 'Logical processing order',
    subtitle:
      'Standard teaching order: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT. WHERE cannot see SELECT aliases; HAVING can reference aggregates; ORDER BY can use SELECT aliases in MySQL.',
    why: [
      { title: 'WHERE vs HAVING', text: 'WHERE filters raw rows; HAVING filters grouped rows after aggregates.' },
      { title: 'Aliases', text: 'Cannot use SELECT alias in WHERE — repeat expression or use subquery/CTE.' },
      { title: 'LIMIT', text: 'Large OFFSET pays linear cost — prefer keyset pagination.' },
      { title: 'Debugging', text: 'Wrong counts often come from misplaced predicates (ON vs WHERE on outer joins).' }
    ],
    Diagram: MySQLClauseLogicalOrderScenarioDiagram
  },
  'mysql-constraints': {
    eyebrow: 'MySQL · Constraints',
    title: 'Foreign keys at runtime',
    subtitle:
      'InnoDB enforces child→parent references and optional CASCADE/SET NULL on parent changes. Requires compatible types, indexes on child columns, and matching storage engine.',
    why: [
      { title: 'Referential integrity', text: 'Engine-level checks on INSERT/UPDATE/DELETE — not replaceable by app-only checks.' },
      { title: 'Indexes', text: 'Foreign key columns should be indexed for lookup and join performance.' },
      { title: 'Cascades', text: 'ON DELETE CASCADE can delete many rows — plan triggers and audits.' },
      { title: 'FK checks', text: 'SET FOREIGN_KEY_CHECKS=0 only for controlled migrations — not routine app code.' }
    ],
    Diagram: MySQLForeignKeyValidationScenarioDiagram
  },
  'mysql-aggregate-functions': {
    eyebrow: 'MySQL · Aggregates',
    title: 'Aggregating rows',
    subtitle:
      'GROUP BY partitions input rows; aggregate functions collapse each partition. Temp tables or filesort may be used; statistics influence whether sort or hash aggregation is chosen.',
    why: [
      { title: 'GROUP BY', text: 'Defines partition keys; must align with SELECT under ONLY_FULL_GROUP_BY.' },
      { title: 'NULL', text: 'COUNT(*) counts rows; COUNT(col) skips NULLs; SUM/AVG ignore NULLs.' },
      { title: 'HAVING', text: 'Filter on aggregate results — WHERE cannot do that.' },
      { title: 'ROLLUP', text: 'Super-aggregate rows for subtotals — GROUPING() distinguishes NULL types in 8.0.' }
    ],
    Diagram: MySQLAggregatePipelineScenarioDiagram
  },
  'mysql-scalar-functions': {
    eyebrow: 'MySQL · Scalar functions',
    title: 'Per-row expressions',
    subtitle:
      'Scalar functions run after joins for each output row (unless optimized). Nondeterministic functions (NOW(), UUID()) affect replication and caching; deterministic ones can be indexed via generated columns in 5.7+.',
    why: [
      { title: 'Sargability', text: 'WHERE YEAR(d) = 2024 prevents range use on d — use range on d instead.' },
      { title: 'CPU', text: 'Heavy string/JSON work in SELECT — profile with EXPLAIN ANALYZE.' },
      { title: 'Collation', text: 'String functions respect collation — comparisons may be case-insensitive.' },
      { title: 'JSON', text: 'JSON_EXTRACT path ops — consider functional index on expression (8.0+).' }
    ],
    Diagram: MySQLScalarExpressionRowScenarioDiagram
  },
  'mysql-views': {
    eyebrow: 'MySQL · Views',
    title: 'Views and query merging',
    subtitle:
      'A view stores a SELECT; the optimizer usually merges it into the outer query (MERGE algorithm). TEMPTABLE materializes for some constructs. Updatable views have rules and WITH CHECK OPTION.',
    why: [
      { title: 'Abstraction', text: 'Hide joins and column lists; optional security through definer/invoker.' },
      { title: 'EXPLAIN', text: 'Shows merged SQL — complex nested views can obscure index use.' },
      { title: 'CHECK OPTION', text: 'Prevents rows that would disappear from the view after insert/update.' },
      { title: 'CTEs', text: 'WITH (8.0+) often clearer than deep nested views for one-off queries.' }
    ],
    Diagram: MySQLViewQueryMergeScenarioDiagram
  },
  'mysql-stored-procedures': {
    eyebrow: 'MySQL · Stored procedures',
    title: 'CALL and procedure execution',
    subtitle:
      'Procedures run in the server with session context; can return multiple result sets, use dynamic SQL, and run in DEFINER or INVOKER security modes.',
    why: [
      { title: 'Round-trips', text: 'Batch logic when network latency dominates.' },
      { title: 'EXECUTE', text: 'Grant separately from underlying tables — least privilege for callers.' },
      { title: 'SQL injection', text: 'Dynamic SQL inside procedures must still use parameters.' },
      { title: 'Testing', text: 'Version procedures with schema migrations — drift breaks apps silently.' }
    ],
    Diagram: MySQLProcedureCallFlowScenarioDiagram
  },
  'mysql-triggers': {
    eyebrow: 'MySQL · Triggers',
    title: 'BEFORE / AFTER triggers',
    subtitle:
      'Triggers fire in the same transaction as the triggering statement. BEFORE can modify NEW; AFTER for audit. Order of multiple triggers is defined per action/time.',
    why: [
      { title: 'Atomicity', text: 'Trigger error rolls back the whole statement.' },
      { title: 'Hidden work', text: 'Harder to observe than explicit app code — document side effects.' },
      { title: 'Recursion', text: 'Triggers firing triggers — can loop; keep bodies minimal.' },
      { title: 'Replication', text: 'Statement vs row format affects how triggers replicate — know your binlog mode.' }
    ],
    Diagram: MySQLTriggerBeforeAfterScenarioDiagram
  },
  'mysql-subqueries': {
    eyebrow: 'MySQL · Subqueries',
    title: 'Nested SELECTs — correlation cost',
    subtitle:
      'Correlated subqueries reference outer columns and may run per outer row unless the optimizer converts them to semijoins. Derived tables may materialize to temp tables.',
    why: [
      { title: 'Semijoin', text: 'Optimizer often rewrites IN/EXISTS to efficient joins — check EXPLAIN.' },
      { title: 'Materialization', text: 'FROM (SELECT…) may be materialized when merge is impossible.' },
      { title: 'Lateral', text: '8.0.14+ LATERAL for correlated derived tables in FROM.' },
      { title: 'Readability', text: 'CTEs can clarify intent vs deeply nested subqueries.' }
    ],
    Diagram: MySQLCorrelatedSubqueryScenarioDiagram
  },
  'mysql-privileges': {
    eyebrow: 'MySQL · Privileges',
    title: 'Authentication then authorization',
    subtitle:
      'Connect with a user@host identity (authentication plugin), then each statement is authorized against global, database, table, column, or routine privileges; roles (8.0) bundle grants.',
    why: [
      { title: 'Least privilege', text: 'Avoid ALL PRIVILEGES and SUPER for application users.' },
      { title: 'Host column', text: 'user@`%` vs exact host — connection must match a row in mysql.user.' },
      { title: 'Dynamic privs', text: '8.0 dynamic privileges for operations like BACKUP_ADMIN.' },
      { title: 'Audits', text: 'Regularly review mysql.user, mysql.db, and role assignments.' }
    ],
    Diagram: MySQLPrivilegeGrantCheckScenarioDiagram
  },
  'mysql-mcq': {
    kind: 'pipeline',
    eyebrow: 'MySQL · MCQ',
    title: 'Study path for multiple-choice prep',
    subtitle:
      'Build from single-table SQL → joins → aggregates → subqueries → indexes and EXPLAIN → transactions and isolation. For each wrong MCQ answer, write the SQL that proves the correct behavior.',
    why: [
      { title: 'Foundations', text: 'Data types, NULL, and charset before advanced topics.' },
      { title: 'Hands-on', text: 'Run examples in a local 8.0 instance — reading alone misleads.' },
      { title: 'EXPLAIN', text: 'Exam questions often hinge on index use and join order.' },
      { title: 'Timed drills', text: 'After mastery, practice under time limits.' }
    ],
    pipelineTitle: 'Suggested review order',
    pipelineLabel: 'Topic flow',
    pipelineSteps: [
      { title: 'SELECT & filters', sub: 'WHERE, ORDER BY' },
      { title: 'Joins', sub: 'INNER / OUTER' },
      { title: 'Aggregates', sub: 'GROUP BY, HAVING' },
      { title: 'Subqueries', sub: 'IN, EXISTS' },
      { title: 'Indexes', sub: 'EXPLAIN' },
      { title: 'Transactions', sub: 'ACID, isolation' }
    ]
  }
};

export default function MySQLTopicRuntimeShowcase({ topicId }) {
  const cfg = CONFIG[topicId];
  if (!cfg) return null;

  if (cfg.kind === 'pipeline') {
    return (
      <div className="mysql-showcase">
        <MySQLHero eyebrow={cfg.eyebrow} title={cfg.title} subtitle={cfg.subtitle} />
        <MySQLWhyGrid items={cfg.why} />
        <div className="mysql-panel">
          <MySQLDiagramFrame label={cfg.pipelineLabel}>
            <HorizontalPipeline steps={cfg.pipelineSteps} title={cfg.pipelineTitle} fresherHint={false} />
          </MySQLDiagramFrame>
        </div>
      </div>
    );
  }

  const { Diagram } = cfg;
  return (
    <div className="mysql-showcase">
      <MySQLHero eyebrow={cfg.eyebrow} title={cfg.title} subtitle={cfg.subtitle} />
      <MySQLWhyGrid items={cfg.why} />
      <div className="mysql-panel">
        <MySQLDiagramFrame label="Real-time scenario">
          <Diagram />
        </MySQLDiagramFrame>
      </div>
    </div>
  );
}
