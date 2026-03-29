/** Shared layout for Java Multithreading showcases */
export function ThreadHero({ eyebrow, title, subtitle }) {
  return (
    <div className="thr-hero">
      <span className="thr-eyebrow">{eyebrow}</span>
      <h2 className="thr-title">{title}</h2>
      <p className="thr-subtitle">{subtitle}</p>
    </div>
  );
}

export function ThreadWhyGrid({ items }) {
  return (
    <div className="thr-why-grid" role="list">
      {items.map((item, i) => (
        <div key={item.title} className="thr-why-card" role="listitem">
          <span className="thr-why-num" aria-hidden="true">
            {i + 1}
          </span>
          <div className="thr-why-body">
            <strong className="thr-why-card-title">{item.title}</strong>
            <p className="thr-why-card-text">{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ThreadDiagramFrame({ children, label }) {
  return (
    <div className="thr-diagram-frame" aria-label={label || 'Diagram'}>
      {children}
    </div>
  );
}

export function ThreadCallout({ variant = 'tip', title, children }) {
  return (
    <div className={`thr-callout thr-callout--${variant}`}>
      <strong className="thr-callout-title">{title}</strong>
      <div className="thr-callout-body">{children}</div>
    </div>
  );
}
