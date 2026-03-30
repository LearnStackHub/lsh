import MySQLIntroductionShowcase from './MySQLIntroductionShowcase';
import MySQLInstallationShowcase from './MySQLInstallationShowcase';
import MySQLDQLShowcase from './MySQLDQLShowcase';
import MySQLIndexesShowcase from './MySQLIndexesShowcase';
import MySQLJoinsShowcase from './MySQLJoinsShowcase';
import MySQLTransactionsShowcase from './MySQLTransactionsShowcase';
import MySQLInsertUpdateDeleteShowcase from './MySQLInsertUpdateDeleteShowcase';
import MySQLInterviewQuestionsShowcase from './MySQLInterviewQuestionsShowcase';
import MySQLTopicRuntimeShowcase from './MySQLTopicRuntimeShowcase';

const RUNTIME_TOPIC_IDS = [
  'mysql-installation',
  'mysql-data-types',
  'mysql-create-database',
  'mysql-ddl',
  'mysql-select',
  'mysql-clauses',
  'mysql-constraints',
  'mysql-aggregate-functions',
  'mysql-scalar-functions',
  'mysql-views',
  'mysql-stored-procedures',
  'mysql-triggers',
  'mysql-subqueries',
  'mysql-privileges',
  'mysql-mcq'
];

/** Renders the appropriate real-time scenario showcase for any MySQL tutorial topic */
export default function MySQLShowcaseRouter({ topicId }) {
  switch (topicId) {
    case 'mysql-introduction':
      return <MySQLIntroductionShowcase />;
    case 'mysql-installation':
      return <MySQLInstallationShowcase />;
    case 'mysql-dql':
      return <MySQLDQLShowcase />;
    case 'mysql-indexes':
      return <MySQLIndexesShowcase />;
    case 'mysql-joins':
      return <MySQLJoinsShowcase />;
    case 'mysql-transactions':
      return <MySQLTransactionsShowcase />;
    case 'mysql-insert-update-delete':
      return <MySQLInsertUpdateDeleteShowcase />;
    case 'mysql-interview-questions':
      return <MySQLInterviewQuestionsShowcase />;
    default:
      if (RUNTIME_TOPIC_IDS.includes(topicId)) {
        return <MySQLTopicRuntimeShowcase topicId={topicId} />;
      }
      return null;
  }
}
