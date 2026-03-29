/** Shared layout for Java Serialization showcases */
export function SerHero({ eyebrow, title, subtitle }) {
  return (
    <div className="ser-hero">
      <span className="ser-eyebrow">{eyebrow}</span>
      <h2 className="ser-title">{title}</h2>
      <p className="ser-subtitle">{subtitle}</p>
    </div>
  );
}

export function SerWhyGrid({ items }) {
  return (
    <div className="ser-why-grid" role="list">
      {items.map((item, i) => (
        <div key={item.title} className="ser-why-card" role="listitem">
          <span className="ser-why-num" aria-hidden="true">
            {i + 1}
          </span>
          <div className="ser-why-body">
            <strong className="ser-why-card-title">{item.title}</strong>
            <p className="ser-why-card-text">{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function SerDiagramFrame({ children, label }) {
  return (
    <div className="ser-diagram-frame" aria-label={label || 'Diagram'}>
      {children}
    </div>
  );
}

export function SerCallout({ variant = 'tip', title, children }) {
  return (
    <div className={`ser-callout ser-callout--${variant}`}>
      <strong className="ser-callout-title">{title}</strong>
      <div className="ser-callout-body">{children}</div>
    </div>
  );
}
