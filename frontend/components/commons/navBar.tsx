import * as React from 'react';
import { LinkInterface, NavbarInterface } from '../interfaces';
import { NavItemLink } from './links';
import { Logo } from './logo';

function NavBar({ onTabClick, primaryLabel, secLabel, navbarClass, links }: NavbarInterface) {
    function createNavLinks(links: LinkInterface[]) {
        let linksComponent: any = [];

        links.forEach(function(link, index) {
            linksComponent.push(
                <li key={`navBarLinks-${index}`}>
                    <NavItemLink
                        name={link.name}
                        href={link.href}
                        activeClassName={'sudoku-selected'}
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
