import * as React from "react";
import { RouterLink } from '../commons/links';
import { gameIntroInterface } from '../interfaces'

let orangeGameContainer: string = 'game-container-orange';
let blueGameContainer: string = 'game-container-blue';
let redGameContainer: string = 'game-container-red';
let purpleGameContainer: string = 'game-container-purple';
let charmGameContainer: string = 'game-container-charm';
let stormGameContainer: string = 'game-container-storm';
let mainContent: string = 'main-content';

let linkNoStyle: string = 'link__no-style';

function GamesIntro() {
    return (
        <React.Fragment>
            <h1 className={`${mainContent}__game-intro-title`}>let's play.</h1>
            <div className={`${mainContent}__game-intro-mini-title`}>
                play your favourite games right here at Puzzled
            </div>
        </React.Fragment>

    )
}


function Game({ gameClass }: gameIntroInterface) {
    return (
            <div className={gameClass}>
                <div className={`${gameClass}__game-image`}><div></div></div>
                <div className={`${gameClass}__game-card`}>
                    <h3>sudoku</h3>
                    <p>
                        Sudoku is a logic-based, combinatorial number-placement puzzle. The objective is to fill a
                        9×9 grid with digits so that each column, each row, and each of the nine 3×3 subgrids
                        that compose the grid contains all of the digits from 1 to 9.
                    </p>
                </div>
            </div>
    )
}

function ContentContainer() {
    return (
        <React.Fragment>
            <GamesIntro/>
            <div className={`${mainContent}`}>
                <RouterLink link="/sudoku/"  component={ <Game gameClass={ orangeGameContainer } />} styleClass={ linkNoStyle }/>
                <Game gameClass={ blueGameContainer }/>
                <Game gameClass={ redGameContainer }/>
                <Game gameClass={ purpleGameContainer }/>
                <Game gameClass={ charmGameContainer }/>
                <Game gameClass={ stormGameContainer }/>
                <Game gameClass={ purpleGameContainer }/>
                <Game gameClass={ orangeGameContainer }/>
            </div>
        </React.Fragment>
    )
}

export { ContentContainer }
