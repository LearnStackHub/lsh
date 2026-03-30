import { useState } from 'react';
import { MySQLHero, MySQLWhyGrid, MySQLDiagramFrame, MySQLCallout } from './MySQLShowcaseBlocks';
import {
  MySQLWindowsInstallerDeepScenarioDiagram,
  MySQLWorkbenchVsServerScenarioDiagram,
  MySQLInstallationAndStartScenarioDiagram,
  HorizontalPipeline
} from '../flow/ProfessionalDiagrams';

const TABS = [
  ['deep', 'Deep installer (Windows)'],
  ['workbench', 'Workbench vs Server'],
  ['summary', 'Lifecycle summary'],
  ['verify', 'Verify install']
];

const WHY = [
  {
    title: 'Two products',
    text: 'MySQL Server (mysqld) stores data. MySQL Workbench is an optional GUI client. You can install one without the other.'
  },
  {
    title: 'Wizard order',
    text: 'Files are copied first, then the configuration wizard initializes the data directory, sets the root password, and registers the Windows Service (on Windows).'
  },
  {
    title: 'Connection errors',
    text: '“Cannot connect” almost always means the server is stopped, wrong port, or bad credentials — not a missing Workbench reinstall.'
  },
  {
    title: 'Other platforms',
    text: 'Linux uses apt/yum and systemd; macOS often Homebrew; Docker runs mysqld in a container. Same server protocol everywhere.'
  }
];

export default function MySQLInstallationShowcase() {
  const [tab, setTab] = useState('deep');
  return (
    <div className="mysql-showcase">
      <MySQLHero
        eyebrow="MySQL · Installation"
        title="Install MySQL correctly — server first, tools second"
        subtitle="These diagrams separate the database engine from GUI tools, walk through the real Windows installer phases, and show how to verify a good setup. Use them together with the article below."
      />
      <MySQLWhyGrid items={WHY} />
      <MySQLCallout variant="remember" title="Fixing common confusion">
        MySQL Workbench does not install or replace the MySQL Server. If Workbench cannot connect, start by confirming the MySQL Windows service (or <code>systemctl status mysql</code>) and that port 3306 is listening — then test with <code>mysql -u root -p</code> in a terminal.
      </MySQLCallout>
      <div className="mysql-tabs">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" className={`mysql-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>
      {tab === 'deep' && (
        <div className="mysql-panel">
          <MySQLDiagramFrame label="Phase-by-phase: Community Installer on Windows">
            <MySQLWindowsInstallerDeepScenarioDiagram />
          </MySQLDiagramFrame>
        </div>
      )}
      {tab === 'workbench' && (
        <div className="mysql-panel">
          <MySQLDiagramFrame label="Workbench is a client; mysqld is the database">
            <MySQLWorkbenchVsServerScenarioDiagram />
          </MySQLDiagramFrame>
        </div>
      )}
      {tab === 'summary' && (
        <div className="mysql-panel">
          <MySQLDiagramFrame label="Short path: install → init → configure → run">
            <MySQLInstallationAndStartScenarioDiagram />
          </MySQLDiagramFrame>
        </div>
      )}
      {tab === 'verify' && (
        <div className="mysql-panel">
          <MySQLDiagramFrame label="After install, prove it works">
            <HorizontalPipeline
              title="Verification checklist"
              fresherHint={false}
              steps={[
                { title: 'Service up', sub: 'Services.msc / systemctl' },
                { title: 'CLI login', sub: 'mysql -u root -p' },
                { title: 'VERSION()', sub: 'server build' },
                { title: 'SHOW DATABASES', sub: 'system schemas' },
                { title: 'Create DB', sub: 'CREATE DATABASE' },
                { title: 'Workbench', sub: 'TCP 127.0.0.1:3306' }
              ]}
            />
          </MySQLDiagramFrame>
        </div>
      )}
    </div>
  );
}
