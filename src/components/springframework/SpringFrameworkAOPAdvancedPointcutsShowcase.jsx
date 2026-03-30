import { useState } from 'react';
import { SpringFrameworkHero, SpringFrameworkWhyGrid, SpringFrameworkDiagramFrame, SpringFrameworkCallout } from './SpringFrameworkBlocks';
import {
  SpringFrameworkPointcutExpressionsDiagram,
  SpringFrameworkAopProxyDiagram,
  HorizontalPipeline
} from '../flow/ProfessionalDiagrams';

const TABS = [
  ['expressions', 'Expressions'],
  ['proxy', 'Join points'],
  ['combine', 'Combining'],
  ['limits', 'Spring AOP limits']
];

const WHY = [
  { title: 'execution', text: 'Match method signatures across packages and return types.' },
  { title: '@within / @annotation', text: 'Target beans or methods carrying specific annotations.' },
  { title: 'Reuse', text: 'Centralize complex expressions in @Pointcut methods.' }
];

export default function SpringFrameworkAOPAdvancedPointcutsShowcase() {
  const [tab, setTab] = useState('expressions');
  return (
    <div className="sf-showcase">
      <SpringFrameworkHero
        eyebrow="Spring Framework · AOP"
        title="Advanced pointcuts"
        subtitle="Combine AspectJ-style designators to target exactly the methods that need advice—no more, no less."
      />
      <SpringFrameworkWhyGrid items={WHY} />
      <div className="sf-tabs">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" className={`sf-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>
      {tab === 'expressions' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="Common patterns">
            <SpringFrameworkPointcutExpressionsDiagram />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'proxy' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="Only public method calls on proxies">
            <SpringFrameworkAopProxyDiagram />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'combine' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="Boolean composition">
            <HorizontalPipeline
              title="Combine with && || !"
              fresherHint={false}
              steps={[
                { title: 'execution', sub: 'base set' },
                { title: '&& @annotation', sub: 'narrow' },
                { title: '|| within', sub: 'alternate pkg' }
              ]}
            />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'limits' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="What Spring AOP does not weave">
            <HorizontalPipeline
              title="Proxy limitations"
              fresherHint={false}
              steps={[
                { title: 'only beans', sub: 'spring-managed' },
                { title: 'public methods', sub: 'typical' },
                { title: 'no self-invoke', sub: 'same class' },
                { title: 'AspectJ CTW', sub: 'full power' }
              ]}
            />
          </SpringFrameworkDiagramFrame>
          <SpringFrameworkCallout variant="remember" title="Performance">
            Broad pointcuts on hot paths can add measurable overhead—profile in staging.
          </SpringFrameworkCallout>
        </div>
      )}
    </div>
  );
}
