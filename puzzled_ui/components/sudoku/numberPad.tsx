import * as React from 'react'
import { numPadInterface } from "../interfaces";

function NumberPad({ gridClass, type }: numPadInterface){
    return (
        <table className={ `${ gridClass }__grid_wrapper__numpad`}>
            <tbody>
            <tr className={`${ gridClass }__grid_wrapper__numpad_row`}>
                <td>1</td>
                <td>2</td>
                <td>3</td>
            </tr>
            <tr className={`${ gridClass }__grid_wrapper__numpad_row`}>
                <td>4</td>
                <td>5</td>
                <td>6</td>
            </tr>
            <tr className={`${ gridClass }__grid_wrapper__numpad_row`}>
                <td>7</td>
                <td>8</td>
                <td>9</td>
            </tr>
            <tr className={`${ gridClass }__grid_wrapper__numpad_row`}>
                del
            </tr>

            </tbody>
        </table>
    )
}

export { NumberPad }
