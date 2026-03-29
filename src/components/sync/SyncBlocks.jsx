/** Shared layout for Java Synchronization showcases */
export function SyncHero({ eyebrow, title, subtitle }) {
  return (
    <div className="sync-hero">
      <span className="sync-eyebrow">{eyebrow}</span>
      <h2 className="sync-title">{title}</h2>
      <p className="sync-subtitle">{subtitle}</p>
    </div>
  );
}

export function SyncWhyGrid({ items }) {
  return (
    <div className="sync-why-grid" role="list">
      {items.map((item, i) => (
        <div key={item.title} className="sync-why-card" role="listitem">
          <span className="sync-why-num" aria-hidden="true">
            {i + 1}
          </span>
          <div className="sync-why-body">
            <strong className="sync-why-card-title">{item.title}</strong>
            <p className="sync-why-card-text">{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function SyncDiagramFrame({ children, label }) {
  return (
    <div className="sync-diagram-frame" aria-label={label || 'Diagram'}>
      {children}
    </div>
  );
}

export function SyncCallout({ variant = 'tip', title, children }) {
  return (
    <div className={`sync-callout sync-callout--${variant}`}>
      <strong className="sync-callout-title">{title}</strong>
      <div className="sync-callout-body">{children}</div>
    </div>
  );
}
