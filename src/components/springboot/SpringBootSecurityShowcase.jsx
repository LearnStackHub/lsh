import { useState } from 'react';
import { SpringHero, SpringWhyGrid, SpringDiagramFrame, SpringCallout } from './SpringBlocks';
import {
  SpringBootSecurityFilterDiagram,
  SpringBootWebRequestFlowDiagram,
  SpringBootExceptionAdviceFlowDiagram,
  SpringBootJwtBearerScenarioDiagram,
  HorizontalPipeline
} from '../flow/ProfessionalDiagrams';

const TABS = [
  ['filters', 'Filter chain'],
  ['request', 'Request reaches MVC'],
  ['auth', 'Authentication'],
  ['method', 'Method security'],
  ['errors', 'Auth failures'],
  ['jwt', 'Real scenario: JWT']
];

const WHY = [
  {
    title: 'Servlet filters first',
    text: 'Spring Security runs as a filter chain before DispatcherServlet—authentication and authorization apply uniformly.'
  },
  {
    title: 'Password encoding',
    text: 'BCrypt or Argon2 via PasswordEncoder; never store plain passwords.'
  },
  {
    title: 'JWT or session',
    text: 'Stateless APIs often use JWT; browser apps may use sessions + CSRF—pick per client.'
  }
];

export default function SpringBootSecurityShowcase() {
  const [tab, setTab] = useState('filters');
  return (
    <div className="sb-showcase">
      <SpringHero
        eyebrow="Spring Boot · Security"
        title="Spring Security"
        subtitle="Protect your app with a filter chain, authentication providers, and authorization rules on URLs and methods."
      />
      <SpringWhyGrid items={WHY} />

      <div className="sb-tabs">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" className={`sb-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'filters' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="Security filter chain">
            <SpringBootSecurityFilterDiagram />
          </SpringDiagramFrame>
        </div>
      )}

      {tab === 'request' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="After filters: same MVC path as unsecured apps">
            <SpringBootWebRequestFlowDiagram />
          </SpringDiagramFrame>
        </div>
      )}

      {tab === 'auth' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="Credential to Authentication">
            <HorizontalPipeline
              title="Authentication steps"
              fresherHint={false}
              steps={[
                { title: 'request', sub: 'Basic / Bearer' },
                { title: 'AuthenticationFilter', sub: 'extract' },
                { title: 'UserDetailsService', sub: 'load user' },
                { title: 'PasswordEncoder', sub: 'match' },
                { title: 'SecurityContext', sub: 'hold principal' }
              ]}
            />
          </SpringDiagramFrame>
        </div>
      )}

      {tab === 'method' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="Method-level rules">
            <HorizontalPipeline
              title="@PreAuthorize / @Secured"
              fresherHint={false}
              steps={[
                { title: '@EnableMethodSecurity', sub: 'enable' },
                { title: 'annotate service', sub: 'hasRole …' },
                { title: 'SpEL', sub: 'expressions' },
                { title: 'deny by default', sub: 'layer policy' }
              ]}
            />
          </SpringDiagramFrame>
          <SpringCallout variant="watch" title="CORS + CSRF">
            APIs for SPAs: configure CORS; for cookie sessions enable CSRF for mutating requests.
          </SpringCallout>
        </div>
      )}

      {tab === 'errors' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="Map security exceptions to HTTP">
            <SpringBootExceptionAdviceFlowDiagram />
          </SpringDiagramFrame>
          <p className="sb-caption">Use <code>@ExceptionHandler</code> for <code>AccessDeniedException</code>, <code>AuthenticationException</code>, etc.</p>
        </div>
      )}

      {tab === 'jwt' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="Login + Bearer on protected APIs">
            <SpringBootJwtBearerScenarioDiagram />
          </SpringDiagramFrame>
        </div>
      )}
    </div>
  );
}
