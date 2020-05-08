import gql from 'graphql-tag';

const CHAT_CHANNEL_SUBSCRIPTION = gql`
    subscription chatChannelSubscription($chatChannelId: String!) {
        chatChannelSubscription(instanceId: $chatChannelId) {
            chatChannelUpdated {
                id
                roomId
                name
                messages {
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
    }
`;

export { CHAT_CHANNEL_SUBSCRIPTION };
