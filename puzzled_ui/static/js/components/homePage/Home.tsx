import * as React from "react";
import { NavBarContainer } from "../commons/navbarContainer"
import { ContentContainer } from "./contentContainer"
import { Footer } from '../commons/footer'

let footerClass: string = 'main-footer';


export class Home extends React.Component {
    render(): Array<JSX.Element> {
        return [
            <NavBarContainer/>,
            <ContentContainer/>,
            <Footer footerClass={footerClass}/>
    ]
    }
}

