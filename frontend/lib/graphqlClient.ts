import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';

import { stripTrailingSlash } from '../utils/utils';

const hasSubscriptionOperation = ({ query: { definitions } }: any) =>
    definitions.some(
        ({ kind, operation }: { kind: string; operation: string }) =>
            kind === 'OperationDefinition' && operation === 'subscription'
    );

const webSocketLink = new WebSocketLink({
    uri: `${stripTrailingSlash(process.env.BASE_WS_URL)}/chat/`,
    options: {
        reconnect: true,
    },
});

const httpLink = createHttpLink({
    uri: `${stripTrailingSlash(process.env.BASE_URL)}/graphql/`,
});

const link = ApolloLink.split(hasSubscriptionOperation, webSocketLink, httpLink);

const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
});

export default client;
