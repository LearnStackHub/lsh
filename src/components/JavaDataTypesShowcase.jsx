import { useMemo, useState } from 'react';
import { PrimitiveMemorySvg } from './flow/ProfessionalDiagrams';

const TYPE_DETAILS = {
  byte: {
    size: '1 byte (8 bits)',
    range: '-128 to 127',
    use: 'Large arrays, binary data',
    desc: 'Rarely used, but useful when memory is very tight.',
    code: 'byte age = 25;\nbyte signal = -10;',
    tip: 'Use only for memory-sensitive structures.',
    group: 'int',
    width: '12.5%'
  },
  short: {
    size: '2 bytes (16 bits)',
    range: '-32,768 to 32,767',
    use: 'Legacy integrations',
    desc: 'Medium integer type, not common in modern Java.',
    code: 'short year = 2026;\nshort temp = -15;',
    tip: 'Prefer int unless you have a clear reason.',
    group: 'int',
    width: '25%'
  },
  int: {
    size: '4 bytes (32 bits)',
    range: '-2,147,483,648 to 2,147,483,647',
    use: 'Default whole number',
    desc: 'Best default choice for counters, IDs, and quantities.',
    code: 'int count = 120;\nint score = 950;',
    tip: 'Use int for most whole-number values.',
    group: 'int',
    width: '50%'
  },
  long: {
    size: '8 bytes (64 bits)',
    range: '~ +/-9.2 quintillion',
    use: 'Timestamps, large IDs',
    desc: 'For very large integer values.',
    code: 'long world = 8000000000L;\nlong ts = System.currentTimeMillis();',
    tip: 'Always add L suffix to long literals.',
    group: 'int',
    width: '100%'
  },
  float: {
    size: '4 bytes (32 bits)',
    range: '~ +/-3.4 x 10^38',
    use: 'Memory-sensitive decimal data',
    desc: 'Lower-precision decimal type.',
    code: 'float price = 19.99f;\nfloat pi = 3.14159f;',
    tip: 'Use f suffix. Prefer double in most cases.',
    group: 'float',
    width: '50%'
  },
  double: {
    size: '8 bytes (64 bits)',
    range: '~ +/-1.8 x 10^308',
    use: 'Default decimal type',
    desc: 'Higher precision decimal type and Java default.',
    code: 'double salary = 75000.50;\ndouble pi = 3.1415926535;',
    tip: 'Use this as your default decimal type.',
    group: 'float',
    width: '100%'
  },
  char: {
    size: '2 bytes (16 bits)',
    range: '0 to 65,535 (Unicode)',
    use: 'Single characters',
    desc: 'Stores exactly one character.',
    code: "char grade = 'A';\nchar symbol = '@';",
    tip: "char uses single quotes, String uses double quotes.",
    group: 'char',
    width: '25%'
  },
  boolean: {
    size: '1 bit (logical)',
    range: 'true or false',
    use: 'Flags and conditions',
    desc: 'Used for binary decisions.',
    code: 'boolean isActive = true;\nboolean isAdult = age >= 18;',
    tip: "Prefer names like isX, hasX, canX.",
    group: 'bool',
    width: '4%'
  }
};

const TYPE_ORDER = ['byte', 'short', 'int', 'long', 'float', 'double', 'char', 'boolean'];

function JavaDataTypesShowcase() {
  const [tab, setTab] = useState('types');
  const [selectedType, setSelectedType] = useState('int');
  const detail = TYPE_DETAILS[selectedType];

  const memoryRows = useMemo(
    () =>
      TYPE_ORDER.map((type) => ({
        type,
        size: TYPE_DETAILS[type].size,
        width: TYPE_DETAILS[type].width,
        group: TYPE_DETAILS[type].group
      })),
    []
  );

  const memorySvgRows = useMemo(
    () => [
      { label: 'boolean', pct: 0.04, bytes: '1 bit*', color: '#6b7280' },
      { label: 'byte', pct: 0.125, bytes: '1 byte', color: '#3b82f6' },
      { label: 'short', pct: 0.25, bytes: '2 bytes', color: '#3b82f6' },
      { label: 'char', pct: 0.25, bytes: '2 bytes', color: '#10b981' },
      { label: 'int', pct: 0.5, bytes: '4 bytes', color: '#3b82f6' },
      { label: 'float', pct: 0.5, bytes: '4 bytes', color: '#f59e0b' },
      { label: 'long', pct: 1, bytes: '8 bytes', color: '#3b82f6' },
      { label: 'double', pct: 1, bytes: '8 bytes', color: '#f59e0b' }
    ],
    []
  );

  return (
    <div className="java-types-showcase">
      <div className="java-types-tabs">
        {[
          ['types', 'Types Explorer'],
          ['memory', 'Memory Sizes'],
          ['mistakes', 'Common Mistakes']
        ].map(([id, label]) => (
          <button
            key={id}
            type="button"
            className={`java-types-tab ${tab === id ? 'active' : ''}`}
            onClick={() => setTab(id)}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 'types' && (
        <div>
          <div className="java-types-grid">
            {TYPE_ORDER.map((type) => (
              <button
                key={type}
                type="button"
                className={`java-type-card ${selectedType === type ? 'active' : ''}`}
                onClick={() => setSelectedType(type)}
              >
                <div className="java-type-name">{type}</div>
                <div className="java-type-range">{TYPE_DETAILS[type].range}</div>
                <div className="java-type-bar">
                  <span style={{ width: TYPE_DETAILS[type].width }} />
                </div>
              </button>
            ))}
          </div>

          <div className="java-type-detail">
            <h3>{selectedType}</h3>
            <p>{detail.desc}</p>
            <div className="java-type-props">
              <div><span>Size</span><strong>{detail.size}</strong></div>
              <div><span>Range</span><strong>{detail.range}</strong></div>
              <div><span>Use</span><strong>{detail.use}</strong></div>
            </div>
            <pre>{detail.code}</pre>
            <div className="java-type-tip">{detail.tip}</div>
          </div>
        </div>
      )}

      {tab === 'memory' && (
        <div className="java-memory-tab">
          <PrimitiveMemorySvg rows={memorySvgRows} />
          <p className="java-memory-tab-note">
            Bars compare typical footprint next to the largest primitives (long / double). Boolean is JVM-dependent;
            treat the chart as a mental model, not exact hardware layout.
          </p>
          <div className="java-memory-list">
            {memoryRows.map((row) => (
              <div key={row.type} className="java-memory-row">
                <div className="label">{row.type}</div>
                <div className="track">
                  <div className={`fill ${row.group}`} style={{ width: row.width }} />
                </div>
                <div className="size">{row.size}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'mistakes' && (
        <div className="java-mistakes">
          <div className="java-mistake-card">
            <h4>Forgetting L with long</h4>
            <pre>{'long big = 3000000000; // error\nlong big = 3000000000L; // correct'}</pre>
          </div>
          <div className="java-mistake-card">
            <h4>Forgetting f with float</h4>
            <pre>{'float price = 9.99; // error\nfloat price = 9.99f; // correct'}</pre>
          </div>
          <div className="java-mistake-card">
            <h4>Using == for decimals</h4>
            <pre>{'double a = 0.1 + 0.2;\nSystem.out.println(a == 0.3); // false'}</pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default JavaDataTypesShowcase;
