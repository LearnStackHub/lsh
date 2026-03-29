import { useState } from 'react';
import { ArrayHero, ArrayWhyGrid, ArrayDiagramFrame, ArrayCallout } from './arrays/ArrayBlocks';
import { Array2DGridDiagram, HorizontalPipeline } from './flow/ProfessionalDiagrams';

const TABS = [
  ['grid', 'Row & column'],
  ['loops', 'Nested loops'],
  ['jagged', 'Jagged arrays']
];

const WHY = [
  {
    title: 'Two indexes',
    text: 'A 2D array is often an “array of rows.” First index selects the row, second selects the column—like seats in a theater.'
  },
  {
    title: 'Matrices & tables',
    text: 'Grids, game boards, and spreadsheets map naturally to int[row][col]. Think which dimension is outer in your loop.'
  },
  {
    title: 'Not always rectangular',
    text: 'In Java, int[][] can be jagged: each row can have a different length. Algorithms must respect that when you go advanced.'
  }
];

export default function MultiDimensionalArrayShowcase() {
  const [tab, setTab] = useState('grid');
  return (
    <div className="arr-showcase">
      <ArrayHero
        eyebrow="2D arrays"
        title="Multi-dimensional arrays"
        subtitle="Add another index when data is naturally two-dimensional. The first bracket often walks rows, the second walks columns—match that mental picture to your problem."
      />
      <ArrayWhyGrid items={WHY} />

      <div className="arr-tabs">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" className={`arr-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'grid' && (
        <div className="arr-panel">
          <ArrayDiagramFrame label="3 by 4 grid">
            <Array2DGridDiagram />
          </ArrayDiagramFrame>
        </div>
      )}

      {tab === 'loops' && (
        <div className="arr-panel">
          <ArrayDiagramFrame label="Visit every cell">
            <HorizontalPipeline
              title="Nested loop order (row-major)"
              fresherHint={false}
              steps={[
                { title: 'for each row r', sub: 'outer loop' },
                { title: 'for each col c', sub: 'inner loop' },
                { title: 'use m[r][c]', sub: 'one cell' },
                { title: 'end inner', sub: 'next row' }
              ]}
            />
          </ArrayDiagramFrame>
          <p className="arr-caption">Row-major means you finish one full row before moving down—common for printing a matrix.</p>
        </div>
      )}

      {tab === 'jagged' && (
        <div className="arr-panel">
          <ArrayDiagramFrame label="Jagged idea">
            <HorizontalPipeline
              title="Jagged vs rectangular"
              fresherHint={false}
              steps={[
                { title: 'int[3][4]', sub: 'every row same len' },
                { title: 'int[3][]', sub: 'row lengths differ' },
                { title: 'new int[3][]', sub: 'then new each row' },
                { title: 'check length', sub: 'row[i].length' }
              ]}
            />
          </ArrayDiagramFrame>
          <ArrayCallout variant="tip" title="Beginner focus">
            Master rectangular matrices first. Jagged arrays appear in contests and advanced APIs—come back once 2D loops feel easy.
          </ArrayCallout>
        </div>
      )}
    </div>
  );
}
