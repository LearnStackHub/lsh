/** Shared metadata builder for Spring AI modules */
export const makeSpringAiTopic = (id, title, description, headline, opener, outcomes, project, flow, content) => ({
  id,
  title,
  description,
  springAiHeadline: headline,
  springAiOpener: opener,
  springAiSummary: description,
  springAiOutcomes: outcomes,
  springAiDesk: project,
  springAiFlow: flow,
  content
});

export default makeSpringAiTopic;
