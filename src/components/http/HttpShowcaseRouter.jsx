import HttpTopicRuntimeShowcase from './HttpTopicRuntimeShowcase';

export const HTTP_SHOWCASE_TOPIC_IDS = new Set([
  'http-introduction',
  'http-request-structure',
  'http-response-structure',
  'http-methods',
  'http-headers',
  'https-security',
  'cookies-sessions',
  'http-caching',
  'cors',
  'http-status-codes',
  'api-introduction',
  'rest-api-fundamentals',
  'restful-api-design',
  'request-response-formats',
  'authentication-authorization',
  'api-testing-tools',
  'api-documentation',
  'rate-limiting',
  'api-security-best-practices',
  'microservices-apis',
  'advanced-api-concepts',
  'global-exception-handling-http'
]);

export default function HttpShowcaseRouter({ topicId }) {
  if (!HTTP_SHOWCASE_TOPIC_IDS.has(topicId)) return null;
  return <HttpTopicRuntimeShowcase topicId={topicId} />;
}
