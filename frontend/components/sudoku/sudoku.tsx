import * as React from 'react';

import { Footer } from '../commons/footer';
import { links } from '../commons/linkUrls';
import { MainContent } from '../commons/mainContent';
import { NavBarContainer } from '../commons/navbarContainer';
import { SudokuGrid } from './sudokuGrid';

const sudokuLinks = [
    { name: 'Play', href: links.SUDOKU.PLAY },
    { name: 'Solve', href: links.SUDOKU.SOLVE },
    { name: 'Trainer', href: links.SUDOKU.TRAINER },
    { name: 'Help', href: '#' },
];

function SudokuHome() {
    return (
        <React.Fragment>
            <NavBarContainer links={sudokuLinks} />
            <MainContent className={'main-content flex-align-center'}>
                <SudokuGrid />
            </MainContent>
            <Footer />
        </React.Fragment>
    );
}

export { SudokuHome };
