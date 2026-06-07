import { CheckCircle2, Clock3, Database, ListFilter, ShieldCheck, Workflow } from 'lucide-react';

function MiniFlow({ title, subtitle, steps, tone = 'blue' }) {
  return (
    <div className={`java8-mini-showcase java8-mini-showcase--${tone}`}>
      <div className="java8-mini-header">
        <Workflow size={20} />
        <div>
          <strong>{title}</strong>
          <span>{subtitle}</span>
        </div>
      </div>
      <div className="java8-mini-flow" aria-label={title}>
        {steps.map((step, index) => (
          <div className="java8-mini-step" key={step.title}>
            <span className="java8-mini-index">{index + 1}</span>
            <strong>{step.title}</strong>
            <small>{step.detail}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Java8FunctionalInterfacesShowcase() {
  return (
    <MiniFlow
      title="Realtime rule engine with functional interfaces"
      subtitle="Freshers meet Predicate, Function, Consumer, Supplier, and BiFunction inside validation and mapping tasks."
      tone="green"
      steps={[
        { title: 'Predicate', detail: 'is salary valid?' },
        { title: 'Function', detail: 'employee to DTO' },
        { title: 'Consumer', detail: 'log audit line' },
        { title: 'Supplier', detail: 'default status' },
        { title: 'BiFunction', detail: 'salary + bonus' }
      ]}
    />
  );
}

export function Java8StreamAPIShowcase() {
  return (
    <div className="java8-mini-showcase java8-mini-showcase--purple">
      <div className="java8-mini-header">
        <ListFilter size={20} />
        <div>
          <strong>Stream API as a backend report pipeline</strong>
          <span>Read stream code like SQL: source, conditions, transformations, final result.</span>
        </div>
      </div>
      <div className="java8-sql-compare">
        <div>
          <span>SQL thinking</span>
          <code>WHERE salary &gt; 50000</code>
          <code>GROUP BY department</code>
        </div>
        <div>
          <span>Java 8 thinking</span>
          <code>.filter(e -&gt; e.getSalary() &gt; 50000)</code>
          <code>.collect(groupingBy(Employee::getDepartment))</code>
        </div>
      </div>
    </div>
  );
}

export function Java8OptionalShowcase() {
  return (
    <MiniFlow
      title="Null-safe repository response"
      subtitle="Optional is useful when a database lookup may return no record."
      tone="orange"
      steps={[
        { title: 'Repository', detail: 'find by id' },
        { title: 'Optional', detail: 'value or empty' },
        { title: 'map', detail: 'convert to DTO' },
        { title: 'orElseThrow', detail: 'controlled error' }
      ]}
    />
  );
}

export function Java8DateTimeShowcase() {
  return (
    <div className="java8-mini-showcase java8-mini-showcase--cyan">
      <div className="java8-mini-header">
        <Clock3 size={20} />
        <div>
          <strong>Date and time in real applications</strong>
          <span>Use java.time for joining dates, invoice dates, expiry dates, and timezone display.</span>
        </div>
      </div>
      <div className="java8-date-cards">
        <div><Database size={18} /><strong>DB value</strong><span>2026-06-06</span></div>
        <div><CheckCircle2 size={18} /><strong>Java object</strong><span>LocalDate</span></div>
        <div><ShieldCheck size={18} /><strong>API output</strong><span>06-Jun-2026</span></div>
      </div>
    </div>
  );
}
