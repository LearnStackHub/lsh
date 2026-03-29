import { useState } from 'react';
import { ArrayHero, ArrayWhyGrid, ArrayDiagramFrame, ArrayCallout } from './arrays/ArrayBlocks';
import { ArrayUtilityMethodsDiagram, HorizontalPipeline } from './flow/ProfessionalDiagrams';

const TABS = [
  ['map', 'Arrays class map'],
  ['sort', 'Sort & search'],
  ['copy', 'Copy & compare']
];

const WHY = [
  {
    title: 'Static helpers',
    text: 'java.util.Arrays provides ready-made utilities. You call Arrays.sort(arr)—you do not create an instance of Arrays.'
  },
  {
    title: 'Sort before binary search',
    text: 'binarySearch expects a sorted array. If data is unsorted, sort first or you get meaningless positions.'
  },
  {
    title: 'deepEquals for nested',
    text: 'For int[][] use deepEquals to compare contents; plain equals on array references is usually wrong.'
  }
];

export default function ArrayMethodsShowcase() {
  const [tab, setTab] = useState('map');
  return (
    <div className="arr-showcase">
      <ArrayHero
        eyebrow="java.util.Arrays"
        title="Array methods (utility class)"
        subtitle="The Arrays class is a collection of static helpers: sort, fill, copy, compare, and more. It works alongside loops—you still need to understand indexes, but you avoid reinventing standard algorithms."
      />
      <ArrayWhyGrid items={WHY} />

      <div className="arr-tabs">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" className={`arr-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'map' && (
        <div className="arr-panel">
          <ArrayDiagramFrame label="Method groups">
            <ArrayUtilityMethodsDiagram />
          </ArrayDiagramFrame>
        </div>
      )}

      {tab === 'sort' && (
        <div className="arr-panel">
          <ArrayDiagramFrame label="Sort then search">
            <HorizontalPipeline
              title="Typical sort + search flow"
              fresherHint={false}
              steps={[
                { title: 'Arrays.sort(arr)', sub: 'ascending default' },
                { title: 'sorted data', sub: 'precondition' },
                { title: 'binarySearch', sub: 'index or negative' },
                { title: 'read docs', sub: 'return value rules' }
              ]}
            />
          </ArrayDiagramFrame>
          <ArrayCallout variant="watch" title="Read the contract">
            binarySearch returns a negative insertion point when the key is missing—do not assume −1 always means “not found” without checking the API.
          </ArrayCallout>
        </div>
      )}

      {tab === 'copy' && (
        <div className="arr-panel">
          <ArrayDiagramFrame label="Copy & equality">
            <HorizontalPipeline
              title="Copy vs compare"
              fresherHint={false}
              steps={[
                { title: 'copyOf', sub: 'trim or pad' },
                { title: 'copyOfRange', sub: 'slice segment' },
                { title: 'equals', sub: '1D content' },
                { title: 'deepEquals', sub: 'nested arrays' }
              ]}
            />
          </ArrayDiagramFrame>
          <p className="arr-caption">
            <code>System.arraycopy</code> is another option for raw copies—Arrays.copyOf is often easier for beginners.
          </p>
        </div>
      )}
    </div>
  );
}
