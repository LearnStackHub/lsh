import { useState } from 'react';
import { ThreadHero, ThreadWhyGrid, ThreadDiagramFrame, ThreadCallout } from './multithreading/ThreadBlocks';
import { ThreadMethodsDiagram, HorizontalPipeline } from './flow/ProfessionalDiagrams';

const TABS = [
  ['core', 'Core methods'],
  ['coord', 'Coordination'],
  ['cancel', 'Interrupt model']
];

const WHY = [
  {
    title: 'Control execution',
    text: 'Methods like start, sleep, join, and interrupt shape how threads run, wait, and finish in coordinated workflows.'
  },
  {
    title: 'Safe cancellation',
    text: 'Java uses cooperative cancellation: interrupt requests stop; your code checks/interprets interruption and exits gracefully.'
  },
  {
    title: 'Observability',
    text: 'isAlive, currentThread, and setName help monitor behavior and improve log readability in concurrent systems.'
  }
];

export default function ThreadMethodsShowcase() {
  const [tab, setTab] = useState('core');
  return (
    <div className="thr-showcase">
      <ThreadHero
        eyebrow="Core Java · Multithreading"
        title="Thread methods"
        subtitle="Master the essential Thread APIs: start, sleep, join, interrupt, and status helpers. They form the basis of coordination in Java concurrency."
      />
      <ThreadWhyGrid items={WHY} />

      <div className="thr-tabs">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" className={`thr-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'core' && (
        <div className="thr-panel">
          <ThreadDiagramFrame label="Thread methods map">
            <ThreadMethodsDiagram />
          </ThreadDiagramFrame>
        </div>
      )}

      {tab === 'coord' && (
        <div className="thr-panel">
          <ThreadDiagramFrame label="Coordination methods">
            <HorizontalPipeline
              title="Ordering two threads"
              fresherHint={false}
              steps={[
                { title: 'start worker', sub: 'background task' },
                { title: 'main calls join', sub: 'wait completion' },
                { title: 'worker ends', sub: 'run() done' },
                { title: 'main resumes', sub: 'safe next step' }
              ]}
            />
          </ThreadDiagramFrame>
        </div>
      )}

      {tab === 'cancel' && (
        <div className="thr-panel">
          <ThreadDiagramFrame label="Interrupt flow">
            <HorizontalPipeline
              title="Cooperative interruption"
              fresherHint={false}
              steps={[
                { title: 'request', sub: 'thread.interrupt()' },
                { title: 'target checks', sub: 'isInterrupted()' },
                { title: 'handle signal', sub: 'cleanup + break' },
                { title: 'finish', sub: 'thread terminates' }
              ]}
            />
          </ThreadDiagramFrame>
          <ThreadCallout variant="watch" title="Avoid">
            Do not use deprecated <code>stop</code>/<code>suspend</code>/<code>resume</code>; they can leave shared state inconsistent.
          </ThreadCallout>
        </div>
      )}
    </div>
  );
}
