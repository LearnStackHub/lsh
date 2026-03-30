import { useState } from 'react';
import { SpringHero, SpringWhyGrid, SpringDiagramFrame, SpringCallout } from './SpringBlocks';
import {
  SpringBootMailFlowDiagram,
  SpringBootDeploymentPipelineFlowDiagram,
  SpringBootEventAsyncEmailScenarioDiagram,
  HorizontalPipeline
} from '../flow/ProfessionalDiagrams';

const TABS = [
  ['flow', 'Mail path'],
  ['config', 'JavaMail config'],
  ['async', 'Async / retry'],
  ['templates', 'HTML templates'],
  ['deploy', 'Ship with app'],
  ['event', 'Real scenario: events']
];

const WHY = [
  {
    title: 'spring-boot-starter-mail',
    text: 'Auto-configures JavaMailSender from smtp host, port, and credentials in application properties.'
  },
  {
    title: 'Transactional outbox',
    text: 'For reliability, pair email with DB transactions or a message queue—avoid fire-and-forget only for low stakes.'
  },
  {
    title: 'Thymeleaf / FreeMarker',
    text: 'Render HTML bodies from templates; keep branding and i18n in one place.'
  }
];

export default function SpringBootSMTPShowcase() {
  const [tab, setTab] = useState('flow');
  return (
    <div className="sb-showcase">
      <SpringHero
        eyebrow="Spring Boot · Integration"
        title="Email (SMTP)"
        subtitle="Send mail with JavaMailSender, configure SMTP via properties, and optionally queue or template messages."
      />
      <SpringWhyGrid items={WHY} />

      <div className="sb-tabs">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" className={`sb-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'flow' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="End-to-end mail flow">
            <SpringBootMailFlowDiagram />
          </SpringDiagramFrame>
        </div>
      )}

      {tab === 'config' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="Properties drive JavaMailSender">
            <HorizontalPipeline
              title="Mail sender setup"
              fresherHint={false}
              steps={[
                { title: 'starter-mail', sub: 'dependency' },
                { title: 'spring.mail.*', sub: 'host port auth' },
                { title: 'JavaMailSender', sub: 'autowired' },
                { title: 'MimeMessage', sub: 'build + send' }
              ]}
            />
          </SpringDiagramFrame>
        </div>
      )}

      {tab === 'async' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="Resilience patterns">
            <HorizontalPipeline
              title="Async options"
              fresherHint={false}
              steps={[
                { title: '@Async', sub: 'executor' },
                { title: 'Spring Retry', sub: 'backoff' },
                { title: 'queue', sub: 'broker' },
                { title: 'DLQ', sub: 'failed mail' }
              ]}
            />
          </SpringDiagramFrame>
        </div>
      )}

      {tab === 'templates' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="Templated email">
            <HorizontalPipeline
              title="HTML body"
              fresherHint={false}
              steps={[
                { title: 'template engine', sub: 'Thymeleaf' },
                { title: 'Context', sub: 'variables' },
                { title: 'process', sub: 'String HTML' },
                { title: 'MimeMessageHelper', sub: 'HTML + inline' }
              ]}
            />
          </SpringDiagramFrame>
          <SpringCallout variant="tip" title="Secrets">
            Store SMTP passwords in env vars or a secret manager—not in source control.
          </SpringCallout>
        </div>
      )}

      {tab === 'deploy' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="Mail-enabled app in production">
            <SpringBootDeploymentPipelineFlowDiagram />
          </SpringDiagramFrame>
        </div>
      )}

      {tab === 'event' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="Registration → event → async welcome email (typical pattern)">
            <SpringBootEventAsyncEmailScenarioDiagram />
          </SpringDiagramFrame>
        </div>
      )}
    </div>
  );
}
