import { MySQLHero, MySQLWhyGrid, MySQLDiagramFrame } from './MySQLShowcaseBlocks';
import { MySQLNestedLoopJoinScenarioDiagram } from '../flow/ProfessionalDiagrams';

const WHY = [
  { title: 'Nested loops', text: 'The classic mental model: for each outer row, find matches in the inner table.' },
  { title: 'Optimizer choice', text: 'MySQL may pick block nested loop, hash join (8.0+), or other strategies — EXPLAIN shows the actual plan.' },
  { title: 'N+1 smell', text: 'ORM loops that issue one query per parent row mirror this diagram badly — prefer joins or batching.' }
];

export default function MySQLJoinsShowcase() {
  return (
    <div className="mysql-showcase">
      <MySQLHero
        eyebrow="MySQL · Joins"
        title="Joins — nested-loop scenario"
        subtitle="How INNER JOIN work is reasoned about in production tuning and senior interviews."
      />
      <MySQLWhyGrid items={WHY} />
      <div className="mysql-panel">
        <MySQLDiagramFrame label="Outer × inner → result">
          <MySQLNestedLoopJoinScenarioDiagram />
        </MySQLDiagramFrame>
      </div>
    </div>
  );
}
