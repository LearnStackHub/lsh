import { useState } from 'react';
import { SerHero, SerWhyGrid, SerDiagramFrame, SerCallout } from './serialization/SerBlocks';
import { SerializationObjectStreamDiagram, SerializableClassDiagram, HorizontalPipeline } from './flow/ProfessionalDiagrams';

const TABS = [
  ['streams', 'Object streams'],
  ['contract', 'Class contract'],
  ['when', 'When to use']
];

const WHY = [
  {
    title: 'Bytes, not text',
    text: 'Java serialization is a binary format for object graphs. It is not JSON or XML—other languages cannot read it without matching class definitions.'
  },
  {
    title: 'Opt-in marker',
    text: 'Classes must implement Serializable (or Externalizable). The runtime walks fields and writes metadata; incompatible class changes break streams unless you plan versioning.'
  },
  {
    title: 'Security caution',
    text: 'Never deserialize untrusted data—gadget chains can execute arbitrary code. Prefer JSON with schemas for cross-service data when you can.'
  }
];

export default function SerializationShowcase() {
  const [tab, setTab] = useState('streams');
  return (
    <div className="ser-showcase">
      <SerHero
        eyebrow="Core Java · I/O"
        title="Serialization"
        subtitle="Serialization persists object state to a byte stream and restores it later. Understand Object streams, serialVersionUID, and transient fields before using it in real systems."
      />
      <SerWhyGrid items={WHY} />

      <div className="ser-tabs">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" className={`ser-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'streams' && (
        <div className="ser-panel">
          <SerDiagramFrame label="Serialization flow">
            <SerializationObjectStreamDiagram />
          </SerDiagramFrame>
        </div>
      )}

      {tab === 'contract' && (
        <div className="ser-panel">
          <SerDiagramFrame label="Serializable class">
            <SerializableClassDiagram />
          </SerDiagramFrame>
          <SerCallout variant="watch" title="Externalizable">
            For full control over the byte format, implement <code>Externalizable</code> and override <code>writeExternal</code> / <code>readExternal</code>.
          </SerCallout>
        </div>
      )}

      {tab === 'when' && (
        <div className="ser-panel">
          <SerDiagramFrame label="Alternatives">
            <HorizontalPipeline
              title="Pick a persistence style"
              fresherHint={false}
              steps={[
                { title: 'Java only', sub: 'Serialization' },
                { title: 'APIs / web', sub: 'JSON, Protobuf' },
                { title: 'DB rows', sub: 'JDBC, JPA' },
                { title: 'Files', sub: 'NIO, paths' }
              ]}
            />
          </SerDiagramFrame>
          <p className="ser-caption">Serialization shines for cloning graphs inside one JVM or RMI-style legacy; modern services usually prefer language-neutral formats.</p>
        </div>
      )}
    </div>
  );
}
