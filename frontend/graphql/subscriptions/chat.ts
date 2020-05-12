import gql from 'graphql-tag';

const CHAT_CHANNEL_SUBSCRIPTION = gql`
    subscription chatChannelSubscription($chatChannelId: ID!) {
        chatChannelUpdated(id: $chatChannelId) {
            id
            roomId
            name
            latestMessage {
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

export { CHAT_CHANNEL_SUBSCRIPTION };
