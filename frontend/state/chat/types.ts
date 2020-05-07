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

interface CurrentChannelInterface {
    id: string | null;
    name: string | null;
    roomId: string | null;
}

interface ChatStateInterface {
    currentChannel: CurrentChannelInterface;
    isMiniChatOpen: boolean;
    identifier: IdentifierInterface;
    channels: ChannelsInterface;
    messages: MessagesInterface;
}

export {
    ChatAction,
    ChatStateInterface,
    CurrentChannelInterface,
    IdentifierInterface,
    ChannelsInterface,
    MessagesInterface,
};
