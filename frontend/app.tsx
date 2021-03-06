import * as React from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { LastLocationProvider } from 'react-router-last-location';

import { DraggableChat } from './components/chat/draggableChat';
import { PageNotFound } from './components/commons/404PageNotFound';
import { links } from './components/commons/linkUrls';
import { useCheckLoginContext } from './components/commons/puzzleContext';
import { DrawerContainer } from './components/drawer/drawerContainer';
import { Home } from './components/homePage/Home';
import { BigAssLoaderIcon } from './components/icons/loaderIcon';
import { PokerHome } from './components/poker/poker';
import { ProfileContainer } from './components/profile/profileContainer';
import signInSignUpContainer from './components/profile/signInSignUpContainer';
import { SudokuHome } from './components/sudoku/sudoku';
import initialStoreDispatch from './state/redux/initialStoreDispatch';

function App() {
    const [loading, setLoading] = React.useState(true);
    const { asyncUpdateLoginInfo } = useCheckLoginContext();
    const dispatch = useDispatch();

    // component did mount
    React.useEffect(() => {
        initialStoreDispatch(dispatch);
        asyncUpdateLoginInfo(() => setLoading(false));
    }, []);

    return loading ? (
        <BigAssLoaderIcon />
    ) : (
        <BrowserRouter forceRefresh={false}>
            <LastLocationProvider>
                <DrawerContainer />
                <DraggableChat />
                <Switch>
                    <Route exact path={links.HOME} component={Home} />
                    <Route path={links.SUDOKU.HOME} component={SudokuHome} />
                    <Route path={links.POKER.HOME} component={PokerHome} />
                    <Route path={links.USER.PROFILE.HOME} component={ProfileContainer} />
                    <Route path={links.USER.HOME} component={signInSignUpContainer} />
                    <Route component={PageNotFound} />
                </Switch>
            </LastLocationProvider>
        </BrowserRouter>
    );
}

export default App;
