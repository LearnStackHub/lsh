/** Shared layout for Spring Framework tutorial showcases */
export function SpringFrameworkHero({ eyebrow, title, subtitle }) {
  return (
    <div className="sf-hero">
      <span className="sf-eyebrow">{eyebrow}</span>
      <h2 className="sf-title">{title}</h2>
      <p className="sf-subtitle">{subtitle}</p>
    </div>
  );
}

export function SpringFrameworkWhyGrid({ items }) {
  return (
    <div className="sf-why-grid" role="list">
      {items.map((item, i) => (
        <div key={item.title} className="sf-why-card" role="listitem">
          <span className="sf-why-num" aria-hidden="true">
            {i + 1}
          </span>
          <div className="sf-why-body">
            <strong className="sf-why-card-title">{item.title}</strong>
            <p className="sf-why-card-text">{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function SpringFrameworkDiagramFrame({ children, label }) {
  return (
    <div className="sf-diagram-frame" aria-label={label || 'Diagram'}>
      {children}
    </div>
  );
}

export function SpringFrameworkCallout({ variant = 'tip', title, children }) {
  return (
    <div className={`sf-callout sf-callout--${variant}`}>
      <strong className="sf-callout-title">{title}</strong>
      <div className="sf-callout-body">{children}</div>
    </div>
  );
}
