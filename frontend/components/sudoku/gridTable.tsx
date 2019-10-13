import * as React from 'react';
import { GridTableInterface } from '../interfaces';
import { Congratulation } from './congratulation';
import { Pause } from './pause';
import {Loader} from "../icons/loader";

function GridTable({
    CreateTableRow,
    sudokuGridClass,
    gridState,
    onKeyDown,
    puzzle,
    showCongsMsg,
    onClick,
    playing,
    onPlayPauseClick,
    loader,
}: GridTableInterface) {
    return (
        <div className={`${sudokuGridClass}__grid_congrats_wrapper`}>
            <Congratulation
                className={showCongsMsg ? `${sudokuGridClass}__congrats_wrapper` : `${sudokuGridClass}__no_display`}
                onClick={onClick}
            />

            <Pause
                className={playing ? `${sudokuGridClass}__no_display` : `${sudokuGridClass}__congrats_wrapper`}
                onPlayIconClick={onPlayPauseClick}
            />
            <Loader styleClass={loader ? 'loader' : 'loader__no_display'}/>

            <table
                className={
                    showCongsMsg
                        ? `${sudokuGridClass}__grid_table ${sudokuGridClass}__grid_table__congrats`
                        : `${sudokuGridClass}__grid_table`
                }>
                <tbody>{CreateTableRow(gridState.gridNums, onKeyDown, puzzle)}</tbody>
            </table>
        </div>
    );
}

export { GridTable };
