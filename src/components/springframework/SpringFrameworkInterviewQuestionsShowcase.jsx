import { useState } from 'react';
import { SpringFrameworkHero, SpringFrameworkWhyGrid, SpringFrameworkDiagramFrame } from './SpringFrameworkBlocks';
import {
  SpringFrameworkIocContainerDiagram,
  SpringFrameworkDispatcherServletPipelineDiagram,
  SpringFrameworkAopProxyDiagram,
  SpringFrameworkSpringDataRepositoryDiagram,
  SpringFrameworkJdbcTemplatePipelineDiagram,
  HorizontalPipeline
} from '../flow/ProfessionalDiagrams';

const TABS = [
  ['ioc', 'IoC & DI'],
  ['mvc', 'Spring MVC'],
  ['data', 'Data access'],
  ['aop', 'AOP'],
  ['checklist', 'Quick checklist']
];

const WHY = [
  { title: 'Draw diagrams', text: 'Interviewers expect you to explain the container, MVC pipeline, and proxies.' },
  { title: 'Trade-offs', text: 'XML vs Java config, JDBC vs JPA, proxy vs AspectJ weaving.' },
  { title: 'Experience', text: 'Tie answers to a real project: login CRUD, transactions, or custom aspects.' }
];

export default function SpringFrameworkInterviewQuestionsShowcase() {
  const [tab, setTab] = useState('ioc');
  return (
    <div className="sf-showcase">
      <SpringFrameworkHero
        eyebrow="Spring Framework · Interview"
        title="Interview questions"
        subtitle="Use these diagrams as anchors—then narrate your own projects with concrete examples."
      />
      <SpringFrameworkWhyGrid items={WHY} />
      <div className="sf-tabs">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" className={`sf-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>
      {tab === 'ioc' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="The container">
            <SpringFrameworkIocContainerDiagram />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'mvc' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="DispatcherServlet">
            <SpringFrameworkDispatcherServletPipelineDiagram />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'data' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="Spring Data">
            <SpringFrameworkSpringDataRepositoryDiagram />
          </SpringFrameworkDiagramFrame>
          <SpringFrameworkDiagramFrame label="JdbcTemplate">
            <SpringFrameworkJdbcTemplatePipelineDiagram />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'aop' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="Proxies">
            <SpringFrameworkAopProxyDiagram />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'checklist' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="Rapid review">
            <HorizontalPipeline
              title="Talk through these"
              fresherHint={false}
              steps={[
                { title: 'IoC vs DI', sub: 'definitions' },
                { title: 'bean scopes', sub: 'singleton vs prototype' },
                { title: 'MVC pipeline', sub: 'DS → controller' },
                { title: 'transactions', sub: '@Transactional' },
                { title: 'AOP limits', sub: 'proxy' }
              ]}
            />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
    </div>
  );
}
