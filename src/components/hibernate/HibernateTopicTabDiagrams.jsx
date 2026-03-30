import React from 'react';

const CLUSTER = {
  intro: { yShift: 0, rx: 11 },
  config: { yShift: 6, rx: 14 },
  runtime: { yShift: -4, rx: 10 },
  perf: { yShift: 10, rx: 16 },
  interview: { yShift: -8, rx: 18 }
};

function StepText({ x, y, step }) {
  return (
    <>
      <text x={x} y={y} fontSize="11.5" fontWeight="700" fill="#1f2a44">{step.title}</text>
      <text x={x} y={y + 18} fontSize="10.7" fill="#4a5772">{step.sub}</text>
    </>
  );
}

function MechanicsLayout({ title, subtitle, steps, accent, soft, cluster }) {
  const c = CLUSTER[cluster] || CLUSTER.runtime;
  const points = [
    [38, 70 + c.yShift], [236, 70 + c.yShift], [434, 70 + c.yShift], [632, 70 + c.yShift],
    [38, 198 - c.yShift], [236, 198 - c.yShift], [434, 198 - c.yShift], [632, 198 - c.yShift]
  ];
  return (
    <svg className="flowchart-pro flowchart-pro-hibernate" viewBox="0 0 806 290" role="img" aria-label={title}>
      <rect x="0" y="0" width="806" height="290" rx="16" fill="#fff" />
      <text x="26" y="24" fontSize="14.5" fontWeight="700" fill="#1f2a44">{title}</text>
      <text x="26" y="43" fontSize="11.2" fill="#5f6f8f">{subtitle}</text>
      <g fill="none" stroke={accent} strokeWidth="2" opacity="0.85">
        <path d="M196 102 L236 102 L236 102" />
        <path d="M394 102 L434 102" />
        <path d="M592 102 L632 102" />
        <path d="M196 222 L236 222" />
        <path d="M394 222 L434 222" />
        <path d="M592 222 L632 222" />
        <path d="M718 102 C758 102,758 222,718 222" />
      </g>
      {steps.map((step, i) => (
        <g key={`${step.title}-${i}`}>
          <rect x={points[i][0]} y={points[i][1]} width="136" height="56" rx={c.rx} fill={soft} stroke={accent} strokeWidth="1.7" />
          <StepText x={points[i][0] + 10} y={points[i][1] + 20} step={step} />
        </g>
      ))}
    </svg>
  );
}

function ScenarioLayout({ title, subtitle, steps, accent, soft, cluster }) {
  const c = CLUSTER[cluster] || CLUSTER.runtime;
  const ys = [74, 134, 194, 74, 134, 194, 74, 134].map((y) => y + c.yShift);
  const xs = [34, 122, 210, 330, 418, 506, 626, 714];
  return (
    <svg className="flowchart-pro flowchart-pro-hibernate" viewBox="0 0 806 290" role="img" aria-label={title}>
      <rect x="0" y="0" width="806" height="290" rx="16" fill="#fff" />
      <text x="26" y="24" fontSize="14.5" fontWeight="700" fill="#1f2a44">{title}</text>
      <text x="26" y="43" fontSize="11.2" fill="#5f6f8f">{subtitle}</text>
      <g fill="none" stroke={accent} strokeWidth="2" opacity="0.85">
        <path d="M100 102 L188 162 L308 102 L396 162 L484 222 L604 162 L692 102" />
      </g>
      {steps.map((step, i) => (
        <g key={`${step.title}-${i}`}>
          <circle cx={xs[i]} cy={ys[i]} r="24" fill={soft} stroke={accent} strokeWidth="1.8" />
          <text x={xs[i]} y={ys[i] + 4} fontSize="11" fontWeight="700" fill="#1f2a44" textAnchor="middle">{i + 1}</text>
          <text x={xs[i]} y={ys[i] + 40} fontSize="10.7" fontWeight="700" fill="#1f2a44" textAnchor="middle">{step.title}</text>
          <text x={xs[i]} y={ys[i] + 54} fontSize="10.2" fill="#4a5772" textAnchor="middle">{step.sub}</text>
        </g>
      ))}
    </svg>
  );
}

