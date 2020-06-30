import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { LinkInterface, LinksInterface, RouteLinkInterface, TextLinkInterface } from '../interfaces/interfaces';

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

function ULItems({ className, onTabClick, activeClass, links }: LinksInterface) {
    return (
        <ul className={className || ''}>
            {links &&
                links.map((link, key) => (
                    <li key={`navBarLinks-${key}`}>
                        <NavItemLink
                            name={link.name}
                            href={link.href}
                            activeClassName={activeClass}
                            onTabClick={onTabClick}
                        />
                    </li>
                ))}
        </ul>
    );
}
export { RouterLink, TextLink, NavItemLink, ULItems };
