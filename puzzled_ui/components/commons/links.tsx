import * as React from "react";
import { Link } from 'react-router-dom';
import { routeLinkInterface, textLinkInterface } from '../interfaces'

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

export { RouterLink, TextLink }
