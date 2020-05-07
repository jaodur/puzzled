import { CREATE_OR_GET_DIRECT_CHAT_MUTATION } from '../../graphql/mutations/chat';
import { graphqlMutate } from '../../lib/api/graphqlHttp';
import { getAppStateInterface } from '../redux/types';
import { AppThunkDispatch } from '../redux/types';
import {
    addChatMessageSuccess,
    chatIdentifierFoundSuccess,
    loadChatChannelsSuccess,
    loadChatIdentifiersFailure,
    loadChatIdentifiersSuccess,
    loadChatMessagesSuccess,
    setCurrentChannelSuccess,
    setMiniChatOpenSuccess,
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
        await graphqlMutate(CREATE_OR_GET_DIRECT_CHAT_MUTATION, { userIds }, { fetchPolicy: 'no-cache' })
            .then(({ createOrGetDirectChat: { chatChannel: channel } }) => {
                dispatch(loadChatIdentifiersSuccess({ [identifier]: channel.id }));
                dispatch(loadChatChannelsSuccess({ [channel.id]: channel }));
                dispatch(loadChatMessagesSuccess({ [channel.id]: channel.messages }));
                dispatch(setCurrentChannelSuccess({ id: channel.id, name: channel.name, roomId: channel.roomId }));
            })
            .catch(err => {
                dispatch(loadChatIdentifiersFailure);
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

export { addMessage, loadDirectChatChannel, setMiniChatOpen };
