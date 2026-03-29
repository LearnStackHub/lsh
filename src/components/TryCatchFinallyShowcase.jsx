import { useState } from 'react';
import { ExceptionHero, ExceptionWhyGrid, ExceptionDiagramFrame, ExceptionCallout } from './exceptions/ExceptionBlocks';
import { TryCatchFinallyFlowDiagram, HorizontalPipeline } from './flow/ProfessionalDiagrams';

const TABS = [
  ['order', 'Execution order'],
  ['resources', 'try-with-resources'],
  ['rules', 'Catch rules']
];

const WHY = [
  {
    title: 'try = risky block',
    text: 'Put code that might throw inside try: file I/O, parsing, network, or calling methods that declare checked exceptions.'
  },
  {
    title: 'catch = recovery',
    text: 'Each catch block handles one exception type. Use the variable (often e) to log e.getMessage() or decide what to do next.'
  },
  {
    title: 'finally = cleanup',
    text: 'finally runs whether try succeeded or threw—ideal for closing resources in older code; prefer try-with-resources for AutoCloseable types.'
  }
];

export default function TryCatchFinallyShowcase() {
  const [tab, setTab] = useState('order');
  return (
    <div className="exc-showcase">
      <ExceptionHero
        eyebrow="Handle errors locally"
        title="try · catch · finally"
        subtitle="Group risky code in try, catch specific exception types to recover or respond, and use finally (or try-with-resources) so cleanup always runs."
      />
      <ExceptionWhyGrid items={WHY} />

      <div className="exc-tabs">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" className={`exc-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'order' && (
        <div className="exc-panel">
          <ExceptionDiagramFrame label="Order of execution">
            <TryCatchFinallyFlowDiagram />
          </ExceptionDiagramFrame>
        </div>
      )}

      {tab === 'resources' && (
        <div className="exc-panel">
          <ExceptionDiagramFrame label="Automatic close">
            <HorizontalPipeline
              title="try-with-resources (Java 7+)"
              fresherHint={false}
              steps={[
                { title: 'try (FileInputStream in', sub: '...' },
                { title: 'AutoCloseable', sub: 'close() called' },
                { title: 'even on throw', sub: 'no leak' },
                { title: 'prefer this', sub: 'for files/streams' }
              ]}
            />
          </ExceptionDiagramFrame>
          <p className="exc-caption">Use try-with-resources for anything that implements <code>AutoCloseable</code>—the compiler inserts safe close logic.</p>
        </div>
      )}

      {tab === 'rules' && (
        <div className="exc-panel">
          <ExceptionDiagramFrame label="Catch order">
            <HorizontalPipeline
              title="Catch from specific to general"
              fresherHint={false}
              steps={[
                { title: 'FileNotFoundException', sub: 'narrow' },
                { title: 'then IOException', sub: 'broader' },
                { title: 'last Exception', sub: 'optional umbrella' },
                { title: 'never before', sub: 'subclass after parent = error' }
              ]}
            />
          </ExceptionDiagramFrame>
          <ExceptionCallout variant="watch" title="Compile error">
            Putting <code>catch (Exception e)</code> before <code>IOException</code> makes the second block unreachable—Java will not compile.
          </ExceptionCallout>
        </div>
      )}
    </div>
  );
}
