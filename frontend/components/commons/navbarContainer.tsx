import * as React from 'react';

import { NavbarContainerInterface } from '../interfaces/interfaces';
import { AppSlogan } from './appSlogan';
import { NavBar } from './navBar';

function NavBarContainer({ className, activeClass, links, showBanner }: NavbarContainerInterface): JSX.Element {
    return (
        <div className={'nav-container'}>
            <NavBar className={className} activeClass={activeClass} links={links} />
            {!!showBanner && <AppSlogan />}
        </div>
    );
}

export { NavBarContainer };
