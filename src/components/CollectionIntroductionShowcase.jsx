import { useState } from 'react';
import { CollectionsHero, CollectionsWhyGrid, CollectionsDiagramFrame, CollectionsCallout } from './collections/CollectionsBlocks';
import { CollectionsFrameworkHierarchyDiagram, HorizontalPipeline } from './flow/ProfessionalDiagrams';

const TABS = [
  ['hierarchy', 'Interface tree'],
  ['arrays', 'vs arrays'],
  ['api', 'What you get']
];

const WHY = [
  {
    title: 'Dynamic groups of objects',
    text: 'Collections grow and shrink at runtime. You work with interfaces (List, Set, Map) and swap implementations when your performance or ordering needs change.'
  },
  {
    title: 'Algorithms in java.util',
    text: 'Collections.sort, binarySearch, shuffle, and synchronized wrappers live alongside the framework—learn the core interfaces first, then utilities.'
  },
  {
    title: 'Generics keep types safe',
    text: 'Use List<String> or Map<String, Integer> so the compiler catches mistakes early instead of ClassCastException at runtime.'
  }
];

export default function CollectionIntroductionShowcase() {
  const [tab, setTab] = useState('hierarchy');
  return (
    <div className="coll-showcase">
      <CollectionsHero
        eyebrow="Core Java · Collections"
        title="Collections framework overview"
        subtitle="The java.util collections are the standard way to store and traverse groups of objects. Interfaces define behavior; concrete classes trade off speed, ordering, and thread safety."
      />
      <CollectionsWhyGrid items={WHY} />

      <div className="coll-tabs">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" className={`coll-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'hierarchy' && (
        <div className="coll-panel">
          <CollectionsDiagramFrame label="Collections hierarchy">
            <CollectionsFrameworkHierarchyDiagram />
          </CollectionsDiagramFrame>
          <CollectionsCallout variant="tip" title="Map is special">
            <code>Map</code> is not a <code>Collection</code>—it does not extend <code>Iterable</code> at the map level (iterate keys, values, or entries instead).
          </CollectionsCallout>
        </div>
      )}

      {tab === 'arrays' && (
        <div className="coll-panel">
          <CollectionsDiagramFrame label="Arrays vs collections">
            <HorizontalPipeline
              title="When collections win"
              fresherHint={false}
              steps={[
                { title: 'Dynamic size', sub: 'add / remove' },
                { title: 'Rich API', sub: 'search, sort helpers' },
                { title: 'Implementations', sub: 'swap class' },
                { title: 'Arrays still', sub: 'primitives, fixed size' }
              ]}
            />
          </CollectionsDiagramFrame>
          <p className="coll-caption">Use arrays for raw performance and primitives; use collections for most application data structures.</p>
        </div>
      )}

      {tab === 'api' && (
        <div className="coll-panel">
          <CollectionsDiagramFrame label="Core operations">
            <HorizontalPipeline
              title="Typical learning path"
              fresherHint={false}
              steps={[
                { title: 'Collection', sub: 'add, remove, size' },
                { title: 'List / Set', sub: 'index vs unique' },
                { title: 'Map', sub: 'put, get, keys' },
                { title: 'Queue', sub: 'FIFO / Deque' }
              ]}
            />
          </CollectionsDiagramFrame>
        </div>
      )}
    </div>
  );
}
