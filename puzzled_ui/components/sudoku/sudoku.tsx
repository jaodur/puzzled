import * as React from "react";
import { SudokuGrid } from './sudokuGrid'
const defaultSudokuType: number = 3;

class SudokuHome extends React.Component {
    render(): Array<JSX.Element> {
        return [
            <SudokuGrid type={ defaultSudokuType }/>
        ]

    }
}

export { SudokuHome }
