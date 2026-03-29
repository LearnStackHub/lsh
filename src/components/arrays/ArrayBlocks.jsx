/** Shared layout for Java Arrays tutorial showcases (beginner-friendly). */
export function ArrayHero({ eyebrow, title, subtitle }) {
  return (
    <div className="arr-hero">
      <span className="arr-eyebrow">{eyebrow}</span>
      <h2 className="arr-title">{title}</h2>
      <p className="arr-subtitle">{subtitle}</p>
    </div>
  );
}

export function ArrayWhyGrid({ items }) {
  return (
    <div className="arr-why-grid" role="list">
      {items.map((item, i) => (
        <div key={item.title} className="arr-why-card" role="listitem">
          <span className="arr-why-num" aria-hidden="true">
            {i + 1}
          </span>
          <div className="arr-why-body">
            <strong className="arr-why-card-title">{item.title}</strong>
            <p className="arr-why-card-text">{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ArrayDiagramFrame({ children, label }) {
  return (
    <div className="arr-diagram-frame" aria-label={label || 'Diagram'}>
      {children}
    </div>
  );
}

export function ArrayCallout({ variant = 'tip', title, children }) {
  return (
    <div className={`arr-callout arr-callout--${variant}`}>
      <strong className="arr-callout-title">{title}</strong>
      <div className="arr-callout-body">{children}</div>
    </div>
  );
}
