import { fill, find, flattenDeep, slice } from 'lodash';
import * as React from 'react';
import { useMutation } from 'react-apollo-hooks';
import { Redirect, Route, Switch } from 'react-router-dom';
import { GENERATE_SUDOKU_MUTATION, SOLVE_SUDOKU_MUTATION } from '../../graphql/mutations/sudoku';
import {
    between,
    deepCopy,
    getGridCoords,
    noop,
    removeFromArray,
    removeFromGrid,
    renderElement,
    uniqueArray,
} from '../../utils/utils';
import { links } from '../commons/linkUrls';
import { EventInterface, FullPuzzleInterface } from '../interfaces/interfaces';
import { GridRow } from './gridRow';
import { GridTable } from './gridTable';
import { NumberPad } from './numberPad';
import { PlaySudokuPad, SolveSudokuPad, TrainerSudokuPad } from './sudokuPad';

const timerStyleClass: string = 'timer';
const defaultSudokuType: number = 3;
const defaultDifficultyLevel: string = 'easy';
const deleteKeyCode: number = 8;
const baseTenRadix: number = 10;
const sameNumberCode: number = -3;
const duplicateValueCode: number = -2;
const groupedGridValueCode: number = -1;
const numberPadCode: number = 0;
const empty: number = 0;
const swapTargetAxis: number = 1;
const swapCurrentAxis: number = 2;

