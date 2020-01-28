import * as React from 'react';

import { Footer } from '../commons/footer';
import { NavBarContainer } from '../commons/navbarContainer';
import { Profile } from './profile';

const footerClass: string = 'main-footer';

function ProfileContainer() {
    return (
        <>
            <NavBarContainer styleClass={'default-navbar-container'} />
            <div className={'default-nav-strip'} />
            <div className={'content'}>
                <Profile />
            </div>
            <Footer footerClass={footerClass} key={'sudoku-footer'} />
        </>
    );
}

export { ProfileContainer };
