import { PayloadAction } from 'typesafe-actions';

import { ChatChannelInterface, ChatMessageInterface } from '../../components/interfaces/chat';

type ChatAction = PayloadAction<string, any>;

interface IdentifierInterface {
    [key: string]: string;
}

interface ChannelsInterface {
    [key: string]: ChatChannelInterface;
}

interface MessagesInterface {
    [key: string]: ChatMessageInterface[];
}

interface ChatStateInterface {
    identifier: IdentifierInterface;
    channels: ChannelsInterface;
    messages: MessagesInterface;
}

export { ChatAction, ChatStateInterface, IdentifierInterface, ChannelsInterface, MessagesInterface };
