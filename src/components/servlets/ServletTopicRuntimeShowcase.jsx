import { useState } from 'react';
import { ServletHero, ServletWhyGrid, ServletDiagramFrame, ServletCallout } from './ServletShowcaseBlocks';
import {
  HorizontalPipeline,
  ServletContainerLifecycleDiagram,
  ServletUrlMappingDiagram,
  ServletSessionCookieFlowDiagram,
  ServletTomcatDeploymentDiagram,
  ServletApiObjectMapDiagram,
  ServletConfigScopeDiagram,
  ServletFrontendMvcFlowDiagram,
  ServletFiltersListenersRuntimeDiagram,
  ServletSecurityDefenseDiagram
} from '../flow/ProfessionalDiagrams';

const CONFIG = {
  'servlet-project-setup': {
    eyebrow: 'Servlets · Project setup',
    title: 'Build and package a servlet app',
    subtitle: 'From Maven coordinates to deployable WAR and local run.',
    why: [
      { title: 'Standard layout', text: 'Use Maven/Gradle conventions so source, web resources, and dependencies are predictable.' },
      { title: 'WAR artifact', text: 'Classic servlet apps deploy as WAR to an external container like Tomcat.' },
      { title: 'Fast feedback', text: 'Local deployment and logs are your quickest debugging tools.' }
    ],
    conceptLabel: 'Build and deploy path',
    ConceptDiagram: ServletTomcatDeploymentDiagram,
    scenarioTitle: 'Scenario: team deploys student portal',
    scenarioSteps: [
      { title: 'Create project', sub: 'Maven / Gradle' },
      { title: 'Add servlet API', sub: 'provided scope' },
      { title: 'Implement servlet', sub: 'doGet / doPost' },
      { title: 'Configure mapping', sub: '@WebServlet or web.xml' },
      { title: 'Package WAR', sub: 'target/*.war' },
      { title: 'Deploy to Tomcat', sub: 'verify endpoint' }
    ],
    scenarioCaption: 'Real world: CI builds a WAR, deploys to Tomcat, then a smoke test hits the mapped servlet endpoint.'
  },
  'tomcat-server': {
    eyebrow: 'Servlets · Tomcat',
    title: 'How Tomcat hosts servlet apps',
    subtitle: 'Container startup, servlet init, and worker-thread request handling.',
    why: [
      { title: 'Container role', text: 'Tomcat manages servlet lifecycle and request threads, so your code focuses on business logic.' },
      { title: 'Deployment model', text: 'WAR is loaded into a webapp context with classloader isolation.' },
      { title: 'Operations', text: 'Ports, context paths, and logs are key when diagnosing environment issues.' }
    ],
    conceptLabel: 'Container internals',
    ConceptDiagram: ServletTomcatDeploymentDiagram,
    scenarioTitle: 'Scenario: production restart after patch',
    scenarioSteps: [
      { title: 'Shutdown old node', sub: 'drain traffic' },
      { title: 'Deploy WAR', sub: 'new app build' },
      { title: 'Tomcat startup', sub: 'scan + init' },
      { title: 'Health check', sub: 'HTTP 200' },
      { title: 'Rejoin load balancer', sub: 'serve users' }
    ],
    scenarioCaption: 'Operations teams follow this flow to avoid downtime during servlet app upgrades.'
  },
  'servlet-lifecycle': {
    eyebrow: 'Servlets · Lifecycle',
    title: 'init(), service(), destroy()',
    subtitle: 'One instance, many requests, container-managed callbacks.',
    why: [
      { title: 'Initialization', text: 'Allocate shared resources in init() only once.' },
      { title: 'Concurrency', text: 'service() can run in parallel threads; avoid mutable shared fields.' },
      { title: 'Cleanup', text: 'Release resources in destroy() during undeploy/shutdown.' }
    ],
    conceptLabel: 'Lifecycle callbacks',
    ConceptDiagram: ServletContainerLifecycleDiagram,
    scenarioTitle: 'Scenario: expensive cache initialization',
    scenarioSteps: [
      { title: 'init()', sub: 'warm cache' },
      { title: 'service()', sub: 'read cache' },
      { title: 'traffic spike', sub: 'many threads' },
      { title: 'redeploy', sub: 'stop app' },
      { title: 'destroy()', sub: 'close resources' }
    ],
    scenarioCaption: 'This is the practical sequence when one servlet instance serves heavy traffic.'
  },
  'servlet-api': {
    eyebrow: 'Servlets · API',
    title: 'Core servlet API in action',
    subtitle: 'Read request metadata, route logic, and write HTTP responses.',
    why: [
      { title: 'Request object', text: 'Use HttpServletRequest for params, headers, body, and attributes.' },
      { title: 'Response object', text: 'Set status/content type and write body via HttpServletResponse.' },
      { title: 'Separation', text: 'Keep servlet focused on transport concerns; delegate business logic.' }
    ],
    conceptLabel: 'Servlet API objects',
    ConceptDiagram: ServletApiObjectMapDiagram,
    scenarioTitle: 'Scenario: login POST request',
    scenarioSteps: [
      { title: 'Read params', sub: 'username/password' },
      { title: 'Validate', sub: 'service call' },
      { title: 'Set session', sub: 'user details' },
      { title: 'Set status', sub: '200 or 401' },
      { title: 'Write response', sub: 'JSON/message' }
    ],
    scenarioCaption: 'Concrete API usage: request data in, response out, and session update on success.'
  },
  'servlet-config': {
    eyebrow: 'Servlets · Config',
    title: 'ServletConfig and mapping setup',
    subtitle: 'Initialization parameters and path mapping decide behavior per servlet.',
    why: [
      { title: 'Init params', text: 'ServletConfig lets each servlet read its own startup values.' },
      { title: 'Path routing', text: 'URL patterns resolve to target servlet based on mapping rules.' },
      { title: 'Migration', text: 'Move legacy web.xml settings gradually to annotations if needed.' }
    ],
    conceptLabel: 'Config scopes',
    ConceptDiagram: ServletConfigScopeDiagram,
    scenarioTitle: 'Scenario: per-servlet limits',
    scenarioSteps: [
      { title: 'Global config', sub: 'ServletContext dbUrl' },
      { title: 'Login servlet', sub: 'maxAttempts=5' },
      { title: 'Upload servlet', sub: 'maxFileSize=10MB' },
      { title: 'Request handling', sub: 'read config values' },
      { title: 'Consistent behavior', sub: 'centralized settings' }
    ],
    scenarioCaption: 'Shows how teams combine app-wide and servlet-specific settings in one deployment.'
  },
  'servlet-annotations': {
    eyebrow: 'Servlets · Annotations',
    title: '@WebServlet, @WebFilter, @WebListener',
    subtitle: 'Annotation-based registration reduces XML boilerplate.',
    why: [
      { title: 'Readable config', text: 'Class-level metadata keeps mapping near implementation.' },
      { title: 'Startup scan', text: 'Container discovers annotated classes during deployment.' },
      { title: 'Compatibility', text: 'Understand both XML and annotations for interview and legacy systems.' }
    ],
    conceptLabel: 'Annotation mapping',
    ConceptDiagram: ServletUrlMappingDiagram,
    scenarioTitle: 'Scenario: migrate from web.xml',
    scenarioSteps: [
      { title: 'Add @WebServlet', sub: 'map endpoints' },
      { title: 'Add @WebFilter', sub: 'auth/logging' },
      { title: 'Add @WebListener', sub: 'session/app events' },
      { title: 'Redeploy', sub: 'container scans annotations' },
      { title: 'Verify routes', sub: 'functional tests' }
    ],
    scenarioCaption: 'Common migration path in legacy projects modernizing servlet registration.',
    callout: {
      title: 'Why this chapter is different',
      body: 'This chapter focuses on registration style (@WebServlet/@WebFilter/@WebListener), while Servlet Config covers parameter scope (ServletConfig vs ServletContext).'
    }
  },
  'http-request-response': {
    eyebrow: 'Servlets · Request/response',
    title: 'HTTP request to response cycle',
    subtitle: 'A servlet turns incoming HTTP into output payloads.',
    why: [
      { title: 'Input parsing', text: 'Read path, query params, headers, and request body safely.' },
      { title: 'Response semantics', text: 'Return proper status codes and content types for clients.' },
      { title: 'Debug flow', text: 'Tracing one request path quickly reveals most bugs.' }
    ],
    conceptLabel: 'Request/response mechanics',
    ConceptDiagram: ServletApiObjectMapDiagram,
    scenarioTitle: 'Scenario: product search endpoint',
    scenarioSteps: [
      { title: 'Receive GET /search', sub: 'query params' },
      { title: 'Validate inputs', sub: 'page/sort/q' },
      { title: 'Service query', sub: 'DB fetch' },
      { title: 'Set content type', sub: 'application/json' },
      { title: 'Return payload', sub: 'results + metadata' }
    ],
    scenarioCaption: 'Maps HTTP semantics to servlet code in a high-traffic search flow.'
  },
  'servlet-frontend-integration': {
    eyebrow: 'Servlets · Frontend integration',
    title: 'Servlets with JSP/HTML frontend',
    subtitle: 'Controller-style request handling with forward/redirect view flow.',
    why: [
      { title: 'Forward', text: 'Server-side forward keeps same request/attributes for rendering.' },
      { title: 'Redirect', text: 'Client-side redirect triggers new request and URL change.' },
      { title: 'MVC clarity', text: 'Servlet handles control flow; JSP/HTML handles presentation.' }
    ],
    conceptLabel: 'MVC integration',
    ConceptDiagram: ServletFrontendMvcFlowDiagram,
    scenarioTitle: 'Scenario: student form submit',
    scenarioSteps: [
      { title: 'User submits form', sub: 'POST /students' },
      { title: 'Validate data', sub: 'server-side rules' },
      { title: 'On error', sub: 'forward + field errors' },
      { title: 'On success', sub: 'save + redirect' },
      { title: 'Final view', sub: 'GET confirmation page' }
    ],
    scenarioCaption: 'Real project flow where servlet controls navigation and JSP renders UI.',
    callout: {
      title: 'Quick rule',
      body: 'Use forward for validation errors, redirect after successful POST (PRG pattern) to avoid duplicate form submissions.'
    }
  },
  'session-management': {
    eyebrow: 'Servlets · Sessions',
    title: 'Session tracking with cookies',
    subtitle: 'JSESSIONID links browser requests to server-side session state.',
    why: [
      { title: 'Stateful web flow', text: 'Store authenticated user/cart and other per-user state in session.' },
      { title: 'Session safety', text: 'Rotate session id on login and configure idle timeout.' },
      { title: 'Scale impact', text: 'Server memory and replication strategy affect session-heavy apps.' }
    ],
    conceptLabel: 'Session architecture',
    ConceptDiagram: ServletSessionCookieFlowDiagram,
    scenarioTitle: 'Scenario: shopping cart session',
    scenarioSteps: [
      { title: 'Login', sub: 'create session' },
      { title: 'Set session key', sub: 'cookie or URL rewrite' },
      { title: 'Add to cart', sub: 'session attribute' },
      { title: 'Next request', sub: 'cookie restores session' },
      { title: 'Logout/timeout', sub: 'invalidate session' }
    ],
    scenarioCaption: 'Explains how cart/user state typically persists across requests in session-based apps.'
  },
  'filters-listeners': {
    eyebrow: 'Servlets · Filters/listeners',
    title: 'Cross-cutting flow before servlets',
    subtitle: 'Filters wrap requests; listeners react to app/session/request events.',
    why: [
      { title: 'Filters', text: 'Handle auth, logging, CORS, and compression without touching each servlet.' },
      { title: 'Listeners', text: 'Track lifecycle events like startup and session create/destroy.' },
      { title: 'Ordering', text: 'Filter order changes behavior; verify chain sequence in your container configuration.' }
    ],
    conceptLabel: 'Filter chain + listeners',
    ConceptDiagram: ServletFiltersListenersRuntimeDiagram,
    scenarioTitle: 'Scenario: secured API request',
    scenarioSteps: [
      { title: 'Request enters filter', sub: 'auth check' },
      { title: 'Audit filter logs', sub: 'trace id' },
      { title: 'Servlet executes', sub: 'business logic' },
      { title: 'Response filter', sub: 'headers/compression' },
      { title: 'Listener events', sub: 'request/session lifecycle' }
    ],
    scenarioCaption: 'Shows where cross-cutting concerns run without cluttering servlet classes.'
  },
  'servlet-security': {
    eyebrow: 'Servlets · Security',
    title: 'Defense in depth for servlet apps',
    subtitle: 'Security is layered: transport, identity, authorization, and data protection.',
    why: [
      { title: 'Authentication', text: 'Verify identity before sensitive operations.' },
      { title: 'Authorization', text: 'Check role/permission at endpoint boundaries.' },
      { title: 'Defensive defaults', text: 'Use secure headers, CSRF/session protection, and strict input validation.' }
    ],
    conceptLabel: 'Security layers',
    ConceptDiagram: ServletSecurityDefenseDiagram,
    scenarioTitle: 'Scenario: funds transfer endpoint',
    scenarioSteps: [
      { title: 'HTTPS required', sub: 'encrypted request' },
      { title: 'Auth filter', sub: 'verify identity' },
      { title: 'Role check', sub: 'allow transfer scope' },
      { title: 'Validate payload', sub: 'amount/account' },
      { title: 'Audit + response', sub: 'record + return' }
    ],
    scenarioCaption: 'Critical operations need every layer active; one missing check can become a breach.'
  }
};

