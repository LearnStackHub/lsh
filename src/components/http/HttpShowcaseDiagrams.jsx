import { useId } from 'react';

function SvgDefs({ idPrefix, color = '#2563eb' }) {
  return (
    <defs>
      <linearGradient id={`${idPrefix}-card`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#eff6ff" />
        <stop offset="100%" stopColor="#dbeafe" />
      </linearGradient>
      <linearGradient id={`${idPrefix}-warn`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#fee2e2" />
        <stop offset="100%" stopColor="#fecaca" />
      </linearGradient>
      <filter id={`${idPrefix}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#0f172a" floodOpacity="0.16" />
      </filter>
      <marker id={`${idPrefix}-arrow`} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
        <path d="M0,0 L8,4 L0,8 Z" fill={color} />
      </marker>
    </defs>
  );
}

function titleText(value, max = 30) {
  if (!value) return '';
  return value.length > max ? `${value.slice(0, max - 1)}…` : value;
}

function subText(value, max = 42) {
  if (!value) return '';
  return value.length > max ? `${value.slice(0, max - 1)}…` : value;
}

function ChartFrame({ title, subtitle, children, label }) {
  return (
    <figure className="flowchart-pro" role="img" aria-label={label || title}>
      <figcaption className="flowchart-pro-title" style={{ marginBottom: 6 }}>{title}</figcaption>
      {subtitle ? <p className="flowchart-pro-fresher" style={{ marginTop: 0 }}>{subtitle}</p> : null}
      {children}
    </figure>
  );
}

export function HttpNarrativeFlowDiagram({ title, subtitle, steps = [] }) {
  const id = useId().replace(/:/g, '');
  const safe = steps.slice(0, 4);
  return (
    <ChartFrame title={title} subtitle={subtitle} label={title}>
      <svg viewBox="0 0 860 210" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <SvgDefs idPrefix={id} />
        {safe.map((s, i) => {
          const x = 24 + i * 206;
          return (
            <g key={`${s.title}-${i}`}>
              <rect x={x} y="52" width="186" height="116" rx="12" fill={`url(#${id}-card)`} stroke="#2563eb" strokeWidth="1.5" filter={`url(#${id}-shadow)`} />
              <circle cx={x + 22} cy="74" r="13" fill="#1d4ed8" />
              <text x={x + 22} y="79" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">{i + 1}</text>
              <text x={x + 42} y="79" fontSize="11" fontWeight="700" fill="#1e3a8a">{titleText(s.title)}</text>
              <text x={x + 14} y="104" fontSize="10" fill="#0f172a">{subText(s.sub)}</text>
              {i < safe.length - 1 && (
                <line x1={x + 186} y1="110" x2={x + 202} y2="110" stroke="#2563eb" strokeWidth="2.2" markerEnd={`url(#${id}-arrow)`} />
              )}
            </g>
          );
        })}
      </svg>
    </ChartFrame>
  );
}

export function HttpMechanicsFlowDiagram({ title, subtitle, steps = [] }) {
  const id = useId().replace(/:/g, '');
  const safe = steps.slice(0, 4);
  const pos = [
    { x: 44, y: 44 },
    { x: 448, y: 44 },
    { x: 448, y: 152 },
    { x: 44, y: 152 }
  ];
  return (
    <ChartFrame title={title} subtitle={subtitle} label={title}>
      <svg viewBox="0 0 860 295" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <SvgDefs idPrefix={id} />
        {safe.map((s, i) => {
          const p = pos[i];
          if (!p) return null;
          const next = pos[i + 1];
          return (
            <g key={`${s.title}-${i}`}>
              <rect x={p.x} y={p.y} width="368" height="84" rx="12" fill={`url(#${id}-card)`} stroke="#0ea5e9" strokeWidth="1.5" filter={`url(#${id}-shadow)`} />
              <text x={p.x + 16} y={p.y + 28} fontSize="11.2" fontWeight="700" fill="#075985">{`${i + 1}. ${titleText(s.title, 36)}`}</text>
              <text x={p.x + 16} y={p.y + 50} fontSize="10" fill="#0f172a">{subText(s.sub, 54)}</text>
              {next && (
                <path
                  d={`M ${p.x + 368} ${p.y + 42} C ${p.x + 400} ${p.y + 42}, ${next.x - 32} ${next.y + 42}, ${next.x} ${next.y + 42}`}
                  fill="none"
                  stroke="#0284c7"
                  strokeWidth="2.2"
                  markerEnd={`url(#${id}-arrow)`}
                />
              )}
            </g>
          );
        })}
      </svg>
    </ChartFrame>
  );
}

