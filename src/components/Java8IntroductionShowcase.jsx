import { useState } from 'react';
import { Code, GitBranch, ListFilter, ShieldCheck } from 'lucide-react';

const TABS = [
  ['roadmap', 'Roadmap'],
  ['project', 'Real project'],
  ['pipeline', 'Stream flow'],
  ['nulls', 'Optional']
];

function RoadmapDiagram() {
  return (
    <svg viewBox="0 0 760 260" className="java8-showcase-svg" role="img" aria-label="Java 8 roadmap diagram">
      <defs>
        <linearGradient id="java8-blue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e0f2fe" />
          <stop offset="100%" stopColor="#dbeafe" />
        </linearGradient>
        <marker id="java8-arrow" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto">
          <path d="M0,0 L10,4 L0,8 Z" fill="#2563eb" />
        </marker>
      </defs>
      <rect x="24" y="24" width="150" height="64" rx="10" fill="#1d4ed8" />
      <text x="99" y="52" textAnchor="middle" fontSize="18" fontWeight="800" fill="#fff">Java 8</text>
      <text x="99" y="73" textAnchor="middle" fontSize="11" fill="#bfdbfe">modern Java starts here</text>

      {[
        ['Lambda', 'short behavior blocks', 235, 18],
        ['Functional Interface', 'Predicate, Function', 455, 18],
        ['Stream API', 'filter, map, collect', 235, 98],
        ['Optional', 'null-safe return values', 455, 98],
        ['Date & Time', 'LocalDate, formatter', 235, 178],
        ['Default Methods', 'interface evolution', 455, 178]
      ].map(([title, sub, x, y]) => (
        <g key={title}>
          <rect x={x} y={y} width="190" height="58" rx="10" fill="url(#java8-blue)" stroke="#93c5fd" />
          <text x={x + 95} y={y + 25} textAnchor="middle" fontSize="14" fontWeight="800" fill="#172554">{title}</text>
          <text x={x + 95} y={y + 43} textAnchor="middle" fontSize="11" fill="#334155">{sub}</text>
        </g>
      ))}

      {[47, 127, 207].map((y) => (
        <line key={y} x1="174" y1="56" x2="228" y2={y} stroke="#2563eb" strokeWidth="2.5" markerEnd="url(#java8-arrow)" />
      ))}
      {[47, 127, 207].map((y) => (
        <line key={`m-${y}`} x1="425" y1={y} x2="448" y2={y} stroke="#2563eb" strokeWidth="2.5" markerEnd="url(#java8-arrow)" />
      ))}
    </svg>
  );
}

function ProjectDiagram() {
  return (
    <svg viewBox="0 0 760 250" className="java8-showcase-svg" role="img" aria-label="Employee dashboard real project flow">
      <defs>
        <marker id="java8-project-arrow" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto">
          <path d="M0,0 L10,4 L0,8 Z" fill="#0f766e" />
        </marker>
      </defs>
      {[
        ['Database rows', 'employee table', 30],
        ['Repository', 'List<Employee>', 205],
        ['Service logic', 'stream pipeline', 380],
        ['API response', 'salary report DTO', 555]
      ].map(([title, sub, x], index) => (
        <g key={title}>
          <rect x={x} y="82" width="145" height="72" rx="10" fill={index === 2 ? '#ccfbf1' : '#f8fafc'} stroke="#14b8a6" />
          <text x={x + 72.5} y="113" textAnchor="middle" fontSize="14" fontWeight="800" fill="#134e4a">{title}</text>
          <text x={x + 72.5} y="134" textAnchor="middle" fontSize="11" fill="#475569">{sub}</text>
          {index < 3 && <line x1={x + 145} y1="118" x2={x + 173} y2="118" stroke="#0f766e" strokeWidth="2.5" markerEnd="url(#java8-project-arrow)" />}
        </g>
      ))}
      <text x="380" y="38" textAnchor="middle" fontSize="18" fontWeight="900" fill="#0f172a">Realtime fresher task: build an employee salary report</text>
      <text x="380" y="60" textAnchor="middle" fontSize="12" fill="#475569">Java 8 usually appears inside service-layer collection processing, not only in small examples.</text>
      <rect x="245" y="178" width="270" height="38" rx="8" fill="#ecfeff" stroke="#67e8f9" />
      <text x="380" y="202" textAnchor="middle" fontSize="12" fontWeight="700" fill="#155e75">{'filter salary -> group department -> collect response'}</text>
    </svg>
  );
}

