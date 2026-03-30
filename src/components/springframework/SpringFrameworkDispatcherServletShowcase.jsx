import { useState } from 'react';
import { SpringFrameworkHero, SpringFrameworkWhyGrid, SpringFrameworkDiagramFrame, SpringFrameworkCallout } from './SpringFrameworkBlocks';
import {
  SpringFrameworkDispatcherServletPipelineDiagram,
  SpringFrameworkMvcLayeredScenarioDiagram,
  SpringFrameworkWarDeploymentScenarioDiagram,
  HorizontalPipeline
} from '../flow/ProfessionalDiagrams';

const TABS = [
  ['pipeline', 'Request pipeline'],
  ['scenario', 'Layered scenario'],
  ['deployment', 'Tomcat → context'],
  ['webxml', 'web.xml mapping'],
  ['mvc', 'MVC components']
];

const WHY = [
  { title: 'Front controller', text: 'One servlet dispatches every HTTP request to the right controller method.' },
  { title: 'Pluggable', text: 'Swap HandlerMapping, HandlerAdapter, and ViewResolver implementations.' },
  { title: 'Integration', text: 'Works with any servlet container—Tomcat, Jetty, or external EE server.' }
];

export default function SpringFrameworkDispatcherServletShowcase() {
  const [tab, setTab] = useState('pipeline');
  return (
    <div className="sf-showcase">
      <SpringFrameworkHero
        eyebrow="Spring Framework · Web MVC"
        title="DispatcherServlet"
        subtitle="The central servlet for Spring MVC: it maps requests, invokes controllers, and resolves views."
      />
      <SpringFrameworkWhyGrid items={WHY} />
      <div className="sf-tabs">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" className={`sf-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>
      {tab === 'pipeline' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="End-to-end MVC path">
            <SpringFrameworkDispatcherServletPipelineDiagram />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'scenario' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="Typical app flow">
            <SpringFrameworkMvcLayeredScenarioDiagram />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'deployment' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="How the WAR boots Spring MVC">
            <SpringFrameworkWarDeploymentScenarioDiagram />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'webxml' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="Classic deployment">
            <HorizontalPipeline
              title="Servlet registration"
              fresherHint={false}
              steps={[
                { title: 'web.xml', sub: 'DispatcherServlet' },
                { title: 'contextConfigLocation', sub: 'XML / Java' },
                { title: 'load-on-startup', sub: 'eager' },
                { title: 'url-pattern', sub: '/ or /app/*' }
              ]}
            />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'mvc' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="Supporting objects">
            <HorizontalPipeline
              title="Inside DispatcherServlet"
              fresherHint={false}
              steps={[
                { title: 'HandlerMapping', sub: 'find handler' },
                { title: 'HandlerAdapter', sub: 'invoke' },
                { title: 'HandlerExceptionResolver', sub: 'errors' },
                { title: 'LocaleResolver', sub: 'i18n' }
              ]}
            />
          </SpringFrameworkDiagramFrame>
          <SpringFrameworkCallout variant="tip" title="Spring Boot">
            Spring Boot’s <code>spring-boot-starter-web</code> auto-configures DispatcherServlet and a default embedded server.
          </SpringFrameworkCallout>
        </div>
      )}
    </div>
  );
}
