import * as React from "react";
import { SudokuGrid, defaultSudokuType } from './sudokuGrid'
import { NavBar as SudokuNavBar }  from '../commons/NavBar';
import { Footer } from "../commons/footer";
import { sudokuNavBarLinks } from "../commons/navbarLinks";
import { eventInterface } from "../interfaces";

let footerClass: string = 'footer-sudoku';

function SudokuHome() {

    let playControllerInitState = componentWillMount();
    const [ playController, setPlayController ] = React.useState(playControllerInitState);

    function onTabClick() {
        return function (event: eventInterface) {
            setPlayController(event.target.dataset.name === 'Play');
        }
    }

    function componentWillMount(){
        let pathname: string = window.location.pathname;

        return pathname.includes('play')

    }
    return (
        <React.Fragment>
        <div className={'sudoku-nav'} key={ 'navbarContainer' }>
            <SudokuNavBar
                primaryLabel={ sudokuNavBarLinks.primaryLabel }
                secLabel={ sudokuNavBarLinks.secLabel }
                links={ sudokuNavBarLinks.links }
                onTabClick={ onTabClick() }
                key={ 'sudoku' }/>
        </div>,
        <SudokuGrid type={ defaultSudokuType } playController={ playController } key={ 'sudokuGrid' } />
        <Footer footerClass={footerClass} key={ 'sudoku-footer' }/>
        </React.Fragment>
    )

}

export { SudokuHome }
