import { useState } from 'react';
import { SpringHero, SpringWhyGrid, SpringDiagramFrame, SpringCallout } from './SpringBlocks';
import {
  SpringBootWebRequestFlowDiagram,
  SpringBootSecurityFilterDiagram,
  SpringBootOpenApiDocFlowDiagram,
  SpringBootOrderPaymentScenarioDiagram,
  HorizontalPipeline
} from '../flow/ProfessionalDiagrams';

const TABS = [
  ['flow', 'Full request path'],
  ['filters', 'Security filters'],
  ['rest', 'REST design'],
  ['errors', 'HTTP errors'],
  ['openapi', 'Docs & clients'],
  ['checkout', 'Real scenario: checkout']
];

const WHY = [
  {
    title: '@RestController',
    text: 'Combines @Controller + @ResponseBody—return objects that become JSON via HttpMessageConverters.'
  },
  {
    title: 'Mapping',
    text: '@GetMapping, @PostMapping, etc. bind HTTP verbs and paths to methods; path variables and request bodies are injected automatically.'
  },
  {
    title: 'Status codes',
    text: 'Use ResponseEntity or @ResponseStatus for correct HTTP semantics (201, 204, 404).'
  }
];

export default function SpringBootRestAPIShowcase() {
  const [tab, setTab] = useState('flow');
  return (
    <div className="sb-showcase">
      <SpringHero
        eyebrow="Spring Boot · REST"
        title="REST API development"
        subtitle="Build HTTP APIs with Spring MVC: map URLs to controller methods, serialize JSON, and return meaningful status codes."
      />
      <SpringWhyGrid items={WHY} />

      <div className="sb-tabs">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" className={`sb-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'flow' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="DispatcherServlet through layers">
            <SpringBootWebRequestFlowDiagram />
          </SpringDiagramFrame>
        </div>
      )}

      {tab === 'filters' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="Filters run before your controller">
            <SpringBootSecurityFilterDiagram />
          </SpringDiagramFrame>
          <p className="sb-caption">Even “public” endpoints pass through the chain unless you configure <code>permitAll</code> or custom rules.</p>
        </div>
      )}

      {tab === 'rest' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="Resource-oriented API">
            <HorizontalPipeline
              title="REST building blocks"
              fresherHint={false}
              steps={[
                { title: 'Resource paths', sub: '/orders/{id}' },
                { title: 'HTTP verbs', sub: 'GET POST PUT PATCH DELETE' },
                { title: 'DTOs', sub: 'request / response' },
                { title: 'Status + Location', sub: '201 + URI' },
                { title: 'Versioning', sub: 'header / path' }
              ]}
            />
          </SpringDiagramFrame>
        </div>
      )}

      {tab === 'errors' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="Consistent error responses">
            <HorizontalPipeline
              title="Problem details pipeline"
              fresherHint={false}
              steps={[
                { title: '4xx client', sub: 'validation' },
                { title: '5xx server', sub: 'unexpected' },
                { title: '@ControllerAdvice', sub: 'global map' },
                { title: 'RFC 7807', sub: 'optional standard' }
              ]}
            />
          </SpringDiagramFrame>
          <SpringCallout variant="watch" title="Security">
            Do not leak stack traces to clients in production; log server-side only.
          </SpringCallout>
        </div>
      )}

      {tab === 'openapi' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="Expose machine-readable API description">
            <SpringBootOpenApiDocFlowDiagram />
          </SpringDiagramFrame>
        </div>
      )}

      {tab === 'checkout' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="E-commerce style POST /orders (happy path)">
            <SpringBootOrderPaymentScenarioDiagram />
          </SpringDiagramFrame>
        </div>
      )}
    </div>
  );
}
