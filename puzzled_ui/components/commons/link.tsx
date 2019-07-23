import * as React from "react";
import { Link } from 'react-router-dom';
import { routeLinkInterface } from '../interfaces'

function RouterLink({ link, component, styleClass }: routeLinkInterface) {
    return (
        <Link to={link} className={styleClass}>{component}</Link>
    )
}

export { RouterLink }
