import { useState } from 'react';
import { SpringFrameworkHero, SpringFrameworkWhyGrid, SpringFrameworkDiagramFrame, SpringFrameworkCallout } from './SpringFrameworkBlocks';
import {
  SpringFrameworkAspectOrderDiagram,
  SpringFrameworkAopProxyDiagram,
  HorizontalPipeline
} from '../flow/ProfessionalDiagrams';

const TABS = [
  ['order', '@Order'],
  ['chain', 'Advice chain'],
  ['transactions', 'Tx + logging'],
  ['pitfalls', 'Pitfalls']
];

const WHY = [
  { title: 'Outer vs inner', text: 'Lower @Order value = higher precedence (runs earlier in the chain around the target).' },
  { title: 'Predictable', text: 'Explicit ordering beats relying on bean registration order.' },
  { title: 'Multiple aspects', text: 'Logging, security, transactions, and metrics may all wrap the same bean.' }
];

export default function SpringFrameworkAOPAspectOrderingShowcase() {
  const [tab, setTab] = useState('order');
  return (
    <div className="sf-showcase">
      <SpringFrameworkHero
        eyebrow="Spring Framework · AOP"
        title="Aspect ordering"
        subtitle="Control which aspect runs first when several apply to the same join point using @Order or Ordered."
      />
      <SpringFrameworkWhyGrid items={WHY} />
      <div className="sf-tabs">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" className={`sf-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>
      {tab === 'order' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="Two aspects">
            <SpringFrameworkAspectOrderDiagram />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'chain' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="Proxy stacks layers">
            <SpringFrameworkAopProxyDiagram />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'transactions' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="Typical ordering goal">
            <HorizontalPipeline
              title="Transaction boundary"
              fresherHint={false}
              steps={[
                { title: 'logging outer', sub: 'audit' },
                { title: 'transaction inner', sub: '@Transactional' },
                { title: 'target', sub: 'business' },
                { title: 'commit/rollback', sub: 'tx aspect' }
              ]}
            />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'pitfalls' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="Avoid surprises">
            <HorizontalPipeline
              title="Checklist"
              fresherHint={false}
              steps={[
                { title: 'same @Order', sub: 'undefined tie' },
                { title: 'different join points', sub: 'verify both run' },
                { title: 'profile', sub: 'latency' }
              ]}
            />
          </SpringFrameworkDiagramFrame>
          <SpringFrameworkCallout variant="watch" title="Readability">
            Document aspect order in team wiki—future readers will thank you.
          </SpringFrameworkCallout>
        </div>
      )}
    </div>
  );
}
