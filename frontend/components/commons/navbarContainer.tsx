import * as React from 'react';
import { AppName } from './appName';
import { NavBar } from './navBar';

import { NavbarContainerInterface } from '../interfaces';
import { defaultNavBarLinks } from './navbarLinks';

function NavBarContainer({ styleClass, showBanner }: NavbarContainerInterface): JSX.Element {
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
