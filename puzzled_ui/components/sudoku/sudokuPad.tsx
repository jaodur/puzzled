import * as React from 'react';
import { Mutation, MutationFunc } from "react-apollo";
import { SOLVE_SUDOKU_MUTATION, GENERATE_SUDOKU_MUTATION } from "../../graphql/mutations/sudoku";
import { defaultSudokuType, defaultDifficultyLevel } from "./sudokuGrid";
import { solveSudokuPadInterface, playSudokuPadInterface } from "../interfaces";


function SolveSudokuPad({ selectOnChange, solvePuzzle, clearPuzzle }: solveSudokuPadInterface){
    return (
        <React.Fragment>
            <div>
                Type:
                <select onChange={ selectOnChange } defaultValue={ `${ defaultSudokuType }` }>
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


function PlaySudokuPad({ selectOnChange, generatePuzzle, resetPuzzle }: playSudokuPadInterface){
    return (
        <React.Fragment>
            <div>
                Type:
                <select onChange={ selectOnChange } defaultValue={ `${ defaultSudokuType }` }>
                    <option value={ 2 }>2x2</option>
                    <option value={ 3 }>3x3</option>
                    <option value={ 4 }>4x4</option>
                </select>
            </div>
            <div>
                Difficulty:
                <select onChange={ selectOnChange } defaultValue={ `${ defaultDifficultyLevel }` }>
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
        </React.Fragment>
    )
}



export { SolveSudokuPad, PlaySudokuPad }
