import * as React from 'react';
import { Congratulation } from "./congratulation";
import { GridTableInterface } from "../interfaces";
import {Pause} from "./pause";

function GridTable({
                       CreateTableRow,
                       sudokuGridClass,
                       gridState,
                       onKeyDown,
                       puzzle,
                       showCongsMsg,
                       onClick,
                       playing,
                       onPlayPauseClick }: GridTableInterface) {
    return (
        <div className={ `${ sudokuGridClass }__grid_congrats_wrapper` }>
            <Congratulation
                className={
                    showCongsMsg ? `${ sudokuGridClass }__congrats_wrapper` :  `${ sudokuGridClass }__no_display`
                }
                onClick={ onClick }
            />

            <Pause
                className={ playing ? `${ sudokuGridClass }__no_display` :  `${ sudokuGridClass }__congrats_wrapper` }
                onPlayIconClick={ onPlayPauseClick }/>

            <table
                className={
                    showCongsMsg ? `${ sudokuGridClass }__grid_table ${ sudokuGridClass }__grid_table__congrats` :
                        `${ sudokuGridClass }__grid_table` }
            >
                <tbody >

                { CreateTableRow( gridState.gridNums, onKeyDown, puzzle ) }

                </tbody>
            </table>
        </div>
    )
}

export { GridTable }
