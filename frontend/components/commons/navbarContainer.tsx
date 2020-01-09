import * as React from 'react';
import { AppName } from './appName';
import { NavBar } from './navBar';

import { defaultNavBarLinks } from './navbarLinks';
import { NavbarContainerInterface } from '../interfaces'

function NavBarContainer({styleClass, showBanner}: NavbarContainerInterface): JSX.Element {
    return (
        <div className={styleClass}>
            <NavBar
                secLabel={defaultNavBarLinks.secLabel}
                primaryLabel={defaultNavBarLinks.primaryLabel}
                links={defaultNavBarLinks.links}
                linkActiveClass={'sudoku-selected'}
                key={'main'}
            />
            {!!showBanner && <AppName />}
        </div>
    );
}

export { NavBarContainer };
