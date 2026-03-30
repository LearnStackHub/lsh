import { useState } from 'react';
import { JspHero, JspWhyGrid, JspDiagramFrame, JspCallout } from './JspShowcaseBlocks';
import {
  HorizontalPipeline,
  JspProjectSetupDeploymentDiagram,
  JspArchitectureRuntimeDiagram,
  JspDirectivesOverviewDiagram,
  JspImplicitObjectsDiagram,
  JspExpressionLanguageResolutionDiagram,
  JspJstlFlowDiagram,
  JspCustomTagLifecycleDiagram
} from '../flow/ProfessionalDiagrams';

const CONFIG = {
  'jsp-project-setup': {
    eyebrow: 'JSP · Project setup',
    title: 'Setup JSP project on servlet container',
    subtitle: 'Create webapp structure, place JSP views, package WAR, and deploy.',
    why: [
      { title: 'Correct layout', text: 'JSP files in webapp and Java classes in standard source folders keep builds clean.' },
      { title: 'Container model', text: 'JSP typically runs through a servlet container; it is not a standalone desktop execution model.' },
      { title: 'Fast iteration', text: 'View changes can often be tested quickly without heavy backend rebuilds.' }
    ],
    conceptLabel: 'Setup and deployment',
    ConceptDiagram: JspProjectSetupDeploymentDiagram,
    scenarioTitle: 'Scenario: setting up student portal UI',
    scenarioSteps: [
      { title: 'Create web module', sub: 'Maven WAR project' },
      { title: 'Add JSP pages', sub: 'login.jsp, list.jsp' },
      { title: 'Configure mapping', sub: 'servlet controller' },
      { title: 'Build WAR', sub: 'mvn package' },
      { title: 'Deploy Tomcat', sub: 'open app URL' }
    ],
    scenarioCaption: 'Practical onboarding flow used by teams when starting legacy Java web UI modules.'
  },
  'jsp-introduction': {
    eyebrow: 'JSP · Introduction',
    title: 'How JSP works at runtime',
    subtitle: 'JSP becomes a servlet under the hood and then renders HTML.',
    why: [
      { title: 'Server-side rendering', text: 'JSP produces final HTML before response reaches the browser.' },
      { title: 'Servlet foundation', text: 'JSP is translated/compiled into a servlet class when required by container lifecycle.' },
      { title: 'MVC role', text: 'Common pattern: servlet as controller, JSP as view.' }
    ],
    conceptLabel: 'JSP runtime flow',
    ConceptDiagram: JspArchitectureRuntimeDiagram,
    scenarioTitle: 'Scenario: first-hit or changed home.jsp',
    scenarioSteps: [
      { title: 'Browser request', sub: 'GET /home.jsp' },
      { title: 'JspServlet intercepts', sub: 'container route' },
      { title: 'Translate/compile', sub: 'if first hit or changed' },
      { title: 'Execute servlet', sub: '_jspService()' },
      { title: 'Return HTML', sub: 'rendered page' }
    ],
    scenarioCaption: 'Explains why first load can be slower and later requests are faster.'
  },
  'jsp-architecture': {
    eyebrow: 'JSP · Architecture',
    title: 'JSP with servlet container architecture',
    subtitle: 'Request lifecycle across browser, container, generated servlet, and response.',
    why: [
      { title: 'Separation of concerns', text: 'Servlet controls navigation; JSP focuses on presentation.' },
      { title: 'Compilation lifecycle', text: 'Container recompiles JSP when source changes.' },
      { title: 'Debugging clarity', text: 'Knowing generated servlet path helps resolve runtime template errors.' }
    ],
    conceptLabel: 'Architecture layers',
    ConceptDiagram: JspArchitectureRuntimeDiagram,
    scenarioTitle: 'Scenario: user opens dashboard page',
    scenarioSteps: [
      { title: 'Controller resolves view', sub: 'returns dashboard.jsp' },
      { title: 'Container checks JSP', sub: 'stale or fresh' },
      { title: 'Generate servlet', sub: 'on first hit or change' },
      { title: 'Render model data', sub: 'EL/JSTL output' },
      { title: 'Send page', sub: 'browser display' }
    ],
    scenarioCaption: 'Architecture in action when controller-driven navigation renders dynamic dashboards.'
  },
  'jsp-scripting-elements': {
    eyebrow: 'JSP · Scripting elements',
    title: 'Scriptlet, declaration, expression',
    subtitle: 'Legacy Java-in-JSP constructs and why modern code minimizes them.',
    why: [
      { title: 'Legacy support', text: 'Many enterprise JSP apps still contain scriptlets and declarations.' },
      { title: 'Readability risk', text: 'Mixing Java and HTML makes views hard to maintain.' },
      { title: 'Modern replacement', text: 'Prefer EL + JSTL + controller-prepared model data.' }
    ],
    conceptLabel: 'Legacy scripting model',
    ConceptDiagram: JspArchitectureRuntimeDiagram,
    scenarioTitle: 'Scenario: old report.jsp modernization',
    scenarioSteps: [
      { title: 'Scriptlet loop', sub: 'Java in JSP body' },
      { title: 'Hard to test', sub: 'logic/view mixed' },
      { title: 'Move logic to servlet', sub: 'prepare model' },
      { title: 'Replace with JSTL', sub: 'c:forEach/c:if' },
      { title: 'Cleaner view', sub: 'maintainable JSP' }
    ],
    scenarioCaption: 'Typical refactor teams do to reduce view complexity in older JSP codebases.'
  },
  'jsp-directives': {
    eyebrow: 'JSP · Directives',
    title: 'page, include, taglib directives',
    subtitle: 'Compile-time configuration of JSP behavior and dependencies.',
    why: [
      { title: 'page directive', text: 'Set imports, encoding, buffering, error page and other page-level flags.' },
      { title: 'include directive', text: 'Static include merged during translation time.' },
      { title: 'taglib directive', text: 'Registers JSTL/custom tag libraries used in page.' }
    ],
    conceptLabel: 'Directive types',
    ConceptDiagram: JspDirectivesOverviewDiagram,
    scenarioTitle: 'Scenario: common header/footer composition',
    scenarioSteps: [
      { title: 'Declare page settings', sub: 'contentType/imports' },
      { title: 'Include shared header', sub: 'directive include' },
      { title: 'Declare taglib', sub: 'JSTL prefix' },
      { title: 'Compile JSP', sub: 'single servlet output' },
      { title: 'Render unified page', sub: 'consistent layout' }
    ],
    scenarioCaption: 'Directive-based composition used for shared fragments in classic JSP projects.'
  },
  'jsp-implicit-objects': {
    eyebrow: 'JSP · Implicit objects',
    title: 'request, session, application, out',
    subtitle: 'Container-provided objects available directly inside JSP.',
    why: [
      { title: 'Quick access', text: 'Read request parameters and session state without manual object creation.' },
      { title: 'Scope awareness', text: 'Choose correct scope for data lifetime and concurrency safety.' },
      { title: 'View focus', text: 'Use only what is needed for rendering; avoid heavy logic in JSP.' }
    ],
    conceptLabel: 'Implicit object map',
    ConceptDiagram: JspImplicitObjectsDiagram,
    scenarioTitle: 'Scenario: personalized welcome page',
    scenarioSteps: [
      { title: 'Servlet sets attrs', sub: 'request/session values' },
      { title: 'JSP reads request', sub: 'message/token' },
      { title: 'JSP reads session', sub: 'loggedInUser' },
      { title: 'Writes with out', sub: 'HTML response' },
      { title: 'Track app data', sub: 'application scope' }
    ],
    scenarioCaption: 'How implicit objects are practically used when rendering user-personalized pages.'
  },
  'jsp-action-tags': {
    eyebrow: 'JSP · Action tags',
    title: 'jsp:include, jsp:forward, jsp:useBean',
    subtitle: 'Runtime actions for dynamic include, navigation, and bean usage.',
    why: [
      { title: 'Runtime include', text: 'jsp:include executes target resource at request time.' },
      { title: 'Forward flow', text: 'jsp:forward transfers control to another resource.' },
      { title: 'Bean integration', text: 'jsp:useBean binds backing objects in JSP scopes.' }
    ],
    conceptLabel: 'Action tag runtime',
    ConceptDiagram: JspCustomTagLifecycleDiagram,
    scenarioTitle: 'Scenario: checkout confirmation flow',
    scenarioSteps: [
      { title: 'Load cart.jsp', sub: 'prepare bean' },
      { title: 'Include totals', sub: 'jsp:include summary' },
      { title: 'Submit payment', sub: 'controller result' },
      { title: 'Forward success', sub: 'jsp:forward' },
      { title: 'Render final', sub: 'confirmation.jsp' }
    ],
    scenarioCaption: 'Shows runtime navigation and reusable fragments in checkout-like JSP screens.'
  },
  'jsp-expression-language': {
    eyebrow: 'JSP · Expression Language',
    title: 'EL expressions and scope lookup',
    subtitle: 'Read model data with concise syntax instead of scriptlets.',
    why: [
      { title: 'Clean syntax', text: 'EL keeps JSP readable and avoids Java boilerplate in views.' },
      { title: 'Scope order', text: 'Resolution follows page -> request -> session -> application.' },
      { title: 'Safer templates', text: 'Encourages thin views with prevalidated model values.' }
    ],
    conceptLabel: 'EL resolution',
    ConceptDiagram: JspExpressionLanguageResolutionDiagram,
    scenarioTitle: 'Scenario: profile page rendering',
    scenarioSteps: [
      { title: 'Controller sets model', sub: 'request attrs' },
      { title: 'EL resolves value', sub: '${user.name}' },
      { title: 'Fallback scope check', sub: 'session/app if needed' },
      { title: 'Conditionals', sub: 'render optional sections' },
      { title: 'Final HTML', sub: 'response to browser' }
    ],
    scenarioCaption: 'Real rendering path for profile/dashboard pages with model-driven views.'
  },
  'jsp-jstl': {
    eyebrow: 'JSP · JSTL',
    title: 'Core JSTL tags for loops and conditions',
    subtitle: 'Declarative view logic using c:forEach, c:if, c:choose.',
    why: [
      { title: 'Readability', text: 'JSTL templates are easier to scan than embedded Java blocks.' },
      { title: 'Maintainability', text: 'View logic stays concise while controller handles business rules.' },
      { title: 'Team consistency', text: 'Standard JSTL usage reduces style drift across pages.' }
    ],
    conceptLabel: 'JSTL flow',
    ConceptDiagram: JspJstlFlowDiagram,
    scenarioTitle: 'Scenario: order history table',
    scenarioSteps: [
      { title: 'Receive order list', sub: 'request attribute' },
      { title: 'Loop rows', sub: 'c:forEach orders' },
      { title: 'Conditional badge', sub: 'c:choose/c:when' },
      { title: 'Format values', sub: 'fn/fmt tags' },
      { title: 'Render table', sub: 'final view' }
    ],
    scenarioCaption: 'Typical JSTL usage for list pages in admin panels and dashboards.'
  },
  'jsp-custom-tags': {
    eyebrow: 'JSP · Custom tags',
    title: 'Reusable tags with tag handlers',
    subtitle: 'Encapsulate repeated UI logic behind tag library APIs.',
    why: [
      { title: 'Reuse', text: 'Extract repeated blocks (cards, tables, menus) into reusable tags.' },
      { title: 'Consistency', text: 'Centralized rendering behavior keeps UI output uniform.' },
      { title: 'Abstraction', text: 'Page authors use simple tags instead of low-level rendering logic.' }
    ],
    conceptLabel: 'Custom tag lifecycle',
    ConceptDiagram: JspCustomTagLifecycleDiagram,
    scenarioTitle: 'Scenario: reusable pagination component',
    scenarioSteps: [
      { title: 'Define TLD', sub: 'tag + attributes' },
      { title: 'Implement handler', sub: 'render links' },
      { title: 'Register taglib', sub: 'directive in JSP' },
      { title: 'Use custom tag', sub: 'my:pagination' },
      { title: 'Consistent UI', sub: 'all pages match' }
    ],
    scenarioCaption: 'How teams build internal JSP component libraries for repeated patterns.'
  }
};

