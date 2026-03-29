import { useState } from 'react';
import { ControlFlowHero, ControlFlowWhyGrid, CfDiagramFrame, CfCallout } from './controlflow/ControlFlowBlocks';
import { SwitchRoutingDiagram, HorizontalPipeline } from './flow/ProfessionalDiagrams';

const TABS = [
  ['route', 'Routing'],
  ['classic', 'Classic switch'],
  ['modern', 'Switch expression'],
  ['usage', 'When to choose']
];

const WHY = [
  {
    title: 'One value, many roads',
    text: 'When a single variable (day number, menu choice, status code) decides what to do, switch keeps every branch visible at a glance.'
  },
  {
    title: 'Compare to long else-if',
    text: 'Repeatedly comparing the same expression to constants is noisy. switch makes “route by this value” the headline of your code.'
  },
  {
    title: 'Modern Java options',
    text: 'Classic switch with break; modern switch expressions (Java 14+) can return values safely—great once you learn the basics.'
  }
];

export default function SwitchStatementShowcase() {
  const [tab, setTab] = useState('route');
  return (
    <div className="cf-showcase cf-switch-showcase">
      <ControlFlowHero
        eyebrow="Multi-way branch"
        title="Switch"
        subtitle="Route execution based on one expression: int, short, byte, char, String, or enum. One match (or default), then you decide how each branch ends—with break or with a modern arrow case."
      />
      <ControlFlowWhyGrid items={WHY} />

      <div className="cf-tabs">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" className={`cf-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'route' && (
        <div className="cf-panel">
          <CfDiagramFrame label="Switch routing">
            <SwitchRoutingDiagram />
          </CfDiagramFrame>
          <p className="cf-caption">
            The JVM evaluates the switch expression once, then jumps to the matching <code>case</code> label. If nothing matches, <code>default</code> runs when you define it.
          </p>
          <CfCallout variant="remember" title="Picture it">
            Imagine a railway junction: the value picks one track. The diagram shows that fan-out—one decision, many destinations.
          </CfCallout>
        </div>
      )}
      {tab === 'classic' && (
        <div className="cf-panel">
          <CfDiagramFrame label="Classic switch">
            <HorizontalPipeline
              title="Classic switch blocks"
              steps={[
                { title: 'switch(value)', sub: 'single source' },
                { title: 'case', sub: 'matching branch' },
                { title: 'break', sub: 'stop fall-through' },
                { title: 'default', sub: 'fallback' }
              ]}
            />
          </CfDiagramFrame>
          <p className="cf-caption">
            Without <code>break</code>, execution falls through to the next case. Sometimes that is intentional (stacked cases), but often it is a bug—always ask “should this
            branch stop here?”
          </p>
          <CfCallout variant="watch" title="Fall-through">
            New learners: add <code>break;</code> to every case until you deliberately use fall-through and comment why.
          </CfCallout>
        </div>
      )}
      {tab === 'modern' && (
        <div className="cf-panel">
          <CfDiagramFrame label="Switch expression">
            <HorizontalPipeline
              title="Java 14+ switch expression"
              steps={[
                { title: 'case a, b ->', sub: 'group values' },
                { title: 'yield/value', sub: 'returns result' },
                { title: 'exhaustive', sub: 'handle default' },
                { title: 'assign', sub: 'String x = ...' }
              ]}
            />
          </CfDiagramFrame>
          <p className="cf-caption">
            Expression-style switch is built for assigning a result: each branch produces a value, so you are less likely to forget a path when enums cover all cases (with help
            from the compiler).
          </p>
        </div>
      )}
      {tab === 'usage' && (
        <div className="cf-panel">
          <CfDiagramFrame label="When to use switch">
            <HorizontalPipeline
              title="Use switch when"
              steps={[
                { title: 'same variable', sub: 'many values' },
                { title: 'enum/state', sub: 'finite options' },
                { title: 'routing tables', sub: 'commands/events' },
                { title: 'readability', sub: 'flatter logic' }
              ]}
            />
          </CfDiagramFrame>
          <p className="cf-caption">
            If conditions compare different variables or use ranges (e.g. <code>score &gt;= 90</code>), an if/else-if chain is usually clearer than forcing a switch.
          </p>
        </div>
      )}
    </div>
  );
}
