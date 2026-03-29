import { useState } from 'react';
import {
  KeywordCategoryMapDiagram,
  ThisSuperDiagram,
  ThrowThrowsDiagram,
  HorizontalPipeline
} from './flow/ProfessionalDiagrams';

const TABS = [
  ['map', 'Keyword map'],
  ['important', 'Core keywords'],
  ['thissuper', 'this / super'],
  ['exceptions', 'throw / throws'],
  ['mistakes', 'Common mistakes']
];

export default function JavaKeywordsShowcase() {
  const [tab, setTab] = useState('map');

  return (
    <div className="java-env-showcase java-keywords-showcase">
      <p className="java-env-showcase-lead">
        Deep visual guide to Java keywords: grouped categories, high-impact keywords used daily, confusing pairs like
        <code> this </code>vs<code> super </code>and<code> throw </code>vs<code> throws</code>, plus frequent beginner mistakes.
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
          <KeywordCategoryMapDiagram />
          <p className="java-env-caption">
            Use this as your memory map while reading the full list below: each category groups keywords by intent so you
            can recall them faster in real code.
          </p>
        </div>
      )}

      {tab === 'important' && (
        <div className="java-env-panel">
          <HorizontalPipeline
            title="Most-used keywords in day-to-day Java"
            steps={[
              { title: 'class', sub: 'define type' },
              { title: 'public/private', sub: 'access control' },
              { title: 'static', sub: 'class-level member' },
              { title: 'final', sub: 'immutable / no override' },
              { title: 'if/for/while', sub: 'control flow' },
              { title: 'return', sub: 'exit + value' }
            ]}
          />
          <p className="java-env-caption">
            These are the keywords you will touch constantly. The lesson’s deep section on <code>static</code>,{' '}
            <code>final</code>, <code>this</code>, <code>super</code>, and <code>abstract</code> gives the behavior details.
          </p>
        </div>
      )}

      {tab === 'thissuper' && (
        <div className="java-env-panel">
          <ThisSuperDiagram />
          <p className="java-env-caption">
            <code>this</code> points to the current object; <code>super</code> reaches parent constructor or members.
            Use them when names shadow each other or when extending parent behavior.
          </p>
        </div>
      )}

      {tab === 'exceptions' && (
        <div className="java-env-panel">
          <ThrowThrowsDiagram />
          <p className="java-env-caption">
            <code>throw</code> executes and creates an exception flow immediately. <code>throws</code> is just part of the
            method contract, telling callers what may be thrown.
          </p>
        </div>
      )}

      {tab === 'mistakes' && (
        <div className="java-env-panel">
          <HorizontalPipeline
            title="High-frequency keyword mistakes"
            steps={[
              { title: 'class as var', sub: 'reserved word error' },
              { title: 'new as name', sub: 'reserved word error' },
              { title: 'for as boolean', sub: 'reserved word error' },
              { title: 'throw/throws', sub: 'usage confusion' },
              { title: 'this/super', sub: 'wrong target object' }
            ]}
          />
          <p className="java-env-caption">
            If a token has language meaning, you cannot reuse it as an identifier. Also remember: <code>true</code>,{' '}
            <code>false</code>, and <code>null</code> are reserved literals (not keywords) but still unavailable for naming.
          </p>
        </div>
      )}
    </div>
  );
}
