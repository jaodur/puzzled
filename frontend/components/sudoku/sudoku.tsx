import * as React from 'react';
import { Footer } from '../commons/footer';
import { NavBar as SudokuNavBar } from '../commons/NavBar';
import { sudokuNavBarLinks } from '../commons/navbarLinks';
import { EventInterface } from '../interfaces';
import { defaultSudokuType, SudokuGrid } from './sudokuGrid';

const footerClass: string = 'footer-sudoku';

function SudokuHome() {
    const playControllerInitState = componentWillMount();
    const [playController, setPlayController] = React.useState(playControllerInitState);

    function onTabClick() {
        return function(event: EventInterface) {
            setPlayController(event.target.dataset.name === 'Play');
        };
    }

    function componentWillMount() {
        const pathname: string = window.location.pathname;

        return pathname.includes('play');
    }
    return (
        <React.Fragment>
            <div className={'sudoku-nav'} key={'navbarContainer'}>
                <SudokuNavBar
                    primaryLabel={sudokuNavBarLinks.primaryLabel}
                    secLabel={sudokuNavBarLinks.secLabel}
                    links={sudokuNavBarLinks.links}
                    onTabClick={onTabClick()}
                    key={'sudoku'}
                />
            </div>
            <SudokuGrid type={defaultSudokuType} playController={playController} key={'sudokuGrid'} />
            <Footer footerClass={footerClass} key={'sudoku-footer'} />
        </React.Fragment>
    );
}

export { SudokuHome };
