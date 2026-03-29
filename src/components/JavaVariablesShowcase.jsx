import { useState } from 'react';
import {
  VariableDeclarationDiagram,
  VariableKindsDiagram,
  VariableDefaultsDiagram,
  HorizontalPipeline
} from './flow/ProfessionalDiagrams';

const TABS = [
  ['declare', 'Declaration'],
  ['naming', 'Naming'],
  ['kinds', 'Local / instance / static'],
  ['defaults', 'Defaults'],
  ['final', 'final const']
];

export default function JavaVariablesShowcase() {
  const [tab, setTab] = useState('declare');

  return (
    <div className="java-env-showcase java-variables-showcase">
      <p className="java-env-showcase-lead">
        Visual map for this lesson: how a declaration breaks into parts, valid naming rules, the three variable kinds,
        default values for fields, and immutable values with <code>final</code>.
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

      {tab === 'declare' && (
        <div className="java-env-panel">
          <VariableDeclarationDiagram />
          <p className="java-env-caption">
            Pattern from the article: <code>dataType variableName = value;</code>. You can split declaration and assignment
            into two statements when needed.
          </p>
        </div>
      )}

      {tab === 'naming' && (
        <div className="java-env-panel">
          <HorizontalPipeline
            title="Naming rules (must follow)"
            steps={[
              { title: 'Start', sub: 'letter, _, $' },
              { title: 'Body', sub: 'letters, digits, _, $' },
              { title: 'Not keyword', sub: 'int, class, …' },
              { title: 'Case', sub: 'age ≠ Age' },
              { title: 'Style', sub: 'camelCase' }
            ]}
          />
          <p className="java-env-caption">
            Valid identifiers plus the community convention: <strong>camelCase</strong> for variables and methods.
          </p>
        </div>
      )}

      {tab === 'kinds' && (
        <div className="java-env-panel">
          <VariableKindsDiagram />
          <p className="java-env-caption">
            <strong>Local</strong> variables live inside a method and must be assigned before use.{' '}
            <strong>Instance</strong> fields belong to each object. <strong>Static</strong> fields belong to the class and
            are shared.
          </p>
        </div>
      )}

      {tab === 'defaults' && (
        <div className="java-env-panel">
          <VariableDefaultsDiagram />
          <p className="java-env-caption">
            Instance and static fields get defaults if you omit an initializer. <strong>Local</strong> variables do not —
            the compiler requires an assignment before read.
          </p>
        </div>
      )}

      {tab === 'final' && (
        <div className="java-env-panel">
          <HorizontalPipeline
            title="Constants with final"
            steps={[
              { title: 'final', sub: 'keyword' },
              { title: 'Type + name', sub: 'like any var' },
              { title: 'One assign', sub: 'then frozen' },
              { title: 'Convention', sub: 'UPPER_SNAKE' },
              { title: 'Use', sub: 'PI, limits, keys' }
            ]}
          />
          <p className="java-env-caption">
            <code>final</code> means the reference or primitive value cannot be reassigned after the first assignment —
            perfect for constants such as <code>MIN_AGE</code> in the tutorial.
          </p>
        </div>
      )}
    </div>
  );
}
