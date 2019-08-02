import * as React from "react";
import { sudokuTableDataInterface, gridRowInterface, fullPuzzleInterface } from '../interfaces'

function TableData({ indexKey, puzzle, keyDown, decorateFunc }: sudokuTableDataInterface) {

    function fillValue() {
        let val = puzzle.puzzle[puzzle.mainPuzzleKey][puzzle.secPuzzleKey];
        if (val !== 0){
            return val;
        }
        return null;
    }
    return (
        <td
            className={ decorateFunc('table-data', puzzle.mainPuzzleKey, puzzle.secPuzzleKey) }
            onKeyDown={keyDown(puzzle.mainPuzzleKey, puzzle.secPuzzleKey)}
            tabIndex={ -1 } key={indexKey}
        >
            { fillValue() }
        </td>
    )
}

function GridRow({ numItems, sudokuGridClass, puzzle, keyDown, decorateFunc }: gridRowInterface) {

    function CreateTableData(num: number) {
        let cells = Array();
        for(let i = 0; i < num; i++){
            let newPuzzle: fullPuzzleInterface = {
                puzzle: puzzle.puzzle, mainPuzzleKey: puzzle.mainPuzzleKey, secPuzzleKey: i
            };
            cells.push(
                <TableData
                    puzzle={ newPuzzle }
                    keyDown={keyDown}
                    decorateFunc = { decorateFunc }
                    indexKey={ `table-data-${i}` }
                    key={`table-row-${i}`}
                />)
        }

        return cells.map(cell=>cell);
    }

    return (


        <tr className={ `${ sudokuGridClass }__grid_table_row` }>{ CreateTableData(numItems) }</tr>

    )
}

export { GridRow }
