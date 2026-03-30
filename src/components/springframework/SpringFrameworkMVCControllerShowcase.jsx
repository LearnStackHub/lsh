import { useState } from 'react';
import { SpringFrameworkHero, SpringFrameworkWhyGrid, SpringFrameworkDiagramFrame } from './SpringFrameworkBlocks';
import {
  SpringFrameworkDispatcherServletPipelineDiagram,
  SpringFrameworkMvcLayeredScenarioDiagram,
  SpringFrameworkMvcFormSubmissionScenarioDiagram,
  HorizontalPipeline
} from '../flow/ProfessionalDiagrams';

const TABS = [
  ['pipeline', 'Where controller sits'],
  ['scenario', 'Full stack'],
  ['form', 'Form POST scenario'],
  ['mapping', 'Request mapping'],
  ['return', 'Return types']
];

const WHY = [
  { title: '@Controller', text: 'Stereotype for web-facing beans; often paired with @RequestMapping.' },
  { title: 'REST vs MVC', text: '@RestController = @Controller + @ResponseBody for JSON APIs.' },
  { title: 'Testability', text: 'MockMvc and standaloneSetup test controllers without a full server.' }
];

export default function SpringFrameworkMVCControllerShowcase() {
  const [tab, setTab] = useState('pipeline');
  return (
    <div className="sf-showcase">
      <SpringFrameworkHero
        eyebrow="Spring Framework · Web MVC"
        title="Controllers"
        subtitle="Map HTTP requests to methods and delegate to services; keep controllers thin and validation-friendly."
      />
      <SpringFrameworkWhyGrid items={WHY} />
      <div className="sf-tabs">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" className={`sf-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>
      {tab === 'pipeline' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="Controller in the pipeline">
            <SpringFrameworkDispatcherServletPipelineDiagram />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'scenario' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="Browser → controller → service">
            <SpringFrameworkMvcLayeredScenarioDiagram />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'form' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="Validation, service call, PRG">
            <SpringFrameworkMvcFormSubmissionScenarioDiagram />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'mapping' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="URL and HTTP verb">
            <HorizontalPipeline
              title="@RequestMapping family"
              fresherHint={false}
              steps={[
                { title: 'class-level', sub: 'base path' },
                { title: 'method-level', sub: 'GET POST …' },
                { title: 'path variables', sub: '{id}' },
                { title: 'request params', sub: '?q=' }
              ]}
            />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'return' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="What you can return">
            <HorizontalPipeline
              title="Return types"
              fresherHint={false}
              steps={[
                { title: 'ModelAndView', sub: 'view + model' },
                { title: 'String view name', sub: 'implicit model' },
                { title: 'ResponseEntity', sub: 'status + body' },
                { title: 'void / @ResponseBody', sub: 'direct write' }
              ]}
            />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
    </div>
  );
}
