import { useState } from 'react';
import { SpringFrameworkHero, SpringFrameworkWhyGrid, SpringFrameworkDiagramFrame } from './SpringFrameworkBlocks';
import {
  SpringFrameworkSpringDataRepositoryDiagram,
  SpringFrameworkPointcutExpressionsDiagram,
  HorizontalPipeline
} from '../flow/ProfessionalDiagrams';

const TABS = [
  ['repo', 'Repository base'],
  ['query', '@Query methods'],
  ['native', 'Native SQL'],
  ['dynamic', 'Dynamic queries']
];

const WHY = [
  { title: '@Query', text: 'JPQL or native SQL when method naming gets awkward.' },
  { title: 'Parameters', text: 'Indexed ?1 or named @Param for bind variables—avoid string concat.' },
  { title: 'Projections', text: 'Interface or DTO projections for partial selects.' }
];

export default function SpringFrameworkDataCustomQueriesShowcase() {
  const [tab, setTab] = useState('repo');
  return (
    <div className="sf-showcase">
      <SpringFrameworkHero
        eyebrow="Spring Framework · Data"
        title="Custom queries"
        subtitle="Go beyond derived query methods with explicit @Query, native SQL, and custom repository fragments."
      />
      <SpringFrameworkWhyGrid items={WHY} />
      <div className="sf-tabs">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" className={`sf-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>
      {tab === 'repo' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="Still backed by Spring Data">
            <SpringFrameworkSpringDataRepositoryDiagram />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'query' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="JPQL on the interface">
            <HorizontalPipeline
              title="@Query flow"
              fresherHint={false}
              steps={[
                { title: 'define method', sub: 'signature' },
                { title: '@Query JPQL', sub: 'string' },
                { title: 'bind params', sub: '@Param' },
                { title: 'runtime', sub: 'proxy executes' }
              ]}
            />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'native' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="When SQL is database-specific">
            <HorizontalPipeline
              title="nativeQuery=true"
              fresherHint={false}
              steps={[
                { title: 'native SQL', sub: 'strings' },
                { title: 'pagination', sub: 'count query' },
                { title: 'EntityManager', sub: 'alternative' }
              ]}
            />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'dynamic' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="Expression mindset (similar to AOP)">
            <SpringFrameworkPointcutExpressionsDiagram />
          </SpringFrameworkDiagramFrame>
          <p className="sf-caption">For very dynamic filters, consider Criteria API, Querydsl, or Specification pattern.</p>
        </div>
      )}
    </div>
  );
}
