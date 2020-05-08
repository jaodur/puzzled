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
    extraOptions: ExtraOptionsInterface = { fetchPolicy: 'cache-first' }
) {
    return graphqlClient.subscribe({ query, variables, ...extraOptions });
}

export { graphqlMutate, graphqlQuery };
