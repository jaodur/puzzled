import * as React from 'react';
import { CongratulationInterface } from '../interfaces';

function Congratulation({ className, generatePuzzle }: CongratulationInterface) {
    return (
        <div className={className}>
            <div>Congratulations!</div>

            <button onClick={generatePuzzle}>New Game</button>

        </div>
    );
}

export { Congratulation };
