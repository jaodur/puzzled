import * as React from 'react';

import { LinkInterface } from '../interfaces/interfaces';
import { NavBarDropDown, NavDropDownMin } from './Dropdown';
import { links as urlLinks } from './linkUrls';
import { Logo } from './logo';

function NavBar() {
    const signUpSignInLinks: LinkInterface[] = [
        { name: 'Sign In', href: urlLinks.USER.SIGN_IN },
        { name: 'Sign Up', href: urlLinks.USER.SIGN_UP },
    ];

    return (
        <nav>
            <Logo />
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
