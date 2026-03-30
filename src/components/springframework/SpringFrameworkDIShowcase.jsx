import { useState } from 'react';
import { SpringFrameworkHero, SpringFrameworkWhyGrid, SpringFrameworkDiagramFrame, SpringFrameworkCallout } from './SpringFrameworkBlocks';
import {
  SpringFrameworkInjectionStylesDiagram,
  SpringFrameworkIocContainerDiagram,
  HorizontalPipeline
} from '../flow/ProfessionalDiagrams';

const TABS = [
  ['styles', 'Injection styles'],
  ['wiring', 'Who wires whom'],
  ['best', 'Best practices'],
  ['compare', 'Compare']
];

const WHY = [
  {
    title: 'Interfaces',
    text: 'Depend on abstractions; the container injects concrete implementations.'
  },
  {
    title: 'Explicit dependencies',
    text: 'Constructor injection documents required collaborators in the signature.'
  },
  {
    title: 'Framework integration',
    text: '@Autowired (or constructor injection) connects beans after the context parses configuration.'
  }
];

export default function SpringFrameworkDIShowcase() {
  const [tab, setTab] = useState('styles');
  return (
    <div className="sf-showcase">
      <SpringFrameworkHero
        eyebrow="Spring Framework · Core"
        title="Dependency Injection"
        subtitle="Spring injects collaborators into your beans so classes stay focused on logic, not object graph construction."
      />
      <SpringFrameworkWhyGrid items={WHY} />
      <div className="sf-tabs">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" className={`sf-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>
      {tab === 'styles' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="Constructor, setter, field">
            <SpringFrameworkInjectionStylesDiagram />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'wiring' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="Container resolves dependencies">
            <SpringFrameworkIocContainerDiagram />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'best' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="Recommended default">
            <HorizontalPipeline
              title="Prefer constructor injection"
              fresherHint={false}
              steps={[
                { title: 'final fields', sub: 'immutable' },
                { title: 'clear API', sub: 'required deps' },
                { title: 'unit tests', sub: 'new Service(mock)' },
                { title: 'circular deps', sub: 'fail fast' }
              ]}
            />
          </SpringFrameworkDiagramFrame>
          <SpringFrameworkCallout variant="remember" title="Circular references">
            Spring can sometimes break cycles with proxies; still better to refactor than rely on this.
          </SpringFrameworkCallout>
        </div>
      )}
      {tab === 'compare' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="XML vs annotations for DI">
            <HorizontalPipeline
              title="Modern apps"
              fresherHint={false}
              steps={[
                { title: 'Annotations', sub: '@Autowired' },
                { title: 'Java config', sub: '@Bean' },
                { title: 'XML', sub: 'legacy / third-party' },
                { title: 'Mix', sub: 'during migration' }
              ]}
            />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
    </div>
  );
}
