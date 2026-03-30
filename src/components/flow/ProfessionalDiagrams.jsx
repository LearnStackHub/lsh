/**
 * SVG diagrams for tutorials — gradient nodes, shadows, crisp connectors (looks like real flowcharts).
 * IDs are namespaced per component instance to avoid collisions when multiple SVGs are on one page.
 */

import { useId } from 'react';

function Defs({ prefix }) {
  return (
    <defs>
      <linearGradient id={`${prefix}-node-top`} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#e8eef7" />
      </linearGradient>
      <linearGradient id={`${prefix}-node-accent`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#dbeafe" />
        <stop offset="100%" stopColor="#bfdbfe" />
      </linearGradient>
      <linearGradient id={`${prefix}-arrow`} x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#64748b" />
        <stop offset="100%" stopColor="#2563eb" />
      </linearGradient>
      <filter id={`${prefix}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.18" />
      </filter>
      <marker
        id={`${prefix}-arrowhead`}
        markerWidth="10"
        markerHeight="7"
        refX="9"
        refY="3.5"
        orient="auto"
      >
        <polygon points="0 0, 10 3.5, 0 7" fill="#2563eb" />
      </marker>
    </defs>
  );
}

function useSvgPrefix() {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, '_');
  return `flow-${id}`;
}

/** Teal/orange accents for MySQL scenario diagrams (brand-adjacent) */
function MySQLDefs({ prefix }) {
  return (
    <defs>
      <linearGradient id={`${prefix}-mysql-node`} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ecfeff" />
        <stop offset="100%" stopColor="#cffafe" />
      </linearGradient>
      <linearGradient id={`${prefix}-mysql-deep`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00758F" />
        <stop offset="100%" stopColor="#005a6e" />
      </linearGradient>
      <filter id={`${prefix}-mysql-glow`} x="-15%" y="-15%" width="130%" height="130%">
        <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#00758F" floodOpacity="0.15" />
      </filter>
      <marker
        id={`${prefix}-mysql-arrow`}
        markerWidth="10"
        markerHeight="7"
        refX="9"
        refY="3.5"
        orient="auto"
      >
        <polygon points="0 0, 10 3.5, 0 7" fill="#00758F" />
      </marker>
    </defs>
  );
}

/** JDBC course palette — blue #4479A1 */
function JdbcDefs({ prefix }) {
  return (
    <defs>
      <linearGradient id={`${prefix}-jdbc-node`} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#f0f9ff" />
        <stop offset="100%" stopColor="#e0f2fe" />
      </linearGradient>
      <linearGradient id={`${prefix}-jdbc-deep`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4479A1" />
        <stop offset="100%" stopColor="#2c5282" />
      </linearGradient>
      <filter id={`${prefix}-jdbc-glow`} x="-15%" y="-15%" width="130%" height="130%">
        <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#4479A1" floodOpacity="0.14" />
      </filter>
      <marker
        id={`${prefix}-jdbc-arrow`}
        markerWidth="10"
        markerHeight="7"
        refX="9"
        refY="3.5"
        orient="auto"
      >
        <polygon points="0 0, 10 3.5, 0 7" fill="#4479A1" />
      </marker>
    </defs>
  );
}

/** Title + optional plain-English line for beginners */
function FlowchartFigcaption({ title, fresher }) {
  if (!title && !fresher) return null;
  return (
    <figcaption>
      {title && <span className="flowchart-pro-title">{title}</span>}
      {fresher && <p className="flowchart-pro-fresher">{fresher}</p>}
    </figcaption>
  );
}

/** Horizontal pipeline: equal steps with arrows (numbered for beginners) */
export function HorizontalPipeline({ steps, title, fresherHint }) {
  const p = useSvgPrefix();
  const n = steps.length;
  const w = 720;
  const topStrip = 22;
  const h = 132;
  const pad = 14;
  const gap = 28;
  const nodeW = (w - pad * 2 - (n - 1) * gap) / n;
  const y = topStrip + 18;
  const hintText =
    fresherHint === false
      ? null
      : (fresherHint ??
        'How to read: follow the blue arrows from left to right. Each box is one step; the smaller line under the title explains it in simple words.');

  return (
    <figure className="flowchart-pro flowchart-pro-pipeline" role="img" aria-label={title || 'Process flow'}>
      <FlowchartFigcaption title={title} fresher={hintText} />
      <svg viewBox={`0 0 ${w} ${h}`} className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="8" y="4" width="704" height="16" rx="6" fill="#eff6ff" stroke="#93c5fd" strokeWidth="1" />
        <text x="360" y="15" textAnchor="middle" fontSize="9" fontWeight="700" fill="#1e40af" fontFamily="system-ui, sans-serif">
          Start here → read each numbered step in order (left to right)
        </text>
        {steps.map((step, i) => {
          const x = pad + i * (nodeW + gap);
          const nextX = pad + (i + 1) * (nodeW + gap);
          const badgeR = 10;
          const badgeCx = x + 18;
          const titleCx = x + 34 + (nodeW - 36) / 2;
          return (
            <g key={i}>
              <rect
                x={x}
                y={y}
                width={nodeW}
                height={50}
                rx="10"
                fill={`url(#${p}-node-top)`}
                stroke="#94a3b8"
                strokeWidth="1.2"
                filter={`url(#${p}-shadow)`}
              />
              <circle cx={badgeCx} cy={y + 25} r={badgeR} fill="#2563eb" stroke="#1e40af" strokeWidth="1" />
              <text
                x={badgeCx}
                y={y + 29}
                textAnchor="middle"
                fontSize="10"
                fontWeight="800"
                fill="#ffffff"
                fontFamily="system-ui, sans-serif"
              >
                {i + 1}
              </text>
              <text
                x={titleCx}
                y={y + 24}
                textAnchor="middle"
                fontSize="11"
                fontWeight="700"
                fill="#0f172a"
                fontFamily="system-ui, sans-serif"
              >
                {step.title}
              </text>
              {step.sub && (
                <text
                  x={titleCx}
                  y={y + 40}
                  textAnchor="middle"
                  fontSize="9.5"
                  fill="#475569"
                  fontFamily="system-ui, sans-serif"
                >
                  {step.sub}
                </text>
              )}
              {i < n - 1 && (
                <line
                  x1={x + nodeW + 2}
                  y1={y + 25}
                  x2={nextX - 2}
                  y2={y + 25}
                  stroke={`url(#${p}-arrow)`}
                  strokeWidth="2.5"
                  markerEnd={`url(#${p}-arrowhead)`}
                />
              )}
            </g>
          );
        })}
      </svg>
    </figure>
  );
}

/** JDK ⊃ JRE ⊃ JVM nested stack */
export function JdkStackDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-stack" role="img" aria-label="JDK contains JRE and JVM">
      <figcaption className="flowchart-pro-title">What you install: JDK wraps everything</figcaption>
      <svg viewBox="0 0 400 220" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect
          x="40"
          y="16"
          width="320"
          height="188"
          rx="14"
          fill={`url(#${p}-node-accent)`}
          stroke="#3b82f6"
          strokeWidth="1.5"
          filter={`url(#${p}-shadow)`}
        />
        <text x="200" y="42" textAnchor="middle" fontSize="13" fontWeight="800" fill="#1e3a8a" fontFamily="system-ui">
          JDK — Java Development Kit
        </text>
        <text x="200" y="58" textAnchor="middle" fontSize="9" fill="#1e40af" fontFamily="system-ui">
          javac, javadoc, tools + full runtime
        </text>

        <rect
          x="64"
          y="72"
          width="272"
          height="56"
          rx="10"
          fill="#ffffff"
          stroke="#64748b"
          strokeWidth="1.2"
        />
        <text x="200" y="96" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0f172a" fontFamily="system-ui">
          JRE — Java Runtime Environment
        </text>
        <text x="200" y="112" textAnchor="middle" fontSize="9" fill="#64748b" fontFamily="system-ui">
          Libraries + JVM (enough to run apps)
        </text>

        <rect
          x="120"
          y="140"
          width="160"
          height="44"
          rx="8"
          fill="#0f172a"
          stroke="#334155"
          strokeWidth="1"
        />
        <text x="200" y="162" textAnchor="middle" fontSize="11" fontWeight="700" fill="#f8fafc" fontFamily="system-ui">
          JVM
        </text>
        <text x="200" y="176" textAnchor="middle" fontSize="8" fill="#94a3b8" fontFamily="system-ui">
          Runs bytecode — Write Once, Run Anywhere
        </text>
      </svg>
    </figure>
  );
}

/** .java → javac → .class → JVM → output */
export function CompileRunPipeline() {
  return (
    <HorizontalPipeline
      title="From source file to console output"
      steps={[
        { title: '.java', sub: 'source code' },
        { title: 'javac', sub: 'compile' },
        { title: '.class', sub: 'bytecode' },
        { title: 'JVM', sub: 'execute' },
        { title: 'Output', sub: 'console' }
      ]}
    />
  );
}

/** Windows: PATH points to bin → java works */
export function WindowsPathFlow() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro" role="img" aria-label="Windows PATH flow">
      <figcaption className="flowchart-pro-title">Windows: how the terminal finds Java</figcaption>
      <svg viewBox="0 0 560 140" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect
          x="20"
          y="40"
          width="120"
          height="52"
          rx="10"
          fill={`url(#${p}-node-top)`}
          stroke="#64748b"
          filter={`url(#${p}-shadow)`}
        />
        <text x="80" y="64" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0f172a">
          System PATH
        </text>
        <text x="80" y="80" textAnchor="middle" fontSize="8" fill="#64748b">
          list of folders
        </text>

        <line
          x1="144"
          y1="66"
          x2="188"
          y2="66"
          stroke="#2563eb"
          strokeWidth="2.5"
          markerEnd={`url(#${p}-arrowhead)`}
        />

        <rect x="196" y="36" width="160" height="60" rx="10" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.2" />
        <text x="276" y="58" textAnchor="middle" fontSize="9" fontWeight="700" fill="#1e3a8a" fontFamily="ui-monospace">
          ...\jdk-17\bin
        </text>
        <text x="276" y="74" textAnchor="middle" fontSize="8" fill="#64748b">
          contains java.exe &amp; javac.exe
        </text>

        <line
          x1="360"
          y1="66"
          x2="404"
          y2="66"
          stroke="#2563eb"
          strokeWidth="2.5"
          markerEnd={`url(#${p}-arrowhead)`}
        />

        <rect
          x="412"
          y="40"
          width="128"
          height="52"
          rx="10"
          fill="#0f172a"
          stroke="#334155"
          filter={`url(#${p}-shadow)`}
        />
        <text x="476" y="64" textAnchor="middle" fontSize="10" fontWeight="700" fill="#f8fafc">
          java -version
        </text>
        <text x="476" y="80" textAnchor="middle" fontSize="8" fill="#94a3b8">
          works in new terminal
        </text>
      </svg>
    </figure>
  );
}

/** Write Once, Run Anywhere: one bytecode artifact, many JVMs */
export function WoraPlatformDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro" role="img" aria-label="Same bytecode runs on different operating systems via JVM">
      <figcaption className="flowchart-pro-title">Write Once, Run Anywhere (WORA)</figcaption>
      <svg viewBox="0 0 520 200" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect
          x="150"
          y="18"
          width="220"
          height="48"
          rx="12"
          fill={`url(#${p}-node-accent)`}
          stroke="#2563eb"
          strokeWidth="1.4"
          filter={`url(#${p}-shadow)`}
        />
        <text x="260" y="40" textAnchor="middle" fontSize="12" fontWeight="800" fill="#1e3a8a" fontFamily="system-ui">
          Portable bytecode
        </text>
        <text x="260" y="56" textAnchor="middle" fontSize="9" fill="#1e40af" fontFamily="ui-monospace">
          App.class
        </text>

        {[
          { x: 28, label: 'Windows', sub: 'JVM for Win' },
          { x: 196, label: 'Linux', sub: 'JVM for Linux' },
          { x: 364, label: 'macOS', sub: 'JVM for macOS' }
        ].map((col) => (
          <g key={col.label}>
            <line
              x1={260}
              y1="68"
              x2={col.x + 56}
              y2="108"
              stroke="#2563eb"
              strokeWidth="2"
              markerEnd={`url(#${p}-arrowhead)`}
            />
            <rect
              x={col.x}
              y="112"
              width="112"
              height="52"
              rx="10"
              fill="#0f172a"
              stroke="#334155"
              filter={`url(#${p}-shadow)`}
            />
            <text
              x={col.x + 56}
              y="134"
              textAnchor="middle"
              fontSize="10"
              fontWeight="700"
              fill="#f8fafc"
              fontFamily="system-ui"
            >
              {col.label}
            </text>
            <text
              x={col.x + 56}
              y="152"
              textAnchor="middle"
              fontSize="8"
              fill="#94a3b8"
              fontFamily="system-ui"
            >
              {col.sub}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  );
}

/** Vertical chain: source → compile → run on JVM (matches intro article flow) */
export function JavaExecutionVerticalFlow() {
  const p = useSvgPrefix();
  const steps = [
    { title: 'Java source', sub: '.java file' },
    { title: 'javac', sub: 'compiler' },
    { title: 'Bytecode', sub: '.class file' },
    { title: 'JVM', sub: 'loads & verifies' },
    { title: 'JIT', sub: 'hot code → native' },
    { title: 'Execution', sub: 'runs on this OS' }
  ];
  const w = 320;
  const nodeH = 36;
  const gap = 12;
  const pad = 20;
  const nodeW = 240;
  const x = (w - nodeW) / 2;
  const totalH = pad * 2 + steps.length * nodeH + (steps.length - 1) * gap;

  return (
    <figure className="flowchart-pro flowchart-pro-vertical" role="img" aria-label="Java compilation and execution stages">
      <figcaption className="flowchart-pro-title">From source code to machine execution</figcaption>
      <svg viewBox={`0 0 ${w} ${totalH}`} className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        {steps.map((step, i) => {
          const y = pad + i * (nodeH + gap);
          const cx = w / 2;
          return (
            <g key={step.title}>
              <rect
                x={x}
                y={y}
                width={nodeW}
                height={nodeH}
                rx="10"
                fill={i === 0 || i === steps.length - 1 ? `url(#${p}-node-accent)` : `url(#${p}-node-top)`}
                stroke="#94a3b8"
                strokeWidth="1.2"
                filter={`url(#${p}-shadow)`}
              />
              <text
                x={cx}
                y={y + 16}
                textAnchor="middle"
                fontSize="11"
                fontWeight="700"
                fill="#0f172a"
                fontFamily="system-ui"
              >
                {step.title}
              </text>
              <text
                x={cx}
                y={y + 30}
                textAnchor="middle"
                fontSize="9"
                fill="#64748b"
                fontFamily="system-ui"
              >
                {step.sub}
              </text>
              {i < steps.length - 1 && (
                <line
                  x1={cx}
                  y1={y + nodeH + 1}
                  x2={cx}
                  y2={y + nodeH + gap - 1}
                  stroke="#2563eb"
                  strokeWidth="2.5"
                  markerEnd={`url(#${p}-arrowhead)`}
                />
              )}
            </g>
          );
        })}
      </svg>
    </figure>
  );
}

/** The “Big 12” — compact grid (Java Features lesson) */
export function JavaFeaturesTwelveGrid() {
  const p = useSvgPrefix();
  const items = [
    { n: 1, t: 'Simple', s: 'no pointers' },
    { n: 2, t: 'OOP', s: 'classes & objects' },
    { n: 3, t: 'WORA', s: 'any JVM' },
    { n: 4, t: 'Secure', s: 'verify bytecode' },
    { n: 5, t: 'Robust', s: 'types + GC' },
    { n: 6, t: 'Portable', s: 'fixed sizes' },
    { n: 7, t: 'Performance', s: 'JIT + GC' },
    { n: 8, t: 'Threads', s: 'parallelism' },
    { n: 9, t: 'Distributed', s: 'network APIs' },
    { n: 10, t: 'Dynamic', s: 'reflection' },
    { n: 11, t: 'Arch-neutral', s: 'one bytecode' },
    { n: 12, t: 'Hybrid run', s: 'interp + JIT' }
  ];
  const cols = 4;
  const cellW = 108;
  const cellH = 52;
  const gap = 10;
  const ox = 16;
  const oy = 36;
  const w = ox * 2 + cols * cellW + (cols - 1) * gap;
  const rows = 3;
  const h = oy + rows * cellH + (rows - 1) * gap + 8;

  return (
    <figure className="flowchart-pro flowchart-pro-features-grid" role="img" aria-label="Twelve key Java features">
      <figcaption className="flowchart-pro-title">The Big 12 — at a glance</figcaption>
      <svg viewBox={`0 0 ${w} ${h}`} className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        {items.map((it, i) => {
          const row = Math.floor(i / cols);
          const col = i % cols;
          const x = ox + col * (cellW + gap);
          const y = oy + row * (cellH + gap);
          return (
            <g key={it.n}>
              <rect
                x={x}
                y={y}
                width={cellW}
                height={cellH}
                rx="10"
                fill={`url(#${p}-node-top)`}
                stroke="#94a3b8"
                strokeWidth="1.1"
                filter={`url(#${p}-shadow)`}
              />
              <circle cx={x + 18} cy={y + 18} r="10" fill="#2563eb" opacity="0.9" />
              <text
                x={x + 18}
                y={y + 22}
                textAnchor="middle"
                fontSize="9"
                fontWeight="800"
                fill="#ffffff"
                fontFamily="system-ui"
              >
                {it.n}
              </text>
              <text
                x={x + 32}
                y={y + 18}
                fontSize="10"
                fontWeight="700"
                fill="#0f172a"
                fontFamily="system-ui"
              >
                {it.t}
              </text>
              <text x={x + 32} y={y + 34} fontSize="8" fill="#64748b" fontFamily="system-ui">
                {it.s}
              </text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}

/** Simple UML-style class (OOP feature) */
export function OopClassDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro" role="img" aria-label="Example Java class Car">
      <FlowchartFigcaption
        title="One class — fields + methods"
        fresher="Think of the class as a stencil. The header is the class name, the middle lists what each object remembers (fields), the bottom lists what it can do (methods). `new Car()` creates an actual object in memory from this stencil."
      />
      <svg viewBox="0 0 320 168" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect
          x="48"
          y="12"
          width="224"
          height="144"
          rx="10"
          fill="#ffffff"
          stroke="#64748b"
          strokeWidth="1.4"
          filter={`url(#${p}-shadow)`}
        />
        <rect x="48" y="12" width="224" height="36" rx="10" fill="#1e40af" />
        <rect x="48" y="40" width="224" height="8" fill="#1e40af" />
        <text x="160" y="35" textAnchor="middle" fontSize="12" fontWeight="800" fill="#ffffff" fontFamily="ui-monospace">
          Car
        </text>
        <text x="58" y="62" fontSize="9" fill="#334155" fontFamily="ui-monospace">
          String brand;
        </text>
        <text x="58" y="78" fontSize="9" fill="#334155" fontFamily="ui-monospace">
          int speed;
        </text>
        <line x1="48" y1="88" x2="272" y2="88" stroke="#cbd5e1" strokeWidth="1" />
        <text x="58" y="106" fontSize="9" fill="#0f172a" fontFamily="ui-monospace">
          void accelerate()
        </text>
      </svg>
    </figure>
  );
}

/** Bytecode verified before execution (security / robustness) */
export function SecurityBytecodeFlowDiagram() {
  const p = useSvgPrefix();
  const blocks = [
    { x: 20, t: 'Bytecode', s: '.class file', dark: false },
    { x: 188, t: 'Verifier', s: 'rules & safety', dark: false },
    { x: 356, t: 'JVM runs', s: 'sandbox + GC', dark: true }
  ];
  return (
    <figure className="flowchart-pro" role="img" aria-label="Bytecode verification before JVM runs code">
      <figcaption className="flowchart-pro-title">Secure: verify before run</figcaption>
      <svg viewBox="0 0 520 100" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        {blocks.map((b) => (
          <g key={b.t}>
            <rect
              x={b.x}
              y="22"
              width="140"
              height="56"
              rx="10"
              fill={b.dark ? '#0f172a' : `url(#${p}-node-top)`}
              stroke={b.dark ? '#334155' : '#94a3b8'}
              strokeWidth="1.2"
              filter={`url(#${p}-shadow)`}
            />
            <text
              x={b.x + 70}
              y="44"
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill={b.dark ? '#f8fafc' : '#0f172a'}
              fontFamily="system-ui"
            >
              {b.t}
            </text>
            <text
              x={b.x + 70}
              y="62"
              textAnchor="middle"
              fontSize="8"
              fill={b.dark ? '#94a3b8' : '#64748b'}
              fontFamily="system-ui"
            >
              {b.s}
            </text>
          </g>
        ))}
        <line
          x1="162"
          y1="50"
          x2="184"
          y2="50"
          stroke="#2563eb"
          strokeWidth="2.5"
          markerEnd={`url(#${p}-arrowhead)`}
        />
        <line
          x1="330"
          y1="50"
          x2="352"
          y2="50"
          stroke="#2563eb"
          strokeWidth="2.5"
          markerEnd={`url(#${p}-arrowhead)`}
        />
      </svg>
    </figure>
  );
}

/** Interpreter + JIT inside JVM (feature 12 + performance) */
export function JitHybridDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro" role="img" aria-label="JVM uses interpreter and JIT compilation">
      <figcaption className="flowchart-pro-title">Interpreted and compiled: hybrid execution</figcaption>
      <svg viewBox="0 0 400 200" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect
          x="140"
          y="12"
          width="120"
          height="40"
          rx="10"
          fill={`url(#${p}-node-accent)`}
          stroke="#2563eb"
          strokeWidth="1.2"
          filter={`url(#${p}-shadow)`}
        />
        <text x="200" y="30" textAnchor="middle" fontSize="11" fontWeight="800" fill="#1e3a8a" fontFamily="system-ui">
          Bytecode
        </text>
        <text x="200" y="44" textAnchor="middle" fontSize="8" fill="#1e40af" fontFamily="system-ui">
          enters JVM
        </text>

        <line x1="200" y1="54" x2="200" y2="72" stroke="#2563eb" strokeWidth="2.5" markerEnd={`url(#${p}-arrowhead)`} />

        <rect
          x="130"
          y="76"
          width="140"
          height="36"
          rx="10"
          fill="#ffffff"
          stroke="#64748b"
          strokeWidth="1.2"
          filter={`url(#${p}-shadow)`}
        />
        <text x="200" y="94" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0f172a" fontFamily="system-ui">
          JVM
        </text>
        <text x="200" y="108" textAnchor="middle" fontSize="8" fill="#64748b" fontFamily="system-ui">
          runtime engine
        </text>

        <line x1="200" y1="114" x2="200" y2="124" stroke="#64748b" strokeWidth="1.5" />
        <line x1="200" y1="124" x2="96" y2="138" stroke="#2563eb" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <line x1="200" y1="124" x2="304" y2="138" stroke="#2563eb" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />

        <rect x="36" y="142" width="120" height="44" rx="10" fill={`url(#${p}-node-top)`} stroke="#94a3b8" />
        <text x="96" y="160" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0f172a" fontFamily="system-ui">
          Interpreter
        </text>
        <text x="96" y="176" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily="system-ui">
          cold / first runs
        </text>

        <rect x="244" y="142" width="120" height="44" rx="10" fill="#fef3c7" stroke="#d97706" />
        <text x="304" y="160" textAnchor="middle" fontSize="10" fontWeight="700" fill="#92400e" fontFamily="system-ui">
          JIT compiler
        </text>
        <text x="304" y="176" textAnchor="middle" fontSize="7" fill="#b45309" fontFamily="system-ui">
          hot paths → native
        </text>
      </svg>
    </figure>
  );
}

/** Multithreading: main + worker (conceptual) */
export function MultithreadForkDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro" role="img" aria-label="Main thread spawns worker threads">
      <figcaption className="flowchart-pro-title">Multithreaded: parallel work</figcaption>
      <svg viewBox="0 0 400 150" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect
          x="140"
          y="16"
          width="120"
          height="44"
          rx="10"
          fill={`url(#${p}-node-accent)`}
          stroke="#2563eb"
          filter={`url(#${p}-shadow)`}
        />
        <text x="200" y="36" textAnchor="middle" fontSize="11" fontWeight="800" fill="#1e3a8a" fontFamily="system-ui">
          main thread
        </text>
        <text x="200" y="52" textAnchor="middle" fontSize="8" fill="#1e40af" fontFamily="system-ui">
          your program starts here
        </text>

        <line x1="200" y1="62" x2="200" y2="78" stroke="#2563eb" strokeWidth="2" />
        <line x1="200" y1="78" x2="96" y2="94" stroke="#2563eb" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <line x1="200" y1="78" x2="304" y2="94" stroke="#2563eb" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />

        <rect x="36" y="98" width="120" height="40" rx="10" fill="#0f172a" stroke="#334155" />
        <text x="96" y="118" textAnchor="middle" fontSize="9" fontWeight="700" fill="#f8fafc" fontFamily="system-ui">
          Thread A
        </text>
        <text x="96" y="132" textAnchor="middle" fontSize="7" fill="#94a3b8" fontFamily="system-ui">
          background task
        </text>

        <rect x="244" y="98" width="120" height="40" rx="10" fill="#0f172a" stroke="#334155" />
        <text x="304" y="118" textAnchor="middle" fontSize="9" fontWeight="700" fill="#f8fafc" fontFamily="system-ui">
          Thread B
        </text>
        <text x="304" y="132" textAnchor="middle" fontSize="7" fill="#94a3b8" fontFamily="system-ui">
          parallel work
        </text>
      </svg>
    </figure>
  );
}

/** Java syntax anatomy: class → main → statement */
export function JavaSyntaxAnatomyDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro" role="img" aria-label="HelloWorld syntax anatomy">
      <figcaption className="flowchart-pro-title">HelloWorld anatomy</figcaption>
      <svg viewBox="0 0 560 230" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="26" y="18" width="312" height="170" rx="12" fill="#0f172a" stroke="#334155" filter={`url(#${p}-shadow)`} />
        <text x="42" y="46" fontSize="10" fill="#f8fafc" fontFamily="ui-monospace">
          {'public class HelloWorld {'}
        </text>
        <text x="56" y="68" fontSize="10" fill="#f8fafc" fontFamily="ui-monospace">
          {'  public static void main(String[] args) {'}
        </text>
        <text x="70" y="90" fontSize="10" fill="#f8fafc" fontFamily="ui-monospace">
          {'    System.out.println("Hello");'}
        </text>
        <text x="56" y="112" fontSize="10" fill="#f8fafc" fontFamily="ui-monospace">
          {'  }'}
        </text>
        <text x="42" y="134" fontSize="10" fill="#f8fafc" fontFamily="ui-monospace">
          {'}'}
        </text>

        <rect x="376" y="24" width="160" height="38" rx="10" fill={`url(#${p}-node-top)`} stroke="#94a3b8" />
        <text x="456" y="40" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0f172a">Class declaration</text>
        <text x="456" y="54" textAnchor="middle" fontSize="8" fill="#64748b">filename must match class</text>
        <line x1="336" y1="42" x2="372" y2="42" stroke="#2563eb" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />

        <rect x="376" y="90" width="160" height="38" rx="10" fill={`url(#${p}-node-top)`} stroke="#94a3b8" />
        <text x="456" y="106" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0f172a">main() entry point</text>
        <text x="456" y="120" textAnchor="middle" fontSize="8" fill="#64748b">program starts here</text>
        <line x1="336" y1="98" x2="372" y2="98" stroke="#2563eb" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />

        <rect x="376" y="156" width="160" height="38" rx="10" fill={`url(#${p}-node-top)`} stroke="#94a3b8" />
        <text x="456" y="172" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0f172a">Statement + ;</text>
        <text x="456" y="186" textAnchor="middle" fontSize="8" fill="#64748b">semicolon is required</text>
        <line x1="336" y1="90" x2="372" y2="172" stroke="#2563eb" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
      </svg>
    </figure>
  );
}

/** Java file structure blocks: package → imports → class → fields → methods */
export function JavaFileStructureDiagram() {
  const p = useSvgPrefix();
  const blocks = [
    { t: 'package', s: 'optional' },
    { t: 'imports', s: 'dependencies' },
    { t: 'class', s: 'container' },
    { t: 'fields', s: 'state' },
    { t: 'constructor', s: 'init object' },
    { t: 'methods', s: 'behavior' },
    { t: 'main', s: 'entry point' }
  ];
  return (
    <figure className="flowchart-pro" role="img" aria-label="Typical Java file structure">
      <figcaption className="flowchart-pro-title">Typical Java file order</figcaption>
      <svg viewBox="0 0 360 370" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        {blocks.map((b, i) => {
          const y = 20 + i * 48;
          return (
            <g key={b.t}>
              <rect
                x="58"
                y={y}
                width="244"
                height="34"
                rx="10"
                fill={i === 2 ? `url(#${p}-node-accent)` : `url(#${p}-node-top)`}
                stroke="#94a3b8"
                strokeWidth="1.2"
                filter={`url(#${p}-shadow)`}
              />
              <text x="134" y={y + 15} textAnchor="middle" fontSize="10" fontWeight="700" fill="#0f172a" fontFamily="ui-monospace">
                {b.t}
              </text>
              <text x="246" y={y + 15} textAnchor="middle" fontSize="8" fill="#64748b">
                {b.s}
              </text>
              {i < blocks.length - 1 && (
                <line
                  x1="180"
                  y1={y + 36}
                  x2="180"
                  y2={y + 45}
                  stroke="#2563eb"
                  strokeWidth="2"
                  markerEnd={`url(#${p}-arrowhead)`}
                />
              )}
            </g>
          );
        })}
      </svg>
    </figure>
  );
}

/** Common syntax mistakes and their fixes */
export function JavaSyntaxErrorsDiagram() {
  const p = useSvgPrefix();
  const rows = [
    { bad: 'int x = 5', fix: 'int x = 5;' },
    { bad: 'system.out.println()', fix: 'System.out.println()' },
    { bad: "String s = 'Hi';", fix: 'String s = "Hi";' }
  ];
  return (
    <figure className="flowchart-pro" role="img" aria-label="Common Java syntax mistakes">
      <figcaption className="flowchart-pro-title">Common syntax mistakes</figcaption>
      <svg viewBox="0 0 600 170" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        {rows.map((r, i) => {
          const y = 20 + i * 48;
          return (
            <g key={r.bad}>
              <rect x="20" y={y} width="216" height="30" rx="8" fill="#fef2f2" stroke="#fca5a5" />
              <text x="30" y={y + 19} fontSize="10" fill="#991b1b" fontFamily="ui-monospace">
                {r.bad}
              </text>
              <line x1="240" y1={y + 15} x2="302" y2={y + 15} stroke="#2563eb" strokeWidth="2.5" markerEnd={`url(#${p}-arrowhead)`} />
              <rect x="312" y={y} width="268" height="30" rx="8" fill="#ecfdf5" stroke="#86efac" />
              <text x="324" y={y + 19} fontSize="10" fill="#166534" fontFamily="ui-monospace">
                {r.fix}
              </text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}

/** Variable declaration: type, name, value */
export function VariableDeclarationDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro" role="img" aria-label="Parts of a variable declaration">
      <figcaption className="flowchart-pro-title">Declaration: type, name, initializer</figcaption>
      <svg viewBox="0 0 520 152" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="32" y="78" width="456" height="36" rx="8" fill="#0f172a" stroke="#334155" filter={`url(#${p}-shadow)`} />
        <text x="48" y="100" fontSize="12" fill="#f8fafc" fontFamily="ui-monospace">
          int age = 25;
        </text>
        <rect x="48" y="74" width="30" height="3" rx="1" fill="#60a5fa" />
        <rect x="84" y="74" width="36" height="3" rx="1" fill="#34d399" />
        <rect x="128" y="74" width="52" height="3" rx="1" fill="#fbbf24" />

        <line x1="63" y1="38" x2="63" y2="72" stroke="#2563eb" strokeWidth="1.5" />
        <rect x="14" y="10" width="98" height="28" rx="8" fill={`url(#${p}-node-top)`} stroke="#94a3b8" />
        <text x="63" y="28" textAnchor="middle" fontSize="9" fontWeight="700" fill="#0f172a">
          Data type
        </text>

        <line x1="173" y1="38" x2="102" y2="74" stroke="#2563eb" strokeWidth="1.5" />
        <rect x="124" y="10" width="98" height="28" rx="8" fill={`url(#${p}-node-top)`} stroke="#94a3b8" />
        <text x="173" y="28" textAnchor="middle" fontSize="9" fontWeight="700" fill="#0f172a">
          Name
        </text>

        <line x1="289" y1="38" x2="154" y2="74" stroke="#2563eb" strokeWidth="1.5" />
        <rect x="234" y="10" width="110" height="28" rx="8" fill={`url(#${p}-node-top)`} stroke="#94a3b8" />
        <text x="289" y="28" textAnchor="middle" fontSize="9" fontWeight="700" fill="#0f172a">
          Initial value
        </text>

        <text x="260" y="138" textAnchor="middle" fontSize="9" fill="#64748b" fontFamily="system-ui">
          Declare first, assign later: int age; age = 25;
        </text>
      </svg>
    </figure>
  );
}

/** Local vs instance vs static (where variables live) */
export function VariableKindsDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro" role="img" aria-label="Local instance and static variables">
      <figcaption className="flowchart-pro-title">Three kinds: where they live</figcaption>
      <svg viewBox="0 0 420 248" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="24" y="12" width="372" height="224" rx="14" fill={`url(#${p}-node-accent)`} stroke="#2563eb" strokeWidth="1.3" filter={`url(#${p}-shadow)`} />
        <text x="210" y="34" textAnchor="middle" fontSize="12" fontWeight="800" fill="#1e3a8a" fontFamily="system-ui">
          class Example
        </text>

        <rect x="44" y="48" width="332" height="36" rx="8" fill="#fef3c7" stroke="#d97706" />
        <text x="56" y="70" fontSize="10" fill="#92400e" fontFamily="ui-monospace">
          static int totalUsers = 0;
        </text>
        <text x="300" y="70" fontSize="8" fill="#b45309" fontFamily="system-ui">
          class variable (shared)
        </text>

        <rect x="44" y="96" width="332" height="40" rx="8" fill="#ffffff" stroke="#94a3b8" />
        <text x="56" y="114" fontSize="10" fill="#0f172a" fontFamily="ui-monospace">
          String name;
        </text>
        <text x="56" y="128" fontSize="10" fill="#0f172a" fontFamily="ui-monospace">
          int age;
        </text>
        <text x="240" y="118" fontSize="8" fill="#64748b" fontFamily="system-ui">
          instance (one per object)
        </text>

        <rect x="44" y="148" width="332" height="72" rx="8" fill="#0f172a" stroke="#334155" />
        <text x="56" y="170" fontSize="9" fill="#94a3b8" fontFamily="ui-monospace">
          void greet() {'{'}
        </text>
        <text x="68" y="188" fontSize="10" fill="#f8fafc" fontFamily="ui-monospace">
          int x = 1;
        </text>
        <text x="56" y="206" fontSize="9" fill="#94a3b8" fontFamily="ui-monospace">
          {'}'}
        </text>
        <text x="268" y="184" fontSize="8" fill="#94a3b8" fontFamily="system-ui">
          local (method only)
        </text>
      </svg>
    </figure>
  );
}

/** Default values for fields (locals must be assigned) */
export function VariableDefaultsDiagram() {
  const p = useSvgPrefix();
  const rows = [
    { label: 'int / long / …', val: '0' },
    { label: 'float / double', val: '0.0' },
    { label: 'boolean', val: 'false' },
    { label: 'char', val: "'\\u0000'" },
    { label: 'Object ref', val: 'null' }
  ];
  return (
    <figure className="flowchart-pro" role="img" aria-label="Default values for instance and static fields">
      <figcaption className="flowchart-pro-title">Default values (fields only)</figcaption>
      <svg viewBox="0 0 420 200" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        {rows.map((row, i) => {
          const y = 16 + i * 32;
          return (
            <g key={row.label}>
              <text x="12" y={y + 18} fontSize="10" fill="#0f172a" fontFamily="ui-monospace">
                {row.label}
              </text>
              <rect x="200" y={y + 2} width="200" height="22" rx="6" fill={`url(#${p}-node-top)`} stroke="#94a3b8" />
              <text x="300" y={y + 17} textAnchor="middle" fontSize="10" fontWeight="700" fill="#1d4ed8" fontFamily="ui-monospace">
                {row.val}
              </text>
            </g>
          );
        })}
        <text x="210" y="188" textAnchor="middle" fontSize="9" fill="#b91c1c" fontFamily="system-ui">
          Local variables: no default — assign before use.
        </text>
      </svg>
    </figure>
  );
}

/** Integer vs floating division (operators lesson) */
export function ArithmeticIntVsDoubleDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro" role="img" aria-label="Integer division versus floating division">
      <figcaption className="flowchart-pro-title">Division: int truncates, double does not</figcaption>
      <svg viewBox="0 0 520 132" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="20" y="28" width="230" height="78" rx="12" fill="#fef2f2" stroke="#fca5a5" filter={`url(#${p}-shadow)`} />
        <text x="135" y="52" textAnchor="middle" fontSize="10" fontWeight="800" fill="#991b1b" fontFamily="system-ui">
          int (integer math)
        </text>
        <text x="40" y="78" fontSize="11" fill="#0f172a" fontFamily="ui-monospace">
          5 / 2
        </text>
        <text x="200" y="78" fontSize="11" fill="#64748b" fontFamily="ui-monospace">
          → 2
        </text>
        <text x="40" y="98" fontSize="8" fill="#b91c1c" fontFamily="system-ui">
          fractional part dropped
        </text>

        <rect x="270" y="28" width="230" height="78" rx="12" fill="#ecfdf5" stroke="#86efac" filter={`url(#${p}-shadow)`} />
        <text x="385" y="52" textAnchor="middle" fontSize="10" fontWeight="800" fill="#166534" fontFamily="system-ui">
          double (decimal math)
        </text>
        <text x="290" y="78" fontSize="11" fill="#0f172a" fontFamily="ui-monospace">
          5.0 / 2
        </text>
        <text x="450" y="78" fontSize="11" fill="#64748b" fontFamily="ui-monospace">
          → 2.5
        </text>
        <text x="290" y="98" fontSize="8" fill="#15803d" fontFamily="system-ui">
          at least one operand as double
        </text>
      </svg>
    </figure>
  );
}

/** Short-circuit && and || */
export function ShortCircuitLogicalDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro" role="img" aria-label="Short circuit evaluation for logical operators">
      <figcaption className="flowchart-pro-title">Short-circuit: skip work when the answer is already known</figcaption>
      <svg viewBox="0 0 520 200" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <text x="12" y="28" fontSize="11" fontWeight="800" fill="#1e3a8a" fontFamily="system-ui">
          a &amp;&amp; b
        </text>
        <rect x="12" y="40" width="240" height="56" rx="10" fill={`url(#${p}-node-top)`} stroke="#94a3b8" />
        <text x="24" y="62" fontSize="9" fill="#0f172a" fontFamily="system-ui">
          If <tspan fontFamily="ui-monospace">a</tspan> is <tspan fontWeight="700">false</tspan> → result is false
        </text>
        <text x="24" y="80" fontSize="8" fill="#64748b" fontFamily="system-ui">
          <tspan fontFamily="ui-monospace">b</tspan> is not evaluated (side effects skipped)
        </text>

        <rect x="268" y="40" width="240" height="56" rx="10" fill={`url(#${p}-node-accent)`} stroke="#2563eb" />
        <text x="280" y="62" fontSize="9" fill="#0f172a" fontFamily="system-ui">
          If <tspan fontFamily="ui-monospace">a</tspan> is <tspan fontWeight="700">true</tspan> → must evaluate <tspan fontFamily="ui-monospace">b</tspan>
        </text>
        <text x="280" y="80" fontSize="8" fill="#1e40af" fontFamily="system-ui">
          Both sides can matter for the final result
        </text>

        <text x="12" y="118" fontSize="11" fontWeight="800" fill="#1e3a8a" fontFamily="system-ui">
          a || b
        </text>
        <rect x="12" y="130" width="240" height="56" rx="10" fill={`url(#${p}-node-top)`} stroke="#94a3b8" />
        <text x="24" y="152" fontSize="9" fill="#0f172a" fontFamily="system-ui">
          If <tspan fontFamily="ui-monospace">a</tspan> is <tspan fontWeight="700">true</tspan> → result is true
        </text>
        <text x="24" y="170" fontSize="8" fill="#64748b" fontFamily="system-ui">
          <tspan fontFamily="ui-monospace">b</tspan> is not evaluated
        </text>

        <rect x="268" y="130" width="240" height="56" rx="10" fill={`url(#${p}-node-accent)`} stroke="#2563eb" />
        <text x="280" y="152" fontSize="9" fill="#0f172a" fontFamily="system-ui">
          If <tspan fontFamily="ui-monospace">a</tspan> is <tspan fontWeight="700">false</tspan> → must evaluate <tspan fontFamily="ui-monospace">b</tspan>
        </text>
        <text x="280" y="170" fontSize="8" fill="#1e40af" fontFamily="system-ui">
          Only then can the expression become true
        </text>
      </svg>
    </figure>
  );
}

/** Compact AND / OR truth tables */
export function LogicalTruthTableDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro" role="img" aria-label="Logical AND and OR truth tables">
      <figcaption className="flowchart-pro-title">Truth tables (memorize the patterns)</figcaption>
      <svg viewBox="0 0 520 120" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="16" y="24" width="232" height="80" rx="10" fill="#ffffff" stroke="#94a3b8" filter={`url(#${p}-shadow)`} />
        <text x="132" y="44" textAnchor="middle" fontSize="10" fontWeight="800" fill="#0f172a">
          AND &amp;&amp;
        </text>
        <text x="40" y="64" fontSize="9" fontFamily="ui-monospace" fill="#334155">
          T &amp;&amp; T → T
        </text>
        <text x="40" y="80" fontSize="9" fontFamily="ui-monospace" fill="#334155">
          T &amp;&amp; F → F
        </text>
        <text x="40" y="96" fontSize="9" fontFamily="ui-monospace" fill="#334155">
          F &amp;&amp; T → F · F &amp;&amp; F → F
        </text>

        <rect x="272" y="24" width="232" height="80" rx="10" fill="#ffffff" stroke="#94a3b8" filter={`url(#${p}-shadow)`} />
        <text x="388" y="44" textAnchor="middle" fontSize="10" fontWeight="800" fill="#0f172a">
          OR ||
        </text>
        <text x="296" y="64" fontSize="9" fontFamily="ui-monospace" fill="#334155">
          T || T → T
        </text>
        <text x="296" y="80" fontSize="9" fontFamily="ui-monospace" fill="#334155">
          T || F → T · F || T → T
        </text>
        <text x="296" y="96" fontSize="9" fontFamily="ui-monospace" fill="#334155">
          F || F → F
        </text>
      </svg>
    </figure>
  );
}

/** Pre vs post increment */
export function UnaryPrePostDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro" role="img" aria-label="Pre increment versus post increment">
      <figcaption className="flowchart-pro-title">Unary ++ and --: order matters</figcaption>
      <svg viewBox="0 0 520 150" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="20" y="28" width="230" height="100" rx="12" fill={`url(#${p}-node-top)`} stroke="#94a3b8" filter={`url(#${p}-shadow)`} />
        <text x="135" y="52" textAnchor="middle" fontSize="10" fontWeight="800" fill="#0f172a" fontFamily="ui-monospace">
          x++ (post)
        </text>
        <text x="36" y="76" fontSize="9" fill="#475569" fontFamily="system-ui">
          Use current value of x, then add 1.
        </text>
        <text x="36" y="96" fontSize="8" fill="#64748b" fontFamily="ui-monospace">
          println(x++); // prints old x
        </text>

        <rect x="270" y="28" width="230" height="100" rx="12" fill={`url(#${p}-node-accent)`} stroke="#2563eb" filter={`url(#${p}-shadow)`} />
        <text x="385" y="52" textAnchor="middle" fontSize="10" fontWeight="800" fill="#1e3a8a" fontFamily="ui-monospace">
          ++x (pre)
        </text>
        <text x="286" y="76" fontSize="9" fill="#475569" fontFamily="system-ui">
          Add 1 first, then use the new value.
        </text>
        <text x="286" y="96" fontSize="8" fill="#1e40af" fontFamily="ui-monospace">
          println(++x); // prints new x
        </text>

        <text x="260" y="138" textAnchor="middle" fontSize="8" fill="#64748b" fontFamily="system-ui">
          Tip: use ++/-- alone on its own line until you are comfortable.
        </text>
      </svg>
    </figure>
  );
}

/** Ternary conditional operator */
export function TernaryOperatorDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro" role="img" aria-label="Ternary operator flow">
      <figcaption className="flowchart-pro-title">Ternary: condition ? ifTrue : ifFalse</figcaption>
      <svg viewBox="0 0 400 200" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="120" y="16" width="160" height="40" rx="10" fill="#0f172a" stroke="#334155" filter={`url(#${p}-shadow)`} />
        <text x="200" y="34" textAnchor="middle" fontSize="12" fontWeight="800" fill="#f8fafc" fontFamily="ui-monospace">
          condition ?
        </text>
        <text x="200" y="48" textAnchor="middle" fontSize="8" fill="#94a3b8" fontFamily="system-ui">
          boolean expression
        </text>

        <line x1="200" y1="58" x2="200" y2="72" stroke="#2563eb" strokeWidth="2" />
        <line x1="200" y1="72" x2="96" y2="108" stroke="#2563eb" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <line x1="200" y1="72" x2="304" y2="108" stroke="#2563eb" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />

        <rect x="36" y="112" width="120" height="44" rx="10" fill="#ecfdf5" stroke="#22c55e" />
        <text x="96" y="132" textAnchor="middle" fontSize="10" fontWeight="700" fill="#166534" fontFamily="system-ui">
          valueIfTrue
        </text>
        <text x="96" y="148" textAnchor="middle" fontSize="8" fill="#15803d" fontFamily="system-ui">
          before :
        </text>

        <rect x="244" y="112" width="120" height="44" rx="10" fill="#fef3c7" stroke="#d97706" />
        <text x="304" y="132" textAnchor="middle" fontSize="10" fontWeight="700" fill="#92400e" fontFamily="system-ui">
          valueIfFalse
        </text>
        <text x="304" y="148" textAnchor="middle" fontSize="8" fill="#b45309" fontFamily="system-ui">
          after :
        </text>

        <line x1="96" y1="168" x2="200" y2="182" stroke="#64748b" strokeWidth="1.5" />
        <line x1="304" y1="168" x2="200" y2="182" stroke="#64748b" strokeWidth="1.5" />
        <text x="200" y="196" textAnchor="middle" fontSize="9" fill="#0f172a" fontFamily="system-ui">
          whole expression has one type (both branches must be compatible)
        </text>
      </svg>
    </figure>
  );
}

/** Operator precedence (highest to lowest) — matches lesson list */
export function OperatorPrecedenceDiagram() {
  const p = useSvgPrefix();
  const levels = [
    { rank: '1', label: '( )', sub: 'parentheses first' },
    { rank: '2', label: '++ -- !', sub: 'unary' },
    { rank: '3', label: '* / %', sub: 'multiplicative' },
    { rank: '4', label: '+ -', sub: 'additive' },
    { rank: '5', label: '< > <= >=', sub: 'relational' },
    { rank: '6', label: '== !=', sub: 'equality' },
    { rank: '7', label: '&&', sub: 'logical AND' },
    { rank: '8', label: '||', sub: 'logical OR' },
    { rank: '9', label: '= += -= …', sub: 'assignment last' }
  ];
  const w = 380;
  const rowH = 30;
  const pad = 16;
  const totalH = pad * 2 + levels.length * rowH;

  return (
    <figure className="flowchart-pro flowchart-pro-vertical" role="img" aria-label="Java operator precedence order">
      <figcaption className="flowchart-pro-title">Precedence (highest → lowest)</figcaption>
      <svg viewBox={`0 0 ${w} ${totalH}`} className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        {levels.map((lv, i) => {
          const y = pad + i * rowH;
          return (
            <g key={lv.rank}>
              <rect x="48" y={y} width="36" height="22" rx="6" fill="#2563eb" />
              <text x="66" y={y + 15} textAnchor="middle" fontSize="10" fontWeight="800" fill="#ffffff" fontFamily="system-ui">
                {lv.rank}
              </text>
              <rect x="92" y={y} width="240" height="22" rx="6" fill={`url(#${p}-node-top)`} stroke="#94a3b8" />
              <text x="100" y={y + 15} fontSize="10" fontWeight="700" fill="#0f172a" fontFamily="ui-monospace">
                {lv.label}
              </text>
              <text x="300" y={y + 15} fontSize="8" fill="#64748b" fontFamily="system-ui">
                {lv.sub}
              </text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}

/** Method signature anatomy (Methods lesson) */
export function MethodAnatomyDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro" role="img" aria-label="Parts of a method declaration">
      <figcaption className="flowchart-pro-title">Method declaration anatomy</figcaption>
      <svg viewBox="0 0 560 168" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="24" y="88" width="512" height="40" rx="8" fill="#0f172a" stroke="#334155" filter={`url(#${p}-shadow)`} />
        <text x="40" y="112" fontSize="11" fill="#f8fafc" fontFamily="ui-monospace">
          public static int add(int a, int b) {'{'}
        </text>

        <rect x="40" y="84" width="44" height="3" rx="1" fill="#60a5fa" />
        <rect x="92" y="84" width="44" height="3" rx="1" fill="#a78bfa" />
        <rect x="144" y="84" width="24" height="3" rx="1" fill="#34d399" />
        <rect x="176" y="84" width="28" height="3" rx="1" fill="#fbbf24" />
        <rect x="212" y="84" width="120" height="3" rx="1" fill="#f472b6" />

        <line x1="62" y1="80" x2="62" y2="44" stroke="#2563eb" strokeWidth="1.5" />
        <rect x="20" y="16" width="84" height="26" rx="8" fill={`url(#${p}-node-top)`} stroke="#94a3b8" />
        <text x="62" y="32" textAnchor="middle" fontSize="8" fontWeight="700" fill="#0f172a">
          Access
        </text>

        <line x1="114" y1="80" x2="114" y2="44" stroke="#2563eb" strokeWidth="1.5" />
        <rect x="72" y="16" width="84" height="26" rx="8" fill={`url(#${p}-node-top)`} stroke="#94a3b8" />
        <text x="114" y="32" textAnchor="middle" fontSize="8" fontWeight="700" fill="#0f172a">
          static
        </text>

        <line x1="156" y1="80" x2="156" y2="44" stroke="#2563eb" strokeWidth="1.5" />
        <rect x="124" y="16" width="64" height="26" rx="8" fill={`url(#${p}-node-top)`} stroke="#94a3b8" />
        <text x="156" y="32" textAnchor="middle" fontSize="8" fontWeight="700" fill="#0f172a">
          Return
        </text>

        <line x1="190" y1="80" x2="190" y2="44" stroke="#2563eb" strokeWidth="1.5" />
        <rect x="152" y="16" width="76" height="26" rx="8" fill={`url(#${p}-node-top)`} stroke="#94a3b8" />
        <text x="190" y="32" textAnchor="middle" fontSize="8" fontWeight="700" fill="#0f172a">
          Name
        </text>

        <line x1="272" y1="80" x2="272" y2="44" stroke="#2563eb" strokeWidth="1.5" />
        <rect x="210" y="16" width="124" height="26" rx="8" fill={`url(#${p}-node-accent)`} stroke="#2563eb" />
        <text x="272" y="32" textAnchor="middle" fontSize="8" fontWeight="700" fill="#1e3a8a">
          Parameters
        </text>

        <text x="280" y="152" textAnchor="middle" fontSize="9" fill="#64748b" fontFamily="system-ui">
          Body + optional return value (or void / early return)
        </text>
      </svg>
    </figure>
  );
}

/** Parameters (definition) vs arguments (call site) */
export function ParametersVsArgumentsDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro" role="img" aria-label="Parameters versus arguments">
      <figcaption className="flowchart-pro-title">Parameters vs arguments</figcaption>
      <svg viewBox="0 0 520 150" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <text x="24" y="36" fontSize="10" fontWeight="800" fill="#1e3a8a" fontFamily="system-ui">
          Definition (parameters)
        </text>
        <rect x="24" y="44" width="472" height="32" rx="8" fill={`url(#${p}-node-accent)`} stroke="#2563eb" />
        <text x="36" y="64" fontSize="11" fill="#0f172a" fontFamily="ui-monospace">
          int add(int a, int b) {'{'} … {'}'}
        </text>

        <text x="24" y="104" fontSize="10" fontWeight="800" fill="#166534" fontFamily="system-ui">
          Call site (arguments)
        </text>
        <rect x="24" y="112" width="472" height="32" rx="8" fill="#ecfdf5" stroke="#22c55e" />
        <text x="36" y="132" fontSize="11" fill="#0f172a" fontFamily="ui-monospace">
          int result = add(5, 3);
        </text>
        <text x="320" y="132" fontSize="9" fill="#15803d" fontFamily="system-ui">
          5 and 3 are arguments
        </text>
      </svg>
    </figure>
  );
}

/** Method overloading: same name, different parameter lists */
export function MethodOverloadingDiagram() {
  const p = useSvgPrefix();
  const sigs = [
    'add(int a, int b)',
    'add(int a, int b, int c)',
    'add(double a, double b)'
  ];
  return (
    <figure className="flowchart-pro" role="img" aria-label="Method overloading resolution">
      <FlowchartFigcaption
        title="Overloading — same method name, different parameters"
        fresher="Java tells methods apart by the parameter list (number and types), not by the return type alone. When you call add(...), the compiler matches the version that fits what you passed in."
      />
      <svg viewBox="0 0 440 200" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        {sigs.map((s, i) => {
          const y = 24 + i * 44;
          return (
            <g key={s}>
              <rect x="40" y={y} width="360" height="34" rx="8" fill={`url(#${p}-node-top)`} stroke="#94a3b8" filter={`url(#${p}-shadow)`} />
              <text x="52" y={y + 22} fontSize="10" fill="#0f172a" fontFamily="ui-monospace">
                int {s}
              </text>
            </g>
          );
        })}
        <text x="220" y="168" textAnchor="middle" fontSize="9" fill="#64748b" fontFamily="system-ui">
          Return type alone cannot distinguish overloads — only name + parameter types/count.
        </text>
      </svg>
    </figure>
  );
}

/** Pass-by-value: primitives vs object references */
export function PassByValueDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro" role="img" aria-label="Java pass by value for primitives and references">
      <figcaption className="flowchart-pro-title">Pass by value: copy goes into the method</figcaption>
      <svg viewBox="0 0 520 200" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="20" y="24" width="230" height="100" rx="10" fill="#fef2f2" stroke="#fca5a5" />
        <text x="135" y="48" textAnchor="middle" fontSize="10" fontWeight="800" fill="#991b1b" fontFamily="system-ui">
          Primitive int
        </text>
        <text x="32" y="72" fontSize="9" fill="#475569" fontFamily="system-ui">
          Caller&apos;s x is copied. Reassigning the parameter does not change x.
        </text>
        <text x="32" y="108" fontSize="9" fontFamily="ui-monospace" fill="#b91c1c">
          void f(int n) {'{'} n = 100; {'}'}
        </text>

        <rect x="270" y="24" width="230" height="100" rx="10" fill="#ecfdf5" stroke="#86efac" />
        <text x="385" y="48" textAnchor="middle" fontSize="10" fontWeight="800" fill="#166534" fontFamily="system-ui">
          Object reference
        </text>
        <text x="282" y="72" fontSize="9" fill="#475569" fontFamily="system-ui">
          The reference is copied, but it still points at the same object — mutations show through.
        </text>
        <text x="282" y="108" fontSize="9" fontFamily="ui-monospace" fill="#15803d">
          void g(int[] a) {'{'} a[0]=100; {'}'}
        </text>

        <text x="260" y="178" textAnchor="middle" fontSize="9" fill="#0f172a" fontFamily="system-ui">
          Same rule for both: always pass by value — for objects, value is the reference.
        </text>
      </svg>
    </figure>
  );
}

/** Local variable scope inside methods */
export function MethodScopeDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro" role="img" aria-label="Variable scope inside methods">
      <figcaption className="flowchart-pro-title">Scope: locals stay inside the method</figcaption>
      <svg viewBox="0 0 440 180" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="32" y="20" width="376" height="140" rx="12" fill={`url(#${p}-node-accent)`} stroke="#2563eb" filter={`url(#${p}-shadow)`} />
        <text x="220" y="44" textAnchor="middle" fontSize="11" fontWeight="800" fill="#1e3a8a" fontFamily="ui-monospace">
          class Demo
        </text>

        <rect x="52" y="58" width="160" height="88" rx="8" fill="#0f172a" stroke="#334155" />
        <text x="60" y="78" fontSize="9" fill="#94a3b8" fontFamily="ui-monospace">
          void methodA()
        </text>
        <text x="68" y="98" fontSize="10" fill="#f8fafc" fontFamily="ui-monospace">
          int x = 10;
        </text>
        <text x="68" y="128" fontSize="8" fill="#94a3b8" fontFamily="system-ui">
          x lives here only
        </text>

        <rect x="228" y="58" width="160" height="88" rx="8" fill="#ffffff" stroke="#94a3b8" strokeDasharray="6 4" />
        <text x="236" y="78" fontSize="9" fill="#64748b" fontFamily="ui-monospace">
          void methodB()
        </text>
        <text x="244" y="108" fontSize="9" fill="#b91c1c" fontFamily="ui-monospace">
          x  // compile error
        </text>
      </svg>
    </figure>
  );
}

/** return exits and sends value to caller */
export function ReturnStatementFlowDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro" role="img" aria-label="Return statement flow">
      <figcaption className="flowchart-pro-title">return: exit + optional value</figcaption>
      <svg viewBox="0 0 400 200" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="40" y="28" width="120" height="44" rx="10" fill={`url(#${p}-node-top)`} stroke="#94a3b8" />
        <text x="100" y="48" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0f172a" fontFamily="system-ui">
          Caller
        </text>
        <text x="100" y="64" textAnchor="middle" fontSize="8" fill="#64748b" fontFamily="system-ui">
          int r = add(…);
        </text>

        <line x1="162" y1="50" x2="218" y2="50" stroke="#2563eb" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />

        <rect x="228" y="28" width="140" height="72" rx="10" fill="#0f172a" stroke="#334155" filter={`url(#${p}-shadow)`} />
        <text x="298" y="52" textAnchor="middle" fontSize="9" fill="#94a3b8" fontFamily="ui-monospace">
          int add(…) {'{'}
        </text>
        <text x="240" y="72" fontSize="10" fill="#f8fafc" fontFamily="ui-monospace">
          return a + b;
        </text>
        <text x="298" y="92" textAnchor="middle" fontSize="8" fill="#94a3b8" fontFamily="system-ui">
          exits immediately
        </text>

        <line x1="298" y1="102" x2="298" y2="128" stroke="#2563eb" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />

        <rect x="218" y="136" width="160" height="36" rx="8" fill="#ecfdf5" stroke="#22c55e" />
        <text x="298" y="158" textAnchor="middle" fontSize="10" fontWeight="700" fill="#166534" fontFamily="system-ui">
          Value back to caller
        </text>

        <text x="200" y="188" textAnchor="middle" fontSize="8" fill="#64748b" fontFamily="system-ui">
          void methods: use return; for early exit (no value).
        </text>
      </svg>
    </figure>
  );
}

/** Java keywords grouped by intent */
export function KeywordCategoryMapDiagram() {
  const p = useSvgPrefix();
  const rows = [
    ['Types', 'int, double, boolean, void'],
    ['Access', 'public, private, protected'],
    ['Class/OOP', 'class, interface, extends, implements'],
    ['Control flow', 'if, else, for, while, switch'],
    ['Exceptions', 'try, catch, finally, throw, throws'],
    ['Modifiers', 'static, final, abstract, synchronized'],
    ['Package', 'package, import']
  ];
  return (
    <figure className="flowchart-pro" role="img" aria-label="Java keyword categories">
      <figcaption className="flowchart-pro-title">Keywords by purpose</figcaption>
      <svg viewBox="0 0 540 280" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        {rows.map((row, i) => {
          const y = 16 + i * 36;
          return (
            <g key={row[0]}>
              <rect x="16" y={y} width="130" height="26" rx="7" fill={`url(#${p}-node-accent)`} stroke="#3b82f6" />
              <text x="81" y={y + 17} textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e3a8a" fontFamily="system-ui">
                {row[0]}
              </text>
              <rect x="158" y={y} width="366" height="26" rx="7" fill={`url(#${p}-node-top)`} stroke="#94a3b8" />
              <text x="170" y={y + 17} fontSize="9" fill="#334155" fontFamily="ui-monospace">
                {row[1]}
              </text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}

/** this vs super quick visual */
export function ThisSuperDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro" role="img" aria-label="this and super reference meanings">
      <figcaption className="flowchart-pro-title">`this` vs `super`</figcaption>
      <svg viewBox="0 0 520 170" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="22" y="28" width="232" height="108" rx="12" fill="#eff6ff" stroke="#60a5fa" filter={`url(#${p}-shadow)`} />
        <text x="138" y="52" textAnchor="middle" fontSize="11" fontWeight="800" fill="#1e3a8a" fontFamily="system-ui">
          this
        </text>
        <text x="36" y="78" fontSize="9" fill="#0f172a" fontFamily="ui-monospace">
          this.name = name;
        </text>
        <text x="36" y="98" fontSize="8" fill="#334155" fontFamily="system-ui">
          Refers to current object
        </text>

        <rect x="266" y="28" width="232" height="108" rx="12" fill="#ecfdf5" stroke="#22c55e" filter={`url(#${p}-shadow)`} />
        <text x="382" y="52" textAnchor="middle" fontSize="11" fontWeight="800" fill="#166534" fontFamily="system-ui">
          super
        </text>
        <text x="280" y="78" fontSize="9" fill="#0f172a" fontFamily="ui-monospace">
          super.speak();
        </text>
        <text x="280" y="98" fontSize="8" fill="#334155" fontFamily="system-ui">
          Refers to parent class member
        </text>
      </svg>
    </figure>
  );
}

/** throw vs throws side-by-side */
export function ThrowThrowsDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro" role="img" aria-label="Difference between throw and throws">
      <FlowchartFigcaption
        title="throw vs throws — action vs declaration"
        fresher="throw actually creates/aborts with an exception object at that line. throws only lists what a method might propagate so callers know they must handle or declare those checked types."
      />
      <svg viewBox="0 0 520 170" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="20" y="28" width="234" height="112" rx="12" fill="#fef2f2" stroke="#fca5a5" filter={`url(#${p}-shadow)`} />
        <text x="137" y="52" textAnchor="middle" fontSize="11" fontWeight="800" fill="#991b1b">throw</text>
        <text x="34" y="76" fontSize="9" fontFamily="ui-monospace" fill="#0f172a">
          throw new IOException();
        </text>
        <text x="34" y="96" fontSize="8" fill="#7f1d1d" fontFamily="system-ui">
          Actually raises an exception now
        </text>

        <rect x="266" y="28" width="234" height="112" rx="12" fill="#fffbeb" stroke="#f59e0b" filter={`url(#${p}-shadow)`} />
        <text x="383" y="52" textAnchor="middle" fontSize="11" fontWeight="800" fill="#92400e">throws</text>
        <text x="280" y="76" fontSize="9" fontFamily="ui-monospace" fill="#0f172a">
          void read() throws IOException
        </text>
        <text x="280" y="96" fontSize="8" fill="#78350f" fontFamily="system-ui">
          Declares possibility in signature
        </text>
      </svg>
    </figure>
  );
}

/** Decision chain visual (if / else-if / else) */
export function DecisionChainDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro" role="img" aria-label="If else-if else decision chain">
      <FlowchartFigcaption
        title="If / else-if / else — first true branch wins"
        fresher="Read from top to bottom. Each diamond asks a yes/no question. “Yes” usually goes to the right (do that block). “No” goes down to try the next check. The bottom orange box is the fallback when nothing above was true."
      />
      <svg viewBox="0 0 420 288" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <polygon points="210,18 282,62 210,106 138,62" fill={`url(#${p}-node-accent)`} stroke="#2563eb" strokeWidth="1.4" />
        <text x="210" y="63" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e3a8a">if (cond1)</text>

        <line x1="282" y1="62" x2="356" y2="62" stroke="#2563eb" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <text x="318" y="56" textAnchor="middle" fontSize="8" fontWeight="700" fill="#15803d" fontFamily="system-ui">
          YES
        </text>
        <rect x="358" y="46" width="50" height="30" rx="8" fill="#ecfdf5" stroke="#22c55e" />
        <text x="383" y="64" textAnchor="middle" fontSize="9" fill="#166534">then A</text>

        <line x1="210" y1="106" x2="210" y2="132" stroke="#2563eb" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <text x="222" y="124" fontSize="8" fontWeight="700" fill="#64748b" fontFamily="system-ui">
          NO
        </text>
        <polygon points="210,136 282,178 210,220 138,178" fill={`url(#${p}-node-top)`} stroke="#94a3b8" strokeWidth="1.2" />
        <text x="210" y="179" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0f172a">else if (cond2)</text>
        <line x1="282" y1="178" x2="356" y2="178" stroke="#2563eb" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <text x="318" y="172" textAnchor="middle" fontSize="8" fontWeight="700" fill="#15803d" fontFamily="system-ui">
          YES
        </text>
        <rect x="358" y="162" width="50" height="30" rx="8" fill="#ecfdf5" stroke="#22c55e" />
        <text x="383" y="180" textAnchor="middle" fontSize="9" fill="#166534">then B</text>

        <line x1="210" y1="220" x2="210" y2="238" stroke="#2563eb" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <text x="222" y="232" fontSize="8" fontWeight="700" fill="#64748b" fontFamily="system-ui">
          NO
        </text>

        <rect x="150" y="242" width="120" height="36" rx="10" fill="#fff7ed" stroke="#ea580c" strokeWidth="1.3" filter={`url(#${p}-shadow)`} />
        <text x="210" y="260" textAnchor="middle" fontSize="10" fontWeight="800" fill="#9a3412" fontFamily="ui-monospace">
          else
        </text>
        <text x="210" y="272" textAnchor="middle" fontSize="8" fill="#c2410c" fontFamily="system-ui">
          when nothing matched
        </text>
      </svg>
    </figure>
  );
}

/** Switch route fan-out */
export function SwitchRoutingDiagram() {
  const p = useSvgPrefix();
  const branches = [
    { x: 24, t: 'case A' },
    { x: 146, t: 'case B' },
    { x: 268, t: 'case C' },
    { x: 390, t: 'default' }
  ];
  return (
    <figure className="flowchart-pro" role="img" aria-label="Switch statement routing">
      <FlowchartFigcaption
        title="Switch — one value, many possible paths"
        fresher="You compute one value (for example day number or menu choice). Java jumps to exactly one matching case—like picking one lane at a junction. If nothing matches, default runs when you wrote it."
      />
      <svg viewBox="0 0 500 170" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="180" y="16" width="140" height="36" rx="10" fill={`url(#${p}-node-accent)`} stroke="#2563eb" />
        <text x="250" y="38" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e3a8a">switch (value)</text>
        {branches.map((b, i) => (
          <g key={b.t}>
            <line x1="250" y1="54" x2={b.x + 42} y2="90" stroke="#2563eb" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
            <rect x={b.x} y="94" width="84" height="34" rx="8" fill={i === 3 ? "#fff7ed" : `url(#${p}-node-top)`} stroke={i === 3 ? "#fb923c" : "#94a3b8"} />
            <text x={b.x + 42} y="115" textAnchor="middle" fontSize="9" fill="#0f172a" fontFamily="ui-monospace">{b.t}</text>
          </g>
        ))}
      </svg>
    </figure>
  );
}

/** Generic loop lifecycle */
export function LoopLifecycleDiagram({ mode = 'for' }) {
  const p = useSvgPrefix();
  const label = mode === 'do-while' ? 'do { body } while (cond)' : mode === 'while' ? 'while (cond) { body }' : 'for (init; cond; update)';
  const first = mode === 'do-while' ? 'body first' : 'condition first';
  const fresherByMode =
    mode === 'do-while'
      ? 'The body runs at least once, then the condition decides whether to repeat. Follow the green “body” box, then the arrows that loop back up.'
      : mode === 'while'
        ? 'The condition is checked before each repetition. If it is false at the start, the body may run zero times. True → run body → go back and check again.'
        : 'One round: check the condition → if true, run the body → update → check again. Stop when the condition becomes false.';

  return (
    <figure className="flowchart-pro" role="img" aria-label={`Loop lifecycle for ${mode}`}>
      <FlowchartFigcaption title={`${mode} loop — what happens each round`} fresher={fresherByMode} />
      <svg viewBox="0 0 420 198" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="88" y="14" width="244" height="30" rx="8" fill={`url(#${p}-node-accent)`} stroke="#2563eb" />
        <text x="210" y="33" textAnchor="middle" fontSize="9" fontWeight="700" fill="#1e3a8a" fontFamily="ui-monospace">{label}</text>
        <text x="210" y="56" textAnchor="middle" fontSize="8" fill="#64748b">{first}</text>

        <polygon points="210,68 272,102 210,136 148,102" fill={`url(#${p}-node-top)`} stroke="#94a3b8" />
        <text x="210" y="104" textAnchor="middle" fontSize="9" fontWeight="700" fill="#0f172a">cond?</text>

        <line x1="272" y1="102" x2="358" y2="102" stroke="#2563eb" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <text x="312" y="96" textAnchor="middle" fontSize="8" fontWeight="700" fill="#15803d" fontFamily="system-ui">
          true
        </text>
        <rect x="360" y="86" width="46" height="32" rx="8" fill="#ecfdf5" stroke="#22c55e" />
        <text x="383" y="106" textAnchor="middle" fontSize="9" fill="#166534">body</text>
        <line x1="383" y1="120" x2="383" y2="146" stroke="#2563eb" strokeWidth="2" />
        <line x1="383" y1="146" x2="210" y2="146" stroke="#2563eb" strokeWidth="2" />
        <line x1="210" y1="146" x2="210" y2="138" stroke="#2563eb" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <text x="295" y="154" textAnchor="middle" fontSize="8" fill="#64748b" fontFamily="system-ui">
          loop back
        </text>
        <text x="210" y="190" textAnchor="middle" fontSize="8" fill="#64748b" fontFamily="system-ui">
          If condition is false → exit the loop (simplified chart; full flowcharts add a “false” arrow out)
        </text>
      </svg>
    </figure>
  );
}

/** for (init; cond; update) — three slots in one line */
export function ForLoopThreePartsDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro" role="img" aria-label="For loop three parts">
      <FlowchartFigcaption
        title="For loop — three slots in the header"
        fresher="The code in parentheses has three pieces separated by semicolons: set up once, test before each lap, then change the counter after the body. Your lecture notes often write “init; condition; update”."
      />
      <svg viewBox="0 0 560 200" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="16" y="24" width="150" height="52" rx="10" fill={`url(#${p}-node-accent)`} stroke="#2563eb" filter={`url(#${p}-shadow)`} />
        <text x="91" y="48" textAnchor="middle" fontSize="10" fontWeight="800" fill="#1e3a8a" fontFamily="system-ui">
          1 · Init
        </text>
        <text x="91" y="66" textAnchor="middle" fontSize="9" fill="#1e40af" fontFamily="ui-monospace">
          int i = 0
        </text>

        <rect x="198" y="24" width="150" height="52" rx="10" fill={`url(#${p}-node-top)`} stroke="#94a3b8" filter={`url(#${p}-shadow)`} />
        <text x="273" y="48" textAnchor="middle" fontSize="10" fontWeight="800" fill="#0f172a" fontFamily="system-ui">
          2 · Condition
        </text>
        <text x="273" y="66" textAnchor="middle" fontSize="9" fill="#334155" fontFamily="ui-monospace">
          i &lt; n
        </text>

        <rect x="380" y="24" width="164" height="52" rx="10" fill="#ecfdf5" stroke="#22c55e" filter={`url(#${p}-shadow)`} />
        <text x="462" y="48" textAnchor="middle" fontSize="10" fontWeight="800" fill="#166534" fontFamily="system-ui">
          3 · Update
        </text>
        <text x="462" y="66" textAnchor="middle" fontSize="9" fill="#14532d" fontFamily="ui-monospace">
          i++
        </text>

        <line x1="166" y1="50" x2="196" y2="50" stroke="#2563eb" strokeWidth="2.2" markerEnd={`url(#${p}-arrowhead)`} />
        <line x1="348" y1="50" x2="378" y2="50" stroke="#2563eb" strokeWidth="2.2" markerEnd={`url(#${p}-arrowhead)`} />

        <rect x="198" y="104" width="346" height="44" rx="10" fill="#0f172a" stroke="#334155" />
        <text x="371" y="126" textAnchor="middle" fontSize="10" fontWeight="700" fill="#f8fafc" fontFamily="system-ui">
          Loop body (runs while condition is true)
        </text>
        <text x="371" y="142" textAnchor="middle" fontSize="8" fill="#94a3b8" fontFamily="ui-monospace">
          {'{ }'} statements
        </text>

        <line x1="462" y1="76" x2="462" y2="96" stroke="#22c55e" strokeWidth="2" />
        <path d="M 462 96 L 462 118 L 91 118 L 91 76" fill="none" stroke="#22c55e" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <text x="270" y="112" textAnchor="middle" fontSize="8" fill="#15803d" fontFamily="system-ui">
          after body → update runs → check condition again
        </text>

        <line x1="273" y1="76" x2="273" y2="100" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 3" />
        <line x1="273" y1="100" x2="273" y2="104" stroke="#64748b" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <text x="285" y="96" fontSize="7" fill="#64748b">
          enter body
        </text>
      </svg>
    </figure>
  );
}

/** while vs do-while: check timing side by side */
export function WhileVsDoWhileCompareDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro" role="img" aria-label="While versus do-while comparison">
      <FlowchartFigcaption
        title="While vs do-while — when does the body run?"
        fresher="Left: condition first → you might skip the body completely. Right: body first → you always run it once, then ask whether to repeat. Pick based on whether “zero times” is allowed."
      />
      <svg viewBox="0 0 520 220" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <text x="130" y="22" textAnchor="middle" fontSize="11" fontWeight="800" fill="#1e3a8a" fontFamily="system-ui">
          while (cond)
        </text>
        <polygon points="130,34 182,72 130,110 78,72" fill={`url(#${p}-node-accent)`} stroke="#2563eb" />
        <text x="130" y="76" textAnchor="middle" fontSize="9" fontWeight="700" fill="#1e3a8a">cond?</text>
        <line x1="182" y1="72" x2="218" y2="72" stroke="#2563eb" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <rect x="220" y="56" width="56" height="32" rx="8" fill="#ecfdf5" stroke="#22c55e" />
        <text x="248" y="76" textAnchor="middle" fontSize="9" fill="#166534">body</text>
        <path d="M 248 88 L 248 130 L 130 130 L 130 110" fill="none" stroke="#15803d" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <line x1="78" y1="72" x2="38" y2="72" stroke="#64748b" strokeWidth="2" />
        <text x="24" y="76" fontSize="8" fill="#64748b">
          exit
        </text>
        <text x="130" y="128" textAnchor="middle" fontSize="8" fill="#475569" fontFamily="system-ui">
          0 or more iterations
        </text>

        <text x="390" y="22" textAnchor="middle" fontSize="11" fontWeight="800" fill="#9a3412" fontFamily="system-ui">
          do … while (cond)
        </text>
        <rect x="318" y="40" width="72" height="36" rx="8" fill="#ecfdf5" stroke="#22c55e" />
        <text x="354" y="62" textAnchor="middle" fontSize="9" fill="#166534">body</text>
        <line x1="390" y1="76" x2="390" y2="92" stroke="#2563eb" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <polygon points="390,96 442,134 390,172 338,134" fill="#fff7ed" stroke="#ea580c" strokeWidth="1.2" />
        <text x="390" y="138" textAnchor="middle" fontSize="9" fontWeight="700" fill="#9a3412">cond?</text>
        <line x1="442" y1="134" x2="478" y2="134" stroke="#2563eb" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <text x="492" y="138" fontSize="8" fill="#64748b">
          exit
        </text>
        <path d="M 338 134 L 300 134 L 300 58 L 318 58" fill="none" stroke="#15803d" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <text x="390" y="196" textAnchor="middle" fontSize="8" fill="#475569" fontFamily="system-ui">
          1 or more iterations
        </text>
      </svg>
    </figure>
  );
}

/** break vs continue behavior */
export function BreakContinueTrackDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro" role="img" aria-label="break versus continue in loops">
      <FlowchartFigcaption
        title="break vs continue — inside a loop"
        fresher="break = stop the whole loop and jump to the code after the loop. continue = skip the rest of the current lap only, then start the next lap. Both only make sense inside loops (and break also in switch)."
      />
      <svg viewBox="0 0 520 160" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="28" y="28" width="210" height="108" rx="10" fill="#fef2f2" stroke="#fca5a5" />
        <text x="133" y="50" textAnchor="middle" fontSize="11" fontWeight="800" fill="#991b1b">break</text>
        <rect x="48" y="64" width="170" height="22" rx="6" fill="#fff" stroke="#fecaca" />
        <text x="133" y="79" textAnchor="middle" fontSize="9" fill="#7f1d1d" fontFamily="ui-monospace">exit loop now</text>
        <line x1="133" y1="88" x2="133" y2="126" stroke="#b91c1c" strokeWidth="2.3" markerEnd={`url(#${p}-arrowhead)`} />
        <text x="133" y="142" textAnchor="middle" fontSize="8" fill="#7f1d1d">jump after loop</text>

        <rect x="282" y="28" width="210" height="108" rx="10" fill="#ecfdf5" stroke="#86efac" />
        <text x="387" y="50" textAnchor="middle" fontSize="11" fontWeight="800" fill="#166534">continue</text>
        <rect x="302" y="64" width="170" height="22" rx="6" fill="#fff" stroke="#bbf7d0" />
        <text x="387" y="79" textAnchor="middle" fontSize="9" fill="#14532d" fontFamily="ui-monospace">skip current iteration</text>
        <line x1="387" y1="88" x2="387" y2="108" stroke="#15803d" strokeWidth="2.3" />
        <line x1="387" y1="108" x2="332" y2="108" stroke="#15803d" strokeWidth="2.3" />
        <line x1="332" y1="108" x2="332" y2="64" stroke="#15803d" strokeWidth="2.3" markerEnd={`url(#${p}-arrowhead)`} />
      </svg>
    </figure>
  );
}

/** Four pillars of OOP in one map */
export function OopPillarsDiagram() {
  const p = useSvgPrefix();
  const cards = [
    { x: 30, y: 40, t: 'Encapsulation', s: 'data + methods together', c: '#e0f2fe', b: '#38bdf8', f: '#0c4a6e' },
    { x: 282, y: 40, t: 'Inheritance', s: 'reuse via extends', c: '#ede9fe', b: '#a78bfa', f: '#4c1d95' },
    { x: 30, y: 150, t: 'Polymorphism', s: 'one interface, many forms', c: '#ecfdf5', b: '#86efac', f: '#14532d' },
    { x: 282, y: 150, t: 'Abstraction', s: 'show what, hide how', c: '#fff7ed', b: '#fdba74', f: '#9a3412' }
  ];
  return (
    <figure className="flowchart-pro" role="img" aria-label="Four pillars of object oriented programming">
      <FlowchartFigcaption
        title="Four pillars — vocabulary map"
        fresher="These four ideas work together: hide data safely, reuse and extend code, call one method name on different objects, and hide messy details behind a simple interface. You do not need all four in every tiny program—grow into them step by step."
      />
      <svg viewBox="0 0 520 270" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <circle cx="260" cy="130" r="42" fill={`url(#${p}-node-accent)`} stroke="#2563eb" strokeWidth="1.4" />
        <text x="260" y="127" textAnchor="middle" fontSize="12" fontWeight="800" fill="#1e3a8a">OOP</text>
        <text x="260" y="142" textAnchor="middle" fontSize="8" fill="#1e40af">design mindset</text>
        {cards.map((card) => (
          <g key={card.t}>
            <rect x={card.x} y={card.y} width="208" height="72" rx="12" fill={card.c} stroke={card.b} strokeWidth="1.3" filter={`url(#${p}-shadow)`} />
            <text x={card.x + 104} y={card.y + 27} textAnchor="middle" fontSize="10" fontWeight="800" fill={card.f}>
              {card.t}
            </text>
            <text x={card.x + 104} y={card.y + 44} textAnchor="middle" fontSize="8" fill={card.f} opacity="0.9">
              {card.s}
            </text>
            <line x1={card.x + (card.x < 260 ? 208 : 0)} y1={card.y + 36} x2="260" y2="130" stroke="#64748b" strokeWidth="1.6" />
          </g>
        ))}
      </svg>
    </figure>
  );
}

/** Parent-child hierarchy as an inheritance tree */
export function InheritanceHierarchyDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro" role="img" aria-label="Inheritance hierarchy tree">
      <FlowchartFigcaption
        title="Inheritance — parent above, children below"
        fresher="The parent class holds shared behavior (here, every animal can eat). Child classes add only what is special (bark, meow, fly). Lines show “is-a”: Dog is an Animal."
      />
      <svg viewBox="0 0 520 240" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <text x="260" y="14" textAnchor="middle" fontSize="8" fontWeight="700" fill="#64748b" fontFamily="system-ui">
          Parent (general)
        </text>
        <rect x="195" y="20" width="130" height="38" rx="10" fill={`url(#${p}-node-accent)`} stroke="#2563eb" />
        <text x="260" y="44" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e3a8a" fontFamily="ui-monospace">class Animal</text>

        <line x1="260" y1="58" x2="260" y2="90" stroke="#2563eb" strokeWidth="2" />
        <line x1="110" y1="90" x2="410" y2="90" stroke="#2563eb" strokeWidth="2" />
        <line x1="110" y1="90" x2="110" y2="114" stroke="#2563eb" strokeWidth="2" />
        <line x1="260" y1="90" x2="260" y2="114" stroke="#2563eb" strokeWidth="2" />
        <line x1="410" y1="90" x2="410" y2="114" stroke="#2563eb" strokeWidth="2" />

        <text x="260" y="108" textAnchor="middle" fontSize="8" fontWeight="700" fill="#64748b" fontFamily="system-ui">
          Children (more specific)
        </text>
        <rect x="44" y="116" width="132" height="84" rx="10" fill="#ecfdf5" stroke="#22c55e" />
        <text x="110" y="138" textAnchor="middle" fontSize="10" fontWeight="700" fill="#166534" fontFamily="ui-monospace">class Dog</text>
        <text x="110" y="156" textAnchor="middle" fontSize="8" fill="#14532d">inherits eat()</text>
        <text x="110" y="170" textAnchor="middle" fontSize="8" fill="#14532d">adds bark()</text>

        <rect x="194" y="116" width="132" height="84" rx="10" fill="#f0f9ff" stroke="#38bdf8" />
        <text x="260" y="138" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0c4a6e" fontFamily="ui-monospace">class Cat</text>
        <text x="260" y="156" textAnchor="middle" fontSize="8" fill="#155e75">inherits eat()</text>
        <text x="260" y="170" textAnchor="middle" fontSize="8" fill="#155e75">adds meow()</text>

        <rect x="344" y="116" width="132" height="84" rx="10" fill="#fff7ed" stroke="#fb923c" />
        <text x="410" y="138" textAnchor="middle" fontSize="10" fontWeight="700" fill="#9a3412" fontFamily="ui-monospace">class Bird</text>
        <text x="410" y="156" textAnchor="middle" fontSize="8" fill="#9a3412">inherits eat()</text>
        <text x="410" y="170" textAnchor="middle" fontSize="8" fill="#9a3412">adds fly()</text>
      </svg>
    </figure>
  );
}

/** Interface contract implemented by multiple classes */
export function InterfaceContractDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro" role="img" aria-label="Interface implemented by classes">
      <FlowchartFigcaption
        title="Interface — promise of behavior"
        fresher="The interface lists method names the outside world can call. Each class “implements” the interface by writing real method bodies. Dashed arrows mean “implements / fulfills this contract.”"
      />
      <svg viewBox="0 0 520 210" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="174" y="20" width="172" height="52" rx="10" fill={`url(#${p}-node-accent)`} stroke="#2563eb" />
        <text x="260" y="42" textAnchor="middle" fontSize="10" fontWeight="800" fill="#1e3a8a" fontFamily="ui-monospace">interface Payment</text>
        <text x="260" y="58" textAnchor="middle" fontSize="8" fill="#1e40af" fontFamily="ui-monospace">pay(amount)</text>

        <line x1="260" y1="72" x2="120" y2="110" stroke="#2563eb" strokeDasharray="5 3" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <line x1="260" y1="72" x2="260" y2="110" stroke="#2563eb" strokeDasharray="5 3" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <line x1="260" y1="72" x2="400" y2="110" stroke="#2563eb" strokeDasharray="5 3" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />

        <rect x="42" y="114" width="156" height="70" rx="10" fill="#ecfdf5" stroke="#22c55e" />
        <text x="120" y="138" textAnchor="middle" fontSize="10" fontWeight="700" fill="#166534" fontFamily="ui-monospace">CreditCardPayment</text>
        <text x="120" y="154" textAnchor="middle" fontSize="8" fill="#14532d">pay() with card API</text>

        <rect x="182" y="114" width="156" height="70" rx="10" fill="#f0f9ff" stroke="#38bdf8" />
        <text x="260" y="138" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0c4a6e" fontFamily="ui-monospace">UPIPayment</text>
        <text x="260" y="154" textAnchor="middle" fontSize="8" fill="#155e75">pay() with UPI</text>

        <rect x="322" y="114" width="156" height="70" rx="10" fill="#fff7ed" stroke="#fb923c" />
        <text x="400" y="138" textAnchor="middle" fontSize="10" fontWeight="700" fill="#9a3412" fontFamily="ui-monospace">CashPayment</text>
        <text x="400" y="154" textAnchor="middle" fontSize="8" fill="#9a3412">pay() with cash logic</text>
      </svg>
    </figure>
  );
}

/** String immutability: assigning “new” text creates a new object */
export function StringImmutabilityDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro" role="img" aria-label="String immutability">
      <FlowchartFigcaption
        title="Immutability — the old text does not change"
        fresher="A String value cannot be edited in place. When you “add” text, Java builds a brand-new String object. The variable then points to the new object; the old one is left behind until garbage collection."
      />
      <svg viewBox="0 0 520 200" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="32" y="36" width="140" height="44" rx="10" fill="#fef3c7" stroke="#d97706" filter={`url(#${p}-shadow)`} />
        <text x="102" y="58" textAnchor="middle" fontSize="9" fill="#92400e" fontFamily="ui-monospace">
          String s = &quot;Hi&quot;;
        </text>
        <text x="102" y="74" textAnchor="middle" fontSize="8" fill="#a16207" fontFamily="system-ui">
          object A in memory
        </text>

        <line x1="174" y1="58" x2="248" y2="58" stroke="#2563eb" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <text x="211" y="50" textAnchor="middle" fontSize="8" fontWeight="700" fill="#1d4ed8" fontFamily="system-ui">
          s = s + &quot;!&quot;
        </text>

        <rect x="252" y="36" width="236" height="44" rx="10" fill="#ecfdf5" stroke="#22c55e" filter={`url(#${p}-shadow)`} />
        <text x="370" y="58" textAnchor="middle" fontSize="9" fill="#14532d" fontFamily="ui-monospace">
          s now points to NEW object &quot;Hi!&quot;
        </text>
        <text x="370" y="74" textAnchor="middle" fontSize="8" fill="#166534" fontFamily="system-ui">
          object B (object A is unchanged, may be collected later)
        </text>

        <rect x="32" y="118" width="456" height="62" rx="10" fill="#f8fafc" stroke="#94a3b8" />
        <text x="260" y="142" textAnchor="middle" fontSize="9" fontWeight="700" fill="#0f172a" fontFamily="system-ui">
          Think: you never “erase” letters inside a String — you get a new String with the result.
        </text>
        <text x="260" y="162" textAnchor="middle" fontSize="8" fill="#64748b" fontFamily="system-ui">
          That is why heavy concatenation in loops is slow: many temporary objects.
        </text>
      </svg>
    </figure>
  );
}

/** String pool vs heap for literals and new String */
export function StringPoolHeapDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro" role="img" aria-label="String pool and heap">
      <FlowchartFigcaption
        title="String pool vs heap — why == surprises beginners"
        fresher="Literals like &quot;Hello&quot; may live in the string pool so equal literals can share one object. new String(&quot;Hello&quot;) always creates a separate object on the heap. Use equals() for text comparison, not ==."
      />
      <svg viewBox="0 0 520 230" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="40" y="28" width="200" height="100" rx="12" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.4" />
        <text x="140" y="50" textAnchor="middle" fontSize="10" fontWeight="800" fill="#1e3a8a" fontFamily="system-ui">
          String pool (special area)
        </text>
        <rect x="60" y="64" width="160" height="48" rx="8" fill="#ffffff" stroke="#93c5fd" />
        <text x="140" y="88" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0f172a" fontFamily="ui-monospace">
          &quot;Hello&quot;
        </text>
        <text x="140" y="104" textAnchor="middle" fontSize="8" fill="#64748b">
          one shared literal text
        </text>

        <line x1="140" y1="128" x2="100" y2="168" stroke="#2563eb" strokeWidth="1.5" markerEnd={`url(#${p}-arrowhead)`} />
        <text x="108" y="152" fontSize="8" fill="#1d4ed8" fontFamily="ui-monospace">
          String a = &quot;Hello&quot;;
        </text>
        <line x1="140" y1="128" x2="180" y2="168" stroke="#2563eb" strokeWidth="1.5" markerEnd={`url(#${p}-arrowhead)`} />
        <text x="188" y="152" fontSize="8" fill="#1d4ed8" fontFamily="ui-monospace">
          String b = &quot;Hello&quot;;
        </text>
        <text x="140" y="188" textAnchor="middle" fontSize="8" fill="#15803d" fontFamily="system-ui">
          a == b is often true (same pooled object)
        </text>

        <rect x="280" y="28" width="200" height="100" rx="12" fill="#fff7ed" stroke="#ea580c" strokeWidth="1.4" />
        <text x="380" y="50" textAnchor="middle" fontSize="10" fontWeight="800" fill="#9a3412" fontFamily="system-ui">
          Heap (regular objects)
        </text>
        <rect x="300" y="64" width="160" height="48" rx="8" fill="#ffffff" stroke="#fdba74" />
        <text x="380" y="88" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0f172a" fontFamily="ui-monospace">
          new String(&quot;Hello&quot;)
        </text>
        <text x="380" y="104" textAnchor="middle" fontSize="8" fill="#9a3412">
          separate object even if letters match
        </text>
        <text x="380" y="188" textAnchor="middle" fontSize="8" fill="#b45309" fontFamily="system-ui">
          Compare with equals(), not ==
        </text>
      </svg>
    </figure>
  );
}

/** Concat in loop vs StringBuilder — conceptual */
export function StringConcatVsBuilderDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro" role="img" aria-label="String concat in loop versus StringBuilder">
      <FlowchartFigcaption
        title="Loop concatenation — many objects vs one buffer"
        fresher="Each s = s + &quot;x&quot; builds a new String and throws away the old reference in the loop. StringBuilder keeps one internal array and grows it—far fewer objects. For many appends, prefer StringBuilder (single-threaded) or StringBuffer (thread-safe)."
      />
      <svg viewBox="0 0 560 200" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <text x="140" y="22" textAnchor="middle" fontSize="10" fontWeight="800" fill="#991b1b" fontFamily="system-ui">
          String + in a loop
        </text>
        <rect x="24" y="32" width="232" height="92" rx="10" fill="#fef2f2" stroke="#fca5a5" />
        <text x="140" y="54" textAnchor="middle" fontSize="8" fill="#7f1d1d" fontFamily="ui-monospace">
          for (...) s = s + &quot;a&quot;;
        </text>
        <text x="140" y="78" textAnchor="middle" fontSize="8" fill="#991b1b" fontFamily="system-ui">
          creates many temporary String objects
        </text>
        <text x="140" y="98" textAnchor="middle" fontSize="8" fill="#991b1b" fontFamily="system-ui">
          (slow, more GC work)
        </text>

        <text x="420" y="22" textAnchor="middle" fontSize="10" fontWeight="800" fill="#14532d" fontFamily="system-ui">
          StringBuilder
        </text>
        <rect x="304" y="32" width="232" height="92" rx="10" fill="#ecfdf5" stroke="#86efac" />
        <text x="420" y="54" textAnchor="middle" fontSize="8" fill="#14532d" fontFamily="ui-monospace">
          sb.append(&quot;a&quot;);
        </text>
        <text x="420" y="78" textAnchor="middle" fontSize="8" fill="#166534" fontFamily="system-ui">
          one mutable buffer, resizes when full
        </text>
        <text x="420" y="98" textAnchor="middle" fontSize="8" fill="#166534" fontFamily="system-ui">
          (fast for big text)
        </text>

        <rect x="24" y="136" width="512" height="52" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
        <text x="280" y="158" textAnchor="middle" fontSize="9" fill="#334155" fontFamily="system-ui">
          Rule of thumb: build text in a loop → StringBuilder. Display once → String is fine.
        </text>
        <text x="280" y="176" textAnchor="middle" fontSize="8" fill="#64748b" fontFamily="system-ui">
          Call sb.toString() when you need a final immutable String.
        </text>
      </svg>
    </figure>
  );
}

/** StringBuffer vs StringBuilder — when to pick which */
export function StringBufferVsBuilderDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro" role="img" aria-label="StringBuffer versus StringBuilder">
      <FlowchartFigcaption
        title="StringBuffer vs StringBuilder — same API, different threading"
        fresher="Both use an internal buffer you can append to. StringBuffer adds synchronization so many threads can safely touch one instance; StringBuilder skips that lock and is faster when only one thread uses it."
      />
      <svg viewBox="0 0 520 200" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="32" y="24" width="210" height="148" rx="12" fill="#ecfdf5" stroke="#16a34a" strokeWidth="1.3" />
        <text x="137" y="48" textAnchor="middle" fontSize="11" fontWeight="800" fill="#14532d" fontFamily="ui-monospace">
          StringBuffer
        </text>
        <text x="137" y="72" textAnchor="middle" fontSize="9" fill="#166534" fontFamily="system-ui">
          synchronized methods
        </text>
        <text x="137" y="92" textAnchor="middle" fontSize="8" fill="#15803d" fontFamily="system-ui">
          safe if several threads share one instance
        </text>
        <text x="137" y="118" textAnchor="middle" fontSize="8" fill="#64748b" fontFamily="system-ui">
          slightly slower (lock overhead)
        </text>

        <rect x="278" y="24" width="210" height="148" rx="12" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.3" />
        <text x="383" y="48" textAnchor="middle" fontSize="11" fontWeight="800" fill="#1e3a8a" fontFamily="ui-monospace">
          StringBuilder
        </text>
        <text x="383" y="72" textAnchor="middle" fontSize="9" fill="#1e40af" fontFamily="system-ui">
          not synchronized
        </text>
        <text x="383" y="92" textAnchor="middle" fontSize="8" fill="#1d4ed8" fontFamily="system-ui">
          best default for normal single-threaded code
        </text>
        <text x="383" y="118" textAnchor="middle" fontSize="8" fill="#64748b" fontFamily="system-ui">
          faster in typical apps
        </text>

        <text x="260" y="186" textAnchor="middle" fontSize="8" fill="#64748b" fontFamily="system-ui">
          Same append / insert / delete API — choose by whether multiple threads share the builder.
        </text>
      </svg>
    </figure>
  );
}

/** Methods grouped as a simple map (categories) */
export function StringMethodCategoriesDiagram() {
  const p = useSvgPrefix();
  const rows = [
    { y: 24, t: 'Read & measure', ex: 'length(), charAt(), codePointAt()' },
    { y: 68, t: 'Search & test', ex: 'contains(), indexOf(), startsWith(), endsWith()' },
    { y: 112, t: 'Compare text', ex: 'equals(), equalsIgnoreCase(), compareTo()' },
    { y: 156, t: 'Transform & split', ex: 'substring(), trim(), toLowerCase(), split(), replace()' }
  ];
  return (
    <figure className="flowchart-pro" role="img" aria-label="String method categories">
      <FlowchartFigcaption
        title="Method map — what to use when"
        fresher="You do not memorize every method on day one. Start with length, charAt, equals, and trim. Add search (contains / indexOf) and split when you process user input or files."
      />
      <svg viewBox="0 0 520 210" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        {rows.map((row) => (
          <g key={row.t}>
            <rect x="24" y={row.y} width="472" height="36" rx="8" fill={`url(#${p}-node-top)`} stroke="#94a3b8" filter={`url(#${p}-shadow)`} />
            <text x="36" y={row.y + 23} fontSize="10" fontWeight="800" fill="#0f172a" fontFamily="system-ui">
              {row.t}
            </text>
            <text x="200" y={row.y + 23} fontSize="8" fill="#475569" fontFamily="ui-monospace">
              {row.ex}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  );
}

/** 1D array: index vs length (classic fresher confusion) */
export function ArrayIndexLengthDiagram() {
  const p = useSvgPrefix();
  const vals = [10, 20, 30, 40];
  const cellW = 88;
  const startX = 48;
  const yBox = 72;
  return (
    <figure className="flowchart-pro" role="img" aria-label="Array indices and length">
      <FlowchartFigcaption
        title="Indexes start at 0 · length is a count"
        fresher="Valid indexes run from 0 to length−1. If length is 4, the last legal index is 3. arr[4] is out of bounds. Say “index” for position, “length” for how many slots."
      />
      <svg viewBox="0 0 520 200" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <text x="260" y="28" textAnchor="middle" fontSize="9" fontWeight="700" fill="#4338ca" fontFamily="system-ui">
          int[] arr = {'{ 10, 20, 30, 40 };'}
        </text>
        {vals.map((v, i) => {
          const x = startX + i * cellW;
          return (
            <g key={i}>
              <text x={x + cellW / 2} y={yBox - 8} textAnchor="middle" fontSize="9" fontWeight="800" fill="#4f46e5" fontFamily="ui-monospace">
                [{i}]
              </text>
              <rect x={x} y={yBox} width={cellW - 8} height="44" rx="8" fill={`url(#${p}-node-top)`} stroke="#6366f1" strokeWidth="1.2" filter={`url(#${p}-shadow)`} />
              <text x={x + (cellW - 8) / 2} y={yBox + 28} textAnchor="middle" fontSize="12" fontWeight="700" fill="#0f172a" fontFamily="ui-monospace">
                {v}
              </text>
            </g>
          );
        })}
        <text x="260" y="168" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e1b4b" fontFamily="system-ui">
          arr.length == 4 → legal indexes: 0, 1, 2, 3 only
        </text>
        <text x="260" y="186" textAnchor="middle" fontSize="8" fill="#64748b" fontFamily="system-ui">
          arr[arr.length - 1] is always the last element (here 40)
        </text>
      </svg>
    </figure>
  );
}

/** new T[n] default values by type */
export function ArrayDefaultValuesDiagram() {
  const p = useSvgPrefix();
  const rows = [
    { t: 'int, long, short, byte', v: '0' },
    { t: 'float / double', v: '0.0' },
    { t: 'boolean', v: 'false' },
    { t: 'Object references (e.g. String)', v: 'null' }
  ];
  return (
    <figure className="flowchart-pro" role="img" aria-label="Array default values after new">
      <FlowchartFigcaption
        title="new T[size] — what is inside before you assign?"
        fresher="When you allocate with new, Java fills the array with a default for that type. Numbers become 0, boolean false, object slots null. You then overwrite slots with real values."
      />
      <svg viewBox="0 0 520 200" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        {rows.map((row, i) => {
          const y = 28 + i * 40;
          return (
            <g key={row.t}>
              <rect x="32" y={y} width="456" height="34" rx="8" fill={i % 2 === 0 ? '#eef2ff' : '#ffffff'} stroke="#c7d2fe" />
              <text x="48" y={y + 22} fontSize="9" fontWeight="600" fill="#312e81" fontFamily="system-ui">
                {row.t}
              </text>
              <text x="460" y={y + 22} textAnchor="end" fontSize="10" fontWeight="700" fill="#4338ca" fontFamily="ui-monospace">
                default → {row.v}
              </text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}

/** 2D array as rows and columns */
export function Array2DGridDiagram() {
  const p = useSvgPrefix();
  const rows = 3;
  const cols = 4;
  const cw = 36;
  const ch = 32;
  const ox = 140;
  const oy = 56;
  return (
    <figure className="flowchart-pro" role="img" aria-label="Two dimensional array grid">
      <FlowchartFigcaption
        title="2D array — think rows, then columns"
        fresher="int[][] m = new int[rows][cols] makes a grid. You usually read m[row][col]: first index picks the row, second picks the column. Nested loops (outer row, inner col) visit every cell."
      />
      <svg viewBox="0 0 520 220" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <text x="260" y="28" textAnchor="middle" fontSize="9" fontWeight="700" fill="#312e81" fontFamily="ui-monospace">
          int[][] m = new int[3][4];
        </text>
        {Array.from({ length: rows * cols }, (_, k) => {
          const r = Math.floor(k / cols);
          const c = k % cols;
          const x = ox + c * cw;
          const y = oy + r * ch;
          return (
            <rect
              key={`${r}-${c}`}
              x={x}
              y={y}
              width={cw - 4}
              height={ch - 4}
              rx="4"
              fill={r === 1 && c === 2 ? '#c7d2fe' : '#eef2ff'}
              stroke="#6366f1"
              strokeWidth="1"
            />
          );
        })}
        <text x="48" y="118" fontSize="8" fontWeight="700" fill="#4f46e5" fontFamily="system-ui">
          3 rows
        </text>
        <text x={ox + (cols * cw) / 2} y="48" textAnchor="middle" fontSize="8" fontWeight="700" fill="#4f46e5" fontFamily="system-ui">
          4 columns
        </text>
        <text x="260" y="198" textAnchor="middle" fontSize="8" fill="#64748b" fontFamily="system-ui">
          Example cell: m[1][2] — row 1, column 2 (highlighted)
        </text>
      </svg>
    </figure>
  );
}

/** java.util.Arrays helpers — mental map */
export function ArrayUtilityMethodsDiagram() {
  const p = useSvgPrefix();
  const rows = [
    { y: 24, t: 'Sort & search', ex: 'sort(), binarySearch() (sorted first)' },
    { y: 68, t: 'Copy & resize', ex: 'copyOf(), copyOfRange()' },
    { y: 112, t: 'Fill & compare', ex: 'fill(), equals(), deepEquals() for nested' },
    { y: 156, t: 'String & stream', ex: 'toString(), stream() (Java 8+)' }
  ];
  return (
    <figure className="flowchart-pro" role="img" aria-label="Arrays utility class categories">
      <FlowchartFigcaption
        title="java.util.Arrays — toolbox for array work"
        fresher="Arrays is a helper class full of static methods. It does not replace loops—you still learn indexing first—but it saves you from writing sort and binary search by hand."
      />
      <svg viewBox="0 0 520 210" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        {rows.map((row) => (
          <g key={row.t}>
            <rect x="24" y={row.y} width="472" height="36" rx="8" fill={`url(#${p}-node-top)`} stroke="#818cf8" filter={`url(#${p}-shadow)`} />
            <text x="36" y={row.y + 23} fontSize="10" fontWeight="800" fill="#312e81" fontFamily="system-ui">
              {row.t}
            </text>
            <text x="200" y={row.y + 23} fontSize="8" fill="#4338ca" fontFamily="ui-monospace">
              {row.ex}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  );
}

/** Full Java Throwable hierarchy (Object → Throwable → Exception / Error with common subclasses) */
export function ThrowableHierarchyDiagram() {
  const p = useSvgPrefix();
  const mono = 'ui-monospace, Consolas, monospace';
  const sans = 'system-ui, Segoe UI, sans-serif';

  const node = (x, y, w, h, fill, stroke, label, fs = 8.5, bold = true) => (
    <g key={`${x}-${y}-${label}`}>
      <rect x={x} y={y} width={w} height={h} rx="6" fill={fill} stroke={stroke} strokeWidth="1.1" filter={`url(#${p}-shadow)`} />
      <text
        x={x + w / 2}
        y={y + h / 2 + 3}
        textAnchor="middle"
        fontSize={fs}
        fontWeight={bold ? '700' : '500'}
        fill="#0f172a"
        fontFamily={mono}
      >
        {label}
      </text>
    </g>
  );

  const leaf = (x, y, text, indent = 0, small = false) => (
    <text
      key={`${x}-${y}-${text}`}
      x={x + indent}
      y={y}
      fontSize={small ? 7.2 : 7.8}
      fontWeight="500"
      fill="#1e293b"
      fontFamily={mono}
    >
      {text}
    </text>
  );

  return (
    <figure className="flowchart-pro flowchart-pro-hierarchy" role="img" aria-label="Java Throwable class hierarchy">
      <FlowchartFigcaption
        title="The Java Throwable hierarchy"
        fresher="All errors and exceptions extend Throwable. Exception is for conditions your app can catch; Error signals serious JVM problems you normally do not handle. Under Exception, RuntimeException and its subclasses are unchecked; IOException, SQLException, and many others are checked."
      />
      <svg viewBox="0 0 1080 520" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />

        {/* Top: Object → Throwable */}
        {node(490, 8, 100, 26, '#f1f5f9', '#64748b', 'Object', 9)}
        <line x1="540" y1="34" x2="540" y2="42" stroke="#475569" strokeWidth="1.8" />
        {node(482, 44, 116, 28, '#ede9fe', '#7c3aed', 'Throwable', 9.5)}

        {/* Spine from Throwable to split */}
        <line x1="540" y1="72" x2="540" y2="84" stroke="#475569" strokeWidth="1.8" />
        <line x1="270" y1="84" x2="810" y2="84" stroke="#475569" strokeWidth="1.5" />
        <line x1="270" y1="84" x2="270" y2="94" stroke="#475569" strokeWidth="1.5" />
        <line x1="810" y1="84" x2="810" y2="94" stroke="#475569" strokeWidth="1.5" />

        {/* Panel backgrounds */}
        <rect x="12" y="94" width="528" height="408" rx="12" fill="#f8fafc" stroke="#93c5fd" strokeWidth="1.2" opacity="0.95" />
        <rect x="540" y="94" width="528" height="408" rx="12" fill="#fafaf9" stroke="#a8a29e" strokeWidth="1.2" opacity="0.95" />

        <text x="276" y="112" textAnchor="middle" fontSize="11" fontWeight="800" fill="#1d4ed8" fontFamily={sans}>
          Exception
        </text>
        <text x="804" y="112" textAnchor="middle" fontSize="11" fontWeight="800" fill="#57534e" fontFamily={sans}>
          Error
        </text>

        {/* Legend strip */}
        <rect x="24" y="118" width="492" height="18" rx="4" fill="#eff6ff" stroke="#bfdbfe" />
        <text x="270" y="130" textAnchor="middle" fontSize="7.5" fill="#334155" fontFamily={sans}>
          Unchecked (rose) · Checked I/O (amber) · JDBC / servlet (violet)
        </text>
        <rect x="552" y="118" width="504" height="18" rx="4" fill="#f5f5f4" stroke="#d6d3d1" />
        <text x="804" y="130" textAnchor="middle" fontSize="7.5" fill="#57534e" fontFamily={sans}>
          JVM / linkage — do not catch in normal app code
        </text>

        {/* —— Exception branch: RuntimeException column —— */}
        <text x="28" y="154" fontSize="8" fontWeight="800" fill="#9f1239" fontFamily={sans}>
          RuntimeException (unchecked)
        </text>
        {node(24, 160, 212, 22, '#fff1f2', '#fb7185', 'RuntimeException', 8.5)}
        {leaf(32, 194, 'ArithmeticException')}
        {leaf(32, 208, 'NullPointerException')}
        {leaf(32, 222, 'IndexOutOfBoundsException')}
        {leaf(50, 236, 'ArrayIndexOutOfBoundsException', 0, true)}
        {leaf(50, 250, 'StringIndexOutOfBoundsException', 0, true)}
        {leaf(32, 266, 'IllegalArgumentException')}
        {leaf(50, 280, 'NumberFormatException', 0, true)}
        {leaf(32, 296, 'ClassCastException')}
        {leaf(32, 310, 'IllegalStateException')}

        {/* IOException + direct Exception children */}
        <text x="300" y="154" fontSize="8" fontWeight="800" fill="#a16207" fontFamily={sans}>
          IOException (checked)
        </text>
        {node(296, 160, 228, 22, '#fefce8', '#eab308', 'IOException', 8.5)}
        {leaf(304, 194, 'EOFException')}
        {leaf(304, 208, 'FileNotFoundException')}
        {leaf(304, 222, 'InterruptedIOException')}

        {node(296, 234, 228, 22, '#f5f3ff', '#8b5cf6', 'SQLException', 8.5)}
        {node(296, 264, 228, 22, '#eef2ff', '#6366f1', 'ServletException', 8.5)}

        {/* —— Error branch —— */}
        <text x="560" y="154" fontSize="8" fontWeight="800" fill="#44403c" fontFamily={sans}>
          Serious JVM / platform failures
        </text>
        {node(556, 160, 248, 22, '#f4f4f5', '#78716c', 'VirtualMachineError', 8)}
        {leaf(564, 194, 'OutOfMemoryError')}
        {leaf(564, 208, 'StackOverflowError')}
        {node(556, 222, 248, 22, '#f4f4f5', '#78716c', 'AssertionError', 8)}
        {node(556, 252, 248, 22, '#f4f4f5', '#78716c', 'LinkageError', 8)}
        {leaf(572, 286, 'VerifyError')}

        <text x="540" y="470" textAnchor="middle" fontSize="7.5" fill="#64748b" fontFamily={sans}>
          Object is the root of all classes; only Throwable and below can be used with throw / catch.
        </text>
      </svg>
    </figure>
  );
}

/** try / catch / finally execution order */
export function TryCatchFinallyFlowDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro" role="img" aria-label="Try catch finally flow">
      <FlowchartFigcaption
        title="try · catch · finally — order of execution"
        fresher="try runs risky code. If an exception matches a catch block, that catch runs. finally runs whether the try succeeded, failed, or returned—use it to release resources (close files, unlock)."
      />
      <svg viewBox="0 0 520 220" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="32" y="24" width="456" height="36" rx="8" fill="#dbeafe" stroke="#3b82f6" />
        <text x="260" y="46" textAnchor="middle" fontSize="10" fontWeight="800" fill="#1e3a8a" fontFamily="system-ui">
          {'1 · try { ... } — code that might throw'}
        </text>

        <line x1="260" y1="60" x2="260" y2="78" stroke="#2563eb" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />

        <rect x="32" y="82" width="456" height="36" rx="8" fill="#fef3c7" stroke="#f59e0b" />
        <text x="260" y="104" textAnchor="middle" fontSize="10" fontWeight="800" fill="#92400e" fontFamily="system-ui">
          2 · catch (Type e) — runs only if that type was thrown
        </text>

        <line x1="260" y1="118" x2="260" y2="136" stroke="#2563eb" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />

        <rect x="32" y="140" width="456" height="36" rx="8" fill="#ecfdf5" stroke="#22c55e" />
        <text x="260" y="162" textAnchor="middle" fontSize="10" fontWeight="800" fill="#14532d" fontFamily="system-ui">
          {'3 · finally { ... } — always runs (even after return in try)'}
        </text>

        <text x="260" y="200" textAnchor="middle" fontSize="8" fill="#64748b" fontFamily="system-ui">
          Put catch blocks from most specific to more general (subclass before parent).
        </text>
      </svg>
    </figure>
  );
}

/** Checked vs unchecked — responsibility */
export function CheckedVsUncheckedDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro" role="img" aria-label="Checked versus unchecked exceptions">
      <FlowchartFigcaption
        title="Checked vs unchecked — who must care?"
        fresher="Checked exceptions (most non-Runtime Exception subclasses) must be handled with try/catch or declared with throws. Unchecked (RuntimeException and Error branches) do not force compile-time handling—still catch them when you want recovery."
      />
      <svg viewBox="0 0 520 200" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="32" y="28" width="210" height="132" rx="12" fill="#eff6ff" stroke="#60a5fa" strokeWidth="1.3" />
        <text x="137" y="52" textAnchor="middle" fontSize="11" fontWeight="800" fill="#1e3a8a" fontFamily="system-ui">
          Checked (example)
        </text>
        <text x="137" y="78" textAnchor="middle" fontSize="8" fill="#1e40af" fontFamily="system-ui">
          IOException, SQLException
        </text>
        <text x="137" y="108" textAnchor="middle" fontSize="8" fill="#334155" fontFamily="system-ui">
          Compiler forces you to handle or declare
        </text>

        <rect x="278" y="28" width="210" height="132" rx="12" fill="#fef2f2" stroke="#fca5a5" strokeWidth="1.3" />
        <text x="383" y="52" textAnchor="middle" fontSize="11" fontWeight="800" fill="#991b1b" fontFamily="system-ui">
          Unchecked (example)
        </text>
        <text x="383" y="78" textAnchor="middle" fontSize="8" fill="#b91c1c" fontFamily="system-ui">
          NullPointerException, IllegalArgumentException
        </text>
        <text x="383" y="108" textAnchor="middle" fontSize="8" fill="#334155" fontFamily="system-ui">
          No compile-time throws requirement
        </text>

        <text x="260" y="186" textAnchor="middle" fontSize="8" fill="#64748b" fontFamily="system-ui">
          Rule of thumb: recoverable external failures → often checked; programmer mistakes → often unchecked.
        </text>
      </svg>
    </figure>
  );
}

/** Custom exception class shape */
export function CustomExceptionClassDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro" role="img" aria-label="Custom exception class">
      <FlowchartFigcaption
        title="Custom exception — your own type"
        fresher="Create a class that extends Exception (checked) or RuntimeException (unchecked). Add constructors that forward a message to super(...). Then throw new MyException(&quot;reason&quot;) where business rules fail."
      />
      <svg viewBox="0 0 420 200" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="90" y="24" width="240" height="140" rx="10" fill="#ffffff" stroke="#64748b" strokeWidth="1.4" filter={`url(#${p}-shadow)`} />
        <rect x="90" y="24" width="240" height="36" rx="10" fill="#1e40af" />
        <rect x="90" y="52" width="240" height="8" fill="#1e40af" />
        <text x="210" y="46" textAnchor="middle" fontSize="11" fontWeight="800" fill="#ffffff" fontFamily="ui-monospace">
          InvalidAgeException
        </text>
        <text x="102" y="78" fontSize="9" fill="#0f172a" fontFamily="ui-monospace">
          extends Exception
        </text>
        <line x1="90" y1="92" x2="330" y2="92" stroke="#cbd5e1" strokeWidth="1" />
        <text x="102" y="112" fontSize="9" fill="#0f172a" fontFamily="ui-monospace">
          public InvalidAgeException(String msg)
        </text>
        <text x="102" y="130" fontSize="9" fill="#0f172a" fontFamily="ui-monospace">
          {'{ super(msg); }'}
        </text>
        <text x="210" y="168" textAnchor="middle" fontSize="8" fill="#64748b" fontFamily="system-ui">
          throw new InvalidAgeException(&quot;Age must be positive&quot;);
        </text>
      </svg>
    </figure>
  );
}

/** Global / centralized handling (Spring-style mental model) */
export function GlobalExceptionLayersDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro" role="img" aria-label="Global exception handling layers">
      <FlowchartFigcaption
        title="Global handling — one place for API errors"
        fresher="In web apps, many controllers throw. A global handler (e.g. @ControllerAdvice in Spring) catches types, maps them to HTTP status and JSON, and keeps controllers thin. Same idea exists in other frameworks."
      />
      <svg viewBox="0 0 560 160" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="28" y="28" width="120" height="44" rx="10" fill={`url(#${p}-node-top)`} stroke="#94a3b8" />
        <text x="88" y="54" textAnchor="middle" fontSize="9" fontWeight="700" fill="#0f172a" fontFamily="system-ui">
          Controller
        </text>

        <line x1="148" y1="50" x2="196" y2="50" stroke="#2563eb" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <text x="172" y="42" textAnchor="middle" fontSize="7" fill="#64748b">
          throws
        </text>

        <rect x="200" y="28" width="120" height="44" rx="10" fill={`url(#${p}-node-accent)`} stroke="#2563eb" />
        <text x="260" y="54" textAnchor="middle" fontSize="9" fontWeight="700" fill="#1e3a8a" fontFamily="system-ui">
          Service / layer
        </text>

        <line x1="320" y1="50" x2="368" y2="50" stroke="#2563eb" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />

        <rect x="372" y="28" width="160" height="44" rx="10" fill="#fef3c7" stroke="#f59e0b" />
        <text x="452" y="50" textAnchor="middle" fontSize="9" fontWeight="800" fill="#92400e" fontFamily="system-ui">
          @ControllerAdvice
        </text>
        <text x="452" y="64" textAnchor="middle" fontSize="7" fill="#a16207" fontFamily="system-ui">
          maps exception → response
        </text>

        <text x="280" y="118" textAnchor="middle" fontSize="8" fill="#64748b" fontFamily="system-ui">
          Without a global handler, every controller must repeat try/catch; central rules keep APIs consistent.
        </text>
      </svg>
    </figure>
  );
}

/** java.util collections — Iterable → Collection → List / Set / Queue; Map separate */
export function CollectionsFrameworkHierarchyDiagram() {
  const p = useSvgPrefix();
  const sans = 'system-ui, Segoe UI, sans-serif';
  const mono = 'ui-monospace, Consolas, monospace';

  return (
    <figure className="flowchart-pro flowchart-pro-coll" role="img" aria-label="Java Collections Framework hierarchy">
      <FlowchartFigcaption
        title="Collections framework — interfaces at a glance"
        fresher="Collections group objects in dynamic structures. Iterable lets you use for-each. Collection adds size, add, remove. List keeps order and index; Set rejects duplicates; Queue orders for processing. Map is separate: key–value pairs, not a Collection."
      />
      <svg viewBox="0 0 780 400" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="300" y="12" width="180" height="30" rx="8" fill="#ecfdf5" stroke="#14b8a6" filter={`url(#${p}-shadow)`} />
        <text x="390" y="31" textAnchor="middle" fontSize="10" fontWeight="800" fill="#0f766e" fontFamily={mono}>
          Iterable&lt;T&gt;
        </text>
        <line x1="390" y1="42" x2="390" y2="54" stroke="#0d9488" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />

        <rect x="285" y="56" width="210" height="32" rx="8" fill="#d1fae5" stroke="#059669" filter={`url(#${p}-shadow)`} />
        <text x="390" y="77" textAnchor="middle" fontSize="10" fontWeight="800" fill="#065f46" fontFamily={mono}>
          Collection&lt;E&gt;
        </text>

        <line x1="390" y1="88" x2="390" y2="100" stroke="#0d9488" strokeWidth="1.8" />
        <line x1="160" y1="100" x2="620" y2="100" stroke="#0d9488" strokeWidth="1.5" />
        <line x1="160" y1="100" x2="160" y2="112" stroke="#0d9488" strokeWidth="1.5" />
        <line x1="390" y1="100" x2="390" y2="112" stroke="#0d9488" strokeWidth="1.5" />
        <line x1="620" y1="100" x2="620" y2="112" stroke="#0d9488" strokeWidth="1.5" />

        <rect x="70" y="114" width="180" height="36" rx="8" fill="#eff6ff" stroke="#3b82f6" />
        <text x="160" y="133" textAnchor="middle" fontSize="9" fontWeight="800" fill="#1e40af" fontFamily={mono}>
          List&lt;E&gt;
        </text>
        <text x="160" y="145" textAnchor="middle" fontSize="6.5" fill="#475569" fontFamily={sans}>
          ordered, index, duplicates OK
        </text>

        <rect x="300" y="114" width="180" height="36" rx="8" fill="#fef3c7" stroke="#d97706" />
        <text x="390" y="133" textAnchor="middle" fontSize="9" fontWeight="800" fill="#92400e" fontFamily={mono}>
          Set&lt;E&gt;
        </text>
        <text x="390" y="145" textAnchor="middle" fontSize="6.5" fill="#57534e" fontFamily={sans}>
          no duplicates (equals/hashCode)
        </text>

        <rect x="530" y="114" width="180" height="36" rx="8" fill="#fce7f3" stroke="#db2777" />
        <text x="620" y="133" textAnchor="middle" fontSize="9" fontWeight="800" fill="#9d174d" fontFamily={mono}>
          Queue&lt;E&gt;
        </text>
        <text x="620" y="145" textAnchor="middle" fontSize="6.5" fill="#6b7280" fontFamily={sans}>
          FIFO / scheduling
        </text>

        <line x1="620" y1="150" x2="620" y2="168" stroke="#db2777" strokeWidth="1.2" markerEnd={`url(#${p}-arrowhead)`} />
        <rect x="545" y="172" width="150" height="28" rx="6" fill="#fdf2f8" stroke="#ec4899" />
        <text x="620" y="190" textAnchor="middle" fontSize="8" fontWeight="700" fill="#831843" fontFamily={mono}>
          Deque&lt;E&gt;
        </text>
        <text x="620" y="200" textAnchor="middle" fontSize="6" fill="#9d174d" fontFamily={sans}>
          extends Queue — both ends
        </text>

        <line x1="390" y1="88" x2="620" y2="88" stroke="transparent" />
        <rect x="520" y="230" width="240" height="110" rx="12" fill="#f8fafc" stroke="#94a3b8" strokeDasharray="4 3" />
        <text x="640" y="252" textAnchor="middle" fontSize="9" fontWeight="800" fill="#334155" fontFamily={sans}>
          Map&lt;K,V&gt; — not a Collection
        </text>
        <text x="640" y="268" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily={sans}>
          key → value; use keySet(), values(), entrySet()
        </text>
        <rect x="540" y="278" width="200" height="22" rx="5" fill="#e0e7ff" stroke="#6366f1" />
        <text x="640" y="293" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#312e81" fontFamily={mono}>
          HashMap · LinkedHashMap · TreeMap
        </text>
        <text x="640" y="322" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily={sans}>
          Choose by: speed, iteration order, sorted keys
        </text>

        <text x="260" y="210" textAnchor="middle" fontSize="7.5" fill="#64748b" fontFamily={sans}>
          SortedSet / NavigableSet refine Set; NavigableMap refines Map — learn after Set &amp; Map basics.
        </text>

        <text x="390" y="372" textAnchor="middle" fontSize="7.5" fill="#64748b" fontFamily={sans}>
          Prefer interface types (List, Map) on the left of assignments; pick concrete class for performance needs.
        </text>
      </svg>
    </figure>
  );
}

/** List — common implementations */
export function ListImplementationsDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro" role="img" aria-label="List interface implementations">
      <FlowchartFigcaption
        title="List implementations — how they store elements"
        fresher="ArrayList uses a backing array—fast random access, cheap end inserts. LinkedList is doubly linked—fast inserts in the middle, slower indexed get. Vector is synchronized legacy; prefer ArrayList unless you need explicit thread safety elsewhere."
      />
      <svg viewBox="0 0 640 220" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="240" y="16" width="160" height="34" rx="8" fill="#dbeafe" stroke="#2563eb" filter={`url(#${p}-shadow)`} />
        <text x="320" y="37" textAnchor="middle" fontSize="10" fontWeight="800" fill="#1e3a8a" fontFamily="ui-monospace">
          List&lt;E&gt;
        </text>

        <line x1="280" y1="50" x2="160" y2="88" stroke="#64748b" strokeWidth="1.5" markerEnd={`url(#${p}-arrowhead)`} />
        <line x1="320" y1="50" x2="320" y2="88" stroke="#64748b" strokeWidth="1.5" markerEnd={`url(#${p}-arrowhead)`} />
        <line x1="360" y1="50" x2="480" y2="88" stroke="#64748b" strokeWidth="1.5" markerEnd={`url(#${p}-arrowhead)`} />

        <rect x="48" y="92" width="160" height="52" rx="8" fill="#eff6ff" stroke="#3b82f6" />
        <text x="128" y="114" textAnchor="middle" fontSize="9" fontWeight="800" fill="#1e40af" fontFamily="ui-monospace">
          ArrayList
        </text>
        <text x="128" y="130" textAnchor="middle" fontSize="7" fill="#475569" fontFamily="system-ui">
          resizable array · default choice
        </text>

        <rect x="240" y="92" width="160" height="52" rx="8" fill="#eff6ff" stroke="#6366f1" />
        <text x="320" y="114" textAnchor="middle" fontSize="9" fontWeight="800" fill="#312e81" fontFamily="ui-monospace">
          LinkedList
        </text>
        <text x="320" y="130" textAnchor="middle" fontSize="7" fill="#475569" fontFamily="system-ui">
          nodes · also implements Deque
        </text>

        <rect x="432" y="92" width="160" height="52" rx="8" fill="#f1f5f9" stroke="#94a3b8" />
        <text x="512" y="114" textAnchor="middle" fontSize="9" fontWeight="800" fill="#475569" fontFamily="ui-monospace">
          Vector
        </text>
        <text x="512" y="130" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily="system-ui">
          legacy synchronized list
        </text>

        <text x="320" y="188" textAnchor="middle" fontSize="7.5" fill="#64748b" fontFamily="system-ui">
          Stack extends Vector — prefer Deque (ArrayDeque) for LIFO in new code.
        </text>
      </svg>
    </figure>
  );
}

/** Set — Hash, linked, tree */
export function SetImplementationsDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro" role="img" aria-label="Set interface implementations">
      <FlowchartFigcaption
        title="Set implementations — uniqueness and order"
        fresher="HashSet is fastest average lookup using a hash table—iteration order is undefined. LinkedHashSet keeps insertion order. TreeSet keeps elements sorted (Comparable or Comparator)—O(log n) operations."
      />
      <svg viewBox="0 0 640 200" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="240" y="14" width="160" height="32" rx="8" fill="#fffbeb" stroke="#d97706" filter={`url(#${p}-shadow)`} />
        <text x="320" y="34" textAnchor="middle" fontSize="10" fontWeight="800" fill="#92400e" fontFamily="ui-monospace">
          Set&lt;E&gt;
        </text>

        <line x1="280" y1="46" x2="128" y2="82" stroke="#64748b" strokeWidth="1.5" markerEnd={`url(#${p}-arrowhead)`} />
        <line x1="320" y1="46" x2="320" y2="82" stroke="#64748b" strokeWidth="1.5" markerEnd={`url(#${p}-arrowhead)`} />
        <line x1="360" y1="46" x2="512" y2="82" stroke="#64748b" strokeWidth="1.5" markerEnd={`url(#${p}-arrowhead)`} />

        <rect x="48" y="86" width="160" height="48" rx="8" fill="#fff7ed" stroke="#ea580c" />
        <text x="128" y="106" textAnchor="middle" fontSize="9" fontWeight="800" fill="#9a3412" fontFamily="ui-monospace">
          HashSet
        </text>
        <text x="128" y="122" textAnchor="middle" fontSize="7" fill="#57534e" fontFamily="system-ui">
          hash table · no order guarantee
        </text>

        <rect x="240" y="86" width="160" height="48" rx="8" fill="#fef3c7" stroke="#ca8a04" />
        <text x="320" y="106" textAnchor="middle" fontSize="9" fontWeight="800" fill="#854d0e" fontFamily="ui-monospace">
          LinkedHashSet
        </text>
        <text x="320" y="122" textAnchor="middle" fontSize="7" fill="#57534e" fontFamily="system-ui">
          linked list + hash · insertion order
        </text>

        <rect x="432" y="86" width="160" height="48" rx="8" fill="#ecfccb" stroke="#65a30d" />
        <text x="512" y="106" textAnchor="middle" fontSize="9" fontWeight="800" fill="#365314" fontFamily="ui-monospace">
          TreeSet
        </text>
        <text x="512" y="122" textAnchor="middle" fontSize="7" fill="#57534e" fontFamily="system-ui">
          red-black tree · sorted
        </text>

        <text x="320" y="168" textAnchor="middle" fontSize="7.5" fill="#64748b" fontFamily="system-ui">
          Elements need consistent equals/hashCode (HashSet/LinkedHashSet) or ordering (TreeSet).
        </text>
      </svg>
    </figure>
  );
}

/** Map — three classic maps */
export function MapImplementationsDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro" role="img" aria-label="Map interface implementations">
      <FlowchartFigcaption
        title="Map implementations — keys and lookup"
        fresher="HashMap offers O(1) average get/put with no iteration order promise. LinkedHashMap adds predictable iteration (insertion or access order). TreeMap keeps keys sorted. None of these implement Collection—work with Map&lt;K,V&gt; and entrySet()."
      />
      <svg viewBox="0 0 640 210" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="240" y="14" width="160" height="32" rx="8" fill="#e0e7ff" stroke="#4f46e5" filter={`url(#${p}-shadow)`} />
        <text x="320" y="34" textAnchor="middle" fontSize="10" fontWeight="800" fill="#312e81" fontFamily="ui-monospace">
          Map&lt;K,V&gt;
        </text>

        <line x1="280" y1="46" x2="128" y2="84" stroke="#64748b" strokeWidth="1.5" markerEnd={`url(#${p}-arrowhead)`} />
        <line x1="320" y1="46" x2="320" y2="84" stroke="#64748b" strokeWidth="1.5" markerEnd={`url(#${p}-arrowhead)`} />
        <line x1="360" y1="46" x2="512" y2="84" stroke="#64748b" strokeWidth="1.5" markerEnd={`url(#${p}-arrowhead)`} />

        <rect x="48" y="88" width="160" height="52" rx="8" fill="#eef2ff" stroke="#6366f1" />
        <text x="128" y="110" textAnchor="middle" fontSize="9" fontWeight="800" fill="#3730a3" fontFamily="ui-monospace">
          HashMap
        </text>
        <text x="128" y="128" textAnchor="middle" fontSize="7" fill="#475569" fontFamily="system-ui">
          bucket hash · default map
        </text>

        <rect x="240" y="88" width="160" height="52" rx="8" fill="#e0e7ff" stroke="#4f46e5" />
        <text x="320" y="110" textAnchor="middle" fontSize="9" fontWeight="800" fill="#312e81" fontFamily="ui-monospace">
          LinkedHashMap
        </text>
        <text x="320" y="128" textAnchor="middle" fontSize="7" fill="#475569" fontFamily="system-ui">
          hash + linked list · order
        </text>

        <rect x="432" y="88" width="160" height="52" rx="8" fill="#dcfce7" stroke="#16a34a" />
        <text x="512" y="110" textAnchor="middle" fontSize="9" fontWeight="800" fill="#14532d" fontFamily="ui-monospace">
          TreeMap
        </text>
        <text x="512" y="128" textAnchor="middle" fontSize="7" fill="#475569" fontFamily="system-ui">
          sorted keys · NavigableMap
        </text>

        <text x="320" y="178" textAnchor="middle" fontSize="7.5" fill="#64748b" fontFamily="system-ui">
          Hashtable is legacy synchronized map; prefer ConcurrentHashMap when you need concurrency.
        </text>
      </svg>
    </figure>
  );
}

/** Queue & Deque — common implementations */
export function QueueDequeDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro" role="img" aria-label="Queue and Deque implementations">
      <FlowchartFigcaption
        title="Queue & Deque — scheduling and both-ended access"
        fresher="Queue is for waiting lines: offer/poll/peek. Deque adds efficient add/remove at front and back—use ArrayDeque as a fast stack or queue. PriorityQueue orders by priority (heap), not FIFO insertion order."
      />
      <svg viewBox="0 0 680 230" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="260" y="12" width="160" height="30" rx="8" fill="#fce7f3" stroke="#db2777" filter={`url(#${p}-shadow)`} />
        <text x="340" y="31" textAnchor="middle" fontSize="10" fontWeight="800" fill="#9d174d" fontFamily="ui-monospace">
          Queue&lt;E&gt;
        </text>

        <line x1="340" y1="42" x2="340" y2="52" stroke="#db2777" strokeWidth="1.5" />
        <line x1="180" y1="52" x2="500" y2="52" stroke="#db2777" strokeWidth="1.3" />
        <line x1="180" y1="52" x2="180" y2="64" stroke="#db2777" strokeWidth="1.3" />
        <line x1="340" y1="52" x2="340" y2="64" stroke="#db2777" strokeWidth="1.3" />
        <line x1="500" y1="52" x2="500" y2="64" stroke="#db2777" strokeWidth="1.3" />

        <rect x="100" y="66" width="160" height="34" rx="8" fill="#fdf2f8" stroke="#ec4899" />
        <text x="180" y="86" textAnchor="middle" fontSize="9" fontWeight="800" fill="#831843" fontFamily="ui-monospace">
          PriorityQueue
        </text>

        <rect x="270" y="66" width="140" height="34" rx="8" fill="#fdf2f8" stroke="#db2777" />
        <text x="340" y="86" textAnchor="middle" fontSize="9" fontWeight="800" fill="#9d174d" fontFamily="ui-monospace">
          ArrayDeque
        </text>

        <rect x="420" y="66" width="160" height="34" rx="8" fill="#fdf2f8" stroke="#f472b6" />
        <text x="500" y="86" textAnchor="middle" fontSize="9" fontWeight="800" fill="#9d174d" fontFamily="ui-monospace">
          LinkedList
        </text>

        <text x="340" y="118" textAnchor="middle" fontSize="7.5" fill="#64748b" fontFamily="system-ui">
          ArrayDeque implements Deque — resizable array, no capacity limit (until memory)
        </text>

        <rect x="140" y="128" width="400" height="72" rx="10" fill="#f8fafc" stroke="#94a3b8" />
        <text x="340" y="150" textAnchor="middle" fontSize="9" fontWeight="800" fill="#334155" fontFamily="system-ui">
          Deque&lt;E&gt; — double-ended queue
        </text>
        <text x="340" y="168" textAnchor="middle" fontSize="7.5" fill="#64748b" fontFamily="system-ui">
          addFirst / addLast · removeFirst / removeLast · stack: push = addFirst, pop = removeFirst
        </text>
        <text x="340" y="186" textAnchor="middle" fontSize="7" fill="#94a3b8" fontFamily="system-ui">
          Prefer ArrayDeque over Stack for LIFO; LinkedList when you need List + Deque together
        </text>
      </svg>
    </figure>
  );
}

/** Intrinsic lock (monitor) — one thread inside synchronized at a time */
export function SynchronizationMonitorDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-sync" role="img" aria-label="Synchronized monitor lock">
      <FlowchartFigcaption
        title="synchronized and the monitor (intrinsic lock)"
        fresher="Every Java object has a lock (its monitor). When a thread enters a synchronized method or block on that object, it owns the lock. Other threads block until the owner exits—so critical sections update shared state safely."
      />
      <svg viewBox="0 0 680 240" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="260" y="16" width="160" height="44" rx="10" fill="#fff7ed" stroke="#ea580c" filter={`url(#${p}-shadow)`} />
        <text x="340" y="36" textAnchor="middle" fontSize="10" fontWeight="800" fill="#9a3412" fontFamily="system-ui">
          shared Object
        </text>
        <text x="340" y="52" textAnchor="middle" fontSize="8" fill="#c2410c" fontFamily="ui-monospace">
          lock / monitor
        </text>

        <rect x="48" y="88" width="200" height="120" rx="10" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.2" />
        <text x="148" y="112" textAnchor="middle" fontSize="9" fontWeight="800" fill="#1e40af" fontFamily="system-ui">
          Thread A
        </text>
        <rect x="68" y="124" width="160" height="64" rx="6" fill="#dbeafe" stroke="#3b82f6" />
        <text x="148" y="148" textAnchor="middle" fontSize="8" fontWeight="700" fill="#1e3a8a" fontFamily="ui-monospace">
          synchronized (obj)
        </text>
        <text x="148" y="166" textAnchor="middle" fontSize="7" fill="#334155" fontFamily="system-ui">
          holds lock → runs
        </text>

        <rect x="432" y="88" width="200" height="120" rx="10" fill="#f8fafc" stroke="#94a3b8" strokeDasharray="4 3" />
        <text x="532" y="112" textAnchor="middle" fontSize="9" fontWeight="800" fill="#64748b" fontFamily="system-ui">
          Thread B
        </text>
        <text x="532" y="156" textAnchor="middle" fontSize="8" fill="#64748b" fontFamily="system-ui">
          blocked waiting
        </text>
        <text x="532" y="176" textAnchor="middle" fontSize="7" fill="#94a3b8" fontFamily="system-ui">
          for same monitor
        </text>

        <line x1="248" y1="148" x2="308" y2="60" stroke="#2563eb" strokeWidth="1.5" markerEnd={`url(#${p}-arrowhead)`} />
        <line x1="432" y1="148" x2="372" y2="60" stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="3 2" />

        <text x="340" y="222" textAnchor="middle" fontSize="7.5" fill="#64748b" fontFamily="system-ui">
          {'static synchronized uses the Class lock; instance methods use the receiver (this).'}
        </text>
      </svg>
    </figure>
  );
}

/** volatile vs synchronized — visibility vs mutual exclusion */
export function VolatileVsSynchronizedDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro" role="img" aria-label="Volatile versus synchronized">
      <FlowchartFigcaption
        title="volatile vs synchronized"
        fresher="volatile guarantees visibility: after one thread writes a volatile field, other threads see the update. It does not make compound actions atomic—for i++ you still need synchronized or AtomicInteger. synchronized gives both mutual exclusion and visibility for the guarded block."
      />
      <svg viewBox="0 0 640 200" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="32" y="28" width="270" height="132" rx="12" fill="#fefce8" stroke="#eab308" />
        <text x="167" y="52" textAnchor="middle" fontSize="10" fontWeight="800" fill="#854d0e" fontFamily="ui-monospace">
          volatile
        </text>
        <text x="167" y="78" textAnchor="middle" fontSize="8" fill="#57534e" fontFamily="system-ui">
          happens-before for reads/writes
        </text>
        <text x="167" y="100" textAnchor="middle" fontSize="7.5" fill="#64748b" fontFamily="system-ui">
          Good for one shared flag or reference
        </text>
        <text x="167" y="128" textAnchor="middle" fontSize="7" fill="#a16207" fontFamily="system-ui">
          Not for read-modify-write as one step
        </text>

        <rect x="338" y="28" width="270" height="132" rx="12" fill="#eff6ff" stroke="#3b82f6" />
        <text x="473" y="52" textAnchor="middle" fontSize="10" fontWeight="800" fill="#1e40af" fontFamily="ui-monospace">
          synchronized
        </text>
        <text x="473" y="78" textAnchor="middle" fontSize="8" fill="#334155" fontFamily="system-ui">
          one thread in critical section
        </text>
        <text x="473" y="100" textAnchor="middle" fontSize="7.5" fill="#64748b" fontFamily="system-ui">
          Protects invariants across multiple fields
        </text>
        <text x="473" y="128" textAnchor="middle" fontSize="7" fill="#1e40af" fontFamily="system-ui">
          Can deadlock if locks ordered badly
        </text>

        <text x="320" y="182" textAnchor="middle" fontSize="7.5" fill="#64748b" fontFamily="system-ui">
          java.util.concurrent often replaces raw wait/notify with higher-level APIs (Locks, semaphores).
        </text>
      </svg>
    </figure>
  );
}

/** Object streams — serialize and deserialize */
export function SerializationObjectStreamDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-ser" role="img" aria-label="Java object serialization flow">
      <FlowchartFigcaption
        title="Object streams — writing and reading object graphs"
        fresher="Serialization turns object graphs into bytes (ObjectOutputStream) and back (ObjectInputStream). The class must implement Serializable (or Externalizable). Only the object&apos;s fields you allow are written; transient and static fields are skipped by default."
      />
      <svg viewBox="0 0 720 180" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="32" y="48" width="120" height="44" rx="8" fill="#eef2ff" stroke="#6366f1" filter={`url(#${p}-shadow)`} />
        <text x="92" y="68" textAnchor="middle" fontSize="9" fontWeight="800" fill="#312e81" fontFamily="system-ui">
          Object graph
        </text>
        <text x="92" y="84" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily="ui-monospace">
          Serializable
        </text>

        <line x1="152" y1="70" x2="208" y2="70" stroke="#4f46e5" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <text x="180" y="62" textAnchor="middle" fontSize="7" fill="#64748b">
          writeObject
        </text>

        <rect x="212" y="48" width="140" height="44" rx="8" fill="#e0e7ff" stroke="#4f46e5" />
        <text x="282" y="68" textAnchor="middle" fontSize="9" fontWeight="800" fill="#3730a3" fontFamily="ui-monospace">
          ObjectOutputStream
        </text>
        <text x="282" y="84" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily="system-ui">
          bytes + metadata
        </text>

        <line x1="352" y1="70" x2="368" y2="70" stroke="#4f46e5" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />

        <rect x="372" y="44" width="100" height="52" rx="8" fill="#f5f3ff" stroke="#7c3aed" />
        <text x="422" y="68" textAnchor="middle" fontSize="9" fontWeight="800" fill="#5b21b6" fontFamily="system-ui">
          byte stream
        </text>
        <text x="422" y="86" textAnchor="middle" fontSize="7" fill="#7c3aed" fontFamily="system-ui">
          file / network
        </text>

        <line x1="472" y1="70" x2="488" y2="70" stroke="#4f46e5" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />

        <rect x="492" y="48" width="132" height="44" rx="8" fill="#e0e7ff" stroke="#6366f1" />
        <text x="558" y="68" textAnchor="middle" fontSize="9" fontWeight="800" fill="#312e81" fontFamily="ui-monospace">
          ObjectInputStream
        </text>
        <text x="558" y="84" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily="system-ui">
          readObject
        </text>

        <line x1="624" y1="70" x2="648" y2="70" stroke="#4f46e5" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />

        <rect x="652" y="48" width="56" height="44" rx="8" fill="#ecfdf5" stroke="#059669" />
        <text x="680" y="76" textAnchor="middle" fontSize="9" fontWeight="800" fill="#065f46" fontFamily="system-ui">
          copy
        </text>

        <text x="360" y="130" textAnchor="middle" fontSize="7.5" fill="#64748b" fontFamily="system-ui">
          Deserialization can run constructors of non-Serializable superclasses and custom readObject—security matters for untrusted streams.
        </text>
      </svg>
    </figure>
  );
}

/** Serializable class — contract on the class */
export function SerializableClassDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro" role="img" aria-label="Serializable class contract">
      <FlowchartFigcaption
        title="Serializable class — what the compiler expects"
        fresher="Mark the class with implements Serializable (marker interface). Use serialVersionUID so future versions stay compatible. Mark fields transient to skip secrets or caches; parent class state may need its own Serializable chain."
      />
      <svg viewBox="0 0 520 210" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="90" y="20" width="340" height="160" rx="10" fill="#ffffff" stroke="#6366f1" strokeWidth="1.3" filter={`url(#${p}-shadow)`} />
        <rect x="90" y="20" width="340" height="36" rx="10" fill="#4f46e5" />
        <rect x="90" y="48" width="340" height="8" fill="#4f46e5" />
        <text x="260" y="42" textAnchor="middle" fontSize="11" fontWeight="800" fill="#ffffff" fontFamily="ui-monospace">
          Person
        </text>
        <text x="102" y="72" fontSize="9" fill="#312e81" fontFamily="ui-monospace">
          implements Serializable
        </text>
        <line x1="90" y1="82" x2="430" y2="82" stroke="#c7d2fe" strokeWidth="1" />
        <text x="102" y="100" fontSize="8.5" fill="#0f172a" fontFamily="ui-monospace">
          private static final long serialVersionUID = 1L;
        </text>
        <text x="102" y="118" fontSize="8.5" fill="#0f172a" fontFamily="ui-monospace">
          private String name;
        </text>
        <text x="102" y="136" fontSize="8.5" fill="#64748b" fontFamily="ui-monospace">
          private transient char[] password;
        </text>
        <text x="102" y="158" fontSize="7.5" fill="#64748b" fontFamily="system-ui">
          static fields are not part of instance state
        </text>

        <text x="260" y="198" textAnchor="middle" fontSize="7.5" fill="#64748b" fontFamily="system-ui">
          InvalidClassException if UID mismatches between writer and reader.
        </text>
      </svg>
    </figure>
  );
}

/** Spring Boot — runtime stack from JVM to your app */
export function SpringBootArchitectureStackDiagram() {
  const p = useSvgPrefix();
  const mono = 'ui-monospace, Consolas, monospace';
  const sans = 'system-ui, Segoe UI, sans-serif';
  const layers = [
    { y: 44, h: 52, fill: '#ecfdf5', stroke: '#16a34a', title: 'Your code', sub: '@SpringBootApplication · @RestController · @Service', fs: 9 },
    { y: 108, h: 52, fill: '#dcfce7', stroke: '#22c55e', title: 'Spring Boot', sub: 'auto-configuration · starters · Actuator hooks', fs: 9 },
    { y: 172, h: 52, fill: '#bbf7d0', stroke: '#15803d', title: 'Spring Framework', sub: 'IoC · MVC · Data · Security (building blocks)', fs: 8.5 },
    { y: 236, h: 52, fill: '#d1fae5', stroke: '#059669', title: 'Embedded server', sub: 'Tomcat / Jetty / Undertow (no separate WAR deploy)', fs: 8.5 },
    { y: 300, h: 44, fill: '#f1f5f9', stroke: '#64748b', title: 'JVM', sub: 'Java runtime', fs: 9 }
  ];
  return (
    <figure className="flowchart-pro flowchart-pro-springboot" role="img" aria-label="Spring Boot architecture stack">
      <FlowchartFigcaption
        title="Spring Boot sits on Spring + an embedded server"
        fresher="You write a main class with @SpringBootApplication; Spring Boot wires beans, HTTP handling, and data access from classpath starters. The embedded server runs inside the same JVM process—ideal for microservices and fast local dev."
      />
      <svg viewBox="0 0 720 360" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="24" y="8" width="672" height="344" rx="16" fill="#f8fafc" stroke="#86efac" strokeWidth="1.5" />
        <text x="360" y="30" textAnchor="middle" fontSize="10" fontWeight="800" fill="#14532d" fontFamily={sans}>
          One process: app layer down to the JVM
        </text>
        {layers.map((L) => (
          <g key={L.title}>
            <rect x="80" y={L.y} width="560" height={L.h} rx="10" fill={L.fill} stroke={L.stroke} strokeWidth="1.4" filter={`url(#${p}-shadow)`} />
            <text x="360" y={L.y + 22} textAnchor="middle" fontSize={L.fs} fontWeight="800" fill="#14532d" fontFamily={mono}>
              {L.title}
            </text>
            <text x="360" y={L.y + 40} textAnchor="middle" fontSize="7.5" fill="#365314" fontFamily={sans}>
              {L.sub}
            </text>
          </g>
        ))}
        <line x1="360" y1="96" x2="360" y2="108" stroke="#64748b" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <line x1="360" y1="160" x2="360" y2="172" stroke="#64748b" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <line x1="360" y1="224" x2="360" y2="236" stroke="#64748b" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <line x1="360" y1="288" x2="360" y2="300" stroke="#64748b" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />

        <text x="360" y="348" textAnchor="middle" fontSize="7.5" fill="#64748b" fontFamily={sans}>
          Starters pull in compatible versions—think “batteries included” dependency sets.
        </text>
      </svg>
    </figure>
  );
}

/** Spring MVC request path inside Spring Boot */
export function SpringBootWebRequestFlowDiagram() {
  const p = useSvgPrefix();
  const steps = [
    { x: 28, label: 'Client', sub: 'HTTP' },
    { x: 128, label: 'Embedded\nserver', sub: 'Tomcat' },
    { x: 228, label: 'Dispatcher\nServlet', sub: 'Spring MVC' },
    { x: 328, label: '@Controller /\n@RestController', sub: 'handler' },
    { x: 428, label: '@Service', sub: 'business' },
    { x: 528, label: '@Repository', sub: 'data' },
    { x: 628, label: 'DB / API', sub: 'persistence' }
  ];
  return (
    <figure className="flowchart-pro flowchart-pro-springboot-wide" role="img" aria-label="Spring Boot web request flow">
      <FlowchartFigcaption
        title="A REST request through Spring Boot"
        fresher="The embedded server receives HTTP, dispatches to Spring MVC, your controller maps URLs to methods, services hold business rules, repositories talk to databases. Filters and interceptors can wrap this path for security and logging."
      />
      <svg viewBox="0 0 760 200" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="12" y="36" width="736" height="120" rx="12" fill="#f0fdf4" stroke="#86efac" strokeWidth="1.2" />
        {steps.map((s, i) => (
          <g key={s.label}>
            <rect x={s.x} y="56" width="88" height="76" rx="8" fill="#ffffff" stroke="#22c55e" strokeWidth="1.1" filter={`url(#${p}-shadow)`} />
            <text x={s.x + 44} y="78" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#14532d" fontFamily="system-ui">
              {s.label.split('\n').map((line, li) => (
                <tspan key={line} x={s.x + 44} dy={li === 0 ? 0 : 11}>
                  {line}
                </tspan>
              ))}
            </text>
            <text x={s.x + 44} y="118" textAnchor="middle" fontSize="6.5" fill="#4d7c0f" fontFamily="system-ui">
              {s.sub}
            </text>
            {i < steps.length - 1 && (
              <line
                x1={s.x + 92}
                y1="94"
                x2={steps[i + 1].x - 4}
                y2="94"
                stroke="#16a34a"
                strokeWidth="2"
                markerEnd={`url(#${p}-arrowhead)`}
              />
            )}
          </g>
        ))}
        <text x="380" y="178" textAnchor="middle" fontSize="7.5" fill="#64748b" fontFamily="system-ui">
          JSON/XML conversion happens in the MVC layer (HttpMessageConverters) for @RestController.
        </text>
      </svg>
    </figure>
  );
}

/** Starters + BOM mental model */
export function SpringBootStartersDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro" role="img" aria-label="Spring Boot starters">
      <FlowchartFigcaption
        title="Starters bundle dependencies that work together"
        fresher="spring-boot-starter-web brings Spring MVC + Jackson + embedded Tomcat. spring-boot-starter-data-jpa adds Hibernate + a connection pool. The Spring Boot BOM keeps versions aligned so you avoid classpath conflicts."
      />
      <svg viewBox="0 0 700 220" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="200" y="16" width="300" height="44" rx="10" fill="#14532d" stroke="#166534" filter={`url(#${p}-shadow)`} />
        <text x="350" y="34" textAnchor="middle" fontSize="10" fontWeight="800" fill="#ffffff" fontFamily="ui-monospace">
          spring-boot-starter-parent (BOM)
        </text>
        <text x="350" y="50" textAnchor="middle" fontSize="7" fill="#bbf7d0" fontFamily="system-ui">
          manages dependency versions
        </text>

        <line x1="350" y1="60" x2="350" y2="78" stroke="#22c55e" strokeWidth="2" />

        <rect x="40" y="82" width="180" height="100" rx="10" fill="#ecfdf5" stroke="#22c55e" />
        <text x="130" y="108" textAnchor="middle" fontSize="9" fontWeight="800" fill="#14532d" fontFamily="ui-monospace">
          starter-web
        </text>
        <text x="130" y="128" textAnchor="middle" fontSize="7" fill="#365314" fontFamily="system-ui">
          MVC · Jackson · Tomcat
        </text>

        <rect x="260" y="82" width="180" height="100" rx="10" fill="#ecfdf5" stroke="#16a34a" />
        <text x="350" y="108" textAnchor="middle" fontSize="9" fontWeight="800" fill="#14532d" fontFamily="ui-monospace">
          starter-data-jpa
        </text>
        <text x="350" y="128" textAnchor="middle" fontSize="7" fill="#365314" fontFamily="system-ui">
          Hibernate · JDBC pool
        </text>

        <rect x="480" y="82" width="180" height="100" rx="10" fill="#ecfdf5" stroke="#15803d" />
        <text x="570" y="108" textAnchor="middle" fontSize="9" fontWeight="800" fill="#14532d" fontFamily="ui-monospace">
          starter-security
        </text>
        <text x="570" y="128" textAnchor="middle" fontSize="7" fill="#365314" fontFamily="system-ui">
          filters · auth
        </text>

        <text x="350" y="206" textAnchor="middle" fontSize="7.5" fill="#64748b" fontFamily="system-ui">
          Add only the starters you need—extra starters increase classpath and startup time.
        </text>
      </svg>
    </figure>
  );
}

/** JPA layering in a typical Boot app */
export function SpringBootJpaPersistenceDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro" role="img" aria-label="Spring Data JPA layers">
      <FlowchartFigcaption
        title="Spring Data JPA — from entity to database"
        fresher="Entities map tables; Spring Data creates repository implementations at runtime; services orchestrate transactions. Spring Boot configures DataSource and Hibernate from application.properties."
      />
      <svg viewBox="0 0 640 240" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="220" y="16" width="200" height="36" rx="8" fill="#dbeafe" stroke="#2563eb" />
        <text x="320" y="38" textAnchor="middle" fontSize="9" fontWeight="800" fill="#1e3a8a" fontFamily="ui-monospace">
          @Entity
        </text>

        <line x1="320" y1="52" x2="320" y2="72" stroke="#2563eb" strokeWidth="1.8" markerEnd={`url(#${p}-arrowhead)`} />

        <rect x="160" y="76" width="320" height="44" rx="8" fill="#eff6ff" stroke="#3b82f6" />
        <text x="320" y="98" textAnchor="middle" fontSize="9" fontWeight="800" fill="#1e40af" fontFamily="ui-monospace">
          JpaRepository&lt;Entity, Id&gt;
        </text>
        <text x="320" y="114" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily="system-ui">
          query methods · paging · @Query
        </text>

        <line x1="320" y1="120" x2="320" y2="140" stroke="#2563eb" strokeWidth="1.8" markerEnd={`url(#${p}-arrowhead)`} />

        <rect x="120" y="144" width="400" height="40" rx="8" fill="#f0fdf4" stroke="#22c55e" />
        <text x="320" y="168" textAnchor="middle" fontSize="9" fontWeight="800" fill="#14532d" fontFamily="system-ui">
          DataSource → Hibernate → JDBC → Database
        </text>

        <text x="320" y="220" textAnchor="middle" fontSize="7.5" fill="#64748b" fontFamily="system-ui">
          @Transactional on service methods defines boundary; avoid lazy-loading outside a session.
        </text>
      </svg>
    </figure>
  );
}

/** Security filter chain (simplified) */
export function SpringBootSecurityFilterDiagram() {
  const p = useSvgPrefix();
  const filters = ['SecurityContext', 'Logout', 'UsernamePassword', 'ExceptionTranslation', 'FilterSecurity'];
  return (
    <figure className="flowchart-pro" role="img" aria-label="Spring Security filter chain">
      <FlowchartFigcaption
        title="Spring Security — request passes through filters"
        fresher="Before your controller, the chain authenticates and authorizes. Custom filters can be inserted; order matters. Method security (@PreAuthorize) runs after the chain establishes the SecurityContext."
      />
      <svg viewBox="0 0 720 160" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="20" y="28" width="680" height="88" rx="10" fill="#fff7ed" stroke="#ea580c" />
        <text x="360" y="52" textAnchor="middle" fontSize="9" fontWeight="800" fill="#9a3412" fontFamily="system-ui">
          FilterChainProxy (simplified)
        </text>
        {filters.map((f, i) => (
          <rect key={f} x={28 + i * 132} y="62" width="120" height="40" rx="6" fill="#ffedd5" stroke="#fb923c" />
        ))}
        {filters.map((f, i) => (
          <text key={f} x={88 + i * 132} y="86" textAnchor="middle" fontSize="6.5" fontWeight="700" fill="#7c2d12" fontFamily="ui-monospace">
            {f}
          </text>
        ))}
        <text x="360" y="138" textAnchor="middle" fontSize="7.5" fill="#64748b" fontFamily="system-ui">
          Names vary by config; concept: each filter can veto or enrich the request before servlets.
        </text>
      </svg>
    </figure>
  );
}

/** Actuator HTTP endpoints (subset) */
export function SpringBootActuatorDiagram() {
  const p = useSvgPrefix();
  const eps = [
    { path: '/actuator/health', note: 'liveness / readiness' },
    { path: '/actuator/metrics', note: 'JVM · HTTP' },
    { path: '/actuator/info', note: 'build metadata' },
    { path: '/actuator/env', note: 'properties (careful)' }
  ];
  return (
    <figure className="flowchart-pro" role="img" aria-label="Spring Boot Actuator endpoints">
      <FlowchartFigcaption
        title="Actuator — production observability"
        fresher="Add spring-boot-starter-actuator to expose health and metrics over HTTP or JMX. Secure sensitive endpoints in production; expose only what your platform needs."
      />
      <svg viewBox="0 0 640 200" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="180" y="20" width="280" height="40" rx="8" fill="#14532d" stroke="#166534" />
        <text x="320" y="44" textAnchor="middle" fontSize="10" fontWeight="800" fill="#ffffff" fontFamily="ui-monospace">
          Actuator
        </text>
        {eps.map((e, i) => (
          <g key={e.path}>
            <rect x="48" y={72 + i * 30} width="544" height="26" rx="6" fill="#f0fdf4" stroke="#22c55e" />
            <text x="60" y={90 + i * 30} fontSize="7.5" fontWeight="700" fill="#14532d" fontFamily="ui-monospace">
              {e.path}
            </text>
            <text x="580" y={90 + i * 30} textAnchor="end" fontSize="7" fill="#64748b" fontFamily="system-ui">
              {e.note}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  );
}

/** Vertical bootstrap flow — how the app actually starts */
export function SpringBootBootstrapFlowDiagram() {
  const p = useSvgPrefix();
  const sans = 'system-ui, Segoe UI, sans-serif';
  const mono = 'ui-monospace, Consolas, monospace';
  const nodes = [
    { y: 16, h: 36, t: 'main(String[] args)', s: 'entry point' },
    { y: 64, h: 36, t: 'SpringApplication.run(…)', s: 'creates application context' },
    { y: 112, h: 36, t: 'Context refresh', s: 'scan @Configuration, @Component' },
    { y: 160, h: 36, t: 'Auto-configuration', s: '@Conditional* on classpath' },
    { y: 208, h: 36, t: 'Embedded server bind', s: 'Tomcat listens on port' }
  ];
  return (
    <figure className="flowchart-pro flowchart-pro-springboot-flow" role="img" aria-label="Spring Boot bootstrap sequence">
      <FlowchartFigcaption
        title="Bootstrap sequence — from main() to listening port"
        fresher="Execution is top-to-bottom: the JVM runs main(), Boot builds the Spring context, auto-config registers beans when conditions match, then the embedded server accepts HTTP. This is the real “startup story” behind @SpringBootApplication."
      />
      <svg viewBox="0 0 560 290" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="24" y="8" width="512" height="274" rx="14" fill="#f8fafc" stroke="#86efac" strokeWidth="1.2" />
        <text x="280" y="26" textAnchor="middle" fontSize="9" fontWeight="800" fill="#14532d" fontFamily={sans}>
          Startup flow (read top → bottom)
        </text>
        {nodes.map((n, i) => (
          <g key={n.t}>
            <rect x="100" y={n.y} width="360" height={n.h} rx="8" fill="#ecfdf5" stroke="#16a34a" strokeWidth="1.2" filter={`url(#${p}-shadow)`} />
            <text x="280" y={n.y + 16} textAnchor="middle" fontSize="9" fontWeight="800" fill="#14532d" fontFamily={mono}>
              {n.t}
            </text>
            <text x="280" y={n.y + 30} textAnchor="middle" fontSize="7" fill="#365314" fontFamily={sans}>
              {n.s}
            </text>
            {i < nodes.length - 1 && (
              <line x1="280" y1={n.y + n.h} x2="280" y2={nodes[i + 1].y - 2} stroke="#15803d" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
            )}
          </g>
        ))}
      </svg>
    </figure>
  );
}

/** Config precedence — higher band wins (simplified) */
export function SpringBootConfigPrecedenceFlowDiagram() {
  const p = useSvgPrefix();
  const sans = 'system-ui, Segoe UI, sans-serif';
  const bands = [
    { y: 200, w: 480, label: 'application.properties / application.yml', sub: 'base defaults', rank: '1 — lowest' },
    { y: 152, w: 440, label: 'application-{profile}.* + profile-specific imports', sub: 'dev / prod overlays', rank: '2' },
    { y: 104, w: 400, label: 'OS environment variables (SPRING_*)', sub: 'container / shell', rank: '3' },
    { y: 56, w: 360, label: 'Command-line arguments', sub: '--server.port=8081', rank: '4 — wins' }
  ];
  return (
    <figure className="flowchart-pro flowchart-pro-springboot-flow" role="img" aria-label="Spring Boot configuration precedence">
      <FlowchartFigcaption
        title="Configuration precedence — who overrides whom"
        fresher="Later sources in the chain override earlier ones. Same key in a higher band wins. This is why you can set a default in YAML but override it in Docker env vars or K8s without rebuilding."
      />
      <svg viewBox="0 0 560 260" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="20" y="12" width="520" height="236" rx="12" fill="#f0fdf4" stroke="#22c55e" strokeWidth="1" />
        <text x="280" y="32" textAnchor="middle" fontSize="9" fontWeight="800" fill="#14532d" fontFamily={sans}>
          Higher on the diagram = higher precedence (overrides below)
        </text>
        {bands.map((b) => (
          <g key={b.label}>
            <rect x={(560 - b.w) / 2} y={b.y} width={b.w} height="40" rx="8" fill="#ffffff" stroke="#15803d" strokeWidth="1.1" filter={`url(#${p}-shadow)`} />
            <text x="280" y={b.y + 16} textAnchor="middle" fontSize="8" fontWeight="800" fill="#14532d" fontFamily="ui-monospace">
              {b.label}
            </text>
            <text x="280" y={b.y + 30} textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily={sans}>
              {b.sub} · {b.rank}
            </text>
          </g>
        ))}
        <text x="280" y="248" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily={sans}>
          Exact rules include optional config locations; this is the mental model for interviews.
        </text>
      </svg>
    </figure>
  );
}

/** @Valid decision — valid vs 400 branch */
export function SpringBootValidationDecisionFlowDiagram() {
  const p = useSvgPrefix();
  const sans = 'system-ui, Segoe UI, sans-serif';
  return (
    <figure className="flowchart-pro flowchart-pro-springboot-flow" role="img" aria-label="Bean validation decision flow">
      <FlowchartFigcaption
        title="Validation flow — success path vs error path"
        fresher="After JSON binds to your DTO, Hibernate Validator runs the annotations. If every constraint passes, your controller method runs. If not, Spring throws before the method body and your @ControllerAdvice can format field errors."
      />
      <svg viewBox="0 0 640 280" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="220" y="16" width="200" height="36" rx="8" fill="#dbeafe" stroke="#2563eb" />
        <text x="320" y="38" textAnchor="middle" fontSize="9" fontWeight="800" fill="#1e40af" fontFamily="system-ui">
          HTTP request + @RequestBody DTO
        </text>
        <line x1="320" y1="52" x2="320" y2="68" stroke="#2563eb" strokeWidth="1.8" markerEnd={`url(#${p}-arrowhead)`} />

        <rect x="232" y="72" width="176" height="32" rx="8" fill="#eff6ff" stroke="#3b82f6" />
        <text x="320" y="92" textAnchor="middle" fontSize="8" fontWeight="700" fill="#1e3a8a" fontFamily="ui-monospace">
          @Valid triggers validation
        </text>
        <line x1="320" y1="104" x2="320" y2="120" stroke="#2563eb" strokeWidth="1.8" markerEnd={`url(#${p}-arrowhead)`} />

        <path d="M 320 120 L 380 152 L 320 184 L 260 152 Z" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.4" />
        <text x="320" y="156" textAnchor="middle" fontSize="8" fontWeight="800" fill="#854d0e" fontFamily={sans}>
          all constraints
        </text>
        <text x="320" y="168" textAnchor="middle" fontSize="7" fill="#a16207" fontFamily={sans}>
          OK?
        </text>

        <line x1="380" y1="152" x2="460" y2="152" stroke="#16a34a" strokeWidth="1.8" markerEnd={`url(#${p}-arrowhead)`} />
        <text x="410" y="144" fontSize="7" fill="#15803d" fontFamily={sans}>
          yes
        </text>
        <rect x="468" y="132" width="152" height="40" rx="8" fill="#dcfce7" stroke="#22c55e" />
        <text x="544" y="150" textAnchor="middle" fontSize="8" fontWeight="800" fill="#14532d" fontFamily="system-ui">
          Controller method
        </text>
        <text x="544" y="162" textAnchor="middle" fontSize="7" fill="#365314" fontFamily="system-ui">
          runs · 200 OK
        </text>

        <line x1="260" y1="152" x2="120" y2="152" stroke="#dc2626" strokeWidth="1.8" markerEnd={`url(#${p}-arrowhead)`} />
        <text x="190" y="144" fontSize="7" fill="#b91c1c" fontFamily={sans}>
          no
        </text>
        <rect x="16" y="128" width="100" height="48" rx="8" fill="#fee2e2" stroke="#ef4444" />
        <text x="66" y="148" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#991b1b" fontFamily="ui-monospace">
          400 Bad Request
        </text>
        <text x="66" y="162" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily="system-ui">
          field errors JSON
        </text>

        <text x="320" y="220" textAnchor="middle" fontSize="7.5" fill="#64748b" fontFamily={sans}>
          Default handler: MethodArgumentNotValidException → customize with @ControllerAdvice.
        </text>
      </svg>
    </figure>
  );
}

/** Global exception handling path */
export function SpringBootExceptionAdviceFlowDiagram() {
  const p = useSvgPrefix();
  const sans = 'system-ui, Segoe UI, sans-serif';
  return (
    <figure className="flowchart-pro flowchart-pro-springboot-flow" role="img" aria-label="Controller advice exception flow">
      <FlowchartFigcaption
        title="Exception path — from throw to HTTP response"
        fresher="Exceptions bubble out of services and controllers. @ControllerAdvice classes register @ExceptionHandler methods by exception type, so one place maps business errors to status codes and JSON bodies."
      />
      <svg viewBox="0 0 640 200" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="32" y="24" width="120" height="44" rx="8" fill={`url(#${p}-node-top)`} stroke="#94a3b8" />
        <text x="92" y="50" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#0f172a" fontFamily="system-ui">
          @RestController
        </text>
        <line x1="152" y1="46" x2="188" y2="46" stroke="#2563eb" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <text x="170" y="40" fontSize="6.5" fill="#64748b" fontFamily={sans}>
          throws
        </text>

        <rect x="196" y="24" width="120" height="44" rx="8" fill="#fef3c7" stroke="#f59e0b" />
        <text x="256" y="48" textAnchor="middle" fontSize="8" fontWeight="800" fill="#92400e" fontFamily="system-ui">
          Service layer
        </text>

        <line x1="316" y1="46" x2="352" y2="46" stroke="#2563eb" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <rect x="360" y="24" width="120" height="44" rx="8" fill="#fee2e2" stroke="#ef4444" />
        <text x="420" y="48" textAnchor="middle" fontSize="8" fontWeight="800" fill="#991b1b" fontFamily="system-ui">
          Exception
        </text>

        <line x1="420" y1="68" x2="420" y2="96" stroke="#64748b" strokeWidth="1.5" markerEnd={`url(#${p}-arrowhead)`} />
        <rect x="340" y="100" width="160" height="48" rx="8" fill="#dbeafe" stroke="#2563eb" />
        <text x="420" y="122" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#1e40af" fontFamily="ui-monospace">
          @ControllerAdvice
        </text>
        <text x="420" y="136" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily={sans}>
          @ExceptionHandler
        </text>

        <line x1="420" y1="148" x2="420" y2="168" stroke="#2563eb" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <rect x="300" y="172" width="240" height="22" rx="6" fill="#ecfdf5" stroke="#22c55e" />
        <text x="420" y="187" textAnchor="middle" fontSize="8" fontWeight="700" fill="#14532d" fontFamily="system-ui">
          ResponseEntity / ProblemDetail → client
        </text>
      </svg>
    </figure>
  );
}

/** Transaction commit vs rollback */
export function SpringBootTransactionalFlowDiagram() {
  const p = useSvgPrefix();
  const sans = 'system-ui, Segoe UI, sans-serif';
  return (
    <figure className="flowchart-pro flowchart-pro-springboot-flow" role="img" aria-label="Transactional commit and rollback">
      <FlowchartFigcaption
        title="@Transactional boundary — commit or rollback"
        fresher="Spring starts a transaction when you enter an annotated method (usually on a service). If the method returns normally, the transaction commits. If an unchecked exception propagates out, the transaction rolls back by default."
      />
      <svg viewBox="0 0 560 240" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="160" y="16" width="240" height="36" rx="8" fill="#f0fdf4" stroke="#16a34a" />
        <text x="280" y="38" textAnchor="middle" fontSize="9" fontWeight="800" fill="#14532d" fontFamily="ui-monospace">
          @Transactional service method
        </text>
        <line x1="280" y1="52" x2="280" y2="72" stroke="#15803d" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />

        <path d="M 280 72 L 340 112 L 280 152 L 220 112 Z" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.3" />
        <text x="280" y="116" textAnchor="middle" fontSize="8" fontWeight="800" fill="#854d0e" fontFamily={sans}>
          uncaught runtime
        </text>
        <text x="280" y="128" textAnchor="middle" fontSize="7" fill="#a16207" fontFamily={sans}>
          exception?
        </text>

        <line x1="340" y1="112" x2="420" y2="112" stroke="#16a34a" strokeWidth="1.8" markerEnd={`url(#${p}-arrowhead)`} />
        <text x="370" y="104" fontSize="7" fill="#15803d" fontFamily={sans}>
          no
        </text>
        <rect x="428" y="92" width="112" height="40" rx="8" fill="#dcfce7" stroke="#22c55e" />
        <text x="484" y="110" textAnchor="middle" fontSize="8" fontWeight="800" fill="#14532d" fontFamily="system-ui">
          COMMIT
        </text>
        <text x="484" y="122" textAnchor="middle" fontSize="6.5" fill="#365314" fontFamily={sans}>
          DB persists
        </text>

        <line x1="220" y1="112" x2="140" y2="112" stroke="#dc2626" strokeWidth="1.8" markerEnd={`url(#${p}-arrowhead)`} />
        <text x="180" y="104" fontSize="7" fill="#b91c1c" fontFamily={sans}>
          yes
        </text>
        <rect x="28" y="92" width="112" height="40" rx="8" fill="#fee2e2" stroke="#ef4444" />
        <text x="84" y="110" textAnchor="middle" fontSize="8" fontWeight="800" fill="#991b1b" fontFamily="system-ui">
          ROLLBACK
        </text>
        <text x="84" y="122" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily={sans}>
          default rule
        </text>

        <text x="280" y="188" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily={sans}>
          rollbackFor / noRollbackFor and readOnly tweak this behavior.
        </text>
      </svg>
    </figure>
  );
}

/** Deploy: build → artifact → run */
export function SpringBootDeploymentPipelineFlowDiagram() {
  const p = useSvgPrefix();
  const steps = [
    { x: 32, label: 'mvn package\ngradle build', sub: 'compile + test' },
    { x: 168, label: 'Fat JAR\n/ WAR', sub: 'executable' },
    { x: 304, label: 'Container\nimage', sub: 'optional' },
    { x: 440, label: 'Run', sub: 'VM · K8s · cloud' }
  ];
  return (
    <figure className="flowchart-pro flowchart-pro-springboot-wide" role="img" aria-label="Spring Boot deployment pipeline">
      <FlowchartFigcaption
        title="Deployment pipeline — artifact to runtime"
        fresher="You compile and test, package a self-contained JAR, optionally bake a Docker image, then run where your platform schedules containers or VMs. Health checks from Actuator tell the orchestrator when traffic is safe."
      />
      <svg viewBox="0 0 600 140" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="16" y="28" width="568" height="92" rx="10" fill="#f0fdf4" stroke="#86efac" />
        {steps.map((s, i) => (
          <g key={s.label}>
            <rect x={s.x} y="44" width="120" height="60" rx="8" fill="#ffffff" stroke="#16a34a" strokeWidth="1.1" filter={`url(#${p}-shadow)`} />
            <text x={s.x + 60} y="64" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#14532d" fontFamily="system-ui">
              {s.label.split('\n').map((line, li) => (
                <tspan key={line} x={s.x + 60} dy={li === 0 ? 0 : 11}>
                  {line}
                </tspan>
              ))}
            </text>
            <text x={s.x + 60} y="94" textAnchor="middle" fontSize="6.5" fill="#4d7c0f" fontFamily="system-ui">
              {s.sub}
            </text>
            {i < steps.length - 1 && (
              <line
                x1={s.x + 124}
                y1="74"
                x2={steps[i + 1].x - 4}
                y2="74"
                stroke="#15803d"
                strokeWidth="2"
                markerEnd={`url(#${p}-arrowhead)`}
              />
            )}
          </g>
        ))}
      </svg>
    </figure>
  );
}

/** SMTP send sequence */
export function SpringBootMailFlowDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-springboot-flow" role="img" aria-label="JavaMail send sequence">
      <FlowchartFigcaption
        title="Sending mail — application to SMTP server"
        fresher="Your service calls JavaMailSender; Spring Boot auto-configures it from spring.mail.* properties. The sender hands the MIME message to the configured SMTP host—TLS and auth follow your property settings."
      />
      <svg viewBox="0 0 620 180" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        {[
          { x: 24, w: 100, t: 'Controller /\nScheduler', c: '#dbeafe', stroke: '#2563eb' },
          { x: 148, w: 100, t: 'Service', c: '#eff6ff', stroke: '#3b82f6' },
          { x: 272, w: 120, t: 'JavaMailSender', c: '#fef3c7', stroke: '#f59e0b' },
          { x: 416, w: 100, t: 'SMTP\nhost:port', c: '#ecfdf5', stroke: '#22c55e' },
          { x: 540, w: 68, t: 'Inbox', c: '#f1f5f9', stroke: '#64748b' }
        ].map((b, i, arr) => (
          <g key={b.t}>
            <rect x={b.x} y="48" width={b.w} height="56" rx="8" fill={b.c} stroke={b.stroke} filter={`url(#${p}-shadow)`} />
            <text x={b.x + b.w / 2} y="74" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#0f172a" fontFamily="system-ui">
              {b.t.split('\n').map((line, li) => (
                <tspan key={line} x={b.x + b.w / 2} dy={li === 0 ? 0 : 11}>
                  {line}
                </tspan>
              ))}
            </text>
            {i < arr.length - 1 && (
              <line
                x1={b.x + b.w + 4}
                y1="76"
                x2={arr[i + 1].x - 4}
                y2="76"
                stroke="#15803d"
                strokeWidth="2"
                markerEnd={`url(#${p}-arrowhead)`}
              />
            )}
          </g>
        ))}
        <text x="310" y="130" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily="system-ui">
          Async send + retries are often added around this path for resilience.
        </text>
      </svg>
    </figure>
  );
}

/** Testing pyramid for Spring Boot */
export function SpringBootTestPyramidFlowDiagram() {
  const p = useSvgPrefix();
  const layers = [
    { y: 120, w: 420, h: 36, t: 'Integration / @SpringBootTest', s: 'few, slow, high confidence' },
    { y: 76, w: 320, h: 36, t: '@WebMvcTest · @DataJpaTest slices', s: 'medium count' },
    { y: 32, w: 220, h: 36, t: 'Pure unit tests', s: 'many, fast' }
  ];
  return (
    <figure className="flowchart-pro flowchart-pro-springboot-flow" role="img" aria-label="Spring Boot test pyramid">
      <FlowchartFigcaption
        title="Test pyramid — how many of each kind"
        fresher="Lots of fast unit tests at the top of the pyramid, fewer slice tests that spin part of Spring, and a small set of full integration tests. This keeps CI fast while still catching wiring bugs."
      />
      <svg viewBox="0 0 480 200" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <text x="240" y="22" textAnchor="middle" fontSize="9" fontWeight="800" fill="#14532d" fontFamily="system-ui">
          More tests ↑ · Broader scope ↓
        </text>
        {layers.map((L) => (
          <g key={L.t}>
            <rect x={240 - L.w / 2} y={L.y} width={L.w} height={L.h} rx="8" fill="#ecfdf5" stroke="#16a34a" filter={`url(#${p}-shadow)`} />
            <text x="240" y={L.y + 16} textAnchor="middle" fontSize="8" fontWeight="800" fill="#14532d" fontFamily="ui-monospace">
              {L.t}
            </text>
            <text x="240" y={L.y + 30} textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily="system-ui">
              {L.s}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  );
}

/** OpenAPI doc flow */
export function SpringBootOpenApiDocFlowDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-springboot-flow" role="img" aria-label="OpenAPI documentation flow">
      <FlowchartFigcaption
        title="From running app to API docs"
        fresher="springdoc scans your @RestController mappings at runtime and serves OpenAPI JSON plus Swagger UI. Clients like Postman can import the same document to build requests."
      />
      <svg viewBox="0 0 600 160" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="24" y="40" width="120" height="48" rx="8" fill="#ecfdf5" stroke="#22c55e" />
        <text x="84" y="62" textAnchor="middle" fontSize="8" fontWeight="800" fill="#14532d" fontFamily="system-ui">
          Controllers
        </text>
        <text x="84" y="76" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily="system-ui">
          mappings + DTOs
        </text>
        <line x1="144" y1="64" x2="176" y2="64" stroke="#2563eb" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <rect x="184" y="36" width="140" height="56" rx="8" fill="#dbeafe" stroke="#2563eb" />
        <text x="254" y="58" textAnchor="middle" fontSize="8" fontWeight="800" fill="#1e40af" fontFamily="ui-monospace">
          springdoc-openapi
        </text>
        <text x="254" y="74" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily="system-ui">
          /v3/api-docs
        </text>
        <line x1="324" y1="64" x2="356" y2="64" stroke="#2563eb" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <rect x="364" y="40" width="100" height="48" rx="8" fill="#fef3c7" stroke="#f59e0b" />
        <text x="414" y="62" textAnchor="middle" fontSize="8" fontWeight="800" fill="#92400e" fontFamily="system-ui">
          Swagger UI
        </text>
        <line x1="464" y1="64" x2="496" y2="64" stroke="#2563eb" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <rect x="504" y="40" width="72" height="48" rx="8" fill="#f1f5f9" stroke="#94a3b8" />
        <text x="540" y="66" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#334155" fontFamily="system-ui">
          Postman
        </text>
        <text x="300" y="118" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily="system-ui">
          One OpenAPI description powers interactive docs and client tooling.
        </text>
      </svg>
    </figure>
  );
}

/** Real scenario: login then Bearer JWT on later calls (stateless API) */
export function SpringBootJwtBearerScenarioDiagram() {
  const p = useSvgPrefix();
  const sans = 'system-ui, Segoe UI, sans-serif';
  const mono = 'ui-monospace, Consolas, monospace';
  return (
    <figure className="flowchart-pro flowchart-pro-springboot-scenario" role="img" aria-label="JWT login and authenticated request scenario">
      <FlowchartFigcaption
        title="Real scenario: secure REST — login, then call protected API"
        fresher="First request: client posts credentials; Spring Security authenticates and issues a JWT. Later requests: client sends an Authorization: Bearer JWT header; JwtAuthenticationFilter validates signature and expiry, fills SecurityContext, then your @RestController runs as usual."
      />
      <svg viewBox="0 0 720 268" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <text x="360" y="18" textAnchor="middle" fontSize="9" fontWeight="800" fill="#14532d" fontFamily={sans}>
          ① First-time login (get a token)
        </text>
        <rect x="16" y="28" width="88" height="40" rx="8" fill="#e0f2fe" stroke="#0284c7" />
        <text x="60" y="48" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#0c4a6e" fontFamily={sans}>
          Client
        </text>
        <text x="60" y="60" textAnchor="middle" fontSize="6" fill="#64748b" fontFamily={sans}>
          SPA / mobile
        </text>
        <line x1="104" y1="48" x2="132" y2="48" stroke="#15803d" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <text x="118" y="42" fontSize="6" fill="#64748b" fontFamily={sans}>
          POST
        </text>
        <rect x="136" y="28" width="120" height="40" rx="8" fill="#ecfdf5" stroke="#16a34a" />
        <text x="196" y="48" textAnchor="middle" fontSize="7" fontWeight="800" fill="#14532d" fontFamily={mono}>
          /api/auth/login
        </text>
        <line x1="256" y1="48" x2="284" y2="48" stroke="#15803d" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <rect x="288" y="26" width="140" height="44" rx="8" fill="#fff7ed" stroke="#ea580c" />
        <text x="358" y="44" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#9a3412" fontFamily={sans}>
          AuthenticationManager
        </text>
        <text x="358" y="58" textAnchor="middle" fontSize="6" fill="#64748b" fontFamily={sans}>
          UserDetailsService + PasswordEncoder
        </text>
        <line x1="428" y1="48" x2="456" y2="48" stroke="#15803d" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <rect x="460" y="28" width="120" height="40" rx="8" fill="#dbeafe" stroke="#2563eb" />
        <text x="520" y="48" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#1e40af" fontFamily={sans}>
          JWT issued
        </text>
        <text x="520" y="60" textAnchor="middle" fontSize="6" fill="#64748b" fontFamily={mono}>
          access + refresh
        </text>
        <line x1="580" y1="48" x2="612" y2="48" stroke="#15803d" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <rect x="616" y="28" width="88" height="40" rx="8" fill="#f0fdf4" stroke="#22c55e" />
        <text x="660" y="50" textAnchor="middle" fontSize="7" fontWeight="800" fill="#14532d" fontFamily={sans}>
          200 + body
        </text>

        <text x="360" y="100" textAnchor="middle" fontSize="9" fontWeight="800" fill="#14532d" fontFamily={sans}>
          ② Later: call protected resource (same session, no server session store)
        </text>
        <rect x="16" y="112" width="88" height="40" rx="8" fill="#e0f2fe" stroke="#0284c7" />
        <text x="60" y="138" textAnchor="middle" fontSize="7" fontWeight="800" fill="#0c4a6e" fontFamily={sans}>
          Client
        </text>
        <text x="60" y="148" textAnchor="middle" fontSize="6" fill="#64748b" fontFamily={mono}>
          Bearer eyJ…
        </text>
        <line x1="104" y1="132" x2="132" y2="132" stroke="#15803d" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <rect x="136" y="110" width="124" height="44" rx="8" fill="#fef3c7" stroke="#f59e0b" />
        <text x="198" y="130" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#92400e" fontFamily={sans}>
          JwtAuthenticationFilter
        </text>
        <text x="198" y="144" textAnchor="middle" fontSize="6" fill="#64748b" fontFamily={sans}>
          validate + SecurityContext
        </text>
        <line x1="260" y1="132" x2="288" y2="132" stroke="#15803d" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <rect x="292" y="112" width="120" height="40" rx="8" fill="#ecfdf5" stroke="#16a34a" />
        <text x="352" y="132" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#14532d" fontFamily={mono}>
          GET /api/orders
        </text>
        <line x1="412" y1="132" x2="440" y2="132" stroke="#15803d" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <rect x="444" y="112" width="100" height="40" rx="8" fill="#eff6ff" stroke="#3b82f6" />
        <text x="494" y="132" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#1e40af" fontFamily={sans}>
          Controller
        </text>
        <line x1="544" y1="132" x2="572" y2="132" stroke="#15803d" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <rect x="576" y="112" width="128" height="40" rx="8" fill="#f0fdf4" stroke="#22c55e" />
        <text x="640" y="132" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#14532d" fontFamily={sans}>
          Service → DB
        </text>

        <text x="360" y="188" textAnchor="middle" fontSize="7.5" fill="#64748b" fontFamily={sans}>
          Production tip: short access token TTL, refresh endpoint, HTTPS only, never log raw tokens.
        </text>
      </svg>
    </figure>
  );
}

/** E-commerce style: place order with payment + DB (simplified) */
export function SpringBootOrderPaymentScenarioDiagram() {
  const p = useSvgPrefix();
  const sans = 'system-ui, Segoe UI, sans-serif';
  const mono = 'ui-monospace, Consolas, monospace';
  return (
    <figure className="flowchart-pro flowchart-pro-springboot-scenario" role="img" aria-label="Order checkout scenario">
      <FlowchartFigcaption
        title="Real scenario: checkout — REST → service → payment gateway → persist"
        fresher="Typical flow: client POSTs a cart; controller validates input; a transactional service reserves stock, calls the payment provider (Stripe/Razorpay HTTP client), then saves the order row. On payment failure you roll back or compensate—this diagram shows the happy path."
      />
      <svg viewBox="0 0 720 200" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="12" y="36" width="696" height="128" rx="12" fill="#f8fafc" stroke="#86efac" />
        <text x="360" y="32" textAnchor="middle" fontSize="8" fontWeight="800" fill="#14532d" fontFamily={sans}>
          Happy path: payment authorized → order row committed
        </text>
        <rect x="24" y="56" width="72" height="56" rx="8" fill="#e0f2fe" stroke="#0284c7" filter={`url(#${p}-shadow)`} />
        <text x="60" y="78" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#0f172a" fontFamily={sans}>
          Customer
        </text>
        <text x="60" y="96" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily={sans}>
          browser / app
        </text>
        <line x1="96" y1="84" x2="108" y2="84" stroke="#15803d" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <rect x="112" y="56" width="100" height="56" rx="8" fill="#ecfdf5" stroke="#16a34a" filter={`url(#${p}-shadow)`} />
        <text x="162" y="78" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#0f172a" fontFamily={mono}>
          POST /orders
        </text>
        <text x="162" y="96" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily={sans}>
          JSON cart
        </text>
        <line x1="212" y1="84" x2="224" y2="84" stroke="#15803d" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <rect x="228" y="56" width="96" height="56" rx="8" fill="#eff6ff" stroke="#2563eb" filter={`url(#${p}-shadow)`} />
        <text x="276" y="78" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#0f172a" fontFamily={sans}>
          OrderController
        </text>
        <text x="276" y="96" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily={sans}>
          @Valid DTO
        </text>
        <line x1="324" y1="84" x2="336" y2="84" stroke="#15803d" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <rect x="340" y="56" width="104" height="56" rx="8" fill="#fff7ed" stroke="#ea580c" filter={`url(#${p}-shadow)`} />
        <text x="392" y="78" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#0f172a" fontFamily={sans}>
          OrderService
        </text>
        <text x="392" y="96" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily={sans}>
          @Transactional
        </text>
        <line x1="444" y1="84" x2="456" y2="84" stroke="#15803d" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <rect x="460" y="56" width="112" height="56" rx="8" fill="#fef3c7" stroke="#f59e0b" filter={`url(#${p}-shadow)`} />
        <text x="516" y="78" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#0f172a" fontFamily={sans}>
          PaymentClient
        </text>
        <text x="516" y="96" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily={sans}>
          REST to PSP
        </text>
        <line x1="572" y1="84" x2="584" y2="84" stroke="#15803d" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <rect x="588" y="56" width="108" height="56" rx="8" fill="#ede9fe" stroke="#7c3aed" filter={`url(#${p}-shadow)`} />
        <text x="642" y="78" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#0f172a" fontFamily={sans}>
          OrderRepository
        </text>
        <text x="642" y="96" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily={sans}>
          save()
        </text>
        <text x="360" y="182" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily={sans}>
          Idempotency keys and outbox pattern are common add-ons for production payments.
        </text>
      </svg>
    </figure>
  );
}

/** Cache-aside read — hit vs miss (realistic API caching) */
export function SpringBootCacheAsideScenarioDiagram() {
  const p = useSvgPrefix();
  const sans = 'system-ui, Segoe UI, sans-serif';
  return (
    <figure className="flowchart-pro flowchart-pro-springboot-scenario" role="img" aria-label="Cache-aside pattern scenario">
      <FlowchartFigcaption
        title="Real scenario: cache-aside on GET /products/{id}"
        fresher="First caller may miss the cache: you load from the database, put the result in Redis or Caffeine, then return. Next callers hit the cache and avoid DB. @Cacheable abstracts this; eviction happens on updates (@CacheEvict)."
      />
      <svg viewBox="0 0 640 240" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="200" y="16" width="240" height="36" rx="8" fill="#dbeafe" stroke="#2563eb" />
        <text x="320" y="38" textAnchor="middle" fontSize="9" fontWeight="800" fill="#1e40af" fontFamily="system-ui">
          GET /api/products/42
        </text>
        <line x1="320" y1="52" x2="320" y2="68" stroke="#2563eb" strokeWidth="1.8" markerEnd={`url(#${p}-arrowhead)`} />
        <rect x="240" y="72" width="160" height="36" rx="8" fill="#fef9c3" stroke="#ca8a04" />
        <text x="320" y="94" textAnchor="middle" fontSize="8" fontWeight="800" fill="#854d0e" fontFamily="system-ui">
          Cache (Redis / Caffeine)
        </text>
        <line x1="320" y1="108" x2="320" y2="124" stroke="#2563eb" strokeWidth="1.8" markerEnd={`url(#${p}-arrowhead)`} />
        <path d="M 320 124 L 380 156 L 320 188 L 260 156 Z" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.3" />
        <text x="320" y="158" textAnchor="middle" fontSize="8" fontWeight="800" fill="#92400e" fontFamily={sans}>
          key present?
        </text>
        <line x1="380" y1="156" x2="460" y2="156" stroke="#16a34a" strokeWidth="1.8" markerEnd={`url(#${p}-arrowhead)`} />
        <text x="410" y="148" fontSize="7" fill="#15803d" fontFamily={sans}>
          hit
        </text>
        <rect x="468" y="136" width="152" height="40" rx="8" fill="#dcfce7" stroke="#22c55e" />
        <text x="544" y="158" textAnchor="middle" fontSize="8" fontWeight="800" fill="#14532d" fontFamily="system-ui">
          200 + cached JSON
        </text>
        <line x1="260" y1="156" x2="120" y2="156" stroke="#dc2626" strokeWidth="1.8" markerEnd={`url(#${p}-arrowhead)`} />
        <text x="190" y="148" fontSize="7" fill="#b91c1c" fontFamily={sans}>
          miss
        </text>
        <rect x="28" y="132" width="88" height="48" rx="8" fill="#ede9fe" stroke="#7c3aed" />
        <text x="72" y="152" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#5b21b6" fontFamily="system-ui">
          JPA query
        </text>
        <text x="72" y="166" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily="system-ui">
          DB row
        </text>
        <line x1="116" y1="156" x2="200" y2="100" stroke="#64748b" strokeWidth="1.2" strokeDasharray="4 3" markerEnd={`url(#${p}-arrowhead)`} />
        <text x="150" y="118" fontSize="6.5" fill="#64748b" fontFamily={sans}>
          populate
        </text>
        <text x="320" y="220" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily={sans}>
          TTL and stale-while-revalidate policies depend on how fresh data must be.
        </text>
      </svg>
    </figure>
  );
}

/** Kubernetes probes hitting Actuator (production ops scenario) */
export function SpringBootK8sProbeScenarioDiagram() {
  const p = useSvgPrefix();
  const sans = 'system-ui, Segoe UI, sans-serif';
  return (
    <figure className="flowchart-pro flowchart-pro-springboot-scenario" role="img" aria-label="Kubernetes health probe scenario">
      <FlowchartFigcaption
        title="Real scenario: Kubernetes probes + Spring Boot Actuator"
        fresher="The kubelet calls your pod’s HTTP endpoint on a schedule. Liveness decides whether to restart the container; readiness decides whether to send traffic. Bind Actuator to a port the cluster can reach, and implement custom HealthIndicators for dependencies you need before taking traffic."
      />
      <svg viewBox="0 0 640 220" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="24" y="28" width="100" height="52" rx="8" fill="#e0e7ff" stroke="#6366f1" />
        <text x="74" y="50" textAnchor="middle" fontSize="8" fontWeight="800" fill="#312e81" fontFamily={sans}>
          kubelet
        </text>
        <text x="74" y="64" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily={sans}>
          probe timer
        </text>
        <line x1="124" y1="54" x2="156" y2="54" stroke="#15803d" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <text x="140" y="46" fontSize="6" fill="#64748b" fontFamily={sans}>
          HTTP GET
        </text>
        <rect x="160" y="30" width="200" height="48" rx="8" fill="#ecfdf5" stroke="#16a34a" />
        <text x="260" y="50" textAnchor="middle" fontSize="8" fontWeight="800" fill="#14532d" fontFamily="ui-monospace">
          {'/actuator/health/{liveness,readiness}'}
        </text>
        <text x="260" y="64" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily={sans}>
          Actuator + HealthIndicator beans
        </text>
        <line x1="360" y1="54" x2="392" y2="54" stroke="#15803d" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <rect x="396" y="28" width="100" height="52" rx="8" fill="#fef3c7" stroke="#f59e0b" />
        <text x="446" y="48" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#92400e" fontFamily={sans}>
          DB / broker
        </text>
        <text x="446" y="62" textAnchor="middle" fontSize="6" fill="#64748b" fontFamily={sans}>
          ping
        </text>
        <line x1="496" y1="54" x2="528" y2="54" stroke="#15803d" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <rect x="532" y="32" width="84" height="44" rx="8" fill="#dcfce7" stroke="#22c55e" />
        <text x="574" y="54" textAnchor="middle" fontSize="8" fontWeight="800" fill="#14532d" fontFamily={sans}>
          200 UP
        </text>
        <text x="320" y="100" textAnchor="middle" fontSize="7.5" fill="#64748b" fontFamily={sans}>
          Liveness failure → pod restart · Readiness failure → remove from Service endpoints
        </text>
        <rect x="80" y="118" width="480" height="72" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
        <text x="320" y="138" textAnchor="middle" fontSize="8" fontWeight="800" fill="#0f172a" fontFamily={sans}>
          What operators expect in production
        </text>
        <text x="320" y="158" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily={sans}>
          Separate management port · auth on actuator · fast timeouts on dependency checks · avoid heavy work in liveness
        </text>
        <text x="320" y="176" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily={sans}>
          Spring Boot 3: /actuator/health/liveness & /readiness when using dedicated groups
        </text>
      </svg>
    </figure>
  );
}

/** Scheduled batch job (cron) — nightly report style */
export function SpringBootScheduledJobScenarioDiagram() {
  const p = useSvgPrefix();
  const sans = 'system-ui, Segoe UI, sans-serif';
  const mono = 'ui-monospace, Consolas, monospace';
  return (
    <figure className="flowchart-pro flowchart-pro-springboot-scenario" role="img" aria-label="Scheduled job scenario">
      <FlowchartFigcaption
        title="Real scenario: @Scheduled cron — batch without a human click"
        fresher="Spring’s scheduler triggers a method at a cron expression (e.g. every night at 2am). The method runs in a pool thread; use a transactional service to query aggregates, write a CSV to object storage, or enqueue emails. For clusters, add ShedLock or an external scheduler so only one pod runs the job."
      />
      <svg viewBox="0 0 640 180" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="32" y="44" width="88" height="44" rx="8" fill="#e0e7ff" stroke="#6366f1" />
        <text x="76" y="66" textAnchor="middle" fontSize="8" fontWeight="800" fill="#312e81" fontFamily={sans}>
          Clock
        </text>
        <text x="76" y="78" textAnchor="middle" fontSize="6" fill="#64748b" fontFamily={mono}>
          0 2 * * *
        </text>
        <line x1="120" y1="66" x2="152" y2="66" stroke="#15803d" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <rect x="156" y="40" width="140" height="52" rx="8" fill="#ecfdf5" stroke="#16a34a" />
        <text x="226" y="62" textAnchor="middle" fontSize="8" fontWeight="800" fill="#14532d" fontFamily={mono}>
          @Scheduled
        </text>
        <text x="226" y="78" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily={sans}>
          @EnableScheduling
        </text>
        <line x1="296" y1="66" x2="328" y2="66" stroke="#15803d" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <rect x="332" y="42" width="120" height="48" rx="8" fill="#fff7ed" stroke="#ea580c" />
        <text x="392" y="64" textAnchor="middle" fontSize="8" fontWeight="800" fill="#9a3412" fontFamily={sans}>
          ReportService
        </text>
        <text x="392" y="78" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily={sans}>
          @Transactional read
        </text>
        <line x1="452" y1="66" x2="484" y2="66" stroke="#15803d" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <rect x="488" y="42" width="120" height="48" rx="8" fill="#ede9fe" stroke="#7c3aed" />
        <text x="548" y="64" textAnchor="middle" fontSize="8" fontWeight="800" fill="#5b21b6" fontFamily={sans}>
          Repository
        </text>
        <text x="548" y="78" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily={sans}>
          SQL / export
        </text>
        <text x="320" y="120" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily={sans}>
          Multi-node: use distributed lock or leader election so the job does not run twice.
        </text>
        <text x="320" y="138" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily={sans}>
          @Async here does not replace scheduling—it only offloads work after trigger.
        </text>
      </svg>
    </figure>
  );
}

/** Event-driven: user registered → async listener sends welcome email */
export function SpringBootEventAsyncEmailScenarioDiagram() {
  const p = useSvgPrefix();
  const sans = 'system-ui, Segoe UI, sans-serif';
  const mono = 'ui-monospace, Consolas, monospace';
  return (
    <figure className="flowchart-pro flowchart-pro-springboot-scenario" role="img" aria-label="ApplicationEvent async email scenario">
      <FlowchartFigcaption
        title="Real scenario: registration publishes event — listener sends email off the HTTP thread"
        fresher="The controller returns 201 quickly after saving the user. An ApplicationEvent is published; a @TransactionalEventListener(AFTER_COMMIT) or @Async listener picks it up and calls JavaMailSender so SMTP latency does not block the client. If mail fails, use retry or a dead-letter queue."
      />
      <svg viewBox="0 0 720 210" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="16" y="32" width="88" height="40" rx="8" fill="#e0f2fe" stroke="#0284c7" />
        <text x="60" y="56" textAnchor="middle" fontSize="8" fontWeight="800" fill="#0c4a6e" fontFamily={sans}>
          Client
        </text>
        <line x1="104" y1="52" x2="136" y2="52" stroke="#15803d" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <rect x="140" y="28" width="120" height="48" rx="8" fill="#ecfdf5" stroke="#16a34a" />
        <text x="200" y="50" textAnchor="middle" fontSize="8" fontWeight="800" fill="#14532d" fontFamily={mono}>
          POST /users
        </text>
        <text x="200" y="64" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily={sans}>
          UserController
        </text>
        <line x1="260" y1="52" x2="292" y2="52" stroke="#15803d" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <rect x="296" y="28" width="120" height="48" rx="8" fill="#fff7ed" stroke="#ea580c" />
        <text x="356" y="50" textAnchor="middle" fontSize="8" fontWeight="800" fill="#9a3412" fontFamily={sans}>
          UserService
        </text>
        <text x="356" y="64" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily={sans}>
          save + commit
        </text>
        <line x1="416" y1="52" x2="448" y2="52" stroke="#15803d" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <rect x="452" y="28" width="120" height="48" rx="8" fill="#dbeafe" stroke="#2563eb" />
        <text x="512" y="50" textAnchor="middle" fontSize="7" fontWeight="800" fill="#1e40af" fontFamily={mono}>
          publishEvent
        </text>
        <text x="512" y="64" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily={mono}>
          UserRegisteredEvent
        </text>
        <line x1="572" y1="52" x2="604" y2="52" stroke="#15803d" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <rect x="608" y="32" width="96" height="40" rx="8" fill="#dcfce7" stroke="#22c55e" />
        <text x="656" y="54" textAnchor="middle" fontSize="8" fontWeight="800" fill="#14532d" fontFamily={sans}>
          201 Created
        </text>

        <text x="360" y="108" textAnchor="middle" fontSize="8" fontWeight="800" fill="#64748b" fontFamily={sans}>
          After HTTP response (often after commit):
        </text>
        <rect x="200" y="118" width="140" height="44" rx="8" fill="#fef3c7" stroke="#f59e0b" />
        <text x="270" y="138" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#92400e" fontFamily={sans}>
          @EventListener / async
        </text>
        <text x="270" y="152" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily={sans}>
          WelcomeEmailListener
        </text>
        <line x1="340" y1="140" x2="372" y2="140" stroke="#15803d" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <rect x="376" y="118" width="144" height="44" rx="8" fill="#f0fdf4" stroke="#22c55e" />
        <text x="448" y="140" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#14532d" fontFamily={sans}>
          JavaMailSender
        </text>
        <text x="448" y="154" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily={sans}>
          SMTP (async thread)
        </text>

        <text x="360" y="188" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily={sans}>
          Same pattern for audit logs, analytics, and integration messages—keep the HTTP path fast.
        </text>
      </svg>
    </figure>
  );
}

/* —— Spring Framework (classic stack: IoC, MVC, JDBC, Data, AOP) —— */

/** High-level modules you learn in order */
export function SpringFrameworkModulesOverviewDiagram() {
  const p = useSvgPrefix();
  const sans = 'system-ui, Segoe UI, sans-serif';
  const mods = [
    { x: 40, y: 36, w: 150, t: 'Core Container', s: 'IoC · Beans · Context' },
    { x: 220, y: 36, w: 150, t: 'MVC / Web', s: 'DispatcherServlet · WebMVC' },
    { x: 400, y: 36, w: 150, t: 'JDBC / ORM', s: 'JdbcTemplate · tx' },
    { x: 130, y: 110, w: 150, t: 'Spring Data', s: 'Repository abstraction' },
    { x: 310, y: 110, w: 150, t: 'AOP', s: 'AspectJ style · proxies' },
    { x: 490, y: 110, w: 150, t: 'Test', s: 'MockMvc · TestContext' }
  ];
  return (
    <figure className="flowchart-pro flowchart-pro-springframework" role="img" aria-label="Spring Framework modules">
      <FlowchartFigcaption
        title="Spring Framework — major building blocks"
        fresher="You usually learn Core (IoC/DI) first, then wire MVC for web apps, use JdbcTemplate or Spring Data for persistence, and add AOP for cross-cutting concerns. Everything hangs off the ApplicationContext."
      />
      <svg viewBox="0 0 680 200" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="16" y="16" width="648" height="168" rx="14" fill="#f0fdf4" stroke="#6db33f" strokeWidth="1.2" />
        <text x="340" y="34" textAnchor="middle" fontSize="9" fontWeight="800" fill="#14532d" fontFamily={sans}>
          One ecosystem — compose only what you need
        </text>
        {mods.map((m) => (
          <g key={m.t}>
            <rect x={m.x} y={m.y} width={m.w} height="56" rx="10" fill="#ffffff" stroke="#6db33f" strokeWidth="1.1" filter={`url(#${p}-shadow)`} />
            <text x={m.x + m.w / 2} y={m.y + 24} textAnchor="middle" fontSize="9" fontWeight="800" fill="#14532d" fontFamily={sans}>
              {m.t}
            </text>
            <text x={m.x + m.w / 2} y={m.y + 44} textAnchor="middle" fontSize="7" fill="#64748b" fontFamily={sans}>
              {m.s}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  );
}

/** IoC container owns bean definitions and instances */
export function SpringFrameworkIocContainerDiagram() {
  const p = useSvgPrefix();
  const sans = 'system-ui, Segoe UI, sans-serif';
  return (
    <figure className="flowchart-pro flowchart-pro-springframework" role="img" aria-label="IoC container">
      <FlowchartFigcaption
        title="Inversion of Control — the container wires collaborators"
        fresher="Instead of `new` inside your classes, you declare beans (XML, Java config, or annotations). The ApplicationContext creates singletons (by default), injects dependencies, and hands you fully wired objects—this is the heart of Spring."
      />
      <svg viewBox="0 0 620 220" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="140" y="24" width="340" height="168" rx="14" fill="#ecfdf5" stroke="#6db33f" strokeWidth="1.4" />
        <text x="310" y="48" textAnchor="middle" fontSize="10" fontWeight="800" fill="#14532d" fontFamily={sans}>
          ApplicationContext (IoC container)
        </text>
        <rect x="180" y="64" width="120" height="48" rx="8" fill="#ffffff" stroke="#22c55e" filter={`url(#${p}-shadow)`} />
        <text x="240" y="88" textAnchor="middle" fontSize="8" fontWeight="800" fill="#14532d" fontFamily="ui-monospace">
          userService
        </text>
        <text x="240" y="102" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily={sans}>
          @Service bean
        </text>
        <rect x="340" y="64" width="120" height="48" rx="8" fill="#ffffff" stroke="#22c55e" filter={`url(#${p}-shadow)`} />
        <text x="400" y="88" textAnchor="middle" fontSize="8" fontWeight="800" fill="#14532d" fontFamily="ui-monospace">
          userRepository
        </text>
        <text x="400" y="102" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily={sans}>
          @Repository bean
        </text>
        <line x1="300" y1="88" x2="336" y2="88" stroke="#15803d" strokeWidth="1.8" markerEnd={`url(#${p}-arrowhead)`} />
        <text x="318" y="80" fontSize="6.5" fill="#64748b" fontFamily={sans}>
          injects
        </text>
        <text x="310" y="150" textAnchor="middle" fontSize="7.5" fill="#365314" fontFamily={sans}>
          Your code asks the container for beans — you do not call `new UserRepository()` in the service.
        </text>
      </svg>
    </figure>
  );
}

/** Constructor vs setter vs field injection */
export function SpringFrameworkInjectionStylesDiagram() {
  const p = useSvgPrefix();
  const cols = [
    { x: 32, title: 'Constructor', sub: 'recommended', note: 'immutable · testable' },
    { x: 232, title: 'Setter', sub: 'optional deps', note: 'mutable after creation' },
    { x: 432, title: 'Field', sub: '@Autowired', note: 'quick but hides deps' }
  ];
  return (
    <figure className="flowchart-pro flowchart-pro-springframework" role="img" aria-label="Dependency injection styles">
      <FlowchartFigcaption
        title="Three ways Spring can inject dependencies"
        fresher="Constructor injection makes required collaborators explicit and eases unit testing with plain `new`. Setter injection suits optional properties. Field injection is concise but harder to see dependencies in API surface—prefer constructor for services."
      />
      <svg viewBox="0 0 680 180" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        {cols.map((c) => (
          <g key={c.title}>
            <rect x={c.x} y="28" width="200" height="120" rx="10" fill="#ffffff" stroke="#6db33f" filter={`url(#${p}-shadow)`} />
            <text x={c.x + 100} y="52" textAnchor="middle" fontSize="9" fontWeight="800" fill="#14532d" fontFamily="system-ui">
              {c.title}
            </text>
            <text x={c.x + 100} y="72" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily="system-ui">
              {c.sub}
            </text>
            <text x={c.x + 100} y="128" textAnchor="middle" fontSize="7" fill="#365314" fontFamily="system-ui">
              {c.note}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  );
}

/** Bean lifecycle (singleton) */
export function SpringFrameworkBeanLifecycleDiagram() {
  const p = useSvgPrefix();
  const steps = [
    { y: 20, t: 'Bean definition', s: 'metadata' },
    { y: 56, t: 'Instantiate', s: 'constructor / factory' },
    { y: 92, t: 'Populate properties', s: 'DI' },
    { y: 128, t: 'init / @PostConstruct', s: 'optional callbacks' },
    { y: 164, t: 'Ready + destroy on shutdown', s: '@PreDestroy / DisposableBean' }
  ];
  return (
    <figure className="flowchart-pro flowchart-pro-springframework-flow" role="img" aria-label="Bean lifecycle">
      <FlowchartFigcaption
        title="Bean lifecycle — from definition to destruction"
        fresher="For singleton scope, one instance serves the whole context. Prototype scope creates a new bean per getBean—Spring does not manage full lifecycle for prototypes. Callbacks let you open resources on start and close them cleanly on shutdown."
      />
      <svg viewBox="0 0 520 220" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="100" y="12" width="320" height="196" rx="12" fill="#f8fafc" stroke="#86efac" />
        {steps.map((s, i) => (
          <g key={s.t}>
            <rect x="140" y={s.y} width="240" height="28" rx="6" fill="#ecfdf5" stroke="#16a34a" />
            <text x="260" y={s.y + 18} textAnchor="middle" fontSize="8" fontWeight="800" fill="#14532d" fontFamily="ui-monospace">
              {s.t}
            </text>
            <text x="260" y={s.y + 26} textAnchor="middle" fontSize="6" fill="#64748b" fontFamily="system-ui">
              {s.s}
            </text>
            {i < steps.length - 1 && (
              <line x1="260" y1={s.y + 28} x2="260" y2={steps[i + 1].y - 2} stroke="#15803d" strokeWidth="1.8" markerEnd={`url(#${p}-arrowhead)`} />
            )}
          </g>
        ))}
      </svg>
    </figure>
  );
}

/** Context refresh — mental model */
export function SpringFrameworkContextRefreshDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-springframework-flow" role="img" aria-label="ApplicationContext refresh">
      <FlowchartFigcaption
        title="ApplicationContext refresh — what happens at startup"
        fresher="Whether you load XML, scan @Component, or register @Bean methods, the context parses configuration into bean definitions, then instantiates singletons in dependency order. refresh() is expensive; in tests you often reuse a static context or use @DirtiesContext sparingly."
      />
      <svg viewBox="0 0 600 160" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        {[
          { x: 24, w: 120, t: 'Load config', s: 'XML / @Configuration' },
          { x: 168, w: 120, t: 'Bean definitions', s: 'metadata registry' },
          { x: 312, w: 120, t: 'Instantiate beans', s: 'dependency order' },
          { x: 456, w: 120, t: 'Context ready', s: 'getBean()' }
        ].map((b, i, arr) => (
          <g key={b.t}>
            <rect x={b.x} y="44" width={b.w} height="56" rx="8" fill="#ecfdf5" stroke="#6db33f" filter={`url(#${p}-shadow)`} />
            <text x={b.x + b.w / 2} y="70" textAnchor="middle" fontSize="8" fontWeight="800" fill="#14532d" fontFamily="system-ui">
              {b.t}
            </text>
            <text x={b.x + b.w / 2} y="88" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily="system-ui">
              {b.s}
            </text>
            {i < arr.length - 1 && (
              <line
                x1={b.x + b.w + 4}
                y1="72"
                x2={arr[i + 1].x - 4}
                y2="72"
                stroke="#15803d"
                strokeWidth="2"
                markerEnd={`url(#${p}-arrowhead)`}
              />
            )}
          </g>
        ))}
      </svg>
    </figure>
  );
}

/** XML vs Java configuration */
export function SpringFrameworkXmlVsJavaConfigDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-springframework" role="img" aria-label="XML versus Java configuration">
      <FlowchartFigcaption
        title="Two ways to declare beans — XML or Java config"
        fresher="Legacy apps often use applicationContext.xml; modern Spring favors @Configuration classes with @Bean methods and component scanning. Both produce the same bean definitions at runtime; Java config gives refactoring and type safety in the IDE."
      />
      <svg viewBox="0 0 640 200" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="32" y="32" width="260" height="136" rx="12" fill="#eff6ff" stroke="#2563eb" />
        <text x="162" y="56" textAnchor="middle" fontSize="9" fontWeight="800" fill="#1e40af" fontFamily="ui-monospace">
          beans.xml
        </text>
        <text x="162" y="78" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily="system-ui">
          &lt;bean id="…" class="…"/&gt;
        </text>
        <text x="162" y="100" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily="system-ui">
          ClassPathXmlApplicationContext
        </text>
        <rect x="348" y="32" width="260" height="136" rx="12" fill="#ecfdf5" stroke="#6db33f" />
        <text x="478" y="56" textAnchor="middle" fontSize="9" fontWeight="800" fill="#14532d" fontFamily="ui-monospace">
          @Configuration
        </text>
        <text x="478" y="78" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily="system-ui">
          @Bean methods + @ComponentScan
        </text>
        <text x="478" y="100" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily="system-ui">
          AnnotationConfigApplicationContext
        </text>
        <text x="320" y="178" textAnchor="middle" fontSize="7.5" fill="#64748b" fontFamily="system-ui">
          Pick one primary style per module; mixing is fine during migration.
        </text>
      </svg>
    </figure>
  );
}

/** DispatcherServlet pipeline */
export function SpringFrameworkDispatcherServletPipelineDiagram() {
  const p = useSvgPrefix();
  const row = [
    { x: 16, t: 'HTTP', s: 'request' },
    { x: 108, t: 'Dispatcher\nServlet', s: 'front controller' },
    { x: 212, t: 'Handler\nMapping', s: 'URL → method' },
    { x: 316, t: 'Controller', s: '@Controller' },
    { x: 420, t: 'ModelAndView', s: 'data + view name' },
    { x: 524, t: 'ViewResolver\n+ View', s: 'render' }
  ];
  return (
    <figure className="flowchart-pro flowchart-pro-springframework-wide" role="img" aria-label="DispatcherServlet pipeline">
      <FlowchartFigcaption
        title="Spring MVC request pipeline"
        fresher="DispatcherServlet is the single entry point: it picks a controller method via HandlerMapping, invokes it, then resolves the logical view name to a concrete View (JSP, Thymeleaf, etc.) and renders the response."
      />
      <svg viewBox="0 0 640 200" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="12" y="40" width="616" height="100" rx="10" fill="#f0fdf4" stroke="#86efac" />
        {row.map((s, i) => (
          <g key={s.t}>
            <rect x={s.x} y="56" width="88" height="68" rx="8" fill="#ffffff" stroke="#6db33f" filter={`url(#${p}-shadow)`} />
            <text x={s.x + 44} y="78" textAnchor="middle" fontSize="7" fontWeight="800" fill="#14532d" fontFamily="system-ui">
              {s.t.split('\n').map((line, li) => (
                <tspan key={line} x={s.x + 44} dy={li === 0 ? 0 : 10}>
                  {line}
                </tspan>
              ))}
            </text>
            <text x={s.x + 44} y="114" textAnchor="middle" fontSize="6" fill="#4d7c0f" fontFamily="system-ui">
              {s.s}
            </text>
            {i < row.length - 1 && (
              <line
                x1={s.x + 92}
                y1="90"
                x2={row[i + 1].x - 4}
                y2="90"
                stroke="#15803d"
                strokeWidth="2"
                markerEnd={`url(#${p}-arrowhead)`}
              />
            )}
          </g>
        ))}
        <text x="320" y="176" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily="system-ui">
          Filters (e.g. Spring Security) run before DispatcherServlet in the servlet chain.
        </text>
      </svg>
    </figure>
  );
}

/** Classic layered MVC scenario */
export function SpringFrameworkMvcLayeredScenarioDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-springframework-scenario" role="img" aria-label="Layered MVC scenario">
      <FlowchartFigcaption
        title="Real scenario: browser hits your Spring MVC app"
        fresher="A form POST to `/students/save` hits the DispatcherServlet, maps to a controller method, which delegates to a @Service for validation and business rules, then a @Repository or JdbcTemplate for persistence—layers stay testable because Spring injects interfaces."
      />
      <svg viewBox="0 0 720 160" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        {[
          { x: 24, w: 88, t: 'Browser', c: '#e0f2fe' },
          { x: 132, w: 100, t: 'DispatcherServlet', c: '#ecfdf5' },
          { x: 252, w: 100, t: 'StudentController', c: '#eff6ff' },
          { x: 372, w: 100, t: 'StudentService', c: '#fff7ed' },
          { x: 492, w: 100, t: 'StudentDao / Repo', c: '#ede9fe' },
          { x: 612, w: 84, t: 'Database', c: '#f1f5f9' }
        ].map((b, i, arr) => (
          <g key={b.t}>
            <rect x={b.x} y="48" width={b.w} height="52" rx="8" fill={b.c} stroke="#6db33f" filter={`url(#${p}-shadow)`} />
            <text x={b.x + b.w / 2} y="76" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#0f172a" fontFamily="system-ui">
              {b.t}
            </text>
            {i < arr.length - 1 && (
              <line
                x1={b.x + b.w + 4}
                y1="74"
                x2={arr[i + 1].x - 4}
                y2="74"
                stroke="#15803d"
                strokeWidth="2"
                markerEnd={`url(#${p}-arrowhead)`}
              />
            )}
          </g>
        ))}
      </svg>
    </figure>
  );
}

/** ViewResolver resolves logical name */
export function SpringFrameworkViewResolverPipelineDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-springframework-flow" role="img" aria-label="View resolver pipeline">
      <FlowchartFigcaption
        title="Logical view name → concrete page"
        fresher="Controller returns a view name like `students/list`. ViewResolver applies prefix/suffix (e.g. `/WEB-INF/views/` + `list` + `.jsp`) to build the real resource. Multiple resolvers can be chained with order."
      />
      <svg viewBox="0 0 600 140" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="24" y="40" width="120" height="48" rx="8" fill="#dbeafe" stroke="#2563eb" />
        <text x="84" y="68" textAnchor="middle" fontSize="8" fontWeight="800" fill="#1e40af" fontFamily="system-ui">
          logical: list
        </text>
        <line x1="144" y1="64" x2="176" y2="64" stroke="#15803d" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <rect x="180" y="36" width="160" height="56" rx="8" fill="#ecfdf5" stroke="#6db33f" />
        <text x="260" y="60" textAnchor="middle" fontSize="8" fontWeight="800" fill="#14532d" fontFamily="system-ui">
          ViewResolver
        </text>
        <text x="260" y="78" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily="system-ui">
          prefix + suffix
        </text>
        <line x1="340" y1="64" x2="372" y2="64" stroke="#15803d" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <rect x="376" y="40" width="200" height="48" rx="8" fill="#fef3c7" stroke="#f59e0b" />
        <text x="476" y="68" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#92400e" fontFamily="ui-monospace">
          /WEB-INF/views/list.jsp
        </text>
      </svg>
    </figure>
  );
}

/** JdbcTemplate flow */
export function SpringFrameworkJdbcTemplatePipelineDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-springframework-flow" role="img" aria-label="JdbcTemplate pipeline">
      <FlowchartFigcaption
        title="JdbcTemplate — less boilerplate than raw JDBC"
        fresher="You still write SQL, but JdbcTemplate handles connection acquisition from the DataSource, statement creation, and resource cleanup in finally blocks. Use for simple DAOs; pair with RowMapper for object mapping."
      />
      <svg viewBox="0 0 600 150" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        {[
          { x: 24, t: 'Dao method', s: 'query / update' },
          { x: 156, t: 'JdbcTemplate', s: 'Spring API' },
          { x: 300, t: 'DataSource', s: 'pool' },
          { x: 432, t: 'JDBC Driver', s: 'DB' }
        ].map((b, i, arr) => (
          <g key={b.t}>
            <rect x={b.x} y="44" width="120" height="48" rx="8" fill="#ecfdf5" stroke="#6db33f" filter={`url(#${p}-shadow)`} />
            <text x={b.x + 60} y="68" textAnchor="middle" fontSize="8" fontWeight="800" fill="#14532d" fontFamily="ui-monospace">
              {b.t}
            </text>
            <text x={b.x + 60} y="84" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily="system-ui">
              {b.s}
            </text>
            {i < arr.length - 1 && (
              <line
                x1={b.x + 124}
                y1="68"
                x2={arr[i + 1].x - 4}
                y2="68"
                stroke="#15803d"
                strokeWidth="2"
                markerEnd={`url(#${p}-arrowhead)`}
              />
            )}
          </g>
        ))}
      </svg>
    </figure>
  );
}

/** Spring Data repository abstraction */
export function SpringFrameworkSpringDataRepositoryDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-springframework" role="img" aria-label="Spring Data repository">
      <FlowchartFigcaption
        title="Spring Data — interface becomes implementation at runtime"
        fresher="You declare `interface StudentRepository extends JpaRepository<Student, Long>`; Spring Data generates the implementation from the name, @Query, or method signatures. No boilerplate DAO class for CRUD."
      />
      <svg viewBox="0 0 560 200" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="160" y="24" width="240" height="40" rx="8" fill="#dbeafe" stroke="#2563eb" />
        <text x="280" y="48" textAnchor="middle" fontSize="9" fontWeight="800" fill="#1e3a8a" fontFamily="ui-monospace">
          StudentRepository interface
        </text>
        <line x1="280" y1="64" x2="280" y2="84" stroke="#2563eb" strokeWidth="1.8" markerEnd={`url(#${p}-arrowhead)`} />
        <rect x="120" y="88" width="320" height="44" rx="8" fill="#ecfdf5" stroke="#6db33f" />
        <text x="280" y="114" textAnchor="middle" fontSize="8" fontWeight="800" fill="#14532d" fontFamily="system-ui">
          Spring-generated proxy (SimpleJpaRepository …)
        </text>
        <line x1="280" y1="132" x2="280" y2="148" stroke="#15803d" strokeWidth="1.8" markerEnd={`url(#${p}-arrowhead)`} />
        <rect x="160" y="152" width="240" height="36" rx="8" fill="#f1f5f9" stroke="#64748b" />
        <text x="280" y="174" textAnchor="middle" fontSize="8" fontWeight="800" fill="#334155" fontFamily="system-ui">
          EntityManager / JDBC
        </text>
      </svg>
    </figure>
  );
}

/** AOP proxy + advice */
export function SpringFrameworkAopProxyDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-springframework-scenario" role="img" aria-label="AOP proxy">
      <FlowchartFigcaption
        title="AOP — JDK dynamic proxy or CGLIB subclass"
        fresher="Spring wraps your bean in a proxy. Calls from other beans go through the proxy first, so aspects can run before/after/around the real method. Interface-based beans use JDK proxies; class-based proxies use CGLIB when needed."
      />
      <svg viewBox="0 0 640 200" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="40" y="48" width="100" height="48" rx="8" fill="#e0f2fe" stroke="#0284c7" />
        <text x="90" y="76" textAnchor="middle" fontSize="8" fontWeight="800" fill="#0c4a6e" fontFamily="system-ui">
          Caller
        </text>
        <line x1="140" y1="72" x2="172" y2="72" stroke="#15803d" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <rect x="176" y="36" width="200" height="72" rx="10" fill="#fef3c7" stroke="#f59e0b" />
        <text x="276" y="58" textAnchor="middle" fontSize="9" fontWeight="800" fill="#92400e" fontFamily="system-ui">
          Proxy (advice chain)
        </text>
        <text x="276" y="76" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily="system-ui">
          @Before · @Around · …
        </text>
        <line x1="376" y1="72" x2="408" y2="72" stroke="#15803d" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <rect x="412" y="48" width="120" height="48" rx="8" fill="#ecfdf5" stroke="#6db33f" />
        <text x="472" y="76" textAnchor="middle" fontSize="8" fontWeight="800" fill="#14532d" fontFamily="system-ui">
          Target bean
        </text>
        <line x1="532" y1="72" x2="564" y2="72" stroke="#15803d" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <rect x="568" y="52" width="72" height="40" rx="8" fill="#f1f5f9" stroke="#94a3b8" />
        <text x="604" y="76" textAnchor="middle" fontSize="7" fontWeight="800" fill="#334155" fontFamily="system-ui">
          Result
        </text>
        <text x="320" y="148" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily="system-ui">
          self-invocation inside the same class bypasses the proxy—use AspectJ weaving or inject self for internal calls.
        </text>
      </svg>
    </figure>
  );
}

/** Advice types */
export function SpringFrameworkAdviceTypesDiagram() {
  const p = useSvgPrefix();
  const tips = ['@Before', '@AfterReturning', '@AfterThrowing', '@After', '@Around'];
  return (
    <figure className="flowchart-pro flowchart-pro-springframework" role="img" aria-label="Advice types">
      <FlowchartFigcaption
        title="AspectJ-style advice types in Spring AOP"
        fresher="@Around is the most powerful—it wraps the join point and can skip or retry the method. @Before runs just before; @After* run after success or failure depending on variant. Combine with pointcut expressions to target packages or annotations."
      />
      <svg viewBox="0 0 640 120" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        {tips.map((t, i) => (
          <rect key={t} x={24 + i * 118} y="40" width="108" height="44" rx="8" fill="#ecfdf5" stroke="#6db33f" filter={`url(#${p}-shadow)`} />
        ))}
        {tips.map((t, i) => (
          <text key={t} x={78 + i * 118} y="66" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#14532d" fontFamily="ui-monospace">
            {t}
          </text>
        ))}
      </svg>
    </figure>
  );
}

/** @Order on aspects */
export function SpringFrameworkAspectOrderDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-springframework-flow" role="img" aria-label="Aspect order">
      <FlowchartFigcaption
        title="Multiple aspects — @Order controls precedence"
        fresher="Lower order values run earlier in the advice chain (outer layers). When logging and transaction aspects both apply, you usually want transactions inside logging—or the opposite for audit—so ordering matters."
      />
      <svg viewBox="0 0 560 140" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="80" y="44" width="160" height="48" rx="8" fill="#fef3c7" stroke="#f59e0b" />
        <text x="160" y="72" textAnchor="middle" fontSize="8" fontWeight="800" fill="#92400e" fontFamily="system-ui">
          LoggingAspect @Order(1)
        </text>
        <line x1="240" y1="68" x2="272" y2="68" stroke="#15803d" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <rect x="276" y="44" width="200" height="48" rx="8" fill="#ecfdf5" stroke="#6db33f" />
        <text x="376" y="72" textAnchor="middle" fontSize="8" fontWeight="800" fill="#14532d" fontFamily="system-ui">
          TransactionAspect @Order(2)
        </text>
        <text x="280" y="112" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily="system-ui">
          Same @Order → undefined relative order — avoid relying on ties.
        </text>
      </svg>
    </figure>
  );
}

/** EnableAspectJAutoProxy with Spring Boot */
export function SpringFrameworkEnableAspectJDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-springframework" role="img" aria-label="Enable AspectJ auto proxy">
      <FlowchartFigcaption
        title="Enabling @Aspect support"
        fresher="On plain Spring, add @EnableAspectJAutoProxy on a @Configuration class. With Spring Boot, AOP starter brings auto-configuration—your @Aspect beans are picked up from component scan. You still need spring-boot-starter-aop for aspects to work."
      />
      <svg viewBox="0 0 560 160" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="60" y="36" width="180" height="48" rx="8" fill="#dbeafe" stroke="#2563eb" />
        <text x="150" y="64" textAnchor="middle" fontSize="8" fontWeight="800" fill="#1e40af" fontFamily="ui-monospace">
          @SpringBootApplication
        </text>
        <line x1="240" y1="60" x2="280" y2="60" stroke="#15803d" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <rect x="284" y="36" width="200" height="48" rx="8" fill="#ecfdf5" stroke="#6db33f" />
        <text x="384" y="60" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#14532d" fontFamily="ui-monospace">
          @EnableAspectJAutoProxy
        </text>
        <text x="384" y="74" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily="system-ui">
          (or starter-aop auto-config)
        </text>
        <text x="280" y="120" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily="system-ui">
          @Aspect classes with @Component are registered as aspects.
        </text>
      </svg>
    </figure>
  );
}

/** Pointcut expression families */
export function SpringFrameworkPointcutExpressionsDiagram() {
  const p = useSvgPrefix();
  const rows = [
    { ex: 'execution(* com.app.service.*.*(..))', note: 'method pattern' },
    { ex: '@within(org.springframework.stereotype.Service)', note: 'class annotation' },
    { ex: '@annotation(com.app.Audited)', note: 'method annotation' }
  ];
  return (
    <figure className="flowchart-pro flowchart-pro-springframework-flow" role="img" aria-label="Pointcut expressions">
      <FlowchartFigcaption
        title="Common pointcut expressions"
        fresher="execution matches method signatures; @within and @annotation tie advice to metadata. Combine with && and || for precise targeting. For complex cases, use @Pointcut methods to reuse the same expression."
      />
      <svg viewBox="0 0 620 140" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        {rows.map((r, i) => (
          <g key={r.ex}>
            <rect x="40" y={28 + i * 36} width="540" height="28" rx="6" fill="#f8fafc" stroke="#cbd5e1" />
            <text x="52" y={46 + i * 36} fontSize="7" fontWeight="700" fill="#14532d" fontFamily="ui-monospace">
              {r.ex}
            </text>
            <text x="560" y={46 + i * 36} textAnchor="end" fontSize="6.5" fill="#64748b" fontFamily="system-ui">
              {r.note}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  );
}

/** Classic WAR deployment — Spring MVC on Tomcat (Framework-era interview scenario) */
export function SpringFrameworkWarDeploymentScenarioDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-springframework-scenario" role="img" aria-label="WAR deployment scenario">
      <FlowchartFigcaption
        title="Real scenario: Spring MVC WAR on Tomcat"
        fresher="You package a WAR with web.xml (or Servlet 3+ WebApplicationInitializer). Tomcat loads the WAR, creates the servlet context, starts DispatcherServlet, and Spring builds the application context from XML or @Configuration. This is the classic pre-Boot deployment story."
      />
      <svg viewBox="0 0 720 200" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="24" y="28" width="120" height="44" rx="8" fill="#e0e7ff" stroke="#6366f1" />
        <text x="84" y="54" textAnchor="middle" fontSize="8" fontWeight="800" fill="#312e81" fontFamily="system-ui">
          Tomcat
        </text>
        <line x1="144" y1="50" x2="188" y2="50" stroke="#15803d" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <rect x="192" y="28" width="140" height="44" rx="8" fill="#fef3c7" stroke="#d97706" />
        <text x="262" y="52" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#92400e" fontFamily="ui-monospace">
          web.xml / WebAppInit
        </text>
        <line x1="332" y1="50" x2="376" y2="50" stroke="#15803d" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <rect x="380" y="28" width="160" height="44" rx="8" fill="#dbeafe" stroke="#2563eb" />
        <text x="460" y="52" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#1e40af" fontFamily="ui-monospace">
          DispatcherServlet
        </text>
        <line x1="540" y1="50" x2="584" y2="50" stroke="#15803d" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <rect x="588" y="28" width="108" height="44" rx="8" fill="#ecfdf5" stroke="#6db33f" />
        <text x="642" y="52" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#14532d" fontFamily="ui-monospace">
          Spring context
        </text>
        <text x="360" y="108" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily="system-ui">
          Context loads controllers, services, view resolvers — then requests hit DispatcherServlet → handler → view.
        </text>
        <rect x="80" y="128" width="560" height="56" rx="8" fill="#f8fafc" stroke="#cbd5e1" />
        <text x="360" y="152" textAnchor="middle" fontSize="7" fontWeight="700" fill="#334155" fontFamily="system-ui">
          Interview angle: “How does Spring start inside a servlet container?” → bootstrap sequence above + root vs servlet context.
        </text>
        <text x="360" y="170" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily="system-ui">
          Boot hides this with embedded Tomcat + auto-config; Framework-era questions often still use WAR + XML.
        </text>
      </svg>
    </figure>
  );
}

/** Bootstrap ApplicationContext without Spring Boot */
export function SpringFrameworkApplicationContextBootstrapScenarioDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-springframework-scenario" role="img" aria-label="ApplicationContext bootstrap">
      <FlowchartFigcaption
        title="Real scenario: bootstrapping the IoC container"
        fresher="In tests or standalone apps you use ClassPathXmlApplicationContext or AnnotationConfigApplicationContext. The container reads bean definitions, instantiates singletons (unless prototype), runs BeanPostProcessors, and wires dependencies. No SpringApplication.run — you own the main() or test setup."
      />
      <svg viewBox="0 0 700 200" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="32" y="32" width="200" height="48" rx="8" fill="#f1f5f9" stroke="#64748b" />
        <text x="132" y="58" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#334155" fontFamily="ui-monospace">
          new ClassPathXmlApplicationContext
        </text>
        <text x="132" y="72" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily="system-ui">
          or AnnotationConfigApplicationContext
        </text>
        <line x1="232" y1="56" x2="276" y2="56" stroke="#15803d" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <rect x="280" y="32" width="160" height="48" rx="8" fill="#dbeafe" stroke="#2563eb" />
        <text x="360" y="58" textAnchor="middle" fontSize="8" fontWeight="800" fill="#1e40af" fontFamily="system-ui">
          Parse definitions
        </text>
        <line x1="440" y1="56" x2="484" y2="56" stroke="#15803d" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <rect x="488" y="32" width="180" height="48" rx="8" fill="#ecfdf5" stroke="#6db33f" />
        <text x="578" y="58" textAnchor="middle" fontSize="8" fontWeight="800" fill="#14532d" fontFamily="system-ui">
          Instantiate &amp; wire
        </text>
        <text x="350" y="108" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily="system-ui">
          getBean() returns fully wired singletons; prototype beans created per getBean (or injection site).
        </text>
        <rect x="40" y="128" width="620" height="56" rx="8" fill="#f8fafc" stroke="#cbd5e1" />
        <text x="350" y="152" textAnchor="middle" fontSize="7" fontWeight="700" fill="#334155" fontFamily="system-ui">
          Real scenario: integration test starts minimal context with @ContextConfiguration or @SpringJUnitConfig.
        </text>
        <text x="350" y="170" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily="system-ui">
          Same lifecycle — container refresh, dependency graph, lifecycle callbacks (@PostConstruct).
        </text>
      </svg>
    </figure>
  );
}

/** Form POST through validation to service */
export function SpringFrameworkMvcFormSubmissionScenarioDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-springframework-scenario" role="img" aria-label="MVC form submission">
      <FlowchartFigcaption
        title="Real scenario: form POST in Spring MVC"
        fresher="Browser POSTs to a URL. DispatcherServlet maps to @Controller method. @Valid triggers Bean Validation on the command object. BindingResult captures field errors. On success the service layer runs; on failure you return the form view with errors. PRG (redirect after POST) avoids duplicate submits."
      />
      <svg viewBox="0 0 720 200" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="24" y="32" width="100" height="40" rx="8" fill="#e0e7ff" stroke="#6366f1" />
        <text x="74" y="56" textAnchor="middle" fontSize="8" fontWeight="800" fill="#312e81" fontFamily="system-ui">
          POST /save
        </text>
        <line x1="124" y1="52" x2="168" y2="52" stroke="#15803d" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <rect x="172" y="32" width="120" height="40" rx="8" fill="#dbeafe" stroke="#2563eb" />
        <text x="232" y="56" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#1e40af" fontFamily="ui-monospace">
          DispatcherServlet
        </text>
        <line x1="292" y1="52" x2="336" y2="52" stroke="#15803d" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <rect x="340" y="28" width="140" height="48" rx="8" fill="#fef3c7" stroke="#d97706" />
        <text x="410" y="52" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#92400e" fontFamily="ui-monospace">
          @Valid + BindingResult
        </text>
        <line x1="480" y1="52" x2="524" y2="52" stroke="#15803d" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <rect x="528" y="32" width="168" height="40" rx="8" fill="#ecfdf5" stroke="#6db33f" />
        <text x="612" y="56" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#14532d" fontFamily="ui-monospace">
          Controller → Service
        </text>
        <text x="360" y="100" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily="system-ui">
          Errors? → return view name + model with BindingResult. OK? → redirect:redirect:/list (PRG).
        </text>
        <rect x="40" y="118" width="640" height="66" rx="8" fill="#f8fafc" stroke="#cbd5e1" />
        <text x="360" y="142" textAnchor="middle" fontSize="7" fontWeight="700" fill="#334155" fontFamily="system-ui">
          Interview: “Where does validation happen?” — WebDataBinder + validator before your business logic; not in JSP alone.
        </text>
        <text x="360" y="162" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily="system-ui">
          Framework stack: spring-webmvc + spring-context + validation-api (Hibernate Validator impl).
        </text>
      </svg>
    </figure>
  );
}

/** JDBC + declarative transaction */
export function SpringFrameworkJdbcTransactionalScenarioDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-springframework-scenario" role="img" aria-label="JDBC transactional scenario">
      <FlowchartFigcaption
        title="Real scenario: @Transactional + JdbcTemplate"
        fresher="A service method is annotated with @Transactional. Spring creates a proxy; on entry it binds a Connection to ThreadLocal and starts a transaction. JdbcTemplate uses DataSourceUtils so all JDBC work shares that connection. On success commit; on RuntimeException rollback (by default)."
      />
      <svg viewBox="0 0 720 200" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="24" y="32" width="140" height="44" rx="8" fill="#fef3c7" stroke="#d97706" />
        <text x="94" y="58" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#92400e" fontFamily="ui-monospace">
          @Transactional service
        </text>
        <line x1="164" y1="54" x2="208" y2="54" stroke="#15803d" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <rect x="212" y="32" width="160" height="44" rx="8" fill="#fce7f3" stroke="#db2777" />
        <text x="292" y="58" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#9d174d" fontFamily="system-ui">
          Transaction proxy
        </text>
        <line x1="372" y1="54" x2="416" y2="54" stroke="#15803d" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <rect x="420" y="32" width="140" height="44" rx="8" fill="#dbeafe" stroke="#2563eb" />
        <text x="490" y="58" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#1e40af" fontFamily="ui-monospace">
          JdbcTemplate
        </text>
        <line x1="560" y1="54" x2="604" y2="54" stroke="#15803d" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <rect x="608" y="32" width="88" height="44" rx="8" fill="#ecfdf5" stroke="#6db33f" />
        <text x="652" y="58" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#14532d" fontFamily="system-ui">
          DB
        </text>
        <text x="360" y="100" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily="system-ui">
          PlatformTransactionManager (e.g. DataSourceTransactionManager) coordinates begin / commit / rollback.
        </text>
        <rect x="40" y="118" width="640" height="66" rx="8" fill="#f8fafc" stroke="#cbd5e1" />
        <text x="360" y="142" textAnchor="middle" fontSize="7" fontWeight="700" fill="#334155" fontFamily="system-ui">
          Real scenario: two DAO calls in one @Transactional method — same connection, one atomic unit.
        </text>
        <text x="360" y="162" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily="system-ui">
          Enable with @EnableTransactionManagement + DataSource + TransactionManager beans (no Boot magic).
        </text>
      </svg>
    </figure>
  );
}

/** @Around advice on a service — production-style cross-cutting concern */
export function SpringFrameworkAopAroundAdviceScenarioDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-springframework-scenario" role="img" aria-label="AOP around advice scenario">
      <FlowchartFigcaption
        title="Real scenario: @Around logging / timing on a service"
        fresher="You define an @Aspect with @Around(&quot;execution(* com.app.service..*(..))&quot;). At runtime Spring wraps matching beans in a proxy. Before proceed() you log start time; after, log duration or catch exceptions. Same pattern for security checks or metrics — without changing service code."
      />
      <svg viewBox="0 0 720 200" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="24" y="32" width="120" height="44" rx="8" fill="#e0e7ff" stroke="#6366f1" />
        <text x="84" y="58" textAnchor="middle" fontSize="8" fontWeight="800" fill="#312e81" fontFamily="system-ui">
          Caller
        </text>
        <line x1="144" y1="54" x2="188" y2="54" stroke="#15803d" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <rect x="192" y="28" width="160" height="52" rx="8" fill="#fce7f3" stroke="#db2777" />
        <text x="272" y="52" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#9d174d" fontFamily="system-ui">
          Proxy (JDK or CGLIB)
        </text>
        <text x="272" y="68" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily="ui-monospace">
          @Around advice first
        </text>
        <line x1="352" y1="54" x2="396" y2="54" stroke="#15803d" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <rect x="400" y="32" width="140" height="44" rx="8" fill="#ecfdf5" stroke="#6db33f" />
        <text x="470" y="58" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#14532d" fontFamily="ui-monospace">
          UserService.save()
        </text>
        <line x1="540" y1="54" x2="584" y2="54" stroke="#15803d" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <rect x="588" y="32" width="108" height="44" rx="8" fill="#f1f5f9" stroke="#64748b" />
        <text x="642" y="58" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#334155" fontFamily="system-ui">
          proceed()
        </text>
        <text x="360" y="100" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily="system-ui">
          @EnableAspectJAutoProxy — remember self-invocation skips the proxy (call another bean for AOP).
        </text>
        <rect x="40" y="118" width="640" height="66" rx="8" fill="#f8fafc" stroke="#cbd5e1" />
        <text x="360" y="142" textAnchor="middle" fontSize="7" fontWeight="700" fill="#334155" fontFamily="system-ui">
          Interview: “How does Spring AOP differ from AspectJ weaving?” — proxy-based vs compile/load-time weaving.
        </text>
        <text x="360" y="162" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily="system-ui">
          Framework: spring-aop + aspectjweaver on classpath; interfaces → JDK proxy, else CGLIB (when exposed).
        </text>
      </svg>
    </figure>
  );
}

/** App → server → storage — production mental model */
export function MySQLClientServerArchitectureScenarioDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-mysql-scenario" role="img" aria-label="MySQL client server architecture">
      <FlowchartFigcaption
        title="Real scenario: how your app reaches data"
        fresher="Every client—Java JDBC, Python, PHP, the mysql CLI, or MySQL Workbench—opens a TCP connection to the server port (default 3306), completes authentication (user@host, password or plugin), then sends SQL as text. The server’s connection thread accepts the packet, the SQL layer parses and optimizes, and InnoDB (or another engine) reads or writes pages in the buffer pool and on disk. Nothing in this path is “Workbench-specific”: Workbench is just another client. Tuning max_connections, wait_timeout, and thread pool sizes maps directly to how many concurrent clients you can support."
      />
      <svg viewBox="0 0 760 228" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <MySQLDefs prefix={p} />
        <rect x="16" y="24" width="728" height="168" rx="14" fill="#f0fdfa" stroke="#99f6e4" strokeWidth="1.2" filter={`url(#${p}-mysql-glow)`} />
        <text x="380" y="46" textAnchor="middle" fontSize="9" fontWeight="800" fill="#0f766e" fontFamily="system-ui">
          MySQL Server process (mysqld)
        </text>
        <rect x="36" y="58" width="112" height="48" rx="10" fill={`url(#${p}-mysql-node)`} stroke="#00758F" strokeWidth="1.5" />
        <text x="92" y="80" textAnchor="middle" fontSize="8" fontWeight="800" fill="#134e4a" fontFamily="system-ui">
          Client app
        </text>
        <text x="92" y="94" textAnchor="middle" fontSize="6.5" fill="#0d9488" fontFamily="ui-monospace">
          JDBC / CLI
        </text>
        <line x1="148" y1="82" x2="188" y2="82" stroke="#00758F" strokeWidth="2.2" markerEnd={`url(#${p}-mysql-arrow)`} />
        <text x="168" y="74" textAnchor="middle" fontSize="6" fill="#f97316" fontWeight="700" fontFamily="ui-monospace">
          :3306
        </text>
        <rect x="192" y="58" width="128" height="48" rx="10" fill="#fff7ed" stroke="#ea580c" strokeWidth="1.3" />
        <text x="256" y="80" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#9a3412" fontFamily="system-ui">
          Connection layer
        </text>
        <text x="256" y="94" textAnchor="middle" fontSize="6.5" fill="#c2410c" fontFamily="system-ui">
          threads / auth
        </text>
        <line x1="320" y1="82" x2="360" y2="82" stroke="#00758F" strokeWidth="2.2" markerEnd={`url(#${p}-mysql-arrow)`} />
        <rect x="364" y="54" width="156" height="56" rx="10" fill={`url(#${p}-mysql-node)`} stroke="#00758F" strokeWidth="1.5" />
        <text x="442" y="78" textAnchor="middle" fontSize="8" fontWeight="800" fill="#134e4a" fontFamily="system-ui">
          SQL + Optimizer
        </text>
        <text x="442" y="94" textAnchor="middle" fontSize="6.5" fill="#0f766e" fontFamily="ui-monospace">
          parse · plan · execute
        </text>
        <line x1="520" y1="82" x2="560" y2="82" stroke="#00758F" strokeWidth="2.2" markerEnd={`url(#${p}-mysql-arrow)`} />
        <rect x="564" y="58" width="160" height="48" rx="10" fill={`url(#${p}-mysql-deep)`} stroke="#0e7490" strokeWidth="1.2" />
        <text x="644" y="80" textAnchor="middle" fontSize="8" fontWeight="800" fill="#ecfeff" fontFamily="system-ui">
          InnoDB engine
        </text>
        <text x="644" y="94" textAnchor="middle" fontSize="6.5" fill="#a5f3fc" fontFamily="system-ui">
          buffer pool · ibd
        </text>
        <rect x="120" y="128" width="520" height="52" rx="10" fill="rgba(0,117,143,0.06)" stroke="#5eead4" strokeWidth="1" />
        <text x="380" y="152" textAnchor="middle" fontSize="7" fontWeight="700" fill="#115e59" fontFamily="system-ui">
          Interview angle: “Where does query optimization happen?” — after parsing, before execution; storage engine handles rows &amp; locks.
        </text>
        <text x="380" y="168" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily="system-ui">
          One connection ≈ one session; pool sizing (HikariCP) maps to server thread / connection limits.
        </text>
      </svg>
    </figure>
  );
}

/** SELECT path through parser and optimizer */
export function MySQLQueryExecutionPipelineScenarioDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-mysql-scenario" role="img" aria-label="MySQL query execution pipeline">
      <FlowchartFigcaption
        title="Real scenario: what happens when you run SELECT"
        fresher="Lexing and parsing turn your SQL string into a parse tree; the resolver binds table/column names to metadata in the data dictionary and checks privileges. The optimizer (cost-based) estimates cardinalities using statistics and chooses access paths: which index, join order, and join algorithm. The execution engine then requests rows from InnoDB via the handler interface—buffer pool hits avoid disk; misses read pages from .ibd files. Aggregates and GROUP BY may require temporary tables or sorting. EXPLAIN shows this plan; EXPLAIN ANALYZE (8.0.18+) adds actual timings."
      />
      <svg viewBox="0 0 760 232" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <MySQLDefs prefix={p} />
        <rect x="24" y="32" width="96" height="44" rx="9" fill="#fff7ed" stroke="#ea580c" strokeWidth="1.4" />
        <text x="72" y="58" textAnchor="middle" fontSize="8" fontWeight="800" fill="#9a3412" fontFamily="ui-monospace">
          SELECT …
        </text>
        <line x1="120" y1="54" x2="156" y2="54" stroke="#00758F" strokeWidth="2" markerEnd={`url(#${p}-mysql-arrow)`} />
        <rect x="160" y="28" width="108" height="52" rx="9" fill={`url(#${p}-mysql-node)`} stroke="#00758F" strokeWidth="1.4" />
        <text x="214" y="50" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#134e4a" fontFamily="system-ui">
          Parser
        </text>
        <text x="214" y="66" textAnchor="middle" fontSize="6.5" fill="#0f766e" fontFamily="system-ui">
          syntax tree
        </text>
        <line x1="268" y1="54" x2="304" y2="54" stroke="#00758F" strokeWidth="2" markerEnd={`url(#${p}-mysql-arrow)`} />
        <rect x="308" y="28" width="120" height="52" rx="9" fill={`url(#${p}-mysql-node)`} stroke="#00758F" strokeWidth="1.4" />
        <text x="368" y="50" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#134e4a" fontFamily="system-ui">
          Resolver
        </text>
        <text x="368" y="66" textAnchor="middle" fontSize="6.5" fill="#0f766e" fontFamily="system-ui">
          tables · columns
        </text>
        <line x1="428" y1="54" x2="464" y2="54" stroke="#00758F" strokeWidth="2" markerEnd={`url(#${p}-mysql-arrow)`} />
        <rect x="468" y="28" width="132" height="52" rx="9" fill="#fef3c7" stroke="#d97706" strokeWidth="1.4" />
        <text x="534" y="50" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#92400e" fontFamily="system-ui">
          Optimizer
        </text>
        <text x="534" y="66" textAnchor="middle" fontSize="6.5" fill="#b45309" fontFamily="system-ui">
          cost · index choice
        </text>
        <line x1="600" y1="54" x2="636" y2="54" stroke="#00758F" strokeWidth="2" markerEnd={`url(#${p}-mysql-arrow)`} />
        <rect x="640" y="32" width="96" height="44" rx="9" fill={`url(#${p}-mysql-deep)`} stroke="#0e7490" strokeWidth="1.2" />
        <text x="688" y="58" textAnchor="middle" fontSize="8" fontWeight="800" fill="#ecfeff" fontFamily="system-ui">
          Execute
        </text>
        <text x="380" y="108" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily="system-ui">
          EXPLAIN shows the plan the optimizer chose — always verify for hot queries in production.
        </text>
        <rect x="40" y="124" width="680" height="92" rx="12" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
        <text x="380" y="148" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#334155" fontFamily="system-ui">
          Real scenario: slow dashboard query
        </text>
        <text x="380" y="168" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily="system-ui">
          Check · missing index · full table scan · wrong join order → use EXPLAIN ANALYZE (8.0.18+) or optimizer trace.
        </text>
        <text x="380" y="188" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily="system-ui">
          Covering indexes and selective WHERE clauses reduce rows read from InnoDB.
        </text>
      </svg>
    </figure>
  );
}

/** BEGIN … COMMIT with InnoDB */
export function MySQLInnoDBTransactionACIDScenarioDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-mysql-scenario" role="img" aria-label="InnoDB transaction scenario">
      <FlowchartFigcaption
        title="Real scenario: InnoDB transaction lifecycle"
        fresher="BEGIN allocates a transaction id (trx id). Row changes update the buffer pool; redo log records physical changes for crash recovery (WAL: log before durable data page flush). Undo segments store old row versions for ROLLBACK and for consistent reads (MVCC). COMMIT flushes redo to disk (group commit batches transactions); ROLLBACK walks undo. Isolation level (REPEATABLE READ default) sets what each snapshot read sees; gap/next-key locks prevent phantoms for locking reads."
      />
      <svg viewBox="0 0 760 236" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <MySQLDefs prefix={p} />
        <rect x="32" y="36" width="88" height="40" rx="8" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.3" />
        <text x="76" y="60" textAnchor="middle" fontSize="8" fontWeight="800" fill="#0c4a6e" fontFamily="ui-monospace">
          BEGIN
        </text>
        <line x1="120" y1="56" x2="156" y2="56" stroke="#00758F" strokeWidth="2" markerEnd={`url(#${p}-mysql-arrow)`} />
        <rect x="160" y="32" width="140" height="48" rx="9" fill={`url(#${p}-mysql-node)`} stroke="#00758F" strokeWidth="1.4" />
        <text x="230" y="54" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#134e4a" fontFamily="system-ui">
          Buffer pool
        </text>
        <text x="230" y="70" textAnchor="middle" fontSize="6.5" fill="#0f766e" fontFamily="ui-monospace">
          dirty pages
        </text>
        <line x1="300" y1="56" x2="336" y2="56" stroke="#00758F" strokeWidth="2" markerEnd={`url(#${p}-mysql-arrow)`} />
        <rect x="340" y="32" width="120" height="48" rx="9" fill="#fef3c7" stroke="#d97706" strokeWidth="1.3" />
        <text x="400" y="54" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#92400e" fontFamily="system-ui">
          Redo log
        </text>
        <text x="400" y="70" textAnchor="middle" fontSize="6.5" fill="#b45309" fontFamily="system-ui">
          durability path
        </text>
        <line x1="460" y1="56" x2="496" y2="56" stroke="#00758F" strokeWidth="2" markerEnd={`url(#${p}-mysql-arrow)`} />
        <rect x="500" y="32" width="120" height="48" rx="9" fill="#fce7f3" stroke="#db2777" strokeWidth="1.3" />
        <text x="560" y="54" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#9d174d" fontFamily="system-ui">
          Undo log
        </text>
        <text x="560" y="70" textAnchor="middle" fontSize="6.5" fill="#be185d" fontFamily="system-ui">
          rollback / MVCC
        </text>
        <line x1="620" y1="56" x2="656" y2="56" stroke="#00758F" strokeWidth="2" markerEnd={`url(#${p}-mysql-arrow)`} />
        <rect x="660" y="36" width="72" height="40" rx="8" fill={`url(#${p}-mysql-deep)`} stroke="#0e7490" strokeWidth="1.2" />
        <text x="696" y="60" textAnchor="middle" fontSize="8" fontWeight="800" fill="#ecfeff" fontFamily="ui-monospace">
          COMMIT
        </text>
        <text x="380" y="108" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily="system-ui">
          Isolation level (REPEATABLE READ default in InnoDB) defines what each statement’s consistent read sees.
        </text>
        <rect x="40" y="124" width="680" height="96" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
        <text x="380" y="150" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#334155" fontFamily="system-ui">
          Production checklist: keep transactions short; avoid long-held locks; watch innodb_lock_wait_timeout.
        </text>
        <text x="380" y="172" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily="system-ui">
          Deadlocks: InnoDB detects and rolls back one transaction — retry logic belongs in the app layer.
        </text>
        <text x="380" y="194" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily="system-ui">
          autocommit = ON: each statement is its own transaction unless you explicitly BEGIN.
        </text>
      </svg>
    </figure>
  );
}

/** Index seek vs full scan */
export function MySQLBTreeIndexSeekScenarioDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-mysql-scenario" role="img" aria-label="MySQL B-tree index seek">
      <FlowchartFigcaption
        title="Real scenario: why the right index matters"
        fresher="A secondary index in InnoDB is a B+Tree of key values pointing to primary key entries. Seeking by indexed column walks the tree in O(log n) page accesses. Without an index, InnoDB may scan the whole clustered table — expensive on large tables."
      />
      <svg viewBox="0 0 760 240" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <MySQLDefs prefix={p} />
        <rect x="24" y="28" width="340" height="168" rx="12" fill="#f0fdfa" stroke="#2dd4bf" strokeWidth="1.2" />
        <text x="194" y="50" textAnchor="middle" fontSize="9" fontWeight="800" fill="#0f766e" fontFamily="system-ui">
          With index (seek)
        </text>
        <rect x="48" y="64" width="72" height="36" rx="6" fill="#ccfbf1" stroke="#0d9488" />
        <text x="84" y="86" textAnchor="middle" fontSize="7" fontWeight="700" fill="#134e4a" fontFamily="ui-monospace">
          root
        </text>
        <line x1="120" y1="82" x2="152" y2="82" stroke="#00758F" strokeWidth="1.5" markerEnd={`url(#${p}-mysql-arrow)`} />
        <rect x="156" y="68" width="72" height="36" rx="6" fill="#ccfbf1" stroke="#0d9488" />
        <text x="192" y="90" textAnchor="middle" fontSize="7" fontWeight="700" fill="#134e4a" fontFamily="ui-monospace">
          branch
        </text>
        <line x1="228" y1="82" x2="260" y2="82" stroke="#00758F" strokeWidth="1.5" markerEnd={`url(#${p}-mysql-arrow)`} />
        <rect x="264" y="72" width="84" height="44" rx="6" fill={`url(#${p}-mysql-deep)`} stroke="#0e7490" />
        <text x="306" y="92" textAnchor="middle" fontSize="7" fontWeight="800" fill="#ecfeff" fontFamily="ui-monospace">
          leaf PK
        </text>
        <text x="306" y="106" textAnchor="middle" fontSize="6" fill="#a5f3fc" fontFamily="system-ui">
          clustered row
        </text>
        <text x="194" y="148" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily="system-ui">
          WHERE email = ? uses idx_email → few random I/Os.
        </text>
        <rect x="396" y="28" width="340" height="168" rx="12" fill="#fffbeb" stroke="#fcd34d" strokeWidth="1.2" />
        <text x="566" y="50" textAnchor="middle" fontSize="9" fontWeight="800" fill="#b45309" fontFamily="system-ui">
          Full table scan (no useful index)
        </text>
        <rect x="420" y="68" width="292" height="44" rx="8" fill="#fef3c7" stroke="#d97706" strokeDasharray="6 4" />
        <text x="566" y="88" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#92400e" fontFamily="system-ui">
          Read pages sequentially through clustered index / heap
        </text>
        <text x="566" y="104" textAnchor="middle" fontSize="6.5" fill="#b45309" fontFamily="system-ui">
          every row evaluated for WHERE — cost ∝ table size
        </text>
        <text x="566" y="148" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily="system-ui">
          EXPLAIN type = ALL → expect large rows examined.
        </text>
        <text x="380" y="212" textAnchor="middle" fontSize="7" fontWeight="700" fill="#334155" fontFamily="system-ui">
          Composite index (a,b,c) left-prefix rule: filters on (a) and (a,b) can use it; starting with (b) often cannot.
        </text>
      </svg>
    </figure>
  );
}

/** INNER JOIN nested loop mental model */
export function MySQLNestedLoopJoinScenarioDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-mysql-scenario" role="img" aria-label="MySQL nested loop join">
      <FlowchartFigcaption
        title="Real scenario: how a join runs (nested-loop idea)"
        fresher="For each row from the outer table (often the smaller or better-indexed side), the engine looks up matching rows in the inner table using an index or scan. The optimizer swaps order and methods (block nested loop, hash in memory) — but the nested-loop picture is what interviews expect."
      />
      <svg viewBox="0 0 760 220" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <MySQLDefs prefix={p} />
        <rect x="40" y="40" width="200" height="56" rx="10" fill={`url(#${p}-mysql-node)`} stroke="#00758F" strokeWidth="1.4" />
        <text x="140" y="64" textAnchor="middle" fontSize="8" fontWeight="800" fill="#134e4a" fontFamily="system-ui">
          Outer: orders
        </text>
        <text x="140" y="82" textAnchor="middle" fontSize="6.5" fill="#0f766e" fontFamily="ui-monospace">
          scan / idx range
        </text>
        <text x="290" y="78" textAnchor="middle" fontSize="20" fill="#00758F" fontFamily="system-ui">
          ×
        </text>
        <rect x="360" y="40" width="200" height="56" rx="10" fill="#fff7ed" stroke="#ea580c" strokeWidth="1.4" />
        <text x="460" y="64" textAnchor="middle" fontSize="8" fontWeight="800" fill="#9a3412" fontFamily="system-ui">
          Inner: customers
        </text>
        <text x="460" y="82" textAnchor="middle" fontSize="6.5" fill="#c2410c" fontFamily="ui-monospace">
          lookup by PK / idx
        </text>
        <line x1="240" y1="68" x2="320" y2="68" stroke="#00758F" strokeWidth="1.5" strokeDasharray="4 3" markerEnd={`url(#${p}-mysql-arrow)`} />
        <line x1="560" y1="68" x2="640" y2="68" stroke="#00758F" strokeWidth="1.5" strokeDasharray="4 3" markerEnd={`url(#${p}-mysql-arrow)`} />
        <rect x="644" y="44" width="88" height="48" rx="9" fill={`url(#${p}-mysql-deep)`} stroke="#0e7490" />
        <text x="688" y="72" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#ecfeff" fontFamily="system-ui">
          joined rows
        </text>
        <text x="380" y="124" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily="system-ui">
          STRAIGHT_JOIN hints force join order — use sparingly; prefer statistics and indexes so the optimizer chooses well.
        </text>
        <rect x="48" y="140" width="664" height="64" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
        <text x="380" y="164" textAnchor="middle" fontSize="7" fontWeight="700" fill="#334155" fontFamily="system-ui">
          Real scenario: N+1 in ORMs — one query per parent row — fix with JOIN FETCH or a single SQL join.
        </text>
        <text x="380" y="186" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily="system-ui">
          ON vs WHERE: outer join null-preserved side — predicates belong in ON when they define the join, not filter after.
        </text>
      </svg>
    </figure>
  );
}

/** Async replication overview */
export function MySQLPrimaryReplicaReplicationScenarioDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-mysql-scenario" role="img" aria-label="MySQL replication scenario">
      <FlowchartFigcaption
        title="Real scenario: asynchronous replication (classic)"
        fresher="The primary writes the binary log (binlog) after transactions commit. Replica I/O thread pulls events over the network into a relay log; the SQL thread replays them to stay warm. Lag is normal — reads on replicas may be slightly stale; plan for replication lag monitoring."
      />
      <svg viewBox="0 0 760 224" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <MySQLDefs prefix={p} />
        <rect x="32" y="40" width="160" height="52" rx="10" fill={`url(#${p}-mysql-deep)`} stroke="#0e7490" strokeWidth="1.3" />
        <text x="112" y="64" textAnchor="middle" fontSize="8" fontWeight="800" fill="#ecfeff" fontFamily="system-ui">
          Primary (source)
        </text>
        <text x="112" y="80" textAnchor="middle" fontSize="6.5" fill="#a5f3fc" fontFamily="ui-monospace">
          binlog (ROW/SBR)
        </text>
        <line x1="192" y1="66" x2="248" y2="66" stroke="#00758F" strokeWidth="2" markerEnd={`url(#${p}-mysql-arrow)`} />
        <rect x="252" y="44" width="120" height="44" rx="8" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.2" />
        <text x="312" y="70" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#0c4a6e" fontFamily="system-ui">
          Network
        </text>
        <line x1="372" y1="66" x2="428" y2="66" stroke="#00758F" strokeWidth="2" markerEnd={`url(#${p}-mysql-arrow)`} />
        <rect x="432" y="40" width="140" height="52" rx="10" fill="#fff7ed" stroke="#ea580c" strokeWidth="1.3" />
        <text x="502" y="64" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#9a3412" fontFamily="system-ui">
          Replica I/O
        </text>
        <text x="502" y="80" textAnchor="middle" fontSize="6.5" fill="#c2410c" fontFamily="system-ui">
          relay log
        </text>
        <line x1="572" y1="66" x2="616" y2="66" stroke="#00758F" strokeWidth="2" markerEnd={`url(#${p}-mysql-arrow)`} />
        <rect x="620" y="40" width="108" height="52" rx="10" fill={`url(#${p}-mysql-node)`} stroke="#00758F" strokeWidth="1.4" />
        <text x="674" y="64" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#134e4a" fontFamily="system-ui">
          SQL thread
        </text>
        <text x="674" y="80" textAnchor="middle" fontSize="6.5" fill="#0f766e" fontFamily="system-ui">
          apply
        </text>
        <text x="380" y="118" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily="system-ui">
          GTIDs (global transaction IDs) simplify failover and auto-positioning in modern topologies.
        </text>
        <rect x="40" y="132" width="680" height="76" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
        <text x="380" y="158" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#334155" fontFamily="system-ui">
          Not for synchronous strong consistency — use clustering or external consensus if you need that guarantee.
        </text>
        <text x="380" y="182" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily="system-ui">
          Backups: snapshot replica + binlog position, or mysqldump / Percona XtraBackup depending on size and RTO/RPO.
        </text>
      </svg>
    </figure>
  );
}

/** INSERT / UPDATE path */
export function MySQLDmlWritePathScenarioDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-mysql-scenario" role="img" aria-label="MySQL DML write path">
      <FlowchartFigcaption
        title="Real scenario: what happens on INSERT or UPDATE"
        fresher="DML modifies buffer pool pages in memory first. InnoDB writes redo log records before page flush (WAL). Doublewrite buffer protects against torn pages. UNIQUE checks and foreign keys may trigger extra index lookups — batch inserts and ordered PKs help throughput."
      />
      <svg viewBox="0 0 760 216" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <MySQLDefs prefix={p} />
        <rect x="28" y="36" width="100" height="44" rx="8" fill="#fff7ed" stroke="#ea580c" strokeWidth="1.3" />
        <text x="78" y="64" textAnchor="middle" fontSize="8" fontWeight="800" fill="#9a3412" fontFamily="ui-monospace">
          INSERT
        </text>
        <line x1="128" y1="58" x2="168" y2="58" stroke="#00758F" strokeWidth="2" markerEnd={`url(#${p}-mysql-arrow)`} />
        <rect x="172" y="32" width="132" height="52" rx="9" fill={`url(#${p}-mysql-node)`} stroke="#00758F" strokeWidth="1.4" />
        <text x="238" y="54" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#134e4a" fontFamily="system-ui">
          Change buffer
        </text>
        <text x="238" y="70" textAnchor="middle" fontSize="6.5" fill="#0f766e" fontFamily="system-ui">
          secondary idx (merge)
        </text>
        <line x1="304" y1="58" x2="344" y2="58" stroke="#00758F" strokeWidth="2" markerEnd={`url(#${p}-mysql-arrow)`} />
        <rect x="348" y="32" width="124" height="52" rx="9" fill="#fef3c7" stroke="#d97706" strokeWidth="1.3" />
        <text x="410" y="54" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#92400e" fontFamily="system-ui">
          Redo + undo
        </text>
        <text x="410" y="70" textAnchor="middle" fontSize="6.5" fill="#b45309" fontFamily="system-ui">
          WAL ordering
        </text>
        <line x1="472" y1="58" x2="512" y2="58" stroke="#00758F" strokeWidth="2" markerEnd={`url(#${p}-mysql-arrow)`} />
        <rect x="516" y="36" width="108" height="44" rx="9" fill={`url(#${p}-mysql-deep)`} stroke="#0e7490" strokeWidth="1.2" />
        <text x="570" y="62" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#ecfeff" fontFamily="system-ui">
          Flush pages
        </text>
        <line x1="624" y1="58" x2="664" y2="58" stroke="#00758F" strokeWidth="2" markerEnd={`url(#${p}-mysql-arrow)`} />
        <rect x="668" y="36" width="64" height="44" rx="8" fill="#ecfdf5" stroke="#059669" strokeWidth="1.2" />
        <text x="700" y="62" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#065f46" fontFamily="system-ui">
          .ibd
        </text>
        <text x="380" y="108" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily="system-ui">
          Bulk load: INSERT … VALUES many rows, or LOAD DATA INFILE — fewer round-trips, less redo overhead per row.
        </text>
        <rect x="40" y="124" width="680" height="76" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
        <text x="380" y="150" textAnchor="middle" fontSize="7" fontWeight="700" fill="#334155" fontFamily="system-ui">
          Real scenario: hot row updates — contention on same index range → consider queueing, sharding, or smaller transactions.
        </text>
        <text x="380" y="174" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily="system-ui">
          UPDATE can’t always be in-place — variable-length columns may cause page splits.
        </text>
      </svg>
    </figure>
  );
}

/** Deep Windows-style installer path — Server product vs optional tools */
export function MySQLWindowsInstallerDeepScenarioDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-mysql-scenario" role="img" aria-label="MySQL Windows installer deep flow">
      <FlowchartFigcaption
        title="Deep dive: MySQL Installer (Windows) — what actually happens"
        fresher="The Community Installer is a bundle manager: you pick which products to install (MySQL Server is the database process; MySQL Workbench, Shell, and connectors are separate line items). The wizard then runs: extract files → initialize the data directory (system tables) → apply network and account settings → install/register the Windows Service so mysqld starts on boot. If you skip Workbench here, you can add it later from the same installer (Modify) or install Workbench separately — you still need a running Server first."
      />
      <svg viewBox="0 0 780 340" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <MySQLDefs prefix={p} />
        <text x="390" y="22" textAnchor="middle" fontSize="9" fontWeight="800" fill="#0f766e" fontFamily="system-ui">
          Phase 1 — Choose products (Custom / Developer Default)
        </text>
        <rect x="20" y="32" width="168" height="56" rx="10" fill="#fff7ed" stroke="#ea580c" strokeWidth="1.4" />
        <text x="104" y="54" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#9a3412" fontFamily="system-ui">
          MySQL Installer
        </text>
        <text x="104" y="70" textAnchor="middle" fontSize="6.5" fill="#c2410c" fontFamily="system-ui">
          mysql-installer-community
        </text>
        <text x="104" y="82" textAnchor="middle" fontSize="6" fill="#64748b" fontFamily="system-ui">
          Select / update catalog
        </text>
        <line x1="188" y1="60" x2="228" y2="60" stroke="#00758F" strokeWidth="2" markerEnd={`url(#${p}-mysql-arrow)`} />
        <rect x="232" y="30" width="200" height="60" rx="10" fill={`url(#${p}-mysql-node)`} stroke="#00758F" strokeWidth="1.4" />
        <text x="332" y="52" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#134e4a" fontFamily="system-ui">
          Product selection
        </text>
        <text x="332" y="68" textAnchor="middle" fontSize="6.5" fill="#0f766e" fontFamily="ui-monospace">
          Server 8.0.x (required)
        </text>
        <text x="332" y="80" textAnchor="middle" fontSize="6" fill="#64748b" fontFamily="system-ui">
          Workbench optional · same wizard
        </text>
        <line x1="432" y1="60" x2="472" y2="60" stroke="#00758F" strokeWidth="2" markerEnd={`url(#${p}-mysql-arrow)`} />
        <rect x="476" y="32" width="284" height="56" rx="10" fill="#fef3c7" stroke="#d97706" strokeWidth="1.3" />
        <text x="618" y="54" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#92400e" fontFamily="system-ui">
          Download &amp; Execute
        </text>
        <text x="618" y="70" textAnchor="middle" fontSize="6.5" fill="#b45309" fontFamily="system-ui">
          MSI installs files to Program Files
        </text>
        <text x="390" y="112" textAnchor="middle" fontSize="9" fontWeight="800" fill="#0f766e" fontFamily="system-ui">
          Phase 2 — Configuration (after files are on disk)
        </text>
        <rect x="24" y="120" width="168" height="64" rx="10" fill={`url(#${p}-mysql-node)`} stroke="#00758F" strokeWidth="1.4" />
        <text x="108" y="144" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#134e4a" fontFamily="system-ui">
          Type &amp; Networking
        </text>
        <text x="108" y="162" textAnchor="middle" fontSize="6.5" fill="#0f766e" fontFamily="system-ui">
          port 3306 · firewall
        </text>
        <text x="108" y="176" textAnchor="middle" fontSize="6" fill="#64748b" fontFamily="system-ui">
          Config Type: Dev / Dedicated
        </text>
        <line x1="192" y1="152" x2="232" y2="152" stroke="#00758F" strokeWidth="2" markerEnd={`url(#${p}-mysql-arrow)`} />
        <rect x="236" y="120" width="168" height="64" rx="10" fill="#fce7f3" stroke="#db2777" strokeWidth="1.2" />
        <text x="320" y="144" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#9d174d" fontFamily="system-ui">
          Accounts &amp; roles
        </text>
        <text x="320" y="162" textAnchor="middle" fontSize="6.5" fill="#be185d" fontFamily="system-ui">
          root password · caching_sha2
        </text>
        <text x="320" y="176" textAnchor="middle" fontSize="6" fill="#64748b" fontFamily="system-ui">
          MySQL 8 default auth plugin
        </text>
        <line x1="404" y1="152" x2="444" y2="152" stroke="#00758F" strokeWidth="2" markerEnd={`url(#${p}-mysql-arrow)`} />
        <rect x="448" y="120" width="168" height="64" rx="10" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.2" />
        <text x="532" y="144" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#0c4a6e" fontFamily="system-ui">
          Windows Service
        </text>
        <text x="532" y="162" textAnchor="middle" fontSize="6.5" fill="#0369a1" fontFamily="system-ui">
          MySQL80 · auto-start
        </text>
        <text x="532" y="176" textAnchor="middle" fontSize="6" fill="#64748b" fontFamily="system-ui">
          service name may vary
        </text>
        <line x1="616" y1="152" x2="656" y2="152" stroke="#00758F" strokeWidth="2" markerEnd={`url(#${p}-mysql-arrow)`} />
        <rect x="660" y="124" width="100" height="56" rx="10" fill={`url(#${p}-mysql-deep)`} stroke="#0e7490" strokeWidth="1.2" />
        <text x="710" y="150" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#ecfeff" fontFamily="system-ui">
          Apply
        </text>
        <text x="710" y="166" textAnchor="middle" fontSize="6.5" fill="#a5f3fc" fontFamily="system-ui">
          init datadir
        </text>
        <text x="390" y="208" textAnchor="middle" fontSize="9" fontWeight="800" fill="#0f766e" fontFamily="system-ui">
          Phase 3 — Runtime (every client uses this)
        </text>
        <rect x="120" y="218" width="200" height="52" rx="10" fill={`url(#${p}-mysql-deep)`} stroke="#0e7490" strokeWidth="1.3" />
        <text x="220" y="242" textAnchor="middle" fontSize="8" fontWeight="800" fill="#ecfeff" fontFamily="ui-monospace">
          mysqld.exe
        </text>
        <text x="220" y="258" textAnchor="middle" fontSize="6.5" fill="#a5f3fc" fontFamily="system-ui">
          listens TCP 3306
        </text>
        <line x1="320" y1="244" x2="360" y2="244" stroke="#00758F" strokeWidth="2" markerEnd={`url(#${p}-mysql-arrow)`} />
        <rect x="364" y="218" width="296" height="52" rx="10" fill="#f0fdfa" stroke="#99f6e4" strokeWidth="1.2" />
        <text x="512" y="240" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#115e59" fontFamily="system-ui">
          Clients: mysql CLI, Workbench, app JDBC
        </text>
        <text x="512" y="256" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily="system-ui">
          all use TCP to the same server — not separate databases
        </text>
        <rect x="32" y="282" width="716" height="52" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
        <text x="390" y="304" textAnchor="middle" fontSize="6.5" fontWeight="700" fill="#334155" fontFamily="system-ui">
          Linux/macOS: package or brew installs mysqld; datadir often /var/lib/mysql. Docker: container runs mysqld, host maps 3306.
        </text>
        <text x="390" y="322" textAnchor="middle" fontSize="6" fill="#64748b" fontFamily="system-ui">
          my.ini / my.cnf: port, datadir, innodb_buffer_pool_size — after editing, restart the service.
        </text>
      </svg>
    </figure>
  );
}

/** Workbench is a client — it does not replace the server */
export function MySQLWorkbenchVsServerScenarioDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-mysql-scenario" role="img" aria-label="MySQL Workbench vs server">
      <FlowchartFigcaption
        title="Critical distinction: MySQL Workbench vs MySQL Server"
        fresher="MySQL Server (mysqld) is the process that stores data and listens on port 3306. MySQL Workbench is only a GUI client — it sends SQL over the same protocol as the mysql command-line. Installing Workbench alone does not give you a database. Installing Server without Workbench is normal for servers; you connect with CLI or another app. If Workbench shows no connection, the Server service is not running or the host/port/user is wrong — not a missing Workbench install."
      />
      <svg viewBox="0 0 760 260" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <MySQLDefs prefix={p} />
        <rect x="16" y="36" width="240" height="120" rx="14" fill="#fff7ed" stroke="#ea580c" strokeWidth="1.5" filter={`url(#${p}-mysql-glow)`} />
        <text x="136" y="64" textAnchor="middle" fontSize="9" fontWeight="800" fill="#9a3412" fontFamily="system-ui">
          MySQL Workbench (GUI)
        </text>
        <text x="136" y="84" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily="system-ui">
          Optional · Windows / macOS app
        </text>
        <text x="136" y="104" textAnchor="middle" fontSize="6.5" fill="#c2410c" fontFamily="system-ui">
          SQL editor, modeling, admin tools
        </text>
        <text x="136" y="128" textAnchor="middle" fontSize="6.5" fill="#334155" fontFamily="system-ui">
          Does not host data
        </text>
        <text x="136" y="148" textAnchor="middle" fontSize="6" fill="#64748b" fontFamily="system-ui">
          macOS: separate .dmg or brew cask
        </text>
        <line x1="256" y1="96" x2="320" y2="96" stroke="#00758F" strokeWidth="2.5" markerEnd={`url(#${p}-mysql-arrow)`} />
        <text x="288" y="88" textAnchor="middle" fontSize="7" fontWeight="800" fill="#f97316" fontFamily="ui-monospace">
          TCP 3306
        </text>
        <text x="288" y="108" textAnchor="middle" fontSize="6" fill="#64748b" fontFamily="system-ui">
          JDBC / CLI same port
        </text>
        <rect x="504" y="36" width="240" height="120" rx="14" fill={`url(#${p}-mysql-deep)`} stroke="#0e7490" strokeWidth="1.4" />
        <text x="624" y="64" textAnchor="middle" fontSize="9" fontWeight="800" fill="#ecfeff" fontFamily="system-ui">
          MySQL Server (mysqld)
        </text>
        <text x="624" y="84" textAnchor="middle" fontSize="6.5" fill="#a5f3fc" fontFamily="system-ui">
          Required for any database
        </text>
        <text x="624" y="104" textAnchor="middle" fontSize="6.5" fill="#a5f3fc" fontFamily="system-ui">
          InnoDB · data files · users
        </text>
        <text x="624" y="128" textAnchor="middle" fontSize="6.5" fill="#ccfbf1" fontFamily="system-ui">
          Windows Service / systemd
        </text>
        <rect x="40" y="176" width="680" height="72" rx="11" fill="#f8fafc" stroke="#cbd5e1" />
        <text x="380" y="198" textAnchor="middle" fontSize="6.5" fontWeight="700" fill="#334155" fontFamily="system-ui">
          New connection: Home → MySQL Connections → + → Standard (TCP/IP) → Hostname 127.0.0.1, Port 3306, User root → Test Connection.
        </text>
        <text x="380" y="218" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily="system-ui">
          “Local instance MySQL80” appears only if the installer created it; otherwise create the connection yourself.
        </text>
        <text x="380" y="238" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily="system-ui">
          Auth failures: wrong password or user@host — fix in SQL or installer, not by reinstalling Workbench alone.
        </text>
      </svg>
    </figure>
  );
}

/** Install → data directory → server start */
export function MySQLInstallationAndStartScenarioDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-mysql-scenario" role="img" aria-label="MySQL installation flow">
      <FlowchartFigcaption
        title="Summary: binaries → datadir → service → first client"
        fresher="After the server package is installed, the data directory must be initialized (system tables, mysql schema). Configuration sets port and engine defaults. The OS service launches mysqld; only then do clients (Workbench, mysql CLI, JDBC) succeed. For the full Windows wizard, open the Installation topic’s “Deep installer” tab."
      />
      <svg viewBox="0 0 760 220" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <MySQLDefs prefix={p} />
        <rect x="24" y="40" width="100" height="44" rx="9" fill="#fff7ed" stroke="#ea580c" strokeWidth="1.3" />
        <text x="74" y="66" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#9a3412" fontFamily="system-ui">
          Install
        </text>
        <line x1="124" y1="62" x2="164" y2="62" stroke="#00758F" strokeWidth="2" markerEnd={`url(#${p}-mysql-arrow)`} />
        <rect x="168" y="36" width="120" height="52" rx="9" fill={`url(#${p}-mysql-node)`} stroke="#00758F" strokeWidth="1.4" />
        <text x="228" y="58" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#134e4a" fontFamily="system-ui">
          Init datadir
        </text>
        <text x="228" y="74" textAnchor="middle" fontSize="6.5" fill="#0f766e" fontFamily="ui-monospace">
          mysql system db
        </text>
        <line x1="288" y1="62" x2="328" y2="62" stroke="#00758F" strokeWidth="2" markerEnd={`url(#${p}-mysql-arrow)`} />
        <rect x="332" y="40" width="108" height="44" rx="9" fill="#fef3c7" stroke="#d97706" strokeWidth="1.3" />
        <text x="386" y="66" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#92400e" fontFamily="system-ui">
          my.cnf
        </text>
        <line x1="440" y1="62" x2="480" y2="62" stroke="#00758F" strokeWidth="2" markerEnd={`url(#${p}-mysql-arrow)`} />
        <rect x="484" y="36" width="120" height="52" rx="9" fill={`url(#${p}-mysql-deep)`} stroke="#0e7490" strokeWidth="1.2" />
        <text x="544" y="58" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#ecfeff" fontFamily="system-ui">
          mysqld start
        </text>
        <text x="544" y="74" textAnchor="middle" fontSize="6.5" fill="#a5f3fc" fontFamily="system-ui">
          service / docker
        </text>
        <line x1="604" y1="62" x2="644" y2="62" stroke="#00758F" strokeWidth="2" markerEnd={`url(#${p}-mysql-arrow)`} />
        <rect x="648" y="40" width="88" height="44" rx="9" fill="#ecfdf5" stroke="#059669" strokeWidth="1.2" />
        <text x="692" y="66" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#065f46" fontFamily="ui-monospace">
          mysql -u
        </text>
        <text x="380" y="118" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily="system-ui">
          First login: reset temporary root password, create app users with least privilege — not root in production apps.
        </text>
        <rect x="40" y="136" width="680" height="68" rx="11" fill="#f8fafc" stroke="#cbd5e1" />
        <text x="380" y="162" textAnchor="middle" fontSize="7" fontWeight="700" fill="#334155" fontFamily="system-ui">
          Cloud managed (RDS, Cloud SQL): you still reason about VPC, security groups, and parameter groups — same logical path.
        </text>
        <text x="380" y="186" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily="system-ui">
          Verify with SHOW VARIABLES LIKE &apos;port&apos;; and SELECT VERSION();
        </text>
      </svg>
    </figure>
  );
}

/** Choosing types for rows and indexes */
export function MySQLDataTypeDesignScenarioDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-mysql-scenario" role="img" aria-label="MySQL data type design">
      <FlowchartFigcaption
        title="Real scenario: how column types affect storage and queries"
        fresher="Each column has a type and optional constraints. Fixed vs variable length, charset for strings, and DECIMAL vs FLOAT for money all change on-disk row size, index width, and comparison semantics. Wrong types inflate I/O and break indexes."
      />
      <svg viewBox="0 0 760 224" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <MySQLDefs prefix={p} />
        <rect x="32" y="40" width="140" height="48" rx="10" fill={`url(#${p}-mysql-node)`} stroke="#00758F" strokeWidth="1.4" />
        <text x="102" y="64" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#134e4a" fontFamily="system-ui">
          Column definition
        </text>
        <text x="102" y="78" textAnchor="middle" fontSize="6.5" fill="#0f766e" fontFamily="ui-monospace">
          INT / VARCHAR / DECIMAL
        </text>
        <line x1="172" y1="64" x2="212" y2="64" stroke="#00758F" strokeWidth="2" markerEnd={`url(#${p}-mysql-arrow)`} />
        <rect x="216" y="40" width="148" height="48" rx="10" fill="#fef3c7" stroke="#d97706" strokeWidth="1.3" />
        <text x="290" y="64" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#92400e" fontFamily="system-ui">
          Row format
        </text>
        <text x="290" y="78" textAnchor="middle" fontSize="6.5" fill="#b45309" fontFamily="system-ui">
          COMPACT / DYNAMIC
        </text>
        <line x1="364" y1="64" x2="404" y2="64" stroke="#00758F" strokeWidth="2" markerEnd={`url(#${p}-mysql-arrow)`} />
        <rect x="408" y="40" width="160" height="48" rx="10" fill="#fff7ed" stroke="#ea580c" strokeWidth="1.3" />
        <text x="488" y="64" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#9a3412" fontFamily="system-ui">
          Index footprint
        </text>
        <text x="488" y="78" textAnchor="middle" fontSize="6.5" fill="#c2410c" fontFamily="system-ui">
          prefix length · charset
        </text>
        <line x1="568" y1="64" x2="608" y2="64" stroke="#00758F" strokeWidth="2" markerEnd={`url(#${p}-mysql-arrow)`} />
        <rect x="612" y="40" width="116" height="48" rx="10" fill={`url(#${p}-mysql-deep)`} stroke="#0e7490" strokeWidth="1.2" />
        <text x="670" y="70" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#ecfeff" fontFamily="system-ui">
          Query cost
        </text>
        <text x="380" y="118" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily="system-ui">
          Use the smallest type that fits the domain; VARCHAR(255) everywhere wastes index space and memory.
        </text>
        <rect x="40" y="132" width="680" height="76" rx="11" fill="#f8fafc" stroke="#cbd5e1" />
        <text x="380" y="158" textAnchor="middle" fontSize="7" fontWeight="700" fill="#334155" fontFamily="system-ui">
          DATETIME vs TIMESTAMP: timezone storage differs — pick one convention for the whole app.
        </text>
        <text x="380" y="182" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily="system-ui">
          BLOB/TEXT can force off-page storage — keep hot columns narrow for buffer pool efficiency.
        </text>
      </svg>
    </figure>
  );
}

/** CREATE DATABASE in the server */
export function MySQLCreateDatabaseScenarioDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-mysql-scenario" role="img" aria-label="Create database scenario">
      <FlowchartFigcaption
        title="Real scenario: creating a schema (database)"
        fresher="CREATE DATABASE defines a new namespace for objects. The server records it in the data dictionary; physical layout depends on innodb_file_per_table and file placement. Charset and collation default apply to new tables unless overridden."
      />
      <svg viewBox="0 0 760 212" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <MySQLDefs prefix={p} />
        <rect x="40" y="44" width="160" height="48" rx="10" fill="#fff7ed" stroke="#ea580c" strokeWidth="1.3" />
        <text x="120" y="72" textAnchor="middle" fontSize="8" fontWeight="800" fill="#9a3412" fontFamily="ui-monospace">
          CREATE DATABASE
        </text>
        <line x1="200" y1="68" x2="244" y2="68" stroke="#00758F" strokeWidth="2" markerEnd={`url(#${p}-mysql-arrow)`} />
        <rect x="248" y="40" width="180" height="56" rx="10" fill={`url(#${p}-mysql-node)`} stroke="#00758F" strokeWidth="1.4" />
        <text x="338" y="64" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#134e4a" fontFamily="system-ui">
          Data dictionary
        </text>
        <text x="338" y="82" textAnchor="middle" fontSize="6.5" fill="#0f766e" fontFamily="system-ui">
          mysql.* metadata
        </text>
        <line x1="428" y1="68" x2="472" y2="68" stroke="#00758F" strokeWidth="2" markerEnd={`url(#${p}-mysql-arrow)`} />
        <rect x="476" y="44" width="132" height="48" rx="10" fill="#fef3c7" stroke="#d97706" strokeWidth="1.3" />
        <text x="542" y="72" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#92400e" fontFamily="system-ui">
          Namespace
        </text>
        <line x1="608" y1="68" x2="652" y2="68" stroke="#00758F" strokeWidth="2" markerEnd={`url(#${p}-mysql-arrow)`} />
        <rect x="656" y="44" width="72" height="48" rx="10" fill={`url(#${p}-mysql-deep)`} stroke="#0e7490" strokeWidth="1.2" />
        <text x="692" y="72" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#ecfeff" fontFamily="system-ui">
          USE db
        </text>
        <text x="380" y="120" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily="system-ui">
          One MySQL instance hosts many databases; permissions can be scoped per schema.
        </text>
        <rect x="48" y="136" width="664" height="64" rx="11" fill="#f8fafc" stroke="#cbd5e1" />
        <text x="380" y="162" textAnchor="middle" fontSize="7" fontWeight="700" fill="#334155" fontFamily="system-ui">
          utf8mb4 + sensible collation — set once at DB or connection level to avoid mixed encodings.
        </text>
        <text x="380" y="184" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily="system-ui">
          DROP DATABASE is destructive — backups and privilege review first.
        </text>
      </svg>
    </figure>
  );
}

/** DDL and metadata locks */
export function MySQLDDLAlterScenarioDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-mysql-scenario" role="img" aria-label="DDL alter scenario">
      <FlowchartFigcaption
        title="Real scenario: DDL and long-running alters"
        fresher="CREATE / ALTER / DROP acquire metadata locks so the table definition stays consistent. Big ALTERs may rebuild the table (copy) or use online DDL depending on version and algorithm. Concurrent DML can wait behind MDL — plan maintenance windows for wide tables."
      />
      <svg viewBox="0 0 760 220" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <MySQLDefs prefix={p} />
        <rect x="28" y="40" width="120" height="48" rx="10" fill="#fff7ed" stroke="#ea580c" strokeWidth="1.3" />
        <text x="88" y="68" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#9a3412" fontFamily="ui-monospace">
          ALTER TABLE
        </text>
        <line x1="148" y1="64" x2="188" y2="64" stroke="#00758F" strokeWidth="2" markerEnd={`url(#${p}-mysql-arrow)`} />
        <rect x="192" y="36" width="140" height="56" rx="10" fill="#fce7f3" stroke="#db2777" strokeWidth="1.2" />
        <text x="262" y="60" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#9d174d" fontFamily="system-ui">
          Metadata lock
        </text>
        <text x="262" y="78" textAnchor="middle" fontSize="6.5" fill="#be185d" fontFamily="system-ui">
          waits for sessions
        </text>
        <line x1="332" y1="64" x2="372" y2="64" stroke="#00758F" strokeWidth="2" markerEnd={`url(#${p}-mysql-arrow)`} />
        <rect x="376" y="40" width="160" height="48" rx="10" fill={`url(#${p}-mysql-node)`} stroke="#00758F" strokeWidth="1.4" />
        <text x="456" y="64" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#134e4a" fontFamily="system-ui">
          Engine DDL
        </text>
        <text x="456" y="78" textAnchor="middle" fontSize="6.5" fill="#0f766e" fontFamily="system-ui">
          INPLACE / COPY
        </text>
        <line x1="536" y1="64" x2="576" y2="64" stroke="#00758F" strokeWidth="2" markerEnd={`url(#${p}-mysql-arrow)`} />
        <rect x="580" y="40" width="152" height="48" rx="10" fill={`url(#${p}-mysql-deep)`} stroke="#0e7490" strokeWidth="1.2" />
        <text x="656" y="68" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#ecfeff" fontFamily="system-ui">
          New table def
        </text>
        <text x="380" y="118" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily="system-ui">
          pt-online-schema-change and gh-ost are common patterns when native online DDL is not enough.
        </text>
        <rect x="40" y="132" width="680" height="72" rx="11" fill="#f8fafc" stroke="#cbd5e1" />
        <text x="380" y="158" textAnchor="middle" fontSize="7" fontWeight="700" fill="#334155" fontFamily="system-ui">
          Adding an index: still builds B-Tree — monitor disk I/O and replication lag on replicas.
        </text>
        <text x="380" y="184" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily="system-ui">
          Prefer additive changes; destructive column type shrinks need careful backfill strategies.
        </text>
      </svg>
    </figure>
  );
}

/** SELECT structure — logical building blocks */
export function MySQLSelectStatementShapeScenarioDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-mysql-scenario" role="img" aria-label="SELECT statement shape">
      <FlowchartFigcaption
        title="Real scenario: how a SELECT is structured"
        fresher="Execution order differs from written order, but mentally you build FROM (sources) → filters → grouping → projection. SELECT list expressions can reference aliases only in outer queries — understanding clauses prevents subtle bugs."
      />
      <svg viewBox="0 0 760 228" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <MySQLDefs prefix={p} />
        <rect x="60" y="36" width="120" height="44" rx="9" fill={`url(#${p}-mysql-deep)`} stroke="#0e7490" strokeWidth="1.2" />
        <text x="120" y="62" textAnchor="middle" fontSize="8" fontWeight="800" fill="#ecfeff" fontFamily="ui-monospace">
          FROM / JOIN
        </text>
        <line x1="180" y1="58" x2="220" y2="58" stroke="#00758F" strokeWidth="2" markerEnd={`url(#${p}-mysql-arrow)`} />
        <rect x="224" y="36" width="100" height="44" rx="9" fill={`url(#${p}-mysql-node)`} stroke="#00758F" strokeWidth="1.4" />
        <text x="274" y="62" textAnchor="middle" fontSize="8" fontWeight="800" fill="#134e4a" fontFamily="ui-monospace">
          WHERE
        </text>
        <line x1="324" y1="58" x2="364" y2="58" stroke="#00758F" strokeWidth="2" markerEnd={`url(#${p}-mysql-arrow)`} />
        <rect x="368" y="36" width="112" height="44" rx="9" fill="#fef3c7" stroke="#d97706" strokeWidth="1.3" />
        <text x="424" y="62" textAnchor="middle" fontSize="8" fontWeight="800" fill="#92400e" fontFamily="ui-monospace">
          GROUP BY
        </text>
        <line x1="480" y1="58" x2="520" y2="58" stroke="#00758F" strokeWidth="2" markerEnd={`url(#${p}-mysql-arrow)`} />
        <rect x="524" y="36" width="100" height="44" rx="9" fill="#fef3c7" stroke="#d97706" strokeWidth="1.3" />
        <text x="574" y="62" textAnchor="middle" fontSize="8" fontWeight="800" fill="#92400e" fontFamily="ui-monospace">
          HAVING
        </text>
        <line x1="624" y1="58" x2="664" y2="58" stroke="#00758F" strokeWidth="2" markerEnd={`url(#${p}-mysql-arrow)`} />
        <rect x="668" y="36" width="72" height="44" rx="9" fill="#fff7ed" stroke="#ea580c" strokeWidth="1.3" />
        <text x="704" y="62" textAnchor="middle" fontSize="8" fontWeight="800" fill="#9a3412" fontFamily="ui-monospace">
          SELECT
        </text>
        <text x="380" y="108" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily="system-ui">
          Optimizer may reorder joins; written SELECT list is evaluated in context of grouped rows when GROUP BY is present.
        </text>
        <rect x="40" y="124" width="680" height="88" rx="11" fill="#f8fafc" stroke="#cbd5e1" />
        <text x="380" y="148" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#334155" fontFamily="system-ui">
          DISTINCT applies after row combination; window functions (8.0) add another evaluation phase after result rows.
        </text>
        <text x="380" y="172" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily="system-ui">
          FOR UPDATE locks selected rows in InnoDB — use in transactions intentionally.
        </text>
        <text x="380" y="194" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily="system-ui">
          * in production APIs: prefer explicit column lists to avoid breaking clients when schema evolves.
        </text>
      </svg>
    </figure>
  );
}

/** Logical clause order (not written top-to-bottom) */
export function MySQLClauseLogicalOrderScenarioDiagram() {
  const p = useSvgPrefix();
  const steps = ['FROM', 'WHERE', 'GROUP BY', 'HAVING', 'SELECT', 'ORDER BY', 'LIMIT'];
  return (
    <figure className="flowchart-pro flowchart-pro-mysql-scenario" role="img" aria-label="SQL clause order">
      <FlowchartFigcaption
        title="Real scenario: logical processing order"
        fresher="Engines optimize internally, but for reasoning about HAVING vs WHERE, alias visibility, and when ORDER BY runs, this order is the standard teaching model. WHERE filters rows before grouping; HAVING filters groups after aggregates."
      />
      <svg viewBox="0 0 760 248" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <MySQLDefs prefix={p} />
        {steps.map((label, i) => {
          const x = 36 + i * 98;
          return (
            <g key={label}>
              <rect x={x} y="40" width="88" height="40" rx="8" fill={i % 2 === 0 ? `url(#${p}-mysql-node)` : '#fef3c7'} stroke={i % 2 === 0 ? '#00758F' : '#d97706'} strokeWidth="1.2" />
              <text x={x + 44} y="64" textAnchor="middle" fontSize="7" fontWeight="800" fill={i % 2 === 0 ? '#134e4a' : '#92400e'} fontFamily="ui-monospace">
                {label}
              </text>
              {i < steps.length - 1 && (
                <line x1={x + 88} y1="60" x2={x + 98} y2="60" stroke="#00758F" strokeWidth="1.8" markerEnd={`url(#${p}-mysql-arrow)`} />
              )}
            </g>
          );
        })}
        <text x="380" y="108" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily="system-ui">
          WHERE cannot use aggregate aliases; HAVING can — because aggregates exist only after GROUP BY.
        </text>
        <rect x="40" y="124" width="680" height="108" rx="11" fill="#f8fafc" stroke="#cbd5e1" />
        <text x="380" y="150" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#334155" fontFamily="system-ui">
          Real bug: using SELECT alias in WHERE — not allowed; repeat expression or use subquery / outer query.
        </text>
        <text x="380" y="174" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily="system-ui">
          ORDER BY can reference SELECT aliases in MySQL — convenient but be explicit in shared SQL for portability.
        </text>
        <text x="380" y="198" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily="system-ui">
          LIMIT last: pagination with OFFSET pays O(offset) cost — keyset pagination for deep pages.
        </text>
      </svg>
    </figure>
  );
}

/** FK insert checks parent */
export function MySQLForeignKeyValidationScenarioDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-mysql-scenario" role="img" aria-label="Foreign key validation">
      <FlowchartFigcaption
        title="Real scenario: inserting a child row with a foreign key"
        fresher="InnoDB enforces referential integrity: before committing a child row, the referenced parent key must exist (or NULL if allowed). Deletes/updates on the parent can CASCADE or RESTRICT depending on the FK definition — plan for lock order to avoid deadlocks."
      />
      <svg viewBox="0 0 760 216" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <MySQLDefs prefix={p} />
        <rect x="40" y="44" width="140" height="48" rx="10" fill="#fff7ed" stroke="#ea580c" strokeWidth="1.3" />
        <text x="110" y="72" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#9a3412" fontFamily="ui-monospace">
          INSERT child
        </text>
        <line x1="180" y1="68" x2="224" y2="68" stroke="#00758F" strokeWidth="2" markerEnd={`url(#${p}-mysql-arrow)`} />
        <rect x="228" y="40" width="180" height="56" rx="10" fill={`url(#${p}-mysql-node)`} stroke="#00758F" strokeWidth="1.4" />
        <text x="318" y="64" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#134e4a" fontFamily="system-ui">
          Lookup parent PK
        </text>
        <text x="318" y="82" textAnchor="middle" fontSize="6.5" fill="#0f766e" fontFamily="system-ui">
          shared lock / check
        </text>
        <line x1="408" y1="68" x2="452" y2="68" stroke="#00758F" strokeWidth="2" markerEnd={`url(#${p}-mysql-arrow)`} />
        <rect x="456" y="44" width="120" height="48" rx="10" fill="#ecfdf5" stroke="#059669" strokeWidth="1.2" />
        <text x="516" y="72" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#065f46" fontFamily="system-ui">
          OK → row
        </text>
        <line x1="576" y1="68" x2="620" y2="68" stroke="#00758F" strokeWidth="2" markerEnd={`url(#${p}-mysql-arrow)`} />
        <rect x="624" y="44" width="96" height="48" rx="10" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.2" />
        <text x="672" y="72" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#991b1b" fontFamily="system-ui">
          Error 1452
        </text>
        <text x="380" y="118" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily="system-ui">
          ON DELETE CASCADE: deleting parent removes children — dangerous without backups and audits.
        </text>
        <rect x="48" y="132" width="664" height="68" rx="11" fill="#f8fafc" stroke="#cbd5e1" />
        <text x="380" y="158" textAnchor="middle" fontSize="7" fontWeight="700" fill="#334155" fontFamily="system-ui">
          Composite FKs: all columns must match — indexing the child columns in left-prefix order helps join performance.
        </text>
        <text x="380" y="182" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily="system-ui">
          Disable FK checks (SESSION) only for controlled migrations — not in normal app code.
        </text>
      </svg>
    </figure>
  );
}

/** GROUP BY + aggregates */
export function MySQLAggregatePipelineScenarioDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-mysql-scenario" role="img" aria-label="Aggregate query pipeline">
      <FlowchartFigcaption
        title="Real scenario: aggregates and GROUP BY"
        fresher="Rows are partitioned by GROUP BY keys. Aggregate functions (COUNT, SUM, AVG…) collapse each group to one row. Non-aggregated columns in SELECT must appear in GROUP BY (or ONLY_FULL_GROUP_BY mode errors). HAVING filters groups after aggregation."
      />
      <svg viewBox="0 0 760 220" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <MySQLDefs prefix={p} />
        <rect x="32" y="44" width="140" height="48" rx="10" fill={`url(#${p}-mysql-node)`} stroke="#00758F" strokeWidth="1.4" />
        <text x="102" y="72" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#134e4a" fontFamily="system-ui">
          Row stream
        </text>
        <line x1="172" y1="68" x2="212" y2="68" stroke="#00758F" strokeWidth="2" markerEnd={`url(#${p}-mysql-arrow)`} />
        <rect x="216" y="40" width="160" height="56" rx="10" fill="#fef3c7" stroke="#d97706" strokeWidth="1.3" />
        <text x="296" y="64" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#92400e" fontFamily="system-ui">
          GROUP BY keys
        </text>
        <text x="296" y="82" textAnchor="middle" fontSize="6.5" fill="#b45309" fontFamily="system-ui">
          sort / hash
        </text>
        <line x1="376" y1="68" x2="416" y2="68" stroke="#00758F" strokeWidth="2" markerEnd={`url(#${p}-mysql-arrow)`} />
        <rect x="420" y="44" width="160" height="48" rx="10" fill={`url(#${p}-mysql-deep)`} stroke="#0e7490" strokeWidth="1.2" />
        <text x="500" y="72" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#ecfeff" fontFamily="system-ui">
          Aggregates
        </text>
        <line x1="580" y1="68" x2="620" y2="68" stroke="#00758F" strokeWidth="2" markerEnd={`url(#${p}-mysql-arrow)`} />
        <rect x="624" y="44" width="104" height="48" rx="10" fill="#ecfdf5" stroke="#059669" strokeWidth="1.2" />
        <text x="676" y="72" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#065f46" fontFamily="system-ui">
          HAVING
        </text>
        <text x="380" y="118" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily="system-ui">
          COUNT(*) vs COUNT(col): NULL handling differs — know which you need for reporting accuracy.
        </text>
        <rect x="40" y="132" width="680" height="72" rx="11" fill="#f8fafc" stroke="#cbd5e1" />
        <text x="380" y="158" textAnchor="middle" fontSize="7" fontWeight="700" fill="#334155" fontFamily="system-ui">
          ROLLUP / CUBE (8.0+ features via GROUPING) — super useful for subtotals in analytics exports.
        </text>
        <text x="380" y="184" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily="system-ui">
          Large GROUP BY: ensure selective WHERE first to shrink input — memory for temp tables is bounded by tmp_table_size.
        </text>
      </svg>
    </figure>
  );
}

/** Scalar functions on each row */
export function MySQLScalarExpressionRowScenarioDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-mysql-scenario" role="img" aria-label="Scalar functions">
      <FlowchartFigcaption
        title="Real scenario: scalar functions in the SELECT list"
        fresher="For each surviving row after joins and WHERE, the engine evaluates expressions: CONCAT, DATE_FORMAT, COALESCE, CASE…. These run row-by-row (unless optimized away). Heavy functions on unindexed columns can still dominate CPU — compute in app tier when possible."
      />
      <svg viewBox="0 0 760 208" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <MySQLDefs prefix={p} />
        <rect x="48" y="48" width="160" height="48" rx="10" fill={`url(#${p}-mysql-node)`} stroke="#00758F" strokeWidth="1.4" />
        <text x="128" y="76" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#134e4a" fontFamily="system-ui">
          Current row
        </text>
        <line x1="208" y1="72" x2="252" y2="72" stroke="#00758F" strokeWidth="2" markerEnd={`url(#${p}-mysql-arrow)`} />
        <rect x="256" y="44" width="200" height="56" rx="10" fill="#fef3c7" stroke="#d97706" strokeWidth="1.3" />
        <text x="356" y="68" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#92400e" fontFamily="system-ui">
          expr per column
        </text>
        <text x="356" y="86" textAnchor="middle" fontSize="6.5" fill="#b45309" fontFamily="ui-monospace">
          UPPER · IFNULL · ROUND
        </text>
        <line x1="456" y1="72" x2="500" y2="72" stroke="#00758F" strokeWidth="2" markerEnd={`url(#${p}-mysql-arrow)`} />
        <rect x="504" y="48" width="208" height="48" rx="10" fill={`url(#${p}-mysql-deep)`} stroke="#0e7490" strokeWidth="1.2" />
        <text x="608" y="76" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#ecfeff" fontFamily="system-ui">
          Result row
        </text>
        <text x="380" y="124" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily="system-ui">
          WHERE UPPER(col) = … prevents index use on col — consider generated column + index for case-insensitive search.
        </text>
        <rect x="48" y="140" width="664" height="56" rx="11" fill="#f8fafc" stroke="#cbd5e1" />
        <text x="380" y="166" textAnchor="middle" fontSize="7" fontWeight="700" fill="#334155" fontFamily="system-ui">
          Deterministic vs non-deterministic functions matter for replication and caching — document side effects.
        </text>
        <text x="380" y="184" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily="system-ui">
          JSON_* functions: flexible but validate size and indexing strategy (functional indexes in 8.0+).
        </text>
      </svg>
    </figure>
  );
}

/** VIEW merged into statement */
export function MySQLViewQueryMergeScenarioDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-mysql-scenario" role="img" aria-label="View resolution">
      <FlowchartFigcaption
        title="Real scenario: querying a view"
        fresher="A view stores a SELECT definition, not materialized rows (unless explicitly so in other engines). MySQL typically merges the view SQL into your outer query so the optimizer sees through it. Complex views can still obscure index use — check EXPLAIN on the expanded SQL."
      />
      <svg viewBox="0 0 760 212" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <MySQLDefs prefix={p} />
        <rect x="40" y="44" width="120" height="48" rx="10" fill="#fff7ed" stroke="#ea580c" strokeWidth="1.3" />
        <text x="100" y="72" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#9a3412" fontFamily="ui-monospace">
          SELECT … v
        </text>
        <line x1="160" y1="68" x2="204" y2="68" stroke="#00758F" strokeWidth="2" markerEnd={`url(#${p}-mysql-arrow)`} />
        <rect x="208" y="40" width="180" height="56" rx="10" fill={`url(#${p}-mysql-node)`} stroke="#00758F" strokeWidth="1.4" />
        <text x="298" y="64" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#134e4a" fontFamily="system-ui">
          Expand view def
        </text>
        <text x="298" y="82" textAnchor="middle" fontSize="6.5" fill="#0f766e" fontFamily="system-ui">
          merge algorithm
        </text>
        <line x1="388" y1="68" x2="432" y2="68" stroke="#00758F" strokeWidth="2" markerEnd={`url(#${p}-mysql-arrow)`} />
        <rect x="436" y="44" width="200" height="48" rx="10" fill="#fef3c7" stroke="#d97706" strokeWidth="1.3" />
        <text x="536" y="72" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#92400e" fontFamily="system-ui">
          Single optimized query
        </text>
        <line x1="636" y1="68" x2="680" y2="68" stroke="#00758F" strokeWidth="2" markerEnd={`url(#${p}-mysql-arrow)`} />
        <rect x="684" y="44" width="36" height="48" rx="8" fill={`url(#${p}-mysql-deep)`} stroke="#0e7490" strokeWidth="1.2" />
        <text x="702" y="76" textAnchor="middle" fontSize="9" fontWeight="800" fill="#ecfeff" fontFamily="system-ui">
          ⇢
        </text>
        <text x="380" y="118" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily="system-ui">
          WITH CHECK OPTION on updatable views — prevents rows that would disappear from the view after insert/update.
        </text>
        <rect x="48" y="132" width="664" height="64" rx="11" fill="#f8fafc" stroke="#cbd5e1" />
        <text x="380" y="158" textAnchor="middle" fontSize="7" fontWeight="700" fill="#334155" fontFamily="system-ui">
          Security: views can hide columns — still enforce privileges on underlying tables for defense in depth.
        </text>
        <text x="380" y="182" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily="system-ui">
          Nested views: readability vs optimizer complexity — sometimes a CTE (8.0+) is clearer.
        </text>
      </svg>
    </figure>
  );
}

/** CALL procedure */
export function MySQLProcedureCallFlowScenarioDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-mysql-scenario" role="img" aria-label="Stored procedure call">
      <FlowchartFigcaption
        title="Real scenario: executing a stored procedure"
        fresher="CALL transfers control to a precompiled routine in the server. It can run multiple statements, use session variables, and return result sets. Delimiter changes matter in CLI scripts; apps use JDBC CallableStatement. Permissions EXECUTE must be granted explicitly."
      />
      <svg viewBox="0 0 760 216" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <MySQLDefs prefix={p} />
        <rect x="36" y="44" width="112" height="48" rx="10" fill="#fff7ed" stroke="#ea580c" strokeWidth="1.3" />
        <text x="92" y="72" textAnchor="middle" fontSize="8" fontWeight="800" fill="#9a3412" fontFamily="ui-monospace">
          CALL sp()
        </text>
        <line x1="148" y1="68" x2="192" y2="68" stroke="#00758F" strokeWidth="2" markerEnd={`url(#${p}-mysql-arrow)`} />
        <rect x="196" y="40" width="160" height="56" rx="10" fill={`url(#${p}-mysql-node)`} stroke="#00758F" strokeWidth="1.4" />
        <text x="276" y="64" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#134e4a" fontFamily="system-ui">
          Parse &amp; bind
        </text>
        <text x="276" y="82" textAnchor="middle" fontSize="6.5" fill="#0f766e" fontFamily="system-ui">
          mysql.proc
        </text>
        <line x1="356" y1="68" x2="400" y2="68" stroke="#00758F" strokeWidth="2" markerEnd={`url(#${p}-mysql-arrow)`} />
        <rect x="404" y="44" width="200" height="48" rx="10" fill="#fef3c7" stroke="#d97706" strokeWidth="1.3" />
        <text x="504" y="72" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#92400e" fontFamily="system-ui">
          Procedure body
        </text>
        <line x1="604" y1="68" x2="648" y2="68" stroke="#00758F" strokeWidth="2" markerEnd={`url(#${p}-mysql-arrow)`} />
        <rect x="652" y="44" width="72" height="48" rx="10" fill={`url(#${p}-mysql-deep)`} stroke="#0e7490" strokeWidth="1.2" />
        <text x="688" y="72" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#ecfeff" fontFamily="system-ui">
          OUT / RS
        </text>
        <text x="380" y="118" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily="system-ui">
          Migrations: store procedures in version control — drift between environments breaks apps silently.
        </text>
        <rect x="40" y="132" width="680" height="72" rx="11" fill="#f8fafc" stroke="#cbd5e1" />
        <text x="380" y="158" textAnchor="middle" fontSize="7" fontWeight="700" fill="#334155" fontFamily="system-ui">
          SQL injection: dynamic SQL inside procedures must still use parameters — never concat user input.
        </text>
        <text x="380" y="184" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily="system-ui">
          Testing: exercise procedures with the same roles the app uses — DEFINER vs INVOKER security model matters.
        </text>
      </svg>
    </figure>
  );
}

/** Trigger chain */
export function MySQLTriggerBeforeAfterScenarioDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-mysql-scenario" role="img" aria-label="Trigger execution">
      <FlowchartFigcaption
        title="Real scenario: BEFORE and AFTER triggers"
        fresher="On INSERT/UPDATE/DELETE, MySQL runs matching triggers in order. BEFORE triggers can modify NEW row values; AFTER triggers often audit or fan out side work. Triggers share the same transaction as the statement — an error rolls everything back."
      />
      <svg viewBox="0 0 760 220" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <MySQLDefs prefix={p} />
        <rect x="32" y="44" width="120" height="48" rx="10" fill="#fff7ed" stroke="#ea580c" strokeWidth="1.3" />
        <text x="92" y="72" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#9a3412" fontFamily="system-ui">
          DML stmt
        </text>
        <line x1="152" y1="68" x2="196" y2="68" stroke="#00758F" strokeWidth="2" markerEnd={`url(#${p}-mysql-arrow)`} />
        <rect x="200" y="40" width="140" height="56" rx="10" fill="#fce7f3" stroke="#db2777" strokeWidth="1.2" />
        <text x="270" y="64" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#9d174d" fontFamily="system-ui">
          BEFORE
        </text>
        <text x="270" y="82" textAnchor="middle" fontSize="6.5" fill="#be185d" fontFamily="system-ui">
          validate / NEW
        </text>
        <line x1="340" y1="68" x2="384" y2="68" stroke="#00758F" strokeWidth="2" markerEnd={`url(#${p}-mysql-arrow)`} />
        <rect x="388" y="44" width="160" height="48" rx="10" fill={`url(#${p}-mysql-node)`} stroke="#00758F" strokeWidth="1.4" />
        <text x="468" y="72" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#134e4a" fontFamily="system-ui">
          Row change
        </text>
        <line x1="548" y1="68" x2="592" y2="68" stroke="#00758F" strokeWidth="2" markerEnd={`url(#${p}-mysql-arrow)`} />
        <rect x="596" y="40" width="132" height="56" rx="10" fill={`url(#${p}-mysql-deep)`} stroke="#0e7490" strokeWidth="1.2" />
        <text x="662" y="64" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#ecfeff" fontFamily="system-ui">
          AFTER
        </text>
        <text x="662" y="82" textAnchor="middle" fontSize="6.5" fill="#a5f3fc" fontFamily="system-ui">
          audit / log
        </text>
        <text x="380" y="118" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily="system-ui">
          Cascading triggers and FK checks: ordering can surprise you — keep trigger bodies small and deterministic.
        </text>
        <rect x="40" y="132" width="680" height="72" rx="11" fill="#f8fafc" stroke="#cbd5e1" />
        <text x="380" y="158" textAnchor="middle" fontSize="7" fontWeight="700" fill="#334155" fontFamily="system-ui">
          Hidden side effects hurt observability — prefer explicit app-level workflows for complex rules when possible.
        </text>
        <text x="380" y="184" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily="system-ui">
          SHOW TRIGGERS; and information_schema.TRIGGERS for inventory during audits.
        </text>
      </svg>
    </figure>
  );
}

/** Correlated subquery */
export function MySQLCorrelatedSubqueryScenarioDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-mysql-scenario" role="img" aria-label="Correlated subquery">
      <FlowchartFigcaption
        title="Real scenario: correlated vs independent subqueries"
        fresher="A correlated subquery references columns from an outer query, so it can run once per outer row — O(n²) danger. The optimizer may decorrelate into joins (semijoin), but bad plans still happen. Independent subqueries run once and cache results."
      />
      <svg viewBox="0 0 760 224" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <MySQLDefs prefix={p} />
        <rect x="36" y="44" width="160" height="52" rx="10" fill={`url(#${p}-mysql-node)`} stroke="#00758F" strokeWidth="1.4" />
        <text x="116" y="68" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#134e4a" fontFamily="system-ui">
          Outer rows
        </text>
        <text x="116" y="84" textAnchor="middle" fontSize="6.5" fill="#0f766e" fontFamily="ui-monospace">
          e.g. customers
        </text>
        <line x1="196" y1="70" x2="240" y2="70" stroke="#00758F" strokeWidth="2" markerEnd={`url(#${p}-mysql-arrow)`} />
        <rect x="244" y="40" width="200" height="60" rx="10" fill="#fef3c7" stroke="#d97706" strokeWidth="1.3" />
        <text x="344" y="64" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#92400e" fontFamily="system-ui">
          Inner query uses outer.col
        </text>
        <text x="344" y="82" textAnchor="middle" fontSize="6.5" fill="#b45309" fontFamily="system-ui">
          per outer row (correlated)
        </text>
        <line x1="444" y1="70" x2="488" y2="70" stroke="#00758F" strokeWidth="2" markerEnd={`url(#${p}-mysql-arrow)`} />
        <rect x="492" y="44" width="232" height="52" rx="10" fill={`url(#${p}-mysql-deep)`} stroke="#0e7490" strokeWidth="1.2" />
        <text x="608" y="74" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#ecfeff" fontFamily="system-ui">
          EXISTS / scalar result
        </text>
        <text x="380" y="124" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily="system-ui">
          Rewrite candidate: JOIN + GROUP BY or lateral-style patterns when the optimizer does not decorrelate well.
        </text>
        <rect x="40" y="140" width="680" height="68" rx="11" fill="#f8fafc" stroke="#cbd5e1" />
        <text x="380" y="166" textAnchor="middle" fontSize="7" fontWeight="700" fill="#334155" fontFamily="system-ui">
          IN (subquery) with large lists: temp table materialization — compare timing with JOIN form.
        </text>
        <text x="380" y="190" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily="system-ui">
          Derived tables (FROM (SELECT…) t) — give them names; optimizer can merge or materialize.
        </text>
      </svg>
    </figure>
  );
}

/** AuthZ after AuthN */
export function MySQLPrivilegeGrantCheckScenarioDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-mysql-scenario" role="img" aria-label="Privilege check">
      <FlowchartFigcaption
        title="Real scenario: connection, authentication, authorization"
        fresher="First the server verifies credentials (plugin, password, SSL). Then every statement is checked against grants for user@host, including roles (8.0). Dynamic privileges and partial revokes (8.0) add nuance — least privilege keeps blast radius small."
      />
      <svg viewBox="0 0 760 216" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <MySQLDefs prefix={p} />
        <rect x="32" y="44" width="120" height="48" rx="10" fill="#fff7ed" stroke="#ea580c" strokeWidth="1.3" />
        <text x="92" y="72" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#9a3412" fontFamily="system-ui">
          Connect
        </text>
        <line x1="152" y1="68" x2="196" y2="68" stroke="#00758F" strokeWidth="2" markerEnd={`url(#${p}-mysql-arrow)`} />
        <rect x="200" y="40" width="160" height="56" rx="10" fill={`url(#${p}-mysql-node)`} stroke="#00758F" strokeWidth="1.4" />
        <text x="280" y="64" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#134e4a" fontFamily="system-ui">
          Authentication
        </text>
        <text x="280" y="82" textAnchor="middle" fontSize="6.5" fill="#0f766e" fontFamily="system-ui">
          caching_sha2 …
        </text>
        <line x1="360" y1="68" x2="404" y2="68" stroke="#00758F" strokeWidth="2" markerEnd={`url(#${p}-mysql-arrow)`} />
        <rect x="408" y="44" width="180" height="48" rx="10" fill="#fef3c7" stroke="#d97706" strokeWidth="1.3" />
        <text x="498" y="72" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#92400e" fontFamily="system-ui">
          mysql.* grants
        </text>
        <line x1="588" y1="68" x2="632" y2="68" stroke="#00758F" strokeWidth="2" markerEnd={`url(#${p}-mysql-arrow)`} />
        <rect x="636" y="44" width="92" height="48" rx="10" fill={`url(#${p}-mysql-deep)`} stroke="#0e7490" strokeWidth="1.2" />
        <text x="682" y="72" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#ecfeff" fontFamily="system-ui">
          Allow
        </text>
        <text x="380" y="118" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily="system-ui">
          user@&apos;%&apos; vs exact host — DNS and proxy layers can change effective host; use concrete subnets in prod.
        </text>
        <rect x="40" y="132" width="680" height="68" rx="11" fill="#f8fafc" stroke="#cbd5e1" />
        <text x="380" y="158" textAnchor="middle" fontSize="7" fontWeight="700" fill="#334155" fontFamily="system-ui">
          GRANT … WITH GRANT OPTION: transitive power — audit who can delegate privileges.
        </text>
        <text x="380" y="182" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily="system-ui">
          FLUSH PRIVILEGES reloads grant tables — needed rarely on modern versions after direct table edits (avoid those).
        </text>
      </svg>
    </figure>
  );
}

/** pom / deps → connector JAR */
export function JdbcProjectClasspathScenarioDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-jdbc-scenario" role="img" aria-label="JDBC project classpath">
      <FlowchartFigcaption
        title="Real scenario: JDBC driver on the classpath"
        fresher="Maven or Gradle declares mysql-connector-j (or your vendor driver). The build tool downloads the JAR into the local repo; at runtime the JVM loads the Driver class from that JAR. Without the driver on the classpath, DriverManager.getConnection throws “No suitable driver”."
      />
      <svg viewBox="0 0 760 216" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <JdbcDefs prefix={p} />
        <rect x="24" y="40" width="140" height="48" rx="10" fill="#fff7ed" stroke="#ea580c" strokeWidth="1.3" />
        <text x="94" y="68" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#9a3412" fontFamily="system-ui">
          pom.xml / Gradle
        </text>
        <line x1="164" y1="64" x2="208" y2="64" stroke="#4479A1" strokeWidth="2" markerEnd={`url(#${p}-jdbc-arrow)`} />
        <rect x="212" y="36" width="180" height="56" rx="10" fill={`url(#${p}-jdbc-node)`} stroke="#4479A1" strokeWidth="1.4" />
        <text x="302" y="60" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#1e3a5f" fontFamily="system-ui">
          Dependency
        </text>
        <text x="302" y="78" textAnchor="middle" fontSize="6.5" fill="#2c5282" fontFamily="ui-monospace">
          mysql-connector-j
        </text>
        <line x1="392" y1="64" x2="436" y2="64" stroke="#4479A1" strokeWidth="2" markerEnd={`url(#${p}-jdbc-arrow)`} />
        <rect x="440" y="40" width="148" height="48" rx="10" fill="#fef3c7" stroke="#d97706" strokeWidth="1.3" />
        <text x="514" y="68" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#92400e" fontFamily="system-ui">
          Classpath
        </text>
        <line x1="588" y1="64" x2="632" y2="64" stroke="#4479A1" strokeWidth="2" markerEnd={`url(#${p}-jdbc-arrow)`} />
        <rect x="636" y="40" width="100" height="48" rx="10" fill={`url(#${p}-jdbc-deep)`} stroke="#2c5282" strokeWidth="1.2" />
        <text x="686" y="68" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#eff6ff" fontFamily="system-ui">
          Driver
        </text>
        <text x="380" y="118" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily="system-ui">
          Fat JAR / Spring Boot: driver is bundled; plain Java app: java -cp ... must include connector JAR.
        </text>
        <rect x="40" y="132" width="680" height="68" rx="11" fill="#f8fafc" stroke="#cbd5e1" />
        <text x="380" y="158" textAnchor="middle" fontSize="7" fontWeight="700" fill="#334155" fontFamily="system-ui">
          Version pin: match driver major to server major when possible — avoid silent protocol mismatches.
        </text>
        <text x="380" y="182" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily="system-ui">
          Module path (JPMS): requires requires java.sql; and opens for reflective drivers if your stack needs it.
        </text>
      </svg>
    </figure>
  );
}

/** JDBC API stack */
export function JdbcArchitectureLayersScenarioDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-jdbc-scenario" role="img" aria-label="JDBC architecture">
      <FlowchartFigcaption
        title="Real scenario: where JDBC sits in your app"
        fresher="Application code uses Java interfaces in java.sql (Connection, Statement, ResultSet). The JDBC driver implements those interfaces and speaks the database wire protocol. Your code never talks to sockets directly — the driver does, so swapping databases means swapping drivers and sometimes SQL dialects."
      />
      <svg viewBox="0 0 760 220" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <JdbcDefs prefix={p} />
        <rect x="40" y="44" width="160" height="48" rx="10" fill="#fff7ed" stroke="#ea580c" strokeWidth="1.3" />
        <text x="120" y="72" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#9a3412" fontFamily="system-ui">
          Your code
        </text>
        <line x1="200" y1="68" x2="244" y2="68" stroke="#4479A1" strokeWidth="2" markerEnd={`url(#${p}-jdbc-arrow)`} />
        <rect x="248" y="40" width="180" height="56" rx="10" fill={`url(#${p}-jdbc-node)`} stroke="#4479A1" strokeWidth="1.4" />
        <text x="338" y="64" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#1e3a5f" fontFamily="system-ui">
          JDBC API (java.sql)
        </text>
        <text x="338" y="82" textAnchor="middle" fontSize="6.5" fill="#2c5282" fontFamily="ui-monospace">
          Connection · Statement
        </text>
        <line x1="428" y1="68" x2="472" y2="68" stroke="#4479A1" strokeWidth="2" markerEnd={`url(#${p}-jdbc-arrow)`} />
        <rect x="476" y="44" width="132" height="48" rx="10" fill="#fef3c7" stroke="#d97706" strokeWidth="1.3" />
        <text x="542" y="72" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#92400e" fontFamily="system-ui">
          Driver
        </text>
        <line x1="608" y1="68" x2="652" y2="68" stroke="#4479A1" strokeWidth="2" markerEnd={`url(#${p}-jdbc-arrow)`} />
        <rect x="656" y="44" width="72" height="48" rx="10" fill={`url(#${p}-jdbc-deep)`} stroke="#2c5282" strokeWidth="1.2" />
        <text x="692" y="72" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#eff6ff" fontFamily="system-ui">
          DB
        </text>
        <text x="380" y="120" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily="system-ui">
          javax.sql.DataSource (connection pools): still JDBC underneath — HikariCP wraps DriverManager or DataSource.
        </text>
        <rect x="40" y="136" width="680" height="68" rx="11" fill="#f8fafc" stroke="#cbd5e1" />
        <text x="380" y="162" textAnchor="middle" fontSize="7" fontWeight="700" fill="#334155" fontFamily="system-ui">
          Try-with-resources: Connection / Statement / ResultSet close in reverse order — prevents connection leaks.
        </text>
        <text x="380" y="186" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily="system-ui">
          SQLException chain: use getNextException() to log full failure traces in production.
        </text>
      </svg>
    </figure>
  );
}

/** Loading driver */
export function JdbcDriverLoaderScenarioDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-jdbc-scenario" role="img" aria-label="JDBC driver loading">
      <FlowchartFigcaption
        title="Real scenario: making the driver discoverable"
        fresher="DriverManager loads drivers from the classpath. JDBC 4+ drivers register via META-INF/services — Class.forName is often optional. Older tutorials still call Class.forName for explicit registration. getConnection(url) picks a driver that accepts the JDBC URL prefix (jdbc:mysql:, jdbc:postgresql:, …)."
      />
      <svg viewBox="0 0 760 228" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <JdbcDefs prefix={p} />
        <rect x="32" y="44" width="140" height="48" rx="10" fill={`url(#${p}-jdbc-node)`} stroke="#4479A1" strokeWidth="1.4" />
        <text x="102" y="72" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#1e3a5f" fontFamily="system-ui">
          Classpath
        </text>
        <line x1="172" y1="68" x2="216" y2="68" stroke="#4479A1" strokeWidth="2" markerEnd={`url(#${p}-jdbc-arrow)`} />
        <rect x="220" y="40" width="200" height="56" rx="10" fill="#fef3c7" stroke="#d97706" strokeWidth="1.3" />
        <text x="320" y="64" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#92400e" fontFamily="system-ui">
          ServiceLoader / static init
        </text>
        <text x="320" y="82" textAnchor="middle" fontSize="6.5" fill="#b45309" fontFamily="system-ui">
          registers Driver
        </text>
        <line x1="420" y1="68" x2="464" y2="68" stroke="#4479A1" strokeWidth="2" markerEnd={`url(#${p}-jdbc-arrow)`} />
        <rect x="468" y="44" width="160" height="48" rx="10" fill={`url(#${p}-jdbc-deep)`} stroke="#2c5282" strokeWidth="1.2" />
        <text x="548" y="72" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#eff6ff" fontFamily="system-ui">
          DriverManager
        </text>
        <line x1="628" y1="68" x2="672" y2="68" stroke="#4479A1" strokeWidth="2" markerEnd={`url(#${p}-jdbc-arrow)`} />
        <rect x="676" y="44" width="52" height="48" rx="8" fill="#ecfdf5" stroke="#059669" strokeWidth="1.2" />
        <text x="702" y="72" textAnchor="middle" fontSize="7" fontWeight="800" fill="#065f46" fontFamily="system-ui">
          ✓
        </text>
        <text x="380" y="118" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily="system-ui">
          Multiple drivers: first matching acceptsURL wins — keep one driver per app classloader unless you know isolation.
        </text>
        <rect x="40" y="132" width="680" height="76" rx="11" fill="#f8fafc" stroke="#cbd5e1" />
        <text x="380" y="158" textAnchor="middle" fontSize="7" fontWeight="700" fill="#334155" fontFamily="system-ui">
          Driver property: serverTimezone, SSL, etc. — pass via URL query or Properties to getConnection.
        </text>
        <text x="380" y="182" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily="system-ui">
          “Communications link failure” → network, firewall, or wrong host/port — before SQL errors.
        </text>
      </svg>
    </figure>
  );
}

/** getConnection → physical session */
export function JdbcConnectionObtainScenarioDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-jdbc-scenario" role="img" aria-label="JDBC getConnection">
      <FlowchartFigcaption
        title="Real scenario: opening a JDBC connection"
        fresher="DriverManager.getConnection(url, user, password) or Properties negotiates a TCP session to the database, authenticates, and returns a Connection object. That object is a handle to a server-side session — pool size and server max_connections must align. Always close or return connections to the pool in finally or try-with-resources."
      />
      <svg viewBox="0 0 760 224" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <JdbcDefs prefix={p} />
        <rect x="28" y="44" width="200" height="48" rx="10" fill="#fff7ed" stroke="#ea580c" strokeWidth="1.3" />
        <text x="128" y="72" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#9a3412" fontFamily="ui-monospace">
          jdbc:mysql://host:3306/db
        </text>
        <line x1="228" y1="68" x2="272" y2="68" stroke="#4479A1" strokeWidth="2" markerEnd={`url(#${p}-jdbc-arrow)`} />
        <rect x="276" y="40" width="160" height="56" rx="10" fill={`url(#${p}-jdbc-node)`} stroke="#4479A1" strokeWidth="1.4" />
        <text x="356" y="64" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#1e3a5f" fontFamily="system-ui">
          Driver connects
        </text>
        <text x="356" y="82" textAnchor="middle" fontSize="6.5" fill="#2c5282" fontFamily="system-ui">
          TCP + auth
        </text>
        <line x1="436" y1="68" x2="480" y2="68" stroke="#4479A1" strokeWidth="2" markerEnd={`url(#${p}-jdbc-arrow)`} />
        <rect x="484" y="40" width="248" height="56" rx="10" fill={`url(#${p}-jdbc-deep)`} stroke="#2c5282" strokeWidth="1.2" />
        <text x="608" y="64" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#eff6ff" fontFamily="system-ui">
          Connection (session)
        </text>
        <text x="608" y="82" textAnchor="middle" fontSize="6.5" fill="#bfdbfe" fontFamily="system-ui">
          JDBC handle to DB
        </text>
        <text x="380" y="118" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily="system-ui">
          Connection is not thread-safe — one connection per thread or use a pool that hands out per-thread leases.
        </text>
        <rect x="40" y="132" width="680" height="76" rx="11" fill="#f8fafc" stroke="#cbd5e1" />
        <text x="380" y="158" textAnchor="middle" fontSize="7" fontWeight="700" fill="#334155" fontFamily="system-ui">
          SSL: use URL + truststore for encrypted links in cloud; never ship passwords in source — env vars or vault.
        </text>
        <text x="380" y="182" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily="system-ui">
          validateConnectionOnBorrow in pools catches stale TCP before your query fails mid-request.
        </text>
      </svg>
    </figure>
  );
}

/** Statement execute */
export function JdbcStatementExecuteScenarioDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-jdbc-scenario" role="img" aria-label="Statement execute">
      <FlowchartFigcaption
        title="Real scenario: Statement and executeQuery"
        fresher="Connection.createStatement() returns a Statement used for static SQL strings. executeQuery runs SELECT and returns a ResultSet; executeUpdate runs INSERT/UPDATE/DELETE and returns row counts. Concatenating user input into SQL here is dangerous — use PreparedStatement for parameters."
      />
      <svg viewBox="0 0 760 216" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <JdbcDefs prefix={p} />
        <rect x="36" y="44" width="120" height="48" rx="10" fill={`url(#${p}-jdbc-deep)`} stroke="#2c5282" strokeWidth="1.2" />
        <text x="96" y="72" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#eff6ff" fontFamily="system-ui">
          Connection
        </text>
        <line x1="156" y1="68" x2="200" y2="68" stroke="#4479A1" strokeWidth="2" markerEnd={`url(#${p}-jdbc-arrow)`} />
        <rect x="204" y="44" width="140" height="48" rx="10" fill={`url(#${p}-jdbc-node)`} stroke="#4479A1" strokeWidth="1.4" />
        <text x="274" y="72" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#1e3a5f" fontFamily="system-ui">
          createStatement
        </text>
        <line x1="344" y1="68" x2="388" y2="68" stroke="#4479A1" strokeWidth="2" markerEnd={`url(#${p}-jdbc-arrow)`} />
        <rect x="392" y="44" width="160" height="48" rx="10" fill="#fef3c7" stroke="#d97706" strokeWidth="1.3" />
        <text x="472" y="72" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#92400e" fontFamily="system-ui">
          executeQuery / Update
        </text>
        <line x1="552" y1="68" x2="596" y2="68" stroke="#4479A1" strokeWidth="2" markerEnd={`url(#${p}-jdbc-arrow)`} />
        <rect x="600" y="44" width="124" height="48" rx="10" fill="#ecfdf5" stroke="#059669" strokeWidth="1.2" />
        <text x="662" y="72" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#065f46" fontFamily="system-ui">
          ResultSet / int
        </text>
        <text x="380" y="118" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily="system-ui">
          Statement per request or reuse carefully — prefer PreparedStatement for anything repeated.
        </text>
        <rect x="40" y="132" width="680" height="68" rx="11" fill="#f8fafc" stroke="#cbd5e1" />
        <text x="380" y="158" textAnchor="middle" fontSize="7" fontWeight="700" fill="#334155" fontFamily="system-ui">
          executeQuery with DDL: driver-dependent — use execute() for mixed or unknown SQL in tools.
        </text>
        <text x="380" y="182" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily="system-ui">
          Large ResultSet: fetch size / streaming — avoid loading millions of rows into heap at once.
        </text>
      </svg>
    </figure>
  );
}

/** PreparedStatement */
export function JdbcPreparedStatementBindScenarioDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-jdbc-scenario" role="img" aria-label="PreparedStatement bind">
      <FlowchartFigcaption
        title="Real scenario: parameters and prepared statements"
        fresher="prepareStatement(sql) sends the SQL template to the server once; placeholders ? are bound with setString, setInt, etc. The driver escapes types safely — this is the primary defense against SQL injection. Same PreparedStatement can be reused in a loop with new binds."
      />
      <svg viewBox="0 0 760 228" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <JdbcDefs prefix={p} />
        <rect x="32" y="44" width="160" height="48" rx="10" fill="#fff7ed" stroke="#ea580c" strokeWidth="1.3" />
        <text x="112" y="72" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#9a3412" fontFamily="ui-monospace">
          INSERT … VALUES (?)
        </text>
        <line x1="192" y1="68" x2="236" y2="68" stroke="#4479A1" strokeWidth="2" markerEnd={`url(#${p}-jdbc-arrow)`} />
        <rect x="240" y="40" width="200" height="56" rx="10" fill={`url(#${p}-jdbc-node)`} stroke="#4479A1" strokeWidth="1.4" />
        <text x="340" y="64" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#1e3a5f" fontFamily="system-ui">
          setString(1, …)
        </text>
        <text x="340" y="82" textAnchor="middle" fontSize="6.5" fill="#2c5282" fontFamily="system-ui">
          bind types
        </text>
        <line x1="440" y1="68" x2="484" y2="68" stroke="#4479A1" strokeWidth="2" markerEnd={`url(#${p}-jdbc-arrow)`} />
        <rect x="488" y="44" width="140" height="48" rx="10" fill="#fef3c7" stroke="#d97706" strokeWidth="1.3" />
        <text x="558" y="72" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#92400e" fontFamily="system-ui">
          executeUpdate
        </text>
        <line x1="628" y1="68" x2="672" y2="68" stroke="#4479A1" strokeWidth="2" markerEnd={`url(#${p}-jdbc-arrow)`} />
        <rect x="676" y="44" width="52" height="48" rx="8" fill={`url(#${p}-jdbc-deep)`} stroke="#2c5282" strokeWidth="1.2" />
        <text x="702" y="72" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#eff6ff" fontFamily="system-ui">
          OK
        </text>
        <text x="380" y="118" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily="system-ui">
          clearParameters() between loop iterations — leftover binds cause subtle bugs.
        </text>
        <rect x="40" y="132" width="680" height="76" rx="11" fill="#f8fafc" stroke="#cbd5e1" />
        <text x="380" y="158" textAnchor="middle" fontSize="7" fontWeight="700" fill="#334155" fontFamily="system-ui">
          Batch: addBatch / executeBatch for bulk inserts — reduces round-trips.
        </text>
        <text x="380" y="182" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily="system-ui">
          setNull for nullable columns; setObject for generic mapping — watch JDBC type mapping to SQL types.
        </text>
      </svg>
    </figure>
  );
}

/** ResultSet navigation */
export function JdbcResultSetCursorScenarioDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-jdbc-scenario" role="img" aria-label="ResultSet cursor">
      <FlowchartFigcaption
        title="Real scenario: reading rows from ResultSet"
        fresher="ResultSet is a cursor over server rows (or buffered client-side depending on fetch size). next() advances; getInt/getString read by column index or label. Column labels are case-sensitive rules depend on database — prefer explicit labels. One ResultSet per Statement at a time unless supported otherwise."
      />
      <svg viewBox="0 0 760 216" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <JdbcDefs prefix={p} />
        <rect x="40" y="44" width="140" height="48" rx="10" fill="#fef3c7" stroke="#d97706" strokeWidth="1.3" />
        <text x="110" y="72" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#92400e" fontFamily="system-ui">
          ResultSet
        </text>
        <line x1="180" y1="68" x2="224" y2="68" stroke="#4479A1" strokeWidth="2" markerEnd={`url(#${p}-jdbc-arrow)`} />
        <rect x="228" y="44" width="120" height="48" rx="10" fill={`url(#${p}-jdbc-node)`} stroke="#4479A1" strokeWidth="1.4" />
        <text x="288" y="72" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#1e3a5f" fontFamily="system-ui">
          next()
        </text>
        <line x1="348" y1="68" x2="392" y2="68" stroke="#4479A1" strokeWidth="2" markerEnd={`url(#${p}-jdbc-arrow)`} />
        <rect x="396" y="44" width="200" height="48" rx="10" fill={`url(#${p}-jdbc-deep)`} stroke="#2c5282" strokeWidth="1.2" />
        <text x="496" y="72" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#eff6ff" fontFamily="system-ui">
          getXxx(column)
        </text>
        <line x1="596" y1="68" x2="640" y2="68" stroke="#4479A1" strokeWidth="2" markerEnd={`url(#${p}-jdbc-arrow)`} />
        <rect x="644" y="44" width="76" height="48" rx="10" fill="#ecfdf5" stroke="#059669" strokeWidth="1.2" />
        <text x="682" y="72" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#065f46" fontFamily="system-ui">
          DTO
        </text>
        <text x="380" y="118" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily="system-ui">
          wasNull() after getInt — distinguish 0 from NULL when using primitives carefully.
        </text>
        <rect x="40" y="132" width="680" height="68" rx="11" fill="#f8fafc" stroke="#cbd5e1" />
        <text x="380" y="158" textAnchor="middle" fontSize="7" fontWeight="700" fill="#334155" fontFamily="system-ui">
          TYPE_FORWARD_ONLY vs scrollable: default is forward-only — don’t call previous() unless you request scrollable.
        </text>
        <text x="380" y="182" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily="system-ui">
          Close ResultSet before reusing Statement for another query — driver-specific errors if not.
        </text>
      </svg>
    </figure>
  );
}

/** CRUD via JDBC */
export function JdbcCrudOperationsScenarioDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-jdbc-scenario" role="img" aria-label="JDBC CRUD">
      <FlowchartFigcaption
        title="Real scenario: mapping CRUD to JDBC calls"
        fresher="CREATE/READ/UPDATE/DELETE in JDBC are still SQL strings (or generated SQL). INSERT/UPDATE/DELETE use executeUpdate; SELECT uses executeQuery. Generated keys: prepareStatement(sql, RETURN_GENERATED_KEYS) then getGeneratedKeys() for auto-increment IDs. Transactions wrap multiple DMLs for atomicity."
      />
      <svg viewBox="0 0 760 232" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <JdbcDefs prefix={p} />
        <rect x="24" y="40" width="108" height="44" rx="9" fill="#ecfdf5" stroke="#059669" strokeWidth="1.2" />
        <text x="78" y="66" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#065f46" fontFamily="ui-monospace">
          INSERT
        </text>
        <rect x="148" y="40" width="108" height="44" rx="9" fill={`url(#${p}-jdbc-node)`} stroke="#4479A1" strokeWidth="1.4" />
        <text x="202" y="66" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#1e3a5f" fontFamily="ui-monospace">
          SELECT
        </text>
        <rect x="272" y="40" width="108" height="44" rx="9" fill="#fef3c7" stroke="#d97706" strokeWidth="1.3" />
        <text x="326" y="66" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#92400e" fontFamily="ui-monospace">
          UPDATE
        </text>
        <rect x="396" y="40" width="108" height="44" rx="9" fill="#fff7ed" stroke="#ea580c" strokeWidth="1.3" />
        <text x="450" y="66" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#9a3412" fontFamily="ui-monospace">
          DELETE
        </text>
        <text x="580" y="66" textAnchor="middle" fontSize="8" fontWeight="800" fill="#2c5282" fontFamily="system-ui">
          → PreparedStatement
        </text>
        <line x1="380" y1="100" x2="380" y2="120" stroke="#4479A1" strokeWidth="2" markerEnd={`url(#${p}-jdbc-arrow)`} />
        <rect x="200" y="124" width="360" height="52" rx="11" fill="#f8fafc" stroke="#cbd5e1" />
        <text x="380" y="148" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#334155" fontFamily="system-ui">
          executeUpdate (rows) · executeQuery (ResultSet) · getGeneratedKeys()
        </text>
        <text x="380" y="168" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily="system-ui">
          ORM (JPA) maps entities to these same primitives — understand JDBC to debug generated SQL.
        </text>
        <text x="380" y="198" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily="system-ui">
          Soft delete: WHERE active = 1 — still a JDBC UPDATE, not a DELETE.
        </text>
      </svg>
    </figure>
  );
}

/** Transaction boundaries */
export function JdbcTransactionBoundaryScenarioDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-jdbc-scenario" role="img" aria-label="JDBC transaction">
      <FlowchartFigcaption
        title="Real scenario: JDBC transaction boundaries"
        fresher="setAutoCommit(false) starts explicit transaction boundaries. Multiple DML statements share one database transaction until commit() or rollback(). setAutoCommit(true) restores autocommit after commit. Pooling: return connection to pool only after commit/rollback — never leak open transactions."
      />
      <svg viewBox="0 0 760 224" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <JdbcDefs prefix={p} />
        <rect x="28" y="44" width="120" height="48" rx="10" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.2" />
        <text x="88" y="72" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#0c4a6e" fontFamily="ui-monospace">
          setAutoCommit(false)
        </text>
        <line x1="148" y1="68" x2="192" y2="68" stroke="#4479A1" strokeWidth="2" markerEnd={`url(#${p}-jdbc-arrow)`} />
        <rect x="196" y="40" width="160" height="56" rx="10" fill={`url(#${p}-jdbc-node)`} stroke="#4479A1" strokeWidth="1.4" />
        <text x="276" y="64" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#1e3a5f" fontFamily="system-ui">
          DML + DML
        </text>
        <text x="276" y="82" textAnchor="middle" fontSize="6.5" fill="#2c5282" fontFamily="system-ui">
          same tx
        </text>
        <line x1="356" y1="68" x2="400" y2="68" stroke="#4479A1" strokeWidth="2" markerEnd={`url(#${p}-jdbc-arrow)`} />
        <rect x="404" y="44" width="100" height="48" rx="10" fill="#ecfdf5" stroke="#059669" strokeWidth="1.2" />
        <text x="454" y="72" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#065f46" fontFamily="ui-monospace">
          commit()
        </text>
        <line x1="504" y1="68" x2="548" y2="68" stroke="#4479A1" strokeWidth="2" markerEnd={`url(#${p}-jdbc-arrow)`} />
        <rect x="552" y="44" width="100" height="48" rx="10" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.2" />
        <text x="602" y="72" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#991b1b" fontFamily="ui-monospace">
          rollback()
        </text>
        <line x1="652" y1="68" x2="696" y2="68" stroke="#4479A1" strokeWidth="2" markerEnd={`url(#${p}-jdbc-arrow)`} />
        <rect x="700" y="44" width="40" height="48" rx="8" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.2" />
        <text x="720" y="74" textAnchor="middle" fontSize="7" fontWeight="800" fill="#334155" fontFamily="system-ui">
          idle
        </text>
        <text x="380" y="118" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily="system-ui">
          Savepoints: setSavepoint / rollback(savepoint) — partial rollback in long transactions.
        </text>
        <rect x="40" y="132" width="680" height="76" rx="11" fill="#f8fafc" stroke="#cbd5e1" />
        <text x="380" y="158" textAnchor="middle" fontSize="7" fontWeight="700" fill="#334155" fontFamily="system-ui">
          Isolation: setTransactionIsolation — READ COMMITTED vs REPEATABLE READ matches DB defaults.
        </text>
        <text x="380" y="182" textAnchor="middle" fontSize="6.5" fill="#64748b" fontFamily="system-ui">
          Connection pool + tx: borrow → work → commit → pool returns connection to idle state.
        </text>
      </svg>
    </figure>
  );
}

/** Process vs threads in one process */
export function ThreadVsProcessDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-thread" role="img" aria-label="Process versus thread">
      <FlowchartFigcaption
        title="Process vs thread — memory and cost"
        fresher="A process has its own memory space. Threads are lightweight paths inside one process that share heap and resources. This sharing makes threads fast, but you must synchronize shared mutable data."
      />
      <svg viewBox="0 0 700 220" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="32" y="36" width="290" height="150" rx="12" fill="#eef2ff" stroke="#6366f1" />
        <text x="177" y="58" textAnchor="middle" fontSize="10" fontWeight="800" fill="#312e81" fontFamily="system-ui">
          Process (heavyweight)
        </text>
        <rect x="56" y="74" width="242" height="86" rx="10" fill="#e0e7ff" stroke="#818cf8" />
        <text x="177" y="98" textAnchor="middle" fontSize="8" fill="#3730a3" fontFamily="system-ui">
          own heap + native resources
        </text>
        <text x="177" y="120" textAnchor="middle" fontSize="7.5" fill="#4b5563" fontFamily="ui-monospace">
          context switch cost: higher
        </text>

        <rect x="378" y="36" width="290" height="150" rx="12" fill="#ecfeff" stroke="#06b6d4" />
        <text x="523" y="58" textAnchor="middle" fontSize="10" fontWeight="800" fill="#155e75" fontFamily="system-ui">
          Threads (lightweight)
        </text>
        <rect x="398" y="74" width="250" height="26" rx="6" fill="#cffafe" stroke="#22d3ee" />
        <text x="523" y="91" textAnchor="middle" fontSize="8" fill="#0f766e" fontFamily="system-ui">
          shared heap / shared objects
        </text>
        <rect x="408" y="110" width="68" height="48" rx="6" fill="#e0f2fe" stroke="#38bdf8" />
        <rect x="489" y="110" width="68" height="48" rx="6" fill="#e0f2fe" stroke="#38bdf8" />
        <rect x="570" y="110" width="68" height="48" rx="6" fill="#e0f2fe" stroke="#38bdf8" />
        <text x="442" y="138" textAnchor="middle" fontSize="8" fill="#0c4a6e" fontFamily="ui-monospace">T1</text>
        <text x="523" y="138" textAnchor="middle" fontSize="8" fill="#0c4a6e" fontFamily="ui-monospace">T2</text>
        <text x="604" y="138" textAnchor="middle" fontSize="8" fill="#0c4a6e" fontFamily="ui-monospace">T3</text>

        <text x="350" y="208" textAnchor="middle" fontSize="7.5" fill="#64748b" fontFamily="system-ui">
          Multi-threading improves responsiveness and throughput when tasks can overlap.
        </text>
      </svg>
    </figure>
  );
}

/** Creating threads: Thread subclass vs Runnable task */
export function ThreadCreationWaysDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro" role="img" aria-label="Thread creation methods">
      <FlowchartFigcaption
        title="Two classic ways to create a thread"
        fresher="Extend Thread for quick demos. Prefer Runnable in real code because your task stays separate from thread mechanics and can be reused by executors."
      />
      <svg viewBox="0 0 640 210" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="32" y="32" width="270" height="132" rx="12" fill="#fef3c7" stroke="#f59e0b" />
        <text x="167" y="56" textAnchor="middle" fontSize="10" fontWeight="800" fill="#92400e" fontFamily="ui-monospace">
          extends Thread
        </text>
        <text x="167" y="82" textAnchor="middle" fontSize="8" fill="#57534e" fontFamily="system-ui">
          class MyThread extends Thread
        </text>
        <text x="167" y="100" textAnchor="middle" fontSize="7.5" fill="#64748b" fontFamily="system-ui">
          override run(); call start()
        </text>
        <text x="167" y="122" textAnchor="middle" fontSize="7" fill="#a16207" fontFamily="system-ui">
          cannot extend another class
        </text>

        <rect x="338" y="32" width="270" height="132" rx="12" fill="#dcfce7" stroke="#22c55e" />
        <text x="473" y="56" textAnchor="middle" fontSize="10" fontWeight="800" fill="#166534" fontFamily="ui-monospace">
          implements Runnable
        </text>
        <text x="473" y="82" textAnchor="middle" fontSize="8" fill="#334155" fontFamily="system-ui">
          class Task implements Runnable
        </text>
        <text x="473" y="100" textAnchor="middle" fontSize="7.5" fill="#64748b" fontFamily="system-ui">
          new Thread(task).start()
        </text>
        <text x="473" y="122" textAnchor="middle" fontSize="7" fill="#166534" fontFamily="system-ui">
          preferred with ExecutorService
        </text>

        <text x="320" y="190" textAnchor="middle" fontSize="7.5" fill="#64748b" fontFamily="system-ui">
          Calling run() directly runs on current thread; start() creates a new thread.
        </text>
      </svg>
    </figure>
  );
}

/** Thread states and transitions */
export function ThreadLifecycleDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-threadlife" role="img" aria-label="Thread lifecycle states">
      <FlowchartFigcaption
        title="Thread lifecycle (Thread.State)"
        fresher="A thread starts in NEW, becomes RUNNABLE after start(), may move to BLOCKED or WAITING states, and finally reaches TERMINATED when run() ends."
      />
      <svg viewBox="0 0 760 250" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="26" y="98" width="92" height="42" rx="8" fill="#eef2ff" stroke="#6366f1" />
        <text x="72" y="123" textAnchor="middle" fontSize="9" fontWeight="800" fill="#312e81" fontFamily="ui-monospace">NEW</text>

        <rect x="166" y="40" width="126" height="44" rx="8" fill="#dcfce7" stroke="#22c55e" />
        <text x="229" y="66" textAnchor="middle" fontSize="9" fontWeight="800" fill="#14532d" fontFamily="ui-monospace">RUNNABLE</text>

        <rect x="350" y="24" width="126" height="44" rx="8" fill="#fef3c7" stroke="#f59e0b" />
        <text x="413" y="50" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#92400e" fontFamily="ui-monospace">BLOCKED</text>

        <rect x="350" y="94" width="126" height="44" rx="8" fill="#fde68a" stroke="#d97706" />
        <text x="413" y="120" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#92400e" fontFamily="ui-monospace">WAITING</text>

        <rect x="350" y="164" width="126" height="44" rx="8" fill="#fef9c3" stroke="#ca8a04" />
        <text x="413" y="190" textAnchor="middle" fontSize="8" fontWeight="800" fill="#854d0e" fontFamily="ui-monospace">TIMED_WAITING</text>

        <rect x="586" y="98" width="146" height="44" rx="8" fill="#fee2e2" stroke="#ef4444" />
        <text x="659" y="124" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#991b1b" fontFamily="ui-monospace">TERMINATED</text>

        <line x1="118" y1="119" x2="166" y2="62" stroke="#2563eb" strokeWidth="1.8" markerEnd={`url(#${p}-arrowhead)`} />
        <text x="140" y="82" fontSize="7" fill="#64748b">start()</text>

        <line x1="292" y1="58" x2="350" y2="46" stroke="#2563eb" strokeWidth="1.6" markerEnd={`url(#${p}-arrowhead)`} />
        <text x="304" y="44" fontSize="6.5" fill="#64748b">lock busy</text>

        <line x1="292" y1="62" x2="350" y2="116" stroke="#2563eb" strokeWidth="1.6" markerEnd={`url(#${p}-arrowhead)`} />
        <text x="306" y="95" fontSize="6.5" fill="#64748b">wait(), join()</text>

        <line x1="292" y1="66" x2="350" y2="186" stroke="#2563eb" strokeWidth="1.6" markerEnd={`url(#${p}-arrowhead)`} />
        <text x="300" y="150" fontSize="6.5" fill="#64748b">sleep(ms)</text>

        <line x1="476" y1="46" x2="532" y2="62" stroke="#10b981" strokeWidth="1.4" markerEnd={`url(#${p}-arrowhead)`} />
        <line x1="476" y1="116" x2="532" y2="100" stroke="#10b981" strokeWidth="1.4" markerEnd={`url(#${p}-arrowhead)`} />
        <line x1="476" y1="186" x2="532" y2="138" stroke="#10b981" strokeWidth="1.4" markerEnd={`url(#${p}-arrowhead)`} />
        <line x1="532" y1="100" x2="586" y2="120" stroke="#2563eb" strokeWidth="1.8" markerEnd={`url(#${p}-arrowhead)`} />
        <text x="540" y="88" fontSize="6.5" fill="#64748b">run() ends</text>

        <text x="380" y="236" textAnchor="middle" fontSize="7.5" fill="#64748b" fontFamily="system-ui">
          RUNNABLE includes running-on-CPU and ready-to-run waiting for scheduler time slice.
        </text>
      </svg>
    </figure>
  );
}

/** Important thread methods quick map */
export function ThreadMethodsDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro" role="img" aria-label="Common Java thread methods">
      <FlowchartFigcaption
        title="Important thread methods"
        fresher="Use start() to begin concurrency, join() for ordering, sleep() for delay, and interrupt() for cancellation. Avoid stop/suspend/resume because they are unsafe/deprecated."
      />
      <svg viewBox="0 0 620 220" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="220" y="16" width="180" height="34" rx="8" fill="#dbeafe" stroke="#3b82f6" />
        <text x="310" y="38" textAnchor="middle" fontSize="10" fontWeight="800" fill="#1e40af" fontFamily="ui-monospace">
          Thread API
        </text>

        {[
          { x: 36, y: 76, t: 'start()', d: 'new thread starts run()' },
          { x: 226, y: 76, t: 'sleep(ms)', d: 'pause current thread' },
          { x: 416, y: 76, t: 'join()', d: 'wait for completion' },
          { x: 36, y: 138, t: 'interrupt()', d: 'request cancel/wakeup' },
          { x: 226, y: 138, t: 'isAlive()', d: 'running status' },
          { x: 416, y: 138, t: 'currentThread()', d: 'who am I now?' }
        ].map((m) => (
          <g key={m.t}>
            <rect x={m.x} y={m.y} width="168" height="42" rx="8" fill={`url(#${p}-node-top)`} stroke="#94a3b8" filter={`url(#${p}-shadow)`} />
            <text x={m.x + 84} y={m.y + 18} textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#0f172a" fontFamily="ui-monospace">
              {m.t}
            </text>
            <text x={m.x + 84} y={m.y + 32} textAnchor="middle" fontSize="7" fill="#64748b" fontFamily="system-ui">
              {m.d}
            </text>
          </g>
        ))}

        <text x="310" y="208" textAnchor="middle" fontSize="7.5" fill="#64748b" fontFamily="system-ui">
          setName() helps logs; priority/yield are scheduler hints and usually less important in modern apps.
        </text>
      </svg>
    </figure>
  );
}

/** Servlet container path — browser to response */
export function ServletRequestLifecycleDiagram() {
  const p = useSvgPrefix();
  const steps = [
    { x: 24, t: 'Browser', s: 'GET /products' },
    { x: 156, t: 'Tomcat', s: 'accepts request' },
    { x: 288, t: 'Filter chain', s: 'auth / logging / CORS' },
    { x: 420, t: 'HttpServlet', s: 'doGet / doPost' },
    { x: 552, t: 'Response', s: 'HTML / JSON' }
  ];
  return (
    <figure className="flowchart-pro flowchart-pro-servlet-scenario" role="img" aria-label="Servlet request lifecycle">
      <FlowchartFigcaption
        title="Servlet request lifecycle — one HTTP call"
        fresher="The container routes each request through filters, then into your servlet method. Your code reads request data, calls services/DAO, and writes a response back to the client."
      />
      <svg viewBox="0 0 700 220" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        {steps.map((n, i) => (
          <g key={n.t}>
            <rect x={n.x} y="82" width="124" height="58" rx="10" fill="#ecfeff" stroke="#0891b2" strokeWidth="1.2" filter={`url(#${p}-shadow)`} />
            <text x={n.x + 62} y="106" textAnchor="middle" fontSize="8.7" fontWeight="800" fill="#0e7490" fontFamily="ui-monospace">
              {n.t}
            </text>
            <text x={n.x + 62} y="124" textAnchor="middle" fontSize="6.9" fill="#155e75" fontFamily="system-ui">
              {n.s}
            </text>
            {i < steps.length - 1 && (
              <line x1={n.x + 124} y1="111" x2={steps[i + 1].x - 6} y2="111" stroke="#0e7490" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
            )}
          </g>
        ))}
        <text x="350" y="34" textAnchor="middle" fontSize="9" fontWeight="800" fill="#0f172a" fontFamily="system-ui">
          Request is handled on a container worker thread
        </text>
        <text x="350" y="198" textAnchor="middle" fontSize="7.4" fill="#64748b" fontFamily="system-ui">
          One servlet instance serves many requests concurrently, so avoid mutable shared state in fields.
        </text>
      </svg>
    </figure>
  );
}

/** Servlet lifecycle under container control */
export function ServletContainerLifecycleDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-servlet-scenario" role="img" aria-label="Servlet lifecycle under container">
      <FlowchartFigcaption
        title="Servlet lifecycle — init(), service(), destroy()"
        fresher="Container creates one servlet instance, calls init() once, invokes service() for each request, and calls destroy() during shutdown/redeploy."
      />
      <svg viewBox="0 0 620 250" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="20" y="16" width="580" height="218" rx="14" fill="#f8fafc" stroke="#67e8f9" />
        <rect x="236" y="34" width="148" height="34" rx="8" fill="#cffafe" stroke="#0891b2" />
        <text x="310" y="56" textAnchor="middle" fontSize="9" fontWeight="800" fill="#0e7490" fontFamily="ui-monospace">
          new Servlet()
        </text>
        <line x1="310" y1="68" x2="310" y2="86" stroke="#0e7490" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <rect x="228" y="90" width="164" height="34" rx="8" fill="#ecfeff" stroke="#06b6d4" />
        <text x="310" y="112" textAnchor="middle" fontSize="8.8" fontWeight="800" fill="#155e75" fontFamily="ui-monospace">
          init(ServletConfig)
        </text>
        <line x1="310" y1="124" x2="310" y2="142" stroke="#0e7490" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <rect x="136" y="146" width="348" height="48" rx="10" fill="#f0fdfa" stroke="#14b8a6" />
        <text x="310" y="166" textAnchor="middle" fontSize="8.8" fontWeight="800" fill="#115e59" fontFamily="ui-monospace">
          service(req, res) → doGet / doPost / doPut ...
        </text>
        <text x="310" y="182" textAnchor="middle" fontSize="7.1" fill="#0f766e" fontFamily="system-ui">
          called once per request on different threads
        </text>
        <line x1="310" y1="194" x2="310" y2="208" stroke="#0e7490" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <rect x="242" y="210" width="136" height="22" rx="7" fill="#e2e8f0" stroke="#94a3b8" />
        <text x="310" y="225" textAnchor="middle" fontSize="7.8" fontWeight="700" fill="#334155" fontFamily="ui-monospace">
          destroy()
        </text>
      </svg>
    </figure>
  );
}

/** URL mapping and dispatch */
export function ServletUrlMappingDiagram() {
  const p = useSvgPrefix();
  const rows = [
    { url: '/login', map: 'LoginServlet' },
    { url: '/products/*', map: 'ProductServlet' },
    { url: '/api/orders/*', map: 'OrderApiServlet' },
    { url: '*.jsp', map: 'JspServlet (container)' }
  ];
  return (
    <figure className="flowchart-pro flowchart-pro-servlet-scenario" role="img" aria-label="Servlet URL mapping">
      <FlowchartFigcaption
        title="URL mapping — how requests reach servlets"
        fresher="Mappings come from @WebServlet or web.xml. The container matches request paths and dispatches to the target servlet."
      />
      <svg viewBox="0 0 640 220" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="40" y="22" width="560" height="174" rx="12" fill="#f8fafc" stroke="#22d3ee" />
        <text x="320" y="42" textAnchor="middle" fontSize="9" fontWeight="800" fill="#0e7490" fontFamily="system-ui">
          Tomcat mapping table (conceptual)
        </text>
        {rows.map((r, i) => (
          <g key={r.url}>
            <rect x="68" y={56 + i * 34} width="220" height="24" rx="6" fill="#ecfeff" stroke="#67e8f9" />
            <text x="80" y={72 + i * 34} fontSize="7.8" fontWeight="700" fill="#155e75" fontFamily="ui-monospace">
              {r.url}
            </text>
            <line x1="296" y1={68 + i * 34} x2="356" y2={68 + i * 34} stroke="#06b6d4" strokeWidth="1.8" markerEnd={`url(#${p}-arrowhead)`} />
            <rect x="364" y={56 + i * 34} width="208" height="24" rx="6" fill="#f0fdfa" stroke="#2dd4bf" />
            <text x="468" y={72 + i * 34} textAnchor="middle" fontSize="7.6" fontWeight="700" fill="#115e59" fontFamily="ui-monospace">
              {r.map}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  );
}

/** Session and cookie state flow */
export function ServletSessionCookieFlowDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-servlet-scenario" role="img" aria-label="Servlet session and cookie flow">
      <FlowchartFigcaption
        title="Session management — JSESSIONID and HttpSession"
        fresher="After login, the container typically creates HttpSession and sends a JSESSIONID cookie (or URL rewriting fallback). Later requests use that session key to recover the same server-side state."
      />
      <svg viewBox="0 0 680 240" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="34" y="58" width="176" height="110" rx="12" fill="#ecfeff" stroke="#0891b2" />
        <text x="122" y="86" textAnchor="middle" fontSize="9" fontWeight="800" fill="#0e7490" fontFamily="ui-monospace">
          Browser
        </text>
        <text x="122" y="104" textAnchor="middle" fontSize="7.2" fill="#155e75" fontFamily="system-ui">
          Cookie jar
        </text>
        <rect x="78" y="116" width="88" height="28" rx="6" fill="#cffafe" stroke="#22d3ee" />
        <text x="122" y="133" textAnchor="middle" fontSize="7.2" fontWeight="700" fill="#164e63" fontFamily="ui-monospace">
          JSESSIONID=abc
        </text>

        <rect x="278" y="36" width="370" height="164" rx="12" fill="#f0fdfa" stroke="#14b8a6" />
        <text x="463" y="62" textAnchor="middle" fontSize="9" fontWeight="800" fill="#0f766e" fontFamily="system-ui">
          Servlet container
        </text>
        <rect x="304" y="80" width="318" height="38" rx="8" fill="#ccfbf1" stroke="#2dd4bf" />
        <text x="463" y="103" textAnchor="middle" fontSize="8.1" fontWeight="800" fill="#115e59" fontFamily="ui-monospace">
          Session store: id → {`{user, cart, ...}`}
        </text>
        <rect x="304" y="130" width="318" height="42" rx="8" fill="#ecfeff" stroke="#06b6d4" />
        <text x="463" y="150" textAnchor="middle" fontSize="8" fontWeight="800" fill="#0e7490" fontFamily="ui-monospace">
          request.getSession()
        </text>
        <text x="463" y="164" textAnchor="middle" fontSize="7" fill="#155e75" fontFamily="system-ui">
          loads same session by cookie id
        </text>

        <line x1="210" y1="94" x2="278" y2="94" stroke="#0891b2" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <text x="244" y="86" textAnchor="middle" fontSize="6.7" fill="#334155" fontFamily="system-ui">
          login request
        </text>
        <line x1="278" y1="138" x2="210" y2="138" stroke="#0f766e" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <text x="244" y="154" textAnchor="middle" fontSize="6.7" fill="#334155" fontFamily="system-ui">
          Set-Cookie + response
        </text>
        <text x="340" y="216" fontSize="7.3" fill="#64748b" fontFamily="system-ui">
          For stateless APIs, use tokens instead of server-side session state.
        </text>
      </svg>
    </figure>
  );
}

/** WAR deployment inside Tomcat */
export function ServletTomcatDeploymentDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-servlet-scenario" role="img" aria-label="Tomcat servlet deployment">
      <FlowchartFigcaption
        title="Tomcat deployment flow — WAR to running app"
        fresher="Build creates a WAR, Tomcat expands it, reads mappings, initializes servlets, then starts serving requests at your context path."
      />
      <svg viewBox="0 0 680 240" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        {[
          { x: 24, t: 'mvn package', s: 'app.war' },
          { x: 152, t: 'webapps/', s: 'drop WAR' },
          { x: 280, t: 'Expand + scan', s: 'annotations/web.xml' },
          { x: 408, t: 'init()', s: 'servlets + filters' },
          { x: 536, t: 'Ready', s: '/myapp/*' }
        ].map((n, i, arr) => (
          <g key={n.t}>
            <rect x={n.x} y="86" width="120" height="56" rx="10" fill="#fff7ed" stroke="#ea580c" strokeWidth="1.2" filter={`url(#${p}-shadow)`} />
            <text x={n.x + 60} y="107" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#9a3412" fontFamily="ui-monospace">
              {n.t}
            </text>
            <text x={n.x + 60} y="124" textAnchor="middle" fontSize="6.8" fill="#7c2d12" fontFamily="system-ui">
              {n.s}
            </text>
            {i < arr.length - 1 && (
              <line x1={n.x + 120} y1="114" x2={arr[i + 1].x - 6} y2="114" stroke="#c2410c" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
            )}
          </g>
        ))}
        <text x="340" y="42" textAnchor="middle" fontSize="9" fontWeight="800" fill="#7c2d12" fontFamily="system-ui">
          Deployment pipeline (local or CI/CD)
        </text>
      </svg>
    </figure>
  );
}

/** Servlet API object map */
export function ServletApiObjectMapDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-servlet-scenario" role="img" aria-label="Servlet API object map">
      <FlowchartFigcaption
        title="Servlet API object map"
        fresher="Your servlet method receives HttpServletRequest and HttpServletResponse; ServletContext is app-wide and HttpSession is per user session."
      />
      <svg viewBox="0 0 640 250" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="230" y="24" width="180" height="34" rx="8" fill="#dbeafe" stroke="#2563eb" />
        <text x="320" y="45" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#1e40af" fontFamily="ui-monospace">
          HttpServlet#doGet/doPost
        </text>
        {[
          { x: 40, y: 96, t: 'HttpServletRequest', s: 'params, headers, body' },
          { x: 250, y: 96, t: 'HttpServletResponse', s: 'status, headers, body' },
          { x: 460, y: 96, t: 'HttpSession', s: 'user state' },
          { x: 250, y: 170, t: 'ServletContext', s: 'application scope' }
        ].map((n) => (
          <g key={n.t}>
            <rect x={n.x} y={n.y} width="140" height="48" rx="8" fill="#eff6ff" stroke="#60a5fa" filter={`url(#${p}-shadow)`} />
            <text x={n.x + 70} y={n.y + 20} textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#1e3a8a" fontFamily="ui-monospace">
              {n.t}
            </text>
            <text x={n.x + 70} y={n.y + 34} textAnchor="middle" fontSize="6.5" fill="#475569" fontFamily="system-ui">
              {n.s}
            </text>
          </g>
        ))}
        <line x1="320" y1="58" x2="110" y2="92" stroke="#2563eb" strokeWidth="1.7" markerEnd={`url(#${p}-arrowhead)`} />
        <line x1="320" y1="58" x2="320" y2="92" stroke="#2563eb" strokeWidth="1.7" markerEnd={`url(#${p}-arrowhead)`} />
        <line x1="320" y1="58" x2="530" y2="92" stroke="#2563eb" strokeWidth="1.7" markerEnd={`url(#${p}-arrowhead)`} />
        <line x1="320" y1="58" x2="320" y2="166" stroke="#2563eb" strokeWidth="1.7" markerEnd={`url(#${p}-arrowhead)`} />
      </svg>
    </figure>
  );
}

/** Config precedence for servlet app */
export function ServletConfigScopeDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-servlet-scenario" role="img" aria-label="Servlet config scopes">
      <FlowchartFigcaption
        title="Configuration scopes — ServletConfig vs ServletContext"
        fresher="ServletConfig is per servlet, ServletContext is shared across the whole web application."
      />
      <svg viewBox="0 0 620 230" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="40" y="32" width="540" height="164" rx="12" fill="#f8fafc" stroke="#22d3ee" />
        <rect x="66" y="56" width="488" height="44" rx="8" fill="#ccfbf1" stroke="#14b8a6" />
        <text x="310" y="82" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#115e59" fontFamily="ui-monospace">
          ServletContext (app-wide): dbUrl, appName, shared caches
        </text>
        <rect x="88" y="116" width="200" height="56" rx="8" fill="#ecfeff" stroke="#06b6d4" />
        <text x="188" y="140" textAnchor="middle" fontSize="7.8" fontWeight="800" fill="#0e7490" fontFamily="ui-monospace">
          LoginServlet config
        </text>
        <text x="188" y="156" textAnchor="middle" fontSize="6.5" fill="#155e75" fontFamily="system-ui">
          maxAttempts=5
        </text>
        <rect x="332" y="116" width="200" height="56" rx="8" fill="#ecfeff" stroke="#06b6d4" />
        <text x="432" y="140" textAnchor="middle" fontSize="7.8" fontWeight="800" fill="#0e7490" fontFamily="ui-monospace">
          UploadServlet config
        </text>
        <text x="432" y="156" textAnchor="middle" fontSize="6.5" fill="#155e75" fontFamily="system-ui">
          maxFileSize=10MB
        </text>
      </svg>
    </figure>
  );
}

/** Frontend integration in servlet MVC style */
export function ServletFrontendMvcFlowDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-servlet-scenario" role="img" aria-label="Servlet frontend integration flow">
      <FlowchartFigcaption
        title="Frontend integration — form submit, forward, redirect"
        fresher="Browser submits form to servlet; servlet validates, then either forwards with errors or redirects after success (PRG)."
      />
      <svg viewBox="0 0 700 250" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="44" y="34" width="120" height="42" rx="8" fill="#fef9c3" stroke="#f59e0b" />
        <text x="104" y="59" textAnchor="middle" fontSize="8" fontWeight="800" fill="#92400e" fontFamily="system-ui">
          HTML/JSP form
        </text>
        <rect x="290" y="28" width="120" height="50" rx="8" fill="#ecfeff" stroke="#06b6d4" />
        <text x="350" y="50" textAnchor="middle" fontSize="8" fontWeight="800" fill="#0e7490" fontFamily="ui-monospace">
          FrontController
        </text>
        <text x="350" y="63" textAnchor="middle" fontSize="6.2" fill="#155e75" fontFamily="system-ui">
          Servlet
        </text>
        <path d="M 350 90 L 420 128 L 350 166 L 280 128 Z" fill="#fef3c7" stroke="#ca8a04" strokeWidth="1.3" />
        <text x="350" y="130" textAnchor="middle" fontSize="7.3" fontWeight="800" fill="#92400e" fontFamily="system-ui">
          Valid?
        </text>
        <rect x="494" y="108" width="160" height="40" rx="8" fill="#ecfdf5" stroke="#22c55e" />
        <text x="574" y="132" textAnchor="middle" fontSize="7.2" fontWeight="800" fill="#14532d" fontFamily="system-ui">
          redirect:/success (GET)
        </text>
        <rect x="40" y="190" width="190" height="40" rx="8" fill="#fef2f2" stroke="#ef4444" />
        <text x="135" y="214" textAnchor="middle" fontSize="7.2" fontWeight="800" fill="#991b1b" fontFamily="system-ui">
          forward:/form.jsp with errors
        </text>
        <line x1="164" y1="54" x2="284" y2="54" stroke="#0e7490" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <line x1="350" y1="78" x2="350" y2="90" stroke="#0e7490" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <line x1="412" y1="128" x2="488" y2="128" stroke="#15803d" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <line x1="288" y1="132" x2="230" y2="188" stroke="#dc2626" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
      </svg>
    </figure>
  );
}

/** Filter and listener runtime map */
export function ServletFiltersListenersRuntimeDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-servlet-scenario" role="img" aria-label="Filters and listeners runtime">
      <FlowchartFigcaption
        title="Filters and listeners — runtime view"
        fresher="Filters typically wrap each request/response path based on mapping rules; listeners receive lifecycle events from app, session, or request scopes."
      />
      <svg viewBox="0 0 700 240" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        {[
          { x: 40, t: 'AuthFilter', c: '#ecfeff', s: '#06b6d4' },
          { x: 170, t: 'AuditFilter', c: '#ecfeff', s: '#06b6d4' },
          { x: 300, t: 'CorsFilter', c: '#ecfeff', s: '#06b6d4' },
          { x: 430, t: 'CompressionFilter', c: '#ecfeff', s: '#06b6d4' },
          { x: 560, t: 'Servlet', c: '#f0fdfa', s: '#14b8a6' }
        ].map((n, i, arr) => (
          <g key={n.t}>
            <rect x={n.x} y="72" width="108" height="44" rx="8" fill={n.c} stroke={n.s} />
            <text x={n.x + 54} y="98" textAnchor="middle" fontSize="7.2" fontWeight="800" fill="#155e75" fontFamily="ui-monospace">
              {n.t}
            </text>
            {i < arr.length - 1 && (
              <line x1={n.x + 108} y1="94" x2={arr[i + 1].x - 6} y2="94" stroke="#0e7490" strokeWidth="1.8" markerEnd={`url(#${p}-arrowhead)`} />
            )}
          </g>
        ))}
        <rect x="56" y="152" width="588" height="58" rx="10" fill="#fff7ed" stroke="#fb923c" />
        <text x="350" y="174" textAnchor="middle" fontSize="8" fontWeight="800" fill="#9a3412" fontFamily="ui-monospace">
          Listeners (event-driven)
        </text>
        <text x="350" y="192" textAnchor="middle" fontSize="7" fill="#7c2d12" fontFamily="system-ui">
          ServletContextListener · HttpSessionListener · ServletRequestListener
        </text>
      </svg>
    </figure>
  );
}

/** Security defense in depth for servlet apps */
export function ServletSecurityDefenseDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-servlet-scenario" role="img" aria-label="Servlet security defense layers">
      <FlowchartFigcaption
        title="Servlet security — defense in depth"
        fresher="Layer controls: transport security, authentication, authorization, input checks, and safe output/session handling."
      />
      <svg viewBox="0 0 640 250" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        {[
          { y: 188, w: 520, t: 'HTTPS/TLS', s: 'encrypt transport' },
          { y: 152, w: 460, t: 'Authentication', s: 'who are you?' },
          { y: 116, w: 400, t: 'Authorization', s: 'are you allowed?' },
          { y: 80, w: 340, t: 'Validation + Encoding', s: 'XSS/SQLi defenses' },
          { y: 44, w: 280, t: 'Business action', s: 'safe operation' }
        ].map((b) => (
          <g key={b.t}>
            <rect x={(640 - b.w) / 2} y={b.y} width={b.w} height="30" rx="8" fill="#f8fafc" stroke="#ef4444" />
            <text x="320" y={b.y + 12} textAnchor="middle" fontSize="7.3" fontWeight="800" fill="#991b1b" fontFamily="ui-monospace">
              {b.t}
            </text>
            <text x="320" y={b.y + 23} textAnchor="middle" fontSize="6.1" fill="#475569" fontFamily="system-ui">
              {b.s}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  );
}

/** JSP setup and deployment path */
export function JspProjectSetupDeploymentDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-jsp-scenario" role="img" aria-label="JSP project setup and deployment">
      <FlowchartFigcaption
        title="JSP project setup and deployment"
        fresher="JSP pages are packaged in a web app and deployed to a servlet container. In most setups, the first request (or startup precompile) triggers JSP translation/compilation."
      />
      <svg viewBox="0 0 700 220" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        {[
          { x: 26, t: 'Create web app', s: 'src/main/webapp' },
          { x: 162, t: 'Add JSP files', s: 'views/*.jsp' },
          { x: 298, t: 'Package WAR', s: 'mvn package' },
          { x: 434, t: 'Deploy Tomcat', s: 'webapps/' },
          { x: 570, t: 'Open URL', s: 'JSP compiles' }
        ].map((n, i, arr) => (
          <g key={n.t}>
            <rect x={n.x} y="78" width="112" height="56" rx="9" fill="#eef2ff" stroke="#6366f1" filter={`url(#${p}-shadow)`} />
            <text x={n.x + 56} y="99" textAnchor="middle" fontSize="7.9" fontWeight="800" fill="#3730a3" fontFamily="ui-monospace">
              {n.t}
            </text>
            <text x={n.x + 56} y="117" textAnchor="middle" fontSize="6.7" fill="#4c1d95" fontFamily="system-ui">
              {n.s}
            </text>
            {i < arr.length - 1 && (
              <line x1={n.x + 112} y1="106" x2={arr[i + 1].x - 6} y2="106" stroke="#4f46e5" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
            )}
          </g>
        ))}
      </svg>
    </figure>
  );
}

/** JSP runtime architecture */
export function JspArchitectureRuntimeDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-jsp-scenario" role="img" aria-label="JSP runtime architecture">
      <FlowchartFigcaption
        title="JSP runtime architecture"
        fresher="Browser requests a JSP. The container translates JSP into a servlet, compiles it when needed, then executes that servlet to produce the response."
      />
      <svg viewBox="0 0 700 240" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        {[
          { x: 36, y: 94, t: 'Browser', s: 'GET /home.jsp' },
          { x: 178, y: 94, t: 'JspServlet', s: 'dispatcher' },
          { x: 320, y: 58, t: 'Translate', s: 'JSP -> .java' },
          { x: 320, y: 132, t: 'Compile', s: '.java -> .class' },
          { x: 462, y: 94, t: 'Generated servlet', s: '_jspService()' },
          { x: 604, y: 94, t: 'HTML response', s: 'to browser' }
        ].map((n) => (
          <g key={`${n.t}-${n.y}`}>
            <rect x={n.x} y={n.y} width="116" height="48" rx="8" fill="#ede9fe" stroke="#8b5cf6" />
            <text x={n.x + 58} y={n.y + 18} textAnchor="middle" fontSize="7.6" fontWeight="800" fill="#5b21b6" fontFamily="ui-monospace">
              {n.t}
            </text>
            <text x={n.x + 58} y={n.y + 33} textAnchor="middle" fontSize="6.4" fill="#6d28d9" fontFamily="system-ui">
              {n.s}
            </text>
          </g>
        ))}
        <line x1="152" y1="118" x2="172" y2="118" stroke="#6d28d9" strokeWidth="1.9" markerEnd={`url(#${p}-arrowhead)`} />
        <line x1="294" y1="118" x2="320" y2="82" stroke="#6d28d9" strokeWidth="1.9" markerEnd={`url(#${p}-arrowhead)`} />
        <line x1="378" y1="82" x2="436" y2="106" stroke="#6d28d9" strokeWidth="1.9" markerEnd={`url(#${p}-arrowhead)`} />
        <line x1="294" y1="118" x2="320" y2="156" stroke="#6d28d9" strokeWidth="1.9" markerEnd={`url(#${p}-arrowhead)`} />
        <line x1="378" y1="156" x2="436" y2="130" stroke="#6d28d9" strokeWidth="1.9" markerEnd={`url(#${p}-arrowhead)`} />
        <line x1="578" y1="118" x2="598" y2="118" stroke="#6d28d9" strokeWidth="1.9" markerEnd={`url(#${p}-arrowhead)`} />
      </svg>
    </figure>
  );
}

/** JSP directives overview */
export function JspDirectivesOverviewDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-jsp-scenario" role="img" aria-label="JSP directives overview">
      <FlowchartFigcaption
        title="JSP directives overview"
        fresher="Directives configure JSP translation behavior: page, include, and taglib."
      />
      <svg viewBox="0 0 640 220" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="220" y="18" width="200" height="36" rx="8" fill="#ddd6fe" stroke="#7c3aed" />
        <text x="320" y="40" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#5b21b6" fontFamily="ui-monospace">
          &lt;%@ ... %&gt; directive
        </text>
        {[
          { x: 52, t: 'page', s: 'import, errorPage, isELIgnored' },
          { x: 252, t: 'include', s: 'static include at translation' },
          { x: 452, t: 'taglib', s: 'JSTL/custom tags' }
        ].map((d) => (
          <g key={d.t}>
            <rect x={d.x} y="98" width="136" height="66" rx="9" fill="#f5f3ff" stroke="#a78bfa" />
            <text x={d.x + 68} y="122" textAnchor="middle" fontSize="8.2" fontWeight="800" fill="#6d28d9" fontFamily="ui-monospace">
              {d.t}
            </text>
            <text x={d.x + 68} y="140" textAnchor="middle" fontSize="6.2" fill="#64748b" fontFamily="system-ui">
              {d.s}
            </text>
          </g>
        ))}
        <line x1="320" y1="54" x2="120" y2="94" stroke="#7c3aed" strokeWidth="1.8" markerEnd={`url(#${p}-arrowhead)`} />
        <line x1="320" y1="54" x2="320" y2="94" stroke="#7c3aed" strokeWidth="1.8" markerEnd={`url(#${p}-arrowhead)`} />
        <line x1="320" y1="54" x2="520" y2="94" stroke="#7c3aed" strokeWidth="1.8" markerEnd={`url(#${p}-arrowhead)`} />
      </svg>
    </figure>
  );
}

/** JSP implicit objects */
export function JspImplicitObjectsDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-jsp-scenario" role="img" aria-label="JSP implicit objects">
      <FlowchartFigcaption
        title="JSP implicit objects"
        fresher="Container injects request/session/application and writer objects so JSP can access data without explicit declarations."
      />
      <svg viewBox="0 0 700 240" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="264" y="20" width="172" height="34" rx="8" fill="#e0e7ff" stroke="#4f46e5" />
        <text x="350" y="42" textAnchor="middle" fontSize="8.4" fontWeight="800" fill="#312e81" fontFamily="ui-monospace">
          home.jsp (_jspService)
        </text>
        {[
          { x: 44, y: 86, t: 'request', s: 'params, attrs' },
          { x: 188, y: 86, t: 'response', s: 'headers/status' },
          { x: 332, y: 86, t: 'session', s: 'user state' },
          { x: 476, y: 86, t: 'application', s: 'app scope' },
          { x: 620, y: 86, t: 'out', s: 'JspWriter' }
        ].map((n) => (
          <g key={n.t}>
            <rect x={n.x} y={n.y} width="90" height="54" rx="8" fill="#eef2ff" stroke="#6366f1" />
            <text x={n.x + 45} y={n.y + 22} textAnchor="middle" fontSize="7.4" fontWeight="800" fill="#4338ca" fontFamily="ui-monospace">
              {n.t}
            </text>
            <text x={n.x + 45} y={n.y + 37} textAnchor="middle" fontSize="6.1" fill="#64748b" fontFamily="system-ui">
              {n.s}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  );
}

/** JSP EL resolution chain */
export function JspExpressionLanguageResolutionDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-jsp-scenario" role="img" aria-label="JSP EL resolution">
      <FlowchartFigcaption
        title="Expression Language resolution chain"
        fresher="For unqualified variables, EL resolves in order: pageScope, requestScope, sessionScope, then applicationScope (explicit scope qualifiers bypass this search)."
      />
      <svg viewBox="0 0 680 220" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="244" y="20" width="192" height="34" rx="8" fill="#fae8ff" stroke="#c026d3" />
        <text x="340" y="41" textAnchor="middle" fontSize="8.2" fontWeight="800" fill="#86198f" fontFamily="ui-monospace">
          ${'{user.name}'}
        </text>
        {[
          { x: 36, t: 'pageScope', ok: false },
          { x: 164, t: 'requestScope', ok: false },
          { x: 292, t: 'sessionScope', ok: true },
          { x: 420, t: 'applicationScope', ok: false }
        ].map((n, i, arr) => (
          <g key={n.t}>
            <rect x={n.x} y="104" width="118" height="50" rx="8" fill={n.ok ? '#dcfce7' : '#f5f3ff'} stroke={n.ok ? '#22c55e' : '#a855f7'} />
            <text x={n.x + 59} y="126" textAnchor="middle" fontSize="7.3" fontWeight="800" fill={n.ok ? '#166534' : '#7e22ce'} fontFamily="ui-monospace">
              {n.t}
            </text>
            <text x={n.x + 59} y="141" textAnchor="middle" fontSize="6.1" fill="#64748b" fontFamily="system-ui">
              {n.ok ? 'match found' : 'not found'}
            </text>
            {i < arr.length - 1 && (
              <line x1={n.x + 118} y1="129" x2={arr[i + 1].x - 5} y2="129" stroke="#a855f7" strokeWidth="1.8" markerEnd={`url(#${p}-arrowhead)`} />
            )}
          </g>
        ))}
      </svg>
    </figure>
  );
}

/** JSTL flow examples */
export function JspJstlFlowDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-jsp-scenario" role="img" aria-label="JSTL flow diagram">
      <FlowchartFigcaption
        title="JSTL core flow: choose + forEach"
        fresher="JSTL tags replace scriptlet loops/conditions with cleaner declarative view logic."
      />
      <svg viewBox="0 0 660 240" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="250" y="20" width="160" height="34" rx="8" fill="#dcfce7" stroke="#16a34a" />
        <text x="330" y="41" textAnchor="middle" fontSize="8.2" fontWeight="800" fill="#166534" fontFamily="ui-monospace">
          &lt;c:forEach items=\"${'{orders}'}\"&gt;
        </text>
        <path d="M 330 80 L 390 114 L 330 148 L 270 114 Z" fill="#fef9c3" stroke="#ca8a04" />
        <text x="330" y="116" textAnchor="middle" fontSize="7.2" fontWeight="800" fill="#92400e" fontFamily="system-ui">
          order.total &gt; 1000?
        </text>
        <rect x="124" y="176" width="160" height="40" rx="8" fill="#e0f2fe" stroke="#0284c7" />
        <text x="204" y="201" textAnchor="middle" fontSize="7.1" fontWeight="800" fill="#075985" fontFamily="system-ui">
          &lt;c:when&gt; Premium badge
        </text>
        <rect x="376" y="176" width="160" height="40" rx="8" fill="#f1f5f9" stroke="#64748b" />
        <text x="456" y="201" textAnchor="middle" fontSize="7.1" fontWeight="800" fill="#334155" fontFamily="system-ui">
          &lt;c:otherwise&gt; Normal row
        </text>
      </svg>
    </figure>
  );
}

/** JSP custom tag lifecycle */
export function JspCustomTagLifecycleDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-jsp-scenario" role="img" aria-label="JSP custom tag lifecycle">
      <FlowchartFigcaption
        title="Custom tag lifecycle"
        fresher="Tag handler class executes reusable view logic. TLD maps prefix to Java handler."
      />
      <svg viewBox="0 0 700 220" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        {[
          { x: 24, t: 'taglib directive', s: 'prefix uri' },
          { x: 160, t: 'TLD lookup', s: 'tag -> handler' },
          { x: 296, t: 'Tag handler', s: 'doStartTag()' },
          { x: 432, t: 'Body eval', s: 'optional content' },
          { x: 568, t: 'Output', s: 'HTML fragment' }
        ].map((n, i, arr) => (
          <g key={n.t}>
            <rect x={n.x} y="84" width="108" height="52" rx="8" fill="#f5f3ff" stroke="#8b5cf6" />
            <text x={n.x + 54} y="104" textAnchor="middle" fontSize="7.2" fontWeight="800" fill="#6d28d9" fontFamily="ui-monospace">
              {n.t}
            </text>
            <text x={n.x + 54} y="120" textAnchor="middle" fontSize="6.1" fill="#64748b" fontFamily="system-ui">
              {n.s}
            </text>
            {i < arr.length - 1 && (
              <line x1={n.x + 108} y1="110" x2={arr[i + 1].x - 6} y2="110" stroke="#7c3aed" strokeWidth="1.8" markerEnd={`url(#${p}-arrowhead)`} />
            )}
          </g>
        ))}
      </svg>
    </figure>
  );
}

/** Hibernate high-level architecture */
export function HibernateArchitectureLayersDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-hibernate-scenario" role="img" aria-label="Hibernate architecture layers">
      <FlowchartFigcaption
        title="Hibernate architecture layers"
        fresher="Application code talks to Session/EntityManager APIs; Hibernate translates object operations into SQL over JDBC."
      />
      <svg viewBox="0 0 700 230" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        {[
          { x: 26, t: 'Domain entities', s: '@Entity classes' },
          { x: 160, t: 'Session / EM', s: 'persistence context' },
          { x: 294, t: 'Hibernate core', s: 'dirty check, SQL gen' },
          { x: 428, t: 'JDBC', s: 'prepared statements' },
          { x: 562, t: 'Database', s: 'tables/indexes' }
        ].map((n, i, arr) => (
          <g key={n.t}>
            <rect x={n.x} y="84" width="112" height="58" rx="9" fill="#fff7ed" stroke="#ea580c" filter={`url(#${p}-shadow)`} />
            <text x={n.x + 56} y="106" textAnchor="middle" fontSize="7.8" fontWeight="800" fill="#9a3412" fontFamily="ui-monospace">
              {n.t}
            </text>
            <text x={n.x + 56} y="124" textAnchor="middle" fontSize="6.4" fill="#7c2d12" fontFamily="system-ui">
              {n.s}
            </text>
            {i < arr.length - 1 && (
              <line x1={n.x + 112} y1="113" x2={arr[i + 1].x - 6} y2="113" stroke="#c2410c" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
            )}
          </g>
        ))}
      </svg>
    </figure>
  );
}

/** SessionFactory bootstrap flow */
export function HibernateConfigurationBootstrapDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-hibernate-scenario" role="img" aria-label="Hibernate configuration bootstrap">
      <FlowchartFigcaption
        title="Configuration bootstrap"
        fresher="Hibernate reads config properties and mappings, builds SessionFactory once, then app opens sessions per unit of work."
      />
      <svg viewBox="0 0 660 230" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        {[
          { x: 36, y: 34, t: 'hibernate.cfg.xml / props', s: 'dialect, url, ddl' },
          { x: 254, y: 34, t: 'Metadata', s: 'entity mappings' },
          { x: 472, y: 34, t: 'SessionFactory', s: 'heavy, singleton' },
          { x: 254, y: 124, t: 'Session', s: 'per request/tx' },
          { x: 472, y: 124, t: 'Transaction', s: 'begin/commit/rollback' }
        ].map((n) => (
          <g key={n.t}>
            <rect x={n.x} y={n.y} width="170" height="52" rx="8" fill="#ffedd5" stroke="#fb923c" />
            <text x={n.x + 85} y={n.y + 20} textAnchor="middle" fontSize="7.7" fontWeight="800" fill="#9a3412" fontFamily="ui-monospace">
              {n.t}
            </text>
            <text x={n.x + 85} y={n.y + 36} textAnchor="middle" fontSize="6.3" fill="#7c2d12" fontFamily="system-ui">
              {n.s}
            </text>
          </g>
        ))}
        <line x1="206" y1="60" x2="248" y2="60" stroke="#c2410c" strokeWidth="1.9" markerEnd={`url(#${p}-arrowhead)`} />
        <line x1="424" y1="60" x2="466" y2="60" stroke="#c2410c" strokeWidth="1.9" markerEnd={`url(#${p}-arrowhead)`} />
        <line x1="557" y1="86" x2="557" y2="118" stroke="#c2410c" strokeWidth="1.9" markerEnd={`url(#${p}-arrowhead)`} />
        <line x1="424" y1="150" x2="466" y2="150" stroke="#c2410c" strokeWidth="1.9" markerEnd={`url(#${p}-arrowhead)`} />
      </svg>
    </figure>
  );
}

/** Entity lifecycle and session states */
export function HibernateSessionEntityStatesDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-hibernate-scenario" role="img" aria-label="Hibernate entity states">
      <FlowchartFigcaption
        title="Entity states in a session"
        fresher="Objects move through transient, persistent, detached, and removed states depending on session operations."
      />
      <svg viewBox="0 0 680 240" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="50" y="96" width="120" height="46" rx="8" fill="#fef3c7" stroke="#f59e0b" />
        <text x="110" y="122" textAnchor="middle" fontSize="8" fontWeight="800" fill="#92400e" fontFamily="ui-monospace">Transient</text>
        <rect x="250" y="40" width="150" height="52" rx="8" fill="#dcfce7" stroke="#22c55e" />
        <text x="325" y="62" textAnchor="middle" fontSize="8" fontWeight="800" fill="#166534" fontFamily="ui-monospace">Persistent</text>
        <text x="325" y="77" textAnchor="middle" fontSize="6.3" fill="#15803d" fontFamily="system-ui">tracked by session</text>
        <rect x="250" y="152" width="150" height="52" rx="8" fill="#e2e8f0" stroke="#64748b" />
        <text x="325" y="174" textAnchor="middle" fontSize="8" fontWeight="800" fill="#334155" fontFamily="ui-monospace">Detached</text>
        <text x="325" y="189" textAnchor="middle" fontSize="6.3" fill="#475569" fontFamily="system-ui">session closed/cleared</text>
        <rect x="500" y="96" width="120" height="46" rx="8" fill="#fee2e2" stroke="#ef4444" />
        <text x="560" y="122" textAnchor="middle" fontSize="8" fontWeight="800" fill="#991b1b" fontFamily="ui-monospace">Removed</text>
        <line x1="170" y1="119" x2="244" y2="66" stroke="#22c55e" strokeWidth="1.9" markerEnd={`url(#${p}-arrowhead)`} />
        <text x="205" y="83" fontSize="6.3" fill="#166534" fontFamily="system-ui">persist/save</text>
        <line x1="325" y1="92" x2="325" y2="146" stroke="#64748b" strokeWidth="1.9" markerEnd={`url(#${p}-arrowhead)`} />
        <text x="334" y="122" fontSize="6.3" fill="#475569" fontFamily="system-ui">close/clear</text>
        <line x1="400" y1="178" x2="494" y2="120" stroke="#ef4444" strokeWidth="1.9" markerEnd={`url(#${p}-arrowhead)`} />
        <text x="444" y="141" fontSize="6.3" fill="#991b1b" fontFamily="system-ui">delete/remove</text>
      </svg>
    </figure>
  );
}

/** Mapping strategy overview */
export function HibernateMappingStrategiesDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-hibernate-scenario" role="img" aria-label="Hibernate mapping strategies">
      <FlowchartFigcaption
        title="Entity-to-table mapping strategies"
        fresher="Annotations map classes/fields/relationships to tables and columns; id generation strategy controls primary keys."
      />
      <svg viewBox="0 0 700 240" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="40" y="34" width="220" height="72" rx="9" fill="#fff7ed" stroke="#fb923c" />
        <text x="150" y="56" textAnchor="middle" fontSize="8" fontWeight="800" fill="#9a3412" fontFamily="ui-monospace">@Entity Student</text>
        <text x="150" y="72" textAnchor="middle" fontSize="6.2" fill="#7c2d12" fontFamily="system-ui">@Id @GeneratedValue(strategy=IDENTITY)</text>
        <text x="150" y="86" textAnchor="middle" fontSize="6.2" fill="#7c2d12" fontFamily="system-ui">@Column(name=\"first_name\")</text>
        <rect x="430" y="34" width="220" height="72" rx="9" fill="#ffedd5" stroke="#ea580c" />
        <text x="540" y="56" textAnchor="middle" fontSize="8" fontWeight="800" fill="#9a3412" fontFamily="ui-monospace">students table</text>
        <text x="540" y="72" textAnchor="middle" fontSize="6.2" fill="#7c2d12" fontFamily="system-ui">id PK AI, first_name, ...</text>
        <line x1="260" y1="70" x2="424" y2="70" stroke="#c2410c" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
        <rect x="40" y="136" width="280" height="72" rx="9" fill="#ecfeff" stroke="#06b6d4" />
        <text x="180" y="158" textAnchor="middle" fontSize="8" fontWeight="800" fill="#155e75" fontFamily="ui-monospace">@ManyToOne / @OneToMany</text>
        <text x="180" y="174" textAnchor="middle" fontSize="6.2" fill="#0e7490" fontFamily="system-ui">join column + fetch/cascade choices</text>
        <rect x="380" y="136" width="270" height="72" rx="9" fill="#ecfdf5" stroke="#22c55e" />
        <text x="515" y="158" textAnchor="middle" fontSize="8" fontWeight="800" fill="#166534" fontFamily="ui-monospace">FK constraints + joins</text>
        <text x="515" y="174" textAnchor="middle" fontSize="6.2" fill="#15803d" fontFamily="system-ui">DB integrity matches object graph</text>
        <line x1="320" y1="172" x2="374" y2="172" stroke="#0891b2" strokeWidth="2" markerEnd={`url(#${p}-arrowhead)`} />
      </svg>
    </figure>
  );
}

/** HQL execution path */
export function HibernateHqlExecutionDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-hibernate-scenario" role="img" aria-label="Hibernate HQL execution path">
      <FlowchartFigcaption
        title="HQL execution path"
        fresher="HQL/JPQL is object-oriented query language. Hibernate parses query, generates SQL, binds parameters, then hydrates entities."
      />
      <svg viewBox="0 0 700 220" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        {[
          { x: 28, t: 'HQL string', s: 'from Student s where ...' },
          { x: 162, t: 'Parser/AST', s: 'entity metadata' },
          { x: 296, t: 'SQL generation', s: 'dialect-specific' },
          { x: 430, t: 'JDBC execution', s: 'prepared statement' },
          { x: 564, t: 'Hydration', s: 'entities/DTOs' }
        ].map((n, i, arr) => (
          <g key={n.t}>
            <rect x={n.x} y="82" width="108" height="56" rx="8" fill="#ffedd5" stroke="#fb923c" />
            <text x={n.x + 54} y="103" textAnchor="middle" fontSize="7.2" fontWeight="800" fill="#9a3412" fontFamily="ui-monospace">{n.t}</text>
            <text x={n.x + 54} y="120" textAnchor="middle" fontSize="6.1" fill="#7c2d12" fontFamily="system-ui">{n.s}</text>
            {i < arr.length - 1 && <line x1={n.x + 108} y1="110" x2={arr[i + 1].x - 5} y2="110" stroke="#c2410c" strokeWidth="1.8" markerEnd={`url(#${p}-arrowhead)`} />}
          </g>
        ))}
      </svg>
    </figure>
  );
}

/** Relationship loading and N+1 hint */
export function HibernateRelationshipsFetchDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-hibernate-scenario" role="img" aria-label="Hibernate relationships and fetch behavior">
      <FlowchartFigcaption
        title="Relationships and fetch behavior"
        fresher="Lazy loading reduces upfront queries, but can cause N+1 if you iterate children per parent without join fetch/batch tuning."
      />
      <svg viewBox="0 0 700 230" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="40" y="56" width="180" height="54" rx="8" fill="#fff7ed" stroke="#fb923c" />
        <text x="130" y="79" textAnchor="middle" fontSize="7.8" fontWeight="800" fill="#9a3412" fontFamily="ui-monospace">Department (1)</text>
        <text x="130" y="94" textAnchor="middle" fontSize="6.2" fill="#7c2d12" fontFamily="system-ui">@OneToMany employees</text>
        <rect x="290" y="26" width="170" height="54" rx="8" fill="#ecfdf5" stroke="#22c55e" />
        <text x="375" y="49" textAnchor="middle" fontSize="7.6" fontWeight="800" fill="#166534" fontFamily="ui-monospace">JOIN FETCH query</text>
        <text x="375" y="64" textAnchor="middle" fontSize="6.1" fill="#15803d" fontFamily="system-ui">single SQL for graph</text>
        <rect x="290" y="132" width="170" height="54" rx="8" fill="#fee2e2" stroke="#ef4444" />
        <text x="375" y="155" textAnchor="middle" fontSize="7.6" fontWeight="800" fill="#991b1b" fontFamily="ui-monospace">Lazy loop N+1</text>
        <text x="375" y="170" textAnchor="middle" fontSize="6.1" fill="#b91c1c" fontFamily="system-ui">1 + N SQL queries</text>
        <rect x="530" y="56" width="130" height="54" rx="8" fill="#ffedd5" stroke="#ea580c" />
        <text x="595" y="79" textAnchor="middle" fontSize="7.3" fontWeight="800" fill="#9a3412" fontFamily="ui-monospace">employees table</text>
        <text x="595" y="94" textAnchor="middle" fontSize="6" fill="#7c2d12" fontFamily="system-ui">fk_department_id</text>
        <line x1="220" y1="82" x2="284" y2="52" stroke="#16a34a" strokeWidth="1.9" markerEnd={`url(#${p}-arrowhead)`} />
        <line x1="220" y1="82" x2="284" y2="158" stroke="#dc2626" strokeWidth="1.9" markerEnd={`url(#${p}-arrowhead)`} />
        <line x1="460" y1="82" x2="524" y2="82" stroke="#c2410c" strokeWidth="1.9" markerEnd={`url(#${p}-arrowhead)`} />
      </svg>
    </figure>
  );
}

/** Caching layers in Hibernate */
export function HibernateCachingLayersDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-hibernate-scenario" role="img" aria-label="Hibernate caching layers">
      <FlowchartFigcaption
        title="Caching layers: first-level, second-level, query cache"
        fresher="First-level cache lives in Session (always on). Second-level and query cache are optional shared optimizations."
      />
      <svg viewBox="0 0 700 240" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="42" y="88" width="150" height="58" rx="8" fill="#dcfce7" stroke="#22c55e" />
        <text x="117" y="111" textAnchor="middle" fontSize="7.4" fontWeight="800" fill="#166534" fontFamily="ui-monospace">Session (L1)</text>
        <text x="117" y="126" textAnchor="middle" fontSize="6.1" fill="#15803d" fontFamily="system-ui">per request/unit of work</text>
        <rect x="276" y="48" width="170" height="58" rx="8" fill="#e0f2fe" stroke="#0284c7" />
        <text x="361" y="71" textAnchor="middle" fontSize="7.4" fontWeight="800" fill="#075985" fontFamily="ui-monospace">Second-level cache</text>
        <text x="361" y="86" textAnchor="middle" fontSize="6.1" fill="#0369a1" fontFamily="system-ui">shared across sessions</text>
        <rect x="276" y="132" width="170" height="58" rx="8" fill="#fef9c3" stroke="#eab308" />
        <text x="361" y="155" textAnchor="middle" fontSize="7.4" fontWeight="800" fill="#854d0e" fontFamily="ui-monospace">Query cache</text>
        <text x="361" y="170" textAnchor="middle" fontSize="6.1" fill="#a16207" fontFamily="system-ui">ids/result sets</text>
        <rect x="530" y="88" width="128" height="58" rx="8" fill="#ffedd5" stroke="#ea580c" />
        <text x="594" y="111" textAnchor="middle" fontSize="7.4" fontWeight="800" fill="#9a3412" fontFamily="ui-monospace">Database</text>
        <text x="594" y="126" textAnchor="middle" fontSize="6.1" fill="#7c2d12" fontFamily="system-ui">fallback source</text>
        <line x1="192" y1="117" x2="270" y2="77" stroke="#0284c7" strokeWidth="1.9" markerEnd={`url(#${p}-arrowhead)`} />
        <line x1="192" y1="117" x2="270" y2="161" stroke="#eab308" strokeWidth="1.9" markerEnd={`url(#${p}-arrowhead)`} />
        <line x1="446" y1="117" x2="524" y2="117" stroke="#c2410c" strokeWidth="1.9" markerEnd={`url(#${p}-arrowhead)`} />
      </svg>
    </figure>
  );
}

/** Locking and version check flow */
export function HibernateLockingVersionDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-hibernate-scenario" role="img" aria-label="Hibernate optimistic locking flow">
      <FlowchartFigcaption
        title="Optimistic locking with @Version"
        fresher="Update includes version in WHERE clause. If row count is 0, another transaction modified the row and Hibernate throws stale object exception."
      />
      <svg viewBox="0 0 700 240" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="46" y="80" width="174" height="64" rx="8" fill="#ecfeff" stroke="#06b6d4" />
        <text x="133" y="104" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#155e75" fontFamily="ui-monospace">Tx-A loads entity</text>
        <text x="133" y="120" textAnchor="middle" fontSize="6.1" fill="#0e7490" fontFamily="system-ui">id=10, version=3</text>
        <rect x="266" y="42" width="174" height="64" rx="8" fill="#dcfce7" stroke="#22c55e" />
        <text x="353" y="66" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#166534" fontFamily="ui-monospace">Tx-B commits first</text>
        <text x="353" y="82" textAnchor="middle" fontSize="6.1" fill="#15803d" fontFamily="system-ui">{'row version -> 4'}</text>
        <rect x="266" y="132" width="174" height="64" rx="8" fill="#fee2e2" stroke="#ef4444" />
        <text x="353" y="156" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#991b1b" fontFamily="ui-monospace">Tx-A update fails</text>
        <text x="353" y="172" textAnchor="middle" fontSize="6.1" fill="#b91c1c" fontFamily="system-ui">{'WHERE version=3 -> 0 rows'}</text>
        <rect x="486" y="80" width="168" height="64" rx="8" fill="#fff7ed" stroke="#ea580c" />
        <text x="570" y="104" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#9a3412" fontFamily="ui-monospace">StaleObjectStateEx</text>
        <text x="570" y="120" textAnchor="middle" fontSize="6.1" fill="#7c2d12" fontFamily="system-ui">retry / merge strategy</text>
        <line x1="220" y1="112" x2="260" y2="74" stroke="#16a34a" strokeWidth="1.8" markerEnd={`url(#${p}-arrowhead)`} />
        <line x1="220" y1="112" x2="260" y2="164" stroke="#ef4444" strokeWidth="1.8" markerEnd={`url(#${p}-arrowhead)`} />
        <line x1="440" y1="164" x2="480" y2="112" stroke="#ef4444" strokeWidth="1.8" markerEnd={`url(#${p}-arrowhead)`} />
      </svg>
    </figure>
  );
}

/** Batch insert/update pattern */
export function HibernateBatchProcessingFlowDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-hibernate-scenario" role="img" aria-label="Hibernate batch processing flow">
      <FlowchartFigcaption
        title="Batch processing flow"
        fresher="For large writes, persist in chunks and periodically flush+clear the session to control memory and use JDBC batching."
      />
      <svg viewBox="0 0 700 220" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        {[
          { x: 34, t: 'Read source', s: 'CSV/API rows' },
          { x: 166, t: 'persist(entity)', s: 'loop' },
          { x: 298, t: 'batchSize hit?', s: 'every N rows' },
          { x: 430, t: 'flush + clear', s: 'release memory' },
          { x: 562, t: 'commit tx', s: 'next chunk' }
        ].map((n, i, arr) => (
          <g key={n.t}>
            <rect x={n.x} y="78" width="104" height="58" rx="8" fill="#ffedd5" stroke="#fb923c" />
            <text x={n.x + 52} y="100" textAnchor="middle" fontSize="7" fontWeight="800" fill="#9a3412" fontFamily="ui-monospace">{n.t}</text>
            <text x={n.x + 52} y="118" textAnchor="middle" fontSize="6" fill="#7c2d12" fontFamily="system-ui">{n.s}</text>
            {i < arr.length - 1 && <line x1={n.x + 104} y1="107" x2={arr[i + 1].x - 6} y2="107" stroke="#c2410c" strokeWidth="1.8" markerEnd={`url(#${p}-arrowhead)`} />}
          </g>
        ))}
      </svg>
    </figure>
  );
}

/** Spring Cloud architecture fundamentals */
export function SpringCloudArchitectureDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-springcloud-scenario" role="img" aria-label="Spring Cloud architecture">
      <FlowchartFigcaption
        title="Spring Cloud architecture (conceptual)"
        fresher="Gateway fronts traffic, services register in discovery, centralized config supplies properties, and resilience/tracing/logging support operations."
      />
      <svg viewBox="0 0 760 250" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="300" y="18" width="160" height="38" rx="8" fill="#dcfce7" stroke="#22c55e" />
        <text x="380" y="42" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#166534" fontFamily="ui-monospace">
          API Gateway
        </text>
        <rect x="88" y="84" width="136" height="46" rx="8" fill="#ecfeff" stroke="#06b6d4" />
        <text x="156" y="110" textAnchor="middle" fontSize="7.4" fontWeight="800" fill="#155e75" fontFamily="ui-monospace">Eureka Server</text>
        <rect x="534" y="84" width="136" height="46" rx="8" fill="#fff7ed" stroke="#ea580c" />
        <text x="602" y="110" textAnchor="middle" fontSize="7.4" fontWeight="800" fill="#9a3412" fontFamily="ui-monospace">Config Server</text>
        {[
          { x: 190, t: 'User Service' },
          { x: 312, t: 'Order Service' },
          { x: 434, t: 'Payment Service' }
        ].map((s) => (
          <g key={s.t}>
            <rect x={s.x} y="156" width="112" height="44" rx="8" fill="#f8fafc" stroke="#64748b" />
            <text x={s.x + 56} y="181" textAnchor="middle" fontSize="7.1" fontWeight="800" fill="#334155" fontFamily="ui-monospace">
              {s.t}
            </text>
          </g>
        ))}
        <line x1="380" y1="56" x2="246" y2="156" stroke="#16a34a" strokeWidth="1.7" markerEnd={`url(#${p}-arrowhead)`} />
        <line x1="380" y1="56" x2="368" y2="156" stroke="#16a34a" strokeWidth="1.7" markerEnd={`url(#${p}-arrowhead)`} />
        <line x1="380" y1="56" x2="490" y2="156" stroke="#16a34a" strokeWidth="1.7" markerEnd={`url(#${p}-arrowhead)`} />
        <line x1="156" y1="130" x2="246" y2="156" stroke="#0891b2" strokeWidth="1.7" markerEnd={`url(#${p}-arrowhead)`} />
        <line x1="156" y1="130" x2="368" y2="156" stroke="#0891b2" strokeWidth="1.7" markerEnd={`url(#${p}-arrowhead)`} />
        <line x1="156" y1="130" x2="490" y2="156" stroke="#0891b2" strokeWidth="1.7" markerEnd={`url(#${p}-arrowhead)`} />
        <line x1="602" y1="130" x2="246" y2="156" stroke="#c2410c" strokeWidth="1.7" markerEnd={`url(#${p}-arrowhead)`} />
        <line x1="602" y1="130" x2="368" y2="156" stroke="#c2410c" strokeWidth="1.7" markerEnd={`url(#${p}-arrowhead)`} />
        <line x1="602" y1="130" x2="490" y2="156" stroke="#c2410c" strokeWidth="1.7" markerEnd={`url(#${p}-arrowhead)`} />
      </svg>
    </figure>
  );
}

export function SpringCloudConfigServerFlowDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-springcloud-scenario" role="img" aria-label="Spring Cloud Config Server flow">
      <FlowchartFigcaption
        title="Config Server flow"
        fresher="Services request configuration by application/profile/label; Config Server fetches from Git and returns environment properties."
      />
      <svg viewBox="0 0 700 220" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        {[
          { x: 24, t: 'Service startup', s: 'bootstrap context' },
          { x: 162, t: 'GET /{app}/{profile}', s: 'config endpoint' },
          { x: 300, t: 'Config Server', s: 'reads backend' },
          { x: 438, t: 'Git repo', s: 'yaml/properties' },
          { x: 576, t: 'PropertySource', s: 'applied locally' }
        ].map((n, i, arr) => (
          <g key={n.t}>
            <rect x={n.x} y="82" width="104" height="56" rx="8" fill="#ecfeff" stroke="#06b6d4" />
            <text x={n.x + 52} y="103" textAnchor="middle" fontSize="7" fontWeight="800" fill="#155e75" fontFamily="ui-monospace">{n.t}</text>
            <text x={n.x + 52} y="120" textAnchor="middle" fontSize="6" fill="#0e7490" fontFamily="system-ui">{n.s}</text>
            {i < arr.length - 1 && <line x1={n.x + 104} y1="110" x2={arr[i + 1].x - 6} y2="110" stroke="#0891b2" strokeWidth="1.8" markerEnd={`url(#${p}-arrowhead)`} />}
          </g>
        ))}
      </svg>
    </figure>
  );
}

export function SpringCloudEurekaDiscoveryFlowDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-springcloud-scenario" role="img" aria-label="Eureka discovery flow">
      <FlowchartFigcaption
        title="Eureka service discovery flow"
        fresher="Services register and heartbeat with Eureka; callers query registry and choose an instance via client-side load balancing."
      />
      <svg viewBox="0 0 700 240" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="274" y="26" width="152" height="42" rx="8" fill="#ecfeff" stroke="#06b6d4" />
        <text x="350" y="51" textAnchor="middle" fontSize="8" fontWeight="800" fill="#155e75" fontFamily="ui-monospace">Eureka Server</text>
        <rect x="74" y="146" width="128" height="46" rx="8" fill="#f8fafc" stroke="#64748b" />
        <text x="138" y="172" textAnchor="middle" fontSize="7.2" fontWeight="800" fill="#334155" fontFamily="ui-monospace">Caller Service</text>
        <rect x="500" y="120" width="130" height="40" rx="8" fill="#dcfce7" stroke="#22c55e" />
        <text x="565" y="143" textAnchor="middle" fontSize="7" fontWeight="800" fill="#166534" fontFamily="ui-monospace">Order-1</text>
        <rect x="500" y="168" width="130" height="40" rx="8" fill="#dcfce7" stroke="#22c55e" />
        <text x="565" y="191" textAnchor="middle" fontSize="7" fontWeight="800" fill="#166534" fontFamily="ui-monospace">Order-2</text>
        <line x1="138" y1="146" x2="314" y2="68" stroke="#0891b2" strokeWidth="1.8" markerEnd={`url(#${p}-arrowhead)`} />
        <line x1="426" y1="68" x2="565" y2="120" stroke="#16a34a" strokeWidth="1.8" markerEnd={`url(#${p}-arrowhead)`} />
        <line x1="426" y1="68" x2="565" y2="168" stroke="#16a34a" strokeWidth="1.8" markerEnd={`url(#${p}-arrowhead)`} />
        <line x1="202" y1="170" x2="494" y2="140" stroke="#334155" strokeWidth="1.8" markerEnd={`url(#${p}-arrowhead)`} />
      </svg>
    </figure>
  );
}

export function SpringCloudApiGatewayRoutingDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-springcloud-scenario" role="img" aria-label="API Gateway routing">
      <FlowchartFigcaption
        title="API Gateway routing pipeline"
        fresher="Gateway applies predicates/filters, authenticates request, then routes to target service and forwards response."
      />
      <svg viewBox="0 0 720 220" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        {[
          { x: 24, t: 'Client', s: 'GET /api/orders' },
          { x: 150, t: 'Route predicate', s: 'path match' },
          { x: 276, t: 'Filters', s: 'auth, rate-limit' },
          { x: 402, t: 'LB + discovery', s: 'choose instance' },
          { x: 528, t: 'Target service', s: 'business logic' }
        ].map((n, i, arr) => (
          <g key={n.t}>
            <rect x={n.x} y="82" width="116" height="56" rx="8" fill="#eef2ff" stroke="#6366f1" />
            <text x={n.x + 58} y="103" textAnchor="middle" fontSize="7" fontWeight="800" fill="#4338ca" fontFamily="ui-monospace">{n.t}</text>
            <text x={n.x + 58} y="120" textAnchor="middle" fontSize="6" fill="#4f46e5" fontFamily="system-ui">{n.s}</text>
            {i < arr.length - 1 && <line x1={n.x + 116} y1="110" x2={arr[i + 1].x - 6} y2="110" stroke="#4f46e5" strokeWidth="1.8" markerEnd={`url(#${p}-arrowhead)`} />}
          </g>
        ))}
      </svg>
    </figure>
  );
}

export function SpringCloudLoadBalancingFlowDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-springcloud-scenario" role="img" aria-label="Load balancing flow">
      <FlowchartFigcaption
        title="Client-side load balancing flow"
        fresher="Caller gets service instances from discovery and picks one (round-robin or custom strategy) for each request."
      />
      <svg viewBox="0 0 700 230" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="56" y="92" width="140" height="46" rx="8" fill="#ecfeff" stroke="#06b6d4" />
        <text x="126" y="118" textAnchor="middle" fontSize="7.4" fontWeight="800" fill="#155e75" fontFamily="ui-monospace">Caller + LB client</text>
        <rect x="278" y="42" width="140" height="40" rx="8" fill="#f8fafc" stroke="#64748b" />
        <text x="348" y="66" textAnchor="middle" fontSize="7.2" fontWeight="800" fill="#334155" fontFamily="ui-monospace">Instance-1</text>
        <rect x="278" y="92" width="140" height="40" rx="8" fill="#f8fafc" stroke="#64748b" />
        <text x="348" y="116" textAnchor="middle" fontSize="7.2" fontWeight="800" fill="#334155" fontFamily="ui-monospace">Instance-2</text>
        <rect x="278" y="142" width="140" height="40" rx="8" fill="#f8fafc" stroke="#64748b" />
        <text x="348" y="166" textAnchor="middle" fontSize="7.2" fontWeight="800" fill="#334155" fontFamily="ui-monospace">Instance-3</text>
        <rect x="512" y="92" width="138" height="46" rx="8" fill="#dcfce7" stroke="#22c55e" />
        <text x="581" y="118" textAnchor="middle" fontSize="7.4" fontWeight="800" fill="#166534" fontFamily="ui-monospace">Response path</text>
        <line x1="196" y1="102" x2="272" y2="62" stroke="#0891b2" strokeWidth="1.7" markerEnd={`url(#${p}-arrowhead)`} />
        <line x1="196" y1="115" x2="272" y2="112" stroke="#0891b2" strokeWidth="1.7" markerEnd={`url(#${p}-arrowhead)`} />
        <line x1="196" y1="128" x2="272" y2="162" stroke="#0891b2" strokeWidth="1.7" markerEnd={`url(#${p}-arrowhead)`} />
        <line x1="418" y1="112" x2="506" y2="112" stroke="#16a34a" strokeWidth="1.8" markerEnd={`url(#${p}-arrowhead)`} />
      </svg>
    </figure>
  );
}

export function SpringCloudOpenFeignCallDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-springcloud-scenario" role="img" aria-label="OpenFeign call flow">
      <FlowchartFigcaption
        title="OpenFeign call flow"
        fresher="Feign interface method call is converted to HTTP request, routed via discovery/load balancer, then decoded back to Java object."
      />
      <svg viewBox="0 0 700 220" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        {[
          { x: 22, t: 'Service code', s: 'client.getOrder(id)' },
          { x: 156, t: '@FeignClient proxy', s: 'method intercept' },
          { x: 290, t: 'HTTP request', s: 'JSON + headers' },
          { x: 424, t: 'Remote service', s: 'process call' },
          { x: 558, t: 'Decoder', s: 'DTO response' }
        ].map((n, i, arr) => (
          <g key={n.t}>
            <rect x={n.x} y="82" width="106" height="56" rx="8" fill="#f5f3ff" stroke="#8b5cf6" />
            <text x={n.x + 53} y="103" textAnchor="middle" fontSize="6.8" fontWeight="800" fill="#6d28d9" fontFamily="ui-monospace">{n.t}</text>
            <text x={n.x + 53} y="120" textAnchor="middle" fontSize="5.9" fill="#7c3aed" fontFamily="system-ui">{n.s}</text>
            {i < arr.length - 1 && <line x1={n.x + 106} y1="110" x2={arr[i + 1].x - 5} y2="110" stroke="#7c3aed" strokeWidth="1.8" markerEnd={`url(#${p}-arrowhead)`} />}
          </g>
        ))}
      </svg>
    </figure>
  );
}

export function SpringCloudResilienceCircuitBreakerDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-springcloud-scenario" role="img" aria-label="Resilience4j circuit breaker states">
      <FlowchartFigcaption
        title="Circuit breaker state transitions"
        fresher="Failures push breaker from CLOSED to OPEN; after wait duration it moves HALF_OPEN to test recovery and may close again."
      />
      <svg viewBox="0 0 680 240" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="64" y="96" width="140" height="50" rx="8" fill="#dcfce7" stroke="#22c55e" />
        <text x="134" y="124" textAnchor="middle" fontSize="8" fontWeight="800" fill="#166534" fontFamily="ui-monospace">CLOSED</text>
        <rect x="268" y="36" width="140" height="50" rx="8" fill="#fee2e2" stroke="#ef4444" />
        <text x="338" y="64" textAnchor="middle" fontSize="8" fontWeight="800" fill="#991b1b" fontFamily="ui-monospace">OPEN</text>
        <rect x="472" y="96" width="140" height="50" rx="8" fill="#fef9c3" stroke="#eab308" />
        <text x="542" y="124" textAnchor="middle" fontSize="8" fontWeight="800" fill="#854d0e" fontFamily="ui-monospace">HALF_OPEN</text>
        <line x1="204" y1="106" x2="262" y2="70" stroke="#ef4444" strokeWidth="1.8" markerEnd={`url(#${p}-arrowhead)`} />
        <text x="236" y="82" fontSize="6.2" fill="#991b1b" fontFamily="system-ui">failure rate high</text>
        <line x1="408" y1="70" x2="466" y2="106" stroke="#eab308" strokeWidth="1.8" markerEnd={`url(#${p}-arrowhead)`} />
        <text x="438" y="82" fontSize="6.2" fill="#854d0e" fontFamily="system-ui">wait duration elapsed</text>
        <line x1="472" y1="136" x2="204" y2="136" stroke="#16a34a" strokeWidth="1.8" markerEnd={`url(#${p}-arrowhead)`} />
        <text x="336" y="152" textAnchor="middle" fontSize="6.2" fill="#166534" fontFamily="system-ui">trial calls succeed</text>
      </svg>
    </figure>
  );
}

export function SpringCloudDistributedTracingFlowDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-springcloud-scenario" role="img" aria-label="Distributed tracing flow">
      <FlowchartFigcaption
        title="Distributed tracing flow"
        fresher="Trace id propagates across services; each service reports spans to collector (Zipkin/Tempo/Jaeger) for end-to-end timing."
      />
      <svg viewBox="0 0 720 230" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        {[
          { x: 40, t: 'Gateway', s: 'traceId=abc' },
          { x: 194, t: 'Order svc', s: 'span 1' },
          { x: 348, t: 'Payment svc', s: 'span 2' },
          { x: 502, t: 'Inventory svc', s: 'span 3' }
        ].map((n, i, arr) => (
          <g key={n.t}>
            <rect x={n.x} y="84" width="128" height="52" rx="8" fill="#ecfeff" stroke="#06b6d4" />
            <text x={n.x + 64} y="106" textAnchor="middle" fontSize="7.3" fontWeight="800" fill="#155e75" fontFamily="ui-monospace">{n.t}</text>
            <text x={n.x + 64} y="122" textAnchor="middle" fontSize="6.1" fill="#0e7490" fontFamily="system-ui">{n.s}</text>
            {i < arr.length - 1 && <line x1={n.x + 128} y1="110" x2={arr[i + 1].x - 6} y2="110" stroke="#0891b2" strokeWidth="1.8" markerEnd={`url(#${p}-arrowhead)`} />}
          </g>
        ))}
        <rect x="274" y="168" width="172" height="40" rx="8" fill="#fff7ed" stroke="#ea580c" />
        <text x="360" y="192" textAnchor="middle" fontSize="7.2" fontWeight="800" fill="#9a3412" fontFamily="ui-monospace">Trace backend (Zipkin)</text>
        <line x1="104" y1="136" x2="302" y2="168" stroke="#c2410c" strokeWidth="1.5" markerEnd={`url(#${p}-arrowhead)`} />
        <line x1="258" y1="136" x2="332" y2="168" stroke="#c2410c" strokeWidth="1.5" markerEnd={`url(#${p}-arrowhead)`} />
        <line x1="412" y1="136" x2="360" y2="168" stroke="#c2410c" strokeWidth="1.5" markerEnd={`url(#${p}-arrowhead)`} />
        <line x1="566" y1="136" x2="390" y2="168" stroke="#c2410c" strokeWidth="1.5" markerEnd={`url(#${p}-arrowhead)`} />
      </svg>
    </figure>
  );
}

export function SpringCloudSecurityTokenFlowDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-springcloud-scenario" role="img" aria-label="Spring Cloud security token flow">
      <FlowchartFigcaption
        title="Security token propagation flow"
        fresher="Gateway validates JWT then forwards identity claims to downstream services, where fine-grained authorization still applies."
      />
      <svg viewBox="0 0 700 220" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        {[
          { x: 30, t: 'Client', s: 'Bearer JWT' },
          { x: 170, t: 'Gateway auth', s: 'verify signature' },
          { x: 310, t: 'Route + claims', s: 'forward context' },
          { x: 450, t: 'Service authz', s: 'role/scope check' },
          { x: 590, t: 'Response', s: 'allow/deny' }
        ].map((n, i, arr) => (
          <g key={n.t}>
            <rect x={n.x} y="82" width="96" height="56" rx="8" fill="#fef2f2" stroke="#ef4444" />
            <text x={n.x + 48} y="103" textAnchor="middle" fontSize="6.8" fontWeight="800" fill="#991b1b" fontFamily="ui-monospace">{n.t}</text>
            <text x={n.x + 48} y="120" textAnchor="middle" fontSize="5.9" fill="#b91c1c" fontFamily="system-ui">{n.s}</text>
            {i < arr.length - 1 && <line x1={n.x + 96} y1="110" x2={arr[i + 1].x - 5} y2="110" stroke="#dc2626" strokeWidth="1.8" markerEnd={`url(#${p}-arrowhead)`} />}
          </g>
        ))}
      </svg>
    </figure>
  );
}

export function SpringCloudElkPipelineDiagram() {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-springcloud-scenario" role="img" aria-label="ELK logging pipeline">
      <FlowchartFigcaption
        title="ELK logging pipeline"
        fresher="Services emit structured logs; shipper forwards to Logstash/Elasticsearch; Kibana visualizes and correlates incidents."
      />
      <svg viewBox="0 0 720 220" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        {[
          { x: 24, t: 'Microservices', s: 'JSON logs' },
          { x: 162, t: 'Filebeat/FluentBit', s: 'ship logs' },
          { x: 300, t: 'Logstash', s: 'parse/enrich' },
          { x: 438, t: 'Elasticsearch', s: 'index/search' },
          { x: 576, t: 'Kibana', s: 'dashboards' }
        ].map((n, i, arr) => (
          <g key={n.t}>
            <rect x={n.x} y="82" width="112" height="56" rx="8" fill="#f8fafc" stroke="#64748b" />
            <text x={n.x + 56} y="103" textAnchor="middle" fontSize="7" fontWeight="800" fill="#334155" fontFamily="ui-monospace">{n.t}</text>
            <text x={n.x + 56} y="120" textAnchor="middle" fontSize="6" fill="#475569" fontFamily="system-ui">{n.s}</text>
            {i < arr.length - 1 && <line x1={n.x + 112} y1="110" x2={arr[i + 1].x - 6} y2="110" stroke="#475569" strokeWidth="1.8" markerEnd={`url(#${p}-arrowhead)`} />}
          </g>
        ))}
      </svg>
    </figure>
  );
}

/** SVG flowchart with directional runtime steps (Spring Cloud tabs) */
export function DeepRuntimeFlowDiagram({ title, subtitle, steps = [] }) {
  const p = useSvgPrefix();
  const safeSteps = Array.isArray(steps) ? steps.slice(0, 6) : [];
  const cols = Math.min(3, Math.max(1, safeSteps.length));
  const rows = Math.ceil(safeSteps.length / cols);
  const nodeW = 198;
  const nodeH = 54;
  const gapX = 24;
  const gapY = 24;
  const startX = 26;
  const startY = 62;
  const totalW = 760;
  const totalH = Math.max(220, startY + rows * nodeH + (rows - 1) * gapY + 28);
  return (
    <figure className="flowchart-pro flowchart-pro-springcloud-scenario" role="img" aria-label={title || 'Runtime flow'}>
      <FlowchartFigcaption title={title} fresher={subtitle} />
      <svg viewBox={`0 0 ${totalW} ${totalH}`} className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        {safeSteps.map((s, i) => {
          const r = Math.floor(i / cols);
          const c = i % cols;
          const x = startX + c * (nodeW + gapX);
          const y = startY + r * (nodeH + gapY);
          const next = safeSteps[i + 1];
          const nextR = Math.floor((i + 1) / cols);
          const nextC = (i + 1) % cols;
          const nx = startX + nextC * (nodeW + gapX);
          const ny = startY + nextR * (nodeH + gapY);
          return (
            <g key={`${s.title}-${i}`}>
              <rect x={x} y={y} width={nodeW} height={nodeH} rx="10" fill="#eef2ff" stroke="#6366f1" strokeWidth="1.2" filter={`url(#${p}-shadow)`} />
              <circle cx={x + 16} cy={y + 16} r="10" fill="#4f46e5" />
              <text x={x + 16} y={y + 19} textAnchor="middle" fontSize="7" fontWeight="800" fill="#ffffff" fontFamily="ui-monospace">
                {i + 1}
              </text>
              <text x={x + 34} y={y + 18} fontSize="7.2" fontWeight="800" fill="#3730a3" fontFamily="ui-monospace">
                {s.title}
              </text>
              <text x={x + 34} y={y + 34} fontSize="6" fill="#4c1d95" fontFamily="system-ui">
                {s.sub}
              </text>
              {next && (
                <line
                  x1={x + nodeW}
                  y1={y + nodeH / 2}
                  x2={nextR === r ? nx - 6 : x + nodeW - 2}
                  y2={nextR === r ? ny + nodeH / 2 : y + nodeH + 10}
                  stroke="#4f46e5"
                  strokeWidth="1.8"
                  markerEnd={`url(#${p}-arrowhead)`}
                />
              )}
              {next && nextR !== r && (
                <line x1={x + nodeW - 2} y1={y + nodeH + 10} x2={nx - 6} y2={ny + nodeH / 2} stroke="#4f46e5" strokeWidth="1.8" markerEnd={`url(#${p}-arrowhead)`} />
              )}
            </g>
          );
        })}
      </svg>
    </figure>
  );
}

/** SVG warning-focused flow for pitfalls tab */
export function PitfallsFlowDiagram({ title, subtitle, steps = [] }) {
  const p = useSvgPrefix();
  const safeSteps = Array.isArray(steps) ? steps.slice(0, 5) : [];
  return (
    <figure className="flowchart-pro flowchart-pro-springcloud-scenario" role="img" aria-label={title || 'Pitfalls flow'}>
      <FlowchartFigcaption title={title} fresher={subtitle} />
      <svg viewBox="0 0 760 240" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        {safeSteps.map((s, i) => {
          const x = 24 + i * 146;
          return (
            <g key={`${s.title}-${i}`}>
              <rect x={x} y="90" width="132" height="64" rx="10" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.2" filter={`url(#${p}-shadow)`} />
              <text x={x + 66} y="113" textAnchor="middle" fontSize="7" fontWeight="800" fill="#991b1b" fontFamily="ui-monospace">
                {s.title}
              </text>
              <text x={x + 66} y="129" textAnchor="middle" fontSize="5.9" fill="#b91c1c" fontFamily="system-ui">
                {s.sub}
              </text>
              {i < safeSteps.length - 1 && (
                <line x1={x + 132} y1="122" x2={x + 140} y2="122" stroke="#dc2626" strokeWidth="1.8" markerEnd={`url(#${p}-arrowhead)`} />
              )}
            </g>
          );
        })}
      </svg>
    </figure>
  );
}

/** Zig-zag SVG flow for scenario tabs */
export function ScenarioPathFlowDiagram({ title, subtitle, steps = [] }) {
  const p = useSvgPrefix();
  const safeSteps = Array.isArray(steps) ? steps.slice(0, 6) : [];
  return (
    <figure className="flowchart-pro flowchart-pro-springcloud-scenario" role="img" aria-label={title || 'Scenario path'}>
      <FlowchartFigcaption title={title} fresher={subtitle} />
      <svg viewBox="0 0 760 250" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        {safeSteps.map((s, i) => {
          const x = i % 2 === 0 ? 60 : 420;
          const y = 38 + i * 34;
          const nx = (i + 1) % 2 === 0 ? 60 : 420;
          const ny = 38 + (i + 1) * 34;
          return (
            <g key={`${s.title}-${i}`}>
              <rect x={x} y={y} width="280" height="44" rx="10" fill="#ecfeff" stroke="#06b6d4" strokeWidth="1.2" filter={`url(#${p}-shadow)`} />
              <text x={x + 14} y={y + 18} fontSize="7.1" fontWeight="800" fill="#155e75" fontFamily="ui-monospace">
                {`${i + 1}. ${s.title}`}
              </text>
              <text x={x + 14} y={y + 32} fontSize="6" fill="#0e7490" fontFamily="system-ui">
                {s.sub}
              </text>
              {i < safeSteps.length - 1 && (
                <path
                  d={`M ${x + 280} ${y + 22} C ${x + 320} ${y + 22}, ${nx - 40} ${ny + 22}, ${nx} ${ny + 22}`}
                  fill="none"
                  stroke="#0891b2"
                  strokeWidth="1.8"
                  markerEnd={`url(#${p}-arrowhead)`}
                />
              )}
            </g>
          );
        })}
      </svg>
    </figure>
  );
}

/** Interview answer matrix style SVG */
export function InterviewAnswerMapDiagram({ title, subtitle, steps = [] }) {
  const p = useSvgPrefix();
  const safeSteps = Array.isArray(steps) ? steps.slice(0, 4) : [];
  return (
    <figure className="flowchart-pro flowchart-pro-springcloud-scenario" role="img" aria-label={title || 'Interview answer map'}>
      <FlowchartFigcaption title={title} fresher={subtitle} />
      <svg viewBox="0 0 760 230" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        <rect x="20" y="26" width="720" height="176" rx="12" fill="#f8fafc" stroke="#38bdf8" />
        {safeSteps.map((s, i) => {
          const x = 40 + i * 176;
          return (
            <g key={`${s.title}-${i}`}>
              <rect x={x} y="58" width="160" height="112" rx="10" fill="#eef2ff" stroke="#6366f1" filter={`url(#${p}-shadow)`} />
              <rect x={x + 12} y="70" width="136" height="22" rx="6" fill="#4f46e5" />
              <text x={x + 80} y="85" textAnchor="middle" fontSize="7" fontWeight="800" fill="#ffffff" fontFamily="ui-monospace">
                {s.title}
              </text>
              <text x={x + 14} y="108" fontSize="6.1" fill="#334155" fontFamily="system-ui">
                {s.sub}
              </text>
              {i < safeSteps.length - 1 && (
                <line x1={x + 160} y1="114" x2={x + 170} y2="114" stroke="#4f46e5" strokeWidth="1.7" markerEnd={`url(#${p}-arrowhead)`} />
              )}
            </g>
          );
        })}
      </svg>
    </figure>
  );
}

/** Primitive memory comparison — SVG bars (Data Types) */
export function PrimitiveMemorySvg({ rows }) {
  const p = useSvgPrefix();
  return (
    <figure className="flowchart-pro flowchart-pro-memory" role="img" aria-label="Primitive type memory sizes">
      <figcaption className="flowchart-pro-title">Relative size (conceptual)</figcaption>
      <svg viewBox="0 0 420 320" className="flowchart-pro-svg" preserveAspectRatio="xMidYMid meet">
        <Defs prefix={p} />
        {rows.map((row, i) => {
          const y = 16 + i * 34;
          return (
            <g key={row.label}>
              <text x="8" y={y + 22} fontSize="11" fontWeight="600" fill="#0f172a" fontFamily="ui-monospace">
                {row.label}
              </text>
              <rect x="88" y={y + 4} width="300" height="18" rx="6" fill="#e2e8f0" />
              <rect
                x="88"
                y={y + 4}
                width={300 * row.pct}
                height="18"
                rx="6"
                fill={row.color}
                opacity="0.92"
                filter={`url(#${p}-shadow)`}
              />
              <text x="400" y={y + 17} textAnchor="end" fontSize="9" fill="#64748b" fontFamily="system-ui">
                {row.bytes}
              </text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}
