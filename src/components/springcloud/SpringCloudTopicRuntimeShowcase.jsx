import { useState } from 'react';
import { SpringCloudHero, SpringCloudWhyGrid, SpringCloudDiagramFrame, SpringCloudCallout } from './SpringCloudShowcaseBlocks';
import {
  SpringCloudArchitectureDiagram,
  SpringCloudConfigServerFlowDiagram,
  SpringCloudEurekaDiscoveryFlowDiagram,
  SpringCloudApiGatewayRoutingDiagram,
  SpringCloudLoadBalancingFlowDiagram,
  SpringCloudOpenFeignCallDiagram,
  SpringCloudResilienceCircuitBreakerDiagram,
  SpringCloudDistributedTracingFlowDiagram,
  SpringCloudSecurityTokenFlowDiagram,
  SpringCloudElkPipelineDiagram,
  DeepRuntimeFlowDiagram,
  PitfallsFlowDiagram,
  ScenarioPathFlowDiagram,
  InterviewAnswerMapDiagram
} from '../flow/ProfessionalDiagrams';
import {
  SpringCloudMechanicsTabDiagram,
  SpringCloudScenarioTabDiagram,
  SpringCloudPitfallsTabDiagram,
  SpringCloudInterviewTabDiagram
} from './SpringCloudTopicTabDiagrams';

