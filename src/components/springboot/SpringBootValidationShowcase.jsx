import { useState } from 'react';
import { SpringHero, SpringWhyGrid, SpringDiagramFrame, SpringCallout } from './SpringBlocks';
import {
  SpringBootValidationDecisionFlowDiagram,
  SpringBootWebRequestFlowDiagram,
  HorizontalPipeline
} from '../flow/ProfessionalDiagrams';

const TABS = [
  ['decision', 'Valid vs invalid'],
  ['mvc', 'Where it runs in MVC'],
  ['bean', 'Annotations'],
  ['rest', 'REST binding'],
  ['custom', 'Custom constraints']
];

const WHY = [
  {
    title: 'Bean Validation (JSR 380)',
    text: 'Annotations like @NotNull, @Size, @Email on DTOs—Hibernate Validator runs them when you use @Valid.'
  },
  {
    title: 'Early rejection',
    text: 'Invalid input stops at the controller layer with 400 and field errors instead of corrupting domain logic.'
  },
  {
    title: 'Custom validators',
    text: 'Implement ConstraintValidator for cross-field or database-backed checks.'
  }
];

export default function SpringBootValidationShowcase() {
  const [tab, setTab] = useState('decision');
  return (
    <div className="sb-showcase">
      <SpringHero
        eyebrow="Spring Boot · REST"
        title="Validation"
        subtitle="Validate request bodies and parameters with Bean Validation, @Valid, and BindingResult—return clear 400 responses."
      />
      <SpringWhyGrid items={WHY} />

      <div className="sb-tabs">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" className={`sb-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'decision' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="Decision flowchart">
            <SpringBootValidationDecisionFlowDiagram />
          </SpringDiagramFrame>
        </div>
      )}

      {tab === 'mvc' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="Validation sits before your handler logic">
            <SpringBootWebRequestFlowDiagram />
          </SpringDiagramFrame>
          <p className="sb-caption">Binding + validation happen at the controller boundary, before <code>@Service</code> is called.</p>
        </div>
      )}

      {tab === 'bean' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="Annotate the DTO">
            <HorizontalPipeline
              title="Constraint annotations"
              fresherHint={false}
              steps={[
                { title: '@NotNull', sub: 'required' },
                { title: '@Size', sub: 'length' },
                { title: '@Email', sub: 'format' },
                { title: '@Pattern', sub: 'regex' },
                { title: 'groups', sub: 'create vs update' }
              ]}
            />
          </SpringDiagramFrame>
        </div>
      )}

      {tab === 'rest' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="Controller triggers validation">
            <HorizontalPipeline
              title="REST binding"
              fresherHint={false}
              steps={[
                { title: '@RequestBody', sub: 'JSON → DTO' },
                { title: '@Valid', sub: 'on parameter' },
                { title: 'MethodArgumentNotValidException', sub: 'if invalid' },
                { title: '@ControllerAdvice', sub: 'shape 400 body' }
              ]}
            />
          </SpringDiagramFrame>
        </div>
      )}

      {tab === 'custom' && (
        <div className="sb-panel">
          <SpringDiagramFrame label="Custom validation">
            <HorizontalPipeline
              title="Beyond built-ins"
              fresherHint={false}
              steps={[
                { title: '@Constraint', sub: 'annotation' },
                { title: 'ConstraintValidator', sub: 'isValid()' },
                { title: 'inject beans', sub: 'optional' },
                { title: 'reuse', sub: 'multiple DTOs' }
              ]}
            />
          </SpringDiagramFrame>
          <SpringCallout variant="tip" title="Groups">
            Use validation groups when create vs update rules differ on the same DTO.
          </SpringCallout>
        </div>
      )}
    </div>
  );
}
