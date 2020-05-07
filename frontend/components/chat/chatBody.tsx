import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Input from '@material-ui/core/Input';
import SendIcon from '@material-ui/icons/SendOutlined';
import { animateScroll } from 'react-scroll';

import { CHAT_PLACEHOLDER } from '../../constants/chat';
import { addMessage } from '../../state/chat/thunks';
import { AppState } from '../../state/redux/types';
import { ChatProfileAvatar } from '../commons/avatar';
import { Flowable } from '../commons/flowable';
import { ChatBodyInterface, ChatMessageInterface } from '../interfaces/chat';
import { EventInterface } from '../interfaces/interfaces';
import { EmptyChat } from './emptyChat';
import { MessageDialogue } from './messageDialogue';

function ChatBody({ styleClass }: ChatBodyInterface) {
    const dispatch = useDispatch();
    const messageScrollContainerID = 'messageScrollContainerID';
    const currentChatChannelId = useSelector((state: AppState) => state.chat.currentChannel.id);
    const messages = useSelector((state: AppState) => state.chat.messages[currentChatChannelId]);
    const defaultMessage: ChatMessageInterface = { float: 'right', message: '' };
    const [msg, setMsg] = React.useState(defaultMessage);
    const profiles = useSelector((state: AppState) => state.userProfiles);

    // componentDidMount
    React.useEffect(() => {
        scrollToBottom();
    }, []);

    React.useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        animateScroll.scrollToBottom({
            containerId: messageScrollContainerID,
            duration: 400,
            delay: 0,
            smooth: 'easeInOutQuart',
        });
    };

    const sendMessage = () => {
        if (msg.message) {
            dispatch(addMessage(currentChatChannelId, msg));
            setMsg({ ...msg, message: '' });
        }
    };

    function onMessageChange(event: EventInterface) {
        event.preventDefault();
        const newMsg: ChatMessageInterface = { ...msg, message: event.target.value };
        setMsg(newMsg);
    }

    function onMessageSendClick(event: EventInterface) {
        event.preventDefault();
        sendMessage();
    }

    function onMessageKeyDown(event: EventInterface) {
        if (!event.shiftKey && event.key === 'Enter') {
            event.preventDefault();
            sendMessage();
        }
    }

    return (
        <div className={styleClass}>
            <div style={{ display: 'flex' }}>
                <Flowable>
                    {profiles &&
                        profiles.map((profile, key) => (
                            <ChatProfileAvatar
                                src={profile.pictureUrl}
                                profileName={profile.name}
                                small
                                maxLetters={2}
                                key={key}
                            />
                        ))}
                </Flowable>
            </div>
            <div>
                <Flowable scrollContainerId={messageScrollContainerID}>
                    {messages && messages.length !== 0 ? (
                        messages.map((msg: ChatMessageInterface, key) => (
                            <MessageDialogue round float={msg.float} key={key}>
                                {msg.message}
                            </MessageDialogue>
                        ))
                    ) : (
                        <EmptyChat />
                    )}
                </Flowable>
                <div className={`${styleClass}__message-send`}>
                    <Input
                        value={msg.message}
                        autoFocus
                        multiline
                        disableUnderline
                        placeholder={CHAT_PLACEHOLDER}
                        onChange={onMessageChange}
                        onKeyDown={onMessageKeyDown}
                    />
                    <SendIcon onClick={onMessageSendClick} />
                </div>
            </div>
        </div>
    );
}

export { ChatBody };
