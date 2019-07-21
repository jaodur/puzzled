import * as React from "react";
import { NavBar } from './navBar'
import { AppName } from './appName'


function NavBarContainer(): JSX.Element {
    return (
        <div className='navbar-container'>
            <NavBar/>
            <AppName/>
        </div>
    )
}

export { NavBarContainer }
