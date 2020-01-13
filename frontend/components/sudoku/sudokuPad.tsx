import * as React from 'react';
import { PlaySudokuPadInterface, SolveSudokuPadInterface, TrainerSudokuInterface } from '../interfaces';

function SolveSudokuPad({ onTypeChange, solvePuzzle, clearPuzzle, type }: SolveSudokuPadInterface) {
    return (
        <div className={'sudoku-controls'}>
            <div className={'sudoku-controls__select_controls'}>
                Type:
                <select onChange={onTypeChange} defaultValue={`${type}`}>
                    <option value={2}>2x2</option>
                    <option value={3}>3x3</option>
                    <option value={4}>4x4</option>
                </select>
            </div>

            <button onClick={solvePuzzle}>Solve</button>

            <button onClick={clearPuzzle}>clear</button>
        </div>
    );
}

function PlaySudokuPad({
    onTypeChange,
    onDifficultyChange,
    generatePuzzle,
    resetPuzzle,
    type,
    difficulty,
}: PlaySudokuPadInterface) {
    return (
        <div className={'sudoku-controls'}>
            <div className={'sudoku-controls__select_controls'}>
                Type:
                <select onChange={onTypeChange} defaultValue={`${type}`}>
                    <option value={2}>2x2</option>
                    <option value={3}>3x3</option>
                    <option value={4}>4x4</option>
                </select>
            </div>
            <div className={'sudoku-controls__select_controls'}>
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

        </div>
    );
}

function TrainerSudokuPad({
    type,
    onTypeChange,
    solvePuzzle,
    xRayPuzzle,
    swapPuzzle,
    swapRolCol,
    onSwapInputChange,
    swapInputValues,
    onMarkClick,
}: TrainerSudokuInterface) {
    return (
        <div className={'sudoku-controls'}>
            <div className={'sudoku-controls__select_controls'}>
                Type:
                <select onChange={onTypeChange} defaultValue={`${type}`}>
                    <option value={2}>2x2</option>
                    <option value={3}>3x3</option>
                    <option value={4}>4x4</option>
                </select>
            </div>


            <button onClick={solvePuzzle}>Solve</button>

            <button onClick={xRayPuzzle}>X-Ray</button>

            <button onClick={onMarkClick}>mark</button>

            <div className={'sudoku-controls__swap_controls'}>
                <input type="text" value={swapInputValues[1]} onChange={onSwapInputChange(1)} />
                <input type="text" value={swapInputValues[2]} onChange={onSwapInputChange(2)} />
                <button onClick={swapPuzzle}>Swap</button>
            </div>

            <div className={'sudoku-controls__arrow_controls'}>
                <div></div>
                <div><button onClick={swapRolCol(true, false)}>&#8593;</button></div>
                <div></div>
                <div><button onClick={swapRolCol(false, false)}>&#8592;</button></div>
                <div></div>
                <div><button onClick={swapRolCol(false, true)}>&#8594;</button></div>
                <div></div>
                <div><button onClick={swapRolCol(true, true)}>&#8595;</button></div>
                <div></div>
            </div>
        </div>
    );
}

export { SolveSudokuPad, PlaySudokuPad, TrainerSudokuPad };
