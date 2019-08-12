import * as React from "react";
import { footerInterface } from '../interfaces'


function Footer({ footerClass }: footerInterface) {
    return (
        <div className= {footerClass}>

            <div className={`${footerClass}__content`}>
                <div className={`${footerClass}__content_about`}>
                    <h1>puzzled</h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eget malesuada nisi.
                        Vivamus lacinia, urna ornare ornare convallis, enim nibh suscipit erat, eget vehicula
                        nulla ligula sit amet enim. Donec fringilla lectus sit amet enim porta suscipit sit amet
                        vel mauris. Ut pretium quam a metus pretium volutpat. Proin congue malesuada imperdiet.
                        Curabitur pulvinar pulvinar libero, sed ultrices enim egestas sed. Proin arcu eros,
                        condimentum ac nisl ut, vestibulum dictum eros
                    </p>
                </div>
                <div className={`${footerClass}__content_games`}>
                    <h1>games</h1>
                    <p>Sudoku</p>
                    <p>Mine sweeper</p>
                    <p>Poker</p>
                    <p>2048</p>

                </div>
                <div className={`${footerClass}__content_leaderboard`}>
                    <h1>leaderboards</h1>
                    <p>Sudoku</p>
                    <p>Mine sweeper</p>
                    <p>Poker</p>
                    <p>2048</p>
                </div>
                <div className={`${footerClass}__content_extras`}>
                    <h1>extra</h1>
                    <p>Sudoku</p>
                    <p>Mine sweeper</p>
                    <p>Poker</p>
                    <p>2048</p>
                </div>
            </div>
            <div className={`${footerClass}__copyright`}>

                <p>© 2019 Copyright:<a> The Puzzled group. All rights reserved.</a></p>

            </div>
        </div>
    )
}

export { Footer }
