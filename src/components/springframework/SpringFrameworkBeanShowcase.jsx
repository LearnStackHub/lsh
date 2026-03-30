import { useState } from 'react';
import { SpringFrameworkHero, SpringFrameworkWhyGrid, SpringFrameworkDiagramFrame, SpringFrameworkCallout } from './SpringFrameworkBlocks';
import {
  SpringFrameworkBeanLifecycleDiagram,
  SpringFrameworkIocContainerDiagram,
  HorizontalPipeline
} from '../flow/ProfessionalDiagrams';

const TABS = [
  ['lifecycle', 'Lifecycle'],
  ['scopes', 'Scopes'],
  ['container', 'In the container'],
  ['callbacks', 'Callbacks']
];

const WHY = [
  {
    title: 'Managed objects',
    text: 'Anything Spring instantiates from metadata is a bean—services, repositories, controllers, aspects.'
  },
  {
    title: 'Singleton by default',
    text: 'One shared instance per container; prototype scope for per-injection instances.'
  },
  {
    title: 'Lifecycle hooks',
    text: 'Initialize resources after properties are set and release them on shutdown.'
  }
];

export default function SpringFrameworkBeanShowcase() {
  const [tab, setTab] = useState('lifecycle');
  return (
    <div className="sf-showcase">
      <SpringFrameworkHero
        eyebrow="Spring Framework · Core"
        title="Beans"
        subtitle="Beans are objects defined in Spring metadata, instantiated and wired by the IoC container."
      />
      <SpringFrameworkWhyGrid items={WHY} />
      <div className="sf-tabs">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" className={`sf-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>
      {tab === 'lifecycle' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="Singleton lifecycle">
            <SpringFrameworkBeanLifecycleDiagram />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'scopes' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="Scope choice">
            <HorizontalPipeline
              title="Common scopes"
              fresherHint={false}
              steps={[
                { title: 'singleton', sub: 'default' },
                { title: 'prototype', sub: 'new each time' },
                { title: 'request / session', sub: 'web' },
                { title: 'custom', sub: 'rare' }
              ]}
            />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'container' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="Beans live together">
            <SpringFrameworkIocContainerDiagram />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'callbacks' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="Initialization and destruction">
            <HorizontalPipeline
              title="Lifecycle interfaces"
              fresherHint={false}
              steps={[
                { title: 'InitializingBean', sub: 'afterPropertiesSet' },
                { title: '@PostConstruct', sub: 'Jakarta' },
                { title: 'DisposableBean', sub: 'destroy' },
                { title: '@PreDestroy', sub: 'shutdown' }
              ]}
            />
          </SpringFrameworkDiagramFrame>
          <SpringFrameworkCallout variant="tip" title="Resources">
            Prefer try-with-resources inside methods or use `AutoCloseable` patterns where appropriate.
          </SpringFrameworkCallout>
        </div>
      )}
    </div>
  );
}