export function HttpScenarioFlowDiagram({ title, subtitle, steps = [] }) {
  const id = useId().replace(/:/g, '');
  const safe = steps.slice(0, 4);
  return (
    <ChartFrame title={title} subtitle={subtitle} label={title}>
      <svg viewBox="0 0 860 260" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <SvgDefs idPrefix={id} color="#0891b2" />
        <line x1="80" y1="44" x2="80" y2="220" stroke="#67e8f9" strokeWidth="3" />
        {safe.map((s, i) => {
          const y = 44 + i * 44;
          const x = i % 2 === 0 ? 120 : 430;
          return (
            <g key={`${s.title}-${i}`}>
              <circle cx="80" cy={y + 18} r="8" fill="#06b6d4" />
              <rect x={x} y={y} width="300" height="36" rx="10" fill="#ecfeff" stroke="#06b6d4" strokeWidth="1.4" filter={`url(#${id}-shadow)`} />
              <text x={x + 12} y={y + 22} fontSize="10.5" fill="#155e75">{`${i + 1}. ${titleText(s.title, 34)} - ${subText(s.sub, 34)}`}</text>
              <path d={`M 88 ${y + 18} C 100 ${y + 18}, ${x - 10} ${y + 18}, ${x} ${y + 18}`} fill="none" stroke="#0891b2" strokeWidth="1.8" markerEnd={`url(#${id}-arrow)`} />
            </g>
          );
        })}
      </svg>
    </ChartFrame>
  );
}

export function HttpPitfallsDiagram({ title, subtitle, steps = [] }) {
  const id = useId().replace(/:/g, '');
  const safe = steps.slice(0, 4);
  return (
    <ChartFrame title={title} subtitle={subtitle} label={title}>
      <svg viewBox="0 0 860 220" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <SvgDefs idPrefix={id} color="#dc2626" />
        {safe.map((s, i) => {
          const x = 32 + i * 206;
          return (
            <g key={`${s.title}-${i}`}>
              <rect x={x} y="62" width="184" height="102" rx="12" fill={`url(#${id}-warn)`} stroke="#ef4444" strokeWidth="1.4" filter={`url(#${id}-shadow)`} />
              <text x={x + 12} y="90" fontSize="11" fontWeight="700" fill="#7f1d1d">{titleText(s.title, 26)}</text>
              <text x={x + 12} y="114" fontSize="10" fill="#991b1b">{subText(s.sub, 34)}</text>
              {i < safe.length - 1 && (
                <line x1={x + 184} y1="113" x2={x + 202} y2="113" stroke="#dc2626" strokeWidth="2.2" markerEnd={`url(#${id}-arrow)`} />
              )}
            </g>
          );
        })}
      </svg>
    </ChartFrame>
  );
}

export function HttpInterviewMapDiagram({ title, subtitle, steps = [] }) {
  const id = useId().replace(/:/g, '');
  const safe = steps.slice(0, 4);
  return (
    <ChartFrame title={title} subtitle={subtitle} label={title}>
      <svg viewBox="0 0 860 250" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <SvgDefs idPrefix={id} />
        <rect x="20" y="30" width="820" height="188" rx="14" fill="#f8fafc" stroke="#93c5fd" strokeWidth="1.4" />
        {safe.map((s, i) => {
          const x = 38 + i * 198;
          return (
            <g key={`${s.title}-${i}`}>
              <rect x={x} y="58" width="180" height="132" rx="12" fill={`url(#${id}-card)`} stroke="#3b82f6" strokeWidth="1.4" filter={`url(#${id}-shadow)`} />
              <rect x={x + 10} y="70" width="160" height="28" rx="8" fill="#2563eb" />
              <text x={x + 90} y="88" textAnchor="middle" fontSize="10.2" fontWeight="700" fill="#fff">{titleText(s.title, 22)}</text>
              <text x={x + 12} y="116" fontSize="10" fill="#0f172a">{subText(s.sub, 28)}</text>
              {i < safe.length - 1 && (
                <line x1={x + 180} y1="124" x2={x + 196} y2="124" stroke="#2563eb" strokeWidth="2" markerEnd={`url(#${id}-arrow)`} />
              )}
            </g>
          );
        })}
      </svg>
    </ChartFrame>
  );
}