function normalizeTopicId(topicId) {
  if (topicId === 'servlet-session-management') return 'session-management';
  return topicId;
}

export default function ServletTopicRuntimeShowcase({ topicId }) {
  const id = normalizeTopicId(topicId);
  const cfg = CONFIG[id];
  if (!cfg) return null;
  const [tab, setTab] = useState('concept');
  const { ConceptDiagram } = cfg;
  return (
    <div className="servlet-showcase">
      <ServletHero eyebrow={cfg.eyebrow} title={cfg.title} subtitle={cfg.subtitle} />
      <ServletWhyGrid items={cfg.why} />

      <div className="servlet-tabs">
        <button type="button" className={`servlet-tab ${tab === 'concept' ? 'active' : ''}`} onClick={() => setTab('concept')}>
          Concept
        </button>
        <button type="button" className={`servlet-tab ${tab === 'scenario' ? 'active' : ''}`} onClick={() => setTab('scenario')}>
          Real-world scenario
        </button>
      </div>

      <div className="servlet-panel">
        {tab === 'concept' && (
          <>
            <ServletDiagramFrame label={cfg.conceptLabel || 'Concept'}>
              <ConceptDiagram />
            </ServletDiagramFrame>
            <p className="servlet-caption">{cfg.subtitle}</p>
          </>
        )}
        {tab === 'scenario' && (
          <>
            <ServletDiagramFrame label="Real-world scenario flow">
              <HorizontalPipeline steps={cfg.scenarioSteps} title={cfg.scenarioTitle} fresherHint={false} />
            </ServletDiagramFrame>
            <p className="servlet-caption">{cfg.scenarioCaption}</p>
          </>
        )}
        {cfg.callout && (
          <ServletCallout variant="tip" title={cfg.callout.title}>
            {cfg.callout.body}
          </ServletCallout>
        )}
      </div>
    </div>
  );
}
