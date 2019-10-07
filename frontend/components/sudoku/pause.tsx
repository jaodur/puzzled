import * as React from 'react';
import { PlayIcon } from '../icons/sudoku';
import { PauseInterface } from '../interfaces';

function Pause({ className, onPlayIconClick }: PauseInterface) {
    return (
        <div className={className}>
            <PlayIcon onClick={onPlayIconClick} />
        </div>
    );
}

export { Pause };
