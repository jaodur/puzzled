import * as React from "react";
import { NavBar } from './navBar'
import { AppName } from './appName'
import { navbarInterface } from "../interfaces";

let navBarLinks: navbarInterface = {
    primaryLabel: 'puzzled',
    links:
        [
            { name: 'Games', href: '#' },
            { name: 'Pin', href: '#' },
            { name: null, href: null, linkClass: 'navbar-separator' },
            { name: 'Sign In', href: '#' },
            { name: 'Sign Up', href: '#' }

        ]
};

function NavBarContainer(): JSX.Element {
    return (
        <div className='navbar-container'>
            <NavBar primaryLabel={ navBarLinks.primaryLabel } links={ navBarLinks.links } key={ 'main' }/>
            <AppName/>
        </div>
    )
}

export { NavBarContainer }
