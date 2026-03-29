import { useState } from 'react';
import { ThreadHero, ThreadWhyGrid, ThreadDiagramFrame, ThreadCallout } from './multithreading/ThreadBlocks';
import { ThreadVsProcessDiagram, HorizontalPipeline } from './flow/ProfessionalDiagrams';

const TABS = [
  ['overview', 'Process vs thread'],
  ['benefits', 'Why threads'],
  ['risks', 'Common risks']
];

const WHY = [
  {
    title: 'Concurrent paths inside one app',
    text: 'Threads let one process handle UI, network, and background work at the same time by sharing memory and CPU scheduling.'
  },
  {
    title: 'Throughput and responsiveness',
    text: 'Use threads to overlap waiting tasks (I/O) and keep apps responsive while heavy work runs in background.'
  },
  {
    title: 'Need synchronization',
    text: 'Shared mutable state can race. Guard critical sections with synchronization or thread-safe abstractions.'
  }
];

export default function ThreadIntroductionShowcase() {
  const [tab, setTab] = useState('overview');
  return (
    <div className="thr-showcase">
      <ThreadHero
        eyebrow="Core Java · Multithreading"
        title="Thread introduction"
        subtitle="A thread is the smallest execution unit in Java. Multiple threads in one JVM share memory, which improves concurrency but requires safe coordination."
      />
      <ThreadWhyGrid items={WHY} />

      <div className="thr-tabs">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" className={`thr-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <div className="thr-panel">
          <ThreadDiagramFrame label="Process vs thread">
            <ThreadVsProcessDiagram />
          </ThreadDiagramFrame>
        </div>
      )}

      {tab === 'benefits' && (
        <div className="thr-panel">
          <ThreadDiagramFrame label="Benefits">
            <HorizontalPipeline
              title="Where threads help"
              fresherHint={false}
              steps={[
                { title: 'UI stays free', sub: 'no freezing' },
                { title: 'I/O overlap', sub: 'network + disk' },
                { title: 'parallel tasks', sub: 'multi-core CPUs' },
                { title: 'faster systems', sub: 'better throughput' }
              ]}
            />
          </ThreadDiagramFrame>
        </div>
      )}

      {tab === 'risks' && (
        <div className="thr-panel">
          <ThreadDiagramFrame label="Risks">
            <HorizontalPipeline
              title="What can go wrong"
              fresherHint={false}
              steps={[
                { title: 'race condition', sub: 'lost updates' },
                { title: 'deadlock', sub: 'circular lock wait' },
                { title: 'starvation', sub: 'no CPU chance' },
                { title: 'debug pain', sub: 'timing dependent bugs' }
              ]}
            />
          </ThreadDiagramFrame>
          <ThreadCallout variant="watch" title="Rule">
            If data is shared and mutable, assume synchronization is needed until proven otherwise.
          </ThreadCallout>
        </div>
      )}
    </div>
  );
}
