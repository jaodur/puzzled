import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { LinkInterface, RouteLinkInterface, TextLinkInterface } from '../interfaces';

function RouterLink({ link, component, styleClass }: RouteLinkInterface) {
    return (
        <Link to={link} className={styleClass}>
            {component}
        </Link>
    );
}

function TextLink({ text, link, styleClass }: TextLinkInterface) {
    return (
        <Link to={link} className={styleClass}>
            {text}
        </Link>
    );
}

function NavItemLink({ name, href, activeClassName, onTabClick }: LinkInterface) {
    return (
        <NavLink to={href} activeClassName={activeClassName} onClick={onTabClick} data-name={name}>
            {name}
        </NavLink>
    );
}
export { RouterLink, TextLink, NavItemLink };
