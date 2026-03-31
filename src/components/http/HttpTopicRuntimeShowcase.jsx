import { useState } from 'react';
import { SpringHero, SpringWhyGrid, SpringDiagramFrame, SpringCallout } from '../springboot/SpringBlocks';
import {
  HttpInterviewMapDiagram,
  HttpMechanicsFlowDiagram,
  HttpNarrativeFlowDiagram,
  HttpPitfallsDiagram,
  HttpScenarioFlowDiagram
} from './HttpShowcaseDiagrams';

const CONFIG = {
  'http-introduction': {
    eyebrow: 'HTTP & APIs · Fundamentals',
    title: 'HTTP Introduction',
    subtitle: 'How the web request-response model works, evolves, and scales in modern systems.',
    why: [
      { title: 'Protocol foundation', text: 'All API calls and browser traffic rely on HTTP semantics.' },
      { title: 'Performance context', text: 'HTTP/1.1, HTTP/2, and HTTP/3 choices change latency and throughput.' },
      { title: 'Architecture clarity', text: 'Understanding stateless communication helps design robust backend services.' }
    ]
  },
  'http-request-structure': {
    eyebrow: 'HTTP & APIs · Request',
    title: 'HTTP Request Structure',
    subtitle: 'Break down request line, headers, and body to understand how clients communicate intent.',
    why: [
      { title: 'Correct parsing', text: 'Servers route and validate based on request method, URL, and headers.' },
      { title: 'Security guardrails', text: 'Auth and content headers decide whether a request is accepted.' },
      { title: 'Debugging speed', text: 'Most integration issues are visible directly in malformed request details.' }
    ]
  },
  'http-response-structure': {
    eyebrow: 'HTTP & APIs · Response',
    title: 'HTTP Response Structure',
    subtitle: 'Shape reliable responses with status line, headers, and payload contracts.',
    why: [
      { title: 'Client behavior', text: 'Status codes and headers tell clients what to do next.' },
      { title: 'Observability', text: 'Consistent response contracts reduce production troubleshooting time.' },
      { title: 'API trust', text: 'Stable response formatting keeps frontend and consumers predictable.' }
    ]
  },
  'http-methods': {
    eyebrow: 'HTTP & APIs · Methods',
    title: 'HTTP Methods',
    subtitle: 'Use GET, POST, PUT, PATCH, DELETE, OPTIONS, and HEAD with proper semantics.',
    why: [
      { title: 'REST correctness', text: 'Method choice communicates intent and side effects clearly.' },
      { title: 'Caching and retries', text: 'Safe/idempotent methods influence retry and CDN strategy.' },
      { title: 'Platform compatibility', text: 'Gateways and proxies handle methods differently based on standards.' }
    ]
  },
  'http-headers': {
    eyebrow: 'HTTP & APIs · Headers',
    title: 'HTTP Headers',
    subtitle: 'Headers carry metadata for auth, caching, negotiation, and distributed tracing.',
    why: [
      { title: 'Protocol metadata', text: 'Headers define content type, auth scope, and caching behavior.' },
      { title: 'Security posture', text: 'HSTS, CSP, and auth headers enforce critical protections.' },
      { title: 'Cross-system context', text: 'Correlation and custom headers support end-to-end diagnostics.' }
    ]
  },
  'https-security': {
    eyebrow: 'HTTP & APIs · Security',
    title: 'HTTPS & TLS Security',
    subtitle: 'Encrypt transport, verify identity, and protect users from interception and tampering.',
    why: [
      { title: 'Data protection', text: 'TLS prevents plaintext leakage across untrusted networks.' },
      { title: 'Identity assurance', text: 'Certificates prove the server you connect to is authentic.' },
      { title: 'Compliance baseline', text: 'Modern browsers and standards require HTTPS by default.' }
    ]
  },
  'cookies-sessions': {
    eyebrow: 'HTTP & APIs · State',
    title: 'Cookies and Sessions',
    subtitle: 'Maintain user context on top of stateless HTTP with secure session patterns.',
    why: [
      { title: 'User continuity', text: 'Sessions preserve login and cart state across requests.' },
      { title: 'Security controls', text: 'HttpOnly/Secure/SameSite reduce token theft and CSRF risk.' },
      { title: 'Architecture trade-offs', text: 'Stateful sessions and stateless tokens impact scalability differently.' }
    ]
  },
  'http-caching': {
    eyebrow: 'HTTP & APIs · Performance',
    title: 'HTTP Caching',
    subtitle: 'Use Cache-Control, ETag, and validation flows to reduce latency and server load.',
    why: [
      { title: 'Faster responses', text: 'Correct cache policies avoid unnecessary origin calls.' },
      { title: 'Lower infra cost', text: 'Caching cuts compute and database pressure in high traffic APIs.' },
      { title: 'Consistency strategy', text: 'Validation headers balance freshness and performance.' }
    ]
  },
  cors: {
    eyebrow: 'HTTP & APIs · Browser Security',
    title: 'CORS',
    subtitle: 'Control cross-origin API access with preflight checks and least-privilege policies.',
    why: [
      { title: 'Browser enforcement', text: 'Same-Origin Policy blocks unsafe cross-site access by default.' },
      { title: 'Safe interoperability', text: 'CORS rules allow trusted clients without opening all origins.' },
      { title: 'Misconfig prevention', text: 'Overly broad CORS often creates avoidable security exposure.' }
    ]
  },
  'http-status-codes': {
    eyebrow: 'HTTP & APIs · Semantics',
    title: 'HTTP Status Codes',
    subtitle: 'Communicate success, failure, and retry behavior with correct status families.',
    why: [
      { title: 'Client guidance', text: 'Status codes drive retries, UX states, and fallback logic.' },
      { title: 'API consistency', text: 'Uniform status mapping simplifies frontend error handling.' },
      { title: 'Operational insight', text: '4xx/5xx trends quickly reveal validation vs system failures.' }
    ]
  },
  'api-introduction': {
    eyebrow: 'HTTP & APIs · API Basics',
    title: 'API Introduction',
    subtitle: 'Understand API types, contracts, and how systems integrate through interfaces.',
    why: [
      { title: 'Integration mindset', text: 'APIs are the boundary between independent systems and teams.' },
      { title: 'Product strategy', text: 'Public, private, and partner APIs serve different business goals.' },
      { title: 'Contract-first thinking', text: 'Clear interface design lowers coupling and change risk.' }
    ]
  },
  'rest-api-fundamentals': {
    eyebrow: 'HTTP & APIs · REST',
    title: 'REST API Fundamentals',
    subtitle: 'Apply REST constraints for scalable, cacheable, and evolvable web APIs.',
    why: [
      { title: 'Uniform design', text: 'Resource-oriented APIs are easier for clients to understand.' },
      { title: 'Scalability', text: 'Stateless communication simplifies horizontal scaling.' },
      { title: 'Ecosystem fit', text: 'REST conventions align with standard HTTP tooling and gateways.' }
    ]
  },
  'restful-api-design': {
    eyebrow: 'HTTP & APIs · Design',
    title: 'RESTful API Design',
    subtitle: 'Design URL naming, versioning, pagination, and filtering for production-ready APIs.',
    why: [
      { title: 'Long-term maintainability', text: 'Good naming and versioning reduce breaking-change pressure.' },
      { title: 'Consumer experience', text: 'Consistent filtering and pagination reduce client complexity.' },
      { title: 'Governance', text: 'Design standards keep large API portfolios coherent.' }
    ]
  },
  'request-response-formats': {
    eyebrow: 'HTTP & APIs · Payloads',
    title: 'Request & Response Formats',
    subtitle: 'Choose JSON, XML, form-data, and multipart formats based on use case and clients.',
    why: [
      { title: 'Compatibility', text: 'Different clients and integrations require different payload formats.' },
      { title: 'Validation quality', text: 'Schema-aware payloads improve data integrity and error clarity.' },
      { title: 'Efficiency', text: 'Format and encoding choices affect payload size and parsing cost.' }
    ]
  },
  'authentication-authorization': {
    eyebrow: 'HTTP & APIs · Access Control',
    title: 'Authentication & Authorization',
    subtitle: 'Secure APIs with API keys, JWT, OAuth2 flows, and role/scope enforcement.',
    why: [
      { title: 'Identity assurance', text: 'Authentication confirms who is making each request.' },
      { title: 'Least privilege', text: 'Authorization restricts actions to approved permissions.' },
      { title: 'Breach containment', text: 'Token expiry and scoped access limit blast radius.' }
    ]
  },
  'api-testing-tools': {
    eyebrow: 'HTTP & APIs · Quality',
    title: 'API Testing Tools',
    subtitle: 'Validate API behavior with Postman, cURL, Swagger UI, and automated test suites.',
    why: [
      { title: 'Shift-left reliability', text: 'Fast request-level validation catches regressions early.' },
      { title: 'Team collaboration', text: 'Shared collections and environments standardize API checks.' },
      { title: 'CI confidence', text: 'Automated API tests guard contracts on every deployment.' }
    ]
  },
  'api-documentation': {
    eyebrow: 'HTTP & APIs · Docs',
    title: 'API Documentation',
    subtitle: 'Use OpenAPI and examples to make APIs discoverable, testable, and adoptable.',
    why: [
      { title: 'Developer onboarding', text: 'Good docs shorten time from first call to real integration.' },
      { title: 'Contract alignment', text: 'Documentation keeps producers and consumers synchronized.' },
      { title: 'Automation', text: 'OpenAPI enables client generation, mocks, and test scaffolding.' }
    ]
  },
  'rate-limiting': {
    eyebrow: 'HTTP & APIs · Protection',
    title: 'API Rate Limiting',
    subtitle: 'Throttle abuse and maintain fairness with quotas, burst control, and policy headers.',
    why: [
      { title: 'Abuse prevention', text: 'Rate limits protect APIs from accidental and malicious overload.' },
      { title: 'Service fairness', text: 'Tenant-aware limits prevent noisy-neighbor impact.' },
      { title: 'Predictable capacity', text: 'Traffic shaping keeps backend resources stable under spikes.' }
    ]
  },
  'api-security-best-practices': {
    eyebrow: 'HTTP & APIs · Hardening',
    title: 'API Security Best Practices',
    subtitle: 'Defend APIs with validation, safe defaults, and layered controls across the stack.',
    why: [
      { title: 'Attack reduction', text: 'Input validation and output encoding block common exploit paths.' },
      { title: 'Defense in depth', text: 'Multiple controls reduce single-point security failure risk.' },
      { title: 'Operational resilience', text: 'Secure-by-default patterns improve incident preparedness.' }
    ]
  },
  'microservices-apis': {
    eyebrow: 'HTTP & APIs · Distributed Systems',
    title: 'Microservices & APIs',
    subtitle: 'Coordinate service-to-service API communication with gateway, resilience, and tracing.',
    why: [
      { title: 'Service boundaries', text: 'API contracts are the backbone of microservice autonomy.' },
      { title: 'Failure handling', text: 'Retries, breakers, and timeouts prevent cascading outages.' },
      { title: 'Runtime visibility', text: 'Tracing and logs are mandatory in distributed request paths.' }
    ]
  },
  'advanced-api-concepts': {
    eyebrow: 'HTTP & APIs · Advanced',
    title: 'Advanced API Concepts',
    subtitle: 'Compare HATEOAS, GraphQL, WebSockets, and gRPC for modern API architectures.',
    why: [
      { title: 'Right tool choice', text: 'Different interaction models fit different product constraints.' },
      { title: 'Performance tuning', text: 'Protocol and transport selection affects latency and payload cost.' },
      { title: 'Architecture evolution', text: 'Advanced patterns help scale beyond basic REST scenarios.' }
    ]
  },
  'global-exception-handling-http': {
    eyebrow: 'HTTP & APIs · Error Handling',
    title: 'Global Exception Handling',
    subtitle: 'Centralize API error mapping for cleaner code and consistent client-facing responses.',
    why: [
      { title: 'Consistency', text: 'Shared error format keeps clients stable across endpoints.' },
      { title: 'Cleaner controllers', text: 'Business code stays focused when handlers own error translation.' },
      { title: 'Faster diagnosis', text: 'Structured error metadata improves production triage.' }
    ]
  }
};

