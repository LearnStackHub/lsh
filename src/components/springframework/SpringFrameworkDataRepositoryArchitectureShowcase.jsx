import { useState } from 'react';
import { SpringFrameworkHero, SpringFrameworkWhyGrid, SpringFrameworkDiagramFrame, SpringFrameworkCallout } from './SpringFrameworkBlocks';
import {
  SpringFrameworkSpringDataRepositoryDiagram,
  SpringFrameworkMvcLayeredScenarioDiagram,
  HorizontalPipeline
} from '../flow/ProfessionalDiagrams';

const TABS = [
  ['stack', 'Repository stack'],
  ['web', 'Used from web layer'],
  ['tiers', 'CrudRepository tiers'],
  ['custom', 'Extending']
];

const WHY = [
  { title: 'CrudRepository', text: 'save, findById, findAll, delete—implemented for you.' },
  { title: 'Paging & sorting', text: 'PagingAndSortingRepository adds Pageable support.' },
  { title: 'Query derivation', text: 'Method names like findByLastName translate to queries.' }
];

export default function SpringFrameworkDataRepositoryArchitectureShowcase() {
  const [tab, setTab] = useState('stack');
  return (
    <div className="sf-showcase">
      <SpringFrameworkHero
        eyebrow="Spring Framework · Data"
        title="Repository architecture"
        subtitle="Understand how Spring Data builds repository implementations and how they plug into your service layer."
      />
      <SpringFrameworkWhyGrid items={WHY} />
      <div className="sf-tabs">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" className={`sf-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>
      {tab === 'stack' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="Generated implementation">
            <SpringFrameworkSpringDataRepositoryDiagram />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'web' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="Repository behind the service">
            <SpringFrameworkMvcLayeredScenarioDiagram />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'tiers' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="Interface hierarchy">
            <HorizontalPipeline
              title="Spring Data JPA"
              fresherHint={false}
              steps={[
                { title: 'Repository', sub: 'marker' },
                { title: 'CrudRepository', sub: 'CRUD' },
                { title: 'PagingAndSorting', sub: 'page/sort' },
                { title: 'JpaRepository', sub: 'flush + batch' }
              ]}
            />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'custom' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="When generated code is not enough">
            <HorizontalPipeline
              title="Extensions"
              fresherHint={false}
              steps={[
                { title: 'custom impl', sub: '…Impl suffix' },
                { title: '@Query', sub: 'JPQL' },
                { title: 'nativeQuery', sub: 'SQL' }
              ]}
            />
          </SpringFrameworkDiagramFrame>
          <SpringFrameworkCallout variant="tip" title="Naming">
            Custom fragment impl class must end with <code>Impl</code> and sit in the right package for Spring Data to find it.
          </SpringFrameworkCallout>
        </div>
      )}
    </div>
  );
}
