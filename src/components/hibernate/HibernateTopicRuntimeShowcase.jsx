import { useState } from 'react';
import { HibernateHero, HibernateWhyGrid, HibernateDiagramFrame, HibernateCallout } from './HibernateShowcaseBlocks';
import {
  HibernateArchitectureLayersDiagram,
  HibernateConfigurationBootstrapDiagram,
  HibernateSessionEntityStatesDiagram,
  HibernateMappingStrategiesDiagram,
  HibernateHqlExecutionDiagram,
  HibernateRelationshipsFetchDiagram,
  HibernateCachingLayersDiagram,
  HibernateLockingVersionDiagram,
  HibernateBatchProcessingFlowDiagram,
  DeepRuntimeFlowDiagram,
  PitfallsFlowDiagram,
  ScenarioPathFlowDiagram,
  InterviewAnswerMapDiagram
} from '../flow/ProfessionalDiagrams';
import {
  HIBERNATE_MECHANICS_DIAGRAMS,
  HIBERNATE_SCENARIO_DIAGRAMS,
  HIBERNATE_PITFALLS_DIAGRAMS,
  HIBERNATE_INTERVIEW_DIAGRAMS
} from './HibernateTopicTabDiagrams';

const CONFIG = {
  'hibernate-project-setup': {
    eyebrow: 'Hibernate · Project setup',
    title: 'Set up Hibernate in your project',
    subtitle: 'Add dependencies, mappings, config, and bootstrap SessionFactory correctly.',
    why: [
      { title: 'Correct dependencies', text: 'Align hibernate-core, JDBC driver, and transaction API versions.' },
      { title: 'Bootstrap once', text: 'SessionFactory is expensive and should usually be singleton-scoped.' },
      { title: 'Start clean', text: 'Early setup discipline avoids classpath and dialect mismatch errors later.' }
    ],
    conceptLabel: 'Bootstrap model',
    ConceptDiagram: HibernateConfigurationBootstrapDiagram,
    coreTabLabel: 'Bootstrap model',
    mechanicsTabLabel: 'Startup wiring',
    scenarioTabLabel: 'Student module setup',
    pitfallsTabLabel: 'Setup pitfalls',
    interviewTabLabel: 'Setup interview angle',
    mechanicsTitle: 'Bootstrap runtime mechanics',
    mechanicsSteps: [
      { title: 'Load config sources', sub: 'XML/properties/env resolution' },
      { title: 'Create ServiceRegistry', sub: 'dialect + datasource services' },
      { title: 'Build Metadata', sub: 'scan @Entity mappings' },
      { title: 'Construct SessionFactory', sub: 'cache SQL + mapping model' },
      { title: 'Open first Session', sub: 'transaction-ready unit of work' }
    ],
    pitfallsSteps: [
      { title: 'Version mismatch', sub: 'jakarta/javax API conflict' },
      { title: 'Wrong dialect', sub: 'invalid SQL generation' },
      { title: 'Factory per request', sub: 'heavy startup overhead' },
      { title: 'DDL in prod', sub: 'accidental schema mutation' }
    ],
    interviewSteps: [
      { title: 'Explain bootstrap order', sub: 'registry -> metadata -> factory' },
      { title: 'State singleton reason', sub: 'SessionFactory is expensive' },
      { title: 'Discuss env strategy', sub: 'externalized safe config' },
      { title: 'Share failure case', sub: 'dialect mismatch fix story' }
    ],
    MechanicsDiagram: HibernateConfigurationBootstrapDiagram,
    ScenarioDiagram: HibernateConfigurationBootstrapDiagram,
    PitfallsDiagram: HibernateConfigurationBootstrapDiagram,
    InterviewDiagram: HibernateConfigurationBootstrapDiagram,
    scenarioTitle: 'Scenario: bootstrapping student-management module',
    scenarioSteps: [
      { title: 'Add deps', sub: 'hibernate + driver' },
      { title: 'Configure props', sub: 'url, dialect, ddl-auto' },
      { title: 'Register entities', sub: '@Entity scan/mapping' },
      { title: 'Build SessionFactory', sub: 'startup' },
      { title: 'Open Session', sub: 'run first transaction' }
    ],
    scenarioCaption: 'Typical first integration flow teams follow when introducing Hibernate into a module.'
  },
  'hibernate-introduction': {
    eyebrow: 'Hibernate · Introduction',
    title: 'Object-relational mapping fundamentals',
    subtitle: 'Hibernate maps Java objects to relational tables and manages SQL generation.',
    why: [
      { title: 'Less boilerplate', text: 'You work with entities and mappings instead of repetitive JDBC glue.' },
      { title: 'Unit-of-work model', text: 'Session tracks changes and flushes SQL at transaction boundaries.' },
      { title: 'Still SQL-aware', text: 'Knowing generated SQL remains essential for performance debugging.' }
    ],
    conceptLabel: 'ORM layers',
    ConceptDiagram: HibernateArchitectureLayersDiagram,
    coreTabLabel: 'ORM layers',
    mechanicsTabLabel: 'ORM internals',
    scenarioTabLabel: 'Save Student flow',
    pitfallsTabLabel: 'ORM pitfalls',
    interviewTabLabel: 'ORM interview angle',
    mechanicsTitle: 'ORM translation mechanics',
    mechanicsSteps: [
      { title: 'Track entity state', sub: 'transient to persistent transition' },
      { title: 'Dirty-check changes', sub: 'detect field-level mutation' },
      { title: 'Generate SQL batch', sub: 'dialect-aware statements' },
      { title: 'Flush on boundary', sub: 'commit-triggered synchronization' },
      { title: 'Sync identifiers', sub: 'id/association updates back' }
    ],
    pitfallsSteps: [
      { title: 'Blind ORM trust', sub: 'ignoring generated SQL cost' },
      { title: 'Anemic transactions', sub: 'inconsistent unit-of-work scope' },
      { title: 'Lazy surprises', sub: 'extra queries in view layer' },
      { title: 'No SQL logging', sub: 'slow debugging feedback loop' }
    ],
    interviewSteps: [
      { title: 'Define ORM trade-off', sub: 'productivity vs SQL control' },
      { title: 'Show runtime path', sub: 'entity change -> SQL flush' },
      { title: 'Mention performance trap', sub: 'N+1 detection pattern' },
      { title: 'Back with metrics', sub: 'query count before/after' }
    ],
    MechanicsDiagram: HibernateArchitectureLayersDiagram,
    ScenarioDiagram: HibernateArchitectureLayersDiagram,
    PitfallsDiagram: HibernateArchitectureLayersDiagram,
    InterviewDiagram: HibernateArchitectureLayersDiagram,
    scenarioTitle: 'Scenario: save Student object',
    scenarioSteps: [
      { title: 'Create entity', sub: 'new Student(...)' },
      { title: 'session.persist()', sub: 'state becomes managed' },
      { title: 'tx.commit()', sub: 'flush SQL INSERT' },
      { title: 'id assigned', sub: 'strategy-dependent' },
      { title: 'verify row', sub: 'students table' }
    ],
    scenarioCaption: 'Shows how object operations become SQL writes through the persistence context.'
  },
  'hibernate-architecture': {
    eyebrow: 'Hibernate · Architecture',
    title: 'Core components and data flow',
    subtitle: 'SessionFactory, Session, Transaction, and JDBC collaboration in one request.',
    why: [
      { title: 'Clear roles', text: 'SessionFactory builds metadata; Session handles per-request persistence context.' },
      { title: 'Transaction control', text: 'Commit/rollback boundaries define consistency and flush behavior.' },
      { title: 'Operational clarity', text: 'Knowing component boundaries speeds up root-cause analysis.' }
    ],
    conceptLabel: 'Architecture components',
    ConceptDiagram: HibernateArchitectureLayersDiagram,
    coreTabLabel: 'Architecture components',
    mechanicsTabLabel: 'Component orchestration',
    scenarioTabLabel: 'Fetch-update request',
    pitfallsTabLabel: 'Architecture pitfalls',
    interviewTabLabel: 'Architecture interview angle',
    mechanicsTitle: 'Session/transaction orchestration mechanics',
    mechanicsSteps: [
      { title: 'Session opened', sub: 'persistence context created' },
      { title: 'Entity loaded', sub: 'L1 cache then DB lookup' },
      { title: 'Business mutation', sub: 'managed graph modified' },
      { title: 'Flush planner runs', sub: 'ordered SQL actions prepared' },
      { title: 'Commit finalizes', sub: 'DB write + detach lifecycle' }
    ],
    pitfallsSteps: [
      { title: 'Session leak', sub: 'unclosed contexts under load' },
      { title: 'Tx boundaries unclear', sub: 'partial writes and rollback pain' },
      { title: 'DAO-level commit', sub: 'service-layer consistency breaks' },
      { title: 'Mixed API usage', sub: 'native SQL and ORM drift' }
    ],
    interviewSteps: [
      { title: 'Draw component map', sub: 'SessionFactory/Session/Tx roles' },
      { title: 'Explain flush timing', sub: 'why commit triggers SQL' },
      { title: 'Show failure mode', sub: 'rollback behavior with exception' },
      { title: 'Give production example', sub: 'request-scoped session pattern' }
    ],
    MechanicsDiagram: HibernateArchitectureLayersDiagram,
    ScenarioDiagram: HibernateArchitectureLayersDiagram,
    PitfallsDiagram: HibernateArchitectureLayersDiagram,
    InterviewDiagram: HibernateArchitectureLayersDiagram,
    scenarioTitle: 'Scenario: fetch and update entity',
    scenarioSteps: [
      { title: 'Open session', sub: 'new unit of work' },
      { title: 'Load entity', sub: 'SELECT by id' },
      { title: 'Mutate fields', sub: 'managed object' },
      { title: 'Commit tx', sub: 'dirty-check UPDATE' },
      { title: 'Close session', sub: 'detach entities' }
    ],
    scenarioCaption: 'Real request pattern in service-layer transaction methods.'
  },
  'hibernate-configuration': {
    eyebrow: 'Hibernate · Configuration',
    title: 'Properties, dialect, and factory bootstrap',
    subtitle: 'Configure database connectivity and ORM behavior safely per environment.',
    why: [
      { title: 'Dialect matters', text: 'SQL generation differs by database vendor and version.' },
      { title: 'Environment control', text: 'Dev/test/prod should not share risky schema-generation settings.' },
      { title: 'Pooling + logging', text: 'Connection pool and SQL logging help diagnose runtime behavior.' }
    ],
    conceptLabel: 'Configuration bootstrap',
    ConceptDiagram: HibernateConfigurationBootstrapDiagram,
    coreTabLabel: 'Configuration bootstrap',
    mechanicsTabLabel: 'Property resolution',
    scenarioTabLabel: 'MySQL to PostgreSQL',
    pitfallsTabLabel: 'Config pitfalls',
    interviewTabLabel: 'Config interview angle',
    mechanicsTitle: 'Configuration resolution mechanics',
    mechanicsSteps: [
      { title: 'Read env profile', sub: 'dev/test/prod separation' },
      { title: 'Merge ORM properties', sub: 'dialect, ddl, batching, cache' },
      { title: 'Initialize datasource', sub: 'pool + JDBC credentials' },
      { title: 'Validate mappings', sub: 'metadata/schema compatibility' },
      { title: 'Expose factory', sub: 'application runtime bootstrap' }
    ],
    pitfallsSteps: [
      { title: 'Shared prod creds', sub: 'accidental local writes' },
      { title: 'hbm2ddl auto-update', sub: 'unsafe schema change risk' },
      { title: 'Missing pool tuning', sub: 'timeouts under concurrency' },
      { title: 'Verbose SQL in prod', sub: 'log cost and noise' }
    ],
    interviewSteps: [
      { title: 'Start with env isolation', sub: 'separate config per stage' },
      { title: 'Explain critical keys', sub: 'dialect, ddl, batching' },
      { title: 'Mention migration strategy', sub: 'Flyway/Liquibase with Hibernate' },
      { title: 'Share incident fix', sub: 'wrong dialect outage recovery' }
    ],
    MechanicsDiagram: HibernateConfigurationBootstrapDiagram,
    ScenarioDiagram: HibernateConfigurationBootstrapDiagram,
    PitfallsDiagram: HibernateConfigurationBootstrapDiagram,
    InterviewDiagram: HibernateConfigurationBootstrapDiagram,
    scenarioTitle: 'Scenario: switching MySQL dev to PostgreSQL staging',
    scenarioSteps: [
      { title: 'Change datasource URL', sub: 'env-specific config' },
      { title: 'Update dialect', sub: 'vendor SQL support' },
      { title: 'Validate mappings', sub: 'schema compatibility' },
      { title: 'Rebuild SessionFactory', sub: 'startup metadata' },
      { title: 'Smoke test CRUD', sub: 'check generated SQL' }
    ],
    scenarioCaption: 'Highlights the minimum safe changes during database vendor/environment transitions.'
  },
  'hibernate-session': {
    eyebrow: 'Hibernate · Session',
    title: 'Persistence context and entity states',
    subtitle: 'Understand transient, persistent, detached, and removed transitions.',
    why: [
      { title: 'Change tracking', text: 'Persistent entities are auto-detected for updates at flush/commit.' },
      { title: 'Memory control', text: 'Long sessions can grow large; clear/close strategically.' },
      { title: 'Detached pitfalls', text: 'Detached objects need merge/reload decisions before updates.' }
    ],
    conceptLabel: 'Entity lifecycle states',
    ConceptDiagram: HibernateSessionEntityStatesDiagram,
    coreTabLabel: 'Entity states',
    mechanicsTabLabel: 'State transitions',
    scenarioTabLabel: 'Cross-request edit',
    pitfallsTabLabel: 'Session pitfalls',
    interviewTabLabel: 'Session interview angle',
    mechanicsTitle: 'Persistence-context state mechanics',
    mechanicsSteps: [
      { title: 'Transient entity seen', sub: 'no session tracking yet' },
      { title: 'Persist attaches entity', sub: 'managed in context' },
      { title: 'Close detaches object', sub: 'tracking stops after request' },
      { title: 'Merge reattaches copy', sub: 'state synchronized again' },
      { title: 'Flush writes deltas', sub: 'dirty fields become SQL' }
    ],
    pitfallsSteps: [
      { title: 'Lazy on detached', sub: 'LazyInitializationException risk' },
      { title: 'Long-lived session', sub: 'memory bloat and stale data' },
      { title: 'Wrong merge usage', sub: 'duplicate graph confusion' },
      { title: 'Hidden auto-flush', sub: 'unexpected SQL before query' }
    ],
    interviewSteps: [
      { title: 'Define each state', sub: 'transient/persistent/detached/removed' },
      { title: 'Explain merge vs update', sub: 'reattachment behavior difference' },
      { title: 'Show web example', sub: 'entity crosses HTTP requests' },
      { title: 'Add prevention tip', sub: 'DTO boundary for views' }
    ],
    MechanicsDiagram: HibernateSessionEntityStatesDiagram,
    ScenarioDiagram: HibernateSessionEntityStatesDiagram,
    PitfallsDiagram: HibernateSessionEntityStatesDiagram,
    InterviewDiagram: HibernateSessionEntityStatesDiagram,
    scenarioTitle: 'Scenario: edit profile across requests',
    scenarioSteps: [
      { title: 'Request A load', sub: 'entity persistent' },
      { title: 'Session closes', sub: 'entity detached' },
      { title: 'User edits form', sub: 'outside session' },
      { title: 'Request B merge', sub: 're-attach state' },
      { title: 'Commit update', sub: 'flush to DB' }
    ],
    scenarioCaption: 'Common web pattern where entities cross request boundaries and reattachment matters.'
  },
  'hibernate-mapping': {
    eyebrow: 'Hibernate · Mapping',
    title: 'Map classes, ids, and relationships',
    subtitle: 'Annotations define how object fields and relations persist to tables.',
    why: [
      { title: 'Schema alignment', text: 'Mappings must match table/column constraints to avoid runtime failures.' },
      { title: 'Id strategy choices', text: 'Generation strategy impacts insert ordering and batching efficiency.' },
      { title: 'Relationship precision', text: 'Owning side, cascade, and fetch mode decisions affect correctness/perf.' }
    ],
    conceptLabel: 'Mapping strategies',
    ConceptDiagram: HibernateMappingStrategiesDiagram,
    coreTabLabel: 'Mapping strategies',
    mechanicsTabLabel: 'Relation mapping internals',
    scenarioTabLabel: 'Dept-Employee mapping',
    pitfallsTabLabel: 'Mapping pitfalls',
    interviewTabLabel: 'Mapping interview angle',
    mechanicsTitle: 'Annotation-to-schema mapping mechanics',
    mechanicsSteps: [
      { title: 'Parse annotations', sub: 'table/column/id relation metadata' },
      { title: 'Build association graph', sub: 'owning side + cascade rules' },
      { title: 'Choose key strategy', sub: 'identity/sequence/table decision' },
      { title: 'Generate join SQL', sub: 'foreign-key aware operations' },
      { title: 'Maintain graph sync', sub: 'bidirectional consistency updates' }
    ],
    pitfallsSteps: [
      { title: 'Wrong owning side', sub: 'missing join column updates' },
      { title: 'Over-cascade all', sub: 'accidental deep deletes' },
      { title: 'Eager everywhere', sub: 'heavy object graph loads' },
      { title: 'Equals/hashCode issue', sub: 'set/map relation corruption' }
    ],
    interviewSteps: [
      { title: 'Differentiate relation types', sub: '1-1,1-n,n-1,n-n choices' },
      { title: 'Explain owning side', sub: 'which side writes FK' },
      { title: 'Mention fetch strategy', sub: 'lazy default + join fetch' },
      { title: 'Give real bug fix', sub: 'cascade delete incident' }
    ],
    MechanicsDiagram: HibernateMappingStrategiesDiagram,
    ScenarioDiagram: HibernateMappingStrategiesDiagram,
    PitfallsDiagram: HibernateMappingStrategiesDiagram,
    InterviewDiagram: HibernateMappingStrategiesDiagram,
    scenarioTitle: 'Scenario: add Department-Employee relation',
    scenarioSteps: [
      { title: 'Define entities', sub: '@Entity classes' },
      { title: 'Add relation', sub: '@OneToMany/@ManyToOne' },
      { title: 'Set join column', sub: 'foreign key mapping' },
      { title: 'Persist graph', sub: 'cascade rules apply' },
      { title: 'Verify joins', sub: 'fetch and inspect SQL' }
    ],
    scenarioCaption: 'Shows how object graph modeling becomes relational constraints and join behavior.'
  },
  'hibernate-hql': {
    eyebrow: 'Hibernate · HQL',
    title: 'Query entities with HQL/JPQL',
    subtitle: 'Use object-oriented query syntax mapped to SQL by Hibernate.',
    why: [
      { title: 'Entity-centric', text: 'Queries target entity fields/relations instead of raw table names.' },
      { title: 'Parameter safety', text: 'Bound parameters reduce injection and improve plan reuse.' },
      { title: 'Projection options', text: 'Entity, scalar, and DTO projections trade convenience vs performance.' }
    ],
    conceptLabel: 'HQL execution path',
    ConceptDiagram: HibernateHqlExecutionDiagram,
    coreTabLabel: 'HQL path',
    mechanicsTabLabel: 'Query translation',
    scenarioTabLabel: 'Paginated search',
    pitfallsTabLabel: 'HQL pitfalls',
    interviewTabLabel: 'HQL interview angle',
    mechanicsTitle: 'HQL-to-SQL execution mechanics',
    mechanicsSteps: [
      { title: 'Parse HQL AST', sub: 'entity-field semantic analysis' },
      { title: 'Bind named params', sub: 'typed value substitution' },
      { title: 'Apply pagination', sub: 'offset/limit dialect conversion' },
      { title: 'Produce SQL', sub: 'table/join alias expansion' },
      { title: 'Hydrate results', sub: 'entity/DTO/scalar mapping' }
    ],
    pitfallsSteps: [
      { title: 'String concatenation', sub: 'injection and cache misses' },
      { title: 'Select * entities', sub: 'over-fetching unused columns' },
      { title: 'Missing indexes', sub: 'slow where/order execution' },
      { title: 'No pagination', sub: 'memory spikes on large result sets' }
    ],
    interviewSteps: [
      { title: 'Contrast HQL vs SQL', sub: 'entity model abstraction' },
      { title: 'Explain parameter binding', sub: 'safety + plan reuse' },
      { title: 'Discuss projection choice', sub: 'DTO vs entity performance' },
      { title: 'Show optimization example', sub: 'query tuning with index' }
    ],
    MechanicsDiagram: HibernateHqlExecutionDiagram,
    ScenarioDiagram: HibernateHqlExecutionDiagram,
    PitfallsDiagram: HibernateHqlExecutionDiagram,
    InterviewDiagram: HibernateHqlExecutionDiagram,
    scenarioTitle: 'Scenario: paginated student search',
    scenarioSteps: [
      { title: 'Build HQL', sub: 'where + order by' },
      { title: 'Bind params', sub: 'name, minMarks' },
      { title: 'Set pagination', sub: 'offset + limit' },
      { title: 'Execute list', sub: 'SQL generated' },
      { title: 'Render DTOs', sub: 'API/view response' }
    ],
    scenarioCaption: 'Typical read-path query design for search screens and list endpoints.'
  },
  'hibernate-relationships': {
    eyebrow: 'Hibernate · Relationships',
    title: 'Associations and fetch strategy',
    subtitle: 'Model object graphs while avoiding N+1 and accidental eager loads.',
    why: [
      { title: 'Lazy by default', text: 'Reduces initial load but can trigger extra SQL if not planned.' },
      { title: 'Join fetch tuning', text: 'Fetch joins and batch-size reduce query explosion.' },
      { title: 'Bidirectional care', text: 'Owning/inverse side consistency prevents stale in-memory graphs.' }
    ],
    conceptLabel: 'Fetch and N+1',
    ConceptDiagram: HibernateRelationshipsFetchDiagram,
    coreTabLabel: 'Fetch and N+1',
    mechanicsTabLabel: 'Fetch plan internals',
    scenarioTabLabel: 'Department listing',
    pitfallsTabLabel: 'Relation pitfalls',
    interviewTabLabel: 'Relations interview angle',
    mechanicsTitle: 'Association fetch mechanics',
    mechanicsSteps: [
      { title: 'Load root entities', sub: 'initial parent query execution' },
      { title: 'Access lazy child', sub: 'proxy triggers extra select' },
      { title: 'Detect N+1 pattern', sub: 'query count rapidly grows' },
      { title: 'Apply fetch join', sub: 'single optimized select path' },
      { title: 'Balance cartesian risk', sub: 'batch-size and pagination care' }
    ],
    pitfallsSteps: [
      { title: 'Blind lazy iteration', sub: 'hidden query explosion' },
      { title: 'Over-join fetch', sub: 'duplicate rows and memory bloat' },
      { title: 'Bidirectional unsynced', sub: 'stale in-memory relations' },
      { title: 'Pagination with join fetch', sub: 'incorrect page semantics' }
    ],
    interviewSteps: [
      { title: 'Define N+1 clearly', sub: '1 parent query + N child queries' },
      { title: 'List mitigations', sub: 'join fetch, batch, entity graph' },
      { title: 'Mention trade-off', sub: 'fewer queries vs bigger result' },
      { title: 'Share measured win', sub: 'query count and latency drop' }
    ],
    MechanicsDiagram: HibernateRelationshipsFetchDiagram,
    ScenarioDiagram: HibernateRelationshipsFetchDiagram,
    PitfallsDiagram: HibernateRelationshipsFetchDiagram,
    InterviewDiagram: HibernateRelationshipsFetchDiagram,
    scenarioTitle: 'Scenario: list departments with employee counts',
    scenarioSteps: [
      { title: 'Load departments', sub: 'parent list query' },
      { title: 'Iterate employees', sub: 'potential N+1 risk' },
      { title: 'Apply join fetch', sub: 'single optimized query' },
      { title: 'Aggregate in app', sub: 'count per department' },
      { title: 'Return response', sub: 'stable latency' }
    ],
    scenarioCaption: 'Real production optimization flow when list pages become slow under load.'
  },
  'hibernate-caching': {
    eyebrow: 'Hibernate · Caching',
    title: 'L1, L2, and query cache',
    subtitle: 'Understand cache boundaries and invalidation trade-offs.',
    why: [
      { title: 'L1 always-on', text: 'Session-scoped cache avoids duplicate loads within one unit of work.' },
      { title: 'L2 optional shared', text: 'Can reduce DB reads for stable reference entities.' },
      { title: 'Invalidation complexity', text: 'Cache consistency strategy must match write patterns.' }
    ],
    conceptLabel: 'Caching layers',
    ConceptDiagram: HibernateCachingLayersDiagram,
    coreTabLabel: 'Caching layers',
    mechanicsTabLabel: 'Cache lookup order',
    scenarioTabLabel: 'Catalog hot-reads',
    pitfallsTabLabel: 'Caching pitfalls',
    interviewTabLabel: 'Cache interview angle',
    mechanicsTitle: 'L1/L2/query cache mechanics',
    mechanicsSteps: [
      { title: 'Session L1 check', sub: 'fast context-local lookup' },
      { title: 'L2 region lookup', sub: 'shared cache provider access' },
      { title: 'DB fallback read', sub: 'cache miss data retrieval' },
      { title: 'Put into cache', sub: 'region invalidation strategy aware' },
      { title: 'Query cache keying', sub: 'result set + timestamp validation' }
    ],
    pitfallsSteps: [
      { title: 'Cache mutable entities', sub: 'stale read probability rises' },
      { title: 'No eviction policy', sub: 'memory pressure and churn' },
      { title: 'Ignore invalidation', sub: 'cross-node inconsistency' },
      { title: 'Enable query cache blindly', sub: 'overhead without gain' }
    ],
    interviewSteps: [
      { title: 'Differentiate cache levels', sub: 'scope and lifecycle contrast' },
      { title: 'Explain consistency mode', sub: 'read-only/read-write strategy' },
      { title: 'Give good use case', sub: 'reference data hot-read' },
      { title: 'Warn anti-pattern', sub: 'volatile transactional entities' }
    ],
    MechanicsDiagram: HibernateCachingLayersDiagram,
    ScenarioDiagram: HibernateCachingLayersDiagram,
    PitfallsDiagram: HibernateCachingLayersDiagram,
    InterviewDiagram: HibernateCachingLayersDiagram,
    scenarioTitle: 'Scenario: product catalog hot reads',
    scenarioSteps: [
      { title: 'Request hits service', sub: 'load Product by id' },
      { title: 'Check L1', sub: 'session cache miss' },
      { title: 'Check L2', sub: 'shared cache hit/miss' },
      { title: 'DB fallback', sub: 'if cache miss' },
      { title: 'Store/return', sub: 'reuse on next read' }
    ],
    scenarioCaption: 'Shows practical read optimization path and where stale data risk appears.'
  },
  'hibernate-locking': {
    eyebrow: 'Hibernate · Locking',
    title: 'Optimistic and pessimistic concurrency control',
    subtitle: 'Prevent lost updates and manage concurrent write conflicts.',
    why: [
      { title: 'Optimistic default', text: '@Version detects write conflicts without long DB locks.' },
      { title: 'Pessimistic option', text: 'Explicit locks help in high-contention critical sections.' },
      { title: 'Retry strategy', text: 'Conflict exceptions should be handled with user-safe retry flows.' }
    ],
    conceptLabel: 'Version-based optimistic locking',
    ConceptDiagram: HibernateLockingVersionDiagram,
    coreTabLabel: 'Optimistic locking',
    mechanicsTabLabel: 'Conflict detection',
    scenarioTabLabel: 'Dual admin edit',
    pitfallsTabLabel: 'Locking pitfalls',
    interviewTabLabel: 'Locking interview angle',
    mechanicsTitle: 'Optimistic/pessimistic lock mechanics',
    mechanicsSteps: [
      { title: 'Read versioned row', sub: 'snapshot version captured' },
      { title: 'Prepare update statement', sub: 'where id and version match' },
      { title: 'Execute conditional update', sub: 'affected rows decides success' },
      { title: 'Conflict exception raised', sub: 'stale write prevented' },
      { title: 'Retry or resolve', sub: 'refresh + user conflict handling' }
    ],
    pitfallsSteps: [
      { title: 'No @Version field', sub: 'lost updates remain invisible' },
      { title: 'Infinite retry loop', sub: 'user and DB thrashing' },
      { title: 'Pessimistic overuse', sub: 'lock contention bottlenecks' },
      { title: 'Missing UX handling', sub: 'confusing overwrite behavior' }
    ],
    interviewSteps: [
      { title: 'Explain lost-update problem', sub: 'why version check matters' },
      { title: 'Compare lock strategies', sub: 'optimistic vs pessimistic costs' },
      { title: 'Describe retry policy', sub: 'bounded retries + conflict message' },
      { title: 'Show real case', sub: 'admin panel concurrent edits' }
    ],
    MechanicsDiagram: HibernateLockingVersionDiagram,
    ScenarioDiagram: HibernateLockingVersionDiagram,
    PitfallsDiagram: HibernateLockingVersionDiagram,
    InterviewDiagram: HibernateLockingVersionDiagram,
    scenarioTitle: 'Scenario: two admins edit same record',
    scenarioSteps: [
      { title: 'Both load row', sub: 'version=3' },
      { title: 'Admin A saves', sub: 'version -> 4' },
      { title: 'Admin B saves', sub: 'stale version' },
      { title: 'Exception thrown', sub: 'conflict detected' },
      { title: 'Retry/refresh UI', sub: 'resolve collision' }
    ],
    scenarioCaption: 'Real concurrency conflict path and expected user-facing recovery behavior.'
  },
  'hibernate-batch-processing': {
    eyebrow: 'Hibernate · Batch processing',
    title: 'High-volume inserts/updates efficiently',
    subtitle: 'Use chunking, flush/clear, and JDBC batching to control memory and throughput.',
    why: [
      { title: 'Throughput', text: 'Batched statements reduce round-trips and driver overhead.' },
      { title: 'Memory safety', text: 'Periodic clear prevents persistence context from exploding.' },
      { title: 'Operational reliability', text: 'Chunk commits limit rollback scope on partial failures.' }
    ],
    conceptLabel: 'Batch flow',
    ConceptDiagram: HibernateBatchProcessingFlowDiagram,
    coreTabLabel: 'Batch flow',
    mechanicsTabLabel: 'Batch internals',
    scenarioTabLabel: 'Nightly import',
    pitfallsTabLabel: 'Batch pitfalls',
    interviewTabLabel: 'Batch interview angle',
    mechanicsTitle: 'High-volume batch mechanics',
    mechanicsSteps: [
      { title: 'Accumulate statements', sub: 'batch_size grouped execution' },
      { title: 'Periodic flush', sub: 'send SQL chunk to DB' },
      { title: 'Periodic clear', sub: 'release persistence-context memory' },
      { title: 'Chunk transaction commit', sub: 'checkpoint progress safely' },
      { title: 'Resume on failure', sub: 'idempotent restart from cursor' }
    ],
    pitfallsSteps: [
      { title: 'No flush/clear cycle', sub: 'OOM in long imports' },
      { title: 'Huge single transaction', sub: 'rollback blast radius massive' },
      { title: 'Identity key strategy', sub: 'batch insert optimization reduced' },
      { title: 'No retry partitioning', sub: 'one bad row blocks pipeline' }
    ],
    interviewSteps: [
      { title: 'Start with throughput goal', sub: 'why batching was needed' },
      { title: 'Explain memory control', sub: 'flush/clear discipline' },
      { title: 'Discuss failure strategy', sub: 'chunk checkpoint resume model' },
      { title: 'Quantify impact', sub: 'time and memory improvement' }
    ],
    MechanicsDiagram: HibernateBatchProcessingFlowDiagram,
    ScenarioDiagram: HibernateBatchProcessingFlowDiagram,
    PitfallsDiagram: HibernateBatchProcessingFlowDiagram,
    InterviewDiagram: HibernateBatchProcessingFlowDiagram,
    scenarioTitle: 'Scenario: nightly import of 500k rows',
    scenarioSteps: [
      { title: 'Read chunk', sub: '5k source rows' },
      { title: 'Persist loop', sub: 'entity conversion' },
      { title: 'Flush/clear', sub: 'every batch size' },
      { title: 'Commit chunk', sub: 'checkpoint progress' },
      { title: 'Continue next chunk', sub: 'resume safely' }
    ],
    scenarioCaption: 'Production ingestion pattern balancing speed, memory usage, and failure recovery.'
  },
  'hibernate-mcq': {
    eyebrow: 'Hibernate · MCQ',
    title: 'Revision map for exam practice',
    subtitle: 'Cover architecture, session states, mappings, queries, and tuning in sequence.',
    why: [
      { title: 'Core first', text: 'SessionFactory/Session/Transaction basics appear in many questions.' },
      { title: 'Pitfalls', text: 'N+1, lazy loading, and caching boundaries are frequent traps.' },
      { title: 'Concurrency', text: '@Version locking questions test real-world understanding.' }
    ],
    conceptLabel: 'Hibernate revision roadmap',
    ConceptDiagram: HibernateArchitectureLayersDiagram,
    coreTabLabel: 'Revision roadmap',
    mechanicsTabLabel: 'Question solving flow',
    scenarioTabLabel: 'Last-day revision',
    pitfallsTabLabel: 'MCQ traps',
    interviewTabLabel: 'Answer strategy',
    mechanicsTitle: 'MCQ reasoning mechanics for Hibernate',
    mechanicsSteps: [
      { title: 'Identify chapter cue', sub: 'session/mapping/query/cache clue' },
      { title: 'Map runtime behavior', sub: 'what SQL/state actually happens' },
      { title: 'Eliminate wrong options', sub: 'spot absolute/invalid claims' },
      { title: 'Pick trade-off aware option', sub: 'correct but contextual answer' },
      { title: 'Cross-check terminology', sub: 'entity state and tx boundary' }
    ],
    pitfallsSteps: [
      { title: 'Memorize without flow', sub: 'confusion in scenario questions' },
      { title: 'Ignore keyword traps', sub: 'always/never style distractors' },
      { title: 'Skip concurrency topics', sub: 'frequent high-weight errors' },
      { title: 'No timed practice', sub: 'low completion under exam pressure' }
    ],
    interviewSteps: [
      { title: 'Convert MCQ to explanation', sub: 'why option is correct' },
      { title: 'Use one runtime example', sub: 'entity -> SQL transition' },
      { title: 'Highlight common trap', sub: 'N+1 or detached misuse' },
      { title: 'Close with metric', sub: 'proof-oriented technical clarity' }
    ],
    MechanicsDiagram: HibernateArchitectureLayersDiagram,
    ScenarioDiagram: HibernateArchitectureLayersDiagram,
    PitfallsDiagram: HibernateArchitectureLayersDiagram,
    InterviewDiagram: HibernateArchitectureLayersDiagram,
    scenarioTitle: 'Scenario: last-day revision sequence',
    scenarioSteps: [
      { title: 'Architecture', sub: 'components + flow' },
      { title: 'Session states', sub: 'entity lifecycle' },
      { title: 'Mappings', sub: 'ids/relations' },
      { title: 'HQL + cache', sub: 'query tuning' },
      { title: 'Locking + batch', sub: 'advanced edge cases' }
    ],
    scenarioCaption: 'Fast revision checklist aligned with commonly tested Hibernate concepts.'
  },
  'hibernate-interview-questions': {
    eyebrow: 'Hibernate · Interview prep',
    title: 'Interview discussion map',
    subtitle: 'Frame practical answers around architecture, performance, and consistency.',
    why: [
      { title: 'Explain with flow', text: 'Interviewers value runtime mental models over memorized definitions.' },
      { title: 'Performance stories', text: 'Have concrete N+1, cache, or batching examples ready.' },
      { title: 'Failure handling', text: 'Discuss locking conflicts, stale state, and transaction boundaries clearly.' }
    ],
    conceptLabel: 'Interview mental model',
    ConceptDiagram: HibernateArchitectureLayersDiagram,
    coreTabLabel: 'Interview model',
    mechanicsTabLabel: 'Answer structure',
    scenarioTabLabel: 'Slowness fix story',
    pitfallsTabLabel: 'Interview mistakes',
    interviewTabLabel: 'Senior framing',
    mechanicsTitle: 'Interview answer mechanics for Hibernate',
    mechanicsSteps: [
      { title: 'State problem context', sub: 'load, data size, symptom' },
      { title: 'Walk runtime flow', sub: 'session/query/cache/tx path' },
      { title: 'Explain decision', sub: 'chosen optimization and trade-offs' },
      { title: 'Show validation', sub: 'query count/latency before after' },
      { title: 'Mention guardrails', sub: 'tests/alerts to prevent regressions' }
    ],
    pitfallsSteps: [
      { title: 'Only theory answers', sub: 'no production credibility' },
      { title: 'No trade-off mention', sub: 'design maturity looks weak' },
      { title: 'Skip failure handling', sub: 'optimistic story sounds incomplete' },
      { title: 'No metric evidence', sub: 'impact cannot be trusted' }
    ],
    interviewSteps: [
      { title: 'Use STAR-like flow', sub: 'situation-task-action-result concise' },
      { title: 'Show one SQL insight', sub: 'query behavior understanding' },
      { title: 'Mention one risk', sub: 'consistency/performance compromise' },
      { title: 'End with measurable result', sub: 'p95/query-count improvement' }
    ],
    MechanicsDiagram: HibernateArchitectureLayersDiagram,
    ScenarioDiagram: HibernateArchitectureLayersDiagram,
    PitfallsDiagram: HibernateArchitectureLayersDiagram,
    InterviewDiagram: HibernateArchitectureLayersDiagram,
    scenarioTitle: 'Scenario: answer “How did you fix Hibernate slowness?”',
    scenarioSteps: [
      { title: 'Detect issue', sub: 'SQL logs + profiling' },
      { title: 'Find pattern', sub: 'N+1 / chatty writes' },
      { title: 'Apply fix', sub: 'join fetch / batch / cache' },
      { title: 'Measure again', sub: 'latency + query count' },
      { title: 'Explain trade-offs', sub: 'consistency vs speed' }
    ],
    scenarioCaption: 'A structured answer pattern that sounds practical and senior in interviews.',
    callout: {
      title: 'Interview tip',
      body: 'Mention both the symptom and the verification metric (query count, p95 latency, memory) after your fix.'
    }
  }
};

