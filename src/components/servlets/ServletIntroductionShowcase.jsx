import { useState } from 'react';
import { ServletHero, ServletWhyGrid, ServletDiagramFrame, ServletCallout } from './ServletShowcaseBlocks';
import {
  HorizontalPipeline,
  ServletRequestLifecycleDiagram,
  ServletContainerLifecycleDiagram,
  ServletUrlMappingDiagram,
  ServletSessionCookieFlowDiagram
} from '../flow/ProfessionalDiagrams';

const TABS = [
  ['request', 'Request path'],
  ['lifecycle', 'Lifecycle'],
  ['mapping', 'URL mapping'],
  ['session', 'Session & cookie'],
  ['path', 'Study path']
];

const WHY = [
  {
    title: 'Foundation of Java web',
    text: 'Servlets are the raw HTTP layer behind Spring MVC and many Java web stacks; understanding them helps debug routing and request handling issues.'
  },
  {
    title: 'Container-managed lifecycle',
    text: 'Tomcat creates servlet instances and runs requests on worker threads. This is why thread-safety matters in servlet code.'
  },
  {
    title: 'State and sessions',
    text: 'Servlet APIs provide request, response, and session primitives that power login flows, carts, and user-specific web interactions.'
  }
];

export default function ServletIntroductionShowcase() {
  const [tab, setTab] = useState('request');

  return (
    <div className="servlet-showcase">
      <ServletHero
        eyebrow="Servlets · Basics"
        title="Introduction to Java Servlets"
        subtitle="Servlets run inside a container like Tomcat and process HTTP requests on your behalf. These diagrams show the runtime path before you move to API details and enterprise frameworks."
      />
      <p className="servlet-showcase-lead">
        Read the tabs left to right: how a request reaches your servlet, how lifecycle callbacks are controlled by the container, how URL mappings dispatch to classes,
        and how <code>HttpSession</code> tracks user state using cookies.
      </p>

      <ServletWhyGrid items={WHY} />

      <div className="servlet-tabs">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" className={`servlet-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'request' && (
        <div className="servlet-panel">
          <ServletDiagramFrame label="Browser to servlet response path">
            <ServletRequestLifecycleDiagram />
          </ServletDiagramFrame>
          <p className="servlet-caption">
            Every request is accepted by the container, optionally passes filters, then hits your <code>HttpServlet</code> method. Keep business logic in services and keep servlet code focused on HTTP orchestration.
          </p>
        </div>
      )}

      {tab === 'lifecycle' && (
        <div className="servlet-panel">
          <ServletDiagramFrame label="Servlet lifecycle callbacks">
            <ServletContainerLifecycleDiagram />
          </ServletDiagramFrame>
          <p className="servlet-caption">
            <code>init()</code> runs once, <code>service()</code> runs per request, and <code>destroy()</code> runs on shutdown. Because many threads can execute service concurrently, avoid mutable instance fields.
          </p>
        </div>
      )}

      {tab === 'mapping' && (
        <div className="servlet-panel">
          <ServletDiagramFrame label="URL mapping table">
            <ServletUrlMappingDiagram />
          </ServletDiagramFrame>
          <p className="servlet-caption">
            Mapping rules from annotations or <code>web.xml</code> decide which servlet receives each path. If routing looks wrong, check URL patterns and their specificity order.
          </p>
        </div>
      )}

      {tab === 'session' && (
        <div className="servlet-panel">
          <ServletDiagramFrame label="Session and cookie flow">
            <ServletSessionCookieFlowDiagram />
          </ServletDiagramFrame>
          <p className="servlet-caption">
            After authentication, the server associates a session id with user state. The browser sends that id back on later requests so the same session can be restored.
          </p>
          <ServletCallout variant="remember" title="Production note">
            Set secure cookie flags (<code>HttpOnly</code>, <code>Secure</code>, <code>SameSite</code>), rotate sessions on login, and expire idle sessions to reduce risk.
          </ServletCallout>
        </div>
      )}

      {tab === 'path' && (
        <div className="servlet-panel">
          <ServletDiagramFrame label="Recommended topic order">
            <HorizontalPipeline
              title="Servlet learning path"
              fresherHint={false}
              steps={[
                { title: 'Architecture', sub: 'container + servlet role' },
                { title: 'Lifecycle', sub: 'init/service/destroy' },
                { title: 'Servlet API', sub: 'request/response' },
                { title: 'Session', sub: 'cookies + HttpSession' },
                { title: 'Filters', sub: 'cross-cutting logic' },
                { title: 'Security', sub: 'auth + hardening' }
              ]}
            />
          </ServletDiagramFrame>
          <p className="servlet-caption">
            This flow mirrors how production apps evolve: request handling first, then state and security concerns layered in.
          </p>
        </div>
      )}
    </div>
  );
}