function PitfallsLayout({ title, subtitle, steps, accent, soft, cluster }) {
  const c = CLUSTER[cluster] || CLUSTER.runtime;
  return (
    <svg className="flowchart-pro flowchart-pro-hibernate" viewBox="0 0 806 290" role="img" aria-label={title}>
      <rect x="0" y="0" width="806" height="290" rx="16" fill="#fff" />
      <text x="26" y="24" fontSize="14.5" fontWeight="700" fill="#1f2a44">{title}</text>
      <text x="26" y="43" fontSize="11.2" fill="#5f6f8f">{subtitle}</text>
      <line x1="402" y1="56" x2="402" y2="272" stroke={accent} strokeWidth="2.2" opacity="0.8" />
      {steps.map((step, i) => {
        const left = i % 2 === 0;
        const row = Math.floor(i / 2);
        const x = left ? 32 : 418;
        const y = 66 + row * 52 + c.yShift;
        return (
          <g key={`${step.title}-${i}`}>
            <rect x={x} y={y} width="356" height="42" rx={left ? 10 : c.rx} fill={soft} stroke={accent} strokeWidth="1.7" />
            <StepText x={x + 10} y={y + 17} step={step} />
          </g>
        );
      })}
    </svg>
  );
}

function InterviewLayout({ title, subtitle, steps, accent, soft, cluster }) {
  const c = CLUSTER[cluster] || CLUSTER.runtime;
  const centers = [
    [150, 90 + c.yShift], [318, 90 + c.yShift], [486, 90 + c.yShift], [654, 90 + c.yShift],
    [150, 210 - c.yShift], [318, 210 - c.yShift], [486, 210 - c.yShift], [654, 210 - c.yShift]
  ];
  return (
    <svg className="flowchart-pro flowchart-pro-hibernate" viewBox="0 0 806 290" role="img" aria-label={title}>
      <rect x="0" y="0" width="806" height="290" rx="16" fill="#fff" />
      <text x="26" y="24" fontSize="14.5" fontWeight="700" fill="#1f2a44">{title}</text>
      <text x="26" y="43" fontSize="11.2" fill="#5f6f8f">{subtitle}</text>
      <circle cx="402" cy="150" r="40" fill={soft} stroke={accent} strokeWidth="2" />
      <text x="402" y="146" fontSize="12" textAnchor="middle" fontWeight="700" fill="#1f2a44">Answer</text>
      <text x="402" y="162" fontSize="10.3" textAnchor="middle" fill="#4a5772">Framing</text>
      {steps.map((step, i) => (
        <g key={`${step.title}-${i}`}>
          <line x1="402" y1="150" x2={centers[i][0]} y2={centers[i][1]} stroke={accent} strokeWidth="1.8" opacity="0.75" />
          <rect x={centers[i][0] - 72} y={centers[i][1] - 22} width="144" height="44" rx={c.rx} fill={soft} stroke={accent} strokeWidth="1.7" />
          <text x={centers[i][0]} y={centers[i][1] - 3} fontSize="10.8" fontWeight="700" fill="#1f2a44" textAnchor="middle">{step.title}</text>
          <text x={centers[i][0]} y={centers[i][1] + 12} fontSize="10.1" fill="#4a5772" textAnchor="middle">{step.sub}</text>
        </g>
      ))}
    </svg>
  );
}

function createTopicTabDiagram({ tabType, title, subtitle, steps, accent, soft, cluster }) {
  return function Diagram() {
    const props = { title, subtitle, steps, accent, soft, cluster };
    if (tabType === 'mechanics') return <MechanicsLayout {...props} />;
    if (tabType === 'scenario') return <ScenarioLayout {...props} />;
    if (tabType === 'pitfalls') return <PitfallsLayout {...props} />;
    return <InterviewLayout {...props} />;
  };
}