const CONFIG = {
  'spring-cloud-microservices-project': {
    eyebrow: 'Spring Cloud · Project',
    title: 'Microservices project blueprint',
    subtitle: 'Build a production-grade baseline with gateway, discovery, centralized config, and observability.',
    why: [
      { title: 'Start with platform', text: 'A reusable platform baseline prevents each service team from reinventing infrastructure.' },
      { title: 'Operational consistency', text: 'Unified routing, config, tracing, and logging reduce incident response time.' },
      { title: 'Scaling clarity', text: 'Clear boundaries between platform services and business services enable independent scaling.' }
    ],
    conceptLabel: 'Reference architecture',
    ConceptDiagram: SpringCloudArchitectureDiagram,
    mechanicsTitle: 'Project bootstrap mechanics',
    mechanicsSteps: [
      { title: 'Define service boundaries', sub: 'domain ownership' },
      { title: 'Bootstrap platform services', sub: 'config/discovery/gateway' },
      { title: 'Connect business services', sub: 'register + route' },
      { title: 'Enable resilience + tracing', sub: 'fallback + telemetry' },
      { title: 'Deploy with health gates', sub: 'safe rollout' }
    ],
    scenarioTitle: 'Scenario: launch food-delivery backend',
    scenarioSteps: [
      { title: 'Client calls gateway', sub: 'single public endpoint' },
      { title: 'Gateway routes request', sub: 'path + auth policy' },
      { title: 'Service-to-service calls', sub: 'Feign + discovery' },
      { title: 'Failure guarded', sub: 'circuit breaker fallback' },
      { title: 'Trace + logs correlated', sub: 'incident visibility' }
    ],
    scenarioCaption: 'End-to-end request path in a practical multi-service production setup.'
  },
  'microservices-architecture-fundamentals': {
    eyebrow: 'Spring Cloud · Fundamentals',
    title: 'Microservices architecture fundamentals',
    subtitle: 'Core patterns: API gateway, service discovery, config externalization, and resilience.',
    why: [
      { title: 'Decoupled deploys', text: 'Services can release independently when contracts and observability are strong.' },
      { title: 'Failure isolation', text: 'Timeouts, retries, and circuit breakers prevent cascading failures.' },
      { title: 'Platform concerns', text: 'Discovery/config/routing are platform problems solved once for all services.' }
    ],
    conceptLabel: 'Fundamental building blocks',
    ConceptDiagram: SpringCloudApiGatewayRoutingDiagram,
    mechanicsTitle: 'Core runtime mechanics',
    mechanicsSteps: [
      { title: 'Request enters gateway', sub: 'edge control' },
      { title: 'Discovery resolves targets', sub: 'instance lookup' },
      { title: 'Config loaded externally', sub: 'profile-aware settings' },
      { title: 'Resilience wraps calls', sub: 'timeouts/fallbacks' },
      { title: 'Telemetry emitted', sub: 'trace/log metrics' }
    ],
    scenarioTitle: 'Scenario: checkout flow across services',
    scenarioSteps: [
      { title: 'Order API request', sub: 'via gateway' },
      { title: 'Inventory + payment calls', sub: 'service chain' },
      { title: 'Temporary payment outage', sub: 'breaker opens' },
      { title: 'Fallback response', sub: 'graceful degradation' },
      { title: 'Ops diagnose quickly', sub: 'trace + logs' }
    ],
    scenarioCaption: 'Illustrates why platform patterns are required, not optional, in distributed systems.'
  },
  'spring-cloud-config-server': {
    eyebrow: 'Spring Cloud · Config',
    title: 'Config Server for centralized configuration',
    subtitle: 'Store app config externally and deliver profile-specific settings at runtime.',
    why: [
      { title: 'No config in artifact', text: 'Deployment-time config keeps binaries immutable and environment-agnostic.' },
      { title: 'Git-backed history', text: 'Audit and rollback config changes like code.' },
      { title: 'Runtime refresh', text: 'Selective refresh reduces restarts for non-critical property updates.' }
    ],
    conceptLabel: 'Config fetch flow',
    ConceptDiagram: SpringCloudConfigServerFlowDiagram,
    mechanicsTitle: 'Config resolution mechanics',
    mechanicsSteps: [
      { title: 'Bootstrap context starts', sub: 'before app context' },
      { title: 'Request app/profile/label', sub: 'config endpoint call' },
      { title: 'Merge property sources', sub: 'priority order' },
      { title: 'Bind into beans', sub: '@ConfigurationProperties' },
      { title: 'Optional refresh', sub: 'bus/actuator trigger' }
    ],
    scenarioTitle: 'Scenario: emergency feature flag off',
    scenarioSteps: [
      { title: 'Edit Git config', sub: 'toggle property false' },
      { title: 'Config server serves new value', sub: 'next fetch/refresh' },
      { title: 'Target service refreshes', sub: 'scope-aware bean update' },
      { title: 'Traffic stabilizes', sub: 'risky path disabled' },
      { title: 'Post-incident review', sub: 'config commit trace' }
    ],
    scenarioCaption: 'Real operational pattern for safe change management during incidents.'
  },
  'spring-cloud-eureka': {
    eyebrow: 'Spring Cloud · Eureka',
    title: 'Service discovery with Eureka',
    subtitle: 'Dynamic service registration and lookup for changing instance topologies.',
    why: [
      { title: 'No hard-coded hosts', text: 'Callers discover healthy instances instead of static IP lists.' },
      { title: 'Elastic scaling', text: 'Autoscaling works when registry and heartbeat are reliable.' },
      { title: 'Zone-aware routing', text: 'Discovery metadata can guide smarter traffic decisions.' }
    ],
    conceptLabel: 'Discovery flow',
    ConceptDiagram: SpringCloudEurekaDiscoveryFlowDiagram,
    mechanicsTitle: 'Registry mechanics',
    mechanicsSteps: [
      { title: 'Instance starts', sub: 'register metadata' },
      { title: 'Heartbeat loop', sub: 'renew lease' },
      { title: 'Caller cache refresh', sub: 'pull registry view' },
      { title: 'Instance selection', sub: 'LB strategy picks node' },
      { title: 'Eviction on timeout', sub: 'stale nodes removed' }
    ],
    scenarioTitle: 'Scenario: sudden traffic spike scale-out',
    scenarioSteps: [
      { title: 'Autoscaler adds instances', sub: 'new pods/VMs' },
      { title: 'Instances register', sub: 'Eureka update' },
      { title: 'Callers refresh list', sub: 'new targets visible' },
      { title: 'Traffic spreads', sub: 'reduced hotspotting' },
      { title: 'Old nodes drain', sub: 'safe replacement' }
    ],
    scenarioCaption: 'Shows dynamic elasticity without manual endpoint updates.'
  },
  'spring-cloud-api-gateway': {
    eyebrow: 'Spring Cloud · Gateway',
    title: 'API Gateway routing and edge policies',
    subtitle: 'Single entry point for authentication, rate limits, and route control.',
    why: [
      { title: 'Edge centralization', text: 'Auth, CORS, and throttling are enforced consistently before service code.' },
      { title: 'Clean service APIs', text: 'Internal services stay focused on business logic, not edge concerns.' },
      { title: 'Traffic governance', text: 'Gateway makes canary routing and policy rollout safer.' }
    ],
    conceptLabel: 'Gateway pipeline',
    ConceptDiagram: SpringCloudApiGatewayRoutingDiagram,
    mechanicsTitle: 'Route execution mechanics',
    mechanicsSteps: [
      { title: 'Match predicates', sub: 'path/host/header rules' },
      { title: 'Apply pre-filters', sub: 'auth/rate-limit/log' },
      { title: 'Resolve target', sub: 'discovery + LB' },
      { title: 'Forward downstream', sub: 'service call' },
      { title: 'Apply post-filters', sub: 'headers/observability' }
    ],
    scenarioTitle: 'Scenario: mobile and web clients share gateway',
    scenarioSteps: [
      { title: 'Request enters edge', sub: 'single public host' },
      { title: 'JWT validation', sub: 'reject invalid callers' },
      { title: 'Route per path', sub: '/orders, /payments' },
      { title: 'Inject trace headers', sub: 'correlation' },
      { title: 'Return normalized errors', sub: 'consistent client behavior' }
    ],
    scenarioCaption: 'Demonstrates why gateway is an architecture boundary, not just a reverse proxy.'
  },
  'spring-cloud-load-balancing': {
    eyebrow: 'Spring Cloud · Load balancing',
    title: 'Client-side load balancing',
    subtitle: 'Distribute calls across service instances with pluggable strategies.',
    why: [
      { title: 'Latency smoothing', text: 'Traffic spread avoids overloading one instance and reduces tail latency.' },
      { title: 'Failure adaptation', text: 'Unhealthy instances are skipped when health and retries are configured well.' },
      { title: 'Strategy control', text: 'Round-robin or custom logic can match workload characteristics.' }
    ],
    conceptLabel: 'Balancer flow',
    ConceptDiagram: SpringCloudLoadBalancingFlowDiagram,
    mechanicsTitle: 'Balancing mechanics',
    mechanicsSteps: [
      { title: 'Get instance list', sub: 'discovery snapshot' },
      { title: 'Apply filter rules', sub: 'health/zone metadata' },
      { title: 'Select candidate', sub: 'strategy decision' },
      { title: 'Execute call', sub: 'timeout + retry policy' },
      { title: 'Record outcome', sub: 'metrics for tuning' }
    ],
    scenarioTitle: 'Scenario: uneven pod performance',
    scenarioSteps: [
      { title: 'Detect slow instance', sub: 'high p95 latency' },
      { title: 'Adjust strategy', sub: 'zone/weight hints' },
      { title: 'Retry safe failures', sub: 'idempotent calls only' },
      { title: 'Observe impact', sub: 'error and latency drop' },
      { title: 'Roll into default', sub: 'standardized policy' }
    ],
    scenarioCaption: 'Shows practical balancing and tuning cycle in production.'
  },
  'spring-cloud-openfeign': {
    eyebrow: 'Spring Cloud · OpenFeign',
    title: 'Declarative inter-service HTTP clients',
    subtitle: 'Interface-driven HTTP calls with discovery, load balancing, and policy integration.',
    why: [
      { title: 'Readable contracts', text: 'Interface signatures communicate remote API usage clearly.' },
      { title: 'Policy integration', text: 'Timeout, retry, and circuit-breaker policies attach cleanly per client.' },
      { title: 'Consistent decoding', text: 'Shared encoders/decoders reduce ad-hoc HTTP parsing bugs.' }
    ],
    conceptLabel: 'Feign call lifecycle',
    ConceptDiagram: SpringCloudOpenFeignCallDiagram,
    mechanicsTitle: 'Feign runtime mechanics',
    mechanicsSteps: [
      { title: 'Method invocation', sub: 'proxy intercepts call' },
      { title: 'Template expansion', sub: 'path/query/header binding' },
      { title: 'Discovery + LB', sub: 'target instance selected' },
      { title: 'HTTP exchange', sub: 'serialize + send request' },
      { title: 'Decode result', sub: 'map response to DTO' }
    ],
    scenarioTitle: 'Scenario: order service calls payment service',
    scenarioSteps: [
      { title: 'Invoke Feign method', sub: 'charge(orderId)' },
      { title: 'Token propagation', sub: 'auth header forward' },
      { title: 'Timeout threshold', sub: 'fast-fail on slowness' },
      { title: 'Fallback path', sub: 'queue payment retry' },
      { title: 'Return order state', sub: 'pending/confirmed' }
    ],
    scenarioCaption: 'Practical remote-call pattern balancing reliability and user experience.'
  },
  'spring-cloud-resilience4j': {
    eyebrow: 'Spring Cloud · Resilience4j',
    title: 'Circuit breakers, retries, and bulkheads',
    subtitle: 'Contain failures and preserve partial service availability under stress.',
    why: [
      { title: 'Stop cascading failures', text: 'Breakers prevent repeated calls to failing dependencies.' },
      { title: 'Graceful degradation', text: 'Fallbacks return controlled responses instead of full outage.' },
      { title: 'Policy visibility', text: 'State metrics make resilience behavior observable and tunable.' }
    ],
    conceptLabel: 'Circuit breaker states',
    ConceptDiagram: SpringCloudResilienceCircuitBreakerDiagram,
    mechanicsTitle: 'Resilience policy mechanics',
    mechanicsSteps: [
      { title: 'Track call outcomes', sub: 'success/error/slow-call stats' },
      { title: 'Evaluate thresholds', sub: 'failure/slow rate windows' },
      { title: 'Transition state', sub: 'closed/open/half-open' },
      { title: 'Apply fallback', sub: 'default response path' },
      { title: 'Recover gradually', sub: 'trial calls in half-open' }
    ],
    scenarioTitle: 'Scenario: payment dependency instability',
    scenarioSteps: [
      { title: 'Error spike detected', sub: 'timeouts increase' },
      { title: 'Breaker opens', sub: 'protect caller threads' },
      { title: 'Fallback returns pending', sub: 'user sees queued state' },
      { title: 'Dependency recovers', sub: 'half-open probes pass' },
      { title: 'Breaker closes', sub: 'normal traffic resumes' }
    ],
    scenarioCaption: 'Demonstrates resilient behavior without complete user-facing outage.'
  },
  'spring-cloud-distributed-tracing': {
    eyebrow: 'Spring Cloud · Tracing',
    title: 'Distributed tracing and correlation',
    subtitle: 'Track one request across many services with trace/span IDs.',
    why: [
      { title: 'Faster debugging', text: 'Trace path pinpoints where latency or errors occur in call chains.' },
      { title: 'Cross-service visibility', text: 'Correlated spans connect logs/metrics across boundaries.' },
      { title: 'SLO analysis', text: 'Trace data supports dependency-level latency optimization.' }
    ],
    conceptLabel: 'Trace propagation',
    ConceptDiagram: SpringCloudDistributedTracingFlowDiagram,
    mechanicsTitle: 'Tracing mechanics',
    mechanicsSteps: [
      { title: 'Create trace id at edge', sub: 'gateway entry span' },
      { title: 'Propagate headers', sub: 'B3/W3C context' },
      { title: 'Create child spans', sub: 'each hop instrumented' },
      { title: 'Export to backend', sub: 'Zipkin/Tempo/Jaeger' },
      { title: 'Analyze waterfall', sub: 'bottleneck identification' }
    ],
    scenarioTitle: 'Scenario: checkout latency regression',
    scenarioSteps: [
      { title: 'User reports slowness', sub: 'sporadic 4s response' },
      { title: 'Search trace id', sub: 'gateway logs' },
      { title: 'Find hot span', sub: 'inventory dependency delay' },
      { title: 'Mitigate with cache/retry', sub: 'reduce wait time' },
      { title: 'Verify improvement', sub: 'p95 trace duration drops' }
    ],
    scenarioCaption: 'A realistic troubleshooting flow enabled by distributed tracing.'
  },
  'spring-cloud-security': {
    eyebrow: 'Spring Cloud · Security',
    title: 'Token propagation and service authorization',
    subtitle: 'Secure edge and internal calls with identity context propagation.',
    why: [
      { title: 'Zero trust mindset', text: 'Every hop must validate or trust signed context explicitly.' },
      { title: 'Least privilege', text: 'Scope/role checks should happen at service boundaries.' },
      { title: 'Operational hardening', text: 'Token expiry/rotation and policy consistency reduce attack surface.' }
    ],
    conceptLabel: 'Token flow',
    ConceptDiagram: SpringCloudSecurityTokenFlowDiagram,
    mechanicsTitle: 'Security mechanics',
    mechanicsSteps: [
      { title: 'Authenticate at edge', sub: 'JWT/OAuth2 validation' },
      { title: 'Propagate claims', sub: 'identity context headers' },
      { title: 'Authorize per service', sub: 'scope/role checks' },
      { title: 'Protect service-to-service', sub: 'mutual trust policy' },
      { title: 'Audit outcomes', sub: 'security events + traces' }
    ],
    scenarioTitle: 'Scenario: restricted admin operation',
    scenarioSteps: [
      { title: 'Admin endpoint call', sub: 'token includes scopes' },
      { title: 'Gateway validates token', sub: 'signature + expiry' },
      { title: 'Service enforces role', sub: 'deny unauthorized' },
      { title: 'Action logged with trace', sub: 'audit evidence' },
      { title: 'Response returned', sub: 'success/forbidden' }
    ],
    scenarioCaption: 'Shows layered authorization and auditability in distributed systems.'
  },
  'spring-cloud-elk': {
    eyebrow: 'Spring Cloud · ELK',
    title: 'Centralized logging with ELK stack',
    subtitle: 'Aggregate, parse, and search logs from all services in one place.',
    why: [
      { title: 'Single pane of glass', text: 'Operations teams query one place instead of per-service log files.' },
      { title: 'Incident speed', text: 'Correlating logs by trace id reduces mean time to resolution.' },
      { title: 'Retention and analysis', text: 'Historical search supports postmortems and trend analysis.' }
    ],
    conceptLabel: 'ELK pipeline',
    ConceptDiagram: SpringCloudElkPipelineDiagram,
    mechanicsTitle: 'Logging pipeline mechanics',
    mechanicsSteps: [
      { title: 'Emit structured logs', sub: 'JSON with trace ids' },
      { title: 'Ship from nodes', sub: 'agent-based forwarding' },
      { title: 'Parse/enrich events', sub: 'Logstash pipeline' },
      { title: 'Index for search', sub: 'Elasticsearch shards' },
      { title: 'Visualize alerts', sub: 'Kibana dashboards' }
    ],
    scenarioTitle: 'Scenario: production error burst investigation',
    scenarioSteps: [
      { title: 'Alert triggers', sub: '5xx spike detected' },
      { title: 'Filter by trace/service', sub: 'narrow noisy logs' },
      { title: 'Identify root exception', sub: 'stack + context' },
      { title: 'Correlate with deploy', sub: 'time-window analysis' },
      { title: 'Ship fix + monitor', sub: 'error rate drops' }
    ],
    scenarioCaption: 'Operational workflow for debugging distributed production incidents.'
  },
  'spring-cloud-microservices': {
    eyebrow: 'Spring Cloud · Overview',
    title: 'Spring Cloud microservices overview',
    subtitle: 'How Spring Cloud components combine into an end-to-end distributed platform.',
    why: [
      { title: 'System thinking', text: 'Value comes from component integration, not isolated tools.' },
      { title: 'Lifecycle approach', text: 'Design, operate, observe, and secure as one architecture loop.' },
      { title: 'Scalable delivery', text: 'Team autonomy grows when platform patterns are standardized.' }
    ],
    conceptLabel: 'Integrated platform view',
    ConceptDiagram: SpringCloudLoadBalancingFlowDiagram,
    mechanicsTitle: 'End-to-end request mechanics',
    mechanicsSteps: [
      { title: 'Edge ingress', sub: 'gateway policy enforcement' },
      { title: 'Service discovery', sub: 'runtime target resolution' },
      { title: 'Inter-service call', sub: 'Feign/LB/Resilience' },
      { title: 'Telemetry emission', sub: 'trace + logs + metrics' },
      { title: 'Operational response', sub: 'alerts and remediation' }
    ],
    scenarioTitle: 'Scenario: order placement end-to-end',
    scenarioSteps: [
      { title: 'Client submits order', sub: 'gateway endpoint' },
      { title: 'Order service orchestrates', sub: 'payment + inventory' },
      { title: 'One dependency degrades', sub: 'fallback path activated' },
      { title: 'State returned safely', sub: 'pending/confirmed result' },
      { title: 'Ops observability', sub: 'trace-backed triage' }
    ],
    scenarioCaption: 'Complete microservice journey from request entry to operations feedback loop.'
  },
  'microservices-mcq': {
    eyebrow: 'Spring Cloud · MCQ',
    title: 'Revision path for microservices exam',
    subtitle: 'Prioritize architecture, discovery, routing, resilience, and observability.',
    why: [
      { title: 'Foundational ordering', text: 'Strong sequence helps retain cross-topic relationships.' },
      { title: 'Frequent pitfalls', text: 'Questions often test failure handling and consistency trade-offs.' },
      { title: 'Interview crossover', text: 'MCQ prep overlaps practical architecture explanations.' }
    ],
    conceptLabel: 'Revision architecture map',
    ConceptDiagram: SpringCloudResilienceCircuitBreakerDiagram,
    mechanicsTitle: 'MCQ reasoning mechanics',
    mechanicsSteps: [
      { title: 'Identify component role', sub: 'gateway/config/discovery' },
      { title: 'Understand call flow', sub: 'who talks to whom' },
      { title: 'Evaluate failure behavior', sub: 'breaker/retry fallback' },
      { title: 'Check observability path', sub: 'trace/log visibility' },
      { title: 'Select best trade-off', sub: 'scalability vs complexity' }
    ],
    scenarioTitle: 'Scenario: last-day preparation sprint',
    scenarioSteps: [
      { title: 'Review architecture basics', sub: 'platform components' },
      { title: 'Solve discovery/routing questions', sub: 'runtime behavior' },
      { title: 'Practice resilience cases', sub: 'outage patterns' },
      { title: 'Cover observability/security', sub: 'ops + auth' },
      { title: 'Mock test timed run', sub: 'confidence check' }
    ],
    scenarioCaption: 'Structured revision strategy aligned with common Spring Cloud exam patterns.'
  }
};

