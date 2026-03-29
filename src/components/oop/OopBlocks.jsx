/** Shared visual blocks for OOP showcases. */
export function OopHero({ eyebrow, title, subtitle }) {
  return (
    <div className="oop-hero">
      <span className="oop-eyebrow">{eyebrow}</span>
      <h2 className="oop-title">{title}</h2>
      <p className="oop-subtitle">{subtitle}</p>
    </div>
  );
}

export function OopWhyGrid({ items }) {
  return (
    <div className="oop-why-grid" role="list">
      {items.map((item, i) => (
        <div key={item.title} className="oop-why-card" role="listitem">
          <span className="oop-why-num" aria-hidden="true">
            {i + 1}
          </span>
          <div className="oop-why-body">
            <strong className="oop-why-title">{item.title}</strong>
            <p className="oop-why-text">{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function OopDiagramFrame({ children, label }) {
  return (
    <div className="oop-diagram-frame" aria-label={label || 'Diagram'}>
      {children}
    </div>
  );
}

export function OopCallout({ variant = 'tip', title, children }) {
  return (
    <div className={`oop-callout oop-callout--${variant}`}>
      <strong className="oop-callout-title">{title}</strong>
      <div className="oop-callout-body">{children}</div>
    </div>
  );
}
