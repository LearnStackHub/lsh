import { useState } from 'react';
import { OopHero, OopWhyGrid, OopDiagramFrame, OopCallout } from './oop/OopBlocks';
import { InheritanceHierarchyDiagram, HorizontalPipeline } from './flow/ProfessionalDiagrams';

const WHY = [
  { title: 'Reuse parent code', text: 'Child classes inherit common fields and methods, so repeated logic stays in one place.' },
  { title: 'Model is-a', text: 'Dog is an Animal, Car is a Vehicle. Inheritance expresses this relationship clearly.' },
  { title: 'Override behavior', text: 'Child can keep common behavior and customize only what changes.' }
];

export default function InheritanceShowcase() {
  const [tab, setTab] = useState('tree');
  return (
    <div className="oop-showcase">
      <OopHero eyebrow="Code Reuse" title="Inheritance" subtitle="Inheritance lets a child class extend a parent class. Use it for true is-a relationships, not just to share random code." />
      <OopWhyGrid items={WHY} />
      <div className="oop-tabs">{[['tree', 'Hierarchy'], ['override', 'Overriding'], ['caution', 'When not to use']].map(([id, label]) => <button key={id} type="button" className={`oop-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>{label}</button>)}</div>
      {tab === 'tree' && <div className="oop-panel"><OopDiagramFrame><InheritanceHierarchyDiagram /></OopDiagramFrame></div>}
      {tab === 'override' && <div className="oop-panel"><OopDiagramFrame><HorizontalPipeline title="Method overriding flow" steps={[{ title: 'parent method', sub: 'default behavior' }, { title: 'child extends', sub: 'inherits all' }, { title: '@Override', sub: 'custom behavior' }, { title: 'runtime call', sub: 'child version runs' }]} /></OopDiagramFrame></div>}
      {tab === 'caution' && <div className="oop-panel"><OopDiagramFrame><HorizontalPipeline title="Prefer composition when" steps={[{ title: 'no real is-a', sub: 'wrong hierarchy' }, { title: 'just feature reuse', sub: 'has-a better' }, { title: 'deep chains', sub: 'hard to debug' }, { title: 'frequent change', sub: 'fragile base class' }]} /></OopDiagramFrame><OopCallout variant="watch" title="Design warning">If sentence “X is a Y” sounds forced, use composition instead of inheritance.</OopCallout></div>}
    </div>
  );
}
