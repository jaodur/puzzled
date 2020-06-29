import * as React from 'react';

import { LinkInterface } from '../interfaces/interfaces';
import { NavBarDropDown, NavDropDownMin } from './Dropdown';
import { links as urlLinks } from './linkUrls';
import { Logo } from './logo';
const sudokuImage = require('../../images/sudoku-dark.jpg');

function NavUL() {
    return (
        <div className={'nav-ul'}>
            <img className={'nav-img'} src={sudokuImage} alt={'sudoku-nav-image'} />
            <img className={'nav-img'} src={sudokuImage} alt={'sudoku-nav-image'} />
            <img className={'nav-img'} src={sudokuImage} alt={'sudoku-nav-image'} />
            <img className={'nav-img'} src={sudokuImage} alt={'sudoku-nav-image'} />
            <img className={'nav-img'} src={sudokuImage} alt={'sudoku-nav-image'} />
        </div>
    );
}

function NavBar() {
    const signUpSignInLinks: LinkInterface[] = [
        { name: 'Sign In', href: urlLinks.USER.SIGN_IN },
        { name: 'Sign Up', href: urlLinks.USER.SIGN_UP },
    ];

    return (
        <nav>
            <Logo />
            <NavUL />
            <NavDropDownMin className={'min-dropdown h-dropdown'} />
            <NavBarDropDown
                activeClass={''}
                links={signUpSignInLinks}
                className={'h-dropdown nav-profile full-dropdown'}
            />
        </nav>
    );
}

export { NavBar };
