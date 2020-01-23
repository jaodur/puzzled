import * as React from 'react';
import { SidebarTabInterface } from "../interfaces/sidebarTab";

function SidebarTab({icon, fillText, styleClass}: SidebarTabInterface){
    return (
        <div className={styleClass}>
            <div/>
            <span>{icon}</span>
            <span>{fillText}</span>
        </div>
    )
}

export { SidebarTab }
