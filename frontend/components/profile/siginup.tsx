import * as React from 'react';
import { Footer } from '../commons/footer';
import { NavBarContainer } from '../commons/navbarContainer';
import SignIn from "./signin";

const footerClass: string = 'main-footer';

function SignUp() {
    return (
        <React.Fragment>
            <NavBarContainer styleClass={'default-navbar-container'} />
            <div className={'default-nav-strip'} />
            <div className={'content'}>
                <SignIn/>
            </div>
            <Footer footerClass={footerClass} key={'sudoku-footer'} />
        </React.Fragment>
    );
}

export { SignUp };
