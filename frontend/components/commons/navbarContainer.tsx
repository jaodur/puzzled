import * as React from 'react';
import { AppName } from './appName';
import { NavBar } from './navBar';

import { defaultNavBarLinks } from './navbarLinks';

function NavBarContainer(): JSX.Element {
    return (
        <div className="navbar-container">
            <NavBar
                secLabel={defaultNavBarLinks.secLabel}
                primaryLabel={defaultNavBarLinks.primaryLabel}
                links={defaultNavBarLinks.links}
                key={'main'}
            />
            <AppName />
        </div>
    );
}

export { NavBarContainer };
