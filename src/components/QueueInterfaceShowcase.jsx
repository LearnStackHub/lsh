import { useState } from 'react';
import { CollectionsHero, CollectionsWhyGrid, CollectionsDiagramFrame, CollectionsCallout } from './collections/CollectionsBlocks';
import { QueueDequeDiagram, HorizontalPipeline } from './flow/ProfessionalDiagrams';

const TABS = [
  ['diagram', 'Queue & Deque'],
  ['fifo', 'Queue ops'],
  ['stack', 'Stack vs Deque']
];

const WHY = [
  {
    title: 'FIFO by default',
    text: 'Queue models waiting lines: elements are typically offered at the tail and polled from the head—fair scheduling and work queues.'
  },
  {
    title: 'Deque = both ends',
    text: 'Deque (double-ended queue) supports efficient operations at front and back. ArrayDeque is the usual replacement for Stack.'
  },
  {
    title: 'Priority is not FIFO',
    text: 'PriorityQueue orders by comparator or natural order—it is not strict insertion order for removal.'
  }
];

export default function QueueInterfaceShowcase() {
  const [tab, setTab] = useState('diagram');
  return (
    <div className="coll-showcase">
      <CollectionsHero
        eyebrow="java.util · Queue & Deque"
        title="Queue interface"
        subtitle="Queues schedule work; deques generalize to both ends. Know offer/poll/peek for Queue and the Deque methods that replace legacy Stack."
      />
      <CollectionsWhyGrid items={WHY} />

      <div className="coll-tabs">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" className={`coll-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'diagram' && (
        <div className="coll-panel">
          <CollectionsDiagramFrame label="Queue implementations">
            <QueueDequeDiagram />
          </CollectionsDiagramFrame>
        </div>
      )}

      {tab === 'fifo' && (
        <div className="coll-panel">
          <CollectionsDiagramFrame label="Queue behavior">
            <HorizontalPipeline
              title="Typical Queue methods"
              fresherHint={false}
              steps={[
                { title: 'offer', sub: 'insert (may fail)' },
                { title: 'poll', sub: 'remove head' },
                { title: 'peek', sub: 'look, no remove' },
                { title: 'BlockingQueue', sub: 'waits in concurrency' }
              ]}
            />
          </CollectionsDiagramFrame>
        </div>
      )}

      {tab === 'stack' && (
        <div className="coll-panel">
          <CollectionsDiagramFrame label="Prefer Deque">
            <HorizontalPipeline
              title="Stack → ArrayDeque"
              fresherHint={false}
              steps={[
                { title: 'Stack class', sub: 'legacy Vector' },
                { title: 'Deque', sub: 'clearer API' },
                { title: 'ArrayDeque', sub: 'fast, not synchronized' },
                { title: 'push/pop', sub: 'deque ends' }
              ]}
            />
          </CollectionsDiagramFrame>
          <CollectionsCallout variant="remember" title="Docs">
            <code>java.util.Stack</code> extends <code>Vector</code>; modern code uses <code>Deque</code> implementations for LIFO.
          </CollectionsCallout>
        </div>
      )}
    </div>
  );
}
