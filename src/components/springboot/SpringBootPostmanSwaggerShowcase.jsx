import { useState } from 'react';
import { SpringHero, SpringWhyGrid, SpringDiagramFrame, SpringCallout } from './SpringBlocks';
import {
  SpringBootOpenApiDocFlowDiagram,
  SpringBootWebRequestFlowDiagram,
  SpringBootStartersDiagram,
  HorizontalPipeline
} from '../flow/ProfessionalDiagrams';

const TABS = [
  ['openapi', 'OpenAPI pipeline'],
  ['surface', 'Controller surface'],
  ['postman', 'Postman workflow'],
  ['contract', 'Contract-first'],
  ['starter', 'Dependencies']
];

const WHY = [
  {
    title: 'springdoc-openapi',
    text: 'Generates Swagger UI and OpenAPI JSON from your controllers—great for teams and frontend handoff.'
  },
  {
    title: 'Postman collections',
    text: 'Import OpenAPI to get requests, environments, and automated tests against your running app.'
  },
  {
    title: 'Single source of truth',
    text: 'Keep annotations or YAML aligned with real behavior—drifted docs erode trust.'
  }
];

export default function SpringBootPostmanSwaggerShowcase() {
  const [tab, setTab] = useState('openapi');
  return (
    <div className="sb-showcase">
      <SpringHero
        eyebrow="Spring Boot · API tooling"
        title="Postman & Swagger"
        subtitle="Document and exercise your REST API with OpenAPI, Swagger UI, and API clients like Postman."
      />
      <SpringWhyGrid items={WHY} />

      <div className="sb-tabs">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" className={`sb-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'openapi' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="Docs flowchart">
            <SpringBootOpenApiDocFlowDiagram />
          </SpringDiagramFrame>
        </div>
      )}

      {tab === 'surface' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="What springdoc describes">
            <SpringBootWebRequestFlowDiagram />
          </SpringDiagramFrame>
        </div>
      )}

      {tab === 'postman' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="Import and test">
            <HorizontalPipeline
              title="Design → test in Postman"
              fresherHint={false}
              steps={[
                { title: '/v3/api-docs', sub: 'fetch JSON' },
                { title: 'Import OpenAPI', sub: 'collection' },
                { title: 'Environments', sub: 'base URL + auth' },
                { title: 'Tests', sub: 'assertions' },
                { title: 'CI Newman', sub: 'optional' }
              ]}
            />
          </SpringDiagramFrame>
        </div>
      )}

      {tab === 'contract' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="Contract-first alternative">
            <HorizontalPipeline
              title="Design then implement"
              fresherHint={false}
              steps={[
                { title: 'openapi.yaml', sub: 'design' },
                { title: 'codegen', sub: 'interfaces' },
                { title: 'implement', sub: 'controllers' },
                { title: 'verify', sub: 'contract tests' }
              ]}
            />
          </SpringDiagramFrame>
          <SpringCallout variant="remember" title="Security">
            Do not expose admin or internal endpoints in public Swagger in production without auth.
          </SpringCallout>
        </div>
      )}

      {tab === 'starter' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="Typical dependency">
            <SpringBootStartersDiagram />
          </SpringDiagramFrame>
          <p className="sb-caption">Add <code>springdoc-openapi-starter-webmvc-ui</code> (or WebFlux variant) alongside <code>spring-boot-starter-web</code>.</p>
        </div>
      )}
    </div>
  );
}
