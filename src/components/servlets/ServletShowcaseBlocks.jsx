/** Shared layout for Servlet tutorial showcase */
export function ServletHero({ eyebrow, title, subtitle }) {
  return (
    <div className="servlet-hero">
      <span className="servlet-eyebrow">{eyebrow}</span>
      <h2 className="servlet-title">{title}</h2>
      <p className="servlet-subtitle">{subtitle}</p>
    </div>
  );
}

export function ServletWhyGrid({ items }) {
  return (
    <div className="servlet-why-grid" role="list">
      {items.map((item, i) => (
        <div key={item.title} className="servlet-why-card" role="listitem">
          <span className="servlet-why-num" aria-hidden="true">
            {i + 1}
          </span>
          <div className="servlet-why-body">
            <strong className="servlet-why-card-title">{item.title}</strong>
            <p className="servlet-why-card-text">{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ServletDiagramFrame({ children, label }) {
  return (
    <div className="servlet-diagram-frame" aria-label={label || 'Diagram'}>
      {children}
    </div>
  );
}

export function ServletCallout({ variant = 'tip', title, children }) {
  return (
    <div className={`servlet-callout servlet-callout--${variant}`}>
      <strong className="servlet-callout-title">{title}</strong>
      <div className="servlet-callout-body">{children}</div>
    </div>
  );
}
