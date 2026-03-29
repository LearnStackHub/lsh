import { useState } from 'react';
import { ExceptionHero, ExceptionWhyGrid, ExceptionDiagramFrame, ExceptionCallout } from './exceptions/ExceptionBlocks';
import { GlobalExceptionLayersDiagram, HorizontalPipeline } from './flow/ProfessionalDiagrams';

const TABS = [
  ['layers', 'Global handler'],
  ['benefits', 'Why centralize'],
  ['rest', 'REST-style errors']
];

const WHY = [
  {
    title: 'One policy',
    text: 'Instead of repeating try/catch in every endpoint, a global handler maps exception types to HTTP status codes and JSON bodies.'
  },
  {
    title: 'Thin controllers',
    text: 'Controllers focus on business flow; cross-cutting error formatting lives in one place (e.g. Spring @ControllerAdvice).'
  },
  {
    title: 'Consistent clients',
    text: 'Mobile and web clients see the same error shape (code, message, field), which makes debugging easier.'
  }
];

export default function GlobalExceptionHandlingShowcase() {
  const [tab, setTab] = useState('layers');
  return (
    <div className="exc-showcase">
      <ExceptionHero
        eyebrow="Web & APIs"
        title="Global exception handling"
        subtitle="In applications with many entry points, centralize how exceptions become HTTP responses or log lines. The idea is the same in Spring and other frameworks: one module owns error translation."
      />
      <ExceptionWhyGrid items={WHY} />

      <div className="exc-tabs">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" className={`exc-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'layers' && (
        <div className="exc-panel">
          <ExceptionDiagramFrame label="Layers">
            <GlobalExceptionLayersDiagram />
          </ExceptionDiagramFrame>
        </div>
      )}

      {tab === 'benefits' && (
        <div className="exc-panel">
          <ExceptionDiagramFrame label="Benefits">
            <HorizontalPipeline
              title="What you gain"
              fresherHint={false}
              steps={[
                { title: 'DRY', sub: 'no copy-paste catch' },
                { title: 'logging', sub: 'one format' },
                { title: 'security', sub: 'hide internals' },
                { title: 'i18n later', sub: 'message keys' }
              ]}
            />
          </ExceptionDiagramFrame>
        </div>
      )}

      {tab === 'rest' && (
        <div className="exc-panel">
          <ExceptionDiagramFrame label="HTTP mapping">
            <HorizontalPipeline
              title="Typical REST mapping"
              fresherHint={false}
              steps={[
                { title: 'NotFound', sub: '404' },
                { title: 'Validation', sub: '400' },
                { title: 'Conflict', sub: '409' },
                { title: 'Server', sub: '500' }
              ]}
            />
          </ExceptionDiagramFrame>
          <ExceptionCallout variant="remember" title="Core Java link">
            This topic is mostly architectural. You still need solid try/catch/throws skills from the earlier lessons—global handlers sit on top.
          </ExceptionCallout>
        </div>
      )}
    </div>
  );
}
