import { useState } from 'react';
import {
  WoraPlatformDiagram,
  JavaExecutionVerticalFlow,
  JdkStackDiagram,
  HorizontalPipeline,
  CompileRunPipeline
} from './flow/ProfessionalDiagrams';

const TABS = [
  ['wora', 'WORA'],
  ['execute', 'Execution flow'],
  ['stack', 'JDK / JRE / JVM'],
  ['why', 'Why Java']
];

export default function JavaIntroductionShowcase() {
  const [tab, setTab] = useState('wora');

  return (
    <div className="java-env-showcase java-intro-showcase">
      <p className="java-env-showcase-lead">
        Interactive overview of the ideas in this lesson: platform independence, how source becomes running code,
        how JDK wraps JRE and JVM, and where Java is used in the industry.
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

      {tab === 'wora' && (
        <div className="java-env-panel">
          <WoraPlatformDiagram />
          <p className="java-env-caption">
            You compile once to <strong>bytecode</strong>. Each platform ships its own <strong>JVM</strong> that runs
            that same bytecode — that is the &quot;Write Once, Run Anywhere&quot; idea from the lesson below.
          </p>
        </div>
      )}

      {tab === 'execute' && (
        <div className="java-env-panel">
          <JavaExecutionVerticalFlow />
          <p className="java-env-caption">
            This matches the <strong>compilation and execution</strong> section: source is compiled to bytecode, the{' '}
            <strong>JVM</strong> loads it, the <strong>JIT</strong> optimizes hot paths to native code, then your program
            runs on the current operating system.
          </p>
          <div className="java-intro-second-flow">
            <CompileRunPipeline />
            <p className="java-env-caption">
              Short form of the same story: <code>.java</code> → <code>javac</code> → <code>.class</code> →{' '}
              <strong>JVM</strong> → output.
            </p>
          </div>
        </div>
      )}

      {tab === 'stack' && (
        <div className="java-env-panel">
          <JdkStackDiagram />
          <p className="java-env-caption">
            <strong>JVM</strong> runs bytecode; <strong>JRE</strong> is JVM plus libraries (enough to run apps);{' '}
            <strong>JDK</strong> is JRE plus <code>javac</code> and dev tools. To learn and build, install a{' '}
            <strong>JDK</strong>.
          </p>
        </div>
      )}

      {tab === 'why' && (
        <div className="java-env-panel">
          <HorizontalPipeline
            title="Where Java shows up (high level)"
            steps={[
              { title: 'Enterprise', sub: 'banks, ERP, CRM' },
              { title: 'Backend', sub: 'services & APIs' },
              { title: 'Android', sub: 'SDK & apps' },
              { title: 'Big tech', sub: 'infra at scale' },
              { title: 'Careers', sub: 'strong job demand' }
            ]}
          />
          <p className="java-env-caption">
            The article below goes deeper on history, features, and your first program — use this tab as a quick map of
            why Java still matters for jobs and real systems.
          </p>
        </div>
      )}
    </div>
  );
}
