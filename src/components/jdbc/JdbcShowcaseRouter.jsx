import JdbcIntroductionShowcase from './JdbcIntroductionShowcase';
import JdbcTopicRuntimeShowcase from './JdbcTopicRuntimeShowcase';

/** All JDBC course topics that show a scenario diagram above the article */
export const JDBC_SHOWCASE_TOPIC_IDS = new Set([
  'jdbc-project-setup',
  'jdbc-introduction',
  'jdbc-drivers',
  'jdbc-connection-steps',
  'statement-interface',
  'prepared-statement',
  'resultset-interface',
  'crud-operations',
  'transaction-management',
  'jdbc-transactions',
  'jdbc-mcq'
]);

export default function JdbcShowcaseRouter({ topicId }) {
  if (!JDBC_SHOWCASE_TOPIC_IDS.has(topicId)) return null;
  if (topicId === 'jdbc-introduction') return <JdbcIntroductionShowcase />;
  return <JdbcTopicRuntimeShowcase topicId={topicId} />;
}