const TOPICS = {
  'hibernate-project-setup': {
    accent: '#5a67d8',
    soft: '#eff1ff',
    short: 'Project setup',
    mech: ['Load config', 'Build registry', 'Parse entities', 'Build SessionFactory', 'Open session', 'Start tx', 'Execute first SQL', 'Validate bootstrap'],
    scen: ['Create student module', 'Add dependencies', 'Define mappings', 'Wire datasource', 'Start app', 'Persist student', 'Commit tx', 'Verify row'],
    pit: ['Dependency clash', 'Wrong dialect', 'Factory recreated', 'DDL in prod', 'Credential leak', 'Pool mis-size', 'Missing health check', 'Startup failure'],
    intr: ['Explain bootstrap chain', 'Why factory singleton', 'Config by env', 'Common setup bug', 'How to debug', 'Performance baseline', 'Operational checklist', 'Result summary'],
    cluster: 'config'
  },
  'hibernate-introduction': {
    accent: '#7c3aed',
    soft: '#f4ecff',
    short: 'ORM intro',
    mech: ['Entity tracking', 'Dirty checking', 'Flush planning', 'SQL generation', 'JDBC execution', 'Result hydration', 'Context sync', 'Commit boundary'],
    scen: ['Create Student object', 'Persist call', 'Assign identifier', 'Track in session', 'Flush on commit', 'Insert generated', 'Entity synced', 'Response returned'],
    pit: ['Ignoring SQL output', 'Long transactions', 'Detached misuse', 'Lazy surprises', 'No indexing', 'N+1 hidden', 'Overfetching', 'Runtime slowdown'],
    intr: ['Define ORM clearly', 'Show runtime path', 'Trade-off discussion', 'N+1 example', 'Optimization action', 'Validation metric', 'Lessons learned', 'Interview close'],
    cluster: 'intro'
  },
  'hibernate-architecture': {
    accent: '#2563eb',
    soft: '#ebf2ff',
    short: 'Architecture',
    mech: ['SessionFactory role', 'Session scope', 'Tx demarcation', 'L1 cache lookup', 'SQL action queue', 'Flush execution', 'Commit/rollback', 'Detach lifecycle'],
    scen: ['Open request session', 'Load aggregate', 'Apply business change', 'Mark dirty state', 'Flush queued SQL', 'Commit transaction', 'Close session', 'Return result'],
    pit: ['Session leak', 'Tx overlap', 'Layer violation', 'Manual SQL drift', 'Cache confusion', 'Error swallow', 'Rollback miss', 'Data inconsistency'],
    intr: ['Component responsibilities', 'Flush timing reason', 'Rollback behavior', 'Scope decision', 'Debug strategy', 'Perf checkpoints', 'Architecture trade-offs', 'Clear conclusion'],
    cluster: 'runtime'
  },
  'hibernate-configuration': {
    accent: '#0d9488',
    soft: '#e8fffb',
    short: 'Configuration',
    mech: ['Read profile', 'Merge properties', 'Init datasource', 'Apply dialect', 'Build metadata', 'Validate schema', 'Enable tuning', 'Publish factory'],
    scen: ['Switch environment', 'Update url/user', 'Change dialect', 'Run validation', 'Smoke CRUD', 'Observe SQL', 'Fix mismatch', 'Deploy safely'],
    pit: ['Shared credentials', 'Unsafe ddl-auto', 'Bad pool config', 'Verbose prod logs', 'Missing timeout', 'Wrong timezone', 'Hidden override', 'Boot crash'],
    intr: ['Explain key properties', 'Env isolation pattern', 'Migration strategy', 'Failure rollback plan', 'Verification steps', 'Security posture', 'Ops readiness', 'Interview wrap'],
    cluster: 'config'
  },
  'hibernate-session': {
    accent: '#9333ea',
    soft: '#f8ecff',
    short: 'Session states',
    mech: ['Transient start', 'Persistent attach', 'Auto dirty-check', 'Flush sync', 'Detach on close', 'Merge reattach', 'Refresh snapshot', 'Final state'],
    scen: ['Load profile A', 'Session closes', 'User edits DTO', 'Request B starts', 'Merge entity', 'Conflict check', 'Commit update', 'Return latest view'],
    pit: ['Lazy init error', 'Session too long', 'Merge confusion', 'Stale data use', 'Memory growth', 'Unexpected flush', 'Cascade surprise', 'Incorrect save'],
    intr: ['State definitions', 'Merge vs update', 'Web request model', 'Detach handling', 'DTO boundary reason', 'Failure example', 'Fix approach', 'Final answer'],
    cluster: 'runtime'
  },
  'hibernate-mapping': {
    accent: '#0284c7',
    soft: '#e8f7ff',
    short: 'Mappings',
    mech: ['Read annotations', 'Resolve table map', 'Plan id strategy', 'Build relation graph', 'Generate FK SQL', 'Cascade rules', 'Fetch defaults', 'Persist graph'],
    scen: ['Create Dept entity', 'Add Employee entity', 'Set relations', 'Choose owning side', 'Persist parent', 'Cascade children', 'Verify joins', 'Read back graph'],
    pit: ['Wrong owning side', 'Over-cascade', 'Eager by default', 'Bidirectional mismatch', 'Bad equals/hash', 'Join column miss', 'Orphan leak', 'Delete accident'],
    intr: ['Relation type choice', 'Owning side write path', 'Cascade/fetch trade-off', 'Schema alignment', 'Common bug story', 'Performance guard', 'Testing approach', 'Interview summary'],
    cluster: 'runtime'
  },
  'hibernate-hql': {
    accent: '#7c2d12',
    soft: '#fff1ea',
    short: 'HQL',
    mech: ['Parse HQL', 'Validate fields', 'Bind parameters', 'Apply pagination', 'Generate SQL', 'Execute query', 'Hydrate DTO/entity', 'Return results'],
    scen: ['Search screen input', 'Build HQL where', 'Bind filters', 'Sort + paginate', 'Run query', 'Collect page rows', 'Map to DTO', 'Send response'],
    pit: ['String concat query', 'No bind params', 'No pagination', 'Bad projection', 'Missing index', 'Cartesian join', 'Over-select fields', 'Slow endpoint'],
    intr: ['HQL vs SQL', 'Binding benefits', 'DTO projection reason', 'Pagination behavior', 'Tuning method', 'Metrics proof', 'Edge case mention', 'Answer close'],
    cluster: 'runtime'
  },
  'hibernate-relationships': {
    accent: '#c2410c',
    soft: '#fff4ea',
    short: 'Relationships',
    mech: ['Load parent list', 'Access lazy child', 'Trigger extra selects', 'Detect N+1', 'Apply join fetch', 'Batch fetch tune', 'Validate result size', 'Stabilize latency'],
    scen: ['Query departments', 'Iterate employees', 'Observe query spike', 'Refactor fetch plan', 'Re-run request', 'Count employees', 'Return compact payload', 'Confirm faster page'],
    pit: ['N+1 unchecked', 'Over-join fetch', 'Pagination conflict', 'Unsynced graph', 'Circular JSON risk', 'Huge payload', 'Memory pressure', 'Timeout increase'],
    intr: ['Define N+1 simply', 'Mitigation options', 'Trade-off mention', 'Join fetch caveat', 'Batch-size rationale', 'Measured improvement', 'Production incident', 'Interview finish'],
    cluster: 'runtime'
  },
  'hibernate-caching': {
    accent: '#047857',
    soft: '#eafcf6',
    short: 'Caching',
    mech: ['Check L1 cache', 'Check L2 region', 'Fallback to DB', 'Populate cache', 'Track timestamps', 'Invalidate stale keys', 'Serve hot reads', 'Monitor hit ratio'],
    scen: ['Product read request', 'L1 miss occurs', 'L2 hit path', 'Return cached entity', 'Price update arrives', 'Invalidate region', 'Next read from DB', 'Cache warms again'],
    pit: ['Cache volatile data', 'No eviction policy', 'Weak invalidation', 'Query cache misuse', 'Memory bloat', 'Cross-node stale reads', 'Hit ratio ignored', 'Wrong region design'],
    intr: ['L1 vs L2 scope', 'Consistency modes', 'Good use cases', 'Bad use cases', 'Invalidation strategy', 'Monitoring KPIs', 'Real optimization case', 'Interview closure'],
    cluster: 'perf'
  },
  'hibernate-locking': {
    accent: '#be185d',
    soft: '#ffeaf3',
    short: 'Locking',
    mech: ['Read version row', 'Capture snapshot', 'Prepare conditional update', 'Execute with version check', 'Detect zero-row update', 'Raise conflict', 'Retry/refresh path', 'Resolve write safely'],
    scen: ['Admin A edits', 'Admin B edits', 'A commits first', 'Version increments', 'B commit fails', 'Conflict surfaced', 'Refresh latest state', 'User retries change'],
    pit: ['Missing @Version', 'Blind overwrite', 'Infinite retry loop', 'Pessimistic over-lock', 'Deadlock risk', 'No UX conflict message', 'Lost audit trail', 'Inconsistent writes'],
    intr: ['Lost update explanation', 'Optimistic vs pessimistic', 'Conflict handling', 'Retry policy', 'User experience strategy', 'Metrics to watch', 'Real collision example', 'Final framing'],
    cluster: 'runtime'
  },
  'hibernate-batch-processing': {
    accent: '#475569',
    soft: '#eef2f6',
    short: 'Batch processing',
    mech: ['Read chunk source', 'Transform records', 'Persist in loop', 'Flush batch', 'Clear context', 'Commit chunk', 'Checkpoint progress', 'Resume on failure'],
    scen: ['Night job starts', 'Load 5k rows', 'Map to entities', 'Persist batch', 'Flush + clear', 'Commit checkpoint', 'Next chunk continues', 'Import completes'],
    pit: ['No chunking', 'Huge single tx', 'No clear cycle', 'Identity key bottleneck', 'Bad retry granularity', 'Partial commit confusion', 'OOM risk', 'Long rollback'],
    intr: ['Throughput objective', 'Batch-size reasoning', 'Memory controls', 'Failure recovery', 'Idempotent restart', 'DB tuning notes', 'Measured gains', 'Answer finish'],
    cluster: 'perf'
  },
  'hibernate-mcq': {
    accent: '#4338ca',
    soft: '#eff0ff',
    short: 'MCQ prep',
    mech: ['Read question cue', 'Map to chapter concept', 'Simulate runtime flow', 'Eliminate wrong options', 'Validate terminology', 'Check trade-off', 'Pick best answer', 'Review rationale'],
    scen: ['Start revision sprint', 'Solve architecture set', 'Practice session states', 'Tackle mapping traps', 'Attempt HQL set', 'Cover caching/locking', 'Timed mock test', 'Analyze weak areas'],
    pit: ['Only memorizing facts', 'Ignoring runtime flow', 'Falling for absolutes', 'Skipping edge cases', 'No timed drills', 'Weak elimination logic', 'No revision notes', 'Exam stress miss'],
    intr: ['Explain why option right', 'Connect to real runtime', 'Mention common trap', 'Provide correction', 'Add practical example', 'State metric mindset', 'Concise articulation', 'Strong close'],
    cluster: 'intro'
  },
  'hibernate-interview-questions': {
    accent: '#6d28d9',
    soft: '#f3edff',
    short: 'Interview prep',
    mech: ['State business context', 'Describe runtime path', 'Identify bottleneck', 'Explain solution choice', 'Apply optimization', 'Measure before/after', 'Add guardrails', 'Share outcome'],
    scen: ['Interviewer asks slowness', 'Describe symptom', 'Show SQL trace finding', 'Fix N+1/cache/batch', 'Re-test endpoint', 'Present metrics', 'Discuss trade-off', 'Conclude confidently'],
    pit: ['Theory-only answers', 'No metrics evidence', 'No trade-off clarity', 'Missing failure story', 'Ignoring consistency risk', 'Over-claiming impact', 'Unclear sequence', 'Weak confidence'],
    intr: ['Use structured narrative', 'Anchor in incident', 'Show technical depth', 'Mention operational view', 'Highlight decision logic', 'Quantify impact', 'Reflect lessons learned', 'Senior-level ending'],
    cluster: 'interview'
  }
};

