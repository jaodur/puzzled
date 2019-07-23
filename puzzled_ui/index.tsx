import * as React from "react";
import * as ReactDOM from "react-dom";
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './styles/main';

import { Home } from "./components/homePage/Home";
import { SudokuHome } from "./components/sudoku/sudoku";

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = createHttpLink({
    uri: 'http://localhost:8000/graphql/'
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
});

ReactDOM.render(
    <ApolloProvider client={ client }>
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={ Home } />
                <Route exact path="/sudoku/" component={ SudokuHome } />
            </Switch>
        </BrowserRouter>

    </ApolloProvider>,
    document.getElementById("react")
);
