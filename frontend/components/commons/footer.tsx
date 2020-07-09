import * as React from 'react';
import { FooterInterface } from '../interfaces/interfaces';

function Footer({ className }: FooterInterface) {
    className = className ? className : 'footer-main';
    return (
        <footer className={className}>
            <div className={`${className}__content`}>
                <div className={`${className}__content__logo`}>
                    <h1>puzzled</h1>
                </div>
                <div className={`${className}__content__card`}>
                    <h1>puzzled</h1>
                    <p>about</p>
                    <p>blogs</p>
                    <p>puzzled premium</p>
                    <p>contact us</p>
                </div>
                <div className={`${className}__content__card`}>
                    <h1>games</h1>
                    <p>Sudoku</p>
                    <p>Mine sweeper</p>
                    <p>Poker</p>
                    <p>2048</p>
                </div>
                <div className={`${className}__content__card`}>
                    <h1>leaderboards</h1>
                    <p>Sudoku</p>
                    <p>Mine sweeper</p>
                    <p>Poker</p>
                    <p>2048</p>
                </div>
                <div className={`${className}__content__card`}>
                    <h1>extras</h1>
                    <p>Sudoku</p>
                    <p>Mine sweeper</p>
                    <p>Poker</p>
                    <p>2048</p>
                </div>
            </div>
            <div className={`${className}__copyright`}>
                <p>© {new Date().getFullYear()} Puzzled</p>
                <span>
                    <a href="#">Terms</a>
                </span>
            </div>
        </footer>
    );
}

export { Footer };
