import * as React from "react";
import { SudokuGrid, defaultSudokuType } from './sudokuGrid'
import { NavBar as SudokuNavBar }  from '../commons/NavBar';
import { sudokuNavBarLinks } from "../commons/navbarLinks";

class SudokuHome extends React.Component {
    render(): Array<JSX.Element> {
        return [
            <div className={'sudoku-nav'} key={ 'navbarContainer'}>
                <SudokuNavBar
                    primaryLabel={ sudokuNavBarLinks.primaryLabel }
                    secLabel={ sudokuNavBarLinks.secLabel }
                    links={ sudokuNavBarLinks.links }
                    key={ 'sudoku '}/>
            </div>,
            <SudokuGrid type={ defaultSudokuType } key={ 'sudokuGrid' } />
        ]

    }
}

export { SudokuHome }
