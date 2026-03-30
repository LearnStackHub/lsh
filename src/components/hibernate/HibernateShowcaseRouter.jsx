import HibernateTopicRuntimeShowcase from './HibernateTopicRuntimeShowcase';

export const HIBERNATE_SHOWCASE_TOPIC_IDS = new Set([
  'hibernate-project-setup',
  'hibernate-introduction',
  'hibernate-architecture',
  'hibernate-configuration',
  'hibernate-session',
  'hibernate-mapping',
  'hibernate-hql',
  'hibernate-relationships',
  'hibernate-caching',
  'hibernate-locking',
  'hibernate-batch-processing',
  'hibernate-mcq',
  'hibernate-interview-questions'
]);

export default function HibernateShowcaseRouter({ topicId }) {
  if (!HIBERNATE_SHOWCASE_TOPIC_IDS.has(topicId)) return null;
  return <HibernateTopicRuntimeShowcase topicId={topicId} />;
}
