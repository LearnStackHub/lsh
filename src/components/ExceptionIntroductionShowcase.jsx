import { useState } from 'react';
import { ExceptionHero, ExceptionWhyGrid, ExceptionDiagramFrame, ExceptionCallout } from './exceptions/ExceptionBlocks';
import { ThrowableHierarchyDiagram, CheckedVsUncheckedDiagram, HorizontalPipeline } from './flow/ProfessionalDiagrams';

const TABS = [
  ['tree', 'Throwable tree'],
  ['checked', 'Checked vs unchecked'],
  ['flow', 'Normal vs error path']
];

const WHY = [
  {
    title: 'Objects that carry failure',
    text: 'An exception is an object that interrupts normal flow. It carries a type and message so you can log, recover, or show a clear error to the user.'
  },
  {
    title: 'Fail fast, handle locally',
    text: 'Catch problems where you can fix them (retry, default value). Else let the caller handle or declare the exception—do not swallow errors silently.'
  },
  {
    title: 'Two big families',
    text: 'Checked exceptions remind you to handle external risks; unchecked often point to bugs (null, bad argument). Both are still real exceptions.'
  }
];

export default function ExceptionIntroductionShowcase() {
  const [tab, setTab] = useState('tree');
  return (
    <div className="exc-showcase">
      <ExceptionHero
        eyebrow="Core Java · Errors & exceptions"
        title="Introduction to exceptions"
        subtitle="When something goes wrong at runtime, Java throws an exception object. You can catch it, declare it, or let it propagate. The type system groups failures into Throwable, Error, Exception, and RuntimeException."
      />
      <ExceptionWhyGrid items={WHY} />

      <div className="exc-tabs">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" className={`exc-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'tree' && (
        <div className="exc-panel">
          <ExceptionDiagramFrame label="Throwable hierarchy">
            <ThrowableHierarchyDiagram />
          </ExceptionDiagramFrame>
          <ExceptionCallout variant="tip" title="Beginner focus">
            Learn <code>Exception</code>, <code>RuntimeException</code>, and <code>IOException</code> first. Leave <code>Error</code> (e.g. OutOfMemoryError) to advanced JVM topics.
          </ExceptionCallout>
        </div>
      )}

      {tab === 'checked' && (
        <div className="exc-panel">
          <ExceptionDiagramFrame label="Checked vs unchecked">
            <CheckedVsUncheckedDiagram />
          </ExceptionDiagramFrame>
        </div>
      )}

      {tab === 'flow' && (
        <div className="exc-panel">
          <ExceptionDiagramFrame label="Execution paths">
            <HorizontalPipeline
              title="What happens when something throws?"
              fresherHint={false}
              steps={[
                { title: 'try runs', sub: 'normal line-by-line' },
                { title: 'throw', sub: 'exception object' },
                { title: 'nearest match', sub: 'catch or propagate' },
                { title: 'or crash', sub: 'uncaught → stack trace' }
              ]}
            />
          </ExceptionDiagramFrame>
          <p className="exc-caption">If no catch matches, the method exits abruptly and the caller gets the same problem until something handles it.</p>
        </div>
      )}
    </div>
  );
}
