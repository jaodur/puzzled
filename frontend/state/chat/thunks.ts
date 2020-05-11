import { CREATE_OR_GET_DIRECT_CHAT_MUTATION } from '../../graphql/mutations/chat';
import { CHAT_CHANNEL_SUBSCRIPTION } from '../../graphql/subscriptions/chat';
import { graphqlMutate, graphqlSubscribe } from '../../lib/api/graphqlHttp';
import { getAppStateInterface } from '../redux/types';
import { AppThunkDispatch } from '../redux/types';
import {
    addChatMessageSuccess,
    chatIdentifierFoundSuccess,
    chatSubscriptionUpdateMessageFailure,
    chatSubscriptionUpdateMessageSuccess,
    loadChatChannelsSuccess,
    loadChatIdentifiersFailure,
    loadChatIdentifiersSuccess,
    loadChatMessagesSuccess,
    setCurrentChannelSuccess,
    setMiniChatOpenSuccess,
    subscribeChatChannelSuccess,
    updateMessagesFromSubscriptionSuccess,
} from './actions';
import { ChatMessageInterface } from './types';

const loadDirectChatChannel = (userIds: string[]) => {
    return async (dispatch: AppThunkDispatch, getState: getAppStateInterface) => {
        userIds.sort();
        const identifier = userIds.join('-');
        const chatId = getState().chat.identifier[identifier] || false;

        if (chatId) {
            const channel = getState().chat.channels[chatId];
            dispatch(chatIdentifierFoundSuccess);
            dispatch(setCurrentChannelSuccess({ id: channel.id, name: channel.name, roomId: channel.roomId }));
            return;
        }
        await graphqlMutate(CREATE_OR_GET_DIRECT_CHAT_MUTATION, { userIds })
            .then(({ createOrGetDirectChat: { chatChannel: channel } }) => {
                dispatch(loadChatIdentifiersSuccess({ [identifier]: channel.id }));
                dispatch(loadChatChannelsSuccess({ [channel.id]: channel }));
                dispatch(loadChatMessagesSuccess({ [channel.id]: channel.messages }));
                dispatch(setCurrentChannelSuccess({ id: channel.id, name: channel.name, roomId: channel.roomId }));
                dispatch(subscribeToChatChannel(channel.id));
            })
            .catch(err => {
                dispatch(loadChatIdentifiersFailure({ err }));
            });
    };
};

const setMiniChatOpen = (miniChatOpen: boolean) => {
    return async (dispatch: AppThunkDispatch) => {
        dispatch(setMiniChatOpenSuccess(miniChatOpen));
    };
};

const addMessage = (channelId: string, message: ChatMessageInterface) => {
    return async (dispatch: AppThunkDispatch) => {
        dispatch(addChatMessageSuccess({ channelId, message }));
    };
};

const subscribeToChatChannel = (channelId: string) => {
    return async (dispatch: AppThunkDispatch, getState: getAppStateInterface) => {
        const isSubscribed = getState().chat.subscribedChannels[channelId];
        if (!isSubscribed) {
            const currentUserId = getState().currentUser.user.id;
            dispatch(subscribeChatChannelSuccess({ [channelId]: channelId }));
            graphqlSubscribe(
                CHAT_CHANNEL_SUBSCRIPTION,
                { chatChannelId: channelId },
                {
                    next({ data }: any) {
                        const {
                            chatChannelUpdated: { id: channelId, latestMessage: message },
                        } = data;
                        const owner = currentUserId === message.user.id;
                        if (owner) {
                            return;
                        }
                        const msgFromSubscriptions = getState().chat.messagesFromSubscription[channelId];
                        const msgExists = (msgFromSubscriptions && msgFromSubscriptions[message.id]) || false;

                        if (!msgExists) {
                            dispatch(chatSubscriptionUpdateMessageSuccess({ channelId, message }));
                            dispatch(updateMessagesFromSubscriptionSuccess({ channelId, messageId: message.id }));
                        }
                    },
                    error(err: any) {
                        dispatch(chatSubscriptionUpdateMessageFailure({ err }));
                    },
                }
            );
        }
    };
};

export { addMessage, loadDirectChatChannel, setMiniChatOpen, subscribeToChatChannel };
