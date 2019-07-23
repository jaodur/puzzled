import * as React from "react";
import { SudokuGrid } from './sudokuGrid'

class SudokuHome extends React.Component {
    render(): Array<JSX.Element> {
        return [
            <SudokuGrid num={3}/>
        ]

    }
}

export { SudokuHome }
