import { useState } from 'react';
import { SpringFrameworkHero, SpringFrameworkWhyGrid, SpringFrameworkDiagramFrame } from './SpringFrameworkBlocks';
import {
  SpringFrameworkIocContainerDiagram,
  SpringFrameworkContextRefreshDiagram,
  SpringFrameworkModulesOverviewDiagram,
  SpringFrameworkApplicationContextBootstrapScenarioDiagram,
  HorizontalPipeline
} from '../flow/ProfessionalDiagrams';

const TABS = [
  ['container', 'IoC container'],
  ['refresh', 'Context refresh'],
  ['bootstrap', 'Real-time bootstrap'],
  ['modules', 'Where IoC lives'],
  ['patterns', 'Common patterns']
];

const WHY = [
  {
    title: 'Hollywood principle',
    text: "Don't call us, we'll call you—the framework instantiates and wires objects."
  },
  {
    title: 'Testability',
    text: 'Swap implementations via configuration or mocks without changing consumer code.'
  },
  {
    title: 'Single place for wiring',
    text: 'Centralized configuration beats scattered `new` calls across packages.'
  }
];

export default function SpringFrameworkIOCShowcase() {
  const [tab, setTab] = useState('container');
  return (
    <div className="sf-showcase">
      <SpringFrameworkHero
        eyebrow="Spring Framework · Core"
        title="Inversion of Control (IoC)"
        subtitle="Let the container own object creation and dependency graphs so your classes focus on behavior, not construction."
      />
      <SpringFrameworkWhyGrid items={WHY} />
      <div className="sf-tabs">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" className={`sf-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>
      {tab === 'container' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="ApplicationContext">
            <SpringFrameworkIocContainerDiagram />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'refresh' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="Startup sequence">
            <SpringFrameworkContextRefreshDiagram />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'bootstrap' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="Starting the container without Spring Boot">
            <SpringFrameworkApplicationContextBootstrapScenarioDiagram />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'modules' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="Core container in the big picture">
            <SpringFrameworkModulesOverviewDiagram />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'patterns' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="Typical bean roles">
            <HorizontalPipeline
              title="Stereotypes"
              fresherHint={false}
              steps={[
                { title: '@Component', sub: 'generic' },
                { title: '@Service', sub: 'business' },
                { title: '@Repository', sub: 'persistence' },
                { title: '@Controller', sub: 'web' }
              ]}
            />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
    </div>
  );
}
