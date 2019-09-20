import * as React from 'react';
import { PlayIcon, PauseIcon } from "../icons/sudoku";
import { timerInterface } from "../interfaces";
import { modulus, pad } from "../../utils/utils";

const minute: number = 60; // 60 seconds
const hour: number = minute * 60;

function Timer({ play, styleClass, totalSeconds }: timerInterface) {

    function loadIcon() {
        if(play){
            return <PauseIcon width={ '25' } styleClass={ `${ styleClass }__svg` }/>
        }

        return <PlayIcon width={ '25' } styleClass={ `${ styleClass }__svg` }/>
    }

    function parseSeconds(totalSeconds: number) {

        let hours = Math.floor(totalSeconds / hour);
        let minutes = Math.floor(modulus(totalSeconds, hour) / minute);
        let seconds = modulus(modulus(totalSeconds, hour),  minute);

        if(hours){
            return `${ pad(hours, length=2) }:${ pad(minutes, length=2) }:${ pad(seconds, length=2) }`
        }

        if(minutes){
            return `${ pad(minutes, length=2) }:${ pad(seconds, length=2) }`

        }
        return `${ pad(seconds, length=2) }`
    }


    return (
        <React.Fragment>
            <span className={ `${ styleClass }__span` }>{ parseSeconds(totalSeconds) }</span>
            { loadIcon() }
        </React.Fragment>
    )
    
}

export { Timer }