export default function JspTopicRuntimeShowcase({ topicId }) {
  const cfg = CONFIG[topicId];
  if (!cfg) return null;
  const [tab, setTab] = useState('concept');

  return (
    <div className="jsp-showcase">
      <JspHero eyebrow={cfg.eyebrow} title={cfg.title} subtitle={cfg.subtitle} />
      <JspWhyGrid items={cfg.why} />

      <div className="jsp-tabs">
        <button type="button" className={`jsp-tab ${tab === 'concept' ? 'active' : ''}`} onClick={() => setTab('concept')}>
          Concept
        </button>
        <button type="button" className={`jsp-tab ${tab === 'scenario' ? 'active' : ''}`} onClick={() => setTab('scenario')}>
          Real-world scenario
        </button>
      </div>

      <div className="jsp-panel">
        {tab === 'concept' && (
          <>
            <JspDiagramFrame label={cfg.conceptLabel || 'Concept'}>
              <cfg.ConceptDiagram />
            </JspDiagramFrame>
            <p className="jsp-caption">{cfg.subtitle}</p>
          </>
        )}
        {tab === 'scenario' && (
          <>
            <JspDiagramFrame label="Real-world scenario flow">
              <HorizontalPipeline steps={cfg.scenarioSteps} title={cfg.scenarioTitle} fresherHint={false} />
            </JspDiagramFrame>
            <p className="jsp-caption">{cfg.scenarioCaption}</p>
          </>
        )}
        {cfg.callout && (
          <JspCallout variant="tip" title={cfg.callout.title}>
            {cfg.callout.body}
          </JspCallout>
        )}
      </div>
    </div>
  );
}
