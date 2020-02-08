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
            name
            preferredName
            email
            telephone
            timezone
            pictureUrl
        }
    }
`;

export { PROFILE_QUERY, PROFILES_QUERY };
