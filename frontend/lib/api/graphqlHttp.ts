import graphqlClient from '../graphqlClient';

async function graphqlMutate(mutation: any, variables: object = {}) {
    return await graphqlClient.mutate({ mutation, variables }).then((response: any) => {
        return response.data;
    });
}

async function graphqlQuery(query: any, variables: object = {}) {
    return await graphqlClient.query({ query, variables }).then((response: any) => {
        return response.data;
    });
}

export { graphqlMutate, graphqlQuery };
