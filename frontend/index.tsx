import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './styles/main';
import './styles/sudoku';

import { PageNotFound } from './components/commons/404PageNotFound';
import { Home } from './components/homePage/Home';
import { SudokuHome } from './components/sudoku/sudoku';
import { SignUp } from './components/profile/siginup'

import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';

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
            <BrowserRouter forceRefresh={false}>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/sudoku/" component={SudokuHome} />
                    <Route component={PageNotFound} />
                </Switch>
            </BrowserRouter>
        </ApolloHooksProvider>
    </ApolloProvider>,
    document.getElementById('react')
);
