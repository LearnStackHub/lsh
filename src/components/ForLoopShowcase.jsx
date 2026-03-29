import { useState } from 'react';
import { ControlFlowHero, ControlFlowWhyGrid, CfDiagramFrame, CfCallout } from './controlflow/ControlFlowBlocks';
import { LoopLifecycleDiagram, ForLoopThreePartsDiagram, HorizontalPipeline } from './flow/ProfessionalDiagrams';

const TABS = [
  ['lifecycle', 'Lifecycle'],
  ['parts', 'Three parts'],
  ['patterns', 'Counting patterns'],
  ['arrays', 'Arrays & for-each'],
  ['nested', 'Nested loops']
];

const WHY = [
  {
    title: 'Bounded repetition',
    text: 'When you know how to start, when to stop, and how to step (0 to n-1, countdown, every k-th item), for-loops spell that out in one line.'
  },
  {
    title: 'Arrays and lists',
    text: 'Walking an array by index, or using for-each when you only read elements, is daily Java work—master the indexed for first.'
  },
  {
    title: 'Predictable structure',
    text: 'init → check → body → update → check again… Seeing that rhythm helps you spot off-by-one errors and infinite loops early.'
  }
];

export default function ForLoopShowcase() {
  const [tab, setTab] = useState('lifecycle');
  return (
    <div className="cf-showcase cf-for-showcase">
      <ControlFlowHero
        eyebrow="Counted loops"
        title="For loops"
        subtitle="Repeat with a counter: initialization runs once, the condition is checked before each iteration, the update runs after the body. Perfect for arrays, numeric ranges, and “do this N times.”"
      />
      <ControlFlowWhyGrid items={WHY} />

      <div className="cf-tabs">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" className={`cf-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'lifecycle' && (
        <div className="cf-panel">
          <CfDiagramFrame label="For loop lifecycle">
            <LoopLifecycleDiagram mode="for" />
          </CfDiagramFrame>
          <p className="cf-caption">
            Order is fixed: run initialization once, then each lap is “condition? → body → update.” When the condition becomes false, the loop exits without running the body
            again.
          </p>
        </div>
      )}
      {tab === 'parts' && (
        <div className="cf-panel">
          <CfDiagramFrame label="Three parts of for">
            <ForLoopThreePartsDiagram />
          </CfDiagramFrame>
          <p className="cf-caption">
            Memorize the slots inside the parentheses: <code>for (init; condition; update)</code>. All three are optional in syntax, but in practice you almost always use them
            together for counting.
          </p>
          <CfCallout variant="tip" title="Trace one iteration">
            On paper, write <code>i</code> before the body, then after the body pretend you run <code>i++</code> and re-check <code>i &lt; n</code>. That is one iteration.
          </CfCallout>
        </div>
      )}
      {tab === 'patterns' && (
        <div className="cf-panel">
          <CfDiagramFrame label="Iteration patterns">
            <HorizontalPipeline
              title="Core iteration patterns"
              steps={[
                { title: 'i++', sub: 'count up' },
                { title: 'i--', sub: 'count down' },
                { title: 'i += k', sub: 'custom step' },
                { title: 'bounds', sub: '< vs <=' }
              ]}
            />
          </CfDiagramFrame>
          <p className="cf-caption">
            Most off-by-one bugs come from mixing <code>&lt;</code> and <code>&lt;=</code> with the wrong start value. Say aloud: “first value of i, last value of i” before you
            run the code.
          </p>
        </div>
      )}
      {tab === 'arrays' && (
        <div className="cf-panel">
          <CfDiagramFrame label="Indexed for vs for-each">
            <HorizontalPipeline
              title="Indexed for vs for-each"
              steps={[
                { title: 'indexed for', sub: 'need index' },
                { title: 'for-each', sub: 'read-only traversal' },
                { title: 'reverse loop', sub: 'indexed only' },
                { title: 'mutations', sub: 'careful updates' }
              ]}
            />
          </CfDiagramFrame>
          <p className="cf-caption">
            Use an indexed <code>for</code> when you need the index (swap neighbors, fill positions). Use enhanced for (<code>for (T x : arr)</code>) when you only read each
            element.
          </p>
        </div>
      )}
      {tab === 'nested' && (
        <div className="cf-panel">
          <CfDiagramFrame label="Nested loop cost">
            <HorizontalPipeline
              title="Nested loop cost model"
              steps={[
                { title: 'outer n', sub: 'rows/items' },
                { title: 'inner m', sub: 'cols/checks' },
                { title: 'n * m', sub: 'total work' },
                { title: 'break early', sub: 'practical speedup' }
              ]}
            />
          </CfDiagramFrame>
          <p className="cf-caption">
            Nested loops multiply work: if the outer runs 1000 times and the inner 1000 times, you are near a million iterations—fine for small data, painful if accidental.
          </p>
        </div>
      )}
    </div>
  );
}
