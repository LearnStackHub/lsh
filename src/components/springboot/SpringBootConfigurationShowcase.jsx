import { useState } from 'react';
import { SpringHero, SpringWhyGrid, SpringDiagramFrame, SpringCallout } from './SpringBlocks';
import {
  SpringBootArchitectureStackDiagram,
  SpringBootConfigPrecedenceFlowDiagram,
  HorizontalPipeline
} from '../flow/ProfessionalDiagrams';

const TABS = [
  ['precedence', 'Precedence'],
  ['sources', 'Where values live'],
  ['profiles', 'Profiles'],
  ['beans', 'Java config'],
  ['typesafe', '@ConfigurationProperties']
];

const WHY = [
  {
    title: 'Externalized config',
    text: 'application.properties or application.yml lets you change behavior per environment without recompiling.'
  },
  {
    title: 'Profiles',
    text: 'dev, test, prod profiles swap datasources, logging, and feature flags cleanly.'
  },
  {
    title: '@ConfigurationProperties',
    text: 'Type-safe binding of config prefixes to POJOs—better than scattering @Value everywhere.'
  }
];

export default function SpringBootConfigurationShowcase() {
  const [tab, setTab] = useState('precedence');
  return (
    <div className="sb-showcase">
      <SpringHero
        eyebrow="Spring Boot · Basics"
        title="Configuration"
        subtitle="Spring Boot loads configuration from files, environment variables, and command-line args—with precedence rules and profile support."
      />
      <SpringWhyGrid items={WHY} />

      <div className="sb-tabs">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" className={`sb-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'precedence' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="Which source wins for the same key">
            <SpringBootConfigPrecedenceFlowDiagram />
          </SpringDiagramFrame>
        </div>
      )}

      {tab === 'sources' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="Config flows into the running app">
            <SpringBootArchitectureStackDiagram />
          </SpringDiagramFrame>
          <p className="sb-caption">Merged properties become part of the environment and feed auto-configured beans.</p>
        </div>
      )}

      {tab === 'profiles' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="Activating profiles">
            <HorizontalPipeline
              title="Profile activation paths"
              fresherHint={false}
              steps={[
                { title: 'application-dev.yml', sub: 'file on disk' },
                { title: 'SPRING_PROFILES_ACTIVE', sub: 'env / K8s' },
                { title: '@ActiveProfiles', sub: 'tests' },
                { title: 'spring.profiles.active', sub: 'CLI flag' }
              ]}
            />
          </SpringDiagramFrame>
        </div>
      )}

      {tab === 'beans' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="Java @Configuration">
            <HorizontalPipeline
              title="Replace XML with code"
              fresherHint={false}
              steps={[
                { title: '@Configuration', sub: 'config class' },
                { title: '@Bean methods', sub: 'factory' },
                { title: '@ConditionalOn…', sub: 'auto-config style' },
                { title: 'Constructor inject', sub: 'immutable wiring' }
              ]}
            />
          </SpringDiagramFrame>
          <SpringCallout variant="tip" title="Testing">
            Use <code>@TestConfiguration</code> to override beans in tests without changing main code.
          </SpringCallout>
        </div>
      )}

      {tab === 'typesafe' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="Type-safe binding">
            <HorizontalPipeline
              title="@ConfigurationProperties flow"
              fresherHint={false}
              steps={[
                { title: 'prefix in YAML', sub: 'app.mail.*' },
                { title: 'immutable record / class', sub: 'validated' },
                { title: '@EnableConfigurationProperties', sub: 'register' },
                { title: 'inject bean', sub: 'service ctor' }
              ]}
            />
          </SpringDiagramFrame>
        </div>
      )}
    </div>
  );
}
