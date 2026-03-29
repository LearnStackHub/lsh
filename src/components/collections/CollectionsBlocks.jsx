/** Shared layout for Java Collections Framework showcases (beginner-friendly). */
export function CollectionsHero({ eyebrow, title, subtitle }) {
  return (
    <div className="coll-hero">
      <span className="coll-eyebrow">{eyebrow}</span>
      <h2 className="coll-title">{title}</h2>
      <p className="coll-subtitle">{subtitle}</p>
    </div>
  );
}

export function CollectionsWhyGrid({ items }) {
  return (
    <div className="coll-why-grid" role="list">
      {items.map((item, i) => (
        <div key={item.title} className="coll-why-card" role="listitem">
          <span className="coll-why-num" aria-hidden="true">
            {i + 1}
          </span>
          <div className="coll-why-body">
            <strong className="coll-why-card-title">{item.title}</strong>
            <p className="coll-why-card-text">{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function CollectionsDiagramFrame({ children, label }) {
  return (
    <div className="coll-diagram-frame" aria-label={label || 'Diagram'}>
      {children}
    </div>
  );
}

export function CollectionsCallout({ variant = 'tip', title, children }) {
  return (
    <div className={`coll-callout coll-callout--${variant}`}>
      <strong className="coll-callout-title">{title}</strong>
      <div className="coll-callout-body">{children}</div>
    </div>
  );
}
