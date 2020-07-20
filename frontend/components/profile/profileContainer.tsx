import * as React from 'react';
import { Redirect } from 'react-router-dom';

import { Footer } from '../commons/footer';
import { links } from '../commons/linkUrls';
import { MainContent } from '../commons/mainContent';
import { NavBarContainer } from '../commons/navbarContainer';
import { useCheckLoginContext } from '../commons/puzzleContext';
import Profile from './profile';

function ProfileContainer() {
    const { checkLogin } = useCheckLoginContext();

    return checkLogin._loginInfo.loggedIn ? (
        <>
            <NavBarContainer />
            <MainContent className={'main-content full-content'}>
                <Profile />
            </MainContent>
            <Footer />
        </>
    ) : (
        <Redirect to={links.USER.SIGN_IN} />
    );
}

export { ProfileContainer };