function getTopicProfile(topicId, title) {
  const defaults = {
    tabs: ['Core flow', 'Runtime mechanics', 'Real scenario', 'Pitfalls', 'Interview map'],
    steps: {
      core: [
        { title: 'Client intent', sub: `${title} request enters API boundary` },
        { title: 'Protocol rules', sub: `${topicId} semantics applied consistently` },
        { title: 'Backend handling', sub: 'service logic validates and processes input' },
        { title: 'Response contract', sub: 'status, headers, and body returned predictably' }
      ],
      mechanics: [
        { title: 'Parse input', sub: 'read method/path/headers/body safely' },
        { title: 'Apply policy', sub: 'auth, validation, rate/cors/cache checks' },
        { title: 'Execute action', sub: 'route to service and data dependencies' },
        { title: 'Shape response', sub: 'serialize payload and attach protocol metadata' }
      ],
      scenario: [
        { title: 'User/app request', sub: 'consumer sends a real API call' },
        { title: 'Gateway/backend checks', sub: 'security and protocol rules enforced' },
        { title: 'Business operation', sub: 'service executes domain logic' },
        { title: 'Client outcome', sub: 'consumer receives actionable success/error response' }
      ],
      pitfalls: [
        { title: 'Ambiguous contracts', sub: 'inconsistent status/payload breaks clients' },
        { title: 'Weak validation', sub: 'unsafe input reaches business/data layers' },
        { title: 'Missing limits', sub: 'traffic spikes degrade system reliability' },
        { title: 'Poor observability', sub: 'incidents take longer to debug and fix' }
      ],
      interview: [
        { title: 'State the problem', sub: `when ${title.toLowerCase()} matters in production` },
        { title: 'Explain runtime flow', sub: 'show request to response path clearly' },
        { title: 'Call out trade-offs', sub: 'security, latency, and maintainability choices' },
        { title: 'Prove outcomes', sub: 'mention metrics, incidents, or improvement results' }
      ]
    }
  };

  const profiles = {
    'http-introduction': {
      tabs: ['HTTP journey', 'Version evolution', 'Web request cycle', 'Protocol mistakes', 'Interview framing'],
      steps: {
        core: [
          { title: 'Browser sends request', sub: 'client opens connection and sends HTTP message' },
          { title: 'Server interprets intent', sub: 'method/path/headers decide route' },
          { title: 'Resource processing', sub: 'application prepares content' },
          { title: 'Response returned', sub: 'status + headers + body sent to client' }
        ],
        mechanics: [
          { title: 'HTTP/1.1 keep-alive', sub: 'reuses TCP connections' },
          { title: 'HTTP/2 multiplexing', sub: 'parallel streams on one connection' },
          { title: 'HTTP/3 with QUIC', sub: 'reduced head-of-line blocking' },
          { title: 'Stateless handling', sub: 'each request handled independently' }
        ],
        scenario: [
          { title: 'User opens site', sub: 'GET / landing page' },
          { title: 'Assets requested', sub: 'CSS/JS/images over additional requests' },
          { title: 'Server replies', sub: '200 responses with content' },
          { title: 'Page renders', sub: 'browser composes final UI' }
        ]
      }
    },
    'http-request-structure': {
      tabs: ['Request anatomy', 'Parsing path', 'Inbound example', 'Request errors', 'Interview framing'],
      steps: {
        core: [
          { title: 'Request line', sub: 'METHOD + URL + HTTP version' },
          { title: 'Headers section', sub: 'host, auth, content metadata' },
          { title: 'Optional body', sub: 'payload for POST/PUT/PATCH' },
          { title: 'Server route match', sub: 'controller/handler selected' }
        ],
        mechanics: [
          { title: 'URL parse', sub: 'path, query params, variables split' },
          { title: 'Header parse', sub: 'case-insensitive key resolution' },
          { title: 'Body decode', sub: 'json/form/multipart readers' },
          { title: 'Validation stage', sub: 'schema/constraints checked' }
        ]
      }
    },
    'http-response-structure': {
      tabs: ['Response anatomy', 'Server shaping', 'Outbound example', 'Response mistakes', 'Interview framing'],
      steps: {
        core: [
          { title: 'Status line created', sub: 'version + code + reason' },
          { title: 'Headers attached', sub: 'content-type/cache/cors metadata' },
          { title: 'Body serialized', sub: 'json/html/file stream output' },
          { title: 'Client receives response', sub: 'renders UI or handles API result' }
        ]
      }
    },
    'http-methods': {
      tabs: ['Method semantics', 'Safety/idempotency', 'CRUD scenario', 'Method misuse', 'Interview framing'],
      steps: {
        core: [
          { title: 'GET', sub: 'read resource without mutation' },
          { title: 'POST', sub: 'create new resource/action' },
          { title: 'PUT/PATCH', sub: 'update complete/partial resource' },
          { title: 'DELETE', sub: 'remove resource representation' }
        ]
      }
    },
    'http-headers': {
      tabs: ['Header categories', 'Header pipeline', 'Header scenario', 'Header pitfalls', 'Interview framing'],
      steps: {
        core: [
          { title: 'General headers', sub: 'connection and control metadata' },
          { title: 'Request headers', sub: 'authorization, accept, user-agent' },
          { title: 'Response headers', sub: 'cache-control, content-type, etag' },
          { title: 'Custom headers', sub: 'trace-id and domain metadata' }
        ]
      }
    },
    'https-security': {
      tabs: ['TLS handshake', 'Certificate validation', 'Secure request flow', 'HTTPS risks', 'Interview framing'],
      steps: {
        core: [
          { title: 'Client hello', sub: 'cipher suites and protocol versions' },
          { title: 'Server certificate', sub: 'identity proof returned' },
          { title: 'Session key exchange', sub: 'shared secret negotiated' },
          { title: 'Encrypted HTTP', sub: 'application data travels securely' }
        ]
      }
    },
    'cookies-sessions': {
      tabs: ['State lifecycle', 'Session mechanics', 'Login scenario', 'Session risks', 'Interview framing'],
      steps: {
        core: [
          { title: 'Login success', sub: 'server creates session id' },
          { title: 'Set-Cookie header', sub: 'session token stored in browser' },
          { title: 'Subsequent requests', sub: 'cookie sent automatically' },
          { title: 'Session lookup', sub: 'server restores user context' }
        ]
      }
    },
    'http-caching': {
      tabs: ['Cache lifecycle', 'Validation flow', 'CDN/browser scenario', 'Cache pitfalls', 'Interview framing'],
      steps: {
        core: [
          { title: 'First fetch', sub: 'response stored with cache headers' },
          { title: 'Revalidation', sub: 'If-None-Match / If-Modified-Since sent' },
          { title: '304 Not Modified', sub: 'cached body reused by client' },
          { title: 'Cache refresh', sub: 'new body downloaded on change' }
        ]
      }
    },
    cors: {
      tabs: ['CORS model', 'Preflight request', 'Browser scenario', 'CORS misconfig', 'Interview framing'],
      steps: {
        core: [
          { title: 'Cross-origin request', sub: 'browser detects origin mismatch' },
          { title: 'OPTIONS preflight', sub: 'checks allowed methods/headers' },
          { title: 'Server CORS headers', sub: 'Access-Control-Allow-* returned' },
          { title: 'Actual request allowed', sub: 'browser proceeds or blocks' }
        ]
      }
    },
    'http-status-codes': {
      tabs: ['Status families', 'Decision mapping', 'API status scenario', 'Wrong status usage', 'Interview framing'],
      steps: {
        core: [
          { title: '1xx / 3xx info-redirection', sub: 'protocol coordination responses' },
          { title: '2xx success', sub: 'request accepted and processed' },
          { title: '4xx client errors', sub: 'invalid input/auth/resource issues' },
          { title: '5xx server errors', sub: 'backend/system failure conditions' }
        ]
      }
    },
    'api-introduction': {
      tabs: ['API ecosystem', 'Provider-consumer flow', 'Integration scenario', 'API anti-patterns', 'Interview framing']
    },
    'rest-api-fundamentals': {
      tabs: ['REST constraints', 'Resource flow', 'REST scenario', 'REST violations', 'Interview framing']
    },
    'restful-api-design': {
      tabs: ['Design standards', 'URL/version flow', 'Design scenario', 'Design pitfalls', 'Interview framing']
    },
    'request-response-formats': {
      tabs: ['Format options', 'Negotiation flow', 'Payload scenario', 'Format mistakes', 'Interview framing']
    },
    'authentication-authorization': {
      tabs: ['AuthN/AuthZ flow', 'Token lifecycle', 'Protected API scenario', 'Access-control risks', 'Interview framing'],
      steps: {
        core: [
          { title: 'Authenticate principal', sub: 'credentials verified (API key/JWT/OAuth)' },
          { title: 'Issue/validate token', sub: 'signature, expiry, and claims checks' },
          { title: 'Authorize action', sub: 'roles/scopes mapped to endpoint policy' },
          { title: 'Return decision', sub: 'allow 2xx or deny 401/403' }
        ]
      }
    },
    'api-testing-tools': {
      tabs: ['Testing workflow', 'Tool pipeline', 'CI test scenario', 'Testing gaps', 'Interview framing']
    },
    'api-documentation': {
      tabs: ['Doc architecture', 'OpenAPI flow', 'Consumer scenario', 'Doc failures', 'Interview framing']
    },
    'rate-limiting': {
      tabs: ['Limit strategy', 'Throttle mechanics', 'Burst traffic scenario', 'Rate-limit pitfalls', 'Interview framing'],
      steps: {
        core: [
          { title: 'Request counter check', sub: 'token bucket/sliding window evaluated' },
          { title: 'Within quota', sub: 'request forwarded normally' },
          { title: 'Quota exceeded', sub: '429 Too Many Requests sent' },
          { title: 'Reset window', sub: 'allowance replenished by policy' }
        ]
      }
    },
    'api-security-best-practices': {
      tabs: ['Security layers', 'Threat control flow', 'Attack scenario', 'Security mistakes', 'Interview framing']
    },
    'microservices-apis': {
      tabs: ['Service API topology', 'Inter-service flow', 'Gateway scenario', 'Distributed pitfalls', 'Interview framing']
    },
    'advanced-api-concepts': {
      tabs: ['Concept comparison', 'Protocol selection flow', 'Advanced scenario', 'Adoption pitfalls', 'Interview framing']
    },
    'global-exception-handling-http': {
      tabs: ['Error architecture', 'Exception pipeline', 'Failure scenario', 'Error-handling pitfalls', 'Interview framing'],
      steps: {
        core: [
          { title: 'Exception thrown', sub: 'controller/service raises runtime error' },
          { title: 'Global handler intercepts', sub: 'mapped by exception type' },
          { title: 'Standard error body', sub: 'code, message, trace id fields built' },
          { title: 'Consistent response', sub: 'same contract returned to all clients' }
        ]
      }
    }
  };

  const profile = profiles[topicId] || {};
  return {
    tabs: profile.tabs || defaults.tabs,
    steps: {
      ...defaults.steps,
      ...(profile.steps || {})
    }
  };
}

