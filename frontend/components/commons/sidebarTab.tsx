import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { SidebarTabInterface } from '../interfaces/sidebarTab';

function SidebarTab({ href, icon, fillText, styleClass }: SidebarTabInterface) {
    return (
        <NavLink to={href} className={styleClass} activeClassName={`${styleClass}__active`}>
            <div />
            <span>{icon}</span>
            <span>{fillText}</span>
        </NavLink>
    );
}

export { SidebarTab };
