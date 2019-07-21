import * as React from "react";

let orangeGameContainer: string = 'game-container-orange';
let blueGameContainer: string = 'game-container-blue';
let redGameContainer: string = 'game-container-red';
let purpleGameContainer: string = 'game-container-purple';
let charmGameContainer: string = 'game-container-charm';
let stormGameContainer: string = 'game-container-storm';
let mainContent: string = 'main-content';

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

interface game {
    gameClass: string
}

function Game({ gameClass }: game) {
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
                <Game gameClass={orangeGameContainer}/>
                <Game gameClass={blueGameContainer}/>
                <Game gameClass={redGameContainer}/>
                <Game gameClass={purpleGameContainer}/>
                <Game gameClass={charmGameContainer}/>
                <Game gameClass={stormGameContainer}/>
                <Game gameClass={purpleGameContainer}/>
                <Game gameClass={orangeGameContainer}/>
            </div>
        </React.Fragment>
    )
}

export { ContentContainer }
