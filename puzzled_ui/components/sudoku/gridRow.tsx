import * as React from "react";
import { keyInterface, gridRowInterface} from '../interfaces'

function TableData({ key }: keyInterface) {
    return (
        <td key={key}>&nbsp;</td>
    )
}

function GridRow({ numItems, sudokuGridClass }: gridRowInterface) {

    function CreateTableData(num: number) {
        let cells = Array();
        for(let i = 0; i < num; i++){
            cells.push(<TableData key={`table-data-${i}`}/>)
        }

        return cells.map(cell=>cell);
    }

    return (


        <tr className={ `${ sudokuGridClass }__grid_table_row` }>{ CreateTableData(numItems) }</tr>

    )
}

export { GridRow }
