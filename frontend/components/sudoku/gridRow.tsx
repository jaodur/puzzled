import * as React from 'react';
import { FullPuzzleInterface, GridRowInterface, SudokuTableDataInterface } from '../interfaces';

function TableData({ indexKey, puzzle, keyDown, decorateFunc, clickFunc }: SudokuTableDataInterface) {
    function fillValue() {
        const val = puzzle.puzzle[puzzle.mainPuzzleKey][puzzle.secPuzzleKey];
        if (val !== 0) {
            return val;
        }
        return null;
    }
    return (
        <td
            className={decorateFunc('table-data', puzzle.mainPuzzleKey, puzzle.secPuzzleKey)}
            onKeyDown={keyDown(puzzle.mainPuzzleKey, puzzle.secPuzzleKey)}
            onClick={clickFunc(puzzle.mainPuzzleKey, puzzle.secPuzzleKey)}
            tabIndex={-1}
            key={indexKey}>
            {fillValue()}
        </td>
    );
}

function GridRow({ numItems, sudokuGridClass, puzzle, keyDown, decorateFunc, clickFunc }: GridRowInterface) {
    function CreateTableData(num: number) {
        const cells = [];
        for (let i = 0; i < num; i++) {
            const newPuzzle: FullPuzzleInterface = {
                puzzle: puzzle.puzzle,
                mainPuzzleKey: puzzle.mainPuzzleKey,
                secPuzzleKey: i,
            };
            cells.push(
                <TableData
                    puzzle={newPuzzle}
                    keyDown={keyDown}
                    clickFunc={clickFunc}
                    decorateFunc={decorateFunc}
                    indexKey={`table-data-${i}`}
                    key={`table-row-${i}`}
                />
            );
        }

        return cells.map(cell => cell);
    }

    return <tr className={`${sudokuGridClass}__grid_table_row`}>{CreateTableData(numItems)}</tr>;
}

export { GridRow };
