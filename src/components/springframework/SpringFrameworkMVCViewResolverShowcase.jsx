import { useState } from 'react';
import { SpringFrameworkHero, SpringFrameworkWhyGrid, SpringFrameworkDiagramFrame, SpringFrameworkCallout } from './SpringFrameworkBlocks';
import {
  SpringFrameworkViewResolverPipelineDiagram,
  SpringFrameworkDispatcherServletPipelineDiagram,
  HorizontalPipeline
} from '../flow/ProfessionalDiagrams';

const TABS = [
  ['resolve', 'Resolution'],
  ['pipeline', 'In MVC pipeline'],
  ['types', 'Resolver types'],
  ['content', 'Negotiation']
];

const WHY = [
  { title: 'Logical names', text: 'Controllers return view names; resolvers map to JSP, Thymeleaf, or static templates.' },
  { title: 'Prefixing', text: 'WEB-INF/views/ + name + .jsp keeps paths out of controllers.' },
  { title: 'Multiple resolvers', text: 'Order property chains resolvers until one succeeds.' }
];

export default function SpringFrameworkMVCViewResolverShowcase() {
  const [tab, setTab] = useState('resolve');
  return (
    <div className="sf-showcase">
      <SpringFrameworkHero
        eyebrow="Spring Framework · Web MVC"
        title="ViewResolver"
        subtitle="Turn logical view names into a concrete View that renders the HTTP response."
      />
      <SpringFrameworkWhyGrid items={WHY} />
      <div className="sf-tabs">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" className={`sf-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>
      {tab === 'resolve' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="Logical → physical">
            <SpringFrameworkViewResolverPipelineDiagram />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'pipeline' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="After ModelAndView">
            <SpringFrameworkDispatcherServletPipelineDiagram />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'types' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="Common resolvers">
            <HorizontalPipeline
              title="Examples"
              fresherHint={false}
              steps={[
                { title: 'InternalResourceViewResolver', sub: 'JSP' },
                { title: 'ThymeleafViewResolver', sub: 'HTML' },
                { title: 'FreeMarkerViewResolver', sub: 'FTL' }
              ]}
            />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'content' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="REST vs MVC views">
            <HorizontalPipeline
              title="When no ViewResolver"
              fresherHint={false}
              steps={[
                { title: '@ResponseBody', sub: 'direct serialization' },
                { title: 'HttpMessageConverter', sub: 'JSON/XML' },
                { title: 'ContentNegotiation', sub: 'Accept header' }
              ]}
            />
          </SpringFrameworkDiagramFrame>
          <SpringFrameworkCallout variant="tip" title="APIs">
            For JSON APIs, MessageConverters replace the view resolver path.
          </SpringFrameworkCallout>
        </div>
      )}
    </div>
  );
}
