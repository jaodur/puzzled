import * as React from 'react';
import { LinkInterface, NavbarInterface } from '../interfaces/interfaces';
import { NavItemLink } from './links';
import { Logo } from './logo';

function NavBar({ onTabClick, primaryLabel, secLabel, navbarClass, links, linkActiveClass }: NavbarInterface) {
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
        </nav>
    );
}

export { NavBar };
