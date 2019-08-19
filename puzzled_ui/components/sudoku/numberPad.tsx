import * as React from 'react'
import { numPadInterface } from "../interfaces";



function NumPadRow({ gridClass, type, startNum }: numPadInterface) {

    function CreateNumPadData(num: number, fillValue: number) {

        let cells = Array();
        for(let i = 0; i < num; i++){
            cells.push(
                <td key={`sudoku-numpad-td-${ fillValue }` }>{ fillValue }</td>
            );
            fillValue += 1;
        }

        return cells.map(cell=>cell);
    }

    return (
        <tr className={ `${ gridClass }__grid_wrapper__numpad_row` }>
            { CreateNumPadData(type, startNum) }

        </tr>
    )
}

function NumberPad({ gridClass, type }: numPadInterface){

    function CreateNumPadRow(type: number, startNum: number) {

        let cells = Array();
        for(let i = 0; i < type; i++){
            cells.push(
                <NumPadRow
                    gridClass={ gridClass }
                    type={ type }
                    startNum={ startNum }
                    key={ `sudoku-numpad-row-${ startNum }` }
                />
            );
            startNum += type;
        }

        return cells.map(cell=>cell);
    }

    return (
        <table className={ `${ gridClass }__grid_wrapper__numpad` }>
            <tbody>
            { CreateNumPadRow(type, 1)}
            <tr className={`${ gridClass }__grid_wrapper__numpad_row` }>
                <td>erase</td>
            </tr>

            </tbody>
        </table>
    )
}

export { NumberPad }
