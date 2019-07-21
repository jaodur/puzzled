import * as React from "react";
import { Logo } from './logo'


function NavBar() {
    return (
        <nav>
            <Logo/>
            <ul>
                <li>
                    <a href='#'>Games</a>
                </li>
                <li>
                    <a href='#'>Pin</a>
                </li>
                <li className="navbar-separator"></li>
                <li>
                    <a href='#'>Sign In</a>
                </li>
                <li>
                    <a href='#'>Sign Up</a>
                </li>
            </ul>
        </nav>
    )
}

export { NavBar }
