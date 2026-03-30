import { useState } from 'react';
import { SpringFrameworkHero, SpringFrameworkWhyGrid, SpringFrameworkDiagramFrame, SpringFrameworkCallout } from './SpringFrameworkBlocks';
import {
  SpringFrameworkMvcLayeredScenarioDiagram,
  SpringFrameworkDispatcherServletPipelineDiagram,
  SpringFrameworkViewResolverPipelineDiagram,
  SpringFrameworkMvcFormSubmissionScenarioDiagram,
  HorizontalPipeline
} from '../flow/ProfessionalDiagrams';

const TABS = [
  ['layers', 'End-to-end layers'],
  ['mvc', 'MVC pipeline'],
  ['views', 'Views & forms'],
  ['form', 'Form & validation'],
  ['flow', 'CRUD flow']
];

const WHY = [
  { title: 'Classic assignment', text: 'Login + student CRUD exercises controllers, services, DAO/JPA, and JSP/Thymeleaf together.' },
  { title: 'Session & security', text: 'Often introduces session attributes and simple form validation.' },
  { title: 'Portfolio piece', text: 'Demonstrates you can wire a full Spring MVC module by hand.' }
];

export default function SpringFrameworkProjectCrudShowcase() {
  const [tab, setTab] = useState('layers');
  return (
    <div className="sf-showcase">
      <SpringFrameworkHero
        eyebrow="Spring Framework · Project"
        title="Login & Student CRUD"
        subtitle="A practical project that ties together DispatcherServlet, controllers, layered services, persistence, and view resolution."
      />
      <SpringFrameworkWhyGrid items={WHY} />
      <div className="sf-tabs">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" className={`sf-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>
      {tab === 'layers' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="Browser through to database">
            <SpringFrameworkMvcLayeredScenarioDiagram />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'mvc' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="Every page hits DispatcherServlet">
            <SpringFrameworkDispatcherServletPipelineDiagram />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'views' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="JSP / template resolution">
            <SpringFrameworkViewResolverPipelineDiagram />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'form' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="POST → validate → save → redirect">
            <SpringFrameworkMvcFormSubmissionScenarioDiagram />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'flow' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="Typical CRUD operations">
            <HorizontalPipeline
              title="HTTP operations"
              fresherHint={false}
              steps={[
                { title: 'list', sub: 'GET /students' },
                { title: 'create', sub: 'GET form + POST save' },
                { title: 'update', sub: 'GET edit + POST' },
                { title: 'delete', sub: 'POST/DELETE' }
              ]}
            />
          </SpringFrameworkDiagramFrame>
          <SpringFrameworkCallout variant="watch" title="Validation">
            Add server-side validation—never trust form input alone.
          </SpringFrameworkCallout>
        </div>
      )}
    </div>
  );
}
