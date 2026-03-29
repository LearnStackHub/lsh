import { useState } from 'react';
import { ArrayHero, ArrayWhyGrid, ArrayDiagramFrame, ArrayCallout } from './arrays/ArrayBlocks';
import { ArrayIndexLengthDiagram, ArrayDefaultValuesDiagram, HorizontalPipeline } from './flow/ProfessionalDiagrams';

const TABS = [
  ['index', 'Index vs length'],
  ['defaults', 'Default values'],
  ['create', 'Ways to create']
];

const WHY = [
  {
    title: 'Fixed-size list',
    text: 'An array stores many values of the same type in one block. Its length is set when you create it and does not grow like ArrayList.'
  },
  {
    title: 'Zero-based index',
    text: 'The first slot is index 0, not 1. The last index is always length − 1—this is the most common mistake on exams.'
  },
  {
    title: 'Fast access',
    text: 'Reading or writing arr[i] by index is very fast. That is why arrays are still used inside many algorithms and inside the Java collections you will learn later.'
  }
];

export default function ArrayIntroductionShowcase() {
  const [tab, setTab] = useState('index');
  return (
    <div className="arr-showcase">
      <ArrayHero
        eyebrow="Core Java · Arrays"
        title="Introduction to arrays"
        subtitle="An array is a numbered row of variables of the same type. You pick a slot with an index in square brackets. Length tells you how many slots exist; indexes always start at zero."
      />
      <ArrayWhyGrid items={WHY} />

      <div className="arr-tabs">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" className={`arr-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'index' && (
        <div className="arr-panel">
          <ArrayDiagramFrame label="Indexes and length">
            <ArrayIndexLengthDiagram />
          </ArrayDiagramFrame>
          <ArrayCallout variant="tip" title="Quick check">
            If <code>n = arr.length</code>, the loop <code>for (int i = 0; i &lt; n; i++)</code> visits every element exactly once.
          </ArrayCallout>
        </div>
      )}

      {tab === 'defaults' && (
        <div className="arr-panel">
          <ArrayDiagramFrame label="Defaults after new">
            <ArrayDefaultValuesDiagram />
          </ArrayDiagramFrame>
          <p className="arr-caption">Local variables must be assigned before use—array slots from <code>new</code> already have a default.</p>
        </div>
      )}

      {tab === 'create' && (
        <div className="arr-panel">
          <ArrayDiagramFrame label="Creating arrays">
            <HorizontalPipeline
              title="Three common creation patterns"
              fresherHint={false}
              steps={[
                { title: 'new int[5]', sub: 'five slots, defaults' },
                { title: 'Literal', sub: '{1,2,3} — size inferred' },
                { title: 'Anonymous', sub: 'new int[]{1,2,3}' }
              ]}
            />
          </ArrayDiagramFrame>
          <p className="arr-caption">The compiler counts literals for you. <code>int[] a = new int[0];</code> is valid: an empty array.</p>
        </div>
      )}
    </div>
  );
}
