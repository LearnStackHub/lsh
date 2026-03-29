import { useState } from 'react';
import { CollectionsHero, CollectionsWhyGrid, CollectionsDiagramFrame, CollectionsCallout } from './collections/CollectionsBlocks';
import { SetImplementationsDiagram, HorizontalPipeline } from './flow/ProfessionalDiagrams';

const TABS = [
  ['impl', 'Implementations'],
  ['contract', 'equals & hashCode'],
  ['sorted', 'Sorted sets']
];

const WHY = [
  {
    title: 'No duplicates',
    text: 'A Set models a mathematical set: at most one element that equals another. Hash-based sets use equals and hashCode; tree sets use ordering.'
  },
  {
    title: 'Three flavors',
    text: 'HashSet for speed, LinkedHashSet when iteration order should match insertion order, TreeSet when you need sorted traversal.'
  },
  {
    title: 'Use the right keys',
    text: 'Mutable objects that change while in a set can break the contract—prefer immutable types or stable keys.'
  }
];

export default function SetInterfaceShowcase() {
  const [tab, setTab] = useState('impl');
  return (
    <div className="coll-showcase">
      <CollectionsHero
        eyebrow="java.util · Set"
        title="Set interface"
        subtitle="Sets enforce uniqueness. HashSet is the workhorse; LinkedHashSet and TreeSet add predictable or sorted iteration at some extra cost."
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
          <CollectionsDiagramFrame label="Set implementations">
            <SetImplementationsDiagram />
          </CollectionsDiagramFrame>
        </div>
      )}

      {tab === 'contract' && (
        <div className="coll-panel">
          <CollectionsDiagramFrame label="Hash contract">
            <HorizontalPipeline
              title="Objects in HashSet"
              fresherHint={false}
              steps={[
                { title: 'equals', sub: 'same value?' },
                { title: 'hashCode', sub: 'same bucket' },
                { title: 'consistent', sub: 'if equal' },
                { title: 'mutable?', sub: 'careful' }
              ]}
            />
          </CollectionsDiagramFrame>
          <CollectionsCallout variant="watch" title="Common bug">
            Changing a field that participates in <code>equals</code>/<code>hashCode</code> after inserting into a <code>HashSet</code> can leave the element in the wrong bucket.
          </CollectionsCallout>
        </div>
      )}

      {tab === 'sorted' && (
        <div className="coll-panel">
          <CollectionsDiagramFrame label="TreeSet">
            <HorizontalPipeline
              title="TreeSet ordering"
              fresherHint={false}
              steps={[
                { title: 'Comparable', sub: 'natural order' },
                { title: 'or Comparator', sub: 'constructor' },
                { title: 'no null', sub: 'if comparator' },
                { title: 'NavigableSet', sub: 'floor, ceiling' }
              ]}
            />
          </CollectionsDiagramFrame>
        </div>
      )}
    </div>
  );
}
