import { useState } from 'react';
import { ExceptionHero, ExceptionWhyGrid, ExceptionDiagramFrame, ExceptionCallout } from './exceptions/ExceptionBlocks';
import { ThrowThrowsDiagram, HorizontalPipeline } from './flow/ProfessionalDiagrams';

const TABS = [
  ['compare', 'throw vs throws'],
  ['chain', 'Propagation'],
  ['docs', 'When to use']
];

const WHY = [
  {
    title: 'throw = happen now',
    text: 'throw new SomeException(...) creates the exception and transfers control—use when a business rule fails or you wrap a lower-level error.'
  },
  {
    title: 'throws = warning label',
    text: 'The throws clause on a method only lists checked types that may escape. It does not throw by itself; callers must handle or re-declare.'
  },
  {
    title: 'Document the contract',
    text: 'The signature is the promise: if you call read(), you accept the possibility of IOException and must plan for it.'
  }
];

export default function ThrowThrowsShowcase() {
  const [tab, setTab] = useState('compare');
  return (
    <div className="exc-showcase">
      <ExceptionHero
        eyebrow="Keywords"
        title="throw and throws"
        subtitle="throw actually raises an exception at a statement. throws only advertises which checked exceptions a method may propagate so the compiler can enforce handling up the call stack."
      />
      <ExceptionWhyGrid items={WHY} />

      <div className="exc-tabs">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" className={`exc-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'compare' && (
        <div className="exc-panel">
          <ExceptionDiagramFrame label="throw vs throws">
            <ThrowThrowsDiagram />
          </ExceptionDiagramFrame>
        </div>
      )}

      {tab === 'chain' && (
        <div className="exc-panel">
          <ExceptionDiagramFrame label="Call stack">
            <HorizontalPipeline
              title="Checked exceptions climb the stack"
              fresherHint={false}
              steps={[
                { title: 'low-level method', sub: 'throws IOException' },
                { title: 'caller', sub: 'try/catch or throws' },
                { title: 'next caller', sub: 'same choice' },
                { title: 'main / thread', sub: 'last chance to catch' }
              ]}
            />
          </ExceptionDiagramFrame>
          <p className="exc-caption">If nobody catches, the thread ends with a stack trace—fine during development, usually bad in production.</p>
        </div>
      )}

      {tab === 'docs' && (
        <div className="exc-panel">
          <ExceptionDiagramFrame label="Design hint">
            <HorizontalPipeline
              title="Prefer clarity over empty catches"
              fresherHint={false}
              steps={[
                { title: 'throw early', sub: 'validate inputs' },
                { title: 'specific throws', sub: 'declared list' },
                { title: 'log at boundary', sub: 'controller / main' },
                { title: 'avoid', sub: 'empty catch {}' }
              ]}
            />
          </ExceptionDiagramFrame>
          <ExceptionCallout variant="remember" title="Readable code">
            Empty catch blocks hide bugs. At minimum log <code>e.getMessage()</code> or rethrow wrapped in a custom exception.
          </ExceptionCallout>
        </div>
      )}
    </div>
  );
}
