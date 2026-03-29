/**
 * Shared layout blocks for Control Flow tutorial showcases (beginner-friendly, richer UI).
 */
export function ControlFlowHero({ eyebrow, title, subtitle }) {
  return (
    <div className="cf-hero">
      <span className="cf-eyebrow">{eyebrow}</span>
      <h2 className="cf-title">{title}</h2>
      <p className="cf-subtitle">{subtitle}</p>
    </div>
  );
}

export function ControlFlowWhyGrid({ items }) {
  return (
    <div className="cf-why-grid" role="list">
      {items.map((item, i) => (
        <div key={item.title} className="cf-why-card" role="listitem">
          <span className="cf-why-num" aria-hidden="true">
            {i + 1}
          </span>
          <div className="cf-why-body">
            <strong className="cf-why-card-title">{item.title}</strong>
            <p className="cf-why-card-text">{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function CfDiagramFrame({ children, label }) {
  return (
    <div className="cf-diagram-frame" aria-label={label || 'Diagram'}>
      {children}
    </div>
  );
}

export function CfCallout({ variant = 'tip', title, children }) {
  return (
    <div className={`cf-callout cf-callout--${variant}`}>
      <strong className="cf-callout-title">{title}</strong>
      <div className="cf-callout-body">{children}</div>
    </div>
  );
}
