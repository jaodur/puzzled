import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';

import { stripTrailingSlash } from '../utils/utils';

const httpLink = createHttpLink({
    uri: `${stripTrailingSlash(process.env.BASE_URL)}/graphql/`,
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});

export default client;
