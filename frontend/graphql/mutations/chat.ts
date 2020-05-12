import gql from 'graphql-tag';

const CREATE_OR_GET_DIRECT_CHAT_MUTATION = gql`
    mutation createOrGetDirectChat($name: String, $userIds: [String!]!) {
        createOrGetDirectChat(name: $name, userIds: $userIds) {
            chatChannel {
                id
                roomId
                name
                users {
                    id
                    name
                }
                messages {
                    createdAt
                    updatedAt
                    id
                    message
                    float
                    user {
                        id
                        name
                    }
                }
            }
        }
    }
`;

const CREATE_OR_GET_MULTI_USER_CHAT_MUTATION = gql`
    mutation createOrGetMultiUserChat($name: String!, $chatType: String!, $userIds: [String!]!) {
        createOrGetMultiUserChat(name: $name, chatType: $chatType, userIds: $userIds) {
            chatChannel {
                id
                roomId
                name
                users {
                    id
                    name
                }
                messages {
                    createdAt
                    updatedAt
                    id
                    message
                    float
                    user {
                        id
                        name
                    }
                }
            }
        }
    }
`;

const ADD_MESSAGE_MUTATION = gql`
    mutation addMessage($channelId: String!, $message: String!) {
        addMessage(channelId: $channelId, message: $message) {
            chatMessage {
                id
                createdAt
                updatedAt
                message
                float
                user {
                    id
                    name
                    preferredName
                }
            }
        }
    }
`;

const EDIT_MESSAGE_MUTATION = gql`
    mutation addMessage($messageId: String!, $message: String!) {
        editMessage(messageId: $messageId, message: $message) {
            chatMessage {
                id
                createdAt
                updatedAt
                message
                float
                user {
                    id
                    name
                    preferredName
                }
            }
        }
    }
`;

export {
    ADD_MESSAGE_MUTATION,
    CREATE_OR_GET_DIRECT_CHAT_MUTATION,
    CREATE_OR_GET_MULTI_USER_CHAT_MUTATION,
    EDIT_MESSAGE_MUTATION,
};
