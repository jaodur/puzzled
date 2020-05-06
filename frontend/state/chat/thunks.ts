import { ThunkDispatch } from 'redux-thunk';

import { CREATE_OR_GET_DIRECT_CHAT_MUTATION } from '../../graphql/mutations/chat';
import { graphqlMutate } from '../../lib/api/graphqlHttp';
import { getAppStateInterface } from '../redux/types';
import {
    loadChatChannelsSuccess,
    loadChatIdentifiersFailure,
    loadChatIdentifiersSuccess,
    loadChatMessagesSuccess,
} from './actions';

const loadDirectChatChannel = (userIds: string[]) => {
    return async (dispatch: ThunkDispatch<any, any, any>, getState: getAppStateInterface) => {
        userIds.sort();
        const identifier = userIds.join('-');
        // const chatId = getState().chat.identifier || false;
        //
        // if (chatId) {
        //     return
        // }
        await graphqlMutate(CREATE_OR_GET_DIRECT_CHAT_MUTATION, { userIds }, { fetchPolicy: 'no-cache' })
            .then(({ createOrGetDirectChat: { chatChannel: channel } }) => {
                dispatch(loadChatIdentifiersSuccess({ [identifier]: channel.id }));
                dispatch(loadChatChannelsSuccess({ [channel.id]: channel }));
                dispatch(loadChatMessagesSuccess({ [channel.id]: channel.messages }));
            })
            .catch(err => {
                dispatch(loadChatIdentifiersFailure());
            });
    };
};

export { loadDirectChatChannel };
