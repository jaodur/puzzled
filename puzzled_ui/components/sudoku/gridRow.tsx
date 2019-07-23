import * as React from "react";

interface GridInterface {
    numItems: number,
    sudokuGridClass: string
}
interface key {
    key: string
}

function TableData({ key }: key) {
    return (
        <td key={key}>&nbsp;</td>
    )
}

function GridRow({ numItems, sudokuGridClass }: GridInterface) {

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
