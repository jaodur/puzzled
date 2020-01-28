import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './styles/main';
import './styles/profile.sass';
import './styles/snackbar.sass';
import './styles/sudoku';
import './styles/sidebarTab'
import './styles/inputs.sass'

import { PageNotFound } from './components/commons/404PageNotFound';
import { Home } from './components/homePage/Home';
import signInSignUpContainer from './components/profile/signInSignUpContainer';
import { SudokuHome } from './components/sudoku/sudoku';

import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { SnackbarProvider } from 'notistack';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import { CustomSnackbarContentWrapper } from './components/commons/customSnackbar';
import { links } from './components/commons/linkUrls';
import { ProfileContainer} from "./components/profile/profileContainer";

const httpLink = createHttpLink({
    uri: 'http://localhost:8000/graphql/',
    // uri: 'http://10.20.42.55:8000/graphql/'
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <ApolloHooksProvider client={client}>
            <SnackbarProvider
                maxSnack={3}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                content={(key, message) => <CustomSnackbarContentWrapper id={key} message={message} />}>
                <BrowserRouter forceRefresh={false}>
                    <Switch>
                        <Route exact path={links.HOME} component={Home} />
                        <Route path={links.SUDOKU.HOME} component={SudokuHome} />
                        <Route path={links.USER.HOME} component={signInSignUpContainer} />
                        <Route path={links.USER.PROFILE.HOME} component={ProfileContainer} />
                        <Route component={PageNotFound} />
                    </Switch>
                </BrowserRouter>
            </SnackbarProvider>
        </ApolloHooksProvider>
    </ApolloProvider>,
    document.getElementById('react')
);
