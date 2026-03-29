import { useState } from 'react';
import {
  JavaSyntaxAnatomyDiagram,
  JavaFileStructureDiagram,
  JavaSyntaxErrorsDiagram,
  HorizontalPipeline
} from './flow/ProfessionalDiagrams';

const TABS = [
  ['anatomy', 'Hello anatomy'],
  ['rules', 'Core rules'],
  ['naming', 'Naming'],
  ['structure', 'File structure'],
  ['mistakes', 'Common mistakes']
];

export default function JavaSyntaxShowcase() {
  const [tab, setTab] = useState('anatomy');

  return (
    <div className="java-env-showcase java-syntax-showcase">
      <p className="java-env-showcase-lead">
        Interactive syntax guide: class and main method anatomy, must-know grammar rules, naming conventions,
        file layout, and quick fixes for common errors.
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

      {tab === 'anatomy' && (
        <div className="java-env-panel">
          <JavaSyntaxAnatomyDiagram />
          <p className="java-env-caption">
            This is the lesson&apos;s first program broken into visual parts: class declaration, the <code>main</code>{' '}
            entry point, and statements that must end with semicolons.
          </p>
        </div>
      )}

      {tab === 'rules' && (
        <div className="java-env-panel">
          <HorizontalPipeline
            title="Core syntax rules"
            steps={[
              { title: ';', sub: 'end each statement' },
              { title: '{ }', sub: 'define code blocks' },
              { title: 'Case', sub: 'System != system' },
              { title: 'Whitespace', sub: 'ignored by compiler' },
              { title: 'Readability', sub: 'format for humans' }
            ]}
          />
          <p className="java-env-caption">
            These match the four syntax rules in the tutorial. Java is strict about semicolons and case, and flexible
            with spaces.
          </p>
        </div>
      )}

      {tab === 'naming' && (
        <div className="java-env-panel">
          <HorizontalPipeline
            title="Naming conventions used in real codebases"
            steps={[
              { title: 'Class', sub: 'PascalCase' },
              { title: 'method()', sub: 'camelCase' },
              { title: 'variable', sub: 'camelCase' },
              { title: 'CONSTANT', sub: 'UPPER_SNAKE_CASE' },
              { title: 'package', sub: 'lowercase' }
            ]}
          />
          <p className="java-env-caption">
            These are conventions (not compiler errors), but teams expect them for readability and consistency.
          </p>
        </div>
      )}

      {tab === 'structure' && (
        <div className="java-env-panel">
          <JavaFileStructureDiagram />
          <p className="java-env-caption">
            Typical order inside a Java file: package, imports, class body, fields, constructor, methods, and optional{' '}
            <code>main</code>.
          </p>
        </div>
      )}

      {tab === 'mistakes' && (
        <div className="java-env-panel">
          <JavaSyntaxErrorsDiagram />
          <p className="java-env-caption">
            Three high-frequency beginner mistakes from the article: missing semicolon, wrong case in{' '}
            <code>System</code>, and using single quotes for strings.
          </p>
        </div>
      )}
    </div>
  );
}
