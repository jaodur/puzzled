import * as React from "react";
import { GridRow } from './gridRow'
import { NumberPad } from "./numberPad";
import { SolveSudokuPad } from "./solveSudokuPad";
import { gridInterface, eventInterface, fullPuzzleInterface } from '../interfaces'
import * as _ from 'lodash';
import { MutationFunc } from "react-apollo";
import { uniqueArray, removeFromArray, getGridCoords, removeFromGrid, noop } from "../../utils/utils";

const defaultSudokuType: number = 3;
const deleteKeyCode: number = 8;
const baseTenRadix: number = 10;
const duplicateValueCode: number = -2;
const groupedGridValueCode: number = -1;
const numberPadCode: number = 0;

function SudokuGrid({ type }: gridInterface) {

    const [ gridState, changeGridState ] = React.useState({ type: type, gridNums: getGridNums(type) });
    const [ puzzle, setPuzzle ] = React.useState(createDefaultPuzzle(gridState.gridNums));
    const [ originalPuzzle, setOriginalPuzzle ] = React.useState(createDefaultPuzzle(gridState.gridNums));
    const [ errors, setErrors ] = React.useState(createDefaultPuzzle(gridState.gridNums));
    const [ errorFields, setErrorFields ] = React.useState([]);
    const [ currentGrid, setCurrentGrid ] = React.useState([]);

    let sudokuGridClass: string = `sudoku-grid-${gridState.type}`;

    function createDefaultPuzzle(gridNum: number){
        let finalArray = [];
        for (let i=0; i < gridNum; i++) {
            let templateArray = _.fill(Array(gridNum), 0);
            finalArray.push(templateArray)
        }
        return finalArray;
    }

    function createPrefilledArray(coords: Array<Array<number>>, fillValue: number) {
        let arr: Array<Array<number>> = createDefaultPuzzle(gridState.gridNums);
        coords.map(([row, col]) => {
            arr[row][col] = fillValue
        });

        return arr
    }

    function getGridNums(number?: number): number {
        if (number) {
            return number != 1 ?  number * number : 2;
        }
        return gridState.type != 1 ?  gridState.type * gridState.type : 2;
    }

    function highlightSimilarGrids(row: number, col: number) {
        function fillCell(arr: any, row: number, col: number, value: number){
            if(arr[row][col] !== duplicateValueCode){
                arr[row][col] = value
            }

        }
        let [ rowStart, colStart ] = getGridCoords(row, col, gridState.type);

        let coords = createPrefilledArray(errorFields, duplicateValueCode);

        for(let row=rowStart; row < rowStart + parseInt(`${gridState.type}`, baseTenRadix); row++){

            for(let col=colStart; col < colStart + parseInt(`${gridState.type}`, baseTenRadix); col++){
                fillCell(coords, row, col, groupedGridValueCode);
            }
        }

        for(let i=0; i < gridState.gridNums; i++){
            fillCell(coords, row, i, groupedGridValueCode);
            fillCell(coords, i, col, groupedGridValueCode);
        }

        return coords

    }

    function getInnerGrid(row: number, col: number) {
        let [ rowStart, colStart ] = getGridCoords(row, col, gridState.type);

        return Array.from(
                puzzle.slice(rowStart, rowStart + gridState.type).map(
                    innerArr => innerArr.slice(colStart, colStart + gridState.type )
                )
            );
    }


    function getAllRelatedGridValues(row: number, col: number){


        let colArr: (number|ConcatArray<number>)[] = _.flattenDeep(
            puzzle.map(innerArr => innerArr.slice(col, col+1))
        );

        return removeFromGrid(
            [row, col],
            gridState.type,
            getInnerGrid(row, col),
            puzzle[row],
            colArr);

    }

    function getNumCoord(row: number, col:number, arr: any, inputNum: number) {
        let [ rowStart, colStart ] = getGridCoords(row, col, gridState.type);
        let [ firstSlice, secondSlice, thirdSlice ] = [
            gridState.gridNums,
            2 * gridState.gridNums,
            3 * gridState.gridNums
        ];
        let [ sectorArr, rowArr, colArr ] = [
            _.slice(arr, 0, firstSlice),
            _.slice(arr, firstSlice, secondSlice),
            _.slice(arr , secondSlice, thirdSlice)
        ];

        let errorCoords = [];

        for(let i=0; i < gridState.gridNums; i++){
            if(inputNum !== 0 && inputNum === sectorArr[i]){
                errorCoords.push([ Math.floor(rowStart + (i / gridState.type)), colStart + (i % gridState.type) ])
            }
            if(inputNum !== 0 && inputNum === rowArr[i]){
                errorCoords.push([row, i])
            }
            if(inputNum !== 0 && inputNum === colArr[i]){
                errorCoords.push([i, col])
            }

        }

        return errorCoords
    }


    function validateInput(row: number, col: number, inputNum: number){

        let newErrorFields = uniqueArray(
                getNumCoord(row, col, getAllRelatedGridValues(row, col), inputNum)
        );
        let prevErrorFields = Array.from(errorFields);


        if(Array.isArray(newErrorFields) && newErrorFields.length > 0) {
            newErrorFields.push([row, col]);
        } else {

            removeFromArray(prevErrorFields, [row, col]);

            Array.from(prevErrorFields).map( arr => {

                let [x, y] = arr;

                let nestedErrors = uniqueArray(
                    getNumCoord(x, y, getAllRelatedGridValues(x, y), puzzle[x][y])
                );

                removeFromArray(nestedErrors, [row, col]);

                if(!nestedErrors.length){
                    removeFromArray(prevErrorFields, [x, y]);
                }

            })

        }


        prevErrorFields.push(...newErrorFields);
        prevErrorFields = uniqueArray(prevErrorFields);

        setErrorFields(prevErrorFields);
        setErrors(createPrefilledArray(prevErrorFields, duplicateValueCode));


        if(inputNum > 0 && inputNum <= gridState.gridNums){
            return inputNum
        }

        return 0
    }
    function concatenateNumbers(prevNum: number, newNum:string, keyCode: number) {
        if(keyCode === numberPadCode){
            return parseInt(`${ newNum }`, baseTenRadix)
        }

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

        if(errors[row][col] === duplicateValueCode) {
            return `${className}__error`;

        }

        if(errors[row][col] === groupedGridValueCode) {
            return `${className}__grouped_grid`;

        }

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
                    clickFunc={ onClick }
                    numItems={ num }
                    sudokuGridClass={ sudokuGridClass }
                    key={`table-row-${ i }`}
                />
            );
        }

        return cells.map(cell=>cell);
    }

    function selectOnChange(event: eventInterface) {

        let newType: number = parseInt(`${event.target.value}`, baseTenRadix);
        setPuzzle(createDefaultPuzzle(getGridNums(newType)));
        setOriginalPuzzle(createDefaultPuzzle(getGridNums(newType)));
        setErrorFields([]);
        setErrors(createDefaultPuzzle(getGridNums(newType)));
        changeGridState({type: newType, gridNums: getGridNums(newType)});
    }

    function onKeyDown(row:number, col:number) {

        return function keyDown(event: eventInterface) {
            event.preventDefault();
            setErrors(highlightSimilarGrids(row, col));
            setPuzzle(updatePuzzleValue(row, col, event.key, event.keyCode));
            setOriginalPuzzle(puzzle);
        }
    }

    function onClick(row:number, col:number) {

        return function (event: eventInterface) {
            event.preventDefault();
            setCurrentGrid([row, col, event.target]);
            setErrors(highlightSimilarGrids(row, col));
            setOriginalPuzzle(puzzle);
        }
    }

    function onPadClick(event: eventInterface) {
        event.preventDefault();
        let [row, col, target] = currentGrid;
        try {
            target.focus();
            setPuzzle(updatePuzzleValue(row, col, event.target.dataset.value, numberPadCode));
        } catch(e){
            noop();
        }

    }

    function solvePuzzle(solve: MutationFunc) {
        return function (event: eventInterface) {
            event.preventDefault();
            setErrors(createDefaultPuzzle(gridState.gridNums));
            solve({
                variables: {
                    puzzle: puzzle,
                    pType: gridState.type

                }
            }).then((response: any) => {
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
                <SolveSudokuPad
                    selectOnChange={selectOnChange}
                    solvePuzzle={solvePuzzle}
                    clearPuzzle={clearPuzzle}
                />
            </div>
            <div className={ `${ sudokuGridClass }__grid_wrapper` }>

                <table className={ `${ sudokuGridClass }__grid_table` }>
                    <tbody>

                        { CreateTableRow( gridState.gridNums, onKeyDown ) }

                    </tbody>
                </table>
                <NumberPad
                    onPadClick={ onPadClick }
                    gridClass={ sudokuGridClass }
                    type={ gridState.type }
                />
            </div>
        </React.Fragment>

    )
}

export { SudokuGrid, defaultSudokuType };
