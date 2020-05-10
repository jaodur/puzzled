import * as actions from '../chat/actions';
import { combineReducers, createReducer } from '../redux/utils';
import {
    ChannelsInterface,
    ChatStateInterface,
    CurrentChannelInterface,
    IdentifierInterface,
    MessagesFromSubscriptionInterface,
    MessagesInterface,
} from './types';
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

const subscribedChannelsReducer = createReducer<ChannelsInterface, ChatAction>(() => ({}), {
    [actions.SUBSCRIBE_CHAT_CHANNEL_SUCCESS]: (draftState, { payload: newChannel }) => {
        draftState = { ...draftState, ...newChannel };
        return draftState;
    },
});

const messagesFromSubscriptionReducer = createReducer<MessagesFromSubscriptionInterface, ChatAction>(() => ({}), {
    [actions.UPDATE_MESSAGES_FROM_SUBSCRIPTION_SUCCESS]: (draftState, { payload: newMessage }) => {
        const { channelId, messageId } = newMessage;
        draftState[channelId] = { ...draftState[channelId], [messageId]: messageId };
        return draftState;
    },
});

const messagesReducer = createReducer<MessagesInterface, ChatAction>(() => ({}), {
    [actions.LOAD_CHAT_MESSAGES_SUCCESS]: (draftState, { payload: newMessage }) => {
        draftState = { ...draftState, ...newMessage };
        return draftState;
    },
    [actions.ADD_CHAT_MESSAGE_SUCCESS]: (draftState, { payload }) => {
        draftState[payload.channelId].push(payload.message);
        return draftState;
    },
    [actions.CHAT_SUBSCRIPTION_UPDATE_MESSAGE_SUCCESS]: (draftState, { payload }) => {
        draftState[payload.channelId].push(payload.message);
        return draftState;
    },
});

const currentChannelReducer = createReducer<CurrentChannelInterface, ChatAction>(
    () => ({ id: null, name: null, roomId: null }),
    {
        [actions.SET_CURRENT_CHANNEL_SUCCESS]: (draftState, { payload: currentChannel }) => {
            draftState = currentChannel;
            return draftState;
        },
    }
);

const isMiniChatOpenReducer = createReducer<boolean, ChatAction>(() => false, {
    [actions.SET_MINI_CHAT_OPEN_SUCCESS]: (draftState, { payload: isMiniChatOpen }) => {
        draftState = isMiniChatOpen;
        return draftState;
    },
});

const chatReducer = combineReducers<ChatStateInterface>({
    currentChannel: currentChannelReducer,
    isMiniChatOpen: isMiniChatOpenReducer,
    identifier: identifierReducer,
    channels: channelsReducer,
    subscribedChannels: subscribedChannelsReducer,
    messagesFromSubscription: messagesFromSubscriptionReducer,
    messages: messagesReducer,
});

export { chatReducer as default };
