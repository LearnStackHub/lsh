import { useState } from 'react';
import { SpringFrameworkHero, SpringFrameworkWhyGrid, SpringFrameworkDiagramFrame, SpringFrameworkCallout } from './SpringFrameworkBlocks';
import {
  SpringFrameworkPointcutExpressionsDiagram,
  SpringFrameworkAdviceTypesDiagram,
  SpringFrameworkAopProxyDiagram,
  HorizontalPipeline
} from '../flow/ProfessionalDiagrams';

const TABS = [
  ['idea', 'Custom marker'],
  ['pointcut', '@annotation'],
  ['advice', 'Advice choice'],
  ['proxy', 'Invocation path']
];

const WHY = [
  { title: 'Declarative', text: 'Mark methods with @Audited or @Retry; aspects pick them up via annotations.' },
  { title: 'Reuse', text: 'One aspect implements behavior for many annotated methods.' },
  { title: 'Documentation', text: 'Annotations document intent at the call site.' }
];

export default function SpringFrameworkAOPCustomAnnotationsShowcase() {
  const [tab, setTab] = useState('idea');
  return (
    <div className="sf-showcase">
      <SpringFrameworkHero
        eyebrow="Spring Framework · AOP"
        title="Custom annotation aspects"
        subtitle="Define your own annotations and bind aspects with @annotation pointcuts for clean, reusable policy."
      />
      <SpringFrameworkWhyGrid items={WHY} />
      <div className="sf-tabs">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" className={`sf-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>
      {tab === 'idea' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="Annotation drives pointcut">
            <HorizontalPipeline
              title="Design steps"
              fresherHint={false}
              steps={[
                { title: '@interface', sub: 'runtime retention' },
                { title: 'annotate methods', sub: 'domain' },
                { title: '@Aspect bean', sub: 'advice' },
                { title: '@annotation', sub: 'pointcut' }
              ]}
            />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'pointcut' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="Match your annotation">
            <SpringFrameworkPointcutExpressionsDiagram />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'advice' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="Pick advice type">
            <SpringFrameworkAdviceTypesDiagram />
          </SpringFrameworkDiagramFrame>
        </div>
      )}
      {tab === 'proxy' && (
        <div className="sf-panel">
          <SpringFrameworkDiagramFrame label="Aspect runs on the proxy path">
            <SpringFrameworkAopProxyDiagram />
          </SpringFrameworkDiagramFrame>
          <SpringFrameworkCallout variant="tip" title="Retention">
            Use <code>@Retention(RetentionPolicy.RUNTIME)</code> so Spring can see your annotation.
          </SpringFrameworkCallout>
        </div>
      )}
    </div>
  );
}
