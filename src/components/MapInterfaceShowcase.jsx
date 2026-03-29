import { useState } from 'react';
import { CollectionsHero, CollectionsWhyGrid, CollectionsDiagramFrame, CollectionsCallout } from './collections/CollectionsBlocks';
import { MapImplementationsDiagram, HorizontalPipeline } from './flow/ProfessionalDiagrams';

const TABS = [
  ['impl', 'Implementations'],
  ['views', 'Keys, values, entries'],
  ['null', 'Null keys & values']
];

const WHY = [
  {
    title: 'Key → value',
    text: 'A Map associates keys to values. Keys are unique; each key maps to at most one value. Use for caches, indexes, and configuration.'
  },
  {
    title: 'Not Collection',
    text: 'Map does not extend Collection. You iterate via keySet(), values(), or entrySet()—often entrySet() for both key and value in one loop.'
  },
  {
    title: 'Pick by behavior',
    text: 'HashMap for speed; LinkedHashMap for order; TreeMap for sorted keys. ConcurrentHashMap for shared mutable maps in multithreaded code.'
  }
];

export default function MapInterfaceShowcase() {
  const [tab, setTab] = useState('impl');
  return (
    <div className="coll-showcase">
      <CollectionsHero
        eyebrow="java.util · Map"
        title="Map interface"
        subtitle="Maps are the right abstraction for lookups by key. Learn put, get, containsKey, and how iteration differs from List and Set."
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
          <CollectionsDiagramFrame label="Map implementations">
            <MapImplementationsDiagram />
          </CollectionsDiagramFrame>
        </div>
      )}

      {tab === 'views' && (
        <div className="coll-panel">
          <CollectionsDiagramFrame label="Map views">
            <HorizontalPipeline
              title="Three views of one map"
              fresherHint={false}
              steps={[
                { title: 'keySet()', sub: 'Set of keys' },
                { title: 'values()', sub: 'Collection' },
                { title: 'entrySet()', sub: 'Map.Entry pairs' },
                { title: 'remove via', sub: 'iterator cautions' }
              ]}
            />
          </CollectionsDiagramFrame>
          <p className="coll-caption">Removing from keySet or entrySet removes the mapping from the backing map.</p>
        </div>
      )}

      {tab === 'null' && (
        <div className="coll-panel">
          <CollectionsDiagramFrame label="Null rules">
            <HorizontalPipeline
              title="HashMap vs TreeMap"
              fresherHint={false}
              steps={[
                { title: 'HashMap', sub: 'one null key' },
                { title: 'TreeMap', sub: 'no null keys' },
                { title: 'values', sub: 'often null OK' },
                { title: 'read javadoc', sub: 'per class' }
              ]}
            />
          </CollectionsDiagramFrame>
          <CollectionsCallout variant="tip" title="ConcurrentHashMap">
            Does not allow null keys or values—fail-fast in concurrent settings.
          </CollectionsCallout>
        </div>
      )}
    </div>
  );
}
