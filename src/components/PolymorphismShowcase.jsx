import { useState } from 'react';
import { OopHero, OopWhyGrid, OopDiagramFrame } from './oop/OopBlocks';
import { MethodOverloadingDiagram, HorizontalPipeline } from './flow/ProfessionalDiagrams';

const WHY = [
  { title: 'Flexible code', text: 'Write code against parent/interface type and swap concrete implementations easily.' },
  { title: 'Compile vs runtime', text: 'Overloading is compile-time polymorphism; overriding is runtime polymorphism.' },
  { title: 'Real projects', text: 'Payment methods, notification channels, and storage adapters all use polymorphism heavily.' }
];

export default function PolymorphismShowcase() {
  const [tab, setTab] = useState('types');
  return (
    <div className="oop-showcase">
      <OopHero eyebrow="Many Forms" title="Polymorphism" subtitle="One method name/interface can represent different implementations. Java decides at compile time or runtime based on the type context." />
      <OopWhyGrid items={WHY} />
      <div className="oop-tabs">{[['types', 'Two types'], ['overload', 'Overloading'], ['override', 'Overriding']].map(([id, label]) => <button key={id} type="button" className={`oop-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>{label}</button>)}</div>
      {tab === 'types' && <div className="oop-panel"><OopDiagramFrame><HorizontalPipeline title="Polymorphism at a glance" steps={[{ title: 'parent ref', sub: 'Shape s' }, { title: 'child object', sub: 'new Circle()' }, { title: 'same method call', sub: 's.draw()' }, { title: 'actual child code', sub: 'Circle.draw()' }]} /></OopDiagramFrame></div>}
      {tab === 'overload' && <div className="oop-panel"><OopDiagramFrame><MethodOverloadingDiagram /></OopDiagramFrame></div>}
      {tab === 'override' && <div className="oop-panel"><OopDiagramFrame><HorizontalPipeline title="Runtime dispatch" steps={[{ title: 'parent method', sub: 'declared in base' }, { title: 'child override', sub: 'custom logic' }, { title: 'parent reference call', sub: 'common API' }, { title: 'runtime binds', sub: 'child method executes' }]} /></OopDiagramFrame></div>}
    </div>
  );
}
