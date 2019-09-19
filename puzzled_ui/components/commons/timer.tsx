import * as React from 'react';
import { PlayIcon, PauseIcon } from "../icons/sudoku";
import { timerInterface } from "../interfaces";

function Timer({ play, styleClass }: timerInterface) {

    function loadIcon() {
        if(play){
            return <PauseIcon width={ '25' } styleClass={ `${ styleClass }__svg` }/>
        }

        return <PlayIcon width={ '25' } styleClass={ `${ styleClass }__svg` }/>
    }

    return (
        <React.Fragment>
            <span className={ `${ styleClass }__span` }>00:00</span>
            { loadIcon() }
        </React.Fragment>
    )
    
}

export { Timer }
