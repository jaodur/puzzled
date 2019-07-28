import * as React from "react";
import { keyInterface, gridRowInterface, puzzleInterface } from '../interfaces'

function TableData({ indexKey, puzzle, keyDown }: keyInterface) {

    function fillValue() {
        let val = puzzle.puzzle[puzzle.mainPuzzleKey][puzzle.secPuzzleKey];
        if (val !== 0){
            return val;
        }
        return null;
    }
    return (
        <td onKeyDown={keyDown(puzzle.mainPuzzleKey, puzzle.secPuzzleKey)} tabIndex={ -1 } key={indexKey}>
            { fillValue() }
        </td>
    )
}

function GridRow({ numItems, sudokuGridClass, puzzle, keyDown }: gridRowInterface) {

    function CreateTableData(num: number) {
        let cells = Array();
        for(let i = 0; i < num; i++){
            let newPuzzle: puzzleInterface = {puzzle: puzzle.puzzle, mainPuzzleKey: puzzle.mainPuzzleKey, secPuzzleKey: i };
            cells.push(<TableData puzzle={ newPuzzle } keyDown={keyDown} indexKey={ `table-data-${i}` }/>)
        }

        return cells.map(cell=>cell);
    }

    return (


        <tr className={ `${ sudokuGridClass }__grid_table_row` }>{ CreateTableData(numItems) }</tr>

    )
}

export { GridRow }
