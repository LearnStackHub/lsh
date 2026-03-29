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
