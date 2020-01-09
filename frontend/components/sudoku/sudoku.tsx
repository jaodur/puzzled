import * as React from 'react';
import { Footer } from '../commons/footer';
import { NavBar as SudokuNavBar } from '../commons/NavBar';
import { sudokuNavBarLinks } from '../commons/navbarLinks';
import { NavBarContainer } from '../commons/navbarContainer';
import { SudokuGrid } from './sudokuGrid';

const footerClass: string = 'footer-sudoku';

function SudokuHome() {
    return (
        <React.Fragment>
            <NavBarContainer styleClass={'default-navbar-container'}/>
            <div className={'sudoku-nav'} key={'navbarContainer'}>
                <SudokuNavBar
                    primaryLabel={sudokuNavBarLinks.primaryLabel}
                    secLabel={sudokuNavBarLinks.secLabel}
                    links={sudokuNavBarLinks.links}
                    onTabClick={() => {}}
                    linkActiveClass={'sudoku-selected'}
                    key={'sudoku'}
                />
            </div>
            <SudokuGrid key={'sudokuGrid'} />
            <Footer footerClass={footerClass} key={'sudoku-footer'} />
        </React.Fragment>
    );
}

export { SudokuHome };
