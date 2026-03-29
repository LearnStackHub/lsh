import { useState } from 'react';
import { StringHero, StringWhyGrid, StringDiagramFrame, StringCallout } from './strings/StringBlocks';
import { StringMethodCategoriesDiagram, HorizontalPipeline } from './flow/ProfessionalDiagrams';

const TABS = [
  ['map', 'Method map'],
  ['compare', 'Compare safely'],
  ['search', 'Search & slice']
];

const WHY = [
  {
    title: 'One type, many helpers',
    text: 'String bundles dozens of helpers so you can measure length, find substrings, compare safely, and clean user input without writing everything by hand.'
  },
  {
    title: 'Indexes start at 0',
    text: 'The first character is index 0. charAt(0) is the first letter; invalid indexes throw StringIndexOutOfBoundsException.'
  },
  {
    title: 'Prefer equals for text',
    text: 'Use equals() or equalsIgnoreCase() to compare meaning. == only checks whether two references point at the same object.'
  }
];

export default function StringMethodsShowcase() {
  const [tab, setTab] = useState('map');
  return (
    <div className="str-showcase">
      <StringHero
        eyebrow="String API"
        title="String methods"
        subtitle="Methods are grouped by job: read characters, compare text, search inside a string, or produce a new string (trim, case change, replace). None of them mutate the original String."
      />
      <StringWhyGrid items={WHY} />

      <div className="str-tabs">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" className={`str-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'map' && (
        <div className="str-panel">
          <StringDiagramFrame label="Method categories">
            <StringMethodCategoriesDiagram />
          </StringDiagramFrame>
          <p className="str-caption">Use this map when you know your goal (e.g. “find if it contains @”) and look up the matching group in the Java docs.</p>
        </div>
      )}

      {tab === 'compare' && (
        <div className="str-panel">
          <StringDiagramFrame label="Safe comparison">
            <HorizontalPipeline
              title="Compare text the right way"
              fresherHint={false}
              steps={[
                { title: 'equals()', sub: 'same letters' },
                { title: 'equalsIgnoreCase()', sub: 'ignore A vs a' },
                { title: 'compareTo()', sub: 'sort order' },
                { title: 'avoid ==', sub: 'reference trap' }
              ]}
            />
          </StringDiagramFrame>
          <StringCallout variant="watch" title="Exam trap">
            <code>&quot;a&quot; == &quot;a&quot;</code> can be true because of pooling, but <code>new String(&quot;a&quot;) == &quot;a&quot;</code> is false. Always use <code>equals</code> for business logic.
          </StringCallout>
        </div>
      )}

      {tab === 'search' && (
        <div className="str-panel">
          <StringDiagramFrame label="Search and extract">
            <HorizontalPipeline
              title="Typical search flow"
              fresherHint={false}
              steps={[
                { title: 'trim()', sub: 'remove spaces' },
                { title: 'contains / indexOf', sub: 'find needle' },
                { title: 'substring', sub: 'cut a range' },
                { title: 'split', sub: 'into parts' }
              ]}
            />
          </StringDiagramFrame>
          <p className="str-caption">
            <code>substring(begin)</code> and <code>substring(begin, end)</code> follow the half-open rule: the end index is exclusive. Double-check API docs when you practice.
          </p>
        </div>
      )}
    </div>
  );
}
