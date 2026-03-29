import { useState } from 'react';
import { OopHero, OopWhyGrid, OopDiagramFrame } from './oop/OopBlocks';
import { OopClassDiagram, HorizontalPipeline } from './flow/ProfessionalDiagrams';

const TABS = [['class-object', 'Class vs Object'], ['lifecycle', 'Object lifecycle'], ['best', 'Best practices']];
const WHY = [
  { title: 'Class is blueprint', text: 'A class describes structure and behavior. Objects are real instances created from that class.' },
  { title: 'Many objects', text: 'One class can create many objects with different values (name, age, balance) but same behavior.' },
  { title: 'Core Java base', text: 'Understanding class/object is required before inheritance, constructors, and polymorphism.' }
];

export default function ClassesObjectsShowcase() {
  const [tab, setTab] = useState('class-object');
  return (
    <div className="oop-showcase">
      <OopHero eyebrow="OOP Foundations" title="Classes and Objects" subtitle="Class defines what an object can store and do; object is the actual runtime thing in memory." />
      <OopWhyGrid items={WHY} />
      <div className="oop-tabs">{TABS.map(([id, label]) => <button key={id} type="button" className={`oop-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>{label}</button>)}</div>
      {tab === 'class-object' && <div className="oop-panel"><OopDiagramFrame><OopClassDiagram /></OopDiagramFrame></div>}
      {tab === 'lifecycle' && <div className="oop-panel"><OopDiagramFrame><HorizontalPipeline title="Object lifecycle" steps={[{ title: 'new', sub: 'allocate memory' }, { title: 'constructor', sub: 'initialize state' }, { title: 'method calls', sub: 'use object' }, { title: 'gc', sub: 'cleanup later' }]} /></OopDiagramFrame></div>}
      {tab === 'best' && <div className="oop-panel"><OopDiagramFrame><HorizontalPipeline title="Class design starter rules" steps={[{ title: 'one purpose', sub: 'single responsibility' }, { title: 'private fields', sub: 'protect data' }, { title: 'meaningful names', sub: 'readability' }, { title: 'small methods', sub: 'easy debug' }]} /></OopDiagramFrame></div>}
    </div>
  );
}
