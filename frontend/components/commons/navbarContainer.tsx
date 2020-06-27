import * as React from 'react';
import { AppName } from './appName';
import { NavBar } from './navBar';

import { NavbarContainerInterface } from '../interfaces/interfaces';

function NavBarContainer({ showBanner }: NavbarContainerInterface): JSX.Element {
    return (
        <div className={'nav-container'}>
            <NavBar />
            {!!showBanner && <AppName />}
        </div>
    );
}

export { NavBarContainer };
