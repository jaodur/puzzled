import * as React from "react";
import * as ReactDOM from "react-dom";
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './styles/main';

import { Home } from "./components/homePage/Home";
import { SudokuHome } from "./components/sudoku/sudoku";
import { PageNotFound } from "./components/commons/404PageNotFound";

import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = createHttpLink({
    uri: 'http://localhost:8000/graphql/'
    // uri: 'http://10.20.42.55:8000/graphql/'
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
});

ReactDOM.render(
    <ApolloProvider client={ client }>
        <ApolloHooksProvider client={ client }>
            <BrowserRouter forceRefresh={ false }>
                <Switch>
                    <Route exact path="/" component={ Home } />
                    <Route path="/sudoku/" component={ SudokuHome } />
                    <Route component={ PageNotFound }/>
                </Switch>
            </BrowserRouter>
        </ApolloHooksProvider>
    </ApolloProvider>,
    document.getElementById("react")
);
