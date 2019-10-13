import * as _ from 'lodash';
import * as React from 'react';
import { useMutation } from 'react-apollo-hooks';
import { Redirect, Route, Switch } from 'react-router-dom';
import { GENERATE_SUDOKU_MUTATION, SOLVE_SUDOKU_MUTATION } from '../../graphql/mutations/sudoku';
import {
    deepCopy,
    getGridCoords,
    noop,
    removeFromArray,
    removeFromGrid,
    renderElement,
    uniqueArray,
} from '../../utils/utils';
import { EventInterface, FullPuzzleInterface, GridInterface } from '../interfaces';
import { GridRow } from './gridRow';
import { GridTable } from './gridTable';
import { NumberPad } from './numberPad';
import { PlaySudokuPad, SolveSudokuPad } from './sudokuPad';

const defaultSudokuType: number = 3;
const defaultDifficultyLevel: string = 'easy';
const deleteKeyCode: number = 8;
const baseTenRadix: number = 10;
const duplicateValueCode: number = -2;
const groupedGridValueCode: number = -1;
const numberPadCode: number = 0;
const empty: number = 0;

function SudokuGrid({ playController }: GridInterface) {
    const [gridState, changeGridState] = React.useState({ type: defaultSudokuType, gridNums: getGridNums(defaultSudokuType) });
    const [puzzle, setPuzzle] = React.useState(createDefaultPuzzle(gridState.gridNums));
    const [originalPuzzle, setOriginalPuzzle] = React.useState(createDefaultPuzzle(gridState.gridNums));
    const [errors, setErrors] = React.useState(createDefaultPuzzle(gridState.gridNums));
    const [errorFields, setErrorFields] = React.useState([]);
    const [currentGrid, setCurrentGrid] = React.useState([]);
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
    const [loading, setLoading] = React.useState(false);

    const sudokuGridClass: string = `sudoku-grid-${gridState.type}`;

    // componentDidMount
    React.useEffect(() => {
        initPuzzleLoad();
    }, []);

    React.useEffect(() => {
        updateTimer();
        checkPlayPauseStatus();

        return () => {
            clearInterval(playTime.timeoutFunc);
        };
    }, [playTime]);

    React.useEffect(() => {
        checkSolved();
        updatePausedPuzzle();
    }, [puzzle, solved, errorFields]);

    function createDefaultPuzzle(gridNum: number) {
        const finalArray = [];
        for (let i = 0; i < gridNum; i++) {
            const templateArray = _.fill(Array(gridNum), 0);
            finalArray.push(templateArray);
        }
        return finalArray;
    }

    function setAllPuzzleStates(newType: number, newPuzzle?: number[][]) {
        newPuzzle = newPuzzle ? newPuzzle : createDefaultPuzzle(getGridNums(newType));

        setPuzzle(deepCopy(newPuzzle));
        setPausedPuzzle(deepCopy(newPuzzle));
        setOriginalPuzzle(deepCopy(newPuzzle));
        setErrors(createDefaultPuzzle(getGridNums(newType)));
        setErrorFields([]);
        setSolved(false);
    }

    async function initPuzzleLoad() {
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
            setErrors(createDefaultPuzzle(gridState.gridNums));
            setOriginalPuzzle(deepCopy(puzzle));
            setLoading(true)

            await solvePuzzleFunction({
                variables: {
                    puzzle,
                    pType: gridState.type,
                },
            }).then((response: any) => {
                setPuzzle(response.data.solveSudoku.puzzle);
                setSolved(true);
            });

            setLoading(false)

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

    function highlightSimilarGrids(row: number, col: number) {
        function fillCell(arr: any, row: number, col: number, value: number) {
            if (arr[row][col] !== duplicateValueCode) {
                arr[row][col] = value;
            }
        }
        const [rowStart, colStart] = getGridCoords(row, col, gridState.type);

        const coords = createPrefilledArray(errorFields, duplicateValueCode);

        for (let row = rowStart; row < rowStart + parseInt(`${gridState.type}`, baseTenRadix); row++) {
            for (let col = colStart; col < colStart + parseInt(`${gridState.type}`, baseTenRadix); col++) {
                fillCell(coords, row, col, groupedGridValueCode);
            }
        }

        for (let i = 0; i < gridState.gridNums; i++) {
            fillCell(coords, row, i, groupedGridValueCode);
            fillCell(coords, i, col, groupedGridValueCode);
        }

        return coords;
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
        const colArr: Array<number | ConcatArray<number>> = _.flattenDeep(
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
            _.slice(arr, 0, firstSlice),
            _.slice(arr, firstSlice, secondSlice),
            _.slice(arr, secondSlice, thirdSlice),
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
        const newErrorFields = uniqueArray(getNumCoord(row, col, getAllRelatedGridValues(row, col), inputNum));
        let prevErrorFields = Array.from(errorFields);

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
        setErrors(createPrefilledArray(prevErrorFields, duplicateValueCode));

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

        if (errors[row][col] === duplicateValueCode) {
            const duplicateClass = blockCell(className, `${className}__error`);
            return originalPuzzle[row][col] === empty
                ? duplicateClass
                : blockCell(className, `${className}__error_blocked`);
        }

        if (errors[row][col] === groupedGridValueCode) {
            const groupClass = blockCell(className, `${className}__grouped_grid`);

            return originalPuzzle[row][col] === empty
                ? `${groupClass} ${blockCell(className, `${className}__td_solved`)}`
                : groupClass;
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
        changeGridState({ type: newType, gridNums: getGridNums(newType) });
        setAllPuzzleStates(newType);

        if(playController){
            await createPuzzle(newType, difficulty)
        }
        else {
            setPlayTime({...playTime, totalSeconds: 0, stopTimer: true});
        }
    }

    async function onDifficultySelect(event: EventInterface) {
        const newDifficulty: string = event.target.value;
        setDifficulty(newDifficulty)
        await createPuzzle(gridState.type, newDifficulty)
    }

    function onKeyDown(row: number, col: number) {
        return function keyDown(event: EventInterface) {
            event.preventDefault();
            if (!solved) {
                setErrors(highlightSimilarGrids(row, col));
                setPuzzle(updatePuzzleValue(row, col, event.key, event.keyCode));
            }
            if (!playController && !solved) {
                setOriginalPuzzle(deepCopy(puzzle));
            }
        };
    }

    function onClick(row: number, col: number) {
        return function(event: EventInterface) {
            event.preventDefault();
            setCurrentGrid([row, col, event.target]);
            setErrors(highlightSimilarGrids(row, col));
            if (!playController && !solved) {
                setOriginalPuzzle(deepCopy(puzzle));
            }
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
        setErrors(createDefaultPuzzle(gridState.gridNums));
        await createPuzzle(gridState.type, difficulty);
    }

    function clearPuzzle(event: EventInterface) {
        event.preventDefault();
        setAllPuzzleStates(gridState.type);
    }

    function resetPuzzle(event: EventInterface) {
        event.preventDefault();
        setErrors(createDefaultPuzzle(gridState.gridNums));
        setErrorFields([]);
        setPuzzle(deepCopy(originalPuzzle));
        setSolved(false);
    }

    function checkSolved() {
        const testPuzzle = _.flattenDeep(deepCopy(puzzle));

        if (playController && errorFields.length <= 0) {
            if (_.find(testPuzzle, val => val === empty) === empty) {
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
            playTime.playing ? setPuzzle(pausedPuzzle) : setPuzzle(deepCopy(createDefaultPuzzle(gridState.gridNums)));
            return;
        }
    }

    function updatePausedPuzzle() {
        function checkIfNotEmpty(puzzle: number[][]) {
            return uniqueArray(puzzle).length > 1;
        }

        if (playController && playTime.playing) {
            if (checkIfNotEmpty(puzzle)) {
                setPausedPuzzle(deepCopy(puzzle));
            }
        }

        if (solved) {
            setPlayTime({ ...playTime, stopTimer: true, timeoutFunc: null });
        }
    }

    return (
        <React.Fragment>
            <div className={`${sudokuGridClass}__grid_type`}>
                <Switch>
                    <Route
                        exact
                        path="/sudoku/solve/"
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
                        path="/sudoku/play/"
                        render={renderElement(
                            <PlaySudokuPad
                                onTypeChange={onTypeSelect}
                                onDifficultyChange={onDifficultySelect}
                                generatePuzzle={generatePuzzle}
                                resetPuzzle={resetPuzzle}
                                totalSeconds={playTime.totalSeconds}
                                playing={playTime.playing}
                                onClick={onPlayPauseClick}
                                stopTimer={playTime.stopTimer}
                                type={gridState.type}
                                difficulty={difficulty}
                            />
                        )}
                    />

                    <Redirect to="/sudoku/play/" />
                </Switch>
            </div>
            <div className={`${sudokuGridClass}__grid_wrapper`}>
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

                <NumberPad onPadClick={onPadClick} gridClass={sudokuGridClass} type={gridState.type} />
            </div>
        </React.Fragment>
    );
}

export { SudokuGrid };
