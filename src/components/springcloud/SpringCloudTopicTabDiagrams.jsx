import React from 'react';

const CLUSTER = {
  fundamentals: { yShift: 0, rx: 12 },
  platform: { yShift: 8, rx: 16 },
  traffic: { yShift: -4, rx: 10 },
  reliability: { yShift: 6, rx: 14 },
  observability: { yShift: 10, rx: 18 },
  security: { yShift: -8, rx: 16 },
  interview: { yShift: -10, rx: 20 }
};

const FALLBACK_THEME = { cluster: 'fundamentals', accent: '#475569', soft: '#eef2f6' };

function hashToInt(input) {
  let h = 0;
  for (let i = 0; i < input.length; i++) h = (h * 31 + input.charCodeAt(i)) >>> 0;
  return h;
}

function StepText({ x, y, step, align = 'start' }) {
  return (
    <>
      <text x={x} y={y} fontSize="11.5" fontWeight="700" fill="#1f2a44" textAnchor={align}>
        {step.title}
      </text>
      <text x={x} y={y + 18} fontSize="10.7" fill="#4a5772" textAnchor={align}>
        {step.sub}
      </text>
    </>
  );
}

function shortText(input, max = 18) {
  const text = (input || '').trim();
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1)}…`;
}

function MechanicsLayout({ title, subtitle, steps, accent, soft, cluster, variant = 0 }) {
  const c = CLUSTER[cluster] || CLUSTER.fundamentals;
  const v = variant % 7;
  const yShift = c.yShift + ((v % 5) - 2);
  const rx = c.rx + (v % 4);
  const xNudge = ((v % 3) - 1) * 6;
  const points = [
    [38 + xNudge, 70 + yShift],
    [236 + xNudge, 70 + yShift],
    [434 + xNudge, 70 + yShift],
    [632 + xNudge, 70 + yShift],
    [38 - xNudge / 2, 198 - yShift],
    [236 - xNudge / 2, 198 - yShift],
    [434 - xNudge / 2, 198 - yShift],
    [632 - xNudge / 2, 198 - yShift]
  ];
  return (
    <svg className="flowchart-pro flowchart-pro-springcloud" viewBox="0 0 806 290" role="img" aria-label={title}>
      <rect x="0" y="0" width="806" height="290" rx="16" fill="#fff" />
      <text x="26" y="24" fontSize="14.5" fontWeight="700" fill="#1f2a44">
        {title}
      </text>
      <text x="26" y="43" fontSize="11.2" fill="#5f6f8f">
        {subtitle}
      </text>
      <g fill="none" stroke={accent} strokeWidth="2" opacity="0.85">
        <path d={`M196 ${102 + (v % 2 === 0 ? 0 : 4)} L236 ${102 + (v % 2 === 0 ? 0 : 4)}`} />
        <path d={`M394 ${102 + (v % 2 === 0 ? 0 : -3)} L434 ${102 + (v % 2 === 0 ? 0 : -3)}`} />
        <path d={`M592 ${102} L632 ${102}`} />
        <path d={`M196 222 L236 222`} />
        <path d={`M394 222 L434 222`} />
        <path d={`M592 222 L632 222`} />
        <path d="M718 102 C758 102,758 222,718 222" />
      </g>
      {steps.map((step, i) => (
        <g key={`${step.title}-${i}`}>
          <rect x={points[i][0]} y={points[i][1]} width="136" height="56" rx={rx} fill={soft} stroke={accent} strokeWidth="1.7" />
          <StepText x={points[i][0] + 10} y={points[i][1] + 20} step={step} />
        </g>
      ))}
    </svg>
  );
}

function ScenarioLayout({ title, subtitle, steps, accent, soft, cluster, variant = 0 }) {
  const c = CLUSTER[cluster] || CLUSTER.fundamentals;
  const v = variant % 7;
  const yShift = c.yShift + ((v % 5) - 2);
  const rx = c.rx + (v % 4);
  const ys = [74, 134, 194, 74, 134, 194, 74, 134].map((y) => y + yShift);
  const xs = [34, 122, 210, 330, 418, 506, 626, 714];
  return (
    <svg className="flowchart-pro flowchart-pro-springcloud" viewBox="0 0 806 290" role="img" aria-label={title}>
      <rect x="0" y="0" width="806" height="290" rx="16" fill="#fff" />
      <text x="26" y="24" fontSize="14.5" fontWeight="700" fill="#1f2a44">
        {title}
      </text>
      <text x="26" y="43" fontSize="11.2" fill="#5f6f8f">
        {subtitle}
      </text>
      <g fill="none" stroke={accent} strokeWidth="2" opacity="0.85">
        <path d={`M100 102 L188 ${162 + (v % 3) * 3} L308 102 L396 ${162 - (v % 2) * 4} L484 222 L604 162 L692 102`} />
      </g>
      {steps.map((step, i) => (
        <g key={`${step.title}-${i}`}>
          <circle cx={xs[i]} cy={ys[i]} r={24 + (v % 3) * 1.5} fill={soft} stroke={accent} strokeWidth="1.8" />
          <text x={xs[i]} y={ys[i] + 4} fontSize="11" fontWeight="700" fill="#1f2a44" textAnchor="middle">
            {i + 1}
          </text>
          <text x={xs[i]} y={ys[i] + 40} fontSize="10.7" fontWeight="700" fill="#1f2a44" textAnchor="middle">
            {step.title}
          </text>
          <text x={xs[i]} y={ys[i] + 54} fontSize="10.2" fill="#4a5772" textAnchor="middle">
            {step.sub}
          </text>
        </g>
      ))}
    </svg>
  );
}

function PitfallsLayout({ title, subtitle, steps, accent, soft, cluster, variant = 0 }) {
  const c = CLUSTER[cluster] || CLUSTER.fundamentals;
  const v = variant % 7;
  const yShift = c.yShift + ((v % 5) - 2);
  const rx = c.rx + (v % 4);
  return (
    <svg className="flowchart-pro flowchart-pro-springcloud" viewBox="0 0 806 290" role="img" aria-label={title}>
      <rect x="0" y="0" width="806" height="290" rx="16" fill="#fff" />
      <text x="26" y="24" fontSize="14.5" fontWeight="700" fill="#1f2a44">
        {title}
      </text>
      <text x="26" y="43" fontSize="11.2" fill="#5f6f8f">
        {subtitle}
      </text>
      <line x1="402" y1="56" x2="402" y2="272" stroke={accent} strokeWidth="2.2" opacity="0.8" />
      {steps.map((step, i) => {
        const left = v % 2 === 0 ? i % 2 === 0 : i % 2 !== 0;
        const row = Math.floor(i / 2);
        const x = left ? 32 : 418;
        const y = 66 + row * 52 + yShift;
        return (
          <g key={`${step.title}-${i}`}>
            <rect x={x} y={y} width="356" height="42" rx={left ? 10 : rx} fill={soft} stroke={accent} strokeWidth="1.7" />
            <StepText x={x + 10} y={y + 17} step={step} />
          </g>
        );
      })}
    </svg>
  );
}

function InterviewLayout({ title, subtitle, steps, accent, soft, cluster, variant = 0 }) {
  const c = CLUSTER[cluster] || CLUSTER.fundamentals;
  const v = variant % 7;
  const yShift = c.yShift + ((v % 3) - 1) * 2;
  const rx = c.rx + (v % 3);
  const rowGap = 44;
  const leftX = 54;
  const rightX = 586;
  const cardW = 166;
  const cardH = 38;
  const startY = 62 + yShift;
  const leftRows = [0, 1, 2, 3].map((i) => startY + i * rowGap);
  const rightRows = [0, 1, 2, 3].map((i) => startY + i * rowGap);
  const leftSteps = steps.slice(0, 4);
  const rightSteps = steps.slice(4, 8);

  const connector = (x1, y1, x2, y2) => {
    const midX = x1 < x2 ? x1 + 90 : x1 - 90;
    return `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`;
  };

  return (
    <svg className="flowchart-pro flowchart-pro-springcloud" viewBox="0 0 806 290" role="img" aria-label={title}>
      <rect x="0" y="0" width="806" height="290" rx="16" fill="#fff" />
      <text x="26" y="24" fontSize="14.5" fontWeight="700" fill="#1f2a44">
        {title}
      </text>
      <text x="26" y="43" fontSize="11.2" fill="#5f6f8f">
        {subtitle}
      </text>
      <circle cx="402" cy="150" r="40" fill={soft} stroke={accent} strokeWidth="2" />
      <text x="402" y="146" fontSize="12" textAnchor="middle" fontWeight="700" fill="#1f2a44">
        Answer
      </text>
      <text x="402" y="162" fontSize="10.3" textAnchor="middle" fill="#4a5772">
        Framing
      </text>
      <g fill="none" stroke={accent} strokeWidth="1.8" opacity="0.75">
        {leftRows.map((y, i) => (
          <path key={`lc-${i}`} d={connector(362, 150, leftX + cardW, y + cardH / 2)} />
        ))}
        {rightRows.map((y, i) => (
          <path key={`rc-${i}`} d={connector(442, 150, rightX, y + cardH / 2)} />
        ))}
      </g>

      {leftSteps.map((step, i) => (
        <g key={`left-${step.title}-${i}`}>
          <rect x={leftX} y={leftRows[i]} width={cardW} height={cardH} rx={rx} fill={soft} stroke={accent} strokeWidth="1.7" />
          <text x={leftX + 10} y={leftRows[i] + 15} fontSize="10.7" fontWeight="700" fill="#1f2a44">
            {shortText(step.title, 23)}
          </text>
          <text x={leftX + 10} y={leftRows[i] + 29} fontSize="10" fill="#4a5772">
            {shortText(step.sub, 25)}
          </text>
        </g>
      ))}

      {rightSteps.map((step, i) => (
        <g key={`right-${step.title}-${i}`}>
          <rect x={rightX} y={rightRows[i]} width={cardW} height={cardH} rx={rx} fill={soft} stroke={accent} strokeWidth="1.7" />
          <text x={rightX + 10} y={rightRows[i] + 15} fontSize="10.7" fontWeight="700" fill="#1f2a44">
            {shortText(step.title, 23)}
          </text>
          <text x={rightX + 10} y={rightRows[i] + 29} fontSize="10" fill="#4a5772">
            {shortText(step.sub, 25)}
          </text>
        </g>
      ))}
    </svg>
  );
}

const THEME_BY_TOPIC_ID = {
  'spring-cloud-microservices-project': { cluster: 'platform', accent: '#2563eb', soft: '#ebf2ff' },
  'microservices-architecture-fundamentals': { cluster: 'fundamentals', accent: '#7c3aed', soft: '#f4ecff' },
  'spring-cloud-config-server': { cluster: 'platform', accent: '#0d9488', soft: '#e8fffb' },
  'spring-cloud-eureka': { cluster: 'traffic', accent: '#0284c7', soft: '#e8f7ff' },
  'spring-cloud-api-gateway': { cluster: 'traffic', accent: '#c2410c', soft: '#fff4ea' },
  'spring-cloud-load-balancing': { cluster: 'traffic', accent: '#047857', soft: '#eafcf6' },
  'spring-cloud-openfeign': { cluster: 'traffic', accent: '#7c2d12', soft: '#fff1ea' },
  'spring-cloud-resilience4j': { cluster: 'reliability', accent: '#be185d', soft: '#ffeaf3' },
  'spring-cloud-distributed-tracing': { cluster: 'observability', accent: '#475569', soft: '#eef2f6' },
  'spring-cloud-security': { cluster: 'security', accent: '#6d28d9', soft: '#f3edff' },
  'spring-cloud-elk': { cluster: 'observability', accent: '#4338ca', soft: '#eff0ff' },
  'spring-cloud-microservices': { cluster: 'platform', accent: '#2563eb', soft: '#ebf2ff' },
  'microservices-mcq': { cluster: 'fundamentals', accent: '#7c3aed', soft: '#f4ecff' },
  'microservices-interview-questions': { cluster: 'interview', accent: '#6d28d9', soft: '#f3edff' }
};

function padSteps(steps, fill) {
  const out = [...steps];
  while (out.length < 8) out.push(fill);
  return out.slice(0, 8);
}

function getThemeForTopicId(topicId) {
  return THEME_BY_TOPIC_ID[topicId] ?? FALLBACK_THEME;
}

export function SpringCloudMechanicsTabDiagram({ topicId, title, subtitle, steps }) {
  const theme = getThemeForTopicId(topicId);
  const variant = hashToInt(topicId) % 13;
  return (
    <MechanicsLayout
      title={title}
      subtitle={subtitle}
      steps={padSteps(steps, { title: 'Runtime', sub: '' })}
      accent={theme.accent}
      soft={theme.soft}
      cluster={theme.cluster}
      variant={variant}
    />
  );
}

export function SpringCloudScenarioTabDiagram({ topicId, title, subtitle, steps }) {
  const theme = getThemeForTopicId(topicId);
  const variant = hashToInt(topicId + ':scenario') % 13;
  return (
    <ScenarioLayout
      title={title}
      subtitle={subtitle}
      steps={padSteps(steps, { title: 'Result', sub: '' })}
      accent={theme.accent}
      soft={theme.soft}
      cluster={theme.cluster}
      variant={variant}
    />
  );
}

export function SpringCloudPitfallsTabDiagram({ topicId, title, subtitle, steps }) {
  const theme = getThemeForTopicId(topicId);
  const variant = hashToInt(topicId + ':pitfalls') % 13;
  return (
    <PitfallsLayout
      title={title}
      subtitle={subtitle}
      steps={padSteps(steps, { title: 'Guardrail', sub: '' })}
      accent={theme.accent}
      soft={theme.soft}
      cluster={theme.cluster}
      variant={variant}
    />
  );
}

export function SpringCloudInterviewTabDiagram({ topicId, title, subtitle, steps }) {
  const theme = getThemeForTopicId(topicId);
  const variant = hashToInt(topicId + ':interview') % 13;
  return (
    <InterviewLayout
      title={title}
      subtitle={subtitle}
      steps={padSteps(steps, { title: 'Trade-off', sub: '' })}
      accent={theme.accent}
      soft={theme.soft}
      cluster={theme.cluster}
      variant={variant}
    />
  );
}

