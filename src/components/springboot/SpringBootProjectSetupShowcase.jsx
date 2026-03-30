import { useState } from 'react';
import { SpringHero, SpringWhyGrid, SpringDiagramFrame, SpringCallout } from './SpringBlocks';
import {
  SpringBootStartersDiagram,
  SpringBootBootstrapFlowDiagram,
  SpringBootDeploymentPipelineFlowDiagram,
  HorizontalPipeline
} from '../flow/ProfessionalDiagrams';

const TABS = [
  ['create', 'Create project'],
  ['starters', 'Pick starters'],
  ['bootstrap', 'What startup does'],
  ['package', 'Build artifact'],
  ['run', 'Run locally']
];

const WHY = [
  {
    title: 'start.spring.io',
    text: 'Generate a project with your chosen build tool, Java version, and starters—then open in your IDE.'
  },
  {
    title: 'Structure matters',
    text: 'Keep main package under src/main/java; resources under src/main/resources for application.properties/yml.'
  },
  {
    title: 'Fat JAR by default',
    text: 'spring-boot-maven-plugin builds an executable JAR with dependencies; one artifact to deploy.'
  }
];

export default function SpringBootProjectSetupShowcase() {
  const [tab, setTab] = useState('create');
  return (
    <div className="sb-showcase">
      <SpringHero
        eyebrow="Spring Boot · Basics"
        title="Project setup"
        subtitle="Create a Spring Boot project with the right starters and layout, then run it locally or package it as an executable JAR."
      />
      <SpringWhyGrid items={WHY} />

      <div className="sb-tabs">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" className={`sb-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'create' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="Bootstrap a new project">
            <HorizontalPipeline
              title="From generator to IDE"
              fresherHint={false}
              steps={[
                { title: 'start.spring.io', sub: 'or IDE wizard' },
                { title: 'Group / Artifact', sub: 'coordinates' },
                { title: 'Java + build', sub: 'Maven / Gradle' },
                { title: 'Import project', sub: 'sync deps' },
                { title: 'Run main()', sub: 'first green run' }
              ]}
            />
          </SpringDiagramFrame>
        </div>
      )}

      {tab === 'starters' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="Starter bundles">
            <SpringBootStartersDiagram />
          </SpringDiagramFrame>
          <SpringCallout variant="remember" title="Minimal classpath">
            Add only starters you need—extra libraries increase startup time and attack surface.
          </SpringCallout>
        </div>
      )}

      {tab === 'bootstrap' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="What happens when the app starts">
            <SpringBootBootstrapFlowDiagram />
          </SpringDiagramFrame>
        </div>
      )}

      {tab === 'package' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="Build pipeline">
            <SpringBootDeploymentPipelineFlowDiagram />
          </SpringDiagramFrame>
        </div>
      )}

      {tab === 'run' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="Developer loop">
            <HorizontalPipeline
              title="Local run and debug"
              fresherHint={false}
              steps={[
                { title: 'mvn spring-boot:run', sub: 'or Gradle bootRun' },
                { title: 'DevTools', sub: 'optional reload' },
                { title: 'Attach debugger', sub: 'IDE' },
                { title: 'java -jar', sub: 'same as prod' }
              ]}
            />
          </SpringDiagramFrame>
        </div>
      )}
    </div>
  );
}
