import { useState } from 'react';
import { ExceptionHero, ExceptionWhyGrid, ExceptionDiagramFrame, ExceptionCallout } from './exceptions/ExceptionBlocks';
import { CustomExceptionClassDiagram, HorizontalPipeline } from './flow/ProfessionalDiagrams';

const TABS = [
  ['class', 'class shape'],
  ['checked', 'Checked choice'],
  ['use', 'When to throw']
];

const WHY = [
  {
    title: 'Name the failure',
    text: 'Custom exceptions make your domain visible: InvalidAgeException reads better than a generic IllegalArgumentException with a long message.'
  },
  {
    title: 'Extend Exception or Runtime',
    text: 'Extend Exception if you want callers forced to handle; extend RuntimeException if you want optional handling (like validation bugs).'
  },
  {
    title: 'Constructors forward message',
    text: 'Call super(message) so getMessage() and stack traces stay useful for debugging.'
  }
];

export default function CustomExceptionsShowcase() {
  const [tab, setTab] = useState('class');
  return (
    <div className="exc-showcase">
      <ExceptionHero
        eyebrow="Domain errors"
        title="Custom exceptions"
        subtitle="Define your own exception class when standard types do not describe your business rule. Keep it small: extend the right base, add constructors, then throw where validation fails."
      />
      <ExceptionWhyGrid items={WHY} />

      <div className="exc-tabs">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" className={`exc-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'class' && (
        <div className="exc-panel">
          <ExceptionDiagramFrame label="Typical custom class">
            <CustomExceptionClassDiagram />
          </ExceptionDiagramFrame>
        </div>
      )}

      {tab === 'checked' && (
        <div className="exc-panel">
          <ExceptionDiagramFrame label="Choose base type">
            <HorizontalPipeline
              title="Exception vs RuntimeException"
              fresherHint={false}
              steps={[
                { title: 'extends Exception', sub: 'checked — caller must handle' },
                { title: 'extends RuntimeException', sub: 'unchecked — optional' },
                { title: 'API design', sub: 'recoverable vs bug' },
                { title: 'team rules', sub: 'be consistent' }
              ]}
            />
          </ExceptionDiagramFrame>
        </div>
      )}

      {tab === 'use' && (
        <div className="exc-panel">
          <ExceptionDiagramFrame label="Throwing pattern">
            <HorizontalPipeline
              title="When to throw custom"
              fresherHint={false}
              steps={[
                { title: 'validate input', sub: 'if invalid' },
                { title: 'throw new', sub: 'your type' },
                { title: 'caller catches', sub: 'or declares' },
                { title: 'map to UI', sub: 'message / code' }
              ]}
            />
          </ExceptionDiagramFrame>
          <ExceptionCallout variant="tip" title="Libraries">
            Frameworks often wrap low-level exceptions in their own types—same idea: one clear type per failure mode.
          </ExceptionCallout>
        </div>
      )}
    </div>
  );
}
