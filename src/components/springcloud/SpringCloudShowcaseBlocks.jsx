/** Shared layout for Spring Cloud tutorial showcases */
export function SpringCloudHero({ eyebrow, title, subtitle }) {
  return (
    <div className="sc-hero">
      <span className="sc-eyebrow">{eyebrow}</span>
      <h2 className="sc-title">{title}</h2>
      <p className="sc-subtitle">{subtitle}</p>
    </div>
  );
}

export function SpringCloudWhyGrid({ items }) {
  return (
    <div className="sc-why-grid" role="list">
      {items.map((item, i) => (
        <div key={item.title} className="sc-why-card" role="listitem">
          <span className="sc-why-num" aria-hidden="true">
            {i + 1}
          </span>
          <div className="sc-why-body">
            <strong className="sc-why-card-title">{item.title}</strong>
            <p className="sc-why-card-text">{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function SpringCloudDiagramFrame({ children, label }) {
  return (
    <div className="sc-diagram-frame" aria-label={label || 'Diagram'}>
      {children}
    </div>
  );
}

export function SpringCloudCallout({ variant = 'tip', title, children }) {
  return (
    <div className={`sc-callout sc-callout--${variant}`}>
      <strong className="sc-callout-title">{title}</strong>
      <div className="sc-callout-body">{children}</div>
    </div>
  );
}
