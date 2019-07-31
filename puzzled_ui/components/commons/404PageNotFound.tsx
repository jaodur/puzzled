import * as React from "react";
import { TextLink} from "./links";
import { navbarInterface } from '../interfaces'
import { NavBar } from "./navBar";

let linkNoStyle: string = 'link__no-style';
let linkEmpasizedStyle: string = 'link__emphasized';
let pageNotFoundClass: string = 'navbar-container-404';
let pageNotFoundContentClass: string = 'content-container-404';

let navBarLinks: navbarInterface = {
    primaryLabel: { text: 'puzzled', href: '/', style: linkNoStyle },
    secLabel: { text: null, href: '#' },
    links:
        [
            { name: 'Games', href: '#' },
            { name: 'Pin', href: '#' },
            { name: null, href: null, linkClass: 'navbar-separator' },
            { name: 'Sign In', href: '#' },
            { name: 'Sign Up', href: '#' }

        ]
};

function PageNotFound() {
    return (
        <React.Fragment>
            <div className={ pageNotFoundClass }>
                <NavBar
                    secLabel={ navBarLinks.secLabel }
                    primaryLabel={ navBarLinks.primaryLabel }
                    links={ navBarLinks.links } key={ 'main' }
                />
            </div>
            <div className={ pageNotFoundContentClass }>
                <div className={ `${ pageNotFoundContentClass }__main` }>404</div>
                <div className={ `${ pageNotFoundContentClass }__sub` }>
                    You have reached the end of the universe...
                </div>
                <div className={ `${ pageNotFoundContentClass }__sub` }>
                    though you can still revisit planet <TextLink text={ "Puzzled" } link={ "/" } styleClass={ linkEmpasizedStyle }/>
                </div>
            </div>
        </React.Fragment>

    )
}

export { PageNotFound }