export default function HibernateTopicRuntimeShowcase({ topicId }) {
  const cfg = CONFIG[topicId];
  if (!cfg) return null;
  const [tab, setTab] = useState('core');
  const compact = (text, max = 22) => {
    if (!text) return '';
    const t = text.replace(/^Scenario:\s*/i, '').trim();
    return t.length > max ? `${t.slice(0, max - 1)}…` : t;
  };
  const depthTabs = [
    ['core', compact(cfg.coreTabLabel || cfg.conceptLabel || cfg.title || 'Concept')],
    ['mechanics', compact(cfg.mechanicsTabLabel || cfg.mechanicsTitle || 'Runtime mechanics')],
    ['scenario', compact(cfg.scenarioTabLabel || cfg.scenarioTitle || 'Scenario')],
    ['pitfalls', compact(cfg.pitfallsTabLabel || `${cfg.title} pitfalls`)],
    ['interview', compact(cfg.interviewTabLabel || `${cfg.title} interview`)]
  ];
  const coreTitle = cfg.coreTitle ?? `${cfg.title} — core concept`;
  const mechanicsTitle = cfg.mechanicsTitle ?? `${cfg.title} — runtime mechanics`;
  const MechanicsDiagram = HIBERNATE_MECHANICS_DIAGRAMS[topicId] ?? DeepRuntimeFlowDiagram;
  const ScenarioDiagram = HIBERNATE_SCENARIO_DIAGRAMS[topicId] ?? ScenarioPathFlowDiagram;
  const PitfallsDiagram = HIBERNATE_PITFALLS_DIAGRAMS[topicId] ?? PitfallsFlowDiagram;
  const InterviewDiagram = HIBERNATE_INTERVIEW_DIAGRAMS[topicId] ?? InterviewAnswerMapDiagram;
  const coreCaption = cfg.coreCaption ?? cfg.subtitle;
  const mechanicsCaption =
    cfg.mechanicsCaption ??
    'This tab explains what happens internally between your ORM call and SQL execution, so the concept depth is clear.';
  const mechanicsSteps = cfg.mechanicsSteps ?? [
    { title: 'Read metadata', sub: 'entity + mapping model' },
    { title: 'Plan operation', sub: 'insert/update/query intent' },
    { title: 'Generate SQL', sub: 'dialect-aware statements' },
    { title: 'Bind + execute', sub: 'JDBC interaction' },
    { title: 'Sync context', sub: 'flush/dirty-check lifecycle' }
  ];
  const pitfallsSteps = cfg.pitfallsSteps ?? [
    { title: 'Wrong defaults', sub: 'unchecked config/annotations' },
    { title: 'Hidden SQL cost', sub: 'lazy/N+1 not observed' },
    { title: 'Weak boundaries', sub: 'session/transaction misuse' },
    { title: 'No measurement', sub: 'optimize without metrics' }
  ];
  const interviewSteps = cfg.interviewSteps ?? [
    { title: 'Explain flow', sub: 'entity -> session -> SQL' },
    { title: 'Mention trade-off', sub: 'speed vs consistency' },
    { title: 'Share real fix', sub: 'N+1/cache/batch case' },
    { title: 'Prove result', sub: 'query count / latency' }
  ];
  const pitfallsTitle = cfg.pitfallsTitle ?? `${cfg.title} — common pitfalls`;
  const interviewTitle = cfg.interviewTitle ?? `${cfg.title} — interview framing`;
  const pitfallsCaption =
    cfg.pitfallsCaption ?? 'Use this checklist to avoid the most common production mistakes in this chapter.';
  const interviewCaption =
    cfg.interviewCaption ?? 'Use this structure to answer interview questions with practical depth.';

  return (
    <div className="hibernate-showcase">
      <HibernateHero eyebrow={cfg.eyebrow} title={cfg.title} subtitle={cfg.subtitle} />
      <HibernateWhyGrid items={cfg.why} />

      <div className="hibernate-tabs">
        {depthTabs.map(([id, label]) => (
          <button key={id} type="button" className={`hibernate-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>

      <div className="hibernate-panel">
        {tab === 'core' && (
          <>
            <HibernateDiagramFrame label={cfg.conceptLabel || coreTitle}>
              <cfg.ConceptDiagram />
            </HibernateDiagramFrame>
            <p className="hibernate-caption">{coreCaption}</p>
          </>
        )}
        {tab === 'mechanics' && (
          <>
            <HibernateDiagramFrame label="Runtime mechanics">
              <MechanicsDiagram title={mechanicsTitle} subtitle="Internal runtime sequence" steps={mechanicsSteps} />
            </HibernateDiagramFrame>
            <p className="hibernate-caption">{mechanicsCaption}</p>
          </>
        )}
        {tab === 'scenario' && (
          <>
            <HibernateDiagramFrame label="Real-world scenario flow">
              <ScenarioDiagram title={cfg.scenarioTitle} subtitle="End-to-end request path" steps={cfg.scenarioSteps} />
            </HibernateDiagramFrame>
            <p className="hibernate-caption">{cfg.scenarioCaption}</p>
          </>
        )}
        {tab === 'pitfalls' && (
          <>
            <HibernateDiagramFrame label="Common mistakes and prevention">
              <PitfallsDiagram title={pitfallsTitle} subtitle="Failure patterns you should catch early" steps={pitfallsSteps} />
            </HibernateDiagramFrame>
            <p className="hibernate-caption">{pitfallsCaption}</p>
          </>
        )}
        {tab === 'interview' && (
          <>
            <HibernateDiagramFrame label="Interview-ready explanation pattern">
              <InterviewDiagram
                title={interviewTitle}
                subtitle="How to explain this topic clearly in interviews"
                steps={interviewSteps}
              />
            </HibernateDiagramFrame>
            <p className="hibernate-caption">{interviewCaption}</p>
          </>
        )}
        {cfg.callout && (
          <HibernateCallout variant="tip" title={cfg.callout.title}>
            {cfg.callout.body}
          </HibernateCallout>
        )}
      </div>
    </div>
  );
}
