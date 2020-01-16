import gql from 'graphql-tag';

const LOGIN_USER_MUTATION = gql`
    mutation loginUser($email: String!, $password: String!) {
        loginUser(email: $email, password: $password) {
            user {
                email,
                name,
                id
            }
            loggedIn
        } 
    }
`;

export { LOGIN_USER_MUTATION }
