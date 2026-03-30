/** Shared layout for MySQL tutorial showcases — teal / dolphin palette */
export function MySQLHero({ eyebrow, title, subtitle }) {
  return (
    <div className="mysql-hero">
      <span className="mysql-eyebrow">{eyebrow}</span>
      <h2 className="mysql-title">{title}</h2>
      <p className="mysql-subtitle">{subtitle}</p>
    </div>
  );
}

export function MySQLWhyGrid({ items }) {
  return (
    <div className="mysql-why-grid" role="list">
      {items.map((item, i) => (
        <div key={item.title} className="mysql-why-card" role="listitem">
          <span className="mysql-why-num" aria-hidden="true">
            {i + 1}
          </span>
          <div className="mysql-why-body">
            <strong className="mysql-why-card-title">{item.title}</strong>
            <p className="mysql-why-card-text">{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function MySQLDiagramFrame({ children, label }) {
  return (
    <div className="mysql-diagram-frame" aria-label={label || 'Diagram'}>
      {children}
    </div>
  );
}

export function MySQLCallout({ variant = 'tip', title, children }) {
  return (
    <div className={`mysql-callout mysql-callout--${variant}`}>
      <strong className="mysql-callout-title">{title}</strong>
      <div className="mysql-callout-body">{children}</div>
    </div>
  );
}
