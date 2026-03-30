/** Shared layout for JDBC tutorial showcases — blue #4479A1 */
export function JdbcHero({ eyebrow, title, subtitle }) {
  return (
    <div className="jdbc-hero">
      <span className="jdbc-eyebrow">{eyebrow}</span>
      <h2 className="jdbc-title">{title}</h2>
      <p className="jdbc-subtitle">{subtitle}</p>
    </div>
  );
}

export function JdbcWhyGrid({ items }) {
  return (
    <div className="jdbc-why-grid" role="list">
      {items.map((item, i) => (
        <div key={item.title} className="jdbc-why-card" role="listitem">
          <span className="jdbc-why-num" aria-hidden="true">
            {i + 1}
          </span>
          <div className="jdbc-why-body">
            <strong className="jdbc-why-card-title">{item.title}</strong>
            <p className="jdbc-why-card-text">{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function JdbcDiagramFrame({ children, label }) {
  return (
    <div className="jdbc-diagram-frame" aria-label={label || 'Diagram'}>
      {children}
    </div>
  );
}

export function JdbcCallout({ variant = 'tip', title, children }) {
  return (
    <div className={`jdbc-callout jdbc-callout--${variant}`}>
      <strong className="jdbc-callout-title">{title}</strong>
      <div className="jdbc-callout-body">{children}</div>
    </div>
  );
}
