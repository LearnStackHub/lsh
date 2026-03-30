import JspTopicRuntimeShowcase from './JspTopicRuntimeShowcase';

export const JSP_SHOWCASE_TOPIC_IDS = new Set([
  'jsp-project-setup',
  'jsp-introduction',
  'jsp-architecture',
  'jsp-scripting-elements',
  'jsp-directives',
  'jsp-implicit-objects',
  'jsp-action-tags',
  'jsp-expression-language',
  'jsp-jstl',
  'jsp-custom-tags'
]);

export default function JspShowcaseRouter({ topicId }) {
  if (!JSP_SHOWCASE_TOPIC_IDS.has(topicId)) return null;
  return <JspTopicRuntimeShowcase topicId={topicId} />;
}