export default function HttpTopicRuntimeShowcase({ topicId }) {
  const cfg = CONFIG[topicId];
  if (!cfg) return null;

  const [tab, setTab] = useState('core');
  const profile = getTopicProfile(topicId, cfg.title);
  const steps = profile.steps;
  const [tabCore, tabMechanics, tabScenario, tabPitfalls, tabInterview] = profile.tabs;

  return (
    <div className="sb-showcase">
      <SpringHero eyebrow={cfg.eyebrow} title={cfg.title} subtitle={cfg.subtitle} />
      <SpringWhyGrid items={cfg.why} />

      <div className="sb-tabs">
        <button type="button" className={`sb-tab ${tab === 'core' ? 'active' : ''}`} onClick={() => setTab('core')}>{tabCore}</button>
        <button type="button" className={`sb-tab ${tab === 'mechanics' ? 'active' : ''}`} onClick={() => setTab('mechanics')}>{tabMechanics}</button>
        <button type="button" className={`sb-tab ${tab === 'scenario' ? 'active' : ''}`} onClick={() => setTab('scenario')}>{tabScenario}</button>
        <button type="button" className={`sb-tab ${tab === 'pitfalls' ? 'active' : ''}`} onClick={() => setTab('pitfalls')}>{tabPitfalls}</button>
        <button type="button" className={`sb-tab ${tab === 'interview' ? 'active' : ''}`} onClick={() => setTab('interview')}>{tabInterview}</button>
      </div>

      <div className="sb-panel">
        {tab === 'core' && (
          <SpringDiagramFrame label="Core flow diagram">
            <HttpNarrativeFlowDiagram title={`${cfg.title} core flow`} subtitle="How this topic behaves in live systems" steps={steps.core} />
          </SpringDiagramFrame>
        )}
        {tab === 'mechanics' && (
          <SpringDiagramFrame label="Runtime mechanics diagram">
            <HttpMechanicsFlowDiagram title={`${cfg.title} runtime mechanics`} subtitle="Execution path under the hood" steps={steps.mechanics} />
          </SpringDiagramFrame>
        )}
        {tab === 'scenario' && (
          <SpringDiagramFrame label="Real scenario diagram">
            <HttpScenarioFlowDiagram title={`${cfg.title} real scenario`} subtitle="Production-style request journey" steps={steps.scenario} />
          </SpringDiagramFrame>
        )}
        {tab === 'pitfalls' && (
          <SpringDiagramFrame label="Pitfalls diagram">
            <HttpPitfallsDiagram title={`${cfg.title} pitfalls`} subtitle="Common mistakes and prevention checklist" steps={steps.pitfalls} />
          </SpringDiagramFrame>
        )}
        {tab === 'interview' && (
          <SpringDiagramFrame label="Interview answer map diagram">
            <HttpInterviewMapDiagram title={`${cfg.title} interview answer map`} subtitle="Explain clearly with architecture depth" steps={steps.interview} />
          </SpringDiagramFrame>
        )}

        <SpringCallout variant="tip" title="Showcase usage tip">
          Use this panel before reading the full article to understand the topic visually, then revisit after reading to connect concepts with real runtime behavior.
        </SpringCallout>
      </div>
    </div>
  );
}
