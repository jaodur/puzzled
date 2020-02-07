import * as React from 'react';
import { Redirect } from 'react-router-dom';

import { Footer } from '../commons/footer';
import { links } from '../commons/linkUrls';
import { NavBarContainer } from '../commons/navbarContainer';
import { useCheckLoginContext } from '../commons/puzzleContext';
import { Profile } from './profile';

const footerClass: string = 'main-footer';

function ProfileContainer() {
    const { checkLogin } = useCheckLoginContext();

    return checkLogin._loginInfo.loggedIn ? (
        <>
            <NavBarContainer styleClass={'default-navbar-container'} />
            <div className={'default-nav-strip'} />
            <div className={'content'}>
                <Profile />
            </div>
            <Footer footerClass={footerClass} key={'sudoku-footer'} />
        </>
    ) : (
        <Redirect to={links.USER.SIGN_IN} />
    );
}

export { ProfileContainer };
