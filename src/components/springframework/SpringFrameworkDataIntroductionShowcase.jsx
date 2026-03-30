import { useState } from 'react';
import { SpringFrameworkHero, SpringFrameworkWhyGrid, SpringFrameworkDiagramFrame } from './SpringFrameworkBlocks';
import {
  SpringFrameworkSpringDataRepositoryDiagram,
  SpringFrameworkJdbcTemplatePipelineDiagram,
  SpringFrameworkModulesOverviewDiagram,
  HorizontalPipeline
} from '../flow/ProfessionalDiagrams';

const TABS = [
  ['repos', 'Repository model'],
  ['jdbc', 'JdbcTemplate baseline'],
  ['modules', 'In the ecosystem'],
  ['compare', 'Abstraction levels']
];

const WHY = [
  { title: 'Less DAO boilerplate', text: 'Spring Data generates implementations for common persistence patterns.' },
  { title: 'Consistent programming model', text: 'Same repository style across JPA, MongoDB, JDBC, etc.' },
  { title: 'Works with Spring MVC', text: 'Inject repositories into services like any other bean.' }
];

export default function SpringFrameworkDataIntroductionShowcase() {
  const [tab, setTab] = useState('repos');
  return (
    <div className="sf-showcase">
      <SpringFrameworkHero
        eyebrow="Spring Framework · Data"
        title="Spring Data — introduction"
        subtitle="Spring Data unifies data access behind simple repository interfaces and template helpers."
      />
      <SpringFrameworkWhyGrid items={WHY} />
      <div className="sf-tabs">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" className={`sf-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>
      {tab === 'repos' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="Interface → implementation">
            <SpringFrameworkSpringDataRepositoryDiagram />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'jdbc' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="Lower-level JDBC helper">
            <SpringFrameworkJdbcTemplatePipelineDiagram />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'modules' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="Where Spring Data sits">
            <SpringFrameworkModulesOverviewDiagram />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'compare' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="Choose by complexity">
            <HorizontalPipeline
              title="Stack options"
              fresherHint={false}
              steps={[
                { title: 'JdbcTemplate', sub: 'SQL control' },
                { title: 'JPA + repositories', sub: 'ORM + CRUD' },
                { title: 'custom queries', sub: '@Query' },
                { title: 'native / JDBC', sub: 'edge cases' }
              ]}
            />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
    </div>
  );
}
