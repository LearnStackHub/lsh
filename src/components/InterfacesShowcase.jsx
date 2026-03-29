import { useState } from 'react';
import { OopHero, OopWhyGrid, OopDiagramFrame } from './oop/OopBlocks';
import { InterfaceContractDiagram, HorizontalPipeline } from './flow/ProfessionalDiagrams';

const WHY = [
  { title: 'Contract-first design', text: 'Interface defines what classes must do, not how they do it.' },
  { title: 'Loose coupling', text: 'Code depends on interface type, so implementations can change without caller changes.' },
  { title: 'Multiple behavior contracts', text: 'A class can implement multiple interfaces, unlike extending multiple classes.' }
];

export default function InterfacesShowcase() {
  const [tab, setTab] = useState('contract');
  return (
    <div className="oop-showcase">
      <OopHero eyebrow="Contracts" title="Interfaces" subtitle="Interface is a behavior contract. Any class implementing it must provide method bodies for the declared methods." />
      <OopWhyGrid items={WHY} />
      <div className="oop-tabs">{[['contract', 'Contract'], ['default', 'Default/static methods'], ['usage', 'When to choose']].map(([id, label]) => <button key={id} type="button" className={`oop-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>{label}</button>)}</div>
      {tab === 'contract' && <div className="oop-panel"><OopDiagramFrame><InterfaceContractDiagram /></OopDiagramFrame></div>}
      {tab === 'default' && <div className="oop-panel"><OopDiagramFrame><HorizontalPipeline title="Modern interface features" steps={[{ title: 'abstract methods', sub: 'must implement' }, { title: 'default methods', sub: 'optional override' }, { title: 'static methods', sub: 'utility in interface' }, { title: 'private methods', sub: 'reuse inside defaults' }]} /></OopDiagramFrame></div>}
      {tab === 'usage' && <div className="oop-panel"><OopDiagramFrame><HorizontalPipeline title="Use interface when" steps={[{ title: 'many implementations', sub: 'gateway pattern' }, { title: 'plugin-like behavior', sub: 'swap classes' }, { title: 'test doubles needed', sub: 'mock interface' }, { title: 'cross-team API', sub: 'stable contract' }]} /></OopDiagramFrame></div>}
    </div>
  );
}
