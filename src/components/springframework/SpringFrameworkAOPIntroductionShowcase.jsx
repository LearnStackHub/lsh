import { useState } from 'react';
import { SpringFrameworkHero, SpringFrameworkWhyGrid, SpringFrameworkDiagramFrame, SpringFrameworkCallout } from './SpringFrameworkBlocks';
import {
  SpringFrameworkAopProxyDiagram,
  SpringFrameworkAdviceTypesDiagram,
  SpringFrameworkModulesOverviewDiagram,
  SpringFrameworkAopAroundAdviceScenarioDiagram,
  HorizontalPipeline
} from '../flow/ProfessionalDiagrams';

const TABS = [
  ['proxy', 'Proxy model'],
  ['advice', 'Advice types'],
  ['around', '@Around scenario'],
  ['modules', 'Where AOP sits'],
  ['use', 'When to use']
];

const WHY = [
  { title: 'Cross-cutting', text: 'Logging, transactions, security checks, and metrics without duplicating code in every method.' },
  { title: 'Proxies', text: 'Spring AOP uses JDK dynamic proxies or CGLIB subclasses around your beans.' },
  { title: 'AspectJ subset', text: 'Spring AOP supports a practical subset of AspectJ pointcut expressions.' }
];

export default function SpringFrameworkAOPIntroductionShowcase() {
  const [tab, setTab] = useState('proxy');
  return (
    <div className="sf-showcase">
      <SpringFrameworkHero
        eyebrow="Spring Framework · AOP"
        title="AOP introduction"
        subtitle="Aspect-Oriented Programming lets you modularize cross-cutting concerns and apply them declaratively with aspects and pointcuts."
      />
      <SpringFrameworkWhyGrid items={WHY} />
      <div className="sf-tabs">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" className={`sf-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>
      {tab === 'proxy' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="Calls pass through the proxy">
            <SpringFrameworkAopProxyDiagram />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'advice' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="Kinds of advice">
            <SpringFrameworkAdviceTypesDiagram />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'around' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="Logging / timing around a service">
            <SpringFrameworkAopAroundAdviceScenarioDiagram />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'modules' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="AOP module">
            <SpringFrameworkModulesOverviewDiagram />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'use' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="Typical uses">
            <HorizontalPipeline
              title="Cross-cutting examples"
              fresherHint={false}
              steps={[
                { title: 'declarative tx', sub: '@Transactional' },
                { title: 'logging', sub: '@Before' },
                { title: 'audit', sub: '@Around' },
                { title: 'retry', sub: 'custom aspect' }
              ]}
            />
          </SpringFrameworkDiagramFrame>
          <SpringFrameworkCallout variant="watch" title="Self-invocation">
            Internal calls on <code>this</code> skip the proxy—factor through another bean or use AspectJ compile-time weaving.
          </SpringFrameworkCallout>
        </div>
      )}
    </div>
  );
}
