import * as React from "react";
import { Logo } from './logo'
import { linkInterface, navbarInterface } from "../interfaces";


function Link({ name, href, linkClass }: linkInterface){
    return (
        <li className={ linkClass }>
            <a href={ href }>{ name }</a>
        </li>
        )

}


function NavBar({ navbarClass, links }: navbarInterface) {
    function createNavLinks(links: Array<linkInterface> ) {
        let linksComponent = Array();

        links.forEach( function (link, index) {
            linksComponent.push(<Link name={ link.name } href={ link.href } key={`navBarLinks-${ index }`}/>)
        });

        return linksComponent.map(link=>link);
    }
    return (
        <nav className={ navbarClass }>
            <Logo text={ 'puzzled' }/>
            <ul>
                { createNavLinks(links) }

            </ul>
        </nav>
    )
}

export { NavBar }
