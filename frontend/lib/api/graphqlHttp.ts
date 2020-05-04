import graphqlClient from '../graphqlClient';

type errorPolicyType = 'none' | 'ignore' | 'all';
type fetchPolicyType = 'cache-first' | 'network-only' | 'cache-only' | 'no-cache' | 'standby';

interface ExtraOptionsInterface {
    errorPolicy?: errorPolicyType;
    fetchPolicy?: fetchPolicyType;
    optimisticResponse?: any;
    refetchQueries?: any;
}

async function graphqlMutate(mutation: any, variables: object = {}, extraOptions?: ExtraOptionsInterface) {
    return await graphqlClient.mutate({ mutation, variables, ...extraOptions }).then((response: any) => {
        return response.data;
    });
}

async function graphqlQuery(query: any, variables: object = {}, extraOptions?: ExtraOptionsInterface) {
    return await graphqlClient.query({ query, variables, ...extraOptions }).then((response: any) => {
        return response.data;
    });
}

export { graphqlMutate, graphqlQuery };
