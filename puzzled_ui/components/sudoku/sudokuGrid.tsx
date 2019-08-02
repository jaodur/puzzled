import * as React from "react";
import { GridRow } from './gridRow'
import { gridInterface, eventInterface, fullPuzzleInterface } from '../interfaces'
import * as _ from 'lodash';
import { Mutation, MutationFunc } from "react-apollo";
import { SOLVE_SUDOKU_MUTATION } from '../../graphql/mutations/sudoku'

const defaultSudokuType: number = 3;
const deleteKeyCode: number = 8;
const baseTenRadix: number = 10;

function SudokuGrid({ type }: gridInterface) {

    const [ gridState, changeGridState ] = React.useState({ type: type, gridNums: getGridNums(type) });
    const [puzzle, setPuzzle] = React.useState(createDefaultPuzzle(gridState.gridNums));
    const [originalPuzzle, setOriginalPuzzle] = React.useState(createDefaultPuzzle(gridState.gridNums));

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

    function validateInput(row: number, col: number, inputNum: number){

        function getInnerGrid(row: number, col: number) {
            let rowStart: number = Math.floor(row / gridState.type) * gridState.type;
            let colStart: number = Math.floor(col / gridState.type) * gridState.type;

            return _.flattenDeep(
                Array.from(
                    puzzle.slice(rowStart, rowStart + gridState.type).map(
                    innerArr => innerArr.slice(colStart, colStart + gridState.type )
                    )
                )
            );
        }

        function getAllRelatedGridValues(row: number, col: number){
            let colArr: number[][] = puzzle.map(innerArr => innerArr.slice(col, col+1));

            return _.concat(
                getInnerGrid(row, col),
                puzzle[row],
                _.flattenDeep(colArr)
            )
        }

        if(inputNum >= 0 && inputNum <= gridState.gridNums){

            if(!getAllRelatedGridValues(row, col).includes(inputNum)){
                return inputNum
            }

        }
        return 0
    }
    function concatenateNumbers(prevNum: number, newNum:string, keyCode: number) {
        if(keyCode === deleteKeyCode){
            let prevNumString: string = prevNum.toString();
            let newNum = prevNumString.slice(0, -1) ? prevNumString.slice(0, -1) : 0;
            return parseInt(`${ newNum }`, baseTenRadix)
        }
        return parseInt(`${ prevNum }${ newNum }`, baseTenRadix)
    }

    function updatePuzzleValue(row: number, col: number, val: string, keyCode: number) {
        let newPuzzle = puzzle.slice();
        newPuzzle[row][col] = validateInput(row, col, concatenateNumbers(newPuzzle[row][col], val, keyCode));
        return newPuzzle

    }

        function decorateFilledInputValue(className: string, row: number, col: number) {

            if(originalPuzzle[row][col] === 0) {

                return `${className}__td_solved`;
            }

            return className
        }


    function CreateTableRow(num: number, keyDown: any) {

        let cells = Array();
        for(let i = 0; i < num; i++){
            let puzzleObj: fullPuzzleInterface = { puzzle: puzzle, mainPuzzleKey: i };
            cells.push(
                <GridRow
                    puzzle={ puzzleObj }
                    keyDown={ keyDown }
                    decorateFunc = { decorateFilledInputValue }
                    numItems={ num }
                    sudokuGridClass={ sudokuGridClass }
                    key={`table-row-${ i }`}
                />
            );
        }

        return cells.map(cell=>cell);
    }

    function selectOnChange(event: eventInterface) {

        let newType: number = event.target.value;
        setPuzzle(createDefaultPuzzle(getGridNums(newType)));
        setOriginalPuzzle(createDefaultPuzzle(getGridNums(newType)));
        changeGridState({type: newType, gridNums: getGridNums(newType)});
    }

    function onKeyDown(row:number, col:number) {

        return function keyDown(event: eventInterface) {
            event.preventDefault();
            setPuzzle(updatePuzzleValue(row, col, event.key, event.keyCode));
            setOriginalPuzzle(puzzle);

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
                let solvedPuzzle: Array<Array<number>> = response.data.solveSudoku.puzzle;
                setPuzzle(solvedPuzzle);
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
                    <select onChange={ selectOnChange } defaultValue={ `${defaultSudokuType}` }>
                        <option value={ 2 }>2x2</option>
                        <option value={ 3 }>3x3</option>
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

export { SudokuGrid, defaultSudokuType };
