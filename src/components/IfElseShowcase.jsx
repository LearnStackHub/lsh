import { useState } from 'react';
import { ControlFlowHero, ControlFlowWhyGrid, CfDiagramFrame, CfCallout } from './controlflow/ControlFlowBlocks';
import { DecisionChainDiagram, HorizontalPipeline } from './flow/ProfessionalDiagrams';

const TABS = [
  ['flow', 'Decision flow'],
  ['patterns', 'Patterns'],
  ['logic', 'Conditions'],
  ['quality', 'Clean code']
];

const WHY = [
  {
    title: 'Real programs branch',
    text: 'Almost every app chooses what to do next: login vs guest, valid vs invalid input, discount tiers. if/else is how Java expresses that.'
  },
  {
    title: 'Order matters',
    text: 'Java checks conditions from top to bottom and stops at the first true branch. Putting checks in the right order avoids bugs and duplicate work.'
  },
  {
    title: 'Readable logic',
    text: 'Well-named booleans and flat if-chains are easier to debug than deeply nested code when you are still learning control flow.'
  }
];

export default function IfElseShowcase() {
  const [tab, setTab] = useState('flow');
  return (
    <div className="cf-showcase cf-ifelse-showcase">
      <ControlFlowHero
        eyebrow="Branching"
        title="If / else-if / else"
        subtitle="Choose one path based on conditions. Think of it as a chain of questions: the first “yes” wins; if none match, else runs when you provide it."
      />
      <ControlFlowWhyGrid items={WHY} />

      <div className="cf-tabs">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" className={`cf-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'flow' && (
        <div className="cf-panel">
          <CfDiagramFrame label="Decision chain diagram">
            <DecisionChainDiagram />
          </CfDiagramFrame>
          <p className="cf-caption">
            In an if/else-if chain, Java evaluates top to bottom and executes only the first true branch. Put the most specific checks first (e.g. exact error codes),
            then broader ones; finish with <code>else</code> for “everything else.”
          </p>
          <CfCallout variant="tip" title="Beginner tip">
            Trace the diagram with a pencil: pick sample values for <code>cond1</code> and <code>cond2</code> and see which box runs. That is exactly how the JVM walks your
            code.
          </CfCallout>
        </div>
      )}
      {tab === 'patterns' && (
        <div className="cf-panel">
          <CfDiagramFrame label="Branching patterns">
            <HorizontalPipeline
              title="Branching patterns"
              steps={[
                { title: 'if', sub: 'single condition' },
                { title: 'if/else', sub: 'binary branch' },
                { title: 'else-if ladder', sub: 'multiple ranges' },
                { title: 'nested if', sub: 'secondary check' }
              ]}
            />
          </CfDiagramFrame>
          <p className="cf-caption">
            Use nested <code>if</code> only when one decision truly depends on another (for example: only check license if age is already valid). Otherwise prefer a flat
            else-if ladder.
          </p>
        </div>
      )}
      {tab === 'logic' && (
        <div className="cf-panel">
          <CfDiagramFrame label="Condition composition">
            <HorizontalPipeline
              title="Condition composition"
              steps={[
                { title: '&&', sub: 'both true' },
                { title: '||', sub: 'any true' },
                { title: '!', sub: 'negation' },
                { title: 'parentheses', sub: 'remove ambiguity' }
              ]}
            />
          </CfDiagramFrame>
          <p className="cf-caption">
            Combine checks deliberately: use parentheses so <code>&&</code> and <code>||</code> do not surprise you after someone edits the line. When in doubt, add extra
            parentheses.
          </p>
          <CfCallout variant="watch" title="Common mistake">
            Mixing <code>&&</code> and <code>||</code> without parentheses can change meaning. Write one business rule per boolean variable if the condition gets long.
          </CfCallout>
        </div>
      )}
      {tab === 'quality' && (
        <div className="cf-panel">
          <CfDiagramFrame label="Maintainable if-else">
            <HorizontalPipeline
              title="Maintainable if-else"
              steps={[
                { title: 'guard early', sub: 'reduce nesting' },
                { title: 'name booleans', sub: 'isEligible' },
                { title: 'extract methods', sub: 'one purpose' },
                { title: 'test edges', sub: 'boundaries' }
              ]}
            />
          </CfDiagramFrame>
          <p className="cf-caption">
            “Guard clauses” return or handle bad cases first so the happy path stays at one indentation level—easier to read than a pyramid of nested braces.
          </p>
        </div>
      )}
    </div>
  );
}
