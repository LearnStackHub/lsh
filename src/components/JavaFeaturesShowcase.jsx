import { useState } from 'react';
import {
  JavaFeaturesTwelveGrid,
  OopClassDiagram,
  WoraPlatformDiagram,
  SecurityBytecodeFlowDiagram,
  JitHybridDiagram,
  MultithreadForkDiagram,
  HorizontalPipeline
} from './flow/ProfessionalDiagrams';

const TABS = [
  ['big12', 'Big 12'],
  ['oop', 'OOP'],
  ['wora', 'WORA'],
  ['secure', 'Secure'],
  ['runtime', 'JIT & threads'],
  ['impact', 'Real world']
];

export default function JavaFeaturesShowcase() {
  const [tab, setTab] = useState('big12');

  return (
    <div className="java-env-showcase java-features-showcase">
      <p className="java-env-showcase-lead">
        Visual map of the lesson below: the twelve headline features, how OOP and bytecode fit together, security
        verification, the JVM&apos;s hybrid execution model, threads, and where Java shows up in production.
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

      {tab === 'big12' && (
        <div className="java-env-panel">
          <JavaFeaturesTwelveGrid />
          <p className="java-env-caption">
            The article walks these in order — use this grid as a <strong>checklist</strong> while you read. Each cell
            maps to a section in the tutorial below.
          </p>
        </div>
      )}

      {tab === 'oop' && (
        <div className="java-env-panel">
          <OopClassDiagram />
          <p className="java-env-caption">
            <strong>Object-oriented</strong> design groups state (fields) and behavior (methods) in classes. Everything in
            Java lives in a type system built around this idea.
          </p>
        </div>
      )}

      {tab === 'wora' && (
        <div className="java-env-panel">
          <WoraPlatformDiagram />
          <p className="java-env-caption">
            <strong>Platform independent</strong> and <strong>portable</strong>: one bytecode artifact runs anywhere a
            JVM exists — same theme as <strong>architecture-neutral</strong> bytecode in the lesson.
          </p>
        </div>
      )}

      {tab === 'secure' && (
        <div className="java-env-panel">
          <SecurityBytecodeFlowDiagram />
          <p className="java-env-caption">
            <strong>Secure</strong> and <strong>robust</strong>: no raw pointers, bytecode is <strong>verified</strong>{' '}
            before execution, and the runtime enforces rules — pairing with strong typing and automatic{' '}
            <strong>garbage collection</strong> from the article.
          </p>
        </div>
      )}

      {tab === 'runtime' && (
        <div className="java-env-panel">
          <JitHybridDiagram />
          <p className="java-env-caption">
            Feature <strong>12</strong> in the lesson: Java is both <strong>interpreted</strong> (first runs) and{' '}
            <strong>JIT-compiled</strong> (hot paths become native code) for <strong>high performance</strong>.
          </p>
          <div className="java-intro-second-flow">
            <MultithreadForkDiagram />
            <p className="java-env-caption">
              <strong>Multithreaded</strong> programs can run work in parallel — essential for responsive UIs, servers,
              and batch processing, as described below.
            </p>
          </div>
        </div>
      )}

      {tab === 'impact' && (
        <div className="java-env-panel">
          <HorizontalPipeline
            title="Features → real systems (from the article)"
            steps={[
              { title: 'Banking', sub: 'security & robustness' },
              { title: 'Android', sub: 'OOP + threads' },
              { title: 'Enterprise', sub: 'distributed scale' },
              { title: 'Services', sub: 'networked APIs' },
              { title: 'Teams', sub: 'talent & ecosystem' }
            ]}
          />
          <p className="java-env-caption">
            The comparison table and &quot;Real-World Impact&quot; section connect abstract features to concrete domains —
            banks, mobile, and large backends.
          </p>
        </div>
      )}
    </div>
  );
}
