import * as React from 'react';
import { Footer } from '../commons/footer';
import { NavBarContainer } from '../commons/navbarContainer';
import { ContentContainer } from './contentContainer';

export class Home extends React.Component {
    public render(): JSX.Element[] {
        return [
            <NavBarContainer showBanner key={'navBarContainer'} />,
            <ContentContainer key={'contentContainer'} />,
            <Footer key={'footer'} />,
        ];
    }
}
