import * as React from "react";
import { GridRow } from './gridRow'
import { gridInterface, eventInterface, puzzleInterface } from '../interfaces'
import * as _ from 'lodash';
import { Mutation, MutationFunc } from "react-apollo";
import { SOLVE_SUDOKU_MUTATION } from '../../graphql/mutations/sudoku'

function SudokuGrid({ type }: gridInterface) {

    const [ gridState, changeGridState ] = React.useState({ type: type, gridNums: getGridNums(type) });
    const [puzzle, setPuzzle] = React.useState(createDefaultPuzzle(gridState.gridNums));

    let sudokuGridClass: string = `sudoku-grid-${gridState.type}`;

    function createDefaultPuzzle(gridNum: number){
        let finalArray = [];
        for (let i=0; i < gridNum; i++) {
            let templateArray = _.fill(Array(gridNum), 0);
            finalArray.push(templateArray)
        }
        return finalArray;
    }

    function getGridNums(number?: number): number {
        if (number) {
            return number != 1 ?  number * number : 2;
        }
        return gridState.type != 1 ?  gridState.type * gridState.type : 2;
    }

    function updatePuzzleValue(row: number, col: number, val: string) {
        let newPuzzle = puzzle.slice();
        newPuzzle[row][col] = parseInt(val, 10);
        return newPuzzle

    }

    function CreateTableRow(num: number, keyDown: any) {
        let cells = Array();
        for(let i = 0; i < num; i++){
            let puzzleObj: puzzleInterface = { puzzle: puzzle, mainPuzzleKey: i };
            cells.push(<GridRow puzzle={ puzzleObj } keyDown={ keyDown } numItems={ num } sudokuGridClass={ sudokuGridClass } key={`table-row-${ i }`}/>);
        }

        return cells.map(cell=>cell);
    }

    function selectOnChange(event: eventInterface) {

        let newType: number = event.target.value;
        setPuzzle(createDefaultPuzzle(getGridNums(newType)));
        changeGridState({type: newType, gridNums: getGridNums(newType)});
    }

    function onKeyDown(row:number, col:number) {

        return function keyDown(event: eventInterface) {
            setPuzzle(updatePuzzleValue(row, col, event.key));
        }
    }

    function solvePuzzle(solve: MutationFunc) {
        return function (event: eventInterface) {
            event.preventDefault();
            solve({
                variables: {
                    puzzle: puzzle,
                    pType: gridState.type

                }
            }).then((response:any) => {
                setPuzzle(response.data.solveSudoku.puzzle);
            });
        }
    }

    function clearPuzzle(event: eventInterface) {
        event.preventDefault();
        setPuzzle(createDefaultPuzzle(getGridNums(gridState.type)))
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
                <Mutation  mutation={ SOLVE_SUDOKU_MUTATION } >
                    {(solvePuzzleCallBack: MutationFunc) => (
                        <button onClick={ solvePuzzle(solvePuzzleCallBack) }>Solve</button>

                    )}
                </Mutation>
                <button onClick={ clearPuzzle }>clear</button>
            </div>
            <div className={ `${ sudokuGridClass }__grid_wrapper` }>

                <table className={ `${ sudokuGridClass }__grid_table` }>
                    <tbody>

                        { CreateTableRow( gridState.gridNums, onKeyDown ) }

                    </tbody>
                </table>
            </div>
        </React.Fragment>

    )
}

export { SudokuGrid };
