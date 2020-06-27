import * as React from 'react';
import { Footer } from '../commons/footer';
import { NavBar } from '../commons/navBar';
import { NavBarContainer } from '../commons/navbarContainer';
// import { sudokuNavBarLinks } from '../commons/navbarLinks';
import { SudokuGrid } from './sudokuGrid';

const footerClass: string = 'footer-sudoku';

function SudokuHome() {
    return (
        <React.Fragment>
            <NavBarContainer />
            <div className={'sudoku-nav'} key={'navbarContainer'}>
                <NavBar />
            </div>
            <div className={'content'}>
                <SudokuGrid key={'sudokuGrid'} />
            </div>
            <Footer footerClass={footerClass} key={'sudoku-footer'} />
        </React.Fragment>
    );
}

export { SudokuHome };
