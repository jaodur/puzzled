import { createAction } from 'typesafe-actions';

import { ChannelsInterface, IdentifierInterface, MessagesInterface } from './types';

export const LOAD_CHAT_IDENTIFIERS_SUCCESS = 'chat/identifiers/LOAD_CHAT_IDENTIFIERS_SUCCESS';
export const loadChatIdentifiersSuccess = createAction(LOAD_CHAT_IDENTIFIERS_SUCCESS)<IdentifierInterface>();

export const CHAT_IDENTIFIERS_FOUND_SUCCESS = 'chat/identifiers/CHAT_IDENTIFIERS_FOUND_SUCCESS';
export const chatIdentifierFoundSuccess = createAction(CHAT_IDENTIFIERS_FOUND_SUCCESS)();

export const LOAD_CHAT_IDENTIFIERS_FAILURE = 'chat/identifiers/LOAD_CHAT_IDENTIFIERS_FAILURE';
export const loadChatIdentifiersFailure = createAction(LOAD_CHAT_IDENTIFIERS_FAILURE)();

export const LOAD_CHAT_CHANNELS_SUCCESS = 'chat/channels/ LOAD_CHAT_CHANNELS_SUCCESS';
export const loadChatChannelsSuccess = createAction(LOAD_CHAT_CHANNELS_SUCCESS)<ChannelsInterface>();

export const LOAD_CHAT_CHANNELS_FAILURE = 'chat/channels/ LOAD_CHAT_CHANNELS_FAILURE';

export const LOAD_CHAT_MESSAGES_SUCCESS = 'chat/messages/LOAD_CHAT_MESSAGES_SUCCESS';
export const loadChatMessagesSuccess = createAction(LOAD_CHAT_MESSAGES_SUCCESS)<MessagesInterface>();

export const LOAD_CHAT_MESSAGES_FAILURE = 'chat/messages/LOAD_CHAT_MESSAGES_FAILURE';
