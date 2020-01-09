import * as React from 'react';
import { Footer } from '../commons/footer';
import { NavBarContainer } from '../commons/navbarContainer';
import { ContentContainer } from './contentContainer';

const footerClass: string = 'main-footer';

export class Home extends React.Component {
    public render(): JSX.Element[] {
        return [
            <NavBarContainer styleClass={'navbar-container'} showBanner={true} key={'navBarContainer'} />,
            <ContentContainer key={'contentContainer'} />,
            <Footer footerClass={footerClass} key={'footer'} />,
        ];
    }
}
