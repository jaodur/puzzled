import * as React from 'react';
import { RouterLink } from '../commons/links';
import { GameIntroInterface } from '../interfaces';

const orangeGameContainer: string = 'game-container-orange';
const blueGameContainer: string = 'game-container-blue';
const redGameContainer: string = 'game-container-red';
const purpleGameContainer: string = 'game-container-purple';
const charmGameContainer: string = 'game-container-charm';
const stormGameContainer: string = 'game-container-storm';
const mainContent: string = 'main-content';

const linkNoStyleCard: string = 'link__no-style__card';

function GamesIntro() {
    return (
        <React.Fragment>
            <h1 className={`${mainContent}__game-intro-title`}>let&apos;s play.</h1>
            <div className={`${mainContent}__game-intro-mini-title`}>
                play your favourite games right here at Puzzled
            </div>
        </React.Fragment>
    );
}

function Game({ gameClass }: GameIntroInterface) {
    return (
        <div className={gameClass}>
            <div className={`${gameClass}__game-image`}>
                <div />
            </div>
            <div className={`${gameClass}__game-card`}>
                <h3>sudoku</h3>
                <p>
                    Sudoku is a logic-based, combinatorial number-placement puzzle. The objective is to fill a 9×9 grid
                    with digits so that each column, each row, and each of the nine 3×3 subgrids that compose the grid
                    contains all of the digits from 1 to 9.
                </p>
            </div>
        </div>
    );
}

function ContentContainer() {
    return (
        <React.Fragment>
            <GamesIntro />
            <div className={`${mainContent}`}>
                <RouterLink
                    link="/sudoku/"
                    component={<Game gameClass={orangeGameContainer} />}
                    styleClass={linkNoStyleCard}
                />
                <RouterLink
                    link="/sudoku/"
                    component={<Game gameClass={blueGameContainer} />}
                    styleClass={linkNoStyleCard}
                />
                <RouterLink
                    link="/sudoku/"
                    component={<Game gameClass={redGameContainer} />}
                    styleClass={linkNoStyleCard}
                />
                <RouterLink
                    link="/sudoku/"
                    component={<Game gameClass={purpleGameContainer} />}
                    styleClass={linkNoStyleCard}
                />
                <RouterLink
                    link="/sudoku/"
                    component={<Game gameClass={charmGameContainer} />}
                    styleClass={linkNoStyleCard}
                />
                <RouterLink
                    link="/sudoku/"
                    component={<Game gameClass={stormGameContainer} />}
                    styleClass={linkNoStyleCard}
                />
                <RouterLink
                    link="/sudoku/"
                    component={<Game gameClass={purpleGameContainer} />}
                    styleClass={linkNoStyleCard}
                />
                <RouterLink
                    link="/sudoku/"
                    component={<Game gameClass={orangeGameContainer} />}
                    styleClass={linkNoStyleCard}
                />
                <RouterLink
                    link="/sudoku/"
                    component={<Game gameClass={purpleGameContainer} />}
                    styleClass={linkNoStyleCard}
                />
                <RouterLink
                    link="/sudoku/"
                    component={<Game gameClass={charmGameContainer} />}
                    styleClass={linkNoStyleCard}
                />
                <RouterLink
                    link="/sudoku/"
                    component={<Game gameClass={stormGameContainer} />}
                    styleClass={linkNoStyleCard}
                />
                <RouterLink
                    link="/sudoku/"
                    component={<Game gameClass={purpleGameContainer} />}
                    styleClass={linkNoStyleCard}
                />
                <RouterLink
                    link="/sudoku/"
                    component={<Game gameClass={orangeGameContainer} />}
                    styleClass={linkNoStyleCard}
                />
            </div>
        </React.Fragment>
    );
}

export { ContentContainer };