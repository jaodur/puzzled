import { DocumentNode } from 'graphql';

import graphqlClient from '../graphqlClient';

type errorPolicyType = 'none' | 'ignore' | 'all';
type fetchPolicyType = 'cache-first' | 'network-only' | 'cache-only' | 'no-cache' | 'standby';

interface ExtraOptionsInterface {
    errorPolicy?: errorPolicyType;
    fetchPolicy?: fetchPolicyType;
    optimisticResponse?: any;
    refetchQueries?: any;
}

interface ObserverOrNextInterface {
    next: any;
    error: any;
}

async function graphqlMutate(
    mutation: DocumentNode,
    variables: object = {},
    extraOptions: ExtraOptionsInterface = { fetchPolicy: 'no-cache' }
) {
    return await graphqlClient.mutate({ mutation, variables, ...extraOptions }).then((response: any) => {
        return response.data;
    });
}

async function graphqlQuery(
    query: DocumentNode,
    variables: object = {},
    extraOptions: ExtraOptionsInterface = { fetchPolicy: 'no-cache' }
) {
    return await graphqlClient.query({ query, variables, ...extraOptions }).then((response: any) => {
        return response.data;
    });
}

async function graphqlSubscribe(
    query: DocumentNode,
    variables: object = {},
    observerOrNext: ObserverOrNextInterface,
    extraOptions: ExtraOptionsInterface = { fetchPolicy: 'no-cache' }
) {
    return graphqlClient.subscribe({ query, variables, ...extraOptions }).subscribe(observerOrNext);
}

export { graphqlMutate, graphqlQuery, graphqlSubscribe };
