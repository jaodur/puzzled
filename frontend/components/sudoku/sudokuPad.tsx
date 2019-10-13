import * as React from 'react';
import { Timer } from '../commons/timer';
import { PlaySudokuPadInterface, SolveSudokuPadInterface } from '../interfaces';
import { defaultDifficultyLevel, defaultSudokuType } from './sudokuGrid';

const timerClass: string = 'timer';

function SolveSudokuPad({ onTypeChange, solvePuzzle, clearPuzzle }: SolveSudokuPadInterface) {
    return (
        <React.Fragment>
            <div>
                Type:
                <select onChange={onTypeChange} defaultValue={`${defaultSudokuType}`}>
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
}: PlaySudokuPadInterface) {
    return (
        <React.Fragment>
            <div>
                Type:
                <select onChange={onTypeChange} defaultValue={`${defaultSudokuType}`}>
                    <option value={2}>2x2</option>
                    <option value={3}>3x3</option>
                    <option value={4}>4x4</option>
                </select>
            </div>
            <div>
                Difficulty:
                <select onChange={onDifficultyChange} defaultValue={`${defaultDifficultyLevel}`}>
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

export { SolveSudokuPad, PlaySudokuPad };
