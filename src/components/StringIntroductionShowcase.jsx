import { useState } from 'react';
import { StringHero, StringWhyGrid, StringDiagramFrame, StringCallout } from './strings/StringBlocks';
import {
  StringImmutabilityDiagram,
  StringPoolHeapDiagram,
  HorizontalPipeline
} from './flow/ProfessionalDiagrams';

const TABS = [
  ['immutable', 'Immutability'],
  ['pool', 'Pool vs heap'],
  ['create', 'Creating strings']
];

const WHY = [
  {
    title: 'Text everywhere',
    text: 'User names, passwords, file paths, and JSON are all text. The String type is how Java stores character sequences safely and clearly.'
  },
  {
    title: 'Cannot mutate in place',
    text: 'Once a String object exists, its characters are fixed. “Changing” text means creating a new String (or using StringBuilder for heavy edits).'
  },
  {
    title: 'equals() not ==',
    text: 'For comparing the letters inside two strings, use equals(). == compares references, which is easy to get wrong with new String(...).'
  }
];

export default function StringIntroductionShowcase() {
  const [tab, setTab] = useState('immutable');
  return (
    <div className="str-showcase">
      <StringHero
        eyebrow="Java text basics"
        title="Introduction to Strings"
        subtitle="A String is an object that holds a sequence of characters. It is immutable: you do not edit letters in memory—you replace references with new String objects when the text changes."
      />
      <StringWhyGrid items={WHY} />

      <div className="str-tabs">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" className={`str-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'immutable' && (
        <div className="str-panel">
          <StringDiagramFrame label="String immutability">
            <StringImmutabilityDiagram />
          </StringDiagramFrame>
          <p className="str-caption">Assignment with + or concat does not “patch” the old object—it produces a new one. That is the main reason loops that do <code>s = s + x</code> can be slow.</p>
          <StringCallout variant="tip" title="Memory picture">
            Picture each String as a frozen snapshot of characters. Your variable is just a label pointing at the latest snapshot.
          </StringCallout>
        </div>
      )}

      {tab === 'pool' && (
        <div className="str-panel">
          <StringDiagramFrame label="String pool and heap">
            <StringPoolHeapDiagram />
          </StringDiagramFrame>
          <p className="str-caption">
            The pool is an optimization for literals. <code>new String(&quot;Hi&quot;)</code> still creates a heap object even if &quot;Hi&quot; also exists in the pool—so prefer literals when you do not need a guaranteed new object.
          </p>
        </div>
      )}

      {tab === 'create' && (
        <div className="str-panel">
          <StringDiagramFrame label="Ways to create text">
            <HorizontalPipeline
              title="Two common ways to get a String"
              fresherHint={false}
              steps={[
                { title: 'Literal', sub: 'String s = "Hi";' },
                { title: 'new String(...)', sub: 'separate heap object' },
                { title: 'From other APIs', sub: 'valueOf, join, etc.' }
              ]}
            />
          </StringDiagramFrame>
          <p className="str-caption">
            For normal code, literals are simplest. Use <code>new String</code> when an API requires it (rare for beginners). Later you will build text with <code>StringBuilder</code> and then call <code>toString()</code>.
          </p>
        </div>
      )}
    </div>
  );
}
