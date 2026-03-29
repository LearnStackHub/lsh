import { useState } from 'react';
import { ControlFlowHero, ControlFlowWhyGrid, CfDiagramFrame, CfCallout } from './controlflow/ControlFlowBlocks';
import { BreakContinueTrackDiagram, HorizontalPipeline } from './flow/ProfessionalDiagrams';

const TABS = [
  ['core', 'Core behavior'],
  ['search', 'Search/filter use'],
  ['nested', 'Nested loops'],
  ['guidelines', 'Best practices']
];

const WHY = [
  {
    title: 'Skip or stop',
    text: 'continue skips the rest of this lap and jumps to the next iteration. break leaves the entire loop—useful for search-as-soon-as-found patterns.'
  },
  {
    title: 'Works inside loops',
    text: 'Both keywords only make sense in loop or switch contexts (break also exits switch). They do not magically skip method calls outside the loop.'
  },
  {
    title: 'Labels for nesting',
    text: 'Plain break/continue affect the innermost loop. Labeled break can exit outer loops when you truly need cross-level control—use sparingly for clarity.'
  }
];

export default function BreakContinueShowcase() {
  const [tab, setTab] = useState('core');
  return (
    <div className="cf-showcase cf-break-showcase">
      <ControlFlowHero
        eyebrow="Fine control"
        title="Break & continue"
        subtitle="Adjust the default loop flow: continue starts the next iteration early; break stops the whole loop (or switch). Think ‘skip this item’ vs ‘we are done searching.’"
      />
      <ControlFlowWhyGrid items={WHY} />

      <div className="cf-tabs">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" className={`cf-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'core' && (
        <div className="cf-panel">
          <CfDiagramFrame label="Break vs continue">
            <BreakContinueTrackDiagram />
          </CfDiagramFrame>
          <p className="cf-caption">
            Use <code>break</code> when you have found what you need and further iterations waste time. Use <code>continue</code> when the current element is irrelevant but
            others might still matter.
          </p>
          <CfCallout variant="tip" title="Quick analogy">
            continue = skip to next lap of the same race. break = leave the stadium—no more laps in this loop.
          </CfCallout>
        </div>
      )}
      {tab === 'search' && (
        <div className="cf-panel">
          <CfDiagramFrame label="Search pipeline">
            <HorizontalPipeline
              title="Search pipeline pattern"
              steps={[
                { title: 'scan item', sub: 'iterate' },
                { title: 'continue', sub: 'skip blocked/ad' },
                { title: 'accept item', sub: 'relevant result' },
                { title: 'break', sub: 'enough results' }
              ]}
            />
          </CfDiagramFrame>
          <p className="cf-caption">
            Filter pipelines often continue past junk rows, then break when the list is full or the target is found—common in parsing and data cleanup exercises.
          </p>
        </div>
      )}
      {tab === 'nested' && (
        <div className="cf-panel">
          <CfDiagramFrame label="Nested loops">
            <HorizontalPipeline
              title="In nested loops"
              steps={[
                { title: 'break', sub: 'innermost only' },
                { title: 'label break', sub: 'outer exit' },
                { title: 'continue', sub: 'next inner round' },
                { title: 'label continue', sub: 'outer next round' }
              ]}
            />
          </CfDiagramFrame>
          <p className="cf-caption">
            Without labels, <code>break</code> and <code>continue</code> only affect the innermost loop. Named labels are advanced—prefer extracting a method when logic gets
            tangled.
          </p>
          <CfCallout variant="watch" title="Readability">
            If you need labeled break often, consider returning from a helper method instead so readers see one clear exit point.
          </CfCallout>
        </div>
      )}
      {tab === 'guidelines' && (
        <div className="cf-panel">
          <CfDiagramFrame label="Best practices">
            <HorizontalPipeline
              title="Readable usage guidelines"
              steps={[
                { title: 'single purpose checks', sub: 'small if blocks' },
                { title: 'avoid deep jumps', sub: 'extract methods' },
                { title: 'name flags clearly', sub: 'found/valid/skip' },
                { title: 'test edge cases', sub: 'empty/all-skipped' }
              ]}
            />
          </CfDiagramFrame>
          <p className="cf-caption">
            Combine clear boolean names (<code>found</code>, <code>shouldSkip</code>) with short loop bodies so break/continue feel obvious to someone reading your code for
            the first time.
          </p>
        </div>
      )}
    </div>
  );
}
