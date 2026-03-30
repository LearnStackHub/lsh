import { useState } from 'react';
import { SpringHero, SpringWhyGrid, SpringDiagramFrame, SpringCallout } from './SpringBlocks';
import {
  GlobalExceptionLayersDiagram,
  SpringBootExceptionAdviceFlowDiagram,
  SpringBootValidationDecisionFlowDiagram,
  HorizontalPipeline
} from '../flow/ProfessionalDiagrams';

const TABS = [
  ['layers', 'Layered throws'],
  ['advice', '@ControllerAdvice path'],
  ['validation', '400 vs handler'],
  ['handler', 'Handler flow'],
  ['response', 'Response body']
];

const WHY = [
  {
    title: '@ControllerAdvice',
    text: 'Centralize exception-to-HTTP mapping so controllers stay thin and clients get consistent error bodies.'
  },
  {
    title: 'Domain vs HTTP',
    text: 'Throw business exceptions inside services; translate them to status codes at the edge.'
  },
  {
    title: 'Validation errors',
    text: 'Bind exceptions from @Valid to field-level messages for 400 responses.'
  }
];

export default function SpringBootExceptionHandlingShowcase() {
  const [tab, setTab] = useState('layers');
  return (
    <div className="sb-showcase">
      <SpringHero
        eyebrow="Spring Boot · REST"
        title="Exception handling"
        subtitle="Map exceptions to HTTP responses with @ControllerAdvice, keep stack traces server-side, and return structured error payloads."
      />
      <SpringWhyGrid items={WHY} />

      <div className="sb-tabs">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" className={`sb-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'layers' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="Where exceptions originate">
            <GlobalExceptionLayersDiagram />
          </SpringDiagramFrame>
        </div>
      )}

      {tab === 'advice' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="Global handler flowchart">
            <SpringBootExceptionAdviceFlowDiagram />
          </SpringDiagramFrame>
        </div>
      )}

      {tab === 'validation' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="Validation: success vs 400">
            <SpringBootValidationDecisionFlowDiagram />
          </SpringDiagramFrame>
        </div>
      )}

      {tab === 'handler' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="Exception bubbles to advice">
            <HorizontalPipeline
              title="Dispatch to @ExceptionHandler"
              fresherHint={false}
              steps={[
                { title: 'throw in layer', sub: 'service / ctrl' },
                { title: 'propagate', sub: 'DispatcherServlet' },
                { title: 'match handler', sub: 'by exception type' },
                { title: 'ResponseEntity', sub: 'status + body' }
              ]}
            />
          </SpringDiagramFrame>
        </div>
      )}

      {tab === 'response' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="API error contract">
            <HorizontalPipeline
              title="Structured error DTO"
              fresherHint={false}
              steps={[
                { title: 'timestamp', sub: 'ISO-8601' },
                { title: 'path', sub: 'request URI' },
                { title: 'code', sub: 'app-specific' },
                { title: 'details', sub: 'optional fields' },
                { title: 'trace id', sub: 'support correlation' }
              ]}
            />
          </SpringDiagramFrame>
          <SpringCallout variant="remember" title="Logging">
            Log exception id + message at ERROR; include correlation id for support.
          </SpringCallout>
        </div>
      )}
    </div>
  );
}
