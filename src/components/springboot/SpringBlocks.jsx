/** Shared layout for Spring Boot tutorial showcases */
export function SpringHero({ eyebrow, title, subtitle }) {
  return (
    <div className="sb-hero">
      <span className="sb-eyebrow">{eyebrow}</span>
      <h2 className="sb-title">{title}</h2>
      <p className="sb-subtitle">{subtitle}</p>
    </div>
  );
}

export function SpringWhyGrid({ items }) {
  return (
    <div className="sb-why-grid" role="list">
      {items.map((item, i) => (
        <div key={item.title} className="sb-why-card" role="listitem">
          <span className="sb-why-num" aria-hidden="true">
            {i + 1}
          </span>
          <div className="sb-why-body">
            <strong className="sb-why-card-title">{item.title}</strong>
            <p className="sb-why-card-text">{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function SpringDiagramFrame({ children, label }) {
  return (
    <div className="sb-diagram-frame" aria-label={label || 'Diagram'}>
      {children}
    </div>
  );
}

export function SpringCallout({ variant = 'tip', title, children }) {
  return (
    <div className={`sb-callout sb-callout--${variant}`}>
      <strong className="sb-callout-title">{title}</strong>
      <div className="sb-callout-body">{children}</div>
    </div>
  );
}
