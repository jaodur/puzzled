import gql from 'graphql-tag';

const PROFILE_QUERY = gql`
    query profile($email: String!) {
        profile(email: $email) {
            name
            preferredName
            email
            telephone
            timezone
            pictureUrl
        }
    }
`;

const PROFILES_QUERY = gql`
    query {
        profiles {
            id
            name
            preferredName
            email
            telephone
            timezone
            pictureUrl
        }
    }
`;

const PROFILES_SEARCH_QUERY = gql`
    query {
        profiles {
            id
            name
            preferredName
            timezone
            pictureUrl
        }
    }
`;

export { PROFILE_QUERY, PROFILES_QUERY, PROFILES_SEARCH_QUERY };
