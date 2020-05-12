import { useSelector } from 'react-redux';

import { AppState } from '../redux/types';

const useCurrentChatChannel = () => {
    return useSelector((state: AppState) => state.chat.currentChannel);
};

const useChannelMessages = (channelId: string) => {
    return useSelector((state: AppState) => state.chat.messages[channelId]);
};

const useIsMiniChatOpen = () => {
    return useSelector((state: AppState) => state.chat.isMiniChatOpen);
};

export { useChannelMessages, useCurrentChatChannel, useIsMiniChatOpen };
