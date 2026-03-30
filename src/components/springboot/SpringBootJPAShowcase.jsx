import { useState } from 'react';
import { SpringHero, SpringWhyGrid, SpringDiagramFrame, SpringCallout } from './SpringBlocks';
import {
  SpringBootJpaPersistenceDiagram,
  SpringBootTransactionalFlowDiagram,
  SpringBootArchitectureStackDiagram,
  SpringBootCacheAsideScenarioDiagram,
  HorizontalPipeline
} from '../flow/ProfessionalDiagrams';

const TABS = [
  ['layers', 'Entity → DB'],
  ['tx', '@Transactional'],
  ['repo', 'Repositories'],
  ['session', 'Persistence context'],
  ['stack', 'Where JPA sits'],
  ['cache', 'Real scenario: cache']
];

const WHY = [
  {
    title: 'Spring Data JPA',
    text: 'Repositories reduce boilerplate; Hibernate implements persistence while Boot configures DataSource and pool.'
  },
  {
    title: 'Entities map tables',
    text: '@Entity, @Id, relationships—keep entities focused; use DTOs at API boundaries.'
  },
  {
    title: '@Transactional',
    text: 'Declare transaction boundaries on services; default read-only for queries can optimize.'
  }
];

export default function SpringBootJPAShowcase() {
  const [tab, setTab] = useState('layers');
  return (
    <div className="sb-showcase">
      <SpringHero
        eyebrow="Spring Boot · Data"
        title="Spring Boot + JPA"
        subtitle="Model entities, define repositories, and let Spring Boot wire Hibernate and your database—without XML mapping files."
      />
      <SpringWhyGrid items={WHY} />

      <div className="sb-tabs">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" className={`sb-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'layers' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="Persistence stack">
            <SpringBootJpaPersistenceDiagram />
          </SpringDiagramFrame>
        </div>
      )}

      {tab === 'tx' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="Transaction outcome">
            <SpringBootTransactionalFlowDiagram />
          </SpringDiagramFrame>
        </div>
      )}

      {tab === 'repo' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="Spring Data JPA features">
            <HorizontalPipeline
              title="Repository capabilities"
              fresherHint={false}
              steps={[
                { title: 'derive queries', sub: 'findBy…' },
                { title: '@Query', sub: 'JPQL / native' },
                { title: 'Pageable', sub: 'sort + page' },
                { title: 'projections', sub: 'interface DTOs' },
                { title: 'Auditing', sub: 'optional' }
              ]}
            />
          </SpringDiagramFrame>
        </div>
      )}

      {tab === 'session' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="Session and lazy loading">
            <HorizontalPipeline
              title="Inside one transaction"
              fresherHint={false}
              steps={[
                { title: 'EntityManager', sub: 'persistence context' },
                { title: 'flush', sub: 'SQL to DB' },
                { title: 'lazy assoc.', sub: 'still in session' },
                { title: 'session closed', sub: 'LazyInitializationException if touched' }
              ]}
            />
          </SpringDiagramFrame>
          <SpringCallout variant="tip" title="N+1">
            Use <code>@EntityGraph</code> or join fetch for graphs to avoid N+1 lazy-load queries.
          </SpringCallout>
        </div>
      )}

      {tab === 'stack' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="JPA in the overall stack">
            <SpringBootArchitectureStackDiagram />
          </SpringDiagramFrame>
        </div>
      )}

      {tab === 'cache' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="Cache-aside on a hot read (Redis / Caffeine)">
            <SpringBootCacheAsideScenarioDiagram />
          </SpringDiagramFrame>
        </div>
      )}
    </div>
  );
}
