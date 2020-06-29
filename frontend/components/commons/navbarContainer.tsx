import * as React from 'react';
import { AppSlogan } from './appSlogan';
import { NavBar } from './navBar';

import { NavbarContainerInterface } from '../interfaces/interfaces';

function NavBarContainer({ showBanner }: NavbarContainerInterface): JSX.Element {
    return (
        <div className={'nav-container'}>
            <NavBar />
            {!!showBanner && <AppSlogan />}
        </div>
    );
}

export { NavBarContainer };
