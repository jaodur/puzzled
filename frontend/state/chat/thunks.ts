import { CREATE_OR_GET_DIRECT_CHAT_MUTATION } from '../../graphql/mutations/chat';
import { graphqlMutate } from '../../lib/api/graphqlHttp';
import { getAppStateInterface } from '../redux/types';
import { AppThunkDispatch } from '../redux/types';
import {
    chatIdentifierFoundSuccess,
    loadChatChannelsSuccess,
    loadChatIdentifiersFailure,
    loadChatIdentifiersSuccess,
    loadChatMessagesSuccess,
} from './actions';

const loadDirectChatChannel = (userIds: string[]) => {
    return async (dispatch: AppThunkDispatch, getState: getAppStateInterface) => {
        userIds.sort();
        const identifier = userIds.join('-');
        const chatId = getState().chat.identifier[identifier] || false;

        if (chatId) {
            dispatch(chatIdentifierFoundSuccess);
            return;
        }
        await graphqlMutate(CREATE_OR_GET_DIRECT_CHAT_MUTATION, { userIds }, { fetchPolicy: 'no-cache' })
            .then(({ createOrGetDirectChat: { chatChannel: channel } }) => {
                dispatch(loadChatIdentifiersSuccess({ [identifier]: channel.id }));
                dispatch(loadChatChannelsSuccess({ [channel.id]: channel }));
                dispatch(loadChatMessagesSuccess({ [channel.id]: channel.messages }));
            })
            .catch(err => {
                dispatch(loadChatIdentifiersFailure);
            });
    };
};

export { loadDirectChatChannel };
