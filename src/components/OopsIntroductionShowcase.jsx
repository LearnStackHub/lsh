import { useState } from 'react';
import { OopHero, OopWhyGrid, OopDiagramFrame, OopCallout } from './oop/OopBlocks';
import { OopPillarsDiagram, HorizontalPipeline } from './flow/ProfessionalDiagrams';

const TABS = [
  ['pillars', '4 Pillars'],
  ['mindset', 'OOP mindset'],
  ['design', 'Design benefits']
];

const WHY = [
  { title: 'Model real world', text: 'OOP helps represent real entities like Student, Course, and Payment as classes with data + behavior.' },
  { title: 'Reusable code', text: 'Once classes are designed well, new features are added by composing objects instead of rewriting logic.' },
  { title: 'Team-friendly', text: 'Clear class responsibilities make it easier for freshers to understand large codebases without fear.' }
];

export default function OopsIntroductionShowcase() {
  const [tab, setTab] = useState('pillars');
  return (
    <div className="oop-showcase">
      <OopHero
        eyebrow="Object-Oriented Programming"
        title="OOP Introduction"
        subtitle="OOP is a way of designing programs using objects. Each object combines state (data) and behavior (methods), which keeps code modular and easier to reason about."
      />
      <OopWhyGrid items={WHY} />

      <div className="oop-tabs">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" className={`oop-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'pillars' && (
        <div className="oop-panel">
          <OopDiagramFrame label="OOP pillars">
            <OopPillarsDiagram />
          </OopDiagramFrame>
          <p className="oop-caption">The 4 pillars work together: encapsulation protects data, inheritance reuses code, polymorphism gives flexibility, abstraction reduces complexity.</p>
        </div>
      )}
      {tab === 'mindset' && (
        <div className="oop-panel">
          <OopDiagramFrame label="OOP design flow">
            <HorizontalPipeline
              title="How to think in OOP"
              steps={[
                { title: 'identify entities', sub: 'Student, BankAccount' },
                { title: 'define data', sub: 'fields' },
                { title: 'define actions', sub: 'methods' },
                { title: 'connect classes', sub: 'has-a / is-a' }
              ]}
            />
          </OopDiagramFrame>
        </div>
      )}
      {tab === 'design' && (
        <div className="oop-panel">
          <OopDiagramFrame label="Benefits">
            <HorizontalPipeline
              title="Practical OOP outcomes"
              steps={[
                { title: 'less duplication', sub: 'reuse' },
                { title: 'safe changes', sub: 'encapsulation' },
                { title: 'clean testing', sub: 'small classes' },
                { title: 'easy extension', sub: 'new features' }
              ]}
            />
          </OopDiagramFrame>
          <OopCallout variant="tip" title="Freshers tip">
            Start with one small class, then add methods gradually. Avoid trying all 4 pillars in one file from day one.
          </OopCallout>
        </div>
      )}
    </div>
  );
}
