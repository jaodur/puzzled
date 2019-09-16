import * as React from 'react'
import { congratulationInterface } from "../interfaces";
import { SOLVE_SUDOKU_MUTATION } from "../../graphql/mutations/sudoku";
import { Mutation, MutationFunc } from "react-apollo";

function Congratulation({ className, onClick }: congratulationInterface) {
    return (
        <div className={ className }>
            <div>Congratulations!</div>

            <Mutation  mutation={ SOLVE_SUDOKU_MUTATION } >
                {(generatePuzzleCallBack: MutationFunc) => (
                    <button onClick={ onClick(generatePuzzleCallBack) }>New Game</button>

                )}
            </Mutation>
        </div>
    )
}

export { Congratulation }
