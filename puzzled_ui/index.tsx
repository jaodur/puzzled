import * as React from "react";
import * as ReactDOM from "react-dom";
import './styles/main';

// import {Hello} from "./components/Hello";
import {Home} from "./components/homePage/Home";

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
    <ApolloProvider client={client}>
        <Home />
    </ApolloProvider>,
    document.getElementById("react")
);
