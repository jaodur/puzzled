import * as React from 'react';
import { Footer } from './footer';
import { TextLink } from './links';
import { NavBar } from './navBar';
import { defaultNavBarLinks } from './navbarLinks';

const linkEmpasizedStyle: string = 'link__emphasized';
const pageNotFoundClass: string = 'navbar-container-404';
const pageNotFoundContentClass: string = 'content-container-404';
const footerClass: string = 'footer-404';

function PageNotFound() {
    return (
        <React.Fragment>
            <div className={pageNotFoundClass}>
                <NavBar
                    secLabel={defaultNavBarLinks.secLabel}
                    primaryLabel={defaultNavBarLinks.primaryLabel}
                    links={defaultNavBarLinks.links}
                    linkActiveClass={'sudoku-selected'}
                    key={'main'}
                    showProfileContainer
                />
            </div>
            <div className={pageNotFoundContentClass}>
                <div className={`${pageNotFoundContentClass}__main`}>404</div>
                <div className={`${pageNotFoundContentClass}__sub`}>You have reached the end of the universe...</div>
                <div className={`${pageNotFoundContentClass}__sub`}>
                    though you can still revisit planet{' '}
                    <TextLink text={'Puzzled'} link={'/'} styleClass={linkEmpasizedStyle} />
                </div>
            </div>
            <Footer footerClass={footerClass} />
        </React.Fragment>
    );
}

export { PageNotFound };
