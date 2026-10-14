import { buildExamQuestionDisplay, parseExamQuestion } from '../formatExamQuestion';

export default function ExamQuestionBody({ text }) {
  const display = buildExamQuestionDisplay(parseExamQuestion(text));

  return (
    <div className="rex-question-body">
      {display.lead ? <p className="rex-q-stem">{display.lead}</p> : null}
      {display.code ? <pre className="rex-question-code">{display.code}</pre> : null}
      {display.follow ? <p className="rex-q-stem rex-q-stem--follow">{display.follow}</p> : null}
    </div>
  );
}
