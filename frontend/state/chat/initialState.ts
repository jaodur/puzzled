import { ChatStateInterface } from './types';

const ChatInitialState: ChatStateInterface = {
    currentChannel: { id: null, name: null, roomId: null },
    isMiniChatOpen: false,
    identifier: {},
    channels: {},
    messages: {},
};

export { ChatInitialState as default };
