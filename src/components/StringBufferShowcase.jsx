import { useState } from 'react';
import { StringHero, StringWhyGrid, StringDiagramFrame, StringCallout } from './strings/StringBlocks';
import { StringBufferVsBuilderDiagram, HorizontalPipeline } from './flow/ProfessionalDiagrams';

const TABS = [
  ['idea', 'Why StringBuffer'],
  ['threads', 'Thread safety'],
  ['api', 'Typical use']
];

const WHY = [
  {
    title: 'Mutable buffer',
    text: 'StringBuffer holds an internal character array that can grow. You append, insert, or delete without building a new String every time.'
  },
  {
    title: 'Synchronized',
    text: 'Its methods coordinate so two threads do not corrupt the same buffer at once. That safety has a small cost versus StringBuilder.'
  },
  {
    title: 'Legacy & libraries',
    text: 'You still see StringBuffer in older code and some APIs. New single-threaded code usually prefers StringBuilder unless sharing across threads.'
  }
];

export default function StringBufferShowcase() {
  const [tab, setTab] = useState('idea');
  return (
    <div className="str-showcase">
      <StringHero
        eyebrow="Mutable text (thread-safe)"
        title="StringBuffer"
        subtitle="Use StringBuffer when multiple threads might append to the same mutable text buffer. It is like StringBuilder, but methods are synchronized so they are safe under concurrent access."
      />
      <StringWhyGrid items={WHY} />

      <div className="str-tabs">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" className={`str-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'idea' && (
        <div className="str-panel">
          <StringDiagramFrame label="Buffer vs Builder">
            <StringBufferVsBuilderDiagram />
          </StringDiagramFrame>
          <p className="str-caption">If only one thread touches your builder, StringBuilder is the usual choice. Reach for StringBuffer when the same instance is shared without external locking.</p>
        </div>
      )}

      {tab === 'threads' && (
        <div className="str-panel">
          <StringDiagramFrame label="What synchronization means">
            <HorizontalPipeline
              title="Rough thread picture"
              fresherHint={false}
              steps={[
                { title: 'Thread A', sub: 'wants append' },
                { title: 'lock', sub: 'only one at a time' },
                { title: 'Thread B', sub: 'waits its turn' },
                { title: 'safe result', sub: 'no torn text' }
              ]}
            />
          </StringDiagramFrame>
          <StringCallout variant="remember" title="Simple rule">
            Shared mutable buffer + multiple threads → consider StringBuffer or other synchronization. One thread → StringBuilder is enough.
          </StringCallout>
        </div>
      )}

      {tab === 'api' && (
        <div className="str-panel">
          <StringDiagramFrame label="Common calls">
            <HorizontalPipeline
              title="StringBuffer operations"
              fresherHint={false}
              steps={[
                { title: 'append(...)', sub: 'add text' },
                { title: 'insert(i, ...)', sub: 'put in middle' },
                { title: 'delete / reverse', sub: 'edit buffer' },
                { title: 'toString()', sub: 'final String' }
              ]}
            />
          </StringDiagramFrame>
          <p className="str-caption">The API mirrors StringBuilder. After you finish, call <code>toString()</code> to get an immutable String for the rest of your program.</p>
        </div>
      )}
    </div>
  );
}
