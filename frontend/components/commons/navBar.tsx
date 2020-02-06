import * as React from 'react';

import { LinkInterface, NavbarInterface } from '../interfaces/interfaces';
import { NavBarProfileAvatar } from './avatar';
import { NavItemLink } from './links';
import { links as urlLinks } from './linkUrls';
import { Logo } from './logo';
import { useCheckLoginContext } from './puzzleContext';

function NavBar({ onTabClick, primaryLabel, secLabel, navbarClass, links, linkActiveClass }: NavbarInterface) {
    const { checkLogin } = useCheckLoginContext();

    const signUpSignInLinks: LinkInterface[] = [
        { name: 'Sign In', href: urlLinks.USER.SIGN_IN },
        { name: 'Sign Up', href: urlLinks.USER.SIGN_UP },
    ];

    function createNavLinks(links: LinkInterface[]) {
        const linksComponent: any = [];

        links.forEach(function(link, index) {
            linksComponent.push(
                <li key={`navBarLinks-${index}`}>
                    <NavItemLink
                        name={link.name}
                        href={link.href}
                        activeClassName={linkActiveClass}
                        onTabClick={onTabClick}
                    />
                </li>
            );
        });

        return linksComponent.map((link: any) => link);
    }
    return (
        <nav className={navbarClass}>
            <Logo primaryLabel={primaryLabel} secLabel={secLabel} />
            <ul>{createNavLinks(links)}</ul>
            <div className={'profile-navbar'}>
                {checkLogin._loginInfo.loggedIn ? (
                    <NavBarProfileAvatar profileName={checkLogin._loginInfo.user.name} />
                ) : (
                    <ul>{createNavLinks(signUpSignInLinks)}</ul>
                )}
            </div>
        </nav>
    );
}

export { NavBar };
