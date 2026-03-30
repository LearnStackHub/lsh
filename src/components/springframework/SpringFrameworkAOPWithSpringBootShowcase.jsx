import { useState } from 'react';
import { SpringFrameworkHero, SpringFrameworkWhyGrid, SpringFrameworkDiagramFrame, SpringFrameworkCallout } from './SpringFrameworkBlocks';
import {
  SpringFrameworkEnableAspectJDiagram,
  SpringFrameworkAopProxyDiagram,
  SpringFrameworkAdviceTypesDiagram,
  HorizontalPipeline
} from '../flow/ProfessionalDiagrams';

const TABS = [
  ['enable', 'Enable AOP'],
  ['proxy', 'Still proxies'],
  ['starter', 'spring-boot-starter-aop'],
  ['boot', 'Spring Boot extras']
];

const WHY = [
  { title: 'Auto-configuration', text: 'Spring Boot pulls in aspectjweaver and enables proxying when AOP is on the classpath.' },
  { title: 'Same @Aspect model', text: 'Write @Aspect beans as in plain Spring; Boot just wires the infrastructure.' },
  { title: 'Observability', text: 'Micrometer and logging often combine with aspects for metrics.' }
];

export default function SpringFrameworkAOPWithSpringBootShowcase() {
  const [tab, setTab] = useState('enable');
  return (
    <div className="sf-showcase">
      <SpringFrameworkHero
        eyebrow="Spring Framework · AOP"
        title="AOP with Spring Boot"
        subtitle="Spring Boot does not replace Spring AOP—it auto-configures the classpath and proxy infrastructure so your @Aspect classes work out of the box."
      />
      <SpringFrameworkWhyGrid items={WHY} />
      <div className="sf-tabs">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" className={`sf-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>
      {tab === 'enable' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="Explicit vs starter">
            <SpringFrameworkEnableAspectJDiagram />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'proxy' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="Boot still uses proxies">
            <SpringFrameworkAopProxyDiagram />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'starter' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="What the starter adds">
            <HorizontalPipeline
              title="Dependencies"
              fresherHint={false}
              steps={[
                { title: 'spring-aop', sub: 'core' },
                { title: 'aspectjweaver', sub: 'weaving' },
                { title: 'spring-boot autoconfig', sub: 'defaults' }
              ]}
            />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'boot' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="Advice types unchanged">
            <SpringFrameworkAdviceTypesDiagram />
          </SpringFrameworkDiagramFrame>
          <SpringFrameworkCallout variant="tip" title="Testing">
            Use <code>@TestConfiguration</code> or slice tests; verify aspect behavior with integration tests or dedicated unit tests on aspects.
          </SpringFrameworkCallout>
        </div>
      )}
    </div>
  );
}