export default function SpringCloudTopicRuntimeShowcase({ topicId }) {
  const cfg = CONFIG[topicId];
  if (!cfg) return null;
  const [tab, setTab] = useState('core');
  const compact = (text, max = 22) => {
    if (!text) return '';
    const t = text.replace(/^Scenario:\s*/i, '').trim();
    return t.length > max ? `${t.slice(0, max - 1)}…` : t;
  };
  const coreTabLabel = compact(cfg.conceptLabel || cfg.title || 'Core concept');
  const mechanicsTabLabel = compact(cfg.mechanicsTitle || `${cfg.title} mechanics`);
  const scenarioTabLabel = compact(cfg.scenarioTitle || `${cfg.title} scenario`);
  const pitfallsTabLabel = compact(`${cfg.title} pitfalls`);
  const interviewTabLabel = compact(`${cfg.title} interview`);

  const depthTabs = [
    ['core', coreTabLabel],
    ['mechanics', mechanicsTabLabel],
    ['scenario', scenarioTabLabel],
    ['pitfalls', pitfallsTabLabel],
    ['interview', interviewTabLabel]
  ];
  const coreCaption = cfg.coreCaption ?? cfg.subtitle;
  const mechanicsCaption =
    cfg.mechanicsCaption ??
    `Explains runtime steps for: ${cfg.mechanicsTitle || cfg.title}.`;
  const pitfallsCaption = cfg.pitfallsCaption ?? 'Use this checklist to prevent the most common production failures.';
  const interviewCaption = cfg.interviewCaption ?? 'Use this structure to answer interview questions with practical depth.';

  const derivePitfallsSteps = () => {
    const m = cfg.mechanicsSteps ?? [];
    const s = cfg.scenarioSteps ?? [];
    const fromMechanics = m.slice(0, 4).map((st) => ({
      title: `${st.title} failure`,
      sub: `can break: ${st.sub}`
    }));
    const fromScenario = s.slice(0, 4).map((st) => ({
      title: `${st.title} breakdown`,
      sub: `causes: ${st.sub}`
    }));
    return [...fromMechanics, ...fromScenario].slice(0, 8);
  };

  const deriveInterviewSteps = () => {
    const m = cfg.mechanicsSteps ?? [];
    const s = cfg.scenarioSteps ?? [];
    const fromScenario = s.slice(0, 4).map((st) => ({
      title: `Explain: ${st.title}`,
      sub: `what to watch: ${st.sub}`
    }));
    const fromMechanics = m.slice(0, 4).map((st) => ({
      title: `Under the hood: ${st.title}`,
      sub: `trade-off: ${st.sub}`
    }));
    return [...fromScenario, ...fromMechanics].slice(0, 8);
  };

  const pitfallsSteps = derivePitfallsSteps();
  const interviewSteps = deriveInterviewSteps();

  return (
    <div className="sc-showcase">
      <SpringCloudHero eyebrow={cfg.eyebrow} title={cfg.title} subtitle={cfg.subtitle} />
      <SpringCloudWhyGrid items={cfg.why} />

      <div className="sc-tabs">
        {depthTabs.map(([id, label]) => (
          <button key={id} type="button" className={`sc-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>

      <div className="sc-panel">
        {tab === 'core' && (
          <>
            <SpringCloudDiagramFrame label={coreTabLabel}>
              <cfg.ConceptDiagram />
            </SpringCloudDiagramFrame>
            <p className="sc-caption">{coreCaption}</p>
          </>
        )}
        {tab === 'mechanics' && (
          <>
            <SpringCloudDiagramFrame label={mechanicsTabLabel}>
              <SpringCloudMechanicsTabDiagram
                topicId={topicId}
                title={cfg.mechanicsTitle}
                subtitle={`Runtime steps: ${cfg.mechanicsTitle}`}
                steps={cfg.mechanicsSteps}
              />
            </SpringCloudDiagramFrame>
            <p className="sc-caption">{mechanicsCaption}</p>
          </>
        )}
        {tab === 'scenario' && (
          <>
            <SpringCloudDiagramFrame label={scenarioTabLabel}>
              <SpringCloudScenarioTabDiagram
                topicId={topicId}
                title={cfg.scenarioTitle}
                subtitle={`End-to-end: ${cfg.scenarioTitle}`}
                steps={cfg.scenarioSteps}
              />
            </SpringCloudDiagramFrame>
            <p className="sc-caption">{cfg.scenarioCaption}</p>
          </>
        )}
        {tab === 'pitfalls' && (
          <>
            <SpringCloudDiagramFrame label={pitfallsTabLabel}>
              <SpringCloudPitfallsTabDiagram
                topicId={topicId}
                title={`${cfg.title} pitfalls`}
                subtitle={`Failure modes for: ${cfg.title}`}
                steps={pitfallsSteps}
              />
            </SpringCloudDiagramFrame>
            <p className="sc-caption">{pitfallsCaption}</p>
          </>
        )}
        {tab === 'interview' && (
          <>
            <SpringCloudDiagramFrame label={interviewTabLabel}>
              <SpringCloudInterviewTabDiagram
                topicId={topicId}
                title={`${cfg.title} interview`}
                subtitle={`How to explain: ${cfg.title}`}
                steps={interviewSteps}
              />
            </SpringCloudDiagramFrame>
            <p className="sc-caption">{interviewCaption}</p>
          </>
        )}
        {cfg.callout && (
          <SpringCloudCallout variant="tip" title={cfg.callout.title}>
            {cfg.callout.body}
          </SpringCloudCallout>
        )}
      </div>
    </div>
  );
}
