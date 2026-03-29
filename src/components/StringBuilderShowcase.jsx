import { useState } from 'react';
import { StringHero, StringWhyGrid, StringDiagramFrame, StringCallout } from './strings/StringBlocks';
import { StringConcatVsBuilderDiagram, HorizontalPipeline } from './flow/ProfessionalDiagrams';

const TABS = [
  ['problem', 'Why not + in loops'],
  ['builder', 'How to use'],
  ['capacity', 'Capacity hint']
];

const WHY = [
  {
    title: 'Fast concatenation',
    text: 'StringBuilder keeps one growable array of characters. You append many times, then call toString() once at the end.'
  },
  {
    title: 'Default for new code',
    text: 'In single-threaded apps, StringBuilder is the standard choice. It is faster than StringBuffer because it does not take locks.'
  },
  {
    title: 'Still a String at the end',
    text: 'The builder is mutable; the rest of your app usually wants an immutable String—convert when you are done building.'
  }
];

export default function StringBuilderShowcase() {
  const [tab, setTab] = useState('problem');
  return (
    <div className="str-showcase">
      <StringHero
        eyebrow="Mutable text (fast)"
        title="StringBuilder"
        subtitle="StringBuilder is the go-to when you need to assemble a large piece of text in steps—especially inside loops. It avoids creating thousands of temporary String objects."
      />
      <StringWhyGrid items={WHY} />

      <div className="str-tabs">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" className={`str-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'problem' && (
        <div className="str-panel">
          <StringDiagramFrame label="Concat vs builder">
            <StringConcatVsBuilderDiagram />
          </StringDiagramFrame>
          <StringCallout variant="tip" title="Interview line">
            “String concatenation in a loop creates O(n²) character copies; StringBuilder amortizes appends.” For beginners: many small Strings vs one buffer.
          </StringCallout>
        </div>
      )}

      {tab === 'builder' && (
        <div className="str-panel">
          <StringDiagramFrame label="Typical pattern">
            <HorizontalPipeline
              title="Build text in four steps"
              fresherHint={false}
              steps={[
                { title: 'new StringBuilder()', sub: 'empty buffer' },
                { title: 'append(...)', sub: 'add parts' },
                { title: 'optional insert', sub: 'middle edits' },
                { title: 'toString()', sub: 'final String' }
              ]}
            />
          </StringDiagramFrame>
          <p className="str-caption">You can also start with <code>new StringBuilder(&quot;Hello&quot;)</code> to preload an initial chunk of text.</p>
        </div>
      )}

      {tab === 'capacity' && (
        <div className="str-panel">
          <StringDiagramFrame label="Capacity">
            <HorizontalPipeline
              title="Optional tuning"
              fresherHint={false}
              steps={[
                { title: 'default', sub: 'starts small' },
                { title: 'grows', sub: 'when full' },
                { title: 'constructor(n)', sub: 'guess size' },
                { title: 'ensureCapacity', sub: 'rare tuning' }
              ]}
            />
          </StringDiagramFrame>
          <p className="str-caption">
            For homework-sized programs, the default growth is fine. If you know the final size (e.g. building a million-character report), a starting capacity can reduce array copies.
          </p>
        </div>
      )}
    </div>
  );
}
