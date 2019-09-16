import * as React from 'react';
import { Congratulation } from "./congratulation";
import { GridTableInterface } from "../interfaces";

function GridTable({ CreateTableRow, sudokuGridClass, gridState, onKeyDown, puzzle, showCongsMsg, onClick }: GridTableInterface) {
    return (
        <div className={ `${ sudokuGridClass }__grid_congrats_wrapper` }>
            <Congratulation
                className={
                    showCongsMsg ? `${ sudokuGridClass }__congrats_wrapper` :  `${ sudokuGridClass }__no_display`
                }
                onClick={ onClick }
            />

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
