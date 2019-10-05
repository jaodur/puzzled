import { pauseInterface } from "../interfaces";
import * as React from "react";
import { PlayIcon } from "../icons/sudoku";

function Pause({ className, onPlayIconClick }: pauseInterface) {
    return (
        <div className={ className }>
             <PlayIcon onClick={ onPlayIconClick }/>
        </div>
    )
}

export { Pause }
