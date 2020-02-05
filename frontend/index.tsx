import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './styles/buttons';
import './styles/inputs';
import './styles/main';
import './styles/profile';
import './styles/sidebarTab';
import './styles/snackbar';
import './styles/sudoku';

import { SnackbarProvider } from 'notistack';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import App from './app';
import { CustomSnackbarContentWrapper } from './components/commons/customSnackbar';
import { PuzzledProvider } from './components/commons/puzzleContext';
import graphqlClient from './lib/graphqlClient';

ReactDOM.render(
    <ApolloProvider client={graphqlClient}>
        <ApolloHooksProvider client={graphqlClient}>
            <SnackbarProvider
                maxSnack={3}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                content={(key, message) => <CustomSnackbarContentWrapper id={key} message={message} />}>
                <BrowserRouter forceRefresh={false}>
                    <Switch>
                        <Route exact path={links.HOME} component={Home} />
                        <Route path={links.SUDOKU.HOME} component={SudokuHome} />
                        <Route path={links.USER.PROFILE.HOME} component={ProfileContainer} />
                        <Route path={links.USER.HOME} component={signInSignUpContainer} />
                        <Route component={PageNotFound} />
                    </Switch>
                </BrowserRouter>
            </SnackbarProvider>
        </ApolloHooksProvider>
    </ApolloProvider>,
    document.getElementById('react')
);
