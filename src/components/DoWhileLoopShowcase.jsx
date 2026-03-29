import { useState } from 'react';
import { ControlFlowHero, ControlFlowWhyGrid, CfDiagramFrame, CfCallout } from './controlflow/ControlFlowBlocks';
import { LoopLifecycleDiagram, WhileVsDoWhileCompareDiagram, HorizontalPipeline } from './flow/ProfessionalDiagrams';

const TABS = [
  ['lifecycle', 'Run-at-least-once'],
  ['compare', 'While vs do-while'],
  ['menus', 'Menu systems'],
  ['validation', 'Validation loops']
];

const WHY = [
  {
    title: 'Body before test',
    text: 'do-while runs the body, then checks the condition. So the first run always happens—useful when you must show or read something before you can decide to continue.'
  },
  {
    title: 'Menus and prompts',
    text: 'Display a menu, read choice, repeat until “quit” is a classic shape: you need one display before the first check makes sense.'
  },
  {
    title: 'Pair with while',
    text: 'If the same problem can be 0 or more iterations, use while. If it must be 1 or more, consider do-while—or compare both side by side below.'
  }
];

export default function DoWhileLoopShowcase() {
  const [tab, setTab] = useState('lifecycle');
  return (
    <div className="cf-showcase cf-dowhile-showcase">
      <ControlFlowHero
        eyebrow="Exit-controlled loop"
        title="Do-while"
        subtitle="Execute the body, then ask “again?” Exit-controlled loops guarantee at least one execution—great for prompts, menus, and retry until valid input."
      />
      <ControlFlowWhyGrid items={WHY} />

      <div className="cf-tabs">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" className={`cf-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'lifecycle' && (
        <div className="cf-panel">
          <CfDiagramFrame label="Do-while lifecycle">
            <LoopLifecycleDiagram mode="do-while" />
          </CfDiagramFrame>
          <p className="cf-caption">
            After each body execution, the condition decides whether to loop again. The last check can fail and exit—even though you already ran the body at least once.
          </p>
        </div>
      )}
      {tab === 'compare' && (
        <div className="cf-panel">
          <CfDiagramFrame label="While vs do-while">
            <WhileVsDoWhileCompareDiagram />
          </CfDiagramFrame>
          <p className="cf-caption">
            Left: condition gates entry—possibly zero trips. Right: body runs first, so at least one trip. Pick based on whether your problem allows “do nothing.”
          </p>
          <CfCallout variant="remember" title="Exam-style question">
            “Runs zero or more times” → while. “Runs one or more times” → do-while (given the same condition and body).
          </CfCallout>
        </div>
      )}
      {tab === 'menus' && (
        <div className="cf-panel">
          <CfDiagramFrame label="Menu loop">
            <HorizontalPipeline
              title="Menu loop shape"
              steps={[
                { title: 'show menu', sub: 'always once' },
                { title: 'read choice', sub: 'input' },
                { title: 'execute', sub: 'case action' },
                { title: 'repeat?', sub: 'until exit' }
              ]}
            />
          </CfDiagramFrame>
          <p className="cf-caption">
            The user must see options before choosing—so the first paint of the menu pairs naturally with do-while or with a while that you primed with an initial display.
          </p>
        </div>
      )}
      {tab === 'validation' && (
        <div className="cf-panel">
          <CfDiagramFrame label="Validation cycle">
            <HorizontalPipeline
              title="Input validation cycle"
              steps={[
                { title: 'get input', sub: 'first attempt' },
                { title: 'validate', sub: 'rules check' },
                { title: 'feedback', sub: 'error/success' },
                { title: 'loop on invalid', sub: 'do-while condition' }
              ]}
            />
          </CfDiagramFrame>
          <p className="cf-caption">
            Ask once, validate, if wrong show an error and ask again—often modeled with do-while: keep going while input is invalid (or until a max attempts guard).
          </p>
        </div>
      )}
    </div>
  );
}
