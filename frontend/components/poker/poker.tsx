import * as React from 'react';

import { Footer } from '../commons/footer';
import { MainContent } from '../commons/mainContent';
import { NavBarContainer } from '../commons/navbarContainer';
import { PokerTable } from './pokerTable';

function PokerHome() {
    return (
        <React.Fragment>
            <NavBarContainer />
            <MainContent>
                <PokerTable />
            </MainContent>
            <Footer />
        </React.Fragment>
    );
}

export { PokerHome };
