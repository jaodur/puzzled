import * as React from 'react';
import { Mutation, MutationFunc } from 'react-apollo';
import { GENERATE_SUDOKU_MUTATION } from '../../graphql/mutations/sudoku';
import { CongratulationInterface } from '../interfaces';

function Congratulation({ className, onClick }: CongratulationInterface) {
    return (
        <div className={className}>
            <div>Congratulations!</div>

            <Mutation mutation={GENERATE_SUDOKU_MUTATION}>
                {(generatePuzzleCallBack: MutationFunc) => (
                    <button onClick={onClick(generatePuzzleCallBack)}>New Game</button>
                )}
            </Mutation>
        </div>
    );
}

export { Congratulation };
