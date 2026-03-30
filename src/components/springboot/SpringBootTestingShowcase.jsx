import { useState } from 'react';
import { SpringHero, SpringWhyGrid, SpringDiagramFrame, SpringCallout } from './SpringBlocks';
import {
  SpringBootTestPyramidFlowDiagram,
  SpringBootTransactionalFlowDiagram,
  SpringBootScheduledJobScenarioDiagram,
  HorizontalPipeline
} from '../flow/ProfessionalDiagrams';

const TABS = [
  ['pyramid', 'Test pyramid'],
  ['slice', 'Slice tests'],
  ['mvc', 'MockMvc'],
  ['integration', 'Full context'],
  ['data', 'Data + transactions'],
  ['batch', 'Real scenario: @Scheduled']
];

const WHY = [
  {
    title: '@SpringBootTest',
    text: 'Loads the full application context—use for integration tests; pair with Testcontainers for real databases.'
  },
  {
    title: '@WebMvcTest',
    text: 'Slices web layer only—fast controller tests with MockMvc without starting the whole stack.'
  },
  {
    title: '@DataJpaTest',
    text: 'JPA slice with in-memory or Testcontainers DB—repository-focused tests without full Boot startup cost when tuned.'
  }
];

export default function SpringBootTestingShowcase() {
  const [tab, setTab] = useState('pyramid');
  return (
    <div className="sb-showcase">
      <SpringHero
        eyebrow="Spring Boot · Quality"
        title="Testing"
        subtitle="Test Spring Boot apps at the right slice: unit tests, @WebMvcTest, @DataJpaTest, and full @SpringBootTest integration."
      />
      <SpringWhyGrid items={WHY} />

      <div className="sb-tabs">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" className={`sb-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'pyramid' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="How many of each kind">
            <SpringBootTestPyramidFlowDiagram />
          </SpringDiagramFrame>
        </div>
      )}

      {tab === 'slice' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="Choose the right slice">
            <HorizontalPipeline
              title="Test types"
              fresherHint={false}
              steps={[
                { title: 'unit', sub: 'pure logic' },
                { title: '@WebMvcTest', sub: 'controllers' },
                { title: '@DataJpaTest', sub: 'repos' },
                { title: '@JsonTest', sub: 'JSON mapping' },
                { title: '@SpringBootTest', sub: 'full stack' }
              ]}
            />
          </SpringDiagramFrame>
        </div>
      )}

      {tab === 'mvc' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="HTTP without starting Tomcat">
            <HorizontalPipeline
              title="MockMvc flow"
              fresherHint={false}
              steps={[
                { title: '@WebMvcTest', sub: 'Controller only' },
                { title: 'MockMvc', sub: 'perform(get…)' },
                { title: '@MockBean', sub: 'stub deps' },
                { title: 'jsonPath', sub: 'assert body' }
              ]}
            />
          </SpringDiagramFrame>
        </div>
      )}

      {tab === 'integration' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="Boot the world">
            <HorizontalPipeline
              title="Integration test"
              fresherHint={false}
              steps={[
                { title: '@SpringBootTest', sub: 'random port' },
                { title: 'TestRestTemplate', sub: 'real HTTP' },
                { title: 'Testcontainers', sub: 'real DB' },
                { title: '@Transactional', sub: 'rollback test data' }
              ]}
            />
          </SpringDiagramFrame>
          <SpringCallout variant="tip" title="Speed">
            Prefer slices for CI speed; reserve heavy integration for critical paths.
          </SpringCallout>
        </div>
      )}

      {tab === 'data' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="Transactions in tests">
            <SpringBootTransactionalFlowDiagram />
          </SpringDiagramFrame>
          <p className="sb-caption">Integration tests often rely on rollback so the database stays clean between tests.</p>
        </div>
      )}

      {tab === 'batch' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="Scheduled jobs in production (often tested separately from HTTP)">
            <SpringBootScheduledJobScenarioDiagram />
          </SpringDiagramFrame>
        </div>
      )}
    </div>
  );
}
