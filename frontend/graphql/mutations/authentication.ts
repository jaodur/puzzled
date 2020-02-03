import gql from 'graphql-tag';

const LOGIN_USER_MUTATION = gql`
    mutation loginUser($email: String!, $password: String!) {
        loginUser(email: $email, password: $password) {
            user {
                email
                name
                id
            }
            loggedIn
        }
    }
`;

const CREATE_USER_MUTATION = gql`
    mutation createUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
        createUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
            user {
                email
                name
                id
            }
        }
    }
`;

const CHECK_LOGIN_MUTATION = gql`
    mutation checkLogin {
        checkLogin {
            loggedIn
            email
        }
    }
`;

export { LOGIN_USER_MUTATION, CREATE_USER_MUTATION, CHECK_LOGIN_MUTATION };
