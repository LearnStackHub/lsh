import { useState } from 'react';
import { SpringFrameworkHero, SpringFrameworkWhyGrid, SpringFrameworkDiagramFrame, SpringFrameworkCallout } from './SpringFrameworkBlocks';
import {
  SpringFrameworkXmlVsJavaConfigDiagram,
  SpringFrameworkContextRefreshDiagram,
  SpringFrameworkIocContainerDiagram,
  HorizontalPipeline
} from '../flow/ProfessionalDiagrams';

const TABS = [
  ['java', 'Java config'],
  ['refresh', 'Context startup'],
  ['scan', 'Component scan'],
  ['hybrid', 'Hybrid setups']
];

const WHY = [
  { title: 'Type-safe', text: '@Configuration classes refactor like normal Java; the compiler catches typos.' },
  { title: '@Bean methods', text: 'Factory methods replace explicit <bean> XML for complex construction.' },
  { title: 'AnnotationConfigApplicationContext', text: 'Bootstrap programmatically or from web.xml / Spring Boot.' }
];

export default function SpringFrameworkConfigurationAnnotationShowcase() {
  const [tab, setTab] = useState('java');
  return (
    <div className="sf-showcase">
      <SpringFrameworkHero
        eyebrow="Spring Framework · Configuration"
        title="Annotation-based configuration"
        subtitle="Use @Configuration, @Bean, and @ComponentScan to replace or complement XML with Java-centric wiring."
      />
      <SpringFrameworkWhyGrid items={WHY} />
      <div className="sf-tabs">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" className={`sf-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>
      {tab === 'java' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="Java vs XML">
            <SpringFrameworkXmlVsJavaConfigDiagram />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'refresh' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="Same refresh pipeline">
            <SpringFrameworkContextRefreshDiagram />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'scan' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="Stereotypes on the classpath">
            <HorizontalPipeline
              title="Component scan"
              fresherHint={false}
              steps={[
                { title: '@ComponentScan', sub: 'base package' },
                { title: '@Component', sub: 'detected' },
                { title: 'specializations', sub: '@Service …' },
                { title: 'bean names', sub: 'default / value' }
              ]}
            />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'hybrid' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="Beans from both sources">
            <SpringFrameworkIocContainerDiagram />
          </SpringFrameworkDiagramFrame>
          <SpringFrameworkCallout variant="remember" title="Imports">
            Use <code>@Import</code> or <code>@ImportResource</code> to pull XML into Java config.
          </SpringFrameworkCallout>
        </div>
      )}
    </div>
  );
}
