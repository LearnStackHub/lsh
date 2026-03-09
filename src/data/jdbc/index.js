// JDBC Topics
import jdbcProjectSetup from './JdbcProjectSetup';
import jdbcIntroduction from './JdbcIntroduction';
import jdbcDrivers from './JdbcDrivers';
import jdbcConnectionSteps from './JdbcConnectionSteps';
import statementInterface from './StatementInterface';
import preparedStatementInterface from './PreparedStatementInterface';
import resultSetInterface from './ResultSetInterface';
import crudOperations from './CrudOperations';
import transactionManagement from './TransactionManagement';
import jdbcMCQ from './JDBCMCQ';

export const jdbcTopics = {
  id: 'jdbc',
  title: 'JDBC',
  description: 'Java Database Connectivity - Connect Java applications with databases',
  icon: '🗄️',
  topics: [
    jdbcProjectSetup,
    jdbcIntroduction,
    jdbcDrivers,
    jdbcConnectionSteps,
    statementInterface,
    preparedStatementInterface,
    resultSetInterface,
    crudOperations,
    transactionManagement,
    jdbcMCQ
  ]
};

export {
  jdbcProjectSetup,
  jdbcIntroduction,
  jdbcDrivers,
  jdbcConnectionSteps,
  statementInterface,
  preparedStatementInterface,
  resultSetInterface,
  crudOperations,
  transactionManagement,
  jdbcMCQ
};