function toSteps(labels) {
  return labels.map((label) => {
    const [title, ...rest] = label.split(' ');
    return { title, sub: rest.join(' ') };
  });
}

export const HIBERNATE_MECHANICS_DIAGRAMS = Object.fromEntries(
  Object.entries(TOPICS).map(([topicId, t]) => [
    topicId,
    createTopicTabDiagram({
      tabType: 'mechanics',
      title: `${t.short} mechanics`,
      subtitle: `Internal Hibernate runtime path for ${t.short.toLowerCase()}`,
      accent: t.accent,
      soft: t.soft,
      steps: toSteps(t.mech),
      cluster: t.cluster
    })
  ])
);

export const HIBERNATE_SCENARIO_DIAGRAMS = Object.fromEntries(
  Object.entries(TOPICS).map(([topicId, t]) => [
    topicId,
    createTopicTabDiagram({
      tabType: 'scenario',
      title: `${t.short} scenario flow`,
      subtitle: `Applied chapter scenario for ${t.short.toLowerCase()}`,
      accent: t.accent,
      soft: t.soft,
      steps: toSteps(t.scen),
      cluster: t.cluster
    })
  ])
);

export const HIBERNATE_PITFALLS_DIAGRAMS = Object.fromEntries(
  Object.entries(TOPICS).map(([topicId, t]) => [
    topicId,
    createTopicTabDiagram({
      tabType: 'pitfalls',
      title: `${t.short} pitfalls`,
      subtitle: `Failure paths and prevention checkpoints for ${t.short.toLowerCase()}`,
      accent: t.accent,
      soft: t.soft,
      steps: toSteps(t.pit),
      cluster: t.cluster
    })
  ])
);

export const HIBERNATE_INTERVIEW_DIAGRAMS = Object.fromEntries(
  Object.entries(TOPICS).map(([topicId, t]) => [
    topicId,
    createTopicTabDiagram({
      tabType: 'interview',
      title: `${t.short} interview framing`,
      subtitle: `Answer map for explaining ${t.short.toLowerCase()} in interviews`,
      accent: t.accent,
      soft: t.soft,
      steps: toSteps(t.intr),
      cluster: t.cluster
    })
  ])
);

