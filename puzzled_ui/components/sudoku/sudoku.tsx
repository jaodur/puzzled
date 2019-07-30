import * as React from "react";
import { SudokuGrid } from './sudokuGrid'
import { NavBar as SudokuNavBar }  from '../commons/NavBar';
import { navbarInterface } from "../interfaces";

const defaultSudokuType: number = 3;
let linkNoStyle: string = 'link__no-style';

let sudokuNavBarLinks: navbarInterface = {
    primaryLabel: { text: 'puzzled', href: "/", style: linkNoStyle },
    secLabel: { text: 'sudoku', href: '/sudoku/', style: linkNoStyle },
    links:
        [
            { name: 'Play', href: '#' },
            { name: 'Solve', href: '#' },
            { name: 'About Sudoku', href: '#' },
            { name: null, href: null, linkClass: 'navbar-separator' },
            { name: 'Sign In', href: '#' },
            { name: 'Sign Up', href: '#' },

        ]
};

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
