import { useState } from 'react';
import { ArrayHero, ArrayWhyGrid, ArrayDiagramFrame, ArrayCallout } from './arrays/ArrayBlocks';
import { ArrayIndexLengthDiagram, HorizontalPipeline } from './flow/ProfessionalDiagrams';

const TABS = [
  ['loop', 'Indexed for-loop'],
  ['foreach', 'Enhanced for'],
  ['patterns', 'Common patterns']
];

const WHY = [
  {
    title: 'Walk every element',
    text: 'Most array code uses a loop with an index i from 0 to length−1, or the enhanced for loop when you only need values.'
  },
  {
    title: 'Off-by-one',
    text: 'Using <= length-1 or < length correctly is how you avoid ArrayIndexOutOfBoundsException—always tie the loop to length.'
  },
  {
    title: 'Swap & search',
    text: 'Algorithms like linear search, finding max/min, or reversing the array are practice patterns built on one-dimensional loops.'
  }
];

export default function SingleDimensionalArrayShowcase() {
  const [tab, setTab] = useState('loop');
  return (
    <div className="arr-showcase">
      <ArrayHero
        eyebrow="1D arrays"
        title="Single-dimensional arrays"
        subtitle="One index is enough: arr[i]. Master the indexed for-loop and the for-each loop; they cover most homework and interview basics."
      />
      <ArrayWhyGrid items={WHY} />

      <div className="arr-tabs">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" className={`arr-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'loop' && (
        <div className="arr-panel">
          <ArrayDiagramFrame label="Valid indexes">
            <ArrayIndexLengthDiagram />
          </ArrayDiagramFrame>
          <ArrayDiagramFrame label="Classic loop">
            <HorizontalPipeline
              title="Indexed for-loop pattern"
              fresherHint={false}
              steps={[
                { title: 'i = 0', sub: 'start at first slot' },
                { title: 'i < arr.length', sub: 'stop before index length' },
                { title: 'use arr[i]', sub: 'read or write' },
                { title: 'i++', sub: 'next slot' }
              ]}
            />
          </ArrayDiagramFrame>
        </div>
      )}

      {tab === 'foreach' && (
        <div className="arr-panel">
          <ArrayDiagramFrame label="When to use for-each">
            <HorizontalPipeline
              title="Enhanced for (read-mostly)"
              fresherHint={false}
              steps={[
                { title: 'for (T x : arr)', sub: 'x is each value' },
                { title: 'no index', sub: 'cannot resize' },
                { title: 'clean syntax', sub: 'less noise' },
                { title: 'need index?', sub: 'use indexed for' }
              ]}
            />
          </ArrayDiagramFrame>
          <ArrayCallout variant="remember" title="Limit">
            Enhanced for cannot replace elements by position (unless you use a List iterator). For reversing or swapping, keep the index loop.
          </ArrayCallout>
        </div>
      )}

      {tab === 'patterns' && (
        <div className="arr-panel">
          <ArrayDiagramFrame label="Study patterns">
            <HorizontalPipeline
              title="Typical exercises"
              fresherHint={false}
              steps={[
                { title: 'sum / average', sub: 'accumulator' },
                { title: 'max / min', sub: 'track best' },
                { title: 'linear search', sub: 'compare each' },
                { title: 'reverse', sub: 'two pointers' }
              ]}
            />
          </ArrayDiagramFrame>
          <p className="arr-caption">Do these on paper first: write indexes under each slot, then trace i step by step.</p>
        </div>
      )}
    </div>
  );
}
