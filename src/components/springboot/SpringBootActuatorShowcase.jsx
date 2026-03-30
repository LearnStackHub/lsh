import { useState } from 'react';
import { SpringHero, SpringWhyGrid, SpringDiagramFrame, SpringCallout } from './SpringBlocks';
import {
  SpringBootActuatorDiagram,
  SpringBootConfigPrecedenceFlowDiagram,
  SpringBootDeploymentPipelineFlowDiagram,
  SpringBootK8sProbeScenarioDiagram,
  HorizontalPipeline
} from '../flow/ProfessionalDiagrams';

const TABS = [
  ['endpoints', 'HTTP endpoints'],
  ['metrics', 'Metrics path'],
  ['security', 'Secure actuator'],
  ['config', 'management.*'],
  ['deploy', 'Ship & observe'],
  ['k8s', 'Real scenario: K8s probes']
];

const WHY = [
  {
    title: 'Production insight',
    text: 'Health, metrics, and info endpoints help operators know if the app is alive and performing.'
  },
  {
    title: 'spring-boot-starter-actuator',
    text: 'Adds Actuator with sensible defaults; expose only what you need over HTTP or JMX.'
  },
  {
    title: 'Micrometer',
    text: 'Bridges to Prometheus, Datadog, and more—same metrics API across apps.'
  }
];

export default function SpringBootActuatorShowcase() {
  const [tab, setTab] = useState('endpoints');
  return (
    <div className="sb-showcase">
      <SpringHero
        eyebrow="Spring Boot · Ops"
        title="Actuator"
        subtitle="Expose operational endpoints for health checks, application info, and metrics—then lock them down in production."
      />
      <SpringWhyGrid items={WHY} />

      <div className="sb-tabs">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" className={`sb-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'endpoints' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="Common paths">
            <SpringBootActuatorDiagram />
          </SpringDiagramFrame>
        </div>
      )}

      {tab === 'metrics' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="From app to dashboards">
            <HorizontalPipeline
              title="Metrics pipeline"
              fresherHint={false}
              steps={[
                { title: 'Micrometer', sub: 'registry' },
                { title: '/actuator/prometheus', sub: 'scrape' },
                { title: 'Prometheus', sub: 'TSDB' },
                { title: 'Grafana', sub: 'dashboards' },
                { title: 'Alerts', sub: 'SLO burn' }
              ]}
            />
          </SpringDiagramFrame>
        </div>
      )}

      {tab === 'security' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="Hardening checklist">
            <HorizontalPipeline
              title="Production posture"
              fresherHint={false}
              steps={[
                { title: 'management port', sub: 'internal only' },
                { title: 'Spring Security', sub: 'roles' },
                { title: 'disable env', sub: 'sensitive' },
                { title: 'network policy', sub: 'cluster' }
              ]}
            />
          </SpringDiagramFrame>
        </div>
      )}

      {tab === 'config' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="management.* vs server.*">
            <SpringBootConfigPrecedenceFlowDiagram />
          </SpringDiagramFrame>
          <p className="sb-caption">Use a separate management port or path so metrics do not sit on the public API port.</p>
        </div>
      )}

      {tab === 'deploy' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="Observable artifact">
            <SpringBootDeploymentPipelineFlowDiagram />
          </SpringDiagramFrame>
          <SpringCallout variant="tip" title="Health">
            Custom <code>HealthIndicator</code> beans report dependency status (DB, queue) for readiness probes.
          </SpringCallout>
        </div>
      )}

      {tab === 'k8s' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="kubelet → Actuator → dependencies">
            <SpringBootK8sProbeScenarioDiagram />
          </SpringDiagramFrame>
        </div>
      )}
    </div>
  );
}
