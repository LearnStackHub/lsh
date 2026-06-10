function SpringAiLesson({ topic, renderContent }) {
  const headline = topic?.springAiHeadline || topic?.title;
  const opener = topic?.springAiOpener;
  const lead = topic?.springAiSummary || topic?.description;
  const scenario = topic?.springAiScenario || topic?.springAiDesk;
  const steps = topic?.springAiSteps || topic?.springAiFlow || [];
  const takeaways = topic?.springAiTakeaways || topic?.springAiOutcomes || [];
  const scenarioPoints = scenario?.points || scenario?.checks || [];

  return (
    <article className="sai-lesson">
      <header className="sai-lesson-header">
        <p className="sai-lesson-meta">Spring AI learning path</p>
        <h2 className="sai-lesson-title">{headline}</h2>
        {opener ? (
          <p className="sai-lesson-opener">{opener}</p>
        ) : (
          lead && <p className="sai-lesson-lead">{lead}</p>
        )}
      </header>

      {scenario && (
        <aside className="sai-scenario" aria-label="Workplace scenario">
          <p className="sai-section-tag">Picture this at work</p>
          <h3>{scenario.title}</h3>
          <p>{scenario.body}</p>
          {scenarioPoints.length > 0 && (
            <ul className="sai-scenario-list">
              {scenarioPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          )}
        </aside>
      )}

      {steps.length > 0 && (
        <section className="sai-steps" aria-label="Module outline">
          <h3 className="sai-steps-title">What we cover in this module</h3>
          <ol className="sai-steps-list">
            {steps.map((step) => (
              <li key={step.title}>
                <p className="sai-step-name">{step.title}</p>
                <p className="sai-step-detail">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>
      )}

      {takeaways.length > 0 && (
        <section className="sai-takeaways" aria-label="Learning outcomes">
          <h3 className="sai-takeaways-title">After this module, you should be able to explain</h3>
          <ul>
            {takeaways.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      <div className="sai-lesson-body">
        {renderContent(topic?.content)}
      </div>
    </article>
  );
}

export default SpringAiLesson;
