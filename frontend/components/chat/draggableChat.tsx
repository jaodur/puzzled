import * as React from 'react';
import { useSelector } from 'react-redux';

import Input from '@material-ui/core/Input';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/CloseOutlined';
import SendIcon from '@material-ui/icons/SendOutlined';
import { useMutation } from 'react-apollo-hooks';
import { animateScroll } from 'react-scroll';

import { CHAT_PLACEHOLDER } from '../../constants/chat';
import { DEFAULT_DRAGGABLE_CHAT_STYLE_CLASS, DEFAULT_DRAGGABLE_HANDLE } from '../../constants/draggable';
import {
    ADD_MESSAGE_MUTATION,
    CREATE_OR_GET_DIRECT_CHAT_MUTATION,
    EDIT_MESSAGE_MUTATION,
} from '../../graphql/mutations/chat';
import { AppState } from '../../state/redux/types';
import { ChatProfileAvatar } from '../commons/avatar';
import { Draggable } from '../commons/draggable';
import { Flowable } from '../commons/flowable';
import { ChatBodyInterface, ChatInterface, ChatMessageInterface, DraggableChatInterface } from '../interfaces/chat';
import { EventInterface } from '../interfaces/interfaces';
import { EmptyChat } from './emptyChat';
import { ChatIcon } from './icons';
import { MessageDialogue } from './messageDialogue';

const useStyles = makeStyles({
    root: {
        fontSize: '32px',
    },
});

function ChatBody({ styleClass }: ChatBodyInterface) {
    const messageScrollContainerID = 'messageScrollContainerID';
    const defaultMessage: ChatMessageInterface = { float: 'right', message: '' };
    const [directChat, _] = useMutation(CREATE_OR_GET_DIRECT_CHAT_MUTATION);
    const [addMessage, __] = useMutation(ADD_MESSAGE_MUTATION);
    const [editMessage, ___] = useMutation(EDIT_MESSAGE_MUTATION);
    const [messages, setMessages] = React.useState([]);
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
            setMessages([...messages, msg]);
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
                    {messages.length !== 0 ? (
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

function Chat({ styleClass }: ChatInterface) {
    const classes = useStyles({});
    return (
        <div className={styleClass || DEFAULT_DRAGGABLE_CHAT_STYLE_CLASS}>
            <div className={DEFAULT_DRAGGABLE_HANDLE.CLASSNAME}>
                <span>
                    <ChatIcon />
                    <span>chat</span>
                    <CloseIcon className={classes.root} />
                </span>
            </div>
            <ChatBody styleClass={`${DEFAULT_DRAGGABLE_CHAT_STYLE_CLASS}__chat_body`} />
        </div>
    );
}

function DraggableChat({  }: DraggableChatInterface) {
    const defaultPosition = { x: 500, y: 150 };
    return (
        <Draggable defaultPosition={defaultPosition}>
            <Chat />
        </Draggable>
    );
}

export { Chat, DraggableChat };
