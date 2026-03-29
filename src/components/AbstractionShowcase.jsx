import { useState } from 'react';
import { OopHero, OopWhyGrid, OopDiagramFrame, OopCallout } from './oop/OopBlocks';
import { InterfaceContractDiagram, HorizontalPipeline } from './flow/ProfessionalDiagrams';

const WHY = [
  { title: 'Hide complexity', text: 'Users call high-level methods without knowing internal implementation details.' },
  { title: 'Stable API', text: 'You can improve internals later while keeping the same public contract.' },
  { title: 'Cleaner architecture', text: 'Service layers and repository patterns rely on abstraction for maintainability.' }
];

export default function AbstractionShowcase() {
  const [tab, setTab] = useState('idea');
  return (
    <div className="oop-showcase">
      <OopHero eyebrow="Show what, hide how" title="Abstraction" subtitle="Abstraction focuses on essential behavior and hides unnecessary implementation details from the caller." />
      <OopWhyGrid items={WHY} />
      <div className="oop-tabs">{[['idea', 'Concept'], ['abstract', 'Abstract class'], ['interface', 'Interface']].map(([id, label]) => <button key={id} type="button" className={`oop-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>{label}</button>)}</div>
      {tab === 'idea' && <div className="oop-panel"><OopDiagramFrame><HorizontalPipeline title="Abstraction flow" steps={[{ title: 'client need', sub: 'pay()' }, { title: 'contract', sub: 'what to do' }, { title: 'implementation', sub: 'how to do' }, { title: 'swap easily', sub: 'new strategy' }]} /></OopDiagramFrame></div>}
      {tab === 'abstract' && <div className="oop-panel"><OopDiagramFrame><HorizontalPipeline title="Abstract class shape" steps={[{ title: 'common fields', sub: 'shared state' }, { title: 'concrete methods', sub: 'reusable logic' }, { title: 'abstract methods', sub: 'must implement' }, { title: 'child classes', sub: 'specific behavior' }]} /></OopDiagramFrame></div>}
      {tab === 'interface' && <div className="oop-panel"><OopDiagramFrame><InterfaceContractDiagram /></OopDiagramFrame><OopCallout variant="tip" title="When to use">Use interface when multiple unrelated classes should follow one contract.</OopCallout></div>}
    </div>
  );
}
