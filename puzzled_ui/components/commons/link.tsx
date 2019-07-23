import * as React from "react";
import { Link } from 'react-router-dom';

interface  routeLink {
    link: string,
    component: JSX.Element,
    styleClass: string
}


function RouterLink({ link, component, styleClass }: routeLink) {
    return (
        <Link to={link} className={styleClass}>{component}</Link>
    )
}

export { RouterLink }
