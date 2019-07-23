import * as React from "react";
import { GridRow } from './gridRow'

interface SudokuGridInterface {
    num: number
}

interface event {
    target: any
}


function SudokuGrid({ num }: SudokuGridInterface) {

    const [ gridState, changeGridState ] = React.useState({ num:num, gridNums: getGridNums(num) });

    let sudokuGridClass: string = `sudoku-grid-${gridState.num}`;

    function getGridNums(number?: number): number {
        if (number) {
            return number != 1 ?  number * number : 2;
        }
        return num != 1 ?  num * num : 2;
    }

    function CreateTableRow(num: number) {
        let cells = Array();
        for(let i = 0; i < num; i++){
            cells.push(<GridRow numItems={num} sudokuGridClass={ sudokuGridClass } key={`table-row-${i}`}/>);

        }

        return cells.map(cell=>cell);
    }

    function selectOnChange(event: event) {

        let newNum: number = event.target.value;
        changeGridState({num: newNum, gridNums: getGridNums(newNum)});
    }

    return (
        <React.Fragment>
            <div className={ `${ sudokuGridClass }__grid_type` }>
                <div>
                    Type:
                    <select onChange={ selectOnChange }>
                        <option value={ 1 }>1x1</option>
                        <option value={ 2 }>2x2</option>
                        <option value={ 3 } selected>3x3</option>
                        <option value={ 4 }>4x4</option>
                    </select>
                </div>
            </div>
            <div className={ `${ sudokuGridClass }__grid_wrapper` }>

                <table className={ `${ sudokuGridClass }__grid_table` }>
                    <tbody>

                        { CreateTableRow( gridState.gridNums ) }

                    </tbody>
                </table>
            </div>
        </React.Fragment>
    )
}

export { SudokuGrid };
