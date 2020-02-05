import * as React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import { PageNotFound } from './components/commons/404PageNotFound';
import { links } from './components/commons/linkUrls';
import { useCheckLogin } from './components/commons/puzzleContext';
import { Home } from './components/homePage/Home';
import { BigAssLoaderIcon } from './components/icons/loaderIcon';
import { ProfileContainer } from './components/profile/profileContainer';
import signInSignUpContainer from './components/profile/signInSignUpContainer';
import { SudokuHome } from './components/sudoku/sudoku';

function App() {
    const [loading, setLoading] = React.useState(true);
    const { asyncUpdateLoginInfo } = useCheckLogin();

    // component did mount
    React.useEffect(() => {
        asyncUpdateLoginInfo(() => setLoading(false));
    }, []);

    return loading ? (
        <BigAssLoaderIcon />
    ) : (
        <BrowserRouter forceRefresh={false}>
            <Switch>
                <Route exact path={links.HOME} component={Home} />
                <Route path={links.SUDOKU.HOME} component={SudokuHome} />
                <Route path={links.USER.PROFILE.HOME} component={ProfileContainer} />
                <Route path={links.USER.HOME} component={signInSignUpContainer} />
                <Route component={PageNotFound} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
