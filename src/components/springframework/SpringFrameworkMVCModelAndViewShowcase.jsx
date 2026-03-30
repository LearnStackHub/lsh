import { useState } from 'react';
import { SpringFrameworkHero, SpringFrameworkWhyGrid, SpringFrameworkDiagramFrame } from './SpringFrameworkBlocks';
import {
  SpringFrameworkDispatcherServletPipelineDiagram,
  SpringFrameworkViewResolverPipelineDiagram,
  HorizontalPipeline
} from '../flow/ProfessionalDiagrams';

const TABS = [
  ['flow', 'Controller → view'],
  ['resolve', 'View name'],
  ['model', 'Model attributes'],
  ['alternatives', 'Alternatives']
];

const WHY = [
  { title: 'Two things at once', text: 'ModelAndView carries a view name (or View) plus model data for rendering.' },
  { title: 'Explicit', text: 'Clear when you need both dynamic data and a specific view name.' },
  { title: 'Still relevant', text: 'Modern apps often use Model parameters + String return, but ModelAndView shows the mechanics.' }
];

export default function SpringFrameworkMVCModelAndViewShowcase() {
  const [tab, setTab] = useState('flow');
  return (
    <div className="sf-showcase">
      <SpringFrameworkHero
        eyebrow="Spring Framework · Web MVC"
        title="ModelAndView"
        subtitle="Combine model data and view selection in one return value from the controller layer."
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
          <SpringFrameworkDiagramFrame label="DispatcherServlet uses both parts">
            <SpringFrameworkDispatcherServletPipelineDiagram />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'resolve' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="View name then resolves">
            <SpringFrameworkViewResolverPipelineDiagram />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'model' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="Populating the model">
            <HorizontalPipeline
              title="Model keys"
              fresherHint={false}
              steps={[
                { title: 'addObject', sub: 'key/value' },
                { title: 'ModelMap', sub: 'fluent' },
                { title: '@ModelAttribute', sub: 'method args' }
              ]}
            />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'alternatives' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="Simpler patterns">
            <HorizontalPipeline
              title="Modern style"
              fresherHint={false}
              steps={[
                { title: 'Model param', sub: 'injected' },
                { title: 'String view name', sub: 'return' },
                { title: 'ModelAndView', sub: 'when needed' }
              ]}
            />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
    </div>
  );
}
