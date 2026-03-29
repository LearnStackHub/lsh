import { useState } from 'react';
import { SyncHero, SyncWhyGrid, SyncDiagramFrame, SyncCallout } from './sync/SyncBlocks';
import { SynchronizationMonitorDiagram, VolatileVsSynchronizedDiagram, HorizontalPipeline } from './flow/ProfessionalDiagrams';

const TABS = [
  ['monitor', 'Monitor lock'],
  ['volatile', 'volatile vs sync'],
  ['juc', 'java.util.concurrent']
];

const WHY = [
  {
    title: 'Shared mutable state',
    text: 'When several threads read and write the same fields, you need coordination—otherwise you get races, torn reads, and lost updates.'
  },
  {
    title: 'Intrinsic locks',
    text: 'synchronized associates a lock with an object. Only one thread at a time runs the guarded code for that lock—simple mental model for beginners.'
  },
  {
    title: 'Prefer j.u.c. at scale',
    text: 'For production concurrency, ConcurrentHashMap, atomic variables, and explicit Lock often compose better than ad-hoc wait/notify.'
  }
];

export default function SynchronizationShowcase() {
  const [tab, setTab] = useState('monitor');
  return (
    <div className="sync-showcase">
      <SyncHero
        eyebrow="Core Java · Concurrency"
        title="Synchronization"
        subtitle="Synchronization coordinates threads so shared data stays consistent. Start with synchronized and volatile; then learn java.util.concurrent for scalable patterns."
      />
      <SyncWhyGrid items={WHY} />

      <div className="sync-tabs">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" className={`sync-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'monitor' && (
        <div className="sync-panel">
          <SyncDiagramFrame label="Monitor lock">
            <SynchronizationMonitorDiagram />
          </SyncDiagramFrame>
          <SyncCallout variant="tip" title="Same lock">
            Use the <strong>same object</strong> as the lock everywhere that must be mutually exclusive—mixing different locks on shared fields still races.
          </SyncCallout>
        </div>
      )}

      {tab === 'volatile' && (
        <div className="sync-panel">
          <SyncDiagramFrame label="Visibility vs locking">
            <VolatileVsSynchronizedDiagram />
          </SyncDiagramFrame>
        </div>
      )}

      {tab === 'juc' && (
        <div className="sync-panel">
          <SyncDiagramFrame label="Higher-level tools">
            <HorizontalPipeline
              title="Common java.util.concurrent pieces"
              fresherHint={false}
              steps={[
                { title: 'ConcurrentHashMap', sub: 'thread-safe map' },
                { title: 'AtomicInteger', sub: 'CAS counters' },
                { title: 'ExecutorService', sub: 'task pools' },
                { title: 'Lock', sub: 'tryLock, fair' }
              ]}
            />
          </SyncDiagramFrame>
          <p className="sync-caption">These build on the same memory rules but give clearer APIs than raw synchronized for many designs.</p>
        </div>
      )}
    </div>
  );
}
