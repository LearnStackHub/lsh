import { useState } from 'react';
import { ThreadHero, ThreadWhyGrid, ThreadDiagramFrame, ThreadCallout } from './multithreading/ThreadBlocks';
import { ThreadCreationWaysDiagram, HorizontalPipeline } from './flow/ProfessionalDiagrams';

const TABS = [
  ['ways', 'Two ways'],
  ['start', 'start vs run'],
  ['modern', 'ExecutorService']
];

const WHY = [
  {
    title: 'Thread subclass',
    text: 'Quick to demonstrate, but you lose inheritance flexibility because Java supports only single class inheritance.'
  },
  {
    title: 'Runnable task',
    text: 'Recommended: separate task logic from thread object so you can run with Thread or pooled executors.'
  },
  {
    title: 'start is mandatory',
    text: 'Calling run() directly does not spawn a new thread; it just executes like a normal method call.'
  }
];

export default function ThreadCreationShowcase() {
  const [tab, setTab] = useState('ways');
  return (
    <div className="thr-showcase">
      <ThreadHero
        eyebrow="Core Java · Multithreading"
        title="Thread creation"
        subtitle="You can create threads by extending Thread or implementing Runnable. Prefer Runnable and executors for maintainable production code."
      />
      <ThreadWhyGrid items={WHY} />

      <div className="thr-tabs">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" className={`thr-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'ways' && (
        <div className="thr-panel">
          <ThreadDiagramFrame label="Creation methods">
            <ThreadCreationWaysDiagram />
          </ThreadDiagramFrame>
        </div>
      )}

      {tab === 'start' && (
        <div className="thr-panel">
          <ThreadDiagramFrame label="start vs run">
            <HorizontalPipeline
              title="Correct startup sequence"
              fresherHint={false}
              steps={[
                { title: 'build task', sub: 'run() logic' },
                { title: 'wrap in Thread', sub: 'new Thread(task)' },
                { title: 'call start()', sub: 'new execution path' },
                { title: 'scheduler runs', sub: 'run() async' }
              ]}
            />
          </ThreadDiagramFrame>
          <ThreadCallout variant="tip" title="Quick check">
            If log output shows only one thread name, you probably called <code>run()</code> directly.
          </ThreadCallout>
        </div>
      )}

      {tab === 'modern' && (
        <div className="thr-panel">
          <ThreadDiagramFrame label="Modern style">
            <HorizontalPipeline
              title="Prefer executors"
              fresherHint={false}
              steps={[
                { title: 'ExecutorService', sub: 'fixed or cached pool' },
                { title: 'submit(task)', sub: 'returns Future' },
                { title: 'reuse threads', sub: 'less creation overhead' },
                { title: 'shutdown()', sub: 'graceful stop' }
              ]}
            />
          </ThreadDiagramFrame>
        </div>
      )}
    </div>
  );
}
