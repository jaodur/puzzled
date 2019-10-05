import * as React from "react";
import { Logo } from './logo'
import { linkInterface, navbarInterface } from "../interfaces";
import { NavItemLink } from "./links";


function NavBar({ onTabClick, primaryLabel, secLabel, navbarClass, links }: navbarInterface) {
    function createNavLinks(links: Array<linkInterface> ) {
        let linksComponent = Array();

        links.forEach( function (link, index) {
            linksComponent.push(
                <li key={ `navBarLinks-${ index }` }>
                    <NavItemLink
                        name={ link.name }
                        href={ link.href }
                        activeClassName={ 'sudoku-selected' }
                        onTabClick={ onTabClick }
                    />
                </li>
            )
        });

        return linksComponent.map(link=>link);
    }
    return (
        <nav className={ navbarClass }>
            <Logo primaryLabel={ primaryLabel } secLabel={ secLabel }/>
            <ul>
                { createNavLinks(links) }

            </ul>
        </nav>
    )
}

export { NavBar }
