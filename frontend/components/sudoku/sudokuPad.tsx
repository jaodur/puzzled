import * as React from 'react';
import { Timer } from '../commons/timer';
import { PlaySudokuPadInterface, SolveSudokuPadInterface, TrainerSudokuInterface } from '../interfaces';

const timerClass: string = 'timer';

function SolveSudokuPad({ onTypeChange, solvePuzzle, clearPuzzle, type }: SolveSudokuPadInterface) {
    return (
        <React.Fragment>
            <div>
                Type:
                <select onChange={onTypeChange} defaultValue={`${type}`}>
                    <option value={2}>2x2</option>
                    <option value={3}>3x3</option>
                    <option value={4}>4x4</option>
                </select>
            </div>

            <button onClick={solvePuzzle}>Solve</button>

            <button onClick={clearPuzzle}>clear</button>
        </React.Fragment>
    );
}

function PlaySudokuPad({
    onTypeChange,
    onDifficultyChange,
    generatePuzzle,
    resetPuzzle,
    totalSeconds,
    playing,
    onClick,
    stopTimer,
    type,
    difficulty,
}: PlaySudokuPadInterface) {
    return (
        <React.Fragment>
            <div>
                Type:
                <select onChange={onTypeChange} defaultValue={`${type}`}>
                    <option value={2}>2x2</option>
                    <option value={3}>3x3</option>
                    <option value={4}>4x4</option>
                </select>
            </div>
            <div>
                Difficulty:
                <select onChange={onDifficultyChange} defaultValue={`${difficulty}`}>
                    <option value={'easy'}>Easy</option>
                    <option value={'medium'}>Medium</option>
                    <option value={'hard'}>Hard</option>
                    <option value={'expert'}>Expert</option>
                </select>
            </div>

            <button onClick={resetPuzzle}>reset</button>

            <button onClick={generatePuzzle}>New Game</button>

            <Timer
                stopTimer={stopTimer}
                onClick={onClick}
                playing={playing}
                styleClass={timerClass}
                totalSeconds={totalSeconds}
            />
        </React.Fragment>
    );
}

function TrainerSudokuPad({type,  onTypeChange,  solvePuzzle,  xRayPuzzle,  swapPuzzle, swapRolCol, onSwapInputChange, swapInputValues, onMarkClick}: TrainerSudokuInterface){
    return (
        <React.Fragment>
            <div>
                Type:
                <select onChange={onTypeChange} defaultValue={`${type}`}>
                    <option value={2}>2x2</option>
                    <option value={3}>3x3</option>
                    <option value={4}>4x4</option>
                </select>
            </div>
            <button onClick={swapRolCol(false, false)}>&#8592;</button>
            <button onClick={swapRolCol(false, true)}>&#8594;</button>
            <button onClick={swapRolCol(true, false)}>&#8593;</button>
            <button onClick={swapRolCol(true, true)}>&#8595;</button>

            <button onClick={solvePuzzle}>Solve</button>

            <button onClick={xRayPuzzle}>X-Ray</button>

            <button onClick={onMarkClick}>mark</button>
            <button onClick={swapPuzzle}>Swap</button>
            <input type="text" value={swapInputValues[1]} onChange={onSwapInputChange(1)}/>
            <input type="text" value={swapInputValues[2]} onChange={onSwapInputChange(2)}/>

        </React.Fragment>
    )
}

export { SolveSudokuPad, PlaySudokuPad, TrainerSudokuPad };
