import gql from 'graphql-tag';

const LOGIN_USER_MUTATION = gql`
    mutation loginUser($email: String!, $password: String!) {
        loginUser(email: $email, password: $password) {
            user {
                preferredName
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
            user {
                name
                preferredName
                email
                telephone
                pictureUrl
                timezone
            }
        }
    }
`;

const UPDATE_USER_PROFILE_MUTATION = gql`
    mutation updateUser(
        $name: String
        $preferredName: String
        $email: String
        $telephone: String
        $pictureUrl: String
        $timezone: String
    ) {
        updateUser(
            name: $name
            preferredName: $preferredName
            email: $email
            telephone: $telephone
            pictureUrl: $pictureUrl
            timezone: $timezone
        ) {
            user {
                name
                preferredName
                email
                telephone
                pictureUrl
                timezone
            }
        }
    }
`;

const LOGOUT_MUTATION = gql`
    mutation logoutUser {
        logoutUser {
            loggedIn
            user {
                name
                preferredName
                email
                telephone
                pictureUrl
                timezone
            }
        }
    }
`;

export {
    LOGIN_USER_MUTATION,
    CREATE_USER_MUTATION,
    CHECK_LOGIN_MUTATION,
    UPDATE_USER_PROFILE_MUTATION,
    LOGOUT_MUTATION,
};
