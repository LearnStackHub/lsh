import { useState } from 'react';
import { ThreadHero, ThreadWhyGrid, ThreadDiagramFrame, ThreadCallout } from './multithreading/ThreadBlocks';
import { ThreadLifecycleDiagram, HorizontalPipeline } from './flow/ProfessionalDiagrams';

const TABS = [
  ['states', 'Thread states'],
  ['waiting', 'Waiting states'],
  ['debug', 'Debug tips']
];

const WHY = [
  {
    title: 'Predict behavior',
    text: 'Knowing NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING, TERMINATED helps explain why code appears stuck.'
  },
  {
    title: 'Find contention',
    text: 'Frequent BLOCKED often means lock contention; WAITING/TIMED_WAITING may indicate join/wait/sleep usage.'
  },
  {
    title: 'Better debugging',
    text: 'Thread dumps and state transitions are key tools for deadlock and performance troubleshooting.'
  }
];

export default function ThreadLifecycleShowcase() {
  const [tab, setTab] = useState('states');
  return (
    <div className="thr-showcase">
      <ThreadHero
        eyebrow="Core Java · Multithreading"
        title="Thread lifecycle"
        subtitle="Threads move through defined JVM states. Understanding transitions makes concurrent code easier to reason about and debug."
      />
      <ThreadWhyGrid items={WHY} />

      <div className="thr-tabs">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" className={`thr-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'states' && (
        <div className="thr-panel">
          <ThreadDiagramFrame label="Lifecycle states">
            <ThreadLifecycleDiagram />
          </ThreadDiagramFrame>
        </div>
      )}

      {tab === 'waiting' && (
        <div className="thr-panel">
          <ThreadDiagramFrame label="Wait modes">
            <HorizontalPipeline
              title="WAITING vs TIMED_WAITING"
              fresherHint={false}
              steps={[
                { title: 'WAITING', sub: 'wait(), join()' },
                { title: 'TIMED_WAITING', sub: 'sleep(ms)' },
                { title: 'notify/timeout', sub: 'returns to runnable' },
                { title: 'lock needed', sub: 'may become BLOCKED' }
              ]}
            />
          </ThreadDiagramFrame>
        </div>
      )}

      {tab === 'debug' && (
        <div className="thr-panel">
          <ThreadDiagramFrame label="Debug workflow">
            <HorizontalPipeline
              title="When app hangs"
              fresherHint={false}
              steps={[
                { title: 'capture dump', sub: 'jstack / IDE' },
                { title: 'check BLOCKED', sub: 'lock owner' },
                { title: 'check WAITING', sub: 'join/wait chain' },
                { title: 'fix lock order', sub: 'avoid deadlock' }
              ]}
            />
          </ThreadDiagramFrame>
          <ThreadCallout variant="remember" title="Tip">
            Consistent lock ordering across code paths is a practical deadlock prevention technique.
          </ThreadCallout>
        </div>
      )}
    </div>
  );
}
