import * as React from 'react';
import { Mutation, MutationFunc } from "react-apollo";
import { SOLVE_SUDOKU_MUTATION, GENERATE_SUDOKU_MUTATION } from "../../graphql/mutations/sudoku";
import { defaultSudokuType, defaultDifficultyLevel } from "./sudokuGrid";
import { solveSudokuPadInterface, playSudokuPadInterface } from "../interfaces";
import { Timer } from "../commons/timer";

const timerClass: string = 'timer';


function SolveSudokuPad({ onTypeChange, solvePuzzle, clearPuzzle }: solveSudokuPadInterface){
    return (
        <React.Fragment>
            <div>
                Type:
                <select onChange={ onTypeChange } defaultValue={ `${ defaultSudokuType }` }>
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
        </React.Fragment>
    )
}


function PlaySudokuPad({ onTypeChange, onDifficultyChange, generatePuzzle, resetPuzzle, totalSeconds, playing }: playSudokuPadInterface){
    return (
        <React.Fragment>
            <div>
                Type:
                <select onChange={ onTypeChange } defaultValue={ `${ defaultSudokuType }` }>
                    <option value={ 2 }>2x2</option>
                    <option value={ 3 }>3x3</option>
                    <option value={ 4 }>4x4</option>
                </select>
            </div>
            <div>
                Difficulty:
                <select onChange={ onDifficultyChange } defaultValue={ `${ defaultDifficultyLevel }` }>
                    <option value={ 'easy' }>Easy</option>
                    <option value={ 'medium' }>Medium</option>
                    <option value={ 'hard' }>Hard</option>
                    <option value={ 'expert' }>Expert</option>
                </select>
            </div>

            <button onClick={ resetPuzzle }>reset</button>

            <Mutation  mutation={ GENERATE_SUDOKU_MUTATION } >
                {(generatePuzzleCallBack: MutationFunc) => (
                    <button onClick={ generatePuzzle(generatePuzzleCallBack) }>New Game</button>
                )}
            </Mutation>

            <Timer playing={ playing } styleClass={ timerClass } totalSeconds={ totalSeconds }/>
        </React.Fragment>
    )
}



export { SolveSudokuPad, PlaySudokuPad }
