import ServletIntroductionShowcase from './ServletIntroductionShowcase';
import ServletTopicRuntimeShowcase from './ServletTopicRuntimeShowcase';

export const SERVLET_SHOWCASE_TOPIC_IDS = new Set([
  'servlet-project-setup',
  'tomcat-server',
  'servlet-introduction',
  'servlet-lifecycle',
  'servlet-api',
  'servlet-config',
  'http-request-response',
  'servlet-frontend-integration',
  'session-management',
  'filters-listeners',
  'servlet-annotations',
  'servlet-security',
  'servlet-session-management'
]);

export default function ServletShowcaseRouter({ topicId }) {
  if (!SERVLET_SHOWCASE_TOPIC_IDS.has(topicId)) return null;
  if (topicId === 'servlet-introduction') return <ServletIntroductionShowcase />;
  return <ServletTopicRuntimeShowcase topicId={topicId} />;
}
