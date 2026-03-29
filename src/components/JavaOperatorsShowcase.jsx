import { useState } from 'react';
import {
  ArithmeticIntVsDoubleDiagram,
  ShortCircuitLogicalDiagram,
  LogicalTruthTableDiagram,
  UnaryPrePostDiagram,
  TernaryOperatorDiagram,
  OperatorPrecedenceDiagram,
  HorizontalPipeline
} from './flow/ProfessionalDiagrams';

const TABS = [
  ['map', 'Categories'],
  ['math', 'Arithmetic'],
  ['assign', 'Assignment'],
  ['compare', 'Comparison'],
  ['logic', 'Logical'],
  ['unary', 'Unary'],
  ['ternary', 'Ternary'],
  ['order', 'Precedence']
];

export default function JavaOperatorsShowcase() {
  const [tab, setTab] = useState('map');

  return (
    <div className="java-env-showcase java-operators-showcase">
      <p className="java-env-showcase-lead">
        Deeper tour of the lesson: how operator families fit together, where integer division and <code>%</code> bite,
        compound assignment, comparisons (and <code>String</code> equality), short-circuit logic, unary order, the{' '}
        <code>?:</code> shorthand, and precedence so you can read complex expressions confidently.
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

      {tab === 'map' && (
        <div className="java-env-panel">
          <HorizontalPipeline
            title="Operator families in this tutorial (read left → right)"
            steps={[
              { title: 'Arithmetic', sub: '+ − * / %' },
              { title: 'Assignment', sub: '= += …' },
              { title: 'Comparison', sub: '== > …' },
              { title: 'Logical', sub: '&& || !' },
              { title: 'Unary', sub: '++ −− !' },
              { title: 'Ternary', sub: '? :' }
            ]}
          />
          <p className="java-env-caption">
            The article also lists <strong>bitwise</strong> operators (<code>&amp;</code>, <code>|</code>,{' '}
            <code>^</code>, shifts) as part of Java — they are a separate topic when you work with raw bits. Everything
            in the tabs below matches the sections in the markdown.
          </p>
        </div>
      )}

      {tab === 'math' && (
        <div className="java-env-panel">
          <HorizontalPipeline
            title="Arithmetic operators"
            steps={[
              { title: '+', sub: 'add' },
              { title: '-', sub: 'subtract' },
              { title: '*', sub: 'multiply' },
              { title: '/', sub: 'divide' },
              { title: '%', sub: 'remainder' }
            ]}
          />
          <p className="java-env-caption">
            <strong>Integer division</strong> truncates toward zero when both operands are integral types.{' '}
            <strong>Modulus</strong> <code>%</code> is the remainder — useful for even/odd tests, last digit, and
            wrapping values (as in the lesson examples).
          </p>
          <ArithmeticIntVsDoubleDiagram />
          <p className="java-env-caption">
            Force floating division by using a <code>double</code> literal (e.g. <code>5.0</code>) or casting — otherwise
            <code>5 / 2</code> stays in integer land.
          </p>
        </div>
      )}

      {tab === 'assign' && (
        <div className="java-env-panel">
          <HorizontalPipeline
            title="Simple and compound assignment"
            steps={[
              { title: '=', sub: 'assign' },
              { title: '+=', sub: 'add to' },
              { title: '-=', sub: 'subtract' },
              { title: '*=', sub: 'multiply' },
              { title: '/=', sub: 'divide' },
              { title: '%=', sub: 'mod' }
            ]}
          />
          <p className="java-env-caption">
            Compound forms are shorthand: <code>x += 3</code> means “read <code>x</code>, add 3, store back in{' '}
            <code>x</code>”. Same idea for <code>-=</code>, <code>*=</code>, etc. — less typing and often clearer intent.
          </p>
        </div>
      )}

      {tab === 'compare' && (
        <div className="java-env-panel">
          <HorizontalPipeline
            title="Comparison operators (always boolean)"
            steps={[
              { title: '==', sub: 'equal' },
              { title: '!=', sub: 'not equal' },
              { title: '>', sub: 'greater' },
              { title: '<', sub: 'less' },
              { title: '>=', sub: 'ge' },
              { title: '<=', sub: 'le' }
            ]}
          />
          <p className="java-env-caption">
            For <strong>object references</strong>, <code>==</code> compares references, not “same text”. For{' '}
            <strong>strings</strong>, use <code>equals()</code> or <code>equalsIgnoreCase()</code> for value equality
            — the lesson calls this out explicitly.
          </p>
        </div>
      )}

      {tab === 'logic' && (
        <div className="java-env-panel">
          <ShortCircuitLogicalDiagram />
          <p className="java-env-caption">
            <strong>Short-circuit</strong> is not just optimization: if the right-hand side has side effects (method
            calls, assignments), the skipped branch may never run — so order your conditions deliberately (e.g. null check
            before <code>.length()</code>).
          </p>
          <div className="java-intro-second-flow">
            <LogicalTruthTableDiagram />
            <p className="java-env-caption">
              <strong>AND</strong> needs both true; <strong>OR</strong> needs at least one true. <strong>NOT</strong>{' '}
              <code>!</code> flips a boolean — combine with parentheses when mixing with <code>&amp;&amp;</code> and{' '}
              <code>||</code>.
            </p>
          </div>
        </div>
      )}

      {tab === 'unary' && (
        <div className="java-env-panel">
          <UnaryPrePostDiagram />
          <p className="java-env-caption">
            Unary <code>+</code> and <code>-</code> force sign; <code>++</code> and <code>--</code> change a numeric
            variable by 1. Pre vs post only changes <em>when</em> the value is read for the surrounding expression — the
            lesson recommends avoiding tricky combined expressions.
          </p>
        </div>
      )}

      {tab === 'ternary' && (
        <div className="java-env-panel">
          <TernaryOperatorDiagram />
          <p className="java-env-caption">
            Syntax: <code>condition ? exprIfTrue : exprIfFalse</code>. Both branches must be assignable to a common type
            in context. Use it for short, readable choices; for multi-step logic, a normal <code>if / else</code> is
            clearer.
          </p>
        </div>
      )}

      {tab === 'order' && (
        <div className="java-env-panel">
          <OperatorPrecedenceDiagram />
          <p className="java-env-caption">
            When in doubt, use <strong>parentheses</strong>. Example from the lesson: <code>2 + 3 * 4</code> is{' '}
            <code>14</code>, not <code>20</code>, because <code>*</code> binds tighter than <code>+</code>. Assignment
            operators sit at the bottom of the stack — the whole right-hand side is evaluated first.
          </p>
        </div>
      )}
    </div>
  );
}
