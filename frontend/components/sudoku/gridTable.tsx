import * as React from 'react';
import { LoaderIcon } from '../icons/loaderIcon';
import { GridTableInterface } from '../interfaces/interfaces';
import { Congratulation } from './congratulation';
import { Pause } from './pause';

function GridTable({
    CreateTableRow,
    sudokuGridClass,
    gridState,
    onKeyDown,
    puzzle,
    showCongsMsg,
    generatePuzzle,
    playing,
    onPlayPauseClick,
    loader,
}: GridTableInterface) {
    return (
        <div className={`${sudokuGridClass}__grid_congrats_wrapper`}>
            <Congratulation
                className={showCongsMsg ? `${sudokuGridClass}__congrats_wrapper` : `${sudokuGridClass}__no_display`}
                generatePuzzle={generatePuzzle}
            />

            <Pause
                className={playing ? `${sudokuGridClass}__no_display` : `${sudokuGridClass}__congrats_wrapper`}
                onPlayIconClick={onPlayPauseClick}
            />
            <LoaderIcon styleClass={loader ? 'loader' : 'loader__no_display'} />

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
