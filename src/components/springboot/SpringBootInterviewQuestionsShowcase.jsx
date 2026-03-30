import { useState } from 'react';
import { SpringHero, SpringWhyGrid, SpringDiagramFrame } from './SpringBlocks';
import {
  SpringBootArchitectureStackDiagram,
  SpringBootBootstrapFlowDiagram,
  SpringBootWebRequestFlowDiagram,
  SpringBootJpaPersistenceDiagram,
  SpringBootConfigPrecedenceFlowDiagram,
  SpringBootJwtBearerScenarioDiagram,
  SpringBootOrderPaymentScenarioDiagram,
  SpringBootCacheAsideScenarioDiagram,
  HorizontalPipeline
} from '../flow/ProfessionalDiagrams';

const TABS = [
  ['stack', 'Runtime stack'],
  ['bootstrap', 'Startup'],
  ['web', 'HTTP & MVC'],
  ['data', 'JPA'],
  ['config', 'Configuration'],
  ['scenarios', 'Production scenarios']
];

const WHY = [
  {
    title: 'Explain the stack',
    text: 'Be ready to walk from @SpringBootApplication down to embedded server and JVM.'
  },
  {
    title: 'Request lifecycle',
    text: 'DispatcherServlet → controller → service → repository is a common interview thread.'
  },
  {
    title: 'Trade-offs',
    text: 'Auto-configuration vs explicit beans; JPA lazy loading; stateless security—show you understand costs.'
  }
];

export default function SpringBootInterviewQuestionsShowcase() {
  const [tab, setTab] = useState('stack');
  return (
    <div className="sb-showcase">
      <SpringHero
        eyebrow="Spring Boot · Interview"
        title="Interview questions"
        subtitle="Review architecture, REST flow, persistence, and configuration with visual anchors—then drill into your own project stories."
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
          <SpringDiagramFrame label="Big picture">
            <SpringBootArchitectureStackDiagram />
          </SpringDiagramFrame>
        </div>
      )}

      {tab === 'bootstrap' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="How the JVM starts your app">
            <SpringBootBootstrapFlowDiagram />
          </SpringDiagramFrame>
        </div>
      )}

      {tab === 'web' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="MVC request path">
            <SpringBootWebRequestFlowDiagram />
          </SpringDiagramFrame>
        </div>
      )}

      {tab === 'data' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="JPA stack">
            <SpringBootJpaPersistenceDiagram />
          </SpringDiagramFrame>
        </div>
      )}

      {tab === 'config' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="Precedence (common interview topic)">
            <SpringBootConfigPrecedenceFlowDiagram />
          </SpringDiagramFrame>
          <SpringDiagramFrame label="Themes to rehearse">
            <HorizontalPipeline
              title="Quick checklist"
              fresherHint={false}
              steps={[
                { title: 'auto-config', sub: '@Conditional*' },
                { title: 'starters', sub: 'BOM' },
                { title: 'profiles', sub: 'env-specific' },
                { title: 'fat JAR', sub: 'launcher' },
                { title: 'Actuator', sub: 'ops' }
              ]}
            />
          </SpringDiagramFrame>
        </div>
      )}

      {tab === 'scenarios' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="Explain JWT login + protected GET in interviews">
            <SpringBootJwtBearerScenarioDiagram />
          </SpringDiagramFrame>
          <SpringDiagramFrame label="Walk through checkout: controller → service → payment → DB">
            <SpringBootOrderPaymentScenarioDiagram />
          </SpringDiagramFrame>
          <SpringDiagramFrame label="Discuss cache-aside and stampede control">
            <SpringBootCacheAsideScenarioDiagram />
          </SpringDiagramFrame>
        </div>
      )}
    </div>
  );
}
