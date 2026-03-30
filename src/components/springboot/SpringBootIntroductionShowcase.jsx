import { useState } from 'react';
import { SpringHero, SpringWhyGrid, SpringDiagramFrame, SpringCallout } from './SpringBlocks';
import {
  SpringBootArchitectureStackDiagram,
  SpringBootStartersDiagram,
  SpringBootBootstrapFlowDiagram,
  SpringBootWebRequestFlowDiagram,
  SpringBootJwtBearerScenarioDiagram,
  HorizontalPipeline
} from '../flow/ProfessionalDiagrams';

const TABS = [
  ['stack', 'Runtime stack'],
  ['starters', 'Starters & BOM'],
  ['bootstrap', 'Startup flow'],
  ['request', 'HTTP path'],
  ['layers', 'Typical layers'],
  ['jwt', 'Real scenario: JWT']
];

const WHY = [
  {
    title: 'Convention over configuration',
    text: 'Sensible defaults and auto-configuration mean you ship features faster; override only what your business needs.'
  },
  {
    title: 'Production-ready defaults',
    text: 'Embedded servers, metrics, and health endpoints are easy to add—operations teams get observability without extra glue code.'
  },
  {
    title: 'Ecosystem fit',
    text: 'Spring Boot builds on Spring Framework—IoC, MVC, Data, Security—so skills transfer across enterprise Java projects.'
  }
];

export default function SpringBootIntroductionShowcase() {
  const [tab, setTab] = useState('stack');
  return (
    <div className="sb-showcase">
      <SpringHero
        eyebrow="Spring Boot · Basics"
        title="Introduction to Spring Boot"
        subtitle="Spring Boot is an opinionated layer on the Spring Framework: starters, auto-configuration, and embedded servers let you build production-grade apps with minimal boilerplate."
      />
      <SpringWhyGrid items={WHY} />

      <div className="sb-tabs">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" className={`sb-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'stack' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="Architecture stack">
            <SpringBootArchitectureStackDiagram />
          </SpringDiagramFrame>
        </div>
      )}

      {tab === 'starters' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="Starter dependencies">
            <SpringBootStartersDiagram />
          </SpringDiagramFrame>
          <SpringCallout variant="tip" title="Maven / Gradle">
            The <code>spring-boot-starter-parent</code> BOM (or Gradle plugin) pins versions so transitive dependencies stay compatible.
          </SpringCallout>
        </div>
      )}

      {tab === 'bootstrap' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="Bootstrap sequence">
            <SpringBootBootstrapFlowDiagram />
          </SpringDiagramFrame>
        </div>
      )}

      {tab === 'request' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="One HTTP request through the stack">
            <SpringBootWebRequestFlowDiagram />
          </SpringDiagramFrame>
        </div>
      )}

      {tab === 'layers' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="Code organization in a typical app">
            <HorizontalPipeline
              title="Request travels through layers"
              fresherHint={false}
              steps={[
                { title: 'Controller', sub: 'HTTP in/out' },
                { title: 'Service', sub: 'rules & transactions' },
                { title: 'Repository', sub: 'persistence' },
                { title: 'Domain + DTOs', sub: 'models' }
              ]}
            />
          </SpringDiagramFrame>
        </div>
      )}

      {tab === 'jwt' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="Stateless API — login then Bearer requests">
            <SpringBootJwtBearerScenarioDiagram />
          </SpringDiagramFrame>
        </div>
      )}
    </div>
  );
}
