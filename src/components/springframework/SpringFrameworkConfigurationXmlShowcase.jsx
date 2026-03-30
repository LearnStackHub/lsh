import { useState } from 'react';
import { SpringFrameworkHero, SpringFrameworkWhyGrid, SpringFrameworkDiagramFrame, SpringFrameworkCallout } from './SpringFrameworkBlocks';
import { SpringFrameworkXmlVsJavaConfigDiagram, SpringFrameworkIocContainerDiagram, HorizontalPipeline } from '../flow/ProfessionalDiagrams';

const TABS = [
  ['xml', 'XML wiring'],
  ['compare', 'vs Java config'],
  ['container', 'Loads into'],
  ['imports', 'Imports & profiles']
];

const WHY = [
  { title: 'Explicit beans', text: 'Every bean id and class is visible in one or more XML files.' },
  { title: 'Legacy systems', text: 'Many enterprise apps still maintain XML for stable third-party integration.' },
  { title: 'IDE support', text: 'Spring Tool Suite and IDEs can visualize XML bean graphs.' }
];

export default function SpringFrameworkConfigurationXmlShowcase() {
  const [tab, setTab] = useState('xml');
  return (
    <div className="sf-showcase">
      <SpringFrameworkHero
        eyebrow="Spring Framework · Configuration"
        title="XML configuration"
        subtitle="Define beans, property placeholders, and imports in XML; bootstrap with ClassPathXmlApplicationContext."
      />
      <SpringFrameworkWhyGrid items={WHY} />
      <div className="sf-tabs">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" className={`sf-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>
      {tab === 'xml' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="XML side of configuration">
            <SpringFrameworkXmlVsJavaConfigDiagram />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'compare' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="Same runtime model">
            <HorizontalPipeline
              title="Migration path"
              fresherHint={false}
              steps={[
                { title: 'Start XML', sub: 'stable' },
                { title: 'Introduce @Configuration', sub: 'gradual' },
                { title: 'Component scan', sub: 'reduce XML' },
                { title: 'Retire XML', sub: 'optional' }
              ]}
            />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'container' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="Beans end up in the same IoC model">
            <SpringFrameworkIocContainerDiagram />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'imports' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="Modular XML">
            <HorizontalPipeline
              title="Splitting configs"
              fresherHint={false}
              steps={[
                { title: 'import resource', sub: 'other XML' },
                { title: 'context:property-placeholder', sub: 'externalize' },
                { title: 'beans profile', sub: 'dev / prod' }
              ]}
            />
          </SpringFrameworkDiagramFrame>
          <SpringFrameworkCallout variant="tip" title="Tip">
            Prefer classpath: or file: URLs consistently across environments.
          </SpringFrameworkCallout>
        </div>
      )}
    </div>
  );
}