function StreamPipelineDiagram() {
  return (
    <svg viewBox="0 0 760 245" className="java8-showcase-svg" role="img" aria-label="Java 8 stream pipeline">
      <defs>
        <marker id="java8-stream-arrow" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto">
          <path d="M0,0 L10,4 L0,8 Z" fill="#7c3aed" />
        </marker>
      </defs>
      {[
        ['employees', 'source list'],
        ['stream()', 'open pipeline'],
        ['filter()', 'salary > 50000'],
        ['map()', 'Employee -> name'],
        ['collect()', 'final List']
      ].map(([title, sub], index) => {
        const x = 28 + index * 146;
        return (
          <g key={title}>
            <rect x={x} y="82" width="116" height="68" rx="10" fill="#f5f3ff" stroke="#a78bfa" />
            <text x={x + 58} y="112" textAnchor="middle" fontSize="14" fontWeight="900" fill="#4c1d95">{title}</text>
            <text x={x + 58} y="132" textAnchor="middle" fontSize="10.5" fill="#475569">{sub}</text>
            {index < 4 && <line x1={x + 116} y1="116" x2={x + 138} y2="116" stroke="#7c3aed" strokeWidth="2.5" markerEnd="url(#java8-stream-arrow)" />}
          </g>
        );
      })}
      <text x="380" y="42" textAnchor="middle" fontSize="18" fontWeight="900" fill="#0f172a">How to read any Stream API code</text>
      <text x="380" y="64" textAnchor="middle" fontSize="12" fill="#475569">Source first, lazy intermediate operations in the middle, terminal operation at the end.</text>
    </svg>
  );
}

function OptionalDiagram() {
  return (
    <svg viewBox="0 0 760 245" className="java8-showcase-svg" role="img" aria-label="Optional null safe flow">
      <rect x="44" y="70" width="190" height="80" rx="12" fill="#fff7ed" stroke="#fb923c" />
      <text x="139" y="103" textAnchor="middle" fontSize="15" fontWeight="900" fill="#7c2d12">Repository result</text>
      <text x="139" y="126" textAnchor="middle" fontSize="11" fill="#475569">Employee may exist or may be missing</text>

      <path d="M245 110 C300 110, 305 110, 360 110" fill="none" stroke="#ea580c" strokeWidth="3" />
      <path d="M360 110 L348 103 M360 110 L348 117" stroke="#ea580c" strokeWidth="3" fill="none" />

      <rect x="370" y="70" width="150" height="80" rx="12" fill="#ffedd5" stroke="#fb923c" />
      <text x="445" y="103" textAnchor="middle" fontSize="15" fontWeight="900" fill="#7c2d12">Optional</text>
      <text x="445" y="126" textAnchor="middle" fontSize="11" fill="#475569">safe decision point</text>

      <path d="M530 96 C570 70, 605 70, 650 70" fill="none" stroke="#16a34a" strokeWidth="3" />
      <path d="M530 126 C570 154, 605 154, 650 154" fill="none" stroke="#dc2626" strokeWidth="3" />

      <rect x="650" y="44" width="88" height="52" rx="9" fill="#dcfce7" stroke="#22c55e" />
      <text x="694" y="75" textAnchor="middle" fontSize="12" fontWeight="800" fill="#14532d">map data</text>

      <rect x="650" y="132" width="88" height="52" rx="9" fill="#fee2e2" stroke="#f87171" />
      <text x="694" y="163" textAnchor="middle" fontSize="12" fontWeight="800" fill="#7f1d1d">orElse</text>

      <text x="380" y="214" textAnchor="middle" fontSize="12" fill="#475569">In real APIs, Optional helps convert missing database values into controlled responses.</text>
    </svg>
  );
}

export default function Java8IntroductionShowcase() {
  const [tab, setTab] = useState('roadmap');

  return (
    <div className="java8-showcase">
      <p className="java8-showcase-lead">
        Fresher view of Java 8: where each feature appears in real service code, how streams process employee data,
        and how Optional avoids unsafe null handling in backend responses.
      </p>

      <div className="java8-scenario-grid" aria-label="Java 8 realtime use cases">
        <div><Code size={18} /><strong>Lambda</strong><span>short rule passed to a method</span></div>
        <div><GitBranch size={18} /><strong>Function</strong><span>contract for that rule</span></div>
        <div><ListFilter size={18} /><strong>Stream</strong><span>pipeline for list processing</span></div>
        <div><ShieldCheck size={18} /><strong>Optional</strong><span>safe missing-value handling</span></div>
      </div>

      <div className="java8-tabs">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" className={tab === id ? 'active' : ''} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>

      <div className="java8-diagram-frame">
        {tab === 'roadmap' && <RoadmapDiagram />}
        {tab === 'project' && <ProjectDiagram />}
        {tab === 'pipeline' && <StreamPipelineDiagram />}
        {tab === 'nulls' && <OptionalDiagram />}
      </div>
    </div>
  );
}
