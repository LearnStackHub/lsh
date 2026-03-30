import { useState } from 'react';
import { SpringHero, SpringWhyGrid, SpringDiagramFrame, SpringCallout } from './SpringBlocks';
import {
  SpringBootArchitectureStackDiagram,
  SpringBootDeploymentPipelineFlowDiagram,
  SpringBootBootstrapFlowDiagram,
  SpringBootK8sProbeScenarioDiagram,
  HorizontalPipeline
} from '../flow/ProfessionalDiagrams';

const TABS = [
  ['pipeline', 'Build → run'],
  ['stack', 'Runtime stack'],
  ['bootstrap', 'Process startup'],
  ['container', 'Containers'],
  ['cloud', 'Production'],
  ['k8s', 'Real scenario: probes']
];

const WHY = [
  {
    title: 'Fat JAR',
    text: 'spring-boot-maven-plugin repackages dependencies; java -jar runs anywhere with a JRE.'
  },
  {
    title: '12-factor',
    text: 'Config via environment; stateless processes; logs to stdout for orchestrators.'
  },
  {
    title: 'Health checks',
    text: 'Actuator /health integrates with Kubernetes liveness and readiness probes.'
  }
];

export default function SpringBootDeploymentShowcase() {
  const [tab, setTab] = useState('pipeline');
  return (
    <div className="sb-showcase">
      <SpringHero
        eyebrow="Spring Boot · Ops"
        title="Deployment"
        subtitle="Package Spring Boot as an executable JAR, containerize it, and run it on VMs or Kubernetes with health endpoints."
      />
      <SpringWhyGrid items={WHY} />

      <div className="sb-tabs">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" className={`sb-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'pipeline' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="Deployment pipeline flowchart">
            <SpringBootDeploymentPipelineFlowDiagram />
          </SpringDiagramFrame>
        </div>
      )}

      {tab === 'stack' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="What you ship">
            <SpringBootArchitectureStackDiagram />
          </SpringDiagramFrame>
        </div>
      )}

      {tab === 'bootstrap' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="Same startup in every environment">
            <SpringBootBootstrapFlowDiagram />
          </SpringDiagramFrame>
        </div>
      )}

      {tab === 'container' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="Docker image layers">
            <HorizontalPipeline
              title="Container workflow"
              fresherHint={false}
              steps={[
                { title: 'JRE base image', sub: 'eclipse-temurin' },
                { title: 'COPY fat JAR', sub: 'app layer' },
                { title: 'USER non-root', sub: 'security' },
                { title: 'ENTRYPOINT', sub: 'java -jar' },
                { title: 'K8s Deployment', sub: 'replicas + probes' }
              ]}
            />
          </SpringDiagramFrame>
        </div>
      )}

      {tab === 'cloud' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="Production checklist">
            <HorizontalPipeline
              title="Cloud-native hooks"
              fresherHint={false}
              steps={[
                { title: 'graceful shutdown', sub: 'SIGTERM' },
                { title: 'management port', sub: 'separate' },
                { title: 'Micrometer', sub: 'metrics export' },
                { title: 'secrets', sub: 'Vault / CSI' }
              ]}
            />
          </SpringDiagramFrame>
          <SpringCallout variant="watch" title="Memory">
            Tune JVM container flags (-XX:MaxRAMPercentage) for cgroup limits.
          </SpringCallout>
        </div>
      )}

      {tab === 'k8s' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="Why Actuator health matters in Kubernetes">
            <SpringBootK8sProbeScenarioDiagram />
          </SpringDiagramFrame>
        </div>
      )}
    </div>
  );
}
