/** Shared layout for Hibernate tutorial showcases */
export function HibernateHero({ eyebrow, title, subtitle }) {
  return (
    <div className="hibernate-hero">
      <span className="hibernate-eyebrow">{eyebrow}</span>
      <h2 className="hibernate-title">{title}</h2>
      <p className="hibernate-subtitle">{subtitle}</p>
    </div>
  );
}

export function HibernateWhyGrid({ items }) {
  return (
    <div className="hibernate-why-grid" role="list">
      {items.map((item, i) => (
        <div key={item.title} className="hibernate-why-card" role="listitem">
          <span className="hibernate-why-num" aria-hidden="true">
            {i + 1}
          </span>
          <div className="hibernate-why-body">
            <strong className="hibernate-why-card-title">{item.title}</strong>
            <p className="hibernate-why-card-text">{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function HibernateDiagramFrame({ children, label }) {
  return (
    <div className="hibernate-diagram-frame" aria-label={label || 'Diagram'}>
      {children}
    </div>
  );
}

export function HibernateCallout({ variant = 'tip', title, children }) {
  return (
    <div className={`hibernate-callout hibernate-callout--${variant}`}>
      <strong className="hibernate-callout-title">{title}</strong>
      <div className="hibernate-callout-body">{children}</div>
    </div>
  );
}
