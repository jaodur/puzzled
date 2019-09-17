import * as React from "react";
import { Link, NavLink } from 'react-router-dom';
import { linkInterface, routeLinkInterface, textLinkInterface } from '../interfaces'

function RouterLink({ link, component, styleClass }: routeLinkInterface) {
    return (
        <Link to={ link } className={ styleClass }>{ component }</Link>
    )
}

function TextLink({ text, link, styleClass }: textLinkInterface) {
    return (
        <Link to={ link } className={ styleClass }>{ text }</Link>
    )
}

function NavItemLink({ name, href, linkClass, activeClassName, onTabClick }: linkInterface){
    return (
            <NavLink
                to={ href }
                activeClassName={ activeClassName }
                onClick={ onTabClick }
                data-name={ name }
            >{ name }</NavLink>
    )

}export { RouterLink, TextLink, NavItemLink }
