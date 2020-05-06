import * as actions from '../chat/actions';
import { combineReducers, createReducer } from '../redux/utils';
import { ChannelsInterface, ChatStateInterface, IdentifierInterface, MessagesInterface } from './types';
import { ChatAction } from './types';

const identifierReducer = createReducer<IdentifierInterface, ChatAction>(() => ({}), {
    [actions.LOAD_CHAT_IDENTIFIERS_SUCCESS]: (draftState, { payload: newIdenfier }) => {
        draftState = { ...draftState, ...newIdenfier };
        return draftState;
    },
});

const channelsReducer = createReducer<ChannelsInterface, ChatAction>(() => ({}), {
    [actions.LOAD_CHAT_CHANNELS_SUCCESS]: (draftState, { payload: newChannel }) => {
        draftState = { ...draftState, ...newChannel };
        return draftState;
    },
});

const messagesReducer = createReducer<MessagesInterface, ChatAction>(() => ({}), {
    [actions.LOAD_CHAT_MESSAGES_SUCCESS]: (draftState, { payload: newMessage }) => {
        draftState = { ...draftState, ...newMessage };
        return draftState;
    },
});

const chatReducer = combineReducers<ChatStateInterface>({
    identifier: identifierReducer,
    channels: channelsReducer,
    messages: messagesReducer,
});

export { chatReducer as default };
