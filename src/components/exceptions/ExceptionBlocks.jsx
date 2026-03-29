/** Shared layout for Java Exception Handling showcases (beginner-friendly). */
export function ExceptionHero({ eyebrow, title, subtitle }) {
  return (
    <div className="exc-hero">
      <span className="exc-eyebrow">{eyebrow}</span>
      <h2 className="exc-title">{title}</h2>
      <p className="exc-subtitle">{subtitle}</p>
    </div>
  );
}

export function ExceptionWhyGrid({ items }) {
  return (
    <div className="exc-why-grid" role="list">
      {items.map((item, i) => (
        <div key={item.title} className="exc-why-card" role="listitem">
          <span className="exc-why-num" aria-hidden="true">
            {i + 1}
          </span>
          <div className="exc-why-body">
            <strong className="exc-why-card-title">{item.title}</strong>
            <p className="exc-why-card-text">{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ExceptionDiagramFrame({ children, label }) {
  return (
    <div className="exc-diagram-frame" aria-label={label || 'Diagram'}>
      {children}
    </div>
  );
}

export function ExceptionCallout({ variant = 'tip', title, children }) {
  return (
    <div className={`exc-callout exc-callout--${variant}`}>
      <strong className="exc-callout-title">{title}</strong>
      <div className="exc-callout-body">{children}</div>
    </div>
  );
}
