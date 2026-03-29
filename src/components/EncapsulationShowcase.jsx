import { useState } from 'react';
import { OopHero, OopWhyGrid, OopDiagramFrame, OopCallout } from './oop/OopBlocks';
import { HorizontalPipeline } from './flow/ProfessionalDiagrams';

const WHY = [
  { title: 'Protect object state', text: 'Private fields prevent direct invalid updates from outside the class.' },
  { title: 'Controlled access', text: 'Getter/setter methods allow validation rules before storing data.' },
  { title: 'Future-proof changes', text: 'Internal field representation can change without breaking external code.' }
];

export default function EncapsulationShowcase() {
  const [tab, setTab] = useState('core');
  return (
    <div className="oop-showcase">
      <OopHero eyebrow="Data Protection" title="Encapsulation" subtitle="Bundle fields and methods together, keep fields private, and expose controlled operations through methods." />
      <OopWhyGrid items={WHY} />
      <div className="oop-tabs">{[['core', 'Core idea'], ['access', 'Access modifiers'], ['validation', 'Validation']].map(([id, label]) => <button key={id} type="button" className={`oop-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>{label}</button>)}</div>
      {tab === 'core' && <div className="oop-panel"><OopDiagramFrame><HorizontalPipeline title="Encapsulation recipe" steps={[{ title: 'private fields', sub: 'hide state' }, { title: 'public methods', sub: 'safe operations' }, { title: 'validate inputs', sub: 'business rules' }, { title: 'maintain invariants', sub: 'always valid object' }]} /></OopDiagramFrame></div>}
      {tab === 'access' && <div className="oop-panel"><OopDiagramFrame><HorizontalPipeline title="Visibility levels" steps={[{ title: 'private', sub: 'inside class' }, { title: 'default', sub: 'same package' }, { title: 'protected', sub: 'package + child' }, { title: 'public', sub: 'everywhere' }]} /></OopDiagramFrame></div>}
      {tab === 'validation' && <div className="oop-panel"><OopDiagramFrame><HorizontalPipeline title="Setter validation flow" steps={[{ title: 'receive value', sub: 'setAge(-1)' }, { title: 'check rule', sub: 'must be >= 0' }, { title: 'accept/reject', sub: 'throw/ignore' }, { title: 'store valid', sub: 'safe object state' }]} /></OopDiagramFrame><OopCallout variant="watch" title="Common bug">Public fields skip validation and can create impossible object states.</OopCallout></div>}
    </div>
  );
}
