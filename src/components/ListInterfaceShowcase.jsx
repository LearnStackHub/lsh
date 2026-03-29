import { useState } from 'react';
import { CollectionsHero, CollectionsWhyGrid, CollectionsDiagramFrame, CollectionsCallout } from './collections/CollectionsBlocks';
import { ListImplementationsDiagram, HorizontalPipeline } from './flow/ProfessionalDiagrams';

const TABS = [
  ['impl', 'Implementations'],
  ['ops', 'Common ops'],
  ['choose', 'How to choose']
];

const WHY = [
  {
    title: 'Ordered & indexed',
    text: 'A List keeps insertion order and lets you get(i), set(i, e), and add at an index—ideal for sequences and UI rows.'
  },
  {
    title: 'ArrayList first',
    text: 'Start with ArrayList for random access and simple growth. Switch to LinkedList only when profiling shows many middle inserts.'
  },
  {
    title: 'Thread safety',
    text: 'Standard lists are not synchronized. For shared data use Collections.synchronizedList, CopyOnWriteArrayList, or external locking.'
  }
];

export default function ListInterfaceShowcase() {
  const [tab, setTab] = useState('impl');
  return (
    <div className="coll-showcase">
      <CollectionsHero
        eyebrow="java.util · List"
        title="List interface"
        subtitle="Lists model sequences: duplicates allowed, stable order, positional access. Pick an implementation based on how often you access by index versus insert in the middle."
      />
      <CollectionsWhyGrid items={WHY} />

      <div className="coll-tabs">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" className={`coll-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'impl' && (
        <div className="coll-panel">
          <CollectionsDiagramFrame label="List implementations">
            <ListImplementationsDiagram />
          </CollectionsDiagramFrame>
        </div>
      )}

      {tab === 'ops' && (
        <div className="coll-panel">
          <CollectionsDiagramFrame label="List operations">
            <HorizontalPipeline
              title="What lists do well"
              fresherHint={false}
              steps={[
                { title: 'get / set', sub: 'by index' },
                { title: 'subList', sub: 'view window' },
                { title: 'sort', sub: 'Collections.sort' },
                { title: 'for-each', sub: 'Iterable' }
              ]}
            />
          </CollectionsDiagramFrame>
        </div>
      )}

      {tab === 'choose' && (
        <div className="coll-panel">
          <CollectionsDiagramFrame label="Decision hint">
            <HorizontalPipeline
              title="Pick a list class"
              fresherHint={false}
              steps={[
                { title: 'default', sub: 'ArrayList' },
                { title: 'many inserts', sub: 'consider LinkedList' },
                { title: 'legacy API', sub: 'Vector' },
                { title: 'LIFO stack', sub: 'Deque, not Stack' }
              ]}
            />
          </CollectionsDiagramFrame>
          <CollectionsCallout variant="remember" title="Interview tip">
            Know time complexity: indexed get for <code>ArrayList</code> is O(1); for <code>LinkedList</code> it is O(n).
          </CollectionsCallout>
        </div>
      )}
    </div>
  );
}
