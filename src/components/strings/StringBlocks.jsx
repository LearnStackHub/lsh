/** Shared layout for Java Strings tutorial showcases (beginner-friendly). */
export function StringHero({ eyebrow, title, subtitle }) {
  return (
    <div className="str-hero">
      <span className="str-eyebrow">{eyebrow}</span>
      <h2 className="str-title">{title}</h2>
      <p className="str-subtitle">{subtitle}</p>
    </div>
  );
}

export function StringWhyGrid({ items }) {
  return (
    <div className="str-why-grid" role="list">
      {items.map((item, i) => (
        <div key={item.title} className="str-why-card" role="listitem">
          <span className="str-why-num" aria-hidden="true">
            {i + 1}
          </span>
          <div className="str-why-body">
            <strong className="str-why-card-title">{item.title}</strong>
            <p className="str-why-card-text">{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function StringDiagramFrame({ children, label }) {
  return (
    <div className="str-diagram-frame" aria-label={label || 'Diagram'}>
      {children}
    </div>
  );
}

export function StringCallout({ variant = 'tip', title, children }) {
  return (
    <div className={`str-callout str-callout--${variant}`}>
      <strong className="str-callout-title">{title}</strong>
      <div className="str-callout-body">{children}</div>
    </div>
  );
}
