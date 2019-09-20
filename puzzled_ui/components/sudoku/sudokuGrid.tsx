import * as React from "react";
import { GridRow } from './gridRow'
import { NumberPad } from "./numberPad";
import { Route, Switch, Redirect } from 'react-router-dom';
import { SolveSudokuPad, PlaySudokuPad } from "./sudokuPad";
import { GridTable } from './gridTable';
import { gridInterface, eventInterface, fullPuzzleInterface } from '../interfaces'
import * as _ from 'lodash';
import { MutationFunc } from "react-apollo";
import { useMutation } from 'react-apollo-hooks'
import { GENERATE_SUDOKU_MUTATION } from "../../graphql/mutations/sudoku";
import {
    uniqueArray,
    removeFromArray,
    getGridCoords,
    removeFromGrid,
    noop,
    renderElement,
    deepCopy,
} from "../../utils/utils";
import {useEffect} from "react";


const defaultSudokuType: number = 3;
const defaultDifficultyLevel: string = 'easy';
const deleteKeyCode: number = 8;
const baseTenRadix: number = 10;
const duplicateValueCode: number = -2;
const groupedGridValueCode: number = -1;
const numberPadCode: number = 0;
const empty: number = 0;

function SudokuGrid({ type, playController }: gridInterface) {

    const [ gridState, changeGridState ] = React.useState({ type: type, gridNums: getGridNums(type) });
    const [ puzzle, setPuzzle ] = React.useState(createDefaultPuzzle(gridState.gridNums));
    const [ originalPuzzle, setOriginalPuzzle ] = React.useState(createDefaultPuzzle(gridState.gridNums));
    const [ errors, setErrors ] = React.useState(createDefaultPuzzle(gridState.gridNums));
    const [ errorFields, setErrorFields ] = React.useState([]);
    const [ currentGrid, setCurrentGrid ] = React.useState([]);
    const [ difficulty, setDifficulty ] = React.useState(defaultDifficultyLevel);
    const [ genPuzzleFunction, setGenPuzzleFunction ] = useMutation(GENERATE_SUDOKU_MUTATION);
    const [ solved, setSolved ] = React.useState(false);

    let sudokuGridClass: string = `sudoku-grid-${gridState.type}`;

    useEffect(()=>{
        checkSolved()

    }, [puzzle, solved, errorFields]);

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
            if(inputNum !== empty && inputNum === sectorArr[i]){
                errorCoords.push([ Math.floor(rowStart + (i / gridState.type)), colStart + (i % gridState.type) ])
            }
            if(inputNum !== empty && inputNum === rowArr[i]){
                errorCoords.push([row, i])
            }
            if(inputNum !== empty && inputNum === colArr[i]){
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

        return empty
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
        let newPuzzle = deepCopy(puzzle);
        newPuzzle[row][col] = validateInput(row, col, concatenateNumbers(newPuzzle[row][col], val, keyCode));
        return newPuzzle

    }

    function decorateFilledInputValue(className: string, row: number, col: number) {

        function blockCell(originalClassName: string, newClassName: string){
            if(originalPuzzle[row][col] !== empty && playController){
               return `${ newClassName } ${ originalClassName }__td_blocked`
            }

            return newClassName
        }

        if(errors[row][col] === duplicateValueCode) {
            let duplicateClass = blockCell(className, `${ className }__error`);
            return originalPuzzle[row][col] === empty ?
                duplicateClass : blockCell(className, `${ className }__error_blocked`);

        }

        if(errors[row][col] === groupedGridValueCode) {
            let groupClass = blockCell(className, `${ className }__grouped_grid`);

            return originalPuzzle[row][col] === empty ?
                `${ groupClass } ${ blockCell(className, `${ className }__td_solved`) }` : groupClass
        }

        if(originalPuzzle[row][col] === empty) {

            return blockCell(className, `${ className }__td_solved`);
        }

        return blockCell(className, className)
    }


    function CreateTableRow(num: number, keyDown: any, puzzle: any) {

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

    function onTypeSelect(event: eventInterface) {

        let newType: number = parseInt(`${event.target.value}`, baseTenRadix);
        setPuzzle(createDefaultPuzzle(getGridNums(newType)));
        setOriginalPuzzle(createDefaultPuzzle(getGridNums(newType)));
        setErrorFields([]);
        setErrors(createDefaultPuzzle(getGridNums(newType)));
        changeGridState({type: newType, gridNums: getGridNums(newType)});
        setSolved(false)
    }

    async function onDifficultySelect(event: eventInterface) {
        let newDifficulty: string = event.target.value;

        let generatedPuzzle = await genPuzzleFunction(
            {variables: {pType: gridState.type, difficulty: newDifficulty}}
            ).then((res: any) => {
            return res.data.generateSudoku.puzzle
        });

        setDifficulty(newDifficulty);
        setPuzzle(deepCopy(generatedPuzzle));
        setOriginalPuzzle(deepCopy(generatedPuzzle));
        setSolved(false);
        setErrorFields([]);
        setErrors(createDefaultPuzzle(getGridNums(gridState.type)));
    }

    function onKeyDown(row:number, col:number) {

        return function keyDown(event: eventInterface) {
            event.preventDefault();
            setErrors(highlightSimilarGrids(row, col));
            setPuzzle(updatePuzzleValue(row, col, event.key, event.keyCode));
            if(!playController && !solved) {
                setOriginalPuzzle(deepCopy(puzzle));
            }
        }
    }

    function onClick(row:number, col:number) {

        return function (event: eventInterface) {
            event.preventDefault();
            setCurrentGrid([row, col, event.target]);
            setErrors(highlightSimilarGrids(row, col));
            if(!playController && !solved) {
                setOriginalPuzzle(deepCopy(puzzle));
            }
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
                setSolved(true)
            });
        }
    }

    function generatePuzzle(generate: MutationFunc) {
        return async function (event: eventInterface) {
            event.preventDefault();
            setErrors(createDefaultPuzzle(gridState.gridNums));
            await generate({
                variables: {
                    pType: gridState.type,
                    difficulty: difficulty

                }
            }).then((response: any) => {
                let puzzle = response.data.generateSudoku.puzzle;
                setOriginalPuzzle(deepCopy(puzzle));
                setPuzzle(deepCopy(puzzle));
                setSolved(false)
            });
        }
    }

    function clearPuzzle(event: eventInterface) {
        event.preventDefault();
        setPuzzle(createDefaultPuzzle(getGridNums(gridState.type)));
        setOriginalPuzzle(createDefaultPuzzle(getGridNums(gridState.type)));
        setSolved(false)
    }

    function resetPuzzle(event: eventInterface){
        event.preventDefault();
        setPuzzle(deepCopy(originalPuzzle));
        setSolved(false)
    }

    function checkSolved(){
        let testPuzzle = _.flattenDeep(deepCopy(puzzle));

        if(playController && errorFields.length <= 0) {
            if (_.find(testPuzzle, val => val === empty) === empty) {
                setSolved(false);
                return
            }
            setSolved(true)
        }
    }


    return (

        <React.Fragment>
            <div className={ `${ sudokuGridClass }__grid_type` }>
                <Switch>
                    <Route
                        exact path="/sudoku/solve/"
                        render={
                            renderElement(
                                <SolveSudokuPad
                                    onTypeChange={ onTypeSelect }
                                    solvePuzzle={ solvePuzzle }
                                    clearPuzzle={ clearPuzzle }
                                />
                            )
                        }
                    />

                    <Route
                        exact path="/sudoku/play/"
                        render={
                            renderElement(
                                <PlaySudokuPad
                                    onTypeChange={ onTypeSelect }
                                    onDifficultyChange={ onDifficultySelect }
                                    generatePuzzle={ generatePuzzle }
                                    resetPuzzle={ resetPuzzle }
                                />
                            )
                        }
                    />

                    <Redirect to="/sudoku/play/" />


                </Switch>
            </div>
            <div className={ `${ sudokuGridClass }__grid_wrapper` }>

                <GridTable
                    CreateTableRow={ CreateTableRow }
                    sudokuGridClass={ sudokuGridClass }
                    gridState={ gridState }
                    onKeyDown={ onKeyDown }
                    puzzle={ puzzle }
                    showCongsMsg={ playController && solved }
                    onClick={ generatePuzzle }
                />

                <NumberPad
                    onPadClick={ onPadClick }
                    gridClass={ sudokuGridClass }
                    type={ gridState.type }
                />
            </div>
        </React.Fragment>

    )
}

export { SudokuGrid, defaultSudokuType, defaultDifficultyLevel };
