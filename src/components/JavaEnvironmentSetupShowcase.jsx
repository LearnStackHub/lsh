import { useState } from 'react';
import {
  HorizontalPipeline,
  JdkStackDiagram,
  CompileRunPipeline,
  WindowsPathFlow
} from './flow/ProfessionalDiagrams';

const TABS = [
  ['roadmap', 'Setup roadmap'],
  ['jdk', 'JDK stack'],
  ['compile', 'Compile & run'],
  ['path', 'Windows PATH'],
  ['check', 'Verify checklist']
];

export default function JavaEnvironmentSetupShowcase() {
  const [tab, setTab] = useState('roadmap');

  return (
    <div className="java-env-showcase">
      <p className="java-env-showcase-lead">
        Interactive overview: follow the same order as the tutorial below — download JDK, configure PATH (Windows),
        verify in the terminal, add an IDE, then run your first program.
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

      {tab === 'roadmap' && (
        <div className="java-env-panel">
          <HorizontalPipeline
            title="One-time setup path (about 10–15 minutes)"
            steps={[
              { title: 'Download JDK', sub: 'e.g. Adoptium LTS' },
              { title: 'Install', sub: 'MSI / pkg / apt' },
              { title: 'PATH (Win)', sub: 'JAVA_HOME + bin' },
              { title: 'Verify', sub: 'java -version' },
              { title: 'IDE', sub: 'IntelliJ / VS Code' },
              { title: 'Hello World', sub: 'javac & java' }
            ]}
          />
        </div>
      )}

      {tab === 'jdk' && (
        <div className="java-env-panel">
          <JdkStackDiagram />
          <p className="java-env-caption">
            As a developer you install the <strong>JDK</strong>. The JRE and JVM are included — you do not install them separately.
          </p>
        </div>
      )}

      {tab === 'compile' && (
        <div className="java-env-panel">
          <CompileRunPipeline />
          <p className="java-env-caption">
            Java is compiled to bytecode (<code>.class</code>), then the <strong>JVM</strong> runs that bytecode on any OS.
          </p>
        </div>
      )}

      {tab === 'path' && (
        <div className="java-env-panel">
          <WindowsPathFlow />
          <p className="java-env-caption">
            On <strong>macOS</strong> and <strong>Linux</strong> the JDK installer usually configures this for you. On{' '}
            <strong>Windows</strong>, add <code>...\jdk-xx\bin</code> to PATH and set <code>JAVA_HOME</code>.
          </p>
        </div>
      )}

      {tab === 'check' && (
        <div className="java-env-panel java-env-checklist">
          <ul>
            <li>
              <code>java -version</code> and <code>javac -version</code> show the same major version (e.g. 17 or 21).
            </li>
            <li>
              New terminal window after changing environment variables (Windows).
            </li>
            <li>
              <code>JAVA_HOME</code> points to the JDK folder (not the <code>bin</code> folder itself).
            </li>
            <li>
              File name matches public class name: <code>HelloWorld.java</code> → <code>public class HelloWorld</code>.
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