function SudokuGrid() {
    const checkPath = (path: string) => {
        return window.location.pathname.includes(path);
    };
    const checkIfPlay = () => {
        return checkPath('play') || !(checkPath('solve') || checkPath('trainer'));
    };

    const [gridState, setGridState] = React.useState({
        type: defaultSudokuType,
        gridNums: getGridNums(defaultSudokuType),
    });
    const [puzzle, setPuzzle] = React.useState(createDefaultPuzzle(gridState.gridNums));
    const [playController, setPlayController] = React.useState(checkIfPlay);
    const [originalPuzzle, setOriginalPuzzle] = React.useState(createDefaultPuzzle(gridState.gridNums));
    const [errors, setErrors] = React.useState(createDefaultPuzzle(gridState.gridNums));
    const [decoratePuzzle, setDecoratePuzzle] = React.useState(createDefaultPuzzle(gridState.gridNums));
    const [decorateSwap, setDecorateSwap] = React.useState(createDefaultPuzzle(gridState.gridNums));
    const [errorFields, setErrorFields] = React.useState([]);
    const [currentGrid, setCurrentGrid] = React.useState([]);
    const [currentSwapGrid, setCurrentSwapGrid] = React.useState([]);
    const [swapInputValues, setSwapInputValues] = React.useState({ 1: 0, 2: 0 });
    const [difficulty, setDifficulty] = React.useState(defaultDifficultyLevel);
    // eslint-disable-next-line
    const [genPuzzleFunction, setGenPuzzleFunction] = useMutation(GENERATE_SUDOKU_MUTATION);
    // eslint-disable-next-line
    const [solvePuzzleFunction, setSolvePuzzleFunction] = useMutation(SOLVE_SUDOKU_MUTATION);
    const [solved, setSolved] = React.useState(false);
    const [playTime, setPlayTime] = React.useState({
        playing: true,
        totalSeconds: 0,
        timeoutFunc: null,
        stopTimer: false,
    });
    const [pausedPuzzle, setPausedPuzzle] = React.useState(createDefaultPuzzle(gridState.gridNums));
    const [pausedErrors, setPausedErrors] = React.useState(createDefaultPuzzle(gridState.gridNums));
    const [loading, setLoading] = React.useState(false);

    const sudokuGridClass: string = `sudoku-grid-${gridState.type}`;

    // componentDidMount
    React.useEffect(() => {
        const newPlayController = checkIfPlay();
        setPlayController(newPlayController);
        initPuzzleLoad(newPlayController);
    }, []);

    React.useEffect(() => {
        setPlayController(checkIfPlay);
    });

    React.useEffect(() => {
        // Todo: This check for not solved helps prevent infinite rendering loop caused by updating PlayTime
        //  in the checkPlayPauseStatus. This can be cleaned
        if (!solved) {
            updateTimer();
            checkPlayPauseStatus();
        }

        return () => {
            clearInterval(playTime.timeoutFunc);
        };
    }, [playTime]);

    React.useEffect(() => {
        checkSolved();
        updatePausedPuzzle();
    }, [puzzle, solved, errorFields]);

    React.useLayoutEffect(() => {
        setDecoratePuzzle(deepCopy(errors));
    }, [errors]);

    function createDefaultPuzzle(gridNum: number) {
        const finalArray = [];
        for (let i = 0; i < gridNum; i++) {
            const templateArray = fill(Array(gridNum), 0);
            finalArray.push(templateArray);
        }
        return finalArray;
    }

    function setAllPuzzleStates(newType: number, newPuzzle?: number[][]) {
        newPuzzle = newPuzzle ? newPuzzle : createDefaultPuzzle(getGridNums(newType));

        setPuzzle(deepCopy(newPuzzle));
        setPausedPuzzle(deepCopy(newPuzzle));
        setOriginalPuzzle(deepCopy(newPuzzle));
        setDecoratePuzzle(deepCopy(newPuzzle));
        setDecorateSwap(deepCopy(newPuzzle));
        setAllErrorPuzzles(createDefaultPuzzle(getGridNums(newType)));
        setErrorFields([]);
        setSolved(false);
    }

    function setAllErrorPuzzles(newPuzzle: number[][]) {
        setErrors(deepCopy(newPuzzle));
        setPausedErrors(deepCopy(newPuzzle));
    }

    async function initPuzzleLoad(playController: boolean) {
        if (!playController) {
            setPuzzle(createDefaultPuzzle(gridState.gridNums));
            setOriginalPuzzle(createDefaultPuzzle(gridState.gridNums));
            setPlayTime({ playing: false, totalSeconds: 0, timeoutFunc: null, stopTimer: true });
        } else {
            await createPuzzle(gridState.type, difficulty);
        }
    }

    async function createPuzzle(pType: number, difficulty: string) {
        setAllPuzzleStates(pType);
        setLoading(true);
        await genPuzzleFunction({ variables: { pType, difficulty } }).then((res: any) => {
            const puzzle: number[][] = res.data.generateSudoku.puzzle;
            setPuzzle(deepCopy(puzzle));
            setOriginalPuzzle(deepCopy(puzzle));
            setPlayTime({ playing: true, totalSeconds: 0, timeoutFunc: null, stopTimer: false });
        });
        setLoading(false);
    }

    async function solvePuzzle(event: EventInterface) {
        event.preventDefault();
        setAllErrorPuzzles(createDefaultPuzzle(gridState.gridNums));
        setOriginalPuzzle(deepCopy(puzzle));
        setLoading(true);

        await solvePuzzleFunction({
            variables: {
                puzzle,
                pType: gridState.type,
            },
        }).then((response: any) => {
            setPuzzle(response.data.solveSudoku.puzzle);
            setSolved(true);
        });

        setLoading(false);
    }

    function createPrefilledArray(coords: number[][], fillValue: number) {
        const arr: number[][] = createDefaultPuzzle(gridState.gridNums);
        coords.map(([row, col]) => {
            arr[row][col] = fillValue;
        });

        return arr;
    }

    function getGridNums(num?: number): number {
        if (num) {
            return num !== 1 ? num * num : 2;
        }
        return gridState.type !== 1 ? gridState.type * gridState.type : 2;
    }

    function highlightSameNum(arr: number[][], row: number, col: number, inputNum?: number) {
        const targetNumber = inputNum ? inputNum : puzzle[row][col];

        if (targetNumber) {
            puzzle.map((colArr, rowIndex) => {
                colArr.map((value, colIndex) => {
                    if (value === targetNumber) {
                        arr[rowIndex][colIndex] = !arr[rowIndex][colIndex] ? sameNumberCode : arr[rowIndex][colIndex];
                    }
                });
            });
        }
        return arr;
    }

    function highlightSimilarGrids(row: number, col: number, inputNum?: number) {
        function fillCell(arr: any, row: number, col: number, value: number) {
            if (arr[row][col] !== duplicateValueCode) {
                arr[row][col] = value;
            }
        }

        const [rowStart, colStart] = getGridCoords(row, col, gridState.type);

        const similarGridArr = createPrefilledArray(errorFields, duplicateValueCode);

        for (let row = rowStart; row < rowStart + parseInt(`${gridState.type}`, baseTenRadix); row++) {
            for (let col = colStart; col < colStart + parseInt(`${gridState.type}`, baseTenRadix); col++) {
                fillCell(similarGridArr, row, col, groupedGridValueCode);
            }
        }

        for (let i = 0; i < gridState.gridNums; i++) {
            fillCell(similarGridArr, row, i, groupedGridValueCode);
            fillCell(similarGridArr, i, col, groupedGridValueCode);
        }

        return highlightSameNum(similarGridArr, row, col, inputNum);
    }

    function getInnerGrid(row: number, col: number) {
        const [rowStart, colStart] = getGridCoords(row, col, gridState.type);

        return Array.from(
            puzzle
                .slice(rowStart, rowStart + gridState.type)
                .map(innerArr => innerArr.slice(colStart, colStart + gridState.type))
        );
    }

    function getAllRelatedGridValues(row: number, col: number) {
        const colArr: Array<number | ConcatArray<number>> = flattenDeep(
            puzzle.map(innerArr => innerArr.slice(col, col + 1))
        );

        return removeFromGrid([row, col], gridState.type, getInnerGrid(row, col), puzzle[row], colArr);
    }

    function getNumCoord(row: number, col: number, arr: any, inputNum: number) {
        const [rowStart, colStart] = getGridCoords(row, col, gridState.type);
        const [firstSlice, secondSlice, thirdSlice] = [
            gridState.gridNums,
            2 * gridState.gridNums,
            3 * gridState.gridNums,
        ];
        const [sectorArr, rowArr, colArr] = [
            slice(arr, 0, firstSlice),
            slice(arr, firstSlice, secondSlice),
            slice(arr, secondSlice, thirdSlice),
        ];

        const errorCoords = [];

        for (let i = 0; i < gridState.gridNums; i++) {
            if (inputNum !== empty && inputNum === sectorArr[i]) {
                errorCoords.push([Math.floor(rowStart + i / gridState.type), colStart + (i % gridState.type)]);
            }
            if (inputNum !== empty && inputNum === rowArr[i]) {
                errorCoords.push([row, i]);
            }
            if (inputNum !== empty && inputNum === colArr[i]) {
                errorCoords.push([i, col]);
            }
        }

        return errorCoords;
    }

    function validateInput(row: number, col: number, inputNum: number) {
        let prevErrorFields = Array.from(errorFields);
        const originalValue = originalPuzzle[row][col];

        // do not update original values
        if (originalValue) {
            setAllErrorPuzzles(
                highlightSameNum(createPrefilledArray(prevErrorFields, duplicateValueCode), row, col, originalValue)
            );
            return originalValue;
        }

        const newErrorFields = uniqueArray(getNumCoord(row, col, getAllRelatedGridValues(row, col), inputNum));

        if (Array.isArray(newErrorFields) && newErrorFields.length > 0) {
            newErrorFields.push([row, col]);
        } else {
            removeFromArray(prevErrorFields, [row, col]);

            Array.from(prevErrorFields).map(arr => {
                const [x, y] = arr;

                const nestedErrors = uniqueArray(getNumCoord(x, y, getAllRelatedGridValues(x, y), puzzle[x][y]));

                removeFromArray(nestedErrors, [row, col]);

                if (!nestedErrors.length) {
                    removeFromArray(prevErrorFields, [x, y]);
                }
            });
        }

        prevErrorFields.push(...newErrorFields);
        prevErrorFields = uniqueArray(prevErrorFields);

        setErrorFields(prevErrorFields);
        setAllErrorPuzzles(
            highlightSameNum(createPrefilledArray(prevErrorFields, duplicateValueCode), row, col, inputNum)
        );

        if (inputNum > 0 && inputNum <= gridState.gridNums) {
            return inputNum;
        }

        return empty;
    }
    function concatenateNumbers(prevNum: number, newNum: string, keyCode: number) {
        if (keyCode === numberPadCode) {
            return parseInt(`${newNum}`, baseTenRadix);
        }

        if (keyCode === deleteKeyCode) {
            const prevNumString: string = prevNum.toString();
            const newNum = prevNumString.slice(0, -1) ? prevNumString.slice(0, -1) : 0;
            return parseInt(`${newNum}`, baseTenRadix);
        }
        return parseInt(`${prevNum}${newNum}`, baseTenRadix);
    }

    function updatePuzzleValue(row: number, col: number, val: string, keyCode: number) {
        const newPuzzle = deepCopy(puzzle);
        newPuzzle[row][col] = validateInput(row, col, concatenateNumbers(newPuzzle[row][col], val, keyCode));
        return newPuzzle;
    }

    function decorateFilledInputValue(className: string, row: number, col: number) {
        function blockCell(originalClassName: string, newClassName: string) {
            if (originalPuzzle[row][col] !== empty && playController) {
                return `${newClassName} ${originalClassName}__td_blocked`;
            }

            return newClassName;
        }

        function renderBlockableStyleClass(styleClass: string, blockStyleClass: string) {
            return originalPuzzle[row][col] === empty ? styleClass : blockStyleClass;
        }

        if (decoratePuzzle[row][col] === duplicateValueCode) {
            const duplicateClass = blockCell(className, `${className}__error`);

            return renderBlockableStyleClass(duplicateClass, blockCell(className, `${className}__error_blocked`));
        }

        if (decorateSwap[row][col] === swapTargetAxis) {
            const groupClass = blockCell(className, `${className}__swap_target`);

            return renderBlockableStyleClass(
                `${groupClass} ${blockCell(className, `${className}__swap_target`)}`,
                groupClass
            );
        }

        if (decorateSwap[row][col] === swapCurrentAxis) {
            const groupClass = blockCell(className, `${className}__swap_current`);

            return renderBlockableStyleClass(
                `${groupClass} ${blockCell(className, `${className}__swap_current`)}`,
                groupClass
            );
        }

        if (decoratePuzzle[row][col] === sameNumberCode) {
            const groupClass = blockCell(className, `${className}__same_value_blocked`);

            return renderBlockableStyleClass(
                `${groupClass} ${blockCell(className, `${className}__same_value`)}`,
                groupClass
            );
        }

        if (decoratePuzzle[row][col] === groupedGridValueCode) {
            const groupClass = blockCell(className, `${className}__grouped_grid`);

            return renderBlockableStyleClass(
                `${groupClass} ${blockCell(className, `${className}__td_solved`)}`,
                groupClass
            );
        }

        if (originalPuzzle[row][col] === empty) {
            return blockCell(className, `${className}__td_solved`);
        }

        return blockCell(className, className);
    }

    function CreateTableRow(num: number, keyDown: any, puzzle: any) {
        const cells = [];
        for (let i = 0; i < num; i++) {
            const puzzleObj: FullPuzzleInterface = { puzzle, mainPuzzleKey: i };
            cells.push(
                <GridRow
                    puzzle={puzzleObj}
                    keyDown={keyDown}
                    decorateFunc={decorateFilledInputValue}
                    clickFunc={onClick}
                    numItems={num}
                    sudokuGridClass={sudokuGridClass}
                    key={`table-row-${i}`}
                />
            );
        }

        return cells.map(cell => cell);
    }

    async function onTypeSelect(event: EventInterface) {
        const newType: number = parseInt(`${event.target.value}`, baseTenRadix);
        setGridState({ type: newType, gridNums: getGridNums(newType) });
        setAllPuzzleStates(newType);

        if (playController) {
            await createPuzzle(newType, difficulty);
        } else {
            setPlayTime({ ...playTime, totalSeconds: 0, stopTimer: true });
        }
    }

    async function onDifficultySelect(event: EventInterface) {
        const newDifficulty: string = event.target.value;
        setDifficulty(newDifficulty);
        await createPuzzle(gridState.type, newDifficulty);
    }

    function onKeyDown(row: number, col: number) {
        return function keyDown(event: EventInterface) {
            event.preventDefault();
            if (!solved) {
                setPuzzle(updatePuzzleValue(row, col, event.key, event.keyCode));
            }
        };
    }

    function onClick(row: number, col: number) {
        return function(event: EventInterface) {
            event.preventDefault();
            setCurrentGrid([row, col, event.target]);
            setCurrentSwapGrid([row, col]);
            setDecorateSwap(createDefaultPuzzle(gridState.gridNums));
            setAllErrorPuzzles(highlightSimilarGrids(row, col));
        };
    }

    function onPadClick(event: EventInterface) {
        event.preventDefault();
        const [row, col, target] = currentGrid;
        try {
            if (!solved) {
                target.focus();
                setPuzzle(updatePuzzleValue(row, col, event.target.dataset.value, numberPadCode));
            }
        } catch (e) {
            noop();
        }
    }

    async function generatePuzzle(event: EventInterface) {
        event.preventDefault();
        setAllErrorPuzzles(createDefaultPuzzle(gridState.gridNums));
        await createPuzzle(gridState.type, difficulty);
    }

    function clearPuzzle(event: EventInterface) {
        event.preventDefault();
        setAllPuzzleStates(gridState.type);
    }

    function resetPuzzle(event: EventInterface) {
        event.preventDefault();
        setAllErrorPuzzles(createDefaultPuzzle(gridState.gridNums));
        setErrorFields([]);
        setPuzzle(deepCopy(originalPuzzle));
        setSolved(false);
    }

    function checkSolved() {
        const testPuzzle = flattenDeep(deepCopy(puzzle));

        if (playController && errorFields.length <= 0) {
            if (find(testPuzzle, val => val === empty) === empty) {
                setSolved(false);
                return;
            }
            setSolved(true);
        }
    }

    function updateTimer() {
        if (!playTime.timeoutFunc && playTime.playing && !playTime.stopTimer) {
            const timer = setInterval(() => {
                setPlayTime({ ...playTime, totalSeconds: playTime.totalSeconds + 1 });
            }, 1000);
            setPlayTime({ ...playTime, timeoutFunc: timer });
        }
    }

    function onPlayPauseClick(event: EventInterface) {
        event.preventDefault();
        setPlayTime({ ...playTime, playing: !playTime.playing, timeoutFunc: null });
    }

    function checkPlayPauseStatus() {
        if (playController) {
            if (playTime.playing) {
                setPuzzle(deepCopy(pausedPuzzle));
                setErrors(deepCopy(pausedErrors));
            } else {
                setPuzzle(createDefaultPuzzle(gridState.gridNums));
                setErrors(createDefaultPuzzle(gridState.gridNums));
            }
        }
    }

    function updatePausedPuzzle() {
        function checkIfNotEmpty(puzzle: number[][]) {
            return uniqueArray(puzzle).length > 1;
        }

        if (playController && playTime.playing) {
            if (checkIfNotEmpty(puzzle)) {
                setPausedPuzzle(deepCopy(puzzle));
                setPausedErrors(deepCopy(errors));
            }
        }

        if (solved) {
            setPlayTime({ ...playTime, stopTimer: true, timeoutFunc: null });
        }
    }

    function xRayPuzzle(event: EventInterface) {
        event.preventDefault();

        const format = 'ABCDEFHIJKLMNOPQRSTUVWXYZ';
        const xRayPuzzle = deepCopy(puzzle);

        const keyMapper: any = {};

        puzzle[0].map((value, index) => {
            keyMapper[value] = format[index];
        });

        puzzle.map((innerArr, row) => {
            innerArr.map((value, col) => {
                xRayPuzzle[row][col] = keyMapper[value];
            });
        });

        setPuzzle(xRayPuzzle);
    }

    function validateSwapRows(row1: number, row2: number, type: number) {
        const maxValue = type * type;
        if (!between(row1, 0, maxValue) && !between(row2, 0, maxValue)) {
            return false;
        }
        const sectorStartIndex = Math.floor(row1 / type) * type;
        const sectorEndIndex = sectorStartIndex + type;

        return between(row1, sectorStartIndex, sectorEndIndex) && between(row2, sectorStartIndex, sectorEndIndex);
    }

    function swapRows(row: number, col: number, arr: number[][], optFunc: (row: number) => number) {
        const targetRow = optFunc(row);

        if (!validateSwapRows(row, targetRow, gridState.type)) {
            return;
        }
        const [target, temp] = [arr[targetRow], arr[row]];
        arr[targetRow] = temp;
        arr[row] = target;

        setCurrentSwapGrid([targetRow, col]);
    }

    function swapCols(row: number, col: number, arr: number[][], optFunc: (row: number) => number) {
        const targetCol = optFunc(col);

        if (!validateSwapRows(col, targetCol, gridState.type)) {
            return;
        }
        const target = arr.map((value: any) => value[targetCol]);
        const temp = arr.map((value: any) => value[col]);

        target.map((value: any, index: number) => {
            arr[index][col] = value;
        });
        temp.map((value: any, index: number) => {
            arr[index][targetCol] = value;
        });

        setCurrentSwapGrid([row, targetCol]);
    }

    function swap(isRow: boolean, isIncrement: boolean, arr: number[][]) {
        const [row, col] = currentSwapGrid;
        const optFunc = isIncrement ? (num: number) => num + 1 : (num: number) => num - 1;

        isRow ? swapRows(row, col, arr, optFunc) : swapCols(row, col, arr, optFunc);
    }

    function createSwapHighlights(isRow: boolean, isIncrement: boolean) {
        const arr: number[][] = createDefaultPuzzle(gridState.gridNums);
        const targetArr: number[] = fill(Array(gridState.gridNums), swapTargetAxis);
        const currentArr: number[] = fill(Array(gridState.gridNums), swapCurrentAxis);
        const [row, col] = currentSwapGrid;
        const optFunc = isIncrement ? (num: number) => num + 1 : (num: number) => num - 1;

        if (isRow) {
            const targetRow = optFunc(row);

            if (!validateSwapRows(row, targetRow, gridState.type)) {
                console.log('invalid swaps for', row, targetRow);
                return arr;
            }

            arr[targetRow] = targetArr;
            arr[row] = currentArr;
        } else {
            const targetCol = optFunc(col);

            if (!validateSwapRows(col, targetCol, gridState.type)) {
                console.log('invalid swaps for ', col, targetCol);
                return arr;
            }
            targetArr.map((value: any, index: number) => {
                arr[index][targetCol] = value;
            });
            currentArr.map((value: any, index: number) => {
                arr[index][col] = value;
            });
        }

        return arr;
    }

    function swapRowCol(isRow: boolean, increment: boolean) {
        return function(event: EventInterface) {
            event.preventDefault();
            const newPuzzle = deepCopy(puzzle);
            const newOriginalPuzzle = deepCopy(originalPuzzle);
            const swapArr = createSwapHighlights(isRow, increment);

            swap(isRow, increment, newPuzzle);
            swap(isRow, increment, newOriginalPuzzle);

            setPuzzle(newPuzzle);
            setOriginalPuzzle(newOriginalPuzzle);
            setDecorateSwap(swapArr);
        };
    }

    function swapNumbers(event: EventInterface) {
        event.preventDefault();
        const num1 = swapInputValues[1];
        const num2 = swapInputValues[2];

        if (!!num1 && !!num2) {
            const newPuzzle = deepCopy(puzzle);

            puzzle.map((arr, row) => {
                arr.map((value, col) => {
                    if (value === num1) {
                        newPuzzle[row][col] = num2;
                    } else if (value === num2) {
                        newPuzzle[row][col] = num1;
                    }
                });
            });

            setPuzzle(newPuzzle);
        }
    }

    function onSwapInputChange(insertKey: number) {
        return function(event: EventInterface) {
            event.preventDefault();
            let value: any = parseInt(event.target.value);

            if (!!value) {
                if (!between(value, 1, gridState.type * gridState.type + 1)) {
                    return;
                }
            } else {
                value = '';
            }

            const newSwapValues = deepCopy(swapInputValues);
            newSwapValues[insertKey] = value;
            setSwapInputValues(newSwapValues);
        };
    }

    function onMarkClick(event: EventInterface) {
        event.preventDefault();

        const [row, col, target] = currentGrid;

        if (!!target) {
            const newOriginalPuzzle = deepCopy(originalPuzzle);
            newOriginalPuzzle[row][col] = parseInt(target.value);

            setOriginalPuzzle(newOriginalPuzzle);
        }
    }

    return (
        <div className={'grid_container'}>
            <div className={'grid-control-container'}>
                <Switch>
                    <Route
                        exact
                        path={links.SUDOKU.TRAINER}
                        render={renderElement(
                            <TrainerSudokuPad
                                type={gridState.type}
                                onTypeChange={onTypeSelect}
                                solvePuzzle={solvePuzzle}
                                xRayPuzzle={xRayPuzzle}
                                swapPuzzle={swapNumbers}
                                swapRolCol={swapRowCol}
                                onSwapInputChange={onSwapInputChange}
                                swapInputValues={swapInputValues}
                                onMarkClick={onMarkClick}
                            />
                        )}
                    />

                    <Route
                        exact
                        path={links.SUDOKU.SOLVE}
                        render={renderElement(
                            <SolveSudokuPad
                                onTypeChange={onTypeSelect}
                                solvePuzzle={solvePuzzle}
                                clearPuzzle={clearPuzzle}
                                type={gridState.type}
                            />
                        )}
                    />

                    <Route
                        exact
                        path={links.SUDOKU.PLAY}
                        render={renderElement(
                            <PlaySudokuPad
                                onTypeChange={onTypeSelect}
                                onDifficultyChange={onDifficultySelect}
                                generatePuzzle={generatePuzzle}
                                resetPuzzle={resetPuzzle}
                                type={gridState.type}
                                difficulty={difficulty}
                            />
                        )}
                    />

                    <Redirect to={links.SUDOKU.PLAY} />
                </Switch>
            </div>

            <GridTable
                CreateTableRow={CreateTableRow}
                sudokuGridClass={sudokuGridClass}
                gridState={gridState}
                onKeyDown={onKeyDown}
                puzzle={puzzle}
                showCongsMsg={playController && solved}
                generatePuzzle={generatePuzzle}
                playing={playTime.playing}
                onPlayPauseClick={onPlayPauseClick}
                loader={loading}
            />

            <NumberPad
                onPadClick={onPadClick}
                gridClass={sudokuGridClass}
                type={gridState.type}
                totalSeconds={playTime.totalSeconds}
                playing={playTime.playing}
                playControl={playController}
                onTimerClick={onPlayPauseClick}
                stopTimer={playTime.stopTimer}
                timerStyleClass={timerStyleClass}
            />
        </div>
    );
}

export { SudokuGrid };
