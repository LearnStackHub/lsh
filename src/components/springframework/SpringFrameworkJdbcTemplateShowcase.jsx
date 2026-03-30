import { useState } from 'react';
import { SpringFrameworkHero, SpringFrameworkWhyGrid, SpringFrameworkDiagramFrame, SpringFrameworkCallout } from './SpringFrameworkBlocks';
import {
  SpringFrameworkJdbcTemplatePipelineDiagram,
  SpringFrameworkMvcLayeredScenarioDiagram,
  SpringFrameworkJdbcTransactionalScenarioDiagram,
  HorizontalPipeline
} from '../flow/ProfessionalDiagrams';

const TABS = [
  ['flow', 'JdbcTemplate flow'],
  ['tx', '@Transactional + JDBC'],
  ['dao', 'In a DAO layer'],
  ['ops', 'Operations'],
  ['errors', 'Exception translation']
];

const WHY = [
  { title: 'Less boilerplate', text: 'No manual Connection/Statement/ResultSet finally blocks in every method.' },
  { title: 'Consistent exceptions', text: 'SQLException translated to DataAccessException hierarchy.' },
  { title: 'Works everywhere', text: 'Use in plain Spring or alongside JPA for native SQL.' }
];

export default function SpringFrameworkJdbcTemplateShowcase() {
  const [tab, setTab] = useState('flow');
  return (
    <div className="sf-showcase">
      <SpringFrameworkHero
        eyebrow="Spring Framework · Data Access"
        title="JdbcTemplate"
        subtitle="Spring’s JDBC helper centralizes resource handling and error translation while you keep full SQL control."
      />
      <SpringFrameworkWhyGrid items={WHY} />
      <div className="sf-tabs">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" className={`sf-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>
      {tab === 'flow' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="From DAO to driver">
            <SpringFrameworkJdbcTemplatePipelineDiagram />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'tx' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="Declarative transactions with JdbcTemplate">
            <SpringFrameworkJdbcTransactionalScenarioDiagram />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'dao' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="Typical placement">
            <SpringFrameworkMvcLayeredScenarioDiagram />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'ops' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="What you call">
            <HorizontalPipeline
              title="JdbcTemplate API"
              fresherHint={false}
              steps={[
                { title: 'query', sub: 'RowMapper' },
                { title: 'update', sub: 'insert/update/delete' },
                { title: 'batchUpdate', sub: 'batches' },
                { title: 'execute', sub: 'DDL' }
              ]}
            />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'errors' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="Spring’s translation">
            <HorizontalPipeline
              title="DataAccessException"
              fresherHint={false}
              steps={[
                { title: 'SQLException', sub: 'from driver' },
                { title: 'translator', sub: 'Spring' },
                { title: 'DataAccessException', sub: 'unchecked' },
                { title: 'rollback rules', sub: 'with @Transactional' }
              ]}
            />
          </SpringFrameworkDiagramFrame>
          <SpringFrameworkCallout variant="remember" title="Transactions">
            Pair JdbcTemplate with declarative transactions on the service layer.
          </SpringFrameworkCallout>
        </div>
      )}
    </div>
  );
}
