/** Shared layout for JSP tutorial showcase */
export function JspHero({ eyebrow, title, subtitle }) {
  return (
    <div className="jsp-hero">
      <span className="jsp-eyebrow">{eyebrow}</span>
      <h2 className="jsp-title">{title}</h2>
      <p className="jsp-subtitle">{subtitle}</p>
    </div>
  );
}

export function JspWhyGrid({ items }) {
  return (
    <div className="jsp-why-grid" role="list">
      {items.map((item, i) => (
        <div key={item.title} className="jsp-why-card" role="listitem">
          <span className="jsp-why-num" aria-hidden="true">
            {i + 1}
          </span>
          <div className="jsp-why-body">
            <strong className="jsp-why-card-title">{item.title}</strong>
            <p className="jsp-why-card-text">{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function JspDiagramFrame({ children, label }) {
  return (
    <div className="jsp-diagram-frame" aria-label={label || 'Diagram'}>
      {children}
    </div>
  );
}

export function JspCallout({ variant = 'tip', title, children }) {
  return (
    <div className={`jsp-callout jsp-callout--${variant}`}>
      <strong className="jsp-callout-title">{title}</strong>
      <div className="jsp-callout-body">{children}</div>
    </div>
  );
}
