import { useState } from 'react';
import {
  SpringFrameworkHero,
  SpringFrameworkWhyGrid,
  SpringFrameworkDiagramFrame,
  SpringFrameworkCallout
} from './SpringFrameworkBlocks';
import {
  SpringFrameworkModulesOverviewDiagram,
  SpringFrameworkIocContainerDiagram,
  SpringFrameworkMvcLayeredScenarioDiagram,
  SpringFrameworkWarDeploymentScenarioDiagram,
  HorizontalPipeline
} from '../flow/ProfessionalDiagrams';

const TABS = [
  ['modules', 'Modules'],
  ['ioc', 'IoC preview'],
  ['scenario', 'MVC scenario'],
  ['war', 'WAR deployment'],
  ['learn', 'Learning path']
];

const WHY = [
  {
    title: 'Enterprise Java backbone',
    text: 'Spring Framework provides IoC, declarative transactions, MVC, JDBC helpers, and AOP—used in most Java backends.'
  },
  {
    title: 'Composable',
    text: 'Use Core only, or add Web MVC, Spring Data, and AOP as your app grows.'
  },
  {
    title: 'Spring Boot builds on it',
    text: 'Spring Boot auto-configures the same primitives you learn here—mastering the Framework makes Boot clearer.'
  }
];

export default function SpringFrameworkIntroductionShowcase() {
  const [tab, setTab] = useState('modules');
  return (
    <div className="sf-showcase">
      <SpringFrameworkHero
        eyebrow="Spring Framework · Overview"
        title="Introduction"
        subtitle="Spring Framework is a mature programming and configuration model for Java: Inversion of Control, portable service abstractions, and first-class web and data support."
      />
      <SpringFrameworkWhyGrid items={WHY} />
      <div className="sf-tabs">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" className={`sf-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>
      {tab === 'modules' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="Major areas">
            <SpringFrameworkModulesOverviewDiagram />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'ioc' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="The container holds your beans">
            <SpringFrameworkIocContainerDiagram />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'scenario' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="Typical web layering">
            <SpringFrameworkMvcLayeredScenarioDiagram />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'learn' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="Suggested order">
            <HorizontalPipeline
              title="Core → Web → Data → AOP"
              fresherHint={false}
              steps={[
                { title: 'IoC & DI', sub: 'beans' },
                { title: 'ApplicationContext', sub: 'lifecycle' },
                { title: 'Spring MVC', sub: 'web' },
                { title: 'JDBC / Data', sub: 'persistence' },
                { title: 'AOP', sub: 'cross-cutting' }
              ]}
            />
          </SpringFrameworkDiagramFrame>
          <SpringFrameworkCallout variant="tip" title="Practice">
            Follow the course topics in order—they mirror how teams adopt Spring in real projects.
          </SpringFrameworkCallout>
        </div>
      )}
    </div>
  );
}
