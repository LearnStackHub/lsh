import { useState } from 'react';
import { SpringFrameworkHero, SpringFrameworkWhyGrid, SpringFrameworkDiagramFrame } from './SpringFrameworkBlocks';
import {
  SpringFrameworkContextRefreshDiagram,
  SpringFrameworkIocContainerDiagram,
  SpringFrameworkXmlVsJavaConfigDiagram,
  HorizontalPipeline
} from '../flow/ProfessionalDiagrams';

const TABS = [
  ['refresh', 'Refresh'],
  ['contexts', 'Context types'],
  ['config', 'XML vs Java'],
  ['lookup', 'getBean']
];

const WHY = [
  {
    title: 'Facade over IoC',
    text: 'ApplicationContext extends BeanFactory with internationalization, events, and resource loading.'
  },
  {
    title: 'Enterprise features',
    text: 'Declarative transactions, validation, and scheduling integrate with the same context.'
  },
  {
    title: 'Test support',
    text: '@ContextConfiguration loads the same definitions in integration tests.'
  }
];

export default function SpringFrameworkApplicationContextShowcase() {
  const [tab, setTab] = useState('refresh');
  return (
    <div className="sf-showcase">
      <SpringFrameworkHero
        eyebrow="Spring Framework · Core"
        title="ApplicationContext"
        subtitle="The ApplicationContext is the main Spring IoC container: it loads configuration, creates beans, and publishes lifecycle events."
      />
      <SpringFrameworkWhyGrid items={WHY} />
      <div className="sf-tabs">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" className={`sf-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>
      {tab === 'refresh' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="Startup pipeline">
            <SpringFrameworkContextRefreshDiagram />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'contexts' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="Beans live here">
            <SpringFrameworkIocContainerDiagram />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'config' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="How definitions are supplied">
            <SpringFrameworkXmlVsJavaConfigDiagram />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'lookup' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="Programmatic access">
            <HorizontalPipeline
              title="getBean usage"
              fresherHint={false}
              steps={[
                { title: 'prefer injection', sub: 'constructor' },
                { title: 'getBean(name)', sub: 'when needed' },
                { title: 'getBean(Class)', sub: 'type-safe' },
                { title: 'avoid in domain', sub: 'keep thin' }
              ]}
            />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
    </div>
  );
}
