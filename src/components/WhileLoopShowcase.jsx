import { useState } from 'react';
import { ControlFlowHero, ControlFlowWhyGrid, CfDiagramFrame, CfCallout } from './controlflow/ControlFlowBlocks';
import { LoopLifecycleDiagram, HorizontalPipeline } from './flow/ProfessionalDiagrams';

const TABS = [
  ['lifecycle', 'Lifecycle'],
  ['usecases', 'Best use-cases'],
  ['safety', 'Loop safety'],
  ['retries', 'Retry flows']
];

const WHY = [
  {
    title: 'Unknown count',
    text: 'Reading until end-of-file, waiting for valid input, or polling until a flag flips—you repeat until a runtime condition says “stop.”'
  },
  {
    title: 'Check first',
    text: 'while checks the condition before each body run. If it starts false, the body runs zero times—often exactly what you want.'
  },
  {
    title: 'Watch the condition',
    text: 'Something inside the loop (or the outside world) must eventually make the condition false, or you spin forever.'
  }
];

export default function WhileLoopShowcase() {
  const [tab, setTab] = useState('lifecycle');
  return (
    <div className="cf-showcase cf-while-showcase">
      <ControlFlowHero
        eyebrow="Indefinite loops"
        title="While loops"
        subtitle="Repeat while a condition stays true. No built-in counter—just a boolean test each time. Ideal when you do not know in advance how many iterations you will need."
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
          <CfDiagramFrame label="While loop lifecycle">
            <LoopLifecycleDiagram mode="while" />
          </CfDiagramFrame>
          <p className="cf-caption">
            The condition is evaluated first. If it is false immediately, the body never runs—unlike do-while, which always runs the body at least once.
          </p>
          <CfCallout variant="tip" title="Mental model">
            while is “maybe many times, maybe zero.” If you need “at least once,” compare with do-while on the next page.
          </CfCallout>
        </div>
      )}
      {tab === 'usecases' && (
        <div className="cf-panel">
          <CfDiagramFrame label="While use cases">
            <HorizontalPipeline
              title="Typical while-loop scenarios"
              steps={[
                { title: 'stream read', sub: 'until EOF' },
                { title: 'menu/session', sub: 'until exit' },
                { title: 'validation', sub: 'until valid input' },
                { title: 'queue processing', sub: 'until empty' }
              ]}
            />
          </CfDiagramFrame>
          <p className="cf-caption">
            These patterns share one idea: stop when an external signal or state change says you are done, not when a counter hits N.
          </p>
        </div>
      )}
      {tab === 'safety' && (
        <div className="cf-panel">
          <CfDiagramFrame label="Avoid infinite loops">
            <HorizontalPipeline
              title="Avoid infinite loops"
              steps={[
                { title: 'progress var', sub: 'must change' },
                { title: 'visible state', sub: 'shared updates' },
                { title: 'timeouts/limits', sub: 'guard rails' },
                { title: 'logs', sub: 'trace exits' }
              ]}
            />
          </CfDiagramFrame>
          <p className="cf-caption">
            If the condition never becomes false, the loop never ends. During practice, add a max-iteration guard or print statements so you can see progress.
          </p>
          <CfCallout variant="watch" title="Production note">
            If the condition depends on networks or files, add timeouts or retry limits so a stuck dependency cannot hang your program forever.
          </CfCallout>
        </div>
      )}
      {tab === 'retries' && (
        <div className="cf-panel">
          <CfDiagramFrame label="Retry pattern">
            <HorizontalPipeline
              title="Retry pattern"
              steps={[
                { title: 'attempt = 0', sub: 'initialize' },
                { title: 'while !ok', sub: 'condition' },
                { title: 'try work', sub: 'attempt action' },
                { title: 'attempt++', sub: 'bounded retries' },
                { title: 'exit/fail', sub: 'final outcome' }
              ]}
            />
          </CfDiagramFrame>
          <p className="cf-caption">
            Combine a result flag with an attempt counter: the while keeps going until success or until you hit the maximum tries—classic resilience pattern.
          </p>
        </div>
      )}
    </div>
  );
}
