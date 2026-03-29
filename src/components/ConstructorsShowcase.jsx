import { useState } from 'react';
import { OopHero, OopWhyGrid, OopDiagramFrame, OopCallout } from './oop/OopBlocks';
import { ThisSuperDiagram, HorizontalPipeline } from './flow/ProfessionalDiagrams';

const WHY = [
  { title: 'Initialize correctly', text: 'Constructors ensure objects are created in a valid state from the beginning.' },
  { title: 'Overloaded creation', text: 'Different constructors support different ways to create the same object.' },
  { title: 'this and super', text: 'Constructor chaining avoids duplication and keeps initialization clean.' }
];

export default function ConstructorsShowcase() {
  const [tab, setTab] = useState('flow');
  return (
    <div className="oop-showcase">
      <OopHero eyebrow="Object Initialization" title="Constructors" subtitle="Constructor runs automatically when an object is created with new. It initializes fields and can delegate to other constructors." />
      <OopWhyGrid items={WHY} />
      <div className="oop-tabs">
        {['flow', 'overload', 'chaining'].map((id) => (
          <button key={id} type="button" className={`oop-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            {id === 'flow' ? 'Lifecycle' : id === 'overload' ? 'Overloading' : 'this/super'}
          </button>
        ))}
      </div>
      {tab === 'flow' && <div className="oop-panel"><OopDiagramFrame><HorizontalPipeline title="Constructor lifecycle" steps={[{ title: 'new object', sub: 'memory alloc' }, { title: 'constructor call', sub: 'init fields' }, { title: 'ready', sub: 'safe state' }, { title: 'methods', sub: 'use object' }]} /></OopDiagramFrame></div>}
      {tab === 'overload' && <div className="oop-panel"><OopDiagramFrame><HorizontalPipeline title="Constructor overloading" steps={[{ title: 'User()', sub: 'default values' }, { title: 'User(name)', sub: 'partial init' }, { title: 'User(name, age)', sub: 'full init' }, { title: 'reuse', sub: 'call this(...)' }]} /></OopDiagramFrame></div>}
      {tab === 'chaining' && <div className="oop-panel"><OopDiagramFrame><ThisSuperDiagram /></OopDiagramFrame><OopCallout variant="remember" title="Rule">In constructor body, <code>this(...)</code> or <code>super(...)</code> must be the first statement.</OopCallout></div>}
    </div>
  );
}
