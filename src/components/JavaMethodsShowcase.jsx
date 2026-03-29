import { useState } from 'react';
import {
  MethodAnatomyDiagram,
  ParametersVsArgumentsDiagram,
  MethodOverloadingDiagram,
  PassByValueDiagram,
  MethodScopeDiagram,
  ReturnStatementFlowDiagram,
  HorizontalPipeline
} from './flow/ProfessionalDiagrams';

const TABS = [
  ['why', 'Why methods'],
  ['anatomy', 'Anatomy'],
  ['kinds', 'Four shapes'],
  ['params', 'Params vs args'],
  ['return', 'return'],
  ['overload', 'Overloading'],
  ['scope', 'Scope & pass']
];

export default function JavaMethodsShowcase() {
  const [tab, setTab] = useState('why');

  return (
    <div className="java-env-showcase java-methods-showcase">
      <p className="java-env-showcase-lead">
        Deeper map of the lesson: why methods exist, how a signature is built, the four common shapes, parameters vs
        arguments, <code>return</code> behavior, overloading rules, local scope, and Java&apos;s pass-by-value model.
      </p>

      <div className="java-types-tabs java-env-tabs">
        {TABS.map(([id, label]) => (
          <button
            key={id}
            type="button"
            className={`java-types-tab ${tab === id ? 'active' : ''}`}
            onClick={() => setTab(id)}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 'why' && (
        <div className="java-env-panel">
          <HorizontalPipeline
            title="Why extract methods?"
            steps={[
              { title: 'Reuse', sub: 'call many times' },
              { title: 'Organize', sub: 'smaller pieces' },
              { title: 'Readability', sub: 'named steps' },
              { title: 'Maintain', sub: 'fix once' },
              { title: 'Test', sub: 'isolate logic' }
            ]}
          />
          <p className="java-env-caption">
            Each benefit maps to the bullet list in the article — methods are the main tool for structuring real
            programs beyond a single <code>main</code>.
          </p>
        </div>
      )}

      {tab === 'anatomy' && (
        <div className="java-env-panel">
          <MethodAnatomyDiagram />
          <p className="java-env-caption">
            <strong>Access modifier</strong> controls visibility; <strong>static</strong> (when present) means the method
            belongs to the class. <strong>Return type</strong> is what you send back; <code>void</code> means nothing.
            The <strong>parameter list</strong> defines inputs — names are local to the method body.
          </p>
        </div>
      )}

      {tab === 'kinds' && (
        <div className="java-env-panel">
          <HorizontalPipeline
            title="Four common method shapes (from the tutorial)"
            steps={[
              { title: 'void()', sub: 'no in, no out' },
              { title: 'void(…)', sub: 'params, no return' },
              { title: 'T()', sub: 'return, no params' },
              { title: 'T(…)', sub: 'params + return' }
            ]}
          />
          <p className="java-env-caption">
            Pick the smallest shape that fits: <code>void</code> for side effects (printing), a return type when the
            caller needs a computed value.
          </p>
        </div>
      )}

      {tab === 'params' && (
        <div className="java-env-panel">
          <ParametersVsArgumentsDiagram />
          <p className="java-env-caption">
            <strong>Parameters</strong> are the placeholders in the method header; <strong>arguments</strong> are the
            concrete expressions at the call site. Same idea as the lesson&apos;s <code>add</code> example.
          </p>
        </div>
      )}

      {tab === 'return' && (
        <div className="java-env-panel">
          <ReturnStatementFlowDiagram />
          <p className="java-env-caption">
            <code>return</code> both <strong>produces the value</strong> for the caller and <strong>stops</strong> the
            method. In <code>void</code> methods, you can still use bare <code>return;</code> to exit early (e.g. guard
            clauses).
          </p>
        </div>
      )}

      {tab === 'overload' && (
        <div className="java-env-panel">
          <MethodOverloadingDiagram />
          <p className="java-env-caption">
            The compiler resolves overloads by the <strong>number and types</strong> of arguments — not by return type
            alone. Match the call to the most specific applicable signature.
          </p>
        </div>
      )}

      {tab === 'scope' && (
        <div className="java-env-panel">
          <MethodScopeDiagram />
          <p className="java-env-caption">
            Locals declared in one method are invisible elsewhere — that is why <code>methodB</code> cannot see{' '}
            <code>x</code> from <code>methodA</code>.
          </p>
          <div className="java-intro-second-flow">
            <PassByValueDiagram />
            <p className="java-env-caption">
              Java always passes <strong>by value</strong>: primitives copy the bits; object parameters copy the
              reference, so the callee can mutate the same object the caller points to (arrays, collections, etc.).
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
